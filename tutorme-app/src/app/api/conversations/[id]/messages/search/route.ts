/**
 * Message Search API
 * GET /api/conversations/[id]/messages/search?q=query
 * 
 * Search messages within a conversation
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/lib/api/middleware'
import { db } from '@/lib/db'

export const GET = withAuth(async (req: NextRequest, session, context) => {
  const params = await context?.params
  const id = params?.id as string
  const userId = session.user.id
  const { searchParams } = new URL(req.url)
  const query = searchParams.get('q')
  const limit = parseInt(searchParams.get('limit') || '20', 10)
  const offset = parseInt(searchParams.get('offset') || '0', 10)

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
  })

  if (!conversation) {
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
}, { role: 'TUTOR' })
