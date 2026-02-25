/**
 * Lesson API Routes
 * GET: Get lesson details
 * POST: Start/resume lesson session
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth, withCsrf, NotFoundError, ValidationError } from '@/lib/api/middleware'
import { startLesson, getLessonContent, getNextLesson } from '@/lib/curriculum/lesson-controller'
import { db } from '@/lib/db'

export const GET = withAuth(async (req, session, context: any) => {
  const params = await context?.params;
  const { lessonId } = await params
  const { searchParams } = new URL(req.url)
  const action = searchParams.get('action')

  // Get lesson content
  const lesson = await getLessonContent(lessonId)

  if (action === 'next') {
    // Get curriculum ID from lesson
    const lessonRecord = await db.curriculumLesson.findUnique({
      where: { id: lessonId },
      include: { module: true }
    })

    if (!lessonRecord) {
      throw new NotFoundError('Lesson not found')
    }

    const nextLesson = await getNextLesson(session.user.id, lessonRecord.module.curriculumId)
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
