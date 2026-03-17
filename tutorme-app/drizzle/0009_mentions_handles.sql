-- Mentions + handles
CREATE EXTENSION IF NOT EXISTS pgcrypto;

ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "handle" text;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'User_handle_format_chk'
  ) THEN
    ALTER TABLE "User"
      ADD CONSTRAINT "User_handle_format_chk"
      CHECK ("handle" IS NULL OR "handle" ~ '^[A-Za-z0-9_]{3,15}$');
  END IF;
END $$;

CREATE UNIQUE INDEX IF NOT EXISTS "User_handle_lower_key"
  ON "User" (lower("handle"))
  WHERE "handle" IS NOT NULL;

CREATE INDEX IF NOT EXISTS "User_handle_idx" ON "User" ("handle");

CREATE TABLE IF NOT EXISTS "Mention" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "messageId" text NOT NULL,
  "mentionerId" text NOT NULL,
  "mentioneeId" text NOT NULL,
  "createdAt" timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT "Mention_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "DirectMessage"("id") ON DELETE CASCADE,
  CONSTRAINT "Mention_mentionerId_fkey" FOREIGN KEY ("mentionerId") REFERENCES "User"("id") ON DELETE CASCADE,
  CONSTRAINT "Mention_mentioneeId_fkey" FOREIGN KEY ("mentioneeId") REFERENCES "User"("id") ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS "Mention_messageId_idx" ON "Mention" ("messageId");
CREATE INDEX IF NOT EXISTS "Mention_mentionerId_idx" ON "Mention" ("mentionerId");
CREATE INDEX IF NOT EXISTS "Mention_mentioneeId_idx" ON "Mention" ("mentioneeId");
