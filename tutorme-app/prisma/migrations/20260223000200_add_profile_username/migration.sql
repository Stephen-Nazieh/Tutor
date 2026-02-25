-- Add tutor/public handle support
ALTER TABLE "Profile"
ADD COLUMN IF NOT EXISTS "username" TEXT;

CREATE UNIQUE INDEX IF NOT EXISTS "Profile_username_key"
ON "Profile"("username");
