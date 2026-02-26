# TutorMe Code Review Report

**Date:** February 26, 2025  
**Scope:** Full codebase review (API routes, auth, security, structure, tests)

---

## Executive Summary

The codebase is well-structured with a clear separation of concerns, solid security foundations (CSRF, rate limiting, RBAC), and good use of shared middleware. Several issues were identified: **authorization gaps**, **inconsistent API patterns**, **stub/mock code in production paths**, **artifacts and dead code**, and **missing CSRF on critical mutations**. Below are findings by severity with proposed solutions.

---

## 1. Critical: Security & Authorization

### 1.1 Student analytics visible to any tutor (data leak)

**Location:** `src/app/api/analytics/students/[studentId]/route.ts`

**Finding:** The route is protected with `{ role: 'TUTOR' }` but has no relationship check. The comment states "allow all tutors to view student analytics" and defers a proper check. As a result, **any tutor can view any student’s performance analytics**, not only their own students.

**Proposed solution:**

- Add a relationship check before returning data. For example, ensure the tutor has the student in a course/batch they teach (e.g. via `CourseBatch`, `SessionParticipant`, or curriculum enrollment linked to the tutor).
- If no such relation exists in the schema yet, either:
  - Restrict to the student themselves and ADMIN until the model supports tutor–student relationship, or
  - Introduce a tutor–student or tutor–curriculum relation and enforce it here.

Example pattern (conceptual; adjust to your schema):

```ts
// After role check, if session.user.role === 'TUTOR':
const canAccess = await db.sessionParticipant.findFirst({
  where: {
    userId: session.user.id,
    liveSession: {
      participants: { some: { userId: studentId } }
    }
  }
})
if (!canAccess && !isOwnRecord && !isAdmin) {
  return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
}
```

---

### 1.2 Notifications: tutors can create notifications for any user

**Location:** `src/app/api/notifications/route.ts` (POST)

**Finding:** POST accepts `userId` in the body and creates a notification for that user. Any authenticated TUTOR can call this and create notifications for **any userId** (e.g. impersonation, spam, or abuse).

**Proposed solution:**

- If this endpoint is only for server-to-server or admin use: protect it with API key or ADMIN-only role and document it; do not expose to the tutor UI.
- If tutors must create notifications: do not accept `userId` from the client; derive it from context (e.g. “notify students in this class” via a class/session ID and resolve allowed `userId`s server-side).

---

### 1.3 Payment creation missing CSRF

**Location:** `src/app/api/payments/create/route.ts`

**Finding:** POST creates a payment and returns a checkout URL but is wrapped only in `withAuth`, not `withCsrf`. State-changing mutations should require CSRF to prevent cross-site request forgery.

**Proposed solution:**

```ts
export const POST = withCsrf(withAuth(async (req: NextRequest, session) => {
  // ...
}, { /* no role - students/parents/admins handled inside */ }))
```

Apply the same review to any other state-changing payment or financial endpoints (e.g. `payments/chinese-gateways` POST if it mutates state).

---

## 2. High: Consistency & Maintainability

### 2.1 Inconsistent auth: `getServerSession` vs `withAuth`

**Finding:** Many API routes use `getServerSession(authOptions)` and manual checks instead of the shared `withAuth` helper. This leads to inconsistent error responses (401/403/500) and duplicated logic. Roughly 30+ routes use raw `getServerSession`.

**Examples:**  
`src/app/api/student/resources/route.ts`, `src/app/api/student/calendar/events/route.ts`, `src/app/api/polls/[pollId]/route.ts`, `src/app/api/tutor/courses/[id]/tasks/[taskId]/route.ts`, and others.

**Proposed solution:**

- Migrate these routes to use `withAuth(handler, { role: '...' })` (and `withCsrf` for mutations) so all use the same error classes and status codes.
- Use a single “API auth” rule in your team docs: “Protected API routes must use `withAuth` (and `withCsrf` for POST/PUT/PATCH/DELETE) from `@/lib/api/middleware`.”

---

### 2.2 Inconsistent error handling: few routes use `handleApiError`

**Finding:** `handleApiError` exists in `lib/api/middleware.ts` and is used in only 6 places (e.g. parent financial, curriculums list/catalog). Most other routes use ad-hoc try/catch and varying 500 responses and logging.

**Proposed solution:**

- In catch blocks of API handlers, use `return handleApiError(error, 'User-facing message', 'RouteLabel')` for unexpected errors.
- Reserve custom handling for known domain errors (e.g. `ValidationError`, `NotFoundError`) and let `withAuth` or a small helper map those to 4xx; use `handleApiError` for the rest to get consistent logging and response shape.

---

### 2.3 Dual curriculum API surface: `/api/curriculum/` vs `/api/curriculums/`

**Finding:** Two prefixes exist for curriculum-related APIs:
- `api/curriculum/` – e.g. lessons, progress, enroll
- `api/curriculums/` – e.g. catalog, list, generate-description, `[curriculumId]`

This is confusing for clients and increases maintenance.

**Proposed solution:**

- Choose one canonical prefix (e.g. `api/curriculums/`) and deprecate the other: move or alias routes, update frontend and docs, then remove the old routes in a later release.

---

### 2.4 `requireRole` omits PARENT

**Location:** `src/lib/api/middleware.ts`

**Finding:** `requireRole(role)` is typed as `role: 'TUTOR' | 'STUDENT' | 'ADMIN'`. `WithAuthOptions.role` correctly includes `'PARENT'`. Parent-only endpoints cannot use `requireRole('PARENT')` in a type-safe way.

**Proposed solution:**

```ts
export async function requireRole(role: 'TUTOR' | 'STUDENT' | 'ADMIN' | 'PARENT'): Promise<Session> {
  // ...
}
```

---

## 3. Medium: Structure & Cleanup

### 3.1 Backup and artifact files in repo

**Finding:** Backup/artifact files are present and can confuse tooling and developers:

- `src/app/api/parent/dashboard/route.ts.bak`
- `src/app/api/ai-tutor/chat/route.ts.bak`
- `src/app/[locale]/register/parent/page.tsx.bak`

**Proposed solution:**

- Remove `*.bak` (and similar artifacts) from the repo.
- Add to `.gitignore`: `*.bak`, `*.backup`, `*~` if desired.

---

### 3.2 API route under `[locale]` (analytics errors)

**Location:** `src/app/[locale]/admin/analytics/errors/route.ts`

**Finding:** This is the only `route.ts` under a locale segment. It returns stub/mock data (random numbers, hardcoded routes) and contains TODOs for real error counting, top routes, affected users, and error rate. That makes the admin analytics “Errors” view misleading in production.

**Proposed solution:**

- Move the handler to `src/app/api/admin/analytics/errors/route.ts` so all API routes live under `api/`.
- Implement real metrics (e.g. from Sentry, logs, or a small errors table) or clearly label the UI as “Coming soon” and do not return fake data from a production route.

---

### 3.3 Duplicate or dead modules

**Finding:**

- **Stores:** Both `src/stores/` and `src/lib/stores/` contain live-class and communication stores. This can cause confusion about which to import.
- **DB:** `lib/db-enhanced.ts` exists; no imports reference it (only `@/lib/db` is used). Same for `lib/socket-server-enhanced.ts` (only `lib/socket-server.ts` is used by `server.ts`).

**Proposed solution:**

- Consolidate stores in one place (e.g. `src/stores/`) and re-export from there; update imports; remove the duplicate location.
- For `db-enhanced` and `socket-server-enhanced`: either integrate their functionality into the main modules and delete the enhanced files, or remove them if they are obsolete.

---

## 4. Medium: Stubs & TODOs

### 4.1 Admin analytics errors – stub implementation

**Location:** `src/app/[locale]/admin/analytics/errors/route.ts`

**Finding:** All four metrics are stubbed (random/hardcoded). See §3.2.

**Proposed solution:** Implement or hide the feature; do not serve fake data from a production API.

---

### 4.2 Calendar sync / export TODOs

**Locations:**

- `src/app/api/tutor/calendar/export/route.ts` – “Store feed token in database”
- `src/app/api/tutor/calendar/sync/route.ts` – Token refresh, calendar API fetch/push, Google/Microsoft/Apple APIs, OAuth

**Proposed solution:** Track these in your backlog; if calendar sync/export is in use, implement token storage and provider-specific sync so behavior matches expectations and security (no long-lived tokens in logs or client).

---

### 4.3 Other TODOs (non-blocking)

- `src/app/[locale]/student/ai-tutor/english/page.tsx` – Text-to-speech with selected voice
- `src/lib/socket-server.ts` – Other distribution modes
- `src/app/[locale]/tutor/courses/[id]/builder/layout.tsx` – Navigate to classroom page

These are product/feature work; no security or consistency issue.

---

## 5. Low: Code Quality & Conventions

### 5.1 Zod/validation coverage

**Finding:** Zod (or similar) is used in a subset of API routes (e.g. polls, calendar, pdf-tutoring, some tutor routes). Many routes parse JSON and use ad-hoc checks. This can lead to invalid or oversized payloads and unclear 400 messages.

**Proposed solution:** Introduce request body/query schemas (Zod) for sensitive or complex endpoints (payments, enrollments, user-generated content) and validate with `schema.safeParse()`; return 400 with a consistent shape when validation fails.

---

### 5.2 ESLint/TypeScript disables

**Finding:** A few files disable ESLint or use `any`/require (e.g. `lib/db/index.ts` with `no-explicit-any`, `no-require-imports`). These are acceptable for DB/Redis bootstrap if documented.

**Proposed solution:** Add a short comment above each disable explaining why (e.g. “Prisma client and Redis are initialized dynamically to avoid Edge bundling”). Prefer narrowing types (e.g. `PrismaClient`, `Redis | null`) where possible instead of `any`.

---

### 5.3 Rate limit failure behavior in middleware

**Finding:** In `middleware.ts`, if the rate-limit check throws (e.g. Redis down), the error is logged and the request continues. So under failure you effectively “fail open” for rate limiting.

**Proposed solution:** Document this in code and in runbooks. Optionally, add a feature flag or env (e.g. `RATE_LIMIT_FAIL_CLOSED=true`) that returns 503 when the rate limiter is unavailable, for stricter deployments.

---

## 6. Test Coverage

**Finding:** Unit/integration tests cover auth, API middleware, security utilities, payments factory, AI orchestrator, and a few API routes (health, register, curriculums catalog/list, admin login). Most of the 180+ API routes have no dedicated tests. E2E covers main flows (ai-tutor, payment, registration, tutor clinic).

**Proposed solution:**

- Prioritize tests for security-sensitive and payment-related routes (e.g. payments/create, refund, analytics/students/[studentId], notifications POST).
- Add integration tests that assert auth and authorization (e.g. tutor A cannot access tutor B’s student analytics).
- Keep expanding E2E for critical user journeys; add a smoke test that hits health and a few key APIs after deploy.

---

## 7. Summary of Recommended Actions

| Priority | Action |
|----------|--------|
| **P0** | Fix analytics/students/[studentId] authorization (tutor–student relationship or restrict to self + ADMIN). |
| **P0** | Restrict or remove POST /api/notifications (no arbitrary userId from client). |
| **P0** | Add withCsrf to POST /api/payments/create (and any other payment-creation endpoints). |
| **P1** | Standardize on withAuth (and withCsrf for mutations); migrate getServerSession routes. |
| **P1** | Use handleApiError in catch blocks across API routes. |
| **P1** | Add PARENT to requireRole type; unify curriculum API prefix. |
| **P2** | Remove .bak files and add to .gitignore; move admin analytics errors to api/ and implement or hide. |
| **P2** | Consolidate stores; remove or integrate db-enhanced and socket-server-enhanced. |
| **P2** | Add Zod validation and tests for sensitive endpoints. |

---

## Appendix: Files to Change (by finding)

- **1.1** – `src/app/api/analytics/students/[studentId]/route.ts`
- **1.2** – `src/app/api/notifications/route.ts`
- **1.3** – `src/app/api/payments/create/route.ts`
- **2.4** – `src/lib/api/middleware.ts`
- **3.1** – Delete `*.bak`; update `.gitignore`
- **3.2** – Move/implement `src/app/[locale]/admin/analytics/errors/route.ts` → `src/app/api/admin/analytics/errors/route.ts`
- **3.3** – `src/stores/`, `src/lib/stores/`; `lib/db-enhanced.ts`, `lib/socket-server-enhanced.ts`

If you want, the next step can be concrete patches for the P0 items (analytics auth, notifications POST, payments CSRF) and one example migration to `withAuth` + `handleApiError` for a single route.
