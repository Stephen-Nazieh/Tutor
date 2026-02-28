/**
 * GET /api/tutor/courses/[id]/enrollments
 * List students enrolled in this course with details. Tutor-only.
 */

import { NextRequest, NextResponse } from 'next/server'
import { eq, desc } from 'drizzle-orm'
import { withAuth, NotFoundError } from '@/lib/api/middleware'
import { getParamAsync } from '@/lib/api/params'
import { drizzleDb } from '@/lib/db/drizzle'
import { curriculum, curriculumEnrollment, user, profile, courseBatch } from '@/lib/db/schema'

export const GET = withAuth(async (req: NextRequest, session, context) => {
  const id = await getParamAsync(context?.params, 'id')
  if (!id) {
    return NextResponse.json({ error: 'Course ID required' }, { status: 400 })
  }

  const [course] = await drizzleDb
    .select({ id: curriculum.id, creatorId: curriculum.creatorId })
    .from(curriculum)
    .where(eq(curriculum.id, id))
    .limit(1)

  if (!course) throw new NotFoundError('Course not found')

  const enrollmentsData = await drizzleDb
    .select({
      enrollment: curriculumEnrollment,
      studentUser: user,
      studentProfile: profile,
      batch: courseBatch,
    })
    .from(curriculumEnrollment)
    .innerJoin(user, eq(user.id, curriculumEnrollment.studentId))
    .leftJoin(profile, eq(profile.userId, user.id))
    .leftJoin(courseBatch, eq(courseBatch.id, curriculumEnrollment.batchId))
    .where(eq(curriculumEnrollment.curriculumId, id))
    .orderBy(desc(curriculumEnrollment.enrolledAt))

  const list = enrollmentsData.map((row) => ({
    id: row.enrollment.id,
    studentId: row.enrollment.studentId,
    studentName: row.studentProfile?.name ?? row.studentUser.email ?? 'Unknown',
    studentEmail: row.studentUser.email,
    batchId: row.enrollment.batchId,
    batchName: row.batch?.name ?? null,
    enrolledAt: row.enrollment.enrolledAt,
    lastActivity: row.enrollment.lastActivity,
    lessonsCompleted: row.enrollment.lessonsCompleted,
    completedAt: row.enrollment.completedAt,
  }))

  return NextResponse.json({ enrollments: list })
}, { role: 'TUTOR' })
