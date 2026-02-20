/**
 * POST /api/tutor/courses/[id]/schedule/populate-from-outline
 * Fill class schedule from course outline (one slot per outline item). Tutor-only.
 */

import { NextResponse } from 'next/server'
import { withAuth, withCsrf, NotFoundError } from '@/lib/api/middleware'
import { db } from '@/lib/db'

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

export const POST = withCsrf(withAuth(async (req, session, context) => {
  const { id } = await (context?.params ?? Promise.resolve({ id: '' }))

  const curriculum = await db.curriculum.findUnique({
    where: { id },
    select: { courseMaterials: true, schedule: true },
  })
  if (!curriculum) throw new NotFoundError('Course not found')

  const materials = curriculum.courseMaterials as {
    outline?: { title: string; durationMinutes: number }[]
    outlineModules?: { modules: { lessons: { title: string; durationMinutes: number }[] }[] }
  } | null
  const outlineFromModules = materials?.outlineModules?.modules
  const flatOutline = outlineFromModules?.length
    ? outlineFromModules.flatMap((m) => m.lessons ?? [])
    : materials?.outline
  const outline = Array.isArray(flatOutline) && flatOutline.length > 0 ? flatOutline : null

  if (!outline || outline.length === 0) {
    return NextResponse.json(
      { error: 'Generate a course outline first (from your curriculum).' },
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
  const scheduleDistributed = outline.map((item, i) => ({
    dayOfWeek: DAYS[(firstDayIndex + i) % DAYS.length],
    startTime,
    durationMinutes: item.durationMinutes ?? 45,
  }))

  await db.curriculum.update({
    where: { id },
    data: { schedule: scheduleDistributed as object },
  })

  return NextResponse.json({
    schedule: scheduleDistributed,
    message: `Schedule populated with ${scheduleDistributed.length} class slots from the course outline.`,
  })
}, { role: 'TUTOR' }))
