/**
 * GET /api/parent/notifications
 * PATCH /api/parent/notifications (mark as read)
 */

import { NextRequest, NextResponse } from 'next/server'
import { eq, and, desc, inArray } from 'drizzle-orm'
import { withAuth } from '@/lib/api/middleware'
import { getFamilyAccountForParent } from '@/lib/api/parent-helpers'
import { drizzleDb } from '@/lib/db/drizzle'
import { familyNotification } from '@/lib/db/schema'
import cacheManager from '@/lib/cache-manager'
import { z } from 'zod'

const CACHE_TTL = 60

const markReadSchema = z.object({
  ids: z.array(z.string()).optional(),
  all: z.boolean().optional(),
})

export const GET = withAuth(
  async (req: NextRequest, session) => {
    const family = await getFamilyAccountForParent(session)
    if (!family) {
      return NextResponse.json(
        { error: '未找到家庭账户' },
        { status: 404 }
      )
    }

    const cacheKey = `parent:notifications:${family.id}`
    const cached = await cacheManager.get<object>(cacheKey)
    if (cached) return NextResponse.json({ success: true, data: cached })

    const notifications = await drizzleDb.query.familyNotification.findMany({
      where: eq(familyNotification.parentId, family.id),
      orderBy: [desc(familyNotification.createdAt)],
      limit: 50,
    })

    const data = {
      notifications: notifications.map((n: any) => ({
        id: n.id,
        title: n.title,
        message: n.message,
        isRead: n.isRead,
        createdAt: n.createdAt,
      })),
      unreadCount: notifications.filter((n: any) => !n.isRead).length,
    }

    await cacheManager.set(cacheKey, data, { ttl: CACHE_TTL, tags: [`family:${family.id}`] })
    return NextResponse.json({ success: true, data })
  },
  { role: 'PARENT' }
)

export const PATCH = withAuth(
  async (req: NextRequest, session) => {
    const family = await getFamilyAccountForParent(session)
    if (!family) {
      return NextResponse.json(
        { error: '未找到家庭账户' },
        { status: 404 }
      )
    }

    let body: { ids?: string[]; all?: boolean }
    try {
      body = markReadSchema.parse(await req.json().catch(() => ({})))
    } catch {
      return NextResponse.json({ error: '无效请求' }, { status: 400 })
    }

    let conditions: any[] = [eq(familyNotification.parentId, family.id)]

    if (body.all === true) {
      conditions.push(eq(familyNotification.isRead, false))
    } else if (body.ids?.length) {
      conditions.push(inArray(familyNotification.id, body.ids))
    } else {
      return NextResponse.json({ error: '请提供 ids 或 all' }, { status: 400 })
    }

    await drizzleDb.update(familyNotification)
      .set({ isRead: true })
      .where(and(...conditions))

    await cacheManager.invalidateTag(`family:${family.id}`)

    return NextResponse.json({ success: true })
  },
  { role: 'PARENT' }
)
