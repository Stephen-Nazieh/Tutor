-- Add isIndependent flag to CourseVariant table
ALTER TABLE "CourseVariant" ADD COLUMN IF NOT EXISTS "isIndependent" boolean DEFAULT false NOT NULL;
