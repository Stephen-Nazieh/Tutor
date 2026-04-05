import { relations } from 'drizzle-orm'
import {
  user,
  profile,
  tutorApplication,
  adminSession,
  adminAssignment,
  adminRole,
  course,
  courseEnrollment,
  studyGroup,
  studyGroupMember,
  courseLesson,
  courseLessonProgress,
  courseProgress,
  studentPerformance,
  courseShare,
  liveSession,
  sessionParticipant,
  clinic,
  clinicBooking,
  payout,
  userGamification,
  achievement,
  taskSubmission,
  generatedTask,
  feedbackWorkflow,
  familyAccount,
  familyMember,
  familyPayment,
  familyNotification,
  parentActivityLog,
  payment,
  paymentOnPayout,
  quiz,
  quizAttempt,
  quizAssignment,
  conversation,
  directMessage,
  mention,
  tutorFollow,
  lessonSession,
  aITutorEnrollment,
  aIInteractionSession,
  aITutorDailyUsage,
  userActivityLog,
  builderTask,
  builderTaskExtension,
  builderTaskFile,
  builderTaskVersion,
  oneOnOneBookingRequest,
  calendarEvent,
} from './tables'

export const userRelations = relations(user, ({ one, many }) => ({
  profile: one(profile, {
    fields: [user.id],
    references: [profile.userId],
  }),
  tutorApplication: one(tutorApplication, {
    fields: [user.id],
    references: [tutorApplication.userId],
  }),
  adminAssignments: many(adminAssignment),
  adminSessions: many(adminSession),
  courseEnrollments: many(courseEnrollment),
  liveSessionsAsTutor: many(liveSession),
  sessionParticipations: many(sessionParticipant),
  payouts: many(payout),
  achievements: many(achievement),
  gamification: one(userGamification, {
    fields: [user.id],
    references: [userGamification.userId],
  }),
  familyMemberships: many(familyMember),
  conversationsAsParticipant1: many(conversation, { relationName: 'participant1' }),
  conversationsAsParticipant2: many(conversation, { relationName: 'participant2' }),
  sentDirectMessages: many(directMessage),
  mentionsSent: many(mention, { relationName: 'mentioner' }),
  mentionsReceived: many(mention, { relationName: 'mentionee' }),
  tutorFollowers: many(tutorFollow, { relationName: 'tutor' }),
  oneOnOneRequestsAsTutor: many(oneOnOneBookingRequest, { relationName: 'tutorOneOnOneRequests' }),
  oneOnOneRequestsAsStudent: many(oneOnOneBookingRequest, {
    relationName: 'studentOneOnOneRequests',
  }),
  calendarEventsAsTutor: many(calendarEvent, { relationName: 'tutorCalendarEvents' }),
  calendarEventsAsStudent: many(calendarEvent, { relationName: 'studentCalendarEvents' }),
}))

export const profileRelations = relations(profile, ({ one }) => ({
  user: one(user, {
    fields: [profile.userId],
    references: [user.id],
  }),
}))

export const tutorFollowRelations = relations(tutorFollow, ({ one }) => ({
  follower: one(user, {
    fields: [tutorFollow.followerId],
    references: [user.id],
    relationName: 'follower',
  }),
  tutor: one(user, {
    fields: [tutorFollow.tutorId],
    references: [user.id],
    relationName: 'tutor',
  }),
}))

export const tutorApplicationRelations = relations(tutorApplication, ({ one }) => ({
  user: one(user, {
    fields: [tutorApplication.userId],
    references: [user.id],
  }),
}))

export const adminSessionRelations = relations(adminSession, ({ one }) => ({
  admin: one(user, {
    fields: [adminSession.adminId],
    references: [user.id],
  }),
}))

export const adminAssignmentRelations = relations(adminAssignment, ({ one }) => ({
  user: one(user, {
    fields: [adminAssignment.userId],
    references: [user.id],
  }),
  role: one(adminRole, {
    fields: [adminAssignment.roleId],
    references: [adminRole.roleId],
  }),
}))

export const adminRoleRelations = relations(adminRole, ({ many }) => ({
  assignments: many(adminAssignment),
}))

export const courseRelations = relations(course, ({ many }) => ({
  enrollments: many(courseEnrollment),
  lessons: many(courseLesson),
  shares: many(courseShare),
  progress: many(courseProgress),
  studentPerformances: many(studentPerformance),
}))

export const courseLessonRelations = relations(courseLesson, ({ one, many }) => ({
  course: one(course, {
    fields: [courseLesson.courseId],
    references: [course.courseId],
  }),
  progressRecords: many(courseLessonProgress),
}))

export const courseLessonProgressRelations = relations(courseLessonProgress, ({ one }) => ({
  lesson: one(courseLesson, {
    fields: [courseLessonProgress.lessonId],
    references: [courseLesson.lessonId],
  }),
  student: one(user, {
    fields: [courseLessonProgress.studentId],
    references: [user.id],
  }),
}))

export const courseProgressRelations = relations(courseProgress, ({ one }) => ({
  student: one(user, {
    fields: [courseProgress.studentId],
    references: [user.id],
  }),
  course: one(course, {
    fields: [courseProgress.courseId],
    references: [course.courseId],
  }),
}))

export const studentPerformanceRelations = relations(studentPerformance, ({ one }) => ({
  student: one(user, {
    fields: [studentPerformance.studentId],
    references: [user.id],
  }),
  course: one(course, {
    fields: [studentPerformance.courseId],
    references: [course.courseId],
  }),
}))

export const courseEnrollmentRelations = relations(courseEnrollment, ({ one }) => ({
  student: one(user, {
    fields: [courseEnrollment.studentId],
    references: [user.id],
  }),
  course: one(course, {
    fields: [courseEnrollment.courseId],
    references: [course.courseId],
  }),
}))

export const courseShareRelations = relations(courseShare, ({ one }) => ({
  course: one(course, {
    fields: [courseShare.courseId],
    references: [course.courseId],
  }),
  sharedBy: one(user, {
    fields: [courseShare.sharedByTutorId],
    references: [user.id],
  }),
  recipient: one(user, {
    fields: [courseShare.recipientId],
    references: [user.id],
  }),
}))

export const studyGroupRelations = relations(studyGroup, ({ many }) => ({
  members: many(studyGroupMember),
}))

export const studyGroupMemberRelations = relations(studyGroupMember, ({ one }) => ({
  group: one(studyGroup, {
    fields: [studyGroupMember.groupId],
    references: [studyGroup.groupId],
  }),
  user: one(user, {
    fields: [studyGroupMember.studentId],
    references: [user.id],
  }),
}))

export const liveSessionRelations = relations(liveSession, ({ one, many }) => ({
  tutor: one(user, {
    fields: [liveSession.tutorId],
    references: [user.id],
  }),
  participants: many(sessionParticipant),
}))

export const sessionParticipantRelations = relations(sessionParticipant, ({ one }) => ({
  session: one(liveSession, {
    fields: [sessionParticipant.sessionId],
    references: [liveSession.sessionId],
  }),
  student: one(user, {
    fields: [sessionParticipant.studentId],
    references: [user.id],
  }),
}))

export const clinicRelations = relations(clinic, ({ one, many }) => ({
  tutor: one(user, {
    fields: [clinic.tutorId],
    references: [user.id],
  }),
  bookings: many(clinicBooking),
}))

export const clinicBookingRelations = relations(clinicBooking, ({ one }) => ({
  clinic: one(clinic, {
    fields: [clinicBooking.clinicId],
    references: [clinic.clinicId],
  }),
  student: one(user, {
    fields: [clinicBooking.studentId],
    references: [user.id],
  }),
}))

export const payoutRelations = relations(payout, ({ one, many }) => ({
  tutor: one(user, {
    fields: [payout.tutorId],
    references: [user.id],
  }),
  payments: many(paymentOnPayout),
}))

export const paymentOnPayoutRelations = relations(paymentOnPayout, ({ one }) => ({
  payout: one(payout, {
    fields: [paymentOnPayout.payoutId],
    references: [payout.payoutId],
  }),
  payment: one(payment, {
    fields: [paymentOnPayout.paymentId],
    references: [payment.paymentId],
  }),
}))

export const achievementRelations = relations(achievement, ({ one }) => ({
  user: one(user, {
    fields: [achievement.userId],
    references: [user.id],
  }),
}))

export const userGamificationRelations = relations(userGamification, ({ one }) => ({
  user: one(user, {
    fields: [userGamification.userId],
    references: [user.id],
  }),
}))

export const familyAccountRelations = relations(familyAccount, ({ many }) => ({
  members: many(familyMember),
  payments: many(familyPayment),
  notifications: many(familyNotification),
  activities: many(parentActivityLog),
}))

export const familyMemberRelations = relations(familyMember, ({ one }) => ({
  familyAccount: one(familyAccount, {
    fields: [familyMember.familyAccountId],
    references: [familyAccount.familyAccountId],
  }),
  user: one(user, {
    fields: [familyMember.userId],
    references: [user.id],
  }),
}))

export const familyPaymentRelations = relations(familyPayment, ({ one }) => ({
  parent: one(familyAccount, {
    fields: [familyPayment.parentId],
    references: [familyAccount.familyAccountId],
  }),
}))

export const familyNotificationRelations = relations(familyNotification, ({ one }) => ({
  parent: one(familyAccount, {
    fields: [familyNotification.parentId],
    references: [familyAccount.familyAccountId],
  }),
}))

export const parentActivityLogRelations = relations(parentActivityLog, ({ one }) => ({
  parent: one(familyAccount, {
    fields: [parentActivityLog.parentId],
    references: [familyAccount.familyAccountId],
  }),
}))

export const paymentRelations = relations(payment, ({ one }) => ({
  booking: one(clinicBooking, {
    fields: [payment.bookingId],
    references: [clinicBooking.bookingId],
  }),
  enrollment: one(courseEnrollment, {
    fields: [payment.enrollmentId],
    references: [courseEnrollment.enrollmentId],
  }),
}))

export const quizRelations = relations(quiz, ({ one, many }) => ({
  tutor: one(user, {
    fields: [quiz.tutorId],
    references: [user.id],
  }),
  course: one(course, {
    fields: [quiz.courseId],
    references: [course.courseId],
  }),
  lesson: one(courseLesson, {
    fields: [quiz.lessonId],
    references: [courseLesson.lessonId],
  }),
  attempts: many(quizAttempt),
  assignments: many(quizAssignment),
}))

export const quizAttemptRelations = relations(quizAttempt, ({ one }) => ({
  quiz: one(quiz, {
    fields: [quizAttempt.quizId],
    references: [quiz.quizId],
  }),
  student: one(user, {
    fields: [quizAttempt.studentId],
    references: [user.id],
  }),
  assignment: one(quizAssignment, {
    fields: [quizAttempt.assignmentId],
    references: [quizAssignment.assignmentId],
  }),
}))

export const quizAssignmentRelations = relations(quizAssignment, ({ one, many }) => ({
  quiz: one(quiz, {
    fields: [quizAssignment.quizId],
    references: [quiz.quizId],
  }),
  tutor: one(user, {
    fields: [quizAssignment.assignedByTutorId],
    references: [user.id],
  }),
  attempts: many(quizAttempt),
}))
export const conversationRelations = relations(conversation, ({ one, many }) => ({
  participant1: one(user, {
    fields: [conversation.participant1Id],
    references: [user.id],
    relationName: 'participant1',
  }),
  participant2: one(user, {
    fields: [conversation.participant2Id],
    references: [user.id],
    relationName: 'participant2',
  }),
  messages: many(directMessage),
}))

export const directMessageRelations = relations(directMessage, ({ one }) => ({
  conversation: one(conversation, {
    fields: [directMessage.conversationId],
    references: [conversation.conversationId],
  }),
  sender: one(user, {
    fields: [directMessage.senderId],
    references: [user.id],
  }),
}))

export const mentionRelations = relations(mention, ({ one }) => ({
  message: one(directMessage, {
    fields: [mention.messageId],
    references: [directMessage.directMessageId],
  }),
  mentioner: one(user, {
    fields: [mention.mentionerId],
    references: [user.id],
    relationName: 'mentioner',
  }),
  mentionee: one(user, {
    fields: [mention.mentioneeId],
    references: [user.id],
    relationName: 'mentionee',
  }),
}))

export const generatedTaskRelations = relations(generatedTask, ({ one, many }) => ({
  tutor: one(user, {
    fields: [generatedTask.tutorId],
    references: [user.id],
  }),
  lesson: one(courseLesson, {
    fields: [generatedTask.lessonId],
    references: [courseLesson.lessonId],
  }),
  submissions: many(taskSubmission),
}))

export const taskSubmissionRelations = relations(taskSubmission, ({ one }) => ({
  task: one(generatedTask, {
    fields: [taskSubmission.taskId],
    references: [generatedTask.taskId],
  }),
  student: one(user, {
    fields: [taskSubmission.studentId],
    references: [user.id],
  }),
  feedbackWorkflow: one(feedbackWorkflow, {
    fields: [taskSubmission.submissionId],
    references: [feedbackWorkflow.submissionId],
  }),
}))

export const feedbackWorkflowRelations = relations(feedbackWorkflow, ({ one }) => ({
  submission: one(taskSubmission, {
    fields: [feedbackWorkflow.submissionId],
    references: [taskSubmission.submissionId],
  }),
  student: one(user, {
    fields: [feedbackWorkflow.studentId],
    references: [user.id],
  }),
}))

export const lessonSessionRelations = relations(lessonSession, ({ one }) => ({
  lesson: one(courseLesson, {
    fields: [lessonSession.lessonId],
    references: [courseLesson.lessonId],
  }),
  student: one(user, {
    fields: [lessonSession.studentId],
    references: [user.id],
  }),
}))

export const aITutorEnrollmentRelations = relations(aITutorEnrollment, ({ one }) => ({
  student: one(user, {
    fields: [aITutorEnrollment.studentId],
    references: [user.id],
  }),
}))

export const aIInteractionSessionRelations = relations(aIInteractionSession, ({ one }) => ({
  student: one(user, {
    fields: [aIInteractionSession.studentId],
    references: [user.id],
  }),
}))

export const aITutorDailyUsageRelations = relations(aITutorDailyUsage, ({ one }) => ({
  user: one(user, {
    fields: [aITutorDailyUsage.userId],
    references: [user.id],
  }),
}))

export const userActivityLogRelations = relations(userActivityLog, ({ one }) => ({
  user: one(user, {
    fields: [userActivityLog.userId],
    references: [user.id],
  }),
}))

// ============================================
// TASK BUILDER RELATIONS
// ============================================

export const builderTaskRelations = relations(builderTask, ({ one, many }) => ({
  course: one(course, {
    fields: [builderTask.courseId],
    references: [course.courseId],
  }),
  lesson: one(courseLesson, {
    fields: [builderTask.lessonId],
    references: [courseLesson.lessonId],
  }),
  tutor: one(user, {
    fields: [builderTask.tutorId],
    references: [user.id],
  }),
  extensions: many(builderTaskExtension),
  files: many(builderTaskFile),
  versions: many(builderTaskVersion),
}))

export const builderTaskExtensionRelations = relations(builderTaskExtension, ({ one }) => ({
  task: one(builderTask, {
    fields: [builderTaskExtension.taskId],
    references: [builderTask.taskId],
  }),
}))

export const builderTaskFileRelations = relations(builderTaskFile, ({ one }) => ({
  task: one(builderTask, {
    fields: [builderTaskFile.taskId],
    references: [builderTask.taskId],
  }),
}))

export const builderTaskVersionRelations = relations(builderTaskVersion, ({ one }) => ({
  task: one(builderTask, {
    fields: [builderTaskVersion.taskId],
    references: [builderTask.taskId],
  }),
}))

// ============================================
// CALENDAR & ONE-ON-ONE RELATIONS
// ============================================

export const oneOnOneBookingRequestRelations = relations(oneOnOneBookingRequest, ({ one }) => ({
  tutor: one(user, {
    fields: [oneOnOneBookingRequest.tutorId],
    references: [user.id],
    relationName: 'tutorOneOnOneRequests',
  }),
  student: one(user, {
    fields: [oneOnOneBookingRequest.studentId],
    references: [user.id],
    relationName: 'studentOneOnOneRequests',
  }),
  calendarEvent: one(calendarEvent, {
    fields: [oneOnOneBookingRequest.calendarEventId],
    references: [calendarEvent.eventId],
  }),
}))

export const calendarEventRelations = relations(calendarEvent, ({ one }) => ({
  tutor: one(user, {
    fields: [calendarEvent.tutorId],
    references: [user.id],
    relationName: 'tutorCalendarEvents',
  }),
  student: one(user, {
    fields: [calendarEvent.studentId],
    references: [user.id],
    relationName: 'studentCalendarEvents',
  }),
}))
