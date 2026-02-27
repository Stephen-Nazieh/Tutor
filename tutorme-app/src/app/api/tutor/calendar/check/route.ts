/**
 * Calendar Availability Check API
 * POST /api/tutor/calendar/check
 *
 * Check if a specific time slot is available for booking
 * Used before creating new events to avoid conflicts
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/lib/api/middleware'
import { drizzleDb } from '@/lib/db/drizzle'
import { calendarEvent, calendarAvailability, calendarException } from '@/lib/db/schema'
import { eq, and, or, gte, lte, lt, gt, isNull, ne, not } from 'drizzle-orm'
import { z } from 'zod'

const CheckAvailabilitySchema = z.object({
  tutorId: z.string(),
  startTime: z.string().datetime(),
  endTime: z.string().datetime(),
  excludeEventId: z.string().optional(),
})

export const POST = withAuth(async (req: NextRequest, session) => {
  const userId = session.user.id
  const userRole = session.user.role

  try {
    const body = await req.json()
    const validation = CheckAvailabilitySchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid request', details: validation.error.format() },
        { status: 400 }
      )
    }

    const { tutorId, startTime, endTime, excludeEventId } = validation.data

    if (userRole === 'TUTOR' && tutorId !== userId) {
      return NextResponse.json(
        { error: 'Can only check your own availability' },
        { status: 403 }
      )
    }

    const start = new Date(startTime)
    const end = new Date(endTime)

    if (end <= start) {
      return NextResponse.json(
        { error: 'End time must be after start time' },
        { status: 400 }
      )
    }

    const conflictConditions = [
      eq(calendarEvent.tutorId, tutorId),
      isNull(calendarEvent.deletedAt),
      eq(calendarEvent.isCancelled, false),
      lt(calendarEvent.startTime, end),
      gt(calendarEvent.endTime, start),
    ]
    if (excludeEventId) {
      conflictConditions.push(ne(calendarEvent.id, excludeEventId))
    }
    const conflicts = await drizzleDb
      .select({
        id: calendarEvent.id,
        title: calendarEvent.title,
        startTime: calendarEvent.startTime,
        endTime: calendarEvent.endTime,
        type: calendarEvent.type,
      })
      .from(calendarEvent)
      .where(and(...conflictConditions))

    const dayOfWeek = start.getDay()
    const dateStr = start.toISOString().split('T')[0]
    const timeStr = start.toTimeString().slice(0, 5)

    const availability = await drizzleDb
      .select()
      .from(calendarAvailability)
      .where(
        and(
          eq(calendarAvailability.tutorId, tutorId),
          eq(calendarAvailability.dayOfWeek, dayOfWeek),
          eq(calendarAvailability.isAvailable, true),
          or(
            isNull(calendarAvailability.validUntil),
            gte(calendarAvailability.validUntil, start)
          )
        )
      )

    const exceptionWhere = and(
      eq(calendarException.tutorId, tutorId),
      eq(calendarException.date, new Date(dateStr)),
      or(
        and(isNull(calendarException.startTime), isNull(calendarException.endTime)),
        and(
          not(isNull(calendarException.startTime)),
          not(isNull(calendarException.endTime)),
          lte(calendarException.startTime, timeStr),
          gte(calendarException.endTime, timeStr)
        )
      )
    )
    const [exception] = await drizzleDb
      .select()
      .from(calendarException)
      .where(exceptionWhere)
      .limit(1)

    const isAvailable = availability.length > 0 && !exception && conflicts.length === 0

    const suggestedTimes = await calculateSuggestedTimes(tutorId, start, end)

    return NextResponse.json({
      available: isAvailable,
      conflicts: conflicts.map((c) => ({
        id: c.id,
        title: c.title,
        startTime: c.startTime,
        endTime: c.endTime,
        type: c.type,
      })),
      exception: exception
        ? {
            isAvailable: exception.isAvailable,
            reason: exception.reason,
          }
        : null,
      suggestedTimes,
      tutorTimezone: availability[0]?.timezone || 'Asia/Shanghai',
    })
  } catch (error) {
    console.error('Check availability error:', error)
    return NextResponse.json(
      { error: 'Failed to check availability' },
      { status: 500 }
    )
  }
})

async function calculateSuggestedTimes(
  tutorId: string,
  requestedStart: Date,
  requestedEnd: Date,
  maxSuggestions = 3
): Promise<Array<{ startTime: Date; endTime: Date }>> {
  const suggestions: Array<{ startTime: Date; endTime: Date }> = []
  const duration = requestedEnd.getTime() - requestedStart.getTime()

  for (let dayOffset = 0; dayOffset < 7 && suggestions.length < maxSuggestions; dayOffset++) {
    const checkDate = new Date(requestedStart)
    checkDate.setDate(checkDate.getDate() + dayOffset)

    const dayOfWeek = checkDate.getDay()
    const dateStr = checkDate.toISOString().split('T')[0]
    const dayStart = new Date(dateStr)
    const dayEnd = new Date(dayStart.getTime() + 24 * 60 * 60 * 1000)

    const availability = await drizzleDb
      .select()
      .from(calendarAvailability)
      .where(
        and(
          eq(calendarAvailability.tutorId, tutorId),
          eq(calendarAvailability.dayOfWeek, dayOfWeek),
          eq(calendarAvailability.isAvailable, true)
        )
      )

    const exceptions = await drizzleDb
      .select()
      .from(calendarException)
      .where(
        and(
          eq(calendarException.tutorId, tutorId),
          eq(calendarException.date, dayStart),
          eq(calendarException.isAvailable, false)
        )
      )

    const events = await drizzleDb
      .select()
      .from(calendarEvent)
      .where(
        and(
          eq(calendarEvent.tutorId, tutorId),
          isNull(calendarEvent.deletedAt),
          eq(calendarEvent.isCancelled, false),
          gte(calendarEvent.startTime, dayStart),
          lt(calendarEvent.startTime, dayEnd)
        )
      )

    for (const slot of availability) {
      if (suggestions.length >= maxSuggestions) break

      const slotStart = new Date(`${dateStr}T${slot.startTime}`)
      const slotEnd = new Date(`${dateStr}T${slot.endTime}`)

      const blocked = exceptions.some((e) => {
        if (!e.startTime || !e.endTime) return true
        const exStart = new Date(`${dateStr}T${e.startTime}`)
        const exEnd = new Date(`${dateStr}T${e.endTime}`)
        return slotStart < exEnd && slotEnd > exStart
      })

      if (blocked) continue

      const dayEvents = events
        .filter((e) => e.startTime.toISOString().split('T')[0] === dateStr)
        .sort((a, b) => a.startTime.getTime() - b.startTime.getTime())

      let currentTime = new Date(slotStart)

      for (const event of dayEvents) {
        if (currentTime.getTime() + duration <= event.startTime.getTime()) {
          suggestions.push({
            startTime: new Date(currentTime),
            endTime: new Date(currentTime.getTime() + duration),
          })
          if (suggestions.length >= maxSuggestions) break
        }
        currentTime = new Date(Math.max(currentTime.getTime(), event.endTime.getTime()))
      }

      if (
        suggestions.length < maxSuggestions &&
        currentTime.getTime() + duration <= slotEnd.getTime()
      ) {
        suggestions.push({
          startTime: new Date(currentTime),
          endTime: new Date(currentTime.getTime() + duration),
        })
      }
    }
  }

  return suggestions
}
