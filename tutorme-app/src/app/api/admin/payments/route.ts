/**
 * GET /api/admin/payments
 * List payments (ADMIN only). Query: status, gateway, limit.
 */

import { NextRequest, NextResponse } from 'next/server'
import { requireAdminIp } from '@/lib/api/middleware'
import { drizzleDb } from '@/lib/db/drizzle'
import { payment, clinicBooking, clinic } from '@/lib/db/schema'
import { eq, and, desc } from 'drizzle-orm'
import { requireAdmin } from '@/lib/admin/auth'
import { Permissions } from '@/lib/admin/permissions'

export const GET = async (req: NextRequest) => {
  const { response } = await requireAdmin(req, Permissions.PAYMENTS_READ)
  if (response) return response
  const ipErr = requireAdminIp(req)
  if (ipErr) return ipErr

  const { searchParams } = new URL(req.url)
  const status = searchParams.get('status')
  const gateway = searchParams.get('gateway')
  const limit = Math.min(parseInt(searchParams.get('limit') || '50', 10), 100)

  const conditions = []
  if (status) conditions.push(eq(payment.status, status as 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED' | 'REFUNDED' | 'CANCELLED'))
  if (gateway) conditions.push(eq(payment.gateway, gateway as 'AIRWALLEX' | 'HITPAY'))
  const whereClause = conditions.length > 0 ? and(...conditions) : undefined

  const rows = await drizzleDb
    .select({
      payment: payment,
      bookingId: clinicBooking.id,
      bookingClinicId: clinicBooking.clinicId,
      bookingStudentId: clinicBooking.studentId,
      clinicTitle: clinic.title,
      clinicSubject: clinic.subject,
    })
    .from(payment)
    .leftJoin(clinicBooking, eq(payment.bookingId, clinicBooking.id))
    .leftJoin(clinic, eq(clinicBooking.clinicId, clinic.id))
    .where(whereClause)
    .orderBy(desc(payment.createdAt))
    .limit(limit)

  const payments = rows.map((r) => ({
    ...r.payment,
    booking: r.bookingId
      ? {
          id: r.bookingId,
          clinicId: r.bookingClinicId,
          studentId: r.bookingStudentId,
          clinic: r.clinicTitle != null ? { title: r.clinicTitle, subject: r.clinicSubject } : null,
        }
      : null,
  }))

  return NextResponse.json({ payments })
}
