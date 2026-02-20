/**
 * GDPR account/data deletion: anonymizes the user and profile (right to be forgotten).
 * POST /api/user/gdpr/delete - body: { confirm: true }
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth, withCsrf, ValidationError } from '@/lib/api/middleware'
import { db } from '@/lib/db'
import { logAudit, AUDIT_ACTIONS } from '@/lib/security/audit'

export const POST = withCsrf(withAuth(async (req: NextRequest, session) => {
  const body = await req.json().catch(() => ({}))
  if (body.confirm !== true) {
    throw new ValidationError('Send { "confirm": true } to confirm account deletion')
  }

  const userId = session.user.id

  await logAudit(userId, AUDIT_ACTIONS.DATA_DELETE, { resource: 'gdpr_delete' })

  // Anonymize user (keep id for referential integrity)
  await db.user.update({
    where: { id: userId },
    data: {
      email: `deleted-${userId}@deleted.local`,
      password: null,
      image: null,
      emailVerified: null
    }
  })

  const profile = await db.profile.findUnique({ where: { userId } })
  if (profile) {
    await db.profile.update({
      where: { userId },
      data: {
        name: null,
        bio: null,
        avatarUrl: null,
        dateOfBirth: null
      }
    })
  }

  // Invalidate sessions by updating updatedAt (NextAuth may still hold session; user must log out)
  return NextResponse.json({
    message: 'Account data anonymized. Please log out; you will not be able to log in again with this account.'
  })
}))
