CREATE TABLE IF NOT EXISTS "StudentMemoryProfile" (
  "studentId" text PRIMARY KEY NOT NULL,
  "profile" jsonb NOT NULL,
  "createdAt" timestamptz NOT NULL DEFAULT now(),
  "updatedAt" timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS "StudentMemoryProfile_studentId_idx" ON "StudentMemoryProfile" ("studentId");

CREATE TABLE IF NOT EXISTS "StudentLearningState" (
  "studentId" text PRIMARY KEY NOT NULL,
  "state" jsonb NOT NULL,
  "createdAt" timestamptz NOT NULL DEFAULT now(),
  "updatedAt" timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS "StudentLearningState_studentId_idx" ON "StudentLearningState" ("studentId");

CREATE TABLE IF NOT EXISTS "StudentAgentSignal" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "studentId" text NOT NULL,
  "source" text NOT NULL,
  "type" text NOT NULL,
  "content" text NOT NULL,
  "context" jsonb,
  "expiresAt" timestamptz,
  "createdAt" timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS "StudentAgentSignal_studentId_idx" ON "StudentAgentSignal" ("studentId");
CREATE INDEX IF NOT EXISTS "StudentAgentSignal_createdAt_idx" ON "StudentAgentSignal" ("createdAt");

