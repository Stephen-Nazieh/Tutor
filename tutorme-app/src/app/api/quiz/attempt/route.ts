/**
 * Quiz Attempt API
 * Records a student's quiz attempt
 * 
 * POST /api/quiz/attempt
 */

import crypto from 'crypto'
import { NextResponse } from 'next/server'
import { withAuth, withCsrf, ValidationError } from '@/lib/api/middleware'
import { drizzleDb } from '@/lib/db/drizzle'
import { quizAttempt } from '@/lib/db/schema'

export const POST = withCsrf(withAuth(async (req, session) => {
  const body = await req.json()
  const { quizId, score, answers, maxScore, timeSpent, feedback, questionResults } = body

  if (!quizId || score === undefined || !maxScore) {
    throw new ValidationError('Quiz ID, score, and maxScore are required')
  }

  const [attempt] = await drizzleDb
    .insert(quizAttempt)
    .values({
      id: crypto.randomUUID(),
      studentId: session.user.id,
      quizId,
      answers: answers ?? {},
      score,
      maxScore,
      timeSpent: timeSpent ?? 0,
      feedback: feedback ?? null,
      questionResults: Array.isArray(questionResults) ? questionResults : null,
      status: 'submitted',
      attemptNumber: 1,
    })
    .returning()

  return NextResponse.json({
    message: 'Quiz attempt recorded',
    attempt: attempt ?? null,
  })
}, { role: 'STUDENT' }))
