/**
 * AI Tutor Lesson Context API
 * GET /api/ai-tutor/lesson-context — get context (withAuth)
 * POST /api/ai-tutor/lesson-context — link session to lesson (withAuth + CSRF)
 */

import { NextRequest, NextResponse } from 'next/server'
import type { Session } from 'next-auth'
import { and, asc, eq } from 'drizzle-orm'
import { withAuth, requireCsrf, handleApiError } from '@/lib/api/middleware'
import { drizzleDb } from '@/lib/db/drizzle'
import {
  aITutorEnrollment,
  courseEnrollment,
  course,
  courseLesson,
  courseLessonProgress,
  aIInteractionSession,
} from '@/lib/db/schema'

async function getHandler(req: NextRequest, session: Session) {
  try {
    const { searchParams } = new URL(req.url)
    const lessonId = searchParams.get('lessonId')

    // Get student's AI tutor enrollment
    const [aiEnrollment] = await drizzleDb
      .select()
      .from(aITutorEnrollment)
      .where(
        and(
          eq(aITutorEnrollment.studentId, session.user.id),
          eq(aITutorEnrollment.subjectCode, 'english')
        )
      )
      .limit(1)

    if (!aiEnrollment) {
      return NextResponse.json({ error: 'Not enrolled in English tutor' }, { status: 404 })
    }

    // Get student's course enrollment
    const [enrollmentRow] = await drizzleDb
      .select()
      .from(courseEnrollment)
      .where(eq(courseEnrollment.studentId, session.user.id))
      .limit(1)

    if (!enrollmentRow) {
      return NextResponse.json({ error: 'No course assigned' }, { status: 404 })
    }

    const [courseRow] = await drizzleDb
      .select()
      .from(course)
      .where(eq(course.courseId, enrollmentRow.courseId))
      .limit(1)

    if (!courseRow) {
      return NextResponse.json({ error: 'No course assigned' }, { status: 404 })
    }

    // Get lessons directly under course (modules deprecated)
    const lessonsList = await drizzleDb
      .select({
        lessonId: courseLesson.lessonId,
        title: courseLesson.title,
        order: courseLesson.order,
      })
      .from(courseLesson)
      .where(eq(courseLesson.courseId, courseRow.courseId))
      .orderBy(asc(courseLesson.order))

    // If specific lesson requested, return that
    if (lessonId) {
      const [lessonRow] = await drizzleDb
        .select()
        .from(courseLesson)
        .where(eq(courseLesson.lessonId, lessonId))
        .limit(1)

      if (!lessonRow) {
        return NextResponse.json({ error: 'Lesson not found' }, { status: 404 })
      }

      const [progress] = await drizzleDb
        .select()
        .from(courseLessonProgress)
        .where(
          and(
            eq(courseLessonProgress.lessonId, lessonId),
            eq(courseLessonProgress.studentId, session.user.id)
          )
        )
        .limit(1)

      return NextResponse.json({
        context: 'specific_lesson',
        lesson: {
          id: lessonRow.lessonId,
          title: lessonRow.title,
          moduleTitle: '',
          learningObjectives: [],
          keyConcepts: [],
        },
        progress: progress ?? { status: 'NOT_STARTED' },
      })
    }

    // Otherwise, recommend lessons based on progress
    let currentLesson: {
      lessonId: string
      title: string
      order: number
    } | null = null

    for (const lesson of lessonsList) {
      const [progress] = await drizzleDb
        .select()
        .from(courseLessonProgress)
        .where(
          and(
            eq(courseLessonProgress.lessonId, lesson.lessonId),
            eq(courseLessonProgress.studentId, session.user.id)
          )
        )
        .limit(1)
      if (!progress || progress.status !== 'COMPLETED') {
        currentLesson = lesson
        break
      }
    }

    if (!currentLesson && lessonsList.length > 0) {
      currentLesson = lessonsList[0]
    }

    const totalLessons = lessonsList.length

    return NextResponse.json({
      context: 'recommended_lesson',
      course: {
        id: courseRow.courseId,
        name: courseRow.name,
        categories: courseRow.categories,
        description: courseRow.description,
      },
      currentLesson: currentLesson
        ? {
            id: currentLesson.lessonId,
            title: currentLesson.title,
            moduleTitle: '',
            learningObjectives: [],
            keyConcepts: [],
          }
        : null,
      modulesCount: 0,
      totalLessons,
    })
  } catch (error) {
    console.error('Get lesson context error:', error)
    return handleApiError(
      error,
      'Failed to get lesson context',
      'api/ai-tutor/lesson-context/route.ts'
    )
  }
}

async function postHandler(req: NextRequest, session: Session) {
  const csrfError = await requireCsrf(req)
  if (csrfError) return csrfError

  try {
    const body = await req.json().catch(() => ({}))
    const { sessionId, lessonId } = body

    if (!sessionId || !lessonId) {
      return NextResponse.json({ error: 'Session ID and Lesson ID required' }, { status: 400 })
    }

    // Create or update AI interaction session with lesson context (subjectCode stores lesson reference)
    const [tutoringSession] = await drizzleDb
      .update(aIInteractionSession)
      .set({ subjectCode: lessonId })
      .where(eq(aIInteractionSession.interactionId, String(sessionId)))
      .returning()

    return NextResponse.json({ success: true, session: tutoringSession ?? null })
  } catch (error) {
    console.error('Link session to lesson error:', error)
    return handleApiError(
      error,
      'Failed to link session to lesson',
      'api/ai-tutor/lesson-context/route.ts'
    )
  }
}

export const GET = withAuth(getHandler)
export const POST = withAuth(postHandler)
