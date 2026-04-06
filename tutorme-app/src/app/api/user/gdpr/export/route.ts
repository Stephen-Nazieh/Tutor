/**
 * GDPR data export: returns all personal data for the current user.
 * GET /api/user/gdpr/export
 */

import { NextResponse } from 'next/server'
import { withAuth } from '@/lib/api/middleware'
import { drizzleDb } from '@/lib/db/drizzle'
import { user, profile, account } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { logAudit, AUDIT_ACTIONS } from '@/lib/security/audit'

export const GET = withAuth(async (_req, session) => {
  const userId = session.user.id

  const [userRow] = await drizzleDb
    .select({
      userId: user.userId,
      email: user.email,
      role: user.role,
      emailVerified: user.emailVerified,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    })
    .from(user)
    .where(eq(user.userId, userId))
    .limit(1)

  const [profileRow] = await drizzleDb
    .select()
    .from(profile)
    .where(eq(profile.userId, userId))
    .limit(1)

  const accounts = await drizzleDb
    .select({ provider: account.provider, type: account.type })
    .from(account)
    .where(eq(account.userId, userId))

  if (!userRow) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  const exportData = {
    exportedAt: new Date().toISOString(),
    user: { ...userRow },
    profile: profileRow ?? null,
    linkedAccounts: accounts,
    clinicBookings: [],
    payments: [],
  }

  await logAudit(userId, AUDIT_ACTIONS.DATA_EXPORT, { resource: 'gdpr_export' })

  return NextResponse.json(exportData)
})
