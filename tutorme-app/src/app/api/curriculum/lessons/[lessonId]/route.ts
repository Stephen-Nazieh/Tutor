/**
 * Lesson API Routes
 * GET: Get lesson details
 * POST: Start/resume lesson session
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth, withCsrf, NotFoundError, ValidationError } from '@/lib/api/middleware'
import { startLesson, getLessonContent, getNextLesson } from '@/lib/curriculum/lesson-controller'
import { drizzleDb } from '@/lib/db/drizzle'
import { curriculumLesson, curriculumModule } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

export const GET = withAuth(async (req, session, context: any) => {
  const params = await context?.params
  const { lessonId } = await params
  const { searchParams } = new URL(req.url)
  const action = searchParams.get('action')

  const lesson = await getLessonContent(lessonId)

  if (action === 'next') {
    const [lessonRecord] = await drizzleDb
      .select()
      .from(curriculumLesson)
      .where(eq(curriculumLesson.id, lessonId))
      .limit(1)
    if (!lessonRecord) {
      throw new NotFoundError('Lesson not found')
    }
    const [moduleRow] = await drizzleDb
      .select({ curriculumId: curriculumModule.curriculumId })
      .from(curriculumModule)
      .where(eq(curriculumModule.id, lessonRecord.moduleId))
      .limit(1)
    if (!moduleRow) {
      throw new NotFoundError('Module not found')
    }
    const nextLesson = await getNextLesson(session.user.id, moduleRow.curriculumId)
    return NextResponse.json({ nextLesson })
  }

  return NextResponse.json({ lesson })
}, { role: 'STUDENT' })

export const POST = withCsrf(withAuth(async (req, session, context: any) => {
  const params = await context?.params;
  const { lessonId } = await params
  const body = await req.json()
  const { action = 'start' } = body

  if (action === 'start') {
    // Start or resume lesson session
    const lessonSession = await startLesson(session.user.id, lessonId)
    
    // Get lesson content for initial response
    const lesson = await getLessonContent(lessonId)

    return NextResponse.json({
      success: true,
      session: lessonSession,
      lesson: {
        title: lesson.title,
        objectives: lesson.learningObjectives,
        concepts: lesson.keyConcepts
      }
    })
  }

  throw new ValidationError('Invalid action')
}, { role: 'STUDENT' }))
