/**
 * Security Logger
 * Centralized security event logging for AI, payments, and other security-sensitive modules.
 */

import { logSecurityEvent } from './security-audit'

export interface SecurityLogEvent {
  eventType: string
  description: string
  severity?: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
  metadata?: Record<string, unknown>
}

export const securityLogger = {
  logEvent(event: SecurityLogEvent): void {
    const severity = event.severity ?? 'LOW'
    logSecurityEvent(event.eventType, undefined, {
      description: event.description,
      severity,
      ...event.metadata,
    }).catch((err) => console.error('Security log failed:', err))
  },
}
