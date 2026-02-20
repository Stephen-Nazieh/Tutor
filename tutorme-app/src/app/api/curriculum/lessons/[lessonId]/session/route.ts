/**
 * Lesson Session API
 * POST: Get or create lesson session for a student
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth, withCsrf, NotFoundError } from '@/lib/api/middleware'
import { db } from '@/lib/db'
import { startLesson } from '@/lib/curriculum/lesson-controller'

export const POST = withCsrf(withAuth(async (req, session, { params }) => {
  const { lessonId } = await params

  // Verify lesson exists
  const lesson = await db.curriculumLesson.findUnique({
    where: { id: lessonId }
  })

  if (!lesson) {
    throw new NotFoundError('Lesson not found')
  }

  // Try to find existing session
  let lessonSession = await db.lessonSession.findUnique({
    where: {
      studentId_lessonId: {
        studentId: session.user.id,
        lessonId
      }
    }
  })

  // Create new session if none exists
  if (!lessonSession) {
    lessonSession = await startLesson(session.user.id, lessonId)
  }

  return NextResponse.json({ session: lessonSession })
}, { role: 'STUDENT' }))
