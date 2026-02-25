/**
 * Poll Detail API Routes
 * Individual poll management endpoints
 */

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { z } from 'zod'

// GET /api/polls/[pollId] - Get a specific poll
export async function GET(
  request: NextRequest,
  context: any
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const params = await context?.params;
  const { pollId } = params || {};

    const poll = await db.poll.findUnique({
      where: { id: pollId },
      include: {
        options: {
          orderBy: { label: 'asc' }
        },
        responses: {
          select: {
            id: true,
            optionIds: true,
            rating: true,
            textAnswer: true,
            studentId: true,
            createdAt: true
          }
        }
      }
    })

    if (!poll) {
      return NextResponse.json({ error: 'Poll not found' }, { status: 404 })
    }

    // Filter responses for anonymous polls
    const formattedPoll = {
      ...poll,
      responses: poll.isAnonymous
        ? poll.responses.map(r => ({ ...r, studentId: undefined }))
        : poll.responses,
      totalResponses: poll.responses.length
    }

    return NextResponse.json({ poll: formattedPoll })
  } catch (error) {
    console.error('Failed to fetch poll:', error)
    return NextResponse.json({ error: 'Failed to fetch poll' }, { status: 500 })
  }
}

// PATCH /api/polls/[pollId] - Update poll status (start/end)
const UpdatePollSchema = z.object({
  status: z.enum(['DRAFT', 'ACTIVE', 'CLOSED']).optional(),
  question: z.string().min(1).max(500).optional(),
  showResults: z.boolean().optional()
})

export async function PATCH(
  request: NextRequest,
  context: any
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user || session.user.role !== 'TUTOR') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const params = await context?.params;
  const { pollId } = params || {};
    const body = await request.json()
    const validated = UpdatePollSchema.parse(body)

    const updateData: any = {}
    
    if (validated.status) {
      updateData.status = validated.status
      if (validated.status === 'ACTIVE') {
        updateData.startedAt = new Date()
      } else if (validated.status === 'CLOSED') {
        updateData.endedAt = new Date()
      }
    }
    
    if (validated.question !== undefined) {
      updateData.question = validated.question
    }
    
    if (validated.showResults !== undefined) {
      updateData.showResults = validated.showResults
    }

    const poll = await db.poll.update({
      where: { id: pollId },
      data: updateData,
      include: {
        options: true,
        responses: {
          select: {
            id: true,
            optionIds: true,
            rating: true,
            textAnswer: true,
            createdAt: true
          }
        }
      }
    })

    return NextResponse.json({ poll })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid input', details: error.errors }, { status: 400 })
    }
    console.error('Failed to update poll:', error)
    return NextResponse.json({ error: 'Failed to update poll' }, { status: 500 })
  }
}

// DELETE /api/polls/[pollId] - Delete a poll
export async function DELETE(
  request: NextRequest,
  context: any
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user || session.user.role !== 'TUTOR') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const params = await context?.params;
  const { pollId } = params || {};

    await db.poll.delete({
      where: { id: pollId }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to delete poll:', error)
    return NextResponse.json({ error: 'Failed to delete poll' }, { status: 500 })
  }
}
