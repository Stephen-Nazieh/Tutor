/**
 * GET /api/tutor/courses/enrolled
 * List tutor courses that have enrolled students.
 */

import { NextResponse } from 'next/server'
import { desc, eq, sql, count } from 'drizzle-orm'
import { withAuth } from '@/lib/api/middleware'
import { drizzleDb } from '@/lib/db/drizzle'
import { curriculum, curriculumEnrollment, liveSession } from '@/lib/db/schema'

export const GET = withAuth(
  async (_req, session) => {
    const tutorId = session?.user?.id
    if (!tutorId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const enrollmentCount = sql<number>`count(${curriculumEnrollment.id})`.as('enrollmentCount')

    const courses = await drizzleDb
      .select({
        id: curriculum.id,
        name: curriculum.name,
        subject: curriculum.subject,
        gradeLevel: curriculum.gradeLevel,
        isPublished: curriculum.isPublished,
        price: curriculum.price,
        currency: curriculum.currency,
        enrollmentCount,
      })
      .from(curriculum)
      .innerJoin(curriculumEnrollment, eq(curriculumEnrollment.curriculumId, curriculum.id))
      .where(eq(curriculum.creatorId, tutorId))
      .groupBy(
        curriculum.id,
        curriculum.name,
        curriculum.subject,
        curriculum.gradeLevel,
        curriculum.isPublished,
        curriculum.price,
        curriculum.currency
      )
      .orderBy(desc(enrollmentCount))

    // Get session counts for each course
    const courseIds = courses.map(c => c.id)
    let sessionCounts: { curriculumId: string; count: number }[] = []

    if (courseIds.length > 0) {
      const sessions = await drizzleDb
        .select({
          curriculumId: liveSession.curriculumId,
          count: count(liveSession.id),
        })
        .from(liveSession)
        .where(eq(liveSession.tutorId, tutorId))
        .groupBy(liveSession.curriculumId)

      sessionCounts = sessions.map(s => ({
        curriculumId: s.curriculumId ?? '',
        count: s.count,
      }))
    }

    const coursesWithSessionCount = courses.map(course => ({
      ...course,
      sessionCount: sessionCounts.find(s => s.curriculumId === course.id)?.count ?? 0,
    }))

    return NextResponse.json({ courses: coursesWithSessionCount })
  },
  { role: 'TUTOR' }
)
