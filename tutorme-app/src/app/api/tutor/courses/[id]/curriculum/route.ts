/**
 * GET  /api/tutor/courses/[id]/curriculum  — Load the full builder tree
 * PUT  /api/tutor/courses/[id]/curriculum  — Save (upsert) the full builder tree
 *
 * Simplified API for the new Course -> Lesson -> Tasks/Assessments/Homework structure.
 * All lesson content is stored in the builderData JSONB column.
 */

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession, authOptions } from '@/lib/auth'
import { drizzleDb } from '@/lib/db/drizzle'
import { course, courseLesson } from '@/lib/db/schema'
import { eq, and, inArray, asc } from 'drizzle-orm'
import crypto from 'crypto'

/** Extract the course ID from the URL path. */
function getCourseId(req: NextRequest): string {
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
      duration: bData.duration || 45,
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

  const body = await req.json()
  const lessons: any[] = body.lessons
  console.log('[Curriculum PUT] Received lessons count:', lessons?.length)

  // Validate lessons data
  if (!Array.isArray(lessons)) {
    console.error('[Curriculum PUT] Invalid lessons data:', typeof lessons)
    return NextResponse.json({ error: '`lessons` must be an array' }, { status: 400 })
  }

  // Ensure all lessons have IDs before processing
  for (const les of lessons) {
    if (!les.id) les.id = crypto.randomUUID()
  }

  try {
    await drizzleDb.transaction(async tx => {
      console.log('[Curriculum PUT] Step 1: Getting existing lessons...')
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
        
        // Simplified insert - only use columns that exist in the table
        await tx
          .insert(courseLesson)
          .values({
            lessonId: les.id,
            courseId,
            title: les.title || 'Untitled Lesson',
            description: les.description || null,
            duration: les.duration ?? 60,
            order: les.order ?? 0,
            builderData: lessonBuilderData,
          })
          .onConflictDoUpdate({
            target: courseLesson.lessonId,
            set: {
              title: les.title || 'Untitled Lesson',
              description: les.description || null,
              duration: les.duration ?? 60,
              order: les.order ?? 0,
              builderData: lessonBuilderData,
            },
          })
      }
      console.log('[Curriculum PUT] Upserted', lessons.length, 'lessons')
    })
  } catch (txError) {
    console.error('[Curriculum PUT] Transaction failed:', txError)
    if (txError instanceof Error) {
      console.error('[Curriculum PUT] Error details:', txError.message)
      console.error('[Curriculum PUT] Error stack:', txError.stack)
    }
    const errorMessage = txError instanceof Error ? txError.message : 'Unknown error'
    return NextResponse.json(
      {
        error: 'Failed to save curriculum',
        details: errorMessage,
      },
      { status: 500 }
    )
  }

  console.log('[Curriculum PUT] Save successful')
  return NextResponse.json({
    message: 'Curriculum saved',
    lessonCount: lessons.length,
  })
}

// Alias POST to PUT for frontend compatibility
export { PUT as POST }
