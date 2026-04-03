-- ============================================
-- Migration: Rename Curriculum to Course
-- ============================================
-- This migration:
-- 1. Renames Curriculum table to Course
-- 2. Renames id columns to table-specific IDs (courseId, lessonId, etc.)
-- 3. Removes deprecated columns
-- 4. Updates foreign key references
-- ============================================

-- ============================================
-- STEP 1: Course Table (formerly Curriculum)
-- ============================================

-- Rename Curriculum table to Course
ALTER TABLE "Curriculum" RENAME TO "Course";

-- Rename id to courseId
ALTER TABLE "Course" RENAME COLUMN "id" TO "courseId";

-- Remove deprecated columns
ALTER TABLE "Course" DROP COLUMN IF EXISTS "subject";
ALTER TABLE "Course" DROP COLUMN IF EXISTS "gradeLevel";
ALTER TABLE "Course" DROP COLUMN IF EXISTS "difficulty";
ALTER TABLE "Course" DROP COLUMN IF EXISTS "estimatedHours";
ALTER TABLE "Course" DROP COLUMN IF EXISTS "curriculumSource";
ALTER TABLE "Course" DROP COLUMN IF EXISTS "outlineSource";
ALTER TABLE "Course" DROP COLUMN IF EXISTS "courseMaterials";
ALTER TABLE "Course" DROP COLUMN IF EXISTS "coursePitch";

-- Update indexes
DROP INDEX IF EXISTS "Curriculum_subject_idx";
DROP INDEX IF EXISTS "Curriculum_isPublished_idx";
DROP INDEX IF EXISTS "Curriculum_creatorId_idx";
CREATE INDEX "Course_isPublished_idx" ON "Course"("isPublished");
CREATE INDEX "Course_creatorId_idx" ON "Course"("creatorId");

-- ============================================
-- STEP 2: CourseLesson Table (formerly CurriculumLesson)
-- ============================================

-- Rename CurriculumLesson table to CourseLesson
ALTER TABLE "CurriculumLesson" RENAME TO "CourseLesson";

-- Rename id to lessonId
ALTER TABLE "CourseLesson" RENAME COLUMN "id" TO "lessonId";

-- Rename curriculumId to courseId
ALTER TABLE "CourseLesson" RENAME COLUMN "curriculumId" TO "courseId";

-- Remove deprecated columns
ALTER TABLE "CourseLesson" DROP COLUMN IF EXISTS "moduleId";
ALTER TABLE "CourseLesson" DROP COLUMN IF EXISTS "duration";
ALTER TABLE "CourseLesson" DROP COLUMN IF EXISTS "difficulty";
ALTER TABLE "CourseLesson" DROP COLUMN IF EXISTS "learningObjectives";
ALTER TABLE "CourseLesson" DROP COLUMN IF EXISTS "teachingPoints";
ALTER TABLE "CourseLesson" DROP COLUMN IF EXISTS "keyConcepts";
ALTER TABLE "CourseLesson" DROP COLUMN IF EXISTS "examples";
ALTER TABLE "CourseLesson" DROP COLUMN IF EXISTS "practiceProblems";
ALTER TABLE "CourseLesson" DROP COLUMN IF EXISTS "commonMisconceptions";
ALTER TABLE "CourseLesson" DROP COLUMN IF EXISTS "prerequisiteLessonIds";

-- Add new columns for tasks/assessments/homework
ALTER TABLE "CourseLesson" ADD COLUMN IF NOT EXISTS "tasks" jsonb;
ALTER TABLE "CourseLesson" ADD COLUMN IF NOT EXISTS "assessments" jsonb;
ALTER TABLE "CourseLesson" ADD COLUMN IF NOT EXISTS "homework" jsonb;

-- Update indexes
DROP INDEX IF EXISTS "CurriculumLesson_moduleId_idx";
DROP INDEX IF EXISTS "CurriculumLesson_curriculumId_idx";
DROP INDEX IF EXISTS "CurriculumLesson_order_idx";
CREATE INDEX "CourseLesson_courseId_idx" ON "CourseLesson"("courseId");
CREATE INDEX "CourseLesson_order_idx" ON "CourseLesson"("order");

-- ============================================
-- STEP 3: CourseEnrollment Table (formerly CurriculumEnrollment)
-- ============================================

-- Rename CurriculumEnrollment table to CourseEnrollment
ALTER TABLE "CurriculumEnrollment" RENAME TO "CourseEnrollment";

-- Rename id to enrollmentId
ALTER TABLE "CourseEnrollment" RENAME COLUMN "id" TO "enrollmentId";

-- Rename curriculumId to courseId
ALTER TABLE "CourseEnrollment" RENAME COLUMN "curriculumId" TO "courseId";

-- Remove deprecated columns
ALTER TABLE "CourseEnrollment" DROP COLUMN IF EXISTS "batchId";

-- Update indexes
DROP INDEX IF EXISTS "CurriculumEnrollment_studentId_idx";
DROP INDEX IF EXISTS "CurriculumEnrollment_batchId_idx";
DROP INDEX IF EXISTS "CurriculumEnrollment_studentId_curriculumId_key";
CREATE INDEX "CourseEnrollment_studentId_idx" ON "CourseEnrollment"("studentId");
CREATE UNIQUE INDEX "CourseEnrollment_studentId_courseId_key" ON "CourseEnrollment"("studentId", "courseId");

-- ============================================
-- STEP 4: CourseProgress Table (formerly CurriculumProgress)
-- ============================================

-- Rename CurriculumProgress table to CourseProgress
ALTER TABLE "CurriculumProgress" RENAME TO "CourseProgress";

-- Rename id to progressId
ALTER TABLE "CourseProgress" RENAME COLUMN "id" TO "progressId";

-- Rename curriculumId to courseId
ALTER TABLE "CourseProgress" RENAME COLUMN "curriculumId" TO "courseId";

-- Update indexes
DROP INDEX IF EXISTS "CurriculumProgress_studentId_idx";
DROP INDEX IF EXISTS "CurriculumProgress_studentId_curriculumId_key";
CREATE INDEX "CourseProgress_studentId_idx" ON "CourseProgress"("studentId");
CREATE UNIQUE INDEX "CourseProgress_studentId_courseId_key" ON "CourseProgress"("studentId", "courseId");

-- ============================================
-- STEP 5: CourseLessonProgress Table (formerly CurriculumLessonProgress)
-- ============================================

-- Rename CurriculumLessonProgress table to CourseLessonProgress
ALTER TABLE "CurriculumLessonProgress" RENAME TO "CourseLessonProgress";

-- Rename id to progressId
ALTER TABLE "CourseLessonProgress" RENAME COLUMN "id" TO "progressId";

-- Update indexes
DROP INDEX IF EXISTS "CurriculumLessonProgress_studentId_idx";
DROP INDEX IF EXISTS "CurriculumLessonProgress_lessonId_studentId_key";
CREATE INDEX "CourseLessonProgress_studentId_idx" ON "CourseLessonProgress"("studentId");
CREATE UNIQUE INDEX "CourseLessonProgress_lessonId_studentId_key" ON "CourseLessonProgress"("lessonId", "studentId");

-- ============================================
-- STEP 6: CourseShare Table (formerly CurriculumShare)
-- ============================================

-- Rename CurriculumShare table to CourseShare
ALTER TABLE "CurriculumShare" RENAME TO "CourseShare";

-- Rename id to shareId
ALTER TABLE "CourseShare" RENAME COLUMN "id" TO "shareId";

-- Rename curriculumId to courseId
ALTER TABLE "CourseShare" RENAME COLUMN "curriculumId" TO "courseId";

-- Update indexes
DROP INDEX IF EXISTS "CurriculumShare_sharedByTutorId_idx";
DROP INDEX IF EXISTS "CurriculumShare_recipientId_idx";
DROP INDEX IF EXISTS "CurriculumShare_curriculumId_idx";
DROP INDEX IF EXISTS "CurriculumShare_curriculumId_recipientId_key";
CREATE INDEX "CourseShare_sharedByTutorId_idx" ON "CourseShare"("sharedByTutorId");
CREATE INDEX "CourseShare_recipientId_idx" ON "CourseShare"("recipientId");
CREATE INDEX "CourseShare_courseId_idx" ON "CourseShare"("courseId");
CREATE UNIQUE INDEX "CourseShare_courseId_recipientId_key" ON "CourseShare"("courseId", "recipientId");

-- ============================================
-- STEP 7: LiveSession Table Updates
-- ============================================

-- Rename id to sessionId
ALTER TABLE "LiveSession" RENAME COLUMN "id" TO "sessionId";

-- Rename curriculumId to courseId
ALTER TABLE "LiveSession" RENAME COLUMN "curriculumId" TO "courseId";

-- Rename subject to category
ALTER TABLE "LiveSession" RENAME COLUMN "subject" TO "category";

-- Remove type column
ALTER TABLE "LiveSession" DROP COLUMN IF EXISTS "type";

-- Update indexes
DROP INDEX IF EXISTS "LiveSession_curriculumId_idx";
CREATE INDEX "LiveSession_courseId_idx" ON "LiveSession"("courseId");

-- ============================================
-- STEP 8: CalendarEvent Table Updates
-- ============================================

-- Rename id to eventId
ALTER TABLE "CalendarEvent" RENAME COLUMN "id" TO "eventId";

-- Rename curriculumId to courseId
ALTER TABLE "CalendarEvent" RENAME COLUMN "curriculumId" TO "courseId";

-- Remove batchId column
ALTER TABLE "CalendarEvent" DROP COLUMN IF EXISTS "batchId";

-- Update indexes
DROP INDEX IF EXISTS "CalendarEvent_curriculumId_idx";
DROP INDEX IF EXISTS "CalendarEvent_batchId_idx";
CREATE INDEX "CalendarEvent_courseId_idx" ON "CalendarEvent"("courseId");

-- ============================================
-- STEP 9: Other Table ID Renames
-- ============================================

-- User table
ALTER TABLE "User" RENAME COLUMN "id" TO "userId";

-- Profile table
ALTER TABLE "Profile" RENAME COLUMN "id" TO "profileId";

-- Account table
ALTER TABLE "Account" RENAME COLUMN "id" TO "accountId";

-- TutorApplication table
ALTER TABLE "TutorApplication" RENAME COLUMN "id" TO "applicationId";

-- Admin tables
ALTER TABLE "AdminRole" RENAME COLUMN "id" TO "roleId";
ALTER TABLE "AdminAssignment" RENAME COLUMN "id" TO "assignmentId";
ALTER TABLE "AdminSession" RENAME COLUMN "id" TO "sessionId";
ALTER TABLE "AdminAuditLog" RENAME COLUMN "id" TO "auditLogId";

-- Content tables
ALTER TABLE "ContentItem" RENAME COLUMN "id" TO "contentId";
ALTER TABLE "VideoWatchEvent" RENAME COLUMN "id" TO "eventId";
ALTER TABLE "ContentQuizCheckpoint" RENAME COLUMN "id" TO "checkpointId";
ALTER TABLE "ContentProgress" RENAME COLUMN "id" TO "progressId";
ALTER TABLE "ReviewSchedule" RENAME COLUMN "id" TO "scheduleId";
ALTER TABLE "Quiz" RENAME COLUMN "id" TO "quizId";
ALTER TABLE "QuizAttempt" RENAME COLUMN "id" TO "attemptId";
ALTER TABLE "QuizAssignment" RENAME COLUMN "id" TO "assignmentId";
ALTER TABLE "QuestionBankItem" RENAME COLUMN "id" TO "itemId";
ALTER TABLE "Note" RENAME COLUMN "id" TO "noteId";
ALTER TABLE "Bookmark" RENAME COLUMN "id" TO "bookmarkId";

-- Live tables
ALTER TABLE "SessionReplayArtifact" RENAME COLUMN "id" TO "artifactId";
ALTER TABLE "SessionParticipant" RENAME COLUMN "id" TO "participantId";
ALTER TABLE "Poll" RENAME COLUMN "id" TO "pollId";
ALTER TABLE "PollOption" RENAME COLUMN "id" TO "optionId";
ALTER TABLE "PollResponse" RENAME COLUMN "id" TO "responseId";
ALTER TABLE "Message" RENAME COLUMN "id" TO "messageId";
ALTER TABLE "Conversation" RENAME COLUMN "id" TO "conversationId";
ALTER TABLE "DirectMessage" RENAME COLUMN "id" TO "directMessageId";
ALTER TABLE "Mention" RENAME COLUMN "id" TO "mentionId";
ALTER TABLE "TutorFollow" RENAME COLUMN "id" TO "followId";
ALTER TABLE "Notification" RENAME COLUMN "id" TO "notificationId";
ALTER TABLE "NotificationPreference" RENAME COLUMN "id" TO "preferenceId";

-- Finance tables
ALTER TABLE "Payment" RENAME COLUMN "id" TO "paymentId";
ALTER TABLE "Refund" RENAME COLUMN "id" TO "refundId";
ALTER TABLE "WebhookEvent" RENAME COLUMN "id" TO "eventId";
ALTER TABLE "Payout" RENAME COLUMN "id" TO "payoutId";
ALTER TABLE "PaymentOnPayout" RENAME COLUMN "id" TO "paymentOnPayoutId";
ALTER TABLE "PlatformRevenue" RENAME COLUMN "id" TO "revenueId";

-- Calendar tables
ALTER TABLE "CalendarConnection" RENAME COLUMN "id" TO "connectionId";
ALTER TABLE "CalendarAvailability" RENAME COLUMN "id" TO "availabilityId";
ALTER TABLE "CalendarException" RENAME COLUMN "id" TO "exceptionId";
ALTER TABLE "OneOnOneBookingRequest" RENAME COLUMN "id" TO "requestId";

-- Gamification tables
ALTER TABLE "UserGamification" RENAME COLUMN "id" TO "gamificationId";
ALTER TABLE "Achievement" RENAME COLUMN "id" TO "achievementId";
ALTER TABLE "Mission" RENAME COLUMN "id" TO "missionId";
ALTER TABLE "MissionProgress" RENAME COLUMN "id" TO "progressId";
ALTER TABLE "UserDailyQuest" RENAME COLUMN "id" TO "questId";
ALTER TABLE "Badge" RENAME COLUMN "id" TO "badgeId";
ALTER TABLE "UserBadge" RENAME COLUMN "id" TO "userBadgeId";
ALTER TABLE "LeaderboardEntry" RENAME COLUMN "id" TO "entryId";

-- Family tables
ALTER TABLE "FamilyAccount" RENAME COLUMN "id" TO "familyAccountId";
ALTER TABLE "FamilyMember" RENAME COLUMN "id" TO "familyMemberId";
ALTER TABLE "FamilyBudget" RENAME COLUMN "id" TO "budgetId";
ALTER TABLE "FamilyPayment" RENAME COLUMN "id" TO "familyPaymentId";
ALTER TABLE "BudgetAlert" RENAME COLUMN "id" TO "alertId";
ALTER TABLE "ParentActivityLog" RENAME COLUMN "id" TO "activityLogId";
ALTER TABLE "FamilyNotification" RENAME COLUMN "id" TO "notificationId";
ALTER TABLE "EmergencyContact" RENAME COLUMN "id" TO "contactId";
ALTER TABLE "StudentProgressSnapshot" RENAME COLUMN "id" TO "snapshotId";
ALTER TABLE "ParentPaymentAuthorization" RENAME COLUMN "id" TO "authorizationId";
ALTER TABLE "ParentSpendingLimit" RENAME COLUMN "id" TO "spendingLimitId";

-- Analytics tables
ALTER TABLE "PerformanceMetric" RENAME COLUMN "id" TO "metricId";
ALTER TABLE "PerformanceAlert" RENAME COLUMN "id" TO "alertId";
ALTER TABLE "EngagementSnapshot" RENAME COLUMN "id" TO "snapshotId";
ALTER TABLE "SessionEngagementSummary" RENAME COLUMN "sessionId" TO "summarySessionId";
ALTER TABLE "PostSessionReport" RENAME COLUMN "id" TO "reportId";
ALTER TABLE "StudentSessionInsight" RENAME COLUMN "id" TO "insightId";
ALTER TABLE "SessionBookmark" RENAME COLUMN "id" TO "bookmarkId";
ALTER TABLE "Resource" RENAME COLUMN "id" TO "resourceId";
ALTER TABLE "ResourceShare" RENAME COLUMN "id" TO "shareId";
ALTER TABLE "LibraryTask" RENAME COLUMN "id" TO "libraryTaskId";

-- Classroom tables
ALTER TABLE "BreakoutSession" RENAME COLUMN "id" TO "breakoutSessionId";
ALTER TABLE "BreakoutRoom" RENAME COLUMN "id" TO "roomId";
ALTER TABLE "BreakoutRoomAssignment" RENAME COLUMN "id" TO "assignmentId";
ALTER TABLE "AITutorEnrollment" RENAME COLUMN "id" TO "enrollmentId";
ALTER TABLE "AIInteractionSession" RENAME COLUMN "id" TO "interactionId";
ALTER TABLE "AITutorDailyUsage" RENAME COLUMN "id" TO "usageId";
ALTER TABLE "AITutorSubscription" RENAME COLUMN "id" TO "subscriptionId";

-- Whiteboard tables
ALTER TABLE "Whiteboard" RENAME COLUMN "id" TO "whiteboardId";
ALTER TABLE "WhiteboardPage" RENAME COLUMN "id" TO "pageId";
ALTER TABLE "WhiteboardSnapshot" RENAME COLUMN "id" TO "snapshotId";
ALTER TABLE "WhiteboardSession" RENAME COLUMN "id" TO "whiteboardSessionId";
ALTER TABLE "MathWhiteboardSession" RENAME COLUMN "id" TO "mathSessionId";
ALTER TABLE "MathWhiteboardPage" RENAME COLUMN "id" TO "mathPageId";
ALTER TABLE "MathWhiteboardParticipant" RENAME COLUMN "id" TO "participantId";
ALTER TABLE "MathWhiteboardSnapshot" RENAME COLUMN "id" TO "mathSnapshotId";
ALTER TABLE "MathAIInteraction" RENAME COLUMN "id" TO "interactionId";

-- Assistant tables
ALTER TABLE "AIAssistantSession" RENAME COLUMN "id" TO "assistantSessionId";
ALTER TABLE "AIAssistantMessage" RENAME COLUMN "id" TO "assistantMessageId";
ALTER TABLE "AIAssistantInsight" RENAME COLUMN "id" TO "insightId";
ALTER TABLE "Clinic" RENAME COLUMN "id" TO "clinicId";
ALTER TABLE "ClinicBooking" RENAME COLUMN "id" TO "bookingId";

-- Builder tables
ALTER TABLE "BuilderTask" RENAME COLUMN "id" TO "taskId";
ALTER TABLE "BuilderTaskExtension" RENAME COLUMN "id" TO "extensionId";
ALTER TABLE "BuilderTaskFile" RENAME COLUMN "id" TO "fileId";
ALTER TABLE "BuilderTaskVersion" RENAME COLUMN "id" TO "versionId";
ALTER TABLE "TaskPoll" RENAME COLUMN "id" TO "pollId";
ALTER TABLE "TaskQuestion" RENAME COLUMN "id" TO "questionId";
ALTER TABLE "TaskDeployment" RENAME COLUMN "id" TO "deploymentId";
ALTER TABLE "TutorAsset" RENAME COLUMN "id" TO "assetId";

-- Collaboration tables
ALTER TABLE "StudyGroup" RENAME COLUMN "id" TO "groupId";
ALTER TABLE "StudyGroupMember" RENAME COLUMN "id" TO "membershipId";
ALTER TABLE "UserActivityLog" RENAME COLUMN "id" TO "activityId";
ALTER TABLE "ApiKey" RENAME COLUMN "id" TO "apiKeyId";
ALTER TABLE "SecurityEvent" RENAME COLUMN "id" TO "eventId";

-- Admin tables (continued)
ALTER TABLE "FeatureFlag" RENAME COLUMN "id" TO "flagId";
ALTER TABLE "FeatureFlagChange" RENAME COLUMN "id" TO "changeId";
ALTER TABLE "LlmProvider" RENAME COLUMN "id" TO "providerId";
ALTER TABLE "LlmModel" RENAME COLUMN "id" TO "modelId";
ALTER TABLE "LlmRoutingRule" RENAME COLUMN "id" TO "ruleId";
ALTER TABLE "SystemSetting" RENAME COLUMN "id" TO "settingId";
ALTER TABLE "IpWhitelist" RENAME COLUMN "id" TO "whitelistId";

-- ============================================
-- STEP 10: Update Foreign Key References
-- ============================================

-- QuestionBankItem: curriculumId -> courseId
ALTER TABLE "QuestionBankItem" RENAME COLUMN "curriculumId" TO "courseId";

-- Quiz: curriculumId -> courseId
ALTER TABLE "Quiz" RENAME COLUMN "curriculumId" TO "courseId";
DROP INDEX IF EXISTS "Quiz_curriculumId_idx";
CREATE INDEX "Quiz_courseId_idx" ON "Quiz"("courseId");

-- StudentPerformance: curriculumId -> courseId
ALTER TABLE "StudentPerformance" RENAME COLUMN "curriculumId" TO "courseId";
DROP INDEX IF EXISTS "StudentPerformance_curriculumId_idx";
CREATE INDEX "StudentPerformance_courseId_idx" ON "StudentPerformance"("courseId");
DROP INDEX IF EXISTS "StudentPerformance_studentId_curriculumId_key";
CREATE UNIQUE INDEX "StudentPerformance_studentId_courseId_key" ON "StudentPerformance"("studentId", "courseId");

-- ResourceShare: curriculumId -> courseId
ALTER TABLE "ResourceShare" RENAME COLUMN "curriculumId" TO "courseId";

-- BuilderTask: curriculumId -> courseId
ALTER TABLE "BuilderTask" RENAME COLUMN "curriculumId" TO "courseId";
DROP INDEX IF EXISTS "BuilderTask_curriculumId_idx";
DROP INDEX IF EXISTS "BuilderTask_curriculumId_lessonId_idx";
CREATE INDEX "BuilderTask_courseId_idx" ON "BuilderTask"("courseId");
CREATE INDEX "BuilderTask_courseId_lessonId_idx" ON "BuilderTask"("courseId", "lessonId");

-- ============================================
-- STEP 11: Rename Deprecated Tables
-- ============================================

-- Rename CurriculumCatalog to CourseCatalog (if exists)
ALTER TABLE IF EXISTS "CurriculumCatalog" RENAME TO "CourseCatalog";
ALTER TABLE IF EXISTS "CourseCatalog" RENAME COLUMN "id" TO "catalogId";
ALTER TABLE IF EXISTS "CourseCatalog" RENAME COLUMN "subject" TO "category";
DROP INDEX IF EXISTS "CurriculumCatalog_subject_idx";
DROP INDEX IF EXISTS "CurriculumCatalog_subject_name_key";
CREATE INDEX "CourseCatalog_category_idx" ON "CourseCatalog"("category");
CREATE UNIQUE INDEX "CourseCatalog_category_name_key" ON "CourseCatalog"("category", "name");

-- Rename CurriculumModule to CourseModule (keep for backward compatibility)
ALTER TABLE IF EXISTS "CurriculumModule" RENAME TO "CourseModule";
ALTER TABLE IF EXISTS "CourseModule" RENAME COLUMN "id" TO "moduleId";
ALTER TABLE IF EXISTS "CourseModule" RENAME COLUMN "curriculumId" TO "courseId";
DROP INDEX IF EXISTS "CurriculumModule_curriculumId_idx";
CREATE INDEX "CourseModule_courseId_idx" ON "CourseModule"("courseId");

-- ============================================
-- STEP 12: Update CourseBatch to use courseId
-- ============================================

ALTER TABLE "CourseBatch" RENAME COLUMN "id" TO "batchId";
ALTER TABLE "CourseBatch" RENAME COLUMN "curriculumId" TO "courseId";
DROP INDEX IF EXISTS "CourseBatch_curriculumId_idx";
CREATE INDEX "CourseBatch_courseId_idx" ON "CourseBatch"("courseId");

-- ============================================
-- STEP 13: Legacy Exports Compatibility
-- ============================================
-- Create views for backward compatibility (optional, can be removed later)

-- Note: The schema file includes legacy exports for backward compatibility
-- Code should migrate to use the new table names and field names
