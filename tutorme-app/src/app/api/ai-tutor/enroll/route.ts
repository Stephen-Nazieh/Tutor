/**
 * AI Tutor Enroll API
 * Enroll in a new AI tutor subject
 */

import { NextResponse } from 'next/server'
import { withAuth, withCsrf, ValidationError } from '@/lib/api/middleware'
import { drizzleDb } from '@/lib/db/drizzle'
import { aITutorEnrollment, courseEnrollment, course } from '@/lib/db/schema'
import { eq, and } from 'drizzle-orm'

export const POST = withCsrf(
  withAuth(
    async (req, session) => {
      const { subject, courseId } = await req.json()

      if (!subject) {
        throw new ValidationError('Subject is required')
      }

      const [existing] = await drizzleDb
        .select()
        .from(aITutorEnrollment)
        .where(
          and(
            eq(aITutorEnrollment.studentId, session.user.id),
            eq(aITutorEnrollment.subjectCode, subject)
          )
        )
        .limit(1)

      if (existing) {
        if (existing.status !== 'active') {
          await drizzleDb
            .update(aITutorEnrollment)
            .set({ status: 'active' })
            .where(eq(aITutorEnrollment.enrollmentId, existing.enrollmentId))
          const [updated] = await drizzleDb
            .select()
            .from(aITutorEnrollment)
            .where(eq(aITutorEnrollment.enrollmentId, existing.enrollmentId))
            .limit(1)
          return NextResponse.json({
            enrollment: updated!,
            message: 'Enrollment reactivated',
          })
        }
        return NextResponse.json({ error: 'Already enrolled in this subject' }, { status: 400 })
      }

      const enrollmentId = crypto.randomUUID()
      await drizzleDb.insert(aITutorEnrollment).values({
        enrollmentId: enrollmentId,
        studentId: session.user.id,
        subjectCode: subject,
        status: 'active',
        totalSessions: 0,
        totalMinutes: 0,
      })

      if (courseId) {
        const [hasEnrollment] = await drizzleDb
          .select()
          .from(courseEnrollment)
          .where(
            and(
              eq(courseEnrollment.studentId, session.user.id),
              eq(courseEnrollment.courseId, courseId)
            )
          )
          .limit(1)
        if (!hasEnrollment) {
          await drizzleDb.insert(courseEnrollment).values({
            enrollmentId: crypto.randomUUID(),
            studentId: session.user.id,
            courseId: courseId,
            lessonsCompleted: 0,
            enrollmentSource: 'ai-tutor',
          })
        }
      }

      let courseInfo = null
      if (courseId) {
        const [courseRow] = await drizzleDb
          .select({
            name: course.name,
            categories: course.categories,
            description: course.description,
          })
          .from(course)
          .where(eq(course.courseId, courseId))
          .limit(1)
        courseInfo = courseRow
          ? {
              name: courseRow.name,
              categories: courseRow.categories ?? [],
              description: courseRow.description,
            }
          : null
      }

      const [enrollment] = await drizzleDb
        .select()
        .from(aITutorEnrollment)
        .where(eq(aITutorEnrollment.enrollmentId, enrollmentId))
        .limit(1)

      return NextResponse.json({
        enrollment: {
          id: enrollment!.enrollmentId,
          subjectCode: enrollment!.subjectCode,
          status: enrollment!.status,
          course: courseInfo,
        },
        message: 'Successfully enrolled in AI Tutor',
      })
    },
    { role: 'STUDENT' }
  )
)
