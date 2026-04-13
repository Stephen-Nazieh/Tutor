# Database Schema Review Report

**Date**: 2026-04-10  
**Status**: All recommendations implemented  

---

## Summary of Changes

All three recommendations have been implemented:

| Recommendation | Status | Details |
|----------------|--------|---------|
| Add missing indexes | Done | Added `CourseLessonProgress_lessonId_idx` |
| Archive old migrations | Done | Moved 22 migrations to `drizzle/archive/` |
| Add soft delete columns | Done | Added `deletedAt` to Course, CourseLesson, BuilderTask |

---

## Implementation Details

### 1. Missing Index Added

**File**: `src/lib/db/schema/tables/course.ts`

Added index on `CourseLessonProgress.lessonId` for efficient lesson-based queries:

```typescript
CourseLessonProgress_lessonId_idx: index('CourseLessonProgress_lessonId_idx').on(
  table.lessonId
),
```

**Migration**: `0035_add_indexes_and_soft_deletes.sql`

---

### 2. Old Migrations Archived

**Action**: Moved 22 migrations (0000-0018) to `drizzle/archive/`

Remaining migrations in `drizzle/`:
- `0019_rename_curriculum_to_course.sql`
- `0020_add_builder_task_dmi.sql`
- `0021_remove_legacy_tables.sql`
- `0022_fix_tutor_application_userid.sql`
- `0023_fix_tutor_application_userid_robust.sql`
- `0024_fix_userid_case_permanent.sql`
- `0025_force_userid_lowercase.sql`
- `0026_make_service_description_optional.sql`
- `0027_drop_service_description.sql`
- `0028_rename_pk_columns_to_id.sql`
- `0029_curriculum_to_course_prod.sql`
- `0030_add_deprecated_course_columns.sql`
- `0031_course_lesson_builder.sql`
- `0032_loose_jubilee.sql`
- `0033_legal_rhodey.sql`
- `0034_square_black_tarantula.sql`
- `0035_add_indexes_and_soft_deletes.sql` (new)

---

### 3. Soft Delete Columns Added

**Files Modified**:
- `src/lib/db/schema/tables/course.ts` - Added to `Course` and `CourseLesson`
- `src/lib/db/schema/tables/builder.ts` - Added to `BuilderTask`

**Schema Changes**:

```typescript
// Course table
deletedAt: timestamp('deletedAt', { withTimezone: true }),

// CourseLesson table
deletedAt: timestamp('deletedAt', { withTimezone: true }),

// BuilderTask table
deletedAt: timestamp('deletedAt', { withTimezone: timeZone: true }),
```

**Migration**: `0035_add_indexes_and_soft_deletes.sql`

Also created partial indexes for efficient querying of active records:
```sql
CREATE INDEX "Course_deletedAt_idx" ON "Course"("deletedAt") WHERE "deletedAt" IS NULL;
CREATE INDEX "CourseLesson_deletedAt_idx" ON "CourseLesson"("deletedAt") WHERE "deletedAt" IS NULL;
CREATE INDEX "BuilderTask_deletedAt_idx" ON "BuilderTask"("deletedAt") WHERE "deletedAt" IS NULL;
```

---

## Migration 0035: add_indexes_and_soft_deletes

```sql
-- Add missing index on CourseLessonProgress
CREATE INDEX IF NOT EXISTS "CourseLessonProgress_lessonId_idx" ON "CourseLessonProgress"("lessonId");

-- Add soft delete columns to critical tables
ALTER TABLE "Course" ADD COLUMN IF NOT EXISTS "deletedAt" timestamp with time zone;
ALTER TABLE "CourseLesson" ADD COLUMN IF NOT EXISTS "deletedAt" timestamp with time zone;
ALTER TABLE "BuilderTask" ADD COLUMN IF NOT EXISTS "deletedAt" timestamp with time zone;

-- Create partial indexes for soft delete queries
CREATE INDEX IF NOT EXISTS "Course_deletedAt_idx" ON "Course"("deletedAt") WHERE "deletedAt" IS NULL;
CREATE INDEX IF NOT EXISTS "CourseLesson_deletedAt_idx" ON "CourseLesson"("deletedAt") WHERE "deletedAt" IS NULL;
CREATE INDEX IF NOT EXISTS "BuilderTask_deletedAt_idx" ON "BuilderTask"("deletedAt") WHERE "deletedAt" IS NULL;
```

---

## Type Check Status

✅ All TypeScript checks pass (`npm run typecheck`)

---

## Next Steps

1. **Deploy to production**:
   ```bash
   npm run db:migrate
   ```

2. **Update application code** to respect soft deletes:
   - Add `WHERE deletedAt IS NULL` to queries
   - Update delete operations to set `deletedAt` instead of hard delete
   - Add "Restore" functionality for soft-deleted items

3. **Consider adding soft delete to more tables**:
   - `LiveSession` (preserve session history)
   - `ContentItem` (preserve video content metadata)
   - `Resource` (allow recovery of deleted resources)
