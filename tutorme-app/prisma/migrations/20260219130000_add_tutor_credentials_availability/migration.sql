-- AlterTable
ALTER TABLE "Profile" ADD COLUMN IF NOT EXISTS "credentials" TEXT;
ALTER TABLE "Profile" ADD COLUMN IF NOT EXISTS "availability" JSONB;
