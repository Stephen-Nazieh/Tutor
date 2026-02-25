/**
 * Polls API Routes
 * REST API endpoints for poll management
 */

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { z } from 'zod'

// Validation schemas
const CreatePollSchema = z.object({
  sessionId: z.string(),
  question: z.string().min(1).max(500),
  type: z.enum(['multiple_choice', 'true_false', 'rating', 'short_answer', 'word_cloud']),
  options: z.array(z.object({
    label: z.string(),
    text: z.string().min(1).max(200)
  })).optional(),
  isAnonymous: z.boolean().default(true),
  allowMultiple: z.boolean().default(false),
  showResults: z.boolean().default(true),
  timeLimit: z.number().min(10).max(3600).optional(),
  correctOptionId: z.string().optional()
})

// GET /api/polls - List polls for a session
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const sessionId = searchParams.get('sessionId')

    if (!sessionId) {
      return NextResponse.json({ error: 'Session ID required' }, { status: 400 })
    }

    const polls = await db.poll.findMany({
      where: { sessionId },
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
            createdAt: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    // Filter responses for anonymous polls
    const formattedPolls = polls.map(poll => ({
      ...poll,
      responses: poll.isAnonymous 
        ? poll.responses.map(r => ({
            ...r,
            studentId: undefined
          }))
        : poll.responses,
      totalResponses: poll.responses.length
    }))

    return NextResponse.json({ polls: formattedPolls })
  } catch (error) {
    console.error('Failed to fetch polls:', error)
    return NextResponse.json({ error: 'Failed to fetch polls' }, { status: 500 })
  }
}

// POST /api/polls - Create a new poll
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user || session.user.role !== 'TUTOR') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const validated = CreatePollSchema.parse(body)

    // Create poll with options
    const poll = await db.poll.create({
      data: {
        sessionId: validated.sessionId,
        tutorId: session.user.id,
        question: validated.question,
        type: validated.type.toUpperCase() as any,
        isAnonymous: validated.isAnonymous,
        allowMultiple: validated.allowMultiple,
        showResults: validated.showResults,
        timeLimit: validated.timeLimit,
        correctOptionId: validated.correctOptionId,
        status: 'DRAFT',
        options: {
          create: validated.options?.map((opt, index) => ({
            label: opt.label || String.fromCharCode(65 + index),
            text: opt.text,
            color: getOptionColor(index)
          })) || []
        }
      },
      include: {
        options: true,
        responses: true
      }
    })

    return NextResponse.json({ poll }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid input', details: error.errors }, { status: 400 })
    }
    console.error('Failed to create poll:', error)
    return NextResponse.json({ error: 'Failed to create poll' }, { status: 500 })
  }
}

function getOptionColor(index: number): string {
  const colors = [
    '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'
  ]
  return colors[index % colors.length]
}
