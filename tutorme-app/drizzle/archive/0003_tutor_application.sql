CREATE TABLE IF NOT EXISTS "TutorApplication" (
  "id" text PRIMARY KEY NOT NULL,
  "userId" text NOT NULL UNIQUE,
  "firstName" text NOT NULL,
  "middleName" text,
  "lastName" text NOT NULL,
  "legalName" text NOT NULL,
  "countryOfResidence" text NOT NULL,
  "phoneCountryCode" text NOT NULL,
  "phoneNumber" text NOT NULL,
  "educationLevel" text NOT NULL,
  "hasTeachingCertificate" boolean NOT NULL,
  "certificateName" text,
  "certificateSubjects" text,
  "tutoringExperienceRange" text NOT NULL,
  "globalExams" jsonb NOT NULL,
  "tutoringCountries" text[] NOT NULL,
  "countrySubjectSelections" jsonb NOT NULL,
  "categories" text[] NOT NULL,
  "username" text NOT NULL,
  "socialLinks" jsonb,
  "serviceDescription" text NOT NULL,
  "createdAt" timestamptz NOT NULL DEFAULT now(),
  "updatedAt" timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS "TutorApplication_userId_idx" ON "TutorApplication" ("userId");
CREATE INDEX IF NOT EXISTS "TutorApplication_username_idx" ON "TutorApplication" ("username");
