/**
 * GDPR data export: returns all personal data for the current user.
 * GET /api/user/gdpr/export
 */

import { NextResponse } from 'next/server'
import { withAuth } from '@/lib/api/middleware'
import { drizzleDb } from '@/lib/db/drizzle'
import { user, profile, account, clinicBooking, clinic, payment } from '@/lib/db/schema'
import { eq, inArray } from 'drizzle-orm'
import { logAudit, AUDIT_ACTIONS } from '@/lib/security/audit'

export const GET = withAuth(async (_req, session) => {
  const userId = session.user.id

  const [userRow] = await drizzleDb
    .select({
      id: user.id,
      email: user.email,
      role: user.role,
      emailVerified: user.emailVerified,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    })
    .from(user)
    .where(eq(user.id, userId))
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

  const bookingsWithClinic = await drizzleDb
    .select({
      id: clinicBooking.id,
      clinicId: clinicBooking.clinicId,
      bookedAt: clinicBooking.bookedAt,
      attended: clinicBooking.attended,
      clinicTitle: clinic.title,
      clinicStartTime: clinic.startTime,
    })
    .from(clinicBooking)
    .innerJoin(clinic, eq(clinicBooking.clinicId, clinic.id))
    .where(eq(clinicBooking.studentId, userId))

  const bookingIds = bookingsWithClinic.map((b) => b.id)
  const paymentsSummary =
    bookingIds.length > 0
      ? await drizzleDb
          .select({
            id: payment.id,
            amount: payment.amount,
            status: payment.status,
            createdAt: payment.createdAt,
          })
          .from(payment)
          .where(inArray(payment.bookingId, bookingIds))
      : []

  if (!userRow) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  const clinicBookings = bookingsWithClinic.map((b) => ({
    id: b.id,
    clinicId: b.clinicId,
    bookedAt: b.bookedAt,
    attended: b.attended,
    clinic: { title: b.clinicTitle, startTime: b.clinicStartTime },
  }))

  const exportData = {
    exportedAt: new Date().toISOString(),
    user: { ...userRow },
    profile: profileRow ?? null,
    linkedAccounts: accounts,
    clinicBookings,
    payments: paymentsSummary,
  }

  await logAudit(userId, AUDIT_ACTIONS.DATA_EXPORT, { resource: 'gdpr_export' })

  return NextResponse.json(exportData)
})
