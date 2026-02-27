// @ts-nocheck
/**
 * Quiz Analytics API
 *
 * GET /api/tutor/quizzes/[id]/analytics - Get analytics for a quiz
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth, NotFoundError } from '@/lib/api/middleware'
import { drizzleDb } from '@/lib/db/drizzle'
import { quiz, quizAttempt, quizAssignment, user, profile } from '@/lib/db/schema'
import { eq, and, sql } from 'drizzle-orm'
import type { QuizAnalytics, QuestionAnalytics, StudentQuizPerformance, ScoreDistribution } from '@/types/quiz'

export const GET = withAuth(async (req: NextRequest, session, context) => {
  const params = await context.params
  const { id } = params

  const quizRows = await drizzleDb
    .select()
    .from(quiz)
    .where(and(eq(quiz.id, id), eq(quiz.tutorId, session.user.id)))
    .limit(1)

  const quizRow = quizRows[0]
  if (!quizRow) {
    throw new NotFoundError('Quiz not found')
  }

  const assignmentRows = await drizzleDb
    .select()
    .from(quizAssignment)
    .where(eq(quizAssignment.quizId, id))

  const attemptRows = await drizzleDb
    .select({
      attempt: quizAttempt,
      studentId: quizAttempt.studentId,
      profileName: profile.name,
    })
    .from(quizAttempt)
    .leftJoin(user, eq(quizAttempt.studentId, user.id))
    .leftJoin(profile, eq(profile.userId, user.id))
    .where(eq(quizAttempt.quizId, id))

  const totalStudentsResult = await drizzleDb
    .select({ count: sql<number>`count(*)::int` })
    .from(quizAssignment)
    .where(and(eq(quizAssignment.quizId, id), eq(quizAssignment.isActive, true)))
  const totalStudentsCount = totalStudentsResult[0]?.count ?? 0

  const attempts = attemptRows.map((r) => ({
    ...r.attempt,
    studentId: r.studentId,
    student: { id: r.studentId, profile: { name: r.profileName } },
  }))

  const completedAttempts = attempts.filter((a) => a.status === 'graded' || a.status === 'submitted')
  const totalAttempts = completedAttempts.length

  if (totalAttempts === 0) {
    return NextResponse.json({
      analytics: {
        quizId: id,
        quizTitle: quizRow.title,
        totalStudents: totalStudentsCount * 10,
        attemptsCount: 0,
        completionRate: 0,
        averageScore: 0,
        averageTimeSpent: 0,
        scoreDistribution: {
          '90-100': 0,
          '80-89': 0,
          '70-79': 0,
          '60-69': 0,
          'below-60': 0,
        },
        questionAnalytics: [],
        studentPerformance: [],
      },
    })
  }

  const scoreDistribution: ScoreDistribution = {
    '90-100': 0,
    '80-89': 0,
    '70-79': 0,
    '60-69': 0,
    'below-60': 0,
  }

  let totalScore = 0
  let totalTimeSpent = 0

  completedAttempts.forEach((attempt) => {
    const percentage = (attempt.score / attempt.maxScore) * 100
    totalScore += percentage
    totalTimeSpent += attempt.timeSpent
    if (percentage >= 90) scoreDistribution['90-100']++
    else if (percentage >= 80) scoreDistribution['80-89']++
    else if (percentage >= 70) scoreDistribution['70-79']++
    else if (percentage >= 60) scoreDistribution['60-69']++
    else scoreDistribution['below-60']++
  })

  const quizQuestions = (quizRow.questions as any[]) || []
  const questionStats: Record<
    string,
    {
      questionId: string
      questionText: string
      type: string
      points: number
      correctCount: number
      incorrectCount: number
      partialCount: number
      totalScore: number
      totalTimeSpent: number
      wrongAnswers: Record<string, number>
    }
  > = {}

  quizQuestions.forEach((q, idx) => {
    questionStats[q.id || `q-${idx}`] = {
      questionId: q.id || `q-${idx}`,
      questionText: q.question,
      type: q.type,
      points: q.points || 1,
      correctCount: 0,
      incorrectCount: 0,
      partialCount: 0,
      totalScore: 0,
      totalTimeSpent: 0,
      wrongAnswers: {},
    }
  })

  completedAttempts.forEach((attempt) => {
    const questionResults = (attempt.questionResults as any[]) || []
    questionResults.forEach((result: any) => {
      const stats = questionStats[result.questionId]
      if (!stats) return
      if (result.correct) stats.correctCount++
      else if (result.pointsEarned > 0) stats.partialCount++
      else stats.incorrectCount++
      stats.totalScore += result.pointsEarned || 0
      stats.totalTimeSpent += result.timeSpentSec || 0
      if (!result.correct && result.selectedAnswer && typeof result.selectedAnswer === 'string') {
        stats.wrongAnswers[result.selectedAnswer] = (stats.wrongAnswers[result.selectedAnswer] || 0) + 1
      }
    })
  })

  const questionAnalytics: QuestionAnalytics[] = Object.values(questionStats).map((stats) => {
    const totalResponses = stats.correctCount + stats.incorrectCount + stats.partialCount
    const avgScore = totalResponses > 0 ? stats.totalScore / totalResponses : 0
    const avgTimeSpent = totalResponses > 0 ? stats.totalTimeSpent / totalResponses : 0
    const difficultyIndex = totalResponses > 0 ? stats.correctCount / totalResponses : 0
    const commonWrongAnswers = Object.entries(stats.wrongAnswers)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([answer, count]) => ({ answer, count }))
    return {
      questionId: stats.questionId,
      questionText: stats.questionText.substring(0, 100) + (stats.questionText.length > 100 ? '...' : ''),
      type: stats.type,
      points: stats.points,
      correctCount: stats.correctCount,
      incorrectCount: stats.incorrectCount,
      partialCount: stats.partialCount,
      averageScore: Math.round(avgScore * 100) / 100,
      averageTimeSpent: Math.round(avgTimeSpent),
      difficultyIndex: Math.round(difficultyIndex * 100) / 100,
      discriminationIndex: 0,
      commonWrongAnswers: commonWrongAnswers.length > 0 ? commonWrongAnswers : undefined,
    }
  })

  const studentMap = new Map<
    string,
    {
      studentId: string
      studentName: string
      attempts: { score: number; percentage: number }[]
      lastAttemptAt: Date | null
      status: 'not_started' | 'in_progress' | 'completed'
    }
  >()

  completedAttempts.forEach((attempt) => {
    const studentId = attempt.studentId
    const existing = studentMap.get(studentId)
    const percentage = (attempt.score / attempt.maxScore) * 100
    const attemptWithStudent = attempt as typeof attempt & { student?: { profile?: { name?: string | null } } }
    const studentName = attemptWithStudent.student?.profile?.name || 'Unknown'
    if (existing) {
      existing.attempts.push({ score: attempt.score, percentage })
      if (attempt.completedAt && (!existing.lastAttemptAt || attempt.completedAt > existing.lastAttemptAt)) {
        existing.lastAttemptAt = attempt.completedAt
      }
      existing.status = 'completed'
    } else {
      studentMap.set(studentId, {
        studentId,
        studentName,
        attempts: [{ score: attempt.score, percentage }],
        lastAttemptAt: attempt.completedAt,
        status: 'completed',
      })
    }
  })

  const studentPerformance: StudentQuizPerformance[] = Array.from(studentMap.values()).map((s) => ({
    studentId: s.studentId,
    studentName: s.studentName,
    attemptCount: s.attempts.length,
    bestScore: Math.round(Math.max(...s.attempts.map((a) => a.percentage))),
    averageScore: Math.round(s.attempts.reduce((sum, a) => sum + a.percentage, 0) / s.attempts.length),
    lastAttemptAt: s.lastAttemptAt || undefined,
    status: s.status,
  }))

  studentPerformance.sort((a, b) => b.bestScore - a.bestScore)

  const analytics: QuizAnalytics = {
    quizId: id,
    quizTitle: quizRow.title,
    totalStudents: studentPerformance.length,
    attemptsCount: totalAttempts,
    completionRate: Math.round((totalAttempts / Math.max(totalStudentsCount, 1)) * 100),
    averageScore: Math.round(totalScore / totalAttempts),
    averageTimeSpent: Math.round(totalTimeSpent / totalAttempts),
    scoreDistribution,
    questionAnalytics,
    studentPerformance,
  }

  return NextResponse.json({ analytics })
}, { role: 'TUTOR' })
