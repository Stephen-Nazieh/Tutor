-- Mega Migration: Rename all lingering "curriculum" references to "course"
-- Note: The physical table names and primary keys were already renamed to "Course" and "id" in previous migrations.
-- This migration ensures any remaining indexes, constraints, or foreign keys are updated.

DO $$
BEGIN
  -- Rename Foreign Key columns if they still use curriculumId
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'CourseEnrollment' AND column_name = 'curriculumId') THEN
    ALTER TABLE "CourseEnrollment" RENAME COLUMN "curriculumId" TO "courseId";
  END IF;

  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'CourseProgress' AND column_name = 'curriculumId') THEN
    ALTER TABLE "CourseProgress" RENAME COLUMN "curriculumId" TO "courseId";
  END IF;

  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'CalendarEvent' AND column_name = 'curriculumId') THEN
    ALTER TABLE "CalendarEvent" RENAME COLUMN "curriculumId" TO "courseId";
  END IF;
  
  -- Rename any indexes that might still have curriculum in the name
  IF EXISTS (SELECT 1 FROM pg_class c JOIN pg_namespace n ON n.oid = c.relnamespace WHERE c.relname = 'CourseEnrollment_curriculumId_idx') THEN
    ALTER INDEX "CourseEnrollment_curriculumId_idx" RENAME TO "CourseEnrollment_courseId_idx";
  END IF;

  IF EXISTS (SELECT 1 FROM pg_class c JOIN pg_namespace n ON n.oid = c.relnamespace WHERE c.relname = 'CourseProgress_curriculumId_idx') THEN
    ALTER INDEX "CourseProgress_curriculumId_idx" RENAME TO "CourseProgress_courseId_idx";
  END IF;
END $$;
