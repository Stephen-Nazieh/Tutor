/**
 * PATCH /api/tutor/courses/[id]/batches/[batchId]
 * Update a batch's difficulty and/or schedule. Tutor-only.
 */

import { NextResponse } from 'next/server'
import { withAuth, withCsrf, NotFoundError } from '@/lib/api/middleware'
import { getParamAsync } from '@/lib/api/params'
import { drizzleDb } from '@/lib/db/drizzle'
import { courseBatch } from '@/lib/db/schema'
import { eq, and } from 'drizzle-orm'

const SCHEDULE_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

export const PATCH = withCsrf(withAuth(async (req, session, context) => {
  const id = await getParamAsync(context?.params, 'id')
  const batchId = await getParamAsync(context?.params, 'batchId')
  if (!id || !batchId) return NextResponse.json({ error: 'Course and batch ID required' }, { status: 400 })
  const [batch] = await drizzleDb
    .select()
    .from(courseBatch)
    .where(and(eq(courseBatch.id, batchId), eq(courseBatch.curriculumId, id)))
  if (!batch) throw new NotFoundError('Batch not found')
  const body = await req.json().catch(() => ({}))
  const difficulty = typeof body.difficulty === 'string' && ['beginner', 'intermediate', 'advanced'].includes(body.difficulty)
    ? body.difficulty
    : undefined
  let schedule: unknown = undefined
  if (Array.isArray(body.schedule)) {
    schedule = body.schedule
      .filter((s: unknown) => s && typeof s === 'object' && 'dayOfWeek' in s && 'startTime' in s && 'durationMinutes' in s)
      .map((s: { dayOfWeek: string; startTime: string; durationMinutes: number }) => ({
        dayOfWeek: SCHEDULE_DAYS.includes(s.dayOfWeek) ? s.dayOfWeek : 'Monday',
        startTime: /^\d{1,2}:\d{2}$/.test(s.startTime) ? s.startTime : '09:00',
        durationMinutes: typeof s.durationMinutes === 'number' && s.durationMinutes >= 5 && s.durationMinutes <= 480 ? s.durationMinutes : 45,
      }))
  }
  const updateData: { difficulty?: string; schedule?: object } = {}
  if (difficulty !== undefined) updateData.difficulty = difficulty
  if (schedule !== undefined) updateData.schedule = schedule as object
  const [updatedBatch] = await drizzleDb
    .update(courseBatch)
    .set(updateData)
    .where(eq(courseBatch.id, batchId))
    .returning()
  if (!updatedBatch) throw new NotFoundError('Batch not found')
  const scheduleArr = Array.isArray(updatedBatch.schedule) ? updatedBatch.schedule : []
  return NextResponse.json({
    batch: {
      id: updatedBatch.id,
      name: updatedBatch.name,
      difficulty: updatedBatch.difficulty,
      schedule: scheduleArr,
    },
    message: 'Batch updated.',
  })
}, { role: 'TUTOR' }))
