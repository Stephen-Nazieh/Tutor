/**
 * GET /api/tutor/courses/[id]/tasks/analytics
 *
 * Class-wide analytics overview: aggregate stats across all tasks for a course.
 * Shows per-task performance, overall class accuracy, and students needing attention.
 */

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'

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

    // Verify ownership
    const curriculum = await db.curriculum.findFirst({
        where: { id: curriculumId, creatorId: session.user.id },
        select: { id: true, name: true },
    })
    if (!curriculum) {
        return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    // Get lessons for this course
    const modules = await db.curriculumModule.findMany({
        where: { curriculumId },
        select: { lessons: { select: { id: true } } },
    })
    const lessonIds = modules.flatMap((m) => m.lessons.map((l) => l.id))

    // Get batches
    const batches = await db.courseBatch.findMany({
        where: { curriculumId },
        select: { id: true },
    })
    const batchIds = batches.map((b) => b.id)

    // Optional batch filter
    const batchFilter = req.nextUrl.searchParams.get('batchId')

    // Get all tasks for this course (optionally filtered by batch)
    const taskWhere: any = {
        tutorId: session.user.id,
        OR: [
            { lessonId: { in: lessonIds.length > 0 ? lessonIds : ['__none__'] } },
            { batchId: { in: batchIds.length > 0 ? batchIds : ['__none__'] } },
        ],
    }
    if (batchFilter) {
        taskWhere.batchId = batchFilter
    }
    const tasks = await db.generatedTask.findMany({
        where: taskWhere,
        orderBy: { createdAt: 'desc' },
    })

    if (tasks.length === 0) {
        return NextResponse.json({
            courseName: curriculum.name,
            totalTasks: 0,
            totalSubmissions: 0,
            classAverage: 0,
            tasks: [],
            studentsNeedingAttention: [],
        })
    }

    const taskIds = tasks.map((t) => t.id)

    // Get all submissions for these tasks
    const allSubmissions = await db.taskSubmission.findMany({
        where: { taskId: { in: taskIds } },
        include: {
            student: {
                select: {
                    id: true,
                    profile: { select: { name: true } },
                },
            },
        },
    })

    // Per-task stats
    const taskSummaries = tasks.map((t) => {
        const subs = allSubmissions.filter((s) => s.taskId === t.id)
        const scores = subs.map((s) => s.score ?? 0)
        const avg = scores.length > 0
            ? Math.round((scores.reduce((a, b) => a + b, 0) / scores.length) * 10) / 10
            : null
        const assigned = t.assignments ? Object.keys(t.assignments as object).length : 0

        // Per-question analysis
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
            if (stat.total >= 3 && (stat.correct / stat.total) < 0.4) {
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

    // Overall class average
    const allScores = allSubmissions.map((s) => s.score ?? 0)
    const classAverage = allScores.length > 0
        ? Math.round((allScores.reduce((a, b) => a + b, 0) / allScores.length) * 10) / 10
        : 0

    // Students needing attention: avg score < 50% across submitted tasks
    const studentScoreMap = new Map<string, { name: string; totalScore: number; count: number }>()
    for (const sub of allSubmissions) {
        const entry = studentScoreMap.get(sub.studentId) ?? {
            name: sub.student?.profile?.name ?? `Student ${sub.studentId.slice(-6)}`,
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
        courseName: curriculum.name,
        totalTasks: tasks.length,
        totalSubmissions: allSubmissions.length,
        classAverage,
        tasks: taskSummaries,
        studentsNeedingAttention,
    })
}
