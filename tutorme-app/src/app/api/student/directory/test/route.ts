import { NextResponse } from 'next/server'
import { drizzleDb } from '@/lib/db/drizzle'
import { courseEnrollment, course, profile } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

export const dynamic = 'force-dynamic'

export async function GET() {
  const enrollments = await drizzleDb
    .select({
      studentId: courseEnrollment.studentId,
      courseId: course.courseId,
      courseName: course.name,
      tutorName: profile.name,
    })
    .from(courseEnrollment)
    .innerJoin(course, eq(courseEnrollment.courseId, course.courseId))
    .leftJoin(profile, eq(course.creatorId, profile.userId))
    .limit(5)

  return NextResponse.json({ enrollments })
}
