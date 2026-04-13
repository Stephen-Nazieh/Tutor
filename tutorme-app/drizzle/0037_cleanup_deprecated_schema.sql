-- Cleanup: Remove deprecated columns and tables
-- Generated: 2026-04-13

-- ============================================
-- 1. Remove deprecated columns from Course table
-- ============================================
ALTER TABLE "Course" DROP COLUMN IF EXISTS "subject";
ALTER TABLE "Course" DROP COLUMN IF EXISTS "gradeLevel";
ALTER TABLE "Course" DROP COLUMN IF EXISTS "difficulty";
ALTER TABLE "Course" DROP COLUMN IF EXISTS "estimatedHours";

-- ============================================
-- 2. Remove deprecated columns from CourseLesson table
-- ============================================
ALTER TABLE "CourseLesson" DROP COLUMN IF EXISTS "moduleId";
ALTER TABLE "CourseLesson" DROP COLUMN IF EXISTS "difficulty";
ALTER TABLE "CourseLesson" DROP COLUMN IF EXISTS "learningObjectives";
ALTER TABLE "CourseLesson" DROP COLUMN IF EXISTS "teachingPoints";
ALTER TABLE "CourseLesson" DROP COLUMN IF EXISTS "keyPoints";
ALTER TABLE "CourseLesson" DROP COLUMN IF EXISTS "examples";
ALTER TABLE "CourseLesson" DROP COLUMN IF EXISTS "practiceProblems";
ALTER TABLE "CourseLesson" DROP COLUMN IF EXISTS "commonMisconceptions";
ALTER TABLE "CourseLesson" DROP COLUMN IF EXISTS "prerequisiteLessonId";

-- ============================================
-- 3. Drop Breakout Rooms feature tables
-- ============================================
-- Drop in correct order due to foreign key constraints
DROP TABLE IF EXISTS "BreakoutRoomAssignment" CASCADE;
DROP TABLE IF EXISTS "BreakoutRoom" CASCADE;
DROP TABLE IF EXISTS "BreakoutSession" CASCADE;

-- ============================================
-- 4. Drop AI Assistant feature tables
-- ============================================
DROP TABLE IF EXISTS "AIAssistantMessage" CASCADE;
DROP TABLE IF EXISTS "AIAssistantSession" CASCADE;
DROP TABLE IF EXISTS "AIAssistantInsight" CASCADE;

-- ============================================
-- 5. Drop deprecated CourseCatalog table if it exists
-- ============================================
DROP TABLE IF EXISTS "CourseCatalog" CASCADE;

-- ============================================
-- 6. Drop unused enum types if they exist
-- ============================================
DROP TYPE IF EXISTS "BreakoutStatus" CASCADE;
