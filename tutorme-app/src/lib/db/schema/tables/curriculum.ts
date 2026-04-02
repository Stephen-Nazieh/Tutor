/**
 * Drizzle table definitions (domain slice).
 * Aggregated via ./index.ts — keep enums in ../enums.ts.
 */
import {
  pgTable,
  text,
  integer,
  boolean,
  timestamp,
  jsonb,
  doublePrecision,
  uniqueIndex,
  index,
  uuid,
} from 'drizzle-orm/pg-core'
import * as enums from '../enums'

export const curriculum = pgTable(
  'Curriculum',
  {
    id: text('id').primaryKey().notNull(),
    name: text('name').notNull(),
    description: text('description'),
    subject: text('subject').notNull(),
    categories: text('categories').array(),
    estimatedHours: integer('estimatedHours').notNull().default(0),
    isPublished: boolean('isPublished').notNull().default(false),
    createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updatedAt', { withTimezone: true })
      .notNull()
      .$onUpdate(() => new Date()),
    creatorId: text('creatorId'),
    isLiveOnline: boolean('isLiveOnline').notNull().default(false),
    languageOfInstruction: text('languageOfInstruction'),
    price: doublePrecision('price'),
    currency: text('currency'),
    isFree: boolean('isFree').notNull().default(false),
    curriculumSource: text('curriculumSource'),
    outlineSource: text('outlineSource'),
    schedule: jsonb('schedule'),
    courseMaterials: jsonb('courseMaterials'),
    coursePitch: text('coursePitch'),
  },
  table => ({
    Curriculum_subject_idx: index('Curriculum_subject_idx').on(table.subject),
    Curriculum_isPublished_idx: index('Curriculum_isPublished_idx').on(table.isPublished),
    Curriculum_creatorId_idx: index('Curriculum_creatorId_idx').on(table.creatorId),
  })
)

export const curriculumShare = pgTable(
  'CurriculumShare',
  {
    id: text('id').primaryKey().notNull(),
    curriculumId: text('curriculumId').notNull(),
    sharedByTutorId: text('sharedByTutorId').notNull(),
    recipientId: text('recipientId').notNull(),
    message: text('message').notNull(),
    isPublic: boolean('isPublic').notNull(),
    sharedAt: timestamp('sharedAt', { withTimezone: true }).notNull().defaultNow(),
  },
  table => ({
    CurriculumShare_sharedByTutorId_idx: index('CurriculumShare_sharedByTutorId_idx').on(
      table.sharedByTutorId
    ),
    CurriculumShare_recipientId_idx: index('CurriculumShare_recipientId_idx').on(table.recipientId),
    CurriculumShare_curriculumId_idx: index('CurriculumShare_curriculumId_idx').on(
      table.curriculumId
    ),
    CurriculumShare_curriculumId_recipientId_key: uniqueIndex(
      'CurriculumShare_curriculumId_recipientId_key'
    ).on(table.curriculumId, table.recipientId),
  })
)

export const curriculumLesson = pgTable(
  'CurriculumLesson',
  {
    id: text('id').primaryKey().notNull(),
    curriculumId: text('curriculumId').notNull(),
    title: text('title').notNull(),
    description: text('description'),
    duration: integer('duration').notNull().default(60),
    order: integer('order').notNull(),
    builderData: jsonb('builderData'),
    createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updatedAt', { withTimezone: true })
      .notNull()
      .$onUpdate(() => new Date()),
  },
  table => ({
    CurriculumLesson_curriculumId_idx: index('CurriculumLesson_curriculumId_idx').on(
      table.curriculumId
    ),
    CurriculumLesson_order_idx: index('CurriculumLesson_order_idx').on(table.order),
  })
)

export const lessonSession = pgTable(
  'LessonSession',
  {
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
    lastActivityAt: timestamp('lastActivityAt', { withTimezone: true })
      .notNull()
      .$onUpdate(() => new Date()),
    completedAt: timestamp('completedAt', { withTimezone: true }),
  },
  table => ({
    LessonSession_studentId_idx: index('LessonSession_studentId_idx').on(table.studentId),
    LessonSession_lessonId_idx: index('LessonSession_lessonId_idx').on(table.lessonId),
    LessonSession_studentId_lessonId_key: uniqueIndex('LessonSession_studentId_lessonId_key').on(
      table.studentId,
      table.lessonId
    ),
  })
)

export const curriculumLessonProgress = pgTable(
  'CurriculumLessonProgress',
  {
    id: text('id').primaryKey().notNull(),
    lessonId: text('lessonId').notNull(),
    studentId: text('studentId').notNull(),
    status: text('status').notNull(),
    currentSection: text('currentSection').notNull(),
    score: integer('score'),
    completedAt: timestamp('completedAt', { withTimezone: true }),
    updatedAt: timestamp('updatedAt', { withTimezone: true })
      .notNull()
      .$onUpdate(() => new Date()),
  },
  table => ({
    CurriculumLessonProgress_studentId_idx: index('CurriculumLessonProgress_studentId_idx').on(
      table.studentId
    ),
    CurriculumLessonProgress_lessonId_studentId_key: uniqueIndex(
      'CurriculumLessonProgress_lessonId_studentId_key'
    ).on(table.lessonId, table.studentId),
  })
)

export const curriculumEnrollment = pgTable(
  'CurriculumEnrollment',
  {
    id: text('id').primaryKey().notNull(),
    studentId: text('studentId').notNull(),
    curriculumId: text('curriculumId').notNull(),
    batchId: text('batchId'),
    enrolledAt: timestamp('enrolledAt', { withTimezone: true }).notNull().defaultNow(),
    startDate: timestamp('startDate', { withTimezone: true }),
    completedAt: timestamp('completedAt', { withTimezone: true }),
    lastActivity: timestamp('lastActivity', { withTimezone: true }).notNull().defaultNow(),
    lessonsCompleted: integer('lessonsCompleted').notNull(),
    enrollmentSource: text('enrollmentSource'),
  },
  table => ({
    CurriculumEnrollment_studentId_idx: index('CurriculumEnrollment_studentId_idx').on(
      table.studentId
    ),
    CurriculumEnrollment_batchId_idx: index('CurriculumEnrollment_batchId_idx').on(table.batchId),
    CurriculumEnrollment_studentId_curriculumId_key: uniqueIndex(
      'CurriculumEnrollment_studentId_curriculumId_key'
    ).on(table.studentId, table.curriculumId),
  })
)

export const courseBatch = pgTable(
  'CourseBatch',
  {
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
    maxStudents: integer('maxStudents').notNull(),
  },
  table => ({
    CourseBatch_curriculumId_idx: index('CourseBatch_curriculumId_idx').on(table.curriculumId),
  })
)

export const curriculumProgress = pgTable(
  'CurriculumProgress',
  {
    id: text('id').primaryKey().notNull(),
    studentId: text('studentId').notNull(),
    curriculumId: text('curriculumId').notNull(),
    lessonsCompleted: integer('lessonsCompleted').notNull(),
    totalLessons: integer('totalLessons').notNull(),
    currentLessonId: text('currentLessonId'),
    averageScore: doublePrecision('averageScore'),
    isCompleted: boolean('isCompleted').notNull(),
    startedAt: timestamp('startedAt', { withTimezone: true }).notNull().defaultNow(),
    completedAt: timestamp('completedAt', { withTimezone: true }),
  },
  table => ({
    CurriculumProgress_studentId_idx: index('CurriculumProgress_studentId_idx').on(table.studentId),
    CurriculumProgress_studentId_curriculumId_key: uniqueIndex(
      'CurriculumProgress_studentId_curriculumId_key'
    ).on(table.studentId, table.curriculumId),
  })
)

export const studentPerformance = pgTable(
  'StudentPerformance',
  {
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
    updatedAt: timestamp('updatedAt', { withTimezone: true })
      .notNull()
      .$onUpdate(() => new Date()),
    createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow(),
  },
  table => ({
    StudentPerformance_studentId_idx: index('StudentPerformance_studentId_idx').on(table.studentId),
    StudentPerformance_curriculumId_idx: index('StudentPerformance_curriculumId_idx').on(
      table.curriculumId
    ),
    StudentPerformance_cluster_idx: index('StudentPerformance_cluster_idx').on(table.cluster),
    StudentPerformance_studentId_curriculumId_key: uniqueIndex(
      'StudentPerformance_studentId_curriculumId_key'
    ).on(table.studentId, table.curriculumId),
  })
)

export const taskSubmission = pgTable(
  'TaskSubmission',
  {
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
    gradedAt: timestamp('gradedAt', { withTimezone: true }),
  },
  table => ({
    TaskSubmission_studentId_idx: index('TaskSubmission_studentId_idx').on(table.studentId),
    TaskSubmission_taskId_idx: index('TaskSubmission_taskId_idx').on(table.taskId),
    TaskSubmission_taskId_studentId_key: uniqueIndex('TaskSubmission_taskId_studentId_key').on(
      table.taskId,
      table.studentId
    ),
  })
)

export const feedbackWorkflow = pgTable(
  'FeedbackWorkflow',
  {
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
    updatedAt: timestamp('updatedAt', { withTimezone: true })
      .notNull()
      .$onUpdate(() => new Date()),
  },
  table => ({
    FeedbackWorkflow_studentId_idx: index('FeedbackWorkflow_studentId_idx').on(table.studentId),
    FeedbackWorkflow_status_idx: index('FeedbackWorkflow_status_idx').on(table.status),
  })
)

export const generatedTask = pgTable(
  'GeneratedTask',
  {
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
    maxAttempts: integer('maxAttempts').notNull(),
  },
  table => ({
    GeneratedTask_tutorId_idx: index('GeneratedTask_tutorId_idx').on(table.tutorId),
    GeneratedTask_roomId_idx: index('GeneratedTask_roomId_idx').on(table.roomId),
    GeneratedTask_status_idx: index('GeneratedTask_status_idx').on(table.status),
    GeneratedTask_lessonId_idx: index('GeneratedTask_lessonId_idx').on(table.lessonId),
    GeneratedTask_batchId_idx: index('GeneratedTask_batchId_idx').on(table.batchId),
  })
)
