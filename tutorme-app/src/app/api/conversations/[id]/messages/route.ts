/**
 * Conversation Messages API
 * GET /api/conversations/[id]/messages - Get messages
 * POST /api/conversations/[id]/messages - Send message
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/lib/api/middleware'
import { db } from '@/lib/db'

// GET - Get messages in conversation
export const GET = withAuth(async (req: NextRequest, session, context) => {
  const params = await context?.params
  const id = params?.id as string
  const userId = session.user.id
  const { searchParams } = new URL(req.url)
  const cursor = searchParams.get('cursor')
  const limit = parseInt(searchParams.get('limit') || '50', 10)
  
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
  
  // Get messages
  const messages = await db.directMessage.findMany({
    where: { conversationId: id },
    orderBy: { createdAt: 'desc' },
    take: limit,
    skip: cursor ? 1 : 0,
    cursor: cursor ? { id: cursor } : undefined,
    include: {
      sender: {
        select: {
          id: true,
          profile: { select: { name: true, avatarUrl: true } },
        },
      },
    },
  })
  
  // Mark unread messages as read
  await db.directMessage.updateMany({
    where: {
      conversationId: id,
      senderId: { not: userId },
      read: false,
    },
    data: {
      read: true,
      readAt: new Date(),
    },
  })
  
  return NextResponse.json({
    messages: messages.reverse(),
    nextCursor: messages.length === limit ? messages[messages.length - 1]?.id : null,
  })
}, { role: 'TUTOR' })

// POST - Send message
export const POST = withAuth(async (req: NextRequest, session, context) => {
  const params = await context?.params
  const id = params?.id as string
  const userId = session.user.id
  
  try {
    const body = await req.json()
    const { content, type = 'text', attachmentUrl } = body
    
    if (!content && !attachmentUrl) {
      return NextResponse.json(
        { error: 'Content or attachment is required' },
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
    
    // Create message
    const message = await db.directMessage.create({
      data: {
        conversationId: id,
        senderId: userId,
        content: content || '',
        type,
        attachmentUrl,
      },
      include: {
        sender: {
          select: {
            id: true,
            profile: { select: { name: true, avatarUrl: true } },
          },
        },
      },
    })
    
    // Update conversation timestamp
    await db.conversation.update({
      where: { id },
      data: { updatedAt: new Date() },
    })
    
    // Create notification for recipient
    const recipientId = conversation.participant1Id === userId 
      ? conversation.participant2Id 
      : conversation.participant1Id
    
    await db.notification.create({
      data: {
        userId: recipientId,
        type: 'message',
        title: 'New Message',
        message: content?.slice(0, 100) || 'You received a new message',
        actionUrl: `/tutor/messages?conversation=${id}`,
      },
    })
    
    return NextResponse.json({ message }, { status: 201 })
  } catch (error) {
    console.error('Send message error:', error)
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    )
  }
}, { role: 'TUTOR' })
