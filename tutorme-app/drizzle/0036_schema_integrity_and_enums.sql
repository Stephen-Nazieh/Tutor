-- Schema integrity, enums, and defaults

-- =========================
-- Enums (create if missing)
-- =========================
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'BuilderTaskType') THEN
    CREATE TYPE "BuilderTaskType" AS ENUM ('task', 'assessment', 'homework');
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'BuilderTaskStatus') THEN
    CREATE TYPE "BuilderTaskStatus" AS ENUM ('draft', 'published', 'archived');
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'TaskDeploymentStatus') THEN
    CREATE TYPE "TaskDeploymentStatus" AS ENUM ('active', 'closed');
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'BreakoutStatus') THEN
    CREATE TYPE "BreakoutStatus" AS ENUM ('forming', 'active', 'paused', 'closed');
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'LiveSessionStatus') THEN
    CREATE TYPE "LiveSessionStatus" AS ENUM ('scheduled', 'active', 'ended', 'preparing', 'live', 'paused');
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'PayoutStatus') THEN
    CREATE TYPE "PayoutStatus" AS ENUM ('PENDING', 'PROCESSING', 'COMPLETED', 'REJECTED');
  END IF;
END $$;

-- =========================
-- Enum conversions
-- =========================
ALTER TABLE IF EXISTS "BuilderTask"
  ALTER COLUMN "type" TYPE "BuilderTaskType" USING "type"::"BuilderTaskType";
ALTER TABLE IF EXISTS "BuilderTask"
  ALTER COLUMN "type" SET DEFAULT 'task';

ALTER TABLE IF EXISTS "BuilderTask"
  ALTER COLUMN "status" TYPE "BuilderTaskStatus" USING "status"::"BuilderTaskStatus";
ALTER TABLE IF EXISTS "BuilderTask"
  ALTER COLUMN "status" SET DEFAULT 'draft';

ALTER TABLE IF EXISTS "TaskDeployment"
  ALTER COLUMN "status" TYPE "TaskDeploymentStatus" USING "status"::"TaskDeploymentStatus";
ALTER TABLE IF EXISTS "TaskDeployment"
  ALTER COLUMN "status" SET DEFAULT 'active';

ALTER TABLE IF EXISTS "BreakoutSession"
  ALTER COLUMN "status" TYPE "BreakoutStatus" USING "status"::"BreakoutStatus";

ALTER TABLE IF EXISTS "BreakoutRoom"
  ALTER COLUMN "status" TYPE "BreakoutStatus" USING "status"::"BreakoutStatus";

ALTER TABLE IF EXISTS "LiveSession"
  ALTER COLUMN "status" TYPE "LiveSessionStatus" USING "status"::"LiveSessionStatus";

ALTER TABLE IF EXISTS "Payout"
  ALTER COLUMN "status" TYPE "PayoutStatus" USING "status"::"PayoutStatus";

-- =========================
-- AITutorDailyUsage date normalization
-- =========================
DROP INDEX IF EXISTS "AITutorDailyUsage_userId_date_key";
ALTER TABLE IF EXISTS "AITutorDailyUsage"
  ALTER COLUMN "date" TYPE date USING date("date");
ALTER TABLE IF EXISTS "AITutorDailyUsage"
  ALTER COLUMN "date" SET DEFAULT CURRENT_DATE;
CREATE UNIQUE INDEX IF NOT EXISTS "AITutorDailyUsage_userId_date_key"
  ON "AITutorDailyUsage" ("userId", "date");

-- =========================
-- updatedAt defaults
-- =========================
ALTER TABLE IF EXISTS "User" ALTER COLUMN "updatedAt" SET DEFAULT now();
ALTER TABLE IF EXISTS "Profile" ALTER COLUMN "updatedAt" SET DEFAULT now();
ALTER TABLE IF EXISTS "TutorApplication" ALTER COLUMN "updatedAt" SET DEFAULT now();
ALTER TABLE IF EXISTS "AdminRole" ALTER COLUMN "updatedAt" SET DEFAULT now();
ALTER TABLE IF EXISTS "FeatureFlag" ALTER COLUMN "updatedAt" SET DEFAULT now();
ALTER TABLE IF EXISTS "LlmProvider" ALTER COLUMN "updatedAt" SET DEFAULT now();
ALTER TABLE IF EXISTS "SystemSetting" ALTER COLUMN "updatedAt" SET DEFAULT now();
ALTER TABLE IF EXISTS "AIAssistantSession" ALTER COLUMN "updatedAt" SET DEFAULT now();
ALTER TABLE IF EXISTS "BuilderTask" ALTER COLUMN "updatedAt" SET DEFAULT now();
ALTER TABLE IF EXISTS "BuilderTaskExtension" ALTER COLUMN "updatedAt" SET DEFAULT now();
ALTER TABLE IF EXISTS "BuilderTaskDmi" ALTER COLUMN "updatedAt" SET DEFAULT now();
ALTER TABLE IF EXISTS "TutorAsset" ALTER COLUMN "updatedAt" SET DEFAULT now();
ALTER TABLE IF EXISTS "CalendarConnection" ALTER COLUMN "updatedAt" SET DEFAULT now();
ALTER TABLE IF EXISTS "CalendarEvent" ALTER COLUMN "updatedAt" SET DEFAULT now();
ALTER TABLE IF EXISTS "CalendarAvailability" ALTER COLUMN "updatedAt" SET DEFAULT now();
ALTER TABLE IF EXISTS "OneOnOneBookingRequest" ALTER COLUMN "updatedAt" SET DEFAULT now();
ALTER TABLE IF EXISTS "ContentItem" ALTER COLUMN "updatedAt" SET DEFAULT now();
ALTER TABLE IF EXISTS "ContentQuizCheckpoint" ALTER COLUMN "updatedAt" SET DEFAULT now();
ALTER TABLE IF EXISTS "ContentProgress" ALTER COLUMN "updatedAt" SET DEFAULT now();
ALTER TABLE IF EXISTS "ReviewSchedule" ALTER COLUMN "updatedAt" SET DEFAULT now();
ALTER TABLE IF EXISTS "Course" ALTER COLUMN "updatedAt" SET DEFAULT now();
ALTER TABLE IF EXISTS "CourseLesson" ALTER COLUMN "updatedAt" SET DEFAULT now();
ALTER TABLE IF EXISTS "CourseLessonProgress" ALTER COLUMN "updatedAt" SET DEFAULT now();
ALTER TABLE IF EXISTS "StudentPerformance" ALTER COLUMN "updatedAt" SET DEFAULT now();
ALTER TABLE IF EXISTS "FeedbackWorkflow" ALTER COLUMN "updatedAt" SET DEFAULT now();
ALTER TABLE IF EXISTS "FamilyAccount" ALTER COLUMN "updatedAt" SET DEFAULT now();
ALTER TABLE IF EXISTS "FamilyMember" ALTER COLUMN "updatedAt" SET DEFAULT now();
ALTER TABLE IF EXISTS "FamilyBudget" ALTER COLUMN "updatedAt" SET DEFAULT now();
ALTER TABLE IF EXISTS "FamilyPayment" ALTER COLUMN "updatedAt" SET DEFAULT now();
ALTER TABLE IF EXISTS "ParentPaymentAuthorization" ALTER COLUMN "updatedAt" SET DEFAULT now();
ALTER TABLE IF EXISTS "ParentSpendingLimit" ALTER COLUMN "updatedAt" SET DEFAULT now();
ALTER TABLE IF EXISTS "Payment" ALTER COLUMN "updatedAt" SET DEFAULT now();
ALTER TABLE IF EXISTS "Refund" ALTER COLUMN "updatedAt" SET DEFAULT now();
ALTER TABLE IF EXISTS "SessionReplayArtifact" ALTER COLUMN "updatedAt" SET DEFAULT now();
ALTER TABLE IF EXISTS "Resource" ALTER COLUMN "updatedAt" SET DEFAULT now();
ALTER TABLE IF EXISTS "LibraryTask" ALTER COLUMN "updatedAt" SET DEFAULT now();
ALTER TABLE IF EXISTS "StudentMemoryProfile" ALTER COLUMN "updatedAt" SET DEFAULT now();
ALTER TABLE IF EXISTS "StudentLearningState" ALTER COLUMN "updatedAt" SET DEFAULT now();
ALTER TABLE IF EXISTS "Conversation" ALTER COLUMN "updatedAt" SET DEFAULT now();
ALTER TABLE IF EXISTS "NotificationPreference" ALTER COLUMN "updatedAt" SET DEFAULT now();

-- =========================
-- ResourceShare uniqueness fix
-- =========================
DROP INDEX IF EXISTS "ResourceShare_resourceId_sharedWithAll_key";
CREATE UNIQUE INDEX IF NOT EXISTS "ResourceShare_resourceId_sharedWithAll_true_key"
  ON "ResourceShare" ("resourceId") WHERE "sharedWithAll" IS TRUE;

-- =========================
-- Foreign keys (added as NOT VALID for safety)
-- =========================
DO $$
BEGIN
  IF to_regclass('public."AdminAuditLog"') IS NOT NULL AND NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'AdminAuditLog_adminId_User_id_fk'
  ) THEN
    ALTER TABLE "AdminAuditLog" ADD CONSTRAINT "AdminAuditLog_adminId_User_id_fk"
      FOREIGN KEY ("adminId") REFERENCES "public"."User"("id") NOT VALID;
  END IF;
END $$;

DO $$
BEGIN
  IF to_regclass('public."AdminSession"') IS NOT NULL AND NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'AdminSession_adminId_User_id_fk'
  ) THEN
    ALTER TABLE "AdminSession" ADD CONSTRAINT "AdminSession_adminId_User_id_fk"
      FOREIGN KEY ("adminId") REFERENCES "public"."User"("id") ON DELETE cascade NOT VALID;
  END IF;
END $$;

DO $$
BEGIN
  IF to_regclass('public."Course"') IS NOT NULL AND NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'Course_creatorId_User_id_fk'
  ) THEN
    ALTER TABLE "Course" ADD CONSTRAINT "Course_creatorId_User_id_fk"
      FOREIGN KEY ("creatorId") REFERENCES "public"."User"("id") ON DELETE set null NOT VALID;
  END IF;
END $$;

DO $$
BEGIN
  IF to_regclass('public."CourseShare"') IS NOT NULL AND NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'CourseShare_courseId_Course_id_fk'
  ) THEN
    ALTER TABLE "CourseShare" ADD CONSTRAINT "CourseShare_courseId_Course_id_fk"
      FOREIGN KEY ("courseId") REFERENCES "public"."Course"("id") ON DELETE cascade NOT VALID;
  END IF;
END $$;

DO $$
BEGIN
  IF to_regclass('public."CourseShare"') IS NOT NULL AND NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'CourseShare_sharedByTutorId_User_id_fk'
  ) THEN
    ALTER TABLE "CourseShare" ADD CONSTRAINT "CourseShare_sharedByTutorId_User_id_fk"
      FOREIGN KEY ("sharedByTutorId") REFERENCES "public"."User"("id") ON DELETE cascade NOT VALID;
  END IF;
END $$;

DO $$
BEGIN
  IF to_regclass('public."CourseShare"') IS NOT NULL AND NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'CourseShare_recipientId_User_id_fk'
  ) THEN
    ALTER TABLE "CourseShare" ADD CONSTRAINT "CourseShare_recipientId_User_id_fk"
      FOREIGN KEY ("recipientId") REFERENCES "public"."User"("id") ON DELETE cascade NOT VALID;
  END IF;
END $$;

DO $$
BEGIN
  IF to_regclass('public."LessonSession"') IS NOT NULL AND NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'LessonSession_studentId_User_id_fk'
  ) THEN
    ALTER TABLE "LessonSession" ADD CONSTRAINT "LessonSession_studentId_User_id_fk"
      FOREIGN KEY ("studentId") REFERENCES "public"."User"("id") ON DELETE cascade NOT VALID;
  END IF;
END $$;

DO $$
BEGIN
  IF to_regclass('public."LessonSession"') IS NOT NULL AND NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'LessonSession_lessonId_CourseLesson_id_fk'
  ) THEN
    ALTER TABLE "LessonSession" ADD CONSTRAINT "LessonSession_lessonId_CourseLesson_id_fk"
      FOREIGN KEY ("lessonId") REFERENCES "public"."CourseLesson"("id") ON DELETE cascade NOT VALID;
  END IF;
END $$;

DO $$
BEGIN
  IF to_regclass('public."CourseLessonProgress"') IS NOT NULL AND NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'CourseLessonProgress_lessonId_CourseLesson_id_fk'
  ) THEN
    ALTER TABLE "CourseLessonProgress" ADD CONSTRAINT "CourseLessonProgress_lessonId_CourseLesson_id_fk"
      FOREIGN KEY ("lessonId") REFERENCES "public"."CourseLesson"("id") ON DELETE cascade NOT VALID;
  END IF;
END $$;

DO $$
BEGIN
  IF to_regclass('public."CourseLessonProgress"') IS NOT NULL AND NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'CourseLessonProgress_studentId_User_id_fk'
  ) THEN
    ALTER TABLE "CourseLessonProgress" ADD CONSTRAINT "CourseLessonProgress_studentId_User_id_fk"
      FOREIGN KEY ("studentId") REFERENCES "public"."User"("id") ON DELETE cascade NOT VALID;
  END IF;
END $$;

DO $$
BEGIN
  IF to_regclass('public."StudentPerformance"') IS NOT NULL AND NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'StudentPerformance_studentId_User_id_fk'
  ) THEN
    ALTER TABLE "StudentPerformance" ADD CONSTRAINT "StudentPerformance_studentId_User_id_fk"
      FOREIGN KEY ("studentId") REFERENCES "public"."User"("id") ON DELETE cascade NOT VALID;
  END IF;
END $$;

DO $$
BEGIN
  IF to_regclass('public."StudentPerformance"') IS NOT NULL AND NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'StudentPerformance_courseId_Course_id_fk'
  ) THEN
    ALTER TABLE "StudentPerformance" ADD CONSTRAINT "StudentPerformance_courseId_Course_id_fk"
      FOREIGN KEY ("courseId") REFERENCES "public"."Course"("id") ON DELETE set null NOT VALID;
  END IF;
END $$;

DO $$
BEGIN
  IF to_regclass('public."TaskSubmission"') IS NOT NULL AND NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'TaskSubmission_taskId_BuilderTask_id_fk'
  ) THEN
    ALTER TABLE "TaskSubmission" ADD CONSTRAINT "TaskSubmission_taskId_BuilderTask_id_fk"
      FOREIGN KEY ("taskId") REFERENCES "public"."BuilderTask"("id") ON DELETE cascade NOT VALID;
  END IF;
END $$;

DO $$
BEGIN
  IF to_regclass('public."TaskSubmission"') IS NOT NULL AND NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'TaskSubmission_studentId_User_id_fk'
  ) THEN
    ALTER TABLE "TaskSubmission" ADD CONSTRAINT "TaskSubmission_studentId_User_id_fk"
      FOREIGN KEY ("studentId") REFERENCES "public"."User"("id") ON DELETE cascade NOT VALID;
  END IF;
END $$;

DO $$
BEGIN
  IF to_regclass('public."FeedbackWorkflow"') IS NOT NULL AND NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'FeedbackWorkflow_submissionId_TaskSubmission_id_fk'
  ) THEN
    ALTER TABLE "FeedbackWorkflow" ADD CONSTRAINT "FeedbackWorkflow_submissionId_TaskSubmission_id_fk"
      FOREIGN KEY ("submissionId") REFERENCES "public"."TaskSubmission"("id") ON DELETE cascade NOT VALID;
  END IF;
END $$;

DO $$
BEGIN
  IF to_regclass('public."FeedbackWorkflow"') IS NOT NULL AND NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'FeedbackWorkflow_studentId_User_id_fk'
  ) THEN
    ALTER TABLE "FeedbackWorkflow" ADD CONSTRAINT "FeedbackWorkflow_studentId_User_id_fk"
      FOREIGN KEY ("studentId") REFERENCES "public"."User"("id") ON DELETE cascade NOT VALID;
  END IF;
END $$;

DO $$
BEGIN
  IF to_regclass('public."FeedbackWorkflow"') IS NOT NULL AND NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'FeedbackWorkflow_approvedBy_User_id_fk'
  ) THEN
    ALTER TABLE "FeedbackWorkflow" ADD CONSTRAINT "FeedbackWorkflow_approvedBy_User_id_fk"
      FOREIGN KEY ("approvedBy") REFERENCES "public"."User"("id") ON DELETE set null NOT VALID;
  END IF;
END $$;

DO $$
BEGIN
  IF to_regclass('public."PerformanceMetric"') IS NOT NULL AND NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'PerformanceMetric_sessionId_LiveSession_id_fk'
  ) THEN
    ALTER TABLE "PerformanceMetric" ADD CONSTRAINT "PerformanceMetric_sessionId_LiveSession_id_fk"
      FOREIGN KEY ("sessionId") REFERENCES "public"."LiveSession"("id") ON DELETE set null NOT VALID;
  END IF;
END $$;

DO $$
BEGIN
  IF to_regclass('public."SessionBookmark"') IS NOT NULL AND NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'SessionBookmark_sessionId_LiveSession_id_fk'
  ) THEN
    ALTER TABLE "SessionBookmark" ADD CONSTRAINT "SessionBookmark_sessionId_LiveSession_id_fk"
      FOREIGN KEY ("sessionId") REFERENCES "public"."LiveSession"("id") ON DELETE cascade NOT VALID;
  END IF;
END $$;

DO $$
BEGIN
  IF to_regclass('public."Resource"') IS NOT NULL AND NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'Resource_tutorId_User_id_fk'
  ) THEN
    ALTER TABLE "Resource" ADD CONSTRAINT "Resource_tutorId_User_id_fk"
      FOREIGN KEY ("tutorId") REFERENCES "public"."User"("id") ON DELETE cascade NOT VALID;
  END IF;
END $$;

DO $$
BEGIN
  IF to_regclass('public."ResourceShare"') IS NOT NULL AND NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'ResourceShare_resourceId_Resource_id_fk'
  ) THEN
    ALTER TABLE "ResourceShare" ADD CONSTRAINT "ResourceShare_resourceId_Resource_id_fk"
      FOREIGN KEY ("resourceId") REFERENCES "public"."Resource"("id") ON DELETE cascade NOT VALID;
  END IF;
END $$;

DO $$
BEGIN
  IF to_regclass('public."ResourceShare"') IS NOT NULL AND NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'ResourceShare_sharedByTutorId_User_id_fk'
  ) THEN
    ALTER TABLE "ResourceShare" ADD CONSTRAINT "ResourceShare_sharedByTutorId_User_id_fk"
      FOREIGN KEY ("sharedByTutorId") REFERENCES "public"."User"("id") ON DELETE cascade NOT VALID;
  END IF;
END $$;

DO $$
BEGIN
  IF to_regclass('public."ResourceShare"') IS NOT NULL AND NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'ResourceShare_recipientId_User_id_fk'
  ) THEN
    ALTER TABLE "ResourceShare" ADD CONSTRAINT "ResourceShare_recipientId_User_id_fk"
      FOREIGN KEY ("recipientId") REFERENCES "public"."User"("id") ON DELETE set null NOT VALID;
  END IF;
END $$;

DO $$
BEGIN
  IF to_regclass('public."ResourceShare"') IS NOT NULL AND NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'ResourceShare_courseId_Course_id_fk'
  ) THEN
    ALTER TABLE "ResourceShare" ADD CONSTRAINT "ResourceShare_courseId_Course_id_fk"
      FOREIGN KEY ("courseId") REFERENCES "public"."Course"("id") ON DELETE set null NOT VALID;
  END IF;
END $$;

DO $$
BEGIN
  IF to_regclass('public."LibraryTask"') IS NOT NULL AND NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'LibraryTask_userId_User_id_fk'
  ) THEN
    ALTER TABLE "LibraryTask" ADD CONSTRAINT "LibraryTask_userId_User_id_fk"
      FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE cascade NOT VALID;
  END IF;
END $$;

DO $$
BEGIN
  IF to_regclass('public."TaskQuestion"') IS NOT NULL AND NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'TaskQuestion_taskId_BuilderTask_id_fk'
  ) THEN
    ALTER TABLE "TaskQuestion" ADD CONSTRAINT "TaskQuestion_taskId_BuilderTask_id_fk"
      FOREIGN KEY ("taskId") REFERENCES "public"."BuilderTask"("id") ON DELETE cascade NOT VALID;
  END IF;
END $$;

DO $$
BEGIN
  IF to_regclass('public."TaskQuestion"') IS NOT NULL AND NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'TaskQuestion_tutorId_User_id_fk'
  ) THEN
    ALTER TABLE "TaskQuestion" ADD CONSTRAINT "TaskQuestion_tutorId_User_id_fk"
      FOREIGN KEY ("tutorId") REFERENCES "public"."User"("id") ON DELETE cascade NOT VALID;
  END IF;
END $$;

DO $$
BEGIN
  IF to_regclass('public."TaskQuestion"') IS NOT NULL AND NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'TaskQuestion_sessionId_LiveSession_id_fk'
  ) THEN
    ALTER TABLE "TaskQuestion" ADD CONSTRAINT "TaskQuestion_sessionId_LiveSession_id_fk"
      FOREIGN KEY ("sessionId") REFERENCES "public"."LiveSession"("id") ON DELETE cascade NOT VALID;
  END IF;
END $$;

DO $$
BEGIN
  IF to_regclass('public."TutorAsset"') IS NOT NULL AND NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'TutorAsset_tutorId_User_id_fk'
  ) THEN
    ALTER TABLE "TutorAsset" ADD CONSTRAINT "TutorAsset_tutorId_User_id_fk"
      FOREIGN KEY ("tutorId") REFERENCES "public"."User"("id") ON DELETE cascade NOT VALID;
  END IF;
END $$;

DO $$
BEGIN
  IF to_regclass('public."AITutorSubscription"') IS NOT NULL AND NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'AITutorSubscription_userId_User_id_fk'
  ) THEN
    ALTER TABLE "AITutorSubscription" ADD CONSTRAINT "AITutorSubscription_userId_User_id_fk"
      FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE cascade NOT VALID;
  END IF;
END $$;

DO $$
BEGIN
  IF to_regclass('public."NotificationPreference"') IS NOT NULL AND NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'NotificationPreference_userId_User_id_fk'
  ) THEN
    ALTER TABLE "NotificationPreference" ADD CONSTRAINT "NotificationPreference_userId_User_id_fk"
      FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE cascade NOT VALID;
  END IF;
END $$;

DO $$
BEGIN
  IF to_regclass('public."PollResponse"') IS NOT NULL AND NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'PollResponse_studentId_User_id_fk'
  ) THEN
    ALTER TABLE "PollResponse" ADD CONSTRAINT "PollResponse_studentId_User_id_fk"
      FOREIGN KEY ("studentId") REFERENCES "public"."User"("id") ON DELETE set null NOT VALID;
  END IF;
END $$;

DO $$
BEGIN
  IF to_regclass('public."SessionEngagementSummary"') IS NOT NULL AND NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'SessionEngagementSummary_summarySessionId_LiveSession_id_fk'
  ) THEN
    ALTER TABLE "SessionEngagementSummary" ADD CONSTRAINT "SessionEngagementSummary_summarySessionId_LiveSession_id_fk"
      FOREIGN KEY ("summarySessionId") REFERENCES "public"."LiveSession"("id") ON DELETE cascade NOT VALID;
  END IF;
END $$;

DO $$
BEGIN
  IF to_regclass('public."OneOnOneBookingRequest"') IS NOT NULL AND NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'OneOnOneBookingRequest_studentId_User_id_fk'
  ) THEN
    ALTER TABLE "OneOnOneBookingRequest" ADD CONSTRAINT "OneOnOneBookingRequest_studentId_User_id_fk"
      FOREIGN KEY ("studentId") REFERENCES "public"."User"("id") ON DELETE cascade NOT VALID;
  END IF;
END $$;

DO $$
BEGIN
  IF to_regclass('public."OneOnOneBookingRequest"') IS NOT NULL AND NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'OneOnOneBookingRequest_calendarEventId_CalendarEvent_id_fk'
  ) THEN
    ALTER TABLE "OneOnOneBookingRequest" ADD CONSTRAINT "OneOnOneBookingRequest_calendarEventId_CalendarEvent_id_fk"
      FOREIGN KEY ("calendarEventId") REFERENCES "public"."CalendarEvent"("id") ON DELETE set null NOT VALID;
  END IF;
END $$;
