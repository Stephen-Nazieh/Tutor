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

export const studyGroup = pgTable(
  'StudyGroup',
  {
    id: text('id').primaryKey().notNull(),
    name: text('name').notNull(),
    subject: text('subject').notNull(),
    description: text('description'),
    maxMembers: integer('maxMembers').notNull(),
    createdBy: text('createdBy').notNull(),
    isActive: boolean('isActive').notNull(),
    createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updatedAt', { withTimezone: true })
      .notNull()
      .$onUpdate(() => new Date()),
  },
  table => ({
    StudyGroup_subject_idx: index('StudyGroup_subject_idx').on(table.subject),
    StudyGroup_isActive_idx: index('StudyGroup_isActive_idx').on(table.isActive),
  })
)

export const studyGroupMember = pgTable(
  'StudyGroupMember',
  {
    id: text('id').primaryKey().notNull(),
    groupId: text('groupId').notNull(),
    studentId: text('studentId').notNull(),
    joinedAt: timestamp('joinedAt', { withTimezone: true }).notNull().defaultNow(),
    role: text('role').notNull(),
  },
  table => ({
    StudyGroupMember_studentId_idx: index('StudyGroupMember_studentId_idx').on(table.studentId),
    StudyGroupMember_groupId_studentId_key: uniqueIndex(
      'StudyGroupMember_groupId_studentId_key'
    ).on(table.groupId, table.studentId),
  })
)

export const userActivityLog = pgTable(
  'UserActivityLog',
  {
    id: text('id').primaryKey().notNull(),
    userId: text('userId').notNull(),
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
    id: text('id').primaryKey().notNull(),
    name: text('name').notNull(),
    keyHash: text('keyHash').notNull(),
    createdById: text('createdById'),
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
