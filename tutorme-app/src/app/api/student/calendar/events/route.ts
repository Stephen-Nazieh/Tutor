/**
 * Student calendar events API
 * Returns classes/clinics (with date/time set by tutors) that the student has booked,
 * for display on the student dashboard calendar.
 *
 * GET /api/student/calendar/events?start=ISO&end=ISO
 */

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const startParam = searchParams.get('start')
    const endParam = searchParams.get('end')

    const now = new Date()
    const start = startParam ? new Date(startParam) : new Date(now.getFullYear(), now.getMonth(), 1)
    const end = endParam ? new Date(endParam) : new Date(now.getFullYear(), now.getMonth() + 2, 0)

    const bookings = await db.clinicBooking.findMany({
      where: {
        studentId: session.user.id,
        clinic: {
          startTime: { gte: start, lte: end },
        },
      },
      include: {
        clinic: {
          include: {
            tutor: {
              select: {
                id: true,
                profile: {
                  select: { name: true, avatarUrl: true }
                }
              }
            }
          }
        }
      },
      orderBy: { clinic: { startTime: 'asc' } },
    })

    const events = bookings.map((b: any) => {
      const clinic = b.clinic
      const startTime = new Date(clinic.startTime)
      const endTime = new Date(startTime.getTime() + clinic.duration * 60 * 1000)
      return {
        id: clinic.id,
        bookingId: b.id,
        title: clinic.title,
        subject: clinic.subject,
        start: startTime.toISOString(),
        end: endTime.toISOString(),
        duration: clinic.duration,
        type: 'class' as const,
        tutorName: clinic.tutor?.profile?.name ?? null,
      }
    })

    return NextResponse.json({ events })
  } catch (error) {
    console.error('Failed to fetch calendar events:', error)
    return NextResponse.json({ error: 'Failed to fetch calendar events' }, { status: 500 })
  }
}
