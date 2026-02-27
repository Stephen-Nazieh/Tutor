/**
 * Polls API for Live Classes
 * 
 * GET /api/class/polls?roomId=xxx - List all polls for a room (roomId = sessionId)
 * POST /api/class/polls - Create a new poll
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/lib/api/middleware'
import { drizzleDb } from '@/lib/db/drizzle'
import { poll, pollOption, pollResponse } from '@/lib/db/schema'
import { eq, desc, asc } from 'drizzle-orm'
import { sanitizeHtmlWithMax } from '@/lib/security/sanitize'
import { z } from 'zod'
import crypto from 'crypto'

const pollOptionSchema = z.object({
  id: z.string(),
  text: z.string(),
  isCorrect: z.boolean().optional()
})

const createPollSchema = z.object({
  roomId: z.string().uuid(),
  question: z.string().min(1),
  type: z.enum(['multiple_choice', 'true_false', 'rating', 'short_answer', 'word_cloud']),
  options: z.array(pollOptionSchema).min(2),
  isAnonymous: z.boolean().default(false),
  showResults: z.boolean().default(true),
  timeLimitSeconds: z.number().optional()
})

function getOptionColor(index: number): string {
  const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899']
  return colors[index % colors.length]
}

// GET - List polls for a room (roomId treated as sessionId)
export const GET = withAuth(async (req: NextRequest) => {
  const { searchParams } = new URL(req.url)
  const roomId = searchParams.get('roomId')

  if (!roomId) {
    return NextResponse.json({ error: 'roomId is required' }, { status: 400 })
  }

  try {
    const polls = await drizzleDb
      .select()
      .from(poll)
      .where(eq(poll.sessionId, roomId))
      .orderBy(desc(poll.createdAt))

    const result = await Promise.all(
      polls.map(async (p) => {
        const options = await drizzleDb
          .select()
          .from(pollOption)
          .where(eq(pollOption.pollId, p.id))
          .orderBy(asc(pollOption.label))
        const responses = await drizzleDb
          .select({
            id: pollResponse.id,
            studentId: pollResponse.studentId,
            optionIds: pollResponse.optionIds,
            rating: pollResponse.rating,
            textAnswer: pollResponse.textAnswer,
            createdAt: pollResponse.createdAt,
          })
          .from(pollResponse)
          .where(eq(pollResponse.pollId, p.id))
        return {
          ...p,
          responses,
          _count: { responses: responses.length },
        }
      })
    )

    return NextResponse.json({ polls: result })
  } catch (error) {
    console.error('Error fetching polls:', error)
    return NextResponse.json(
      { error: 'Failed to fetch polls' },
      { status: 500 }
    )
  }
}, { role: 'TUTOR' })

// POST - Create a new poll
export const POST = withAuth(async (req: NextRequest, session) => {
  try {
    const body = await req.json()
    const data = createPollSchema.parse(body)
    const safeQuestion = sanitizeHtmlWithMax(data.question, 500)
    const safeOptions = data.options.map((o: { id: string; text: string; isCorrect?: boolean }) => ({
      ...o,
      text: sanitizeHtmlWithMax(o.text, 200),
    }))

    const typeUpper = data.type.toUpperCase() as 'MULTIPLE_CHOICE' | 'TRUE_FALSE' | 'RATING' | 'SHORT_ANSWER' | 'WORD_CLOUD'
    const pollId = crypto.randomUUID()
    let correctOptionId: string | null = null

    await drizzleDb.insert(poll).values({
      id: pollId,
      sessionId: data.roomId,
      tutorId: session.user.id,
      question: safeQuestion,
      type: typeUpper,
      isAnonymous: data.isAnonymous,
      allowMultiple: false,
      showResults: data.showResults,
      timeLimit: data.timeLimitSeconds ?? null,
      correctOptionId: null,
      status: 'DRAFT',
      totalResponses: 0,
    })

    const optionRows = safeOptions.map((o: { id: string; text: string; isCorrect?: boolean }, index: number) => {
      if (o.isCorrect) correctOptionId = o.id
      return {
        id: o.id,
        pollId,
        label: String.fromCharCode(65 + index),
        text: o.text,
        color: getOptionColor(index),
        responseCount: 0,
        percentage: 0,
      }
    })
    await drizzleDb.insert(pollOption).values(optionRows)

    if (correctOptionId) {
      await drizzleDb.update(poll).set({ correctOptionId }).where(eq(poll.id, pollId))
    }

    const [created] = await drizzleDb.select().from(poll).where(eq(poll.id, pollId)).limit(1)
    const optionsList = await drizzleDb.select().from(pollOption).where(eq(pollOption.pollId, pollId))

    return NextResponse.json({
      success: true,
      poll: { ...created, options: optionsList },
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid data', issues: error.issues },
        { status: 400 }
      )
    }
    console.error('Error creating poll:', error)
    return NextResponse.json(
      { error: 'Failed to create poll' },
      { status: 500 }
    )
  }
}, { role: 'TUTOR' })
