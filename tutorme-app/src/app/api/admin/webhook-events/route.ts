/**
 * GET /api/admin/webhook-events
 * List webhook events (ADMIN only). Query: gateway, processed, limit.
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth, ForbiddenError, requireAdminIp, requirePermission } from '@/lib/api/middleware'
import { PERMISSIONS } from '@/lib/security/rbac'
import { drizzleDb } from '@/lib/db/drizzle'
import { webhookEvent } from '@/lib/db/schema'
import { eq, and, desc } from 'drizzle-orm'

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

  const conditions = []
  if (gateway) conditions.push(eq(webhookEvent.gateway, gateway as 'AIRWALLEX' | 'HITPAY'))
  if (processed !== null && processed !== undefined && processed !== '') {
    conditions.push(eq(webhookEvent.processed, processed === 'true'))
  }
  const whereClause = conditions.length > 0 ? and(...conditions) : undefined

  const events = await drizzleDb
    .select()
    .from(webhookEvent)
    .where(whereClause)
    .orderBy(desc(webhookEvent.createdAt))
    .limit(limit)

  return NextResponse.json({ events })
}, { role: 'ADMIN' })
