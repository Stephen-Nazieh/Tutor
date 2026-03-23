import { relations } from 'drizzle-orm'
import {
  user,
  profile,
  tutorApplication,
  adminSession,
  adminAssignment,
  adminRole,
  curriculum,
  curriculumEnrollment,
  studentCoursePreference,
  studentCoursePreferenceSlot,
  courseBatch,
  studyGroup,
  studyGroupMember,
  curriculumModule,
  curriculumLesson,
  curriculumLessonProgress,
  curriculumProgress,
  studentPerformance,
  curriculumShare,
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
  curriculumEnrollments: many(curriculumEnrollment),
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
  tutorFollows: many(tutorFollow, { relationName: 'follower' }),
  tutorFollowers: many(tutorFollow, { relationName: 'tutor' }),
  studentCoursePreferences: many(studentCoursePreference, { relationName: 'student' }),
  tutorCoursePreferences: many(studentCoursePreference, { relationName: 'tutor' }),
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
    references: [adminRole.id],
  }),
}))

export const adminRoleRelations = relations(adminRole, ({ many }) => ({
  assignments: many(adminAssignment),
}))

export const curriculumRelations = relations(curriculum, ({ many }) => ({
  batches: many(courseBatch),
  enrollments: many(curriculumEnrollment),
  modules: many(curriculumModule),
  shares: many(curriculumShare),
  progress: many(curriculumProgress),
  studentPerformances: many(studentPerformance),
  preferences: many(studentCoursePreference),
}))

export const curriculumModuleRelations = relations(curriculumModule, ({ one, many }) => ({
  curriculum: one(curriculum, {
    fields: [curriculumModule.curriculumId],
    references: [curriculum.id],
  }),
  lessons: many(curriculumLesson),
}))

export const curriculumLessonRelations = relations(curriculumLesson, ({ one, many }) => ({
  module: one(curriculumModule, {
    fields: [curriculumLesson.moduleId],
    references: [curriculumModule.id],
  }),
  progressRecords: many(curriculumLessonProgress),
}))

export const curriculumLessonProgressRelations = relations(curriculumLessonProgress, ({ one }) => ({
  lesson: one(curriculumLesson, {
    fields: [curriculumLessonProgress.lessonId],
    references: [curriculumLesson.id],
  }),
  student: one(user, {
    fields: [curriculumLessonProgress.studentId],
    references: [user.id],
  }),
}))

export const curriculumProgressRelations = relations(curriculumProgress, ({ one }) => ({
  student: one(user, {
    fields: [curriculumProgress.studentId],
    references: [user.id],
  }),
  curriculum: one(curriculum, {
    fields: [curriculumProgress.curriculumId],
    references: [curriculum.id],
  }),
}))

export const studentPerformanceRelations = relations(studentPerformance, ({ one }) => ({
  student: one(user, {
    fields: [studentPerformance.studentId],
    references: [user.id],
  }),
  curriculum: one(curriculum, {
    fields: [studentPerformance.curriculumId],
    references: [curriculum.id],
  }),
}))

export const courseBatchRelations = relations(courseBatch, ({ one, many }) => ({
  curriculum: one(curriculum, {
    fields: [courseBatch.curriculumId],
    references: [curriculum.id],
  }),
  enrollments: many(curriculumEnrollment),
}))

export const curriculumEnrollmentRelations = relations(curriculumEnrollment, ({ one }) => ({
  student: one(user, {
    fields: [curriculumEnrollment.studentId],
    references: [user.id],
  }),
  curriculum: one(curriculum, {
    fields: [curriculumEnrollment.curriculumId],
    references: [curriculum.id],
  }),
  batch: one(courseBatch, {
    fields: [curriculumEnrollment.batchId],
    references: [courseBatch.id],
  }),
}))

export const studentCoursePreferenceRelations = relations(
  studentCoursePreference,
  ({ one, many }) => ({
    student: one(user, {
      fields: [studentCoursePreference.studentId],
      references: [user.id],
      relationName: 'student',
    }),
    tutor: one(user, {
      fields: [studentCoursePreference.tutorId],
      references: [user.id],
      relationName: 'tutor',
    }),
    curriculum: one(curriculum, {
      fields: [studentCoursePreference.curriculumId],
      references: [curriculum.id],
    }),
    slots: many(studentCoursePreferenceSlot),
  })
)

export const studentCoursePreferenceSlotRelations = relations(
  studentCoursePreferenceSlot,
  ({ one }) => ({
    preference: one(studentCoursePreference, {
      fields: [studentCoursePreferenceSlot.preferenceId],
      references: [studentCoursePreference.id],
    }),
  })
)

export const curriculumShareRelations = relations(curriculumShare, ({ one }) => ({
  curriculum: one(curriculum, {
    fields: [curriculumShare.curriculumId],
    references: [curriculum.id],
  }),
  sharedBy: one(user, {
    fields: [curriculumShare.sharedByTutorId],
    references: [user.id],
  }),
  recipient: one(user, {
    fields: [curriculumShare.recipientId],
    references: [user.id],
  }),
}))

export const studyGroupRelations = relations(studyGroup, ({ many }) => ({
  members: many(studyGroupMember),
}))

export const studyGroupMemberRelations = relations(studyGroupMember, ({ one }) => ({
  group: one(studyGroup, {
    fields: [studyGroupMember.groupId],
    references: [studyGroup.id],
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
    references: [liveSession.id],
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
    references: [clinic.id],
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
    references: [payout.id],
  }),
  payment: one(payment, {
    fields: [paymentOnPayout.paymentId],
    references: [payment.id],
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
    references: [familyAccount.id],
  }),
  user: one(user, {
    fields: [familyMember.userId],
    references: [user.id],
  }),
}))

export const familyPaymentRelations = relations(familyPayment, ({ one }) => ({
  parent: one(familyAccount, {
    fields: [familyPayment.parentId],
    references: [familyAccount.id],
  }),
}))

export const familyNotificationRelations = relations(familyNotification, ({ one }) => ({
  parent: one(familyAccount, {
    fields: [familyNotification.parentId],
    references: [familyAccount.id],
  }),
}))

export const parentActivityLogRelations = relations(parentActivityLog, ({ one }) => ({
  parent: one(familyAccount, {
    fields: [parentActivityLog.parentId],
    references: [familyAccount.id],
  }),
}))

export const paymentRelations = relations(payment, ({ one }) => ({
  booking: one(clinicBooking, {
    fields: [payment.bookingId],
    references: [clinicBooking.id],
  }),
  enrollment: one(curriculumEnrollment, {
    fields: [payment.enrollmentId],
    references: [curriculumEnrollment.id],
  }),
}))

export const quizRelations = relations(quiz, ({ one, many }) => ({
  tutor: one(user, {
    fields: [quiz.tutorId],
    references: [user.id],
  }),
  curriculum: one(curriculum, {
    fields: [quiz.curriculumId],
    references: [curriculum.id],
  }),
  lesson: one(curriculumLesson, {
    fields: [quiz.lessonId],
    references: [curriculumLesson.id],
  }),
  attempts: many(quizAttempt),
  assignments: many(quizAssignment),
}))

export const quizAttemptRelations = relations(quizAttempt, ({ one }) => ({
  quiz: one(quiz, {
    fields: [quizAttempt.quizId],
    references: [quiz.id],
  }),
  student: one(user, {
    fields: [quizAttempt.studentId],
    references: [user.id],
  }),
  assignment: one(quizAssignment, {
    fields: [quizAttempt.assignmentId],
    references: [quizAssignment.id],
  }),
}))

export const quizAssignmentRelations = relations(quizAssignment, ({ one, many }) => ({
  quiz: one(quiz, {
    fields: [quizAssignment.quizId],
    references: [quiz.id],
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
    references: [conversation.id],
  }),
  sender: one(user, {
    fields: [directMessage.senderId],
    references: [user.id],
  }),
}))

export const mentionRelations = relations(mention, ({ one }) => ({
  message: one(directMessage, {
    fields: [mention.messageId],
    references: [directMessage.id],
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
  lesson: one(curriculumLesson, {
    fields: [generatedTask.lessonId],
    references: [curriculumLesson.id],
  }),
  submissions: many(taskSubmission),
}))

export const taskSubmissionRelations = relations(taskSubmission, ({ one }) => ({
  task: one(generatedTask, {
    fields: [taskSubmission.taskId],
    references: [generatedTask.id],
  }),
  student: one(user, {
    fields: [taskSubmission.studentId],
    references: [user.id],
  }),
  feedbackWorkflow: one(feedbackWorkflow, {
    fields: [taskSubmission.id],
    references: [feedbackWorkflow.submissionId],
  }),
}))

export const feedbackWorkflowRelations = relations(feedbackWorkflow, ({ one }) => ({
  submission: one(taskSubmission, {
    fields: [feedbackWorkflow.submissionId],
    references: [taskSubmission.id],
  }),
  student: one(user, {
    fields: [feedbackWorkflow.studentId],
    references: [user.id],
  }),
}))

export const lessonSessionRelations = relations(lessonSession, ({ one }) => ({
  lesson: one(curriculumLesson, {
    fields: [lessonSession.lessonId],
    references: [curriculumLesson.id],
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
  curriculum: one(curriculum, {
    fields: [builderTask.curriculumId],
    references: [curriculum.id],
  }),
  lesson: one(curriculumLesson, {
    fields: [builderTask.lessonId],
    references: [curriculumLesson.id],
  }),
  module: one(curriculumModule, {
    fields: [builderTask.moduleId],
    references: [curriculumModule.id],
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
    references: [builderTask.id],
  }),
}))

export const builderTaskFileRelations = relations(builderTaskFile, ({ one }) => ({
  task: one(builderTask, {
    fields: [builderTaskFile.taskId],
    references: [builderTask.id],
  }),
}))

export const builderTaskVersionRelations = relations(builderTaskVersion, ({ one }) => ({
  task: one(builderTask, {
    fields: [builderTaskVersion.taskId],
    references: [builderTask.id],
  }),
}))
