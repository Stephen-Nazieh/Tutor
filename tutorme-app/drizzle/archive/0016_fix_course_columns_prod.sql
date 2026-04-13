-- Migration: Ensure all required Curriculum columns exist with proper defaults
-- Run this against production if course creation fails

-- Add isLiveOnline if missing (required, NOT NULL)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'Curriculum' AND column_name = 'isLiveOnline'
  ) THEN
    ALTER TABLE "Curriculum" ADD COLUMN "isLiveOnline" BOOLEAN NOT NULL DEFAULT false;
    RAISE NOTICE 'Added isLiveOnline column';
  ELSE
    -- Ensure NOT NULL constraint and default
    ALTER TABLE "Curriculum" ALTER COLUMN "isLiveOnline" SET NOT NULL;
    ALTER TABLE "Curriculum" ALTER COLUMN "isLiveOnline" SET DEFAULT false;
    RAISE NOTICE 'Updated isLiveOnline column constraints';
  END IF;
END $$;

-- Add isFree if missing (required, NOT NULL)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'Curriculum' AND column_name = 'isFree'
  ) THEN
    ALTER TABLE "Curriculum" ADD COLUMN "isFree" BOOLEAN NOT NULL DEFAULT false;
    RAISE NOTICE 'Added isFree column';
  ELSE
    -- Ensure NOT NULL constraint and default
    ALTER TABLE "Curriculum" ALTER COLUMN "isFree" SET NOT NULL;
    ALTER TABLE "Curriculum" ALTER COLUMN "isFree" SET DEFAULT false;
    RAISE NOTICE 'Updated isFree column constraints';
  END IF;
END $$;

-- Add difficulty if missing (required, NOT NULL)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'Curriculum' AND column_name = 'difficulty'
  ) THEN
    ALTER TABLE "Curriculum" ADD COLUMN "difficulty" TEXT NOT NULL DEFAULT 'intermediate';
    RAISE NOTICE 'Added difficulty column';
  ELSE
    -- Ensure NOT NULL constraint and default
    ALTER TABLE "Curriculum" ALTER COLUMN "difficulty" SET NOT NULL;
    ALTER TABLE "Curriculum" ALTER COLUMN "difficulty" SET DEFAULT 'intermediate';
    RAISE NOTICE 'Updated difficulty column constraints';
  END IF;
END $$;

-- Add estimatedHours if missing (required, NOT NULL)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'Curriculum' AND column_name = 'estimatedHours'
  ) THEN
    ALTER TABLE "Curriculum" ADD COLUMN "estimatedHours" INTEGER NOT NULL DEFAULT 0;
    RAISE NOTICE 'Added estimatedHours column';
  ELSE
    -- Ensure NOT NULL constraint and default
    ALTER TABLE "Curriculum" ALTER COLUMN "estimatedHours" SET NOT NULL;
    ALTER TABLE "Curriculum" ALTER COLUMN "estimatedHours" SET DEFAULT 0;
    RAISE NOTICE 'Updated estimatedHours column constraints';
  END IF;
END $$;

-- Update any NULL values in existing rows
UPDATE "Curriculum" SET "isLiveOnline" = false WHERE "isLiveOnline" IS NULL;
UPDATE "Curriculum" SET "isFree" = false WHERE "isFree" IS NULL;
UPDATE "Curriculum" SET "difficulty" = 'intermediate' WHERE "difficulty" IS NULL;
UPDATE "Curriculum" SET "estimatedHours" = 0 WHERE "estimatedHours" IS NULL;

-- Add other optional columns if missing (for backwards compatibility)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'Curriculum' AND column_name = 'categories'
  ) THEN
    ALTER TABLE "Curriculum" ADD COLUMN "categories" TEXT[];
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'Curriculum' AND column_name = 'currency'
  ) THEN
    ALTER TABLE "Curriculum" ADD COLUMN "currency" TEXT;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'Curriculum' AND column_name = 'schedule'
  ) THEN
    ALTER TABLE "Curriculum" ADD COLUMN "schedule" JSONB;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'Curriculum' AND column_name = 'languageOfInstruction'
  ) THEN
    ALTER TABLE "Curriculum" ADD COLUMN "languageOfInstruction" TEXT;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'Curriculum' AND column_name = 'price'
  ) THEN
    ALTER TABLE "Curriculum" ADD COLUMN "price" DOUBLE PRECISION;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'Curriculum' AND column_name = 'curriculumSource'
  ) THEN
    ALTER TABLE "Curriculum" ADD COLUMN "curriculumSource" TEXT;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'Curriculum' AND column_name = 'outlineSource'
  ) THEN
    ALTER TABLE "Curriculum" ADD COLUMN "outlineSource" TEXT;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'Curriculum' AND column_name = 'courseMaterials'
  ) THEN
    ALTER TABLE "Curriculum" ADD COLUMN "courseMaterials" JSONB;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'Curriculum' AND column_name = 'coursePitch'
  ) THEN
    ALTER TABLE "Curriculum" ADD COLUMN "coursePitch" TEXT;
  END IF;
END $$;
