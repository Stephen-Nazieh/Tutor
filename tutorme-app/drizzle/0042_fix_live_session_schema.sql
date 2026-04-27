-- Migration: Fix live session schema — indexes, FKs, and defaults
-- Generated manually due to production schema drift

-- Indexes for live session tables
CREATE INDEX IF NOT EXISTS "LiveSession_roomId_idx" ON "LiveSession"("roomId");
CREATE INDEX IF NOT EXISTS "Message_sessionId_timestamp_idx" ON "Message"("sessionId", "timestamp");
CREATE INDEX IF NOT EXISTS "DirectMessage_conversationId_createdAt_idx" ON "DirectMessage"("conversationId", "createdAt");
CREATE INDEX IF NOT EXISTS "DeployedMaterial_sessionId_sessionSequence_idx" ON "DeployedMaterial"("sessionId", "sessionSequence");
CREATE INDEX IF NOT EXISTS "PollResponse_createdAt_idx" ON "PollResponse"("createdAt");

-- Fix Poll.correctOptionId foreign key
-- First remove any orphaned values so the FK can be added safely
UPDATE "Poll" SET "correctOptionId" = NULL
WHERE "correctOptionId" IS NOT NULL
  AND "correctOptionId" NOT IN (SELECT "optionId" FROM "PollOption");

-- Add the foreign key constraint if it doesn't already exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints
    WHERE constraint_name = 'Poll_correctOptionId_fkey'
      AND table_name = 'Poll'
  ) THEN
    ALTER TABLE "Poll"
      ADD CONSTRAINT "Poll_correctOptionId_fkey"
      FOREIGN KEY ("correctOptionId") REFERENCES "PollOption"("optionId")
      ON DELETE SET NULL;
  END IF;
END $$;
