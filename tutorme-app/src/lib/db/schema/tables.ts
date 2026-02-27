/**
 * Drizzle table definitions (generated from Prisma schema).
 * Do not edit by hand; re-run: node scripts/prisma-to-drizzle-schema.mjs
 */
import { pgTable, text, integer, boolean, timestamp, jsonb, doublePrecision, uniqueIndex, index } from 'drizzle-orm/pg-core'
import * as enums from './enums'

export const user = pgTable('User', {
  id: text('id').primaryKey().notNull(),
  email: text('email').notNull().unique(),
  password: text('password'),
  role: enums.roleEnum('role').notNull(),
  emailVerified: timestamp('emailVerified', { withTimezone: true }),
  image: text('image'),
  createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updatedAt', { withTimezone: true }).notNull().$onUpdate(() => new Date())
})

export const account = pgTable('Account', {
  id: text('id').primaryKey().notNull(),
  userId: text('userId').notNull(),
  type: text('type').notNull(),
  provider: text('provider').notNull(),
  providerAccountId: text('providerAccountId').notNull(),
  refresh_token: text('refresh_token'),
  access_token: text('access_token'),
  expires_at: integer('expires_at'),
  token_type: text('token_type'),
  scope: text('scope'),
  id_token: text('id_token'),
  session_state: text('session_state')
}, (table) => ({
  Account_userId_idx: index('Account_userId_idx').on(table.userId),
  Account_provider_providerAccountId_key: uniqueIndex('Account_provider_providerAccountId_key').on(table.provider, table.providerAccountId)
}))

export const profile = pgTable('Profile', {
  id: text('id').primaryKey().notNull(),
  userId: text('userId').notNull().unique(),
  name: text('name'),
  username: text('username').unique(),
  bio: text('bio'),
  avatarUrl: text('avatarUrl'),
  dateOfBirth: timestamp('dateOfBirth', { withTimezone: true }),
  timezone: text('timezone').notNull(),
  emailNotifications: boolean('emailNotifications').notNull(),
  smsNotifications: boolean('smsNotifications').notNull(),
  gradeLevel: text('gradeLevel'),
  studentUniqueId: text('studentUniqueId').unique(),
  subjectsOfInterest: text('subjectsOfInterest').array().notNull(),
  preferredLanguages: text('preferredLanguages').array().notNull(),
  learningGoals: text('learningGoals').array().notNull(),
  tosAccepted: boolean('tosAccepted').notNull(),
  tosAcceptedAt: timestamp('tosAcceptedAt', { withTimezone: true }),
  organizationName: text('organizationName'),
  isOnboarded: boolean('isOnboarded').notNull(),
  hourlyRate: doublePrecision('hourlyRate'),
  specialties: text('specialties').array().notNull(),
  credentials: text('credentials'),
  availability: jsonb('availability'),
  paidClassesEnabled: boolean('paidClassesEnabled').notNull(),
  paymentGatewayPreference: text('paymentGatewayPreference'),
  currency: text('currency'),
  createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updatedAt', { withTimezone: true }).notNull().$onUpdate(() => new Date())
})

export const curriculumCatalog = pgTable('CurriculumCatalog', {
  id: text('id').primaryKey().notNull(),
  subject: text('subject').notNull(),
  name: text('name').notNull(),
  code: text('code'),
  createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow()
}, (table) => ({
  CurriculumCatalog_subject_idx: index('CurriculumCatalog_subject_idx').on(table.subject),
  CurriculumCatalog_subject_name_key: uniqueIndex('CurriculumCatalog_subject_name_key').on(table.subject, table.name)
}))

export const curriculum = pgTable('Curriculum', {
  id: text('id').primaryKey().notNull(),
  name: text('name').notNull(),
  description: text('description'),
  subject: text('subject').notNull(),
  gradeLevel: text('gradeLevel'),
  difficulty: text('difficulty').notNull(),
  estimatedHours: integer('estimatedHours').notNull(),
  isPublished: boolean('isPublished').notNull(),
  createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updatedAt', { withTimezone: true }).notNull().$onUpdate(() => new Date()),
  creatorId: text('creatorId'),
  isLiveOnline: boolean('isLiveOnline').notNull(),
  languageOfInstruction: text('languageOfInstruction'),
  price: doublePrecision('price'),
  currency: text('currency'),
  curriculumSource: text('curriculumSource'),
  outlineSource: text('outlineSource'),
  schedule: jsonb('schedule'),
  courseMaterials: jsonb('courseMaterials'),
  coursePitch: text('coursePitch')
}, (table) => ({
  Curriculum_subject_idx: index('Curriculum_subject_idx').on(table.subject),
  Curriculum_isPublished_idx: index('Curriculum_isPublished_idx').on(table.isPublished),
  Curriculum_creatorId_idx: index('Curriculum_creatorId_idx').on(table.creatorId)
}))

export const curriculumShare = pgTable('CurriculumShare', {
  id: text('id').primaryKey().notNull(),
  curriculumId: text('curriculumId').notNull(),
  sharedByTutorId: text('sharedByTutorId').notNull(),
  recipientId: text('recipientId').notNull(),
  message: text('message').notNull(),
  isPublic: boolean('isPublic').notNull(),
  sharedAt: timestamp('sharedAt', { withTimezone: true }).notNull().defaultNow()
}, (table) => ({
  CurriculumShare_sharedByTutorId_idx: index('CurriculumShare_sharedByTutorId_idx').on(table.sharedByTutorId),
  CurriculumShare_recipientId_idx: index('CurriculumShare_recipientId_idx').on(table.recipientId),
  CurriculumShare_curriculumId_idx: index('CurriculumShare_curriculumId_idx').on(table.curriculumId),
  CurriculumShare_curriculumId_recipientId_key: uniqueIndex('CurriculumShare_curriculumId_recipientId_key').on(table.curriculumId, table.recipientId)
}))

export const curriculumModule = pgTable('CurriculumModule', {
  id: text('id').primaryKey().notNull(),
  curriculumId: text('curriculumId').notNull(),
  title: text('title').notNull(),
  description: text('description'),
  order: integer('order').notNull(),
  builderData: jsonb('builderData')
}, (table) => ({
  CurriculumModule_curriculumId_idx: index('CurriculumModule_curriculumId_idx').on(table.curriculumId),
  CurriculumModule_order_idx: index('CurriculumModule_order_idx').on(table.order)
}))

export const curriculumLesson = pgTable('CurriculumLesson', {
  id: text('id').primaryKey().notNull(),
  moduleId: text('moduleId').notNull(),
  title: text('title').notNull(),
  description: text('description'),
  duration: integer('duration').notNull(),
  difficulty: text('difficulty').notNull(),
  order: integer('order').notNull(),
  learningObjectives: text('learningObjectives').array().notNull(),
  teachingPoints: text('teachingPoints').array().notNull(),
  keyConcepts: text('keyConcepts').array().notNull(),
  examples: jsonb('examples'),
  practiceProblems: jsonb('practiceProblems'),
  commonMisconceptions: text('commonMisconceptions').array().notNull(),
  prerequisiteLessonIds: text('prerequisiteLessonIds').array().notNull(),
  builderData: jsonb('builderData')
}, (table) => ({
  CurriculumLesson_moduleId_idx: index('CurriculumLesson_moduleId_idx').on(table.moduleId),
  CurriculumLesson_order_idx: index('CurriculumLesson_order_idx').on(table.order)
}))

export const lessonSession = pgTable('LessonSession', {
  id: text('id').primaryKey().notNull(),
  studentId: text('studentId').notNull(),
  lessonId: text('lessonId').notNull(),
  status: text('status').notNull(),
  currentSection: text('currentSection').notNull(),
  conceptMastery: jsonb('conceptMastery').notNull(),
  misconceptions: text('misconceptions').array().notNull(),
  sessionContext: jsonb('sessionContext'),
  whiteboardItems: text('whiteboardItems').array().notNull(),
  startedAt: timestamp('startedAt', { withTimezone: true }).notNull().defaultNow(),
  lastActivityAt: timestamp('lastActivityAt', { withTimezone: true }).notNull().$onUpdate(() => new Date()),
  completedAt: timestamp('completedAt', { withTimezone: true })
}, (table) => ({
  LessonSession_studentId_idx: index('LessonSession_studentId_idx').on(table.studentId),
  LessonSession_lessonId_idx: index('LessonSession_lessonId_idx').on(table.lessonId),
  LessonSession_studentId_lessonId_key: uniqueIndex('LessonSession_studentId_lessonId_key').on(table.studentId, table.lessonId)
}))

export const curriculumLessonProgress = pgTable('CurriculumLessonProgress', {
  id: text('id').primaryKey().notNull(),
  lessonId: text('lessonId').notNull(),
  studentId: text('studentId').notNull(),
  status: text('status').notNull(),
  currentSection: text('currentSection').notNull(),
  score: integer('score'),
  completedAt: timestamp('completedAt', { withTimezone: true }),
  updatedAt: timestamp('updatedAt', { withTimezone: true }).notNull().$onUpdate(() => new Date())
}, (table) => ({
  CurriculumLessonProgress_studentId_idx: index('CurriculumLessonProgress_studentId_idx').on(table.studentId),
  CurriculumLessonProgress_lessonId_studentId_key: uniqueIndex('CurriculumLessonProgress_lessonId_studentId_key').on(table.lessonId, table.studentId)
}))

export const curriculumEnrollment = pgTable('CurriculumEnrollment', {
  id: text('id').primaryKey().notNull(),
  studentId: text('studentId').notNull(),
  curriculumId: text('curriculumId').notNull(),
  batchId: text('batchId'),
  enrolledAt: timestamp('enrolledAt', { withTimezone: true }).notNull().defaultNow(),
  completedAt: timestamp('completedAt', { withTimezone: true }),
  lastActivity: timestamp('lastActivity', { withTimezone: true }).notNull().defaultNow(),
  lessonsCompleted: integer('lessonsCompleted').notNull(),
  enrollmentSource: text('enrollmentSource')
}, (table) => ({
  CurriculumEnrollment_studentId_idx: index('CurriculumEnrollment_studentId_idx').on(table.studentId),
  CurriculumEnrollment_batchId_idx: index('CurriculumEnrollment_batchId_idx').on(table.batchId),
  CurriculumEnrollment_studentId_curriculumId_key: uniqueIndex('CurriculumEnrollment_studentId_curriculumId_key').on(table.studentId, table.curriculumId)
}))

export const courseBatch = pgTable('CourseBatch', {
  id: text('id').primaryKey().notNull(),
  curriculumId: text('curriculumId').notNull(),
  name: text('name').notNull(),
  startDate: timestamp('startDate', { withTimezone: true }),
  order: integer('order').notNull(),
  difficulty: text('difficulty'),
  schedule: jsonb('schedule'),
  price: doublePrecision('price'),
  currency: text('currency'),
  languageOfInstruction: text('languageOfInstruction'),
  isLive: boolean('isLive').notNull(),
  meetingUrl: text('meetingUrl'),
  maxStudents: integer('maxStudents').notNull()
}, (table) => ({
  CourseBatch_curriculumId_idx: index('CourseBatch_curriculumId_idx').on(table.curriculumId)
}))

export const curriculumProgress = pgTable('CurriculumProgress', {
  id: text('id').primaryKey().notNull(),
  studentId: text('studentId').notNull(),
  curriculumId: text('curriculumId').notNull(),
  lessonsCompleted: integer('lessonsCompleted').notNull(),
  totalLessons: integer('totalLessons').notNull(),
  currentLessonId: text('currentLessonId'),
  averageScore: doublePrecision('averageScore'),
  isCompleted: boolean('isCompleted').notNull(),
  startedAt: timestamp('startedAt', { withTimezone: true }).notNull().defaultNow(),
  completedAt: timestamp('completedAt', { withTimezone: true })
}, (table) => ({
  CurriculumProgress_studentId_idx: index('CurriculumProgress_studentId_idx').on(table.studentId),
  CurriculumProgress_studentId_curriculumId_key: uniqueIndex('CurriculumProgress_studentId_curriculumId_key').on(table.studentId, table.curriculumId)
}))

export const studentPerformance = pgTable('StudentPerformance', {
  id: text('id').primaryKey().notNull(),
  studentId: text('studentId').notNull(),
  curriculumId: text('curriculumId'),
  averageScore: doublePrecision('averageScore').notNull(),
  completionRate: doublePrecision('completionRate').notNull(),
  engagementScore: doublePrecision('engagementScore').notNull(),
  attendanceRate: doublePrecision('attendanceRate').notNull(),
  participationRate: doublePrecision('participationRate').notNull(),
  strengths: jsonb('strengths').notNull(),
  weaknesses: jsonb('weaknesses').notNull(),
  taskHistory: jsonb('taskHistory').notNull(),
  commonMistakes: jsonb('commonMistakes').notNull(),
  skillBreakdown: jsonb('skillBreakdown').notNull(),
  cluster: text('cluster').notNull(),
  learningStyle: text('learningStyle'),
  pace: text('pace').notNull(),
  recommendedPeers: jsonb('recommendedPeers').notNull(),
  updatedAt: timestamp('updatedAt', { withTimezone: true }).notNull().$onUpdate(() => new Date()),
  createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow()
}, (table) => ({
  StudentPerformance_studentId_idx: index('StudentPerformance_studentId_idx').on(table.studentId),
  StudentPerformance_curriculumId_idx: index('StudentPerformance_curriculumId_idx').on(table.curriculumId),
  StudentPerformance_cluster_idx: index('StudentPerformance_cluster_idx').on(table.cluster),
  StudentPerformance_studentId_curriculumId_key: uniqueIndex('StudentPerformance_studentId_curriculumId_key').on(table.studentId, table.curriculumId)
}))

export const taskSubmission = pgTable('TaskSubmission', {
  id: text('id').primaryKey().notNull(),
  taskId: text('taskId').notNull(),
  studentId: text('studentId').notNull(),
  answers: jsonb('answers').notNull(),
  timeSpent: integer('timeSpent').notNull(),
  attempts: integer('attempts').notNull(),
  questionResults: jsonb('questionResults'),
  score: doublePrecision('score'),
  maxScore: integer('maxScore').notNull(),
  status: text('status').notNull(),
  aiFeedback: jsonb('aiFeedback'),
  tutorFeedback: text('tutorFeedback'),
  tutorApproved: boolean('tutorApproved').notNull(),
  submittedAt: timestamp('submittedAt', { withTimezone: true }).notNull().defaultNow(),
  gradedAt: timestamp('gradedAt', { withTimezone: true })
}, (table) => ({
  TaskSubmission_studentId_idx: index('TaskSubmission_studentId_idx').on(table.studentId),
  TaskSubmission_taskId_idx: index('TaskSubmission_taskId_idx').on(table.taskId),
  TaskSubmission_taskId_studentId_key: uniqueIndex('TaskSubmission_taskId_studentId_key').on(table.taskId, table.studentId)
}))

export const feedbackWorkflow = pgTable('FeedbackWorkflow', {
  id: text('id').primaryKey().notNull(),
  submissionId: text('submissionId').notNull().unique(),
  studentId: text('studentId').notNull(),
  aiScore: doublePrecision('aiScore'),
  aiComments: text('aiComments'),
  aiStrengths: jsonb('aiStrengths').notNull(),
  aiImprovements: jsonb('aiImprovements').notNull(),
  aiResources: jsonb('aiResources').notNull(),
  status: text('status').notNull(),
  modifiedScore: doublePrecision('modifiedScore'),
  modifiedComments: text('modifiedComments'),
  addedNotes: text('addedNotes'),
  approvedAt: timestamp('approvedAt', { withTimezone: true }),
  approvedBy: text('approvedBy'),
  autoApproved: boolean('autoApproved').notNull(),
  createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updatedAt', { withTimezone: true }).notNull().$onUpdate(() => new Date())
}, (table) => ({
  FeedbackWorkflow_studentId_idx: index('FeedbackWorkflow_studentId_idx').on(table.studentId),
  FeedbackWorkflow_status_idx: index('FeedbackWorkflow_status_idx').on(table.status)
}))

export const generatedTask = pgTable('GeneratedTask', {
  id: text('id').primaryKey().notNull(),
  tutorId: text('tutorId').notNull(),
  roomId: text('roomId'),
  title: text('title').notNull(),
  description: text('description').notNull(),
  type: text('type').notNull(),
  difficulty: text('difficulty').notNull(),
  questions: jsonb('questions').notNull(),
  distributionMode: text('distributionMode').notNull(),
  assignments: jsonb('assignments').notNull(),
  documentSource: text('documentSource'),
  status: text('status').notNull(),
  createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow(),
  assignedAt: timestamp('assignedAt', { withTimezone: true }),
  lessonId: text('lessonId'),
  batchId: text('batchId'),
  dueDate: timestamp('dueDate', { withTimezone: true }),
  maxScore: integer('maxScore').notNull(),
  timeLimitMinutes: integer('timeLimitMinutes'),
  enforceTimeLimit: boolean('enforceTimeLimit').notNull(),
  enforceDueDate: boolean('enforceDueDate').notNull(),
  maxAttempts: integer('maxAttempts').notNull()
}, (table) => ({
  GeneratedTask_tutorId_idx: index('GeneratedTask_tutorId_idx').on(table.tutorId),
  GeneratedTask_roomId_idx: index('GeneratedTask_roomId_idx').on(table.roomId),
  GeneratedTask_status_idx: index('GeneratedTask_status_idx').on(table.status),
  GeneratedTask_lessonId_idx: index('GeneratedTask_lessonId_idx').on(table.lessonId),
  GeneratedTask_batchId_idx: index('GeneratedTask_batchId_idx').on(table.batchId)
}))

export const breakoutSession = pgTable('BreakoutSession', {
  id: text('id').primaryKey().notNull(),
  mainRoomId: text('mainRoomId').notNull(),
  tutorId: text('tutorId').notNull(),
  roomCount: integer('roomCount').notNull(),
  participantsPerRoom: integer('participantsPerRoom').notNull(),
  distributionMode: text('distributionMode').notNull(),
  timeLimit: integer('timeLimit').notNull(),
  aiAssistantEnabled: boolean('aiAssistantEnabled').notNull(),
  status: text('status').notNull(),
  startedAt: timestamp('startedAt', { withTimezone: true }),
  endedAt: timestamp('endedAt', { withTimezone: true }),
  createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow()
}, (table) => ({
  BreakoutSession_mainRoomId_idx: index('BreakoutSession_mainRoomId_idx').on(table.mainRoomId),
  BreakoutSession_tutorId_idx: index('BreakoutSession_tutorId_idx').on(table.tutorId),
  BreakoutSession_status_idx: index('BreakoutSession_status_idx').on(table.status)
}))

export const breakoutRoom = pgTable('BreakoutRoom', {
  id: text('id').primaryKey().notNull(),
  sessionId: text('sessionId').notNull(),
  name: text('name').notNull(),
  aiEnabled: boolean('aiEnabled').notNull(),
  aiMode: text('aiMode').notNull(),
  assignedTaskId: text('assignedTaskId'),
  status: text('status').notNull(),
  endsAt: timestamp('endsAt', { withTimezone: true }),
  aiNotes: jsonb('aiNotes').notNull(),
  alerts: jsonb('alerts').notNull(),
  createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow()
}, (table) => ({
  BreakoutRoom_sessionId_idx: index('BreakoutRoom_sessionId_idx').on(table.sessionId),
  BreakoutRoom_status_idx: index('BreakoutRoom_status_idx').on(table.status)
}))

export const breakoutRoomAssignment = pgTable('BreakoutRoomAssignment', {
  id: text('id').primaryKey().notNull(),
  roomId: text('roomId').notNull(),
  studentId: text('studentId').notNull(),
  joinedAt: timestamp('joinedAt', { withTimezone: true }).notNull().defaultNow(),
  leftAt: timestamp('leftAt', { withTimezone: true })
}, (table) => ({
  BreakoutRoomAssignment_studentId_idx: index('BreakoutRoomAssignment_studentId_idx').on(table.studentId),
  BreakoutRoomAssignment_roomId_studentId_key: uniqueIndex('BreakoutRoomAssignment_roomId_studentId_key').on(table.roomId, table.studentId)
}))

export const aITutorEnrollment = pgTable('AITutorEnrollment', {
  id: text('id').primaryKey().notNull(),
  studentId: text('studentId').notNull(),
  subjectCode: text('subjectCode').notNull(),
  enrolledAt: timestamp('enrolledAt', { withTimezone: true }).notNull().defaultNow(),
  lastSessionAt: timestamp('lastSessionAt', { withTimezone: true }),
  totalSessions: integer('totalSessions').notNull(),
  totalMinutes: integer('totalMinutes').notNull(),
  status: text('status').notNull()
}, (table) => ({
  AITutorEnrollment_studentId_idx: index('AITutorEnrollment_studentId_idx').on(table.studentId),
  AITutorEnrollment_studentId_subjectCode_key: uniqueIndex('AITutorEnrollment_studentId_subjectCode_key').on(table.studentId, table.subjectCode)
}))

export const aIInteractionSession = pgTable('AIInteractionSession', {
  id: text('id').primaryKey().notNull(),
  studentId: text('studentId').notNull(),
  subjectCode: text('subjectCode').notNull(),
  startedAt: timestamp('startedAt', { withTimezone: true }).notNull().defaultNow(),
  endedAt: timestamp('endedAt', { withTimezone: true }),
  messageCount: integer('messageCount').notNull(),
  topicsCovered: text('topicsCovered').array().notNull(),
  summary: text('summary')
}, (table) => ({
  AIInteractionSession_studentId_idx: index('AIInteractionSession_studentId_idx').on(table.studentId),
  AIInteractionSession_startedAt_idx: index('AIInteractionSession_startedAt_idx').on(table.startedAt)
}))

export const aITutorDailyUsage = pgTable('AITutorDailyUsage', {
  id: text('id').primaryKey().notNull(),
  userId: text('userId').notNull(),
  date: timestamp('date', { withTimezone: true }).notNull().defaultNow(),
  sessionCount: integer('sessionCount').notNull(),
  messageCount: integer('messageCount').notNull(),
  minutesUsed: integer('minutesUsed').notNull()
}, (table) => ({
  AITutorDailyUsage_userId_idx: index('AITutorDailyUsage_userId_idx').on(table.userId),
  AITutorDailyUsage_userId_date_key: uniqueIndex('AITutorDailyUsage_userId_date_key').on(table.userId, table.date)
}))

export const aITutorSubscription = pgTable('AITutorSubscription', {
  id: text('id').primaryKey().notNull(),
  userId: text('userId').notNull().unique(),
  tier: enums.tierEnum('tier').notNull(),
  dailySessions: integer('dailySessions').notNull(),
  dailyMessages: integer('dailyMessages').notNull(),
  startedAt: timestamp('startedAt', { withTimezone: true }).notNull().defaultNow(),
  expiresAt: timestamp('expiresAt', { withTimezone: true }),
  isActive: boolean('isActive').notNull()
})

export const contentItem = pgTable('ContentItem', {
  id: text('id').primaryKey().notNull(),
  title: text('title').notNull(),
  description: text('description'),
  subject: text('subject').notNull(),
  type: text('type').notNull(),
  url: text('url'),
  thumbnailUrl: text('thumbnailUrl'),
  duration: integer('duration'),
  difficulty: text('difficulty').notNull(),
  isPublished: boolean('isPublished').notNull(),
  transcript: text('transcript'),
  videoVariants: jsonb('videoVariants'),
  uploadStatus: text('uploadStatus'),
  createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updatedAt', { withTimezone: true }).notNull().$onUpdate(() => new Date())
}, (table) => ({
  ContentItem_subject_idx: index('ContentItem_subject_idx').on(table.subject),
  ContentItem_isPublished_idx: index('ContentItem_isPublished_idx').on(table.isPublished)
}))

export const videoWatchEvent = pgTable('VideoWatchEvent', {
  id: text('id').primaryKey().notNull(),
  contentId: text('contentId').notNull(),
  studentId: text('studentId').notNull(),
  eventType: text('eventType').notNull(),
  videoSeconds: doublePrecision('videoSeconds').notNull(),
  createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow(),
  metadata: jsonb('metadata')
}, (table) => ({
  VideoWatchEvent_contentId_idx: index('VideoWatchEvent_contentId_idx').on(table.contentId),
  VideoWatchEvent_studentId_idx: index('VideoWatchEvent_studentId_idx').on(table.studentId),
  VideoWatchEvent_contentId_studentId_idx: index('VideoWatchEvent_contentId_studentId_idx').on(table.contentId, table.studentId)
}))

export const contentQuizCheckpoint = pgTable('ContentQuizCheckpoint', {
  id: text('id').primaryKey().notNull(),
  contentId: text('contentId').notNull(),
  videoTimestampSec: integer('videoTimestampSec').notNull(),
  title: text('title'),
  questions: jsonb('questions').notNull(),
  createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updatedAt', { withTimezone: true }).notNull().$onUpdate(() => new Date())
}, (table) => ({
  ContentQuizCheckpoint_contentId_idx: index('ContentQuizCheckpoint_contentId_idx').on(table.contentId),
  ContentQuizCheckpoint_contentId_videoTimestampSec_key: uniqueIndex('ContentQuizCheckpoint_contentId_videoTimestampSec_key').on(table.contentId, table.videoTimestampSec)
}))

export const contentProgress = pgTable('ContentProgress', {
  id: text('id').primaryKey().notNull(),
  contentId: text('contentId').notNull(),
  studentId: text('studentId').notNull(),
  progress: integer('progress').notNull(),
  completed: boolean('completed').notNull(),
  lastPosition: integer('lastPosition'),
  updatedAt: timestamp('updatedAt', { withTimezone: true }).notNull().$onUpdate(() => new Date())
}, (table) => ({
  ContentProgress_studentId_idx: index('ContentProgress_studentId_idx').on(table.studentId),
  ContentProgress_contentId_studentId_key: uniqueIndex('ContentProgress_contentId_studentId_key').on(table.contentId, table.studentId)
}))

export const reviewSchedule = pgTable('ReviewSchedule', {
  id: text('id').primaryKey().notNull(),
  studentId: text('studentId').notNull(),
  contentId: text('contentId').notNull(),
  lastReviewed: timestamp('lastReviewed', { withTimezone: true }).notNull().defaultNow(),
  nextReview: timestamp('nextReview', { withTimezone: true }).notNull(),
  interval: integer('interval').notNull(),
  easeFactor: doublePrecision('easeFactor').notNull(),
  stability: doublePrecision('stability').notNull(),
  repetitionCount: integer('repetitionCount').notNull(),
  performance: doublePrecision('performance').notNull(),
  createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updatedAt', { withTimezone: true }).notNull().$onUpdate(() => new Date())
}, (table) => ({
  ReviewSchedule_studentId_idx: index('ReviewSchedule_studentId_idx').on(table.studentId),
  ReviewSchedule_nextReview_idx: index('ReviewSchedule_nextReview_idx').on(table.nextReview),
  ReviewSchedule_studentId_contentId_key: uniqueIndex('ReviewSchedule_studentId_contentId_key').on(table.studentId, table.contentId)
}))

export const quizAttempt = pgTable('QuizAttempt', {
  id: text('id').primaryKey().notNull(),
  studentId: text('studentId').notNull(),
  quizId: text('quizId').notNull(),
  assignmentId: text('assignmentId'),
  answers: jsonb('answers').notNull(),
  score: integer('score').notNull(),
  maxScore: integer('maxScore').notNull(),
  completedAt: timestamp('completedAt', { withTimezone: true }).notNull().defaultNow(),
  timeSpent: integer('timeSpent').notNull(),
  questionResults: jsonb('questionResults'),
  feedback: text('feedback'),
  status: text('status').notNull(),
  attemptNumber: integer('attemptNumber').notNull(),
  startedAt: timestamp('startedAt', { withTimezone: true }).notNull().defaultNow()
}, (table) => ({
  QuizAttempt_studentId_idx: index('QuizAttempt_studentId_idx').on(table.studentId),
  QuizAttempt_quizId_idx: index('QuizAttempt_quizId_idx').on(table.quizId),
  QuizAttempt_assignmentId_idx: index('QuizAttempt_assignmentId_idx').on(table.assignmentId),
  QuizAttempt_studentId_quizId_idx: index('QuizAttempt_studentId_quizId_idx').on(table.studentId, table.quizId)
}))

export const questionBankItem = pgTable('QuestionBankItem', {
  id: text('id').primaryKey().notNull(),
  tutorId: text('tutorId').notNull(),
  type: text('type').notNull(),
  question: text('question').notNull(),
  options: jsonb('options'),
  correctAnswer: jsonb('correctAnswer'),
  explanation: text('explanation'),
  hint: text('hint'),
  points: integer('points').notNull(),
  difficulty: text('difficulty').notNull(),
  tags: text('tags').array().notNull(),
  subject: text('subject'),
  curriculumId: text('curriculumId'),
  lessonId: text('lessonId'),
  isPublic: boolean('isPublic').notNull(),
  usageCount: integer('usageCount').notNull(),
  createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updatedAt', { withTimezone: true }).notNull().$onUpdate(() => new Date())
}, (table) => ({
  QuestionBankItem_tutorId_idx: index('QuestionBankItem_tutorId_idx').on(table.tutorId),
  QuestionBankItem_type_idx: index('QuestionBankItem_type_idx').on(table.type),
  QuestionBankItem_difficulty_idx: index('QuestionBankItem_difficulty_idx').on(table.difficulty),
  QuestionBankItem_subject_idx: index('QuestionBankItem_subject_idx').on(table.subject),
  QuestionBankItem_tags_idx: index('QuestionBankItem_tags_idx').on(table.tags)
}))

export const quiz = pgTable('Quiz', {
  id: text('id').primaryKey().notNull(),
  tutorId: text('tutorId').notNull(),
  title: text('title').notNull(),
  description: text('description'),
  type: text('type').notNull(),
  status: text('status').notNull(),
  timeLimit: integer('timeLimit'),
  allowedAttempts: integer('allowedAttempts').notNull(),
  shuffleQuestions: boolean('shuffleQuestions').notNull(),
  shuffleOptions: boolean('shuffleOptions').notNull(),
  showCorrectAnswers: text('showCorrectAnswers').notNull(),
  passingScore: integer('passingScore'),
  questions: jsonb('questions').notNull(),
  totalPoints: integer('totalPoints').notNull(),
  tags: text('tags').array().notNull(),
  startDate: timestamp('startDate', { withTimezone: true }),
  dueDate: timestamp('dueDate', { withTimezone: true }),
  curriculumId: text('curriculumId'),
  lessonId: text('lessonId'),
  createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updatedAt', { withTimezone: true }).notNull().$onUpdate(() => new Date())
}, (table) => ({
  Quiz_tutorId_idx: index('Quiz_tutorId_idx').on(table.tutorId),
  Quiz_status_idx: index('Quiz_status_idx').on(table.status),
  Quiz_type_idx: index('Quiz_type_idx').on(table.type),
  Quiz_curriculumId_idx: index('Quiz_curriculumId_idx').on(table.curriculumId),
  Quiz_lessonId_idx: index('Quiz_lessonId_idx').on(table.lessonId)
}))

export const quizAssignment = pgTable('QuizAssignment', {
  id: text('id').primaryKey().notNull(),
  quizId: text('quizId').notNull(),
  assignedByTutorId: text('assignedByTutorId').notNull(),
  assignedToType: text('assignedToType').notNull(),
  assignedToId: text('assignedToId'),
  assignedToAll: boolean('assignedToAll').notNull(),
  assignedAt: timestamp('assignedAt', { withTimezone: true }).notNull().defaultNow(),
  dueDate: timestamp('dueDate', { withTimezone: true }),
  isActive: boolean('isActive').notNull()
}, (table) => ({
  QuizAssignment_quizId_idx: index('QuizAssignment_quizId_idx').on(table.quizId),
  QuizAssignment_assignedByTutorId_idx: index('QuizAssignment_assignedByTutorId_idx').on(table.assignedByTutorId),
  QuizAssignment_assignedToId_idx: index('QuizAssignment_assignedToId_idx').on(table.assignedToId),
  QuizAssignment_isActive_idx: index('QuizAssignment_isActive_idx').on(table.isActive)
}))

export const note = pgTable('Note', {
  id: text('id').primaryKey().notNull(),
  contentId: text('contentId').notNull(),
  studentId: text('studentId').notNull(),
  content: text('content').notNull(),
  timestamp: integer('timestamp').notNull(),
  createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow()
}, (table) => ({
  Note_contentId_idx: index('Note_contentId_idx').on(table.contentId),
  Note_studentId_idx: index('Note_studentId_idx').on(table.studentId)
}))

export const bookmark = pgTable('Bookmark', {
  id: text('id').primaryKey().notNull(),
  contentId: text('contentId').notNull(),
  studentId: text('studentId').notNull(),
  createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow()
}, (table) => ({
  Bookmark_studentId_idx: index('Bookmark_studentId_idx').on(table.studentId),
  Bookmark_contentId_studentId_key: uniqueIndex('Bookmark_contentId_studentId_key').on(table.contentId, table.studentId)
}))

export const userGamification = pgTable('UserGamification', {
  id: text('id').primaryKey().notNull(),
  userId: text('userId').notNull().unique(),
  level: integer('level').notNull(),
  xp: integer('xp').notNull(),
  streakDays: integer('streakDays').notNull(),
  longestStreak: integer('longestStreak').notNull(),
  lastLogin: timestamp('lastLogin', { withTimezone: true }).notNull().defaultNow(),
  lastActiveDate: timestamp('lastActiveDate', { withTimezone: true }),
  totalStudyMinutes: integer('totalStudyMinutes').notNull(),
  grammarScore: integer('grammarScore').notNull(),
  vocabularyScore: integer('vocabularyScore').notNull(),
  speakingScore: integer('speakingScore').notNull(),
  listeningScore: integer('listeningScore').notNull(),
  confidenceScore: integer('confidenceScore').notNull(),
  fluencyScore: integer('fluencyScore').notNull(),
  unlockedWorlds: text('unlockedWorlds').array().notNull()
})

export const achievement = pgTable('Achievement', {
  id: text('id').primaryKey().notNull(),
  userId: text('userId').notNull(),
  type: text('type').notNull(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  unlockedAt: timestamp('unlockedAt', { withTimezone: true }).notNull().defaultNow(),
  xpAwarded: integer('xpAwarded').notNull()
}, (table) => ({
  Achievement_userId_idx: index('Achievement_userId_idx').on(table.userId)
}))

export const mission = pgTable('Mission', {
  id: text('id').primaryKey().notNull(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  type: text('type').notNull(),
  xpReward: integer('xpReward').notNull(),
  requirement: jsonb('requirement').notNull(),
  isActive: boolean('isActive').notNull()
})

export const missionProgress = pgTable('MissionProgress', {
  id: text('id').primaryKey().notNull(),
  missionId: text('missionId').notNull(),
  studentId: text('studentId').notNull(),
  progress: integer('progress').notNull(),
  completed: boolean('completed').notNull(),
  completedAt: timestamp('completedAt', { withTimezone: true })
}, (table) => ({
  MissionProgress_studentId_idx: index('MissionProgress_studentId_idx').on(table.studentId),
  MissionProgress_missionId_studentId_key: uniqueIndex('MissionProgress_missionId_studentId_key').on(table.missionId, table.studentId)
}))

export const userDailyQuest = pgTable('UserDailyQuest', {
  id: text('id').primaryKey().notNull(),
  userId: text('userId').notNull(),
  missionId: text('missionId').notNull(),
  date: timestamp('date', { withTimezone: true }).notNull().defaultNow(),
  completed: boolean('completed').notNull()
}, (table) => ({
  UserDailyQuest_userId_idx: index('UserDailyQuest_userId_idx').on(table.userId),
  UserDailyQuest_userId_missionId_date_key: uniqueIndex('UserDailyQuest_userId_missionId_date_key').on(table.userId, table.missionId, table.date)
}))

export const badge = pgTable('Badge', {
  id: text('id').primaryKey().notNull(),
  key: text('key').notNull().unique(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  icon: text('icon').notNull(),
  color: text('color').notNull(),
  category: text('category').notNull(),
  rarity: text('rarity').notNull(),
  xpBonus: integer('xpBonus').notNull(),
  requirement: jsonb('requirement').notNull(),
  isSecret: boolean('isSecret').notNull(),
  order: integer('order').notNull(),
  createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow()
})

export const userBadge = pgTable('UserBadge', {
  id: text('id').primaryKey().notNull(),
  userId: text('userId').notNull(),
  badgeId: text('badgeId').notNull(),
  earnedAt: timestamp('earnedAt', { withTimezone: true }).notNull().defaultNow(),
  progress: integer('progress').notNull()
}, (table) => ({
  UserBadge_userId_idx: index('UserBadge_userId_idx').on(table.userId),
  UserBadge_badgeId_idx: index('UserBadge_badgeId_idx').on(table.badgeId),
  UserBadge_userId_badgeId_key: uniqueIndex('UserBadge_userId_badgeId_key').on(table.userId, table.badgeId)
}))

export const leaderboardEntry = pgTable('LeaderboardEntry', {
  id: text('id').primaryKey().notNull(),
  userId: text('userId').notNull(),
  type: text('type').notNull(),
  periodStart: timestamp('periodStart', { withTimezone: true }),
  periodEnd: timestamp('periodEnd', { withTimezone: true }),
  score: integer('score').notNull(),
  rank: integer('rank')
}, (table) => ({
  LeaderboardEntry_type_score_idx: index('LeaderboardEntry_type_score_idx').on(table.type, table.score),
  LeaderboardEntry_userId_idx: index('LeaderboardEntry_userId_idx').on(table.userId),
  LeaderboardEntry_userId_type_periodStart_key: uniqueIndex('LeaderboardEntry_userId_type_periodStart_key').on(table.userId, table.type, table.periodStart)
}))

export const liveSession = pgTable('LiveSession', {
  id: text('id').primaryKey().notNull(),
  tutorId: text('tutorId').notNull(),
  curriculumId: text('curriculumId'),
  title: text('title').notNull(),
  subject: text('subject').notNull(),
  description: text('description'),
  gradeLevel: text('gradeLevel'),
  type: enums.sessionTypeEnum('type').notNull(),
  scheduledAt: timestamp('scheduledAt', { withTimezone: true }),
  startedAt: timestamp('startedAt', { withTimezone: true }),
  endedAt: timestamp('endedAt', { withTimezone: true }),
  maxStudents: integer('maxStudents').notNull(),
  status: text('status').notNull(),
  roomId: text('roomId'),
  roomUrl: text('roomUrl'),
  recordingUrl: text('recordingUrl'),
  recordingAvailableAt: timestamp('recordingAvailableAt', { withTimezone: true })
}, (table) => ({
  LiveSession_tutorId_idx: index('LiveSession_tutorId_idx').on(table.tutorId),
  LiveSession_curriculumId_idx: index('LiveSession_curriculumId_idx').on(table.curriculumId),
  LiveSession_status_idx: index('LiveSession_status_idx').on(table.status),
  LiveSession_scheduledAt_idx: index('LiveSession_scheduledAt_idx').on(table.scheduledAt)
}))

export const sessionReplayArtifact = pgTable('SessionReplayArtifact', {
  id: text('id').primaryKey().notNull(),
  sessionId: text('sessionId').notNull().unique(),
  tutorId: text('tutorId').notNull(),
  recordingUrl: text('recordingUrl'),
  transcript: text('transcript'),
  summary: text('summary'),
  summaryJson: jsonb('summaryJson'),
  status: text('status').notNull(),
  startedAt: timestamp('startedAt', { withTimezone: true }),
  endedAt: timestamp('endedAt', { withTimezone: true }),
  generatedAt: timestamp('generatedAt', { withTimezone: true }),
  createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updatedAt', { withTimezone: true }).notNull().$onUpdate(() => new Date())
}, (table) => ({
  SessionReplayArtifact_tutorId_idx: index('SessionReplayArtifact_tutorId_idx').on(table.tutorId),
  SessionReplayArtifact_status_idx: index('SessionReplayArtifact_status_idx').on(table.status),
  SessionReplayArtifact_generatedAt_idx: index('SessionReplayArtifact_generatedAt_idx').on(table.generatedAt)
}))

export const sessionParticipant = pgTable('SessionParticipant', {
  id: text('id').primaryKey().notNull(),
  sessionId: text('sessionId').notNull(),
  studentId: text('studentId').notNull(),
  joinedAt: timestamp('joinedAt', { withTimezone: true }).notNull().defaultNow(),
  leftAt: timestamp('leftAt', { withTimezone: true })
}, (table) => ({
  SessionParticipant_studentId_idx: index('SessionParticipant_studentId_idx').on(table.studentId),
  SessionParticipant_sessionId_studentId_key: uniqueIndex('SessionParticipant_sessionId_studentId_key').on(table.sessionId, table.studentId)
}))

export const poll = pgTable('Poll', {
  id: text('id').primaryKey().notNull(),
  sessionId: text('sessionId').notNull(),
  tutorId: text('tutorId').notNull(),
  question: text('question').notNull(),
  type: enums.pollTypeEnum('type').notNull(),
  isAnonymous: boolean('isAnonymous').notNull(),
  allowMultiple: boolean('allowMultiple').notNull(),
  timeLimit: integer('timeLimit'),
  showResults: boolean('showResults').notNull(),
  correctOptionId: text('correctOptionId'),
  status: enums.pollStatusEnum('status').notNull(),
  startedAt: timestamp('startedAt', { withTimezone: true }),
  endedAt: timestamp('endedAt', { withTimezone: true }),
  totalResponses: integer('totalResponses').notNull(),
  createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updatedAt', { withTimezone: true }).notNull().$onUpdate(() => new Date())
}, (table) => ({
  Poll_sessionId_idx: index('Poll_sessionId_idx').on(table.sessionId),
  Poll_tutorId_idx: index('Poll_tutorId_idx').on(table.tutorId),
  Poll_status_idx: index('Poll_status_idx').on(table.status),
  Poll_createdAt_idx: index('Poll_createdAt_idx').on(table.createdAt)
}))

export const pollOption = pgTable('PollOption', {
  id: text('id').primaryKey().notNull(),
  pollId: text('pollId').notNull(),
  label: text('label').notNull(),
  text: text('text').notNull(),
  color: text('color'),
  responseCount: integer('responseCount').notNull(),
  percentage: doublePrecision('percentage').notNull()
}, (table) => ({
  PollOption_pollId_idx: index('PollOption_pollId_idx').on(table.pollId)
}))

export const pollResponse = pgTable('PollResponse', {
  id: text('id').primaryKey().notNull(),
  pollId: text('pollId').notNull(),
  respondentHash: text('respondentHash'),
  optionIds: text('optionIds').array().notNull(),
  rating: integer('rating'),
  textAnswer: text('textAnswer'),
  studentId: text('studentId'),
  createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow()
}, (table) => ({
  PollResponse_pollId_idx: index('PollResponse_pollId_idx').on(table.pollId),
  PollResponse_studentId_idx: index('PollResponse_studentId_idx').on(table.studentId),
  PollResponse_pollId_respondentHash_key: uniqueIndex('PollResponse_pollId_respondentHash_key').on(table.pollId, table.respondentHash)
}))

export const message = pgTable('Message', {
  id: text('id').primaryKey().notNull(),
  sessionId: text('sessionId').notNull(),
  userId: text('userId').notNull(),
  content: text('content').notNull(),
  type: text('type').notNull(),
  source: enums.messageSourceEnum('source').notNull(),
  timestamp: timestamp('timestamp', { withTimezone: true }).notNull().defaultNow()
}, (table) => ({
  Message_sessionId_idx: index('Message_sessionId_idx').on(table.sessionId),
  Message_userId_idx: index('Message_userId_idx').on(table.userId)
}))

export const conversation = pgTable('Conversation', {
  id: text('id').primaryKey().notNull(),
  participant1Id: text('participant1Id').notNull(),
  participant2Id: text('participant2Id').notNull(),
  createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updatedAt', { withTimezone: true }).notNull().$onUpdate(() => new Date())
}, (table) => ({
  Conversation_participant1Id_idx: index('Conversation_participant1Id_idx').on(table.participant1Id),
  Conversation_participant2Id_idx: index('Conversation_participant2Id_idx').on(table.participant2Id),
  Conversation_updatedAt_idx: index('Conversation_updatedAt_idx').on(table.updatedAt),
  Conversation_participant1Id_participant2Id_key: uniqueIndex('Conversation_participant1Id_participant2Id_key').on(table.participant1Id, table.participant2Id)
}))

export const directMessage = pgTable('DirectMessage', {
  id: text('id').primaryKey().notNull(),
  conversationId: text('conversationId').notNull(),
  senderId: text('senderId').notNull(),
  content: text('content').notNull(),
  type: text('type').notNull(),
  attachmentUrl: text('attachmentUrl'),
  read: boolean('read').notNull(),
  readAt: timestamp('readAt', { withTimezone: true }),
  createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow()
}, (table) => ({
  DirectMessage_conversationId_idx: index('DirectMessage_conversationId_idx').on(table.conversationId),
  DirectMessage_senderId_idx: index('DirectMessage_senderId_idx').on(table.senderId),
  DirectMessage_createdAt_idx: index('DirectMessage_createdAt_idx').on(table.createdAt)
}))

export const notification = pgTable('Notification', {
  id: text('id').primaryKey().notNull(),
  userId: text('userId').notNull(),
  type: text('type').notNull(),
  title: text('title').notNull(),
  message: text('message').notNull(),
  data: jsonb('data'),
  read: boolean('read').notNull(),
  readAt: timestamp('readAt', { withTimezone: true }),
  actionUrl: text('actionUrl'),
  createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow()
}, (table) => ({
  Notification_userId_idx: index('Notification_userId_idx').on(table.userId),
  Notification_read_idx: index('Notification_read_idx').on(table.read),
  Notification_createdAt_idx: index('Notification_createdAt_idx').on(table.createdAt),
  Notification_type_idx: index('Notification_type_idx').on(table.type),
  idx_notification_user_read_created: index('idx_notification_user_read_created').on(table.userId, table.read, table.createdAt),
  idx_notification_user_type_created: index('idx_notification_user_type_created').on(table.userId, table.type, table.createdAt)
}))

export const notificationPreference = pgTable('NotificationPreference', {
  id: text('id').primaryKey().notNull(),
  userId: text('userId').notNull().unique(),
  emailEnabled: boolean('emailEnabled').notNull(),
  pushEnabled: boolean('pushEnabled').notNull(),
  inAppEnabled: boolean('inAppEnabled').notNull(),
  channelOverrides: jsonb('channelOverrides').notNull(),
  quietHoursStart: text('quietHoursStart'),
  quietHoursEnd: text('quietHoursEnd'),
  timezone: text('timezone').notNull(),
  emailDigest: text('emailDigest').notNull(),
  updatedAt: timestamp('updatedAt', { withTimezone: true }).notNull().$onUpdate(() => new Date())
})

export const aIAssistantSession = pgTable('AIAssistantSession', {
  id: text('id').primaryKey().notNull(),
  tutorId: text('tutorId').notNull(),
  title: text('title').notNull(),
  context: text('context'),
  status: text('status').notNull(),
  createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updatedAt', { withTimezone: true }).notNull().$onUpdate(() => new Date())
}, (table) => ({
  AIAssistantSession_tutorId_idx: index('AIAssistantSession_tutorId_idx').on(table.tutorId),
  AIAssistantSession_status_idx: index('AIAssistantSession_status_idx').on(table.status),
  AIAssistantSession_updatedAt_idx: index('AIAssistantSession_updatedAt_idx').on(table.updatedAt)
}))

export const aIAssistantMessage = pgTable('AIAssistantMessage', {
  id: text('id').primaryKey().notNull(),
  sessionId: text('sessionId').notNull(),
  role: text('role').notNull(),
  content: text('content').notNull(),
  metadata: jsonb('metadata'),
  createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow()
}, (table) => ({
  AIAssistantMessage_sessionId_idx: index('AIAssistantMessage_sessionId_idx').on(table.sessionId),
  AIAssistantMessage_createdAt_idx: index('AIAssistantMessage_createdAt_idx').on(table.createdAt)
}))

export const aIAssistantInsight = pgTable('AIAssistantInsight', {
  id: text('id').primaryKey().notNull(),
  sessionId: text('sessionId').notNull(),
  type: text('type').notNull(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  relatedData: jsonb('relatedData'),
  applied: boolean('applied').notNull(),
  createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow()
}, (table) => ({
  AIAssistantInsight_sessionId_idx: index('AIAssistantInsight_sessionId_idx').on(table.sessionId),
  AIAssistantInsight_type_idx: index('AIAssistantInsight_type_idx').on(table.type),
  AIAssistantInsight_createdAt_idx: index('AIAssistantInsight_createdAt_idx').on(table.createdAt)
}))

export const clinic = pgTable('Clinic', {
  id: text('id').primaryKey().notNull(),
  title: text('title').notNull(),
  subject: text('subject').notNull(),
  description: text('description'),
  tutorId: text('tutorId').notNull(),
  startTime: timestamp('startTime', { withTimezone: true }).notNull(),
  duration: integer('duration').notNull(),
  maxStudents: integer('maxStudents').notNull(),
  status: text('status').notNull(),
  roomUrl: text('roomUrl'),
  roomId: text('roomId'),
  requiresPayment: boolean('requiresPayment').notNull(),
  createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updatedAt', { withTimezone: true }).notNull().$onUpdate(() => new Date())
}, (table) => ({
  Clinic_startTime_idx: index('Clinic_startTime_idx').on(table.startTime),
  Clinic_status_idx: index('Clinic_status_idx').on(table.status)
}))

export const clinicBooking = pgTable('ClinicBooking', {
  id: text('id').primaryKey().notNull(),
  clinicId: text('clinicId').notNull(),
  studentId: text('studentId').notNull(),
  bookedAt: timestamp('bookedAt', { withTimezone: true }).notNull().defaultNow(),
  attended: boolean('attended').notNull(),
  requiresPayment: boolean('requiresPayment').notNull()
}, (table) => ({
  ClinicBooking_studentId_idx: index('ClinicBooking_studentId_idx').on(table.studentId),
  ClinicBooking_clinicId_studentId_key: uniqueIndex('ClinicBooking_clinicId_studentId_key').on(table.clinicId, table.studentId)
}))

export const payment = pgTable('Payment', {
  id: text('id').primaryKey().notNull(),
  bookingId: text('bookingId').unique(),
  amount: doublePrecision('amount').notNull(),
  currency: text('currency').notNull(),
  status: enums.paymentStatusEnum('status').notNull(),
  gateway: enums.paymentGatewayEnum('gateway').notNull(),
  gatewayPaymentId: text('gatewayPaymentId'),
  gatewayCheckoutUrl: text('gatewayCheckoutUrl'),
  paidAt: timestamp('paidAt', { withTimezone: true }),
  refundedAt: timestamp('refundedAt', { withTimezone: true }),
  metadata: jsonb('metadata'),
  createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updatedAt', { withTimezone: true }).notNull().$onUpdate(() => new Date()),
  enrollmentId: text('enrollmentId'),
  tutorId: text('tutorId')
}, (table) => ({
  Payment_status_idx: index('Payment_status_idx').on(table.status),
  Payment_gateway_idx: index('Payment_gateway_idx').on(table.gateway),
  Payment_gatewayPaymentId_idx: index('Payment_gatewayPaymentId_idx').on(table.gatewayPaymentId),
  Payment_tutorId_idx: index('Payment_tutorId_idx').on(table.tutorId),
  idx_payment_tutor_status_created: index('idx_payment_tutor_status_created').on(table.tutorId, table.status, table.createdAt),
  idx_payment_enrollment_status: index('idx_payment_enrollment_status').on(table.enrollmentId, table.status)
}))

export const refund = pgTable('Refund', {
  id: text('id').primaryKey().notNull(),
  paymentId: text('paymentId').notNull(),
  amount: doublePrecision('amount').notNull(),
  reason: text('reason'),
  status: enums.refundStatusEnum('status').notNull(),
  gatewayRefundId: text('gatewayRefundId'),
  processedAt: timestamp('processedAt', { withTimezone: true }),
  createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updatedAt', { withTimezone: true }).notNull().$onUpdate(() => new Date())
}, (table) => ({
  Refund_paymentId_idx: index('Refund_paymentId_idx').on(table.paymentId)
}))

export const webhookEvent = pgTable('WebhookEvent', {
  id: text('id').primaryKey().notNull(),
  paymentId: text('paymentId'),
  gateway: enums.paymentGatewayEnum('gateway').notNull(),
  eventType: text('eventType').notNull(),
  payload: jsonb('payload').notNull(),
  processed: boolean('processed').notNull(),
  processedAt: timestamp('processedAt', { withTimezone: true }),
  createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow()
}, (table) => ({
  WebhookEvent_gateway_eventType_idx: index('WebhookEvent_gateway_eventType_idx').on(table.gateway, table.eventType),
  WebhookEvent_processed_idx: index('WebhookEvent_processed_idx').on(table.processed)
}))

export const payout = pgTable('Payout', {
  id: text('id').primaryKey().notNull(),
  tutorId: text('tutorId').notNull(),
  amount: doublePrecision('amount').notNull(),
  currency: text('currency').notNull(),
  status: text('status').notNull(),
  method: text('method').notNull(),
  details: jsonb('details'),
  notes: text('notes'),
  requestedAt: timestamp('requestedAt', { withTimezone: true }).notNull().defaultNow(),
  processedAt: timestamp('processedAt', { withTimezone: true }),
  completedAt: timestamp('completedAt', { withTimezone: true }),
  transactionReference: text('transactionReference')
}, (table) => ({
  Payout_tutorId_idx: index('Payout_tutorId_idx').on(table.tutorId),
  Payout_status_idx: index('Payout_status_idx').on(table.status),
  Payout_requestedAt_idx: index('Payout_requestedAt_idx').on(table.requestedAt)
}))

export const paymentOnPayout = pgTable('PaymentOnPayout', {
  id: text('id').primaryKey().notNull(),
  paymentId: text('paymentId').notNull(),
  payoutId: text('payoutId').notNull(),
  amount: doublePrecision('amount').notNull(),
  createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow()
}, (table) => ({
  PaymentOnPayout_payoutId_idx: index('PaymentOnPayout_payoutId_idx').on(table.payoutId),
  PaymentOnPayout_paymentId_idx: index('PaymentOnPayout_paymentId_idx').on(table.paymentId),
  PaymentOnPayout_paymentId_payoutId_key: uniqueIndex('PaymentOnPayout_paymentId_payoutId_key').on(table.paymentId, table.payoutId)
}))

export const platformRevenue = pgTable('PlatformRevenue', {
  id: text('id').primaryKey().notNull(),
  paymentId: text('paymentId').notNull(),
  amount: doublePrecision('amount').notNull(),
  month: text('month').notNull(),
  createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow()
}, (table) => ({
  PlatformRevenue_paymentId_idx: index('PlatformRevenue_paymentId_idx').on(table.paymentId),
  PlatformRevenue_month_idx: index('PlatformRevenue_month_idx').on(table.month),
  PlatformRevenue_createdAt_idx: index('PlatformRevenue_createdAt_idx').on(table.createdAt)
}))

export const studyGroup = pgTable('StudyGroup', {
  id: text('id').primaryKey().notNull(),
  name: text('name').notNull(),
  subject: text('subject').notNull(),
  description: text('description'),
  maxMembers: integer('maxMembers').notNull(),
  createdBy: text('createdBy').notNull(),
  isActive: boolean('isActive').notNull(),
  createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updatedAt', { withTimezone: true }).notNull().$onUpdate(() => new Date())
}, (table) => ({
  StudyGroup_subject_idx: index('StudyGroup_subject_idx').on(table.subject),
  StudyGroup_isActive_idx: index('StudyGroup_isActive_idx').on(table.isActive)
}))

export const studyGroupMember = pgTable('StudyGroupMember', {
  id: text('id').primaryKey().notNull(),
  groupId: text('groupId').notNull(),
  studentId: text('studentId').notNull(),
  joinedAt: timestamp('joinedAt', { withTimezone: true }).notNull().defaultNow(),
  role: text('role').notNull()
}, (table) => ({
  StudyGroupMember_studentId_idx: index('StudyGroupMember_studentId_idx').on(table.studentId),
  StudyGroupMember_groupId_studentId_key: uniqueIndex('StudyGroupMember_groupId_studentId_key').on(table.groupId, table.studentId)
}))

export const userActivityLog = pgTable('UserActivityLog', {
  id: text('id').primaryKey().notNull(),
  userId: text('userId').notNull(),
  action: text('action').notNull(),
  metadata: jsonb('metadata'),
  createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow()
}, (table) => ({
  UserActivityLog_userId_idx: index('UserActivityLog_userId_idx').on(table.userId),
  UserActivityLog_createdAt_idx: index('UserActivityLog_createdAt_idx').on(table.createdAt),
  idx_user_activity_user_created: index('idx_user_activity_user_created').on(table.userId, table.createdAt)
}))

export const apiKey = pgTable('ApiKey', {
  id: text('id').primaryKey().notNull(),
  name: text('name').notNull(),
  keyHash: text('keyHash').notNull(),
  createdById: text('createdById'),
  createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow(),
  lastUsedAt: timestamp('lastUsedAt', { withTimezone: true })
}, (table) => ({
  ApiKey_keyHash_idx: index('ApiKey_keyHash_idx').on(table.keyHash)
}))

export const securityEvent = pgTable('SecurityEvent', {
  id: text('id').primaryKey().notNull(),
  eventType: text('eventType').notNull(),
  ip: text('ip'),
  metadata: jsonb('metadata'),
  createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow(),
  action: text('action'),
  userId: text('userId'),
  actorId: text('actorId'),
  targetType: text('targetType'),
  targetId: text('targetId'),
  severity: text('severity'),
  description: text('description'),
  originIp: text('originIp'),
  userAgent: text('userAgent'),
  countryCode: text('countryCode'),
  region: text('region'),
  city: text('city'),
  deviceId: text('deviceId'),
  sessionId: text('sessionId'),
  correlationId: text('correlationId'),
  occurredAt: timestamp('occurredAt', { withTimezone: true })
}, (table) => ({
  SecurityEvent_eventType_idx: index('SecurityEvent_eventType_idx').on(table.eventType),
  SecurityEvent_action_idx: index('SecurityEvent_action_idx').on(table.action),
  SecurityEvent_severity_idx: index('SecurityEvent_severity_idx').on(table.severity),
  SecurityEvent_createdAt_idx: index('SecurityEvent_createdAt_idx').on(table.createdAt),
  SecurityEvent_occurredAt_idx: index('SecurityEvent_occurredAt_idx').on(table.occurredAt),
  SecurityEvent_ip_idx: index('SecurityEvent_ip_idx').on(table.ip),
  SecurityEvent_userId_idx: index('SecurityEvent_userId_idx').on(table.userId)
}))

export const performanceMetric = pgTable('PerformanceMetric', {
  id: text('id').primaryKey().notNull(),
  name: text('name').notNull(),
  metricValue: doublePrecision('metric_value').notNull(),
  unit: text('unit').notNull(),
  tags: jsonb('tags'),
  userId: text('userId'),
  sessionId: text('sessionId'),
  timestamp: timestamp('timestamp', { withTimezone: true }).notNull().defaultNow()
}, (table) => ({
  PerformanceMetric_name_idx: index('PerformanceMetric_name_idx').on(table.name),
  PerformanceMetric_timestamp_idx: index('PerformanceMetric_timestamp_idx').on(table.timestamp),
  PerformanceMetric_userId_idx: index('PerformanceMetric_userId_idx').on(table.userId)
}))

export const performanceAlert = pgTable('PerformanceAlert', {
  id: text('id').primaryKey().notNull(),
  type: text('type').notNull(),
  severity: text('severity').notNull(),
  message: text('message').notNull(),
  metric: text('metric'),
  threshold: doublePrecision('threshold'),
  currentValue: doublePrecision('currentValue'),
  timestamp: timestamp('timestamp', { withTimezone: true }).notNull().defaultNow(),
  resolved: boolean('resolved').notNull(),
  resolvedAt: timestamp('resolvedAt', { withTimezone: true })
}, (table) => ({
  PerformanceAlert_type_idx: index('PerformanceAlert_type_idx').on(table.type),
  PerformanceAlert_severity_idx: index('PerformanceAlert_severity_idx').on(table.severity),
  PerformanceAlert_resolved_idx: index('PerformanceAlert_resolved_idx').on(table.resolved),
  PerformanceAlert_timestamp_idx: index('PerformanceAlert_timestamp_idx').on(table.timestamp)
}))

// Session engagement & insights (optional feature tables)
export const engagementSnapshot = pgTable('EngagementSnapshot', {
  id: text('id').primaryKey().notNull(),
  sessionId: text('sessionId').notNull(),
  studentId: text('studentId').notNull(),
  engagementScore: doublePrecision('engagementScore').notNull(),
  attentionLevel: text('attentionLevel').notNull(),
  comprehensionEstimate: doublePrecision('comprehensionEstimate'),
  participationCount: integer('participationCount').notNull(),
  chatMessages: integer('chatMessages').notNull(),
  whiteboardInteractions: integer('whiteboardInteractions').notNull(),
  struggleIndicators: integer('struggleIndicators').notNull(),
  timestamp: timestamp('timestamp', { withTimezone: true }).notNull().defaultNow()
}, (table) => ({
  EngagementSnapshot_sessionId_idx: index('EngagementSnapshot_sessionId_idx').on(table.sessionId),
  EngagementSnapshot_studentId_idx: index('EngagementSnapshot_studentId_idx').on(table.studentId)
}))

export const sessionEngagementSummary = pgTable('SessionEngagementSummary', {
  sessionId: text('sessionId').primaryKey().notNull(),
  averageEngagement: doublePrecision('averageEngagement'),
  peakEngagement: doublePrecision('peakEngagement'),
  lowEngagement: doublePrecision('lowEngagement'),
  participationRate: doublePrecision('participationRate'),
  totalChatMessages: integer('totalChatMessages'),
  totalHandRaises: integer('totalHandRaises'),
  timeOnTaskPercentage: doublePrecision('timeOnTaskPercentage')
})

export const postSessionReport = pgTable('PostSessionReport', {
  id: text('id').primaryKey().notNull(),
  sessionId: text('sessionId').notNull(),
  tutorId: text('tutorId').notNull(),
  status: text('status').notNull(),
  keyConcepts: jsonb('keyConcepts').notNull(),
  mainTopics: jsonb('mainTopics').notNull(),
  studentQuestions: jsonb('studentQuestions').notNull(),
  challengingConcepts: jsonb('challengingConcepts').notNull(),
  overallAssessment: text('overallAssessment').notNull(),
  averageEngagement: doublePrecision('averageEngagement').notNull(),
  peakEngagement: doublePrecision('peakEngagement').notNull(),
  lowEngagement: doublePrecision('lowEngagement').notNull(),
  participationRate: doublePrecision('participationRate').notNull(),
  chatActivity: integer('chatActivity').notNull(),
  handRaises: integer('handRaises').notNull(),
  timeOnTask: doublePrecision('timeOnTask').notNull(),
  createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow()
}, (table) => ({
  PostSessionReport_sessionId_idx: index('PostSessionReport_sessionId_idx').on(table.sessionId)
}))

export const studentSessionInsight = pgTable('StudentSessionInsight', {
  id: text('id').primaryKey().notNull(),
  sessionId: text('sessionId').notNull(),
  studentId: text('studentId').notNull(),
  engagement: doublePrecision('engagement').notNull(),
  participation: integer('participation').notNull(),
  questionsAsked: integer('questionsAsked').notNull(),
  timeAwayMinutes: integer('timeAwayMinutes').notNull(),
  flaggedForFollowUp: boolean('flaggedForFollowUp').notNull(),
  followUpReason: text('followUpReason'),
  createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow()
}, (table) => ({
  StudentSessionInsight_sessionId_idx: index('StudentSessionInsight_sessionId_idx').on(table.sessionId)
}))

export const sessionBookmark = pgTable('SessionBookmark', {
  id: text('id').primaryKey().notNull(),
  sessionId: text('sessionId').notNull(),
  timestampSeconds: integer('timestampSeconds').notNull(),
  label: text('label'),
  note: text('note'),
  createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow()
}, (table) => ({
  SessionBookmark_sessionId_idx: index('SessionBookmark_sessionId_idx').on(table.sessionId)
}))

export const resource = pgTable('Resource', {
  id: text('id').primaryKey().notNull(),
  tutorId: text('tutorId').notNull(),
  name: text('name').notNull(),
  description: text('description'),
  type: text('type').notNull(),
  size: integer('size').notNull(),
  mimeType: text('mimeType'),
  url: text('url').notNull(),
  key: text('key').notNull(),
  tags: text('tags').array().notNull(),
  isPublic: boolean('isPublic').notNull(),
  downloadCount: integer('downloadCount').notNull(),
  createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updatedAt', { withTimezone: true }).notNull().$onUpdate(() => new Date())
}, (table) => ({
  Resource_tutorId_idx: index('Resource_tutorId_idx').on(table.tutorId),
  Resource_type_idx: index('Resource_type_idx').on(table.type),
  Resource_tags_idx: index('Resource_tags_idx').on(table.tags),
  Resource_isPublic_idx: index('Resource_isPublic_idx').on(table.isPublic)
}))

export const resourceShare = pgTable('ResourceShare', {
  id: text('id').primaryKey().notNull(),
  resourceId: text('resourceId').notNull(),
  sharedByTutorId: text('sharedByTutorId').notNull(),
  recipientId: text('recipientId'),
  curriculumId: text('curriculumId'),
  sharedWithAll: boolean('sharedWithAll').notNull(),
  message: text('message'),
  createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow()
}, (table) => ({
  ResourceShare_resourceId_idx: index('ResourceShare_resourceId_idx').on(table.resourceId),
  ResourceShare_recipientId_idx: index('ResourceShare_recipientId_idx').on(table.recipientId),
  ResourceShare_sharedByTutorId_idx: index('ResourceShare_sharedByTutorId_idx').on(table.sharedByTutorId),
  ResourceShare_resourceId_recipientId_key: uniqueIndex('ResourceShare_resourceId_recipientId_key').on(table.resourceId, table.recipientId),
  ResourceShare_resourceId_sharedWithAll_key: uniqueIndex('ResourceShare_resourceId_sharedWithAll_key').on(table.resourceId, table.sharedWithAll)
}))

export const libraryTask = pgTable('LibraryTask', {
  id: text('id').primaryKey().notNull(),
  userId: text('userId').notNull(),
  question: text('question').notNull(),
  type: text('type').notNull(),
  options: jsonb('options'),
  correctAnswer: text('correctAnswer'),
  explanation: text('explanation'),
  difficulty: text('difficulty').notNull(),
  subject: text('subject').notNull(),
  topics: jsonb('topics').notNull(),
  isFavorite: boolean('isFavorite').notNull(),
  usageCount: integer('usageCount').notNull(),
  lastUsedAt: timestamp('lastUsedAt', { withTimezone: true }),
  createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updatedAt', { withTimezone: true }).notNull().$onUpdate(() => new Date())
}, (table) => ({
  LibraryTask_userId_idx: index('LibraryTask_userId_idx').on(table.userId),
  LibraryTask_isFavorite_idx: index('LibraryTask_isFavorite_idx').on(table.isFavorite)
}))

export const adminRole = pgTable('AdminRole', {
  id: text('id').primaryKey().notNull(),
  name: text('name').notNull().unique(),
  description: text('description'),
  permissions: jsonb('permissions').notNull(),
  createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updatedAt', { withTimezone: true }).notNull().$onUpdate(() => new Date())
})

export const adminAssignment = pgTable('AdminAssignment', {
  id: text('id').primaryKey().notNull(),
  userId: text('userId').notNull(),
  roleId: text('roleId').notNull(),
  assignedBy: text('assignedBy'),
  createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow(),
  expiresAt: timestamp('expiresAt', { withTimezone: true }),
  isActive: boolean('isActive').notNull()
}, (table) => ({
  AdminAssignment_userId_idx: index('AdminAssignment_userId_idx').on(table.userId),
  AdminAssignment_roleId_idx: index('AdminAssignment_roleId_idx').on(table.roleId),
  AdminAssignment_userId_roleId_key: uniqueIndex('AdminAssignment_userId_roleId_key').on(table.userId, table.roleId)
}))

export const featureFlag = pgTable('FeatureFlag', {
  id: text('id').primaryKey().notNull(),
  key: text('key').notNull().unique(),
  name: text('name').notNull(),
  description: text('description'),
  enabled: boolean('enabled').notNull(),
  scope: text('scope').notNull(),
  targetValue: jsonb('targetValue'),
  config: jsonb('config').notNull(),
  createdBy: text('createdBy'),
  updatedBy: text('updatedBy'),
  createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updatedAt', { withTimezone: true }).notNull().$onUpdate(() => new Date()),
  deletedAt: timestamp('deletedAt', { withTimezone: true })
}, (table) => ({
  FeatureFlag_key_idx: index('FeatureFlag_key_idx').on(table.key),
  FeatureFlag_scope_idx: index('FeatureFlag_scope_idx').on(table.scope),
  FeatureFlag_enabled_idx: index('FeatureFlag_enabled_idx').on(table.enabled)
}))

export const featureFlagChange = pgTable('FeatureFlagChange', {
  id: text('id').primaryKey().notNull(),
  flagId: text('flagId').notNull(),
  changedBy: text('changedBy').notNull(),
  previousValue: jsonb('previousValue'),
  newValue: jsonb('newValue'),
  changeReason: text('changeReason'),
  createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow()
}, (table) => ({
  FeatureFlagChange_flagId_idx: index('FeatureFlagChange_flagId_idx').on(table.flagId),
  FeatureFlagChange_changedBy_idx: index('FeatureFlagChange_changedBy_idx').on(table.changedBy),
  FeatureFlagChange_createdAt_idx: index('FeatureFlagChange_createdAt_idx').on(table.createdAt)
}))

export const llmProvider = pgTable('LlmProvider', {
  id: text('id').primaryKey().notNull(),
  name: text('name').notNull(),
  providerType: text('providerType').notNull(),
  apiKeyEncrypted: text('apiKeyEncrypted'),
  baseUrl: text('baseUrl'),
  isActive: boolean('isActive').notNull(),
  isDefault: boolean('isDefault').notNull(),
  priority: integer('priority').notNull(),
  config: jsonb('config').notNull(),
  rateLimits: jsonb('rateLimits').notNull(),
  costPer1kTokens: doublePrecision('costPer1kTokens'),
  createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updatedAt', { withTimezone: true }).notNull().$onUpdate(() => new Date())
})

export const llmModel = pgTable('LlmModel', {
  id: text('id').primaryKey().notNull(),
  providerId: text('providerId').notNull(),
  modelId: text('modelId').notNull(),
  name: text('name'),
  description: text('description'),
  maxTokens: integer('maxTokens'),
  supportsVision: boolean('supportsVision').notNull(),
  supportsFunctions: boolean('supportsFunctions').notNull(),
  isActive: boolean('isActive').notNull(),
  config: jsonb('config').notNull(),
  createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow()
}, (table) => ({
  LlmModel_providerId_idx: index('LlmModel_providerId_idx').on(table.providerId),
  LlmModel_isActive_idx: index('LlmModel_isActive_idx').on(table.isActive),
  LlmModel_providerId_modelId_key: uniqueIndex('LlmModel_providerId_modelId_key').on(table.providerId, table.modelId)
}))

export const llmRoutingRule = pgTable('LlmRoutingRule', {
  id: text('id').primaryKey().notNull(),
  name: text('name'),
  description: text('description'),
  priority: integer('priority').notNull(),
  conditions: jsonb('conditions').notNull(),
  targetModelId: text('targetModelId').notNull(),
  fallbackModelId: text('fallbackModelId'),
  isActive: boolean('isActive').notNull(),
  createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow(),
  providerId: text('providerId').notNull()
}, (table) => ({
  LlmRoutingRule_targetModelId_idx: index('LlmRoutingRule_targetModelId_idx').on(table.targetModelId),
  LlmRoutingRule_isActive_idx: index('LlmRoutingRule_isActive_idx').on(table.isActive),
  LlmRoutingRule_priority_idx: index('LlmRoutingRule_priority_idx').on(table.priority)
}))

export const systemSetting = pgTable('SystemSetting', {
  id: text('id').primaryKey().notNull(),
  category: text('category').notNull(),
  key: text('key').notNull(),
  settingValue: jsonb('setting_value').notNull(),
  valueType: text('valueType').notNull(),
  description: text('description'),
  isEditable: boolean('isEditable').notNull(),
  requiresRestart: boolean('requiresRestart').notNull(),
  updatedBy: text('updatedBy'),
  createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updatedAt', { withTimezone: true }).notNull().$onUpdate(() => new Date())
}, (table) => ({
  SystemSetting_category_idx: index('SystemSetting_category_idx').on(table.category),
  SystemSetting_key_idx: index('SystemSetting_key_idx').on(table.key),
  SystemSetting_category_key_key: uniqueIndex('SystemSetting_category_key_key').on(table.category, table.key)
}))

export const adminAuditLog = pgTable('AdminAuditLog', {
  id: text('id').primaryKey().notNull(),
  adminId: text('adminId').notNull(),
  action: text('action').notNull(),
  resourceType: text('resourceType'),
  resourceId: text('resourceId'),
  previousState: jsonb('previousState'),
  newState: jsonb('newState'),
  metadata: jsonb('metadata'),
  ipAddress: text('ipAddress'),
  userAgent: text('userAgent'),
  createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow()
}, (table) => ({
  AdminAuditLog_adminId_idx: index('AdminAuditLog_adminId_idx').on(table.adminId),
  AdminAuditLog_action_idx: index('AdminAuditLog_action_idx').on(table.action),
  AdminAuditLog_resourceType_idx: index('AdminAuditLog_resourceType_idx').on(table.resourceType),
  AdminAuditLog_createdAt_idx: index('AdminAuditLog_createdAt_idx').on(table.createdAt)
}))

export const adminSession = pgTable('AdminSession', {
  id: text('id').primaryKey().notNull(),
  adminId: text('adminId').notNull(),
  token: text('token').notNull().unique(),
  ipAddress: text('ipAddress'),
  userAgent: text('userAgent'),
  startedAt: timestamp('startedAt', { withTimezone: true }).notNull().defaultNow(),
  lastActiveAt: timestamp('lastActiveAt', { withTimezone: true }).notNull().defaultNow(),
  expiresAt: timestamp('expiresAt', { withTimezone: true }).notNull(),
  isRevoked: boolean('isRevoked').notNull()
}, (table) => ({
  AdminSession_adminId_idx: index('AdminSession_adminId_idx').on(table.adminId),
  AdminSession_token_idx: index('AdminSession_token_idx').on(table.token),
  AdminSession_expiresAt_idx: index('AdminSession_expiresAt_idx').on(table.expiresAt)
}))

export const ipWhitelist = pgTable('IpWhitelist', {
  id: text('id').primaryKey().notNull(),
  ipAddress: text('ipAddress').notNull().unique(),
  description: text('description'),
  isActive: boolean('isActive').notNull(),
  createdBy: text('createdBy'),
  createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow(),
  expiresAt: timestamp('expiresAt', { withTimezone: true })
}, (table) => ({
  IpWhitelist_ipAddress_idx: index('IpWhitelist_ipAddress_idx').on(table.ipAddress),
  IpWhitelist_isActive_idx: index('IpWhitelist_isActive_idx').on(table.isActive)
}))

export const calendarConnection = pgTable('CalendarConnection', {
  id: text('id').primaryKey().notNull(),
  userId: text('userId').notNull(),
  provider: text('provider').notNull(),
  providerAccountId: text('providerAccountId'),
  accessToken: text('accessToken'),
  refreshToken: text('refreshToken'),
  expiresAt: timestamp('expiresAt', { withTimezone: true }),
  syncEnabled: boolean('syncEnabled').notNull(),
  syncDirection: text('syncDirection').notNull(),
  lastSyncedAt: timestamp('lastSyncedAt', { withTimezone: true }),
  createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updatedAt', { withTimezone: true }).notNull().$onUpdate(() => new Date())
}, (table) => ({
  CalendarConnection_userId_idx: index('CalendarConnection_userId_idx').on(table.userId),
  CalendarConnection_provider_idx: index('CalendarConnection_provider_idx').on(table.provider),
  CalendarConnection_userId_provider_key: uniqueIndex('CalendarConnection_userId_provider_key').on(table.userId, table.provider)
}))

export const calendarEvent = pgTable('CalendarEvent', {
  id: text('id').primaryKey().notNull(),
  tutorId: text('tutorId').notNull(),
  title: text('title').notNull(),
  description: text('description'),
  type: enums.eventTypeEnum('type').notNull(),
  status: enums.eventStatusEnum('status').notNull(),
  startTime: timestamp('startTime', { withTimezone: true }).notNull(),
  endTime: timestamp('endTime', { withTimezone: true }).notNull(),
  timezone: text('timezone').notNull(),
  isAllDay: boolean('isAllDay').notNull(),
  recurrenceRule: text('recurrenceRule'),
  recurringEventId: text('recurringEventId'),
  isRecurring: boolean('isRecurring').notNull(),
  location: text('location'),
  meetingUrl: text('meetingUrl'),
  isVirtual: boolean('isVirtual').notNull(),
  curriculumId: text('curriculumId'),
  batchId: text('batchId'),
  studentId: text('studentId'),
  attendees: jsonb('attendees'),
  maxAttendees: integer('maxAttendees').notNull(),
  reminders: jsonb('reminders'),
  color: text('color'),
  createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updatedAt', { withTimezone: true }).notNull().$onUpdate(() => new Date()),
  createdBy: text('createdBy').notNull(),
  externalId: text('externalId'),
  deletedAt: timestamp('deletedAt', { withTimezone: true }),
  isCancelled: boolean('isCancelled').notNull()
}, (table) => ({
  CalendarEvent_tutorId_idx: index('CalendarEvent_tutorId_idx').on(table.tutorId),
  CalendarEvent_startTime_idx: index('CalendarEvent_startTime_idx').on(table.startTime),
  CalendarEvent_endTime_idx: index('CalendarEvent_endTime_idx').on(table.endTime),
  CalendarEvent_status_idx: index('CalendarEvent_status_idx').on(table.status),
  CalendarEvent_type_idx: index('CalendarEvent_type_idx').on(table.type),
  CalendarEvent_recurringEventId_idx: index('CalendarEvent_recurringEventId_idx').on(table.recurringEventId),
  CalendarEvent_tutorId_startTime_endTime_idx: index('CalendarEvent_tutorId_startTime_endTime_idx').on(table.tutorId, table.startTime, table.endTime),
  CalendarEvent_curriculumId_idx: index('CalendarEvent_curriculumId_idx').on(table.curriculumId),
  CalendarEvent_batchId_idx: index('CalendarEvent_batchId_idx').on(table.batchId)
}))

export const calendarAvailability = pgTable('CalendarAvailability', {
  id: text('id').primaryKey().notNull(),
  tutorId: text('tutorId').notNull(),
  dayOfWeek: integer('dayOfWeek').notNull(),
  startTime: text('startTime').notNull(),
  endTime: text('endTime').notNull(),
  timezone: text('timezone').notNull(),
  isAvailable: boolean('isAvailable').notNull(),
  validFrom: timestamp('validFrom', { withTimezone: true }),
  validUntil: timestamp('validUntil', { withTimezone: true }),
  createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updatedAt', { withTimezone: true }).notNull().$onUpdate(() => new Date())
}, (table) => ({
  CalendarAvailability_tutorId_idx: index('CalendarAvailability_tutorId_idx').on(table.tutorId),
  CalendarAvailability_dayOfWeek_idx: index('CalendarAvailability_dayOfWeek_idx').on(table.dayOfWeek),
  CalendarAvailability_tutorId_dayOfWeek_startTime_endTime_key: uniqueIndex('CalendarAvailability_tutorId_dayOfWeek_startTime_endTime_key').on(table.tutorId, table.dayOfWeek, table.startTime, table.endTime)
}))

export const calendarException = pgTable('CalendarException', {
  id: text('id').primaryKey().notNull(),
  tutorId: text('tutorId').notNull(),
  date: timestamp('date', { withTimezone: true }).notNull(),
  isAvailable: boolean('isAvailable').notNull(),
  startTime: text('startTime'),
  endTime: text('endTime'),
  reason: text('reason'),
  createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow()
}, (table) => ({
  CalendarException_tutorId_idx: index('CalendarException_tutorId_idx').on(table.tutorId),
  CalendarException_date_idx: index('CalendarException_date_idx').on(table.date),
  CalendarException_tutorId_date_startTime_key: uniqueIndex('CalendarException_tutorId_date_startTime_key').on(table.tutorId, table.date, table.startTime)
}))

export const whiteboard = pgTable('Whiteboard', {
  id: text('id').primaryKey().notNull(),
  tutorId: text('tutorId').notNull(),
  sessionId: text('sessionId'),
  roomId: text('roomId'),
  curriculumId: text('curriculumId'),
  lessonId: text('lessonId'),
  title: text('title').notNull(),
  description: text('description'),
  isTemplate: boolean('isTemplate').notNull(),
  isPublic: boolean('isPublic').notNull(),
  width: integer('width').notNull(),
  height: integer('height').notNull(),
  backgroundColor: text('backgroundColor').notNull(),
  backgroundStyle: text('backgroundStyle').notNull(),
  backgroundImage: text('backgroundImage'),
  collaborators: jsonb('collaborators'),
  visibility: text('visibility').notNull(),
  isBroadcasting: boolean('isBroadcasting').notNull(),
  ownerType: text('ownerType').notNull(),
  createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updatedAt', { withTimezone: true }).notNull().$onUpdate(() => new Date()),
  deletedAt: timestamp('deletedAt', { withTimezone: true })
}, (table) => ({
  Whiteboard_tutorId_idx: index('Whiteboard_tutorId_idx').on(table.tutorId),
  Whiteboard_sessionId_idx: index('Whiteboard_sessionId_idx').on(table.sessionId),
  Whiteboard_roomId_idx: index('Whiteboard_roomId_idx').on(table.roomId),
  Whiteboard_curriculumId_idx: index('Whiteboard_curriculumId_idx').on(table.curriculumId),
  Whiteboard_lessonId_idx: index('Whiteboard_lessonId_idx').on(table.lessonId),
  Whiteboard_isTemplate_idx: index('Whiteboard_isTemplate_idx').on(table.isTemplate),
  Whiteboard_createdAt_idx: index('Whiteboard_createdAt_idx').on(table.createdAt),
  Whiteboard_visibility_idx: index('Whiteboard_visibility_idx').on(table.visibility),
  Whiteboard_isBroadcasting_idx: index('Whiteboard_isBroadcasting_idx').on(table.isBroadcasting),
  Whiteboard_sessionId_visibility_idx: index('Whiteboard_sessionId_visibility_idx').on(table.sessionId, table.visibility),
  Whiteboard_sessionId_ownerType_idx: index('Whiteboard_sessionId_ownerType_idx').on(table.sessionId, table.ownerType)
}))

export const whiteboardPage = pgTable('WhiteboardPage', {
  id: text('id').primaryKey().notNull(),
  whiteboardId: text('whiteboardId').notNull(),
  name: text('name').notNull(),
  order: integer('order').notNull(),
  backgroundColor: text('backgroundColor'),
  backgroundStyle: text('backgroundStyle'),
  backgroundImage: text('backgroundImage'),
  strokes: jsonb('strokes').notNull(),
  shapes: jsonb('shapes').notNull(),
  texts: jsonb('texts').notNull(),
  images: jsonb('images').notNull(),
  viewState: jsonb('viewState'),
  createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updatedAt', { withTimezone: true }).notNull().$onUpdate(() => new Date())
}, (table) => ({
  WhiteboardPage_whiteboardId_idx: index('WhiteboardPage_whiteboardId_idx').on(table.whiteboardId),
  WhiteboardPage_order_idx: index('WhiteboardPage_order_idx').on(table.order),
  WhiteboardPage_whiteboardId_order_key: uniqueIndex('WhiteboardPage_whiteboardId_order_key').on(table.whiteboardId, table.order)
}))

export const whiteboardSnapshot = pgTable('WhiteboardSnapshot', {
  id: text('id').primaryKey().notNull(),
  whiteboardId: text('whiteboardId').notNull(),
  name: text('name').notNull(),
  thumbnailUrl: text('thumbnailUrl'),
  pages: jsonb('pages').notNull(),
  createdBy: text('createdBy').notNull(),
  createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow()
}, (table) => ({
  WhiteboardSnapshot_whiteboardId_idx: index('WhiteboardSnapshot_whiteboardId_idx').on(table.whiteboardId),
  WhiteboardSnapshot_createdAt_idx: index('WhiteboardSnapshot_createdAt_idx').on(table.createdAt)
}))

export const whiteboardSession = pgTable('WhiteboardSession', {
  id: text('id').primaryKey().notNull(),
  whiteboardId: text('whiteboardId').notNull(),
  roomId: text('roomId').notNull(),
  tutorId: text('tutorId').notNull(),
  participants: jsonb('participants').notNull(),
  isActive: boolean('isActive').notNull(),
  startedAt: timestamp('startedAt', { withTimezone: true }).notNull().defaultNow(),
  endedAt: timestamp('endedAt', { withTimezone: true }),
  operations: jsonb('operations'),
  finalPageStates: jsonb('finalPageStates')
}, (table) => ({
  WhiteboardSession_whiteboardId_idx: index('WhiteboardSession_whiteboardId_idx').on(table.whiteboardId),
  WhiteboardSession_roomId_idx: index('WhiteboardSession_roomId_idx').on(table.roomId),
  WhiteboardSession_tutorId_idx: index('WhiteboardSession_tutorId_idx').on(table.tutorId),
  WhiteboardSession_isActive_idx: index('WhiteboardSession_isActive_idx').on(table.isActive)
}))

export const mathWhiteboardSession = pgTable('MathWhiteboardSession', {
  id: text('id').primaryKey().notNull(),
  liveSessionId: text('liveSessionId').notNull(),
  tutorId: text('tutorId').notNull(),
  title: text('title').notNull(),
  description: text('description'),
  status: enums.mathSessionStatusEnum('status').notNull(),
  isLocked: boolean('isLocked').notNull(),
  allowStudentEdit: boolean('allowStudentEdit').notNull(),
  allowStudentTools: boolean('allowStudentTools').notNull(),
  createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updatedAt', { withTimezone: true }).notNull().$onUpdate(() => new Date()),
  endedAt: timestamp('endedAt', { withTimezone: true })
}, (table) => ({
  MathWhiteboardSession_liveSessionId_idx: index('MathWhiteboardSession_liveSessionId_idx').on(table.liveSessionId),
  MathWhiteboardSession_tutorId_idx: index('MathWhiteboardSession_tutorId_idx').on(table.tutorId),
  MathWhiteboardSession_status_idx: index('MathWhiteboardSession_status_idx').on(table.status),
  MathWhiteboardSession_createdAt_idx: index('MathWhiteboardSession_createdAt_idx').on(table.createdAt)
}))

export const mathWhiteboardPage = pgTable('MathWhiteboardPage', {
  id: text('id').primaryKey().notNull(),
  sessionId: text('sessionId').notNull(),
  name: text('name').notNull(),
  order: integer('order').notNull(),
  width: integer('width').notNull(),
  height: integer('height').notNull(),
  backgroundType: text('backgroundType').notNull(),
  backgroundColor: text('backgroundColor').notNull(),
  elements: jsonb('elements').notNull(),
  vectorClock: jsonb('vectorClock').notNull(),
  lastModified: timestamp('lastModified', { withTimezone: true }).notNull().$onUpdate(() => new Date()),
  modifiedBy: text('modifiedBy'),
  createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow()
}, (table) => ({
  MathWhiteboardPage_sessionId_idx: index('MathWhiteboardPage_sessionId_idx').on(table.sessionId),
  MathWhiteboardPage_order_idx: index('MathWhiteboardPage_order_idx').on(table.order),
  MathWhiteboardPage_sessionId_order_key: uniqueIndex('MathWhiteboardPage_sessionId_order_key').on(table.sessionId, table.order)
}))

export const mathWhiteboardParticipant = pgTable('MathWhiteboardParticipant', {
  id: text('id').primaryKey().notNull(),
  sessionId: text('sessionId').notNull(),
  userId: text('userId').notNull(),
  role: enums.roleEnum('role').notNull(),
  canEdit: boolean('canEdit').notNull(),
  canChat: boolean('canChat').notNull(),
  canUseAI: boolean('canUseAI').notNull(),
  cursorX: doublePrecision('cursorX'),
  cursorY: doublePrecision('cursorY'),
  cursorColor: text('cursorColor').notNull(),
  isTyping: boolean('isTyping').notNull(),
  joinedAt: timestamp('joinedAt', { withTimezone: true }).notNull().defaultNow(),
  leftAt: timestamp('leftAt', { withTimezone: true })
}, (table) => ({
  MathWhiteboardParticipant_sessionId_idx: index('MathWhiteboardParticipant_sessionId_idx').on(table.sessionId),
  MathWhiteboardParticipant_userId_idx: index('MathWhiteboardParticipant_userId_idx').on(table.userId),
  MathWhiteboardParticipant_sessionId_userId_key: uniqueIndex('MathWhiteboardParticipant_sessionId_userId_key').on(table.sessionId, table.userId)
}))

export const mathWhiteboardSnapshot = pgTable('MathWhiteboardSnapshot', {
  id: text('id').primaryKey().notNull(),
  sessionId: text('sessionId').notNull(),
  name: text('name').notNull(),
  description: text('description'),
  thumbnailUrl: text('thumbnailUrl'),
  pages: jsonb('pages').notNull(),
  viewState: jsonb('viewState'),
  createdBy: text('createdBy').notNull(),
  createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow()
}, (table) => ({
  MathWhiteboardSnapshot_sessionId_idx: index('MathWhiteboardSnapshot_sessionId_idx').on(table.sessionId),
  MathWhiteboardSnapshot_createdAt_idx: index('MathWhiteboardSnapshot_createdAt_idx').on(table.createdAt)
}))

export const mathAIInteraction = pgTable('MathAIInteraction', {
  id: text('id').primaryKey().notNull(),
  sessionId: text('sessionId').notNull(),
  userId: text('userId').notNull(),
  type: enums.mathAIInteractionTypeEnum('type').notNull(),
  inputText: text('inputText'),
  inputLatex: text('inputLatex'),
  inputImage: text('inputImage'),
  output: text('output').notNull(),
  outputLatex: text('outputLatex'),
  modelUsed: text('modelUsed').notNull(),
  latencyMs: integer('latencyMs').notNull(),
  tokensUsed: integer('tokensUsed'),
  steps: jsonb('steps'),
  createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow()
}, (table) => ({
  MathAIInteraction_sessionId_idx: index('MathAIInteraction_sessionId_idx').on(table.sessionId),
  MathAIInteraction_type_idx: index('MathAIInteraction_type_idx').on(table.type),
  MathAIInteraction_createdAt_idx: index('MathAIInteraction_createdAt_idx').on(table.createdAt)
}))

export const familyAccount = pgTable('FamilyAccount', {
  id: text('id').primaryKey().notNull(),
  familyName: text('familyName').notNull(),
  familyType: text('familyType').notNull(),
  primaryEmail: text('primaryEmail').notNull().unique(),
  phoneNumber: text('phoneNumber'),
  address: text('address'),
  country: text('country'),
  timezone: text('timezone'),
  defaultCurrency: text('defaultCurrency').notNull(),
  monthlyBudget: doublePrecision('monthlyBudget').notNull(),
  enableBudget: boolean('enableBudget').notNull(),
  allowAdults: boolean('allowAdults').notNull(),
  isActive: boolean('isActive').notNull(),
  isVerified: boolean('isVerified').notNull(),
  createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updatedAt', { withTimezone: true }).notNull().$onUpdate(() => new Date()),
  verifiedAt: timestamp('verifiedAt', { withTimezone: true })
}, (table) => ({
  FamilyAccount_isActive_idx: index('FamilyAccount_isActive_idx').on(table.isActive),
  FamilyAccount_isVerified_idx: index('FamilyAccount_isVerified_idx').on(table.isVerified),
  FamilyAccount_createdAt_idx: index('FamilyAccount_createdAt_idx').on(table.createdAt),
  idx_family_account_status: index('idx_family_account_status').on(table.isActive, table.isVerified),
  idx_family_account_active_created: index('idx_family_account_active_created').on(table.isActive, table.createdAt),
  idx_family_account_type_status: index('idx_family_account_type_status').on(table.familyType, table.isActive)
}))

export const familyMember = pgTable('FamilyMember', {
  id: text('id').primaryKey().notNull(),
  familyAccountId: text('familyAccountId').notNull(),
  userId: text('userId'),
  name: text('name').notNull(),
  relation: text('relation').notNull(),
  email: text('email'),
  phone: text('phone'),
  createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updatedAt', { withTimezone: true }).notNull().$onUpdate(() => new Date())
}, (table) => ({
  FamilyMember_familyAccountId_idx: index('FamilyMember_familyAccountId_idx').on(table.familyAccountId),
  FamilyMember_userId_idx: index('FamilyMember_userId_idx').on(table.userId),
  idx_family_member_account_user: index('idx_family_member_account_user').on(table.familyAccountId, table.userId),
  idx_family_member_user_relation: index('idx_family_member_user_relation').on(table.userId, table.relation)
}))

export const familyBudget = pgTable('FamilyBudget', {
  id: text('id').primaryKey().notNull(),
  parentId: text('parentId').notNull(),
  month: integer('month').notNull(),
  year: integer('year').notNull(),
  amount: doublePrecision('amount').notNull(),
  spent: doublePrecision('spent').notNull(),
  createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updatedAt', { withTimezone: true }).notNull().$onUpdate(() => new Date())
}, (table) => ({
  FamilyBudget_parentId_idx: index('FamilyBudget_parentId_idx').on(table.parentId),
  idx_family_budget_parent_period: index('idx_family_budget_parent_period').on(table.parentId, table.year, table.month),
  FamilyBudget_parentId_month_year_key: uniqueIndex('FamilyBudget_parentId_month_year_key').on(table.parentId, table.month, table.year)
}))

export const familyPayment = pgTable('FamilyPayment', {
  id: text('id').primaryKey().notNull(),
  parentId: text('parentId').notNull(),
  amount: doublePrecision('amount').notNull(),
  method: text('method').notNull(),
  status: text('status').notNull(),
  createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updatedAt', { withTimezone: true }).notNull().$onUpdate(() => new Date())
}, (table) => ({
  FamilyPayment_parentId_idx: index('FamilyPayment_parentId_idx').on(table.parentId),
  idx_family_payment_parent_created: index('idx_family_payment_parent_created').on(table.parentId, table.createdAt),
  idx_family_payment_parent_status_created: index('idx_family_payment_parent_status_created').on(table.parentId, table.status, table.createdAt)
}))

export const budgetAlert = pgTable('BudgetAlert', {
  id: text('id').primaryKey().notNull(),
  parentId: text('parentId').notNull(),
  type: text('type').notNull(),
  message: text('message').notNull(),
  isRead: boolean('isRead').notNull(),
  createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow()
}, (table) => ({
  BudgetAlert_parentId_idx: index('BudgetAlert_parentId_idx').on(table.parentId)
}))

export const parentActivityLog = pgTable('ParentActivityLog', {
  id: text('id').primaryKey().notNull(),
  parentId: text('parentId').notNull(),
  action: text('action').notNull(),
  details: text('details'),
  createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow()
}, (table) => ({
  ParentActivityLog_parentId_idx: index('ParentActivityLog_parentId_idx').on(table.parentId),
  idx_parent_activity_parent_created: index('idx_parent_activity_parent_created').on(table.parentId, table.createdAt)
}))

export const familyNotification = pgTable('FamilyNotification', {
  id: text('id').primaryKey().notNull(),
  parentId: text('parentId').notNull(),
  title: text('title').notNull(),
  message: text('message').notNull(),
  isRead: boolean('isRead').notNull(),
  createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow()
}, (table) => ({
  FamilyNotification_parentId_idx: index('FamilyNotification_parentId_idx').on(table.parentId),
  idx_family_notification_parent_created: index('idx_family_notification_parent_created').on(table.parentId, table.createdAt),
  idx_family_notification_parent_read_created: index('idx_family_notification_parent_read_created').on(table.parentId, table.isRead, table.createdAt)
}))

export const emergencyContact = pgTable('EmergencyContact', {
  id: text('id').primaryKey().notNull(),
  parentId: text('parentId').notNull(),
  name: text('name').notNull(),
  relation: text('relation').notNull(),
  phone: text('phone').notNull(),
  email: text('email'),
  isPrimary: boolean('isPrimary').notNull(),
  createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow()
}, (table) => ({
  EmergencyContact_parentId_idx: index('EmergencyContact_parentId_idx').on(table.parentId),
  idx_emergency_contact_parent_primary: index('idx_emergency_contact_parent_primary').on(table.parentId, table.isPrimary),
  idx_emergency_contact_parent_primary_created: index('idx_emergency_contact_parent_primary_created').on(table.parentId, table.isPrimary, table.createdAt)
}))

export const studentProgressSnapshot = pgTable('StudentProgressSnapshot', {
  id: text('id').primaryKey().notNull(),
  parentId: text('parentId').notNull(),
  studentId: text('studentId').notNull(),
  data: jsonb('data').notNull(),
  capturedAt: timestamp('capturedAt', { withTimezone: true }).notNull().defaultNow()
}, (table) => ({
  StudentProgressSnapshot_parentId_idx: index('StudentProgressSnapshot_parentId_idx').on(table.parentId),
  StudentProgressSnapshot_studentId_idx: index('StudentProgressSnapshot_studentId_idx').on(table.studentId),
  idx_student_progress_parent_captured: index('idx_student_progress_parent_captured').on(table.parentId, table.capturedAt),
  idx_student_progress_student_captured: index('idx_student_progress_student_captured').on(table.studentId, table.capturedAt)
}))

export const parentPaymentAuthorization = pgTable('ParentPaymentAuthorization', {
  id: text('id').primaryKey().notNull(),
  parentId: text('parentId').notNull().unique(),
  level: text('level').notNull(),
  maxAmount: doublePrecision('maxAmount'),
  methods: text('methods').array().notNull(),
  isActive: boolean('isActive').notNull(),
  createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updatedAt', { withTimezone: true }).notNull().$onUpdate(() => new Date())
}, (table) => ({
  ParentPaymentAuthorization_parentId_idx: index('ParentPaymentAuthorization_parentId_idx').on(table.parentId)
}))

export const parentSpendingLimit = pgTable('ParentSpendingLimit', {
  id: text('id').primaryKey().notNull(),
  parentId: text('parentId').notNull(),
  category: text('category').notNull(),
  limit: doublePrecision('limit').notNull(),
  period: text('period').notNull(),
  isActive: boolean('isActive').notNull(),
  createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updatedAt', { withTimezone: true }).notNull().$onUpdate(() => new Date())
}, (table) => ({
  ParentSpendingLimit_parentId_idx: index('ParentSpendingLimit_parentId_idx').on(table.parentId)
}))
