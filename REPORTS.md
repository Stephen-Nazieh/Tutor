# TutorMe Codebase Review Report

**Date:** February 19, 2025  
**Scope:** Full repository (excluding `doc` folder)  
**Focus:** Architecture, code quality, security, testing, maintainability, and recommendations  

---

## Executive Summary

TutorMe (CogniClass) is a substantial Next.js 16 application with 70+ Prisma models, 131 API route handlers, 70 pages, 105+ components, and a well-structured `lib` layer for AI, payments, security, and database access. The codebase shows solid architectural choices (centralized API middleware, AI orchestrator, Redis/Prisma patterns) and consistent use of `withAuth`/`withCsrf` on sensitive routes. Several areas need improvement: TypeScript strictness is bypassed at build time, one very large page hurts maintainability, rate limiting is in-memory only, and there is no centralized env validation. This report details findings and prioritized recommendations.

---

## 1. Project Structure & Configuration

### 1.1 Findings

| Item | Status | Details |
|------|--------|---------|
| **Next.js config** | ⚠️ | `typescript.ignoreBuildErrors: true` in `next.config.mjs` — builds succeed even with type errors. |
| **tsconfig**       | ⚠️ | `exclude` includes `**/*.test.ts` and `**/*.test.tsx`, so test files are not type-checked by the main TS build. |
| **Port / env**     | ✅ | Default port 3003, `.env.example` and `.env.local` handling in scripts. |
| **Paths**          | ✅ | `@/*` alias used consistently. |
| **Strict mode**    | ✅ | `strict: true` in tsconfig. |

### 1.2 Recommendations

1. **Remove or phase out `ignoreBuildErrors`**  
   - Turn off `typescript.ignoreBuildErrors` and fix existing type errors (or use a dedicated `tsconfig.build.json` that includes tests so tests are type-checked in CI).
2. **Include tests in type-check**  
   - Either remove `**/*.test.ts` from `exclude` or add a separate `npm run typecheck` that uses a config including tests and run it in CI.

---

## 2. Build & Runtime

### 2.1 Findings

- **Custom server** (`server.ts`): Correctly wires Socket.io with the Next.js request handler; error handling returns 500 and logs.
- **CSP**: Both `next.config.mjs` and `middleware.ts` set security headers; CSP allows `'unsafe-inline'` and `'unsafe-eval'` for scripts (documented in middleware as a known limitation; nonces would improve this).
- **Script bug**: In `scripts/initialize.sh` line 60, `$DBPORT` is used instead of `$DB_PORT` (variable undefined; message would show empty port).

### 2.2 Recommendations

1. Fix `scripts/initialize.sh`: use `$DB_PORT` consistently (e.g. line 60).
2. Plan CSP hardening: introduce nonces (or hashes) for scripts and remove `'unsafe-inline'`/`'unsafe-eval'` when feasible.

---

## 3. Database & Caching

### 3.1 Findings

| Area | Assessment |
|------|------------|
| **Prisma**       | Single `datasource` with `DATABASE_URL`; 70+ models; schema is large but coherent. |
| **DB client**    | Singleton Prisma with dev logging; fallback mock when Prisma fails (e.g. at build time). |
| **Redis**        | Lazy init in `lib/db/index.ts`; fallback to in-memory `Map` when `REDIS_URL` is missing or Redis fails. |
| **Cache API**    | `cache.get/set/delete/getOrSet`, `invalidatePattern`; `queryOptimizer.cachedQuery` and `batchLoad` for N+1 prevention. |
| **Read replica** | `readReplica.getClient()` currently returns the primary `db`; replica support is stubbed. |
| **Code quality** | `lib/db/index.ts` uses `any` and `require('@prisma/client')`; eslint disables explicit-any and require-imports at top of file. |

### 3.2 Recommendations

1. **Typing**: Replace `any` in `lib/db/index.ts` with `PrismaClient` and proper types for Redis/cache where possible; avoid disabling eslint for the whole file if possible.
2. **Read replicas**: When scaling, implement real read-replica client selection (e.g. via `DATABASE_READ_REPLICA_URL`) instead of returning the primary client.
3. **Connection pooling**: Document that for production, `DATABASE_URL` should point to PgBouncer (or similar) when using a single Prisma client to avoid connection exhaustion.

---

## 4. API Layer

### 4.1 Route Coverage & Auth

- **~131 route files** under `src/app/api/`.
- **Auth**: Most sensitive routes use `withAuth` (and often `withCsrf` for state-changing methods) from `lib/api/middleware.ts`. Public-by-design routes: `/api/health`, `/api/auth/*`, `/api/payments/webhooks/*`, `/api/csrf`, `/api/curriculums/list` (rate-limited by IP).
- **Admin**: Admin APIs use `requireAdmin(req, Permission)` (and optionally IP whitelist); middleware does not specifically list `/admin` but non-public paths require a token, so admin pages are behind login; role/permission checks are at the API level.
- **Webhooks**: Hitpay/Airwallex webhooks verify signatures and do not use session auth; appropriate.

### 4.2 Middleware & Error Handling

- **`lib/api/middleware.ts`**: Provides `withAuth`, `withCsrf`, `withRateLimit`, `withRateLimitPreset`, `requirePermission`, `requireAdminIp`, `getSessionOrApiKey`; custom errors `UnauthorizedError`, `ForbiddenError`, `ValidationError`, `NotFoundError` map to 401/403/400/404; unknown errors return 500 and hide message in production.
- **Consistency**: Pattern `export const POST = withCsrf(withAuth(async (req, session) => { ... }))` is used consistently on payment and other state-changing endpoints.

### 4.3 Recommendations

1. **Audit remaining routes**: Ensure every route that should be authenticated uses either `withAuth` or an explicit `getServerSession`/`requireAuth` and document any intentionally public endpoints.
2. **OpenAPI/Swagger**: Consider generating or maintaining an OpenAPI spec for the 131 routes to improve onboarding and client generation.

---

## 5. Security

### 5.1 Positive Findings

- **Auth**: NextAuth with JWT (30-day), credentials provider, bcrypt for passwords; failed logins logged via `logFailedLogin`.
- **RBAC**: `lib/security/rbac.ts` and admin `Permissions`; `requireAdmin` and `requirePermission` used on admin routes.
- **CSRF**: State-changing methods protected with `withCsrf`; webhooks and auth excluded.
- **Sanitization**: `lib/security/sanitize.ts` (strip scripts, event handlers, dangerous tags); `sanitizeHtmlWithMax` used in AI chat and similar inputs.
- **Rate limiting**: Middleware rate-limits API (100/min per IP), login preset (stricter); presets for register, payment, enroll, booking.
- **Security headers**: X-Content-Type-Options, X-Frame-Options, Referrer-Policy, CSP set in middleware (and partially in next.config).

### 5.2 Concerns

| Issue | Location | Recommendation |
|-------|----------|----------------|
| **Rate limit store** | `lib/security/rate-limit.ts` | Uses in-memory `Map`; multi-instance deployments will not share limits.         | Use Redis (e.g. key `ratelimit:{preset}:{ip}`) when `REDIS_URL` is set. |
| **CSP**              | next.config + middleware     | `script-src` includes `'unsafe-inline'` and `'unsafe-eval'`.                    | Plan migration to nonces/hashes. |
| **Env validation**   | App startup                  | No centralized check for required env (e.g. `DATABASE_URL`, `NEXTAUTH_SECRET`). | Add a small `lib/env.ts` that validates required vars at startup and fails fast. |
| **PII in AI**        | AGENTS.md                    | Docs say never put real names in AI prompts; implementation should be audited.  | Grep for user names/emails in AI prompt construction and ensure only hashes/ids are used. |

---

## 6. Frontend & Components

### 6.1 Structure

- **Pages**: 70 `page.tsx` files across student, tutor, admin, onboarding, class, payment.
- **Components**: 105+ under `src/components` (ui/, class/, ai-tutor/, gamification/, quiz/, etc.).
- **Large file**: `src/app/tutor/courses/[id]/page.tsx` is **~1,599 lines** — single component with many local state variables, inline handlers, and repeated schedule/slot UI (batch vs course-level schedule blocks are almost duplicated).

### 6.2 Recommendations

1. **Split tutor course page**  
   - Extract sections into components (e.g. `CourseBasicInfo`, `CourseSchedule`, `CourseEnrollments`, `CourseBatches`, `CourseMaterialsSection`) and move shared schedule slot UI into a single `ScheduleSlotEditor` (or similar) to remove duplication.
2. **State**: Consider a small reducer or context for the course page to simplify prop drilling and state updates.
3. **Shared constants**: `DAYS`, `LANGUAGES`, `CURRENCIES`, `GRADE_LEVELS`, `DIFFICULTY_LEVELS` could live in a shared `constants` or `config` module if reused elsewhere.

---

## 7. TypeScript & Code Quality

### 7.1 Findings

- **`any` usage**: Multiple files use `any` or `as any` (e.g. db index, API routes, some components); ~70+ occurrences across `src`.
- **ESLint**: Two `eslint-disable` lines at top of `lib/db/index.ts` for explicit-any and require-imports.
- **Strict**: `strict: true` is on; effectiveness is reduced by `ignoreBuildErrors` and `any` usage.

### 7.2 Recommendations

1. With `ignoreBuildErrors` removed, fix type errors and replace `any` with proper types (Prisma types, shared DTOs, or `unknown` + guards).
2. Prefer shared types for API request/response bodies (e.g. in `lib/validation/schemas.ts` or a dedicated `api/types`) and reuse in routes and clients.

---

## 8. AI Layer

### 8.1 Findings

- **Orchestrator** (`lib/ai/orchestrator.ts`): Fallback chain Ollama → Kimi → Zhipu; optional response cache (Redis/keyed by prompt hash); `MOCK_AI=true` for tests; timeouts and error handling present.
- **Teaching prompts**: Layered (identity, mode, personality, gamification, mission, tier); used in AI tutor chat.
- **Sanitization**: User message length capped and sanitized before sending to AI.

### 8.2 Recommendations

1. **Config**: Consider moving AI timeouts and cache TTL to env or system settings so they can be tuned without code changes.
2. **Observability**: Add lightweight metrics (e.g. provider used, latency, cache hit) for production debugging and cost visibility.

---

## 9. Testing

### 9.1 Current State

- **Unit**: Vitest; `src/**/*.test.{ts,tsx}` and `__tests__/**/*.{test,spec}.{ts,tsx}`; setup in `src/__tests__/setup.ts`; integration tests excluded from main run.
- **Integration**: `vitest.integration.config.ts` for `src/__tests__/integration/**/*.test.ts`; 15s timeout; node environment.
- **E2E**: Playwright; specs under `e2e/` (e.g. ai-tutor, payment, registration, tutor-clinic, tutor-course-config).
- **Co-located tests**: e.g. `api/health/route.test.ts`, `api/curriculums/list/route.test.ts`, `api/curriculums/catalog/route.test.ts`, `api/auth/register/route.test.ts`; `lib/security/rate-limit.test.ts`, `sanitize.test.ts`, `rbac.test.ts`; `components/class/__tests__/hooks.test.ts`.

### 9.2 Gaps

- Unit test coverage is uneven; many API routes and lib modules have no tests.
- E2E specs depend on seeded data (e.g. `E2E_STUDENT_EMAIL` / `E2E_STUDENT_PASSWORD`); no clear contract for test data.
- Integration tests require DB; no mention of a dedicated test DB or CI setup in the reviewed scripts.

### 9.3 Recommendations

1. Add unit tests for critical paths: payment creation, auth register, AI orchestrator fallback, and key security helpers.
2. Document E2E env vars and seed requirements (or use a dedicated test DB and seed script for E2E).
3. In CI, run unit tests without DB; run integration tests with a test database when available.
4. Consider covering the central API middleware (`withAuth`, `withCsrf`, error mapping) with unit tests.

---

## 10. Scripts & DevOps

### 10.1 Findings

- **Scripts**: `initialize.sh`, `setup-db.sh`, `reset.sh`, `studio.sh`, `dev.sh`, `check-db.sh`; Windows variants for some; `data-retention.ts`, `seed-curriculum.ts`, `copy-pdf-worker.js`.
- **Initialize**: Checks Docker, ports, creates Postgres/Redis containers, updates `.env.local`, runs migrations and seed.
- **Typo**: `$DBPORT` in `initialize.sh` (line 60) should be `$DB_PORT`.

### 10.2 Recommendations

1. Fix the `$DB_PORT` typo in `scripts/initialize.sh`.
2. Add a script or docs for running integration tests (and optionally E2E) with a test database (e.g. `tutorme_test`).
3. Ensure production builds do not rely on `ignoreBuildErrors`; consider a pre-build step that runs `prisma generate` and a typecheck.

---

## 11. Dependencies

### 11.1 Notable Points

- **Next 16**, **React 18**, **Prisma 5**, **NextAuth 4**; **Socket.io**, **Daily.co**, **tldraw**, **Yjs** for real-time; **Ollama**, **OpenAI**-compatible usage for AI.
- **Zod 4** for validation; **Tailwind** + **shadcn/ui** (Radix) for UI.
- **Dev**: Vitest, Playwright, ESLint, TypeScript; k6 for load tests.

### 11.2 Recommendations

1. Keep dependencies updated (security and compat); run `npm audit` and address high/critical issues.
2. Lockfile: Ensure `package-lock.json` is committed and CI uses it for reproducible installs.

---

## 12. Summary of Priority Recommendations

| Priority | Item | Action |
|----------|------|--------|
| **P1** | TypeScript build  | Done: `npm run typecheck` added; `ignoreBuildErrors` kept for incremental fix. Run typecheck in CI. |
| **P1** | Script bug        | Done: fixed `$DB_PORT` in `scripts/initialize.sh`. |
| **P2** | Tutor course page | Done: `ScheduleSlotEditor`, `CourseScheduleCard`, `constants.ts`; schedule card added to page. |
| **P2** | Rate limiting     | Done: Redis store in `rate-limit.ts` when `REDIS_URL` is set; fallback in-memory. |
| **P2** | Env validation    | Done: `lib/env.ts` + `validateEnv()` in `server.ts`. |
| **P3** | CSP               | Done: `tutorme-app/CSP-NONCE-PLAN.md` with implementation steps. |
| **P3** | Test coverage     | Done: `auth.test.ts`, `api/middleware.test.ts`, `ai/orchestrator.test.ts`, `payments/factory.test.ts`. |
| **P3** | Types             | Done: `src/types/api.ts` (ApiErrorResponse, ApiSuccessResponse, isApiErrorResponse); Handler context typed in middleware. |
| **P3** | Docs/CI           | Done: `TESTING.md` (E2E/DB requirements); `.github/workflows/ci.yml` (typecheck, lint, unit tests). |

---

## Appendix: Key File Reference

| Purpose | Path |
|---------|------|
| API auth/CSRF/errors                    | `src/lib/api/middleware.ts` |
| DB + cache + queryOptimizer             | `src/lib/db/index.ts` |
| NextAuth config                         | `src/lib/auth.ts` |
| Rate limiting                           | `src/lib/security/rate-limit.ts` |
| AI fallback chain                       | `src/lib/ai/orchestrator.ts` |
| Middleware (auth, rate limit, headers)  | `src/middleware.ts` |
| Custom server + Socket.io               | `server.ts` |
| Large tutor page                        | `src/app/tutor/courses/[id]/page.tsx` |
| Initialize script                       | `scripts/initialize.sh` |
| Shared API types                        | `src/types/api.ts` |
| Testing guide (E2E/DB)                  | `tutorme-app/TESTING.md` |
| CSP nonce plan                          | `tutorme-app/CSP-NONCE-PLAN.md` |

---

*Report generated by automated codebase review. Re-run and expand sections as the codebase evolves.*
