/**
 * GET: List batches for this course. POST: Create a batch. Tutor-only.
 */

import { NextResponse } from 'next/server'
import { withAuth, withCsrf, ValidationError, NotFoundError } from '@/lib/api/middleware'
import { db } from '@/lib/db'
import { sanitizeHtmlWithMax } from '@/lib/security/sanitize'
import { Prisma } from '@prisma/client'

export const GET = withAuth(async (req, session, context) => {
  const { id } = await (context?.params ?? Promise.resolve({ id: '' }))
  const curriculum = await db.curriculum.findUnique({ where: { id } })
  if (!curriculum) throw new NotFoundError('Course not found')
  const batches = await db.courseBatch.findMany({
    where: { curriculumId: id },
    orderBy: { order: 'asc' },
    include: { _count: { select: { enrollments: true } } },
  })
  type BatchRow = Prisma.CourseBatchGetPayload<{ include: { _count: { select: { enrollments: true } } } }>
  const scheduleType = [] as Array<{ dayOfWeek: string; startTime: string; durationMinutes: number }>
  return NextResponse.json({
    batches: batches.map((b: BatchRow) => ({
      id: b.id,
      name: b.name,
      startDate: b.startDate,
      order: b.order,
      difficulty: b.difficulty ?? null,
      schedule: Array.isArray(b.schedule) ? (b.schedule as typeof scheduleType) : [],
      enrollmentCount: b._count.enrollments,
      joinLink: b.meetingUrl ?? `${req.nextUrl.origin}/curriculum/${id}?batch=${b.id}`,
    })),
  })
}, { role: 'TUTOR' })

export const POST = withCsrf(withAuth(async (req, session, context) => {
  const { id } = await (context?.params ?? Promise.resolve({ id: '' }))
  const curriculum = await db.curriculum.findUnique({ where: { id }, select: { id: true } })
  if (!curriculum) throw new NotFoundError('Course not found')
  const body = await req.json().catch(() => ({}))
  const name = typeof body.name === 'string' ? sanitizeHtmlWithMax(body.name.trim(), 200) : ''
  const startDate = body.startDate ? new Date(body.startDate) : null
  if (!name) throw new ValidationError('Batch name is required')
  const maxOrder = await db.courseBatch.aggregate({
    where: { curriculumId: id },
    _max: { order: true },
  }).then((r: { _max: { order: number | null } }) => r._max.order ?? -1)
  const batch = await db.courseBatch.create({
    data: { curriculumId: id, name, startDate, order: maxOrder + 1 },
  })
  return NextResponse.json({
    batch: { id: batch.id, name: batch.name, startDate: batch.startDate, order: batch.order },
    message: 'Batch created.',
  })
}, { role: 'TUTOR' }))
