/**
 * Poll Voting API
 * 
 * POST /api/class/polls/[pollId]/vote - Submit a vote/response
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/lib/api/middleware'
import { db } from '@/lib/db'
import { z } from 'zod'
import crypto from 'crypto'

const voteSchema = z.object({
  answer: z.union([z.string(), z.array(z.string())]),
  anonymousId: z.string().optional() // For anonymous tracking without user ID
})

// POST - Submit a vote
export const POST = withAuth(async (req: NextRequest, session) => {
  try {
    const pollId = req.url.split('/polls/')[1]?.split('/')[0]
    if (!pollId) {
      return NextResponse.json({ error: 'Poll ID is required' }, { status: 400 })
    }

    const body = await req.json()
    const data = voteSchema.parse(body)

    // Get the poll to check if it's active
    const poll = await db.poll.findUnique({
      where: { id: pollId }
    })

    if (!poll) {
      return NextResponse.json({ error: 'Poll not found' }, { status: 404 })
    }

    if (poll.status !== 'active') {
      return NextResponse.json(
        { error: 'Poll is not active' },
        { status: 400 }
      )
    }

    // Check if time limit has expired
    if (poll.timeLimitSeconds && poll.startedAt) {
      const elapsedSeconds = (Date.now() - new Date(poll.startedAt).getTime()) / 1000
      if (elapsedSeconds > poll.timeLimitSeconds) {
        return NextResponse.json(
          { error: 'Poll has expired' },
          { status: 400 }
        )
      }
    }

    // For non-anonymous polls, check if user already voted
    if (!poll.isAnonymous) {
      const existingVote = await db.pollResponse.findFirst({
        where: {
          pollId,
          studentId: session.user.id
        }
      })

      if (existingVote) {
        return NextResponse.json(
          { error: 'You have already voted in this poll' },
          { status: 400 }
        )
      }
    }

    // Determine if answer is correct (for quizzes)
    let isCorrect: boolean | undefined
    if (poll.type === 'multiple_choice' || poll.type === 'true_false') {
      const options = poll.options as Array<{ id: string; text: string; isCorrect?: boolean }>
      const correctOptions = options.filter(o => o.isCorrect).map(o => o.id)
      
      if (correctOptions.length > 0) {
        const answers = Array.isArray(data.answer) ? data.answer : [data.answer]
        isCorrect = correctOptions.length === answers.length && 
                    correctOptions.every(id => answers.includes(id))
      }
    }

    // Create anonymous hash if needed
    let anonymousId = data.anonymousId
    if (poll.isAnonymous && !anonymousId) {
      anonymousId = crypto
        .createHash('sha256')
        .update(session.user.id + pollId)
        .digest('hex')
        .substring(0, 16)
    }

    const response = await db.pollResponse.create({
      data: {
        pollId,
        studentId: poll.isAnonymous ? null : session.user.id,
        anonymousId: poll.isAnonymous ? anonymousId : null,
        answer: data.answer as any,
        isCorrect
      }
    })

    return NextResponse.json({ success: true, response })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid data', issues: error.issues },
        { status: 400 }
      )
    }
    console.error('Error submitting vote:', error)
    return NextResponse.json(
      { error: 'Failed to submit vote' },
      { status: 500 }
    )
  }
})
