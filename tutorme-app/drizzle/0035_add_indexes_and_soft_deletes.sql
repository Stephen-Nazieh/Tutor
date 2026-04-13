-- Add missing index on CourseLessonProgress
CREATE INDEX IF NOT EXISTS "CourseLessonProgress_lessonId_idx" ON "CourseLessonProgress"("lessonId");

-- Add soft delete columns to critical tables
ALTER TABLE "Course" ADD COLUMN IF NOT EXISTS "deletedAt" timestamp with time zone;
ALTER TABLE "CourseLesson" ADD COLUMN IF NOT EXISTS "deletedAt" timestamp with time zone;
ALTER TABLE "BuilderTask" ADD COLUMN IF NOT EXISTS "deletedAt" timestamp with time zone;

-- Create indexes for soft delete queries (common pattern: query active records)
CREATE INDEX IF NOT EXISTS "Course_deletedAt_idx" ON "Course"("deletedAt") WHERE "deletedAt" IS NULL;
CREATE INDEX IF NOT EXISTS "CourseLesson_deletedAt_idx" ON "CourseLesson"("deletedAt") WHERE "deletedAt" IS NULL;
CREATE INDEX IF NOT EXISTS "BuilderTask_deletedAt_idx" ON "BuilderTask"("deletedAt") WHERE "deletedAt" IS NULL;
