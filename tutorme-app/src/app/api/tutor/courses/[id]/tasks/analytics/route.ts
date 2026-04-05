/**
 * GET /api/tutor/courses/[id]/tasks/analytics
 *
 * Class-wide analytics overview: aggregate stats across all tasks for a course.
 * Shows per-task performance, overall class accuracy, and students needing attention.
 */

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession, authOptions } from '@/lib/auth'
import { drizzleDb } from '@/lib/db/drizzle'
import {
  course,
  curriculumModule,
  courseLesson,
  courseBatch,
  generatedTask,
  taskSubmission,
  profile,
} from '@/lib/db/schema'
import { eq, and, or, inArray, desc } from 'drizzle-orm'
import { sql } from 'drizzle-orm'

function getCourseId(req: NextRequest): string {
  const parts = req.nextUrl.pathname.split('/')
  const idx = parts.indexOf('courses')
  return parts[idx + 1]
}

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions, req)
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const courseId = getCourseId(req)

  const [courseRow] = await drizzleDb
    .select({ courseId: course.courseId, name: course.name })
    .from(course)
    .where(and(eq(course.courseId, courseId), eq(course.creatorId, session.user.id)))
  if (!courseRow) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  // Lessons now directly reference courses
  const lessons = await drizzleDb
    .select({ lessonId: courseLesson.lessonId })
    .from(courseLesson)
    .where(eq(courseLesson.courseId, courseId))
  const lessonIds = lessons.map(l => l.lessonId)

  const batches = await drizzleDb
    .select({ batchId: courseBatch.batchId })
    .from(courseBatch)
    .where(eq(courseBatch.courseId, courseId))
  const batchIds = batches.map(b => b.batchId)

  const batchFilter = req.nextUrl.searchParams.get('batchId')

  // Note: batchId doesn't exist on generatedTask
  const taskWhere =
    lessonIds.length > 0
      ? inArray(generatedTask.lessonId, lessonIds)
      : sql`1=0`

  const taskWhereFull = and(eq(generatedTask.tutorId, session.user.id), taskWhere)

  const tasks = await drizzleDb
    .select()
    .from(generatedTask)
    .where(taskWhereFull)
    .orderBy(desc(generatedTask.createdAt))

  if (tasks.length === 0) {
    return NextResponse.json({
      courseName: courseRow.name,
      totalTasks: 0,
      totalSubmissions: 0,
      classAverage: 0,
      tasks: [],
      studentsNeedingAttention: [],
    })
  }

  const taskIds = tasks.map(t => t.taskId)

  const allSubmissions = await drizzleDb
    .select({
      submissionId: taskSubmission.submissionId,
      taskId: taskSubmission.taskId,
      studentId: taskSubmission.studentId,
      score: taskSubmission.score,
      questionResults: taskSubmission.questionResults,
      userId: profile.userId,
      name: profile.name,
    })
    .from(taskSubmission)
    .leftJoin(profile, eq(profile.userId, taskSubmission.studentId))
    .where(inArray(taskSubmission.taskId, taskIds))

  const taskSummaries = tasks.map(t => {
    const subs = allSubmissions.filter(s => s.taskId === t.taskId)
    const scores = subs.map(s => s.score ?? 0)
    const avg =
      scores.length > 0
        ? Math.round((scores.reduce((a, b) => a + b, 0) / scores.length) * 10) / 10
        : null
    const assigned = t.assignments ? Object.keys(t.assignments as object).length : 0

    let questionsNeedingReview = 0
    const questionAccuracy = new Map<string, { correct: number; total: number }>()
    for (const sub of subs) {
      const qr = sub.questionResults as Array<{ questionId: string; correct?: boolean }> | null
      if (!Array.isArray(qr)) continue
      for (const r of qr) {
        const stat = questionAccuracy.get(r.questionId) ?? { correct: 0, total: 0 }
        stat.total++
        if (r.correct) stat.correct++
        questionAccuracy.set(r.questionId, stat)
      }
    }
    for (const [, stat] of questionAccuracy) {
      if (stat.total >= 3 && stat.correct / stat.total < 0.4) {
        questionsNeedingReview++
      }
    }

    return {
      id: t.taskId,
      title: t.title,
      type: t.type,
      difficulty: t.difficulty,
      status: t.status,
      submissionCount: subs.length,
      assignedCount: assigned,
      completionRate: assigned > 0 ? Math.round((subs.length / assigned) * 100) : 0,
      averageScore: avg,
      questionCount: Array.isArray(t.questions) ? (t.questions as unknown[]).length : 0,
      questionsNeedingReview,
      createdAt: t.createdAt.toISOString(),
    }
  })

  const allScores = allSubmissions.map(s => s.score ?? 0)
  const classAverage =
    allScores.length > 0
      ? Math.round((allScores.reduce((a, b) => a + b, 0) / allScores.length) * 10) / 10
      : 0

  const studentScoreMap = new Map<string, { name: string; totalScore: number; count: number }>()
  for (const sub of allSubmissions) {
    const entry = studentScoreMap.get(sub.studentId) ?? {
      name: sub.name ?? `Student ${sub.studentId.slice(-6)}`,
      totalScore: 0,
      count: 0,
    }
    entry.totalScore += sub.score ?? 0
    entry.count++
    studentScoreMap.set(sub.studentId, entry)
  }

  const studentsNeedingAttention = [...studentScoreMap.entries()]
    .map(([id, data]) => ({
      studentId: id,
      name: data.name,
      averageScore: Math.round((data.totalScore / data.count) * 10) / 10,
      taskCount: data.count,
    }))
    .filter(s => s.averageScore < 50)
    .sort((a, b) => a.averageScore - b.averageScore)

  return NextResponse.json({
    courseName: courseRow.name,
    totalTasks: tasks.length,
    totalSubmissions: allSubmissions.length,
    classAverage,
    tasks: taskSummaries,
    studentsNeedingAttention,
  })
}
