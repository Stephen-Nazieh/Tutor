/**
 * Audit logging for data access and sensitive actions.
 * Writes to UserActivityLog for compliance and security review.
 */

import { db } from '@/lib/db'

export const AUDIT_ACTIONS = {
  PROFILE_VIEW: 'audit_profile_view',
  PROFILE_UPDATE: 'audit_profile_update',
  DATA_EXPORT: 'audit_data_export',
  DATA_DELETE: 'audit_data_delete',
  PAYMENT_CREATE: 'audit_payment_create',
  PAYMENT_REFUND: 'audit_payment_refund',
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
    await db.userActivityLog.create({
      data: {
        userId,
        action,
        metadata: (metadata ?? {}) as object
      }
    })
  } catch (error) {
    console.error('Audit log failed:', error)
  }
}
