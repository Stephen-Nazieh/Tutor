/**
 * POST /api/tutor/courses/[id]/tasks/publish-from-builder
 *
 * Takes builder items (tasks, homework, quizzes from the builder's lesson data)
 * and promotes them into real GeneratedTask rows for assignment.
 *
 * Body: {
 *   items: Array<{ ... }>
 *   assignTo?: 'all' | 'batch' | string[]
 *   batchId?: string
 * }
 */

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { drizzleDb } from '@/lib/db/drizzle'
import { curriculum, curriculumEnrollment, generatedTask, notification } from '@/lib/db/schema'
import { eq, and } from 'drizzle-orm'
import crypto from 'crypto'

function getCourseId(req: NextRequest): string {
    const parts = req.nextUrl.pathname.split('/')
    const idx = parts.indexOf('courses')
    return parts[idx + 1]
}

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const curriculumId = getCourseId(req)

    const [curriculumRow] = await drizzleDb
        .select({ id: curriculum.id })
        .from(curriculum)
        .where(and(eq(curriculum.id, curriculumId), eq(curriculum.creatorId, session.user.id)))
    if (!curriculumRow) {
        return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    const body = await req.json()
    const items: any[] = body.items
    const assignTo: 'all' | 'batch' | string[] | undefined = body.assignTo
    const batchId: string | undefined = body.batchId

    if (!Array.isArray(items) || items.length === 0) {
        return NextResponse.json({ error: 'items array required' }, { status: 400 })
    }

    let studentIds: string[] = []
    if (assignTo) {
        if (Array.isArray(assignTo)) {
            studentIds = assignTo
        } else if (assignTo === 'batch' && batchId) {
            const enrollments = await drizzleDb
                .select({ studentId: curriculumEnrollment.studentId })
                .from(curriculumEnrollment)
                .where(eq(curriculumEnrollment.batchId, batchId))
            studentIds = enrollments.map((e) => e.studentId)
        } else {
            const enrollments = await drizzleDb
                .select({ studentId: curriculumEnrollment.studentId })
                .from(curriculumEnrollment)
                .where(eq(curriculumEnrollment.curriculumId, curriculumId))
            studentIds = enrollments.map((e) => e.studentId)
        }
    }

    const createdTasks: { id: string; title: string; type: string }[] = []

    for (const item of items) {
        const questions = (item.questions ?? []).map((q: any, idx: number) => ({
            id: q.id || `q-${Date.now()}-${idx}`,
            type:
                q.type === 'mcq'
                    ? 'multiple_choice'
                    : q.type === 'truefalse'
                      ? 'true_false'
                      : q.type === 'shortanswer'
                        ? 'short_answer'
                        : q.type === 'essay'
                          ? 'essay'
                          : q.type,
            question: q.question,
            options: q.options,
            correctAnswer: q.correctAnswer,
            explanation: q.explanation,
            points: q.points ?? 1,
        }))

        const maxScore =
            questions.reduce((s: number, q: any) => s + (q.points ?? 1), 0) || item.points || 100
        const taskType =
            item.type === 'quiz' ? 'quiz' : item.type === 'homework' ? 'assignment' : 'assignment'

        const assignments: Record<string, unknown> = {}
        for (const sid of studentIds) {
            assignments[sid] = { questions }
        }

        const [task] = await drizzleDb
            .insert(generatedTask)
            .values({
                id: crypto.randomUUID(),
                tutorId: session.user.id,
                title: item.title || 'Untitled',
                description: item.description || '',
                type: taskType,
                difficulty: item.difficulty || 'medium',
                questions,
                distributionMode: 'uniform',
                assignments,
                status: studentIds.length > 0 ? 'assigned' : 'draft',
                assignedAt: studentIds.length > 0 ? new Date() : null,
                lessonId: item.lessonId || null,
                batchId: batchId || null,
                dueDate: item.dueDate ? new Date(item.dueDate) : null,
                maxScore,
                documentSource: typeof item.documentSource === 'string' ? item.documentSource : null,
                timeLimitMinutes: item.timeLimit || null,
                enforceTimeLimit: item.enforceTimeLimit ?? false,
                enforceDueDate: item.enforceDueDate ?? false,
                maxAttempts: item.maxAttempts ?? 1,
            })
            .returning()

        if (task) {
            createdTasks.push({ id: task.id, title: task.title, type: task.type })
        }
    }

    if (studentIds.length > 0 && createdTasks.length > 0) {
        const notifTitle =
            createdTasks.length === 1 ? 'New Assignment' : `${createdTasks.length} New Assignments`
        const notifMessage =
            createdTasks.length === 1
                ? `You have a new assignment: "${createdTasks[0].title}"`
                : `You have ${createdTasks.length} new assignments`
        await drizzleDb.insert(notification).values(
            studentIds.map((sid) => ({
                id: crypto.randomUUID(),
                userId: sid,
                type: 'assignment',
                title: notifTitle,
                message: notifMessage,
                actionUrl: '/student/assignments',
                data: { taskIds: createdTasks.map((t) => t.id) },
                read: false,
            }))
        )
    }

    return NextResponse.json({
        message: `${createdTasks.length} items published${studentIds.length > 0 ? ` and assigned to ${studentIds.length} students` : ''}`,
        tasks: createdTasks,
        assignedStudentCount: studentIds.length,
    })
}
