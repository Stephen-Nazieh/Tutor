/**
 * GET /api/tutor/courses/enrolled
 * List tutor courses that have enrolled students.
 */

import { NextResponse } from 'next/server'
import { desc, eq, sql } from 'drizzle-orm'
import { withAuth } from '@/lib/api/middleware'
import { drizzleDb } from '@/lib/db/drizzle'
import { curriculum, curriculumEnrollment } from '@/lib/db/schema'

export const GET = withAuth(
  async (_req, session) => {
    const tutorId = session?.user?.id
    if (!tutorId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const enrollmentCount = sql<number>`count(${curriculumEnrollment.id})`.as(
      'enrollmentCount'
    )

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

    return NextResponse.json({ courses })
  },
  { role: 'TUTOR' }
)
