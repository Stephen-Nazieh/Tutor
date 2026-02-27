/**
 * AI Tutor Lesson Context API
 * GET /api/ai-tutor/lesson-context — get context (withAuth)
 * POST /api/ai-tutor/lesson-context — link session to lesson (withAuth + CSRF)
 */

import { NextRequest, NextResponse } from 'next/server'
import type { Session } from 'next-auth'
import { and, asc, eq } from 'drizzle-orm'
import { withAuth, requireCsrf } from '@/lib/api/middleware'
import { drizzleDb } from '@/lib/db/drizzle'
import {
  aITutorEnrollment,
  curriculumEnrollment,
  curriculum,
  curriculumModule,
  curriculumLesson,
  curriculumLessonProgress,
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
      return NextResponse.json(
        { error: 'Not enrolled in English tutor' },
        { status: 404 }
      )
    }

    // Get student's curriculum enrollment
    const [enrollmentRow] = await drizzleDb
      .select()
      .from(curriculumEnrollment)
      .where(eq(curriculumEnrollment.studentId, session.user.id))
      .limit(1)

    if (!enrollmentRow) {
      return NextResponse.json(
        { error: 'No curriculum assigned' },
        { status: 404 }
      )
    }

    const [curriculumRow] = await drizzleDb
      .select()
      .from(curriculum)
      .where(eq(curriculum.id, enrollmentRow.curriculumId))
      .limit(1)

    if (!curriculumRow) {
      return NextResponse.json(
        { error: 'No curriculum assigned' },
        { status: 404 }
      )
    }

    const modulesList = await drizzleDb
      .select()
      .from(curriculumModule)
      .where(eq(curriculumModule.curriculumId, curriculumRow.id))
      .orderBy(asc(curriculumModule.order))

    const lessonsByModule = new Map<string, { id: string; title: string; order: number; learningObjectives: string[]; keyConcepts: string[] }[]>()
    for (const mod of modulesList) {
      const lessons = await drizzleDb
        .select({
          id: curriculumLesson.id,
          title: curriculumLesson.title,
          order: curriculumLesson.order,
          learningObjectives: curriculumLesson.learningObjectives,
          keyConcepts: curriculumLesson.keyConcepts,
        })
        .from(curriculumLesson)
        .where(eq(curriculumLesson.moduleId, mod.id))
        .orderBy(asc(curriculumLesson.order))
      lessonsByModule.set(mod.id, lessons)
    }

    // If specific lesson requested, return that
    if (lessonId) {
      const [lessonRow] = await drizzleDb
        .select()
        .from(curriculumLesson)
        .where(eq(curriculumLesson.id, lessonId))
        .limit(1)

      if (!lessonRow) {
        return NextResponse.json(
          { error: 'Lesson not found' },
          { status: 404 }
        )
      }

      const [moduleRow] = await drizzleDb
        .select()
        .from(curriculumModule)
        .where(eq(curriculumModule.id, lessonRow.moduleId))
        .limit(1)

      const [progress] = await drizzleDb
        .select()
        .from(curriculumLessonProgress)
        .where(
          and(
            eq(curriculumLessonProgress.lessonId, lessonId),
            eq(curriculumLessonProgress.studentId, session.user.id)
          )
        )
        .limit(1)

      return NextResponse.json({
        context: 'specific_lesson',
        lesson: {
          id: lessonRow.id,
          title: lessonRow.title,
          moduleTitle: moduleRow?.title ?? '',
          learningObjectives: lessonRow.learningObjectives,
          keyConcepts: lessonRow.keyConcepts,
        },
        progress: progress ?? { status: 'NOT_STARTED' },
      })
    }

    // Otherwise, recommend lessons based on progress
    let currentLesson: { id: string; title: string; order: number; learningObjectives: string[]; keyConcepts: string[] } | null = null
    let currentModule: typeof modulesList[0] | null = null

    for (const mod of modulesList) {
      const lessons = lessonsByModule.get(mod.id) ?? []
      for (const lesson of lessons) {
        const [progress] = await drizzleDb
          .select()
          .from(curriculumLessonProgress)
          .where(
            and(
              eq(curriculumLessonProgress.lessonId, lesson.id),
              eq(curriculumLessonProgress.studentId, session.user.id)
            )
          )
          .limit(1)
        if (!progress || progress.status !== 'COMPLETED') {
          currentLesson = lesson
          currentModule = mod
          break
        }
      }
      if (currentLesson) break
    }

    if (!currentLesson && modulesList.length > 0) {
      const lastModule = modulesList[modulesList.length - 1]
      currentModule = lastModule
      const lastLessons = lessonsByModule.get(lastModule.id) ?? []
      currentLesson = lastLessons[0] ?? null
    }

    const totalLessons = modulesList.reduce((acc, m) => acc + (lessonsByModule.get(m.id)?.length ?? 0), 0)

    return NextResponse.json({
      context: 'recommended_lesson',
      curriculum: {
        id: curriculumRow.id,
        name: curriculumRow.name,
        subject: curriculumRow.subject,
        description: curriculumRow.description,
      },
      currentLesson: currentLesson && currentModule ? {
        id: currentLesson.id,
        title: currentLesson.title,
        moduleTitle: currentModule.title,
        learningObjectives: currentLesson.learningObjectives,
        keyConcepts: currentLesson.keyConcepts,
      } : null,
      modulesCount: modulesList.length,
      totalLessons,
    })
  } catch (error) {
    console.error('Get lesson context error:', error)
    return NextResponse.json(
      { error: 'Failed to get lesson context' },
      { status: 500 }
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
      return NextResponse.json(
        { error: 'Session ID and Lesson ID required' },
        { status: 400 }
      )
    }

    // Create or update AI interaction session with lesson context (subjectCode stores lesson reference)
    const [tutoringSession] = await drizzleDb
      .update(aIInteractionSession)
      .set({ subjectCode: lessonId })
      .where(eq(aIInteractionSession.id, String(sessionId)))
      .returning()

    return NextResponse.json({ success: true, session: tutoringSession ?? null })
  } catch (error) {
    console.error('Link session to lesson error:', error)
    return NextResponse.json(
      { error: 'Failed to link session to lesson' },
      { status: 500 }
    )
  }
}

export const GET = withAuth(getHandler)
export const POST = withAuth(postHandler)
