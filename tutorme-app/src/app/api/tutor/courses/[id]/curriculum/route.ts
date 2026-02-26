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

const ADAPTIVE_DIFFICULTIES = ['beginner', 'intermediate', 'advanced'] as const
type AdaptiveDifficulty = (typeof ADAPTIVE_DIFFICULTIES)[number]

interface VariantJoinLink {
    difficulty: AdaptiveDifficulty
    batchId: string
    batchName: string
    joinLink: string
}

type BuilderQuestion = {
    question?: string
    type?: string
    options?: unknown
    correctAnswer?: unknown
    points?: number
    explanation?: string
}

type QuestionBankCreateInput = {
    tutorId: string
    curriculumId: string
    lessonId: string | null
    type: string
    question: string
    options: unknown
    correctAnswer: unknown
    points: number
    difficulty: string
    explanation: string | null
    tags: string[]
    subject: string | null
    isPublic: boolean
}

function normalizeQuestionType(type?: string): string {
    if (type === 'mcq') return 'multiple_choice'
    if (type === 'multiselect') return 'multi_select'
    if (type === 'truefalse') return 'true_false'
    if (type === 'shortanswer') return 'short_answer'
    if (type === 'matching') return 'matching'
    if (type === 'fillblank') return 'fill_in_blank'
    if (type === 'essay') return 'essay'
    return 'short_answer'
}

function normalizeCorrectAnswer(question: BuilderQuestion): unknown {
    if (question.type === 'truefalse') {
        const value = typeof question.correctAnswer === 'string' ? question.correctAnswer.toLowerCase() : ''
        return value === 'true' || value === 'false' ? value : null
    }
    return question.correctAnswer ?? null
}

function toQuestionSignature(type: string, question: string, lessonId: string | null): string {
    return `${lessonId ?? 'none'}::${type}::${question.trim().toLowerCase()}`
}

function extractQuestionBankCandidates(
    modules: any[],
    userId: string,
    curriculumId: string,
    curriculumName: string
): QuestionBankCreateInput[] {
    const items: QuestionBankCreateInput[] = []

    for (const mod of modules) {
        const moduleQuizzes = Array.isArray(mod?.moduleQuizzes) ? mod.moduleQuizzes : []
        for (const quiz of moduleQuizzes) {
            const questions = Array.isArray(quiz?.questions) ? quiz.questions : []
            for (const q of questions as BuilderQuestion[]) {
                if (!q?.question || !q.question.trim()) continue
                const type = normalizeQuestionType(q.type)
                items.push({
                    tutorId: userId,
                    curriculumId,
                    lessonId: null,
                    type,
                    question: q.question.trim(),
                    options: Array.isArray(q.options) ? q.options : null,
                    correctAnswer: normalizeCorrectAnswer(q),
                    points: Math.max(1, q.points ?? 1),
                    difficulty: 'medium',
                    explanation: q.explanation?.trim() || null,
                    tags: ['course-builder', 'module-quiz'],
                    subject: curriculumName,
                    isPublic: false,
                })
            }
        }

        const lessons = Array.isArray(mod?.lessons) ? mod.lessons : []
        for (const lesson of lessons) {
            const lessonId = typeof lesson?.id === 'string' ? lesson.id : null
            const groups = [
                { source: lesson?.tasks, tag: 'task' },
                { source: lesson?.homework, tag: 'homework' },
                { source: lesson?.worksheets, tag: 'worksheet' },
                { source: lesson?.quizzes, tag: 'lesson-quiz' },
            ]

            for (const group of groups) {
                const itemsInGroup = Array.isArray(group.source) ? group.source : []
                for (const item of itemsInGroup) {
                    const questions = Array.isArray(item?.questions) ? item.questions : []
                    for (const q of questions as BuilderQuestion[]) {
                        if (!q?.question || !q.question.trim()) continue
                        const type = normalizeQuestionType(q.type)
                        items.push({
                            tutorId: userId,
                            curriculumId,
                            lessonId,
                            type,
                            question: q.question.trim(),
                            options: Array.isArray(q.options) ? q.options : null,
                            correctAnswer: normalizeCorrectAnswer(q),
                            points: Math.max(1, q.points ?? 1),
                            difficulty: 'medium',
                            explanation: q.explanation?.trim() || null,
                            tags: ['course-builder', group.tag],
                            subject: curriculumName,
                            isPublic: false,
                        })
                    }
                }
            }
        }
    }

    return items
}

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
    const modules = dbModules.map((m: any) => {
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
            lessons: m.lessons.map((l: any) => {
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
        select: { id: true, name: true },
    })
    if (!curriculum) {
        return NextResponse.json({ error: 'Not found or not yours' }, { status: 404 })
    }

    const body = await req.json()
    const modules: any[] = body.modules
    const developmentMode = body.developmentMode === 'multi' ? 'multi' : 'single'
    const previewDifficulty =
        body.previewDifficulty === 'beginner' ||
            body.previewDifficulty === 'intermediate' ||
            body.previewDifficulty === 'advanced'
            ? body.previewDifficulty
            : 'all'
    const shouldAutoCreateAdaptiveVariants = developmentMode === 'multi' && previewDifficulty === 'all'
    const variantJoinLinks: VariantJoinLink[] = []
    if (!Array.isArray(modules)) {
        return NextResponse.json({ error: '`modules` array required' }, { status: 400 })
    }

    // Use a transaction for atomic save
    await db.$transaction(async (tx: any) => {
        // 1. Get existing module & lesson IDs so we can delete removed ones
        const existingModules = await tx.curriculumModule.findMany({
            where: { curriculumId },
            select: { id: true, lessons: { select: { id: true } } },
        })
        const existingModuleIds = new Set(existingModules.map((m: any) => m.id))
        const existingLessonIds = new Set(
            existingModules.flatMap((m: any) => m.lessons.map((l: any) => l.id))
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

        const questionCandidates = extractQuestionBankCandidates(modules, userId, curriculumId, curriculum.name)
        if (questionCandidates.length > 0) {
            const existingItems = await tx.questionBankItem.findMany({
                where: { tutorId: userId, curriculumId },
                select: { lessonId: true, type: true, question: true },
            })
            const signatures = new Set(
                existingItems.map((item: any) => toQuestionSignature(item.type, item.question, item.lessonId ?? null))
            )

            const toCreate = questionCandidates.filter((item) => {
                const signature = toQuestionSignature(item.type, item.question, item.lessonId)
                if (signatures.has(signature)) return false
                signatures.add(signature)
                return true
            })

            if (toCreate.length > 0) {
                await tx.questionBankItem.createMany({
                    data: toCreate.map((item) => ({
                        tutorId: item.tutorId,
                        curriculumId: item.curriculumId,
                        lessonId: item.lessonId,
                        type: item.type,
                        question: item.question,
                        options: item.options,
                        correctAnswer: item.correctAnswer,
                        points: item.points,
                        difficulty: item.difficulty,
                        explanation: item.explanation,
                        tags: item.tags,
                        subject: item.subject,
                        isPublic: item.isPublic,
                    })),
                })
            }
        }

        if (shouldAutoCreateAdaptiveVariants) {
            const existingVariantBatches = await tx.courseBatch.findMany({
                where: {
                    curriculumId,
                    difficulty: { in: [...ADAPTIVE_DIFFICULTIES] },
                },
                orderBy: [{ order: 'asc' }],
                select: {
                    id: true,
                    name: true,
                    difficulty: true,
                    order: true,
                },
            })

            const selectedByDifficulty = new Map<AdaptiveDifficulty, { id: string; name: string; order: number }>()
            for (const batch of existingVariantBatches) {
                const difficulty = batch.difficulty as AdaptiveDifficulty | null
                if (!difficulty || selectedByDifficulty.has(difficulty)) continue
                selectedByDifficulty.set(difficulty, { id: batch.id, name: batch.name, order: batch.order })
            }

            let nextOrder = await tx.courseBatch
                .aggregate({
                    where: { curriculumId },
                    _max: { order: true },
                })
                .then((r: { _max: { order: number | null } }) => (r._max.order ?? -1) + 1)

            for (const difficulty of ADAPTIVE_DIFFICULTIES) {
                let batch = selectedByDifficulty.get(difficulty)

                if (!batch) {
                    const created = await tx.courseBatch.create({
                        data: {
                            curriculumId,
                            name: `Adaptive ${difficulty[0].toUpperCase()}${difficulty.slice(1)}`,
                            difficulty,
                            order: nextOrder,
                        },
                        select: { id: true, name: true, order: true },
                    })
                    batch = created as any
                    selectedByDifficulty.set(difficulty, batch as any)
                    nextOrder += 1
                }

                if (!batch) continue

                const joinLink = `${req.nextUrl.origin}/curriculum/${curriculumId}?batch=${batch.id}`
                await tx.courseBatch.update({
                    where: { id: batch.id },
                    data: { meetingUrl: joinLink },
                })

                variantJoinLinks.push({
                    difficulty,
                    batchId: batch.id,
                    batchName: batch.name,
                    joinLink,
                })
            }
        }
    })

    return NextResponse.json({
        message: 'Curriculum saved',
        moduleCount: modules.length,
        lessonCount: modules.reduce((sum: number, m: any) => sum + (m.lessons?.length ?? 0), 0),
        variants: variantJoinLinks,
    })
}
