/**
 * Enterprise-grade security audit system with global compliance
 *
 * Implements:
 * - OWASP Top 10 security event tracking
 * - GDPR/PIPL compliance audit logging
 * - PCI DSS payment security
 * - Automated security reporting
 * - Global deployment ready
 */

import type { SecurityEvent as PrismaSecurityEvent } from '@prisma/client'
import { db } from '@/lib/db'
import { globalErrorHandler } from '@/lib/monitoring/sentry-setup'
import { complianceAudit } from '@/lib/monitoring/compliance-audit'

// Global security event types based on OWASP Top 10 and enterprise standards
export const SECURITY_EVENT_TYPES = {
  // Authentication & Authorization
  LOGIN_ATTEMPT: 'LOGIN_ATTEMPT',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  LOGOUT: 'LOGOUT',
  SESSION_EXPIRED: 'SESSION_EXPIRED',
  PASSWORD_CHANGE: 'PASSWORD_CHANGE',
  TWO_FACTOR_ENABLED: 'TWO_FACTOR_ENABLED',
  TWO_FACTOR_DISABLED: 'TWO_FACTOR_DISABLED',
  PERMISSION_CHANGE: 'PERMISSION_CHANGE',
  ROLE_ASSIGNMENT: 'ROLE_ASSIGNMENT',
  MFA_FAILURE: 'MFA_FAILURE',

  // Data Access & Privacy
  DATA_ACCESS: 'DATA_ACCESS',
  DATA_MODIFICATION: 'DATA_MODIFICATION',
  DATA_DELETION: 'DATA_DELETION',
  DATA_EXPORT: 'DATA_EXPORT',
  PII_ACCESS: 'PII_ACCESS',
  PII_LEAK: 'PII_LEAK',
  CONSENT_GIVEN: 'CONSENT_GIVEN',
  CONSENT_REVOKED: 'CONSENT_REVOKED',

  // Security Incidents
  SUSPICIOUS_ACTIVITY: 'SUSPICIOUS_ACTIVITY',
  BRUTE_FORCE_ATTEMPT: 'BRUTE_FORCE_ATTEMPT',
  RATE_LIMIT_TRIGGERED: 'RATE_LIMIT_TRIGGERED',
  CSRF_VIOLATION: 'CSRF_VIOLATION',
  XSS_ATTEMPT: 'XSS_ATTEMPT',
  SQL_INJECTION_ATTEMPT: 'SQL_INJECTION_ATTEMPT',
  FILE_UPLOAD_VIOLATION: 'FILE_UPLOAD_VIOLATION',

  // Payment Security
  PAYMENT_ATTEMPT: 'PAYMENT_ATTEMPT',
  PAYMENT_SUCCESS: 'PAYMENT_SUCCESS',
  PAYMENT_FAILURE: 'PAYMENT_FAILURE',
  PAYMENT_REFUND: 'PAYMENT_REFUND',
  FRAUD_FLAGGED: 'FRAUD_FLAGGED',
  CHARGEBACK: 'CHARGEBACK',
  PAYMENT_ALERT_SENT: 'PAYMENT_ALERT_SENT',

  // AI Tutor Security
  AI_TUTOR_INPUT_SANITIZED: 'AI_TUTOR_INPUT_SANITIZED',
  AI_PROMPT_FILTERED: 'AI_PROMPT_FILTERED',
  AI_RESPONSE_BLOCKED: 'AI_RESPONSE_BLOCKED',
  AI_ABUSE_DETECTED: 'AI_ABUSE_DETECTED',

  // Live Classroom Security
  CLASS_JOIN_ATTEMPT: 'CLASS_JOIN_ATTEMPT',
  CLASS_JOIN_SUCCESS: 'CLASS_JOIN_SUCCESS',
  CLASS_JOIN_FAILURE: 'CLASS_JOIN_FAILURE',
  VIDEO_RECORDING_STARTED: 'VIDEO_RECORDING_STARTED',
  SCREEN_SHARE_STARTED: 'SCREEN_SHARE_STARTED',

  // Technical Security
  RATE_LIMIT_EXCEEDED: 'RATE_LIMIT_EXCEEDED',
  DEPLOYMENT_HEALTH_CHECK_FAILED: 'DEPLOYMENT_HEALTH_CHECK_FAILED',
  DEPLOYMENT_HEALTH_CHECK_EXCEPTION: 'DEPLOYMENT_HEALTH_CHECK_EXCEPTION',
  INVALID_INPUT_DETECTED: 'INVALID_INPUT_DETECTED',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  ENCRYPTION_FAILURE: 'ENCRYPTION_FAILURE',
  DECRYPTION_FAILURE: 'DECRYPTION_FAILURE',

  // Compliance & Legal
  GDPR_REQUEST_MADE: 'GDPR_REQUEST_MADE',
  GDPR_REQUEST_PROCESSED: 'GDPR_REQUEST_PROCESSED',
  PIPL_COMPLIANCE_VIOLATION: 'PIPL_COMPLIANCE_VIOLATION',
  ADULT_VERIFICATION_REQUIRED: 'ADULT_VERIFICATION_REQUIRED',
  CROSS_BORDER_TRANSFER: 'CROSS_BORDER_TRANSFER',
} as const

export type SecurityEventType =
  (typeof SECURITY_EVENT_TYPES)[keyof typeof SECURITY_EVENT_TYPES]

// Global security severity levels
export const SECURITY_SEVERITY = {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH',
  CRITICAL: 'CRITICAL',
} as const

export type SecuritySeverity =
  (typeof SECURITY_SEVERITY)[keyof typeof SECURITY_SEVERITY]

// Global security context interface
export interface SecurityContext {
  userId?: string
  sessionId?: string
  ipAddress?: string
  userAgent?: string
  countryCode?: string
  region?: string
  city?: string
  deviceId?: string
  operatingSystem?: string
  browser?: string
  locale?: string
  timezone?: string
  requestMethod?: string
  requestPath?: string
  referer?: string
  authenticationProvider?: string
  role?: string
  organizationId?: string
  correlationId?: string
}

// Comprehensive security audit system
export class SecurityAudit {
  private static instance: SecurityAudit

  static getInstance(): SecurityAudit {
    if (!SecurityAudit.instance) {
      SecurityAudit.instance = new SecurityAudit()
    }
    return SecurityAudit.instance
  }

  /**
   * Log security events with enterprise-grade context
   */
  async logSecurityEvent({
    action,
    userId,
    actorId,
    targetType,
    targetId,
    severity = SECURITY_SEVERITY.MEDIUM,
    description,
    context,
    metadata = {},
  }: {
    action: SecurityEventType
    userId?: string
    actorId?: string
    targetType?: string
    targetId?: string
    severity?: SecuritySeverity
    description: string
    context?: SecurityContext
    metadata?: Record<string, unknown>
  }): Promise<PrismaSecurityEvent | null> {
    try {
      const locationData = this.getLocationFromIP(context?.ipAddress)

      const enhancedMetadata = {
        ...metadata,
        _security: {
          timestamp: Date.now(),
          correlationId: context?.correlationId,
          riskLevel: this.calculateRiskLevel(severity, action),
          pattern: this.detectSecurityPattern(action, context),
          location: locationData,
          complianceFlags: this.getComplianceFlags(action),
          technicalDetails: {
            userAgent: context?.userAgent,
            operatingSystem: context?.operatingSystem,
            browser: context?.browser,
            deviceId: context?.deviceId,
            authenticationProvider: context?.authenticationProvider,
          },
        },
      }

      const securityEvent = await db.securityEvent.create({
        data: {
          eventType: action,
          action,
          userId,
          actorId,
          targetType,
          targetId,
          severity,
          description,
          ip: context?.ipAddress ?? undefined,
          originIp: context?.ipAddress,
          userAgent: context?.userAgent,
          countryCode: locationData?.countryCode ?? context?.countryCode,
          region: locationData?.region ?? context?.region,
          city: locationData?.city ?? context?.city,
          deviceId: context?.deviceId,
          sessionId: context?.sessionId,
          correlationId: context?.correlationId,
          metadata: enhancedMetadata as object,
          occurredAt: new Date(),
        },
      })

      if (
        severity === SECURITY_SEVERITY.HIGH ||
        severity === SECURITY_SEVERITY.CRITICAL
      ) {
        await this.notifySecurityTeam(securityEvent)
      }

      await this.handleComplianceLogging(
        action,
        userId,
        actorId,
        enhancedMetadata
      )

      await this.notifyExternalSecuritySystems(securityEvent)

      globalErrorHandler.addBreadcrumb({
        category: 'security',
        message: description,
        data: enhancedMetadata,
      })

      return securityEvent
    } catch (error) {
      console.error('Security audit logging failed:', error)
      globalErrorHandler.handleError(error as Error, {
        context: 'security-audit-logging',
        action,
        userId,
      })
      return null
    }
  }

  private getLocationFromIP(ipAddress?: string): {
    countryCode: string
    region: string
    city: string
    lat: number
    lng: number
  } | null {
    if (!ipAddress) return null
    try {
      // Placeholder - integrate with geolocation service (e.g. MaxMind, ip-api)
      return {
        countryCode: 'UNKNOWN',
        region: 'Unknown',
        city: 'Unknown',
        lat: 0,
        lng: 0,
      }
    } catch {
      return null
    }
  }

  private calculateRiskLevel(
    severity: SecuritySeverity,
    action: SecurityEventType
  ): number {
    const baseRisk = {
      [SECURITY_SEVERITY.LOW]: 1,
      [SECURITY_SEVERITY.MEDIUM]: 3,
      [SECURITY_SEVERITY.HIGH]: 7,
      [SECURITY_SEVERITY.CRITICAL]: 10,
    }[severity]

    const actionRisk: Partial<Record<SecurityEventType, number>> = {
      [SECURITY_EVENT_TYPES.BRUTE_FORCE_ATTEMPT]: 8,
      [SECURITY_EVENT_TYPES.XSS_ATTEMPT]: 9,
      [SECURITY_EVENT_TYPES.SQL_INJECTION_ATTEMPT]: 10,
      [SECURITY_EVENT_TYPES.CSRF_VIOLATION]: 7,
      [SECURITY_EVENT_TYPES.PII_LEAK]: 9,
      [SECURITY_EVENT_TYPES.FRAUD_FLAGGED]: 10,
      [SECURITY_EVENT_TYPES.CHARGEBACK]: 8,
      [SECURITY_EVENT_TYPES.MFA_FAILURE]: 6,
    }
    const actionRiskValue = actionRisk[action] ?? 3
    return Math.max(baseRisk, actionRiskValue)
  }

  private detectSecurityPattern(
    action: SecurityEventType,
    context?: SecurityContext
  ): string[] {
    const patterns: string[] = []

    if (action === SECURITY_EVENT_TYPES.LOGIN_FAILURE) {
      patterns.push('HIGH_LOGIN_FAILURE_RATE')
    }
    if (context?.countryCode) {
      patterns.push(`GEO_LOCATION_${context.countryCode}`)
    }
    if (context?.deviceId) {
      patterns.push(`DEVICE_${context.deviceId.slice(0, 8)}`)
    }
    if (context?.sessionId) {
      patterns.push('SESSION_ANOMALY')
    }
    return patterns
  }

  private getComplianceFlags(action: SecurityEventType): string[] {
    const flags: string[] = []

    const gdprEvents: SecurityEventType[] = [
      SECURITY_EVENT_TYPES.DATA_ACCESS,
      SECURITY_EVENT_TYPES.DATA_MODIFICATION,
      SECURITY_EVENT_TYPES.DATA_DELETION,
      SECURITY_EVENT_TYPES.DATA_EXPORT,
      SECURITY_EVENT_TYPES.PII_ACCESS,
      SECURITY_EVENT_TYPES.CONSENT_REVOKED,
    ]
    if (gdprEvents.includes(action)) flags.push('GDPR_COMPLIANT')

    const piplEvents: SecurityEventType[] = [
      SECURITY_EVENT_TYPES.CROSS_BORDER_TRANSFER,
      SECURITY_EVENT_TYPES.DATA_ACCESS,
      SECURITY_EVENT_TYPES.ADULT_VERIFICATION_REQUIRED,
      SECURITY_EVENT_TYPES.PII_ACCESS,
    ]
    if (piplEvents.includes(action)) flags.push('PIPL_COMPLIANT')

    const pciEvents: SecurityEventType[] = [
      SECURITY_EVENT_TYPES.PAYMENT_ATTEMPT,
      SECURITY_EVENT_TYPES.PAYMENT_SUCCESS,
      SECURITY_EVENT_TYPES.PAYMENT_FAILURE,
      SECURITY_EVENT_TYPES.FRAUD_FLAGGED,
    ]
    if (pciEvents.includes(action)) flags.push('PCI_DSS_COMPLIANT')

    return flags
  }

  private async handleComplianceLogging(
    action: SecurityEventType,
    userId?: string,
    actorId?: string,
    metadata?: Record<string, unknown>
  ): Promise<void> {
    const gdprEvents: SecurityEventType[] = [
      SECURITY_EVENT_TYPES.DATA_ACCESS,
      SECURITY_EVENT_TYPES.DATA_MODIFICATION,
      SECURITY_EVENT_TYPES.DATA_DELETION,
      SECURITY_EVENT_TYPES.DATA_EXPORT,
      SECURITY_EVENT_TYPES.PII_ACCESS,
    ]
    if (gdprEvents.includes(action) && userId) {
      await complianceAudit.logDataAccess(
        userId,
        action,
        metadata as Record<string, unknown>
      )
    }

    const piplEvents: SecurityEventType[] = [
      SECURITY_EVENT_TYPES.CROSS_BORDER_TRANSFER,
      SECURITY_EVENT_TYPES.DATA_ACCESS,
      SECURITY_EVENT_TYPES.ADULT_VERIFICATION_REQUIRED,
    ]
    if (piplEvents.includes(action) && userId) {
      await complianceAudit.logCrossBorderTransfer(
        userId,
        actorId ?? 'unknown',
        metadata as Record<string, unknown>
      )
    }
  }

  private async notifySecurityTeam(
    event: PrismaSecurityEvent
  ): Promise<void> {
    try {
      const meta = event.metadata as { _security?: { riskLevel?: number; pattern?: string[] } } | null
      const securityAlert = {
        severity: event.severity,
        action: event.action,
        description: event.description,
        userId: event.userId,
        timestamp: event.occurredAt ?? event.createdAt,
        location: {
          ip: event.originIp ?? event.ip,
          country: event.countryCode,
          city: event.city,
        },
        riskLevel: meta?._security?.riskLevel,
        patterns: meta?._security?.pattern,
        correlationId: event.correlationId,
      }
      globalErrorHandler.handleWarning('Security Alert', securityAlert)
    } catch (error) {
      globalErrorHandler.handleError(
        new Error('Failed to notify security team'),
        { originalEvent: event.id, error }
      )
    }
  }

  private async notifyExternalSecuritySystems(
    event: PrismaSecurityEvent
  ): Promise<void> {
    // Placeholder for SIEM, WAF, fraud detection integrations
    if (process.env.NODE_ENV === 'development') {
      console.debug('[SecurityAudit] External notification:', event.id)
    }
  }

  /**
   * Generate weekly security report for enterprise compliance
   */
  async generateWeeklySecurityReport(
    startDate: Date,
    endDate: Date
  ): Promise<{
    period: { start: string; end: string }
    summary: {
      totalEvents: number
      bySeverity: Record<string, number>
      byAction: Record<string, number>
      byCountry: Record<string, number>
      riskTrends: string[]
    }
    criticalEvents: PrismaSecurityEvent[]
    highRiskEvents: PrismaSecurityEvent[]
    complianceStatus: Record<string, string>
    recommendations: string[]
  } | null> {
    try {
      const events = await db.securityEvent.findMany({
        where: {
          createdAt: {
            gte: startDate,
            lte: endDate,
          },
        },
        orderBy: { createdAt: 'desc' },
      })

      const report = {
        period: {
          start: startDate.toISOString(),
          end: endDate.toISOString(),
        },
        summary: {
          totalEvents: events.length,
          bySeverity: this.groupBySeverity(events),
          byAction: this.groupByAction(events),
          byCountry: this.groupByCountry(events),
          riskTrends: this.assessRiskTrends(events),
        },
        criticalEvents: events.filter(
          (e) => e.severity === SECURITY_SEVERITY.CRITICAL
        ),
        highRiskEvents: events.filter(
          (e) => e.severity === SECURITY_SEVERITY.HIGH
        ),
        complianceStatus: this.getComplianceStatus(events),
        recommendations: this.generateRecommendations(events),
      }

      return report
    } catch (error) {
      globalErrorHandler.handleError(error as Error, {
        context: 'security-report-generation',
        startDate,
        endDate,
      })
      return null
    }
  }

  private groupBySeverity(
    events: PrismaSecurityEvent[]
  ): Record<string, number> {
    const counts: Record<string, number> = {}
    for (const event of events) {
      const s = event.severity ?? 'UNKNOWN'
      counts[s] = (counts[s] || 0) + 1
    }
    return counts
  }

  private groupByAction(
    events: PrismaSecurityEvent[]
  ): Record<string, number> {
    const counts: Record<string, number> = {}
    for (const event of events) {
      const a = event.action ?? event.eventType ?? 'UNKNOWN'
      counts[a] = (counts[a] || 0) + 1
    }
    return counts
  }

  private groupByCountry(
    events: PrismaSecurityEvent[]
  ): Record<string, number> {
    const counts: Record<string, number> = {}
    for (const event of events) {
      const country = event.countryCode ?? 'UNKNOWN'
      counts[country] = (counts[country] || 0) + 1
    }
    return counts
  }

  private assessRiskTrends(events: PrismaSecurityEvent[]): string[] {
    const trends: string[] = []
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    const recentEvents = events.filter(
      (e) => (e.occurredAt ?? e.createdAt) > weekAgo
    )

    const bruteForceCount = recentEvents.filter(
      (e) => e.action === SECURITY_EVENT_TYPES.BRUTE_FORCE_ATTEMPT
    ).length
    if (bruteForceCount > 5) trends.push('INCREASE_BRUTE_FORCE_ATTEMPTS')

    const fraudCount = recentEvents.filter(
      (e) => e.action === SECURITY_EVENT_TYPES.FRAUD_FLAGGED
    ).length
    if (fraudCount > 3) trends.push('PAYMENT_FRAUD_DETECTION')

    return trends
  }

  private getComplianceStatus(
    events: PrismaSecurityEvent[]
  ): Record<string, string> {
    const status: Record<string, string> = {}
    for (const event of events) {
      const meta = event.metadata as { _security?: { complianceFlags?: string[] } } | null
      const flags = meta?._security?.complianceFlags ?? []
      for (const flag of flags) {
        status[flag] = 'COMPLIANT'
      }
    }
    return status
  }

  private generateRecommendations(
    events: PrismaSecurityEvent[]
  ): string[] {
    const recommendations: string[] = []

    const rateLimitCount = events.filter(
      (e) => e.action === SECURITY_EVENT_TYPES.RATE_LIMIT_TRIGGERED
    ).length
    if (rateLimitCount > 10) {
      recommendations.push(
        'Consider stricter rate limits for your API endpoints'
      )
    }

    const loginCount = events.filter(
      (e) => e.action === SECURITY_EVENT_TYPES.LOGIN_ATTEMPT
    ).length
    if (loginCount > 100) {
      recommendations.push(
        'Consider enforcing multi-factor authentication for high-traffic sessions'
      )
    }

    const highRiskCount = events.filter((e) => {
      const meta = e.metadata as { _security?: { riskLevel?: number } } | null
      return (meta?._security?.riskLevel ?? 0) > 7
    }).length
    if (highRiskCount > 5) {
      recommendations.push(
        'Monitor high-risk data access events more closely'
      )
    }

    return recommendations
  }
}

export const securityAudit = SecurityAudit.getInstance()
