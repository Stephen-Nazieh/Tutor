/**
 * Poll Detail API Routes
 * Individual poll management endpoints
 */

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { drizzleDb } from '@/lib/db/drizzle'
import { poll, pollOption, pollResponse } from '@/lib/db/schema'
import { eq, asc } from 'drizzle-orm'
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

    const params = await context?.params
    const { pollId } = params || {}

    const [pollRow] = await drizzleDb
      .select()
      .from(poll)
      .where(eq(poll.id, pollId))
      .limit(1)

    if (!pollRow) {
      return NextResponse.json({ error: 'Poll not found' }, { status: 404 })
    }

    const options = await drizzleDb
      .select()
      .from(pollOption)
      .where(eq(pollOption.pollId, pollId))
      .orderBy(asc(pollOption.label))

    const responses = await drizzleDb
      .select({
        id: pollResponse.id,
        optionIds: pollResponse.optionIds,
        rating: pollResponse.rating,
        textAnswer: pollResponse.textAnswer,
        studentId: pollResponse.studentId,
        createdAt: pollResponse.createdAt,
      })
      .from(pollResponse)
      .where(eq(pollResponse.pollId, pollId))

    const formattedPoll = {
      ...pollRow,
      options,
      responses: pollRow.isAnonymous
        ? responses.map((r) => ({ ...r, studentId: undefined }))
        : responses,
      totalResponses: responses.length,
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
  showResults: z.boolean().optional(),
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

    const params = await context?.params
    const { pollId } = params || {}
    const body = await request.json()
    const validated = UpdatePollSchema.parse(body)

    const updateData: {
      status?: 'DRAFT' | 'ACTIVE' | 'CLOSED'
      startedAt?: Date
      endedAt?: Date
      question?: string
      showResults?: boolean
    } = {}

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

    if (Object.keys(updateData).length === 0) {
      const [existing] = await drizzleDb.select().from(poll).where(eq(poll.id, pollId)).limit(1)
      if (!existing) {
        return NextResponse.json({ error: 'Poll not found' }, { status: 404 })
      }
      const options = await drizzleDb.select().from(pollOption).where(eq(pollOption.pollId, pollId))
      const responses = await drizzleDb
        .select({
          id: pollResponse.id,
          optionIds: pollResponse.optionIds,
          rating: pollResponse.rating,
          textAnswer: pollResponse.textAnswer,
          createdAt: pollResponse.createdAt,
        })
        .from(pollResponse)
        .where(eq(pollResponse.pollId, pollId))
      return NextResponse.json({ poll: { ...existing, options, responses } })
    }

    await drizzleDb.update(poll).set(updateData).where(eq(poll.id, pollId))

    const [updated] = await drizzleDb.select().from(poll).where(eq(poll.id, pollId)).limit(1)
    const options = await drizzleDb.select().from(pollOption).where(eq(pollOption.pollId, pollId))
    const responses = await drizzleDb
      .select({
        id: pollResponse.id,
        optionIds: pollResponse.optionIds,
        rating: pollResponse.rating,
        textAnswer: pollResponse.textAnswer,
        createdAt: pollResponse.createdAt,
      })
      .from(pollResponse)
      .where(eq(pollResponse.pollId, pollId))

    return NextResponse.json({ poll: { ...updated, options, responses } })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid input', details: error.issues }, { status: 400 })
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

    const params = await context?.params
    const { pollId } = params || {}

    await drizzleDb.delete(pollResponse).where(eq(pollResponse.pollId, pollId))
    await drizzleDb.delete(pollOption).where(eq(pollOption.pollId, pollId))
    await drizzleDb.delete(poll).where(eq(poll.id, pollId))

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to delete poll:', error)
    return NextResponse.json({ error: 'Failed to delete poll' }, { status: 500 })
  }
}
