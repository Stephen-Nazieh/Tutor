DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'Curriculum' AND column_name = 'categories'
  ) THEN
    EXECUTE 'ALTER TABLE "Curriculum" ADD COLUMN "categories" text[]';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'Curriculum' AND column_name = 'schedule'
  ) THEN
    EXECUTE 'ALTER TABLE "Curriculum" ADD COLUMN "schedule" jsonb';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'Curriculum' AND column_name = 'currency'
  ) THEN
    EXECUTE 'ALTER TABLE "Curriculum" ADD COLUMN "currency" text';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'Curriculum' AND column_name = 'languageOfInstruction'
  ) THEN
    EXECUTE 'ALTER TABLE "Curriculum" ADD COLUMN "languageOfInstruction" text';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'Curriculum' AND column_name = 'price'
  ) THEN
    EXECUTE 'ALTER TABLE "Curriculum" ADD COLUMN "price" double precision';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'Curriculum' AND column_name = 'curriculumSource'
  ) THEN
    EXECUTE 'ALTER TABLE "Curriculum" ADD COLUMN "curriculumSource" text';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'Curriculum' AND column_name = 'outlineSource'
  ) THEN
    EXECUTE 'ALTER TABLE "Curriculum" ADD COLUMN "outlineSource" text';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'Curriculum' AND column_name = 'courseMaterials'
  ) THEN
    EXECUTE 'ALTER TABLE "Curriculum" ADD COLUMN "courseMaterials" jsonb';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'Curriculum' AND column_name = 'coursePitch'
  ) THEN
    EXECUTE 'ALTER TABLE "Curriculum" ADD COLUMN "coursePitch" text';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'Curriculum' AND column_name = 'isLiveOnline'
  ) THEN
    EXECUTE 'ALTER TABLE "Curriculum" ADD COLUMN "isLiveOnline" boolean NOT NULL DEFAULT false';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'Curriculum' AND column_name = 'isFree'
  ) THEN
    EXECUTE 'ALTER TABLE "Curriculum" ADD COLUMN "isFree" boolean NOT NULL DEFAULT false';
  END IF;
END $$;

DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'User' AND column_name = 'updatedAt'
  ) THEN
    EXECUTE 'ALTER TABLE "User" ALTER COLUMN "updatedAt" SET DEFAULT now()';
  END IF;

  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'Profile' AND column_name = 'updatedAt'
  ) THEN
    EXECUTE 'ALTER TABLE "Profile" ALTER COLUMN "updatedAt" SET DEFAULT now()';
  END IF;

  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'Curriculum' AND column_name = 'updatedAt'
  ) THEN
    EXECUTE 'ALTER TABLE "Curriculum" ALTER COLUMN "updatedAt" SET DEFAULT now()';
  END IF;

  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'CurriculumLessonProgress' AND column_name = 'updatedAt'
  ) THEN
    EXECUTE 'ALTER TABLE "CurriculumLessonProgress" ALTER COLUMN "updatedAt" SET DEFAULT now()';
  END IF;
END $$;
