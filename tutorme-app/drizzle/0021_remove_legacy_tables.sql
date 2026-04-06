-- Remove legacy tables: generated tasks, clinics/bookings, gamification, whiteboard, study groups

-- Fix TutorApplication.userId missing column
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'TutorApplication' AND column_name = 'userId'
  ) THEN
    ALTER TABLE "TutorApplication" ADD COLUMN "userId" text;
  END IF;
END $$;

DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'TutorApplication' AND column_name = 'user_id'
  ) THEN
    EXECUTE 'UPDATE "TutorApplication" SET "userId" = "user_id" WHERE "userId" IS NULL';
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM "TutorApplication" WHERE "userId" IS NULL) THEN
    ALTER TABLE "TutorApplication" ALTER COLUMN "userId" SET NOT NULL;
  END IF;
END $$;

CREATE UNIQUE INDEX IF NOT EXISTS "TutorApplication_userId_key" ON "TutorApplication" ("userId");
CREATE INDEX IF NOT EXISTS "TutorApplication_userId_idx" ON "TutorApplication" ("userId");

-- Generated tasks
DROP TABLE IF EXISTS "GeneratedTask" CASCADE;

-- Clinics & bookings
DROP TABLE IF EXISTS "ClinicBooking" CASCADE;
DROP TABLE IF EXISTS "Clinic" CASCADE;

-- Gamification
DROP TABLE IF EXISTS "UserBadge" CASCADE;
DROP TABLE IF EXISTS "Badge" CASCADE;
DROP TABLE IF EXISTS "UserDailyQuest" CASCADE;
DROP TABLE IF EXISTS "MissionProgress" CASCADE;
DROP TABLE IF EXISTS "Mission" CASCADE;
DROP TABLE IF EXISTS "LeaderboardEntry" CASCADE;
DROP TABLE IF EXISTS "Achievement" CASCADE;
DROP TABLE IF EXISTS "UserGamification" CASCADE;

-- Whiteboard
DROP TABLE IF EXISTS "MathAIInteraction" CASCADE;
DROP TABLE IF EXISTS "MathWhiteboardSnapshot" CASCADE;
DROP TABLE IF EXISTS "MathWhiteboardParticipant" CASCADE;
DROP TABLE IF EXISTS "MathWhiteboardPage" CASCADE;
DROP TABLE IF EXISTS "MathWhiteboardSession" CASCADE;
DROP TABLE IF EXISTS "WhiteboardSession" CASCADE;
DROP TABLE IF EXISTS "WhiteboardSnapshot" CASCADE;
DROP TABLE IF EXISTS "WhiteboardPage" CASCADE;
DROP TABLE IF EXISTS "Whiteboard" CASCADE;

-- Study groups
DROP TABLE IF EXISTS "StudyGroupMember" CASCADE;
DROP TABLE IF EXISTS "StudyGroup" CASCADE;
