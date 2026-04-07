-- Migration to rename all primary key columns to 'id' to match production schema
-- This aligns the local database with the Drizzle schema definitions

-- User table
ALTER TABLE "User" RENAME COLUMN "userId" TO "id";

-- Profile table  
ALTER TABLE "Profile" RENAME COLUMN "profileId" TO "id";

-- Account table
ALTER TABLE "Account" RENAME COLUMN "accountId" TO "id";

-- TutorApplication table
ALTER TABLE "TutorApplication" RENAME COLUMN "applicationId" TO "id";

-- Course table
ALTER TABLE "Course" RENAME COLUMN "courseId" TO "id";

-- CourseCatalog table
ALTER TABLE "CourseCatalog" RENAME COLUMN "catalogId" TO "id";

-- CourseShare table
ALTER TABLE "CourseShare" RENAME COLUMN "shareId" TO "id";

-- CourseLesson table
ALTER TABLE "CourseLesson" RENAME COLUMN "lessonId" TO "id";

-- LessonSession table
ALTER TABLE "LessonSession" RENAME COLUMN "sessionId" TO "id";

-- CourseLessonProgress table
ALTER TABLE "CourseLessonProgress" RENAME COLUMN "progressId" TO "id";

-- CourseEnrollment table
ALTER TABLE "CourseEnrollment" RENAME COLUMN "enrollmentId" TO "id";

-- CourseProgress table
ALTER TABLE "CourseProgress" RENAME COLUMN "progressId" TO "id";

-- LiveSession table
ALTER TABLE "LiveSession" RENAME COLUMN "sessionId" TO "id";

-- SessionReplayArtifact table
ALTER TABLE "SessionReplayArtifact" RENAME COLUMN "artifactId" TO "id";

-- SessionParticipant table
ALTER TABLE "SessionParticipant" RENAME COLUMN "participantId" TO "id";

-- Poll table
ALTER TABLE "Poll" RENAME COLUMN "pollId" TO "id";

-- PollOption table
ALTER TABLE "PollOption" RENAME COLUMN "optionId" TO "id";

-- PollResponse table
ALTER TABLE "PollResponse" RENAME COLUMN "responseId" TO "id";

-- BreakoutRoom table
ALTER TABLE "BreakoutRoom" RENAME COLUMN "roomId" TO "id";

-- BreakoutRoomAssignment table
ALTER TABLE "BreakoutRoomAssignment" RENAME COLUMN "assignmentId" TO "id";

-- Whiteboard table
ALTER TABLE "Whiteboard" RENAME COLUMN "whiteboardId" TO "id";

-- WhiteboardElement table
ALTER TABLE "WhiteboardElement" RENAME COLUMN "elementId" TO "id";

-- Quiz table
ALTER TABLE "Quiz" RENAME COLUMN "quizId" TO "id";

-- QuizAttempt table
ALTER TABLE "QuizAttempt" RENAME COLUMN "attemptId" TO "id";

-- QuizAssignment table
ALTER TABLE "QuizAssignment" RENAME COLUMN "assignmentId" TO "id";

-- QuizQuestion table
ALTER TABLE "QuizQuestion" RENAME COLUMN "questionId" TO "id";

-- ContentItem table
ALTER TABLE "ContentItem" RENAME COLUMN "contentId" TO "id";

-- VideoTranscript table
ALTER TABLE "VideoTranscript" RENAME COLUMN "transcriptId" TO "id";

-- Payment table
ALTER TABLE "Payment" RENAME COLUMN "paymentId" TO "id";

-- Payout table
ALTER TABLE "Payout" RENAME COLUMN "payoutId" TO "id";

-- PaymentOnPayout table
ALTER TABLE "PaymentOnPayout" RENAME COLUMN "paymentOnPayoutId" TO "id";

-- PlatformRevenue table
ALTER TABLE "PlatformRevenue" RENAME COLUMN "revenueId" TO "id";

-- FamilyAccount table
ALTER TABLE "FamilyAccount" RENAME COLUMN "familyId" TO "id";

-- FamilyMember table
ALTER TABLE "FamilyMember" RENAME COLUMN "memberId" TO "id";

-- FamilyPayment table
ALTER TABLE "FamilyPayment" RENAME COLUMN "familyPaymentId" TO "id";

-- FamilyNotification table
ALTER TABLE "FamilyNotification" RENAME COLUMN "notificationId" TO "id";

-- Notification table
ALTER TABLE "Notification" RENAME COLUMN "notificationId" TO "id";

-- UserActivityLog table
ALTER TABLE "UserActivityLog" RENAME COLUMN "logId" TO "id";

-- CalendarEvent table
ALTER TABLE "CalendarEvent" RENAME COLUMN "eventId" TO "id";

-- OneOnOneBookingRequest table
ALTER TABLE "OneOnOneBookingRequest" RENAME COLUMN "requestId" TO "id";

-- Subscription table
ALTER TABLE "Subscription" RENAME COLUMN "subscriptionId" TO "id";

-- SubscriptionPayment table
ALTER TABLE "SubscriptionPayment" RENAME COLUMN "subscriptionPaymentId" TO "id";

-- AITutorSession table
ALTER TABLE "AITutorSession" RENAME COLUMN "sessionId" TO "id";

-- AITutorMessage table
ALTER TABLE "AITutorMessage" RENAME COLUMN "messageId" TO "id";

-- AITutorEnrollment table
ALTER TABLE "AITutorEnrollment" RENAME COLUMN "enrollmentId" TO "id";

-- StudentPerformance table
ALTER TABLE "StudentPerformance" RENAME COLUMN "performanceId" TO "id";

-- Gamification table (UserGamification)
ALTER TABLE "UserGamification" RENAME COLUMN "gamificationId" TO "id";

-- Mission table
ALTER TABLE "Mission" RENAME COLUMN "missionId" TO "id";

-- UserMission table
ALTER TABLE "UserMission" RENAME COLUMN "userMissionId" TO "id";

-- Badge table
ALTER TABLE "Badge" RENAME COLUMN "badgeId" TO "id";

-- UserBadge table
ALTER TABLE "UserBadge" RENAME COLUMN "userBadgeId" TO "id";

-- LeaderboardEntry table
ALTER TABLE "LeaderboardEntry" RENAME COLUMN "entryId" TO "id";

-- ParentActivityLog table
ALTER TABLE "ParentActivityLog" RENAME COLUMN "activityId" TO "id";

-- Message table
ALTER TABLE "Message" RENAME COLUMN "messageId" TO "id";

-- Conversation table
ALTER TABLE "Conversation" RENAME COLUMN "conversationId" TO "id";

-- ConversationParticipant table
ALTER TABLE "ConversationParticipant" RENAME COLUMN "participantId" TO "id";

-- Attachment table
ALTER TABLE "Attachment" RENAME COLUMN "attachmentId" TO "id";

-- Announcement table
ALTER TABLE "Announcement" RENAME COLUMN "announceId" TO "id";

-- AnnouncementAck table
ALTER TABLE "AnnouncementAck" RENAME COLUMN "ackId" TO "id";

-- ResourceLibraryItem table
ALTER TABLE "ResourceLibraryItem" RENAME COLUMN "itemId" TO "id";

-- Curriculum table
ALTER TABLE "Curriculum" RENAME COLUMN "curriculumId" TO "id";

-- CurriculumVersion table
ALTER TABLE "CurriculumVersion" RENAME COLUMN "versionId" TO "id";

-- CurriculumShare table
ALTER TABLE "CurriculumShare" RENAME COLUMN "shareId" TO "id";

-- SuggestedEdit table
ALTER TABLE "SuggestedEdit" RENAME COLUMN "editId" TO "id";

-- HandleRegistry table
ALTER TABLE "HandleRegistry" RENAME COLUMN "handleId" TO "id";

-- SocialConnection table
ALTER TABLE "SocialConnection" RENAME COLUMN "connectionId" TO "id";

-- SocialInteraction table
ALTER TABLE "SocialInteraction" RENAME COLUMN "interactionId" TO "id";

-- EngagementInsight table
ALTER TABLE "EngagementInsight" RENAME COLUMN "insightId" TO "id";

-- StudentMemory table
ALTER TABLE "StudentMemory" RENAME COLUMN "memoryId" TO "id";

-- ContentResource table
ALTER TABLE "ContentResource" RENAME COLUMN "resourceId" TO "id";

-- Schedule table
ALTER TABLE "Schedule" RENAME COLUMN "scheduleId" TO "id";

-- ScheduleItem table
ALTER TABLE "ScheduleItem" RENAME COLUMN "itemId" TO "id";

-- StudyPlan table
ALTER TABLE "StudyPlan" RENAME COLUMN "planId" TO "id";

-- StudyPlanItem table
ALTER TABLE "StudyPlanItem" RENAME COLUMN "itemId" TO "id";

-- StudyStreak table
ALTER TABLE "StudyStreak" RENAME COLUMN "streakId" TO "id";

-- UserPreference table
ALTER TABLE "UserPreference" RENAME COLUMN "preferenceId" TO "id";

-- Goal table
ALTER TABLE "Goal" RENAME COLUMN "goalId" TO "id";

-- Review table
ALTER TABLE "Review" RENAME COLUMN "reviewId" TO "id";

-- Recommendation table
ALTER TABLE "Recommendation" RENAME COLUMN "recommendationId" TO "id";

-- SessionFeedback table
ALTER TABLE "SessionFeedback" RENAME COLUMN "feedbackId" TO "id";

-- SessionObservation table
ALTER TABLE "SessionObservation" RENAME COLUMN "observationId" TO "id";

-- LearningPath table
ALTER TABLE "LearningPath" RENAME COLUMN "pathId" TO "id";

-- LearningPathEnrollment table
ALTER TABLE "LearningPathEnrollment" RENAME COLUMN "enrollmentId" TO "id";

-- LearningPathMilestone table
ALTER TABLE "LearningPathMilestone" RENAME COLUMN "milestoneId" TO "id";

-- SupportTicket table
ALTER TABLE "SupportTicket" RENAME COLUMN "ticketId" TO "id";

-- SupportTicketMessage table
ALTER TABLE "SupportTicketMessage" RENAME COLUMN "messageId" TO "id";

-- Referral table
ALTER TABLE "Referral" RENAME COLUMN "referralId" TO "id";

-- ReferralReward table
ALTER TABLE "ReferralReward" RENAME COLUMN "rewardId" TO "id";

-- WebhookEvent table
ALTER TABLE "WebhookEvent" RENAME COLUMN "eventId" TO "id";

-- SystemSetting table
ALTER TABLE "SystemSetting" RENAME COLUMN "settingId" TO "id";

-- DataRetentionLog table
ALTER TABLE "DataRetentionLog" RENAME COLUMN "logId" TO "id";

-- AuditLog table
ALTER TABLE "AuditLog" RENAME COLUMN "auditId" TO "id";
