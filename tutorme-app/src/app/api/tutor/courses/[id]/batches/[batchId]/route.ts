/**
 * PATCH /api/tutor/courses/[id]/batches/[batchId]
 * Update a batch's difficulty and/or schedule. Tutor-only.
 */

import { NextResponse } from 'next/server'
import { withAuth, withCsrf, NotFoundError } from '@/lib/api/middleware'
import { db } from '@/lib/db'

const SCHEDULE_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

export const PATCH = withCsrf(withAuth(async (req, session, context) => {
  const { id, batchId } = await (context?.params ?? Promise.resolve({ id: '', batchId: '' }))
  const batch = await db.courseBatch.findFirst({
    where: { id: batchId, curriculumId: id },
  })
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
  const updatedBatch = await db.courseBatch.update({
    where: { id: batchId },
    data: updateData,
  })
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
