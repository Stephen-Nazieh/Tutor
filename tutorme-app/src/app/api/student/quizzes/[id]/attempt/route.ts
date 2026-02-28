/**
 * Quiz Attempt Start API
 *
 * POST /api/student/quizzes/[id]/attempt - Start a new quiz attempt
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth, withCsrf, NotFoundError, ForbiddenError } from '@/lib/api/middleware'
import { getParamAsync } from '@/lib/api/params'
import { drizzleDb } from '@/lib/db/drizzle'
import { quiz, quizAttempt } from '@/lib/db/schema'
import { eq, and, inArray } from 'drizzle-orm'
import { sql } from 'drizzle-orm'
import crypto from 'crypto'

export const POST = withCsrf(
  withAuth(
    async (req: NextRequest, session, context) => {
      const id = await getParamAsync(context?.params, 'id')
      if (!id) {
        return NextResponse.json({ error: 'Quiz ID required' }, { status: 400 })
      }
      const studentId = session.user.id

      const [quizRow] = await drizzleDb
        .select()
        .from(quiz)
        .where(eq(quiz.id, id))
        .limit(1)

      if (!quizRow) {
        throw new NotFoundError('Quiz not found')
      }

      const now = new Date()
      if (quizRow.startDate && new Date(quizRow.startDate) > now) {
        throw new ForbiddenError('This quiz is not yet available')
      }
      if (quizRow.dueDate && new Date(quizRow.dueDate) < now) {
        throw new ForbiddenError('This quiz has passed its due date')
      }

      const [countRow] = await drizzleDb
        .select({ count: sql<number>`count(*)::int` })
        .from(quizAttempt)
        .where(
          and(
            eq(quizAttempt.quizId, id),
            eq(quizAttempt.studentId, studentId),
            inArray(quizAttempt.status, ['submitted', 'graded'])
          )
        )

      const completedAttempts = countRow?.count ?? 0

      if (completedAttempts >= quizRow.allowedAttempts) {
        throw new ForbiddenError(
          'You have used all your attempts for this quiz'
        )
      }

      const [existingAttempt] = await drizzleDb
        .select()
        .from(quizAttempt)
        .where(
          and(
            eq(quizAttempt.quizId, id),
            eq(quizAttempt.studentId, studentId),
            eq(quizAttempt.status, 'in_progress')
          )
        )
        .limit(1)

      if (existingAttempt) {
        return NextResponse.json({
          attemptId: existingAttempt.id,
          startedAt: existingAttempt.startedAt,
          timeRemaining: quizRow.timeLimit
            ? calculateTimeRemaining(
                existingAttempt.startedAt,
                quizRow.timeLimit
              )
            : undefined,
        })
      }

      const attemptId = crypto.randomUUID()
      await drizzleDb.insert(quizAttempt).values({
        id: attemptId,
        quizId: id,
        studentId,
        status: 'in_progress',
        answers: {},
        score: 0,
        maxScore: quizRow.totalPoints,
        attemptNumber: completedAttempts + 1,
        timeSpent: 0,
        startedAt: new Date(),
      })

      return NextResponse.json(
        {
          attemptId,
          startedAt: new Date(),
          timeRemaining: quizRow.timeLimit ? quizRow.timeLimit * 60 : undefined,
        },
        { status: 201 }
      )
    },
    { role: 'STUDENT' }
  )
)

function calculateTimeRemaining(
  startedAt: Date,
  timeLimitMinutes: number
): number {
  const elapsedMs = Date.now() - startedAt.getTime()
  const limitMs = timeLimitMinutes * 60 * 1000
  return Math.max(0, Math.floor((limitMs - elapsedMs) / 1000))
}
