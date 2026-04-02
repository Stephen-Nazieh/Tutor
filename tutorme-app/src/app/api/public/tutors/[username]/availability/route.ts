/**
 * Public API to get tutor's availability for booking
 * GET /api/public/tutors/[username]/availability
 */

import { NextRequest, NextResponse } from 'next/server'
import { drizzleDb } from '@/lib/db/drizzle'
import { user, profile, calendarAvailability, calendarException, calendarEvent } from '@/lib/db/schema'
import { eq, and, or, gte, lte, asc, isNull } from 'drizzle-orm'

export async function GET(
  req: NextRequest,
  { params }: { params: { username: string } }
) {
  const { searchParams } = new URL(req.url)
  const start = searchParams.get('start')
  const end = searchParams.get('end')

  try {
    const username = params.username.replace(/^@+/, '').toLowerCase()

    // Find tutor by username
    const tutorData = await drizzleDb.query.user.findFirst({
      where: eq(user.handle, username),
      with: {
        profile: true,
      },
    })

    if (!tutorData || tutorData.role !== 'TUTOR') {
      return NextResponse.json({ error: 'Tutor not found' }, { status: 404 })
    }

    const tutorId = tutorData.id
    const tutorProfile = tutorData.profile

    // Check if one-on-one is enabled
    if (!tutorProfile?.oneOnOneEnabled || !tutorProfile?.hourlyRate) {
      return NextResponse.json(
        { error: 'Tutor does not offer one-on-one sessions', available: false },
        { status: 400 }
      )
    }

    const now = new Date()
    const startDate = start ? new Date(start) : now
    const endDate = end ? new Date(end) : new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000) // 2 weeks default

    // Get availability
    const availability = await drizzleDb
      .select()
      .from(calendarAvailability)
      .where(
        and(
          eq(calendarAvailability.tutorId, tutorId),
          eq(calendarAvailability.isAvailable, true),
          or(isNull(calendarAvailability.validUntil), gte(calendarAvailability.validUntil, now))
        )
      )
      .orderBy(asc(calendarAvailability.dayOfWeek), asc(calendarAvailability.startTime))

    // Get exceptions
    const exceptions = await drizzleDb
      .select()
      .from(calendarException)
      .where(
        and(
          eq(calendarException.tutorId, tutorId),
          gte(calendarException.date, startDate),
          lte(calendarException.date, endDate)
        )
      )

    // Get existing events
    const existingEvents = await drizzleDb
      .select()
      .from(calendarEvent)
      .where(
        and(
          eq(calendarEvent.tutorId, tutorId),
          isNull(calendarEvent.deletedAt),
          eq(calendarEvent.isCancelled, false),
          or(
            and(gte(calendarEvent.startTime, startDate), lte(calendarEvent.startTime, endDate)),
            and(gte(calendarEvent.endTime, startDate), lte(calendarEvent.endTime, endDate))
          )
        )
      )

    // Generate available slots
    const slots: Array<{
      date: string
      startTime: string
      endTime: string
      dayOfWeek: number
      timezone: string
    }> = []

    const currentDate = new Date(startDate)

    while (currentDate <= endDate) {
      const dayOfWeek = currentDate.getDay()
      const dateStr = currentDate.toISOString().split('T')[0]

      // Check if there's an exception for this date
      const dayException = exceptions.find(
        e => e.date.toISOString().split('T')[0] === dateStr && !e.isAvailable
      )

      if (dayException) {
        currentDate.setDate(currentDate.getDate() + 1)
        continue
      }

      // Get availability for this day
      const dayAvailability = availability.filter(a => a.dayOfWeek === dayOfWeek)

      for (const slot of dayAvailability) {
        const slotStart = new Date(`${dateStr}T${slot.startTime}`)
        const slotEnd = new Date(`${dateStr}T${slot.endTime}`)

        // Check if slot is in the past
        if (slotEnd <= new Date()) continue

        // Check for conflicts with existing events
        const hasConflict = existingEvents.some((event: any) => {
          return slotStart < event.endTime && slotEnd > event.startTime
        })

        if (!hasConflict) {
          // Check exception time ranges
          const timeException = exceptions.find(e => {
            if (e.date.toISOString().split('T')[0] !== dateStr) return false
            if (!e.startTime || !e.endTime) return false
            const exStart = new Date(`${dateStr}T${e.startTime}`)
            const exEnd = new Date(`${dateStr}T${e.endTime}`)
            return slotStart < exEnd && slotEnd > exStart
          })

          if (!timeException) {
            slots.push({
              date: dateStr,
              startTime: slot.startTime,
              endTime: slot.endTime,
              dayOfWeek,
              timezone: slot.timezone,
            })
          }
        }
      }

      currentDate.setDate(currentDate.getDate() + 1)
    }

    return NextResponse.json({
      available: true,
      hourlyRate: tutorProfile.hourlyRate,
      currency: tutorProfile.currency || 'USD',
      timezone: tutorProfile.timezone || 'UTC',
      slots,
    })
  } catch (error) {
    console.error('Fetch availability error:', error)
    return NextResponse.json({ error: 'Failed to fetch availability' }, { status: 500 })
  }
}
