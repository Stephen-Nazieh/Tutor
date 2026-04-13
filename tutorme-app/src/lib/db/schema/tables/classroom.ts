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
  uniqueIndex,
  index,
  uuid,
  date,
} from 'drizzle-orm/pg-core'
import * as enums from '../enums'
import { user } from './auth'

export const aITutorEnrollment = pgTable(
  'AITutorEnrollment',
  {
    enrollmentId: text('id').primaryKey().notNull(),
    studentId: text('studentId')
      .notNull()
      .references(() => user.userId, { onDelete: 'cascade' }),
    subjectCode: text('subjectCode').notNull(),
    enrolledAt: timestamp('enrolledAt', { withTimezone: true }).notNull().defaultNow(),
    lastSessionAt: timestamp('lastSessionAt', { withTimezone: true }),
    totalSessions: integer('totalSessions').notNull(),
    totalMinutes: integer('totalMinutes').notNull(),
    status: text('status').notNull(),
  },
  table => ({
    AITutorEnrollment_studentId_idx: index('AITutorEnrollment_studentId_idx').on(table.studentId),
    AITutorEnrollment_studentId_subjectCode_key: uniqueIndex(
      'AITutorEnrollment_studentId_subjectCode_key'
    ).on(table.studentId, table.subjectCode),
  })
)

export const aIInteractionSession = pgTable(
  'AIInteractionSession',
  {
    interactionId: text('id').primaryKey().notNull(),
    studentId: text('studentId')
      .notNull()
      .references(() => user.userId, { onDelete: 'cascade' }),
    subjectCode: text('subjectCode').notNull(),
    startedAt: timestamp('startedAt', { withTimezone: true }).notNull().defaultNow(),
    endedAt: timestamp('endedAt', { withTimezone: true }),
    messageCount: integer('messageCount').notNull(),
    topicsCovered: text('topicsCovered').array().notNull(),
    summary: text('summary'),
  },
  table => ({
    AIInteractionSession_studentId_idx: index('AIInteractionSession_studentId_idx').on(
      table.studentId
    ),
    AIInteractionSession_startedAt_idx: index('AIInteractionSession_startedAt_idx').on(
      table.startedAt
    ),
  })
)

// Student memory (shared brain) - persisted context for agents

export const studentMemoryProfile = pgTable(
  'StudentMemoryProfile',
  {
    studentId: text('id')
      .primaryKey()
      .notNull()
      .references(() => user.userId, { onDelete: 'cascade' }),
    profile: jsonb('profile').notNull(),
    createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updatedAt', { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  table => ({
    StudentMemoryProfile_studentId_idx: index('StudentMemoryProfile_studentId_idx').on(
      table.studentId
    ),
  })
)

export const studentLearningState = pgTable(
  'StudentLearningState',
  {
    studentId: text('id')
      .primaryKey()
      .notNull()
      .references(() => user.userId, { onDelete: 'cascade' }),
    state: jsonb('state').notNull(),
    createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updatedAt', { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  table => ({
    StudentLearningState_studentId_idx: index('StudentLearningState_studentId_idx').on(
      table.studentId
    ),
  })
)

export const studentAgentSignal = pgTable(
  'StudentAgentSignal',
  {
    signalId: uuid('signalId').primaryKey().notNull().defaultRandom(),
    studentId: text('studentId')
      .notNull()
      .references(() => user.userId, { onDelete: 'cascade' }),
    source: text('source').notNull(),
    type: text('type').notNull(),
    content: text('content').notNull(),
    context: jsonb('context'),
    expiresAt: timestamp('expiresAt', { withTimezone: true }),
    createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow(),
  },
  table => ({
    StudentAgentSignal_studentId_idx: index('StudentAgentSignal_studentId_idx').on(table.studentId),
    StudentAgentSignal_createdAt_idx: index('StudentAgentSignal_createdAt_idx').on(table.createdAt),
  })
)

export const aITutorDailyUsage = pgTable(
  'AITutorDailyUsage',
  {
    usageId: text('id').primaryKey().notNull(),
    userId: text('userId')
      .notNull()
      .references(() => user.userId, { onDelete: 'cascade' }),
    date: date('date').notNull().defaultNow(),
    sessionCount: integer('sessionCount').notNull(),
    messageCount: integer('messageCount').notNull(),
    minutesUsed: integer('minutesUsed').notNull(),
  },
  table => ({
    AITutorDailyUsage_userId_idx: index('AITutorDailyUsage_userId_idx').on(table.userId),
    AITutorDailyUsage_userId_date_key: uniqueIndex('AITutorDailyUsage_userId_date_key').on(
      table.userId,
      table.date
    ),
  })
)

export const aITutorSubscription = pgTable('AITutorSubscription', {
  subscriptionId: text('id').primaryKey().notNull(),
  userId: text('userId')
    .notNull()
    .unique()
    .references(() => user.userId, { onDelete: 'cascade' }),
  tier: enums.tierEnum('tier').notNull(),
  dailySessions: integer('dailySessions').notNull(),
  dailyMessages: integer('dailyMessages').notNull(),
  startedAt: timestamp('startedAt', { withTimezone: true }).notNull().defaultNow(),
  expiresAt: timestamp('expiresAt', { withTimezone: true }),
  isActive: boolean('isActive').notNull(),
})
