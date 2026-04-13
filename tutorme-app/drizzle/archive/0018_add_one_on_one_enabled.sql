-- Migration: Add oneOnOneEnabled field to Profile table
-- For enabling/disabling 1-on-1 booking feature

ALTER TABLE "Profile" ADD COLUMN IF NOT EXISTS "oneOnOneEnabled" boolean DEFAULT false;

-- Add comment for documentation
COMMENT ON COLUMN "Profile"."oneOnOneEnabled" IS 'Whether the tutor offers one-on-one private sessions';

-- Create index for faster lookups when filtering tutors by availability
CREATE INDEX IF NOT EXISTS "Profile_oneOnOneEnabled_idx" ON "Profile"("oneOnOneEnabled") WHERE "oneOnOneEnabled" = true;
