-- Make serviceDescription optional in TutorApplication
-- Removes NOT NULL constraint to allow null/empty values

ALTER TABLE "TutorApplication" ALTER COLUMN "serviceDescription" DROP NOT NULL;

-- Verify the change
DO $$
BEGIN
  RAISE NOTICE 'serviceDescription column is now optional';
END $$;
