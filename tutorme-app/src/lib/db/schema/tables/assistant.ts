/**
 * Drizzle table definitions (domain slice).
 * Aggregated via ./index.ts — keep enums in ../enums.ts.
 */
import {
  pgTable,
  text,
  boolean,
  timestamp,
  jsonb,
  index,
} from 'drizzle-orm/pg-core'
import { user } from './auth'

export const aIAssistantSession = pgTable(
  'AIAssistantSession',
  {
    assistantSessionId: text('id').primaryKey().notNull(),
    tutorId: text('tutorId')
      .notNull()
      .references(() => user.userId, { onDelete: 'cascade' }),
    title: text('title').notNull(),
    context: text('context'),
    status: text('status').notNull(),
    createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updatedAt', { withTimezone: true })
      .notNull()
      .$onUpdate(() => new Date()),
  },
  table => ({
    AIAssistantSession_tutorId_idx: index('AIAssistantSession_tutorId_idx').on(table.tutorId),
    AIAssistantSession_status_idx: index('AIAssistantSession_status_idx').on(table.status),
    AIAssistantSession_updatedAt_idx: index('AIAssistantSession_updatedAt_idx').on(table.updatedAt),
  })
)

export const aIAssistantMessage = pgTable(
  'AIAssistantMessage',
  {
    assistantMessageId: text('id').primaryKey().notNull(),
    sessionId: text('sessionId')
      .notNull()
      .references(() => aIAssistantSession.assistantSessionId, { onDelete: 'cascade' }),
    role: text('role').notNull(),
    content: text('content').notNull(),
    metadata: jsonb('metadata'),
    createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow(),
  },
  table => ({
    AIAssistantMessage_sessionId_idx: index('AIAssistantMessage_sessionId_idx').on(table.sessionId),
    AIAssistantMessage_createdAt_idx: index('AIAssistantMessage_createdAt_idx').on(table.createdAt),
  })
)

export const aIAssistantInsight = pgTable(
  'AIAssistantInsight',
  {
    insightId: text('id').primaryKey().notNull(),
    sessionId: text('sessionId')
      .notNull()
      .references(() => aIAssistantSession.assistantSessionId, { onDelete: 'cascade' }),
    type: text('type').notNull(),
    title: text('title').notNull(),
    content: text('content').notNull(),
    relatedData: jsonb('relatedData'),
    applied: boolean('applied').notNull(),
    createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow(),
  },
  table => ({
    AIAssistantInsight_sessionId_idx: index('AIAssistantInsight_sessionId_idx').on(table.sessionId),
    AIAssistantInsight_type_idx: index('AIAssistantInsight_type_idx').on(table.type),
    AIAssistantInsight_createdAt_idx: index('AIAssistantInsight_createdAt_idx').on(table.createdAt),
  })
)
