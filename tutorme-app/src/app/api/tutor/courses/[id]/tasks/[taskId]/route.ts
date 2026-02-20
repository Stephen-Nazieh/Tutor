/**
 * Single-task operations
 *
 * GET    /api/tutor/courses/[id]/tasks/[taskId]  — Get full task with questions
 * PATCH  /api/tutor/courses/[id]/tasks/[taskId]  — Update task fields / questions
 * DELETE /api/tutor/courses/[id]/tasks/[taskId]  — Delete a task
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

async function verifyTaskOwnership(taskId: string, userId: string) {
    return db.generatedTask.findFirst({
        where: { id: taskId, tutorId: userId },
    })
}

// ---- GET — Full task with questions ----

export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const taskId = getTaskId(req)
    const task = await verifyTaskOwnership(taskId, session.user.id)
    if (!task) {
        return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    // Get submission stats
    const submissions = await db.taskSubmission.findMany({
        where: { taskId },
        select: {
            id: true,
            studentId: true,
            score: true,
            maxScore: true,
            status: true,
            submittedAt: true,
            student: {
                select: {
                    profile: { select: { name: true } },
                },
            },
        },
        orderBy: { submittedAt: 'desc' },
    })

    return NextResponse.json({
        task: {
            id: task.id,
            title: task.title,
            description: task.description,
            type: task.type,
            difficulty: task.difficulty,
            questions: task.questions,
            distributionMode: task.distributionMode,
            assignments: task.assignments,
            status: task.status,
            lessonId: task.lessonId,
            batchId: task.batchId,
            dueDate: task.dueDate?.toISOString() ?? null,
            maxScore: task.maxScore,
            documentSource: task.documentSource,
            createdAt: task.createdAt.toISOString(),
            assignedAt: task.assignedAt?.toISOString() ?? null,
        },
        submissions: submissions.map((s) => ({
            id: s.id,
            studentId: s.studentId,
            studentName: s.student?.profile?.name ?? 'Unknown',
            score: s.score,
            maxScore: s.maxScore,
            status: s.status,
            submittedAt: s.submittedAt.toISOString(),
        })),
    })
}

// ---- PATCH — Update task ----

export async function PATCH(req: NextRequest) {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const taskId = getTaskId(req)
    const existing = await verifyTaskOwnership(taskId, session.user.id)
    if (!existing) {
        return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    const body = await req.json()
    const updateData: Record<string, unknown> = {}

    // Only update provided fields
    if (body.title !== undefined) updateData.title = body.title
    if (body.description !== undefined) updateData.description = body.description
    if (body.type !== undefined) updateData.type = body.type
    if (body.difficulty !== undefined) updateData.difficulty = body.difficulty
    if (body.questions !== undefined) updateData.questions = body.questions
    if (body.distributionMode !== undefined) updateData.distributionMode = body.distributionMode
    if (body.status !== undefined) updateData.status = body.status
    if (body.lessonId !== undefined) updateData.lessonId = body.lessonId || null
    if (body.batchId !== undefined) updateData.batchId = body.batchId || null
    if (body.maxScore !== undefined) updateData.maxScore = body.maxScore
    if (body.dueDate !== undefined) {
        updateData.dueDate = body.dueDate ? new Date(body.dueDate) : null
    }

    const task = await db.generatedTask.update({
        where: { id: taskId },
        data: updateData,
    })

    return NextResponse.json({
        task: {
            id: task.id,
            title: task.title,
            status: task.status,
        },
        message: 'Task updated',
    })
}

// ---- DELETE — Remove task ----

export async function DELETE(req: NextRequest) {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const taskId = getTaskId(req)
    const existing = await verifyTaskOwnership(taskId, session.user.id)
    if (!existing) {
        return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    // Delete associated submissions first (cascade isn't on the schema for GenTask→Submission)
    await db.taskSubmission.deleteMany({ where: { taskId } })
    await db.generatedTask.delete({ where: { id: taskId } })

    return NextResponse.json({ message: 'Task deleted' })
}
