/**
 * POST /api/tutor/courses/[id]/schedule/populate-from-content
 * Fill class schedule from existing modules/lessons (one slot per lesson). Tutor-only.
 */

import { NextResponse } from 'next/server'
import { withAuth, withCsrf, NotFoundError } from '@/lib/api/middleware'
import { drizzleDb } from '@/lib/db/drizzle'
import { curriculum, curriculumModule, curriculumLesson } from '@/lib/db/schema'
import { eq, asc, inArray } from 'drizzle-orm'

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

export const POST = withCsrf(withAuth(async (req, session, context) => {
  const { id } = await (context?.params ?? Promise.resolve({ id: '' }))

  const [curriculumRow] = await drizzleDb.select().from(curriculum).where(eq(curriculum.id, id))
  if (!curriculumRow) throw new NotFoundError('Course not found')

  const modules = await drizzleDb
    .select()
    .from(curriculumModule)
    .where(eq(curriculumModule.curriculumId, id))
    .orderBy(asc(curriculumModule.order))
  const moduleIds = modules.map((m) => m.id)
  const lessons =
    moduleIds.length > 0
      ? await drizzleDb
          .select({ duration: curriculumLesson.duration })
          .from(curriculumLesson)
          .where(inArray(curriculumLesson.moduleId, moduleIds))
          .orderBy(asc(curriculumLesson.order))
      : []

  const lessonsWithDuration = lessons.map((les) => ({
    duration: typeof les.duration === 'number' && les.duration > 0 ? les.duration : 45,
  }))

  if (lessonsWithDuration.length === 0) {
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
  const scheduleDistributed = lessonsWithDuration.map((les, i) => ({
    dayOfWeek: DAYS[(firstDayIndex + i) % DAYS.length],
    startTime,
    durationMinutes: les.duration,
  }))

  await drizzleDb
    .update(curriculum)
    .set({ schedule: scheduleDistributed as object })
    .where(eq(curriculum.id, id))

  return NextResponse.json({
    schedule: scheduleDistributed,
    message: `Schedule populated with ${scheduleDistributed.length} class slots from course content.`,
  })
}, { role: 'TUTOR' }))
