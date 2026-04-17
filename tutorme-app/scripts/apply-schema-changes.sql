-- Apply latest schema changes idempotently
-- Safe to run multiple times

-- 1. Soft delete columns
ALTER TABLE "Course" ADD COLUMN IF NOT EXISTS "deletedAt" timestamp with time zone;
ALTER TABLE "CourseLesson" ADD COLUMN IF NOT EXISTS "deletedAt" timestamp with time zone;
ALTER TABLE "BuilderTask" ADD COLUMN IF NOT EXISTS "deletedAt" timestamp with time zone;

-- 2. Indexes for soft deletes and performance
CREATE INDEX IF NOT EXISTS "Course_deletedAt_idx" ON "Course"("deletedAt") WHERE "deletedAt" IS NULL;
CREATE INDEX IF NOT EXISTS "CourseLesson_deletedAt_idx" ON "CourseLesson"("deletedAt") WHERE "deletedAt" IS NULL;
CREATE INDEX IF NOT EXISTS "BuilderTask_deletedAt_idx" ON "BuilderTask"("deletedAt") WHERE "deletedAt" IS NULL;
CREATE INDEX IF NOT EXISTS "Course_isPublished_creatorId_idx" ON "Course"("isPublished", "creatorId");

-- 3. feedbackStatus enum and column migration
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'feedback_status') THEN
    CREATE TYPE "feedback_status" AS ENUM ('ai_generated', 'tutor_modified', 'approved', 'sent_to_student', 'rejected');
  END IF;
END $$;

DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'FeedbackWorkflow' AND column_name = 'status' AND data_type = 'character varying'
  ) THEN
    ALTER TABLE "FeedbackWorkflow" ALTER COLUMN "status" TYPE "feedback_status" USING ("status"::"feedback_status");
  END IF;
END $$;

-- 4. Payment courseId column and index
ALTER TABLE "Payment" ADD COLUMN IF NOT EXISTS "courseId" text;
CREATE INDEX IF NOT EXISTS "Payment_courseId_status_idx" ON "Payment"("courseId", "status");

-- 5. Foreign key fixes
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'Session_userId_fkey' AND table_name = 'Session'
  ) THEN
    ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" 
      FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE CASCADE;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'EmergencyContact_parentId_fkey' AND table_name = 'EmergencyContact'
  ) THEN
    ALTER TABLE "EmergencyContact" ADD CONSTRAINT "EmergencyContact_parentId_fkey" 
      FOREIGN KEY ("parentId") REFERENCES "FamilyAccount"("familyAccountId") ON DELETE CASCADE;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'StudentProgressSnapshot_studentId_fkey' AND table_name = 'StudentProgressSnapshot'
  ) THEN
    ALTER TABLE "StudentProgressSnapshot" ADD CONSTRAINT "StudentProgressSnapshot_studentId_fkey" 
      FOREIGN KEY ("studentId") REFERENCES "User"("userId") ON DELETE CASCADE;
  END IF;
END $$;
