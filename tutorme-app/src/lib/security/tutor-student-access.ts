import { and, eq } from 'drizzle-orm'
import { drizzleDb } from '@/lib/db/drizzle'
import { course, courseEnrollment } from '@/lib/db/schema'

export async function tutorHasStudent(tutorId: string, studentId: string): Promise<boolean> {
  const [row] = await drizzleDb
    .select({ enrollmentId: courseEnrollment.enrollmentId })
    .from(courseEnrollment)
    .innerJoin(course, eq(course.courseId, courseEnrollment.courseId))
    .where(and(eq(course.creatorId, tutorId), eq(courseEnrollment.studentId, studentId)))
    .limit(1)
  return !!row
}

export async function tutorOwnsCourse(tutorId: string, courseId: string): Promise<boolean> {
  const [row] = await drizzleDb
    .select({ courseId: course.courseId })
    .from(course)
    .where(and(eq(course.courseId, courseId), eq(course.creatorId, tutorId)))
    .limit(1)
  return !!row
}
