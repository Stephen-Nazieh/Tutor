-- Force fix: Ensure TutorApplication has correct column structure
-- This migration handles the case where previous fixes didn't apply

-- Drop and recreate the table with correct structure
-- WARNING: This will lose data in TutorApplication table
-- Only run this if the table is empty or data loss is acceptable

DO $$
BEGIN
  -- Check if we need to fix the table
  IF EXISTS (
    SELECT 1 FROM information_schema.tables 
    WHERE table_name = 'TutorApplication'
  ) THEN
    -- Check current columns
    DECLARE
      has_camel_case boolean;
      has_lower_case boolean;
    BEGIN
      SELECT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'TutorApplication' AND column_name = 'userId'
      ) INTO has_camel_case;
      
      SELECT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'TutorApplication' AND column_name = 'userid'
      ) INTO has_lower_case;
      
      -- If only lowercase exists, we're good (Drizzle should work)
      -- If camelCase exists, we're good
      -- If neither exists, add the column
      -- If both exist (weird state), drop camelCase and keep lowercase
      
      IF has_camel_case AND has_lower_case THEN
        -- Weird state - drop the camelCase column
        ALTER TABLE "TutorApplication" DROP COLUMN "userId";
        RAISE NOTICE 'Dropped duplicate camelCase userId column';
      ELSIF NOT has_camel_case AND NOT has_lower_case THEN
        -- Column doesn't exist at all - add it
        ALTER TABLE "TutorApplication" ADD COLUMN "userid" text;
        RAISE NOTICE 'Added missing userid column';
      ELSIF has_camel_case AND NOT has_lower_case THEN
        -- Only camelCase exists - rename to lowercase
        ALTER TABLE "TutorApplication" RENAME COLUMN "userId" TO "userid";
        RAISE NOTICE 'Renamed userId to userid';
      ELSE
        RAISE NOTICE 'Column already in correct state (userid lowercase)';
      END IF;
    END;
  END IF;
END $$;

-- Ensure column is NOT NULL
DO $$
BEGIN
  ALTER TABLE "TutorApplication" ALTER COLUMN "userid" SET NOT NULL;
EXCEPTION WHEN OTHERS THEN
  RAISE NOTICE 'Could not set NOT NULL: %', SQLERRM;
END $$;

-- Create indexes on lowercase column name
DO $$
BEGIN
  CREATE UNIQUE INDEX IF NOT EXISTS "TutorApplication_userid_key" ON "TutorApplication" ("userid");
EXCEPTION WHEN OTHERS THEN
  RAISE NOTICE 'Could not create unique index: %', SQLERRM;
END $$;

DO $$
BEGIN
  CREATE INDEX IF NOT EXISTS "TutorApplication_userid_idx" ON "TutorApplication" ("userid");
EXCEPTION WHEN OTHERS THEN
  RAISE NOTICE 'Could not create index: %', SQLERRM;
END $$;

-- Verify
DO $$
DECLARE
  col_name text;
BEGIN
  SELECT column_name INTO col_name
  FROM information_schema.columns
  WHERE table_name = 'TutorApplication' AND column_name ILIKE 'userid';
  
  RAISE NOTICE 'TutorApplication user column: %', col_name;
END $$;
