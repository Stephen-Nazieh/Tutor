import { NextResponse } from 'next/server'
import { eq } from 'drizzle-orm'
import { withAuth } from '@/lib/api/middleware'
import { drizzleDb } from '@/lib/db/drizzle'
import { courseEnrollment, user, profile } from '@/lib/db/schema'

export const GET = withAuth(
  async (_req, session, context) => {
    const tutorId = session.user.id
    
    const safeUrl = _req.nextUrl?.href || _req.url || ''
    const match = safeUrl.match(/\/courses\/([^/]+)\/enrollments/)
    const courseId = match ? match[1] : ''

    if (!courseId || courseId === 'undefined' || courseId === 'null') {
      return NextResponse.json({ error: 'Course ID is required' }, { status: 400 })
    }

    const enrollments = await drizzleDb
      .select({
        enrollmentId: courseEnrollment.enrollmentId,
        studentId: courseEnrollment.studentId,
        enrolledAt: courseEnrollment.enrolledAt,
        lessonsCompleted: courseEnrollment.lessonsCompleted,
        studentName: profile.name,
        studentEmail: user.email,
      })
      .from(courseEnrollment)
      .innerJoin(user, eq(user.userId, courseEnrollment.studentId))
      .innerJoin(profile, eq(profile.userId, user.userId))
      .where(eq(courseEnrollment.courseId, courseId))
      .orderBy(courseEnrollment.enrolledAt)

    return NextResponse.json({ enrollments })
  },
  { role: 'TUTOR' }
)
