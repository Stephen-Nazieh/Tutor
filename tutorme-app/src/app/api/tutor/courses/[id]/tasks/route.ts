/**
 * Task CRUD API for Course Builder
 *
 * GET  /api/tutor/courses/[id]/tasks         — List all tasks for a course
 * POST /api/tutor/courses/[id]/tasks         — Create a new task
 */

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession, authOptions } from '@/lib/auth'
import { drizzleDb } from '@/lib/db/drizzle'
import { curriculum, curriculumModule, curriculumLesson, courseBatch, generatedTask, taskSubmission } from '@/lib/db/schema'
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

    const curriculumId = getCourseId(req)

    const [curriculumRow] = await drizzleDb
        .select({ id: curriculum.id })
        .from(curriculum)
        .where(and(eq(curriculum.id, curriculumId), eq(curriculum.creatorId, session.user.id)))
    if (!curriculumRow) {
        return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    const modules = await drizzleDb
        .select({ id: curriculumModule.id })
        .from(curriculumModule)
        .where(eq(curriculumModule.curriculumId, curriculumId))
    const moduleIds = modules.map((m) => m.id)
    const lessons =
        moduleIds.length > 0
            ? await drizzleDb
                  .select({ id: curriculumLesson.id })
                  .from(curriculumLesson)
                  .where(inArray(curriculumLesson.moduleId, moduleIds))
            : []
    const lessonIds = lessons.map((l) => l.id)

    const batches = await drizzleDb
        .select({ id: courseBatch.id })
        .from(courseBatch)
        .where(eq(courseBatch.curriculumId, curriculumId))
    const batchIds = batches.map((b) => b.id)

    const taskFilter =
        lessonIds.length > 0 || batchIds.length > 0
            ? or(
                  lessonIds.length > 0 ? inArray(generatedTask.lessonId, lessonIds) : inArray(generatedTask.lessonId, ['__none__']),
                  batchIds.length > 0 ? inArray(generatedTask.batchId, batchIds) : inArray(generatedTask.batchId, ['__none__'])
              )
            : sql`1=0`

    const tasks = await drizzleDb
        .select()
        .from(generatedTask)
        .where(and(eq(generatedTask.tutorId, session.user.id), taskFilter))
        .orderBy(desc(generatedTask.createdAt))

    const taskIds = tasks.map((t) => t.id)
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
    const submissionMap = new Map(submissionRows.map((s) => [s.taskId, s.count]))

    const result = tasks.map((t) => ({
        id: t.id,
        title: t.title,
        description: t.description,
        type: t.type,
        difficulty: t.difficulty,
        status: t.status,
        lessonId: t.lessonId,
        batchId: t.batchId,
        dueDate: t.dueDate?.toISOString() ?? null,
        maxScore: t.maxScore,
        questionCount: Array.isArray(t.questions) ? (t.questions as unknown[]).length : 0,
        assignmentCount: t.assignments ? Object.keys(t.assignments as object).length : 0,
        submissionCount: submissionMap.get(t.id) ?? 0,
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

    const curriculumId = getCourseId(req)

    const [curriculumRow] = await drizzleDb
        .select({ id: curriculum.id })
        .from(curriculum)
        .where(and(eq(curriculum.id, curriculumId), eq(curriculum.creatorId, session.user.id)))
    if (!curriculumRow) {
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
            .select({ id: curriculumLesson.id })
            .from(curriculumLesson)
            .innerJoin(curriculumModule, eq(curriculumLesson.moduleId, curriculumModule.id))
            .where(and(eq(curriculumLesson.id, lessonId), eq(curriculumModule.curriculumId, curriculumId)))
        if (!lesson) {
            return NextResponse.json({ error: 'Lesson not in this course' }, { status: 400 })
        }
    }

    if (batchId) {
        const [batch] = await drizzleDb
            .select({ id: courseBatch.id })
            .from(courseBatch)
            .where(and(eq(courseBatch.id, batchId), eq(courseBatch.curriculumId, curriculumId)))
        if (!batch) {
            return NextResponse.json({ error: 'Batch not in this course' }, { status: 400 })
        }
    }

    const [task] = await drizzleDb
        .insert(generatedTask)
        .values({
            id: crypto.randomUUID(),
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
            batchId: batchId || null,
            dueDate: dueDate ? new Date(dueDate) : null,
            maxScore,
            enforceTimeLimit: false,
            enforceDueDate: false,
            maxAttempts: 1,
        })
        .returning()

    if (!task) {
        return NextResponse.json({ error: 'Failed to create task' }, { status: 500 })
    }

    return NextResponse.json({
        task: {
            id: task.id,
            title: task.title,
            type: task.type,
            status: task.status,
        },
        message: 'Task created',
    })
}
