/**
 * GET /api/student/calendar/events
 * Returns calendar events for the current student.
 * Queries CalendarEvent joined with CourseEnrollment to show sessions
 * for courses the student is enrolled in.
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/lib/api/middleware'
import { drizzleDb } from '@/lib/db/drizzle'
import { calendarEvent, courseEnrollment, profile, liveSession } from '@/lib/db/schema'
import { eq, and, gte, lte, inArray } from 'drizzle-orm'

export const GET = withAuth(
  async (req: NextRequest, session) => {
    const studentId = session.user.id
    const { searchParams } = new URL(req.url)
    const startParam = searchParams.get('start')
    const endParam = searchParams.get('end')

    const startDate = startParam ? new Date(startParam) : new Date()
    const endDate = endParam ? new Date(endParam) : new Date()

    if (endParam) {
      endDate.setHours(23, 59, 59, 999)
    }

    // Find courses the student is enrolled in
    const enrollments = await drizzleDb
      .select({ courseId: courseEnrollment.courseId })
      .from(courseEnrollment)
      .where(eq(courseEnrollment.studentId, studentId))

    const courseIds = enrollments.map(e => e.courseId).filter(Boolean)

    if (courseIds.length === 0) {
      return NextResponse.json({ events: [] })
    }

    const filters = [
      inArray(calendarEvent.courseId, courseIds),
      eq(calendarEvent.isCancelled, false),
    ]

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
        tutorId: calendarEvent.tutorId,
        externalId: calendarEvent.externalId,
        sessionStatus: liveSession.status,
      })
      .from(calendarEvent)
      .leftJoin(liveSession, eq(liveSession.sessionId, calendarEvent.externalId))
      .where(and(...filters))
      .orderBy(calendarEvent.startTime)

    // Fetch tutor names from profile
    const tutorIds = [...new Set(events.map(e => e.tutorId).filter(Boolean))]
    const tutorProfiles =
      tutorIds.length > 0
        ? await drizzleDb
            .select({ userId: profile.userId, name: profile.name })
            .from(profile)
            .where(inArray(profile.userId, tutorIds))
        : []

    const tutorMap = new Map(tutorProfiles.map(t => [t.userId, t.name]))

    const formatted = events.map(e => {
      const durationMs =
        e.endTime && e.startTime
          ? new Date(e.endTime).getTime() - new Date(e.startTime).getTime()
          : 3600000
      const durationMinutes = Math.round(durationMs / 60000)

      return {
        id: e.eventId,
        bookingId: e.eventId,
        title: e.title,
        subject: e.description || 'Class',
        start: e.startTime?.toISOString() ?? new Date().toISOString(),
        end: e.endTime?.toISOString() ?? new Date().toISOString(),
        duration: durationMinutes,
        type: 'class' as const,
        tutorName: e.tutorId ? (tutorMap.get(e.tutorId) ?? 'Tutor') : 'Tutor',
        meetingUrl: e.meetingUrl,
        location: e.location,
        isVirtual: e.isVirtual,
        status: e.sessionStatus || 'scheduled',
      }
    })

    return NextResponse.json({ events: formatted })
  },
  { role: 'STUDENT' }
)
