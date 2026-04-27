-- Add durationMinutes to LiveSession for session end-time calculations
ALTER TABLE "LiveSession"
  ADD COLUMN IF NOT EXISTS "durationMinutes" integer NOT NULL DEFAULT 120;
