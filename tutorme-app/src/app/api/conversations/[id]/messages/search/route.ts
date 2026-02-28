/**
 * Message Search API
 * GET /api/conversations/[id]/messages/search?q=query
 * 
 * Search messages within a conversation
 */

import { NextRequest, NextResponse } from 'next/server'
import { and, desc, eq, ilike, or, sql } from 'drizzle-orm'
import { withAuth, parseBoundedInt } from '@/lib/api/middleware'
import { getParamAsync } from '@/lib/api/params'
import { drizzleDb } from '@/lib/db/drizzle'
import { conversation, directMessage, user, profile } from '@/lib/db/schema'
import { isConversationAllowedByRoles } from '@/lib/messaging/permissions'

type AppRole = 'STUDENT' | 'TUTOR' | 'PARENT' | 'ADMIN'

export const GET = withAuth(async (req: NextRequest, session, context) => {
  const id = await getParamAsync(context?.params, 'id')
  if (!id) {
    return NextResponse.json({ error: 'Conversation ID required' }, { status: 400 })
  }
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

  const [conv] = await drizzleDb
    .select()
    .from(conversation)
    .where(
      and(
        eq(conversation.id, id),
        or(
          eq(conversation.participant1Id, userId),
          eq(conversation.participant2Id, userId)
        )
      )
    )
    .limit(1)

  if (!conv) {
    return NextResponse.json(
      { error: 'Conversation not found' },
      { status: 404 }
    )
  }

  const [p1] = await drizzleDb
    .select({ role: user.role })
    .from(user)
    .where(eq(user.id, conv.participant1Id))
    .limit(1)
  const [p2] = await drizzleDb
    .select({ role: user.role })
    .from(user)
    .where(eq(user.id, conv.participant2Id))
    .limit(1)

  if (!p1 || !p2 || !isConversationAllowedByRoles(p1.role as AppRole, p2.role as AppRole)) {
    return NextResponse.json(
      { error: 'Conversation not found' },
      { status: 404 }
    )
  }

  const searchPattern = `%${query}%`
  const messagesRows = await drizzleDb
    .select({
      id: directMessage.id,
      conversationId: directMessage.conversationId,
      senderId: directMessage.senderId,
      content: directMessage.content,
      type: directMessage.type,
      attachmentUrl: directMessage.attachmentUrl,
      read: directMessage.read,
      readAt: directMessage.readAt,
      createdAt: directMessage.createdAt,
      name: profile.name,
      avatarUrl: profile.avatarUrl,
    })
    .from(directMessage)
    .innerJoin(user, eq(user.id, directMessage.senderId))
    .leftJoin(profile, eq(profile.userId, user.id))
    .where(
      and(
        eq(directMessage.conversationId, id),
        ilike(directMessage.content, searchPattern)
      )
    )
    .orderBy(desc(directMessage.createdAt))
    .limit(limit)
    .offset(offset)

  const [{ count: total }] = await drizzleDb
    .select({ count: sql<number>`count(*)::int` })
    .from(directMessage)
    .where(
      and(
        eq(directMessage.conversationId, id),
        ilike(directMessage.content, searchPattern)
      )
    )

  const messages = messagesRows.map((m) => ({
    id: m.id,
    conversationId: m.conversationId,
    senderId: m.senderId,
    content: m.content,
    type: m.type,
    attachmentUrl: m.attachmentUrl,
    read: m.read,
    readAt: m.readAt,
    createdAt: m.createdAt,
    sender: {
      id: m.senderId,
      profile: { name: m.name, avatarUrl: m.avatarUrl },
    },
  }))

  return NextResponse.json({
    messages: messages.reverse(),
    total: total ?? 0,
    hasMore: offset + messages.length < (total ?? 0),
  })
})
