/**
 * GET /api/student/assignments
 * Returns all task assignments for the current student, including quizzes, homework, and tasks.
 */

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession, authOptions } from '@/lib/auth'
import { drizzleDb } from '@/lib/db/drizzle'
import { generatedTask, taskSubmission } from '@/lib/db/schema'
import { inArray, desc, eq, and } from 'drizzle-orm'

export async function GET(_request: NextRequest) {
  try {
    const session = await getServerSession(authOptions, _request)
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const studentId = session.user.id

    const generatedTasks = await drizzleDb
      .select()
      .from(generatedTask)
      .where(inArray(generatedTask.status, ['assigned', 'completed']))
      .orderBy(desc(generatedTask.createdAt))
      .limit(50)

    const studentTasks = generatedTasks.filter((task) => {
      const assignments = task.assignments as Record<string, unknown> | null
      if (!assignments) return false
      return Object.keys(assignments).includes(studentId)
    })

    const taskIds = studentTasks.map((t) => t.id)
    const submissions =
      taskIds.length > 0
        ? await drizzleDb
            .select()
            .from(taskSubmission)
            .where(
              and(
                eq(taskSubmission.studentId, studentId),
                inArray(taskSubmission.taskId, taskIds)
              )
            )
        : []
    const submissionMap = new Map(submissions.map((s) => [s.taskId, s]))

    const assignments = studentTasks.map((task) => {
      const submission = submissionMap.get(task.id)
      const isOverdue =
        task.dueDate &&
        new Date(task.dueDate) < new Date() &&
        !submission
      return {
        id: task.id,
        title: task.title,
        description: task.description,
        type: task.type,
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
        questionCount: Array.isArray(task.questions)
          ? (task.questions as unknown[]).length
          : 0,
        lessonId: task.lessonId,
        batchId: task.batchId,
        documentSource: task.documentSource,
      }
    })

    const pending = assignments.filter((a) => a.status === 'pending').length
    const submitted = assignments.filter((a) => a.status === 'submitted').length
    const overdue = assignments.filter((a) => a.status === 'overdue').length

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
