/**
 * Single-task operations
 *
 * GET    /api/tutor/courses/[id]/tasks/[taskId]  — Get full task with questions
 * PATCH  /api/tutor/courses/[id]/tasks/[taskId]  — Update task fields / questions
 * DELETE /api/tutor/courses/[id]/tasks/[taskId]  — Delete a task
 */

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession, authOptions } from '@/lib/auth'
import { drizzleDb } from '@/lib/db/drizzle'
import { generatedTask, taskSubmission, profile } from '@/lib/db/schema'
import { eq, and, desc } from 'drizzle-orm'

function getTaskId(req: NextRequest): string {
    const parts = req.nextUrl.pathname.split('/')
    const idx = parts.indexOf('tasks')
    return parts[idx + 1]
}

async function verifyTaskOwnership(taskId: string, userId: string) {
    const [task] = await drizzleDb
        .select()
        .from(generatedTask)
        .where(and(eq(generatedTask.id, taskId), eq(generatedTask.tutorId, userId)))
    return task ?? null
}

// ---- GET — Full task with questions ----

export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions, req)
    if (!session?.user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const taskId = getTaskId(req)
    const task = await verifyTaskOwnership(taskId, session.user.id)
    if (!task) {
        return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    const submissions = await drizzleDb
        .select({
            id: taskSubmission.id,
            studentId: taskSubmission.studentId,
            score: taskSubmission.score,
            maxScore: taskSubmission.maxScore,
            status: taskSubmission.status,
            submittedAt: taskSubmission.submittedAt,
            name: profile.name,
        })
        .from(taskSubmission)
        .leftJoin(profile, eq(profile.userId, taskSubmission.studentId))
        .where(eq(taskSubmission.taskId, taskId))
        .orderBy(desc(taskSubmission.submittedAt))

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
            studentName: s.name ?? 'Unknown',
            score: s.score,
            maxScore: s.maxScore,
            status: s.status,
            submittedAt: s.submittedAt.toISOString(),
        })),
    })
}

// ---- PATCH — Update task ----

export async function PATCH(req: NextRequest) {
    const session = await getServerSession(authOptions, req)
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

    const [task] = await drizzleDb
        .update(generatedTask)
        .set(updateData as Record<string, unknown>)
        .where(eq(generatedTask.id, taskId))
        .returning()

    if (!task) {
        return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

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
    const session = await getServerSession(authOptions, req)
    if (!session?.user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const taskId = getTaskId(req)
    const existing = await verifyTaskOwnership(taskId, session.user.id)
    if (!existing) {
        return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    await drizzleDb.delete(taskSubmission).where(eq(taskSubmission.taskId, taskId))
    await drizzleDb.delete(generatedTask).where(eq(generatedTask.id, taskId))

    return NextResponse.json({ message: 'Task deleted' })
}
