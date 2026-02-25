/**
 * GET /api/parent/notifications
 * PATCH /api/parent/notifications (mark as read)
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/lib/api/middleware'
import { getFamilyAccountForParent } from '@/lib/api/parent-helpers'
import { db } from '@/lib/db'
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

    const notifications = await db.familyNotification.findMany({
      where: { parentId: family.id },
      orderBy: { createdAt: 'desc' },
      take: 50,
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
      body = markReadSchema.parse(await req.json())
    } catch {
      return NextResponse.json({ error: '无效请求' }, { status: 400 })
    }

    const where =
      body.all === true
        ? { parentId: family.id, isRead: false }
        : body.ids?.length
          ? { parentId: family.id, id: { in: body.ids } }
          : null

    if (!where) {
      return NextResponse.json({ error: '请提供 ids 或 all' }, { status: 400 })
    }

    await db.familyNotification.updateMany({
      where,
      data: { isRead: true },
    })

    await cacheManager.invalidateTag(`family:${family.id}`)

    return NextResponse.json({ success: true })
  },
  { role: 'PARENT' }
)
