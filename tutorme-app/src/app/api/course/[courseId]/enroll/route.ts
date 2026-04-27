/**
 * Course Enrollment API
 * POST: Enroll the current student in a specific course
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth, withCsrf, ValidationError } from '@/lib/api/middleware'
import { drizzleDb } from '@/lib/db/drizzle'
import { course, courseEnrollment, courseLesson, courseProgress, payment } from '@/lib/db/schema'
import { eq, and, inArray, sql } from 'drizzle-orm'
import { getParamAsync } from '@/lib/api/params'

export const POST = withCsrf(
  withAuth(async (req: NextRequest, session, context) => {
    const courseId = await getParamAsync(context.params, 'courseId')

    if (!courseId) {
      throw new ValidationError('Course ID is required')
    }

    const body = await req.json().catch(() => ({}))
    const { startDate } = body

    const [courseRow] = await drizzleDb
      .select()
      .from(course)
      .where(eq(course.courseId, courseId))
      .limit(1)

    if (!courseRow) {
      throw new ValidationError('Course not found')
    }

    // Payment check for paid courses
    if (!courseRow.isFree && courseRow.price && courseRow.price > 0) {
      const [paymentRow] = await drizzleDb
        .select({ paymentId: payment.paymentId })
        .from(payment)
        .where(
          and(
            inArray(payment.status, ['COMPLETED', 'PENDING']),
            sql`${payment.metadata}->>'courseId' = ${courseId}`,
            sql`${payment.metadata}->>'studentId' = ${session.user.id}`
          )
        )
        .limit(1)

      if (!paymentRow) {
        return NextResponse.json(
          {
            error: 'Payment required',
            requiresPayment: true,
            amount: courseRow.price,
            currency: courseRow.currency || 'USD',
          },
          { status: 402 }
        )
      }
    }

    const totalLessons =
      (
        await drizzleDb
          .select({ count: sql<number>`count(*)::int` })
          .from(courseLesson)
          .where(eq(courseLesson.courseId, courseId))
      )[0]?.count ?? 0

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

    const [existingProgress] = await drizzleDb
      .select()
      .from(courseProgress)
      .where(
        and(eq(courseProgress.studentId, session.user.id), eq(courseProgress.courseId, courseId))
      )
      .limit(1)

    if (existingEnrollment || existingProgress) {
      return NextResponse.json({
        success: true,
        message: 'Already enrolled',
        enrollment: existingEnrollment,
        progress: existingProgress,
      })
    }

    const enrollmentId = crypto.randomUUID()
    const progressId = crypto.randomUUID()

    await drizzleDb.transaction(async tx => {
      await tx.insert(courseEnrollment).values({
        enrollmentId,
        studentId: session.user.id,
        courseId,
        startDate: startDate ? new Date(startDate) : undefined,
        lessonsCompleted: 0,
        enrollmentSource: 'browse',
      })

      await tx.insert(courseProgress).values({
        progressId,
        studentId: session.user.id,
        courseId,
        lessonsCompleted: 0,
        totalLessons,
        isCompleted: false,
      })
    })

    const [enrollment] = await drizzleDb
      .select()
      .from(courseEnrollment)
      .where(eq(courseEnrollment.enrollmentId, enrollmentId))
      .limit(1)
    const [progress] = await drizzleDb
      .select()
      .from(courseProgress)
      .where(eq(courseProgress.progressId, progressId))
      .limit(1)

    return NextResponse.json({
      success: true,
      message: 'Enrolled successfully',
      enrollment: enrollment!,
      progress: progress!,
    })
  })
)
