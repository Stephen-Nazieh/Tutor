/**
 * GET /api/tutor/courses/enrolled
 * List tutor courses that have enrolled students.
 */

import { NextResponse } from 'next/server'
import { desc, eq, sql, count, inArray, and } from 'drizzle-orm'
import { withAuth } from '@/lib/api/middleware'
import { drizzleDb } from '@/lib/db/drizzle'
import { course, courseEnrollment, liveSession } from '@/lib/db/schema'

export const GET = withAuth(
  async (_req, session) => {
    const tutorId = session?.user?.id
    if (!tutorId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const enrollmentCount = sql<number>`count(${courseEnrollment.enrollmentId})`.as(
      'enrollmentCount'
    )

    const courses = await drizzleDb
      .select({
        courseId: course.courseId,
        name: course.name,
        categories: course.categories,
        isPublished: course.isPublished,
        price: course.price,
        currency: course.currency,
        enrollmentCount,
      })
      .from(course)
      .innerJoin(courseEnrollment, eq(courseEnrollment.courseId, course.courseId))
      .where(and(eq(course.creatorId, tutorId), eq(course.isPublished, true)))
      .groupBy(
        course.courseId,
        course.name,
        course.categories,
        course.isPublished,
        course.price,
        course.currency
      )
      .orderBy(desc(enrollmentCount))

    // Get session counts for each course
    const courseIds = courses.map(c => c.courseId)
    let sessionCounts: { courseId: string; count: number }[] = []

    if (courseIds.length > 0) {
      const sessions = await drizzleDb
        .select({
          courseId: liveSession.courseId,
          count: count(liveSession.sessionId),
        })
        .from(liveSession)
        .where(
          and(
            eq(liveSession.tutorId, tutorId),
            inArray(liveSession.status, ['scheduled', 'active'])
          )
        )
        .groupBy(liveSession.courseId)

      sessionCounts = sessions.map(s => ({
        courseId: s.courseId ?? '',
        count: s.count,
      }))
    }

    const coursesWithSessionCount = courses.map(c => ({
      id: c.courseId,
      name: c.name,
      categories: c.categories,
      isPublished: c.isPublished,
      price: c.price,
      currency: c.currency,
      enrollmentCount: c.enrollmentCount,
      // Map categories to subject for backward compatibility
      subject: c.categories?.[0] ?? null,
      sessionCount: sessionCounts.find(s => s.courseId === c.courseId)?.count ?? 0,
    }))

    return NextResponse.json({ courses: coursesWithSessionCount })
  },
  { role: 'TUTOR' }
)
