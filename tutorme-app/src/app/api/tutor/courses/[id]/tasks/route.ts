/**
 * Task CRUD API for Course Builder
 *
 * GET  /api/tutor/courses/[id]/tasks         — List all tasks for a course
 * POST /api/tutor/courses/[id]/tasks         — Create a new task
 */

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'

function getCourseId(req: NextRequest): string {
    const parts = req.nextUrl.pathname.split('/')
    const idx = parts.indexOf('courses')
    return parts[idx + 1]
}

// ---- GET — List all tasks for a course ----

export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const curriculumId = getCourseId(req)

    // Verify tutor owns this course
    const curriculum = await db.curriculum.findFirst({
        where: { id: curriculumId, creatorId: session.user.id },
        select: { id: true },
    })
    if (!curriculum) {
        return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    // Get all lessons for this curriculum so we can filter tasks
    const modules = await db.curriculumModule.findMany({
        where: { curriculumId },
        select: { lessons: { select: { id: true } } },
    })
    const lessonIds = modules.flatMap((m) => m.lessons.map((l) => l.id))

    // Get all batches for this curriculum
    const batches = await db.courseBatch.findMany({
        where: { curriculumId },
        select: { id: true },
    })
    const batchIds = batches.map((b) => b.id)

    // Fetch tasks by tutor that belong to this course (via lesson or batch)
    const tasks = await db.generatedTask.findMany({
        where: {
            tutorId: session.user.id,
            OR: [
                { lessonId: { in: lessonIds.length > 0 ? lessonIds : ['__none__'] } },
                { batchId: { in: batchIds.length > 0 ? batchIds : ['__none__'] } },
            ],
        },
        orderBy: { createdAt: 'desc' },
    })

    // Count submissions per task
    const taskIds = tasks.map((t) => t.id)
    const submissionCounts = await db.taskSubmission.groupBy({
        by: ['taskId'],
        where: { taskId: { in: taskIds } },
        _count: { id: true },
    })
    const submissionMap = new Map(submissionCounts.map((s) => [s.taskId, s._count.id]))

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
    const session = await getServerSession(authOptions)
    if (!session?.user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const curriculumId = getCourseId(req)

    // Verify tutor owns this course
    const curriculum = await db.curriculum.findFirst({
        where: { id: curriculumId, creatorId: session.user.id },
        select: { id: true },
    })
    if (!curriculum) {
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

    // Validate lessonId belongs to this course if provided
    if (lessonId) {
        const lesson = await db.curriculumLesson.findFirst({
            where: { id: lessonId, module: { curriculumId } },
        })
        if (!lesson) {
            return NextResponse.json({ error: 'Lesson not in this course' }, { status: 400 })
        }
    }

    // Validate batchId belongs to this course if provided
    if (batchId) {
        const batch = await db.courseBatch.findFirst({
            where: { id: batchId, curriculumId },
        })
        if (!batch) {
            return NextResponse.json({ error: 'Batch not in this course' }, { status: 400 })
        }
    }

    const task = await db.generatedTask.create({
        data: {
            tutorId: session.user.id,
            title,
            description: description || '',
            type,
            difficulty,
            questions: questions,
            distributionMode,
            assignments: {},
            status,
            lessonId: lessonId || null,
            batchId: batchId || null,
            dueDate: dueDate ? new Date(dueDate) : null,
            maxScore,
        },
    })

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
