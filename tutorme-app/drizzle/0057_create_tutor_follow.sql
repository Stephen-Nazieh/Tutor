-- Ensure the TutorFollow table exists with the correct FKs/indexes.
-- The original 0010_tutor_follow migration is an empty placeholder (real DDL was
-- archived) and 0032 only ALTERs the table, so the active chain never reliably
-- created/constrained it — follow/unfollow could 500. Idempotent and safe to run
-- whether the table is missing or already present (possibly with legacy rows).
CREATE TABLE IF NOT EXISTS "TutorFollow" (
  "followId" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "followerId" text NOT NULL,
  "tutorId" text NOT NULL,
  "createdAt" timestamptz DEFAULT now() NOT NULL
);

-- Remove orphaned rows (follows referencing a since-deleted user) so the FK
-- constraints below can be added and validated. Without this, ADD CONSTRAINT
-- fails on a pre-existing table that accumulated rows while no FK was enforced.
DELETE FROM "TutorFollow"
WHERE "followerId" NOT IN (SELECT "id" FROM "User")
   OR "tutorId" NOT IN (SELECT "id" FROM "User");

DO $$ BEGIN
  ALTER TABLE "TutorFollow"
    ADD CONSTRAINT "TutorFollow_followerId_User_id_fk"
    FOREIGN KEY ("followerId") REFERENCES "User"("id") ON DELETE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  ALTER TABLE "TutorFollow"
    ADD CONSTRAINT "TutorFollow_tutorId_User_id_fk"
    FOREIGN KEY ("tutorId") REFERENCES "User"("id") ON DELETE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

CREATE INDEX IF NOT EXISTS "TutorFollow_followerId_idx" ON "TutorFollow" ("followerId");
CREATE INDEX IF NOT EXISTS "TutorFollow_tutorId_idx" ON "TutorFollow" ("tutorId");
CREATE UNIQUE INDEX IF NOT EXISTS "TutorFollow_follower_tutor_key" ON "TutorFollow" ("followerId", "tutorId");
