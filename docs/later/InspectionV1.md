# Repository Inspection V1

**Date:** 2025-02-16  
**Scope:** TutorMe (tutorme-app) – database schema, API security and patterns, redundancies, vulnerabilities, tests.

---

## 1. Executive summary

The codebase is generally well structured with Prisma for data access, Next.js API routes, and consistent use of `withAuth`/`withCsrf` on many endpoints. This inspection identified:

- **Database:** Several models use optional or string IDs without Prisma relations (StudentPerformance.curriculumId, FeedbackWorkflow.submissionId, BreakoutSession.mainRoomId, GeneratedTask.roomId). One is a clear schema bug (StudentPerformance missing Curriculum relation); others are soft references that should be documented.
- **Security:** Health POST resets metrics without authentication. Public endpoints (catalog, list) are low risk. Payment webhooks (Hitpay, Airwallex) correctly verify signatures. A number of mutation routes use manual `getServerSession` instead of `withAuth`/`withCsrf`.
- **Redundancies:** Dual storage of difficulty and schedule at course vs group level is intentional. Two curriculum list APIs serve different purposes; naming could be clarified.
- **Tests:** Gaps for tutor course/batch APIs, curriculum catalogue, and new group/schedule UI. Integration tests assume a running DB; unit-only script would help.

Recommended next steps: fix StudentPerformance relation, protect health POST, standardise auth middleware, type curriculums/list, and add tests for tutor flows and batch/group features.

---

## 2. Database: tables and links

### 2.1 What is correct

- **Curriculum hierarchy:** Curriculum → CurriculumModule → CurriculumLesson with FKs and `onDelete: Cascade` where appropriate. Indexes on `curriculumId`, `moduleId`, `order`.
- **Enrollments and batches:** CurriculumEnrollment links User, Curriculum, and optional CourseBatch. CourseBatch has `curriculumId` FK to Curriculum. Indexes on `studentId`, `curriculumId`, `batchId`.
- **Lesson progress and sessions:** LessonSession, CurriculumLessonProgress reference CurriculumLesson and User with unique constraints (e.g. studentId + lessonId) and cascades.
- **Content and progress:** ContentItem, ContentProgress, VideoWatchEvent, ReviewSchedule, Bookmark, Note use FKs to ContentItem and User with appropriate indexes.
- **CurriculumProgress:** Links User and Curriculum with `@@unique([studentId, curriculumId])` and Curriculum relation present.
- **Gamification, AI tutor, breakout rooms:** User relations and FKs are defined; BreakoutRoomAssignment links BreakoutRoom and User.

### 2.2 Issues and missing links

| Model / field | Issue | Recommendation |
|----------------|--------|------------------|
| **StudentPerformance** | `curriculumId String?` with `@@unique([studentId, curriculumId])` but **no `Curriculum` relation**. Prisma cannot enforce or use the FK; referential integrity is missing. | Add optional relation: `curriculum Curriculum? @relation(...)` and keep `curriculumId` optional. Add migration. |
| **FeedbackWorkflow** | `submissionId String @unique` with **no relation to TaskSubmission**. Unclear if this is TaskSubmission.id. | If submissionId references TaskSubmission.id, add optional `submission TaskSubmission? @relation(...)`. Otherwise document the convention in schema comment. |
| **BreakoutSession.mainRoomId** | String ID with no FK to a Room/Clinic table. | Document in schema that this is an external or soft reference (e.g. Daily.co room ID). Add comment above field. |
| **GeneratedTask.roomId** | Optional string with no relation. | Same as above: document as soft/external reference or add relation if a Room model exists. |

### 2.3 Unique constraint with nullable column

- **StudentPerformance:** `@@unique([studentId, curriculumId])` with `curriculumId String?`. In PostgreSQL, multiple rows can have `curriculumId = NULL` (NULLs are distinct in unique). This is valid; the main fix is adding the Curriculum relation.

### 2.4 Indexes

- High-traffic and filter fields are generally indexed (e.g. curriculumId, studentId, batchId, subject, isPublished, creatorId, userId). No critical missing indexes were identified; if slow queries appear, add indexes for common filters (e.g. `createdAt` for recent-first lists).

---

## 3. Redundancies

### 3.1 Intentional (by design)

- **Difficulty:** Stored at both Curriculum (course-level default) and CourseBatch (group-level override). Product requirement; document in schema comment if not already.
- **Schedule:** Course-level `Curriculum.schedule` (JSON) and per-group `CourseBatch.schedule` (JSON). Course schedule acts as fallback when a group has no schedule; both are intentional.
- **Dual curriculum list APIs:**
  - `GET /api/curriculum` – withAuth; returns curriculums with current user’s progress (for “my courses” / dashboard).
  - `GET /api/curriculums/list` – no auth; returns published curriculums only (public catalogue).
  Purpose differs; redundancy is in naming (curriculum vs curriculums). Consider documenting in API comments or route file headers; optional rename for clarity (e.g. “catalogue” vs “my courses”).

### 3.2 Inconsistent patterns (avoidable)

- **Auth:** Some routes use `withAuth`/`withCsrf` middleware; others use manual `getServerSession` (e.g. user/profile, recommendations, bookmarks, progress, achievements, study-groups, ai-tutor/enrollments, ai-tutor/lesson-context, classes). They still check session but bypass centralised role checks and CSRF. Recommend migrating to withAuth/withCsrf for consistency and centralised RBAC.

---

## 4. Vulnerabilities and risks

### 4.1 High / medium

| Item | Severity | Description | Fix |
|------|----------|-------------|-----|
| **Health POST** | Medium | `POST /api/health` resets performance metrics. Comment says “In production, verify admin authentication here” but **no auth**. Anyone can reset metrics. | Protect with `withAuth(handler, { role: 'ADMIN' })` or remove POST in production. |
| **Code run** | Medium | `POST /api/code/run` runs user-supplied code (or forwards to runner). If it executes server-side, sandboxing and auth are critical. | Confirm auth (e.g. withAuth) and input validation; ensure execution is sandboxed. |

### 4.2 Low / acceptable

| Item | Severity | Description | Fix |
|------|----------|-------------|-----|
| **Curriculums catalog** | Low | `GET /api/curriculums/catalog` – no auth. Returns reference data (subject/name/code). | Acceptable if intentional. Optionally add rate limiting. |
| **Curriculums list** | Low | `GET /api/curriculums/list` – no auth; only `isPublished: true`. | Acceptable for public catalogue. Optionally rate limit. |
| **Health GET** | Low | `GET /api/health` can expose detailed stack info when `?detailed=true`. | Ensure not exposed to internet in production or restrict to internal/monitoring. |

### 4.3 Mitigations in place

- **Payment webhooks:** Hitpay and Airwallex routes verify provider signature (HMAC) before processing. Document in security docs.
- **CSRF:** Many mutation routes use `withCsrf(withAuth(...))` or `requireCsrf` (e.g. user/profile PUT). Routes that use manual getServerSession and mutate (e.g. PUT/POST) should be audited for requireCsrf.
- **Auth:** Most sensitive routes use withAuth with role (TUTOR, STUDENT, ADMIN). Admin routes may use separate auth (e.g. admin session); ensure all admin endpoints are protected.

---

## 5. Proposed changes (prioritised)

1. **Schema**
   - Add optional `Curriculum?` relation to StudentPerformance; keep `curriculumId` optional; add migration.
   - If FeedbackWorkflow.submissionId === TaskSubmission.id, add optional TaskSubmission relation; else add schema comment.
   - Add short comments for BreakoutSession.mainRoomId and GeneratedTask.roomId as soft/external references.

2. **API security**
   - Protect `POST /api/health` with admin auth or remove in production.
   - Audit `POST /api/code/run` for auth and sandboxing.

3. **API consistency**
   - Standardise protected routes on `withAuth`/`withCsrf` (migrate getServerSession-based routes where appropriate).
   - Ensure all POST/PATCH/DELETE that accept JSON use withCsrf or requireCsrf.

4. **Validation**
   - Add Zod (or existing schemas) to any route that parses JSON body without validation.
   - Replace `any` in curriculums/list (e.g. `where: any`, `c: any`) with proper types.

5. **Documentation**
   - Document dual curriculum APIs (catalogue vs my courses) in route files or API docs.
   - Document webhook signature verification in security/runbook.

6. **Tests**
   - Add API tests for tutor course and batch flows (create course, batches, outline, schedule populate, batch PATCH).
   - Add tests for curriculum catalogue/catalog if behaviour is critical.
   - Add E2E or UI tests for course config page (groups, share link, group schedule).
   - Document integration test requirement (e.g. DATABASE_URL, test DB); add script for unit-only tests if needed.

---

## 6. Test scripts: current state and updates needed

### 6.1 Current state

- **Unit (Vitest):** `src/**/*.test.ts` and `__tests__/**/*.{test,spec}.{ts,tsx}`; excludes integration. Covers: auth/register route, health route, rbac, rate-limit, sanitize, class hooks.
- **Integration:** `src/__tests__/integration/api-auth.test.ts` – register flow and DB state; requires running DB (e.g. DATABASE_URL).
- **E2E (Playwright):** payment, ai-tutor, tutor-clinic, registration.

### 6.2 Gaps

- No unit or integration tests for:
  - Tutor course APIs (create course, PATCH course, materials/outline, schedule populate-from-outline, populate-from-content).
  - Batch APIs (GET/POST batches, PATCH batch difficulty/schedule).
  - Curriculum catalogue or curriculums/list.
- E2E does not cover:
  - Course configuration page (curriculum, groups/batches, collapsible groups, group share link, group-specific schedule).
  - Create course dialog and course catalogue on dashboard.
- Integration test assumes real DB; no documented test DB (e.g. tutorme_test) or CI instructions.

### 6.3 Do test scripts need to be updated?

**Yes.** Recommended updates:

1. **API tests (Vitest):** Add tests for tutor courses and batches (e.g. create course, create batch, PATCH batch with difficulty/schedule). Use test DB or mocks; document DATABASE_URL for integration.
2. **E2E or component tests:** Add scenarios for course config: open a course, create a group, expand group, copy share link, select group and edit schedule, save group schedule.
3. **Documentation:** In README or CONTRIBUTING, document how to run unit-only vs integration (e.g. `npm run test` for unit; `npm run test:integration` with DB). Optionally add a script that runs only unit tests (no DB).
4. **Integration:** Keep api-auth integration test; add note that it requires a running database and optionally use a dedicated test DB in CI.

---

## 7. Appendix

### 7.1 API routes without withAuth (handlers use raw export or getServerSession)

Routes that do not use the `withAuth` middleware (they may still perform auth via getServerSession or be intentionally public):

| Route | Method | Note |
|-------|--------|------|
| /api/health | GET, POST | GET public; POST should be protected. |
| /api/csrf | GET | Public (returns token). |
| /api/auth/register | POST | Public (registration). |
| /api/curriculums/catalog | GET | Public (reference data). |
| /api/curriculums/list | GET | Public (published curriculums). |
| /api/user/profile | GET, PUT | Uses getServerSession. |
| /api/recommendations | GET | Uses getServerSession. |
| /api/bookmarks | GET, POST, DELETE | Uses getServerSession. |
| /api/progress | GET, POST | Uses getServerSession. |
| /api/achievements | GET, POST | Uses getServerSession. |
| /api/chat/summary | POST | Uses getServerSession (assumed). |
| /api/study-groups | GET, POST, PUT, DELETE | Uses getServerSession (assumed). |
| /api/classes | GET, POST, DELETE | Uses getServerSession (assumed). |
| /api/classes/[id] | GET | Uses getServerSession (assumed). |
| /api/ai-tutor/lesson-context | GET, POST | Uses getServerSession (assumed). |
| /api/ai-tutor/enrollments | GET, PATCH | Uses getServerSession (assumed). |
| /api/ai/tutor | POST, GET | Likely session or key; verify. |
| /api/ai/status | GET | Likely public or key; verify. |
| /api/ai/chat | POST, GET | Verify auth. |
| /api/code/run | POST | Verify auth and sandbox. |
| /api/onboarding/tutor | POST | Verify auth. |
| /api/onboarding/student | POST | Verify auth. |
| /api/student/reviews | GET, POST | Verify auth. |
| /api/student/reviews/snooze | POST | Verify auth. |
| /api/student/reviews/session | GET | Verify auth. |
| /api/student/scores | GET | Verify auth. |
| /api/student/calendar/events | GET | Verify auth. |
| /api/feedback/pending | GET | Verify auth. |
| /api/feedback/stats | GET | Verify auth. |
| /api/feedback/[id]/review | POST | Verify auth. |
| /api/feedback/batch-approve | POST | Verify auth. |
| /api/socket | GET | Verify auth if needed. |
| /api/admin/* | Various | Use admin auth (session/cookie); not withAuth. |
| /api/payments/webhooks/hitpay | POST | No user auth; signature verified. |
| /api/payments/webhooks/airwallex | POST | No user auth; signature verified. |

### 7.2 Mutation routes without withCsrf

Routes that perform POST/PATCH/PUT/DELETE and do not use `withCsrf` or `requireCsrf` in the handler (may use requireCsrf inside):

- user/profile (PUT) – uses requireCsrf.
- Many admin routes (POST/PATCH/DELETE) – may use admin-specific CSRF or session.
- auth/register (POST) – public; CSRF may be optional for registration.
- study-groups (POST, PUT, DELETE) – no withCsrf in export; check body.
- classes (POST, DELETE) – no withCsrf in export; check body.
- ai-tutor/enrollments (PATCH) – no withCsrf in export.
- ai-tutor/lesson-context (POST) – no withCsrf in export.
- onboarding/* (POST) – no withCsrf in export.
- student/reviews (POST), snooze (POST) – no withCsrf in export.
- feedback/* (POST) – no withCsrf in export.
- code/run (POST) – no withCsrf in export.
- health (POST) – no withCsrf; should be admin-only.
- payments/webhooks/* (POST) – no CSRF (webhook signature used).

Recommendation: Audit each mutation above; add withCsrf or requireCsrf for user-facing mutations that change state.
