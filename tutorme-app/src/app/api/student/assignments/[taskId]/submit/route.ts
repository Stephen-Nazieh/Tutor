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
import { db } from '@/lib/db'
import { updateStudentPerformanceRecord } from '@/lib/performance/student-analytics'

interface QuestionResult {
    questionId: string
    correct: boolean
    pointsEarned: number
    pointsMax: number
    selectedAnswer?: unknown
    timeSpentSec?: number
}

export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ taskId: string }> }
) {
    try {
        const session = await getServerSession(authOptions)
        if (!session?.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const studentId = session.user.id
        const { taskId } = await params
        const body = await request.json()
        const {
            answers,
            timeSpent,
            startedAt,
        }: {
            answers: Record<string, unknown>
            timeSpent: number
            startedAt?: string // ISO timestamp when student started the task
        } = body

        // 1. Fetch the task
        const task = await db.generatedTask.findUnique({
            where: { id: taskId },
        })

        if (!task) {
            return NextResponse.json({ error: 'Task not found' }, { status: 404 })
        }

        // 2. Enforce due date
        if (task.enforceDueDate && task.dueDate) {
            if (new Date() > task.dueDate) {
                return NextResponse.json(
                    { error: 'Submission rejected: past due date', code: 'PAST_DUE' },
                    { status: 403 }
                )
            }
        }

        // 3. Enforce time limit
        if (task.enforceTimeLimit && task.timeLimitMinutes && startedAt) {
            const start = new Date(startedAt)
            const elapsed = (Date.now() - start.getTime()) / 1000 / 60 // in minutes
            const allowedWithBuffer = task.timeLimitMinutes * 1.05 // 5% grace
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

        // 4. Enforce max attempts
        const existingSubmissions = await db.taskSubmission.findMany({
            where: { taskId, studentId },
            orderBy: { submittedAt: 'desc' },
        })

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

        // 5. Auto-grade
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
                correct = String(studentAnswer).toLowerCase() === String(q.correctAnswer).toLowerCase()
                earned = correct ? qPoints : 0
            } else if (type === 'short_answer' || type === 'shortanswer') {
                const sa = String(studentAnswer || '').trim().toLowerCase()
                const ca = String(q.correctAnswer || '').trim().toLowerCase()
                correct = sa === ca
                earned = correct ? qPoints : 0
            } else {
                // essay — mark as 0 for now, needs tutor/AI review
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

        // 6. Save submission (upsert for retry support)
        let submission
        if (existingSubmissions.length > 0 && task.maxAttempts > 1) {
            // Update the existing submission with the latest attempt
            submission = await db.taskSubmission.update({
                where: { taskId_studentId: { taskId, studentId } },
                data: {
                    answers: answers as any,
                    questionResults: questionResults as any,
                    timeSpent: timeSpent || 0,
                    score: Math.round(score * 100) / 100,
                    maxScore: task.maxScore || totalMax,
                    status: 'submitted',
                    attempts: attemptNumber,
                    submittedAt: new Date(),
                },
            })
        } else {
            submission = await db.taskSubmission.create({
                data: {
                    taskId,
                    studentId,
                    answers: answers as any,
                    questionResults: questionResults as any,
                    timeSpent: timeSpent || 0,
                    score: Math.round(score * 100) / 100,
                    maxScore: task.maxScore || totalMax,
                    status: 'submitted',
                    attempts: attemptNumber,
                },
            })
        }

        // 7. Update CurriculumLessonProgress if lesson-linked
        let curriculumId: string | undefined
        if (task.lessonId) {
            const lessonData = await db.curriculumLesson.findUnique({
                where: { id: task.lessonId },
                select: { module: { select: { curriculumId: true } } },
            })
            curriculumId = lessonData?.module?.curriculumId

            // Update lesson progress
            try {
                await db.curriculumLessonProgress.upsert({
                    where: {
                        lessonId_studentId: {
                            lessonId: task.lessonId,
                            studentId,
                        },
                    },
                    create: {
                        lessonId: task.lessonId,
                        studentId,
                        status: score >= 70 ? 'COMPLETED' : 'IN_PROGRESS',
                        score: Math.round(score),
                        completedAt: score >= 70 ? new Date() : null,
                    },
                    update: {
                        status: score >= 70 ? 'COMPLETED' : 'IN_PROGRESS',
                        score: Math.round(score),
                        completedAt: score >= 70 ? new Date() : undefined,
                    },
                })
            } catch (err) {
                console.error('Failed to update lesson progress:', err)
            }
        }

        // 8. Award XP to UserGamification
        try {
            const xpEarned = calculateXP(score, rawQuestions.length, task.difficulty)
            await db.userGamification.upsert({
                where: { userId: studentId },
                create: {
                    userId: studentId,
                    xp: xpEarned,
                    level: 1,
                },
                update: {
                    xp: { increment: xpEarned },
                },
            })

            // Check for level-up (every 1000 XP = 1 level)
            const currentGamification = await db.userGamification.findUnique({
                where: { userId: studentId },
                select: { xp: true, level: true },
            })
            if (currentGamification) {
                const newLevel = Math.floor(currentGamification.xp / 1000) + 1
                if (newLevel > currentGamification.level) {
                    await db.userGamification.update({
                        where: { userId: studentId },
                        data: { level: newLevel },
                    })
                }
            }
        } catch (err) {
            console.error('Failed to update gamification:', err)
        }

        // 9. Update StudentPerformance in the background
        if (!curriculumId && task.lessonId) {
            // already fetched above
        } else if (!curriculumId) {
            // Try to find curriculumId from batch
            if (task.batchId) {
                const batch = await db.courseBatch.findUnique({
                    where: { id: task.batchId },
                    select: { curriculumId: true },
                })
                curriculumId = batch?.curriculumId
            }
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
                xpEarned: calculateXP(score, rawQuestions.length, task.difficulty),
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

/**
 * Calculate XP based on score, question count, and difficulty.
 * Base: 10 XP per question. Bonuses for high scores / hard difficulty.
 */
function calculateXP(scorePercent: number, questionCount: number, difficulty: string): number {
    const base = Math.max(questionCount, 1) * 10
    const scoreMult = scorePercent >= 90 ? 1.5 :
        scorePercent >= 70 ? 1.2 :
            scorePercent >= 50 ? 1.0 : 0.5
    const diffMult = difficulty === 'hard' ? 1.5 :
        difficulty === 'medium' ? 1.2 : 1.0
    return Math.round(base * scoreMult * diffMult)
}
