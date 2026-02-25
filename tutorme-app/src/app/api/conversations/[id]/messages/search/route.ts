/**
 * Message Search API
 * GET /api/conversations/[id]/messages/search?q=query
 * 
 * Search messages within a conversation
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth, parseBoundedInt } from '@/lib/api/middleware'
import { db } from '@/lib/db'
import { isConversationAllowedByRoles } from '@/lib/messaging/permissions'

type AppRole = 'STUDENT' | 'TUTOR' | 'PARENT' | 'ADMIN'

export const GET = withAuth(async (req: NextRequest, session, context) => {
  const params = await context?.params
  const id = params?.id as string
  const userId = session.user.id
  const { searchParams } = new URL(req.url)
  const query = searchParams.get('q')
  const limit = parseBoundedInt(searchParams.get('limit'), 20, { min: 1, max: 100 })
  const offset = parseBoundedInt(searchParams.get('offset'), 0, { min: 0, max: 5000 })

  if (!query) {
    return NextResponse.json(
      { error: 'Search query is required' },
      { status: 400 }
    )
  }

  // Verify user is participant
  const conversation = await db.conversation.findFirst({
    where: {
      id,
      OR: [
        { participant1Id: userId },
        { participant2Id: userId },
      ],
    },
    include: {
      participant1: { select: { role: true } },
      participant2: { select: { role: true } },
    },
  })

  if (!conversation || !isConversationAllowedByRoles(conversation.participant1.role as AppRole, conversation.participant2.role as AppRole)) {
    return NextResponse.json(
      { error: 'Conversation not found' },
      { status: 404 }
    )
  }

  // Search messages using Prisma's contains filter
  // Note: For production, consider using full-text search (PostgreSQL's tsvector)
  const messages = await db.directMessage.findMany({
    where: {
      conversationId: id,
      content: {
        contains: query,
        mode: 'insensitive',
      },
    },
    orderBy: { createdAt: 'desc' },
    take: limit,
    skip: offset,
    include: {
      sender: {
        select: {
          id: true,
          profile: { select: { name: true, avatarUrl: true } },
        },
      },
    },
  })

  const total = await db.directMessage.count({
    where: {
      conversationId: id,
      content: {
        contains: query,
        mode: 'insensitive',
      },
    },
  })

  return NextResponse.json({
    messages: messages.reverse(),
    total,
    hasMore: offset + messages.length < total,
  })
})
