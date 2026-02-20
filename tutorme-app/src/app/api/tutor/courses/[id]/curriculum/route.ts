/**
 * GET  /api/tutor/courses/[id]/curriculum  — Load the full builder tree
 * PUT  /api/tutor/courses/[id]/curriculum  — Save (upsert) the full builder tree
 *
 * The builder tree shape is:
 *   modules: Module[]  (each module has lessons[], moduleQuizzes[], etc.)
 *
 * We persist structured fields (title, description, order, duration) into their
 * respective Prisma columns and store the rich builder data (tasks, homework,
 * quizzes, media, docs, content, difficulty variants, etc.) as `builderData`
 * JSON on each CurriculumModule / CurriculumLesson row.
 */

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'

/** Extract the course (curriculum) ID from the URL path. */
function getCourseId(req: NextRequest): string {
    // URL: …/api/tutor/courses/<id>/curriculum
    const parts = req.nextUrl.pathname.split('/')
    const idx = parts.indexOf('courses')
    return parts[idx + 1]
}

// ---- GET — Load builder tree from DB ----

export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const curriculumId = getCourseId(req)
    const userId = session.user.id

    // Verify ownership
    const curriculum = await db.curriculum.findFirst({
        where: { id: curriculumId, creatorId: userId },
        select: { id: true, name: true },
    })
    if (!curriculum) {
        return NextResponse.json({ error: 'Not found or not yours' }, { status: 404 })
    }

    // Load modules + lessons ordered
    const dbModules = await db.curriculumModule.findMany({
        where: { curriculumId },
        orderBy: { order: 'asc' },
        include: {
            lessons: {
                orderBy: { order: 'asc' },
            },
        },
    })

    // Map DB rows → builder Module[] shape
    const modules = dbModules.map((m) => {
        const mBuilder = (m.builderData ?? {}) as Record<string, any>
        return {
            id: m.id,
            title: m.title,
            description: m.description ?? '',
            order: m.order,
            isPublished: mBuilder.isPublished ?? false,
            difficultyMode: mBuilder.difficultyMode ?? 'all',
            variants: mBuilder.variants ?? {},
            moduleQuizzes: mBuilder.moduleQuizzes ?? [],
            lessons: m.lessons.map((l) => {
                const lBuilder = (l.builderData ?? {}) as Record<string, any>
                return {
                    id: l.id,
                    title: l.title,
                    description: l.description ?? '',
                    duration: l.duration,
                    order: l.order,
                    isPublished: lBuilder.isPublished ?? false,
                    prerequisites: l.prerequisiteLessonIds ?? [],
                    media: lBuilder.media ?? { videos: [], images: [] },
                    docs: lBuilder.docs ?? [],
                    content: lBuilder.content ?? [],
                    tasks: lBuilder.tasks ?? [],
                    homework: lBuilder.homework ?? [],
                    quizzes: lBuilder.quizzes ?? [],
                    difficultyMode: lBuilder.difficultyMode ?? 'all',
                    variants: lBuilder.variants ?? {},
                }
            }),
        }
    })

    return NextResponse.json({ modules })
}

// ---- PUT — Save builder tree to DB (upsert) ----

export async function PUT(req: NextRequest) {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const curriculumId = getCourseId(req)
    const userId = session.user.id

    // Verify ownership
    const curriculum = await db.curriculum.findFirst({
        where: { id: curriculumId, creatorId: userId },
        select: { id: true },
    })
    if (!curriculum) {
        return NextResponse.json({ error: 'Not found or not yours' }, { status: 404 })
    }

    const body = await req.json()
    const modules: any[] = body.modules
    if (!Array.isArray(modules)) {
        return NextResponse.json({ error: '`modules` array required' }, { status: 400 })
    }

    // Use a transaction for atomic save
    await db.$transaction(async (tx) => {
        // 1. Get existing module & lesson IDs so we can delete removed ones
        const existingModules = await tx.curriculumModule.findMany({
            where: { curriculumId },
            select: { id: true, lessons: { select: { id: true } } },
        })
        const existingModuleIds = new Set(existingModules.map((m) => m.id))
        const existingLessonIds = new Set(
            existingModules.flatMap((m) => m.lessons.map((l) => l.id))
        )

        const incomingModuleIds = new Set(modules.map((m) => m.id))
        const incomingLessonIds = new Set(
            modules.flatMap((m: any) => (m.lessons ?? []).map((l: any) => l.id))
        )

        // 2. Delete removed lessons
        const removedLessonIds = [...existingLessonIds].filter((id) => !incomingLessonIds.has(id))
        if (removedLessonIds.length > 0) {
            await tx.curriculumLesson.deleteMany({
                where: { id: { in: removedLessonIds } },
            })
        }

        // 3. Delete removed modules
        const removedModuleIds = [...existingModuleIds].filter((id) => !incomingModuleIds.has(id))
        if (removedModuleIds.length > 0) {
            await tx.curriculumModule.deleteMany({
                where: { id: { in: removedModuleIds } },
            })
        }

        // 4. Upsert modules + lessons
        for (const mod of modules) {
            const moduleBuilderData = {
                isPublished: mod.isPublished ?? false,
                difficultyMode: mod.difficultyMode ?? 'all',
                variants: mod.variants ?? {},
                moduleQuizzes: mod.moduleQuizzes ?? [],
            }

            await tx.curriculumModule.upsert({
                where: { id: mod.id },
                create: {
                    id: mod.id,
                    curriculumId,
                    title: mod.title || 'Untitled Module',
                    description: mod.description || null,
                    order: mod.order ?? 0,
                    builderData: moduleBuilderData,
                },
                update: {
                    title: mod.title || 'Untitled Module',
                    description: mod.description || null,
                    order: mod.order ?? 0,
                    builderData: moduleBuilderData,
                },
            })

            // Lessons within this module
            const lessons: any[] = mod.lessons ?? []
            for (const les of lessons) {
                const lessonBuilderData = {
                    isPublished: les.isPublished ?? false,
                    difficultyMode: les.difficultyMode ?? 'all',
                    variants: les.variants ?? {},
                    media: les.media ?? { videos: [], images: [] },
                    docs: les.docs ?? [],
                    content: les.content ?? [],
                    tasks: les.tasks ?? [],
                    homework: les.homework ?? [],
                    quizzes: les.quizzes ?? [],
                }

                await tx.curriculumLesson.upsert({
                    where: { id: les.id },
                    create: {
                        id: les.id,
                        moduleId: mod.id,
                        title: les.title || 'Untitled Lesson',
                        description: les.description || null,
                        duration: les.duration ?? 30,
                        order: les.order ?? 0,
                        prerequisiteLessonIds: les.prerequisites ?? [],
                        builderData: lessonBuilderData,
                        // Keep structured fields at defaults for new lessons
                        learningObjectives: [],
                        teachingPoints: [],
                        keyConcepts: [],
                        commonMisconceptions: [],
                    },
                    update: {
                        moduleId: mod.id,
                        title: les.title || 'Untitled Lesson',
                        description: les.description || null,
                        duration: les.duration ?? 30,
                        order: les.order ?? 0,
                        prerequisiteLessonIds: les.prerequisites ?? [],
                        builderData: lessonBuilderData,
                    },
                })
            }
        }
    })

    return NextResponse.json({
        message: 'Curriculum saved',
        moduleCount: modules.length,
        lessonCount: modules.reduce((sum: number, m: any) => sum + (m.lessons?.length ?? 0), 0),
    })
}
