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
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'

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
    const session = await getServerSession(authOptions)
    if (!session?.user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { courseId, taskId } = getIds(req)

    // Verify ownership
    const task = await db.generatedTask.findFirst({
        where: { id: taskId, tutorId: session.user.id },
    })
    if (!task) {
        return NextResponse.json({ error: 'Task not found' }, { status: 404 })
    }

    const body = await req.json().catch(() => ({}))
    const assignTo: 'all' | 'batch' | string[] = body.assignTo ?? 'all'

    // Determine target student IDs
    let studentIds: string[] = []

    if (Array.isArray(assignTo)) {
        studentIds = assignTo
    } else if (assignTo === 'batch' && task.batchId) {
        const enrollments = await db.curriculumEnrollment.findMany({
            where: { batchId: task.batchId },
            select: { studentId: true },
        })
        studentIds = enrollments.map((e: any) => e.studentId)
    } else {
        // 'all' — everyone enrolled in the curriculum
        const enrollments = await db.curriculumEnrollment.findMany({
            where: { curriculumId: courseId },
            select: { studentId: true },
        })
        studentIds = enrollments.map((e: any) => e.studentId)
    }

    // Build assignments map — each student gets the same questions (uniform)
    const assignments: Record<string, unknown> = {}
    for (const sid of studentIds) {
        assignments[sid] = { questions: task.questions }
    }

    // Update task: set status, assignments, assignedAt
    const updated = await db.generatedTask.update({
        where: { id: taskId },
        data: {
            status: 'assigned',
            assignments,
            assignedAt: new Date(),
        },
    })

    // Create notifications for each assigned student
    if (studentIds.length > 0) {
        await db.notification.createMany({
            data: studentIds.map((sid) => ({
                userId: sid,
                type: 'assignment',
                title: 'New Assignment',
                message: `You have a new assignment: "${task.title}"`,
                actionUrl: `/student/assignments`,
                data: {
                    taskId: task.id,
                    taskTitle: task.title,
                    taskType: task.type,
                    dueDate: task.dueDate?.toISOString() ?? null,
                },
            })),
            skipDuplicates: true,
        })
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
