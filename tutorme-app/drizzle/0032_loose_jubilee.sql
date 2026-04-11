CREATE TYPE "public"."BookingRequestStatus" AS ENUM('PENDING', 'ACCEPTED', 'REJECTED', 'EXPIRED', 'PAID', 'CANCELLED');--> statement-breakpoint
CREATE TABLE "Course" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"categories" text[],
	"isPublished" boolean DEFAULT false NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL,
	"creatorId" text,
	"isLiveOnline" boolean DEFAULT false NOT NULL,
	"languageOfInstruction" text,
	"price" double precision,
	"currency" text,
	"isFree" boolean DEFAULT false NOT NULL,
	"schedule" jsonb
);
--> statement-breakpoint
CREATE TABLE "CourseCatalog" (
	"id" text PRIMARY KEY NOT NULL,
	"category" text NOT NULL,
	"name" text NOT NULL,
	"code" text,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "CourseEnrollment" (
	"id" text PRIMARY KEY NOT NULL,
	"studentId" text NOT NULL,
	"courseId" text NOT NULL,
	"enrolledAt" timestamp with time zone DEFAULT now() NOT NULL,
	"startDate" timestamp with time zone,
	"completedAt" timestamp with time zone,
	"lastActivity" timestamp with time zone DEFAULT now() NOT NULL,
	"lessonsCompleted" integer DEFAULT 0 NOT NULL,
	"enrollmentSource" text
);
--> statement-breakpoint
CREATE TABLE "CourseLesson" (
	"id" text PRIMARY KEY NOT NULL,
	"courseId" text NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"duration" integer DEFAULT 60 NOT NULL,
	"order" integer NOT NULL,
	"builderData" jsonb DEFAULT '{}'::jsonb,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "CourseLessonProgress" (
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
CREATE TABLE "CourseProgress" (
	"id" text PRIMARY KEY NOT NULL,
	"studentId" text NOT NULL,
	"courseId" text NOT NULL,
	"lessonsCompleted" integer DEFAULT 0 NOT NULL,
	"totalLessons" integer DEFAULT 0 NOT NULL,
	"currentLessonId" text,
	"averageScore" double precision,
	"isCompleted" boolean DEFAULT false NOT NULL,
	"startedAt" timestamp with time zone DEFAULT now() NOT NULL,
	"completedAt" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "CourseShare" (
	"id" text PRIMARY KEY NOT NULL,
	"courseId" text NOT NULL,
	"sharedByTutorId" text NOT NULL,
	"recipientId" text NOT NULL,
	"message" text NOT NULL,
	"isPublic" boolean NOT NULL,
	"sharedAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "OneOnOneBookingRequest" (
	"id" text PRIMARY KEY NOT NULL,
	"tutorId" text NOT NULL,
	"studentId" text NOT NULL,
	"requestedDate" timestamp with time zone NOT NULL,
	"startTime" text NOT NULL,
	"endTime" text NOT NULL,
	"timezone" text NOT NULL,
	"durationMinutes" integer DEFAULT 60 NOT NULL,
	"costPerSession" double precision NOT NULL,
	"status" "BookingRequestStatus" DEFAULT 'PENDING' NOT NULL,
	"tutorResponseAt" timestamp with time zone,
	"tutorNotes" text,
	"paymentDueAt" timestamp with time zone,
	"paidAt" timestamp with time zone,
	"calendarEventId" text,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "BuilderTaskDmi" (
	"id" text PRIMARY KEY NOT NULL,
	"taskId" text NOT NULL,
	"type" text DEFAULT 'assessment' NOT NULL,
	"items" jsonb NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "BuilderTaskDmiVersion" (
	"id" text PRIMARY KEY NOT NULL,
	"taskId" text NOT NULL,
	"type" text DEFAULT 'assessment' NOT NULL,
	"versionNumber" integer NOT NULL,
	"items" jsonb NOT NULL,
	"createdBy" text NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "Achievement" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "Badge" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "Clinic" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "ClinicBooking" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "CourseBatch" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "Curriculum" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "CurriculumCatalog" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "CurriculumEnrollment" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "CurriculumLesson" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "CurriculumLessonProgress" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "CurriculumModule" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "CurriculumProgress" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "CurriculumShare" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "GeneratedTask" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "LeaderboardEntry" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "MathAIInteraction" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "MathWhiteboardPage" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "MathWhiteboardParticipant" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "MathWhiteboardSession" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "MathWhiteboardSnapshot" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "Mission" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "MissionProgress" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "QuestionBankItem" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "Quiz" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "QuizAssignment" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "QuizAttempt" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "StudyGroup" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "StudyGroupMember" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "UserBadge" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "UserDailyQuest" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "UserGamification" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "Whiteboard" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "WhiteboardPage" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "WhiteboardSession" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "WhiteboardSnapshot" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "Achievement" CASCADE;--> statement-breakpoint
DROP TABLE "Badge" CASCADE;--> statement-breakpoint
DROP TABLE "Clinic" CASCADE;--> statement-breakpoint
DROP TABLE "ClinicBooking" CASCADE;--> statement-breakpoint
DROP TABLE "CourseBatch" CASCADE;--> statement-breakpoint
DROP TABLE "Curriculum" CASCADE;--> statement-breakpoint
DROP TABLE "CurriculumCatalog" CASCADE;--> statement-breakpoint
DROP TABLE "CurriculumEnrollment" CASCADE;--> statement-breakpoint
DROP TABLE "CurriculumLesson" CASCADE;--> statement-breakpoint
DROP TABLE "CurriculumLessonProgress" CASCADE;--> statement-breakpoint
DROP TABLE "CurriculumModule" CASCADE;--> statement-breakpoint
DROP TABLE "CurriculumProgress" CASCADE;--> statement-breakpoint
DROP TABLE "CurriculumShare" CASCADE;--> statement-breakpoint
DROP TABLE "GeneratedTask" CASCADE;--> statement-breakpoint
DROP TABLE "LeaderboardEntry" CASCADE;--> statement-breakpoint
DROP TABLE "MathAIInteraction" CASCADE;--> statement-breakpoint
DROP TABLE "MathWhiteboardPage" CASCADE;--> statement-breakpoint
DROP TABLE "MathWhiteboardParticipant" CASCADE;--> statement-breakpoint
DROP TABLE "MathWhiteboardSession" CASCADE;--> statement-breakpoint
DROP TABLE "MathWhiteboardSnapshot" CASCADE;--> statement-breakpoint
DROP TABLE "Mission" CASCADE;--> statement-breakpoint
DROP TABLE "MissionProgress" CASCADE;--> statement-breakpoint
DROP TABLE "QuestionBankItem" CASCADE;--> statement-breakpoint
DROP TABLE "Quiz" CASCADE;--> statement-breakpoint
DROP TABLE "QuizAssignment" CASCADE;--> statement-breakpoint
DROP TABLE "QuizAttempt" CASCADE;--> statement-breakpoint
DROP TABLE "StudyGroup" CASCADE;--> statement-breakpoint
DROP TABLE "StudyGroupMember" CASCADE;--> statement-breakpoint
DROP TABLE "UserBadge" CASCADE;--> statement-breakpoint
DROP TABLE "UserDailyQuest" CASCADE;--> statement-breakpoint
DROP TABLE "UserGamification" CASCADE;--> statement-breakpoint
DROP TABLE "Whiteboard" CASCADE;--> statement-breakpoint
DROP TABLE "WhiteboardPage" CASCADE;--> statement-breakpoint
DROP TABLE "WhiteboardSession" CASCADE;--> statement-breakpoint
DROP TABLE "WhiteboardSnapshot" CASCADE;--> statement-breakpoint
DROP INDEX "BuilderTask_curriculumId_idx";--> statement-breakpoint
DROP INDEX "BuilderTask_moduleId_idx";--> statement-breakpoint
DROP INDEX "BuilderTask_curriculumId_lessonId_idx";--> statement-breakpoint
DROP INDEX "CalendarEvent_curriculumId_idx";--> statement-breakpoint
DROP INDEX "CalendarEvent_batchId_idx";--> statement-breakpoint
DROP INDEX "LiveSession_curriculumId_idx";--> statement-breakpoint
DROP INDEX "LlmModel_providerId_modelId_key";--> statement-breakpoint
DROP INDEX "StudentPerformance_curriculumId_idx";--> statement-breakpoint
DROP INDEX "StudentPerformance_studentId_curriculumId_key";--> statement-breakpoint
DROP INDEX "StudentLearningState_studentId_idx";--> statement-breakpoint
DROP INDEX "StudentMemoryProfile_studentId_idx";--> statement-breakpoint
ALTER TABLE "Payment" ALTER COLUMN "metadata" SET DEFAULT '{}'::jsonb;--> statement-breakpoint
ALTER TABLE "Profile" ALTER COLUMN "timezone" SET DEFAULT 'UTC';--> statement-breakpoint
ALTER TABLE "Profile" ALTER COLUMN "emailNotifications" SET DEFAULT true;--> statement-breakpoint
ALTER TABLE "Profile" ALTER COLUMN "smsNotifications" SET DEFAULT false;--> statement-breakpoint
ALTER TABLE "Profile" ALTER COLUMN "subjectsOfInterest" SET DEFAULT '{}';--> statement-breakpoint
ALTER TABLE "Profile" ALTER COLUMN "preferredLanguages" SET DEFAULT '{}';--> statement-breakpoint
ALTER TABLE "Profile" ALTER COLUMN "learningGoals" SET DEFAULT '{}';--> statement-breakpoint
ALTER TABLE "Profile" ALTER COLUMN "tosAccepted" SET DEFAULT false;--> statement-breakpoint
ALTER TABLE "Profile" ALTER COLUMN "isOnboarded" SET DEFAULT false;--> statement-breakpoint
ALTER TABLE "Profile" ALTER COLUMN "specialties" SET DEFAULT '{}';--> statement-breakpoint
ALTER TABLE "Profile" ALTER COLUMN "availability" SET DEFAULT '{}'::jsonb;--> statement-breakpoint
ALTER TABLE "Profile" ALTER COLUMN "paidClassesEnabled" SET DEFAULT false;--> statement-breakpoint
ALTER TABLE "TutorApplication" ALTER COLUMN "legalName" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "TutorApplication" ALTER COLUMN "globalExams" SET DEFAULT '[]'::jsonb;--> statement-breakpoint
ALTER TABLE "TutorApplication" ALTER COLUMN "tutoringCountries" SET DEFAULT '{}';--> statement-breakpoint
ALTER TABLE "TutorApplication" ALTER COLUMN "countrySubjectSelections" SET DEFAULT '{}'::jsonb;--> statement-breakpoint
ALTER TABLE "TutorApplication" ALTER COLUMN "categories" SET DEFAULT '{}';--> statement-breakpoint
ALTER TABLE "TutorApplication" ALTER COLUMN "socialLinks" SET DEFAULT '{}'::jsonb;--> statement-breakpoint
ALTER TABLE "BuilderTask" ADD COLUMN "courseId" text NOT NULL;--> statement-breakpoint
ALTER TABLE "CalendarEvent" ADD COLUMN "courseId" text;--> statement-breakpoint
ALTER TABLE "LiveSession" ADD COLUMN "courseId" text;--> statement-breakpoint
ALTER TABLE "LiveSession" ADD COLUMN "category" text NOT NULL;--> statement-breakpoint
ALTER TABLE "LlmModel" ADD COLUMN "modelKey" text NOT NULL;--> statement-breakpoint
ALTER TABLE "Mention" ADD COLUMN "mentionId" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL;--> statement-breakpoint
ALTER TABLE "Profile" ADD COLUMN "oneOnOneEnabled" boolean;--> statement-breakpoint
ALTER TABLE "Profile" ADD COLUMN "nationality" text;--> statement-breakpoint
ALTER TABLE "Profile" ADD COLUMN "countryOfResidence" text;--> statement-breakpoint
ALTER TABLE "Profile" ADD COLUMN "tutorNationalities" text[] DEFAULT '{}' NOT NULL;--> statement-breakpoint
ALTER TABLE "Profile" ADD COLUMN "categoryNationalityCombinations" text[] DEFAULT '{}' NOT NULL;--> statement-breakpoint
ALTER TABLE "ResourceShare" ADD COLUMN "courseId" text;--> statement-breakpoint
ALTER TABLE "SessionEngagementSummary" ADD COLUMN "id" text PRIMARY KEY NOT NULL;--> statement-breakpoint
ALTER TABLE "StudentAgentSignal" ADD COLUMN "signalId" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL;--> statement-breakpoint
ALTER TABLE "StudentLearningState" ADD COLUMN "id" text PRIMARY KEY NOT NULL;--> statement-breakpoint
ALTER TABLE "StudentMemoryProfile" ADD COLUMN "id" text PRIMARY KEY NOT NULL;--> statement-breakpoint
ALTER TABLE "StudentPerformance" ADD COLUMN "courseId" text;--> statement-breakpoint
ALTER TABLE "TutorFollow" ADD COLUMN "followId" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL;--> statement-breakpoint
ALTER TABLE "CourseEnrollment" ADD CONSTRAINT "CourseEnrollment_studentId_User_id_fk" FOREIGN KEY ("studentId") REFERENCES "public"."User"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "CourseEnrollment" ADD CONSTRAINT "CourseEnrollment_courseId_Course_id_fk" FOREIGN KEY ("courseId") REFERENCES "public"."Course"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "CourseLesson" ADD CONSTRAINT "CourseLesson_courseId_Course_id_fk" FOREIGN KEY ("courseId") REFERENCES "public"."Course"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "CourseProgress" ADD CONSTRAINT "CourseProgress_studentId_User_id_fk" FOREIGN KEY ("studentId") REFERENCES "public"."User"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "CourseProgress" ADD CONSTRAINT "CourseProgress_courseId_Course_id_fk" FOREIGN KEY ("courseId") REFERENCES "public"."Course"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "CourseProgress" ADD CONSTRAINT "CourseProgress_currentLessonId_CourseLesson_id_fk" FOREIGN KEY ("currentLessonId") REFERENCES "public"."CourseLesson"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "OneOnOneBookingRequest" ADD CONSTRAINT "OneOnOneBookingRequest_tutorId_User_id_fk" FOREIGN KEY ("tutorId") REFERENCES "public"."User"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "BuilderTaskDmi" ADD CONSTRAINT "BuilderTaskDmi_taskId_BuilderTask_id_fk" FOREIGN KEY ("taskId") REFERENCES "public"."BuilderTask"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "BuilderTaskDmiVersion" ADD CONSTRAINT "BuilderTaskDmiVersion_taskId_BuilderTask_id_fk" FOREIGN KEY ("taskId") REFERENCES "public"."BuilderTask"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "BuilderTaskDmiVersion" ADD CONSTRAINT "BuilderTaskDmiVersion_createdBy_User_id_fk" FOREIGN KEY ("createdBy") REFERENCES "public"."User"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "Course_isPublished_idx" ON "Course" USING btree ("isPublished");--> statement-breakpoint
CREATE INDEX "Course_creatorId_idx" ON "Course" USING btree ("creatorId");--> statement-breakpoint
CREATE INDEX "CourseCatalog_category_idx" ON "CourseCatalog" USING btree ("category");--> statement-breakpoint
CREATE UNIQUE INDEX "CourseCatalog_category_name_key" ON "CourseCatalog" USING btree ("category","name");--> statement-breakpoint
CREATE INDEX "CourseEnrollment_studentId_idx" ON "CourseEnrollment" USING btree ("studentId");--> statement-breakpoint
CREATE UNIQUE INDEX "CourseEnrollment_studentId_courseId_key" ON "CourseEnrollment" USING btree ("studentId","courseId");--> statement-breakpoint
CREATE INDEX "CourseLesson_courseId_idx" ON "CourseLesson" USING btree ("courseId");--> statement-breakpoint
CREATE INDEX "CourseLesson_order_idx" ON "CourseLesson" USING btree ("order");--> statement-breakpoint
CREATE INDEX "CourseLessonProgress_studentId_idx" ON "CourseLessonProgress" USING btree ("studentId");--> statement-breakpoint
CREATE UNIQUE INDEX "CourseLessonProgress_lessonId_studentId_key" ON "CourseLessonProgress" USING btree ("lessonId","studentId");--> statement-breakpoint
CREATE INDEX "CourseProgress_studentId_idx" ON "CourseProgress" USING btree ("studentId");--> statement-breakpoint
CREATE UNIQUE INDEX "CourseProgress_studentId_courseId_key" ON "CourseProgress" USING btree ("studentId","courseId");--> statement-breakpoint
CREATE INDEX "CourseShare_sharedByTutorId_idx" ON "CourseShare" USING btree ("sharedByTutorId");--> statement-breakpoint
CREATE INDEX "CourseShare_recipientId_idx" ON "CourseShare" USING btree ("recipientId");--> statement-breakpoint
CREATE INDEX "CourseShare_courseId_idx" ON "CourseShare" USING btree ("courseId");--> statement-breakpoint
CREATE UNIQUE INDEX "CourseShare_courseId_recipientId_key" ON "CourseShare" USING btree ("courseId","recipientId");--> statement-breakpoint
CREATE INDEX "OneOnOneBookingRequest_tutorId_idx" ON "OneOnOneBookingRequest" USING btree ("tutorId");--> statement-breakpoint
CREATE INDEX "OneOnOneBookingRequest_studentId_idx" ON "OneOnOneBookingRequest" USING btree ("studentId");--> statement-breakpoint
CREATE INDEX "OneOnOneBookingRequest_status_idx" ON "OneOnOneBookingRequest" USING btree ("status");--> statement-breakpoint
CREATE INDEX "OneOnOneBookingRequest_tutorId_studentId_status_idx" ON "OneOnOneBookingRequest" USING btree ("tutorId","studentId","status");--> statement-breakpoint
CREATE INDEX "BuilderTaskDmi_taskId_idx" ON "BuilderTaskDmi" USING btree ("taskId");--> statement-breakpoint
CREATE INDEX "BuilderTaskDmi_taskId_type_idx" ON "BuilderTaskDmi" USING btree ("taskId","type");--> statement-breakpoint
CREATE INDEX "BuilderTaskDmiVersion_taskId_idx" ON "BuilderTaskDmiVersion" USING btree ("taskId");--> statement-breakpoint
CREATE INDEX "BuilderTaskDmiVersion_taskId_version_idx" ON "BuilderTaskDmiVersion" USING btree ("taskId","versionNumber");--> statement-breakpoint
ALTER TABLE "AIAssistantInsight" ADD CONSTRAINT "AIAssistantInsight_sessionId_AIAssistantSession_id_fk" FOREIGN KEY ("sessionId") REFERENCES "public"."AIAssistantSession"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "AIAssistantMessage" ADD CONSTRAINT "AIAssistantMessage_sessionId_AIAssistantSession_id_fk" FOREIGN KEY ("sessionId") REFERENCES "public"."AIAssistantSession"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "AIAssistantSession" ADD CONSTRAINT "AIAssistantSession_tutorId_User_id_fk" FOREIGN KEY ("tutorId") REFERENCES "public"."User"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "AIInteractionSession" ADD CONSTRAINT "AIInteractionSession_studentId_User_id_fk" FOREIGN KEY ("studentId") REFERENCES "public"."User"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "AITutorDailyUsage" ADD CONSTRAINT "AITutorDailyUsage_userId_User_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "AITutorEnrollment" ADD CONSTRAINT "AITutorEnrollment_studentId_User_id_fk" FOREIGN KEY ("studentId") REFERENCES "public"."User"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_User_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "AdminAssignment" ADD CONSTRAINT "AdminAssignment_userId_User_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "AdminAssignment" ADD CONSTRAINT "AdminAssignment_roleId_AdminRole_id_fk" FOREIGN KEY ("roleId") REFERENCES "public"."AdminRole"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "AdminAssignment" ADD CONSTRAINT "AdminAssignment_assignedBy_User_id_fk" FOREIGN KEY ("assignedBy") REFERENCES "public"."User"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ApiKey" ADD CONSTRAINT "ApiKey_createdById_User_id_fk" FOREIGN KEY ("createdById") REFERENCES "public"."User"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Bookmark" ADD CONSTRAINT "Bookmark_contentId_ContentItem_id_fk" FOREIGN KEY ("contentId") REFERENCES "public"."ContentItem"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Bookmark" ADD CONSTRAINT "Bookmark_studentId_User_id_fk" FOREIGN KEY ("studentId") REFERENCES "public"."User"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "BreakoutRoom" ADD CONSTRAINT "BreakoutRoom_sessionId_BreakoutSession_id_fk" FOREIGN KEY ("sessionId") REFERENCES "public"."BreakoutSession"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "BreakoutRoomAssignment" ADD CONSTRAINT "BreakoutRoomAssignment_roomId_BreakoutRoom_id_fk" FOREIGN KEY ("roomId") REFERENCES "public"."BreakoutRoom"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "BreakoutRoomAssignment" ADD CONSTRAINT "BreakoutRoomAssignment_studentId_User_id_fk" FOREIGN KEY ("studentId") REFERENCES "public"."User"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "BreakoutSession" ADD CONSTRAINT "BreakoutSession_mainRoomId_LiveSession_id_fk" FOREIGN KEY ("mainRoomId") REFERENCES "public"."LiveSession"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "BreakoutSession" ADD CONSTRAINT "BreakoutSession_tutorId_User_id_fk" FOREIGN KEY ("tutorId") REFERENCES "public"."User"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "BudgetAlert" ADD CONSTRAINT "BudgetAlert_parentId_User_id_fk" FOREIGN KEY ("parentId") REFERENCES "public"."User"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "BuilderTask" ADD CONSTRAINT "BuilderTask_courseId_Course_id_fk" FOREIGN KEY ("courseId") REFERENCES "public"."Course"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "BuilderTask" ADD CONSTRAINT "BuilderTask_lessonId_CourseLesson_id_fk" FOREIGN KEY ("lessonId") REFERENCES "public"."CourseLesson"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "BuilderTask" ADD CONSTRAINT "BuilderTask_tutorId_User_id_fk" FOREIGN KEY ("tutorId") REFERENCES "public"."User"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "BuilderTaskExtension" ADD CONSTRAINT "BuilderTaskExtension_taskId_BuilderTask_id_fk" FOREIGN KEY ("taskId") REFERENCES "public"."BuilderTask"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "BuilderTaskFile" ADD CONSTRAINT "BuilderTaskFile_taskId_BuilderTask_id_fk" FOREIGN KEY ("taskId") REFERENCES "public"."BuilderTask"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "BuilderTaskVersion" ADD CONSTRAINT "BuilderTaskVersion_taskId_BuilderTask_id_fk" FOREIGN KEY ("taskId") REFERENCES "public"."BuilderTask"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "BuilderTaskVersion" ADD CONSTRAINT "BuilderTaskVersion_createdBy_User_id_fk" FOREIGN KEY ("createdBy") REFERENCES "public"."User"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "CalendarAvailability" ADD CONSTRAINT "CalendarAvailability_tutorId_User_id_fk" FOREIGN KEY ("tutorId") REFERENCES "public"."User"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "CalendarConnection" ADD CONSTRAINT "CalendarConnection_userId_User_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "CalendarEvent" ADD CONSTRAINT "CalendarEvent_tutorId_User_id_fk" FOREIGN KEY ("tutorId") REFERENCES "public"."User"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "CalendarEvent" ADD CONSTRAINT "CalendarEvent_courseId_Course_id_fk" FOREIGN KEY ("courseId") REFERENCES "public"."Course"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "CalendarEvent" ADD CONSTRAINT "CalendarEvent_studentId_User_id_fk" FOREIGN KEY ("studentId") REFERENCES "public"."User"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "CalendarEvent" ADD CONSTRAINT "CalendarEvent_createdBy_User_id_fk" FOREIGN KEY ("createdBy") REFERENCES "public"."User"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "CalendarException" ADD CONSTRAINT "CalendarException_tutorId_User_id_fk" FOREIGN KEY ("tutorId") REFERENCES "public"."User"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ContentProgress" ADD CONSTRAINT "ContentProgress_contentId_ContentItem_id_fk" FOREIGN KEY ("contentId") REFERENCES "public"."ContentItem"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ContentProgress" ADD CONSTRAINT "ContentProgress_studentId_User_id_fk" FOREIGN KEY ("studentId") REFERENCES "public"."User"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ContentQuizCheckpoint" ADD CONSTRAINT "ContentQuizCheckpoint_contentId_ContentItem_id_fk" FOREIGN KEY ("contentId") REFERENCES "public"."ContentItem"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Conversation" ADD CONSTRAINT "Conversation_participant1Id_User_id_fk" FOREIGN KEY ("participant1Id") REFERENCES "public"."User"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Conversation" ADD CONSTRAINT "Conversation_participant2Id_User_id_fk" FOREIGN KEY ("participant2Id") REFERENCES "public"."User"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "DirectMessage" ADD CONSTRAINT "DirectMessage_conversationId_Conversation_id_fk" FOREIGN KEY ("conversationId") REFERENCES "public"."Conversation"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "DirectMessage" ADD CONSTRAINT "DirectMessage_senderId_User_id_fk" FOREIGN KEY ("senderId") REFERENCES "public"."User"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "EmergencyContact" ADD CONSTRAINT "EmergencyContact_parentId_User_id_fk" FOREIGN KEY ("parentId") REFERENCES "public"."User"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "EngagementSnapshot" ADD CONSTRAINT "EngagementSnapshot_sessionId_LiveSession_id_fk" FOREIGN KEY ("sessionId") REFERENCES "public"."LiveSession"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "EngagementSnapshot" ADD CONSTRAINT "EngagementSnapshot_studentId_User_id_fk" FOREIGN KEY ("studentId") REFERENCES "public"."User"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "FamilyBudget" ADD CONSTRAINT "FamilyBudget_parentId_User_id_fk" FOREIGN KEY ("parentId") REFERENCES "public"."User"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "FamilyMember" ADD CONSTRAINT "FamilyMember_familyAccountId_FamilyAccount_id_fk" FOREIGN KEY ("familyAccountId") REFERENCES "public"."FamilyAccount"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "FamilyMember" ADD CONSTRAINT "FamilyMember_userId_User_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "FamilyNotification" ADD CONSTRAINT "FamilyNotification_parentId_User_id_fk" FOREIGN KEY ("parentId") REFERENCES "public"."User"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "FamilyPayment" ADD CONSTRAINT "FamilyPayment_parentId_User_id_fk" FOREIGN KEY ("parentId") REFERENCES "public"."User"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "FeatureFlag" ADD CONSTRAINT "FeatureFlag_createdBy_User_id_fk" FOREIGN KEY ("createdBy") REFERENCES "public"."User"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "FeatureFlag" ADD CONSTRAINT "FeatureFlag_updatedBy_User_id_fk" FOREIGN KEY ("updatedBy") REFERENCES "public"."User"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "FeatureFlagChange" ADD CONSTRAINT "FeatureFlagChange_flagId_FeatureFlag_id_fk" FOREIGN KEY ("flagId") REFERENCES "public"."FeatureFlag"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "FeatureFlagChange" ADD CONSTRAINT "FeatureFlagChange_changedBy_User_id_fk" FOREIGN KEY ("changedBy") REFERENCES "public"."User"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "LiveSession" ADD CONSTRAINT "LiveSession_tutorId_User_id_fk" FOREIGN KEY ("tutorId") REFERENCES "public"."User"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "LiveSession" ADD CONSTRAINT "LiveSession_courseId_Course_id_fk" FOREIGN KEY ("courseId") REFERENCES "public"."Course"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "LlmModel" ADD CONSTRAINT "LlmModel_providerId_LlmProvider_id_fk" FOREIGN KEY ("providerId") REFERENCES "public"."LlmProvider"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "LlmRoutingRule" ADD CONSTRAINT "LlmRoutingRule_targetModelId_LlmModel_id_fk" FOREIGN KEY ("targetModelId") REFERENCES "public"."LlmModel"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "LlmRoutingRule" ADD CONSTRAINT "LlmRoutingRule_fallbackModelId_LlmModel_id_fk" FOREIGN KEY ("fallbackModelId") REFERENCES "public"."LlmModel"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "LlmRoutingRule" ADD CONSTRAINT "LlmRoutingRule_providerId_LlmProvider_id_fk" FOREIGN KEY ("providerId") REFERENCES "public"."LlmProvider"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Mention" ADD CONSTRAINT "Mention_messageId_Message_id_fk" FOREIGN KEY ("messageId") REFERENCES "public"."Message"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Mention" ADD CONSTRAINT "Mention_mentionerId_User_id_fk" FOREIGN KEY ("mentionerId") REFERENCES "public"."User"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Mention" ADD CONSTRAINT "Mention_mentioneeId_User_id_fk" FOREIGN KEY ("mentioneeId") REFERENCES "public"."User"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Message" ADD CONSTRAINT "Message_sessionId_LiveSession_id_fk" FOREIGN KEY ("sessionId") REFERENCES "public"."LiveSession"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Message" ADD CONSTRAINT "Message_userId_User_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Note" ADD CONSTRAINT "Note_contentId_ContentItem_id_fk" FOREIGN KEY ("contentId") REFERENCES "public"."ContentItem"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Note" ADD CONSTRAINT "Note_studentId_User_id_fk" FOREIGN KEY ("studentId") REFERENCES "public"."User"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_User_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ParentActivityLog" ADD CONSTRAINT "ParentActivityLog_parentId_User_id_fk" FOREIGN KEY ("parentId") REFERENCES "public"."User"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ParentPaymentAuthorization" ADD CONSTRAINT "ParentPaymentAuthorization_parentId_User_id_fk" FOREIGN KEY ("parentId") REFERENCES "public"."User"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ParentSpendingLimit" ADD CONSTRAINT "ParentSpendingLimit_parentId_User_id_fk" FOREIGN KEY ("parentId") REFERENCES "public"."User"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_enrollmentId_CourseEnrollment_id_fk" FOREIGN KEY ("enrollmentId") REFERENCES "public"."CourseEnrollment"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_tutorId_User_id_fk" FOREIGN KEY ("tutorId") REFERENCES "public"."User"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "PaymentOnPayout" ADD CONSTRAINT "PaymentOnPayout_paymentId_Payment_id_fk" FOREIGN KEY ("paymentId") REFERENCES "public"."Payment"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "PaymentOnPayout" ADD CONSTRAINT "PaymentOnPayout_payoutId_Payout_id_fk" FOREIGN KEY ("payoutId") REFERENCES "public"."Payout"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Payout" ADD CONSTRAINT "Payout_tutorId_User_id_fk" FOREIGN KEY ("tutorId") REFERENCES "public"."User"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "PerformanceMetric" ADD CONSTRAINT "PerformanceMetric_userId_User_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "PlatformRevenue" ADD CONSTRAINT "PlatformRevenue_paymentId_Payment_id_fk" FOREIGN KEY ("paymentId") REFERENCES "public"."Payment"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Poll" ADD CONSTRAINT "Poll_sessionId_LiveSession_id_fk" FOREIGN KEY ("sessionId") REFERENCES "public"."LiveSession"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Poll" ADD CONSTRAINT "Poll_tutorId_User_id_fk" FOREIGN KEY ("tutorId") REFERENCES "public"."User"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "PollOption" ADD CONSTRAINT "PollOption_pollId_Poll_id_fk" FOREIGN KEY ("pollId") REFERENCES "public"."Poll"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "PollResponse" ADD CONSTRAINT "PollResponse_pollId_Poll_id_fk" FOREIGN KEY ("pollId") REFERENCES "public"."Poll"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "PostSessionReport" ADD CONSTRAINT "PostSessionReport_sessionId_LiveSession_id_fk" FOREIGN KEY ("sessionId") REFERENCES "public"."LiveSession"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "PostSessionReport" ADD CONSTRAINT "PostSessionReport_tutorId_User_id_fk" FOREIGN KEY ("tutorId") REFERENCES "public"."User"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_User_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Refund" ADD CONSTRAINT "Refund_paymentId_Payment_id_fk" FOREIGN KEY ("paymentId") REFERENCES "public"."Payment"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ReviewSchedule" ADD CONSTRAINT "ReviewSchedule_studentId_User_id_fk" FOREIGN KEY ("studentId") REFERENCES "public"."User"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ReviewSchedule" ADD CONSTRAINT "ReviewSchedule_contentId_ContentItem_id_fk" FOREIGN KEY ("contentId") REFERENCES "public"."ContentItem"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "SecurityEvent" ADD CONSTRAINT "SecurityEvent_userId_User_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "SecurityEvent" ADD CONSTRAINT "SecurityEvent_actorId_User_id_fk" FOREIGN KEY ("actorId") REFERENCES "public"."User"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "SessionParticipant" ADD CONSTRAINT "SessionParticipant_sessionId_LiveSession_id_fk" FOREIGN KEY ("sessionId") REFERENCES "public"."LiveSession"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "SessionParticipant" ADD CONSTRAINT "SessionParticipant_studentId_User_id_fk" FOREIGN KEY ("studentId") REFERENCES "public"."User"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "SessionReplayArtifact" ADD CONSTRAINT "SessionReplayArtifact_sessionId_LiveSession_id_fk" FOREIGN KEY ("sessionId") REFERENCES "public"."LiveSession"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "SessionReplayArtifact" ADD CONSTRAINT "SessionReplayArtifact_tutorId_User_id_fk" FOREIGN KEY ("tutorId") REFERENCES "public"."User"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "StudentAgentSignal" ADD CONSTRAINT "StudentAgentSignal_studentId_User_id_fk" FOREIGN KEY ("studentId") REFERENCES "public"."User"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "StudentLearningState" ADD CONSTRAINT "StudentLearningState_id_User_id_fk" FOREIGN KEY ("id") REFERENCES "public"."User"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "StudentMemoryProfile" ADD CONSTRAINT "StudentMemoryProfile_id_User_id_fk" FOREIGN KEY ("id") REFERENCES "public"."User"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "StudentProgressSnapshot" ADD CONSTRAINT "StudentProgressSnapshot_parentId_User_id_fk" FOREIGN KEY ("parentId") REFERENCES "public"."User"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "StudentSessionInsight" ADD CONSTRAINT "StudentSessionInsight_sessionId_LiveSession_id_fk" FOREIGN KEY ("sessionId") REFERENCES "public"."LiveSession"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "StudentSessionInsight" ADD CONSTRAINT "StudentSessionInsight_studentId_User_id_fk" FOREIGN KEY ("studentId") REFERENCES "public"."User"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "TaskDeployment" ADD CONSTRAINT "TaskDeployment_taskId_BuilderTask_id_fk" FOREIGN KEY ("taskId") REFERENCES "public"."BuilderTask"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "TaskDeployment" ADD CONSTRAINT "TaskDeployment_tutorId_User_id_fk" FOREIGN KEY ("tutorId") REFERENCES "public"."User"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "TaskDeployment" ADD CONSTRAINT "TaskDeployment_sessionId_LiveSession_id_fk" FOREIGN KEY ("sessionId") REFERENCES "public"."LiveSession"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "TaskPoll" ADD CONSTRAINT "TaskPoll_taskId_BuilderTask_id_fk" FOREIGN KEY ("taskId") REFERENCES "public"."BuilderTask"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "TaskPoll" ADD CONSTRAINT "TaskPoll_tutorId_User_id_fk" FOREIGN KEY ("tutorId") REFERENCES "public"."User"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "TaskPoll" ADD CONSTRAINT "TaskPoll_sessionId_LiveSession_id_fk" FOREIGN KEY ("sessionId") REFERENCES "public"."LiveSession"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "TutorApplication" ADD CONSTRAINT "TutorApplication_userId_User_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "TutorFollow" ADD CONSTRAINT "TutorFollow_followerId_User_id_fk" FOREIGN KEY ("followerId") REFERENCES "public"."User"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "TutorFollow" ADD CONSTRAINT "TutorFollow_tutorId_User_id_fk" FOREIGN KEY ("tutorId") REFERENCES "public"."User"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "UserActivityLog" ADD CONSTRAINT "UserActivityLog_userId_User_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "VideoWatchEvent" ADD CONSTRAINT "VideoWatchEvent_contentId_ContentItem_id_fk" FOREIGN KEY ("contentId") REFERENCES "public"."ContentItem"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "VideoWatchEvent" ADD CONSTRAINT "VideoWatchEvent_studentId_User_id_fk" FOREIGN KEY ("studentId") REFERENCES "public"."User"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "WebhookEvent" ADD CONSTRAINT "WebhookEvent_paymentId_Payment_id_fk" FOREIGN KEY ("paymentId") REFERENCES "public"."Payment"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "BuilderTask_courseId_idx" ON "BuilderTask" USING btree ("courseId");--> statement-breakpoint
CREATE INDEX "BuilderTask_courseId_lessonId_idx" ON "BuilderTask" USING btree ("courseId","lessonId");--> statement-breakpoint
CREATE INDEX "CalendarEvent_courseId_idx" ON "CalendarEvent" USING btree ("courseId");--> statement-breakpoint
CREATE INDEX "LiveSession_courseId_idx" ON "LiveSession" USING btree ("courseId");--> statement-breakpoint
CREATE UNIQUE INDEX "LlmModel_providerId_modelKey_key" ON "LlmModel" USING btree ("providerId","modelKey");--> statement-breakpoint
CREATE INDEX "StudentPerformance_courseId_idx" ON "StudentPerformance" USING btree ("courseId");--> statement-breakpoint
CREATE UNIQUE INDEX "StudentPerformance_studentId_courseId_key" ON "StudentPerformance" USING btree ("studentId","courseId");--> statement-breakpoint
CREATE INDEX "StudentLearningState_studentId_idx" ON "StudentLearningState" USING btree ("id");--> statement-breakpoint
CREATE INDEX "StudentMemoryProfile_studentId_idx" ON "StudentMemoryProfile" USING btree ("id");--> statement-breakpoint
ALTER TABLE "BuilderTask" DROP COLUMN "curriculumId";--> statement-breakpoint
ALTER TABLE "BuilderTask" DROP COLUMN "moduleId";--> statement-breakpoint
ALTER TABLE "CalendarEvent" DROP COLUMN "curriculumId";--> statement-breakpoint
ALTER TABLE "CalendarEvent" DROP COLUMN "batchId";--> statement-breakpoint
ALTER TABLE "LiveSession" DROP COLUMN "curriculumId";--> statement-breakpoint
ALTER TABLE "LiveSession" DROP COLUMN "subject";--> statement-breakpoint
ALTER TABLE "LiveSession" DROP COLUMN "type";--> statement-breakpoint
ALTER TABLE "LlmModel" DROP COLUMN "modelId";--> statement-breakpoint
ALTER TABLE "Mention" DROP COLUMN "id";--> statement-breakpoint
ALTER TABLE "ResourceShare" DROP COLUMN "curriculumId";--> statement-breakpoint
ALTER TABLE "SessionEngagementSummary" DROP COLUMN "sessionId";--> statement-breakpoint
ALTER TABLE "StudentAgentSignal" DROP COLUMN "id";--> statement-breakpoint
ALTER TABLE "StudentLearningState" DROP COLUMN "studentId";--> statement-breakpoint
ALTER TABLE "StudentMemoryProfile" DROP COLUMN "studentId";--> statement-breakpoint
ALTER TABLE "StudentPerformance" DROP COLUMN "curriculumId";--> statement-breakpoint
ALTER TABLE "TutorApplication" DROP COLUMN "serviceDescription";--> statement-breakpoint
ALTER TABLE "TutorFollow" DROP COLUMN "id";