/**
 * Tutor Calendar Exceptions API
 * POST /api/tutor/calendar/exceptions - Create exception (block/unblock specific dates)
 * GET /api/tutor/calendar/exceptions - List exceptions
 * 
 * Used to block specific dates or override recurring availability
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/lib/api/middleware'
import { db } from '@/lib/db'
import { z } from 'zod'

const ExceptionSchema = z.object({
  date: z.string().datetime(),
  isAvailable: z.boolean().default(false),
  startTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).optional(),
  endTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).optional(),
  reason: z.string().optional(),
})

export const GET = withAuth(async (req: NextRequest, session) => {
  const tutorId = session.user.id
  const { searchParams } = new URL(req.url)
  
  const start = searchParams.get('start')
  const end = searchParams.get('end')
  
  try {
    const exceptions = await db.calendarException.findMany({
      where: {
        tutorId,
        ...(start || end ? {
          date: {
            ...(start ? { gte: new Date(start) } : {}),
            ...(end ? { lte: new Date(end) } : {}),
          },
        } : {}),
      },
      orderBy: { date: 'asc' },
    })
    
    return NextResponse.json({ exceptions })
  } catch (error) {
    console.error('Fetch exceptions error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch exceptions' },
      { status: 500 }
    )
  }
}, { role: 'TUTOR' })

export const POST = withAuth(async (req: NextRequest, session) => {
  const tutorId = session.user.id
  
  try {
    const body = await req.json()
    const validation = ExceptionSchema.safeParse(body)
    
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid request', details: validation.error.format() },
        { status: 400 }
      )
    }
    
    const data = validation.data
    
    // Validate times if provided
    if (data.startTime && data.endTime) {
      if (data.startTime >= data.endTime) {
        return NextResponse.json(
          { error: 'End time must be after start time' },
          { status: 400 }
        )
      }
    }
    
    const date = new Date(data.date)
    date.setUTCHours(0, 0, 0, 0)
    
    // Check if exception already exists for this date
    const existing = await db.calendarException.findFirst({
      where: {
        tutorId,
        date,
        startTime: data.startTime || null,
        endTime: data.endTime || null,
      },
    })
    
    if (existing) {
      // Update existing exception
      const updated = await db.calendarException.update({
        where: { id: existing.id },
        data: {
          isAvailable: data.isAvailable,
          reason: data.reason,
        },
      })
      
      return NextResponse.json({ exception: updated })
    }
    
    // Create new exception
    const exception = await db.calendarException.create({
      data: {
        tutorId,
        date,
        isAvailable: data.isAvailable,
        startTime: data.startTime,
        endTime: data.endTime,
        reason: data.reason,
      },
    })
    
    return NextResponse.json({ exception }, { status: 201 })
  } catch (error: any) {
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'Exception already exists for this date and time' },
        { status: 409 }
      )
    }
    
    console.error('Create exception error:', error)
    return NextResponse.json(
      { error: 'Failed to create exception' },
      { status: 500 }
    )
  }
}, { role: 'TUTOR' })

// Bulk create exceptions (e.g., block multiple dates)
export const PUT = withAuth(async (req: NextRequest, session) => {
  const tutorId = session.user.id
  
  try {
    const body = await req.json()
    const { dates, isAvailable = false, reason } = body
    
    if (!Array.isArray(dates) || dates.length === 0) {
      return NextResponse.json(
        { error: 'Dates array is required' },
        { status: 400 }
      )
    }
    
    const results = await db.$transaction(
      dates.map((dateStr: string) => {
        const date = new Date(dateStr)
        date.setUTCHours(0, 0, 0, 0)
        
        return db.calendarException.upsert({
          where: {
            tutorId_date_startTime: {
              tutorId,
              date,
              startTime: null,
            },
          },
          update: {
            isAvailable,
            reason,
          },
          create: {
            tutorId,
            date,
            isAvailable,
            reason,
          },
        })
      })
    )
    
    return NextResponse.json({
      exceptions: results,
      count: results.length,
    })
  } catch (error) {
    console.error('Bulk create exceptions error:', error)
    return NextResponse.json(
      { error: 'Failed to create exceptions' },
      { status: 500 }
    )
  }
}, { role: 'TUTOR' })
