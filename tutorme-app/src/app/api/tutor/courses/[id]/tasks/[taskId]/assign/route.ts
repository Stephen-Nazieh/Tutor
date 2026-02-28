/**
 * POST /api/tutor/courses/[id]/tasks/[taskId]/assign
 * Assign an already-published task to additional students.
 *
 * Body: { studentIds: string[] }
 */

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession, authOptions } from '@/lib/auth'
import { drizzleDb } from '@/lib/db/drizzle'
import { generatedTask } from '@/lib/db/schema'
import { eq, and } from 'drizzle-orm'

function getTaskId(req: NextRequest): string {
    const parts = req.nextUrl.pathname.split('/')
    const idx = parts.indexOf('tasks')
    return parts[idx + 1]
}

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions, req)
    if (!session?.user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const taskId = getTaskId(req)

    const [task] = await drizzleDb
        .select()
        .from(generatedTask)
        .where(and(eq(generatedTask.id, taskId), eq(generatedTask.tutorId, session.user.id)))
    if (!task) {
        return NextResponse.json({ error: 'Task not found' }, { status: 404 })
    }

    const body = await req.json()
    const newStudentIds: string[] = body.studentIds
    if (!Array.isArray(newStudentIds) || newStudentIds.length === 0) {
        return NextResponse.json({ error: 'studentIds array required' }, { status: 400 })
    }

    const existing = (task.assignments ?? {}) as Record<string, unknown>
    for (const sid of newStudentIds) {
        if (!existing[sid]) {
            existing[sid] = { questions: task.questions }
        }
    }

    const [updated] = await drizzleDb
        .update(generatedTask)
        .set({
            assignments: existing,
            status: task.status === 'draft' ? 'assigned' : task.status,
            assignedAt: task.assignedAt ?? new Date(),
        })
        .where(eq(generatedTask.id, taskId))
        .returning()

    if (!updated) {
        return NextResponse.json({ error: 'Task not found' }, { status: 404 })
    }

    return NextResponse.json({
        message: `Assigned to ${newStudentIds.length} additional students`,
        totalAssigned: Object.keys(existing).length,
        task: {
            id: updated.id,
            status: updated.status,
        },
    })
}
