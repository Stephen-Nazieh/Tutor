/**
 * GET /api/admin/webhook-events
 * List webhook events (ADMIN only). Query: gateway, processed, limit.
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth, ForbiddenError, requireAdminIp, requirePermission } from '@/lib/api/middleware'
import { PERMISSIONS } from '@/lib/security/rbac'
import { db } from '@/lib/db'

export const GET = withAuth(async (req: NextRequest, session) => {
  const ipErr = requireAdminIp(req)
  if (ipErr) return ipErr
  const permErr = requirePermission(session, PERMISSIONS.ADMIN_VIEW_WEBHOOKS)
  if (permErr) return permErr
  if (session.user.role !== 'ADMIN') {
    throw new ForbiddenError('Admin only')
  }

  const { searchParams } = new URL(req.url)
  const gateway = searchParams.get('gateway')
  const processed = searchParams.get('processed')
  const limit = Math.min(parseInt(searchParams.get('limit') || '50', 10), 100)

  const where: Record<string, unknown> = {}
  if (gateway) where.gateway = gateway
  if (processed !== null && processed !== undefined && processed !== '') {
    where.processed = processed === 'true'
  }

  const events = await db.webhookEvent.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    take: limit
  })

  return NextResponse.json({ events })
}, { role: 'ADMIN' })
