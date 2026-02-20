/**
 * POST /api/tutor/courses/[id]/tasks/[taskId]/assign
 * Assign an already-published task to additional students.
 *
 * Body: { studentIds: string[] }
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

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const taskId = getTaskId(req)

    const task = await db.generatedTask.findFirst({
        where: { id: taskId, tutorId: session.user.id },
    })
    if (!task) {
        return NextResponse.json({ error: 'Task not found' }, { status: 404 })
    }

    const body = await req.json()
    const newStudentIds: string[] = body.studentIds
    if (!Array.isArray(newStudentIds) || newStudentIds.length === 0) {
        return NextResponse.json({ error: 'studentIds array required' }, { status: 400 })
    }

    // Merge into existing assignments
    const existing = (task.assignments ?? {}) as Record<string, unknown>
    for (const sid of newStudentIds) {
        if (!existing[sid]) {
            existing[sid] = { questions: task.questions }
        }
    }

    const updated = await db.generatedTask.update({
        where: { id: taskId },
        data: {
            assignments: existing,
            status: task.status === 'draft' ? 'assigned' : task.status,
            assignedAt: task.assignedAt ?? new Date(),
        },
    })

    return NextResponse.json({
        message: `Assigned to ${newStudentIds.length} additional students`,
        totalAssigned: Object.keys(existing).length,
        task: {
            id: updated.id,
            status: updated.status,
        },
    })
}
