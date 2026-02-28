# Code Review — Proposed Fixes (Non-MD Files)

**Scope:** `tutorme-app/src` (TypeScript/TSX only).  
**Reference:** CODEREVIEW.md for prior findings; this document adds verification and applied fixes.

---

## 1. Applied Fixes (This Pass)

### 1.1 ZodError: use `.issues` not `.errors`

**File:** `src/lib/whiteboard/crdt-enhanced.ts`  
**Issue:** Zod’s `ZodError` exposes `.issues`, not `.errors`. Using `.errors` is wrong and can cause runtime or type issues.  
**Fix applied:** Replaced `result.error.errors` with `result.error.issues` in both `validateStroke` and `validateOperation`.

### 1.2 Missing crypto import

**File:** `src/lib/monitoring/compliance-audit.ts`  
**Issue:** `crypto.randomUUID()` was used without importing `crypto`.  
**Fix applied:** Added `import { randomUUID } from 'crypto'` and replaced `crypto.randomUUID()` with `randomUUID()`.

### 1.3 Dynamic route params normalization

**Issue:** Next.js 15+ can expose `params` as `Promise` and values as `string | string[]`. Using `params?.id as string` or `req.url.split('/').pop()` is fragile and can pass wrong types into DB.  
**Fix applied:** Use `getParamAsync(context?.params, 'id')` (or the relevant key) and return 400 when the param is missing.

**Files updated:**

- `src/app/api/class/polls/[pollId]/route.ts` — PATCH/DELETE now use `getParamAsync(context?.params, 'pollId')` instead of `req.url.split('/').pop()`.
- `src/app/api/conversations/[id]/messages/search/route.ts` — GET uses `getParamAsync(context?.params, 'id')` and 400 when missing.
- `src/app/api/tutor/courses/[id]/enrollments/route.ts` — GET uses `getParamAsync`; removed `(context as any)`.
- `src/app/api/tutor/courses/[id]/batches/route.ts` — GET/POST use `getParamAsync`; removed `(context as any)`.
- `src/app/api/content/[contentId]/upload-complete/route.ts` — POST uses `getParamAsync(context?.params, 'contentId')`; removed `context: any`.
- `src/app/api/whiteboards/[id]/pages/route.ts` — GET, POST, PUT use `getParamAsync(context?.params, 'id')`.
- `src/app/api/whiteboards/[id]/pages/[pageId]/route.ts` — GET, PUT, DELETE use `getParamAsync` for `id` and `pageId`.

---

## 2. Remaining Recommendations (Proposed Fixes)

### 2.1 Params normalization — more routes

**Pattern:** Replace raw `params?.id` / `params?.x as string` or `String(params?.id || '')` with `getParamAsync(context?.params, 'id')` and return 400 when undefined.

**Files to update (examples):**

- `src/app/api/tutor/calendar/events/[id]/route.ts` — GET, PUT, DELETE: use `getParamAsync(context?.params, 'id')`.
- `src/app/api/tutor/resources/[id]/download/route.ts` — same for `id`.
- `src/app/api/tutor/resources/[id]/route.ts` — GET, PUT, DELETE: use `getParamAsync` for `id`.
- `src/app/api/tutor/resources/[id]/share/route.ts` — same.
- `src/app/api/tutor/quizzes/[id]/route.ts` — replace `(context as any).params` and `String(params?.id || '')` with `getParamAsync(context?.params, 'id')` in all handlers.
- `src/app/api/content/[contentId]/quiz-skip/route.ts` — use `getParamAsync(context?.params, 'contentId')`.
- `src/app/api/whiteboards/[id]/export/route.ts` — use `getParamAsync(context?.params, 'id')`.

**Helper:** `getParam` / `getParamAsync` live in `src/lib/api/params.ts`.

### 2.2 Remove or narrow `context: any` / `(context as any)`

**Issue:** Many route handlers use `context: any` or `(context as any).params`, which hides type errors.  
**Proposed fix:** Use the same pattern as the updated routes: type `context` from your middleware (e.g. `{ params?: Promise<Record<string, string | string[]>> }`) and use `getParamAsync(context?.params, 'id')` so `context` does not need to be `any`.

**Examples (among others):**  
`reports/students/[studentId]/route.ts`, `reports/engagement/[classId]/route.ts`, `curriculum/[curriculumId]/route.ts`, `curriculum/lessons/[lessonId]/route.ts`, `notifications/[id]/route.ts`, `analytics/class/[classId]/route.ts`, `analytics/students/[studentId]/route.ts`, `polls/[pollId]/route.ts`, `polls/[pollId]/vote/route.ts`, `parent/courses/[id]/route.ts`, `classes/[id]/route.ts`, `student/assignments/[taskId]/route.ts`, `admin/api-keys/[id]/route.ts`, `class/rooms/[id]/join/route.ts`.

### 2.3 @ts-nocheck reduction

**Issue:** Dozens of files still have `// @ts-nocheck` at the top (whiteboard, stores, security, PWA, etc.), which disables type checking.  
**Proposed fix:** Remove `@ts-nocheck` incrementally per module; fix types and use targeted `@ts-expect-error` with a short comment only where necessary. Prioritize: auth, db, security, then whiteboard and stores.

### 2.4 Large files and components

**Issue:** Very large modules (e.g. `socket-server.ts` ~3400+ lines, `TutorWhiteboardManager.tsx` 2800+ lines) are hard to maintain and test.  
**Proposed fix:** Split by responsibility (e.g. socket namespaces or feature-specific handlers into separate files); break the whiteboard UI into smaller components and hooks.

### 2.5 API response shape and RBAC

**Issue:** Response shapes vary (`{ data }` vs inline fields); not every sensitive route explicitly checks role or resource ownership.  
**Proposed fix:** Standardize success/error shapes (e.g. `{ data }` for success, `{ error, details? }` for errors). Ensure every route that returns PII or modifies data checks role/ownership; use or extend docs like `docs/RBAC_NEW_ROUTES.md` as a checklist for new routes.

### 2.6 CSP

**Issue:** CSP still uses `'unsafe-inline'` and `'unsafe-eval'` for scripts.  
**Proposed fix:** Follow `docs/CSP_HARDENING.md`; plan migration to nonces or hashes when the Next.js setup allows.

### 2.7 Dual ORM (Drizzle + Prisma)

**Issue:** Prisma is still used in a few scripts (e.g. `scripts/seed-gamification.ts`, `scripts/generate-missions.ts`) and legacy client; schema can drift.  
**Proposed fix:** Either migrate those scripts to Drizzle and remove Prisma from them, or document and keep the Prisma schema in sync for the models they use.

---

## 3. Verification

- **Socket server:** `registerLiveClassWhiteboardHandlers` is called from `socket-server-enhanced.ts` on connection; live-class whiteboard events are wired in production.
- **Zod:** Poll and other routes already use `error.issues` for ZodError; `class/payment-alert/route.ts` uses `err.issues`; no remaining `.errors` on ZodError in the reviewed paths.
- **payment-security.ts:** `signatureValidation.errors` is correct (custom type `{ isValid: boolean; errors: string[] }`), not Zod.

---

## 4. Summary Table

| Category              | Status / Action                                      |
|-----------------------|------------------------------------------------------|
| ZodError .issues      | Fixed in `crdt-enhanced.ts`                          |
| crypto import         | Fixed in `compliance-audit.ts`                       |
| Params (sample routes)| Fixed in polls, conversations, courses, content, wb |
| Params (rest)         | Use getParamAsync in remaining dynamic routes        |
| context: any          | Replace with typed context + getParamAsync          |
| @ts-nocheck           | Remove incrementally; add types                      |
| Large files           | Split socket-server and TutorWhiteboardManager       |
| API/RBAC consistency  | Standardize response shape; enforce RBAC per route   |

Run `npm run typecheck` and `npm run test` after further changes to keep the codebase green.
