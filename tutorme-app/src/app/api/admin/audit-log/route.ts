import { NextRequest, NextResponse } from 'next/server'
import { drizzleDb } from '@/lib/db/drizzle'
import { adminAuditLog, user, profile } from '@/lib/db/schema'
import { eq, desc, and, gte, lte, like, inArray, sql } from 'drizzle-orm'
import { requireAdmin } from '@/lib/admin/auth'
import { Permissions } from '@/lib/admin/permissions'

export async function GET(req: NextRequest) {
  const { session, response } = await requireAdmin(req, Permissions.AUDIT_READ)

  if (!session) return response!

  try {
    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '50')
    const adminId = searchParams.get('adminId')
    const action = searchParams.get('action')
    const resourceType = searchParams.get('resourceType')
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')

    const conditions = []
    if (adminId) conditions.push(eq(adminAuditLog.adminId, adminId))
    if (action) conditions.push(like(adminAuditLog.action, `%${action}%`))
    if (resourceType) conditions.push(eq(adminAuditLog.resourceType, resourceType))
    if (startDate) conditions.push(gte(adminAuditLog.createdAt, new Date(startDate)))
    if (endDate) conditions.push(lte(adminAuditLog.createdAt, new Date(endDate)))
    const whereClause =
      conditions.length > 0 ? and(...conditions) : undefined

    const logs = await drizzleDb
      .select()
      .from(adminAuditLog)
      .where(whereClause)
      .orderBy(desc(adminAuditLog.createdAt))
      .limit(limit)
      .offset((page - 1) * limit)

    const [{ total }] = await drizzleDb
      .select({ total: sql<number>`count(*)::int` })
      .from(adminAuditLog)
      .where(whereClause)

    const adminIds = [...new Set(logs.map((l) => l.adminId))]
    const admins =
      adminIds.length > 0
        ? await drizzleDb
            .select({
              id: user.id,
              email: user.email,
            })
            .from(user)
            .where(inArray(user.id, adminIds))
        : []
    const profiles =
      adminIds.length > 0
        ? await drizzleDb
            .select({ userId: profile.userId, name: profile.name })
            .from(profile)
            .where(inArray(profile.userId, adminIds))
        : []
    const profileByUserId = new Map(profiles.map((p) => [p.userId, p]))
    const userById = new Map(admins.map((u) => [u.id, u]))

    const formattedLogs = logs.map((log) => ({
      id: log.id,
      admin: {
        id: log.adminId,
        email: userById.get(log.adminId)?.email,
        name: profileByUserId.get(log.adminId)?.name,
      },
      action: log.action,
      resourceType: log.resourceType,
      resourceId: log.resourceId,
      previousState: log.previousState,
      newState: log.newState,
      metadata: log.metadata,
      ipAddress: log.ipAddress,
      createdAt: log.createdAt,
    }))

    return NextResponse.json({
      logs: formattedLogs,
      pagination: {
        page,
        limit,
        total: total ?? 0,
        totalPages: Math.ceil((total ?? 0) / limit),
      },
    })
  } catch (error) {
    console.error('Error fetching audit logs:', error)
    return NextResponse.json(
      { error: 'Failed to fetch audit logs' },
      { status: 500 }
    )
  }
}
