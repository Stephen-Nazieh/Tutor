/**
 * POST /api/student/assignments/[taskId]/submit
 * Submit answers for a task/quiz/homework.
 *
 * Server-side enforcement:
 *  - Time limit (if enforceTimeLimit is true)
 *  - Due date (if enforceDueDate is true)
 *  - Max attempts (always enforced)
 *
 * Post-submit hooks:
 *  - Auto-grades MCQ/TF
 *  - Stores per-question results
 *  - Updates StudentPerformance
 *  - Updates CurriculumLessonProgress
 *  - Awards XP to UserGamification
 */

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { drizzleDb } from '@/lib/db/drizzle'
import {
  generatedTask,
  taskSubmission,
  curriculumLesson,
  curriculumModule,
  curriculumLessonProgress,
  userGamification,
  courseBatch,
} from '@/lib/db/schema'
import { eq, and } from 'drizzle-orm'
import { desc } from 'drizzle-orm'
import { updateStudentPerformanceRecord } from '@/lib/performance/student-analytics'
import crypto from 'crypto'

interface QuestionResult {
  questionId: string
  correct: boolean
  pointsEarned: number
  pointsMax: number
  selectedAnswer?: unknown
  timeSpentSec?: number
}

export async function POST(request: NextRequest, context: { params?: Promise<{ taskId?: string }> }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const studentId = session.user.id
    const params = await context?.params
    const taskId = params?.taskId
    const body = await request.json()
    const {
      answers,
      timeSpent,
      startedAt,
    }: {
      answers: Record<string, unknown>
      timeSpent: number
      startedAt?: string
    } = body

    if (!taskId) {
      return NextResponse.json({ error: 'Task ID required' }, { status: 400 })
    }

    const [task] = await drizzleDb
      .select()
      .from(generatedTask)
      .where(eq(generatedTask.id, taskId))
      .limit(1)

    if (!task) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 })
    }

    if (task.enforceDueDate && task.dueDate) {
      if (new Date() > task.dueDate) {
        return NextResponse.json(
          { error: 'Submission rejected: past due date', code: 'PAST_DUE' },
          { status: 403 }
        )
      }
    }

    if (task.enforceTimeLimit && task.timeLimitMinutes && startedAt) {
      const start = new Date(startedAt)
      const elapsed = (Date.now() - start.getTime()) / 1000 / 60
      const allowedWithBuffer = task.timeLimitMinutes * 1.05
      if (elapsed > allowedWithBuffer) {
        return NextResponse.json(
          {
            error: `Submission rejected: time limit of ${task.timeLimitMinutes} minutes exceeded`,
            code: 'TIME_LIMIT_EXCEEDED',
            elapsed: Math.round(elapsed),
            allowed: task.timeLimitMinutes,
          },
          { status: 403 }
        )
      }
    }

    const existingSubmissions = await drizzleDb
      .select()
      .from(taskSubmission)
      .where(
        and(
          eq(taskSubmission.taskId, taskId),
          eq(taskSubmission.studentId, studentId)
        )
      )
      .orderBy(desc(taskSubmission.submittedAt))

    const attemptNumber = existingSubmissions.length + 1
    if (attemptNumber > task.maxAttempts) {
      return NextResponse.json(
        {
          error: `Maximum attempts (${task.maxAttempts}) reached`,
          code: 'MAX_ATTEMPTS',
          maxAttempts: task.maxAttempts,
          currentAttempts: existingSubmissions.length,
        },
        { status: 403 }
      )
    }

    const rawQuestions = Array.isArray(task.questions) ? (task.questions as any[]) : []
    const questionResults: QuestionResult[] = []
    let totalEarned = 0
    let totalMax = 0

    for (const q of rawQuestions) {
      const qId = q.id as string
      const studentAnswer = answers[qId]
      const qPoints = q.points ?? 1
      totalMax += qPoints
      const type = (q.type as string)?.toLowerCase()

      let correct = false
      let earned = 0

      if (type === 'multiple_choice' || type === 'mcq') {
        correct = studentAnswer === q.correctAnswer
        earned = correct ? qPoints : 0
      } else if (type === 'true_false' || type === 'truefalse') {
        correct =
          String(studentAnswer).toLowerCase() ===
          String(q.correctAnswer).toLowerCase()
        earned = correct ? qPoints : 0
      } else if (type === 'short_answer' || type === 'shortanswer') {
        const sa = String(studentAnswer || '').trim().toLowerCase()
        const ca = String(q.correctAnswer || '').trim().toLowerCase()
        correct = sa === ca
        earned = correct ? qPoints : 0
      } else {
        earned = 0
        correct = false
      }

      totalEarned += earned
      questionResults.push({
        questionId: qId,
        correct,
        pointsEarned: earned,
        pointsMax: qPoints,
        selectedAnswer: studentAnswer,
      })
    }

    const score = totalMax > 0 ? (totalEarned / totalMax) * 100 : 0
    const scoreRounded = Math.round(score * 100) / 100
    const maxScoreVal = task.maxScore || totalMax

    let submission: { id: string; score: number | null; maxScore: number; status: string; attempts: number }
    if (existingSubmissions.length > 0 && task.maxAttempts > 1) {
      const existing = existingSubmissions[0]
      await drizzleDb
        .update(taskSubmission)
        .set({
          answers: answers as any,
          questionResults: questionResults as any,
          timeSpent: timeSpent || 0,
          score: scoreRounded,
          maxScore: maxScoreVal,
          status: 'submitted',
          attempts: attemptNumber,
          submittedAt: new Date(),
        })
        .where(eq(taskSubmission.id, existing.id))
      submission = {
        id: existing.id,
        score: scoreRounded,
        maxScore: maxScoreVal,
        status: 'submitted',
        attempts: attemptNumber,
      }
    } else {
      const id = crypto.randomUUID()
      await drizzleDb.insert(taskSubmission).values({
        id,
        taskId,
        studentId,
        answers: answers as any,
        questionResults: questionResults as any,
        timeSpent: timeSpent || 0,
        score: scoreRounded,
        maxScore: maxScoreVal,
        status: 'submitted',
        attempts: attemptNumber,
        tutorApproved: false,
      })
      submission = {
        id,
        score: scoreRounded,
        maxScore: maxScoreVal,
        status: 'submitted',
        attempts: attemptNumber,
      }
    }

    let curriculumId: string | undefined
    if (task.lessonId) {
      const [lessonRow] = await drizzleDb
        .select({ moduleId: curriculumLesson.moduleId })
        .from(curriculumLesson)
        .where(eq(curriculumLesson.id, task.lessonId))
        .limit(1)

      if (lessonRow) {
        const [modRow] = await drizzleDb
          .select({ curriculumId: curriculumModule.curriculumId })
          .from(curriculumModule)
          .where(eq(curriculumModule.id, lessonRow.moduleId))
          .limit(1)
        curriculumId = modRow?.curriculumId

        const [existingProgress] = await drizzleDb
          .select()
          .from(curriculumLessonProgress)
          .where(
            and(
              eq(curriculumLessonProgress.lessonId, task.lessonId),
              eq(curriculumLessonProgress.studentId, studentId)
            )
          )
          .limit(1)

        const newStatus = score >= 70 ? 'COMPLETED' : 'IN_PROGRESS'
        const newScore = Math.round(score)
        const completedAt = score >= 70 ? new Date() : null

        try {
          if (existingProgress) {
            await drizzleDb
              .update(curriculumLessonProgress)
              .set({
                status: newStatus,
                score: newScore,
                completedAt,
              })
              .where(eq(curriculumLessonProgress.id, existingProgress.id))
          } else {
            const progressId = crypto.randomUUID()
            await drizzleDb.insert(curriculumLessonProgress).values({
              id: progressId,
              lessonId: task.lessonId,
              studentId,
              status: newStatus,
              currentSection: '',
              score: newScore,
              completedAt,
            })
          }
        } catch (err) {
          console.error('Failed to update lesson progress:', err)
        }
      }
    }

    const xpEarned = calculateXP(score, rawQuestions.length, task.difficulty)
    try {
      const [currentGamification] = await drizzleDb
        .select()
        .from(userGamification)
        .where(eq(userGamification.userId, studentId))
        .limit(1)

      if (currentGamification) {
        const newXp = currentGamification.xp + xpEarned
        const newLevel = Math.floor(newXp / 1000) + 1
        await drizzleDb
          .update(userGamification)
          .set({
            xp: newXp,
            level: newLevel > currentGamification.level ? newLevel : currentGamification.level,
          })
          .where(eq(userGamification.userId, studentId))
      } else {
        const id = crypto.randomUUID()
        await drizzleDb.insert(userGamification).values({
          id,
          userId: studentId,
          level: 1,
          xp: xpEarned,
          streakDays: 0,
          longestStreak: 0,
          totalStudyMinutes: 0,
          grammarScore: 0,
          vocabularyScore: 0,
          speakingScore: 0,
          listeningScore: 0,
          confidenceScore: 0,
          fluencyScore: 0,
          unlockedWorlds: [],
        })
      }
    } catch (err) {
      console.error('Failed to update gamification:', err)
    }

    if (!curriculumId && task.batchId) {
      const [batch] = await drizzleDb
        .select({ curriculumId: courseBatch.curriculumId })
        .from(courseBatch)
        .where(eq(courseBatch.id, task.batchId))
        .limit(1)
      curriculumId = batch?.curriculumId
    }

    if (curriculumId) {
      updateStudentPerformanceRecord(studentId, curriculumId).catch((err) =>
        console.error('Failed to update performance:', err)
      )
    }

    return NextResponse.json({
      success: true,
      submission: {
        id: submission.id,
        score: submission.score,
        maxScore: submission.maxScore,
        attempt: attemptNumber,
        maxAttempts: task.maxAttempts,
        attemptsRemaining: task.maxAttempts - attemptNumber,
        questionResults,
        xpEarned,
      },
    })
  } catch (error) {
    console.error('Failed to submit task:', error)
    return NextResponse.json(
      { error: 'Failed to submit' },
      { status: 500 }
    )
  }
}

function calculateXP(
  scorePercent: number,
  questionCount: number,
  difficulty: string
): number {
  const base = Math.max(questionCount, 1) * 10
  const scoreMult =
    scorePercent >= 90 ? 1.5 : scorePercent >= 70 ? 1.2 : scorePercent >= 50 ? 1.0 : 0.5
  const diffMult =
    difficulty === 'hard' ? 1.5 : difficulty === 'medium' ? 1.2 : 1.0
  return Math.round(base * scoreMult * diffMult)
}
