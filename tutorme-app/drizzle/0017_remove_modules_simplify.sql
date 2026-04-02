-- Migration: Remove modules, simplify curriculum structure
-- Created: 2026-03-31

-- 1. Remove gradeLevel and difficulty from Curriculum
ALTER TABLE "Curriculum" DROP COLUMN IF EXISTS "gradeLevel";
ALTER TABLE "Curriculum" DROP COLUMN IF EXISTS "difficulty";

-- 2. Add curriculumId to CurriculumLesson (if not exists)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'CurriculumLesson' AND column_name = 'curriculumId'
  ) THEN
    ALTER TABLE "CurriculumLesson" ADD COLUMN "curriculumId" text;
  END IF;
END $$;

-- 3. Migrate data: copy curriculumId from modules to lessons
UPDATE "CurriculumLesson" l
SET "curriculumId" = m."curriculumId"
FROM "CurriculumModule" m
WHERE l."moduleId" = m.id;

-- 4. Make curriculumId NOT NULL after migration
ALTER TABLE "CurriculumLesson" ALTER COLUMN "curriculumId" SET NOT NULL;

-- 5. Drop moduleId from CurriculumLesson
ALTER TABLE "CurriculumLesson" DROP COLUMN IF EXISTS "moduleId";

-- 6. Remove unnecessary columns from CurriculumLesson (keep only essentials)
ALTER TABLE "CurriculumLesson" DROP COLUMN IF EXISTS "difficulty";
ALTER TABLE "CurriculumLesson" DROP COLUMN IF EXISTS "learningObjectives";
ALTER TABLE "CurriculumLesson" DROP COLUMN IF EXISTS "teachingPoints";
ALTER TABLE "CurriculumLesson" DROP COLUMN IF EXISTS "keyConcepts";
ALTER TABLE "CurriculumLesson" DROP COLUMN IF EXISTS "examples";
ALTER TABLE "CurriculumLesson" DROP COLUMN IF EXISTS "practiceProblems";
ALTER TABLE "CurriculumLesson" DROP COLUMN IF EXISTS "commonMisconceptions";
ALTER TABLE "CurriculumLesson" DROP COLUMN IF EXISTS "prerequisiteLessonIds";

-- 7. Add timestamps to CurriculumLesson if not exists
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'CurriculumLesson' AND column_name = 'createdAt'
  ) THEN
    ALTER TABLE "CurriculumLesson" ADD COLUMN "createdAt" timestamp with time zone NOT NULL DEFAULT now();
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'CurriculumLesson' AND column_name = 'updatedAt'
  ) THEN
    ALTER TABLE "CurriculumLesson" ADD COLUMN "updatedAt" timestamp with time zone NOT NULL DEFAULT now();
  END IF;
END $$;

-- 8. Update index for CurriculumLesson
DROP INDEX IF EXISTS "CurriculumLesson_moduleId_idx";
CREATE INDEX IF NOT EXISTS "CurriculumLesson_curriculumId_idx" ON "CurriculumLesson"("curriculumId");

-- 9. Drop CurriculumModule table
DROP TABLE IF EXISTS "CurriculumModule" CASCADE;

-- 10. Drop CurriculumCatalog table
DROP TABLE IF EXISTS "CurriculumCatalog" CASCADE;

-- 11. Remove module-related indexes from BuilderTask
DROP INDEX IF EXISTS "BuilderTask_moduleId_idx";
ALTER TABLE "BuilderTask" DROP COLUMN IF EXISTS "moduleId";
