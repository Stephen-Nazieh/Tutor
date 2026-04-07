-- Focused migration: Rename Curriculum tables to Course tables in production
-- Only operates on tables that exist

-- Step 1: Rename main tables
ALTER TABLE IF EXISTS "Curriculum" RENAME TO "Course";
ALTER TABLE IF EXISTS "CurriculumLesson" RENAME TO "CourseLesson";
ALTER TABLE IF EXISTS "CurriculumEnrollment" RENAME TO "CourseEnrollment";
ALTER TABLE IF EXISTS "CurriculumProgress" RENAME TO "CourseProgress";
ALTER TABLE IF EXISTS "CurriculumLessonProgress" RENAME TO "CourseLessonProgress";
ALTER TABLE IF EXISTS "CurriculumShare" RENAME TO "CourseShare";
ALTER TABLE IF EXISTS "CurriculumCatalog" RENAME TO "CourseCatalog";

-- Step 2: Rename foreign key columns in CourseLesson
ALTER TABLE "CourseLesson" RENAME COLUMN "curriculumId" TO "courseId";

-- Step 3: Rename foreign key columns in CourseEnrollment  
ALTER TABLE "CourseEnrollment" RENAME COLUMN "curriculumId" TO "courseId";

-- Step 4: Rename foreign key columns in CourseProgress
ALTER TABLE "CourseProgress" RENAME COLUMN "curriculumId" TO "courseId";

-- Step 5: Rename foreign key columns in CourseShare
ALTER TABLE "CourseShare" RENAME COLUMN "curriculumId" TO "courseId";

-- Step 6: Rename foreign key columns in LiveSession
ALTER TABLE "LiveSession" RENAME COLUMN "curriculumId" TO "courseId";

-- Step 7: Update indexes
DROP INDEX IF EXISTS "Curriculum_isPublished_idx";
DROP INDEX IF EXISTS "Curriculum_creatorId_idx";
CREATE INDEX IF NOT EXISTS "Course_isPublished_idx" ON "Course"("isPublished");
CREATE INDEX IF NOT EXISTS "Course_creatorId_idx" ON "Course"("creatorId");

DROP INDEX IF EXISTS "CurriculumLesson_curriculumId_idx";
CREATE INDEX IF NOT EXISTS "CourseLesson_courseId_idx" ON "CourseLesson"("courseId");

DROP INDEX IF EXISTS "CurriculumEnrollment_studentId_idx";
DROP INDEX IF EXISTS "CurriculumEnrollment_studentId_curriculumId_key";
CREATE INDEX IF NOT EXISTS "CourseEnrollment_studentId_idx" ON "CourseEnrollment"("studentId");
CREATE UNIQUE INDEX IF NOT EXISTS "CourseEnrollment_studentId_courseId_key" ON "CourseEnrollment"("studentId", "courseId");

DROP INDEX IF EXISTS "LiveSession_curriculumId_idx";
CREATE INDEX IF NOT EXISTS "LiveSession_courseId_idx" ON "LiveSession"("courseId");
