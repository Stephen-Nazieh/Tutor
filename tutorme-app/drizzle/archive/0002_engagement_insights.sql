-- Session engagement & insights tables (optional feature)
-- Run with: npx drizzle-kit migrate or apply manually to your DB

CREATE TABLE IF NOT EXISTS "EngagementSnapshot" (
  "id" text PRIMARY KEY NOT NULL,
  "sessionId" text NOT NULL,
  "studentId" text NOT NULL,
  "engagementScore" double precision NOT NULL,
  "attentionLevel" text NOT NULL,
  "comprehensionEstimate" double precision,
  "participationCount" integer NOT NULL,
  "chatMessages" integer NOT NULL,
  "whiteboardInteractions" integer NOT NULL,
  "struggleIndicators" integer NOT NULL,
  "timestamp" timestamp with time zone NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS "EngagementSnapshot_sessionId_idx" ON "EngagementSnapshot" ("sessionId");
CREATE INDEX IF NOT EXISTS "EngagementSnapshot_studentId_idx" ON "EngagementSnapshot" ("studentId");

CREATE TABLE IF NOT EXISTS "SessionEngagementSummary" (
  "sessionId" text PRIMARY KEY NOT NULL,
  "averageEngagement" double precision,
  "peakEngagement" double precision,
  "lowEngagement" double precision,
  "participationRate" double precision,
  "totalChatMessages" integer,
  "totalHandRaises" integer,
  "timeOnTaskPercentage" double precision
);

CREATE TABLE IF NOT EXISTS "PostSessionReport" (
  "id" text PRIMARY KEY NOT NULL,
  "sessionId" text NOT NULL,
  "tutorId" text NOT NULL,
  "status" text NOT NULL,
  "keyConcepts" jsonb NOT NULL,
  "mainTopics" jsonb NOT NULL,
  "studentQuestions" jsonb NOT NULL,
  "challengingConcepts" jsonb NOT NULL,
  "overallAssessment" text NOT NULL,
  "averageEngagement" double precision NOT NULL,
  "peakEngagement" double precision NOT NULL,
  "lowEngagement" double precision NOT NULL,
  "participationRate" double precision NOT NULL,
  "chatActivity" integer NOT NULL,
  "handRaises" integer NOT NULL,
  "timeOnTask" double precision NOT NULL,
  "createdAt" timestamp with time zone NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS "PostSessionReport_sessionId_idx" ON "PostSessionReport" ("sessionId");

CREATE TABLE IF NOT EXISTS "StudentSessionInsight" (
  "id" text PRIMARY KEY NOT NULL,
  "sessionId" text NOT NULL,
  "studentId" text NOT NULL,
  "engagement" double precision NOT NULL,
  "participation" integer NOT NULL,
  "questionsAsked" integer NOT NULL,
  "timeAwayMinutes" integer NOT NULL,
  "flaggedForFollowUp" boolean NOT NULL,
  "followUpReason" text,
  "createdAt" timestamp with time zone NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS "StudentSessionInsight_sessionId_idx" ON "StudentSessionInsight" ("sessionId");

CREATE TABLE IF NOT EXISTS "SessionBookmark" (
  "id" text PRIMARY KEY NOT NULL,
  "sessionId" text NOT NULL,
  "timestampSeconds" integer NOT NULL,
  "label" text,
  "note" text,
  "createdAt" timestamp with time zone NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS "SessionBookmark_sessionId_idx" ON "SessionBookmark" ("sessionId");
