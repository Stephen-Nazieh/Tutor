/**
 * GET: List batches for this course. POST: Create a batch. Tutor-only.
 */

import { NextRequest, NextResponse } from 'next/server'
import { eq, asc, sql } from 'drizzle-orm'
import {
  withAuth,
  withCsrf,
  ValidationError,
  NotFoundError,
  ForbiddenError,
} from '@/lib/api/middleware'
import { drizzleDb } from '@/lib/db/drizzle'
import { course, courseBatch, courseEnrollment } from '@/lib/db/schema'
import { getParamAsync } from '@/lib/api/params'
import { sanitizeHtmlWithMax } from '@/lib/security/sanitize'
import crypto from 'crypto'

export const GET = withAuth(
  async (req: NextRequest, session, context) => {
    const id = await getParamAsync(context?.params, 'id')
    if (!id) {
      return NextResponse.json({ error: 'Course ID required' }, { status: 400 })
    }

    const [courseRow] = await drizzleDb
      .select()
      .from(course)
      .where(eq(course.courseId, id))
      .limit(1)

    if (!courseRow) throw new NotFoundError('Course not found')

    // Fetch batches and enrollment counts in 2 queries instead of N+1
    const batches = await drizzleDb
      .select()
      .from(courseBatch)
      .where(eq(courseBatch.courseId, id))
      .orderBy(asc(courseBatch.order))

    const enrollmentCounts = await drizzleDb
      .select({
        batchId: courseEnrollment.batchId,
        count: sql<number>`count(*)::int`,
      })
      .from(courseEnrollment)
      .where(eq(courseEnrollment.courseId, id))
      .groupBy(courseEnrollment.batchId)

    const countByBatch = new Map(
      enrollmentCounts.filter(row => row.batchId != null).map(row => [row.batchId!, row.count])
    )

    const batchesWithStats = batches.map(b => ({
      id: b.batchId,
      name: b.name,
      startDate: b.startDate,
      order: b.order,
      difficulty: b.difficulty ?? null,
      schedule: Array.isArray(b.schedule) ? b.schedule : [],
      enrollmentCount: countByBatch.get(b.batchId) ?? 0,
      joinLink: b.meetingUrl ?? `${req.nextUrl.origin}/curriculum/${id}?batch=${b.batchId}`,
    }))

    return NextResponse.json({ batches: batchesWithStats })
  },
  { role: 'TUTOR' }
)

export const POST = withCsrf(
  withAuth(
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

      // Verify the tutor owns this course
      if (courseRow.creatorId !== session.user.id) {
        throw new ForbiddenError('You do not own this course')
      }

      const body = await req.json().catch(() => ({}))
      const name = typeof body.name === 'string' ? sanitizeHtmlWithMax(body.name.trim(), 200) : ''
      const startDate = body.startDate ? new Date(body.startDate) : null

      if (!name) throw new ValidationError('Batch name is required')

      const [result] = await drizzleDb
        .select({ maxValue: sql<number>`coalesce(max(${courseBatch.order}), -1)::int` })
        .from(courseBatch)
        .where(eq(courseBatch.courseId, id))

      const maxOrder = Number(result?.maxValue ?? -1)

      const [batch] = await drizzleDb
        .insert(courseBatch)
        .values({
          batchId: crypto.randomUUID(),
          courseId: id,
          name,
          startDate,
          order: maxOrder + 1,
          isLive: true,
          maxStudents: 50,
        })
        .returning()

      return NextResponse.json({
        batch: {
          id: batch.batchId,
          name: batch.name,
          startDate: batch.startDate,
          order: batch.order,
        },
        message: 'Batch created.',
      })
    },
    { role: 'TUTOR' }
  )
)
