/**
 * Suspicious activity: log failed logins and optionally alert when threshold exceeded.
 * Drizzle ORM.
 */

import { eq, and, gte, sql } from 'drizzle-orm'
import { drizzleDb } from '@/lib/db/drizzle'
import { securityEvent } from '@/lib/db/schema'
import crypto from 'crypto'

const FAILED_LOGIN_THRESHOLD = 5
const FAILED_LOGIN_WINDOW_MS = 15 * 60 * 1000 // 15 minutes

export async function logFailedLogin(ip: string | null, identifier?: string): Promise<void> {
  try {
    await drizzleDb.insert(securityEvent).values({
      id: crypto.randomUUID(),
      eventType: 'auth_failed',
      ip: ip ?? undefined,
      metadata: identifier ? { identifierHash: hashForLog(identifier) } : {},
    })
  } catch (e) {
    console.error('Failed to log security event:', e)
  }
}

function hashForLog(s: string): string {
  return crypto.createHash('sha256').update(s).digest('hex').slice(0, 16)
}

/**
 * Returns true if the IP has exceeded failed login threshold (possible brute force).
 */
export async function isSuspiciousIp(ip: string): Promise<boolean> {
  const since = new Date(Date.now() - FAILED_LOGIN_WINDOW_MS)
  const [row] = await drizzleDb
    .select({ count: sql<number>`count(*)::int` })
    .from(securityEvent)
    .where(
      and(
        eq(securityEvent.eventType, 'auth_failed'),
        eq(securityEvent.ip, ip),
        gte(securityEvent.createdAt, since)
      )
    )
  return (row?.count ?? 0) >= FAILED_LOGIN_THRESHOLD
}
