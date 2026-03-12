/**
 * Compliance schema — COPPA, FERPA, GDPR tables.
 * Covers: consent logs, data deletion requests, PII access audit logs,
 * age verification, and third-party audits.
 */
import {
  pgTable, text, timestamp, boolean, jsonb, index, uniqueIndex
} from 'drizzle-orm/pg-core'

/**
 * Consent records — captures when and what a user agreed to.
 * Required for GDPR Art.7 and COPPA (parental consent for <13).
 */
export const consentLog = pgTable('consent_logs', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull(),
  consentType: text('consent_type').notNull(), // 'tos', 'privacy_policy', 'ai_data_use', 'parental_consent', 'marketing'
  consentVersion: text('consent_version').notNull(), // e.g. '2024-01'
  granted: boolean('granted').notNull(),
  ipAddress: text('ip_address'), // hashed — never raw
  userAgent: text('user_agent'),
  grantedAt: timestamp('granted_at').defaultNow().notNull(),
  revokedAt: timestamp('revoked_at'),
  // For COPPA: parent grants consent on behalf of child
  parentUserId: text('parent_user_id'),
  notes: text('notes'),
}, (t) => ({
  consent_userId_idx: index('consent_userId_idx').on(t.userId),
  consent_type_idx: index('consent_type_idx').on(t.consentType),
}))

/**
 * Data deletion requests — "Right to be Forgotten" (GDPR Art.17, COPPA).
 * Admin dashboard shows pending requests.
 */
export const deletionRequest = pgTable('deletion_requests', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull(),
  requestedBy: text('requested_by').notNull(), // could be the user themselves or a parent
  reason: text('reason'),
  status: text('status').notNull().default('pending'), // 'pending', 'processing', 'completed', 'rejected'
  requestedAt: timestamp('requested_at').defaultNow().notNull(),
  processedAt: timestamp('processed_at'),
  processedBy: text('processed_by'), // admin user id
  adminNotes: text('admin_notes'),
  // Pseudonymized record kept for legal compliance
  pseudonymizedId: text('pseudonymized_id'),
}, (t) => ({
  deletion_status_idx: index('deletion_status_idx').on(t.status),
  deletion_userId_idx: index('deletion_userId_idx').on(t.userId),
}))

/**
 * PII access audit log — Phase 5: Trace access, not content.
 * Logs WHO accessed WHAT type of data, NOT the actual data values.
 * Required for FERPA (educational records access log).
 */
export const piiAccessLog = pgTable('pii_access_logs', {
  id: text('id').primaryKey(),
  accessorId: text('accessor_id').notNull(),     // who made the access
  accessorRole: text('accessor_role').notNull(),  // STUDENT, TUTOR, PARENT, ADMIN
  targetUserId: text('target_user_id'),           // whose data was accessed
  resourceType: text('resource_type').notNull(),  // 'student_profile', 'quiz_attempt', 'ai_session', etc.
  resourceId: text('resource_id'),
  action: text('action').notNull(),               // 'read', 'export', 'delete', 'update'
  endpoint: text('endpoint').notNull(),           // e.g. '/api/student/profile'
  ipHash: text('ip_hash'),                        // hashed IP — never raw
  accessedAt: timestamp('accessed_at').defaultNow().notNull(),
  // Compliance metadata
  legalBasis: text('legal_basis'),                // 'legitimate_interest', 'consent', 'contract', etc.
}, (t) => ({
  pii_accessorId_idx: index('pii_accessorId_idx').on(t.accessorId),
  pii_targetUserId_idx: index('pii_targetUserId_idx').on(t.targetUserId),
  pii_accessedAt_idx: index('pii_accessedAt_idx').on(t.accessedAt),
  pii_resourceType_idx: index('pii_resourceType_idx').on(t.resourceType),
}))

/**
 * Third-party service audit — Phase 3.
 * Records all external services the platform integrates with and their compliance status.
 */
export const thirdPartyAudit = pgTable('third_party_audits', {
  id: text('id').primaryKey(),
  serviceName: text('service_name').notNull().unique(),
  category: text('category').notNull(),           // 'ai_provider', 'video', 'payment', 'monitoring', 'auth'
  dataProcessed: jsonb('data_processed').notNull(), // list of data types shared
  gdprCompliant: boolean('gdpr_compliant').notNull().default(false),
  coppaCompliant: boolean('coppa_compliant').notNull().default(false),
  ferpaCompliant: boolean('ferpa_compliant').notNull().default(false),
  dataProcessingAgreement: boolean('dpa_signed').notNull().default(false),
  noTrainingClause: boolean('no_training_clause').notNull().default(false), // AI providers
  privacyPolicyUrl: text('privacy_policy_url'),
  notes: text('notes'),
  lastAuditedAt: timestamp('last_audited_at').defaultNow().notNull(),
  auditedBy: text('audited_by'),
})

/**
 * Data export requests — GDPR Art.20 (Right to Data Portability).
 */
export const dataExportRequest = pgTable('data_export_requests', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull(),
  status: text('status').notNull().default('pending'), // 'pending', 'processing', 'ready', 'expired'
  requestedAt: timestamp('requested_at').defaultNow().notNull(),
  completedAt: timestamp('completed_at'),
  downloadUrl: text('download_url'),   // signed, time-limited URL
  expiresAt: timestamp('expires_at'),  // download link expires
}, (t) => ({
  export_userId_idx: index('export_userId_idx').on(t.userId),
  export_status_idx: index('export_status_idx').on(t.status),
}))

/**
 * Age verification records — COPPA compliance.
 * Stored separately from profile to minimise PII in main tables.
 */
export const ageVerification = pgTable('age_verifications', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().unique(),
  isMinor: boolean('is_minor').notNull(),          // true if age < 13 (COPPA) or < 16 (GDPR)
  ageGroup: text('age_group').notNull(),           // 'under_13', '13_to_15', '16_to_17', '18_plus'
  parentConsentRequired: boolean('parent_consent_required').notNull(),
  parentConsentGranted: boolean('parent_consent_granted').notNull().default(false),
  parentUserId: text('parent_user_id'),
  verifiedAt: timestamp('verified_at').defaultNow().notNull(),
}, (t) => ({
  ageverif_userId_key: uniqueIndex('ageverif_userId_key').on(t.userId),
}))

/**
 * Privacy policy versions — track which version each user accepted.
 */
export const privacyPolicyVersion = pgTable('privacy_policy_versions', {
  id: text('id').primaryKey(),
  version: text('version').notNull().unique(), // e.g. '2024-01', '2024-06'
  effectiveDate: timestamp('effective_date').notNull(),
  summary: text('summary').notNull(),
  fullTextUrl: text('full_text_url'),
  isActive: boolean('is_active').notNull().default(false),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})
