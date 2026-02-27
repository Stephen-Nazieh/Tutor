# RBAC and New API Routes Checklist

When adding or changing API routes that access user data or perform sensitive actions, follow this checklist so authorization stays consistent.

## 1. Authentication

- [ ] Route uses `withAuth` from `@/lib/api/middleware` (or calls `getServerSession(authOptions)` and returns 401 when no session).
- [ ] Do not rely on client-only checks; always validate session on the server.

## 2. Role and ownership

- [ ] **Role:** If the route is role-specific, pass `{ role: 'STUDENT' | 'TUTOR' | 'PARENT' | 'ADMIN' }` to `withAuth` or check `session.user.role` and return 403 when not allowed.
- [ ] **Ownership:** For resources that belong to a user (e.g. “my enrollments”, “my courses”):
  - Filter by `session.user.id` (or the correct owner id, e.g. `tutorId`, `parentId`).
  - Do not expose other users’ data based only on a resource id; verify the current user is the owner or has an allowed role.

## 3. Parent and family data

- [ ] Parent routes may only see data for students linked via `FamilyMember` / family account. Use `getFamilyAccountForParent(session)` and restrict queries to `family.studentIds` (or equivalent).
- [ ] Do not allow parents to access other families’ students or payments.

## 4. Tutor and curriculum

- [ ] Tutor routes that manage courses/content must restrict to `curriculum.creatorId === session.user.id` (or equivalent) unless the route explicitly allows shared/admin access.
- [ ] Live sessions and classes: ensure the tutor is the session owner or has the correct assignment.

## 5. Admin

- [ ] Admin-only routes must require `role: 'ADMIN'` (and optionally check admin role level or permissions if the app has them).
- [ ] Audit-sensitive admin actions (e.g. user role change, delete) via `AdminAuditLog` or equivalent.

## 6. Params and input

- [ ] Use `getParamAsync(context?.params, 'id')` (or `getParam`) for dynamic route params and return 400 when the param is missing or invalid.
- [ ] Validate request body with Zod (or shared validation) and return 400 with a clear message on failure.

## 7. Consistency

- [ ] Success: return a consistent shape (e.g. `{ success: true, data }` or `{ ...fields }`) as used in the rest of the app.
- [ ] Errors: return `{ error: string, details?: ... }` with the appropriate status (400, 401, 403, 404, 500).

## Reference

- Auth and middleware: `src/lib/api/middleware.ts`
- Params helper: `src/lib/api/params.ts`
- Parent helpers: `src/lib/api/parent-helpers.ts`
- Role checks: `withAuth(handler, { role: '...' })`
