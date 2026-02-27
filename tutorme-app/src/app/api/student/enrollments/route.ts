/**
 * Student Enrollment API
 * POST: Enroll student in a curriculum
 * GET: List student's enrollments
 */

import { NextResponse } from 'next/server'
import { withAuth, NotFoundError } from '@/lib/api/middleware'
import { drizzleDb } from '@/lib/db/drizzle'
import {
  curriculum,
  curriculumModule,
  curriculumLesson,
  curriculumEnrollment,
  curriculumProgress,
  payment,
} from '@/lib/db/schema'
import { eq, and, inArray, desc } from 'drizzle-orm'
import { sql } from 'drizzle-orm'

export const POST = withAuth(async (req, session) => {
  const body = await req.json().catch(() => ({}))
  const { curriculumId } = body

  if (!curriculumId || typeof curriculumId !== 'string') {
    return NextResponse.json(
      { error: 'Curriculum ID is required' },
      { status: 400 }
    )
  }

  const [curriculumRow] = await drizzleDb
    .select()
    .from(curriculum)
    .where(eq(curriculum.id, curriculumId))
    .limit(1)

  if (!curriculumRow) {
    throw new NotFoundError('Course not found')
  }

  if (curriculumRow.price && curriculumRow.price > 0) {
    const payments = await drizzleDb
      .select()
      .from(payment)
      .where(inArray(payment.status, ['COMPLETED', 'PENDING']))

    const hasPayment = payments.some((p) => {
      const meta = p.metadata as { curriculumId?: string; studentId?: string } | null
      return meta?.curriculumId === curriculumId && meta?.studentId === session.user.id
    })

    if (!hasPayment) {
      return NextResponse.json(
        {
          error: 'Payment required',
          requiresPayment: true,
          amount: curriculumRow.price,
          currency: curriculumRow.currency || 'USD',
        },
        { status: 402 }
      )
    }
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

  if (existingProgress) {
    return NextResponse.json({
      success: true,
      message: 'Already enrolled',
      progress: existingProgress,
    })
  }

  const enrollmentId = crypto.randomUUID()
  const progressId = crypto.randomUUID()

  await drizzleDb.insert(curriculumEnrollment).values({
    id: enrollmentId,
    studentId: session.user.id,
    curriculumId,
    lessonsCompleted: 0,
    enrollmentSource: 'browse',
  })

  await drizzleDb.insert(curriculumProgress).values({
    id: progressId,
    studentId: session.user.id,
    curriculumId,
    lessonsCompleted: 0,
    totalLessons,
    isCompleted: false,
  })

  const [enrollment] = await drizzleDb
    .select()
    .from(curriculumEnrollment)
    .where(eq(curriculumEnrollment.id, enrollmentId))
    .limit(1)
  const [progress] = await drizzleDb
    .select()
    .from(curriculumProgress)
    .where(eq(curriculumProgress.id, progressId))
    .limit(1)

  return NextResponse.json({
    success: true,
    message: 'Enrolled successfully',
    enrollment: enrollment!,
    progress: progress!,
  })
})

export const GET = withAuth(async (req, session) => {
  const enrollmentsRows = await drizzleDb
    .select({
      enrollment: curriculumEnrollment,
      curriculumId: curriculum.id,
      curriculumName: curriculum.name,
      curriculumSubject: curriculum.subject,
      curriculumDescription: curriculum.description,
      curriculumDifficulty: curriculum.difficulty,
      curriculumEstimatedHours: curriculum.estimatedHours,
      curriculumIsPublished: curriculum.isPublished,
    })
    .from(curriculumEnrollment)
    .innerJoin(curriculum, eq(curriculumEnrollment.curriculumId, curriculum.id))
    .where(eq(curriculumEnrollment.studentId, session.user.id))
    .orderBy(desc(curriculumEnrollment.enrolledAt))

  const moduleCounts = await Promise.all(
    enrollmentsRows.map(async (row) => {
      const [{ count }] = await drizzleDb
        .select({ count: sql<number>`count(*)::int` })
        .from(curriculumModule)
        .where(eq(curriculumModule.curriculumId, row.curriculumId))
      return { curriculumId: row.curriculumId, moduleCount: count ?? 0 }
    })
  )
  const moduleCountByCurriculum = new Map(moduleCounts.map((m) => [m.curriculumId, m.moduleCount]))

  const enrollments = enrollmentsRows.map((row) => ({
    ...row.enrollment,
    curriculum: {
      id: row.curriculumId,
      name: row.curriculumName,
      subject: row.curriculumSubject,
      description: row.curriculumDescription,
      difficulty: row.curriculumDifficulty,
      estimatedHours: row.curriculumEstimatedHours,
      isPublished: row.curriculumIsPublished,
      _count: {
        modules: moduleCountByCurriculum.get(row.curriculumId) ?? 0,
      },
    },
  }))

  return NextResponse.json({ enrollments })
})
