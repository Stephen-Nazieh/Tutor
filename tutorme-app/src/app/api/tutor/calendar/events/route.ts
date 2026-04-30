/**
 * GET /api/tutor/calendar/events
 * Returns calendar events for the current tutor.
 * Queries CalendarEvent table which is populated during course publishing.
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/lib/api/middleware'
import { drizzleDb } from '@/lib/db/drizzle'
import { calendarEvent, liveSession } from '@/lib/db/schema'
import { eq, and, gte, lte } from 'drizzle-orm'

export const GET = withAuth(
  async (req: NextRequest, session) => {
    const tutorId = session.user.id
    const { searchParams } = new URL(req.url)
    const startParam = searchParams.get('start')
    const endParam = searchParams.get('end')

    const startDate = startParam ? new Date(startParam) : new Date()
    const endDate = endParam ? new Date(endParam) : new Date()

    if (endParam) {
      endDate.setHours(23, 59, 59, 999)
    }

    const filters = [eq(calendarEvent.tutorId, tutorId), eq(calendarEvent.isCancelled, false)]

    if (startParam) {
      filters.push(gte(calendarEvent.startTime, startDate))
    }
    if (endParam) {
      filters.push(lte(calendarEvent.startTime, endDate))
    }

    const events = await drizzleDb
      .select({
        eventId: calendarEvent.eventId,
        title: calendarEvent.title,
        description: calendarEvent.description,
        startTime: calendarEvent.startTime,
        endTime: calendarEvent.endTime,
        status: calendarEvent.status,
        meetingUrl: calendarEvent.meetingUrl,
        courseId: calendarEvent.courseId,
        location: calendarEvent.location,
        isVirtual: calendarEvent.isVirtual,
        sessionStatus: liveSession.status,
        sessionId: liveSession.sessionId,
      })
      .from(calendarEvent)
      .leftJoin(liveSession, eq(liveSession.sessionId, calendarEvent.externalId))
      .where(and(...filters))
      .orderBy(calendarEvent.startTime)

    const formatted = events.map(e => ({
      id: e.eventId,
      title: e.title,
      subject: e.description || 'Class',
      scheduledAt: e.startTime?.toISOString() ?? new Date().toISOString(),
      duration:
        e.endTime && e.startTime
          ? Math.round((new Date(e.endTime).getTime() - new Date(e.startTime).getTime()) / 60000)
          : 60,
      status: e.sessionStatus || 'scheduled',
      meetingUrl: e.meetingUrl,
      courseId: e.courseId,
      location: e.location,
      isVirtual: e.isVirtual,
      sessionId: e.sessionId,
    }))

    return NextResponse.json({ events: formatted })
  },
  { role: 'TUTOR' }
)
