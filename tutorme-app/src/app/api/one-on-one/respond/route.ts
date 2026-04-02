import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { eq, and } from 'drizzle-orm'
import { authOptions } from '@/lib/auth'
import { drizzleDb } from '@/lib/db/drizzle'
import { oneOnOneBookingRequest, calendarEvent } from '@/lib/db/schema'
import { nanoid } from 'nanoid'
import { z } from 'zod'

const respondSchema = z.object({
  requestId: z.string().min(1),
  action: z.enum(['accept', 'reject']),
  selectedSlot: z.object({
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    startTime: z.string().regex(/^\d{2}:\d{2}$/),
    endTime: z.string().regex(/^\d{2}:\d{2}$/),
  }).optional(),
  tutorNotes: z.string().max(1000).optional(),
})

export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (session.user.role !== 'TUTOR') {
      return NextResponse.json({ error: 'Only tutors can respond to requests' }, { status: 403 })
    }

    const body = await request.json()
    const validated = respondSchema.parse(body)

    // Get the existing request
    const existingRequest = await drizzleDb.query.oneOnOneBookingRequest.findFirst({
      where: and(
        eq(oneOnOneBookingRequest.id, validated.requestId),
        eq(oneOnOneBookingRequest.tutorId, session.user.id)
      ),
    })

    if (!existingRequest) {
      return NextResponse.json({ error: 'Request not found' }, { status: 404 })
    }

    if (existingRequest.status !== 'PENDING') {
      return NextResponse.json({ 
        error: `Request is already ${existingRequest.status.toLowerCase()}` 
      }, { status: 400 })
    }

    if (validated.action === 'accept') {
      // Parse the selected date and time
      const slotDate = validated.selectedSlot?.date || existingRequest.requestedDate.toISOString().split('T')[0]
      const slotStartTime = validated.selectedSlot?.startTime || existingRequest.startTime
      const slotEndTime = validated.selectedSlot?.endTime || existingRequest.endTime

      // Create event timestamps
      const eventStart = new Date(`${slotDate}T${slotStartTime}:00`)
      const eventEnd = new Date(`${slotDate}T${slotEndTime}:00`)

      // Create calendar event
      const newEvent = await drizzleDb.insert(calendarEvent).values({
        id: nanoid(),
        tutorId: existingRequest.tutorId,
        title: `1-on-1 Session`,
        description: `One-on-one tutoring session with student`,
        startTime: eventStart,
        endTime: eventEnd,
        type: 'CONSULTATION', // Using existing enum value
        status: 'CONFIRMED',
        timezone: existingRequest.timezone,
        isAllDay: false,
        isRecurring: false,
        isVirtual: true,
        maxAttendees: 2,
        attendees: [existingRequest.studentId],
        reminders: [15, 60], // 15 min and 1 hour before
        createdBy: existingRequest.tutorId,
        isCancelled: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      }).returning()

      // Update request status
      const updatedRequest = await drizzleDb.update(oneOnOneBookingRequest)
        .set({
          status: 'ACCEPTED',
          tutorNotes: validated.tutorNotes || existingRequest.tutorNotes,
          tutorResponseAt: new Date(),
          calendarEventId: newEvent[0].id,
          updatedAt: new Date(),
        })
        .where(eq(oneOnOneBookingRequest.id, validated.requestId))
        .returning()

      // TODO: Send notification to student that request was accepted

      return NextResponse.json({
        success: true,
        request: updatedRequest[0],
        calendarEvent: newEvent[0],
      })

    } else {
      // Reject the request
      const updatedRequest = await drizzleDb.update(oneOnOneBookingRequest)
        .set({
          status: 'REJECTED',
          tutorNotes: validated.tutorNotes || existingRequest.tutorNotes,
          tutorResponseAt: new Date(),
          updatedAt: new Date(),
        })
        .where(eq(oneOnOneBookingRequest.id, validated.requestId))
        .returning()

      // TODO: Send notification to student that request was rejected

      return NextResponse.json({
        success: true,
        request: updatedRequest[0],
      })
    }

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ 
        error: 'Invalid request data', 
        details: error.errors 
      }, { status: 400 })
    }

    console.error('Error responding to one-on-one request:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
