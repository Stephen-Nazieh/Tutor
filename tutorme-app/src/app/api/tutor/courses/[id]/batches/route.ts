/**
 * GET: List batches for this course. POST: Create a batch. Tutor-only.
 */

import { NextRequest, NextResponse } from 'next/server'
import { eq, asc, count, max } from 'drizzle-orm'
import { withAuth, withCsrf, ValidationError, NotFoundError } from '@/lib/api/middleware'
import { drizzleDb } from '@/lib/db/drizzle'
import { curriculum, courseBatch, curriculumEnrollment } from '@/lib/db/schema'
import { sanitizeHtmlWithMax } from '@/lib/security/sanitize'
import crypto from 'crypto'

export const GET = withAuth(async (req: NextRequest, session, context) => {
  const params = await (context as any).params
  const id = String(params?.id || '')

  const [course] = await drizzleDb
    .select()
    .from(curriculum)
    .where(eq(curriculum.id, id))
    .limit(1)

  if (!course) throw new NotFoundError('Course not found')

  const batches = await drizzleDb
    .select()
    .from(courseBatch)
    .where(eq(courseBatch.curriculumId, id))
    .orderBy(asc(courseBatch.order))

  const batchesWithStats = await Promise.all(batches.map(async (b) => {
    const [stats] = await drizzleDb
      .select({ value: count() })
      .from(curriculumEnrollment)
      .where(eq(curriculumEnrollment.batchId, b.id))

    return {
      id: b.id,
      name: b.name,
      startDate: b.startDate,
      order: b.order,
      difficulty: b.difficulty ?? null,
      schedule: Array.isArray(b.schedule) ? b.schedule : [],
      enrollmentCount: Number(stats?.value || 0),
      joinLink: b.meetingUrl ?? `${req.nextUrl.origin}/curriculum/${id}?batch=${b.id}`,
    }
  }))

  return NextResponse.json({ batches: batchesWithStats })
}, { role: 'TUTOR' })

export const POST = withCsrf(withAuth(async (req: NextRequest, session, context) => {
  const params = await (context as any).params
  const id = String(params?.id || '')

  const [course] = await drizzleDb
    .select({ id: curriculum.id })
    .from(curriculum)
    .where(eq(curriculum.id, id))
    .limit(1)

  if (!course) throw new NotFoundError('Course not found')

  const body = await req.json().catch(() => ({}))
  const name = typeof body.name === 'string' ? sanitizeHtmlWithMax(body.name.trim(), 200) : ''
  const startDate = body.startDate ? new Date(body.startDate) : null

  if (!name) throw new ValidationError('Batch name is required')

  const [result] = await drizzleDb
    .select({ maxValue: max(courseBatch.order) })
    .from(courseBatch)
    .where(eq(courseBatch.curriculumId, id))

  const maxOrder = result?.maxValue ?? -1

  const [batch] = await drizzleDb.insert(courseBatch).values({
    id: crypto.randomUUID(),
    curriculumId: id,
    name,
    startDate,
    order: maxOrder + 1,
    isLive: true, // Defaulting to true for batches as they're typically for live cohorts
    maxStudents: 50, // Default value
  }).returning()

  return NextResponse.json({
    batch: { id: batch.id, name: batch.name, startDate: batch.startDate, order: batch.order },
    message: 'Batch created.',
  })
}, { role: 'TUTOR' }))
