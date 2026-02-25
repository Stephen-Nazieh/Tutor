/**
 * GET /api/parent/messages
 * List conversations and messages for parent (DirectMessage system)
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/lib/api/middleware'
import { db } from '@/lib/db'
import cacheManager from '@/lib/cache-manager'

const CACHE_TTL = 60

export const GET = withAuth(
  async (req: NextRequest, session) => {
    const userId = session.user?.id
    if (!userId) {
      return NextResponse.json({ error: '未授权' }, { status: 401 })
    }

    const cacheKey = `parent:messages:${userId}`
    const cached = await cacheManager.get<object>(cacheKey)
    if (cached) return NextResponse.json({ success: true, data: cached })

    const conversations = await db.conversation.findMany({
      where: {
        OR: [
          { participant1Id: userId },
          { participant2Id: userId },
        ],
      },
      include: {
        participant1: {
          select: {
            id: true,
            email: true,
            profile: { select: { name: true } },
          },
        },
        participant2: {
          select: {
            id: true,
            email: true,
            profile: { select: { name: true } },
          },
        },
        messages: {
          orderBy: { createdAt: 'desc' },
          take: 20,
          include: {
            sender: {
              select: {
                id: true,
                profile: { select: { name: true } },
              },
            },
          },
        },
      },
      orderBy: { updatedAt: 'desc' },
      take: 20,
    })

    const data = {
      conversations: conversations.map((c) => {
        const other =
          c.participant1Id === userId ? c.participant2 : c.participant1
        return {
          id: c.id,
          otherUser: {
            id: other.id,
            name: other.profile?.name ?? other.email,
            email: other.email,
          },
          lastUpdated: c.updatedAt,
          messages: c.messages.map((m) => ({
            id: m.id,
            content: m.content,
            senderId: m.senderId,
            senderName: m.sender.profile?.name ?? null,
            read: m.read,
            createdAt: m.createdAt,
          })),
        }
      }),
    }

    await cacheManager.set(cacheKey, data, {
      ttl: CACHE_TTL,
      tags: [`parent:${userId}`],
    })
    return NextResponse.json({ success: true, data })
  },
  { role: 'PARENT' }
)
