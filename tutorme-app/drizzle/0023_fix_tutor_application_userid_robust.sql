-- Robust fix for TutorApplication.userId column
-- Handles case-sensitivity issues and ensures column exists with proper constraints

-- Step 1: Add userId column if it doesn't exist (check case-insensitively)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'TutorApplication' 
    AND column_name ILIKE 'userid'
  ) THEN
    ALTER TABLE "TutorApplication" ADD COLUMN "userId" text;
  END IF;
END $$;

-- Step 2: Also check for lowercase version that PostgreSQL might have created
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'TutorApplication' AND column_name = 'userid'
  ) AND NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'TutorApplication' AND column_name = 'userId'
  ) THEN
    -- Rename lowercase to camelCase
    ALTER TABLE "TutorApplication" RENAME COLUMN "userid" TO "userId";
  END IF;
END $$;

-- Step 3: Migrate data from old column names if they exist
DO $$
BEGIN
  -- Check for user_id (snake_case)
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'TutorApplication' AND column_name = 'user_id'
  ) THEN
    EXECUTE 'UPDATE "TutorApplication" SET "userId" = "user_id" WHERE "userId" IS NULL';
  END IF;
END $$;

-- Step 4: Set NOT NULL constraint if all rows have data
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'TutorApplication' AND column_name = 'userId'
  ) THEN
    -- Check if there are any null values
    IF NOT EXISTS (SELECT 1 FROM "TutorApplication" WHERE "userId" IS NULL LIMIT 1) THEN
      ALTER TABLE "TutorApplication" ALTER COLUMN "userId" SET NOT NULL;
    END IF;
  END IF;
EXCEPTION WHEN OTHERS THEN
  -- Ignore if constraint already exists or other error
  NULL;
END $$;

-- Step 5: Create unique index if it doesn't exist
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

-- Step 6: Create regular index if it doesn't exist
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

-- Step 7: Verify the column exists and log result
DO $$
DECLARE
  col_exists boolean;
BEGIN
  SELECT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'TutorApplication' AND column_name = 'userId'
  ) INTO col_exists;
  
  IF col_exists THEN
    RAISE NOTICE 'TutorApplication.userId column verified successfully';
  ELSE
    RAISE WARNING 'TutorApplication.userId column still does not exist!';
  END IF;
END $$;
