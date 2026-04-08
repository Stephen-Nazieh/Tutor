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

// ============================================
// COURSE TABLES
// ============================================

export const course = pgTable(
  'Course',
  {
    courseId: text('id').primaryKey().notNull(),
    name: text('name').notNull(),
    description: text('description'),
    categories: text('categories').array(),
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
    schedule: jsonb('schedule'),
    // Deprecated columns - kept for backward compatibility
    subject: text('subject').notNull().default('general'),
    gradeLevel: text('gradeLevel'),
    difficulty: text('difficulty'),
    estimatedHours: integer('estimatedHours').notNull().default(0),
    curriculumSource: text('curriculumSource').default('PLATFORM'),
    outlineSource: text('outlineSource').default('SELF'),
    courseMaterials: jsonb('courseMaterials'),
    coursePitch: text('coursePitch'),
  },
  table => ({
    Course_isPublished_idx: index('Course_isPublished_idx').on(table.isPublished),
    Course_creatorId_idx: index('Course_creatorId_idx').on(table.creatorId),
  })
)

/**
 * @deprecated CourseCatalog is being replaced by the category system.
 * Kept for backward compatibility during migration.
 */
export const courseCatalog = pgTable(
  'CourseCatalog',
  {
    catalogId: text('id').primaryKey().notNull(),
    category: text('category').notNull(),
    name: text('name').notNull(),
    code: text('code'),
    createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow(),
  },
  table => ({
    CourseCatalog_category_idx: index('CourseCatalog_category_idx').on(table.category),
    CourseCatalog_category_name_key: uniqueIndex('CourseCatalog_category_name_key').on(
      table.category,
      table.name
    ),
  })
)

export const courseShare = pgTable(
  'CourseShare',
  {
    shareId: text('id').primaryKey().notNull(),
    courseId: text('courseId').notNull(),
    sharedByTutorId: text('sharedByTutorId').notNull(),
    recipientId: text('recipientId').notNull(),
    message: text('message').notNull(),
    isPublic: boolean('isPublic').notNull(),
    sharedAt: timestamp('sharedAt', { withTimezone: true }).notNull().defaultNow(),
  },
  table => ({
    CourseShare_sharedByTutorId_idx: index('CourseShare_sharedByTutorId_idx').on(
      table.sharedByTutorId
    ),
    CourseShare_recipientId_idx: index('CourseShare_recipientId_idx').on(table.recipientId),
    CourseShare_courseId_idx: index('CourseShare_courseId_idx').on(table.courseId),
    CourseShare_courseId_recipientId_key: uniqueIndex('CourseShare_courseId_recipientId_key').on(
      table.courseId,
      table.recipientId
    ),
  })
)

export const courseLesson = pgTable(
  'CourseLesson',
  {
    lessonId: text('id').primaryKey().notNull(),
    courseId: text('courseId'),
    title: text('title').notNull(),
    description: text('description'),
    order: integer('order').notNull(),
    // New fields for tasks/assessments/homework structure
    tasks: jsonb('tasks'), // Array of task objects
    assessments: jsonb('assessments'), // Array of assessment objects
    homework: jsonb('homework'), // Array of homework objects
    builderData: jsonb('builderData'),
    createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updatedAt', { withTimezone: true })
      .notNull()
      .$onUpdate(() => new Date()),
  },
  table => ({
    CourseLesson_courseId_idx: index('CourseLesson_courseId_idx').on(table.courseId),
    CourseLesson_order_idx: index('CourseLesson_order_idx').on(table.order),
  })
)

export const lessonSession = pgTable(
  'LessonSession',
  {
    sessionId: text('id').primaryKey().notNull(),
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

export const courseLessonProgress = pgTable(
  'CourseLessonProgress',
  {
    progressId: text('id').primaryKey().notNull(),
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
    CourseLessonProgress_studentId_idx: index('CourseLessonProgress_studentId_idx').on(
      table.studentId
    ),
    CourseLessonProgress_lessonId_studentId_key: uniqueIndex(
      'CourseLessonProgress_lessonId_studentId_key'
    ).on(table.lessonId, table.studentId),
  })
)

export const courseEnrollment = pgTable(
  'CourseEnrollment',
  {
    enrollmentId: text('id').primaryKey().notNull(),
    studentId: text('studentId').notNull(),
    courseId: text('courseId').notNull(),
    enrolledAt: timestamp('enrolledAt', { withTimezone: true }).notNull().defaultNow(),
    startDate: timestamp('startDate', { withTimezone: true }),
    completedAt: timestamp('completedAt', { withTimezone: true }),
    lastActivity: timestamp('lastActivity', { withTimezone: true }).notNull().defaultNow(),
    lessonsCompleted: integer('lessonsCompleted').notNull(),
    enrollmentSource: text('enrollmentSource'),
  },
  table => ({
    CourseEnrollment_studentId_idx: index('CourseEnrollment_studentId_idx').on(table.studentId),
    CourseEnrollment_studentId_courseId_key: uniqueIndex(
      'CourseEnrollment_studentId_courseId_key'
    ).on(table.studentId, table.courseId),
  })
)

export const courseProgress = pgTable(
  'CourseProgress',
  {
    progressId: text('id').primaryKey().notNull(),
    studentId: text('studentId').notNull(),
    courseId: text('courseId').notNull(),
    lessonsCompleted: integer('lessonsCompleted').notNull(),
    totalLessons: integer('totalLessons').notNull(),
    currentLessonId: text('currentLessonId'),
    averageScore: doublePrecision('averageScore'),
    isCompleted: boolean('isCompleted').notNull(),
    startedAt: timestamp('startedAt', { withTimezone: true }).notNull().defaultNow(),
    completedAt: timestamp('completedAt', { withTimezone: true }),
  },
  table => ({
    CourseProgress_studentId_idx: index('CourseProgress_studentId_idx').on(table.studentId),
    CourseProgress_studentId_courseId_key: uniqueIndex('CourseProgress_studentId_courseId_key').on(
      table.studentId,
      table.courseId
    ),
  })
)

export const studentPerformance = pgTable(
  'StudentPerformance',
  {
    performanceId: text('id').primaryKey().notNull(),
    studentId: text('studentId').notNull(),
    courseId: text('courseId'),
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
    StudentPerformance_courseId_idx: index('StudentPerformance_courseId_idx').on(table.courseId),
    StudentPerformance_cluster_idx: index('StudentPerformance_cluster_idx').on(table.cluster),
    StudentPerformance_studentId_courseId_key: uniqueIndex(
      'StudentPerformance_studentId_courseId_key'
    ).on(table.studentId, table.courseId),
  })
)

export const taskSubmission = pgTable(
  'TaskSubmission',
  {
    submissionId: text('id').primaryKey().notNull(),
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
    workflowId: text('id').primaryKey().notNull(),
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

// ============================================
// LEGACY EXPORTS (for backward compatibility)
// ============================================

/** @deprecated Use 'course' instead */
export const curriculum = course
/** @deprecated Use 'courseCatalog' instead */
export const curriculumCatalog = courseCatalog
/** @deprecated Use 'courseShare' instead */
export const curriculumShare = courseShare
/** @deprecated Use 'courseLesson' instead */
export const curriculumLesson = courseLesson
/** @deprecated Use 'courseLessonProgress' instead */
export const curriculumLessonProgress = courseLessonProgress
/** @deprecated Use 'courseEnrollment' instead */
export const curriculumEnrollment = courseEnrollment
/** @deprecated Use 'courseProgress' instead */
export const curriculumProgress = courseProgress

/** @deprecated CourseBatch table removed - use course directly */
export const courseBatch = pgTable(
  'CourseBatch',
  {
    batchId: text('id').primaryKey().notNull(),
    courseId: text('courseId').notNull(),
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
    CourseBatch_courseId_idx: index('CourseBatch_courseId_idx').on(table.courseId),
  })
)

/** @deprecated CurriculumModule table uses legacy curriculumId column name */
export const curriculumModule = pgTable(
  'CurriculumModule',
  {
    moduleId: text('id').primaryKey().notNull(),
    curriculumId: text('curriculumId').notNull(), // Note: uses curriculumId, not courseId
    title: text('title').notNull(),
    description: text('description'),
    order: integer('order').notNull(),
    builderData: jsonb('builderData'),
  },
  table => ({
    CurriculumModule_curriculumId_idx: index('CurriculumModule_curriculumId_idx').on(table.curriculumId),
    CurriculumModule_order_idx: index('CurriculumModule_order_idx').on(table.order),
  })
)
