/**
 * Drizzle table definitions (domain slice).
 * Aggregated via ./index.ts — keep enums in ../enums.ts.
 */
import {
  pgTable,
  text,
  timestamp,
  jsonb,
  index,
} from 'drizzle-orm/pg-core'
import { user } from './auth'

export const userActivityLog = pgTable(
  'UserActivityLog',
  {
    activityId: text('id').primaryKey().notNull(),
    userId: text('userId')
      .notNull()
      .references(() => user.userId, { onDelete: 'cascade' }),
    action: text('action').notNull(),
    metadata: jsonb('metadata'),
    createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow(),
  },
  table => ({
    UserActivityLog_userId_idx: index('UserActivityLog_userId_idx').on(table.userId),
    UserActivityLog_createdAt_idx: index('UserActivityLog_createdAt_idx').on(table.createdAt),
    idx_user_activity_user_created: index('idx_user_activity_user_created').on(
      table.userId,
      table.createdAt
    ),
  })
)

export const apiKey = pgTable(
  'ApiKey',
  {
    apiKeyId: text('id').primaryKey().notNull(),
    name: text('name').notNull(),
    keyHash: text('keyHash').notNull(),
    createdById: text('createdById').references(() => user.userId, { onDelete: 'set null' }),
    createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow(),
    lastUsedAt: timestamp('lastUsedAt', { withTimezone: true }),
  },
  table => ({
    ApiKey_keyHash_idx: index('ApiKey_keyHash_idx').on(table.keyHash),
  })
)

export const securityEvent = pgTable(
  'SecurityEvent',
  {
    eventId: text('id').primaryKey().notNull(),
    eventType: text('eventType').notNull(),
    ip: text('ip'),
    metadata: jsonb('metadata'),
    createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow(),
    action: text('action'),
    userId: text('userId').references(() => user.userId, { onDelete: 'set null' }),
    actorId: text('actorId').references(() => user.userId, { onDelete: 'set null' }),
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
    occurredAt: timestamp('occurredAt', { withTimezone: true }),
  },
  table => ({
    SecurityEvent_eventType_idx: index('SecurityEvent_eventType_idx').on(table.eventType),
    SecurityEvent_action_idx: index('SecurityEvent_action_idx').on(table.action),
    SecurityEvent_severity_idx: index('SecurityEvent_severity_idx').on(table.severity),
    SecurityEvent_createdAt_idx: index('SecurityEvent_createdAt_idx').on(table.createdAt),
    SecurityEvent_occurredAt_idx: index('SecurityEvent_occurredAt_idx').on(table.occurredAt),
    SecurityEvent_ip_idx: index('SecurityEvent_ip_idx').on(table.ip),
    SecurityEvent_userId_idx: index('SecurityEvent_userId_idx').on(table.userId),
  })
)
