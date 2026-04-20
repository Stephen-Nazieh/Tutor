# LiveSession INSERT fails on course publish due to schema drift

## Problem Summary
Publishing a course variant (`POST /api/tutor/courses/[id]/publish`) fails when attempting to insert scheduled `LiveSession` rows. The error occurs consistently in production (Neon PostgreSQL) even after manual SQL fixes were applied.

## Error
```
Failed query: insert into "LiveSession" ("id", "tutorId", "courseId", "title", "category", "description", "scheduledAt", "startedAt", "endedAt", "status", "roomId", "roomUrl", "recordingUrl", "recordingAvailableAt", "maxStudents") values ($1, $2, $3, $4, $5, $6, $7, default, default, $8, default, default, default, default, $9)
params: 347917f3-721b-4688-8d64-fc875819f9ef,4cd5b07c-d590-46f8-883c-292f1bfadc76,b8a69889-3b69-4209-b0f5-583726b5337e,Live Session — Monday 15:00,CAE,,2026-04-20T15:00:00.000Z,scheduled,50
```

**Note:** The actual PostgreSQL error message (from `error.cause`) is not visible in the client response — only Drizzle's `DrizzleQueryError` wrapper is shown.

## Root Cause
Production database schema drift from skipped/missed migrations:

| Expected (Drizzle schema) | Actual (drifted DB) | Source of drift |
|---------------------------|---------------------|-----------------|
| `LiveSession.category` (text, notNull) | `LiveSession.subject` (old name) or missing | Migration `0019_rename_curriculum_to_course.sql` was never added to the Drizzle journal |
| `LiveSession.courseId` (text, FK) | `LiveSession.curriculumId` (old name) or missing | Same as above; migration `0032` added/dropped columns but never ran cleanly |
| `LiveSession.status` (`LiveSessionStatus` enum) | `LiveSession.status` as plain `text` | Migration `0036_schema_integrity_and_enums.sql` created enum + converted column |
| `LiveSession.maxStudents` (integer, notNull, default 50) | Missing in very old snapshots | Added in migration `0032` |

**Why `drizzle-kit migrate` was disabled:** Migration `0032` caused production drift, so schema changes are now applied manually via `scripts/apply-schema-changes.sql` instead.

## What Was Attempted

### 1. SQL script fix (`scripts/apply-schema-changes.sql`)
Updated the idempotent SQL script to:
- Rename `curriculumId` → `courseId` across `BuilderTask`, `CalendarEvent`, `LiveSession`, `ResourceShare`, `StudentPerformance`
- Rename `subject` → `category` on `LiveSession`
- Create `LiveSessionStatus`, `PayoutStatus`, `BuilderTaskType`, `BuilderTaskStatus`, `TaskDeploymentStatus` enums
- Convert `status`/`type` columns from `text` to their respective enums
- Drop deprecated columns (`type`, `gradeLevel`)
- Remove ghost columns (`variantId`, `lessonId`, `topic`, etc.) that are no longer in the Drizzle schema

**Result:** Script runs successfully, but the INSERT error persists.

### 2. Manual Neon SQL execution
Ran the focused LiveSession fix SQL directly in Neon SQL Editor:
```sql
-- Rename subject -> category
-- Add category if missing
-- Create LiveSessionStatus enum
-- Convert status text -> enum
-- Add maxStudents
```
**Result:** "Statement executed successfully" (5 queries), but publish still fails with the same error.

### 3. Runtime adaptive insert (current workaround)
Replaced Drizzle's typed `tx.insert(liveSession)` with `insertLiveSessionRaw()` which:
- Queries `information_schema.columns` at runtime to discover actual columns
- Builds a dynamic raw SQL INSERT using only columns that exist
- Uses the underlying `pg` client directly for parameter binding
- Falls back from `category` → `subject` if needed

**File:** `tutorme-app/src/app/api/tutor/courses/[id]/publish/route.ts`

### 4. Startup auto-fix module
Added `src/lib/db/startup-schema-fix.ts` which runs on app boot:
- Checks if `LiveSession.category` exists
- If not, applies all idempotent fixes automatically
- Integrated into `server.ts` initialization sequence

### 5. Diagnostic scripts
- `npm run db:check-schema` — checks for known drift issues
- `npm run db:apply-schema` — applies fixes via Node.js (no `psql` required)

## Current Code State (committed to `main`)
- ✅ Runtime adaptive insert in publish route
- ✅ Startup auto-fix module
- ✅ Improved error logging with Postgres error codes
- ✅ `db:apply-schema` / `db:check-schema` npm scripts
- ✅ Updated `apply-schema-changes.sql`

## Remaining Unknowns
1. **Why the SQL fix didn't resolve the error** — despite Neon reporting "Statement executed successfully", the publish route still throws `DrizzleQueryError` with the same query. Possible explanations:
   - The SQL ran on a different Neon branch/endpoint than the app connects to
   - A different column/constraint (not `category`/`status`) is causing the failure
   - The `pg` driver error is swallowed and the real cause is never surfaced
   - `templateCourse.description` is `undefined` and Drizzle passes it in a way the DB rejects
   - Foreign key violation on `tutorId` or `courseId` (FK constraints reference `User.id` / `Course.id`)

2. **Missing diagnostic data** — We never captured the output of:
   ```sql
   SELECT column_name, data_type, udt_name, is_nullable
   FROM information_schema.columns
   WHERE table_name = 'LiveSession';
   ```
   This would definitively show the actual DB state.

## Next Steps / Recommended Actions
- [ ] Run the diagnostic query above in the same Neon database the app connects to and paste results
- [ ] Check app server logs for the full `console.error` output from the publish route (should include `pgCode`, `pgDetail`, `pgColumn`, `pgTable`, and `schemaColumns`)
- [ ] Verify `DATABASE_URL` in production matches the Neon endpoint where SQL was executed
- [ ] If drift is confirmed on other tables, run the full `npm run db:apply-schema` script
- [ ] Once root cause is identified, decide whether to keep the runtime adaptive insert or revert to pure Drizzle after schema is fully repaired

## Related Files
- `tutorme-app/src/app/api/tutor/courses/[id]/publish/route.ts`
- `tutorme-app/src/lib/db/startup-schema-fix.ts`
- `tutorme-app/scripts/apply-schema-changes.sql`
- `tutorme-app/scripts/apply-schema-changes.js`
- `tutorme-app/scripts/check-schema-drift.js`
- `tutorme-app/src/lib/db/schema/tables/live.ts`
- `tutorme-app/server.ts`

## Environment
- **Database:** Neon PostgreSQL (production)
- **Connection:** PgBouncer pooled endpoint (`*-pooler.*.neon.tech`)
- **ORM:** Drizzle ORM
- **App:** Next.js 16 + custom `server.ts` with Socket.io
