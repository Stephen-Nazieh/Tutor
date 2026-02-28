/**
 * Individual Calendar Event API
 * GET /api/tutor/calendar/events/[id] - Get event details
 * PUT /api/tutor/calendar/events/[id] - Update event
 * DELETE /api/tutor/calendar/events/[id] - Delete/cancel event
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/lib/api/middleware'
import { getParamAsync } from '@/lib/api/params'
import { drizzleDb } from '@/lib/db/drizzle'
import { calendarEvent, curriculum, courseBatch } from '@/lib/db/schema'
import { eq, and, or, isNull, lt, gt, ne } from 'drizzle-orm'
import { z } from 'zod'

const UpdateEventSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().optional(),
  type: z.enum(['LESSON', 'CLINIC', 'CONSULTATION', 'BREAK', 'PERSONAL', 'OTHER']).optional(),
  startTime: z.string().datetime().optional(),
  endTime: z.string().datetime().optional(),
  timezone: z.string().optional(),
  isAllDay: z.boolean().optional(),
  location: z.string().optional(),
  meetingUrl: z.string().optional(),
  isVirtual: z.boolean().optional(),
  curriculumId: z.string().optional().nullable(),
  batchId: z.string().optional().nullable(),
  studentId: z.string().optional().nullable(),
  maxAttendees: z.number().min(1).optional(),
  attendees: z.array(z.object({
    userId: z.string().optional(),
    email: z.string(),
    name: z.string(),
    status: z.enum(['pending', 'accepted', 'declined']).default('pending'),
  })).optional(),
  reminders: z.array(z.object({
    minutes: z.number(),
    type: z.enum(['email', 'push', 'sms']),
  })).optional(),
  color: z.string().optional(),
  status: z.enum(['CONFIRMED', 'TENTATIVE', 'CANCELLED']).optional(),
  isCancelled: z.boolean().optional(),
})

export const GET = withAuth(async (req: NextRequest, session, context) => {
  const id = await getParamAsync(context?.params, 'id')
  if (!id) {
    return NextResponse.json({ error: 'Event ID required' }, { status: 400 })
  }
  const tutorId = session.user.id

  try {
    const [row] = await drizzleDb
      .select({
        event: calendarEvent,
        curriculumId: curriculum.id,
        curriculumName: curriculum.name,
        curriculumSubject: curriculum.subject,
        batchId: courseBatch.id,
        batchName: courseBatch.name,
      })
      .from(calendarEvent)
      .leftJoin(curriculum, eq(calendarEvent.curriculumId, curriculum.id))
      .leftJoin(courseBatch, eq(calendarEvent.batchId, courseBatch.id))
      .where(and(eq(calendarEvent.id, id), eq(calendarEvent.tutorId, tutorId), isNull(calendarEvent.deletedAt)))
      .limit(1)

    if (!row) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      )
    }

    const event = {
      ...row.event,
      curriculum: row.curriculumId
        ? { id: row.curriculumId, name: row.curriculumName, subject: row.curriculumSubject }
        : null,
      batch: row.batchId ? { id: row.batchId, name: row.batchName } : null,
    }

    return NextResponse.json({ event })
  } catch (error) {
    console.error('Fetch event error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch event' },
      { status: 500 }
    )
  }
}, { role: 'TUTOR' })

export const PUT = withAuth(async (req: NextRequest, session, context) => {
  const id = await getParamAsync(context?.params, 'id')
  if (!id) {
    return NextResponse.json({ error: 'Event ID required' }, { status: 400 })
  }
  const tutorId = session.user.id

  try {
    const body = await req.json()
    const validation = UpdateEventSchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid request', details: validation.error.format() },
        { status: 400 }
      )
    }

    const data = validation.data

    const [existingEvent] = await drizzleDb
      .select()
      .from(calendarEvent)
      .where(and(eq(calendarEvent.id, id), eq(calendarEvent.tutorId, tutorId), isNull(calendarEvent.deletedAt)))
      .limit(1)

    if (!existingEvent) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      )
    }

    if ((data.startTime || data.endTime) && existingEvent.type !== 'PERSONAL') {
      const newStart = data.startTime ? new Date(data.startTime) : existingEvent.startTime
      const newEnd = data.endTime ? new Date(data.endTime) : existingEvent.endTime

      const conflicts = await drizzleDb
        .select()
        .from(calendarEvent)
        .where(
          and(
            eq(calendarEvent.tutorId, tutorId),
            ne(calendarEvent.id, id),
            isNull(calendarEvent.deletedAt),
            eq(calendarEvent.isCancelled, false),
            lt(calendarEvent.startTime, newEnd),
            gt(calendarEvent.endTime, newStart)
          )
        )

      if (conflicts.length > 0) {
        return NextResponse.json({
          error: 'Schedule conflict detected',
          conflicts: conflicts.map((c) => ({
            id: c.id,
            title: c.title,
            startTime: c.startTime,
            endTime: c.endTime,
          })),
        }, { status: 409 })
      }
    }

    const updatePayload: Record<string, unknown> = {}
    if (data.title !== undefined) updatePayload.title = data.title
    if (data.description !== undefined) updatePayload.description = data.description
    if (data.type !== undefined) updatePayload.type = data.type
    if (data.startTime !== undefined) updatePayload.startTime = new Date(data.startTime)
    if (data.endTime !== undefined) updatePayload.endTime = new Date(data.endTime)
    if (data.timezone !== undefined) updatePayload.timezone = data.timezone
    if (data.isAllDay !== undefined) updatePayload.isAllDay = data.isAllDay
    if (data.location !== undefined) updatePayload.location = data.location
    if (data.meetingUrl !== undefined) updatePayload.meetingUrl = data.meetingUrl
    if (data.isVirtual !== undefined) updatePayload.isVirtual = data.isVirtual
    if (data.curriculumId !== undefined) updatePayload.curriculumId = data.curriculumId
    if (data.batchId !== undefined) updatePayload.batchId = data.batchId
    if (data.studentId !== undefined) updatePayload.studentId = data.studentId
    if (data.maxAttendees !== undefined) updatePayload.maxAttendees = data.maxAttendees
    if (data.attendees !== undefined) updatePayload.attendees = data.attendees
    if (data.reminders !== undefined) updatePayload.reminders = data.reminders
    if (data.color !== undefined) updatePayload.color = data.color
    if (data.status !== undefined) updatePayload.status = data.status
    if (data.isCancelled !== undefined) updatePayload.isCancelled = data.isCancelled

    const [updated] = await drizzleDb
      .update(calendarEvent)
      .set(updatePayload as typeof calendarEvent.$inferInsert)
      .where(eq(calendarEvent.id, id))
      .returning()

    if (!updated) {
      return NextResponse.json(
        { error: 'Failed to update event' },
        { status: 500 }
      )
    }

    const [curriculumRow] = updated.curriculumId
      ? await drizzleDb
          .select({ id: curriculum.id, name: curriculum.name, subject: curriculum.subject })
          .from(curriculum)
          .where(eq(curriculum.id, updated.curriculumId))
          .limit(1)
      : [null]
    const [batchRow] = updated.batchId
      ? await drizzleDb
          .select({ id: courseBatch.id, name: courseBatch.name })
          .from(courseBatch)
          .where(eq(courseBatch.id, updated.batchId))
          .limit(1)
      : [null]

    const event = {
      ...updated,
      curriculum: curriculumRow ? { id: curriculumRow.id, name: curriculumRow.name, subject: curriculumRow.subject } : null,
      batch: batchRow ? { id: batchRow.id, name: batchRow.name } : null,
    }

    return NextResponse.json({ event })
  } catch (error) {
    console.error('Update event error:', error)
    return NextResponse.json(
      { error: 'Failed to update event' },
      { status: 500 }
    )
  }
}, { role: 'TUTOR' })

export const DELETE = withAuth(async (req: NextRequest, session, context) => {
  const id = await getParamAsync(context?.params, 'id')
  if (!id) {
    return NextResponse.json({ error: 'Event ID required' }, { status: 400 })
  }
  const tutorId = session.user.id
  const { searchParams } = new URL(req.url)
  const deleteSeries = searchParams.get('series') === 'true'

  try {
    const [existingEvent] = await drizzleDb
      .select()
      .from(calendarEvent)
      .where(and(eq(calendarEvent.id, id), eq(calendarEvent.tutorId, tutorId), isNull(calendarEvent.deletedAt)))
      .limit(1)

    if (!existingEvent) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      )
    }

    const now = new Date()

    if (deleteSeries && existingEvent.isRecurring) {
      await drizzleDb
        .update(calendarEvent)
        .set({ deletedAt: now, isCancelled: true })
        .where(
          and(
            eq(calendarEvent.tutorId, tutorId),
            or(eq(calendarEvent.id, id), eq(calendarEvent.recurringEventId, id))
          )
        )

      return NextResponse.json({
        message: 'Recurring event series deleted',
        deletedCount: 'multiple',
      })
    }

    await drizzleDb
      .update(calendarEvent)
      .set({ deletedAt: now, isCancelled: true })
      .where(eq(calendarEvent.id, id))

    return NextResponse.json({
      message: 'Event deleted successfully',
      deletedCount: 1,
    })
  } catch (error) {
    console.error('Delete event error:', error)
    return NextResponse.json(
      { error: 'Failed to delete event' },
      { status: 500 }
    )
  }
}, { role: 'TUTOR' })
