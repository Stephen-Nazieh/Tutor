-- Permanent fix for TutorApplication userId column case-sensitivity issue
-- This migration ensures the column exists with the exact name expected by Drizzle ORM

-- Step 1: Add userId column if neither version exists
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'TutorApplication' 
    AND column_name ILIKE 'userid'
  ) THEN
    ALTER TABLE "TutorApplication" ADD COLUMN "userId" text;
    RAISE NOTICE 'Added userId column to TutorApplication';
  END IF;
END $$;

-- Step 2: Rename lowercase 'userid' to camelCase 'userId' if needed
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'TutorApplication' AND column_name = 'userid'
  ) AND NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'TutorApplication' AND column_name = 'userId'
  ) THEN
    ALTER TABLE "TutorApplication" RENAME COLUMN "userid" TO "userId";
    RAISE NOTICE 'Renamed userid to userId';
  END IF;
END $$;

-- Step 3: Ensure column is NOT NULL
DO $$
BEGIN
  ALTER TABLE "TutorApplication" ALTER COLUMN "userId" SET NOT NULL;
EXCEPTION WHEN OTHERS THEN
  RAISE NOTICE 'Could not set NOT NULL constraint: %', SQLERRM;
END $$;

-- Step 4: Create unique constraint/index
DO $$
BEGIN
  CREATE UNIQUE INDEX "TutorApplication_userId_key" ON "TutorApplication" ("userId");
EXCEPTION WHEN duplicate_table THEN
  RAISE NOTICE 'Unique index already exists';
EXCEPTION WHEN OTHERS THEN
  RAISE NOTICE 'Could not create unique index: %', SQLERRM;
END $$;

-- Step 5: Create regular index
DO $$
BEGIN
  CREATE INDEX "TutorApplication_userId_idx" ON "TutorApplication" ("userId");
EXCEPTION WHEN duplicate_table THEN
  RAISE NOTICE 'Index already exists';
EXCEPTION WHEN OTHERS THEN
  RAISE NOTICE 'Could not create index: %', SQLERRM;
END $$;

-- Step 6: Verify the fix
DO $$
DECLARE
  col_exists boolean;
  col_name text;
BEGIN
  SELECT column_name INTO col_name
  FROM information_schema.columns
  WHERE table_name = 'TutorApplication' AND column_name ILIKE 'userid';
  
  col_exists := col_name IS NOT NULL;
  
  IF col_exists THEN
    RAISE NOTICE 'SUCCESS: TutorApplication.userId column exists as: %', col_name;
  ELSE
    RAISE WARNING 'FAILURE: TutorApplication.userId column does not exist!';
  END IF;
END $$;
