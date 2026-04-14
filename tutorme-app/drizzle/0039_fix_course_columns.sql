-- Fix Course table columns to match schema
-- The schema removed: subject, gradeLevel, difficulty, estimatedHours, coursePitch, courseMaterials, outlineSource, curriculumSource
-- This migration ensures the table only has the columns defined in the schema

-- First, check which columns actually exist and drop the deprecated ones
DO $$
BEGIN
  -- Drop deprecated columns if they exist
  ALTER TABLE "Course" DROP COLUMN IF EXISTS "subject";
  ALTER TABLE "Course" DROP COLUMN IF EXISTS "gradeLevel";
  ALTER TABLE "Course" DROP COLUMN IF EXISTS "difficulty";
  ALTER TABLE "Course" DROP COLUMN IF EXISTS "estimatedHours";
  ALTER TABLE "Course" DROP COLUMN IF EXISTS "coursePitch";
  ALTER TABLE "Course" DROP COLUMN IF EXISTS "courseMaterials";
  ALTER TABLE "Course" DROP COLUMN IF EXISTS "outlineSource";
  ALTER TABLE "Course" DROP COLUMN IF EXISTS "curriculumSource";
  
  -- Also drop from CourseLesson if they exist
  ALTER TABLE "CourseLesson" DROP COLUMN IF EXISTS "moduleId";
  ALTER TABLE "CourseLesson" DROP COLUMN IF EXISTS "difficulty";
  ALTER TABLE "CourseLesson" DROP COLUMN IF EXISTS "learningObjectives";
  ALTER TABLE "CourseLesson" DROP COLUMN IF EXISTS "teachingPoints";
  ALTER TABLE "CourseLesson" DROP COLUMN IF EXISTS "keyPoints";
  ALTER TABLE "CourseLesson" DROP COLUMN IF EXISTS "examples";
  ALTER TABLE "CourseLesson" DROP COLUMN IF EXISTS "practiceProblems";
  ALTER TABLE "CourseLesson" DROP COLUMN IF EXISTS "commonMisconceptions";
  ALTER TABLE "CourseLesson" DROP COLUMN IF EXISTS "prerequisiteLessonId";
  ALTER TABLE "CourseLesson" DROP COLUMN IF EXISTS "keyConcepts";
END $$;
