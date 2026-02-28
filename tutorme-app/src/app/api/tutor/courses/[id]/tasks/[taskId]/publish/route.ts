/**
 * POST /api/tutor/courses/[id]/tasks/[taskId]/publish
 * Publish a task and optionally assign it to students.
 *
 * Body:
 *   { assignTo?: 'all' | 'batch' | string[] }
 *   - 'all'   → assign to all students enrolled in the curriculum
 *   - 'batch' → assign to students enrolled in the task's batch
 *   - string[] → assign to specific student IDs
 */

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession, authOptions } from '@/lib/auth'
import { drizzleDb } from '@/lib/db/drizzle'
import { generatedTask, curriculumEnrollment, notification } from '@/lib/db/schema'
import { eq, and } from 'drizzle-orm'
import crypto from 'crypto'

function getIds(req: NextRequest): { courseId: string; taskId: string } {
    const parts = req.nextUrl.pathname.split('/')
    const coursesIdx = parts.indexOf('courses')
    const tasksIdx = parts.indexOf('tasks')
    return {
        courseId: parts[coursesIdx + 1],
        taskId: parts[tasksIdx + 1],
    }
}

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions, req)
    if (!session?.user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { courseId, taskId } = getIds(req)

    const [task] = await drizzleDb
        .select()
        .from(generatedTask)
        .where(and(eq(generatedTask.id, taskId), eq(generatedTask.tutorId, session.user.id)))
    if (!task) {
        return NextResponse.json({ error: 'Task not found' }, { status: 404 })
    }

    const body = await req.json().catch(() => ({}))
    const assignTo: 'all' | 'batch' | string[] = body.assignTo ?? 'all'

    let studentIds: string[] = []

    if (Array.isArray(assignTo)) {
        studentIds = assignTo
    } else if (assignTo === 'batch' && task.batchId) {
        const enrollments = await drizzleDb
            .select({ studentId: curriculumEnrollment.studentId })
            .from(curriculumEnrollment)
            .where(eq(curriculumEnrollment.batchId, task.batchId))
        studentIds = enrollments.map((e) => e.studentId)
    } else {
        const enrollments = await drizzleDb
            .select({ studentId: curriculumEnrollment.studentId })
            .from(curriculumEnrollment)
            .where(eq(curriculumEnrollment.curriculumId, courseId))
        studentIds = enrollments.map((e) => e.studentId)
    }

    const assignments: Record<string, unknown> = {}
    for (const sid of studentIds) {
        assignments[sid] = { questions: task.questions }
    }

    const [updated] = await drizzleDb
        .update(generatedTask)
        .set({
            status: 'assigned',
            assignments,
            assignedAt: new Date(),
        })
        .where(eq(generatedTask.id, taskId))
        .returning()

    if (!updated) {
        return NextResponse.json({ error: 'Task not found' }, { status: 404 })
    }

    if (studentIds.length > 0) {
        await drizzleDb.insert(notification).values(
            studentIds.map((sid) => ({
                id: crypto.randomUUID(),
                userId: sid,
                type: 'assignment',
                title: 'New Assignment',
                message: `You have a new assignment: "${task.title}"`,
                actionUrl: '/student/assignments',
                data: {
                    taskId: task.id,
                    taskTitle: task.title,
                    taskType: task.type,
                    dueDate: task.dueDate?.toISOString() ?? null,
                },
                read: false,
            }))
        )
    }

    return NextResponse.json({
        message: `Task published and assigned to ${studentIds.length} students`,
        task: {
            id: updated.id,
            status: updated.status,
            assignedStudentCount: studentIds.length,
        },
    })
}
