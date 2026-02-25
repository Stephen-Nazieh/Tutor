/**
 * Global error handler - central error handling for enterprise operations
 */

import { globalErrorHandler } from '@/lib/monitoring/sentry-setup'
import { logSecurityEvent } from '@/lib/security/security-audit'
import { logComplianceAudit } from '@/lib/monitoring/compliance-audit'

export interface GlobalErrorContext {
  userId?: string
  route?: string
  action?: string
  ip?: string
  userAgent?: string
  [key: string]: unknown
}

export function handleGlobalError(error: Error, context?: GlobalErrorContext) {
  globalErrorHandler.handleError(error, context)
  if (context?.userId && isSecurityRelevant(error, context)) {
    logSecurityEvent('suspicious_activity', context.userId, {
      reason: error.message,
      action: context.action,
      ip: context.ip,
      userAgent: context.userAgent,
    }).catch(() => {})
  }
  if (context?.userId && context?.action?.includes?.('data')) {
    logComplianceAudit('error_during_data_access', {
      userId: context.userId,
      action: context.action,
      errorType: error.name,
    }).catch(() => {})
  }
}

function isSecurityRelevant(error: Error, context: GlobalErrorContext): boolean {
  const msg = error.message.toLowerCase()
  const kw = ['auth', 'unauthorized', 'forbidden', 'access denied', 'token', 'session', 'csrf', 'rate limit']
  return kw.some((k) => msg.includes(k) || context.action?.toLowerCase().includes(k))
}

export function handleGlobalWarning(warning: string, context?: GlobalErrorContext) {
  globalErrorHandler.handleWarning(warning, context)
}

export { globalErrorHandler }
