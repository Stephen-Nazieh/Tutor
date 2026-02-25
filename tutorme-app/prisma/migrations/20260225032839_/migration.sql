/*
  Warnings:

  - A unique constraint covering the columns `[studentUniqueId]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "PollType" AS ENUM ('MULTIPLE_CHOICE', 'TRUE_FALSE', 'RATING', 'SHORT_ANSWER', 'WORD_CLOUD');

-- CreateEnum
CREATE TYPE "PollStatus" AS ENUM ('DRAFT', 'ACTIVE', 'CLOSED');

-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('LESSON', 'CLINIC', 'CONSULTATION', 'BREAK', 'PERSONAL', 'OTHER');

-- CreateEnum
CREATE TYPE "EventStatus" AS ENUM ('CONFIRMED', 'TENTATIVE', 'CANCELLED');

-- CreateEnum
CREATE TYPE "MathSessionStatus" AS ENUM ('ACTIVE', 'PAUSED', 'ENDED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "MathAIInteractionType" AS ENUM ('SOLVE', 'HINT', 'CHECK', 'EXPLAIN', 'RECOGNIZE');

-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'PARENT';

-- AlterTable
ALTER TABLE "Curriculum" ADD COLUMN     "coursePitch" TEXT;

-- AlterTable
ALTER TABLE "CurriculumLesson" ADD COLUMN     "builderData" JSONB;

-- AlterTable
ALTER TABLE "CurriculumModule" ADD COLUMN     "builderData" JSONB;

-- AlterTable
ALTER TABLE "GeneratedTask" ADD COLUMN     "enforceDueDate" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "enforceTimeLimit" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "maxAttempts" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "timeLimitMinutes" INTEGER;

-- AlterTable
ALTER TABLE "LiveSession" ADD COLUMN     "curriculumId" TEXT,
ADD COLUMN     "recordingAvailableAt" TIMESTAMP(3),
ADD COLUMN     "recordingUrl" TEXT;

-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "tutorId" TEXT;

-- AlterTable
ALTER TABLE "Payout" ADD COLUMN     "completedAt" TIMESTAMP(3),
ADD COLUMN     "notes" TEXT;

-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "organizationName" TEXT,
ADD COLUMN     "studentUniqueId" TEXT;

-- AlterTable
ALTER TABLE "QuizAttempt" ADD COLUMN     "assignmentId" TEXT,
ADD COLUMN     "attemptNumber" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'submitted';

-- CreateTable
CREATE TABLE "CurriculumShare" (
    "id" TEXT NOT NULL,
    "curriculumId" TEXT NOT NULL,
    "sharedByTutorId" TEXT NOT NULL,
    "recipientId" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "isPublic" BOOLEAN NOT NULL DEFAULT false,
    "sharedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CurriculumShare_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestionBankItem" (
    "id" TEXT NOT NULL,
    "tutorId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "options" JSONB,
    "correctAnswer" JSONB,
    "explanation" TEXT,
    "hint" TEXT,
    "points" INTEGER NOT NULL DEFAULT 1,
    "difficulty" TEXT NOT NULL DEFAULT 'medium',
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "subject" TEXT,
    "curriculumId" TEXT,
    "lessonId" TEXT,
    "isPublic" BOOLEAN NOT NULL DEFAULT false,
    "usageCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "QuestionBankItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Quiz" (
    "id" TEXT NOT NULL,
    "tutorId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "type" TEXT NOT NULL DEFAULT 'graded',
    "status" TEXT NOT NULL DEFAULT 'draft',
    "timeLimit" INTEGER,
    "allowedAttempts" INTEGER NOT NULL DEFAULT 1,
    "shuffleQuestions" BOOLEAN NOT NULL DEFAULT false,
    "shuffleOptions" BOOLEAN NOT NULL DEFAULT false,
    "showCorrectAnswers" TEXT NOT NULL DEFAULT 'after_attempt',
    "passingScore" INTEGER,
    "questions" JSONB NOT NULL,
    "totalPoints" INTEGER NOT NULL DEFAULT 0,
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "startDate" TIMESTAMP(3),
    "dueDate" TIMESTAMP(3),
    "curriculumId" TEXT,
    "lessonId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Quiz_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuizAssignment" (
    "id" TEXT NOT NULL,
    "quizId" TEXT NOT NULL,
    "assignedByTutorId" TEXT NOT NULL,
    "assignedToType" TEXT NOT NULL,
    "assignedToId" TEXT,
    "assignedToAll" BOOLEAN NOT NULL DEFAULT false,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dueDate" TIMESTAMP(3),
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "QuizAssignment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Badge" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "icon" TEXT NOT NULL DEFAULT 'trophy',
    "color" TEXT NOT NULL DEFAULT '#f59e0b',
    "category" TEXT NOT NULL DEFAULT 'general',
    "rarity" TEXT NOT NULL DEFAULT 'common',
    "xpBonus" INTEGER NOT NULL DEFAULT 0,
    "requirement" JSONB NOT NULL,
    "isSecret" BOOLEAN NOT NULL DEFAULT false,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Badge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserBadge" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "badgeId" TEXT NOT NULL,
    "earnedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "progress" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "UserBadge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LeaderboardEntry" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'global',
    "periodStart" TIMESTAMP(3),
    "periodEnd" TIMESTAMP(3),
    "score" INTEGER NOT NULL DEFAULT 0,
    "rank" INTEGER,

    CONSTRAINT "LeaderboardEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Poll" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "tutorId" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "type" "PollType" NOT NULL DEFAULT 'MULTIPLE_CHOICE',
    "isAnonymous" BOOLEAN NOT NULL DEFAULT false,
    "allowMultiple" BOOLEAN NOT NULL DEFAULT false,
    "timeLimit" INTEGER,
    "showResults" BOOLEAN NOT NULL DEFAULT true,
    "correctOptionId" TEXT,
    "status" "PollStatus" NOT NULL DEFAULT 'DRAFT',
    "startedAt" TIMESTAMP(3),
    "endedAt" TIMESTAMP(3),
    "totalResponses" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Poll_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PollOption" (
    "id" TEXT NOT NULL,
    "pollId" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "color" TEXT,
    "responseCount" INTEGER NOT NULL DEFAULT 0,
    "percentage" DOUBLE PRECISION NOT NULL DEFAULT 0,

    CONSTRAINT "PollOption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PollResponse" (
    "id" TEXT NOT NULL,
    "pollId" TEXT NOT NULL,
    "respondentHash" TEXT,
    "optionIds" TEXT[],
    "rating" INTEGER,
    "textAnswer" TEXT,
    "studentId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PollResponse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NotificationPreference" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "emailEnabled" BOOLEAN NOT NULL DEFAULT true,
    "pushEnabled" BOOLEAN NOT NULL DEFAULT true,
    "inAppEnabled" BOOLEAN NOT NULL DEFAULT true,
    "channelOverrides" JSONB NOT NULL DEFAULT '{}',
    "quietHoursStart" TEXT,
    "quietHoursEnd" TEXT,
    "timezone" TEXT NOT NULL DEFAULT 'UTC',
    "emailDigest" TEXT NOT NULL DEFAULT 'instant',
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NotificationPreference_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaymentOnPayout" (
    "id" TEXT NOT NULL,
    "paymentId" TEXT NOT NULL,
    "payoutId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PaymentOnPayout_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlatformRevenue" (
    "id" TEXT NOT NULL,
    "paymentId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "month" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PlatformRevenue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PerformanceMetric" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "unit" TEXT NOT NULL,
    "tags" JSONB,
    "userId" TEXT,
    "sessionId" TEXT,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PerformanceMetric_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PerformanceAlert" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "severity" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "metric" TEXT,
    "threshold" DOUBLE PRECISION,
    "currentValue" DOUBLE PRECISION,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "resolved" BOOLEAN NOT NULL DEFAULT false,
    "resolvedAt" TIMESTAMP(3),

    CONSTRAINT "PerformanceAlert_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResourceShare" (
    "id" TEXT NOT NULL,
    "resourceId" TEXT NOT NULL,
    "sharedByTutorId" TEXT NOT NULL,
    "recipientId" TEXT,
    "curriculumId" TEXT,
    "sharedWithAll" BOOLEAN NOT NULL DEFAULT false,
    "message" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ResourceShare_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CalendarEvent" (
    "id" TEXT NOT NULL,
    "tutorId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "type" "EventType" NOT NULL DEFAULT 'LESSON',
    "status" "EventStatus" NOT NULL DEFAULT 'CONFIRMED',
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "timezone" TEXT NOT NULL DEFAULT 'Asia/Shanghai',
    "isAllDay" BOOLEAN NOT NULL DEFAULT false,
    "recurrenceRule" TEXT,
    "recurringEventId" TEXT,
    "isRecurring" BOOLEAN NOT NULL DEFAULT false,
    "location" TEXT,
    "meetingUrl" TEXT,
    "isVirtual" BOOLEAN NOT NULL DEFAULT false,
    "curriculumId" TEXT,
    "batchId" TEXT,
    "studentId" TEXT,
    "attendees" JSONB DEFAULT '[]',
    "maxAttendees" INTEGER NOT NULL DEFAULT 1,
    "reminders" JSONB DEFAULT '[]',
    "color" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL DEFAULT 'manual',
    "externalId" TEXT,
    "deletedAt" TIMESTAMP(3),
    "isCancelled" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "CalendarEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CalendarAvailability" (
    "id" TEXT NOT NULL,
    "tutorId" TEXT NOT NULL,
    "dayOfWeek" INTEGER NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "timezone" TEXT NOT NULL DEFAULT 'Asia/Shanghai',
    "isAvailable" BOOLEAN NOT NULL DEFAULT true,
    "validFrom" TIMESTAMP(3),
    "validUntil" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CalendarAvailability_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CalendarException" (
    "id" TEXT NOT NULL,
    "tutorId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "isAvailable" BOOLEAN NOT NULL DEFAULT false,
    "startTime" TEXT,
    "endTime" TEXT,
    "reason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CalendarException_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Whiteboard" (
    "id" TEXT NOT NULL,
    "tutorId" TEXT NOT NULL,
    "sessionId" TEXT,
    "roomId" TEXT,
    "curriculumId" TEXT,
    "lessonId" TEXT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "isTemplate" BOOLEAN NOT NULL DEFAULT false,
    "isPublic" BOOLEAN NOT NULL DEFAULT false,
    "width" INTEGER NOT NULL DEFAULT 10000,
    "height" INTEGER NOT NULL DEFAULT 10000,
    "backgroundColor" TEXT NOT NULL DEFAULT '#ffffff',
    "backgroundStyle" TEXT NOT NULL DEFAULT 'solid',
    "backgroundImage" TEXT,
    "collaborators" JSONB DEFAULT '[]',
    "visibility" TEXT NOT NULL DEFAULT 'private',
    "isBroadcasting" BOOLEAN NOT NULL DEFAULT false,
    "ownerType" TEXT NOT NULL DEFAULT 'tutor',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Whiteboard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WhiteboardPage" (
    "id" TEXT NOT NULL,
    "whiteboardId" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'Page 1',
    "order" INTEGER NOT NULL DEFAULT 0,
    "backgroundColor" TEXT,
    "backgroundStyle" TEXT,
    "backgroundImage" TEXT,
    "strokes" JSONB NOT NULL DEFAULT '[]',
    "shapes" JSONB NOT NULL DEFAULT '[]',
    "texts" JSONB NOT NULL DEFAULT '[]',
    "images" JSONB NOT NULL DEFAULT '[]',
    "viewState" JSONB DEFAULT '{}',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WhiteboardPage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WhiteboardSnapshot" (
    "id" TEXT NOT NULL,
    "whiteboardId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "thumbnailUrl" TEXT,
    "pages" JSONB NOT NULL,
    "createdBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WhiteboardSnapshot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WhiteboardSession" (
    "id" TEXT NOT NULL,
    "whiteboardId" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,
    "tutorId" TEXT NOT NULL,
    "participants" JSONB NOT NULL DEFAULT '[]',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endedAt" TIMESTAMP(3),
    "operations" JSONB DEFAULT '[]',
    "finalPageStates" JSONB,

    CONSTRAINT "WhiteboardSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MathWhiteboardSession" (
    "id" TEXT NOT NULL,
    "liveSessionId" TEXT NOT NULL,
    "tutorId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "status" "MathSessionStatus" NOT NULL DEFAULT 'ACTIVE',
    "isLocked" BOOLEAN NOT NULL DEFAULT false,
    "allowStudentEdit" BOOLEAN NOT NULL DEFAULT false,
    "allowStudentTools" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "endedAt" TIMESTAMP(3),

    CONSTRAINT "MathWhiteboardSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MathWhiteboardPage" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "width" INTEGER NOT NULL DEFAULT 1920,
    "height" INTEGER NOT NULL DEFAULT 1080,
    "backgroundType" TEXT NOT NULL DEFAULT 'grid',
    "backgroundColor" TEXT NOT NULL DEFAULT '#ffffff',
    "elements" JSONB NOT NULL,
    "vectorClock" JSONB NOT NULL DEFAULT '{}',
    "lastModified" TIMESTAMP(3) NOT NULL,
    "modifiedBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MathWhiteboardPage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MathWhiteboardParticipant" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "canEdit" BOOLEAN NOT NULL DEFAULT false,
    "canChat" BOOLEAN NOT NULL DEFAULT true,
    "canUseAI" BOOLEAN NOT NULL DEFAULT true,
    "cursorX" DOUBLE PRECISION,
    "cursorY" DOUBLE PRECISION,
    "cursorColor" TEXT NOT NULL,
    "isTyping" BOOLEAN NOT NULL DEFAULT false,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "leftAt" TIMESTAMP(3),

    CONSTRAINT "MathWhiteboardParticipant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MathWhiteboardSnapshot" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "thumbnailUrl" TEXT,
    "pages" JSONB NOT NULL,
    "viewState" JSONB,
    "createdBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MathWhiteboardSnapshot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MathAIInteraction" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" "MathAIInteractionType" NOT NULL,
    "inputText" TEXT,
    "inputLatex" TEXT,
    "inputImage" TEXT,
    "output" TEXT NOT NULL,
    "outputLatex" TEXT,
    "modelUsed" TEXT NOT NULL,
    "latencyMs" INTEGER NOT NULL,
    "tokensUsed" INTEGER,
    "steps" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MathAIInteraction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FamilyAccount" (
    "id" TEXT NOT NULL,
    "familyName" TEXT NOT NULL,
    "familyType" TEXT NOT NULL DEFAULT 'PARENT_STUDENT',
    "primaryEmail" TEXT NOT NULL,
    "phoneNumber" TEXT,
    "address" TEXT,
    "country" TEXT DEFAULT 'CN',
    "timezone" TEXT DEFAULT 'Asia/Shanghai',
    "defaultCurrency" TEXT NOT NULL DEFAULT 'CNY',
    "monthlyBudget" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "enableBudget" BOOLEAN NOT NULL DEFAULT false,
    "allowAdults" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "verifiedAt" TIMESTAMP(3),

    CONSTRAINT "FamilyAccount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FamilyMember" (
    "id" TEXT NOT NULL,
    "familyAccountId" TEXT NOT NULL,
    "userId" TEXT,
    "name" TEXT NOT NULL,
    "relation" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FamilyMember_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FamilyBudget" (
    "id" TEXT NOT NULL,
    "parentId" TEXT NOT NULL,
    "month" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "spent" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FamilyBudget_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FamilyPayment" (
    "id" TEXT NOT NULL,
    "parentId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "method" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FamilyPayment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BudgetAlert" (
    "id" TEXT NOT NULL,
    "parentId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BudgetAlert_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ParentActivityLog" (
    "id" TEXT NOT NULL,
    "parentId" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "details" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ParentActivityLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FamilyNotification" (
    "id" TEXT NOT NULL,
    "parentId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FamilyNotification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmergencyContact" (
    "id" TEXT NOT NULL,
    "parentId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "relation" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT,
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EmergencyContact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentProgressSnapshot" (
    "id" TEXT NOT NULL,
    "parentId" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "capturedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StudentProgressSnapshot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ParentPaymentAuthorization" (
    "id" TEXT NOT NULL,
    "parentId" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "maxAmount" DOUBLE PRECISION,
    "methods" TEXT[],
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ParentPaymentAuthorization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ParentSpendingLimit" (
    "id" TEXT NOT NULL,
    "parentId" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "limit" DOUBLE PRECISION NOT NULL,
    "period" TEXT NOT NULL DEFAULT 'monthly',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ParentSpendingLimit_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "CurriculumShare_sharedByTutorId_idx" ON "CurriculumShare"("sharedByTutorId");

-- CreateIndex
CREATE INDEX "CurriculumShare_recipientId_idx" ON "CurriculumShare"("recipientId");

-- CreateIndex
CREATE INDEX "CurriculumShare_curriculumId_idx" ON "CurriculumShare"("curriculumId");

-- CreateIndex
CREATE UNIQUE INDEX "CurriculumShare_curriculumId_recipientId_key" ON "CurriculumShare"("curriculumId", "recipientId");

-- CreateIndex
CREATE INDEX "QuestionBankItem_tutorId_idx" ON "QuestionBankItem"("tutorId");

-- CreateIndex
CREATE INDEX "QuestionBankItem_type_idx" ON "QuestionBankItem"("type");

-- CreateIndex
CREATE INDEX "QuestionBankItem_difficulty_idx" ON "QuestionBankItem"("difficulty");

-- CreateIndex
CREATE INDEX "QuestionBankItem_subject_idx" ON "QuestionBankItem"("subject");

-- CreateIndex
CREATE INDEX "QuestionBankItem_tags_idx" ON "QuestionBankItem"("tags");

-- CreateIndex
CREATE INDEX "Quiz_tutorId_idx" ON "Quiz"("tutorId");

-- CreateIndex
CREATE INDEX "Quiz_status_idx" ON "Quiz"("status");

-- CreateIndex
CREATE INDEX "Quiz_type_idx" ON "Quiz"("type");

-- CreateIndex
CREATE INDEX "Quiz_curriculumId_idx" ON "Quiz"("curriculumId");

-- CreateIndex
CREATE INDEX "Quiz_lessonId_idx" ON "Quiz"("lessonId");

-- CreateIndex
CREATE INDEX "QuizAssignment_quizId_idx" ON "QuizAssignment"("quizId");

-- CreateIndex
CREATE INDEX "QuizAssignment_assignedByTutorId_idx" ON "QuizAssignment"("assignedByTutorId");

-- CreateIndex
CREATE INDEX "QuizAssignment_assignedToId_idx" ON "QuizAssignment"("assignedToId");

-- CreateIndex
CREATE INDEX "QuizAssignment_isActive_idx" ON "QuizAssignment"("isActive");

-- CreateIndex
CREATE UNIQUE INDEX "Badge_key_key" ON "Badge"("key");

-- CreateIndex
CREATE INDEX "UserBadge_userId_idx" ON "UserBadge"("userId");

-- CreateIndex
CREATE INDEX "UserBadge_badgeId_idx" ON "UserBadge"("badgeId");

-- CreateIndex
CREATE UNIQUE INDEX "UserBadge_userId_badgeId_key" ON "UserBadge"("userId", "badgeId");

-- CreateIndex
CREATE INDEX "LeaderboardEntry_type_score_idx" ON "LeaderboardEntry"("type", "score");

-- CreateIndex
CREATE INDEX "LeaderboardEntry_userId_idx" ON "LeaderboardEntry"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "LeaderboardEntry_userId_type_periodStart_key" ON "LeaderboardEntry"("userId", "type", "periodStart");

-- CreateIndex
CREATE INDEX "Poll_sessionId_idx" ON "Poll"("sessionId");

-- CreateIndex
CREATE INDEX "Poll_tutorId_idx" ON "Poll"("tutorId");

-- CreateIndex
CREATE INDEX "Poll_status_idx" ON "Poll"("status");

-- CreateIndex
CREATE INDEX "Poll_createdAt_idx" ON "Poll"("createdAt");

-- CreateIndex
CREATE INDEX "PollOption_pollId_idx" ON "PollOption"("pollId");

-- CreateIndex
CREATE INDEX "PollResponse_pollId_idx" ON "PollResponse"("pollId");

-- CreateIndex
CREATE INDEX "PollResponse_studentId_idx" ON "PollResponse"("studentId");

-- CreateIndex
CREATE UNIQUE INDEX "PollResponse_pollId_respondentHash_key" ON "PollResponse"("pollId", "respondentHash");

-- CreateIndex
CREATE UNIQUE INDEX "NotificationPreference_userId_key" ON "NotificationPreference"("userId");

-- CreateIndex
CREATE INDEX "PaymentOnPayout_payoutId_idx" ON "PaymentOnPayout"("payoutId");

-- CreateIndex
CREATE INDEX "PaymentOnPayout_paymentId_idx" ON "PaymentOnPayout"("paymentId");

-- CreateIndex
CREATE UNIQUE INDEX "PaymentOnPayout_paymentId_payoutId_key" ON "PaymentOnPayout"("paymentId", "payoutId");

-- CreateIndex
CREATE INDEX "PlatformRevenue_paymentId_idx" ON "PlatformRevenue"("paymentId");

-- CreateIndex
CREATE INDEX "PlatformRevenue_month_idx" ON "PlatformRevenue"("month");

-- CreateIndex
CREATE INDEX "PlatformRevenue_createdAt_idx" ON "PlatformRevenue"("createdAt");

-- CreateIndex
CREATE INDEX "PerformanceMetric_name_idx" ON "PerformanceMetric"("name");

-- CreateIndex
CREATE INDEX "PerformanceMetric_timestamp_idx" ON "PerformanceMetric"("timestamp");

-- CreateIndex
CREATE INDEX "PerformanceMetric_userId_idx" ON "PerformanceMetric"("userId");

-- CreateIndex
CREATE INDEX "PerformanceAlert_type_idx" ON "PerformanceAlert"("type");

-- CreateIndex
CREATE INDEX "PerformanceAlert_severity_idx" ON "PerformanceAlert"("severity");

-- CreateIndex
CREATE INDEX "PerformanceAlert_resolved_idx" ON "PerformanceAlert"("resolved");

-- CreateIndex
CREATE INDEX "PerformanceAlert_timestamp_idx" ON "PerformanceAlert"("timestamp");

-- CreateIndex
CREATE INDEX "ResourceShare_resourceId_idx" ON "ResourceShare"("resourceId");

-- CreateIndex
CREATE INDEX "ResourceShare_recipientId_idx" ON "ResourceShare"("recipientId");

-- CreateIndex
CREATE INDEX "ResourceShare_sharedByTutorId_idx" ON "ResourceShare"("sharedByTutorId");

-- CreateIndex
CREATE UNIQUE INDEX "ResourceShare_resourceId_recipientId_key" ON "ResourceShare"("resourceId", "recipientId");

-- CreateIndex
CREATE UNIQUE INDEX "ResourceShare_resourceId_sharedWithAll_key" ON "ResourceShare"("resourceId", "sharedWithAll");

-- CreateIndex
CREATE INDEX "CalendarEvent_tutorId_idx" ON "CalendarEvent"("tutorId");

-- CreateIndex
CREATE INDEX "CalendarEvent_startTime_idx" ON "CalendarEvent"("startTime");

-- CreateIndex
CREATE INDEX "CalendarEvent_endTime_idx" ON "CalendarEvent"("endTime");

-- CreateIndex
CREATE INDEX "CalendarEvent_status_idx" ON "CalendarEvent"("status");

-- CreateIndex
CREATE INDEX "CalendarEvent_type_idx" ON "CalendarEvent"("type");

-- CreateIndex
CREATE INDEX "CalendarEvent_recurringEventId_idx" ON "CalendarEvent"("recurringEventId");

-- CreateIndex
CREATE INDEX "CalendarEvent_tutorId_startTime_endTime_idx" ON "CalendarEvent"("tutorId", "startTime", "endTime");

-- CreateIndex
CREATE INDEX "CalendarEvent_curriculumId_idx" ON "CalendarEvent"("curriculumId");

-- CreateIndex
CREATE INDEX "CalendarEvent_batchId_idx" ON "CalendarEvent"("batchId");

-- CreateIndex
CREATE INDEX "CalendarAvailability_tutorId_idx" ON "CalendarAvailability"("tutorId");

-- CreateIndex
CREATE INDEX "CalendarAvailability_dayOfWeek_idx" ON "CalendarAvailability"("dayOfWeek");

-- CreateIndex
CREATE UNIQUE INDEX "CalendarAvailability_tutorId_dayOfWeek_startTime_endTime_key" ON "CalendarAvailability"("tutorId", "dayOfWeek", "startTime", "endTime");

-- CreateIndex
CREATE INDEX "CalendarException_tutorId_idx" ON "CalendarException"("tutorId");

-- CreateIndex
CREATE INDEX "CalendarException_date_idx" ON "CalendarException"("date");

-- CreateIndex
CREATE UNIQUE INDEX "CalendarException_tutorId_date_startTime_key" ON "CalendarException"("tutorId", "date", "startTime");

-- CreateIndex
CREATE INDEX "Whiteboard_tutorId_idx" ON "Whiteboard"("tutorId");

-- CreateIndex
CREATE INDEX "Whiteboard_sessionId_idx" ON "Whiteboard"("sessionId");

-- CreateIndex
CREATE INDEX "Whiteboard_roomId_idx" ON "Whiteboard"("roomId");

-- CreateIndex
CREATE INDEX "Whiteboard_curriculumId_idx" ON "Whiteboard"("curriculumId");

-- CreateIndex
CREATE INDEX "Whiteboard_lessonId_idx" ON "Whiteboard"("lessonId");

-- CreateIndex
CREATE INDEX "Whiteboard_isTemplate_idx" ON "Whiteboard"("isTemplate");

-- CreateIndex
CREATE INDEX "Whiteboard_createdAt_idx" ON "Whiteboard"("createdAt");

-- CreateIndex
CREATE INDEX "Whiteboard_visibility_idx" ON "Whiteboard"("visibility");

-- CreateIndex
CREATE INDEX "Whiteboard_isBroadcasting_idx" ON "Whiteboard"("isBroadcasting");

-- CreateIndex
CREATE INDEX "Whiteboard_sessionId_visibility_idx" ON "Whiteboard"("sessionId", "visibility");

-- CreateIndex
CREATE INDEX "Whiteboard_sessionId_ownerType_idx" ON "Whiteboard"("sessionId", "ownerType");

-- CreateIndex
CREATE INDEX "WhiteboardPage_whiteboardId_idx" ON "WhiteboardPage"("whiteboardId");

-- CreateIndex
CREATE INDEX "WhiteboardPage_order_idx" ON "WhiteboardPage"("order");

-- CreateIndex
CREATE UNIQUE INDEX "WhiteboardPage_whiteboardId_order_key" ON "WhiteboardPage"("whiteboardId", "order");

-- CreateIndex
CREATE INDEX "WhiteboardSnapshot_whiteboardId_idx" ON "WhiteboardSnapshot"("whiteboardId");

-- CreateIndex
CREATE INDEX "WhiteboardSnapshot_createdAt_idx" ON "WhiteboardSnapshot"("createdAt");

-- CreateIndex
CREATE INDEX "WhiteboardSession_whiteboardId_idx" ON "WhiteboardSession"("whiteboardId");

-- CreateIndex
CREATE INDEX "WhiteboardSession_roomId_idx" ON "WhiteboardSession"("roomId");

-- CreateIndex
CREATE INDEX "WhiteboardSession_tutorId_idx" ON "WhiteboardSession"("tutorId");

-- CreateIndex
CREATE INDEX "WhiteboardSession_isActive_idx" ON "WhiteboardSession"("isActive");

-- CreateIndex
CREATE INDEX "MathWhiteboardSession_liveSessionId_idx" ON "MathWhiteboardSession"("liveSessionId");

-- CreateIndex
CREATE INDEX "MathWhiteboardSession_tutorId_idx" ON "MathWhiteboardSession"("tutorId");

-- CreateIndex
CREATE INDEX "MathWhiteboardSession_status_idx" ON "MathWhiteboardSession"("status");

-- CreateIndex
CREATE INDEX "MathWhiteboardSession_createdAt_idx" ON "MathWhiteboardSession"("createdAt");

-- CreateIndex
CREATE INDEX "MathWhiteboardPage_sessionId_idx" ON "MathWhiteboardPage"("sessionId");

-- CreateIndex
CREATE INDEX "MathWhiteboardPage_order_idx" ON "MathWhiteboardPage"("order");

-- CreateIndex
CREATE UNIQUE INDEX "MathWhiteboardPage_sessionId_order_key" ON "MathWhiteboardPage"("sessionId", "order");

-- CreateIndex
CREATE INDEX "MathWhiteboardParticipant_sessionId_idx" ON "MathWhiteboardParticipant"("sessionId");

-- CreateIndex
CREATE INDEX "MathWhiteboardParticipant_userId_idx" ON "MathWhiteboardParticipant"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "MathWhiteboardParticipant_sessionId_userId_key" ON "MathWhiteboardParticipant"("sessionId", "userId");

-- CreateIndex
CREATE INDEX "MathWhiteboardSnapshot_sessionId_idx" ON "MathWhiteboardSnapshot"("sessionId");

-- CreateIndex
CREATE INDEX "MathWhiteboardSnapshot_createdAt_idx" ON "MathWhiteboardSnapshot"("createdAt");

-- CreateIndex
CREATE INDEX "MathAIInteraction_sessionId_idx" ON "MathAIInteraction"("sessionId");

-- CreateIndex
CREATE INDEX "MathAIInteraction_type_idx" ON "MathAIInteraction"("type");

-- CreateIndex
CREATE INDEX "MathAIInteraction_createdAt_idx" ON "MathAIInteraction"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "FamilyAccount_primaryEmail_unique" ON "FamilyAccount"("primaryEmail");

-- CreateIndex
CREATE INDEX "FamilyAccount_isActive_idx" ON "FamilyAccount"("isActive");

-- CreateIndex
CREATE INDEX "FamilyAccount_isVerified_idx" ON "FamilyAccount"("isVerified");

-- CreateIndex
CREATE INDEX "FamilyAccount_createdAt_idx" ON "FamilyAccount"("createdAt");

-- CreateIndex
CREATE INDEX "idx_family_account_status" ON "FamilyAccount"("isActive", "isVerified");

-- CreateIndex
CREATE INDEX "idx_family_account_active_created" ON "FamilyAccount"("isActive", "createdAt");

-- CreateIndex
CREATE INDEX "idx_family_account_type_status" ON "FamilyAccount"("familyType", "isActive");

-- CreateIndex
CREATE INDEX "FamilyMember_familyAccountId_idx" ON "FamilyMember"("familyAccountId");

-- CreateIndex
CREATE INDEX "FamilyMember_userId_idx" ON "FamilyMember"("userId");

-- CreateIndex
CREATE INDEX "idx_family_member_account_user" ON "FamilyMember"("familyAccountId", "userId");

-- CreateIndex
CREATE INDEX "idx_family_member_user_relation" ON "FamilyMember"("userId", "relation");

-- CreateIndex
CREATE INDEX "FamilyBudget_parentId_idx" ON "FamilyBudget"("parentId");

-- CreateIndex
CREATE INDEX "idx_family_budget_parent_period" ON "FamilyBudget"("parentId", "year", "month");

-- CreateIndex
CREATE UNIQUE INDEX "FamilyBudget_parentId_month_year_key" ON "FamilyBudget"("parentId", "month", "year");

-- CreateIndex
CREATE INDEX "FamilyPayment_parentId_idx" ON "FamilyPayment"("parentId");

-- CreateIndex
CREATE INDEX "idx_family_payment_parent_created" ON "FamilyPayment"("parentId", "createdAt");

-- CreateIndex
CREATE INDEX "idx_family_payment_parent_status_created" ON "FamilyPayment"("parentId", "status", "createdAt");

-- CreateIndex
CREATE INDEX "BudgetAlert_parentId_idx" ON "BudgetAlert"("parentId");

-- CreateIndex
CREATE INDEX "ParentActivityLog_parentId_idx" ON "ParentActivityLog"("parentId");

-- CreateIndex
CREATE INDEX "idx_parent_activity_parent_created" ON "ParentActivityLog"("parentId", "createdAt");

-- CreateIndex
CREATE INDEX "FamilyNotification_parentId_idx" ON "FamilyNotification"("parentId");

-- CreateIndex
CREATE INDEX "idx_family_notification_parent_created" ON "FamilyNotification"("parentId", "createdAt");

-- CreateIndex
CREATE INDEX "idx_family_notification_parent_read_created" ON "FamilyNotification"("parentId", "isRead", "createdAt");

-- CreateIndex
CREATE INDEX "EmergencyContact_parentId_idx" ON "EmergencyContact"("parentId");

-- CreateIndex
CREATE INDEX "idx_emergency_contact_parent_primary" ON "EmergencyContact"("parentId", "isPrimary");

-- CreateIndex
CREATE INDEX "idx_emergency_contact_parent_primary_created" ON "EmergencyContact"("parentId", "isPrimary", "createdAt");

-- CreateIndex
CREATE INDEX "StudentProgressSnapshot_parentId_idx" ON "StudentProgressSnapshot"("parentId");

-- CreateIndex
CREATE INDEX "StudentProgressSnapshot_studentId_idx" ON "StudentProgressSnapshot"("studentId");

-- CreateIndex
CREATE INDEX "idx_student_progress_parent_captured" ON "StudentProgressSnapshot"("parentId", "capturedAt");

-- CreateIndex
CREATE INDEX "idx_student_progress_student_captured" ON "StudentProgressSnapshot"("studentId", "capturedAt");

-- CreateIndex
CREATE UNIQUE INDEX "ParentPaymentAuthorization_parentId_key" ON "ParentPaymentAuthorization"("parentId");

-- CreateIndex
CREATE INDEX "ParentPaymentAuthorization_parentId_idx" ON "ParentPaymentAuthorization"("parentId");

-- CreateIndex
CREATE INDEX "ParentSpendingLimit_parentId_idx" ON "ParentSpendingLimit"("parentId");

-- CreateIndex
CREATE INDEX "LiveSession_curriculumId_idx" ON "LiveSession"("curriculumId");

-- CreateIndex
CREATE INDEX "idx_notification_user_read_created" ON "Notification"("userId", "read", "createdAt");

-- CreateIndex
CREATE INDEX "idx_notification_user_type_created" ON "Notification"("userId", "type", "createdAt");

-- CreateIndex
CREATE INDEX "Payment_tutorId_idx" ON "Payment"("tutorId");

-- CreateIndex
CREATE INDEX "idx_payment_tutor_status_created" ON "Payment"("tutorId", "status", "createdAt");

-- CreateIndex
CREATE INDEX "idx_payment_enrollment_status" ON "Payment"("enrollmentId", "status");

-- CreateIndex
CREATE INDEX "Payout_requestedAt_idx" ON "Payout"("requestedAt");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_studentUniqueId_key" ON "Profile"("studentUniqueId");

-- CreateIndex
CREATE INDEX "QuizAttempt_quizId_idx" ON "QuizAttempt"("quizId");

-- CreateIndex
CREATE INDEX "QuizAttempt_assignmentId_idx" ON "QuizAttempt"("assignmentId");

-- CreateIndex
CREATE INDEX "QuizAttempt_studentId_quizId_idx" ON "QuizAttempt"("studentId", "quizId");

-- CreateIndex
CREATE INDEX "Resource_isPublic_idx" ON "Resource"("isPublic");

-- CreateIndex
CREATE INDEX "idx_user_activity_user_created" ON "UserActivityLog"("userId", "createdAt");

-- AddForeignKey
ALTER TABLE "CurriculumShare" ADD CONSTRAINT "CurriculumShare_curriculumId_fkey" FOREIGN KEY ("curriculumId") REFERENCES "Curriculum"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CurriculumShare" ADD CONSTRAINT "CurriculumShare_sharedByTutorId_fkey" FOREIGN KEY ("sharedByTutorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CurriculumShare" ADD CONSTRAINT "CurriculumShare_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizAttempt" ADD CONSTRAINT "QuizAttempt_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quiz"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizAttempt" ADD CONSTRAINT "QuizAttempt_assignmentId_fkey" FOREIGN KEY ("assignmentId") REFERENCES "QuizAssignment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionBankItem" ADD CONSTRAINT "QuestionBankItem_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizAssignment" ADD CONSTRAINT "QuizAssignment_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quiz"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserBadge" ADD CONSTRAINT "UserBadge_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserBadge" ADD CONSTRAINT "UserBadge_badgeId_fkey" FOREIGN KEY ("badgeId") REFERENCES "Badge"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeaderboardEntry" ADD CONSTRAINT "LeaderboardEntry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LiveSession" ADD CONSTRAINT "LiveSession_curriculumId_fkey" FOREIGN KEY ("curriculumId") REFERENCES "Curriculum"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Poll" ADD CONSTRAINT "Poll_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PollOption" ADD CONSTRAINT "PollOption_pollId_fkey" FOREIGN KEY ("pollId") REFERENCES "Poll"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PollResponse" ADD CONSTRAINT "PollResponse_pollId_fkey" FOREIGN KEY ("pollId") REFERENCES "Poll"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PollResponse" ADD CONSTRAINT "PollResponse_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NotificationPreference" ADD CONSTRAINT "NotificationPreference_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentOnPayout" ADD CONSTRAINT "PaymentOnPayout_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "Payment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentOnPayout" ADD CONSTRAINT "PaymentOnPayout_payoutId_fkey" FOREIGN KEY ("payoutId") REFERENCES "Payout"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResourceShare" ADD CONSTRAINT "ResourceShare_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES "Resource"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResourceShare" ADD CONSTRAINT "ResourceShare_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CalendarEvent" ADD CONSTRAINT "CalendarEvent_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CalendarEvent" ADD CONSTRAINT "CalendarEvent_curriculumId_fkey" FOREIGN KEY ("curriculumId") REFERENCES "Curriculum"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CalendarEvent" ADD CONSTRAINT "CalendarEvent_batchId_fkey" FOREIGN KEY ("batchId") REFERENCES "CourseBatch"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CalendarAvailability" ADD CONSTRAINT "CalendarAvailability_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CalendarException" ADD CONSTRAINT "CalendarException_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Whiteboard" ADD CONSTRAINT "Whiteboard_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WhiteboardPage" ADD CONSTRAINT "WhiteboardPage_whiteboardId_fkey" FOREIGN KEY ("whiteboardId") REFERENCES "Whiteboard"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WhiteboardSnapshot" ADD CONSTRAINT "WhiteboardSnapshot_whiteboardId_fkey" FOREIGN KEY ("whiteboardId") REFERENCES "Whiteboard"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MathWhiteboardSession" ADD CONSTRAINT "MathWhiteboardSession_liveSessionId_fkey" FOREIGN KEY ("liveSessionId") REFERENCES "LiveSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MathWhiteboardSession" ADD CONSTRAINT "MathWhiteboardSession_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MathWhiteboardPage" ADD CONSTRAINT "MathWhiteboardPage_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "MathWhiteboardSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MathWhiteboardParticipant" ADD CONSTRAINT "MathWhiteboardParticipant_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "MathWhiteboardSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MathWhiteboardParticipant" ADD CONSTRAINT "MathWhiteboardParticipant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MathWhiteboardSnapshot" ADD CONSTRAINT "MathWhiteboardSnapshot_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "MathWhiteboardSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MathAIInteraction" ADD CONSTRAINT "MathAIInteraction_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "MathWhiteboardSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FamilyMember" ADD CONSTRAINT "FamilyMember_familyAccountId_fkey" FOREIGN KEY ("familyAccountId") REFERENCES "FamilyAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FamilyMember" ADD CONSTRAINT "FamilyMember_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FamilyBudget" ADD CONSTRAINT "FamilyBudget_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "FamilyAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FamilyPayment" ADD CONSTRAINT "FamilyPayment_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "FamilyAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BudgetAlert" ADD CONSTRAINT "BudgetAlert_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "FamilyAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParentActivityLog" ADD CONSTRAINT "ParentActivityLog_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "FamilyAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FamilyNotification" ADD CONSTRAINT "FamilyNotification_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "FamilyAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmergencyContact" ADD CONSTRAINT "EmergencyContact_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "FamilyAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentProgressSnapshot" ADD CONSTRAINT "StudentProgressSnapshot_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "FamilyAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParentPaymentAuthorization" ADD CONSTRAINT "ParentPaymentAuthorization_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "FamilyAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParentSpendingLimit" ADD CONSTRAINT "ParentSpendingLimit_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "FamilyAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
