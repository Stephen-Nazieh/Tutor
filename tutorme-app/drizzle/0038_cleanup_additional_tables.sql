-- Additional cleanup: Remove AI Tutor tables and more deprecated columns
-- Generated: 2026-04-13

-- ============================================
-- 1. Drop AI Tutor tables
-- ============================================
DROP TABLE IF EXISTS "AIInteractionSession" CASCADE;
DROP TABLE IF EXISTS "AITutorDailyUsage" CASCADE;
DROP TABLE IF EXISTS "AITutorEnrollment" CASCADE;
DROP TABLE IF EXISTS "AITutorSubscription" CASCADE;

-- ============================================
-- 2. Remove deprecated columns from Course table
-- ============================================
ALTER TABLE "Course" DROP COLUMN IF EXISTS "coursePitch";
ALTER TABLE "Course" DROP COLUMN IF EXISTS "courseMaterials";
ALTER TABLE "Course" DROP COLUMN IF EXISTS "outlineSource";
ALTER TABLE "Course" DROP COLUMN IF EXISTS "curriculumSource";

-- ============================================
-- 3. Remove deprecated columns from CourseLesson table
-- ============================================
ALTER TABLE "CourseLesson" DROP COLUMN IF EXISTS "keyConcepts";
-- prerequisiteLessonId was already removed in migration 0037
