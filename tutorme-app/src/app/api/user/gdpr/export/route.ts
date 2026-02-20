/**
 * GDPR data export: returns all personal data for the current user.
 * GET /api/user/gdpr/export
 */

import { NextResponse } from 'next/server'
import { withAuth } from '@/lib/api/middleware'
import { db } from '@/lib/db'
import { logAudit, AUDIT_ACTIONS } from '@/lib/security/audit'

export const GET = withAuth(async (_req, session) => {
  const userId = session.user.id

  const [user, profile, accounts, bookings, paymentsSummary] = await Promise.all([
    db.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        role: true,
        emailVerified: true,
        createdAt: true,
        updatedAt: true
      }
    }),
    db.profile.findUnique({ where: { userId } }),
    db.account.findMany({
      where: { userId },
      select: { provider: true, type: true }
    }),
    db.clinicBooking.findMany({
      where: { studentId: userId },
      include: { clinic: { select: { title: true, startTime: true } } }
    }),
    db.clinicBooking.findMany({
      where: { studentId: userId },
      select: { id: true }
    }).then((bookings: { id: string }[]) =>
      bookings.length === 0
        ? []
        : db.payment.findMany({
            where: { bookingId: { in: bookings.map((b: { id: string }) => b.id) } },
            select: { id: true, amount: true, status: true, createdAt: true }
          })
    )
  ])

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  const exportData = {
    exportedAt: new Date().toISOString(),
    user: { ...user },
    profile: profile ?? null,
    linkedAccounts: accounts,
    clinicBookings: bookings,
    payments: paymentsSummary
  }

  await logAudit(userId, AUDIT_ACTIONS.DATA_EXPORT, { resource: 'gdpr_export' })

  return NextResponse.json(exportData)
})
