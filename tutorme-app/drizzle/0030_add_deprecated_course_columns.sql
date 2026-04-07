-- Add deprecated columns to Course table for backward compatibility
-- These columns are being phased out in favor of the new categories system,
-- but must exist for backward compatibility until fully migrated.

ALTER TABLE "Course" ADD COLUMN IF NOT EXISTS "subject" text DEFAULT 'general';
ALTER TABLE "Course" ADD COLUMN IF NOT EXISTS "gradeLevel" text;
ALTER TABLE "Course" ADD COLUMN IF NOT EXISTS "difficulty" text;
ALTER TABLE "Course" ADD COLUMN IF NOT EXISTS "estimatedHours" integer DEFAULT 0;
ALTER TABLE "Course" ADD COLUMN IF NOT EXISTS "curriculumSource" text DEFAULT 'PLATFORM';
ALTER TABLE "Course" ADD COLUMN IF NOT EXISTS "outlineSource" text DEFAULT 'SELF';
ALTER TABLE "Course" ADD COLUMN IF NOT EXISTS "courseMaterials" jsonb;
ALTER TABLE "Course" ADD COLUMN IF NOT EXISTS "coursePitch" text;

-- Make subject and estimatedHours NOT NULL to match production
ALTER TABLE "Course" ALTER COLUMN "subject" SET NOT NULL;
ALTER TABLE "Course" ALTER COLUMN "estimatedHours" SET NOT NULL;

-- Verify
DO $$
BEGIN
  RAISE NOTICE 'Deprecated columns added to Course table';
END $$;
