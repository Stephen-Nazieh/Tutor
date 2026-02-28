/**
 * GET /api/parent/students/[studentId]/assignments
 * Returns assignments for a student (parent must own this student via family account)
 * Includes: assignments, submissions, progress, AI grading status, teacher feedback
 */

import { NextRequest, NextResponse } from 'next/server'
import { eq, and, sql, inArray, desc } from 'drizzle-orm'
import { withAuth } from '@/lib/api/middleware'
import { getParamAsync } from '@/lib/api/params'
import { getFamilyAccountForParent } from '@/lib/api/parent-helpers'
import { drizzleDb } from '@/lib/db/drizzle'
import { generatedTask, taskSubmission, feedbackWorkflow } from '@/lib/db/schema'

export const GET = withAuth(
  async (req: NextRequest, session, context) => {
    const studentId = await getParamAsync(context?.params, 'studentId')
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
    // Using jsonb key exists operator (?) to find tasks where studentId is a key in assignments object
    const tasksResult = await drizzleDb.query.generatedTask.findMany({
      where: and(
        inArray(generatedTask.status, ['assigned', 'completed', 'draft']),
        sql`${generatedTask.assignments} ?? ${studentId}`
      ),
      orderBy: [desc(generatedTask.createdAt)],
      limit: 100,
      with: {
        tutor: {
          with: { profile: { columns: { name: true } } },
          columns: { id: true }
        },
        lesson: {
          with: {
            module: {
              with: {
                curriculum: { columns: { name: true } }
              }
            }
          },
          columns: { id: true, title: true }
        }
      }
    })

    const taskIds = tasksResult.map(t => t.id)

    // 2. Get submissions and feedback workflows
    const [submissions, workflows] = await Promise.all([
      taskIds.length > 0
        ? drizzleDb.query.taskSubmission.findMany({
          where: and(
            eq(taskSubmission.studentId, studentId),
            inArray(taskSubmission.taskId, taskIds)
          )
        })
        : Promise.resolve([]),
      taskIds.length > 0
        ? drizzleDb.query.feedbackWorkflow.findMany({
          where: eq(feedbackWorkflow.studentId, studentId),
          with: {
            submission: {
              columns: { taskId: true }
            }
          }
        })
        : Promise.resolve([])
    ])

    // Filter workflows in JS to those belonging to our taskIds since Drizzle nested where on 'one' relation is limited
    const relevantWorkflows = workflows.filter(wf => taskIds.includes(wf.submission?.taskId as string))

    const submissionMap = new Map(submissions.map(s => [s.taskId, s]))
    const feedbackBySubmissionId = new Map(relevantWorkflows.map(fw => [fw.submissionId, fw]))

    const formattedAssignments = tasksResult.map((task: any) => {
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

    const pending = formattedAssignments.filter((a: any) => a.status === 'pending').length
    const submitted = formattedAssignments.filter((a: any) => a.status === 'submitted').length
    const overdue = formattedAssignments.filter((a: any) => a.status === 'overdue').length

    return NextResponse.json({
      success: true,
      assignments: formattedAssignments,
      stats: { pending, submitted, overdue, total: formattedAssignments.length },
    })
  },
  { role: 'PARENT' }
)
