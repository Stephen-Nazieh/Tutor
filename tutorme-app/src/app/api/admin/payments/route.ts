/**
 * GET /api/admin/payments
 * List payments (ADMIN only). Query: status, gateway, limit.
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth, ForbiddenError, requireAdminIp, requirePermission } from '@/lib/api/middleware'
import { PERMISSIONS } from '@/lib/security/rbac'
import { db } from '@/lib/db'

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

  const where: Record<string, unknown> = {}
  if (status) where.status = status
  if (gateway) where.gateway = gateway

  const payments = await db.payment.findMany({
    where,
    include: {
      booking: {
        select: {
          id: true,
          clinicId: true,
          studentId: true,
          clinic: { select: { title: true, subject: true } }
        }
      }
    },
    orderBy: { createdAt: 'desc' },
    take: limit
  })

  return NextResponse.json({ payments })
}, { role: 'ADMIN' })
