# TutorMe (TutorMekimi) — Comprehensive Code Review

**Scope:** `tutorme-app` (Next.js 16, Drizzle + Prisma, Socket.io, multi-role).  
**Review date:** February 2026.  
**Focus:** Architecture, security, types, tests, performance, maintainability, and operations.

---

## Executive Summary

The codebase is a feature-rich AI–human hybrid tutoring platform with clear separation of roles (Student, Tutor, Parent, Admin), i18n, and a dual database layer (Drizzle as default, Prisma legacy for a few scripts). **Build and typecheck currently fail:** `npm run typecheck` reports **~80+ TypeScript errors** across API routes, libs, and scripts. Test and lint outcomes vary (some tests fail; lint can be slow). Security posture is generally good (rate limiting, auth, CSRF on sensitive endpoints, sandboxed code execution), but there are gaps (CSP still uses `unsafe-inline`/`unsafe-eval`, many files use `@ts-nocheck`). This review recommends fixing type errors and test assertions first, then addressing tech debt, security hardening, and consistency.

---

## 1. Architecture & Structure

### 1.1 Overview

| Item | Count / note |
|------|----------------|
| API route segments (top-level) | 42 |
| API `route.ts` files | ~247 |
| Page routes (`page.tsx`) | ~119 |
| Component directories | 28+ (e.g. admin, ai-tutor, class, gamification, ui) |
| `lib/` subdirs | 30 (db, ai, auth, security, payments, video, whiteboard, etc.) |
| Hooks | 18 (sockets, whiteboard, parent, Daily, etc.) |
| Zustand stores | 2 (live-class, communication) |

**Entry:** Custom server `server.ts` (Next + Socket.io, port 3003), env validated via `lib/env.ts` (`DATABASE_URL`, `NEXTAUTH_SECRET`).

**Routing:** App Router with `[locale]` (next-intl), route groups for student/tutor/parent/admin, and a large `app/api/` surface.

### 1.2 Database Layer

- **Default:** `src/lib/db/index.ts` exports `db` and `cache`; `db` is the **Drizzle** client (from `drizzle.ts`). Prisma is no longer the default.
- **Legacy Prisma:** `prismaLegacyClient` from `lib/db/prisma-legacy.ts` used in: `scripts/seed-gamification.ts`, `scripts/generate-missions.ts`, and one integration test. These reference Prisma-only models (`world`, `dailyQuest`, etc.) that may not exist in the current schema.
- **Migrations:** Drizzle SQL in `drizzle/` applied with `npm run drizzle:migrate`; journal in `drizzle/meta/_journal.json`. Prisma migrations in `prisma/migrations/` applied separately.
- **Recommendation:** Finish migrating or removing scripts that depend on `world`/`dailyQuest`; otherwise document and keep Prisma schema in sync for those models.

### 1.3 Strengths

- Clear feature-based layout under `app/`, `components/`, and `lib/`.
- Central env validation at startup.
- Drizzle migration path and docs (`tutorme-app/docs/MIGRATIONS.md`).
- Start scripts (`tutorme-start.sh`, `scripts/initialize.sh`) run Drizzle migrations and schema sync.

### 1.4 Concerns

- **Dual ORM:** Prisma and Drizzle both in use; schema can drift if only one is updated.
- **Large API surface:** 42 top-level API segments and ~247 route files make consistent auth, validation, and error handling harder to enforce.
- **Very large components:** e.g. `TutorWhiteboardManager.tsx` (2800+ lines); consider splitting by responsibility.

---

## 2. TypeScript & Type Safety

### 2.1 Current State

- **Strict mode:** Enabled in `tsconfig.json` (`"strict": true`).
- **Typecheck:** **Fails** with ~80+ errors. `tsconfig` excludes `**/*.test.ts` / `**/*.test.tsx`, so reported errors are from app/lib/scripts only.

### 2.2 Error Categories

1. **Dynamic route params (`string | string[]`)**  
   Next.js 15+ often exposes `params` as `Promise<{ [key]: string | string[] }>`. Many routes pass `params.id` or `params.sessionId` directly into Drizzle `eq(column, params.id)`, which expects `string`.  
   **Files (examples):** `sessions/[sessionId]/whiteboard/route.ts`, `tutor/classes/[id]/route.ts`, `tutor/courses/[id]/route.ts`, `content/[contentId]/route.ts`, `tutor/courses/[id]/batches/[batchId]/route.ts`, `tutor/courses/[id]/enrollments/[enrollmentId]/route.ts`, `tutor/courses/[id]/materials/*`, `tutor/courses/[id]/schedule/*`.  
   **Fix:** Normalize: `const id = Array.isArray(params.id) ? params.id[0] : params.id` (and guard for undefined) before using in DB.

2. **Handler `context.params` type**  
   Custom `Handler` types expect `context.params?: Promise<{ id?: string }>`, but Next passes `Record<string, string | string[]> | Promise<...>`.  
   **Files:** `content/[contentId]/route.ts`, `content/[contentId]/analytics/route.ts`, `content/[contentId]/watch-events/route.ts`, `tutor/classes/[id]/route.ts`.  
   **Fix:** Align handler type with Next.js types or narrow `params` inside the handler.

3. **Schema vs usage mismatches**  
   - **Poll status:** Route uses `"active" | "draft" | "closed"`; schema expects `"DRAFT" | "ACTIVE" | "CLOSED"` (case).  
   - **AI tutor subscription tier:** Route uses `"BASIC" | "PREMIUM"`; Drizzle schema has `"FREE" | "PRO" | "ELITE"`.  
   - **ZodError:** `class/payment-alert/route.ts` uses `.errors` (should be `.issues` or `.flatten()`).  
   - **Parent dashboard / payments:** Uses `clinic`, `payments`, `payment`, `studentId`, `familyMembers` where Drizzle schema/relations use different names (e.g. `familyMemberships`).  
   - **Hitpay webhook:** Assumes `tutorId` on a type that doesn’t have it.  
   - **Admin audit log:** Uses `timestamp`; schema expects another column name.  
   - **Curriculum insert:** Missing required `isLiveOnline` (and possibly others).  
   - **Notification insert:** Missing `isRead`.  
   - **Tutor revenue:** Select uses `tutorAmount` which doesn’t exist on the table.

4. **Missing or wrong imports**  
   - `lib/ai/task-generator.ts`: uses `db` without importing (should use `drizzleDb` or `db` from `@/lib/db`).  
   - `lib/monitoring/compliance-audit.ts`: same.  
   - `lib/reports/engagement-analytics.ts`: uses Prisma-style `participants`, `_count`; needs Drizzle equivalents.  
   - `lib/financial/parent-financial-service.ts`: uses `payments`/`payment` relations and destructures `and`, `gte`, `lte` incorrectly; needs Drizzle query shape.  
   - `tutor/courses/share/route.ts`: uses `familyMembers`, `sql` without import; and wrong relation name.

5. **Duplicate key / wrong shape**  
   - `conversations/[id]/messages/search/route.ts`: object literal with duplicate property name.  
   - `conversations/upload/route.ts`: property `id` on type `never`.  
   - `lib/admin/auth.ts`: insert object uses `timestamp` (not in schema).  
   - `whiteboards/[id]/export/route.ts`: page type mismatch (e.g. `strokes`).

6. **Implicit `any`**  
   - Several files have parameters with implicit `any` (e.g. `class/payment-alert`, `parent/dashboard`, `tutor/courses/share`, `financial/parent-financial-service.ts`, `reports/engagement-analytics.ts`).

7. **Scripts / Prisma legacy**  
   - `scripts/generate-missions.ts`, `scripts/seed-gamification.ts`: use `prisma.world`, `prisma.dailyQuest`, `MissionWhereInput.worldId`, etc. Prisma client in use may not have these models (or they’re named differently). Either add models to Prisma schema and keep scripts, or migrate scripts to Drizzle and remove Prisma from them.

### 2.3 @ts-nocheck and eslint-disable

- **~40+ files** use `// @ts-nocheck` at the top (auth, whiteboard, stores, security, payments, PWA, Sentry, cache, rate-limit, etc.). This hides type errors and undermines strictness.
- Several files use `/* eslint-disable @typescript-eslint/no-explicit-any */` or similar.
- **Recommendation:** Remove `@ts-nocheck` incrementally per module; fix types and only add targeted `@ts-expect-error` with comments where necessary.

### 2.4 Recommendations

1. **Params normalization:** Add a small helper (e.g. `getParam(params, 'id')`) that returns `string | undefined` from `params.id` (handling array and promise) and use it in all dynamic route handlers.
2. **Fix schema/API contract mismatches:** Align enums (poll status, subscription tier) and relation names (familyMembers vs familyMemberships, payments/payment) between Drizzle schema and API routes/libs.
3. **Fix missing imports:** Ensure `db`/`drizzleDb` and `sql`/`and`/`gte`/`lte` are imported where used; fix Prisma-style code in engagement-analytics and parent-financial-service to use Drizzle.
4. **Resolve scripts:** Either add World/DailyQuest (and related) to Prisma schema and keep scripts on Prisma, or migrate scripts to Drizzle and drop Prisma from them.
5. **Re-enable typecheck in CI:** After fixing the above, run `npm run typecheck` in CI and keep the codebase green.

---

## 3. Security

### 3.1 Authentication & Authorization

- **NextAuth:** JWT strategy, credentials provider, role and TOS/onboarding on token. Session callback exposes `role`, `id`, `onboardingComplete`, `tosAccepted`.
- **Middleware:** `withAuth` protects non-public paths; public paths include `/`, `/login`, `/register`, `/api/auth`, `/api/health`, `/api/csrf`, `/api/public`, `/onboarding`, locale-prefixed admin login/admin routes, and public tutor profile `/u/[username]`.
- **Role checks:** Student/tutor/parent routes redirect to login or role-specific dashboard; TOS not accepted redirects to `/student/agreement`.
- **API routes:** Many routes use `getServerSession(authOptions)` and return 401/403 when unauthenticated or unauthorized; consistency varies (some routes may lack explicit role checks for sensitive actions).

### 3.2 Rate Limiting

- **Login:** Stricter limit (e.g. 5 per 15 minutes) via `checkRateLimitPreset(..., 'login')` for POST to signin.
- **API:** 100 requests/minute per client (by IP or identifier), excluding `/api/auth`, `/api/health`, `/api/payments/webhooks`.
- **Code run:** `/api/code/run` uses `withRateLimit(req, 30)`.

### 3.3 Input Validation

- **Zod:** Used in many API routes for body/query (~50+ files); shared schemas in `lib/validation/`.
- **Code execution:** `/api/code/run` validates `language` (enum) and `code` (length 1–16KB) via Zod; auth and CSRF required.

### 3.4 Code Execution Sandbox

- **Location:** `lib/code-runner/sandbox.ts`; called from `app/api/code/run/route.ts`.
- **Mechanism:** `child_process.spawn('docker', args)` with fixed image names (`python:3.11-slim`, `node:20-slim`); user input is only the code string, passed via stdin. No user-controlled image name or shell.
- **Limits:** 16KB code, 15s timeout, 128MB memory, 0.5 CPU, `--network=none`, `--read-only`, `--security-opt=no-new-privileges`.
- **Risk:** Code is executed inside the container (Python `exec`, Node `eval`). Mitigations: no network, resource limits, timeout. Consider additional hardening (e.g. dedicated user, read-only filesystem already in place).

### 3.5 Security Headers & CSP

- **Middleware and next.config:** Set `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, and Content-Security-Policy.
- **CSP:** Includes `script-src 'self' 'unsafe-inline' 'unsafe-eval'` (required by current Next.js setup but weakens XSS protection). Middleware comment notes future use of nonces.
- **Recommendation:** Plan migration to CSP nonces (or strict script hashes) when Next.js tooling allows, and avoid long-term reliance on `unsafe-eval`.

### 3.6 Secrets & Environment

- **No hardcoded API keys** in repo; keys read from `process.env`.
- **CSRF:** `lib/security/csrf.ts` uses `NEXTAUTH_SECRET` or fallback; fallback secret should not be used in production.
- **Env validation:** Only `DATABASE_URL` and `NEXTAUTH_SECRET` are required at startup; consider requiring critical keys (e.g. payment, AI) in production.

### 3.7 SQL and Injection

- **Drizzle:** Queries use parameterized APIs; `sql` template usage should pass bound values, not concatenate user input. Review any `sql\`...${userInput}\`` patterns (none obviously found in the sampled routes).

---

## 4. Testing

### 4.1 Setup

- **Unit:** Vitest (`vitest.config.ts`), jsdom, setup in `src/__tests__/setup.ts`; includes `src/**/*.test.{ts,tsx}` and `__tests__/**`; excludes integration and accessibility.
- **Integration:** `vitest.integration.config.ts`, node env, `src/__tests__/integration/**/*.test.ts`.
- **E2E:** Playwright, `e2e/**/*.spec.ts` and `src/__tests__/accessibility/**`, base URL 3003.

### 4.2 Known Issues (from prior review)

- **Rate limit tests:** Expect `"1.2.3.4"` or `"unknown"`, but implementation returns hashed identifiers (e.g. `"unknown:b3e1b807"`). Update expectations to match current behavior.
- **Admin register test:** Expects 403; API returns 400 for bootstrap-closed case. Align test with actual contract.

### 4.3 Recommendations

- Run `npm run test` and `npm run test:integration` regularly; fix the failing tests above so CI is green.
- Add `.eslintignore` (or equivalent) for `playwright-report/` and other large artifacts to speed up lint.
- Consider increasing coverage for critical paths (auth, payments, code run, parent/student data access).

---

## 5. Linting & Code Quality

### 5.1 ESLint

- **Config:** `eslint.config.mjs` (flat config). Lint can be slow if it includes trace/playwright-report directories.
- **Known issues:** Conditional `useMemo` in `LiveTopologyGlobe.tsx`; `useMemo` with `JSON.stringify(data)`/`JSON.stringify(options)` in `lib/performance/optimization.tsx` (React compiler / dependency-array concerns). Fix hook usage and add appropriate ignore paths.

### 5.2 TODOs in Code

- **7 TODO comments** (e.g. store feed token in DB, implement error analytics, curriculum tutorId check, TTS voice, navigate to classroom). Track and resolve or document.

### 5.3 Consistency

- **API responses:** Standardize success/error shape (e.g. `{ data }` vs `{ ...fields }`, `{ error, details? }` for errors).
- **RBAC:** Ensure every sensitive route explicitly checks role or ownership (e.g. parent can only see own students); add a checklist or shared helper for new routes.

---

## 6. Performance & Operations

### 6.1 Database

- **Connections:** Direct Postgres (e.g. 5432) and PgBouncer (5433); Drizzle migrator uses `DIRECT_URL` or `DATABASE_URL`.
- **Caching:** Redis used for cache and real-time state; `cache.getOrSet` pattern in `lib/db`.
- **N+1:** Not audited in this review; consider auditing high-traffic list/detail routes for N+1 and adding batching or joins.

### 6.2 Frontend

- **Bundle:** `optimizePackageImports` for lucide-react, recharts, framer-motion.
- **Images:** Remote patterns for https and localhost.

### 6.3 Scripts & DevOps

- **Start:** `tutorme-start.sh` and `scripts/initialize.sh` run DB, Drizzle migrations, schema push, Prisma generate, seeds, and dev server. Good for local onboarding.
- **Docker:** docker-compose for db, pgbouncer, redis; healthcheck uses `postgres` user while `POSTGRES_USER` may be `tutorme`—align for correctness.

---

## 7. Documentation & Maintainability

### 7.1 Strengths

- **AGENTS.md** at repo root: stack, structure, commands, env, conventions, troubleshooting.
- **tutorme-app/docs/MIGRATIONS.md:** How to apply Drizzle migrations.
- **docs/DATABASE_SYSTEM_FINDINGS.md:** DB architecture, Drizzle vs Prisma, connection topology.

### 7.2 Gaps

- API surface (42 segments) is not fully documented in one place; OpenAPI or a route index would help.
- Some complex flows (e.g. whiteboard sync, live class state) would benefit from short design notes.

---

## 8. Dependency & Environment

### 8.1 Peer Dependencies (from prior review)

- **React 18 vs 19:** `@react-three/drei` may request React 19 while the app uses React 18; install can require `npm install --legacy-peer-deps`. Resolve by pinning compatible versions or upgrading React and testing.

### 8.2 Prisma Version

- **Package:** `@prisma/client@^5.22.0`. Ensure CLI and CI use the same major version (e.g. `npx prisma@5`) to avoid schema validation differences (e.g. v7 vs v5).

---

## 9. Priority Recommendations

### P0 (Blocking / High impact)

1. **Fix TypeScript errors** so `npm run typecheck` passes: params normalization, schema/enum/relation alignment, missing imports, and Prisma-only scripts.
2. **Fix failing unit tests** (rate limit identifier expectations, admin register status code).
3. **Remove or fix scripts** that use `prisma.world` / `prisma.dailyQuest` (either add models to Prisma or migrate to Drizzle).

### P1 (Important)

4. **Reduce @ts-nocheck** usage: start with auth, db, and security modules; add proper types.
5. **Harden CSP** when feasible: move toward nonces or hashes for scripts.
6. **ESLint:** Ignore playwright-report and fix conditional hooks / useMemo dependency arrays.
7. **API consistency:** Normalize dynamic `params` (single helper) and document RBAC expectations for new routes.

### P2 (Improvement)

8. **Split very large components** (e.g. TutorWhiteboardManager) into smaller pieces.
9. **Document API** (OpenAPI or route list) and critical flows.
10. **Resolve React/drei peer dependency** and lock install so `npm install` works without `--legacy-peer-deps`.

---

## 10. Summary Table

| Area | Status | Notes |
|------|--------|--------|
| Architecture | ✅ Structured | Dual ORM and large API surface need ongoing care |
| TypeScript | ❌ Failing | ~80+ errors; params, schema, imports, scripts |
| Security | ✅ Good base | Auth, rate limit, CSRF, sandbox; CSP weak |
| Tests | ⚠️ Partial | Some failures; fix assertions and CI |
| Linting | ⚠️ Partial | Slow if not ignoring reports; hook violations |
| DB / Migrations | ✅ Documented | Drizzle default; migrations in start scripts |
| Docs | ✅ Useful | AGENTS.md, MIGRATIONS.md, DATABASE_SYSTEM_FINDINGS |
| Dependencies | ⚠️ Peer issues | React/drei; Prisma version alignment |

This review should be used as a living checklist; re-run typecheck and tests after each batch of fixes and update the document as the codebase evolves.
