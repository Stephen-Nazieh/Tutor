/**
 * Polls API for Live Classes
 * 
 * GET /api/class/polls?roomId=xxx - List all polls for a room
 * POST /api/class/polls - Create a new poll
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/lib/api/middleware'
import { db } from '@/lib/db'
import { sanitizeHtmlWithMax } from '@/lib/security/sanitize'
import { z } from 'zod'

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

// GET - List polls for a room
export const GET = withAuth(async (req: NextRequest) => {
  const { searchParams } = new URL(req.url)
  const roomId = searchParams.get('roomId')
  
  if (!roomId) {
    return NextResponse.json({ error: 'roomId is required' }, { status: 400 })
  }

  try {
    const polls = await db.poll.findMany({
      where: { roomId },
      orderBy: { createdAt: 'desc' },
      include: {
        responses: {
          select: {
            id: true,
            studentId: true,
            answer: true,
            createdAt: true
          }
        },
        _count: {
          select: { responses: true }
        }
      }
    })

    return NextResponse.json({ polls })
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

    const poll = await db.poll.create({
      data: {
        roomId: data.roomId,
        tutorId: session.user.id,
        question: safeQuestion,
        type: data.type,
        options: safeOptions as any,
        isAnonymous: data.isAnonymous,
        showResults: data.showResults,
        timeLimitSeconds: data.timeLimitSeconds,
        status: 'draft'
      }
    })

    return NextResponse.json({ success: true, poll })
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
