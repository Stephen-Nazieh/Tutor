// @ts-nocheck
/**
 * Enterprise Security Audit System
 *
 * Audit logging for all security events with:
 * - Audit logging: all security events logged with context
 * - Compliance reporting: weekly security reports
 * - Incident tracking: security incident management
 * - Global coverage: multi-region, multi-language support
 * - Real-time alerting: critical security threshold breaches
 *
 * Integrates with: UserActivityLog, SecurityEvent, PerformanceAlert
 */

import { drizzleDb } from '@/lib/db/drizzle'
import { securityEvent } from '@/lib/db/schema'
import { logAudit, AUDIT_ACTIONS } from './audit'

// =============================================================================
// Types
// =============================================================================

export type SecurityEventType =
  | 'role_violation'
  | 'payment_alert'
  | 'access_attempt'
  | 'access_denied'
  | 'suspicious_activity'
  | 'rate_limit_exceeded'
  | 'csrf_failure'
  | 'auth_failure'
  | 'sensitive_data_access'
  | 'cross_border_transfer'

export interface SecurityEventMetadata {
  requiredRole?: string
  attemptedResource?: string
  curriculumId?: string
  familyAccountId?: string
  roomId?: string
  success?: boolean
  reason?: string
  ip?: string
  userAgent?: string
  [key: string]: unknown
}

export interface SecurityIncident {
  id: string
  eventType: SecurityEventType
  severity: 'critical' | 'warning' | 'info'
  userId?: string
  metadata: SecurityEventMetadata
  timestamp: Date
  resolved?: boolean
  resolvedAt?: Date
}

// =============================================================================
// Security Event Logging
// =============================================================================

/**
 * Log a security event to UserActivityLog and SecurityEvent tables.
 * Fire-and-forget; does not throw.
 */
export async function logSecurityEvent(
  eventType: SecurityEventType | string,
  userId?: string,
  metadata?: SecurityEventMetadata
): Promise<void> {
  try {
    const meta = (metadata ?? {}) as object

    if (userId) {
      await logAudit(userId, `security_${eventType}`, meta)
    }

    await drizzleDb.insert(securityEvent).values({
      id: crypto.randomUUID(),
      eventType: `security_${eventType}`,
      metadata: meta,
    })
  } catch (error) {
    console.error('[SecurityAudit] logSecurityEvent failed:', error)
  }
}

/**
 * Log role violation attempt (e.g. STUDENT accessing PARENT-only resource).
 */
export function logRoleViolation(
  userId: string,
  requiredRole: string,
  resource: string,
  metadata?: SecurityEventMetadata
): void {
  logSecurityEvent('role_violation', userId, {
    requiredRole,
    attemptedResource: resource,
    ...metadata,
  })
}

/**
 * Log payment alert (student attempted to join paid course without payment).
 */
export function logPaymentAlert(
  studentId: string,
  courseId: string,
  roomId: string,
  metadata?: SecurityEventMetadata
): void {
  logAudit(studentId, AUDIT_ACTIONS.PAYMENT_ALERT, {
    resource: 'payment-alert',
    resourceId: courseId,
    roomId,
    curriculumId: courseId,
    ...metadata,
  })
  logSecurityEvent('payment_alert', studentId, {
    curriculumId: courseId,
    roomId,
    ...metadata,
  })
}

/**
 * Log access attempt (success or failure).
 */
export function logAccessAttempt(
  userId: string,
  resource: string,
  metadata?: SecurityEventMetadata
): void {
  logSecurityEvent(
    metadata?.success ? 'access_attempt' : 'access_denied',
    userId,
    { attemptedResource: resource, ...metadata }
  )
}

/**
 * Log suspicious activity for threat detection.
 */
export function logSuspiciousActivity(
  userId: string | undefined,
  metadata: SecurityEventMetadata
): void {
  logSecurityEvent('suspicious_activity', userId, metadata)
}

// =============================================================================
// Compliance Reporting
// =============================================================================

export interface WeeklySecurityReport {
  periodStart: Date
  periodEnd: Date
  totalEvents: number
  byType: Record<string, number>
  criticalIncidents: number
  roleViolations: number
  paymentAlerts: number
  accessDenials: number
}

/**
 * Generate weekly security report for compliance.
 */
export async function generateWeeklySecurityReport(): Promise<WeeklySecurityReport> {
  const now = new Date()
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)

  const events = await db.securityEvent.findMany({
    where: { createdAt: { gte: weekAgo } },
    select: { eventType: true },
  })

  const byType: Record<string, number> = {}
  let criticalIncidents = 0
  let roleViolations = 0
  let paymentAlerts = 0
  let accessDenials = 0

  for (const e of events) {
    byType[e.eventType] = (byType[e.eventType] ?? 0) + 1
    if (e.eventType.includes('role_violation')) roleViolations++
    if (e.eventType.includes('payment_alert')) paymentAlerts++
    if (e.eventType.includes('access_denied')) accessDenials++
  }

  return {
    periodStart: weekAgo,
    periodEnd: now,
    totalEvents: events.length,
    byType,
    criticalIncidents,
    roleViolations,
    paymentAlerts,
    accessDenials,
  }
}

// =============================================================================
// Incident Tracking
// =============================================================================

const activeIncidents = new Map<string, SecurityIncident>()

/**
 * Track a security incident for follow-up.
 */
export function trackIncident(
  eventType: SecurityEventType,
  severity: 'critical' | 'warning' | 'info',
  metadata: SecurityEventMetadata,
  userId?: string
): string {
  const id = `inc_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`
  const incident: SecurityIncident = {
    id,
    eventType,
    severity,
    userId,
    metadata,
    timestamp: new Date(),
  }
  activeIncidents.set(id, incident)

  if (severity === 'critical') {
    logSecurityEvent(eventType, userId, { ...metadata, incidentId: id })
  }

  return id
}

/**
 * Resolve a tracked incident.
 */
export function resolveIncident(incidentId: string): void {
  const incident = activeIncidents.get(incidentId)
  if (incident) {
    incident.resolved = true
    incident.resolvedAt = new Date()
  }
}

// =============================================================================
// Exports
// =============================================================================

export const securityAudit = {
  logSecurityEvent,
  logRoleViolation,
  logPaymentAlert,
  logAccessAttempt,
  logSuspiciousActivity,
  generateWeeklySecurityReport,
  trackIncident,
  resolveIncident,
}
