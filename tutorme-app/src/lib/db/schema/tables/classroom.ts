/**
 * Drizzle table definitions (domain slice).
 * Aggregated via ./index.ts — keep enums in ../enums.ts.
 *
 * NOTE: AI Tutor tables have been removed as part of feature cleanup.
 * Tables removed: AITutorEnrollment, AIInteractionSession, AITutorDailyUsage, AITutorSubscription
 */
import { pgTable, text, timestamp, jsonb, uniqueIndex, index, uuid } from 'drizzle-orm/pg-core'
import { user } from './auth'

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

// AI Tutor tables removed - feature deleted
// Tables removed: AITutorEnrollment, AIInteractionSession, AITutorDailyUsage, AITutorSubscription
