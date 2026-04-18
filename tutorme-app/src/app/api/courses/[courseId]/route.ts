/**
 * Course Detail API
 * GET: Get details for a specific course, including enrollment status
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/lib/api/middleware'
import { drizzleDb } from '@/lib/db/drizzle'
import { course, courseLesson, courseEnrollment } from '@/lib/db/schema'
import { eq, and, sql } from 'drizzle-orm'
import { getParamAsync } from '@/lib/api/params'

export const GET = withAuth(
  async (req: NextRequest, session, context) => {
    const courseId = await getParamAsync(context.params, 'courseId')

    if (!courseId) {
      return NextResponse.json({ error: 'Course ID is required' }, { status: 400 })
    }

    const [courseRow] = await drizzleDb
      .select()
      .from(course)
      .where(eq(course.courseId, courseId))
      .limit(1)

    if (!courseRow) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 })
    }

    const [lessonCount] = await drizzleDb
      .select({ count: sql<number>`count(*)::int` })
      .from(courseLesson)
      .where(eq(courseLesson.courseId, courseId))

    const [enrollmentRow] = await drizzleDb
      .select({ enrollmentId: courseEnrollment.enrollmentId })
      .from(courseEnrollment)
      .where(
        and(
          eq(courseEnrollment.studentId, session.user.id),
          eq(courseEnrollment.courseId, courseId)
        )
      )
      .limit(1)

    const detail = {
      id: courseRow.courseId,
      name: courseRow.name,
      subject: courseRow.categories?.[0] || 'general',
      description: courseRow.description,
      difficulty: 'intermediate',
      estimatedHours: 0,
      price: courseRow.isFree ? 0 : courseRow.price,
      currency: courseRow.currency,
      modulesCount: 0,
      lessonsCount: lessonCount?.count ?? 0,
      enrolled: !!enrollmentRow,
    }

    return NextResponse.json(detail)
  },
  { role: 'STUDENT' }
)
