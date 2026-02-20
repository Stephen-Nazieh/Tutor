/**
 * Tutor Calendar Events API
 * GET /api/tutor/calendar/events - List tutor's events
 * POST /api/tutor/calendar/events - Create new event
 * 
 * Query params for GET:
 * - start: ISO date string (required)
 * - end: ISO date string (required)
 * - type: Filter by event type
 * - includeCancelled: boolean (default false)
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/lib/api/middleware'
import { db } from '@/lib/db'
import { z } from 'zod'

const EventTypeEnum = z.enum(['LESSON', 'CLINIC', 'CONSULTATION', 'BREAK', 'PERSONAL', 'OTHER'])
const EventStatusEnum = z.enum(['CONFIRMED', 'TENTATIVE', 'CANCELLED'])

const CreateEventSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  type: EventTypeEnum.default('LESSON'),
  startTime: z.string().datetime(),
  endTime: z.string().datetime(),
  timezone: z.string().default('Asia/Shanghai'),
  isAllDay: z.boolean().default(false),
  location: z.string().optional(),
  meetingUrl: z.string().optional(),
  isVirtual: z.boolean().default(false),
  curriculumId: z.string().optional(),
  batchId: z.string().optional(),
  studentId: z.string().optional(),
  maxAttendees: z.number().min(1).default(1),
  attendees: z.array(z.object({
    userId: z.string().optional(),
    email: z.string(),
    name: z.string(),
    status: z.enum(['pending', 'accepted', 'declined']).default('pending'),
  })).default([]),
  reminders: z.array(z.object({
    minutes: z.number(),
    type: z.enum(['email', 'push', 'sms']),
  })).default([{ minutes: 15, type: 'email' }]),
  color: z.string().optional(),
  recurrenceRule: z.string().optional(), // iCal RRULE
})

export const GET = withAuth(async (req: NextRequest, session) => {
  const tutorId = session.user.id
  const { searchParams } = new URL(req.url)
  
  const start = searchParams.get('start')
  const end = searchParams.get('end')
  const type = searchParams.get('type')
  const includeCancelled = searchParams.get('includeCancelled') === 'true'
  const limit = parseInt(searchParams.get('limit') || '100', 10)
  
  if (!start || !end) {
    return NextResponse.json(
      { error: 'Start and end dates are required' },
      { status: 400 }
    )
  }
  
  const startDate = new Date(start)
  const endDate = new Date(end)
  
  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
    return NextResponse.json(
      { error: 'Invalid date format' },
      { status: 400 }
    )
  }
  
  try {
    const events = await db.calendarEvent.findMany({
      where: {
        tutorId,
        deletedAt: null,
        ...(includeCancelled ? {} : { isCancelled: false }),
        ...(type ? { type: type as any } : {}),
        OR: [
          // Events that overlap with the date range
          {
            startTime: { gte: startDate, lte: endDate },
          },
          {
            endTime: { gte: startDate, lte: endDate },
          },
          {
            // Events that span the entire range
            AND: [
              { startTime: { lte: startDate } },
              { endTime: { gte: endDate } },
            ],
          },
        ],
      },
      orderBy: { startTime: 'asc' },
      take: limit,
      include: {
        curriculum: {
          select: { id: true, name: true, subject: true },
        },
        batch: {
          select: { id: true, name: true },
        },
      },
    })
    
    // Expand recurring events within the date range
    const expandedEvents = expandRecurringEvents(events, startDate, endDate)
    
    return NextResponse.json({
      events: expandedEvents,
      count: expandedEvents.length,
      range: { start, end },
    })
  } catch (error) {
    console.error('Fetch calendar events error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 }
    )
  }
}, { role: 'TUTOR' })

export const POST = withAuth(async (req: NextRequest, session) => {
  const tutorId = session.user.id
  
  try {
    const body = await req.json()
    const validation = CreateEventSchema.safeParse(body)
    
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid request', details: validation.error.format() },
        { status: 400 }
      )
    }
    
    const data = validation.data
    
    // Validate dates
    const startTime = new Date(data.startTime)
    const endTime = new Date(data.endTime)
    
    if (endTime <= startTime) {
      return NextResponse.json(
        { error: 'End time must be after start time' },
        { status: 400 }
      )
    }
    
    // Check for conflicts (unless it's a personal event)
    if (data.type !== 'PERSONAL') {
      const conflicts = await db.calendarEvent.findMany({
        where: {
          tutorId,
          deletedAt: null,
          isCancelled: false,
          OR: [
            {
              startTime: { lt: endTime },
              endTime: { gt: startTime },
            },
          ],
        },
      })
      
      if (conflicts.length > 0) {
        return NextResponse.json({
          error: 'Schedule conflict detected',
          conflicts: conflicts.map((c: any) => ({
            id: c.id,
            title: c.title,
            startTime: c.startTime,
            endTime: c.endTime,
          })),
        }, { status: 409 })
      }
    }
    
    // Create event
    const event = await db.calendarEvent.create({
      data: {
        tutorId,
        title: data.title,
        description: data.description,
        type: data.type,
        startTime,
        endTime,
        timezone: data.timezone,
        isAllDay: data.isAllDay,
        location: data.location,
        meetingUrl: data.meetingUrl,
        isVirtual: data.isVirtual,
        curriculumId: data.curriculumId,
        batchId: data.batchId,
        studentId: data.studentId,
        maxAttendees: data.maxAttendees,
        attendees: data.attendees,
        reminders: data.reminders,
        color: data.color,
        recurrenceRule: data.recurrenceRule,
        isRecurring: !!data.recurrenceRule,
        createdBy: 'manual',
      },
      include: {
        curriculum: {
          select: { id: true, name: true, subject: true },
        },
        batch: {
          select: { id: true, name: true },
        },
      },
    })
    
    // Create notification reminders (background task)
    createReminderNotifications(event, tutorId).catch(console.error)
    
    return NextResponse.json({ event }, { status: 201 })
  } catch (error) {
    console.error('Create calendar event error:', error)
    return NextResponse.json(
      { error: 'Failed to create event' },
      { status: 500 }
    )
  }
}, { role: 'TUTOR' })

// Helper: Expand recurring events
function expandRecurringEvents(
  events: any[],
  rangeStart: Date,
  rangeEnd: Date
): any[] {
  const expanded: any[] = []
  
  for (const event of events) {
    if (!event.recurrenceRule || event.recurringEventId) {
      // Non-recurring event or exception
      expanded.push(event)
      continue
    }
    
    // Parse RRULE (simplified implementation)
    // In production, use a library like rrule.js
    const rrule = parseRRULE(event.recurrenceRule, event.startTime)
    if (!rrule) {
      expanded.push(event)
      continue
    }
    
    // Generate occurrences within range
    const occurrences = generateOccurrences(rrule, event, rangeStart, rangeEnd)
    expanded.push(...occurrences)
  }
  
  return expanded
}

function parseRRULE(rrule: string, dtstart: Date): any | null {
  // Simplified RRULE parsing
  // Format: FREQ=DAILY;INTERVAL=1;UNTIL=20241231T235959Z
  const parts: Record<string, string> = {}
  rrule.split(';').forEach(part => {
    const [key, value] = part.split('=')
    if (key && value) parts[key] = value
  })
  
  return {
    freq: parts.FREQ || 'DAILY',
    interval: parseInt(parts.INTERVAL || '1', 10),
    until: parts.UNTIL ? new Date(parts.UNTIL) : null,
    count: parts.COUNT ? parseInt(parts.COUNT, 10) : null,
    byday: parts.BYDAY?.split(','),
    dtstart,
  }
}

function generateOccurrences(
  rrule: any,
  event: any,
  rangeStart: Date,
  rangeEnd: Date
): any[] {
  const occurrences: any[] = []
  let current = new Date(rrule.dtstart)
  let count = 0
  const maxCount = rrule.count || 365 // Max 1 year of occurrences
  
  while (current <= rangeEnd && count < maxCount) {
    if (current >= rangeStart) {
      const duration = new Date(event.endTime).getTime() - new Date(event.startTime).getTime()
      const occurrenceEnd = new Date(current.getTime() + duration)
      
      occurrences.push({
        ...event,
        id: `${event.id}-${current.toISOString()}`,
        startTime: current,
        endTime: occurrenceEnd,
        isOccurrence: true,
        recurringEventId: event.id,
      })
    }
    
    // Advance to next occurrence
    current = addInterval(current, rrule.freq, rrule.interval)
    count++
    
    if (rrule.until && current > rrule.until) break
  }
  
  return occurrences
}

function addInterval(date: Date, freq: string, interval: number): Date {
  const result = new Date(date)
  switch (freq) {
    case 'DAILY':
      result.setDate(result.getDate() + interval)
      break
    case 'WEEKLY':
      result.setDate(result.getDate() + interval * 7)
      break
    case 'MONTHLY':
      result.setMonth(result.getMonth() + interval)
      break
    default:
      result.setDate(result.getDate() + interval)
  }
  return result
}

// Helper: Create reminder notifications
async function createReminderNotifications(event: any, tutorId: string) {
  const reminders = event.reminders || []
  
  for (const reminder of reminders) {
    const reminderTime = new Date(event.startTime.getTime() - reminder.minutes * 60000)
    
    if (reminderTime > new Date()) {
      await db.notification.create({
        data: {
          userId: tutorId,
          type: 'reminder',
          title: `Reminder: ${event.title}`,
          message: `Starting in ${reminder.minutes} minutes`,
          actionUrl: `/tutor/calendar?event=${event.id}`,
          data: {
            eventId: event.id,
            reminderMinutes: reminder.minutes,
            scheduledFor: reminderTime.toISOString(),
          },
        },
      })
    }
  }
}
