/**
 * GDPR account/data deletion: anonymizes the user and profile (right to be forgotten).
 * POST /api/user/gdpr/delete - body: { confirm: true }
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth, withCsrf, ValidationError } from '@/lib/api/middleware'
import { drizzleDb } from '@/lib/db/drizzle'
import { user, profile } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { logAudit, AUDIT_ACTIONS } from '@/lib/security/audit'

export const POST = withCsrf(withAuth(async (req: NextRequest, session) => {
  const body = await req.json().catch(() => ({}))
  if (body.confirm !== true) {
    throw new ValidationError('Send { "confirm": true } to confirm account deletion')
  }

  const userId = session.user.id

  await logAudit(userId, AUDIT_ACTIONS.DATA_DELETE, { resource: 'gdpr_delete' })

  await drizzleDb
    .update(user)
    .set({
      email: `deleted-${userId}@deleted.local`,
      password: null,
      image: null,
      emailVerified: null,
    })
    .where(eq(user.id, userId))

  const [profileRow] = await drizzleDb
    .select()
    .from(profile)
    .where(eq(profile.userId, userId))
    .limit(1)
  if (profileRow) {
    await drizzleDb
      .update(profile)
      .set({
        name: null,
        bio: null,
        avatarUrl: null,
        dateOfBirth: null,
      })
      .where(eq(profile.userId, userId))
  }

  return NextResponse.json({
    message:
      'Account data anonymized. Please log out; you will not be able to log in again with this account.',
  })
}))
