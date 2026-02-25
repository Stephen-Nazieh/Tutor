/**
 * GET /api/student/assignments/[taskId]
 * Returns the full task with questions for the student to take.
 * Strips correct answers so the student can't cheat.
 */

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'

export async function GET(
    _request: NextRequest,
    { params }: { params: Promise<{ taskId: string }> }
) {
    try {
        const session = await getServerSession(authOptions)
        if (!session?.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const { taskId } = await params

        const task = await db.generatedTask.findUnique({
            where: { id: taskId },
        })

        if (!task) {
            return NextResponse.json({ error: 'Task not found' }, { status: 404 })
        }

        // Verify the student is assigned
        const assignments = task.assignments as Record<string, unknown> | null
        if (!assignments || !Object.keys(assignments).includes(session.user.id)) {
            return NextResponse.json({ error: 'Not assigned to you' }, { status: 403 })
        }

        // Strip correct answers from questions before sending to student
        const rawQuestions = Array.isArray(task.questions) ? (task.questions as any[]) : []
        const studentQuestions = rawQuestions.map((q: any) => ({
            id: q.id,
            type: q.type, // multiple_choice, short_answer, true_false, essay, mcq, truefalse, shortanswer
            question: q.question,
            options: q.options,
            points: q.points ?? q.rubric?.reduce((sum: number, r: any) => sum + (r.points || 0), 0) ?? 1,
            rubric: q.rubric ? q.rubric.map((r: any) => r.criteria) : undefined,
            hints: q.hints,
            // DO NOT include: correctAnswer, explanation
        }))

        // Check if student already submitted
        const existingSubmission = await db.taskSubmission.findUnique({
            where: {
                taskId_studentId: {
                    taskId,
                    studentId: session.user.id,
                },
            },
        })

        return NextResponse.json({
            task: {
                id: task.id,
                title: task.title,
                description: task.description,
                type: task.type,
                difficulty: task.difficulty,
                dueDate: task.dueDate?.toISOString() ?? null,
                maxScore: task.maxScore,
                questions: studentQuestions,
                documentSource: task.documentSource,
            },
            alreadySubmitted: !!existingSubmission,
            existingScore: existingSubmission?.score ?? null,
        })
    } catch (error) {
        console.error('Failed to fetch task:', error)
        return NextResponse.json(
            { error: 'Failed to fetch task' },
            { status: 500 }
        )
    }
}
