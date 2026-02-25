/**
 * Poll Vote API Route
 * Submit a vote for a poll
 */

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { z } from 'zod'

const VoteSchema = z.object({
  optionIds: z.array(z.string()).optional(),
  rating: z.number().min(1).max(5).optional(),
  textAnswer: z.string().max(500).optional()
})

// POST /api/polls/[pollId]/vote - Submit a vote
export async function POST(
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
    const body = await request.json()
    const validated = VoteSchema.parse(body)

    // Get poll
    const poll = await db.poll.findUnique({
      where: { id: pollId },
      include: { responses: true }
    })

    if (!poll) {
      return NextResponse.json({ error: 'Poll not found' }, { status: 404 })
    }

    if (poll.status !== 'ACTIVE') {
      return NextResponse.json({ error: 'Poll is not active' }, { status: 400 })
    }

    // Check for duplicate votes
    if (!poll.isAnonymous) {
      const existingVote = poll.responses.find(r => r.studentId === session.user.id)
      if (existingVote) {
        return NextResponse.json({ error: 'Already voted' }, { status: 409 })
      }
    } else {
      // For anonymous polls, use hash of userId + pollId
      const respondentHash = await hashString(`${session.user.id}:${pollId}`)
      const existingVote = poll.responses.find(r => r.respondentHash === respondentHash)
      if (existingVote) {
        return NextResponse.json({ error: 'Already voted' }, { status: 409 })
      }
    }

    // Validate vote based on poll type
    if (poll.type === 'MULTIPLE_CHOICE' || poll.type === 'TRUE_FALSE') {
      if (!validated.optionIds || validated.optionIds.length === 0) {
        return NextResponse.json({ error: 'Option selection required' }, { status: 400 })
      }
      if (!poll.allowMultiple && validated.optionIds.length > 1) {
        return NextResponse.json({ error: 'Only one option allowed' }, { status: 400 })
      }
    } else if (poll.type === 'RATING') {
      if (validated.rating === undefined) {
        return NextResponse.json({ error: 'Rating required' }, { status: 400 })
      }
    } else if (poll.type === 'SHORT_ANSWER' || poll.type === 'WORD_CLOUD') {
      if (!validated.textAnswer?.trim()) {
        return NextResponse.json({ error: 'Answer required' }, { status: 400 })
      }
    }

    // Create response
    const respondentHash = poll.isAnonymous 
      ? await hashString(`${session.user.id}:${pollId}`)
      : null

    const response = await db.pollResponse.create({
      data: {
        pollId: pollId,
        respondentHash,
        studentId: poll.isAnonymous ? null : session.user.id,
        optionIds: validated.optionIds || [],
        rating: validated.rating,
        textAnswer: validated.textAnswer
      }
    })

    // Update poll total responses
    await db.poll.update({
      where: { id: pollId },
      data: {
        totalResponses: { increment: 1 }
      }
    })

    return NextResponse.json({ response }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid input', details: error.errors }, { status: 400 })
    }
    console.error('Failed to submit vote:', error)
    return NextResponse.json({ error: 'Failed to submit vote' }, { status: 500 })
  }
}

async function hashString(input: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(input)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}
