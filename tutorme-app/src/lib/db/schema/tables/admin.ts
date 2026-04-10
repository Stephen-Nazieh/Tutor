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

export const adminRole = pgTable('AdminRole', {
  roleId: text('id').primaryKey().notNull(),
  name: text('name').notNull().unique(),
  description: text('description'),
  permissions: jsonb('permissions').notNull(),
  createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updatedAt', { withTimezone: true })
    .notNull()
    .$onUpdate(() => new Date()),
})

export const adminAssignment = pgTable(
  'AdminAssignment',
  {
    assignmentId: text('id').primaryKey().notNull(),
    userId: text('userId')
      .notNull()
      .references(() => user.userId, { onDelete: 'cascade' }),
    roleId: text('roleId')
      .notNull()
      .references(() => adminRole.roleId, { onDelete: 'cascade' }),
    assignedBy: text('assignedBy').references(() => user.userId, { onDelete: 'set null' }),
    createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow(),
    expiresAt: timestamp('expiresAt', { withTimezone: true }),
    isActive: boolean('isActive').notNull(),
  },
  table => ({
    AdminAssignment_userId_idx: index('AdminAssignment_userId_idx').on(table.userId),
    AdminAssignment_roleId_idx: index('AdminAssignment_roleId_idx').on(table.roleId),
    AdminAssignment_userId_roleId_key: uniqueIndex('AdminAssignment_userId_roleId_key').on(
      table.userId,
      table.roleId
    ),
  })
)

export const featureFlag = pgTable(
  'FeatureFlag',
  {
    flagId: text('id').primaryKey().notNull(),
    key: text('key').notNull().unique(),
    name: text('name').notNull(),
    description: text('description'),
    enabled: boolean('enabled').notNull(),
    scope: text('scope').notNull(),
    targetValue: jsonb('targetValue'),
    config: jsonb('config').notNull(),
    createdBy: text('createdBy').references(() => user.userId, { onDelete: 'set null' }),
    updatedBy: text('updatedBy').references(() => user.userId, { onDelete: 'set null' }),
    createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updatedAt', { withTimezone: true })
      .notNull()
      .$onUpdate(() => new Date()),
    deletedAt: timestamp('deletedAt', { withTimezone: true }),
  },
  table => ({
    FeatureFlag_key_idx: index('FeatureFlag_key_idx').on(table.key),
    FeatureFlag_scope_idx: index('FeatureFlag_scope_idx').on(table.scope),
    FeatureFlag_enabled_idx: index('FeatureFlag_enabled_idx').on(table.enabled),
  })
)

export const featureFlagChange = pgTable(
  'FeatureFlagChange',
  {
    changeId: text('id').primaryKey().notNull(),
    flagId: text('flagId')
      .notNull()
      .references(() => featureFlag.flagId, { onDelete: 'cascade' }),
    changedBy: text('changedBy')
      .notNull()
      .references(() => user.userId, { onDelete: 'cascade' }),
    previousValue: jsonb('previousValue'),
    newValue: jsonb('newValue'),
    changeReason: text('changeReason'),
    createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow(),
  },
  table => ({
    FeatureFlagChange_flagId_idx: index('FeatureFlagChange_flagId_idx').on(table.flagId),
    FeatureFlagChange_changedBy_idx: index('FeatureFlagChange_changedBy_idx').on(table.changedBy),
    FeatureFlagChange_createdAt_idx: index('FeatureFlagChange_createdAt_idx').on(table.createdAt),
  })
)

export const llmProvider = pgTable('LlmProvider', {
  providerId: text('id').primaryKey().notNull(),
  name: text('name').notNull(),
  providerType: text('providerType').notNull(),
  apiKeyEncrypted: text('apiKeyEncrypted'),
  baseUrl: text('baseUrl'),
  isActive: boolean('isActive').notNull(),
  isDefault: boolean('isDefault').notNull(),
  priority: integer('priority').notNull(),
  config: jsonb('config').notNull(),
  rateLimits: jsonb('rateLimits').notNull(),
  costPer1kTokens: doublePrecision('costPer1kTokens'),
  createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updatedAt', { withTimezone: true })
    .notNull()
    .$onUpdate(() => new Date()),
})

export const llmModel = pgTable(
  'LlmModel',
  {
    modelId: text('id').primaryKey().notNull(),
    providerId: text('providerId')
      .notNull()
      .references(() => llmProvider.providerId, { onDelete: 'cascade' }),
    modelKey: text('modelKey').notNull(),
    name: text('name'),
    description: text('description'),
    maxTokens: integer('maxTokens'),
    supportsVision: boolean('supportsVision').notNull(),
    supportsFunctions: boolean('supportsFunctions').notNull(),
    isActive: boolean('isActive').notNull(),
    config: jsonb('config').notNull(),
    createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow(),
  },
  table => ({
    LlmModel_providerId_idx: index('LlmModel_providerId_idx').on(table.providerId),
    LlmModel_isActive_idx: index('LlmModel_isActive_idx').on(table.isActive),
    LlmModel_providerId_modelKey_key: uniqueIndex('LlmModel_providerId_modelKey_key').on(
      table.providerId,
      table.modelKey
    ),
  })
)

export const llmRoutingRule = pgTable(
  'LlmRoutingRule',
  {
    ruleId: text('id').primaryKey().notNull(),
    name: text('name'),
    description: text('description'),
    priority: integer('priority').notNull(),
    conditions: jsonb('conditions').notNull(),
    targetModelId: text('targetModelId')
      .notNull()
      .references(() => llmModel.modelId, { onDelete: 'cascade' }),
    fallbackModelId: text('fallbackModelId').references(() => llmModel.modelId, {
      onDelete: 'set null',
    }),
    isActive: boolean('isActive').notNull(),
    createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow(),
    providerId: text('providerId')
      .notNull()
      .references(() => llmProvider.providerId, { onDelete: 'cascade' }),
  },
  table => ({
    LlmRoutingRule_targetModelId_idx: index('LlmRoutingRule_targetModelId_idx').on(
      table.targetModelId
    ),
    LlmRoutingRule_isActive_idx: index('LlmRoutingRule_isActive_idx').on(table.isActive),
    LlmRoutingRule_priority_idx: index('LlmRoutingRule_priority_idx').on(table.priority),
  })
)

export const systemSetting = pgTable(
  'SystemSetting',
  {
    settingId: text('id').primaryKey().notNull(),
    category: text('category').notNull(),
    key: text('key').notNull(),
    settingValue: jsonb('setting_value').notNull(),
    valueType: text('valueType').notNull(),
    description: text('description'),
    isEditable: boolean('isEditable').notNull(),
    requiresRestart: boolean('requiresRestart').notNull(),
    updatedBy: text('updatedBy'),
    createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updatedAt', { withTimezone: true })
      .notNull()
      .$onUpdate(() => new Date()),
  },
  table => ({
    SystemSetting_category_idx: index('SystemSetting_category_idx').on(table.category),
    SystemSetting_key_idx: index('SystemSetting_key_idx').on(table.key),
    SystemSetting_category_key_key: uniqueIndex('SystemSetting_category_key_key').on(
      table.category,
      table.key
    ),
  })
)

export const adminAuditLog = pgTable(
  'AdminAuditLog',
  {
    auditLogId: text('id').primaryKey().notNull(),
    adminId: text('adminId').notNull(),
    action: text('action').notNull(),
    resourceType: text('resourceType'),
    resourceId: text('resourceId'),
    previousState: jsonb('previousState'),
    newState: jsonb('newState'),
    metadata: jsonb('metadata'),
    ipAddress: text('ipAddress'),
    userAgent: text('userAgent'),
    createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow(),
  },
  table => ({
    AdminAuditLog_adminId_idx: index('AdminAuditLog_adminId_idx').on(table.adminId),
    AdminAuditLog_action_idx: index('AdminAuditLog_action_idx').on(table.action),
    AdminAuditLog_resourceType_idx: index('AdminAuditLog_resourceType_idx').on(table.resourceType),
    AdminAuditLog_createdAt_idx: index('AdminAuditLog_createdAt_idx').on(table.createdAt),
  })
)

export const adminSession = pgTable(
  'AdminSession',
  {
    sessionId: text('id').primaryKey().notNull(),
    adminId: text('adminId').notNull(),
    token: text('token').notNull().unique(),
    ipAddress: text('ipAddress'),
    userAgent: text('userAgent'),
    startedAt: timestamp('startedAt', { withTimezone: true }).notNull().defaultNow(),
    lastActiveAt: timestamp('lastActiveAt', { withTimezone: true }).notNull().defaultNow(),
    expiresAt: timestamp('expiresAt', { withTimezone: true }).notNull(),
    isRevoked: boolean('isRevoked').notNull(),
  },
  table => ({
    AdminSession_adminId_idx: index('AdminSession_adminId_idx').on(table.adminId),
    AdminSession_token_idx: index('AdminSession_token_idx').on(table.token),
    AdminSession_expiresAt_idx: index('AdminSession_expiresAt_idx').on(table.expiresAt),
  })
)

export const ipWhitelist = pgTable(
  'IpWhitelist',
  {
    whitelistId: text('id').primaryKey().notNull(),
    ipAddress: text('ipAddress').notNull().unique(),
    description: text('description'),
    isActive: boolean('isActive').notNull(),
    createdBy: text('createdBy'),
    createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow(),
    expiresAt: timestamp('expiresAt', { withTimezone: true }),
  },
  table => ({
    IpWhitelist_ipAddress_idx: index('IpWhitelist_ipAddress_idx').on(table.ipAddress),
    IpWhitelist_isActive_idx: index('IpWhitelist_isActive_idx').on(table.isActive),
  })
)
