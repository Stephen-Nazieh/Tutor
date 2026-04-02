import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { eq } from 'drizzle-orm'
import { authOptions } from '@/lib/auth'
import { drizzleDb } from '@/lib/db/drizzle'
import { oneOnOneBookingRequest, calendarEvent } from '@/lib/db/schema'
import { z } from 'zod'

const cancelSchema = z.object({
  requestId: z.string().min(1),
  reason: z.string().max(500).optional(),
})

export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const validated = cancelSchema.parse(body)

    // Get the existing request
    const existingRequest = await drizzleDb.query.oneOnOneBookingRequest.findFirst({
      where: eq(oneOnOneBookingRequest.id, validated.requestId),
    })

    if (!existingRequest) {
      return NextResponse.json({ error: 'Request not found' }, { status: 404 })
    }

    // Verify the user is either the student or tutor of this request
    const isStudent = existingRequest.studentId === session.user.id
    const isTutor = existingRequest.tutorId === session.user.id

    if (!isStudent && !isTutor) {
      return NextResponse.json({ error: 'Not authorized to cancel this request' }, { status: 403 })
    }

    // Only allow canceling if status is PENDING or ACCEPTED (not yet paid)
    if (!['PENDING', 'ACCEPTED'].includes(existingRequest.status)) {
      return NextResponse.json(
        {
          error: `Cannot cancel a request that is already ${existingRequest.status.toLowerCase()}`,
        },
        { status: 400 }
      )
    }

    // If there's a calendar event, mark it as cancelled
    if (existingRequest.calendarEventId) {
      await drizzleDb
        .update(calendarEvent)
        .set({
          status: 'CANCELLED',
          isCancelled: true,
          updatedAt: new Date(),
        })
        .where(eq(calendarEvent.id, existingRequest.calendarEventId))
    }

    // Update request status
    const updatedRequest = await drizzleDb
      .update(oneOnOneBookingRequest)
      .set({
        status: 'CANCELLED',
        tutorNotes:
          validated.reason && isStudent
            ? `${existingRequest.tutorNotes || ''}\nCancellation reason (from student): ${validated.reason}`.trim()
            : validated.reason && isTutor
              ? `${existingRequest.tutorNotes || ''}\nCancellation reason (from tutor): ${validated.reason}`.trim()
              : existingRequest.tutorNotes,
        updatedAt: new Date(),
      })
      .where(eq(oneOnOneBookingRequest.id, validated.requestId))
      .returning()

    // TODO: Send notification to the other party

    return NextResponse.json({
      success: true,
      request: updatedRequest[0],
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: 'Invalid request data',
          details: error.issues,
        },
        { status: 400 }
      )
    }

    console.error('Error canceling one-on-one request:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
