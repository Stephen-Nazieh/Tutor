/**
 * GET /api/student/assignments
 * Returns all task assignments for the current student, including quizzes, homework, and tasks.
 * Also returns quiz data from QuizAttempt so students can re-take quizzes.
 */

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'

export async function GET(_request: NextRequest) {
    try {
        const session = await getServerSession(authOptions)
        if (!session?.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const studentId = session.user.id

        // 1. Get GeneratedTask assignments where student is included
        const generatedTasks = await db.generatedTask.findMany({
            where: {
                status: { in: ['assigned', 'completed'] },
            },
            orderBy: { createdAt: 'desc' },
            take: 50,
        })

        // Filter to tasks that include this student in assignments JSON
        const studentTasks = generatedTasks.filter((task: any) => {
            const assignments = task.assignments as Record<string, unknown> | null
            if (!assignments) return false
            return Object.keys(assignments).includes(studentId)
        })

        // 2. Get existing submissions for these tasks
        const taskIds = studentTasks.map((t: any) => t.id)
        const submissions = await db.taskSubmission.findMany({
            where: {
                studentId,
                taskId: { in: taskIds },
            },
        })

        const submissionMap = new Map(submissions.map((s: any) => [s.taskId, s]))

        // 3. Build assignment items
        const assignments = studentTasks.map((task: any) => {
            const submission = submissionMap.get(task.id) as any
            const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && !submission
            return {
                id: task.id,
                title: task.title,
                description: task.description,
                type: task.type, // quiz, assignment, practice, assessment, project
                difficulty: task.difficulty,
                dueDate: task.dueDate?.toISOString() ?? null,
                maxScore: task.maxScore,
                status: submission
                    ? 'submitted'
                    : isOverdue
                        ? 'overdue'
                        : 'pending',
                score: submission?.score ?? null,
                submittedAt: submission?.submittedAt?.toISOString() ?? null,
                // Include question count from the questions JSON
                questionCount: Array.isArray(task.questions) ? (task.questions as unknown[]).length : 0,
                lessonId: task.lessonId,
                batchId: task.batchId,
                documentSource: task.documentSource,
            }
        })

        // 4. Summary stats
        const pending = assignments.filter((a: any) => a.status === 'pending').length
        const submitted = assignments.filter((a: any) => a.status === 'submitted').length
        const overdue = assignments.filter((a: any) => a.status === 'overdue').length

        return NextResponse.json({
            assignments,
            stats: { pending, submitted, overdue, total: assignments.length },
        })
    } catch (error) {
        console.error('Failed to fetch student assignments:', error)
        return NextResponse.json(
            { error: 'Failed to fetch assignments' },
            { status: 500 }
        )
    }
}
