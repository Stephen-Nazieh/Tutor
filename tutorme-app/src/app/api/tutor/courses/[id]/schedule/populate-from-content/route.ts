/**
 * POST /api/tutor/courses/[id]/schedule/populate-from-content
 * Fill class schedule from existing modules/lessons (one slot per lesson). Tutor-only.
 */

import { NextResponse } from 'next/server'
import { withAuth, withCsrf, NotFoundError } from '@/lib/api/middleware'
import { db } from '@/lib/db'

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

export const POST = withCsrf(withAuth(async (req, session, context) => {
  const { id } = await (context?.params ?? Promise.resolve({ id: '' }))

  const curriculum = await db.curriculum.findUnique({
    where: { id },
    include: {
      modules: {
        orderBy: { order: 'asc' },
        include: {
          lessons: { orderBy: { order: 'asc' } },
        },
      },
    },
  })
  if (!curriculum) throw new NotFoundError('Course not found')

  const lessons: { duration: number }[] = []
  for (const mod of curriculum.modules) {
    for (const les of mod.lessons) {
      lessons.push({
        duration: typeof les.duration === 'number' && les.duration > 0 ? les.duration : 45,
      })
    }
  }

  if (lessons.length === 0) {
    return NextResponse.json(
      { error: 'Add at least one lesson to the course content first.' },
      { status: 400 }
    )
  }

  const body = await req.json().catch(() => ({}))
  const firstDay = typeof body.firstDay === 'string' && DAYS.includes(body.firstDay)
    ? body.firstDay
    : DAYS[0]
  const startTime = typeof body.startTime === 'string' && /^\d{1,2}:\d{2}$/.test(body.startTime)
    ? body.startTime
    : '09:00'

  const firstDayIndex = DAYS.indexOf(firstDay)
  const scheduleDistributed = lessons.map((les, i) => ({
    dayOfWeek: DAYS[(firstDayIndex + i) % DAYS.length],
    startTime,
    durationMinutes: les.duration,
  }))

  await db.curriculum.update({
    where: { id },
    data: { schedule: scheduleDistributed as object },
  })

  return NextResponse.json({
    schedule: scheduleDistributed,
    message: `Schedule populated with ${scheduleDistributed.length} class slots from course content.`,
  })
}, { role: 'TUTOR' }))
