# Codebase Scan Report and Diagnostic Plan

## Deliverable

This document is the single markdown report containing the full codebase scan and diagnostic plan. No code or config changes are made in this phase—only this report file was created.

---

## 1. Tech Stack and Architecture

**Frameworks and routing**

- **Next.js 16.1.6** with **App Router only** (no Pages Router). All routes live under `src/app/` and `src/app/[locale]/`.
- **i18n**: `next-intl` (v4.8.3) with locale segment `[locale]`, 10 locales (en, zh-CN, es, fr, de, ja, ko, pt, ru, ar), default `en`, `localePrefix: "as-needed"`. Config: [src/lib/i18n/config.ts](../src/lib/i18n/config.ts); server config: [src/i18n/request.ts](../src/i18n/request.ts).
- **Root layout** is a **server component** ([src/app/layout.tsx](../src/app/layout.tsx)): async `getOptimizedLocaleData()` (getLocale + getMessages), `export const dynamic = 'force-static'`, passes `locale` and `messages` into client `Providers` and `PerformanceProviders`.

**State management**

- **Zustand** (v5.0.11) for client state (e.g. [src/stores/live-class.store.ts](../src/stores/live-class.store.ts), [src/stores/communication.store.ts](../src/stores/communication.store.ts)).
- **TanStack React Query** (v5) for server state/caching (e.g. [src/lib/admin/hooks.ts](../src/lib/admin/hooks.ts)).
- **NextAuth.js** (v4.24.13) with SessionProvider for auth; session used in middleware and client components.

**Drizzle ORM integration**

- **Primary DB layer**: Drizzle (v0.38.0). Client: [src/lib/db/drizzle.ts](../src/lib/db/drizzle.ts) — singleton `pg.Pool` (or `DATABASE_POOL_URL` / `DIRECT_URL` / `DATABASE_URL`), `drizzle(pool, { schema })` exported as `drizzleDb`. Schema under `src/lib/db/schema/`.
- **Legacy**: Prisma still present (e.g. `prisma generate` in Dockerfile); migration to Drizzle is ongoing.
- **Usage**: API routes and server code import `drizzleDb` and schema; no client-side Drizzle.

**Other**

- **Socket.io** (v4.8.3) via custom server ([server.ts](../server.ts)); dev runs `tsx server.ts`.
- **Styling**: Tailwind CSS, shadcn/ui + Radix, `cn()` for class merging.
- **Validation**: Zod (v4.3.6). **Auth**: NextAuth with Drizzle adapter (see project root AGENTS.md).

---

## 2. Coding Standards

**Naming**

- **Files**: PascalCase for React components, kebab-case for non-components (per AGENTS.md).
- **API routes**: `app/api/.../route.ts` (App Router convention).
- **Constants**: UPPER_SNAKE_CASE; **functions**: camelCase, async with verb prefix.

**Linting**

- **ESLint**: [eslint.config.mjs](../eslint.config.mjs) — `eslint-config-next` (core-web-vitals + TypeScript), Prettier. Many rules relaxed: `@typescript-eslint/no-explicit-any`, `no-unused-vars`, `react-hooks/exhaustive-deps`, `react-hooks/set-state-in-effect`, etc. Security-related rules kept (`no-implied-eval`, `no-new-func`, `no-script-url`, etc.).

**Hooks usage**

- **useCallback** is used widely (~90+ files) for stable handlers passed to children or effects (e.g. [src/hooks/use-socket.ts](../src/hooks/use-socket.ts), [src/hooks/use-live-class-whiteboard.ts](../src/hooks/use-live-class-whiteboard.ts), [src/app/[locale]/tutor/live-class/components/LiveClassHub.tsx](../src/app/[locale]/tutor/live-class/components/LiveClassHub.tsx)).
- **React-hooks rules are off** in ESLint; no automated enforcement of hook order or dependency arrays.
- **useSearchParams / useParams**: Used in many pages (e.g. login, dashboard, payment). Next.js recommends wrapping `useSearchParams` in `<Suspense>` to avoid optional hydration issues; login already wraps the form in Suspense ([src/app/[locale]/login/page.tsx](../src/app/[locale]/login/page.tsx)).

---

## 3. Deployment Context (Google Cloud Run)

- **Deploy workflow**: [.github/workflows/deploy-gcp.yml](../.github/workflows/deploy-gcp.yml) — build image, push to GAR, deploy with `google-github-actions/deploy-cloudrun@v2`. Build uses [Dockerfile.production](../Dockerfile.production).
- **Production image**: `next/standalone` output, `PORT`/`HOSTNAME` for Cloud Run; health check `GET /api/health`. Stateless, containerized; no local disk reliance for session (NextAuth JWT/session store and Redis when configured).
- **Compatibility**: No edits suggested that would break stateless or containerized execution; all fixes are localhost-first (new route, new page, optional client guards).

---

## 4. Error Diagnosis

### 4.1 React Minified Error #310

- **Meaning**: In production builds, React #310 typically corresponds to **"Rendered more hooks than during the previous render"** (hooks order/count change between renders). It can also appear in hydration contexts if the hook count differs between server and client.
- **Relevant areas**:
  - **Root layout** ([src/app/layout.tsx](../src/app/layout.tsx)): Server component; no hooks. Passes children into **PerformanceProviders** ([src/app/components/PerformanceProviders.tsx](../src/app/components/PerformanceProviders.tsx)), which is `'use client'` and wraps children in `<Suspense fallback={<AppSkeleton />}>`. If the **async [locale] layout** ([src/app/[locale]/layout.tsx](../src/app/[locale]/layout.tsx)) suspends on the server but not on the client (or vice versa), the first paint can differ (skeleton vs real content) and contribute to hydration mismatch.
  - **Duplicate providers**: Root uses `Providers` (NextIntlClientProvider + SessionProvider) and **PerformanceProviders**; [locale] layout again uses **NextIntlClientProvider** and **AuthProvider** (SessionProvider). Redundant wrapping could complicate hydration if locale/messages or session differ at boundary.
  - **Conditional hooks**: Any component that calls hooks conditionally or after an early return can trigger #310. ESLint hooks rules are disabled, so such patterns are not flagged.
- **Recommended first step**: Run the app in **development** (`npm run dev` in `tutorme-app`) and reproduce the error to get the **full React message and component stack**. Then search for conditional hook usage or different code paths in the component tree that mounts around the first paint (e.g. layout, PerformanceProviders, AuthProvider, PWAInstallPrompt).

### 4.2 404 on `/api/analytics/web-vitals`

- **Cause**: [src/app/components/PerformanceProviders.tsx](../src/app/components/PerformanceProviders.tsx) uses `useReportWebVitals` and, in production, POSTs to `/api/analytics/web-vitals`. There is **no route** at `src/app/api/analytics/web-vitals/route.ts`. Existing analytics API routes are under `api/analytics/` for students, class, and engagement (e.g. [src/app/api/analytics/students/[studentId]/route.ts](../src/app/api/analytics/students/[studentId]/route.ts)) — no web-vitals handler.
- **Fix (localhost-first)**: Add `src/app/api/analytics/web-vitals/route.ts` with a **POST** handler that accepts the Next.js Web Vitals payload (e.g. `next/web-vitals` metric shape), optionally logs or stores it (or no-op), and returns 200/204. This removes the 404 in production and on localhost if testing with production-like behavior.

### 4.3 404 on `/forgot-password`

- **Cause**: The login page links to `/forgot-password` ([src/app/[locale]/login/page.tsx](../src/app/[locale]/login/page.tsx) line 126). All app routes are under `[locale]` (e.g. `/en/login`). There is **no** `app/[locale]/forgot-password/page.tsx` (and no top-level `forgot-password` segment), so requesting `/forgot-password` (or `/en/forgot-password` without a page) returns 404.
- **Fix (localhost-first)**:
  1. **Add page**: Create `src/app/[locale]/forgot-password/page.tsx` (e.g. a simple "request reset" form that posts to an existing or new auth API, or a placeholder that matches the rest of the app's layout).
  2. **Fix link**: Change the login page link from `href="/forgot-password"` to a locale-aware href (e.g. `href={${localePrefix}/forgot-password}` or use next-intl's `Link`/`usePathname` so the path includes the current locale). That way both direct visits and link navigation work on localhost and in production.

---

## 5. The "Localhost" Rule

All changes will be designed to be **tested on localhost first**:

- New API route: test with `npm run dev` and POST/GET from browser or curl to `http://localhost:3003/api/analytics/web-vitals`.
- New page and link: test at `http://localhost:3003/en/forgot-password` (and other locales) and from the login page.
- Hydration/hooks: verify in dev with React's non-minified errors and no production-only assumptions.

No production-only or Cloud Run–specific changes are required for these fixes.

---

## 6. Diagnostic Plan for Hydration and Missing Routes

**Logic:**

1. **Hydration / #310**
   - Treat #310 as a **hooks order/count** issue until the dev build confirms otherwise. Reproduce in **development** to get the exact message and stack.
   - **Inspect** in order:
     - Root layout → PerformanceProviders → Suspense boundary (does async [locale] layout cause server/client to render different content?).
     - Duplicate NextIntlClientProvider / SessionProvider (root vs [locale] layout); consider removing duplication so a single provider tree wraps the app.
     - Components that use `useSearchParams` or `useParams` without Suspense, or that branch before calling hooks.
   - **Audit** high-traffic or layout-level client components for conditional hooks or early returns before hooks; fix by ensuring hooks are always called in the same order (or by moving conditional UI into children that don't change hook count).
   - **Optional**: Add a minimal `suppressHydrationWarning` only where the docs recommend it (e.g. known client-only content like timestamps) after confirming it's not masking a hooks bug.

2. **Missing `/api/analytics/web-vitals`**
   - **Add** `src/app/api/analytics/web-vitals/route.ts` with POST handler; accept Web Vitals JSON body, return 200/204. Test on localhost with a POST to `http://localhost:3003/api/analytics/web-vitals` (and in prod when deployed).

3. **Missing `/forgot-password`**
   - **Create** `src/app/[locale]/forgot-password/page.tsx` (content can be minimal or full "forgot password" flow).
   - **Update** login page link to use locale-prefixed path (e.g. `/${locale}/forgot-password` or equivalent). Test on localhost for `/en/forgot-password` and from login.

**Execution order:** Implement web-vitals route and forgot-password page/link first (removes 404 noise); then reproduce #310 in dev and apply the hydration/hooks fixes based on the stack trace.

---

## 7. Reference: workflow.ts

The only relevant file named "workflow.ts" is [src/lib/feedback/workflow.ts](../src/lib/feedback/workflow.ts) (feedback workflow and DB). It is **not** involved in the hydration error or the two 404s; no change needed there for this diagnostic plan.
