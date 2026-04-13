-- Migration: Fix Curriculum table columns permanently
-- This ensures all columns exist with proper defaults for production

-- First, add any missing columns with defaults
-- Using DO blocks to handle cases where columns might already exist

DO $$
BEGIN
  -- Add difficulty column if missing
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'Curriculum' AND column_name = 'difficulty'
  ) THEN
    ALTER TABLE "Curriculum" ADD COLUMN "difficulty" TEXT NOT NULL DEFAULT 'intermediate';
    RAISE NOTICE 'Added difficulty column';
  ELSE
    -- Ensure it has a default and is NOT NULL
    ALTER TABLE "Curriculum" ALTER COLUMN "difficulty" SET DEFAULT 'intermediate';
    UPDATE "Curriculum" SET "difficulty" = 'intermediate' WHERE "difficulty" IS NULL;
    ALTER TABLE "Curriculum" ALTER COLUMN "difficulty" SET NOT NULL;
    RAISE NOTICE 'Updated difficulty column constraints';
  END IF;
END $$;

DO $$
BEGIN
  -- Add estimatedHours column if missing
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'Curriculum' AND column_name = 'estimatedHours'
  ) THEN
    ALTER TABLE "Curriculum" ADD COLUMN "estimatedHours" INTEGER NOT NULL DEFAULT 0;
    RAISE NOTICE 'Added estimatedHours column';
  ELSE
    ALTER TABLE "Curriculum" ALTER COLUMN "estimatedHours" SET DEFAULT 0;
    UPDATE "Curriculum" SET "estimatedHours" = 0 WHERE "estimatedHours" IS NULL;
    ALTER TABLE "Curriculum" ALTER COLUMN "estimatedHours" SET NOT NULL;
    RAISE NOTICE 'Updated estimatedHours column constraints';
  END IF;
END $$;

DO $$
BEGIN
  -- Add isLiveOnline column if missing
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'Curriculum' AND column_name = 'isLiveOnline'
  ) THEN
    ALTER TABLE "Curriculum" ADD COLUMN "isLiveOnline" BOOLEAN NOT NULL DEFAULT false;
    RAISE NOTICE 'Added isLiveOnline column';
  ELSE
    ALTER TABLE "Curriculum" ALTER COLUMN "isLiveOnline" SET DEFAULT false;
    UPDATE "Curriculum" SET "isLiveOnline" = false WHERE "isLiveOnline" IS NULL;
    ALTER TABLE "Curriculum" ALTER COLUMN "isLiveOnline" SET NOT NULL;
    RAISE NOTICE 'Updated isLiveOnline column constraints';
  END IF;
END $$;

DO $$
BEGIN
  -- Add isFree column if missing
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'Curriculum' AND column_name = 'isFree'
  ) THEN
    ALTER TABLE "Curriculum" ADD COLUMN "isFree" BOOLEAN NOT NULL DEFAULT false;
    RAISE NOTICE 'Added isFree column';
  ELSE
    ALTER TABLE "Curriculum" ALTER COLUMN "isFree" SET DEFAULT false;
    UPDATE "Curriculum" SET "isFree" = false WHERE "isFree" IS NULL;
    ALTER TABLE "Curriculum" ALTER COLUMN "isFree" SET NOT NULL;
    RAISE NOTICE 'Updated isFree column constraints';
  END IF;
END $$;

DO $$
BEGIN
  -- Add isPublished column if missing
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'Curriculum' AND column_name = 'isPublished'
  ) THEN
    ALTER TABLE "Curriculum" ADD COLUMN "isPublished" BOOLEAN NOT NULL DEFAULT false;
    RAISE NOTICE 'Added isPublished column';
  ELSE
    ALTER TABLE "Curriculum" ALTER COLUMN "isPublished" SET DEFAULT false;
    UPDATE "Curriculum" SET "isPublished" = false WHERE "isPublished" IS NULL;
    ALTER TABLE "Curriculum" ALTER COLUMN "isPublished" SET NOT NULL;
    RAISE NOTICE 'Updated isPublished column constraints';
  END IF;
END $$;

-- Optional columns (can be NULL)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'Curriculum' AND column_name = 'categories'
  ) THEN
    ALTER TABLE "Curriculum" ADD COLUMN "categories" TEXT[];
    RAISE NOTICE 'Added categories column';
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'Curriculum' AND column_name = 'currency'
  ) THEN
    ALTER TABLE "Curriculum" ADD COLUMN "currency" TEXT;
    RAISE NOTICE 'Added currency column';
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'Curriculum' AND column_name = 'schedule'
  ) THEN
    ALTER TABLE "Curriculum" ADD COLUMN "schedule" JSONB;
    RAISE NOTICE 'Added schedule column';
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'Curriculum' AND column_name = 'languageOfInstruction'
  ) THEN
    ALTER TABLE "Curriculum" ADD COLUMN "languageOfInstruction" TEXT;
    RAISE NOTICE 'Added languageOfInstruction column';
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'Curriculum' AND column_name = 'price'
  ) THEN
    ALTER TABLE "Curriculum" ADD COLUMN "price" DOUBLE PRECISION;
    RAISE NOTICE 'Added price column';
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'Curriculum' AND column_name = 'curriculumSource'
  ) THEN
    ALTER TABLE "Curriculum" ADD COLUMN "curriculumSource" TEXT;
    RAISE NOTICE 'Added curriculumSource column';
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'Curriculum' AND column_name = 'outlineSource'
  ) THEN
    ALTER TABLE "Curriculum" ADD COLUMN "outlineSource" TEXT;
    RAISE NOTICE 'Added outlineSource column';
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'Curriculum' AND column_name = 'courseMaterials'
  ) THEN
    ALTER TABLE "Curriculum" ADD COLUMN "courseMaterials" JSONB;
    RAISE NOTICE 'Added courseMaterials column';
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'Curriculum' AND column_name = 'coursePitch'
  ) THEN
    ALTER TABLE "Curriculum" ADD COLUMN "coursePitch" TEXT;
    RAISE NOTICE 'Added coursePitch column';
  END IF;
END $$;

-- Verify the table structure
SELECT 
  column_name, 
  data_type, 
  is_nullable, 
  column_default
FROM information_schema.columns 
WHERE table_name = 'Curriculum' 
ORDER BY ordinal_position;
