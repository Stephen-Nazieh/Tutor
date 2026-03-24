/**
 * GET: List batches for this course. POST: Create a batch. Tutor-only.
 */

import { NextRequest, NextResponse } from 'next/server'
import { eq, asc, sql } from 'drizzle-orm'
import { withAuth, withCsrf, ValidationError, NotFoundError, ForbiddenError } from '@/lib/api/middleware'
import { drizzleDb } from '@/lib/db/drizzle'
import { curriculum, courseBatch, curriculumEnrollment } from '@/lib/db/schema'
import { getParamAsync } from '@/lib/api/params'
import { sanitizeHtmlWithMax } from '@/lib/security/sanitize'
import crypto from 'crypto'

export const GET = withAuth(
  async (req: NextRequest, session, context) => {
    const id = await getParamAsync(context?.params, 'id')
    if (!id) {
      return NextResponse.json({ error: 'Course ID required' }, { status: 400 })
    }

    const [course] = await drizzleDb.select().from(curriculum).where(eq(curriculum.id, id)).limit(1)

    if (!course) throw new NotFoundError('Course not found')

    // Fetch batches and enrollment counts in 2 queries instead of N+1
    const batches = await drizzleDb
      .select()
      .from(courseBatch)
      .where(eq(courseBatch.curriculumId, id))
      .orderBy(asc(courseBatch.order))

    const enrollmentCounts = await drizzleDb
      .select({
        batchId: curriculumEnrollment.batchId,
        count: sql<number>`count(*)::int`,
      })
      .from(curriculumEnrollment)
      .where(eq(curriculumEnrollment.curriculumId, id))
      .groupBy(curriculumEnrollment.batchId)

    const countByBatch = new Map(
      enrollmentCounts
        .filter((row) => row.batchId != null)
        .map((row) => [row.batchId!, row.count])
    )

    const batchesWithStats = batches.map((b) => ({
      id: b.id,
      name: b.name,
      startDate: b.startDate,
      order: b.order,
      difficulty: b.difficulty ?? null,
      schedule: Array.isArray(b.schedule) ? b.schedule : [],
      enrollmentCount: countByBatch.get(b.id) ?? 0,
      joinLink: b.meetingUrl ?? `${req.nextUrl.origin}/curriculum/${id}?batch=${b.id}`,
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

      const [course] = await drizzleDb
        .select({ id: curriculum.id, creatorId: curriculum.creatorId })
        .from(curriculum)
        .where(eq(curriculum.id, id))
        .limit(1)

      if (!course) throw new NotFoundError('Course not found')

      // Verify the tutor owns this course
      if (course.creatorId !== session.user.id) {
        throw new ForbiddenError('You do not own this course')
      }

      const body = await req.json().catch(() => ({}))
      const name = typeof body.name === 'string' ? sanitizeHtmlWithMax(body.name.trim(), 200) : ''
      const startDate = body.startDate ? new Date(body.startDate) : null

      if (!name) throw new ValidationError('Batch name is required')

      const [result] = await drizzleDb
        .select({ maxValue: sql<number>`coalesce(max(${courseBatch.order}), -1)::int` })
        .from(courseBatch)
        .where(eq(courseBatch.curriculumId, id))

      const maxOrder = Number(result?.maxValue ?? -1)

      const [batch] = await drizzleDb
        .insert(courseBatch)
        .values({
          id: crypto.randomUUID(),
          curriculumId: id,
          name,
          startDate,
          order: maxOrder + 1,
          isLive: true,
          maxStudents: 50,
        })
        .returning()

      return NextResponse.json({
        batch: { id: batch.id, name: batch.name, startDate: batch.startDate, order: batch.order },
        message: 'Batch created.',
      })
    },
    { role: 'TUTOR' }
  )
)
