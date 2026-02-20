/**
 * Quiz Attempt API
 * Records a student's quiz attempt
 * 
 * POST /api/quiz/attempt
 */

import { NextResponse } from 'next/server'
import { withAuth, withCsrf, ValidationError } from '@/lib/api/middleware'
import { db } from '@/lib/db'

export const POST = withCsrf(withAuth(async (req, session) => {
  const body = await req.json()
  const { quizId, score, answers, maxScore, timeSpent, feedback, questionResults } = body

  if (!quizId || score === undefined || !maxScore) {
    throw new ValidationError('Quiz ID, score, and maxScore are required')
  }

  // Save the quiz attempt (questionResults: per-question { questionId, correct, pointsEarned, pointsMax, selectedAnswer?, timeSpentSec? })
  const attempt = await db.quizAttempt.create({
    data: {
      studentId: session.user.id,
      quizId,
      answers: answers || {},
      score,
      maxScore,
      timeSpent: timeSpent || 0,
      feedback,
      questionResults: Array.isArray(questionResults) ? questionResults : undefined
    }
  })

  return NextResponse.json({ 
    message: 'Quiz attempt recorded',
    attempt 
  })
}, { role: 'STUDENT' }))
