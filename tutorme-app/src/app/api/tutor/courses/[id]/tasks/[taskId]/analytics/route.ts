/**
 * GET /api/tutor/courses/[id]/tasks/[taskId]/analytics
 *
 * Returns per-question performance stats across all student submissions.
 * Data powers the Task Analytics Dashboard.
 */

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'

function getTaskId(req: NextRequest): string {
    const parts = req.nextUrl.pathname.split('/')
    const idx = parts.indexOf('tasks')
    return parts[idx + 1]
}

interface QuestionResult {
    questionId: string
    correct: boolean
    pointsEarned: number
    pointsMax: number
    selectedAnswer?: unknown
    timeSpentSec?: number
}

export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const taskId = getTaskId(req)

    // Verify tutor owns this task
    const task = await db.generatedTask.findFirst({
        where: { id: taskId, tutorId: session.user.id },
    })
    if (!task) {
        return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    // Get all submissions for this task
    const submissions = await db.taskSubmission.findMany({
        where: { taskId },
        include: {
            student: {
                select: {
                    id: true,
                    profile: { select: { name: true } },
                },
            },
        },
        orderBy: { submittedAt: 'desc' },
    })

    // ---- Overall stats ----
    const totalStudents = submissions.length
    const scores = submissions.map((s) => s.score ?? 0)
    const avgScore = totalStudents > 0
        ? Math.round((scores.reduce((a, b) => a + b, 0) / totalStudents) * 10) / 10
        : 0
    const medianScore = totalStudents > 0
        ? (() => { const sorted = [...scores].sort((a, b) => a - b); const mid = Math.floor(sorted.length / 2); return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2 })()
        : 0
    const highestScore = totalStudents > 0 ? Math.max(...scores) : 0
    const lowestScore = totalStudents > 0 ? Math.min(...scores) : 0

    // Time stats
    const times = submissions.map((s) => s.timeSpent)
    const avgTime = totalStudents > 0
        ? Math.round(times.reduce((a, b) => a + b, 0) / totalStudents)
        : 0

    // Score distribution buckets
    const distribution = [
        { range: '0-20', count: 0 },
        { range: '21-40', count: 0 },
        { range: '41-60', count: 0 },
        { range: '61-80', count: 0 },
        { range: '81-100', count: 0 },
    ]
    for (const s of scores) {
        if (s <= 20) distribution[0].count++
        else if (s <= 40) distribution[1].count++
        else if (s <= 60) distribution[2].count++
        else if (s <= 80) distribution[3].count++
        else distribution[4].count++
    }

    // ---- Per-question stats ----
    const questions = Array.isArray(task.questions) ? (task.questions as any[]) : []
    const questionStatsMap = new Map<string, {
        questionId: string
        questionText: string
        questionType: string
        totalAttempts: number
        correctCount: number
        wrongCount: number
        avgPoints: number
        maxPoints: number
        commonWrongAnswers: Map<string, number>
        avgTimeSec: number
        timeSamples: number
    }>()

    // Initialize from task questions
    for (const q of questions) {
        questionStatsMap.set(q.id, {
            questionId: q.id,
            questionText: q.question ?? q.title ?? q.id,
            questionType: q.type ?? 'unknown',
            totalAttempts: 0,
            correctCount: 0,
            wrongCount: 0,
            avgPoints: 0,
            maxPoints: q.points ?? q.rubric?.reduce((s: number, r: any) => s + (r.points || 0), 0) ?? 1,
            commonWrongAnswers: new Map(),
            avgTimeSec: 0,
            timeSamples: 0,
        })
    }

    // Aggregate from submissions' questionResults
    for (const sub of submissions) {
        const qr = sub.questionResults as QuestionResult[] | null
        if (!Array.isArray(qr)) continue

        for (const r of qr) {
            let stat = questionStatsMap.get(r.questionId)
            if (!stat) {
                // Question not in original list — dynamically generated
                stat = {
                    questionId: r.questionId,
                    questionText: r.questionId,
                    questionType: 'unknown',
                    totalAttempts: 0,
                    correctCount: 0,
                    wrongCount: 0,
                    avgPoints: 0,
                    maxPoints: r.pointsMax,
                    commonWrongAnswers: new Map(),
                    avgTimeSec: 0,
                    timeSamples: 0,
                }
                questionStatsMap.set(r.questionId, stat)
            }

            stat.totalAttempts++
            if (r.correct) {
                stat.correctCount++
            } else {
                stat.wrongCount++
                if (r.selectedAnswer !== undefined && r.selectedAnswer !== null) {
                    const key = String(r.selectedAnswer).slice(0, 100)
                    stat.commonWrongAnswers.set(key, (stat.commonWrongAnswers.get(key) ?? 0) + 1)
                }
            }
            stat.avgPoints += r.pointsEarned
            if (r.timeSpentSec) {
                stat.avgTimeSec += r.timeSpentSec
                stat.timeSamples++
            }
        }
    }

    // Finalize stats
    const questionStats = [...questionStatsMap.values()].map((stat) => {
        const correctRate = stat.totalAttempts > 0
            ? Math.round((stat.correctCount / stat.totalAttempts) * 1000) / 10
            : 0

        // Get top 3 common wrong answers
        const topWrong = [...stat.commonWrongAnswers.entries()]
            .sort((a, b) => b[1] - a[1])
            .slice(0, 3)
            .map(([answer, count]) => ({ answer, count }))

        return {
            questionId: stat.questionId,
            questionText: stat.questionText,
            questionType: stat.questionType,
            totalAttempts: stat.totalAttempts,
            correctCount: stat.correctCount,
            wrongCount: stat.wrongCount,
            correctRate,
            avgPoints: stat.totalAttempts > 0
                ? Math.round((stat.avgPoints / stat.totalAttempts) * 10) / 10
                : 0,
            maxPoints: stat.maxPoints,
            avgTimeSec: stat.timeSamples > 0
                ? Math.round(stat.avgTimeSec / stat.timeSamples)
                : null,
            commonWrongAnswers: topWrong,
            // Flag if > 60% of students got this wrong — candidate for re-teaching
            needsReview: correctRate < 40 && stat.totalAttempts >= 3,
        }
    })

    // ---- Per-student scores ----
    const studentScores = submissions.map((s) => ({
        studentId: s.student.id,
        studentName: s.student.profile?.name ?? `Student ${s.student.id.slice(-6)}`,
        score: s.score ?? 0,
        maxScore: s.maxScore,
        timeSpent: s.timeSpent,
        submittedAt: s.submittedAt.toISOString(),
        status: s.status,
    }))

    // Questions needing review
    const questionsNeedingReview = questionStats.filter((q) => q.needsReview)

    return NextResponse.json({
        task: {
            id: task.id,
            title: task.title,
            type: task.type,
            difficulty: task.difficulty,
            maxScore: task.maxScore,
            dueDate: task.dueDate?.toISOString() ?? null,
            questionCount: questions.length,
        },
        overview: {
            totalSubmissions: totalStudents,
            averageScore: avgScore,
            medianScore,
            highestScore,
            lowestScore,
            averageTimeSeconds: avgTime,
            completionRate: task.assignments
                ? Math.round((totalStudents / Math.max(Object.keys(task.assignments as object).length, 1)) * 100)
                : 0,
        },
        scoreDistribution: distribution,
        questionStats,
        questionsNeedingReview,
        studentScores,
    })
}
