/**
 * GET /api/tutor/courses/[id]/tasks/analytics
 *
 * Class-wide analytics overview: aggregate stats across all tasks for a course.
 * Shows per-task performance, overall class accuracy, and students needing attention.
 */

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { drizzleDb } from '@/lib/db/drizzle'
import {
  curriculum,
  curriculumModule,
  curriculumLesson,
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
    const session = await getServerSession(authOptions)
    if (!session?.user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const curriculumId = getCourseId(req)

    const [curriculumRow] = await drizzleDb
        .select({ id: curriculum.id, name: curriculum.name })
        .from(curriculum)
        .where(and(eq(curriculum.id, curriculumId), eq(curriculum.creatorId, session.user.id)))
    if (!curriculumRow) {
        return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    const modules = await drizzleDb
        .select({ id: curriculumModule.id })
        .from(curriculumModule)
        .where(eq(curriculumModule.curriculumId, curriculumId))
    const moduleIds = modules.map((m) => m.id)
    const lessons =
        moduleIds.length > 0
            ? await drizzleDb
                  .select({ id: curriculumLesson.id })
                  .from(curriculumLesson)
                  .where(inArray(curriculumLesson.moduleId, moduleIds))
            : []
    const lessonIds = lessons.map((l) => l.id)

    const batches = await drizzleDb
        .select({ id: courseBatch.id })
        .from(courseBatch)
        .where(eq(courseBatch.curriculumId, curriculumId))
    const batchIds = batches.map((b) => b.id)

    const batchFilter = req.nextUrl.searchParams.get('batchId')

    const taskWhere =
        lessonIds.length > 0 || batchIds.length > 0
            ? or(
                  lessonIds.length > 0 ? inArray(generatedTask.lessonId, lessonIds) : inArray(generatedTask.lessonId, ['__none__']),
                  batchIds.length > 0 ? inArray(generatedTask.batchId, batchIds) : inArray(generatedTask.batchId, ['__none__'])
              )
            : sql`1=0`

    const taskWhereFull = batchFilter
        ? and(eq(generatedTask.tutorId, session.user.id), eq(generatedTask.batchId, batchFilter), taskWhere)
        : and(eq(generatedTask.tutorId, session.user.id), taskWhere)

    const tasks = await drizzleDb
        .select()
        .from(generatedTask)
        .where(taskWhereFull)
        .orderBy(desc(generatedTask.createdAt))

    if (tasks.length === 0) {
        return NextResponse.json({
            courseName: curriculumRow.name,
            totalTasks: 0,
            totalSubmissions: 0,
            classAverage: 0,
            tasks: [],
            studentsNeedingAttention: [],
        })
    }

    const taskIds = tasks.map((t) => t.id)

    const allSubmissions = await drizzleDb
        .select({
            id: taskSubmission.id,
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

    const taskSummaries = tasks.map((t) => {
        const subs = allSubmissions.filter((s) => s.taskId === t.id)
        const scores = subs.map((s) => s.score ?? 0)
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
            id: t.id,
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

    const allScores = allSubmissions.map((s) => s.score ?? 0)
    const classAverage =
        allScores.length > 0
            ? Math.round((allScores.reduce((a, b) => a + b, 0) / allScores.length) * 10) / 10
            : 0

    const studentScoreMap = new Map<
        string,
        { name: string; totalScore: number; count: number }
    >()
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
        .filter((s) => s.averageScore < 50)
        .sort((a, b) => a.averageScore - b.averageScore)

    return NextResponse.json({
        courseName: curriculumRow.name,
        totalTasks: tasks.length,
        totalSubmissions: allSubmissions.length,
        classAverage,
        tasks: taskSummaries,
        studentsNeedingAttention,
    })
}
