/**
 * Lesson Session API
 * POST: Get or create lesson session for a student
 */

import { NextResponse } from 'next/server'
import { withAuth, withCsrf, NotFoundError } from '@/lib/api/middleware'
import { drizzleDb } from '@/lib/db/drizzle'
import { curriculumLesson, lessonSession } from '@/lib/db/schema'
import { eq, and } from 'drizzle-orm'
import { startLesson } from '@/lib/curriculum/lesson-controller'

export const POST = withCsrf(withAuth(async (req, session, context: any) => {
  const params = await context?.params
  const { lessonId } = await params

  const [lesson] = await drizzleDb
    .select()
    .from(curriculumLesson)
    .where(eq(curriculumLesson.id, lessonId))
    .limit(1)

  if (!lesson) {
    throw new NotFoundError('Lesson not found')
  }

  const [existing] = await drizzleDb
    .select()
    .from(lessonSession)
    .where(
      and(
        eq(lessonSession.studentId, session.user.id),
        eq(lessonSession.lessonId, lessonId)
      )
    )
    .limit(1)

  const sessionData = existing ?? await startLesson(session.user.id, lessonId)

  return NextResponse.json({ session: sessionData })
}, { role: 'STUDENT' }))
