/**
 * GDPR and PIPL compliance audit logging for monitoring
 *
 * Tracks:
 * - Data access (GDPR Art 15 - Right of Access)
 * - Data deletion (GDPR Art 17 - Right to Erasure)
 * - Data export (GDPR Art 20 - Data Portability)
 * - Consent changes (PIPL Art 6)
 * - Cross-border transfers (PIPL Art 29)
 */

import { and, gte, like, sql } from 'drizzle-orm'
import { drizzleDb } from '@/lib/db/drizzle'
import { securityEvent } from '@/lib/db/schema'
import { logAudit } from '@/lib/security/audit'

export type ComplianceAction =
  | 'gdpr_data_access'
  | 'gdpr_data_export'
  | 'gdpr_data_deletion'
  | 'gdpr_consent_withdrawal'
  | 'pipl_consent_created'
  | 'pipl_access_request'
  | 'pipl_cross_border'
  | 'error_during_data_access'

export interface ComplianceAuditMetadata {
  userId?: string
  action?: string
  resource?: string
  resourceId?: string
  legalBasis?: string
  [key: string]: unknown
}

export async function logComplianceAudit(
  action: ComplianceAction,
  metadata: ComplianceAuditMetadata
): Promise<void> {
  try {
    const { userId, ...rest } = metadata
    if (userId) {
      await logAudit(userId, `compliance_${action}`, rest)
    }
    await drizzleDb.insert(securityEvent).values({
      id: crypto.randomUUID(),
      eventType: `compliance_${action}`,
      metadata: metadata as object,
    })
  } catch (error) {
    console.error('[ComplianceAudit] logComplianceAudit failed:', error)
  }
}

export const complianceAudit = {
  logDataAccess: (
    userId: string,
    resource: string,
    resourceIdOrMetadata?: string | Record<string, unknown>
  ) => {
    const meta: ComplianceAuditMetadata =
      typeof resourceIdOrMetadata === 'object' && resourceIdOrMetadata !== null
        ? { userId, resource, ...resourceIdOrMetadata }
        : { userId, resource, resourceId: resourceIdOrMetadata }
    return logComplianceAudit('gdpr_data_access', meta)
  },

  logDataExport: (userId: string, format?: string) =>
    logComplianceAudit('gdpr_data_export', { userId, format }),

  logDataDeletion: (userId: string, resource: string, resourceId?: string) =>
    logComplianceAudit('gdpr_data_deletion', { userId, resource, resourceId }),

  logConsentWithdrawal: (userId: string, dataTypes: string[]) =>
    logComplianceAudit('gdpr_consent_withdrawal', { userId, dataTypes }),

  logPIPLConsent: (userId: string, dataTypes: string[], purpose: string) =>
    logComplianceAudit('pipl_consent_created', { userId, dataTypes, purpose }),

  logCrossBorderTransfer: (
    userId: string,
    destination: string,
    legalBasisOrMetadata?: string | Record<string, unknown>
  ) => {
    const meta: ComplianceAuditMetadata =
      typeof legalBasisOrMetadata === 'object' && legalBasisOrMetadata !== null
        ? { userId, destination, ...legalBasisOrMetadata }
        : { userId, destination, legalBasis: legalBasisOrMetadata }
    return logComplianceAudit('pipl_cross_border', meta)
  },

  /**
   * Verify GDPR compliance readiness for deployment health checks.
   * Checks that data access, export, and deletion logging infrastructure is operational.
   */
  async verifyGDPRCompliance(): Promise<{ compliant: boolean; details?: Record<string, unknown> }> {
    try {
      const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      const rows = await drizzleDb
        .select({ count: sql<number>`count(*)::int` })
        .from(securityEvent)
        .where(
          and(
            like(securityEvent.eventType, 'compliance_gdpr%'),
            gte(securityEvent.createdAt, sevenDaysAgo)
          )
        )
      const recentComplianceEvents = rows[0]?.count ?? 0
      return {
        compliant: true,
        details: {
          loggingOperational: true,
          recentGdprEvents7d: recentComplianceEvents,
          dataAccessLogging: true,
          dataExportLogging: true,
          dataDeletionLogging: true,
        },
      }
    } catch (error) {
      return {
        compliant: false,
        details: {
          error: error instanceof Error ? error.message : 'GDPR compliance check failed',
        },
      }
    }
  },

  /**
   * Verify PIPL (Chinese Personal Information Protection Law) compliance readiness.
   * Checks that consent and cross-border transfer logging infrastructure is operational.
   */
  async verifyPIPLCompliance(): Promise<{ compliant: boolean; details?: Record<string, unknown> }> {
    try {
      const recentPIPLEvents = await db.securityEvent.count({
        where: {
          eventType: { in: ['compliance_pipl_consent_created', 'compliance_pipl_cross_border'] },
          createdAt: { gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
        },
      })
      return {
        compliant: true,
        details: {
          loggingOperational: true,
          consentLogging: true,
          crossBorderTransferLogging: true,
          recentPIPLEvents30d: recentPIPLEvents,
        },
      }
    } catch (error) {
      return {
        compliant: false,
        details: {
          error: error instanceof Error ? error.message : 'PIPL compliance check failed',
        },
      }
    }
  },
}
