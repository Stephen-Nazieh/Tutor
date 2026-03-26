CREATE TYPE "public"."PreferenceSlotType" AS ENUM('SELECTED', 'INTERSECTION');--> statement-breakpoint
CREATE TYPE "public"."PreferenceStatus" AS ENUM('PENDING', 'MATCHED', 'REJECTED');--> statement-breakpoint
CREATE TABLE "Mention" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"messageId" text NOT NULL,
	"mentionerId" text NOT NULL,
	"mentioneeId" text NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "StudentAgentSignal" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"studentId" text NOT NULL,
	"source" text NOT NULL,
	"type" text NOT NULL,
	"content" text NOT NULL,
	"context" jsonb,
	"expiresAt" timestamp with time zone,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "StudentCoursePreference" (
	"id" text PRIMARY KEY NOT NULL,
	"studentId" text NOT NULL,
	"tutorId" text NOT NULL,
	"curriculumId" text NOT NULL,
	"sessionDensity" integer DEFAULT 1 NOT NULL,
	"status" "PreferenceStatus" DEFAULT 'PENDING' NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "StudentCoursePreferenceSlot" (
	"id" text PRIMARY KEY NOT NULL,
	"preferenceId" text NOT NULL,
	"dayOfWeek" text NOT NULL,
	"startTime" text NOT NULL,
	"endTime" text NOT NULL,
	"slotType" "PreferenceSlotType" NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "StudentLearningState" (
	"studentId" text PRIMARY KEY NOT NULL,
	"state" jsonb NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "StudentMemoryProfile" (
	"studentId" text PRIMARY KEY NOT NULL,
	"profile" jsonb NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "TaskDeployment" (
	"id" text PRIMARY KEY NOT NULL,
	"taskId" text NOT NULL,
	"tutorId" text NOT NULL,
	"sessionId" text NOT NULL,
	"studentIds" jsonb NOT NULL,
	"deployedAt" timestamp with time zone DEFAULT now() NOT NULL,
	"status" text DEFAULT 'active' NOT NULL,
	"closedAt" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "TaskPoll" (
	"id" text PRIMARY KEY NOT NULL,
	"taskId" text NOT NULL,
	"tutorId" text NOT NULL,
	"sessionId" text NOT NULL,
	"question" text NOT NULL,
	"options" jsonb NOT NULL,
	"responses" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"isActive" boolean DEFAULT true NOT NULL,
	"sentAt" timestamp with time zone DEFAULT now() NOT NULL,
	"closedAt" timestamp with time zone,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "TaskQuestion" (
	"id" text PRIMARY KEY NOT NULL,
	"taskId" text NOT NULL,
	"tutorId" text NOT NULL,
	"sessionId" text NOT NULL,
	"question" text NOT NULL,
	"answers" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"sentAt" timestamp with time zone DEFAULT now() NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "TutorFollow" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"followerId" text NOT NULL,
	"tutorId" text NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "Curriculum" ALTER COLUMN "difficulty" SET DEFAULT 'intermediate';--> statement-breakpoint
ALTER TABLE "Curriculum" ALTER COLUMN "estimatedHours" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "Curriculum" ALTER COLUMN "isPublished" SET DEFAULT false;--> statement-breakpoint
ALTER TABLE "Curriculum" ALTER COLUMN "isLiveOnline" SET DEFAULT false;--> statement-breakpoint
ALTER TABLE "Curriculum" ADD COLUMN "isFree" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "CurriculumEnrollment" ADD COLUMN "startDate" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "User" ADD COLUMN "handle" text;--> statement-breakpoint
CREATE INDEX "Mention_messageId_idx" ON "Mention" USING btree ("messageId");--> statement-breakpoint
CREATE INDEX "Mention_mentionerId_idx" ON "Mention" USING btree ("mentionerId");--> statement-breakpoint
CREATE INDEX "Mention_mentioneeId_idx" ON "Mention" USING btree ("mentioneeId");--> statement-breakpoint
CREATE INDEX "StudentAgentSignal_studentId_idx" ON "StudentAgentSignal" USING btree ("studentId");--> statement-breakpoint
CREATE INDEX "StudentAgentSignal_createdAt_idx" ON "StudentAgentSignal" USING btree ("createdAt");--> statement-breakpoint
CREATE INDEX "StudentCoursePreference_studentId_idx" ON "StudentCoursePreference" USING btree ("studentId");--> statement-breakpoint
CREATE INDEX "StudentCoursePreference_tutorId_idx" ON "StudentCoursePreference" USING btree ("tutorId");--> statement-breakpoint
CREATE INDEX "StudentCoursePreference_curriculumId_idx" ON "StudentCoursePreference" USING btree ("curriculumId");--> statement-breakpoint
CREATE UNIQUE INDEX "StudentCoursePreference_studentId_curriculumId_key" ON "StudentCoursePreference" USING btree ("studentId","curriculumId");--> statement-breakpoint
CREATE INDEX "StudentCoursePreference_status_idx" ON "StudentCoursePreference" USING btree ("status");--> statement-breakpoint
CREATE INDEX "StudentCoursePreferenceSlot_preferenceId_idx" ON "StudentCoursePreferenceSlot" USING btree ("preferenceId");--> statement-breakpoint
CREATE INDEX "StudentCoursePreferenceSlot_slotType_idx" ON "StudentCoursePreferenceSlot" USING btree ("slotType");--> statement-breakpoint
CREATE UNIQUE INDEX "StudentCoursePreferenceSlot_unique_key" ON "StudentCoursePreferenceSlot" USING btree ("preferenceId","dayOfWeek","startTime","endTime","slotType");--> statement-breakpoint
CREATE INDEX "StudentLearningState_studentId_idx" ON "StudentLearningState" USING btree ("studentId");--> statement-breakpoint
CREATE INDEX "StudentMemoryProfile_studentId_idx" ON "StudentMemoryProfile" USING btree ("studentId");--> statement-breakpoint
CREATE INDEX "TaskDeployment_taskId_idx" ON "TaskDeployment" USING btree ("taskId");--> statement-breakpoint
CREATE INDEX "TaskDeployment_sessionId_idx" ON "TaskDeployment" USING btree ("sessionId");--> statement-breakpoint
CREATE INDEX "TaskDeployment_tutorId_idx" ON "TaskDeployment" USING btree ("tutorId");--> statement-breakpoint
CREATE INDEX "TaskDeployment_status_idx" ON "TaskDeployment" USING btree ("status");--> statement-breakpoint
CREATE INDEX "TaskPoll_taskId_idx" ON "TaskPoll" USING btree ("taskId");--> statement-breakpoint
CREATE INDEX "TaskPoll_sessionId_idx" ON "TaskPoll" USING btree ("sessionId");--> statement-breakpoint
CREATE INDEX "TaskPoll_tutorId_idx" ON "TaskPoll" USING btree ("tutorId");--> statement-breakpoint
CREATE INDEX "TaskPoll_isActive_idx" ON "TaskPoll" USING btree ("isActive");--> statement-breakpoint
CREATE INDEX "TaskQuestion_taskId_idx" ON "TaskQuestion" USING btree ("taskId");--> statement-breakpoint
CREATE INDEX "TaskQuestion_sessionId_idx" ON "TaskQuestion" USING btree ("sessionId");--> statement-breakpoint
CREATE INDEX "TaskQuestion_tutorId_idx" ON "TaskQuestion" USING btree ("tutorId");--> statement-breakpoint
CREATE INDEX "TutorFollow_followerId_idx" ON "TutorFollow" USING btree ("followerId");--> statement-breakpoint
CREATE INDEX "TutorFollow_tutorId_idx" ON "TutorFollow" USING btree ("tutorId");--> statement-breakpoint
CREATE UNIQUE INDEX "TutorFollow_follower_tutor_key" ON "TutorFollow" USING btree ("followerId","tutorId");--> statement-breakpoint
CREATE INDEX "User_handle_idx" ON "User" USING btree ("handle");