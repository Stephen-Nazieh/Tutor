/**
 * Task CRUD API for Course Builder
 *
 * GET  /api/tutor/courses/[id]/tasks         — List all tasks for a course
 * POST /api/tutor/courses/[id]/tasks         — Create a new task
 */

import { NextRequest, NextResponse } from 'next/server'
import { handleApiError } from '@/lib/api/middleware'
import { getServerSession, authOptions } from '@/lib/auth'
import { drizzleDb } from '@/lib/db/drizzle'
import {
  course,
  curriculumModule,
  courseLesson,
  courseBatch,
  generatedTask,
  taskSubmission,
} from '@/lib/db/schema'
import { eq, and, or, inArray, desc, sql } from 'drizzle-orm'
import crypto from 'crypto'

function getCourseId(req: NextRequest): string {
  const parts = req.nextUrl.pathname.split('/')
  const idx = parts.indexOf('courses')
  return parts[idx + 1]
}

// ---- GET — List all tasks for a course ----

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions, req)
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const courseId = getCourseId(req)

  const [courseRow] = await drizzleDb
    .select({ courseId: course.courseId })
    .from(course)
    .where(and(eq(course.courseId, courseId), eq(course.creatorId, session.user.id)))
  if (!courseRow) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  // Lessons now directly reference courses, not modules
  const lessons = await drizzleDb
    .select({ lessonId: courseLesson.lessonId })
    .from(courseLesson)
    .where(eq(courseLesson.courseId, courseId))
  const lessonIds = lessons.map(l => l.lessonId)

  const batches = await drizzleDb
    .select({ batchId: courseBatch.batchId })
    .from(courseBatch)
    .where(eq(courseBatch.courseId, courseId))
  const batchIds = batches.map(b => b.batchId)

  // Note: batchId doesn't exist on generatedTask - filtering by lesson only
  const taskFilter = lessonIds.length > 0 ? inArray(generatedTask.lessonId, lessonIds) : sql`1=0`

  const tasks = await drizzleDb
    .select()
    .from(generatedTask)
    .where(and(eq(generatedTask.tutorId, session.user.id), taskFilter))
    .orderBy(desc(generatedTask.createdAt))

  const taskIds = tasks.map(t => t.taskId)
  const submissionRows =
    taskIds.length > 0
      ? await drizzleDb
          .select({
            taskId: taskSubmission.taskId,
            count: sql<number>`count(*)::int`,
          })
          .from(taskSubmission)
          .where(inArray(taskSubmission.taskId, taskIds))
          .groupBy(taskSubmission.taskId)
      : []
  const submissionMap = new Map(submissionRows.map(s => [s.taskId, s.count]))

  const result = tasks.map(t => ({
    id: t.taskId,
    title: t.title,
    description: t.description,
    type: t.type,
    difficulty: t.difficulty,
    status: t.status,
    lessonId: t.lessonId,
    dueDate: t.dueDate?.toISOString() ?? null,
    maxScore: t.maxScore,
    questionCount: Array.isArray(t.questions) ? (t.questions as unknown[]).length : 0,
    assignmentCount: t.assignments ? Object.keys(t.assignments as object).length : 0,
    submissionCount: submissionMap.get(t.taskId) ?? 0,
    distributionMode: t.distributionMode,
    createdAt: t.createdAt.toISOString(),
    assignedAt: t.assignedAt?.toISOString() ?? null,
  }))

  return NextResponse.json({ tasks: result })
}

// ---- POST — Create a new task ----

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions, req)
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const courseId = getCourseId(req)

  const [courseRow] = await drizzleDb
    .select({ courseId: course.courseId })
    .from(course)
    .where(and(eq(course.courseId, courseId), eq(course.creatorId, session.user.id)))
  if (!courseRow) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  const body = await req.json()
  const {
    title,
    description,
    type = 'assignment',
    difficulty = 'medium',
    questions = [],
    lessonId,
    batchId,
    dueDate,
    maxScore = 100,
    distributionMode = 'uniform',
    status = 'draft',
  } = body

  if (!title) {
    return NextResponse.json({ error: 'Title is required' }, { status: 400 })
  }

  if (lessonId) {
    const [lesson] = await drizzleDb
      .select({ lessonId: courseLesson.lessonId })
      .from(courseLesson)
      .where(and(eq(courseLesson.lessonId, lessonId), eq(courseLesson.courseId, courseId)))
    if (!lesson) {
      return NextResponse.json({ error: 'Lesson not in this course' }, { status: 400 })
    }
  }

  // Note: batchId field doesn't exist on generatedTask
  // if (batchId) {
  //   const [batch] = await drizzleDb
  //     .select({ batchId: courseBatch.batchId })
  //     .from(courseBatch)
  //     .where(and(eq(courseBatch.batchId, batchId), eq(courseBatch.courseId, courseId)))
  //   if (!batch) {
  //     return NextResponse.json({ error: 'Batch not in this course' }, { status: 400 })
  //   }
  // }

  const [task] = await drizzleDb
    .insert(generatedTask)
    .values({
      taskId: crypto.randomUUID(),
      tutorId: session.user.id,
      title,
      description: description || '',
      type,
      difficulty,
      questions: questions as unknown[],
      distributionMode,
      assignments: {},
      status,
      lessonId: lessonId || null,
      // batchId field doesn't exist on generatedTask
      dueDate: dueDate ? new Date(dueDate) : null,
      maxScore,
      enforceTimeLimit: false,
      enforceDueDate: false,
      maxAttempts: 1,
    })
    .returning()

  if (!task) {
    return handleApiError(
      new Error('Failed to create task'),
      'Failed to create task',
      'api/tutor/courses/[id]/tasks/route.ts'
    )
  }

  return NextResponse.json({
    task: {
      id: task.taskId,
      title: task.title,
      type: task.type,
      status: task.status,
    },
    message: 'Task created',
  })
}
