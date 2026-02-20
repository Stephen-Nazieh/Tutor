/**
 * Tutor Calendar Availability API
 * GET /api/tutor/calendar/availability - Get tutor's availability
 * POST /api/tutor/calendar/availability - Set availability slot
 * 
 * Query params for GET:
 * - start: ISO date string
 * - end: ISO date string
 * - check: boolean - if true, returns available slots for booking
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/lib/api/middleware'
import { db } from '@/lib/db'
import { z } from 'zod'

const AvailabilitySchema = z.object({
  dayOfWeek: z.number().min(0).max(6),
  startTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
  endTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
  timezone: z.string().default('Asia/Shanghai'),
  isAvailable: z.boolean().default(true),
  validFrom: z.string().datetime().optional(),
  validUntil: z.string().datetime().optional(),
})

export const GET = withAuth(async (req: NextRequest, session) => {
  const tutorId = session.user.id
  const { searchParams } = new URL(req.url)
  
  const start = searchParams.get('start')
  const end = searchParams.get('end')
  const check = searchParams.get('check') === 'true'
  
  try {
    // Get recurring availability
    const availability = await db.calendarAvailability.findMany({
      where: {
        tutorId,
        OR: [
          { validUntil: null },
          { validUntil: { gte: new Date() } },
        ],
      },
      orderBy: [{ dayOfWeek: 'asc' }, { startTime: 'asc' }],
    })
    
    // Get exceptions
    const exceptions = await db.calendarException.findMany({
      where: {
        tutorId,
        date: {
          gte: start ? new Date(start) : new Date(),
          ...(end ? { lte: new Date(end) } : {}),
        },
      },
    })
    
    if (!check) {
      // Return raw availability data
      return NextResponse.json({
        availability,
        exceptions,
      })
    }
    
    // Generate available time slots for booking
    if (!start || !end) {
      return NextResponse.json(
        { error: 'Start and end dates required for availability check' },
        { status: 400 }
      )
    }
    
    const startDate = new Date(start)
    const endDate = new Date(end)
    const availableSlots = await generateAvailableSlots(
      tutorId,
      startDate,
      endDate,
      availability,
      exceptions
    )
    
    return NextResponse.json({
      availableSlots,
      range: { start, end },
    })
  } catch (error) {
    console.error('Fetch availability error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch availability' },
      { status: 500 }
    )
  }
}, { role: 'TUTOR' })

export const POST = withAuth(async (req: NextRequest, session) => {
  const tutorId = session.user.id
  
  try {
    const body = await req.json()
    const validation = AvailabilitySchema.safeParse(body)
    
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid request', details: validation.error.format() },
        { status: 400 }
      )
    }
    
    const data = validation.data
    
    // Validate times
    if (data.startTime >= data.endTime) {
      return NextResponse.json(
        { error: 'End time must be after start time' },
        { status: 400 }
      )
    }
    
    // Create availability slot
    const availability = await db.calendarAvailability.create({
      data: {
        tutorId,
        dayOfWeek: data.dayOfWeek,
        startTime: data.startTime,
        endTime: data.endTime,
        timezone: data.timezone,
        isAvailable: data.isAvailable,
        validFrom: data.validFrom ? new Date(data.validFrom) : null,
        validUntil: data.validUntil ? new Date(data.validUntil) : null,
      },
    })
    
    return NextResponse.json({ availability }, { status: 201 })
  } catch (error: any) {
    // Handle unique constraint violation
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'Availability slot already exists for this time' },
        { status: 409 }
      )
    }
    
    console.error('Create availability error:', error)
    return NextResponse.json(
      { error: 'Failed to create availability' },
      { status: 500 }
    )
  }
}, { role: 'TUTOR' })

// Generate available time slots for booking
async function generateAvailableSlots(
  tutorId: string,
  startDate: Date,
  endDate: Date,
  availability: any[],
  exceptions: any[]
): Promise<any[]> {
  const slots: any[] = []
  const currentDate = new Date(startDate)
  
  // Get existing events in range
  const existingEvents = await db.calendarEvent.findMany({
    where: {
      tutorId,
      deletedAt: null,
      isCancelled: false,
      OR: [
        {
          startTime: { gte: startDate, lte: endDate },
        },
        {
          endTime: { gte: startDate, lte: endDate },
        },
      ],
    },
  })
  
  while (currentDate <= endDate) {
    const dayOfWeek = currentDate.getDay()
    const dateStr = currentDate.toISOString().split('T')[0]
    
    // Check if there's an exception for this date
    const dayException = exceptions.find(
      e => e.date.toISOString().split('T')[0] === dateStr
    )
    
    if (dayException && !dayException.isAvailable) {
      // Day is blocked
      currentDate.setDate(currentDate.getDate() + 1)
      continue
    }
    
    // Get availability for this day
    const dayAvailability = availability.filter(a => a.dayOfWeek === dayOfWeek)
    
    for (const slot of dayAvailability) {
      if (!slot.isAvailable) continue
      
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
  
  return slots
}
