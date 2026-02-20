/**
 * Suspicious activity: log failed logins and optionally alert when threshold exceeded.
 */

import { db } from '@/lib/db'

const FAILED_LOGIN_THRESHOLD = 5
const FAILED_LOGIN_WINDOW_MS = 15 * 60 * 1000 // 15 minutes

export async function logFailedLogin(ip: string | null, identifier?: string): Promise<void> {
  try {
    await db.securityEvent.create({
      data: {
        eventType: 'auth_failed',
        ip: ip ?? undefined,
        metadata: identifier ? { identifierHash: hashForLog(identifier) } : {}
      }
    })
  } catch (e) {
    console.error('Failed to log security event:', e)
  }
}

function hashForLog(s: string): string {
  const crypto = require('crypto') as typeof import('crypto')
  return crypto.createHash('sha256').update(s).digest('hex').slice(0, 16)
}

/**
 * Returns true if the IP has exceeded failed login threshold (possible brute force).
 * Can be used to block or require CAPTCHA.
 */
export async function isSuspiciousIp(ip: string): Promise<boolean> {
  const since = new Date(Date.now() - FAILED_LOGIN_WINDOW_MS)
  const count = await db.securityEvent.count({
    where: { eventType: 'auth_failed', ip, createdAt: { gte: since } }
  })
  return count >= FAILED_LOGIN_THRESHOLD
}
