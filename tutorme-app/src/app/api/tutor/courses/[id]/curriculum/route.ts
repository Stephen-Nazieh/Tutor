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
  lessons: any[],
  tutorId: string,
  courseId: string,
  courseName: string
): QuestionBankCreateInput[] {
  const candidates: QuestionBankCreateInput[] = []
  if (!Array.isArray(lessons)) return candidates

  const processQuestions = (
    questions: any[],
    subject: string,
    lessonId: string,
    difficulty: 'beginner' | 'intermediate' | 'advanced' = 'intermediate'
  ) => {
    for (const q of questions) {
      if (typeof q?.question !== 'string' || !q.question.trim()) continue
      const type = normalizeQuestionType(q.type)
      if (type === 'unknown') continue
      candidates.push({
        tutorId,
        courseId,
        lessonId,
        type,
        question: q.question.trim(),
        options: Array.isArray(q.options) ? q.options : [],
        correctAnswer: normalizeCorrectAnswer(q),
        points: Number(q.points) || 1,
        difficulty,
        explanation: typeof q.explanation === 'string' ? q.explanation.trim() : null,
        tags: [courseName],
        subject,
        isPublic: false,
      })
    }
  }

  for (const les of lessons) {
    const lessonId = les.id

    // 1. Process tasks
    const tasks = Array.isArray(les?.tasks) ? les.tasks : []
    for (const task of tasks) {
      const questions = Array.isArray(task?.questions) ? task.questions : []
      processQuestions(questions, 'Task', lessonId)
    }

    // 2. Process homework / assessments
    const homework = Array.isArray(les?.homework) ? les.homework : []
    for (const hw of homework) {
      const questions = Array.isArray(hw?.questions) ? hw.questions : []
      processQuestions(questions, 'Homework', lessonId)
    }

    // 3. Process quizzes
    const lessonQuizzes = Array.isArray(les?.quizzes) ? les.quizzes : []
    for (const quiz of lessonQuizzes) {
      const questions = Array.isArray(quiz?.questions) ? quiz.questions : []
      processQuestions(questions, 'Quiz', lessonId)
    }
  }

  return candidates
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

  // Load lessons directly from CourseLesson table
  const dbLessons = await drizzleDb
    .select()
    .from(courseLesson)
    .where(eq(courseLesson.courseId, courseId))
    .orderBy(asc(courseLesson.order))

  // Return all lessons sorted by order
  const lessons = dbLessons.map(l => {
    const bData = (l.builderData || {}) as any
    return {
      id: l.lessonId,
      title: l.title,
      description: l.description || '',
      order: l.order || 0,
      isPublished: bData.isPublished || false,
      duration: l.duration || bData.duration || 45,
      media: bData.media || { videos: [], images: [] },
      docs: bData.docs || [],
      content: bData.content || [],
      tasks: bData.tasks || [],
      homework: bData.homework || [],
      quizzes: bData.quizzes || [],
      difficultyMode: bData.difficultyMode || 'all',
      variants: bData.variants || {},
    }
  })

  return NextResponse.json({ lessons })
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
  const lessons: any[] = body.lessons
  console.log('[Curriculum PUT] Received lessons count:', lessons?.length)

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
  if (!Array.isArray(lessons)) {
    return NextResponse.json({ error: '\`lessons\` array required' }, { status: 400 })
  }

  // Ensure all lessons have IDs before processing
  for (const les of lessons) {
    if (!les.id) les.id = crypto.randomUUID()
  }

  try {
    await drizzleDb.transaction(async tx => {
      console.log('[Curriculum PUT] Step 1: Getting existing lessons...')
      // 1. Get existing lesson IDs
      const existingLessons = await tx
        .select({ lessonId: courseLesson.lessonId })
        .from(courseLesson)
        .where(eq(courseLesson.courseId, courseId))
      const existingLessonIds = new Set(existingLessons.map(l => l.lessonId))
      console.log('[Curriculum PUT] Found existing lessons:', existingLessonIds.size)

      const incomingLessonIds = new Set(lessons.map(l => l.id))

      const removedLessonIds = [...existingLessonIds].filter(id => !incomingLessonIds.has(id))
      console.log('[Curriculum PUT] Step 2: Removed lesson IDs:', removedLessonIds.length)
      if (removedLessonIds.length > 0) {
        await tx.delete(courseLesson).where(inArray(courseLesson.lessonId, removedLessonIds))
      }

      console.log('[Curriculum PUT] Step 3: Upserting lessons...')
      for (const les of lessons) {
        const lessonBuilderData = {
          isPublished: les.isPublished ?? false,
          duration: les.duration ?? 45,
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
            moduleId: null, // Legacy column
            title: les.title || 'Untitled Lesson',
            description: les.description || null,
            duration: les.duration ?? 60,
            order: les.order ?? 0,
            builderData: lessonBuilderData,
          })
          .onConflictDoUpdate({
            target: courseLesson.lessonId,
            set: {
              moduleId: null,
              title: les.title || 'Untitled Lesson',
              description: les.description || null,
              duration: les.duration ?? 60,
              order: les.order ?? 0,
              builderData: lessonBuilderData,
            },
          })
      }

      console.log('[Curriculum PUT] Step 4: Processing question bank...')
      const questionCandidates = extractQuestionBankCandidates(
        lessons,
        userId,
        courseId,
        courseRow.name
      )
      console.log('[Curriculum PUT] Question candidates:', questionCandidates.length)
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
        console.log('[Curriculum PUT] Step 5: Creating adaptive variants...')
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
    lessonCount: lessons.length,
    variants: variantJoinLinks,
  })
}

// Alias POST to PUT for frontend compatibility
export { PUT as POST }
