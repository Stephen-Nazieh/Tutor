/**
 * Audit logging for data access and sensitive actions.
 * Writes to UserActivityLog for compliance and security review (Drizzle ORM).
 */

import { drizzleDb } from '@/lib/db/drizzle'
import { userActivityLog } from '@/lib/db/schema'

export const AUDIT_ACTIONS = {
  PROFILE_VIEW: 'audit_profile_view',
  PROFILE_UPDATE: 'audit_profile_update',
  DATA_EXPORT: 'audit_data_export',
  DATA_DELETE: 'audit_data_delete',
  PAYMENT_CREATE: 'audit_payment_create',
  PAYMENT_REFUND: 'audit_payment_refund',
  PAYMENT_ALERT: 'audit_payment_alert',
  COURSE_SHARE: 'audit_course_share',
  ADMIN_ACCESS: 'audit_admin_access',
  SENSITIVE_ACCESS: 'audit_sensitive_access'
} as const

export type AuditAction = (typeof AUDIT_ACTIONS)[keyof typeof AUDIT_ACTIONS]

export interface AuditMetadata {
  resource?: string
  resourceId?: string
  ip?: string
  userAgent?: string
  [key: string]: unknown
}

/**
 * Log an audit event (data access or sensitive action).
 * Fire-and-forget; does not throw.
 */
export async function logAudit(
  userId: string,
  action: AuditAction | string,
  metadata?: AuditMetadata
): Promise<void> {
  try {
    await drizzleDb.insert(userActivityLog).values({
      id: crypto.randomUUID(),
      userId,
      action,
      metadata: (metadata ?? {}) as object,
    })
  } catch (error) {
    console.error('Audit log failed:', error)
  }
}
