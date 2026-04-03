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

export const aIAssistantSession = pgTable(
  'AIAssistantSession',
  {
    assistantSessionId: text('assistantSessionId').primaryKey().notNull(),
    tutorId: text('tutorId').notNull(),
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
    assistantMessageId: text('assistantMessageId').primaryKey().notNull(),
    sessionId: text('sessionId').notNull(),
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
    insightId: text('insightId').primaryKey().notNull(),
    sessionId: text('sessionId').notNull(),
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

export const clinic = pgTable(
  'Clinic',
  {
    clinicId: text('clinicId').primaryKey().notNull(),
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
    updatedAt: timestamp('updatedAt', { withTimezone: true })
      .notNull()
      .$onUpdate(() => new Date()),
  },
  table => ({
    Clinic_startTime_idx: index('Clinic_startTime_idx').on(table.startTime),
    Clinic_status_idx: index('Clinic_status_idx').on(table.status),
  })
)

export const clinicBooking = pgTable(
  'ClinicBooking',
  {
    bookingId: text('bookingId').primaryKey().notNull(),
    clinicId: text('clinicId').notNull(),
    studentId: text('studentId').notNull(),
    bookedAt: timestamp('bookedAt', { withTimezone: true }).notNull().defaultNow(),
    attended: boolean('attended').notNull(),
    requiresPayment: boolean('requiresPayment').notNull(),
  },
  table => ({
    ClinicBooking_studentId_idx: index('ClinicBooking_studentId_idx').on(table.studentId),
    ClinicBooking_clinicId_studentId_key: uniqueIndex('ClinicBooking_clinicId_studentId_key').on(
      table.clinicId,
      table.studentId
    ),
  })
)
