/**
 * GET /api/admin/payments
 * List payments (ADMIN only). Query: status, gateway, limit.
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth, ForbiddenError, requireAdminIp, requirePermission } from '@/lib/api/middleware'
import { PERMISSIONS } from '@/lib/security/rbac'
import { drizzleDb } from '@/lib/db/drizzle'
import { payment, clinicBooking, clinic } from '@/lib/db/schema'
import { eq, and, desc } from 'drizzle-orm'

export const GET = withAuth(async (req: NextRequest, session) => {
  const ipErr = requireAdminIp(req)
  if (ipErr) return ipErr
  const permErr = requirePermission(session, PERMISSIONS.ADMIN_VIEW_PAYMENTS)
  if (permErr) return permErr
  if (session.user.role !== 'ADMIN') {
    throw new ForbiddenError('Admin only')
  }

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
}, { role: 'ADMIN' })
