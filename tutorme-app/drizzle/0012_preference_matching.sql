DO $$ BEGIN
  CREATE TYPE "PreferenceStatus" AS ENUM ('PENDING', 'MATCHED', 'REJECTED');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE "PreferenceSlotType" AS ENUM ('SELECTED', 'INTERSECTION');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS "StudentCoursePreference" (
  "id" text PRIMARY KEY NOT NULL,
  "studentId" text NOT NULL,
  "tutorId" text NOT NULL,
  "curriculumId" text NOT NULL,
  "sessionDensity" integer NOT NULL DEFAULT 1,
  "status" "PreferenceStatus" NOT NULL DEFAULT 'PENDING',
  "createdAt" timestamptz NOT NULL DEFAULT now(),
  "updatedAt" timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS "StudentCoursePreference_studentId_idx" ON "StudentCoursePreference" ("studentId");
CREATE INDEX IF NOT EXISTS "StudentCoursePreference_tutorId_idx" ON "StudentCoursePreference" ("tutorId");
CREATE INDEX IF NOT EXISTS "StudentCoursePreference_curriculumId_idx" ON "StudentCoursePreference" ("curriculumId");
CREATE INDEX IF NOT EXISTS "StudentCoursePreference_status_idx" ON "StudentCoursePreference" ("status");
CREATE UNIQUE INDEX IF NOT EXISTS "StudentCoursePreference_studentId_curriculumId_key" ON "StudentCoursePreference" ("studentId", "curriculumId");

CREATE TABLE IF NOT EXISTS "StudentCoursePreferenceSlot" (
  "id" text PRIMARY KEY NOT NULL,
  "preferenceId" text NOT NULL,
  "dayOfWeek" text NOT NULL,
  "startTime" text NOT NULL,
  "endTime" text NOT NULL,
  "slotType" "PreferenceSlotType" NOT NULL,
  "createdAt" timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS "StudentCoursePreferenceSlot_preferenceId_idx" ON "StudentCoursePreferenceSlot" ("preferenceId");
CREATE INDEX IF NOT EXISTS "StudentCoursePreferenceSlot_slotType_idx" ON "StudentCoursePreferenceSlot" ("slotType");
CREATE UNIQUE INDEX IF NOT EXISTS "StudentCoursePreferenceSlot_unique_key" ON "StudentCoursePreferenceSlot" ("preferenceId", "dayOfWeek", "startTime", "endTime", "slotType");
