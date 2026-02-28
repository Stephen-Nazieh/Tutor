# TutorMe Repository Code Review (2026-02-28)

## Scope and Method

I reviewed the repository with a backend-first focus (auth, API wiring, socket layer, data layer, admin surface), then validated with static and runtime checks.

### Checks run

- `npm run typecheck` -> **failed** with **154 TypeScript errors**
- `npm run lint` -> passed with 1 warning (`react-hooks/incompatible-library`)
- `npm run test` -> passed (98 passed / 17 skipped)
- `npm run test:integration` -> failed (database/env not ready in local run)
- `rg -n "\bdebugger\b" src` -> no debugger/breakpoint statements found

### Current status after remediation batches

- `npm run typecheck` -> **passed** (0 errors)
- `npm run test -- --reporter=dot` -> **passed** (24 files, 126 tests, 0 skipped)
- `npm run lint` -> **passed** with 1 existing warning (`src/lib/performance/optimization.tsx:70`, `react-hooks/incompatible-library`)
- `npm run test src/components/class/__tests__/hooks.test.ts --reporter=dot` -> **passed** (18/18)

---

## Findings (prioritized)

## Critical

### 1) Middleware auth bypass + locale role protection gaps

**Evidence**
- `src/middleware.ts:158` includes `'/'` inside `publicPaths`.
- `src/middleware.ts:177` uses `pathname.startsWith(p)`, so every path matches `'/'`.
- `src/middleware.ts:114`, `src/middleware.ts:119`, `src/middleware.ts:124` protect only non-locale paths (`/student`, `/tutor`, `/parent`), not locale-prefixed routes like `/en/student/...`.

**Impact**
- `authorized()` effectively returns true for almost all routes.
- Locale-prefixed dashboards/routes can bypass role gating in middleware.
- Security depends on page-level checks that are not guaranteed everywhere.

**Recommendation**
- Remove `'/'` from prefix-based public matching. Use exact match for root.
- Normalize locale-aware path segments before role checks.
- Add middleware tests for unauthenticated access to `/en/student/*`, `/en/tutor/*`, `/en/parent/*`.

---

### 2) Admin login issues admin session to non-admin users

**Evidence**
- `src/app/api/admin/auth/login/route.ts:112` loads admin assignments, but no explicit rejection when assignments are empty and role is non-admin.
- `src/app/api/admin/auth/login/route.ts:120` always creates admin session token for any valid credentials.

**Impact**
- Any valid platform user can receive `admin_session` cookie.
- Permission checks still block many actions, but this is a privilege-boundary violation and increases blast radius if any admin endpoint has weak checks.

**Recommendation**
- Require active admin assignment (or strict `role === 'ADMIN'`) before calling `createAdminSession`.
- Return 403 for non-admin users and log denied admin-login attempts.

---

## High

### 3) Auth/session typing is broken; type safety collapse across API layer

**Evidence**
- `src/lib/auth.ts:171` references undefined symbol `getServerSessionInternal`.
- `src/lib/auth.ts:93` returns `null` from session callback (invalid for NextAuth callback type).
- `src/lib/auth.ts:189` performs arithmetic on `token.exp` without narrowing.
- `npm run typecheck` reports **154 errors**, many cascading to `session.user` access.

**Impact**
- CI/type safety is currently broken.
- Real defects are hidden by type noise.
- High regression risk for auth-protected APIs.

**Recommendation**
- Fix `src/lib/auth.ts` return types first (explicit `Promise<Session | null>` helpers, valid callback signatures).
- Re-run typecheck and then resolve remaining API compile errors in batches.

---

### 4) Runtime 500s from undefined request variables in route handlers

**Evidence**
- `src/app/api/curriculums/[curriculumId]/route.ts:95` uses `req` but function arg is `_req`.
- `src/app/api/polls/[pollId]/route.ts:19`, `:83`, `:168` use undefined `req`.
- `src/app/api/student/resources/route.ts:23` uses undefined `req` in zero-arg GET.
- `src/app/api/student/assignments/[taskId]/upload/route.ts:27` uses undefined `req`.
- `src/app/api/student/reviews/route.ts:45` uses `request` in zero-arg GET.

**Impact**
- These endpoints throw `ReferenceError` at runtime.
- Several student/tutor workflows will return 500 instead of expected auth/data behavior.

**Recommendation**
- Standardize route signatures (`GET(req: NextRequest, context)`) and pass the same identifier to `getServerSession`.
- Add a lint rule or custom codemod check for `getServerSession(authOptions, req|request)` identifier mismatch.

---

### 5) ORM wiring mismatch (Drizzle default, Prisma-style calls in runtime paths)

**Evidence**
- `src/lib/db/index.ts:88-93` sets `db = drizzleDb` as default export.
- `src/lib/api/middleware.ts:116` calls `db.user.findUnique(...)` (Prisma API shape).
- `src/app/api/payments/chinese-gateways/route.ts:45` calls `m.db.user.findUnique(...)`.
- `src/app/api/tutor/courses/[id]/pitch/route.ts:60`, `:167`, `:201`, `:221` call `db.curriculum.findUnique/update(...)`.

**Impact**
- These code paths can crash with `TypeError` at runtime.
- Affected flows include role fallback checks, Chinese payments, and tutor course pitch generation/editing.

**Recommendation**
- For Prisma-style code, explicitly import `prismaLegacyClient`.
- For Drizzle paths, rewrite queries to Drizzle syntax.
- Do not use ambiguous `db` for mixed ORM shapes.

---

### 6) Socket protections are partially wired and observability helpers are stale

**Evidence**
- `src/lib/socket-server-enhanced.ts:398-399` applies `rateLimitMiddleware` via `io.use(...)` (connect-time only).
- `src/lib/socket-server-enhanced.ts:333-340` rate limiter checks only `socket.id` during handshake, not per event.
- `src/lib/socket-server-enhanced.ts:146` defines `userSocketMap`, but no `set(...)` on connect/join; only delete on disconnect at `:482`.

**Impact**
- Event-level flood control is ineffective.
- Presence helpers (`isUserOnline`, `getUserSocketId`) are unreliable.

**Recommendation**
- Add per-event guard wrapper for high-frequency events.
- Set `userSocketMap` immediately on authenticated connection (and update on reconnect/join).
- Add socket load tests for rate-limiting behavior.

---

## Medium

### 7) Socket env behavior is contradictory (Redis mandatory vs optional fallback)

**Evidence**
- `src/lib/socket-server-enhanced.ts:49` requires `REDIS_URL` in `validateEnv()`.
- `src/lib/socket-server-enhanced.ts:350-352` claims Redis can be disabled if missing.

**Impact**
- Startup behavior is confusing; local/degraded mode can fail unexpectedly.

**Recommendation**
- Decide one policy: hard-required Redis or optional Redis.
- Align validation and runtime behavior accordingly.

---

### 8) Infrastructure information disclosure via public AI status endpoint

**Evidence**
- `src/app/api/ai/status/route.ts` has no auth and returns provider availability + timestamps.

**Impact**
- Exposes internal provider footprint and readiness to anonymous callers.

**Recommendation**
- Restrict to admin/tutor roles, or return only coarse health signal.

---

### 9) Test suite has gaps relative to current backend wiring

**Evidence**
- `src/app/api/curriculums/list/route.test.ts:34` is `describe.skip` and still mocks Prisma-style API.
- `npm run test` shows 17 skipped tests.
- `npm run test:integration` fails due DB/env mismatch (`localhost:5433`, missing DB URL in one suite).

**Impact**
- Critical routing/auth/data regressions can ship undetected.

**Recommendation**
- Unskip and rewrite skipped route tests to Drizzle-backed mocks.
- Add an integration test profile with deterministic local DB bootstrapping.

---

## Implementation Plan

## Phase 0 (Immediate: 1-2 days)

1. Fix critical auth boundary issues:
   - Patch `src/middleware.ts` public path logic and locale-aware role checks.
   - Enforce admin entitlement in `src/app/api/admin/auth/login/route.ts` before session issuance.
2. Fix runtime route crashes:
   - Correct request variable mismatches in the 5 broken routes.
3. Add hotfix tests:
   - Middleware unauthorized access tests for locale routes.
   - Admin login non-admin rejection test.

## Phase 1 (Stability: 2-4 days)

1. Restore type health:
   - Fix `src/lib/auth.ts` callback and session helper typings.
   - Drive `npm run typecheck` to zero.
2. Resolve ORM mismatches in runtime code:
   - Convert affected routes/middleware to Drizzle or explicit `prismaLegacyClient` usage.
3. Add CI gate:
   - Block merges on `typecheck` failure.

## Phase 2 (Backend hardening: 3-5 days)

1. Socket hardening:
   - Implement per-event rate limiting.
   - Populate and validate `userSocketMap` lifecycle.
   - Clarify Redis requirement policy.
2. Security tightening:
   - Restrict `/api/ai/status` visibility.
   - Review all `/api/admin/*` endpoints for explicit auth checks.

## Phase 3 (Quality and regression prevention: 3-5 days)

1. Testing refresh:
   - Unskip outdated route tests and migrate to Drizzle-compatible mocks.
   - Add integration test bootstrap script (DB + env preflight).
2. Static guardrails:
   - Add lint/check for route param name mismatch (`req/request`) with `getServerSession` usage.
   - Add grep-based CI check for legacy Prisma API calls against `@/lib/db`.

---

## Suggested Work Breakdown (tickets)

- **SEC-001:** Middleware public path bypass and locale role protection fix
- **SEC-002:** Admin login entitlement enforcement
- **AUTH-001:** `src/lib/auth.ts` type + callback contract repair
- **API-001:** Fix undefined request identifiers in API routes
- **DB-001:** Remove Prisma-style calls from `@/lib/db` runtime paths
- **SOCKET-001:** Event-level rate limiting + presence map correctness
- **TEST-001:** Unskip/migrate broken route tests and add auth regression tests

---

## Progress update (Batch: 2026-02-28, continued fixes)

### Completed in this batch

1. **Hook stale-state race fixes**
   - Updated `src/components/class/hooks/useCanvasDrawing.ts` to use a ref-backed drawing flag, preventing same-tick start/continue/end races from dropping strokes.
   - Updated `src/components/class/hooks/useTextEditor.ts` to synchronize overlay state via a ref-backed setter so update+confirm in the same event loop is deterministic.
   - Result: `src/components/class/__tests__/hooks.test.ts` is fully active and green.

2. **Dynamic route param hardening (removed unsafe casts / fragile extraction)**
   - Replaced direct casts and `context as any` parameter access with `getParamAsync(context?.params, ...)` in:
     - `src/app/api/tutor/quizzes/[id]/route.ts`
     - `src/app/api/tutor/resources/[id]/route.ts`
     - `src/app/api/tutor/resources/[id]/share/route.ts`
     - `src/app/api/tutor/resources/[id]/download/route.ts`
     - `src/app/api/tutor/calendar/events/[id]/route.ts`
     - `src/app/api/content/[contentId]/quiz-skip/route.ts`
     - `src/app/api/whiteboards/[id]/export/route.ts`
   - Added explicit 400 responses for missing dynamic IDs to prevent accidental empty-ID queries.

3. **Runtime consistency cleanup**
   - `src/app/api/content/[contentId]/quiz-skip/route.ts` now uses `randomUUID()` from `crypto` import for explicit runtime compatibility and type safety.

### Validation after this batch

- `npm run typecheck` -> passed
- `npm run test -- --reporter=dot` -> passed
- `npm run lint` -> passed with one existing warning (unchanged)

---

## Progress update (Batch: 2026-02-28, API hardening continuation)

### Completed in this batch

1. **Removed all `context: any` / `(context as any)` usage under `src/app/api`**
   - Dynamic route handlers now use typed context signatures and `getParamAsync(context?.params, '<param>')`.
   - Added explicit 400 responses for missing route IDs instead of passing `undefined` into data-access calls.
   - Verification: `rg -n "context\\s*:\\s*any|\\(context\\s+as\\s+any\\)" src/app/api` now returns no matches.

2. **High-churn route families hardened**
   - Analytics/report endpoints:
     - `src/app/api/analytics/class/[classId]/route.ts`
     - `src/app/api/analytics/engagement/[classId]/route.ts`
     - `src/app/api/analytics/students/[studentId]/route.ts`
     - `src/app/api/reports/class/[classId]/route.ts`
     - `src/app/api/reports/class/[classId]/export/route.ts`
     - `src/app/api/reports/engagement/[classId]/route.ts`
     - `src/app/api/reports/students/[studentId]/route.ts`
     - `src/app/api/reports/students/[studentId]/export/route.ts`
   - Classroom/curriculum/student surfaces:
     - `src/app/api/class/rooms/[id]/join/route.ts`
     - `src/app/api/classes/[id]/route.ts`
     - `src/app/api/curriculum/[curriculumId]/route.ts`
     - `src/app/api/curriculum/[curriculumId]/enroll/route.ts`
     - `src/app/api/curriculum/lessons/[lessonId]/route.ts`
     - `src/app/api/curriculum/lessons/[lessonId]/session/route.ts`
     - `src/app/api/student/assignments/[taskId]/route.ts`
     - `src/app/api/student/assignments/[taskId]/upload/route.ts`
     - `src/app/api/student/subjects/[subjectCode]/route.ts`
   - Admin/parent/polls surfaces:
     - `src/app/api/admin/api-keys/[id]/route.ts`
     - `src/app/api/parent/courses/[id]/route.ts`
     - `src/app/api/polls/[pollId]/route.ts`
     - `src/app/api/polls/[pollId]/vote/route.ts`
     - `src/app/api/notifications/[id]/route.ts`

3. **Auth/request consistency cleanup**
   - `src/app/api/parent/courses/[id]/route.ts` now uses `getServerSession(authOptions, req)` (request-aware session resolution) and normalized params extraction.

### Validation after this batch

- `npm run typecheck` -> passed
- `npm run test -- --reporter=dot` -> passed (24 files, 126 tests)
- `npm run lint` -> passed with one existing warning in `src/lib/performance/optimization.tsx:70`

---

## Progress update (Batch: 2026-02-28, collaborative whiteboard backend hardening)

### Completed in this batch

1. **Closed cross-whiteboard page mutation gaps**
   - Updated `src/app/api/whiteboards/[id]/pages/[pageId]/route.ts`:
     - PUT now verifies `pageId` belongs to `whiteboardId` before update.
     - DELETE now verifies `pageId` belongs to `whiteboardId` before delete.
     - Update/delete/select operations now scope by both `pageId` and `whiteboardId`.
   - Impact:
     - Prevents unauthorized updates/deletes of pages from a different whiteboard when an ID is guessed.

2. **Hardened page reorder endpoint against foreign page IDs**
   - Updated `src/app/api/whiteboards/[id]/pages/route.ts`:
     - Validates each `pageOrders` entry (`id` + finite numeric `order`).
     - Rejects duplicate IDs.
     - Confirms all supplied page IDs belong to target whiteboard before transaction.
     - Reorder updates now use scoped where clause (`id` + `whiteboardId`).
   - Impact:
     - Blocks cross-board reorder writes and malformed payload abuse.

3. **Fixed student self-access regression for private boards**
   - Updated `src/app/api/sessions/[sessionId]/whiteboard/[studentId]/route.ts`:
     - Students can now fetch their own whiteboard even when visibility is `private`.
     - Non-owner students are still blocked unless board visibility is `public`.

4. **Normalized collaborative whiteboard metadata wiring**
   - Updated `src/app/api/whiteboards/route.ts`:
     - `ownerType` now writes as `tutor` (lowercase), matching live-class routes and frontend expectations.
   - Updated `src/app/api/sessions/[sessionId]/whiteboard/route.ts`:
     - PATCH visibility schema now accepts `tutor-only` to align with collaborative visibility model.

5. **Narrowed whiteboard save parent update scope**
   - Updated `src/app/api/sessions/[sessionId]/whiteboard/save/route.ts`:
     - Parent whiteboard `updatedAt` touch now targets the resolved board by `wb.id` (not every board matching `sessionId + tutorId`).

6. **Added regression tests for collaborative whiteboard boundaries**
   - New files:
     - `src/app/api/whiteboards/[id]/pages/route.test.ts`
     - `src/app/api/whiteboards/[id]/pages/[pageId]/route.test.ts`
     - `src/app/api/sessions/[sessionId]/whiteboard/[studentId]/route.test.ts`
   - Covered behavior:
     - reorder rejects foreign page IDs (`400`) and skips transaction.
     - page PUT/DELETE reject page IDs outside target whiteboard (`404`).
     - student can access own private board (`200`) but cannot access another student's private board (`403`).

### Validation after this batch

- Focused tests:
  - `npm run test -- src/app/api/whiteboards/[id]/pages/route.test.ts src/app/api/whiteboards/[id]/pages/[pageId]/route.test.ts src/app/api/sessions/[sessionId]/whiteboard/[studentId]/route.test.ts --reporter=dot` -> passed
- Full checks:
  - `npm run test -- --reporter=dot` -> passed (50 files, 195 tests)
  - `npm run typecheck` -> passed
  - `npm run lint` -> passed with one existing warning in `src/lib/performance/optimization.tsx:70`

---

## Progress update (Batch: 2026-02-28, LLM admin wiring hardening)

### Completed in this batch

1. **Prevented default-provider reset on invalid provider PATCH**
   - Updated `src/app/api/admin/llm/providers/route.ts`:
     - PATCH now verifies provider existence before any default-reset mutation.
     - If provider ID does not exist, returns `404` early and avoids touching existing defaults.
     - Response/log payload now safely falls back to the preloaded provider when post-update reload is empty.

2. **Hardened LLM routing rule model validation**
   - Updated `src/app/api/admin/llm/routing/route.ts`:
     - POST now returns `400` when `targetModelId` is invalid (instead of creating a rule with empty `providerId`).
     - POST now validates `fallbackModelId` when provided.
     - PATCH now validates `targetModelId` when changed and updates `providerId` to match the new target model.
     - PATCH now validates `fallbackModelId` when provided.

3. **Added behavior tests for backend wiring paths (not just guards)**
   - New files:
     - `src/app/api/admin/llm/providers/route.behavior.test.ts`
     - `src/app/api/admin/llm/routing/route.behavior.test.ts`
   - Covered behavior:
     - provider PATCH returns `404` and does not mutate defaults for unknown provider IDs.
     - provider PATCH success path returns masked API key and logs action.
     - routing POST rejects unknown target models.
     - routing PATCH rejects unknown target models.
     - routing PATCH rewires `providerId` when `targetModelId` changes.

### Validation after this batch

- Focused tests:
  - `npm run test -- src/app/api/admin/llm/providers/route.behavior.test.ts src/app/api/admin/llm/routing/route.behavior.test.ts --reporter=dot` -> passed
- Full checks:
  - `npm run test -- --reporter=dot` -> passed (47 files, 190 tests)
  - `npm run typecheck` -> passed
  - `npm run lint` -> passed with one existing warning in `src/lib/performance/optimization.tsx:70`

---

## Progress update (Batch: 2026-02-28, admin guard coverage expansion)

### Completed in this batch

1. **Added admin route guard tests (payments + webhooks + key management)**
   - New files:
     - `src/app/api/admin/payments/route.test.ts`
     - `src/app/api/admin/webhook-events/route.test.ts`
     - `src/app/api/admin/api-keys/route.test.ts`
   - Covered behavior:
     - unauthenticated access -> 401
     - admin IP guard short-circuit response
     - permission guard short-circuit response
     - key list and key create success flows (mocked key service)
     - invalid sanitized key name -> 400

2. **Strengthened admin boundary test matrix**
   - Together with previous batches (`auth/login`, `auth/bridge`, `api-keys/[id]`, `geolocation`), admin guard flow now has substantially broader regression coverage.

### Validation after this batch

- Focused tests:
  - `npm run test -- src/app/api/admin/api-keys/route.test.ts src/app/api/admin/payments/route.test.ts src/app/api/admin/webhook-events/route.test.ts --reporter=dot` -> passed
- Full checks:
  - `npm run test -- --reporter=dot` -> passed (39 files, 169 tests)
  - `npm run typecheck` -> passed
  - `npm run lint` -> passed with one existing warning in `src/lib/performance/optimization.tsx:70`

---

## Progress update (Batch: 2026-02-28, admin analytics/settings/LLM guard tests)

### Completed in this batch

1. **Added admin settings guard tests**
   - New file:
     - `src/app/api/admin/settings/route.test.ts`
   - Covers:
     - `requireAdmin` unauthorized short-circuit on GET.
     - POST validation failure (`category/key/value` required) -> 400.

2. **Added admin feature flags guard tests**
   - New file:
     - `src/app/api/admin/feature-flags/route.test.ts`
   - Covers:
     - unauthorized short-circuit on GET.
     - POST validation (`key` + `name`) -> 400.
     - DELETE validation (`id` query param required) -> 400.

3. **Added admin LLM management guard tests**
   - New files:
     - `src/app/api/admin/llm/providers/route.test.ts`
     - `src/app/api/admin/llm/routing/route.test.ts`
   - Covers:
     - unauthorized short-circuit on GET.
     - POST validation failures for required fields.
     - PATCH/DELETE validation failures for missing IDs.

4. **Added admin analytics guard tests**
   - New files:
     - `src/app/api/admin/analytics/overview/route.test.ts`
     - `src/app/api/admin/analytics/topology/route.test.ts`
   - Covers:
     - unauthorized short-circuit behavior from `requireAdmin`.

### Validation after this batch

- Focused tests:
  - `npm run test -- src/app/api/admin/settings/route.test.ts src/app/api/admin/feature-flags/route.test.ts src/app/api/admin/llm/providers/route.test.ts src/app/api/admin/llm/routing/route.test.ts src/app/api/admin/analytics/overview/route.test.ts src/app/api/admin/analytics/topology/route.test.ts --reporter=dot` -> passed
- Full checks:
  - `npm run test -- --reporter=dot` -> passed (45 files, 182 tests)
  - `npm run typecheck` -> passed
  - `npm run lint` -> passed with one existing warning in `src/lib/performance/optimization.tsx:70`

---

## Progress update (Batch: 2026-02-28, geolocation validation hardening)

### Completed in this batch

1. **Hardened IP validation and private-range detection**
   - Updated `src/app/api/admin/geolocation/route.ts`:
     - Added strict IPv4 parsing (`0-255` octets) instead of loose regex.
     - Corrected private-range handling to RFC1918 (`10/8`, `172.16/12`, `192.168/16`) + loopback.
     - Prevented false private classification for public ranges like `172.15.x.x`.

2. **Improved batch API input safety**
   - Batch POST now validates all IPs before processing.
   - Returns `400` with `invalidIps` list when malformed IPs are supplied.

3. **Added cache safety guard**
   - Added bounded in-memory geolocation cache (`MAX_GEO_CACHE_ENTRIES`) with oldest-entry eviction to avoid unbounded growth.

4. **Expanded geolocation tests**
   - Updated `src/app/api/admin/geolocation/route.test.ts` to cover:
     - invalid octet rejection (`999.1.1.1`).
     - RFC1918 boundary behavior (`172.20` private vs `172.15` public/fetch path).
     - batch invalid-ip response payload with `invalidIps`.

### Validation after this batch

- Focused tests:
  - `npm run test -- src/app/api/admin/geolocation/route.test.ts --reporter=dot` -> passed
- Full checks:
  - `npm run test -- --reporter=dot` -> passed (45 files, 185 tests)
  - `npm run typecheck` -> passed
  - `npm run lint` -> passed with one existing warning in `src/lib/performance/optimization.tsx:70`

---

## Progress update (Batch: 2026-02-28, regression test expansion)

### Completed in this batch

1. **Added regression tests for newly hardened dynamic routes**
   - Expanded poll detail tests with missing-param assertions:
     - `src/app/api/polls/[pollId]/route.test.ts`
   - Added poll vote guard tests:
     - `src/app/api/polls/[pollId]/vote/route.test.ts`
   - Added conversation messages guard tests:
     - `src/app/api/conversations/[id]/messages/route.test.ts`
   - Added student quiz detail guard tests:
     - `src/app/api/student/quizzes/[id]/route.test.ts`

2. **Covered key failure modes**
   - Unauthenticated requests return 401.
   - Missing required route params return 400 with stable error payloads.
   - This locks in the param-normalization and auth-guard behavior introduced in earlier batches.

### Validation after this batch

- Focused tests:
  - `npm run test -- src/app/api/polls/[pollId]/route.test.ts src/app/api/polls/[pollId]/vote/route.test.ts src/app/api/conversations/[id]/messages/route.test.ts src/app/api/student/quizzes/[id]/route.test.ts --reporter=dot` -> passed
- Full checks:
  - `npm run test -- --reporter=dot` -> passed (27 files, 136 tests)
  - `npm run typecheck` -> passed
  - `npm run lint` -> passed with one existing warning in `src/lib/performance/optimization.tsx:70`

---

## Progress update (Batch: 2026-02-28, regression coverage continuation)

### Completed in this batch

1. **Added guard tests for additional normalized routes**
   - New tests:
     - `src/app/api/reports/class/[classId]/route.test.ts`
     - `src/app/api/reports/students/[studentId]/route.test.ts`
     - `src/app/api/curriculum/[curriculumId]/route.test.ts`
     - `src/app/api/student/assignments/[taskId]/submit/route.test.ts`
   - Each test suite validates:
     - 401 behavior for unauthenticated requests.
     - 400 behavior when required dynamic route params are missing.

2. **Improved regression confidence around auth + param extraction**
   - This extends the safety net around the recent `getParamAsync` migration and ensures handler behavior remains stable under malformed route context.

### Validation after this batch

- Focused tests:
  - `npm run test -- src/app/api/reports/class/[classId]/route.test.ts src/app/api/reports/students/[studentId]/route.test.ts src/app/api/curriculum/[curriculumId]/route.test.ts src/app/api/student/assignments/[taskId]/submit/route.test.ts --reporter=dot` -> passed
- Full checks:
  - `npm run test -- --reporter=dot` -> passed (31 files, 144 tests)
  - `npm run typecheck` -> passed
  - `npm run lint` -> passed with one existing warning in `src/lib/performance/optimization.tsx:70`

---

## Progress update (Batch: 2026-02-28, socket guardrails + tests)

### Completed in this batch

1. **Added deterministic socket rate-limit test hooks**
   - Exposed a narrow test-only internal surface in:
     - `src/lib/socket-server-enhanced.ts`
   - New exported helper: `socketRateLimitTesting`
     - `isRateLimited(connectionId)`
     - `reset()`
     - `limits`
   - Runtime behavior unchanged; this is used to unit-test token-bucket behavior without opening real sockets.

2. **Added socket rate-limit unit tests**
   - New test file:
     - `src/lib/socket-server-enhanced.rate-limit.test.ts`
   - Verifies:
     - events are allowed up to configured per-connection budget in a window.
     - overflow is blocked.
     - allowance recovers after the refill window elapses.

### Validation after this batch

- Focused tests:
  - `npm run test -- src/lib/socket-server-enhanced.rate-limit.test.ts src/lib/socket-server-enhanced.lifecycle.test.ts --reporter=dot` -> passed
- Full checks:
  - `npm run test -- --reporter=dot` -> passed (32 files, 146 tests)
  - `npm run typecheck` -> passed
  - `npm run lint` -> passed with one existing warning in `src/lib/performance/optimization.tsx:70`

---

## Progress update (Batch: 2026-02-28, socket presence correctness)

### Completed in this batch

1. **Fixed socket presence map stale-disconnect bug**
   - In `src/lib/socket-server-enhanced.ts`, presence lifecycle now uses helper functions:
     - `setUserSocket(userId, socketId)`
     - `clearUserSocketIfCurrent(userId, socketId)`
   - Disconnect cleanup now removes mapping only if the disconnected socket is the currently mapped socket for that user.
   - This prevents false-offline states when a user has multiple active/reconnected sockets and an old socket disconnects later.

2. **Added presence regression tests**
   - New test file:
     - `src/lib/socket-server-enhanced.presence.test.ts`
   - Verifies:
     - latest connection overwrites mapping.
     - stale socket disconnect does not clear a newer active mapping.
     - active mapping is cleared only when the currently mapped socket disconnects.

3. **Extended test-only internal harness for socket server**
   - `socketRateLimitTesting` now includes a small `presence` helper surface used only for deterministic unit tests.
   - Runtime behavior remains unchanged outside the bug fix above.

### Validation after this batch

- Focused tests:
  - `npm run test -- src/lib/socket-server-enhanced.presence.test.ts src/lib/socket-server-enhanced.rate-limit.test.ts src/lib/socket-server-enhanced.lifecycle.test.ts --reporter=dot` -> passed
- Full checks:
  - `npm run test -- --reporter=dot` -> passed (33 files, 148 tests)
  - `npm run typecheck` -> passed
  - `npm run lint` -> passed with one existing warning in `src/lib/performance/optimization.tsx:70`

---

## Progress update (Batch: 2026-02-28, deprecated API cleanup)

### Completed in this batch

1. **Removed deprecated `String.prototype.substr` usage across app source**
   - Replaced all occurrences of `toString(36).substr(2, 9)` with `toString(36).slice(2, 11)` in `src/`.
   - This includes whiteboard internals, chat hooks, class hooks, and tutor course builder id-generation paths.
   - Verification:
     - `rg -n "\\.substr\\(" src` -> no matches.

2. **Risk reduction rationale**
   - Eliminates dependence on a deprecated JavaScript API while preserving id suffix length/behavior.
   - Avoids future compatibility/tooling issues around deprecated methods.

### Validation after this batch

- Full checks:
  - `npm run test -- --reporter=dot` -> passed (33 files, 148 tests)
  - `npm run typecheck` -> passed
  - `npm run lint` -> passed with one existing warning in `src/lib/performance/optimization.tsx:70`

---

## Progress update (Batch: 2026-02-28, admin boundary regression tests)

### Completed in this batch

1. **Added admin API key revoke route tests**
   - New file:
     - `src/app/api/admin/api-keys/[id]/route.test.ts`
   - Covers:
     - unauthenticated access -> 401
     - non-admin access -> 403
     - missing id param -> 400
     - not-found key -> 404
     - successful revoke -> 200

2. **Added admin auth bridge tests**
   - New file:
     - `src/app/api/admin/auth/bridge/route.test.ts`
   - Covers:
     - unauthenticated access -> 401
     - non-admin access -> 403
     - successful bridge -> 200 + `admin_session` cookie set

3. **Added admin geolocation guard tests**
   - New file:
     - `src/app/api/admin/geolocation/route.test.ts`
   - Covers:
     - unauthenticated GET -> 401
     - missing `ip` query param -> 400
     - invalid/missing `ips` array in POST -> 400

### Validation after this batch

- Focused tests:
  - `npm run test -- src/app/api/admin/api-keys/[id]/route.test.ts src/app/api/admin/auth/bridge/route.test.ts src/app/api/admin/geolocation/route.test.ts --reporter=dot` -> passed
- Full checks:
  - `npm run test -- --reporter=dot` -> passed (36 files, 159 tests)
  - `npm run typecheck` -> passed
  - `npm run lint` -> passed with one existing warning in `src/lib/performance/optimization.tsx:70`

---

## Progress update (Batch: 2026-02-28, param normalization completion)

### Completed in this batch

1. **Removed remaining direct `context?.params` parsing patterns**
   - Replaced ad-hoc extraction, casts, and Promise casts with `getParamAsync` in:
     - `src/app/api/curriculums/[curriculumId]/route.ts`
     - `src/app/api/conversations/[id]/messages/route.ts`
     - `src/app/api/student/assignments/[taskId]/submit/route.ts`
     - `src/app/api/student/quizzes/[id]/route.ts`
     - `src/app/api/student/quizzes/[id]/attempt/route.ts`
     - `src/app/api/student/quizzes/[id]/submit/route.ts`
     - `src/app/api/parent/students/[studentId]/route.ts`
     - `src/app/api/parent/students/[studentId]/ai-tutor/route.ts`
     - `src/app/api/parent/students/[studentId]/assignments/route.ts`
     - `src/app/api/feedback/[id]/review/route.ts`
     - `src/app/api/tutor/courses/[id]/pitch/route.ts`
   - Added explicit 400 handling when required route params are missing.

2. **Request-aware auth consistency**
   - Parent shared-course route now resolves session with request context and normalized params:
     - `src/app/api/parent/courses/[id]/route.ts`

3. **Static code health checks**
   - Confirmed no residual `context: any` / `(context as any)` in `src`:
     - `rg -n "context\\s*:\\s*any|\\(context\\s+as\\s+any\\)" src` -> no matches
   - Confirmed no residual ad-hoc `await context?.params` extraction in API routes:
     - `rg -n "await context\\?\\.params|await \\(context\\?\\.params|context\\?\\.params\\s*as" src/app/api` -> no matches

### Validation after this batch

- `npm run typecheck` -> passed
- `npm run test -- --reporter=dot` -> passed (24 files, 126 tests)
- `npm run lint` -> passed with one existing warning in `src/lib/performance/optimization.tsx:70`
