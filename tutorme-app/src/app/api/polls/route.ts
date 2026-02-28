/**
 * Polls API Routes
 * REST API endpoints for poll management
 */

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession, authOptions } from '@/lib/auth'
import { drizzleDb } from '@/lib/db/drizzle'
import { poll, pollOption, pollResponse } from '@/lib/db/schema'
import { eq, asc, desc } from 'drizzle-orm'
import { z } from 'zod'

const CreatePollSchema = z.object({
  sessionId: z.string(),
  question: z.string().min(1).max(500),
  type: z.enum(['multiple_choice', 'true_false', 'rating', 'short_answer', 'word_cloud']),
  options: z
    .array(
      z.object({
        label: z.string(),
        text: z.string().min(1).max(200),
      })
    )
    .optional(),
  isAnonymous: z.boolean().default(true),
  allowMultiple: z.boolean().default(false),
  showResults: z.boolean().default(true),
  timeLimit: z.number().min(10).max(3600).optional(),
  correctOptionId: z.string().optional(),
})

function getOptionColor(index: number): string {
  const colors = [
    '#3b82f6',
    '#10b981',
    '#f59e0b',
    '#ef4444',
    '#8b5cf6',
    '#ec4899',
  ]
  return colors[index % colors.length]
}

// GET /api/polls - List polls for a session
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions, request)
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const sessionId = searchParams.get('sessionId')

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID required' },
        { status: 400 }
      )
    }

    const polls = await drizzleDb
      .select()
      .from(poll)
      .where(eq(poll.sessionId, sessionId))
      .orderBy(desc(poll.createdAt))

    const formattedPolls = await Promise.all(
      polls.map(async (pollRow) => {
        const options = await drizzleDb
          .select()
          .from(pollOption)
          .where(eq(pollOption.pollId, pollRow.id))
          .orderBy(asc(pollOption.label))
        const responses = await drizzleDb
          .select({
            id: pollResponse.id,
            optionIds: pollResponse.optionIds,
            rating: pollResponse.rating,
            textAnswer: pollResponse.textAnswer,
            createdAt: pollResponse.createdAt,
          })
          .from(pollResponse)
          .where(eq(pollResponse.pollId, pollRow.id))
        return {
          ...pollRow,
          options,
          responses: pollRow.isAnonymous
            ? responses.map((r) => ({ ...r, studentId: undefined }))
            : responses,
          totalResponses: responses.length,
        }
      })
    )

    return NextResponse.json({ polls: formattedPolls })
  } catch (error) {
    console.error('Failed to fetch polls:', error)
    return NextResponse.json(
      { error: 'Failed to fetch polls' },
      { status: 500 }
    )
  }
}

// POST /api/polls - Create a new poll
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions, request)
    if (!session?.user || session.user.role !== 'TUTOR') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const validated = CreatePollSchema.parse(body)

    const pollId = crypto.randomUUID()
    const typeUpper = validated.type.toUpperCase() as
      | 'MULTIPLE_CHOICE'
      | 'TRUE_FALSE'
      | 'RATING'
      | 'SHORT_ANSWER'
      | 'WORD_CLOUD'

    await drizzleDb.insert(poll).values({
      id: pollId,
      sessionId: validated.sessionId,
      tutorId: session.user.id,
      question: validated.question,
      type: typeUpper,
      isAnonymous: validated.isAnonymous,
      allowMultiple: validated.allowMultiple,
      showResults: validated.showResults,
      timeLimit: validated.timeLimit ?? null,
      correctOptionId: validated.correctOptionId ?? null,
      status: 'DRAFT',
      totalResponses: 0,
    })

    const options = validated.options?.map((opt, index) => ({
      id: crypto.randomUUID(),
      pollId,
      label: opt.label || String.fromCharCode(65 + index),
      text: opt.text,
      color: getOptionColor(index),
      responseCount: 0,
      percentage: 0,
    }))
    if (options && options.length > 0) {
      await drizzleDb.insert(pollOption).values(options)
    }

    const [created] = await drizzleDb
      .select()
      .from(poll)
      .where(eq(poll.id, pollId))
      .limit(1)
    const optionsList = await drizzleDb
      .select()
      .from(pollOption)
      .where(eq(pollOption.pollId, pollId))
    const responses = await drizzleDb
      .select()
      .from(pollResponse)
      .where(eq(pollResponse.pollId, pollId))

    return NextResponse.json(
      {
        poll: {
          ...created,
          options: optionsList,
          responses,
        },
      },
      { status: 201 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: 'Invalid input',
          details: error.issues,
        },
        { status: 400 }
      )
    }
    console.error('Failed to create poll:', error)
    return NextResponse.json(
      { error: 'Failed to create poll' },
      { status: 500 }
    )
  }
}
