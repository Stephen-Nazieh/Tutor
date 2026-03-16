-- Tutor follow system
CREATE TABLE IF NOT EXISTS "TutorFollow" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "followerId" text NOT NULL,
  "tutorId" text NOT NULL,
  "createdAt" timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT "TutorFollow_followerId_fkey" FOREIGN KEY ("followerId") REFERENCES "User"("id") ON DELETE CASCADE,
  CONSTRAINT "TutorFollow_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "User"("id") ON DELETE CASCADE
);

CREATE UNIQUE INDEX IF NOT EXISTS "TutorFollow_follower_tutor_key" ON "TutorFollow" ("followerId", "tutorId");
CREATE INDEX IF NOT EXISTS "TutorFollow_followerId_idx" ON "TutorFollow" ("followerId");
CREATE INDEX IF NOT EXISTS "TutorFollow_tutorId_idx" ON "TutorFollow" ("tutorId");
