/**
 * Individual Calendar Event API
 * GET /api/tutor/calendar/events/[id] - Get event details
 * PUT /api/tutor/calendar/events/[id] - Update event
 * DELETE /api/tutor/calendar/events/[id] - Delete/cancel event
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/lib/api/middleware'
import { db } from '@/lib/db'
import { z } from 'zod'

const UpdateEventSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().optional(),
  type: z.enum(['LESSON', 'CLINIC', 'CONSULTATION', 'BREAK', 'PERSONAL', 'OTHER']).optional(),
  startTime: z.string().datetime().optional(),
  endTime: z.string().datetime().optional(),
  timezone: z.string().optional(),
  isAllDay: z.boolean().optional(),
  location: z.string().optional(),
  meetingUrl: z.string().optional(),
  isVirtual: z.boolean().optional(),
  curriculumId: z.string().optional().nullable(),
  batchId: z.string().optional().nullable(),
  studentId: z.string().optional().nullable(),
  maxAttendees: z.number().min(1).optional(),
  attendees: z.array(z.object({
    userId: z.string().optional(),
    email: z.string(),
    name: z.string(),
    status: z.enum(['pending', 'accepted', 'declined']).default('pending'),
  })).optional(),
  reminders: z.array(z.object({
    minutes: z.number(),
    type: z.enum(['email', 'push', 'sms']),
  })).optional(),
  color: z.string().optional(),
  status: z.enum(['CONFIRMED', 'TENTATIVE', 'CANCELLED']).optional(),
  isCancelled: z.boolean().optional(),
})

// GET - Get event details
export const GET = withAuth(async (req: NextRequest, session, context) => {
  const params = await context?.params
  const id = params?.id as string
  const tutorId = session.user.id
  
  try {
    const event = await db.calendarEvent.findFirst({
      where: {
        id,
        tutorId,
        deletedAt: null,
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
    
    if (!event) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ event })
  } catch (error) {
    console.error('Fetch event error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch event' },
      { status: 500 }
    )
  }
}, { role: 'TUTOR' })

// PUT - Update event
export const PUT = withAuth(async (req: NextRequest, session, context) => {
  const params = await context?.params
  const id = params?.id as string
  const tutorId = session.user.id
  
  try {
    const body = await req.json()
    const validation = UpdateEventSchema.safeParse(body)
    
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid request', details: validation.error.format() },
        { status: 400 }
      )
    }
    
    const data = validation.data
    
    // Check if event exists and belongs to tutor
    const existingEvent = await db.calendarEvent.findFirst({
      where: { id, tutorId, deletedAt: null },
    })
    
    if (!existingEvent) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      )
    }
    
    // Check for conflicts if dates changed
    if ((data.startTime || data.endTime) && existingEvent.type !== 'PERSONAL') {
      const newStart = data.startTime ? new Date(data.startTime) : existingEvent.startTime
      const newEnd = data.endTime ? new Date(data.endTime) : existingEvent.endTime
      
      const conflicts = await db.calendarEvent.findMany({
        where: {
          tutorId,
          id: { not: id },
          deletedAt: null,
          isCancelled: false,
          OR: [
            {
              startTime: { lt: newEnd },
              endTime: { gt: newStart },
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
    
    // Build update data
    const updateData: any = {}
    
    if (data.title !== undefined) updateData.title = data.title
    if (data.description !== undefined) updateData.description = data.description
    if (data.type !== undefined) updateData.type = data.type
    if (data.startTime !== undefined) updateData.startTime = new Date(data.startTime)
    if (data.endTime !== undefined) updateData.endTime = new Date(data.endTime)
    if (data.timezone !== undefined) updateData.timezone = data.timezone
    if (data.isAllDay !== undefined) updateData.isAllDay = data.isAllDay
    if (data.location !== undefined) updateData.location = data.location
    if (data.meetingUrl !== undefined) updateData.meetingUrl = data.meetingUrl
    if (data.isVirtual !== undefined) updateData.isVirtual = data.isVirtual
    if (data.curriculumId !== undefined) updateData.curriculumId = data.curriculumId
    if (data.batchId !== undefined) updateData.batchId = data.batchId
    if (data.studentId !== undefined) updateData.studentId = data.studentId
    if (data.maxAttendees !== undefined) updateData.maxAttendees = data.maxAttendees
    if (data.attendees !== undefined) updateData.attendees = data.attendees
    if (data.reminders !== undefined) updateData.reminders = data.reminders
    if (data.color !== undefined) updateData.color = data.color
    if (data.status !== undefined) updateData.status = data.status
    if (data.isCancelled !== undefined) updateData.isCancelled = data.isCancelled
    
    const event = await db.calendarEvent.update({
      where: { id },
      data: updateData,
      include: {
        curriculum: {
          select: { id: true, name: true, subject: true },
        },
        batch: {
          select: { id: true, name: true },
        },
      },
    })
    
    return NextResponse.json({ event })
  } catch (error) {
    console.error('Update event error:', error)
    return NextResponse.json(
      { error: 'Failed to update event' },
      { status: 500 }
    )
  }
}, { role: 'TUTOR' })

// DELETE - Delete/cancel event
export const DELETE = withAuth(async (req: NextRequest, session, context) => {
  const params = await context?.params
  const id = params?.id as string
  const tutorId = session.user.id
  const { searchParams } = new URL(req.url)
  const deleteSeries = searchParams.get('series') === 'true'
  
  try {
    // Check if event exists and belongs to tutor
    const existingEvent = await db.calendarEvent.findFirst({
      where: { id, tutorId, deletedAt: null },
    })
    
    if (!existingEvent) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      )
    }
    
    if (deleteSeries && existingEvent.isRecurring) {
      // Delete all recurring events
      await db.calendarEvent.updateMany({
        where: {
          OR: [
            { id },
            { recurringEventId: id },
          ],
          tutorId,
        },
        data: {
          deletedAt: new Date(),
          isCancelled: true,
        },
      })
      
      return NextResponse.json({
        message: 'Recurring event series deleted',
        deletedCount: 'multiple',
      })
    }
    
    // Soft delete single event
    await db.calendarEvent.update({
      where: { id },
      data: {
        deletedAt: new Date(),
        isCancelled: true,
      },
    })
    
    return NextResponse.json({
      message: 'Event deleted successfully',
      deletedCount: 1,
    })
  } catch (error) {
    console.error('Delete event error:', error)
    return NextResponse.json(
      { error: 'Failed to delete event' },
      { status: 500 }
    )
  }
}, { role: 'TUTOR' })
