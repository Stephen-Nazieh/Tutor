/**
 * Quiz Submission API
 *
 * POST /api/student/quizzes/[id]/submit - Submit quiz answers
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth, withCsrf, ValidationError, NotFoundError } from '@/lib/api/middleware'
import { getParamAsync } from '@/lib/api/params'
import { drizzleDb } from '@/lib/db/drizzle'
import { quiz, quizAttempt } from '@/lib/db/schema'
import { eq, and } from 'drizzle-orm'
import { gradeQuiz } from '@/lib/quiz/auto-grading'

export const POST = withCsrf(
  withAuth(
    async (req: NextRequest, session, context) => {
      const id = await getParamAsync(context?.params, 'id')
      if (!id) {
        throw new ValidationError('Quiz ID required')
      }
      const studentId = session.user.id

      const body = await req.json()
      const { attemptId, answers, timeSpent } = body

      if (!attemptId) {
        throw new ValidationError('attemptId is required')
      }

      if (!answers || typeof answers !== 'object') {
        throw new ValidationError('answers are required')
      }

      const [quizRow] = await drizzleDb
        .select()
        .from(quiz)
        .where(eq(quiz.id, id))
        .limit(1)

      if (!quizRow) {
        throw new NotFoundError('Quiz not found')
      }

      const [attempt] = await drizzleDb
        .select()
        .from(quizAttempt)
        .where(
          and(
            eq(quizAttempt.id, attemptId),
            eq(quizAttempt.quizId, id),
            eq(quizAttempt.studentId, studentId),
            eq(quizAttempt.status, 'in_progress')
          )
        )
        .limit(1)

      if (!attempt) {
        throw new NotFoundError('Active attempt not found')
      }

      if (quizRow.timeLimit) {
        const elapsedMinutes =
          (Date.now() - attempt.startedAt.getTime()) / 60000
        if (elapsedMinutes > quizRow.timeLimit + 1) {
          console.log(
            `Quiz ${id} auto-submitted due to time limit for student ${studentId}`
          )
        }
      }

      const questions = (quizRow.questions as any[]) ?? []
      const gradingResult = await gradeQuiz(questions, answers, {
        useAI: true,
        studentId,
      })

      const timeSpentSec =
        timeSpent ??
        Math.floor(
          (Date.now() - attempt.startedAt.getTime()) / 1000
        )

      await drizzleDb
        .update(quizAttempt)
        .set({
          status: 'graded',
          answers: answers as any,
          score: gradingResult.totalScore,
          maxScore: gradingResult.maxScore,
          completedAt: new Date(),
          timeSpent: timeSpentSec,
          questionResults: gradingResult.results as any,
        })
        .where(eq(quizAttempt.id, attemptId))

      const [updatedAttempt] = await drizzleDb
        .select()
        .from(quizAttempt)
        .where(eq(quizAttempt.id, attemptId))
        .limit(1)

      try {
        const { onQuizComplete } = await import('@/lib/gamification/triggers')
        const gamificationResult = await onQuizComplete(
          studentId,
          id,
          gradingResult.percentage,
          gradingResult.percentage === 100
        )
        ;(updatedAttempt as any).gamification = gamificationResult
      } catch (error) {
        console.error('Failed to award XP/badges:', error)
      }

      return NextResponse.json({
        success: true,
        attempt: {
          id: updatedAttempt!.id,
          score: gradingResult.totalScore,
          maxScore: gradingResult.maxScore,
          percentage: gradingResult.percentage,
          completedAt: updatedAttempt!.completedAt,
          questionResults: gradingResult.results,
        },
      })
    },
    { role: 'STUDENT' }
  )
)
