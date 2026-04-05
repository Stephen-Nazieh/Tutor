-- Custom SQL migration file, put your code below! --

CREATE TABLE IF NOT EXISTS "BuilderTaskDmi" (
  "dmiId" text PRIMARY KEY NOT NULL,
  "taskId" text NOT NULL,
  "type" text NOT NULL DEFAULT 'assessment',
  "items" jsonb NOT NULL,
  "createdAt" timestamp with time zone NOT NULL DEFAULT now(),
  "updatedAt" timestamp with time zone NOT NULL
);

CREATE INDEX IF NOT EXISTS "BuilderTaskDmi_taskId_idx" ON "BuilderTaskDmi" ("taskId");
CREATE INDEX IF NOT EXISTS "BuilderTaskDmi_taskId_type_idx" ON "BuilderTaskDmi" ("taskId", "type");

CREATE TABLE IF NOT EXISTS "BuilderTaskDmiVersion" (
  "versionId" text PRIMARY KEY NOT NULL,
  "taskId" text NOT NULL,
  "type" text NOT NULL DEFAULT 'assessment',
  "versionNumber" integer NOT NULL,
  "items" jsonb NOT NULL,
  "createdBy" text NOT NULL,
  "createdAt" timestamp with time zone NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS "BuilderTaskDmiVersion_taskId_idx" ON "BuilderTaskDmiVersion" ("taskId");
CREATE INDEX IF NOT EXISTS "BuilderTaskDmiVersion_taskId_version_idx" ON "BuilderTaskDmiVersion" ("taskId", "versionNumber");
