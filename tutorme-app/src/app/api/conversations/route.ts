/**
 * Conversations API (Messaging System)
 * GET /api/conversations - List user's conversations
 * POST /api/conversations - Create or get conversation
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/lib/api/middleware'
import { db } from '@/lib/db'

// GET - List conversations
export const GET = withAuth(async (req: NextRequest, session) => {
  const userId = session.user.id
  
  const conversations = await db.conversation.findMany({
    where: {
      OR: [
        { participant1Id: userId },
        { participant2Id: userId },
      ],
    },
    orderBy: { updatedAt: 'desc' },
    include: {
      participant1: {
        select: {
          id: true,
          email: true,
          profile: { select: { name: true, avatarUrl: true } },
        },
      },
      participant2: {
        select: {
          id: true,
          email: true,
          profile: { select: { name: true, avatarUrl: true } },
        },
      },
      messages: {
        orderBy: { createdAt: 'desc' },
        take: 1,
        select: {
          content: true,
          createdAt: true,
          read: true,
          senderId: true,
        },
      },
      _count: {
        select: {
          messages: {
            where: {
              read: false,
              senderId: { not: userId },
            },
          },
        },
      },
    },
  })
  
  // Format conversations with other participant info
  const formattedConversations = conversations.map((conv: { 
    participant1Id: string; 
    participant1: { id: string; email: string; profile: { name: string | null; avatarUrl: string | null } | null }; 
    participant2: { id: string; email: string; profile: { name: string | null; avatarUrl: string | null } | null }; 
    messages: { content: string; createdAt: Date; read: boolean; senderId: string }[]; 
    _count: { messages: number };
    [key: string]: unknown;
  }) => {
    const otherParticipant = conv.participant1Id === userId 
      ? conv.participant2 
      : conv.participant1
    
    return {
      ...conv,
      otherParticipant: {
        id: otherParticipant.id,
        name: otherParticipant.profile?.name || otherParticipant.email.split('@')[0],
        avatarUrl: otherParticipant.profile?.avatarUrl,
      },
      lastMessage: conv.messages[0] || null,
      unreadCount: conv._count.messages,
    }
  })
  
  return NextResponse.json({ conversations: formattedConversations })
}, { role: 'TUTOR' })

// POST - Create or get existing conversation
export const POST = withAuth(async (req: NextRequest, session) => {
  const userId = session.user.id
  
  try {
    const body = await req.json()
    const { participantId } = body
    
    if (!participantId) {
      return NextResponse.json(
        { error: 'Participant ID is required' },
        { status: 400 }
      )
    }
    
    if (participantId === userId) {
      return NextResponse.json(
        { error: 'Cannot create conversation with yourself' },
        { status: 400 }
      )
    }
    
    // Check if conversation already exists
    let conversation = await db.conversation.findFirst({
      where: {
        OR: [
          { participant1Id: userId, participant2Id: participantId },
          { participant1Id: participantId, participant2Id: userId },
        ],
      },
      include: {
        participant1: {
          select: {
            id: true,
            email: true,
            profile: { select: { name: true, avatarUrl: true } },
          },
        },
        participant2: {
          select: {
            id: true,
            email: true,
            profile: { select: { name: true, avatarUrl: true } },
          },
        },
      },
    })
    
    // Create new conversation if doesn't exist
    if (!conversation) {
      conversation = await db.conversation.create({
        data: {
          participant1Id: userId,
          participant2Id: participantId,
        },
        include: {
          participant1: {
            select: {
              id: true,
              email: true,
              profile: { select: { name: true, avatarUrl: true } },
            },
          },
          participant2: {
            select: {
              id: true,
              email: true,
              profile: { select: { name: true, avatarUrl: true } },
            },
          },
        },
      })
    }
    
    return NextResponse.json({ conversation })
  } catch (error) {
    console.error('Create conversation error:', error)
    return NextResponse.json(
      { error: 'Failed to create conversation' },
      { status: 500 }
    )
  }
}, { role: 'TUTOR' })
