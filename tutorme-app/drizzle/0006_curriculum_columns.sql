ALTER TABLE "Curriculum" ADD COLUMN IF NOT EXISTS "schedule" jsonb;
ALTER TABLE "Curriculum" ADD COLUMN IF NOT EXISTS "currency" text;
ALTER TABLE "Curriculum" ADD COLUMN IF NOT EXISTS "languageOfInstruction" text;
ALTER TABLE "Curriculum" ADD COLUMN IF NOT EXISTS "price" double precision;
ALTER TABLE "Curriculum" ADD COLUMN IF NOT EXISTS "curriculumSource" text;
ALTER TABLE "Curriculum" ADD COLUMN IF NOT EXISTS "outlineSource" text;
ALTER TABLE "Curriculum" ADD COLUMN IF NOT EXISTS "courseMaterials" jsonb;
ALTER TABLE "Curriculum" ADD COLUMN IF NOT EXISTS "coursePitch" text;
ALTER TABLE "Curriculum" ADD COLUMN IF NOT EXISTS "isLiveOnline" boolean NOT NULL DEFAULT false;
