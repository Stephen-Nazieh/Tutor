-- Add multi-course publishing columns to Course table
ALTER TABLE "Course" ADD COLUMN IF NOT EXISTS "region" text;
ALTER TABLE "Course" ADD COLUMN IF NOT EXISTS "country" text;
ALTER TABLE "Course" ADD COLUMN IF NOT EXISTS "parentCourseId" text;
ALTER TABLE "Course" ADD COLUMN IF NOT EXISTS "isVariant" boolean DEFAULT false NOT NULL;

-- Create indexes for efficient querying
CREATE INDEX IF NOT EXISTS "Course_parentCourseId_idx" ON "Course"("parentCourseId");
CREATE INDEX IF NOT EXISTS "Course_country_idx" ON "Course"("country");
CREATE INDEX IF NOT EXISTS "Course_region_idx" ON "Course"("region");
