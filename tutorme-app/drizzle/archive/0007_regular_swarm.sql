DO $$ BEGIN CREATE TYPE "public"."EventStatus" AS ENUM('CONFIRMED', 'TENTATIVE', 'CANCELLED'); EXCEPTION WHEN duplicate_object THEN null; END $$;--> statement-breakpoint
DO $$ BEGIN CREATE TYPE "public"."EventType" AS ENUM('LESSON', 'CLINIC', 'CONSULTATION', 'BREAK', 'PERSONAL', 'OTHER'); EXCEPTION WHEN duplicate_object THEN null; END $$;--> statement-breakpoint
DO $$ BEGIN CREATE TYPE "public"."MathAIInteractionType" AS ENUM('SOLVE', 'HINT', 'CHECK', 'EXPLAIN', 'RECOGNIZE'); EXCEPTION WHEN duplicate_object THEN null; END $$;--> statement-breakpoint
DO $$ BEGIN CREATE TYPE "public"."MathSessionStatus" AS ENUM('ACTIVE', 'PAUSED', 'ENDED', 'ARCHIVED'); EXCEPTION WHEN duplicate_object THEN null; END $$;--> statement-breakpoint
DO $$ BEGIN CREATE TYPE "public"."MessageSource" AS ENUM('AI', 'TUTOR', 'STUDENT'); EXCEPTION WHEN duplicate_object THEN null; END $$;--> statement-breakpoint
DO $$ BEGIN CREATE TYPE "public"."PaymentGateway" AS ENUM('AIRWALLEX', 'HITPAY'); EXCEPTION WHEN duplicate_object THEN null; END $$;--> statement-breakpoint
DO $$ BEGIN CREATE TYPE "public"."PaymentStatus" AS ENUM('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED', 'REFUNDED', 'CANCELLED'); EXCEPTION WHEN duplicate_object THEN null; END $$;--> statement-breakpoint
DO $$ BEGIN CREATE TYPE "public"."PollStatus" AS ENUM('DRAFT', 'ACTIVE', 'CLOSED'); EXCEPTION WHEN duplicate_object THEN null; END $$;--> statement-breakpoint
DO $$ BEGIN CREATE TYPE "public"."PollType" AS ENUM('MULTIPLE_CHOICE', 'TRUE_FALSE', 'RATING', 'SHORT_ANSWER', 'WORD_CLOUD'); EXCEPTION WHEN duplicate_object THEN null; END $$;--> statement-breakpoint
DO $$ BEGIN CREATE TYPE "public"."RefundStatus" AS ENUM('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED'); EXCEPTION WHEN duplicate_object THEN null; END $$;--> statement-breakpoint
DO $$ BEGIN CREATE TYPE "public"."Role" AS ENUM('STUDENT', 'TUTOR', 'PARENT', 'ADMIN'); EXCEPTION WHEN duplicate_object THEN null; END $$;--> statement-breakpoint
DO $$ BEGIN CREATE TYPE "public"."SessionType" AS ENUM('CLINIC', 'GROUP', 'ONE_ON_ONE'); EXCEPTION WHEN duplicate_object THEN null; END $$;--> statement-breakpoint
DO $$ BEGIN CREATE TYPE "public"."Tier" AS ENUM('FREE', 'PRO', 'ELITE'); EXCEPTION WHEN duplicate_object THEN null; END $$;--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "AIAssistantInsight" (
	"id" text PRIMARY KEY NOT NULL,
	"sessionId" text NOT NULL,
	"type" text NOT NULL,
	"title" text NOT NULL,
	"content" text NOT NULL,
	"relatedData" jsonb,
	"applied" boolean NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "AIAssistantMessage" (
	"id" text PRIMARY KEY NOT NULL,
	"sessionId" text NOT NULL,
	"role" text NOT NULL,
	"content" text NOT NULL,
	"metadata" jsonb,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "AIAssistantSession" (
	"id" text PRIMARY KEY NOT NULL,
	"tutorId" text NOT NULL,
	"title" text NOT NULL,
	"context" text,
	"status" text NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "AIInteractionSession" (
	"id" text PRIMARY KEY NOT NULL,
	"studentId" text NOT NULL,
	"subjectCode" text NOT NULL,
	"startedAt" timestamp with time zone DEFAULT now() NOT NULL,
	"endedAt" timestamp with time zone,
	"messageCount" integer NOT NULL,
	"topicsCovered" text[] NOT NULL,
	"summary" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "AITutorDailyUsage" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"date" timestamp with time zone DEFAULT now() NOT NULL,
	"sessionCount" integer NOT NULL,
	"messageCount" integer NOT NULL,
	"minutesUsed" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "AITutorEnrollment" (
	"id" text PRIMARY KEY NOT NULL,
	"studentId" text NOT NULL,
	"subjectCode" text NOT NULL,
	"enrolledAt" timestamp with time zone DEFAULT now() NOT NULL,
	"lastSessionAt" timestamp with time zone,
	"totalSessions" integer NOT NULL,
	"totalMinutes" integer NOT NULL,
	"status" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "AITutorSubscription" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"tier" "Tier" NOT NULL,
	"dailySessions" integer NOT NULL,
	"dailyMessages" integer NOT NULL,
	"startedAt" timestamp with time zone DEFAULT now() NOT NULL,
	"expiresAt" timestamp with time zone,
	"isActive" boolean NOT NULL,
	CONSTRAINT "AITutorSubscription_userId_unique" UNIQUE("userId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Account" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"type" text NOT NULL,
	"provider" text NOT NULL,
	"providerAccountId" text NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" text,
	"scope" text,
	"id_token" text,
	"session_state" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Achievement" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"type" text NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"unlockedAt" timestamp with time zone DEFAULT now() NOT NULL,
	"xpAwarded" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "AdminAssignment" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"roleId" text NOT NULL,
	"assignedBy" text,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"expiresAt" timestamp with time zone,
	"isActive" boolean NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "AdminAuditLog" (
	"id" text PRIMARY KEY NOT NULL,
	"adminId" text NOT NULL,
	"action" text NOT NULL,
	"resourceType" text,
	"resourceId" text,
	"previousState" jsonb,
	"newState" jsonb,
	"metadata" jsonb,
	"ipAddress" text,
	"userAgent" text,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "AdminRole" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"permissions" jsonb NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL,
	CONSTRAINT "AdminRole_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "AdminSession" (
	"id" text PRIMARY KEY NOT NULL,
	"adminId" text NOT NULL,
	"token" text NOT NULL,
	"ipAddress" text,
	"userAgent" text,
	"startedAt" timestamp with time zone DEFAULT now() NOT NULL,
	"lastActiveAt" timestamp with time zone DEFAULT now() NOT NULL,
	"expiresAt" timestamp with time zone NOT NULL,
	"isRevoked" boolean NOT NULL,
	CONSTRAINT "AdminSession_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ApiKey" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"keyHash" text NOT NULL,
	"createdById" text,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"lastUsedAt" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Badge" (
	"id" text PRIMARY KEY NOT NULL,
	"key" text NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"icon" text NOT NULL,
	"color" text NOT NULL,
	"category" text NOT NULL,
	"rarity" text NOT NULL,
	"xpBonus" integer NOT NULL,
	"requirement" jsonb NOT NULL,
	"isSecret" boolean NOT NULL,
	"order" integer NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "Badge_key_unique" UNIQUE("key")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Bookmark" (
	"id" text PRIMARY KEY NOT NULL,
	"contentId" text NOT NULL,
	"studentId" text NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "BreakoutRoom" (
	"id" text PRIMARY KEY NOT NULL,
	"sessionId" text NOT NULL,
	"name" text NOT NULL,
	"aiEnabled" boolean NOT NULL,
	"aiMode" text NOT NULL,
	"assignedTaskId" text,
	"status" text NOT NULL,
	"endsAt" timestamp with time zone,
	"aiNotes" jsonb NOT NULL,
	"alerts" jsonb NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "BreakoutRoomAssignment" (
	"id" text PRIMARY KEY NOT NULL,
	"roomId" text NOT NULL,
	"studentId" text NOT NULL,
	"joinedAt" timestamp with time zone DEFAULT now() NOT NULL,
	"leftAt" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "BreakoutSession" (
	"id" text PRIMARY KEY NOT NULL,
	"mainRoomId" text NOT NULL,
	"tutorId" text NOT NULL,
	"roomCount" integer NOT NULL,
	"participantsPerRoom" integer NOT NULL,
	"distributionMode" text NOT NULL,
	"timeLimit" integer NOT NULL,
	"aiAssistantEnabled" boolean NOT NULL,
	"status" text NOT NULL,
	"startedAt" timestamp with time zone,
	"endedAt" timestamp with time zone,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "BudgetAlert" (
	"id" text PRIMARY KEY NOT NULL,
	"parentId" text NOT NULL,
	"type" text NOT NULL,
	"message" text NOT NULL,
	"isRead" boolean NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "CalendarAvailability" (
	"id" text PRIMARY KEY NOT NULL,
	"tutorId" text NOT NULL,
	"dayOfWeek" integer NOT NULL,
	"startTime" text NOT NULL,
	"endTime" text NOT NULL,
	"timezone" text NOT NULL,
	"isAvailable" boolean NOT NULL,
	"validFrom" timestamp with time zone,
	"validUntil" timestamp with time zone,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "CalendarConnection" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"provider" text NOT NULL,
	"providerAccountId" text,
	"accessToken" text,
	"refreshToken" text,
	"expiresAt" timestamp with time zone,
	"syncEnabled" boolean NOT NULL,
	"syncDirection" text NOT NULL,
	"lastSyncedAt" timestamp with time zone,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "CalendarEvent" (
	"id" text PRIMARY KEY NOT NULL,
	"tutorId" text NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"type" "EventType" NOT NULL,
	"status" "EventStatus" NOT NULL,
	"startTime" timestamp with time zone NOT NULL,
	"endTime" timestamp with time zone NOT NULL,
	"timezone" text NOT NULL,
	"isAllDay" boolean NOT NULL,
	"recurrenceRule" text,
	"recurringEventId" text,
	"isRecurring" boolean NOT NULL,
	"location" text,
	"meetingUrl" text,
	"isVirtual" boolean NOT NULL,
	"curriculumId" text,
	"batchId" text,
	"studentId" text,
	"attendees" jsonb,
	"maxAttendees" integer NOT NULL,
	"reminders" jsonb,
	"color" text,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL,
	"createdBy" text NOT NULL,
	"externalId" text,
	"deletedAt" timestamp with time zone,
	"isCancelled" boolean NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "CalendarException" (
	"id" text PRIMARY KEY NOT NULL,
	"tutorId" text NOT NULL,
	"date" timestamp with time zone NOT NULL,
	"isAvailable" boolean NOT NULL,
	"startTime" text,
	"endTime" text,
	"reason" text,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Clinic" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"subject" text NOT NULL,
	"description" text,
	"tutorId" text NOT NULL,
	"startTime" timestamp with time zone NOT NULL,
	"duration" integer NOT NULL,
	"maxStudents" integer NOT NULL,
	"status" text NOT NULL,
	"roomUrl" text,
	"roomId" text,
	"requiresPayment" boolean NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ClinicBooking" (
	"id" text PRIMARY KEY NOT NULL,
	"clinicId" text NOT NULL,
	"studentId" text NOT NULL,
	"bookedAt" timestamp with time zone DEFAULT now() NOT NULL,
	"attended" boolean NOT NULL,
	"requiresPayment" boolean NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ContentItem" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"subject" text NOT NULL,
	"type" text NOT NULL,
	"url" text,
	"thumbnailUrl" text,
	"duration" integer,
	"difficulty" text NOT NULL,
	"isPublished" boolean NOT NULL,
	"transcript" text,
	"videoVariants" jsonb,
	"uploadStatus" text,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ContentProgress" (
	"id" text PRIMARY KEY NOT NULL,
	"contentId" text NOT NULL,
	"studentId" text NOT NULL,
	"progress" integer NOT NULL,
	"completed" boolean NOT NULL,
	"lastPosition" integer,
	"updatedAt" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ContentQuizCheckpoint" (
	"id" text PRIMARY KEY NOT NULL,
	"contentId" text NOT NULL,
	"videoTimestampSec" integer NOT NULL,
	"title" text,
	"questions" jsonb NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Conversation" (
	"id" text PRIMARY KEY NOT NULL,
	"participant1Id" text NOT NULL,
	"participant2Id" text NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "CourseBatch" (
	"id" text PRIMARY KEY NOT NULL,
	"curriculumId" text NOT NULL,
	"name" text NOT NULL,
	"startDate" timestamp with time zone,
	"order" integer NOT NULL,
	"difficulty" text,
	"schedule" jsonb,
	"price" double precision,
	"currency" text,
	"languageOfInstruction" text,
	"isLive" boolean NOT NULL,
	"meetingUrl" text,
	"maxStudents" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Curriculum" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"subject" text NOT NULL,
	"categories" text[],
	"gradeLevel" text,
	"difficulty" text NOT NULL,
	"estimatedHours" integer NOT NULL,
	"isPublished" boolean NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL,
	"creatorId" text,
	"isLiveOnline" boolean NOT NULL,
	"languageOfInstruction" text,
	"price" double precision,
	"currency" text,
	"curriculumSource" text,
	"outlineSource" text,
	"schedule" jsonb,
	"courseMaterials" jsonb,
	"coursePitch" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "CurriculumCatalog" (
	"id" text PRIMARY KEY NOT NULL,
	"subject" text NOT NULL,
	"name" text NOT NULL,
	"code" text,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "CurriculumEnrollment" (
	"id" text PRIMARY KEY NOT NULL,
	"studentId" text NOT NULL,
	"curriculumId" text NOT NULL,
	"batchId" text,
	"enrolledAt" timestamp with time zone DEFAULT now() NOT NULL,
	"completedAt" timestamp with time zone,
	"lastActivity" timestamp with time zone DEFAULT now() NOT NULL,
	"lessonsCompleted" integer NOT NULL,
	"enrollmentSource" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "CurriculumLesson" (
	"id" text PRIMARY KEY NOT NULL,
	"moduleId" text NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"duration" integer NOT NULL,
	"difficulty" text NOT NULL,
	"order" integer NOT NULL,
	"learningObjectives" text[] NOT NULL,
	"teachingPoints" text[] NOT NULL,
	"keyConcepts" text[] NOT NULL,
	"examples" jsonb,
	"practiceProblems" jsonb,
	"commonMisconceptions" text[] NOT NULL,
	"prerequisiteLessonIds" text[] NOT NULL,
	"builderData" jsonb
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "CurriculumLessonProgress" (
	"id" text PRIMARY KEY NOT NULL,
	"lessonId" text NOT NULL,
	"studentId" text NOT NULL,
	"status" text NOT NULL,
	"currentSection" text NOT NULL,
	"score" integer,
	"completedAt" timestamp with time zone,
	"updatedAt" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "CurriculumModule" (
	"id" text PRIMARY KEY NOT NULL,
	"curriculumId" text NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"order" integer NOT NULL,
	"builderData" jsonb
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "CurriculumProgress" (
	"id" text PRIMARY KEY NOT NULL,
	"studentId" text NOT NULL,
	"curriculumId" text NOT NULL,
	"lessonsCompleted" integer NOT NULL,
	"totalLessons" integer NOT NULL,
	"currentLessonId" text,
	"averageScore" double precision,
	"isCompleted" boolean NOT NULL,
	"startedAt" timestamp with time zone DEFAULT now() NOT NULL,
	"completedAt" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "CurriculumShare" (
	"id" text PRIMARY KEY NOT NULL,
	"curriculumId" text NOT NULL,
	"sharedByTutorId" text NOT NULL,
	"recipientId" text NOT NULL,
	"message" text NOT NULL,
	"isPublic" boolean NOT NULL,
	"sharedAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "DirectMessage" (
	"id" text PRIMARY KEY NOT NULL,
	"conversationId" text NOT NULL,
	"senderId" text NOT NULL,
	"content" text NOT NULL,
	"type" text NOT NULL,
	"attachmentUrl" text,
	"read" boolean NOT NULL,
	"readAt" timestamp with time zone,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "EmergencyContact" (
	"id" text PRIMARY KEY NOT NULL,
	"parentId" text NOT NULL,
	"name" text NOT NULL,
	"relation" text NOT NULL,
	"phone" text NOT NULL,
	"email" text,
	"isPrimary" boolean NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
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
	"timestamp" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "FamilyAccount" (
	"id" text PRIMARY KEY NOT NULL,
	"familyName" text NOT NULL,
	"familyType" text NOT NULL,
	"primaryEmail" text NOT NULL,
	"phoneNumber" text,
	"address" text,
	"country" text,
	"timezone" text,
	"defaultCurrency" text NOT NULL,
	"monthlyBudget" double precision NOT NULL,
	"enableBudget" boolean NOT NULL,
	"allowAdults" boolean NOT NULL,
	"isActive" boolean NOT NULL,
	"isVerified" boolean NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL,
	"verifiedAt" timestamp with time zone,
	CONSTRAINT "FamilyAccount_primaryEmail_unique" UNIQUE("primaryEmail")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "FamilyBudget" (
	"id" text PRIMARY KEY NOT NULL,
	"parentId" text NOT NULL,
	"month" integer NOT NULL,
	"year" integer NOT NULL,
	"amount" double precision NOT NULL,
	"spent" double precision NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "FamilyMember" (
	"id" text PRIMARY KEY NOT NULL,
	"familyAccountId" text NOT NULL,
	"userId" text,
	"name" text NOT NULL,
	"relation" text NOT NULL,
	"email" text,
	"phone" text,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "FamilyNotification" (
	"id" text PRIMARY KEY NOT NULL,
	"parentId" text NOT NULL,
	"title" text NOT NULL,
	"message" text NOT NULL,
	"isRead" boolean NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "FamilyPayment" (
	"id" text PRIMARY KEY NOT NULL,
	"parentId" text NOT NULL,
	"amount" double precision NOT NULL,
	"method" text NOT NULL,
	"status" text NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "FeatureFlag" (
	"id" text PRIMARY KEY NOT NULL,
	"key" text NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"enabled" boolean NOT NULL,
	"scope" text NOT NULL,
	"targetValue" jsonb,
	"config" jsonb NOT NULL,
	"createdBy" text,
	"updatedBy" text,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL,
	"deletedAt" timestamp with time zone,
	CONSTRAINT "FeatureFlag_key_unique" UNIQUE("key")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "FeatureFlagChange" (
	"id" text PRIMARY KEY NOT NULL,
	"flagId" text NOT NULL,
	"changedBy" text NOT NULL,
	"previousValue" jsonb,
	"newValue" jsonb,
	"changeReason" text,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "FeedbackWorkflow" (
	"id" text PRIMARY KEY NOT NULL,
	"submissionId" text NOT NULL,
	"studentId" text NOT NULL,
	"aiScore" double precision,
	"aiComments" text,
	"aiStrengths" jsonb NOT NULL,
	"aiImprovements" jsonb NOT NULL,
	"aiResources" jsonb NOT NULL,
	"status" text NOT NULL,
	"modifiedScore" double precision,
	"modifiedComments" text,
	"addedNotes" text,
	"approvedAt" timestamp with time zone,
	"approvedBy" text,
	"autoApproved" boolean NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL,
	CONSTRAINT "FeedbackWorkflow_submissionId_unique" UNIQUE("submissionId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "GeneratedTask" (
	"id" text PRIMARY KEY NOT NULL,
	"tutorId" text NOT NULL,
	"roomId" text,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"type" text NOT NULL,
	"difficulty" text NOT NULL,
	"questions" jsonb NOT NULL,
	"distributionMode" text NOT NULL,
	"assignments" jsonb NOT NULL,
	"documentSource" text,
	"status" text NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"assignedAt" timestamp with time zone,
	"lessonId" text,
	"batchId" text,
	"dueDate" timestamp with time zone,
	"maxScore" integer NOT NULL,
	"timeLimitMinutes" integer,
	"enforceTimeLimit" boolean NOT NULL,
	"enforceDueDate" boolean NOT NULL,
	"maxAttempts" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "IpWhitelist" (
	"id" text PRIMARY KEY NOT NULL,
	"ipAddress" text NOT NULL,
	"description" text,
	"isActive" boolean NOT NULL,
	"createdBy" text,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"expiresAt" timestamp with time zone,
	CONSTRAINT "IpWhitelist_ipAddress_unique" UNIQUE("ipAddress")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "LeaderboardEntry" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"type" text NOT NULL,
	"periodStart" timestamp with time zone,
	"periodEnd" timestamp with time zone,
	"score" integer NOT NULL,
	"rank" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "LessonSession" (
	"id" text PRIMARY KEY NOT NULL,
	"studentId" text NOT NULL,
	"lessonId" text NOT NULL,
	"status" text NOT NULL,
	"currentSection" text NOT NULL,
	"conceptMastery" jsonb NOT NULL,
	"misconceptions" text[] NOT NULL,
	"sessionContext" jsonb,
	"whiteboardItems" text[] NOT NULL,
	"startedAt" timestamp with time zone DEFAULT now() NOT NULL,
	"lastActivityAt" timestamp with time zone NOT NULL,
	"completedAt" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "LibraryTask" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"question" text NOT NULL,
	"type" text NOT NULL,
	"options" jsonb,
	"correctAnswer" text,
	"explanation" text,
	"difficulty" text NOT NULL,
	"subject" text NOT NULL,
	"topics" jsonb NOT NULL,
	"isFavorite" boolean NOT NULL,
	"usageCount" integer NOT NULL,
	"lastUsedAt" timestamp with time zone,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "LiveSession" (
	"id" text PRIMARY KEY NOT NULL,
	"tutorId" text NOT NULL,
	"curriculumId" text,
	"title" text NOT NULL,
	"subject" text NOT NULL,
	"description" text,
	"gradeLevel" text,
	"type" "SessionType" NOT NULL,
	"scheduledAt" timestamp with time zone,
	"startedAt" timestamp with time zone,
	"endedAt" timestamp with time zone,
	"maxStudents" integer NOT NULL,
	"status" text NOT NULL,
	"roomId" text,
	"roomUrl" text,
	"recordingUrl" text,
	"recordingAvailableAt" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "LlmModel" (
	"id" text PRIMARY KEY NOT NULL,
	"providerId" text NOT NULL,
	"modelId" text NOT NULL,
	"name" text,
	"description" text,
	"maxTokens" integer,
	"supportsVision" boolean NOT NULL,
	"supportsFunctions" boolean NOT NULL,
	"isActive" boolean NOT NULL,
	"config" jsonb NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "LlmProvider" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"providerType" text NOT NULL,
	"apiKeyEncrypted" text,
	"baseUrl" text,
	"isActive" boolean NOT NULL,
	"isDefault" boolean NOT NULL,
	"priority" integer NOT NULL,
	"config" jsonb NOT NULL,
	"rateLimits" jsonb NOT NULL,
	"costPer1kTokens" double precision,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "LlmRoutingRule" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"description" text,
	"priority" integer NOT NULL,
	"conditions" jsonb NOT NULL,
	"targetModelId" text NOT NULL,
	"fallbackModelId" text,
	"isActive" boolean NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"providerId" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "MathAIInteraction" (
	"id" text PRIMARY KEY NOT NULL,
	"sessionId" text NOT NULL,
	"userId" text NOT NULL,
	"type" "MathAIInteractionType" NOT NULL,
	"inputText" text,
	"inputLatex" text,
	"inputImage" text,
	"output" text NOT NULL,
	"outputLatex" text,
	"modelUsed" text NOT NULL,
	"latencyMs" integer NOT NULL,
	"tokensUsed" integer,
	"steps" jsonb,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "MathWhiteboardPage" (
	"id" text PRIMARY KEY NOT NULL,
	"sessionId" text NOT NULL,
	"name" text NOT NULL,
	"order" integer NOT NULL,
	"width" integer NOT NULL,
	"height" integer NOT NULL,
	"backgroundType" text NOT NULL,
	"backgroundColor" text NOT NULL,
	"elements" jsonb NOT NULL,
	"vectorClock" jsonb NOT NULL,
	"lastModified" timestamp with time zone NOT NULL,
	"modifiedBy" text,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "MathWhiteboardParticipant" (
	"id" text PRIMARY KEY NOT NULL,
	"sessionId" text NOT NULL,
	"userId" text NOT NULL,
	"role" "Role" NOT NULL,
	"canEdit" boolean NOT NULL,
	"canChat" boolean NOT NULL,
	"canUseAI" boolean NOT NULL,
	"cursorX" double precision,
	"cursorY" double precision,
	"cursorColor" text NOT NULL,
	"isTyping" boolean NOT NULL,
	"joinedAt" timestamp with time zone DEFAULT now() NOT NULL,
	"leftAt" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "MathWhiteboardSession" (
	"id" text PRIMARY KEY NOT NULL,
	"liveSessionId" text NOT NULL,
	"tutorId" text NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"status" "MathSessionStatus" NOT NULL,
	"isLocked" boolean NOT NULL,
	"allowStudentEdit" boolean NOT NULL,
	"allowStudentTools" boolean NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL,
	"endedAt" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "MathWhiteboardSnapshot" (
	"id" text PRIMARY KEY NOT NULL,
	"sessionId" text NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"thumbnailUrl" text,
	"pages" jsonb NOT NULL,
	"viewState" jsonb,
	"createdBy" text NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Message" (
	"id" text PRIMARY KEY NOT NULL,
	"sessionId" text NOT NULL,
	"userId" text NOT NULL,
	"content" text NOT NULL,
	"type" text NOT NULL,
	"source" "MessageSource" NOT NULL,
	"timestamp" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Mission" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"type" text NOT NULL,
	"xpReward" integer NOT NULL,
	"requirement" jsonb NOT NULL,
	"isActive" boolean NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "MissionProgress" (
	"id" text PRIMARY KEY NOT NULL,
	"missionId" text NOT NULL,
	"studentId" text NOT NULL,
	"progress" integer NOT NULL,
	"completed" boolean NOT NULL,
	"completedAt" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Note" (
	"id" text PRIMARY KEY NOT NULL,
	"contentId" text NOT NULL,
	"studentId" text NOT NULL,
	"content" text NOT NULL,
	"timestamp" integer NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Notification" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"type" text NOT NULL,
	"title" text NOT NULL,
	"message" text NOT NULL,
	"data" jsonb,
	"read" boolean NOT NULL,
	"readAt" timestamp with time zone,
	"actionUrl" text,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "NotificationPreference" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"emailEnabled" boolean NOT NULL,
	"pushEnabled" boolean NOT NULL,
	"inAppEnabled" boolean NOT NULL,
	"channelOverrides" jsonb NOT NULL,
	"quietHoursStart" text,
	"quietHoursEnd" text,
	"timezone" text NOT NULL,
	"emailDigest" text NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL,
	CONSTRAINT "NotificationPreference_userId_unique" UNIQUE("userId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ParentActivityLog" (
	"id" text PRIMARY KEY NOT NULL,
	"parentId" text NOT NULL,
	"action" text NOT NULL,
	"details" text,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ParentPaymentAuthorization" (
	"id" text PRIMARY KEY NOT NULL,
	"parentId" text NOT NULL,
	"level" text NOT NULL,
	"maxAmount" double precision,
	"methods" text[] NOT NULL,
	"isActive" boolean NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL,
	CONSTRAINT "ParentPaymentAuthorization_parentId_unique" UNIQUE("parentId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ParentSpendingLimit" (
	"id" text PRIMARY KEY NOT NULL,
	"parentId" text NOT NULL,
	"category" text NOT NULL,
	"limit" double precision NOT NULL,
	"period" text NOT NULL,
	"isActive" boolean NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Payment" (
	"id" text PRIMARY KEY NOT NULL,
	"bookingId" text,
	"amount" double precision NOT NULL,
	"currency" text NOT NULL,
	"status" "PaymentStatus" NOT NULL,
	"gateway" "PaymentGateway" NOT NULL,
	"gatewayPaymentId" text,
	"gatewayCheckoutUrl" text,
	"paidAt" timestamp with time zone,
	"refundedAt" timestamp with time zone,
	"metadata" jsonb,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL,
	"enrollmentId" text,
	"tutorId" text,
	CONSTRAINT "Payment_bookingId_unique" UNIQUE("bookingId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "PaymentOnPayout" (
	"id" text PRIMARY KEY NOT NULL,
	"paymentId" text NOT NULL,
	"payoutId" text NOT NULL,
	"amount" double precision NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Payout" (
	"id" text PRIMARY KEY NOT NULL,
	"tutorId" text NOT NULL,
	"amount" double precision NOT NULL,
	"currency" text NOT NULL,
	"status" text NOT NULL,
	"method" text NOT NULL,
	"details" jsonb,
	"notes" text,
	"requestedAt" timestamp with time zone DEFAULT now() NOT NULL,
	"processedAt" timestamp with time zone,
	"completedAt" timestamp with time zone,
	"transactionReference" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "PerformanceAlert" (
	"id" text PRIMARY KEY NOT NULL,
	"type" text NOT NULL,
	"severity" text NOT NULL,
	"message" text NOT NULL,
	"metric" text,
	"threshold" double precision,
	"currentValue" double precision,
	"timestamp" timestamp with time zone DEFAULT now() NOT NULL,
	"resolved" boolean NOT NULL,
	"resolvedAt" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "PerformanceMetric" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"metric_value" double precision NOT NULL,
	"unit" text NOT NULL,
	"tags" jsonb,
	"userId" text,
	"sessionId" text,
	"timestamp" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "PlatformRevenue" (
	"id" text PRIMARY KEY NOT NULL,
	"paymentId" text NOT NULL,
	"amount" double precision NOT NULL,
	"month" text NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Poll" (
	"id" text PRIMARY KEY NOT NULL,
	"sessionId" text NOT NULL,
	"tutorId" text NOT NULL,
	"question" text NOT NULL,
	"type" "PollType" NOT NULL,
	"isAnonymous" boolean NOT NULL,
	"allowMultiple" boolean NOT NULL,
	"timeLimit" integer,
	"showResults" boolean NOT NULL,
	"correctOptionId" text,
	"status" "PollStatus" NOT NULL,
	"startedAt" timestamp with time zone,
	"endedAt" timestamp with time zone,
	"totalResponses" integer NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "PollOption" (
	"id" text PRIMARY KEY NOT NULL,
	"pollId" text NOT NULL,
	"label" text NOT NULL,
	"text" text NOT NULL,
	"color" text,
	"responseCount" integer NOT NULL,
	"percentage" double precision NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "PollResponse" (
	"id" text PRIMARY KEY NOT NULL,
	"pollId" text NOT NULL,
	"respondentHash" text,
	"optionIds" text[] NOT NULL,
	"rating" integer,
	"textAnswer" text,
	"studentId" text,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
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
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Profile" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"name" text,
	"username" text,
	"bio" text,
	"avatarUrl" text,
	"dateOfBirth" timestamp with time zone,
	"timezone" text NOT NULL,
	"emailNotifications" boolean NOT NULL,
	"smsNotifications" boolean NOT NULL,
	"gradeLevel" text,
	"studentUniqueId" text,
	"subjectsOfInterest" text[] NOT NULL,
	"preferredLanguages" text[] NOT NULL,
	"learningGoals" text[] NOT NULL,
	"tosAccepted" boolean NOT NULL,
	"tosAcceptedAt" timestamp with time zone,
	"organizationName" text,
	"isOnboarded" boolean NOT NULL,
	"hourlyRate" double precision,
	"specialties" text[] NOT NULL,
	"credentials" text,
	"availability" jsonb,
	"paidClassesEnabled" boolean NOT NULL,
	"paymentGatewayPreference" text,
	"currency" text,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL,
	CONSTRAINT "Profile_userId_unique" UNIQUE("userId"),
	CONSTRAINT "Profile_username_unique" UNIQUE("username"),
	CONSTRAINT "Profile_studentUniqueId_unique" UNIQUE("studentUniqueId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "QuestionBankItem" (
	"id" text PRIMARY KEY NOT NULL,
	"tutorId" text NOT NULL,
	"type" text NOT NULL,
	"question" text NOT NULL,
	"options" jsonb,
	"correctAnswer" jsonb,
	"explanation" text,
	"hint" text,
	"points" integer NOT NULL,
	"difficulty" text NOT NULL,
	"tags" text[] NOT NULL,
	"subject" text,
	"curriculumId" text,
	"lessonId" text,
	"isPublic" boolean NOT NULL,
	"usageCount" integer NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Quiz" (
	"id" text PRIMARY KEY NOT NULL,
	"tutorId" text NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"type" text NOT NULL,
	"status" text NOT NULL,
	"timeLimit" integer,
	"allowedAttempts" integer NOT NULL,
	"shuffleQuestions" boolean NOT NULL,
	"shuffleOptions" boolean NOT NULL,
	"showCorrectAnswers" text NOT NULL,
	"passingScore" integer,
	"questions" jsonb NOT NULL,
	"totalPoints" integer NOT NULL,
	"tags" text[] NOT NULL,
	"startDate" timestamp with time zone,
	"dueDate" timestamp with time zone,
	"curriculumId" text,
	"lessonId" text,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "QuizAssignment" (
	"id" text PRIMARY KEY NOT NULL,
	"quizId" text NOT NULL,
	"assignedByTutorId" text NOT NULL,
	"assignedToType" text NOT NULL,
	"assignedToId" text,
	"assignedToAll" boolean NOT NULL,
	"assignedAt" timestamp with time zone DEFAULT now() NOT NULL,
	"dueDate" timestamp with time zone,
	"isActive" boolean NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "QuizAttempt" (
	"id" text PRIMARY KEY NOT NULL,
	"studentId" text NOT NULL,
	"quizId" text NOT NULL,
	"assignmentId" text,
	"answers" jsonb NOT NULL,
	"score" integer NOT NULL,
	"maxScore" integer NOT NULL,
	"completedAt" timestamp with time zone DEFAULT now() NOT NULL,
	"timeSpent" integer NOT NULL,
	"questionResults" jsonb,
	"feedback" text,
	"status" text NOT NULL,
	"attemptNumber" integer NOT NULL,
	"startedAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Refund" (
	"id" text PRIMARY KEY NOT NULL,
	"paymentId" text NOT NULL,
	"amount" double precision NOT NULL,
	"reason" text,
	"status" "RefundStatus" NOT NULL,
	"gatewayRefundId" text,
	"processedAt" timestamp with time zone,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Resource" (
	"id" text PRIMARY KEY NOT NULL,
	"tutorId" text NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"type" text NOT NULL,
	"size" integer NOT NULL,
	"mimeType" text,
	"url" text NOT NULL,
	"key" text NOT NULL,
	"tags" text[] NOT NULL,
	"isPublic" boolean NOT NULL,
	"downloadCount" integer NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ResourceShare" (
	"id" text PRIMARY KEY NOT NULL,
	"resourceId" text NOT NULL,
	"sharedByTutorId" text NOT NULL,
	"recipientId" text,
	"curriculumId" text,
	"sharedWithAll" boolean NOT NULL,
	"message" text,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ReviewSchedule" (
	"id" text PRIMARY KEY NOT NULL,
	"studentId" text NOT NULL,
	"contentId" text NOT NULL,
	"lastReviewed" timestamp with time zone DEFAULT now() NOT NULL,
	"nextReview" timestamp with time zone NOT NULL,
	"interval" integer NOT NULL,
	"easeFactor" double precision NOT NULL,
	"stability" double precision NOT NULL,
	"repetitionCount" integer NOT NULL,
	"performance" double precision NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "SecurityEvent" (
	"id" text PRIMARY KEY NOT NULL,
	"eventType" text NOT NULL,
	"ip" text,
	"metadata" jsonb,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"action" text,
	"userId" text,
	"actorId" text,
	"targetType" text,
	"targetId" text,
	"severity" text,
	"description" text,
	"originIp" text,
	"userAgent" text,
	"countryCode" text,
	"region" text,
	"city" text,
	"deviceId" text,
	"sessionId" text,
	"correlationId" text,
	"occurredAt" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "SessionBookmark" (
	"id" text PRIMARY KEY NOT NULL,
	"sessionId" text NOT NULL,
	"timestampSeconds" integer NOT NULL,
	"label" text,
	"note" text,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
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
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "SessionParticipant" (
	"id" text PRIMARY KEY NOT NULL,
	"sessionId" text NOT NULL,
	"studentId" text NOT NULL,
	"joinedAt" timestamp with time zone DEFAULT now() NOT NULL,
	"leftAt" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "SessionReplayArtifact" (
	"id" text PRIMARY KEY NOT NULL,
	"sessionId" text NOT NULL,
	"tutorId" text NOT NULL,
	"recordingUrl" text,
	"transcript" text,
	"summary" text,
	"summaryJson" jsonb,
	"status" text NOT NULL,
	"startedAt" timestamp with time zone,
	"endedAt" timestamp with time zone,
	"generatedAt" timestamp with time zone,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL,
	CONSTRAINT "SessionReplayArtifact_sessionId_unique" UNIQUE("sessionId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "StudentPerformance" (
	"id" text PRIMARY KEY NOT NULL,
	"studentId" text NOT NULL,
	"curriculumId" text,
	"averageScore" double precision NOT NULL,
	"completionRate" double precision NOT NULL,
	"engagementScore" double precision NOT NULL,
	"attendanceRate" double precision NOT NULL,
	"participationRate" double precision NOT NULL,
	"strengths" jsonb NOT NULL,
	"weaknesses" jsonb NOT NULL,
	"taskHistory" jsonb NOT NULL,
	"commonMistakes" jsonb NOT NULL,
	"skillBreakdown" jsonb NOT NULL,
	"cluster" text NOT NULL,
	"learningStyle" text,
	"pace" text NOT NULL,
	"recommendedPeers" jsonb NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "StudentProgressSnapshot" (
	"id" text PRIMARY KEY NOT NULL,
	"parentId" text NOT NULL,
	"studentId" text NOT NULL,
	"data" jsonb NOT NULL,
	"capturedAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
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
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "StudyGroup" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"subject" text NOT NULL,
	"description" text,
	"maxMembers" integer NOT NULL,
	"createdBy" text NOT NULL,
	"isActive" boolean NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "StudyGroupMember" (
	"id" text PRIMARY KEY NOT NULL,
	"groupId" text NOT NULL,
	"studentId" text NOT NULL,
	"joinedAt" timestamp with time zone DEFAULT now() NOT NULL,
	"role" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "SystemSetting" (
	"id" text PRIMARY KEY NOT NULL,
	"category" text NOT NULL,
	"key" text NOT NULL,
	"setting_value" jsonb NOT NULL,
	"valueType" text NOT NULL,
	"description" text,
	"isEditable" boolean NOT NULL,
	"requiresRestart" boolean NOT NULL,
	"updatedBy" text,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "TaskSubmission" (
	"id" text PRIMARY KEY NOT NULL,
	"taskId" text NOT NULL,
	"studentId" text NOT NULL,
	"answers" jsonb NOT NULL,
	"timeSpent" integer NOT NULL,
	"attempts" integer NOT NULL,
	"questionResults" jsonb,
	"score" double precision,
	"maxScore" integer NOT NULL,
	"status" text NOT NULL,
	"aiFeedback" jsonb,
	"tutorFeedback" text,
	"tutorApproved" boolean NOT NULL,
	"submittedAt" timestamp with time zone DEFAULT now() NOT NULL,
	"gradedAt" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "TutorApplication" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
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
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "TutorApplication_userId_unique" UNIQUE("userId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "User" (
	"id" text PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"password" text,
	"role" "Role" NOT NULL,
	"emailVerified" timestamp with time zone,
	"image" text,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL,
	CONSTRAINT "User_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "UserActivityLog" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"action" text NOT NULL,
	"metadata" jsonb,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "UserBadge" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"badgeId" text NOT NULL,
	"earnedAt" timestamp with time zone DEFAULT now() NOT NULL,
	"progress" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "UserDailyQuest" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"missionId" text NOT NULL,
	"date" timestamp with time zone DEFAULT now() NOT NULL,
	"completed" boolean NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "UserGamification" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"level" integer NOT NULL,
	"xp" integer NOT NULL,
	"streakDays" integer NOT NULL,
	"longestStreak" integer NOT NULL,
	"lastLogin" timestamp with time zone DEFAULT now() NOT NULL,
	"lastActiveDate" timestamp with time zone,
	"totalStudyMinutes" integer NOT NULL,
	"grammarScore" integer NOT NULL,
	"vocabularyScore" integer NOT NULL,
	"speakingScore" integer NOT NULL,
	"listeningScore" integer NOT NULL,
	"confidenceScore" integer NOT NULL,
	"fluencyScore" integer NOT NULL,
	"unlockedWorlds" text[] NOT NULL,
	CONSTRAINT "UserGamification_userId_unique" UNIQUE("userId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "VideoWatchEvent" (
	"id" text PRIMARY KEY NOT NULL,
	"contentId" text NOT NULL,
	"studentId" text NOT NULL,
	"eventType" text NOT NULL,
	"videoSeconds" double precision NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"metadata" jsonb
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "WebhookEvent" (
	"id" text PRIMARY KEY NOT NULL,
	"paymentId" text,
	"gateway" "PaymentGateway" NOT NULL,
	"eventType" text NOT NULL,
	"payload" jsonb NOT NULL,
	"processed" boolean NOT NULL,
	"processedAt" timestamp with time zone,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Whiteboard" (
	"id" text PRIMARY KEY NOT NULL,
	"tutorId" text NOT NULL,
	"ownerId" text NOT NULL,
	"sessionId" text,
	"roomId" text,
	"curriculumId" text,
	"lessonId" text,
	"title" text NOT NULL,
	"description" text,
	"isTemplate" boolean NOT NULL,
	"isPublic" boolean NOT NULL,
	"width" integer NOT NULL,
	"height" integer NOT NULL,
	"backgroundColor" text NOT NULL,
	"backgroundStyle" text NOT NULL,
	"backgroundImage" text,
	"collaborators" jsonb,
	"visibility" text NOT NULL,
	"isBroadcasting" boolean NOT NULL,
	"ownerType" text NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL,
	"deletedAt" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "WhiteboardPage" (
	"id" text PRIMARY KEY NOT NULL,
	"whiteboardId" text NOT NULL,
	"name" text NOT NULL,
	"order" integer NOT NULL,
	"version" integer DEFAULT 1 NOT NULL,
	"backgroundColor" text,
	"backgroundStyle" text,
	"backgroundImage" text,
	"strokes" jsonb NOT NULL,
	"shapes" jsonb NOT NULL,
	"texts" jsonb NOT NULL,
	"images" jsonb NOT NULL,
	"viewState" jsonb,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "WhiteboardSession" (
	"id" text PRIMARY KEY NOT NULL,
	"whiteboardId" text NOT NULL,
	"roomId" text NOT NULL,
	"tutorId" text NOT NULL,
	"participants" jsonb NOT NULL,
	"isActive" boolean NOT NULL,
	"startedAt" timestamp with time zone DEFAULT now() NOT NULL,
	"endedAt" timestamp with time zone,
	"operations" jsonb,
	"finalPageStates" jsonb
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "WhiteboardSnapshot" (
	"id" text PRIMARY KEY NOT NULL,
	"whiteboardId" text NOT NULL,
	"name" text NOT NULL,
	"thumbnailUrl" text,
	"pages" jsonb NOT NULL,
	"createdBy" text NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Session" (
	"sessionToken" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"expires" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "VerificationToken" (
	"identifier" text NOT NULL,
	"token" text NOT NULL,
	"expires" timestamp with time zone NOT NULL,
	CONSTRAINT "VerificationToken_identifier_token_pk" PRIMARY KEY("identifier","token")
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "AIAssistantInsight_sessionId_idx" ON "AIAssistantInsight" USING btree ("sessionId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "AIAssistantInsight_type_idx" ON "AIAssistantInsight" USING btree ("type");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "AIAssistantInsight_createdAt_idx" ON "AIAssistantInsight" USING btree ("createdAt");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "AIAssistantMessage_sessionId_idx" ON "AIAssistantMessage" USING btree ("sessionId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "AIAssistantMessage_createdAt_idx" ON "AIAssistantMessage" USING btree ("createdAt");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "AIAssistantSession_tutorId_idx" ON "AIAssistantSession" USING btree ("tutorId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "AIAssistantSession_status_idx" ON "AIAssistantSession" USING btree ("status");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "AIAssistantSession_updatedAt_idx" ON "AIAssistantSession" USING btree ("updatedAt");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "AIInteractionSession_studentId_idx" ON "AIInteractionSession" USING btree ("studentId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "AIInteractionSession_startedAt_idx" ON "AIInteractionSession" USING btree ("startedAt");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "AITutorDailyUsage_userId_idx" ON "AITutorDailyUsage" USING btree ("userId");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "AITutorDailyUsage_userId_date_key" ON "AITutorDailyUsage" USING btree ("userId","date");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "AITutorEnrollment_studentId_idx" ON "AITutorEnrollment" USING btree ("studentId");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "AITutorEnrollment_studentId_subjectCode_key" ON "AITutorEnrollment" USING btree ("studentId","subjectCode");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "Account_userId_idx" ON "Account" USING btree ("userId");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "Account_provider_providerAccountId_key" ON "Account" USING btree ("provider","providerAccountId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "Achievement_userId_idx" ON "Achievement" USING btree ("userId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "AdminAssignment_userId_idx" ON "AdminAssignment" USING btree ("userId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "AdminAssignment_roleId_idx" ON "AdminAssignment" USING btree ("roleId");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "AdminAssignment_userId_roleId_key" ON "AdminAssignment" USING btree ("userId","roleId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "AdminAuditLog_adminId_idx" ON "AdminAuditLog" USING btree ("adminId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "AdminAuditLog_action_idx" ON "AdminAuditLog" USING btree ("action");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "AdminAuditLog_resourceType_idx" ON "AdminAuditLog" USING btree ("resourceType");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "AdminAuditLog_createdAt_idx" ON "AdminAuditLog" USING btree ("createdAt");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "AdminSession_adminId_idx" ON "AdminSession" USING btree ("adminId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "AdminSession_token_idx" ON "AdminSession" USING btree ("token");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "AdminSession_expiresAt_idx" ON "AdminSession" USING btree ("expiresAt");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "ApiKey_keyHash_idx" ON "ApiKey" USING btree ("keyHash");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "Bookmark_studentId_idx" ON "Bookmark" USING btree ("studentId");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "Bookmark_contentId_studentId_key" ON "Bookmark" USING btree ("contentId","studentId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "BreakoutRoom_sessionId_idx" ON "BreakoutRoom" USING btree ("sessionId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "BreakoutRoom_status_idx" ON "BreakoutRoom" USING btree ("status");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "BreakoutRoomAssignment_studentId_idx" ON "BreakoutRoomAssignment" USING btree ("studentId");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "BreakoutRoomAssignment_roomId_studentId_key" ON "BreakoutRoomAssignment" USING btree ("roomId","studentId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "BreakoutSession_mainRoomId_idx" ON "BreakoutSession" USING btree ("mainRoomId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "BreakoutSession_tutorId_idx" ON "BreakoutSession" USING btree ("tutorId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "BreakoutSession_status_idx" ON "BreakoutSession" USING btree ("status");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "BudgetAlert_parentId_idx" ON "BudgetAlert" USING btree ("parentId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "CalendarAvailability_tutorId_idx" ON "CalendarAvailability" USING btree ("tutorId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "CalendarAvailability_dayOfWeek_idx" ON "CalendarAvailability" USING btree ("dayOfWeek");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "CalendarAvailability_tutorId_dayOfWeek_startTime_endTime_key" ON "CalendarAvailability" USING btree ("tutorId","dayOfWeek","startTime","endTime");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "CalendarConnection_userId_idx" ON "CalendarConnection" USING btree ("userId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "CalendarConnection_provider_idx" ON "CalendarConnection" USING btree ("provider");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "CalendarConnection_userId_provider_key" ON "CalendarConnection" USING btree ("userId","provider");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "CalendarEvent_tutorId_idx" ON "CalendarEvent" USING btree ("tutorId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "CalendarEvent_startTime_idx" ON "CalendarEvent" USING btree ("startTime");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "CalendarEvent_endTime_idx" ON "CalendarEvent" USING btree ("endTime");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "CalendarEvent_status_idx" ON "CalendarEvent" USING btree ("status");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "CalendarEvent_type_idx" ON "CalendarEvent" USING btree ("type");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "CalendarEvent_recurringEventId_idx" ON "CalendarEvent" USING btree ("recurringEventId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "CalendarEvent_tutorId_startTime_endTime_idx" ON "CalendarEvent" USING btree ("tutorId","startTime","endTime");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "CalendarEvent_curriculumId_idx" ON "CalendarEvent" USING btree ("curriculumId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "CalendarEvent_batchId_idx" ON "CalendarEvent" USING btree ("batchId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "CalendarException_tutorId_idx" ON "CalendarException" USING btree ("tutorId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "CalendarException_date_idx" ON "CalendarException" USING btree ("date");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "CalendarException_tutorId_date_startTime_key" ON "CalendarException" USING btree ("tutorId","date","startTime");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "Clinic_startTime_idx" ON "Clinic" USING btree ("startTime");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "Clinic_status_idx" ON "Clinic" USING btree ("status");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "ClinicBooking_studentId_idx" ON "ClinicBooking" USING btree ("studentId");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "ClinicBooking_clinicId_studentId_key" ON "ClinicBooking" USING btree ("clinicId","studentId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "ContentItem_subject_idx" ON "ContentItem" USING btree ("subject");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "ContentItem_isPublished_idx" ON "ContentItem" USING btree ("isPublished");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "ContentProgress_studentId_idx" ON "ContentProgress" USING btree ("studentId");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "ContentProgress_contentId_studentId_key" ON "ContentProgress" USING btree ("contentId","studentId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "ContentQuizCheckpoint_contentId_idx" ON "ContentQuizCheckpoint" USING btree ("contentId");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "ContentQuizCheckpoint_contentId_videoTimestampSec_key" ON "ContentQuizCheckpoint" USING btree ("contentId","videoTimestampSec");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "Conversation_participant1Id_idx" ON "Conversation" USING btree ("participant1Id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "Conversation_participant2Id_idx" ON "Conversation" USING btree ("participant2Id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "Conversation_updatedAt_idx" ON "Conversation" USING btree ("updatedAt");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "Conversation_participant1Id_participant2Id_key" ON "Conversation" USING btree ("participant1Id","participant2Id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "CourseBatch_curriculumId_idx" ON "CourseBatch" USING btree ("curriculumId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "Curriculum_subject_idx" ON "Curriculum" USING btree ("subject");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "Curriculum_isPublished_idx" ON "Curriculum" USING btree ("isPublished");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "Curriculum_creatorId_idx" ON "Curriculum" USING btree ("creatorId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "CurriculumCatalog_subject_idx" ON "CurriculumCatalog" USING btree ("subject");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "CurriculumCatalog_subject_name_key" ON "CurriculumCatalog" USING btree ("subject","name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "CurriculumEnrollment_studentId_idx" ON "CurriculumEnrollment" USING btree ("studentId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "CurriculumEnrollment_batchId_idx" ON "CurriculumEnrollment" USING btree ("batchId");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "CurriculumEnrollment_studentId_curriculumId_key" ON "CurriculumEnrollment" USING btree ("studentId","curriculumId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "CurriculumLesson_moduleId_idx" ON "CurriculumLesson" USING btree ("moduleId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "CurriculumLesson_order_idx" ON "CurriculumLesson" USING btree ("order");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "CurriculumLessonProgress_studentId_idx" ON "CurriculumLessonProgress" USING btree ("studentId");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "CurriculumLessonProgress_lessonId_studentId_key" ON "CurriculumLessonProgress" USING btree ("lessonId","studentId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "CurriculumModule_curriculumId_idx" ON "CurriculumModule" USING btree ("curriculumId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "CurriculumModule_order_idx" ON "CurriculumModule" USING btree ("order");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "CurriculumProgress_studentId_idx" ON "CurriculumProgress" USING btree ("studentId");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "CurriculumProgress_studentId_curriculumId_key" ON "CurriculumProgress" USING btree ("studentId","curriculumId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "CurriculumShare_sharedByTutorId_idx" ON "CurriculumShare" USING btree ("sharedByTutorId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "CurriculumShare_recipientId_idx" ON "CurriculumShare" USING btree ("recipientId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "CurriculumShare_curriculumId_idx" ON "CurriculumShare" USING btree ("curriculumId");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "CurriculumShare_curriculumId_recipientId_key" ON "CurriculumShare" USING btree ("curriculumId","recipientId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "DirectMessage_conversationId_idx" ON "DirectMessage" USING btree ("conversationId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "DirectMessage_senderId_idx" ON "DirectMessage" USING btree ("senderId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "DirectMessage_createdAt_idx" ON "DirectMessage" USING btree ("createdAt");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "EmergencyContact_parentId_idx" ON "EmergencyContact" USING btree ("parentId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_emergency_contact_parent_primary" ON "EmergencyContact" USING btree ("parentId","isPrimary");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_emergency_contact_parent_primary_created" ON "EmergencyContact" USING btree ("parentId","isPrimary","createdAt");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "EngagementSnapshot_sessionId_idx" ON "EngagementSnapshot" USING btree ("sessionId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "EngagementSnapshot_studentId_idx" ON "EngagementSnapshot" USING btree ("studentId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "FamilyAccount_isActive_idx" ON "FamilyAccount" USING btree ("isActive");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "FamilyAccount_isVerified_idx" ON "FamilyAccount" USING btree ("isVerified");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "FamilyAccount_createdAt_idx" ON "FamilyAccount" USING btree ("createdAt");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_family_account_status" ON "FamilyAccount" USING btree ("isActive","isVerified");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_family_account_active_created" ON "FamilyAccount" USING btree ("isActive","createdAt");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_family_account_type_status" ON "FamilyAccount" USING btree ("familyType","isActive");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "FamilyBudget_parentId_idx" ON "FamilyBudget" USING btree ("parentId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_family_budget_parent_period" ON "FamilyBudget" USING btree ("parentId","year","month");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "FamilyBudget_parentId_month_year_key" ON "FamilyBudget" USING btree ("parentId","month","year");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "FamilyMember_familyAccountId_idx" ON "FamilyMember" USING btree ("familyAccountId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "FamilyMember_userId_idx" ON "FamilyMember" USING btree ("userId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_family_member_account_user" ON "FamilyMember" USING btree ("familyAccountId","userId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_family_member_user_relation" ON "FamilyMember" USING btree ("userId","relation");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "FamilyNotification_parentId_idx" ON "FamilyNotification" USING btree ("parentId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_family_notification_parent_created" ON "FamilyNotification" USING btree ("parentId","createdAt");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_family_notification_parent_read_created" ON "FamilyNotification" USING btree ("parentId","isRead","createdAt");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "FamilyPayment_parentId_idx" ON "FamilyPayment" USING btree ("parentId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_family_payment_parent_created" ON "FamilyPayment" USING btree ("parentId","createdAt");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_family_payment_parent_status_created" ON "FamilyPayment" USING btree ("parentId","status","createdAt");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "FeatureFlag_key_idx" ON "FeatureFlag" USING btree ("key");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "FeatureFlag_scope_idx" ON "FeatureFlag" USING btree ("scope");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "FeatureFlag_enabled_idx" ON "FeatureFlag" USING btree ("enabled");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "FeatureFlagChange_flagId_idx" ON "FeatureFlagChange" USING btree ("flagId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "FeatureFlagChange_changedBy_idx" ON "FeatureFlagChange" USING btree ("changedBy");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "FeatureFlagChange_createdAt_idx" ON "FeatureFlagChange" USING btree ("createdAt");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "FeedbackWorkflow_studentId_idx" ON "FeedbackWorkflow" USING btree ("studentId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "FeedbackWorkflow_status_idx" ON "FeedbackWorkflow" USING btree ("status");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "GeneratedTask_tutorId_idx" ON "GeneratedTask" USING btree ("tutorId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "GeneratedTask_roomId_idx" ON "GeneratedTask" USING btree ("roomId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "GeneratedTask_status_idx" ON "GeneratedTask" USING btree ("status");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "GeneratedTask_lessonId_idx" ON "GeneratedTask" USING btree ("lessonId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "GeneratedTask_batchId_idx" ON "GeneratedTask" USING btree ("batchId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "IpWhitelist_ipAddress_idx" ON "IpWhitelist" USING btree ("ipAddress");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "IpWhitelist_isActive_idx" ON "IpWhitelist" USING btree ("isActive");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "LeaderboardEntry_type_score_idx" ON "LeaderboardEntry" USING btree ("type","score");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "LeaderboardEntry_userId_idx" ON "LeaderboardEntry" USING btree ("userId");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "LeaderboardEntry_userId_type_periodStart_key" ON "LeaderboardEntry" USING btree ("userId","type","periodStart");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "LessonSession_studentId_idx" ON "LessonSession" USING btree ("studentId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "LessonSession_lessonId_idx" ON "LessonSession" USING btree ("lessonId");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "LessonSession_studentId_lessonId_key" ON "LessonSession" USING btree ("studentId","lessonId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "LibraryTask_userId_idx" ON "LibraryTask" USING btree ("userId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "LibraryTask_isFavorite_idx" ON "LibraryTask" USING btree ("isFavorite");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "LiveSession_tutorId_idx" ON "LiveSession" USING btree ("tutorId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "LiveSession_curriculumId_idx" ON "LiveSession" USING btree ("curriculumId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "LiveSession_status_idx" ON "LiveSession" USING btree ("status");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "LiveSession_scheduledAt_idx" ON "LiveSession" USING btree ("scheduledAt");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "LlmModel_providerId_idx" ON "LlmModel" USING btree ("providerId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "LlmModel_isActive_idx" ON "LlmModel" USING btree ("isActive");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "LlmModel_providerId_modelId_key" ON "LlmModel" USING btree ("providerId","modelId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "LlmRoutingRule_targetModelId_idx" ON "LlmRoutingRule" USING btree ("targetModelId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "LlmRoutingRule_isActive_idx" ON "LlmRoutingRule" USING btree ("isActive");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "LlmRoutingRule_priority_idx" ON "LlmRoutingRule" USING btree ("priority");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "MathAIInteraction_sessionId_idx" ON "MathAIInteraction" USING btree ("sessionId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "MathAIInteraction_type_idx" ON "MathAIInteraction" USING btree ("type");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "MathAIInteraction_createdAt_idx" ON "MathAIInteraction" USING btree ("createdAt");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "MathWhiteboardPage_sessionId_idx" ON "MathWhiteboardPage" USING btree ("sessionId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "MathWhiteboardPage_order_idx" ON "MathWhiteboardPage" USING btree ("order");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "MathWhiteboardPage_sessionId_order_key" ON "MathWhiteboardPage" USING btree ("sessionId","order");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "MathWhiteboardParticipant_sessionId_idx" ON "MathWhiteboardParticipant" USING btree ("sessionId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "MathWhiteboardParticipant_userId_idx" ON "MathWhiteboardParticipant" USING btree ("userId");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "MathWhiteboardParticipant_sessionId_userId_key" ON "MathWhiteboardParticipant" USING btree ("sessionId","userId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "MathWhiteboardSession_liveSessionId_idx" ON "MathWhiteboardSession" USING btree ("liveSessionId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "MathWhiteboardSession_tutorId_idx" ON "MathWhiteboardSession" USING btree ("tutorId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "MathWhiteboardSession_status_idx" ON "MathWhiteboardSession" USING btree ("status");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "MathWhiteboardSession_createdAt_idx" ON "MathWhiteboardSession" USING btree ("createdAt");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "MathWhiteboardSnapshot_sessionId_idx" ON "MathWhiteboardSnapshot" USING btree ("sessionId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "MathWhiteboardSnapshot_createdAt_idx" ON "MathWhiteboardSnapshot" USING btree ("createdAt");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "Message_sessionId_idx" ON "Message" USING btree ("sessionId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "Message_userId_idx" ON "Message" USING btree ("userId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "MissionProgress_studentId_idx" ON "MissionProgress" USING btree ("studentId");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "MissionProgress_missionId_studentId_key" ON "MissionProgress" USING btree ("missionId","studentId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "Note_contentId_idx" ON "Note" USING btree ("contentId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "Note_studentId_idx" ON "Note" USING btree ("studentId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "Notification_userId_idx" ON "Notification" USING btree ("userId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "Notification_read_idx" ON "Notification" USING btree ("read");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "Notification_createdAt_idx" ON "Notification" USING btree ("createdAt");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "Notification_type_idx" ON "Notification" USING btree ("type");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_notification_user_read_created" ON "Notification" USING btree ("userId","read","createdAt");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_notification_user_type_created" ON "Notification" USING btree ("userId","type","createdAt");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "ParentActivityLog_parentId_idx" ON "ParentActivityLog" USING btree ("parentId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_parent_activity_parent_created" ON "ParentActivityLog" USING btree ("parentId","createdAt");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "ParentPaymentAuthorization_parentId_idx" ON "ParentPaymentAuthorization" USING btree ("parentId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "ParentSpendingLimit_parentId_idx" ON "ParentSpendingLimit" USING btree ("parentId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "Payment_status_idx" ON "Payment" USING btree ("status");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "Payment_gateway_idx" ON "Payment" USING btree ("gateway");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "Payment_gatewayPaymentId_idx" ON "Payment" USING btree ("gatewayPaymentId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "Payment_tutorId_idx" ON "Payment" USING btree ("tutorId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_payment_tutor_status_created" ON "Payment" USING btree ("tutorId","status","createdAt");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_payment_enrollment_status" ON "Payment" USING btree ("enrollmentId","status");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "PaymentOnPayout_payoutId_idx" ON "PaymentOnPayout" USING btree ("payoutId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "PaymentOnPayout_paymentId_idx" ON "PaymentOnPayout" USING btree ("paymentId");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "PaymentOnPayout_paymentId_payoutId_key" ON "PaymentOnPayout" USING btree ("paymentId","payoutId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "Payout_tutorId_idx" ON "Payout" USING btree ("tutorId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "Payout_status_idx" ON "Payout" USING btree ("status");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "Payout_requestedAt_idx" ON "Payout" USING btree ("requestedAt");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "PerformanceAlert_type_idx" ON "PerformanceAlert" USING btree ("type");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "PerformanceAlert_severity_idx" ON "PerformanceAlert" USING btree ("severity");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "PerformanceAlert_resolved_idx" ON "PerformanceAlert" USING btree ("resolved");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "PerformanceAlert_timestamp_idx" ON "PerformanceAlert" USING btree ("timestamp");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "PerformanceMetric_name_idx" ON "PerformanceMetric" USING btree ("name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "PerformanceMetric_timestamp_idx" ON "PerformanceMetric" USING btree ("timestamp");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "PerformanceMetric_userId_idx" ON "PerformanceMetric" USING btree ("userId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "PlatformRevenue_paymentId_idx" ON "PlatformRevenue" USING btree ("paymentId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "PlatformRevenue_month_idx" ON "PlatformRevenue" USING btree ("month");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "PlatformRevenue_createdAt_idx" ON "PlatformRevenue" USING btree ("createdAt");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "Poll_sessionId_idx" ON "Poll" USING btree ("sessionId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "Poll_tutorId_idx" ON "Poll" USING btree ("tutorId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "Poll_status_idx" ON "Poll" USING btree ("status");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "Poll_createdAt_idx" ON "Poll" USING btree ("createdAt");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "PollOption_pollId_idx" ON "PollOption" USING btree ("pollId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "PollResponse_pollId_idx" ON "PollResponse" USING btree ("pollId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "PollResponse_studentId_idx" ON "PollResponse" USING btree ("studentId");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "PollResponse_pollId_respondentHash_key" ON "PollResponse" USING btree ("pollId","respondentHash");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "PostSessionReport_sessionId_idx" ON "PostSessionReport" USING btree ("sessionId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "QuestionBankItem_tutorId_idx" ON "QuestionBankItem" USING btree ("tutorId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "QuestionBankItem_type_idx" ON "QuestionBankItem" USING btree ("type");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "QuestionBankItem_difficulty_idx" ON "QuestionBankItem" USING btree ("difficulty");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "QuestionBankItem_subject_idx" ON "QuestionBankItem" USING btree ("subject");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "QuestionBankItem_tags_idx" ON "QuestionBankItem" USING btree ("tags");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "Quiz_tutorId_idx" ON "Quiz" USING btree ("tutorId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "Quiz_status_idx" ON "Quiz" USING btree ("status");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "Quiz_type_idx" ON "Quiz" USING btree ("type");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "Quiz_curriculumId_idx" ON "Quiz" USING btree ("curriculumId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "Quiz_lessonId_idx" ON "Quiz" USING btree ("lessonId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "QuizAssignment_quizId_idx" ON "QuizAssignment" USING btree ("quizId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "QuizAssignment_assignedByTutorId_idx" ON "QuizAssignment" USING btree ("assignedByTutorId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "QuizAssignment_assignedToId_idx" ON "QuizAssignment" USING btree ("assignedToId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "QuizAssignment_isActive_idx" ON "QuizAssignment" USING btree ("isActive");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "QuizAttempt_studentId_idx" ON "QuizAttempt" USING btree ("studentId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "QuizAttempt_quizId_idx" ON "QuizAttempt" USING btree ("quizId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "QuizAttempt_assignmentId_idx" ON "QuizAttempt" USING btree ("assignmentId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "QuizAttempt_studentId_quizId_idx" ON "QuizAttempt" USING btree ("studentId","quizId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "Refund_paymentId_idx" ON "Refund" USING btree ("paymentId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "Resource_tutorId_idx" ON "Resource" USING btree ("tutorId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "Resource_type_idx" ON "Resource" USING btree ("type");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "Resource_tags_idx" ON "Resource" USING btree ("tags");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "Resource_isPublic_idx" ON "Resource" USING btree ("isPublic");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "ResourceShare_resourceId_idx" ON "ResourceShare" USING btree ("resourceId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "ResourceShare_recipientId_idx" ON "ResourceShare" USING btree ("recipientId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "ResourceShare_sharedByTutorId_idx" ON "ResourceShare" USING btree ("sharedByTutorId");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "ResourceShare_resourceId_recipientId_key" ON "ResourceShare" USING btree ("resourceId","recipientId");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "ResourceShare_resourceId_sharedWithAll_key" ON "ResourceShare" USING btree ("resourceId","sharedWithAll");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "ReviewSchedule_studentId_idx" ON "ReviewSchedule" USING btree ("studentId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "ReviewSchedule_nextReview_idx" ON "ReviewSchedule" USING btree ("nextReview");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "ReviewSchedule_studentId_contentId_key" ON "ReviewSchedule" USING btree ("studentId","contentId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "SecurityEvent_eventType_idx" ON "SecurityEvent" USING btree ("eventType");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "SecurityEvent_action_idx" ON "SecurityEvent" USING btree ("action");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "SecurityEvent_severity_idx" ON "SecurityEvent" USING btree ("severity");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "SecurityEvent_createdAt_idx" ON "SecurityEvent" USING btree ("createdAt");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "SecurityEvent_occurredAt_idx" ON "SecurityEvent" USING btree ("occurredAt");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "SecurityEvent_ip_idx" ON "SecurityEvent" USING btree ("ip");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "SecurityEvent_userId_idx" ON "SecurityEvent" USING btree ("userId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "SessionBookmark_sessionId_idx" ON "SessionBookmark" USING btree ("sessionId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "SessionParticipant_studentId_idx" ON "SessionParticipant" USING btree ("studentId");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "SessionParticipant_sessionId_studentId_key" ON "SessionParticipant" USING btree ("sessionId","studentId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "SessionReplayArtifact_tutorId_idx" ON "SessionReplayArtifact" USING btree ("tutorId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "SessionReplayArtifact_status_idx" ON "SessionReplayArtifact" USING btree ("status");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "SessionReplayArtifact_generatedAt_idx" ON "SessionReplayArtifact" USING btree ("generatedAt");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "StudentPerformance_studentId_idx" ON "StudentPerformance" USING btree ("studentId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "StudentPerformance_curriculumId_idx" ON "StudentPerformance" USING btree ("curriculumId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "StudentPerformance_cluster_idx" ON "StudentPerformance" USING btree ("cluster");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "StudentPerformance_studentId_curriculumId_key" ON "StudentPerformance" USING btree ("studentId","curriculumId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "StudentProgressSnapshot_parentId_idx" ON "StudentProgressSnapshot" USING btree ("parentId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "StudentProgressSnapshot_studentId_idx" ON "StudentProgressSnapshot" USING btree ("studentId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_student_progress_parent_captured" ON "StudentProgressSnapshot" USING btree ("parentId","capturedAt");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_student_progress_student_captured" ON "StudentProgressSnapshot" USING btree ("studentId","capturedAt");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "StudentSessionInsight_sessionId_idx" ON "StudentSessionInsight" USING btree ("sessionId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "StudyGroup_subject_idx" ON "StudyGroup" USING btree ("subject");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "StudyGroup_isActive_idx" ON "StudyGroup" USING btree ("isActive");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "StudyGroupMember_studentId_idx" ON "StudyGroupMember" USING btree ("studentId");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "StudyGroupMember_groupId_studentId_key" ON "StudyGroupMember" USING btree ("groupId","studentId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "SystemSetting_category_idx" ON "SystemSetting" USING btree ("category");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "SystemSetting_key_idx" ON "SystemSetting" USING btree ("key");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "SystemSetting_category_key_key" ON "SystemSetting" USING btree ("category","key");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "TaskSubmission_studentId_idx" ON "TaskSubmission" USING btree ("studentId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "TaskSubmission_taskId_idx" ON "TaskSubmission" USING btree ("taskId");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "TaskSubmission_taskId_studentId_key" ON "TaskSubmission" USING btree ("taskId","studentId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "TutorApplication_userId_idx" ON "TutorApplication" USING btree ("userId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "TutorApplication_username_idx" ON "TutorApplication" USING btree ("username");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "UserActivityLog_userId_idx" ON "UserActivityLog" USING btree ("userId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "UserActivityLog_createdAt_idx" ON "UserActivityLog" USING btree ("createdAt");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_user_activity_user_created" ON "UserActivityLog" USING btree ("userId","createdAt");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "UserBadge_userId_idx" ON "UserBadge" USING btree ("userId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "UserBadge_badgeId_idx" ON "UserBadge" USING btree ("badgeId");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "UserBadge_userId_badgeId_key" ON "UserBadge" USING btree ("userId","badgeId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "UserDailyQuest_userId_idx" ON "UserDailyQuest" USING btree ("userId");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "UserDailyQuest_userId_missionId_date_key" ON "UserDailyQuest" USING btree ("userId","missionId","date");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "VideoWatchEvent_contentId_idx" ON "VideoWatchEvent" USING btree ("contentId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "VideoWatchEvent_studentId_idx" ON "VideoWatchEvent" USING btree ("studentId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "VideoWatchEvent_contentId_studentId_idx" ON "VideoWatchEvent" USING btree ("contentId","studentId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "WebhookEvent_gateway_eventType_idx" ON "WebhookEvent" USING btree ("gateway","eventType");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "WebhookEvent_processed_idx" ON "WebhookEvent" USING btree ("processed");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "Whiteboard_tutorId_idx" ON "Whiteboard" USING btree ("tutorId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "Whiteboard_ownerId_idx" ON "Whiteboard" USING btree ("ownerId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "Whiteboard_sessionId_idx" ON "Whiteboard" USING btree ("sessionId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "Whiteboard_roomId_idx" ON "Whiteboard" USING btree ("roomId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "Whiteboard_curriculumId_idx" ON "Whiteboard" USING btree ("curriculumId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "Whiteboard_lessonId_idx" ON "Whiteboard" USING btree ("lessonId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "Whiteboard_isTemplate_idx" ON "Whiteboard" USING btree ("isTemplate");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "Whiteboard_createdAt_idx" ON "Whiteboard" USING btree ("createdAt");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "Whiteboard_visibility_idx" ON "Whiteboard" USING btree ("visibility");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "Whiteboard_isBroadcasting_idx" ON "Whiteboard" USING btree ("isBroadcasting");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "Whiteboard_sessionId_visibility_idx" ON "Whiteboard" USING btree ("sessionId","visibility");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "Whiteboard_sessionId_ownerType_idx" ON "Whiteboard" USING btree ("sessionId","ownerType");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "Whiteboard_sessionId_ownerId_idx" ON "Whiteboard" USING btree ("sessionId","ownerId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "WhiteboardPage_whiteboardId_idx" ON "WhiteboardPage" USING btree ("whiteboardId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "WhiteboardPage_order_idx" ON "WhiteboardPage" USING btree ("order");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "WhiteboardPage_whiteboardId_order_key" ON "WhiteboardPage" USING btree ("whiteboardId","order");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "WhiteboardSession_whiteboardId_idx" ON "WhiteboardSession" USING btree ("whiteboardId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "WhiteboardSession_roomId_idx" ON "WhiteboardSession" USING btree ("roomId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "WhiteboardSession_tutorId_idx" ON "WhiteboardSession" USING btree ("tutorId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "WhiteboardSession_isActive_idx" ON "WhiteboardSession" USING btree ("isActive");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "WhiteboardSnapshot_whiteboardId_idx" ON "WhiteboardSnapshot" USING btree ("whiteboardId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "WhiteboardSnapshot_createdAt_idx" ON "WhiteboardSnapshot" USING btree ("createdAt");