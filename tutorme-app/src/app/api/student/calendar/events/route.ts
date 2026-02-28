/**
 * Student calendar events API
 * Returns classes/clinics (with date/time set by tutors) that the student has booked,
 * for display on the student dashboard calendar.
 *
 * GET /api/student/calendar/events?start=ISO&end=ISO
 */

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession, authOptions } from '@/lib/auth'
import { drizzleDb } from '@/lib/db/drizzle'
import { clinicBooking, clinic, user, profile } from '@/lib/db/schema'
import { eq, and, gte, lte } from 'drizzle-orm'
import { asc } from 'drizzle-orm'

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions, req)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const startParam = searchParams.get('start')
    const endParam = searchParams.get('end')

    const now = new Date()
    const start = startParam
      ? new Date(startParam)
      : new Date(now.getFullYear(), now.getMonth(), 1)
    const end = endParam
      ? new Date(endParam)
      : new Date(now.getFullYear(), now.getMonth() + 2, 0)

    const bookings = await drizzleDb
      .select({
        bookingId: clinicBooking.id,
        clinicId: clinic.id,
        title: clinic.title,
        subject: clinic.subject,
        startTime: clinic.startTime,
        duration: clinic.duration,
        tutorName: profile.name,
        avatarUrl: profile.avatarUrl,
      })
      .from(clinicBooking)
      .innerJoin(clinic, eq(clinicBooking.clinicId, clinic.id))
      .leftJoin(user, eq(clinic.tutorId, user.id))
      .leftJoin(profile, eq(profile.userId, user.id))
      .where(
        and(
          eq(clinicBooking.studentId, session.user.id),
          gte(clinic.startTime, start),
          lte(clinic.startTime, end)
        )
      )
      .orderBy(asc(clinic.startTime))

    const events = bookings.map((b) => {
      const startTime = new Date(b.startTime)
      const endTime = new Date(
        startTime.getTime() + b.duration * 60 * 1000
      )
      return {
        id: b.clinicId,
        bookingId: b.bookingId,
        title: b.title,
        subject: b.subject,
        start: startTime.toISOString(),
        end: endTime.toISOString(),
        duration: b.duration,
        type: 'class' as const,
        tutorName: b.tutorName ?? null,
      }
    })

    return NextResponse.json({ events })
  } catch (error) {
    console.error('Failed to fetch calendar events:', error)
    return NextResponse.json(
      { error: 'Failed to fetch calendar events' },
      { status: 500 }
    )
  }
}
