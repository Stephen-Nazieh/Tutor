/**
 * Student Quizzes API
 * GET /api/student/quizzes - List quizzes available to the student
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/lib/api/middleware'
import { drizzleDb } from '@/lib/db/drizzle'
import {
  curriculumEnrollment,
  quizAssignment,
  quiz,
  quizAttempt,
} from '@/lib/db/schema'
import { eq, and, or, inArray, desc } from 'drizzle-orm'
import { StudentQuiz } from '@/types/quiz'

export const GET = withAuth(async (req: NextRequest, session) => {
  const studentId = session.user.id
  const { searchParams } = new URL(req.url)
  const status = searchParams.get('status') // 'available', 'completed', 'all'

  const enrollments = await drizzleDb
    .select({ curriculumId: curriculumEnrollment.curriculumId })
    .from(curriculumEnrollment)
    .where(eq(curriculumEnrollment.studentId, studentId))
  const enrolledCurriculumIds = enrollments.map((e) => e.curriculumId)

  const assignmentRows = await drizzleDb
    .select()
    .from(quizAssignment)
    .where(
      and(
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

  const curriculumQuizIds =
    enrolledCurriculumIds.length > 0
      ? (
          await drizzleDb
            .select({ id: quiz.id })
            .from(quiz)
            .where(inArray(quiz.curriculumId, enrolledCurriculumIds))
        ).map((q) => q.id)
      : []
  const curriculumAssignments =
    curriculumQuizIds.length > 0
      ? await drizzleDb
          .select()
          .from(quizAssignment)
          .where(
            and(
              eq(quizAssignment.isActive, true),
              inArray(quizAssignment.quizId, curriculumQuizIds)
            )
          )
      : []

  const quizMap = new Map<
    string,
    { quiz: typeof quiz.$inferSelect; dueDate: Date | null }
  >()
  for (const a of assignmentRows) {
    if (!quizMap.has(a.quizId)) {
      const [quizRow] = await drizzleDb
        .select()
        .from(quiz)
        .where(eq(quiz.id, a.quizId))
        .limit(1)
      if (quizRow) {
        quizMap.set(a.quizId, {
          quiz: quizRow,
          dueDate: a.dueDate,
        })
      }
    }
  }
  for (const a of curriculumAssignments) {
    if (!quizMap.has(a.quizId)) {
      const [quizRow] = await drizzleDb
        .select()
        .from(quiz)
        .where(eq(quiz.id, a.quizId))
        .limit(1)
      if (quizRow) {
        quizMap.set(a.quizId, {
          quiz: quizRow,
          dueDate: a.dueDate,
        })
      }
    }
  }

  const quizIds = Array.from(quizMap.keys())
  const attempts =
    quizIds.length > 0
      ? await drizzleDb
          .select()
          .from(quizAttempt)
          .where(
            and(
              eq(quizAttempt.studentId, studentId),
              inArray(quizAttempt.quizId, quizIds)
            )
          )
          .orderBy(desc(quizAttempt.completedAt))
      : []
  const attemptsByQuiz = new Map<string, typeof attempts>()
  for (const att of attempts) {
    const list = attemptsByQuiz.get(att.quizId) ?? []
    list.push(att)
    attemptsByQuiz.set(att.quizId, list)
  }

  const now = new Date()
  const quizzes: StudentQuiz[] = []

  for (const [quizId, data] of quizMap) {
    const quizRow = data.quiz
    const quizAttempts = attemptsByQuiz.get(quizId) ?? []
    const completedAttempts = quizAttempts.filter(
      (a) => a.status === 'graded' || a.status === 'submitted'
    )
    const attemptsMade = completedAttempts.length
    const bestAttempt = completedAttempts[0]

    let quizStatus: StudentQuiz['status'] = 'available'
    if (quizRow.startDate && new Date(quizRow.startDate) > now) {
      quizStatus = 'upcoming'
    } else if (quizRow.dueDate && new Date(quizRow.dueDate) < now) {
      quizStatus = attemptsMade > 0 ? 'completed' : 'overdue'
    } else if (attemptsMade >= quizRow.allowedAttempts) {
      quizStatus = 'completed'
    } else if (attemptsMade > 0) {
      quizStatus = 'available'
    }

    if (status === 'available' && quizStatus !== 'available' && quizStatus !== 'upcoming')
      continue
    if (status === 'completed' && quizStatus !== 'completed') continue

    const questions = quizRow.questions as unknown[]
    quizzes.push({
      id: quizRow.id,
      title: quizRow.title,
      description: quizRow.description,
      type: quizRow.type,
      timeLimit: quizRow.timeLimit ?? undefined,
      allowedAttempts: quizRow.allowedAttempts,
      totalQuestions: Array.isArray(questions) ? questions.length : 0,
      totalPoints: quizRow.totalPoints,
      dueDate: data.dueDate ?? quizRow.dueDate ?? undefined,
      startDate: quizRow.startDate ?? undefined,
      status: quizStatus,
      attemptsMade,
      bestScore: bestAttempt
        ? Math.round((bestAttempt.score / bestAttempt.maxScore) * 100)
        : undefined,
      canAttempt:
        quizStatus === 'available' && attemptsMade < quizRow.allowedAttempts,
    })
  }

  quizzes.sort((a, b) => {
    if (a.status === 'upcoming' && b.status !== 'upcoming') return -1
    if (a.status !== 'upcoming' && b.status === 'upcoming') return 1
    if (a.dueDate && b.dueDate)
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
    return 0
  })

  return NextResponse.json({ quizzes })
}, { role: 'STUDENT' })
