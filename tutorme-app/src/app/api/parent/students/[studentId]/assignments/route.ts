/**
 * GET /api/parent/students/[studentId]/assignments
 * Returns assignments for a student (parent must own this student via family account)
 * Includes: assignments, submissions, progress, AI grading status, teacher feedback
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/lib/api/middleware'
import { getFamilyAccountForParent } from '@/lib/api/parent-helpers'
import { db } from '@/lib/db'

export const GET = withAuth(
  async (req: NextRequest, session, context) => {
    const params = await context?.params ?? {}
    const studentId = typeof params.studentId === 'string' ? params.studentId : Array.isArray(params.studentId) ? params.studentId[0] : null
    if (!studentId) {
      return NextResponse.json({ error: 'Student ID required' }, { status: 400 })
    }

    const family = await getFamilyAccountForParent(session)
    if (!family) {
      return NextResponse.json({ error: '未找到家庭账户' }, { status: 404 })
    }

    if (!family.studentIds.includes(studentId)) {
      return NextResponse.json(
        { error: '无权查看该学生的作业' },
        { status: 403 }
      )
    }

    // 1. Get GeneratedTask assignments where student is included
    const generatedTasks = await db.generatedTask.findMany({
      where: {
        status: { in: ['assigned', 'completed', 'draft'] },
      },
      orderBy: { createdAt: 'desc' },
      take: 100,
      include: {
        tutor: {
          select: { id: true, profile: { select: { name: true } } },
        },
        lesson: {
          select: { id: true, title: true, module: { select: { curriculum: { select: { name: true } } } } },
        },
      },
    })

    const studentTasks = generatedTasks.filter((task: any) => {
      const assignments = task.assignments as Record<string, unknown> | null
      if (!assignments) return false
      return Object.keys(assignments).includes(studentId)
    })

    const taskIds = studentTasks.map((t: any) => t.id)

    // 2. Get submissions with feedback workflow
    const [submissions, feedbackWorkflows] = await Promise.all([
      db.taskSubmission.findMany({
        where: {
          studentId,
          taskId: { in: taskIds },
        },
      }),
      db.feedbackWorkflow.findMany({
        where: {
          studentId,
          submission: {
            taskId: { in: taskIds },
          },
        },
        include: {
          submission: true,
        },
      }),
    ])

    const submissionMap = new Map(submissions.map((s: any) => [s.taskId, s]))
    const feedbackBySubmissionId = new Map(
      feedbackWorkflows.map((fw: any) => [fw.submissionId, fw])
    )

    const assignments = studentTasks.map((task: any) => {
      const submission = submissionMap.get(task.id) as any
      const isOverdue =
        task.dueDate && new Date(task.dueDate) < new Date() && !submission
      const status = submission
        ? 'submitted'
        : isOverdue
          ? 'overdue'
          : 'pending'

      const feedback = submission
        ? feedbackBySubmissionId.get(submission.id) as any
        : null

      return {
        id: task.id,
        title: task.title,
        description: task.description,
        type: task.type,
        difficulty: task.difficulty,
        dueDate: task.dueDate?.toISOString() ?? null,
        assignedAt: task.assignedAt?.toISOString() ?? null,
        maxScore: task.maxScore,
        status,
        score: submission?.score ?? null,
        submittedAt: submission?.submittedAt?.toISOString() ?? null,
        gradedAt: submission?.gradedAt?.toISOString() ?? null,
        questionCount: Array.isArray(task.questions)
          ? (task.questions as unknown[]).length
          : 0,
        lessonId: task.lessonId,
        lessonTitle: task.lesson?.title ?? null,
        curriculumName: task.lesson?.module?.curriculum?.name ?? null,
        tutorName: task.tutor?.profile?.name ?? null,
        timeSpent: submission?.timeSpent ?? null,
        attempts: submission?.attempts ?? 0,
        maxAttempts: task.maxAttempts,
        // AI grading
        aiGraded: !!feedback,
        aiScore: feedback?.aiScore ?? null,
        aiComments: feedback?.aiComments ?? null,
        aiStrengths: (feedback?.aiStrengths as string[]) ?? [],
        aiImprovements: (feedback?.aiImprovements as string[]) ?? [],
        // Teacher feedback
        tutorFeedback: submission?.tutorFeedback ?? feedback?.modifiedComments ?? null,
        tutorApproved: submission?.tutorApproved ?? feedback?.approvedAt != null,
      }
    })

    const pending = assignments.filter((a: any) => a.status === 'pending').length
    const submitted = assignments.filter((a: any) => a.status === 'submitted').length
    const overdue = assignments.filter((a: any) => a.status === 'overdue').length

    return NextResponse.json({
      success: true,
      assignments,
      stats: { pending, submitted, overdue, total: assignments.length },
    })
  },
  { role: 'PARENT' }
)
