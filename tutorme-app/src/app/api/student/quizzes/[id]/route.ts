/**
 * Individual Student Quiz API
 *
 * GET /api/student/quizzes/[id] - Get quiz details for student
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth, NotFoundError, ForbiddenError } from '@/lib/api/middleware'
import { getParamAsync } from '@/lib/api/params'
import { drizzleDb } from '@/lib/db/drizzle'
import { quiz, quizAttempt, quizAssignment, curriculumEnrollment } from '@/lib/db/schema'
import { eq, and, or } from 'drizzle-orm'
import { desc } from 'drizzle-orm'

export const GET = withAuth(async (req: NextRequest, session, context) => {
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

  const hasAccess = await checkQuizAccess(quizRow, studentId)
  if (!hasAccess) {
    throw new ForbiddenError('You do not have access to this quiz')
  }

  const now = new Date()
  if (quizRow.startDate && new Date(quizRow.startDate) > now) {
    throw new ForbiddenError('This quiz is not yet available')
  }

  const attempts = await drizzleDb
    .select()
    .from(quizAttempt)
    .where(
      and(eq(quizAttempt.quizId, id), eq(quizAttempt.studentId, studentId))
    )
    .orderBy(desc(quizAttempt.attemptNumber))

  const completedAttempts = attempts.filter(
    (a) => a.status === 'graded' || a.status === 'submitted'
  )
  const attemptsRemaining = Math.max(
    0,
    quizRow.allowedAttempts - completedAttempts.length
  )
  const canAttempt =
    attemptsRemaining > 0 &&
    (!quizRow.dueDate || new Date(quizRow.dueDate) >= now)

  let questions = (quizRow.questions as any[]) ?? []
  if (quizRow.shuffleQuestions && canAttempt) {
    questions = shuffleArray([...questions])
  }
  if (quizRow.shuffleOptions && canAttempt) {
    questions = questions.map((q: any) => {
      if (q.options && q.options.length > 1) {
        return { ...q, options: shuffleArray([...q.options]) }
      }
      return q
    })
  }

  const sanitizedQuestions = questions.map((q: any) => ({
    id: q.id,
    type: q.type,
    question: q.question,
    options: q.options,
    points: q.points,
    difficulty: q.difficulty,
    hint: q.hint,
    order: q.order,
  }))

  return NextResponse.json({
    quiz: {
      id: quizRow.id,
      title: quizRow.title,
      description: quizRow.description,
      type: quizRow.type,
      timeLimit: quizRow.timeLimit,
      totalPoints: quizRow.totalPoints,
      startDate: quizRow.startDate,
      dueDate: quizRow.dueDate,
      showCorrectAnswers: quizRow.showCorrectAnswers,
    },
    questions: sanitizedQuestions,
    attempts: completedAttempts.map((a) => ({
      id: a.id,
      score: Math.round((a.score / a.maxScore) * 100),
      completedAt: a.completedAt,
      attemptNumber: a.attemptNumber,
      timeSpent: a.timeSpent,
    })),
    canAttempt,
    attemptsRemaining,
  })
}, { role: 'STUDENT' })

async function checkQuizAccess(
  quizRow: { id: string; curriculumId: string | null },
  studentId: string
): Promise<boolean> {
  const [directAssignment] = await drizzleDb
    .select()
    .from(quizAssignment)
    .where(
      and(
        eq(quizAssignment.quizId, quizRow.id),
        eq(quizAssignment.isActive, true),
        or(
          and(
            eq(quizAssignment.assignedToType, 'student'),
            eq(quizAssignment.assignedToId, studentId)
          ),
          eq(quizAssignment.assignedToAll, true)
        )
      )
    )
    .limit(1)

  if (directAssignment) return true

  if (quizRow.curriculumId) {
    const [enrollment] = await drizzleDb
      .select()
      .from(curriculumEnrollment)
      .where(
        and(
          eq(curriculumEnrollment.curriculumId, quizRow.curriculumId),
          eq(curriculumEnrollment.studentId, studentId)
        )
      )
      .limit(1)
    if (enrollment) return true
  }

  return false
}

function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}
