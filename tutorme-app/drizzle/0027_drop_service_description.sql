-- Completely remove serviceDescription column from TutorApplication

ALTER TABLE "TutorApplication" DROP COLUMN IF EXISTS "serviceDescription";

-- Verify
DO $$
BEGIN
  RAISE NOTICE 'serviceDescription column removed from TutorApplication';
END $$;
