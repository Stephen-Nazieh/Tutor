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
} from 'drizzle-orm/pg-core'
import * as enums from '../enums'

import { user } from './auth'

export const familyAccount = pgTable(
  'FamilyAccount',
  {
    familyAccountId: text('id').primaryKey().notNull(),
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
    updatedAt: timestamp('updatedAt', { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
    verifiedAt: timestamp('verifiedAt', { withTimezone: true }),
  },
  table => ({
    FamilyAccount_isActive_idx: index('FamilyAccount_isActive_idx').on(table.isActive),
    FamilyAccount_isVerified_idx: index('FamilyAccount_isVerified_idx').on(table.isVerified),
    FamilyAccount_createdAt_idx: index('FamilyAccount_createdAt_idx').on(table.createdAt),
    idx_family_account_status: index('idx_family_account_status').on(
      table.isActive,
      table.isVerified
    ),
    idx_family_account_active_created: index('idx_family_account_active_created').on(
      table.isActive,
      table.createdAt
    ),
    idx_family_account_type_status: index('idx_family_account_type_status').on(
      table.familyType,
      table.isActive
    ),
  })
)

export const familyMember = pgTable(
  'FamilyMember',
  {
    familyMemberId: text('id').primaryKey().notNull(),
    familyAccountId: text('familyAccountId')
      .notNull()
      .references(() => familyAccount.familyAccountId, { onDelete: 'cascade' }),
    userId: text('userId').references(() => user.userId, { onDelete: 'set null' }),
    name: text('name').notNull(),
    relation: text('relation').notNull(),
    email: text('email'),
    phone: text('phone'),
    createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updatedAt', { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  table => ({
    FamilyMember_familyAccountId_idx: index('FamilyMember_familyAccountId_idx').on(
      table.familyAccountId
    ),
    FamilyMember_userId_idx: index('FamilyMember_userId_idx').on(table.userId),
    idx_family_member_account_user: index('idx_family_member_account_user').on(
      table.familyAccountId,
      table.userId
    ),
    idx_family_member_user_relation: index('idx_family_member_user_relation').on(
      table.userId,
      table.relation
    ),
  })
)

export const familyBudget = pgTable(
  'FamilyBudget',
  {
    budgetId: text('id').primaryKey().notNull(),
    parentId: text('parentId')
      .notNull()
      .references(() => user.userId, { onDelete: 'cascade' }),
    month: integer('month').notNull(),
    year: integer('year').notNull(),
    amount: doublePrecision('amount').notNull(),
    spent: doublePrecision('spent').notNull(),
    createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updatedAt', { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  table => ({
    FamilyBudget_parentId_idx: index('FamilyBudget_parentId_idx').on(table.parentId),
    idx_family_budget_parent_period: index('idx_family_budget_parent_period').on(
      table.parentId,
      table.year,
      table.month
    ),
    FamilyBudget_parentId_month_year_key: uniqueIndex('FamilyBudget_parentId_month_year_key').on(
      table.parentId,
      table.month,
      table.year
    ),
  })
)

export const familyPayment = pgTable(
  'FamilyPayment',
  {
    familyPaymentId: text('id').primaryKey().notNull(),
    parentId: text('parentId')
      .notNull()
      .references(() => user.userId, { onDelete: 'cascade' }),
    amount: doublePrecision('amount').notNull(),
    method: text('method').notNull(),
    status: text('status').notNull(),
    createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updatedAt', { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  table => ({
    FamilyPayment_parentId_idx: index('FamilyPayment_parentId_idx').on(table.parentId),
    idx_family_payment_parent_created: index('idx_family_payment_parent_created').on(
      table.parentId,
      table.createdAt
    ),
    idx_family_payment_parent_status_created: index('idx_family_payment_parent_status_created').on(
      table.parentId,
      table.status,
      table.createdAt
    ),
  })
)

export const budgetAlert = pgTable(
  'BudgetAlert',
  {
    alertId: text('id').primaryKey().notNull(),
    parentId: text('parentId')
      .notNull()
      .references(() => user.userId, { onDelete: 'cascade' }),
    type: text('type').notNull(),
    message: text('message').notNull(),
    isRead: boolean('isRead').notNull(),
    createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow(),
  },
  table => ({
    BudgetAlert_parentId_idx: index('BudgetAlert_parentId_idx').on(table.parentId),
  })
)

export const parentActivityLog = pgTable(
  'ParentActivityLog',
  {
    activityLogId: text('id').primaryKey().notNull(),
    parentId: text('parentId')
      .notNull()
      .references(() => user.userId, { onDelete: 'cascade' }),
    action: text('action').notNull(),
    details: text('details'),
    createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow(),
  },
  table => ({
    ParentActivityLog_parentId_idx: index('ParentActivityLog_parentId_idx').on(table.parentId),
    idx_parent_activity_parent_created: index('idx_parent_activity_parent_created').on(
      table.parentId,
      table.createdAt
    ),
  })
)

export const familyNotification = pgTable(
  'FamilyNotification',
  {
    notificationId: text('id').primaryKey().notNull(),
    parentId: text('parentId')
      .notNull()
      .references(() => user.userId, { onDelete: 'cascade' }),
    title: text('title').notNull(),
    message: text('message').notNull(),
    isRead: boolean('isRead').notNull(),
    createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow(),
  },
  table => ({
    FamilyNotification_parentId_idx: index('FamilyNotification_parentId_idx').on(table.parentId),
    idx_family_notification_parent_created: index('idx_family_notification_parent_created').on(
      table.parentId,
      table.createdAt
    ),
    idx_family_notification_parent_read_created: index(
      'idx_family_notification_parent_read_created'
    ).on(table.parentId, table.isRead, table.createdAt),
  })
)

export const emergencyContact = pgTable(
  'EmergencyContact',
  {
    contactId: text('id').primaryKey().notNull(),
    parentId: text('parentId')
      .notNull()
      .references(() => user.userId, { onDelete: 'cascade' }),
    name: text('name').notNull(),
    relation: text('relation').notNull(),
    phone: text('phone').notNull(),
    email: text('email'),
    isPrimary: boolean('isPrimary').notNull(),
    createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow(),
  },
  table => ({
    EmergencyContact_parentId_idx: index('EmergencyContact_parentId_idx').on(table.parentId),
    idx_emergency_contact_parent_primary: index('idx_emergency_contact_parent_primary').on(
      table.parentId,
      table.isPrimary
    ),
    idx_emergency_contact_parent_primary_created: index(
      'idx_emergency_contact_parent_primary_created'
    ).on(table.parentId, table.isPrimary, table.createdAt),
  })
)

export const studentProgressSnapshot = pgTable(
  'StudentProgressSnapshot',
  {
    snapshotId: text('id').primaryKey().notNull(),
    parentId: text('parentId')
      .notNull()
      .references(() => user.userId, { onDelete: 'cascade' }),
    studentId: text('studentId').notNull(),
    data: jsonb('data').notNull(),
    capturedAt: timestamp('capturedAt', { withTimezone: true }).notNull().defaultNow(),
  },
  table => ({
    StudentProgressSnapshot_parentId_idx: index('StudentProgressSnapshot_parentId_idx').on(
      table.parentId
    ),
    StudentProgressSnapshot_studentId_idx: index('StudentProgressSnapshot_studentId_idx').on(
      table.studentId
    ),
    idx_student_progress_parent_captured: index('idx_student_progress_parent_captured').on(
      table.parentId,
      table.capturedAt
    ),
    idx_student_progress_student_captured: index('idx_student_progress_student_captured').on(
      table.studentId,
      table.capturedAt
    ),
  })
)

export const parentPaymentAuthorization = pgTable(
  'ParentPaymentAuthorization',
  {
    authorizationId: text('id').primaryKey().notNull(),
    parentId: text('parentId')
      .notNull()
      .unique()
      .references(() => user.userId, { onDelete: 'cascade' }),
    level: text('level').notNull(),
    maxAmount: doublePrecision('maxAmount'),
    methods: text('methods').array().notNull(),
    isActive: boolean('isActive').notNull(),
    createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updatedAt', { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  table => ({
    ParentPaymentAuthorization_parentId_idx: index('ParentPaymentAuthorization_parentId_idx').on(
      table.parentId
    ),
  })
)

export const parentSpendingLimit = pgTable(
  'ParentSpendingLimit',
  {
    spendingLimitId: text('id').primaryKey().notNull(),
    parentId: text('parentId')
      .notNull()
      .references(() => user.userId, { onDelete: 'cascade' }),
    category: text('category').notNull(),
    limit: doublePrecision('limit').notNull(),
    period: text('period').notNull(),
    isActive: boolean('isActive').notNull(),
    createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updatedAt', { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  table => ({
    ParentSpendingLimit_parentId_idx: index('ParentSpendingLimit_parentId_idx').on(table.parentId),
  })
)
