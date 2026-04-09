/**
 * GET  /api/tutor/courses/[id]/curriculum  — Load the full builder tree
 * PUT  /api/tutor/courses/[id]/curriculum  — Save (upsert) the full builder tree
 *
 * The builder tree shape is:
 *   modules: Module[]  (each module has lessons[], moduleQuizzes[], etc.)
 *
 * We persist structured fields (title, description, order, duration) into their
 * respective table columns and store the rich builder data (tasks, homework,
 * quizzes, media, docs, content, difficulty variants, etc.) as `builderData`
 * JSON on each CurriculumModule / CurriculumLesson row.
 */

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession, authOptions } from '@/lib/auth'
import { drizzleDb } from '@/lib/db/drizzle'
import {
  course,
  courseLesson,
  questionBankItem,
  courseBatch,
  curriculumModule as courseModule,
} from '@/lib/db/schema'
import { eq, and, inArray, asc, sql } from 'drizzle-orm'
import crypto from 'crypto'

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
  courseId: string
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
    const value =
      typeof question.correctAnswer === 'string' ? question.correctAnswer.toLowerCase() : ''
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
  courseId: string,
  courseName: string
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
          courseId,
          lessonId: null,
          type,
          question: q.question.trim(),
          options: Array.isArray(q.options) ? q.options : null,
          correctAnswer: normalizeCorrectAnswer(q),
          points: Math.max(1, q.points ?? 1),
          difficulty: 'medium',
          explanation: q.explanation?.trim() || null,
          tags: ['course-builder', 'module-quiz'],
          subject: courseName,
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
              courseId,
              lessonId,
              type,
              question: q.question.trim(),
              options: Array.isArray(q.options) ? q.options : null,
              correctAnswer: normalizeCorrectAnswer(q),
              points: Math.max(1, q.points ?? 1),
              difficulty: 'medium',
              explanation: q.explanation?.trim() || null,
              tags: ['course-builder', group.tag],
              subject: courseName,
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
  const session = await getServerSession(authOptions, req)
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const courseId = getCourseId(req)
  const userId = session.user.id

  // Verify ownership
  const [courseRow] = await drizzleDb
    .select({ courseId: course.courseId, name: course.name })
    .from(course)
    .where(and(eq(course.courseId, courseId), eq(course.creatorId, userId)))
  if (!courseRow) {
    return NextResponse.json({ error: 'Not found or not yours' }, { status: 404 })
  }

  // Load modules + lessons ordered
  const dbModules = await drizzleDb
    .select()
    .from(courseModule)
    .where(eq(courseModule.curriculumId, courseId))
    .orderBy(asc(courseModule.order))

  // Lessons are now directly under courses (no moduleId)
  const dbLessons = await drizzleDb
    .select()
    .from(courseLesson)
    .where(eq(courseLesson.courseId, courseId))
    .orderBy(asc(courseLesson.order))

  // Map DB rows → builder Module[] shape
  const modules = dbModules.map((m: (typeof dbModules)[0]) => {
    const mBuilder = (m.builderData ?? {}) as Record<string, any>
    // Lessons are now directly under courses (no moduleId), so we can't filter by module
    // Return empty array for now - lessons need to be fetched at course level
    const moduleLessons: typeof dbLessons = []
    return {
      id: m.moduleId,
      title: m.title,
      description: m.description ?? '',
      order: m.order,
      isPublished: mBuilder.isPublished ?? false,
      difficultyMode: mBuilder.difficultyMode ?? 'all',
      variants: mBuilder.variants ?? {},
      moduleQuizzes: mBuilder.moduleQuizzes ?? [],
      lessons: moduleLessons.map(l => {
        const lBuilder = (l.builderData ?? {}) as Record<string, unknown>
        return {
          id: l.lessonId,
          title: l.title,
          description: l.description ?? '',
          duration: (lBuilder.duration as number) ?? 30,
          order: l.order,
          isPublished: (lBuilder.isPublished as boolean) ?? false,
          prerequisites: (lBuilder.prerequisites as string[]) ?? [],
          media: (lBuilder.media as Record<string, unknown>) ?? { videos: [], images: [] },
          docs: (lBuilder.docs as unknown[]) ?? [],
          content: (lBuilder.content as unknown[]) ?? [],
          tasks: (lBuilder.tasks as unknown[]) ?? [],
          homework: (lBuilder.homework as unknown[]) ?? [],
          quizzes: (lBuilder.quizzes as unknown[]) ?? [],
          difficultyMode: (lBuilder.difficultyMode as string) ?? 'all',
          variants: (lBuilder.variants as Record<string, unknown>) ?? {},
        }
      }),
    }
  })

  return NextResponse.json({ modules })
}

// ---- PUT — Save builder tree to DB (upsert) ----

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions, req)
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const courseId = getCourseId(req)
  const userId = session.user.id

  console.log('[Curriculum PUT] Starting save for courseId:', courseId, 'userId:', userId)

  // Verify ownership
  const [courseRow] = await drizzleDb
    .select({ courseId: course.courseId, name: course.name })
    .from(course)
    .where(and(eq(course.courseId, courseId), eq(course.creatorId, userId)))
  if (!courseRow) {
    console.error('[Curriculum PUT] Course not found or not owned by user')
    return NextResponse.json({ error: 'Not found or not yours' }, { status: 404 })
  }

  console.log('[Curriculum PUT] Course found:', courseRow.name)

  const body = await req.json()
  const modules: any[] = body.modules
  console.log('[Curriculum PUT] Received modules count:', modules?.length)

  const developmentMode = body.developmentMode === 'multi' ? 'multi' : 'single'
  const previewDifficulty =
    body.previewDifficulty === 'beginner' ||
    body.previewDifficulty === 'intermediate' ||
    body.previewDifficulty === 'advanced'
      ? body.previewDifficulty
      : 'all'
  const shouldAutoCreateAdaptiveVariants =
    developmentMode === 'multi' && previewDifficulty === 'all'
  const variantJoinLinks: VariantJoinLink[] = []
  if (!Array.isArray(modules)) {
    return NextResponse.json({ error: '`modules` array required' }, { status: 400 })
  }

  try {
    await drizzleDb.transaction(async tx => {
      // 1. Get existing module & lesson IDs
      const existingModules = await tx
        .select({ moduleId: courseModule.moduleId })
        .from(courseModule)
        .where(eq(courseModule.curriculumId, courseId))
      const existingModuleIds = new Set(existingModules.map(m => m.moduleId))
      // Get all lessons for this course (lessons are now directly under courses)
      const existingLessons = await tx
        .select({ lessonId: courseLesson.lessonId })
        .from(courseLesson)
        .where(eq(courseLesson.courseId, courseId))
      const existingLessonIds = new Set(existingLessons.map(l => l.lessonId))

      const incomingModuleIds = new Set(modules.map(m => m.id))
      const incomingLessonIds = new Set(
        modules.flatMap((m: any) => (m.lessons ?? []).map((l: any) => l.id))
      )

      const removedLessonIds = [...existingLessonIds].filter(id => !incomingLessonIds.has(id))
      if (removedLessonIds.length > 0) {
        await tx.delete(courseLesson).where(inArray(courseLesson.lessonId, removedLessonIds))
      }

      const removedModuleIds = [...existingModuleIds].filter(id => !incomingModuleIds.has(id))
      if (removedModuleIds.length > 0) {
        await tx.delete(courseModule).where(inArray(courseModule.moduleId, removedModuleIds))
      }

      for (const mod of modules) {
        const moduleBuilderData = {
          isPublished: mod.isPublished ?? false,
          difficultyMode: mod.difficultyMode ?? 'all',
          variants: mod.variants ?? {},
          moduleQuizzes: mod.moduleQuizzes ?? [],
        }
        await tx
          .insert(courseModule)
          .values({
            moduleId: mod.id,
            curriculumId: courseId, // Note: CurriculumModule uses curriculumId, not courseId
            title: mod.title || 'Untitled Module',
            description: mod.description || null,
            order: mod.order ?? 0,
            builderData: moduleBuilderData,
          })
          .onConflictDoUpdate({
            target: courseModule.moduleId,
            set: {
              title: mod.title || 'Untitled Module',
              description: mod.description || null,
              order: mod.order ?? 0,
              builderData: moduleBuilderData,
            },
          })

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
          await tx
            .insert(courseLesson)
            .values({
              lessonId: les.id,
              courseId,
              title: les.title || 'Untitled Lesson',
              description: les.description || null,
              order: les.order ?? 0,
              builderData: lessonBuilderData,
            })
            .onConflictDoUpdate({
              target: courseLesson.lessonId,
              set: {
                title: les.title || 'Untitled Lesson',
                description: les.description || null,
                order: les.order ?? 0,
                builderData: lessonBuilderData,
              },
            })
        }
      }

      const questionCandidates = extractQuestionBankCandidates(
        modules,
        userId,
        courseId,
        courseRow.name
      )
      if (questionCandidates.length > 0) {
        const existingItems = await tx
          .select({
            lessonId: questionBankItem.lessonId,
            type: questionBankItem.type,
            question: questionBankItem.question,
          })
          .from(questionBankItem)
          .where(
            and(eq(questionBankItem.tutorId, userId), eq(questionBankItem.curriculumId, courseId))
          )
        const signatures = new Set(
          existingItems.map(item =>
            toQuestionSignature(item.type, item.question, item.lessonId ?? null)
          )
        )
        const toCreate = questionCandidates.filter(item => {
          const signature = toQuestionSignature(item.type, item.question, item.lessonId)
          if (signatures.has(signature)) return false
          signatures.add(signature)
          return true
        })
        if (toCreate.length > 0) {
          await tx.insert(questionBankItem).values(
            toCreate.map(item => ({
              itemId: crypto.randomUUID(),
              tutorId: item.tutorId,
              curriculumId: item.courseId, // Note: column is curriculumId in production
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
              usageCount: 0,
            }))
          )
        }
      }

      if (shouldAutoCreateAdaptiveVariants) {
        const existingVariantBatches = await tx
          .select({
            batchId: courseBatch.batchId,
            name: courseBatch.name,
            difficulty: courseBatch.difficulty,
            order: courseBatch.order,
          })
          .from(courseBatch)
          .where(
            and(
              eq(courseBatch.curriculumId, courseId),
              inArray(courseBatch.difficulty, [...ADAPTIVE_DIFFICULTIES])
            )
          )
          .orderBy(asc(courseBatch.order))

        const selectedByDifficulty = new Map<
          AdaptiveDifficulty,
          { batchId: string; name: string; order: number }
        >()
        for (const batch of existingVariantBatches) {
          const difficulty = batch.difficulty as AdaptiveDifficulty | null
          if (!difficulty || selectedByDifficulty.has(difficulty)) continue
          selectedByDifficulty.set(difficulty, {
            batchId: batch.batchId,
            name: batch.name,
            order: batch.order,
          })
        }

        const [{ maxOrder }] = await tx
          .select({ maxOrder: sql<number>`coalesce(max(${courseBatch.order}), -1)` })
          .from(courseBatch)
          .where(eq(courseBatch.curriculumId, courseId))
        let nextOrder = (Number(maxOrder) ?? -1) + 1

        for (const difficulty of ADAPTIVE_DIFFICULTIES) {
          let batch = selectedByDifficulty.get(difficulty)
          if (!batch) {
            const batchId = crypto.randomUUID()
            await tx.insert(courseBatch).values({
              batchId: batchId,
              curriculumId: courseId,
              name: `Adaptive ${difficulty[0].toUpperCase()}${difficulty.slice(1)}`,
              difficulty,
              order: nextOrder,
              isLive: false,
              maxStudents: 50,
            })
            batch = {
              batchId: batchId,
              name: `Adaptive ${difficulty[0].toUpperCase()}${difficulty.slice(1)}`,
              order: nextOrder,
            }
            selectedByDifficulty.set(difficulty, batch)
            nextOrder += 1
          }
          if (!batch) continue

          const joinLink = `${req.nextUrl.origin}/curriculum/${courseId}?batch=${batch.batchId}`
          await tx
            .update(courseBatch)
            .set({ meetingUrl: joinLink })
            .where(eq(courseBatch.batchId, batch.batchId))
          variantJoinLinks.push({
            difficulty,
            batchId: batch.batchId,
            batchName: batch.name,
            joinLink,
          })
        }
      }
    })
  } catch (txError) {
    console.error('[Curriculum PUT] Transaction failed:', txError)
    if (txError instanceof Error) {
      console.error('[Curriculum PUT] Error details:', txError.message)
      console.error('[Curriculum PUT] Error stack:', txError.stack)
    }
    // Return more detailed error for debugging
    const errorMessage = txError instanceof Error ? txError.message : 'Unknown error'
    const errorDetails = JSON.stringify(txError, Object.getOwnPropertyNames(txError))
    return NextResponse.json(
      {
        error: 'Failed to save curriculum',
        details: errorMessage,
        debug: errorDetails.slice(0, 1000), // Limit size
      },
      { status: 500 }
    )
  }

  console.log('[Curriculum PUT] Save successful')
  return NextResponse.json({
    message: 'Curriculum saved',
    moduleCount: modules.length,
    lessonCount: modules.reduce((sum: number, m: any) => sum + (m.lessons?.length ?? 0), 0),
    variants: variantJoinLinks,
  })
}

// Alias POST to PUT for frontend compatibility
export { PUT as POST }
