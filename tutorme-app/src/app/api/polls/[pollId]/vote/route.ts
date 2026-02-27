/**
 * Poll Vote API Route
 * Submit a vote for a poll
 */

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { drizzleDb } from '@/lib/db/drizzle'
import { poll, pollOption, pollResponse } from '@/lib/db/schema'
import { eq, and } from 'drizzle-orm'
import { z } from 'zod'

const VoteSchema = z.object({
  optionIds: z.array(z.string()).optional(),
  rating: z.number().min(1).max(5).optional(),
  textAnswer: z.string().max(500).optional(),
})

async function hashString(input: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(input)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
}

// POST /api/polls/[pollId]/vote - Submit a vote
export async function POST(request: NextRequest, context: any) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const params = await context?.params
    const { pollId } = params || {}
    const body = await request.json()
    const validated = VoteSchema.parse(body)

    const [pollRow] = await drizzleDb
      .select()
      .from(poll)
      .where(eq(poll.id, pollId))
      .limit(1)

    if (!pollRow) {
      return NextResponse.json({ error: 'Poll not found' }, { status: 404 })
    }

    if (pollRow.status !== 'ACTIVE') {
      return NextResponse.json({ error: 'Poll is not active' }, { status: 400 })
    }

    const responses = await drizzleDb
      .select({ id: pollResponse.id, studentId: pollResponse.studentId, respondentHash: pollResponse.respondentHash })
      .from(pollResponse)
      .where(eq(pollResponse.pollId, pollId))

    if (!pollRow.isAnonymous) {
      const existingVote = responses.find((r) => r.studentId === session.user.id)
      if (existingVote) {
        return NextResponse.json({ error: 'Already voted' }, { status: 409 })
      }
    } else {
      const respondentHash = await hashString(`${session.user.id}:${pollId}`)
      const existingVote = responses.find((r) => r.respondentHash === respondentHash)
      if (existingVote) {
        return NextResponse.json({ error: 'Already voted' }, { status: 409 })
      }
    }

    if (pollRow.type === 'MULTIPLE_CHOICE' || pollRow.type === 'TRUE_FALSE') {
      if (!validated.optionIds || validated.optionIds.length === 0) {
        return NextResponse.json({ error: 'Option selection required' }, { status: 400 })
      }
      if (!pollRow.allowMultiple && validated.optionIds.length > 1) {
        return NextResponse.json({ error: 'Only one option allowed' }, { status: 400 })
      }
    } else if (pollRow.type === 'RATING') {
      if (validated.rating === undefined) {
        return NextResponse.json({ error: 'Rating required' }, { status: 400 })
      }
    } else if (pollRow.type === 'SHORT_ANSWER' || pollRow.type === 'WORD_CLOUD') {
      if (!validated.textAnswer?.trim()) {
        return NextResponse.json({ error: 'Answer required' }, { status: 400 })
      }
    }

    const respondentHash = pollRow.isAnonymous
      ? await hashString(`${session.user.id}:${pollId}`)
      : null

    const responseId = crypto.randomUUID()
    await drizzleDb.insert(pollResponse).values({
      id: responseId,
      pollId,
      respondentHash,
      studentId: pollRow.isAnonymous ? null : session.user.id,
      optionIds: validated.optionIds ?? [],
      rating: validated.rating ?? null,
      textAnswer: validated.textAnswer ?? null,
    })

    await drizzleDb
      .update(poll)
      .set({ totalResponses: pollRow.totalResponses + 1 })
      .where(eq(poll.id, pollId))

    const [response] = await drizzleDb
      .select()
      .from(pollResponse)
      .where(eq(pollResponse.id, responseId))
      .limit(1)

    return NextResponse.json({ response }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.issues },
        { status: 400 }
      )
    }
    console.error('Failed to submit vote:', error)
    return NextResponse.json(
      { error: 'Failed to submit vote' },
      { status: 500 }
    )
  }
}
