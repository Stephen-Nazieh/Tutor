/**
 * Calendar Availability Check API
 * POST /api/tutor/calendar/check
 * 
 * Check if a specific time slot is available for booking
 * Used before creating new events to avoid conflicts
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/lib/api/middleware'
import { db } from '@/lib/db'
import { z } from 'zod'

const CheckAvailabilitySchema = z.object({
  tutorId: z.string(),
  startTime: z.string().datetime(),
  endTime: z.string().datetime(),
  excludeEventId: z.string().optional(), // For rescheduling existing events
})

export const POST = withAuth(async (req: NextRequest, session) => {
  // Allow both tutors checking their own and students checking tutor availability
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
    
    // If user is a tutor, they can only check their own availability
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
    
    // Check for conflicts
    const conflicts = await db.calendarEvent.findMany({
      where: {
        tutorId,
        deletedAt: null,
        isCancelled: false,
        id: excludeEventId ? { not: excludeEventId } : undefined,
        OR: [
          {
            startTime: { lt: end },
            endTime: { gt: start },
          },
        ],
      },
      select: {
        id: true,
        title: true,
        startTime: true,
        endTime: true,
        type: true,
      },
    })
    
    // Check availability rules
    const dayOfWeek = start.getDay()
    const dateStr = start.toISOString().split('T')[0]
    const timeStr = start.toTimeString().slice(0, 5)
    
    // Get availability for this day
    const availability = await db.calendarAvailability.findMany({
      where: {
        tutorId,
        dayOfWeek,
        isAvailable: true,
        OR: [
          { validUntil: null },
          { validUntil: { gte: start } },
        ],
      },
    })
    
    // Check exceptions
    const exception = await db.calendarException.findFirst({
      where: {
        tutorId,
        date: new Date(dateStr),
        OR: [
          {
            // Full day exception
            AND: [
              { startTime: null },
              { endTime: null },
            ],
          },
          {
            // Time range exception
            AND: [
              { startTime: { not: null } },
              { endTime: { not: null } },
              { startTime: { lte: timeStr } },
              { endTime: { gte: timeStr } },
            ],
          },
        ],
      },
    })
    
    const isAvailable = availability.length > 0 && !exception && conflicts.length === 0
    
    // Calculate buffer times (suggested break before/after)
    const suggestedTimes = await calculateSuggestedTimes(tutorId, start, end)
    
    return NextResponse.json({
      available: isAvailable,
      conflicts: conflicts.map((c: any) => ({
        id: c.id,
        title: c.title,
        startTime: c.startTime,
        endTime: c.endTime,
        type: c.type,
      })),
      exception: exception ? {
        isAvailable: exception.isAvailable,
        reason: exception.reason,
      } : null,
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

// Calculate suggested alternative times
async function calculateSuggestedTimes(
  tutorId: string,
  requestedStart: Date,
  requestedEnd: Date,
  maxSuggestions = 3
): Promise<Array<{ startTime: Date; endTime: Date }>> {
  const suggestions: Array<{ startTime: Date; endTime: Date }> = []
  const duration = requestedEnd.getTime() - requestedStart.getTime()
  
  // Check next 7 days for alternatives
  for (let dayOffset = 0; dayOffset < 7 && suggestions.length < maxSuggestions; dayOffset++) {
    const checkDate = new Date(requestedStart)
    checkDate.setDate(checkDate.getDate() + dayOffset)
    
    const dayOfWeek = checkDate.getDay()
    const dateStr = checkDate.toISOString().split('T')[0]
    
    // Get availability for this day
    const availability = await db.calendarAvailability.findMany({
      where: {
        tutorId,
        dayOfWeek,
        isAvailable: true,
      },
    })
    
    // Get exceptions
    const exceptions = await db.calendarException.findMany({
      where: {
        tutorId,
        date: new Date(dateStr),
        isAvailable: false,
      },
    })
    
    // Get existing events
    const events = await db.calendarEvent.findMany({
      where: {
        tutorId,
        deletedAt: null,
        isCancelled: false,
        startTime: {
          gte: new Date(dateStr),
          lt: new Date(new Date(dateStr).getTime() + 24 * 60 * 60 * 1000),
        },
      },
    })
    
    for (const slot of availability) {
      if (suggestions.length >= maxSuggestions) break
      
      const slotStart = new Date(`${dateStr}T${slot.startTime}`)
      const slotEnd = new Date(`${dateStr}T${slot.endTime}`)
      
      // Check if slot is blocked by exception
      const blocked = exceptions.some((e: any) => {
        if (!e.startTime || !e.endTime) return true
        const exStart = new Date(`${dateStr}T${e.startTime}`)
        const exEnd = new Date(`${dateStr}T${e.endTime}`)
        return slotStart < exEnd && slotEnd > exStart
      })
      
      if (blocked) continue
      
      // Find gaps in existing events
      const dayEvents = events.filter((e: any) =>
        e.startTime.toISOString().split('T')[0] === dateStr
      ).sort((a: any, b: any) => a.startTime.getTime() - b.startTime.getTime())
      
      let currentTime = new Date(slotStart)
      
      for (const event of dayEvents) {
        if (currentTime.getTime() + duration <= event.startTime.getTime()) {
          // Found a gap
          suggestions.push({
            startTime: new Date(currentTime),
            endTime: new Date(currentTime.getTime() + duration),
          })
          if (suggestions.length >= maxSuggestions) break
        }
        currentTime = new Date(Math.max(currentTime.getTime(), event.endTime.getTime()))
      }
      
      // Check remaining time after last event
      if (suggestions.length < maxSuggestions &&
          currentTime.getTime() + duration <= slotEnd.getTime()) {
        suggestions.push({
          startTime: new Date(currentTime),
          endTime: new Date(currentTime.getTime() + duration),
        })
      }
    }
  }
  
  return suggestions
}
