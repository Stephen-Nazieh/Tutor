/**
 * Curriculum Enrollment API
 * POST: Enroll student in a curriculum
 */

import { NextResponse } from 'next/server'
import { withAuth, withCsrf, NotFoundError, withRateLimitPreset } from '@/lib/api/middleware'
import { drizzleDb } from '@/lib/db/drizzle'
import {
  curriculum,
  curriculumModule,
  curriculumLesson,
  courseBatch,
  curriculumEnrollment,
  curriculumProgress,
} from '@/lib/db/schema'
import { eq, and, inArray } from 'drizzle-orm'
import { sql } from 'drizzle-orm'

export const POST = withCsrf(withAuth(async (req, session, context: any) => {
  const params = await context?.params
  const { response: rateLimitResponse } = await withRateLimitPreset(req, 'enroll')
  if (rateLimitResponse) return rateLimitResponse

  const { curriculumId } = await params
  const body = await req.json().catch(() => ({}))
  const rawBatchIdFromBody = typeof body?.batchId === 'string' ? body.batchId : null
  const rawBatchIdFromQuery = req.nextUrl.searchParams.get('batch')
  const requestedBatchId = rawBatchIdFromBody || rawBatchIdFromQuery

  const [curriculumRow] = await drizzleDb
    .select()
    .from(curriculum)
    .where(eq(curriculum.id, curriculumId))
    .limit(1)

  if (!curriculumRow) {
    throw new NotFoundError('Curriculum not found')
  }

  let validatedBatchId: string | null = null
  if (requestedBatchId) {
    const [batch] = await drizzleDb
      .select({ id: courseBatch.id })
      .from(courseBatch)
      .where(
        and(
          eq(courseBatch.id, requestedBatchId),
          eq(courseBatch.curriculumId, curriculumId)
        )
      )
      .limit(1)
    if (!batch) {
      throw new NotFoundError('Course variant not found')
    }
    validatedBatchId = batch.id
  }

  const moduleRows = await drizzleDb
    .select({ id: curriculumModule.id })
    .from(curriculumModule)
    .where(eq(curriculumModule.curriculumId, curriculumId))
  const moduleIds = moduleRows.map((m) => m.id)
  const totalLessons =
    moduleIds.length === 0
      ? 0
      : (
          await drizzleDb
            .select({ count: sql<number>`count(*)::int` })
            .from(curriculumLesson)
            .where(inArray(curriculumLesson.moduleId, moduleIds))
        )[0]?.count ?? 0

  const [existingProgress] = await drizzleDb
    .select()
    .from(curriculumProgress)
    .where(
      and(
        eq(curriculumProgress.studentId, session.user.id),
        eq(curriculumProgress.curriculumId, curriculumId)
      )
    )
    .limit(1)

  const [existingEnrollment] = await drizzleDb
    .select()
    .from(curriculumEnrollment)
    .where(
      and(
        eq(curriculumEnrollment.studentId, session.user.id),
        eq(curriculumEnrollment.curriculumId, curriculumId)
      )
    )
    .limit(1)

  if (existingEnrollment) {
    await drizzleDb
      .update(curriculumEnrollment)
      .set({
        enrollmentSource: 'signup',
        ...(validatedBatchId ? { batchId: validatedBatchId } : {}),
      })
      .where(
        and(
          eq(curriculumEnrollment.studentId, session.user.id),
          eq(curriculumEnrollment.curriculumId, curriculumId)
        )
      )
  } else {
    await drizzleDb.insert(curriculumEnrollment).values({
      id: crypto.randomUUID(),
      studentId: session.user.id,
      curriculumId,
      batchId: validatedBatchId,
      lessonsCompleted: 0,
      enrollmentSource: 'signup',
    })
  }

  const [enrollment] = await drizzleDb
    .select()
    .from(curriculumEnrollment)
    .where(
      and(
        eq(curriculumEnrollment.studentId, session.user.id),
        eq(curriculumEnrollment.curriculumId, curriculumId)
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

  await drizzleDb.insert(curriculumProgress).values({
    id: crypto.randomUUID(),
    studentId: session.user.id,
    curriculumId,
    lessonsCompleted: 0,
    totalLessons,
    isCompleted: false,
  })

  const [progress] = await drizzleDb
    .select()
    .from(curriculumProgress)
    .where(
      and(
        eq(curriculumProgress.studentId, session.user.id),
        eq(curriculumProgress.curriculumId, curriculumId)
      )
    )
    .limit(1)

  return NextResponse.json({
    success: true,
    message: 'Enrolled successfully',
    progress: progress!,
  })
}, { role: 'STUDENT' }))
