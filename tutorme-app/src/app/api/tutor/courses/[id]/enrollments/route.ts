/**
 * GET /api/tutor/courses/[id]/enrollments
 * List students enrolled in this course with details. Tutor-only.
 */

import { NextRequest, NextResponse } from 'next/server'
import { eq, desc } from 'drizzle-orm'
import { withAuth, NotFoundError } from '@/lib/api/middleware'
import { getParamAsync } from '@/lib/api/params'
import { drizzleDb } from '@/lib/db/drizzle'
import { course, courseEnrollment, user, profile, courseBatch } from '@/lib/db/schema'

export const GET = withAuth(
  async (req: NextRequest, session, context) => {
    const id = await getParamAsync(context?.params, 'id')
    if (!id) {
      return NextResponse.json({ error: 'Course ID required' }, { status: 400 })
    }

    const [courseRow] = await drizzleDb
      .select({ courseId: course.courseId, creatorId: course.creatorId })
      .from(course)
      .where(eq(course.courseId, id))
      .limit(1)

    if (!courseRow) throw new NotFoundError('Course not found')

    const enrollmentsData = await drizzleDb
      .select({
        enrollment: courseEnrollment,
        studentUser: user,
        studentProfile: profile,
        batch: courseBatch,
      })
      .from(courseEnrollment)
      .innerJoin(user, eq(user.userId, courseEnrollment.studentId))
      .leftJoin(profile, eq(profile.userId, user.userId))
      .leftJoin(courseBatch, eq(courseBatch.batchId, courseEnrollment.batchId))
      .where(eq(courseEnrollment.courseId, id))
      .orderBy(desc(courseEnrollment.enrolledAt))

    const list = enrollmentsData.map(row => ({
      id: row.enrollment.enrollmentId,
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
  },
  { role: 'TUTOR' }
)
