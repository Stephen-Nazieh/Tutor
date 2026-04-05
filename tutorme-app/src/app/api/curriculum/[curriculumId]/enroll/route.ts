/**
 * Curriculum Enrollment API
 * POST: Enroll student in a curriculum
 */

import { NextResponse } from 'next/server'
import { withAuth, withCsrf, NotFoundError, withRateLimitPreset } from '@/lib/api/middleware'
import { getParamAsync } from '@/lib/api/params'
import { drizzleDb } from '@/lib/db/drizzle'
import {
  course,
  curriculumModule,
  courseLesson,
  courseBatch,
  courseEnrollment,
  courseProgress,
  profile,
} from '@/lib/db/schema'
import { eq, and, inArray } from 'drizzle-orm'
import { sql } from 'drizzle-orm'
import { notify } from '@/lib/notifications/notify'

export const POST = withCsrf(
  withAuth(
    async (req, session, context) => {
      const { response: rateLimitResponse } = await withRateLimitPreset(req, 'enroll')
      if (rateLimitResponse) return rateLimitResponse

      const courseId = await getParamAsync(context?.params, 'curriculumId')
      if (!courseId) {
        return NextResponse.json({ error: 'Curriculum ID required' }, { status: 400 })
      }
      const body = await req.json().catch(() => ({}))
      const rawBatchIdFromBody = typeof body?.batchId === 'string' ? body.batchId : null
      const rawBatchIdFromQuery = req.nextUrl.searchParams.get('batch')
      const requestedBatchId = rawBatchIdFromBody || rawBatchIdFromQuery
      const startDate = body?.startDate ? new Date(body.startDate) : undefined

      const [courseRow] = await drizzleDb
        .select()
        .from(course)
        .where(eq(course.courseId, courseId))
        .limit(1)

      if (!courseRow) {
        throw new NotFoundError('Curriculum not found')
      }

      let validatedBatchId: string | null = null
      if (requestedBatchId) {
        const [batch] = await drizzleDb
          .select({ batchId: courseBatch.batchId })
          .from(courseBatch)
          .where(and(eq(courseBatch.batchId, requestedBatchId), eq(courseBatch.courseId, courseId)))
          .limit(1)
        if (!batch) {
          throw new NotFoundError('Course variant not found')
        }
        validatedBatchId = batch.batchId
      }

      const moduleRows = await drizzleDb
        .select({ moduleId: curriculumModule.moduleId })
        .from(curriculumModule)
        .where(eq(curriculumModule.courseId, courseId))
      const moduleIds = moduleRows.map(m => m.moduleId)
      // Lessons are now stored in builderData JSON field, count is not directly queryable
      // We'll set totalLessons to 0 and let it be updated as student progresses
      const totalLessons = 0

      const [existingProgress] = await drizzleDb
        .select()
        .from(courseProgress)
        .where(
          and(eq(courseProgress.studentId, session.user.id), eq(courseProgress.courseId, courseId))
        )
        .limit(1)

      const [existingEnrollment] = await drizzleDb
        .select()
        .from(courseEnrollment)
        .where(
          and(
            eq(courseEnrollment.studentId, session.user.id),
            eq(courseEnrollment.courseId, courseId)
          )
        )
        .limit(1)

      if (existingEnrollment) {
        await drizzleDb
          .update(courseEnrollment)
          .set({
            enrollmentSource: 'signup',
            ...(startDate ? { startDate } : {}),
            ...(validatedBatchId ? { batchId: validatedBatchId } : {}),
          })
          .where(
            and(
              eq(courseEnrollment.studentId, session.user.id),
              eq(courseEnrollment.courseId, courseId)
            )
          )
      } else {
        await drizzleDb.insert(courseEnrollment).values({
          enrollmentId: crypto.randomUUID(),
          studentId: session.user.id,
          courseId,
          enrolledAt: new Date(),
          startDate,
          lessonsCompleted: 0,
          lastActivity: new Date(),
          enrollmentSource: 'signup',
        })
      }

      const [enrollment] = await drizzleDb
        .select()
        .from(courseEnrollment)
        .where(
          and(
            eq(courseEnrollment.studentId, session.user.id),
            eq(courseEnrollment.courseId, courseId)
          )
        )
        .limit(1)

      if (existingProgress) {
        return NextResponse.json({
          success: true,
          message: 'Already enrolled',
          progress: existingProgress,
          enrollment: enrollment!,
        })
      }

      await drizzleDb.insert(courseProgress).values({
        progressId: crypto.randomUUID(),
        studentId: session.user.id,
        courseId,
        lessonsCompleted: 0,
        totalLessons,
        isCompleted: false,
      })

      const [progress] = await drizzleDb
        .select()
        .from(courseProgress)
        .where(
          and(eq(courseProgress.studentId, session.user.id), eq(courseProgress.courseId, courseId))
        )
        .limit(1)

      // Notify the tutor about the new enrollment
      if (courseRow.creatorId) {
        const [studentProfile] = await drizzleDb
          .select({ name: profile.name })
          .from(profile)
          .where(eq(profile.userId, session.user.id))
          .limit(1)

        void notify({
          userId: courseRow.creatorId,
          type: 'enrollment',
          title: 'New Student Enrollment',
          message: `${studentProfile?.name || 'A new student'} has enrolled in your course "${courseRow.name}"`,
          data: {
            courseId,
            courseName: courseRow.name,
            studentId: session.user.id,
            studentName: studentProfile?.name,
          },
          actionUrl: `/tutor/courses/${courseId}/enrollments`,
        })
      }

      return NextResponse.json({
        success: true,
        message: 'Enrolled successfully',
        progress: progress!,
      })
    },
    { role: 'STUDENT' }
  )
)
