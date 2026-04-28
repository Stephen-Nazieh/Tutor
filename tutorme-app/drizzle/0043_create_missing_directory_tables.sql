-- Migration: Create missing tables for student directory
-- DeployedMaterial and StudentTaskReport were defined in Drizzle schema but never migrated

-- ============================================
-- DeployedMaterial
-- ============================================
CREATE TABLE IF NOT EXISTS "DeployedMaterial" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "sessionId" text NOT NULL REFERENCES "LiveSession"("id") ON DELETE CASCADE,
  "courseId" text NOT NULL REFERENCES "Course"("id") ON DELETE CASCADE,
  "type" text NOT NULL,
  "itemId" text NOT NULL,
  "title" text NOT NULL,
  "content" jsonb,
  "sessionSequence" integer NOT NULL,
  "deployedAt" timestamp with time zone NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS "DeployedMaterial_sessionId_idx" ON "DeployedMaterial"("sessionId");
CREATE INDEX IF NOT EXISTS "DeployedMaterial_courseId_idx" ON "DeployedMaterial"("courseId");
CREATE INDEX IF NOT EXISTS "DeployedMaterial_type_idx" ON "DeployedMaterial"("type");
CREATE INDEX IF NOT EXISTS "DeployedMaterial_deployedAt_idx" ON "DeployedMaterial"("deployedAt");
CREATE INDEX IF NOT EXISTS "DeployedMaterial_sessionId_sessionSequence_idx" ON "DeployedMaterial"("sessionId", "sessionSequence");

-- ============================================
-- StudentTaskReport
-- ============================================
CREATE TABLE IF NOT EXISTS "StudentTaskReport" (
  "id" text PRIMARY KEY NOT NULL,
  "studentId" text NOT NULL REFERENCES "User"("id") ON DELETE CASCADE,
  "tutorId" text NOT NULL REFERENCES "User"("id") ON DELETE CASCADE,
  "courseId" text,
  "taskId" text,
  "type" text NOT NULL,
  "title" text NOT NULL,
  "status" text NOT NULL DEFAULT 'requested',
  "strengths" jsonb,
  "weaknesses" jsonb,
  "overallComments" text,
  "score" double precision,
  "createdAt" timestamp with time zone NOT NULL DEFAULT now(),
  "updatedAt" timestamp with time zone NOT NULL DEFAULT now(),
  "sentAt" timestamp with time zone
);
