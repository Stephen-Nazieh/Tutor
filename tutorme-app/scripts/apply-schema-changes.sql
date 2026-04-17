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

-- 5. Foreign key fixes (defensive: skip if referenced column doesn't exist)
DO $$
DECLARE
  user_pk_col text;
BEGIN
  -- Discover User PK column name (could be 'userId' or 'id')
  SELECT column_name INTO user_pk_col
  FROM information_schema.columns
  WHERE table_name = 'User' AND column_name IN ('userId', 'id')
  LIMIT 1;

  -- Session -> User FK
  IF user_pk_col IS NOT NULL AND NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'Session_userId_fkey' AND table_name = 'Session'
  ) THEN
    EXECUTE format(
      'ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"(%I) ON DELETE CASCADE',
      user_pk_col
    );
  END IF;

  -- StudentProgressSnapshot -> User FK
  IF user_pk_col IS NOT NULL AND NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'StudentProgressSnapshot_studentId_fkey' AND table_name = 'StudentProgressSnapshot'
  ) THEN
    EXECUTE format(
      'ALTER TABLE "StudentProgressSnapshot" ADD CONSTRAINT "StudentProgressSnapshot_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User"(%I) ON DELETE CASCADE',
      user_pk_col
    );
  END IF;
END $$;

DO $$
DECLARE
  family_pk_col text;
BEGIN
  -- Discover FamilyAccount PK column name
  SELECT column_name INTO family_pk_col
  FROM information_schema.columns
  WHERE table_name = 'FamilyAccount' AND column_name IN ('familyAccountId', 'id')
  LIMIT 1;

  IF family_pk_col IS NOT NULL AND NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'EmergencyContact_parentId_fkey' AND table_name = 'EmergencyContact'
  ) THEN
    EXECUTE format(
      'ALTER TABLE "EmergencyContact" ADD CONSTRAINT "EmergencyContact_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "FamilyAccount"(%I) ON DELETE CASCADE',
      family_pk_col
    );
  END IF;
END $$;

-- LiveSession extensions for variant and lesson context
ALTER TABLE "LiveSession" ADD COLUMN IF NOT EXISTS "variantId" text;
ALTER TABLE "LiveSession" ADD COLUMN IF NOT EXISTS "lessonId" text;
ALTER TABLE "LiveSession" ADD COLUMN IF NOT EXISTS "topic" text;
ALTER TABLE "LiveSession" ADD COLUMN IF NOT EXISTS "objectives" text[];
ALTER TABLE "LiveSession" ADD COLUMN IF NOT EXISTS "languageOfInstruction" text;
ALTER TABLE "LiveSession" ADD COLUMN IF NOT EXISTS "nationality" text;
ALTER TABLE "LiveSession" ADD COLUMN IF NOT EXISTS "maxStudents" integer DEFAULT 50 NOT NULL;

-- Foreign keys (if not exists)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'LiveSession_variantId_fkey') THEN
    ALTER TABLE "LiveSession" ADD CONSTRAINT "LiveSession_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "CourseVariant"("variantId") ON DELETE SET NULL;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'LiveSession_lessonId_fkey') THEN
    ALTER TABLE "LiveSession" ADD CONSTRAINT "LiveSession_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "CourseLesson"("lessonId") ON DELETE SET NULL;
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS "LiveSession_variantId_idx" ON "LiveSession"("variantId");
