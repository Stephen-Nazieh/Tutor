-- Fix TutorApplication.userId column - ensure it exists and has correct constraints

-- First, ensure the column exists (using lowercase as PostgreSQL may have created it that way)
DO $$
BEGIN
  -- Check if column exists in any case
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'TutorApplication' 
    AND column_name ILIKE 'userid'
  ) THEN
    ALTER TABLE "TutorApplication" ADD COLUMN "userId" text;
  END IF;
END $$;

-- Migrate data from old column name if exists
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'TutorApplication' AND column_name = 'user_id'
  ) THEN
    EXECUTE 'UPDATE "TutorApplication" SET "userId" = "user_id" WHERE "userId" IS NULL OR "userId" = '''';
  END IF;
END $$;

-- Set NOT NULL constraint if all rows have data
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM "TutorApplication" WHERE "userId" IS NULL LIMIT 1) THEN
    ALTER TABLE "TutorApplication" ALTER COLUMN "userId" SET NOT NULL;
  END IF;
EXCEPTION WHEN OTHERS THEN
  -- Ignore if constraint already exists or other error
  NULL;
END $$;

-- Create indexes if they don't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_indexes 
    WHERE indexname = 'TutorApplication_userId_key'
  ) THEN
    CREATE UNIQUE INDEX "TutorApplication_userId_key" ON "TutorApplication" ("userId");
  END IF;
EXCEPTION WHEN OTHERS THEN
  NULL;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_indexes 
    WHERE indexname = 'TutorApplication_userId_idx'
  ) THEN
    CREATE INDEX "TutorApplication_userId_idx" ON "TutorApplication" ("userId");
  END IF;
EXCEPTION WHEN OTHERS THEN
  NULL;
END $$;
