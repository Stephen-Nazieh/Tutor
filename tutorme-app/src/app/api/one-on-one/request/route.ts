import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { eq, and, or } from 'drizzle-orm'
import { authOptions } from '@/lib/auth'
import { drizzleDb } from '@/lib/db/drizzle'
import { oneOnOneBookingRequest, profile } from '@/lib/db/schema'
import { nanoid } from 'nanoid'
import { z } from 'zod'

const requestSchema = z.object({
  tutorId: z.string().min(1),
  proposedSlots: z
    .array(
      z.object({
        date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), // YYYY-MM-DD
        startTime: z.string().regex(/^\d{2}:\d{2}$/), // HH:mm
        endTime: z.string().regex(/^\d{2}:\d{2}$/), // HH:mm
      })
    )
    .min(1)
    .max(5),
  duration: z.number().min(30).max(180), // minutes: 30-180
  studentNotes: z.string().max(1000).optional(),
})

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (session.user.role !== 'STUDENT') {
      return NextResponse.json(
        { error: 'Only students can request one-on-one sessions' },
        { status: 403 }
      )
    }

    const body = await request.json()
    const validated = requestSchema.parse(body)

    // Get tutor profile to check rate and availability
    const tutorProfile = await drizzleDb.query.profile.findFirst({
      where: eq(profile.userId, validated.tutorId),
      columns: {
        hourlyRate: true,
        oneOnOneEnabled: true,
        currency: true,
        timezone: true,
      },
    })

    if (!tutorProfile) {
      return NextResponse.json({ error: 'Tutor not found' }, { status: 404 })
    }

    if (!tutorProfile.oneOnOneEnabled || !tutorProfile.hourlyRate) {
      return NextResponse.json(
        { error: 'Tutor does not offer one-on-one sessions' },
        { status: 400 }
      )
    }

    // Check for existing pending request with this tutor
    const existingRequest = await drizzleDb.query.oneOnOneBookingRequest.findFirst({
      where: and(
        eq(oneOnOneBookingRequest.tutorId, validated.tutorId),
        eq(oneOnOneBookingRequest.studentId, session.user.id),
        or(
          eq(oneOnOneBookingRequest.status, 'PENDING'),
          eq(oneOnOneBookingRequest.status, 'ACCEPTED')
        )
      ),
    })

    if (existingRequest) {
      return NextResponse.json(
        {
          error: 'You already have an active request with this tutor',
          existingRequestId: existingRequest.id,
          status: existingRequest.status,
        },
        { status: 409 }
      )
    }

    // For the existing table, use the first proposed slot as the primary request
    // Store remaining slots in tutorNotes as JSON
    const [primarySlot, ...additionalSlots] = validated.proposedSlots
    const durationHours = validated.duration / 60
    const costPerSession = Math.round(tutorProfile.hourlyRate * durationHours * 100) / 100

    // Parse the date and time
    const requestedDate = new Date(`${primarySlot.date}T00:00:00`)

    // Create the request
    const newRequest = await drizzleDb
      .insert(oneOnOneBookingRequest)
      .values({
        id: nanoid(),
        tutorId: validated.tutorId,
        studentId: session.user.id,
        requestedDate,
        startTime: primarySlot.startTime,
        endTime: primarySlot.endTime,
        timezone: tutorProfile.timezone || 'UTC',
        durationMinutes: validated.duration,
        costPerSession,
        status: 'PENDING',
        tutorNotes:
          additionalSlots.length > 0
            ? `Alternative slots: ${JSON.stringify(additionalSlots)}`
            : null,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning()

    // TODO: Send notification to tutor

    return NextResponse.json(
      {
        success: true,
        request: newRequest[0],
      },
      { status: 201 }
    )
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

    console.error('Error creating one-on-one request:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// Get all pending requests for the current user (student or tutor)
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const role = searchParams.get('role') // 'sent' or 'received'

    let requests
    if (role === 'sent' || session.user.role === 'STUDENT') {
      // Get requests sent by current user (as student)
      requests = await drizzleDb.query.oneOnOneBookingRequest.findMany({
        where: eq(oneOnOneBookingRequest.studentId, session.user.id),
        orderBy: (oneOnOneBookingRequest, { desc }) => [desc(oneOnOneBookingRequest.createdAt)],
        with: {
          tutor: {
            columns: {
              id: true,
              handle: true,
              email: true,
              image: true,
            },
          },
        },
      })
    } else if (role === 'received' || session.user.role === 'TUTOR') {
      // Get requests received by current user (as tutor)
      requests = await drizzleDb.query.oneOnOneBookingRequest.findMany({
        where: eq(oneOnOneBookingRequest.tutorId, session.user.id),
        orderBy: (oneOnOneBookingRequest, { desc }) => [desc(oneOnOneBookingRequest.createdAt)],
        with: {
          student: {
            columns: {
              id: true,
              handle: true,
              email: true,
              image: true,
            },
          },
        },
      })
    } else {
      return NextResponse.json({ error: 'Invalid role parameter' }, { status: 400 })
    }

    return NextResponse.json({ requests })
  } catch (error) {
    console.error('Error fetching one-on-one requests:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
