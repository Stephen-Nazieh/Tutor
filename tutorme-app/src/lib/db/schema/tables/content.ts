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
import { user } from './auth'
import { course, courseLesson } from './curriculum'
import { liveSession } from './live'

export const contentItem = pgTable(
  'ContentItem',
  {
    contentId: text('id').primaryKey().notNull(),
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
    updatedAt: timestamp('updatedAt', { withTimezone: true })
      .notNull()
      .$onUpdate(() => new Date()),
  },
  table => ({
    ContentItem_subject_idx: index('ContentItem_subject_idx').on(table.subject),
    ContentItem_isPublished_idx: index('ContentItem_isPublished_idx').on(table.isPublished),
  })
)

export const videoWatchEvent = pgTable(
  'VideoWatchEvent',
  {
    eventId: text('id').primaryKey().notNull(),
    contentId: text('contentId')
      .notNull()
      .references(() => contentItem.contentId, { onDelete: 'cascade' }),
    studentId: text('studentId')
      .notNull()
      .references(() => user.userId, { onDelete: 'cascade' }),
    eventType: text('eventType').notNull(),
    videoSeconds: doublePrecision('videoSeconds').notNull(),
    createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow(),
    metadata: jsonb('metadata'),
  },
  table => ({
    VideoWatchEvent_contentId_idx: index('VideoWatchEvent_contentId_idx').on(table.contentId),
    VideoWatchEvent_studentId_idx: index('VideoWatchEvent_studentId_idx').on(table.studentId),
    VideoWatchEvent_contentId_studentId_idx: index('VideoWatchEvent_contentId_studentId_idx').on(
      table.contentId,
      table.studentId
    ),
  })
)

export const contentQuizCheckpoint = pgTable(
  'ContentQuizCheckpoint',
  {
    checkpointId: text('id').primaryKey().notNull(),
    contentId: text('contentId').notNull(),
    videoTimestampSec: integer('videoTimestampSec').notNull(),
    title: text('title'),
    questions: jsonb('questions').notNull(),
    createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updatedAt', { withTimezone: true })
      .notNull()
      .$onUpdate(() => new Date()),
  },
  table => ({
    ContentQuizCheckpoint_contentId_idx: index('ContentQuizCheckpoint_contentId_idx').on(
      table.contentId
    ),
    ContentQuizCheckpoint_contentId_videoTimestampSec_key: uniqueIndex(
      'ContentQuizCheckpoint_contentId_videoTimestampSec_key'
    ).on(table.contentId, table.videoTimestampSec),
  })
)

export const contentProgress = pgTable(
  'ContentProgress',
  {
    progressId: text('id').primaryKey().notNull(),
    contentId: text('contentId').notNull(),
    studentId: text('studentId').notNull(),
    progress: integer('progress').notNull(),
    completed: boolean('completed').notNull(),
    lastPosition: integer('lastPosition'),
    updatedAt: timestamp('updatedAt', { withTimezone: true })
      .notNull()
      .$onUpdate(() => new Date()),
  },
  table => ({
    ContentProgress_studentId_idx: index('ContentProgress_studentId_idx').on(table.studentId),
    ContentProgress_contentId_studentId_key: uniqueIndex(
      'ContentProgress_contentId_studentId_key'
    ).on(table.contentId, table.studentId),
  })
)

export const reviewSchedule = pgTable(
  'ReviewSchedule',
  {
    scheduleId: text('id').primaryKey().notNull(),
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
    updatedAt: timestamp('updatedAt', { withTimezone: true })
      .notNull()
      .$onUpdate(() => new Date()),
  },
  table => ({
    ReviewSchedule_studentId_idx: index('ReviewSchedule_studentId_idx').on(table.studentId),
    ReviewSchedule_nextReview_idx: index('ReviewSchedule_nextReview_idx').on(table.nextReview),
    ReviewSchedule_studentId_contentId_key: uniqueIndex(
      'ReviewSchedule_studentId_contentId_key'
    ).on(table.studentId, table.contentId),
  })
)

export const quizAttempt = pgTable(
  'QuizAttempt',
  {
    attemptId: text('id').primaryKey().notNull(),
    studentId: text('studentId')
      .notNull()
      .references(() => user.userId, { onDelete: 'cascade' }),
    quizId: text('quizId')
      .notNull()
      .references(() => quiz.quizId, { onDelete: 'cascade' }),
    assignmentId: text('assignmentId').references(() => quizAssignment.assignmentId, { onDelete: 'set null' }),
    answers: jsonb('answers').notNull(),
    score: integer('score').notNull(),
    maxScore: integer('maxScore').notNull(),
    completedAt: timestamp('completedAt', { withTimezone: true }).notNull().defaultNow(),
    timeSpent: integer('timeSpent').notNull(),
    questionResults: jsonb('questionResults'),
    feedback: text('feedback'),
    status: text('status').notNull(),
    attemptNumber: integer('attemptNumber').notNull(),
    startedAt: timestamp('startedAt', { withTimezone: true }).notNull().defaultNow(),
  },
  table => ({
    QuizAttempt_studentId_idx: index('QuizAttempt_studentId_idx').on(table.studentId),
    QuizAttempt_quizId_idx: index('QuizAttempt_quizId_idx').on(table.quizId),
    QuizAttempt_assignmentId_idx: index('QuizAttempt_assignmentId_idx').on(table.assignmentId),
    QuizAttempt_studentId_quizId_idx: index('QuizAttempt_studentId_quizId_idx').on(
      table.studentId,
      table.quizId
    ),
  })
)

export const questionBankItem = pgTable(
  'QuestionBankItem',
  {
    itemId: text('id').primaryKey().notNull(),
    tutorId: text('tutorId')
      .notNull()
      .references(() => user.userId, { onDelete: 'cascade' }),
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
    curriculumId: text('curriculumId'), // Note: production uses curriculumId, not courseId
    lessonId: text('lessonId'),
    isPublic: boolean('isPublic').notNull(),
    usageCount: integer('usageCount').notNull(),
    createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updatedAt', { withTimezone: true })
      .notNull()
      .$onUpdate(() => new Date()),
  },
  table => ({
    QuestionBankItem_tutorId_idx: index('QuestionBankItem_tutorId_idx').on(table.tutorId),
    QuestionBankItem_type_idx: index('QuestionBankItem_type_idx').on(table.type),
    QuestionBankItem_difficulty_idx: index('QuestionBankItem_difficulty_idx').on(table.difficulty),
    QuestionBankItem_subject_idx: index('QuestionBankItem_subject_idx').on(table.subject),
    QuestionBankItem_tags_idx: index('QuestionBankItem_tags_idx').on(table.tags),
  })
)

export const quiz = pgTable(
  'Quiz',
  {
    quizId: text('id').primaryKey().notNull(),
    tutorId: text('tutorId')
      .notNull()
      .references(() => user.userId, { onDelete: 'cascade' }),
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
    courseId: text('courseId').references(() => course.courseId, { onDelete: 'set null' }),
    lessonId: text('lessonId').references(() => courseLesson.lessonId, { onDelete: 'set null' }),
    createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updatedAt', { withTimezone: true })
      .notNull()
      .$onUpdate(() => new Date()),
  },
  table => ({
    Quiz_tutorId_idx: index('Quiz_tutorId_idx').on(table.tutorId),
    Quiz_status_idx: index('Quiz_status_idx').on(table.status),
    Quiz_type_idx: index('Quiz_type_idx').on(table.type),
    Quiz_courseId_idx: index('Quiz_courseId_idx').on(table.courseId),
    Quiz_lessonId_idx: index('Quiz_lessonId_idx').on(table.lessonId),
  })
)

export const quizAssignment = pgTable(
  'QuizAssignment',
  {
    assignmentId: text('id').primaryKey().notNull(),
    quizId: text('quizId')
      .notNull()
      .references(() => quiz.quizId, { onDelete: 'cascade' }),
    assignedByTutorId: text('assignedByTutorId')
      .notNull()
      .references(() => user.userId, { onDelete: 'cascade' }),
    assignedToType: text('assignedToType').notNull(),
    assignedToId: text('assignedToId'),
    assignedToAll: boolean('assignedToAll').notNull(),
    assignedAt: timestamp('assignedAt', { withTimezone: true }).notNull().defaultNow(),
    dueDate: timestamp('dueDate', { withTimezone: true }),
    isActive: boolean('isActive').notNull(),
  },
  table => ({
    QuizAssignment_quizId_idx: index('QuizAssignment_quizId_idx').on(table.quizId),
    QuizAssignment_assignedByTutorId_idx: index('QuizAssignment_assignedByTutorId_idx').on(
      table.assignedByTutorId
    ),
    QuizAssignment_assignedToId_idx: index('QuizAssignment_assignedToId_idx').on(
      table.assignedToId
    ),
    QuizAssignment_isActive_idx: index('QuizAssignment_isActive_idx').on(table.isActive),
  })
)

export const note = pgTable(
  'Note',
  {
    noteId: text('id').primaryKey().notNull(),
    contentId: text('contentId')
      .notNull()
      .references(() => contentItem.contentId, { onDelete: 'cascade' }),
    studentId: text('studentId')
      .notNull()
      .references(() => user.userId, { onDelete: 'cascade' }),
    content: text('content').notNull(),
    timestamp: integer('timestamp').notNull(),
    createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow(),
  },
  table => ({
    Note_contentId_idx: index('Note_contentId_idx').on(table.contentId),
    Note_studentId_idx: index('Note_studentId_idx').on(table.studentId),
  })
)

export const bookmark = pgTable(
  'Bookmark',
  {
    bookmarkId: text('id').primaryKey().notNull(),
    contentId: text('contentId')
      .notNull()
      .references(() => contentItem.contentId, { onDelete: 'cascade' }),
    studentId: text('studentId')
      .notNull()
      .references(() => user.userId, { onDelete: 'cascade' }),
    createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow(),
  },
  table => ({
    Bookmark_studentId_idx: index('Bookmark_studentId_idx').on(table.studentId),
    Bookmark_contentId_studentId_key: uniqueIndex('Bookmark_contentId_studentId_key').on(
      table.contentId,
      table.studentId
    ),
  })
)
