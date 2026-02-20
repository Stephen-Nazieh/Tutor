/**
 * Tutor Calendar Sync API
 * GET /api/tutor/calendar/sync - Get sync status
 * POST /api/tutor/calendar/sync - Trigger sync with external calendars
 * 
 * Integrates with Google Calendar, Outlook, Apple Calendar
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/lib/api/middleware'
import { db } from '@/lib/db'
import { z } from 'zod'

const SyncRequestSchema = z.object({
  provider: z.enum(['google', 'outlook', 'apple']).optional(),
  direction: z.enum(['to_external', 'from_external', 'bidirectional']).default('bidirectional'),
  dateRange: z.object({
    start: z.string().datetime(),
    end: z.string().datetime(),
  }).optional(),
})

export const GET = withAuth(async (req: NextRequest, session) => {
  const tutorId = session.user.id
  
  try {
    // Get calendar connections
    const connections = await db.calendarConnection.findMany({
      where: { userId: tutorId },
      orderBy: { provider: 'asc' },
    })
    
    // Get sync statistics
    const stats = await db.calendarEvent.groupBy({
      by: ['createdBy'],
      where: {
        tutorId,
        deletedAt: null,
      },
      _count: {
        id: true,
      },
    })
    
    const syncStats = {
      manual: stats.find((s: any) => s.createdBy === 'manual')?._count.id || 0,
      sync: stats.find((s: any) => s.createdBy === 'sync')?._count.id || 0,
      system: stats.find((s: any) => s.createdBy === 'system')?._count.id || 0,
    }
    
    return NextResponse.json({
      connections: connections.map((c: any) => ({
        provider: c.provider,
        syncEnabled: c.syncEnabled,
        syncDirection: c.syncDirection,
        lastSyncedAt: c.lastSyncedAt,
        expiresAt: c.expiresAt,
      })),
      stats: syncStats,
    })
  } catch (error) {
    console.error('Fetch sync status error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch sync status' },
      { status: 500 }
    )
  }
}, { role: 'TUTOR' })

export const POST = withAuth(async (req: NextRequest, session) => {
  const tutorId = session.user.id
  
  try {
    const body = await req.json()
    const validation = SyncRequestSchema.safeParse(body)
    
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid request', details: validation.error.format() },
        { status: 400 }
      )
    }
    
    const { provider, direction, dateRange } = validation.data
    
    // Get calendar connections
    const connections = await db.calendarConnection.findMany({
      where: {
        userId: tutorId,
        syncEnabled: true,
        ...(provider ? { provider } : {}),
      },
    })
    
    if (connections.length === 0) {
      return NextResponse.json(
        { error: 'No calendar connections found. Please connect a calendar first.' },
        { status: 404 }
      )
    }
    
    const results = []
    const defaultDateRange = {
      start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
      end: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),   // 90 days ahead
    }
    
    const range = dateRange ? {
      start: new Date(dateRange.start),
      end: new Date(dateRange.end),
    } : defaultDateRange
    
    for (const connection of connections) {
      // Check if token is expired
      if (connection.expiresAt && connection.expiresAt < new Date()) {
        // TODO: Implement token refresh logic
        results.push({
          provider: connection.provider,
          status: 'error',
          message: 'Token expired, please reconnect',
        })
        continue
      }
      
      try {
        const syncResult = await syncCalendar(connection, direction, range, tutorId)
        
        // Update last synced timestamp
        await db.calendarConnection.update({
          where: { id: connection.id },
          data: { lastSyncedAt: new Date() },
        })
        
        results.push({
          provider: connection.provider,
          status: 'success',
          ...syncResult,
        })
      } catch (error: any) {
        results.push({
          provider: connection.provider,
          status: 'error',
          message: error.message,
        })
      }
    }
    
    return NextResponse.json({
      syncResults: results,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Calendar sync error:', error)
    return NextResponse.json(
      { error: 'Failed to sync calendar' },
      { status: 500 }
    )
  }
}, { role: 'TUTOR' })

// Mock sync function - in production, implement actual calendar API integration
async function syncCalendar(
  connection: any,
  direction: string,
  dateRange: { start: Date; end: Date },
  tutorId: string
): Promise<{ imported?: number; exported?: number }> {
  const result: { imported?: number; exported?: number } = {}
  
  // Import from external calendar
  if (direction === 'from_external' || direction === 'bidirectional') {
    // TODO: Implement actual calendar API fetch
    // For now, simulate importing events
    const externalEvents = await fetchExternalEvents(connection, dateRange)
    
    for (const event of externalEvents) {
      await db.calendarEvent.upsert({
        where: {
          externalId: event.id,
        },
        update: {
          title: event.title,
          description: event.description,
          startTime: event.startTime,
          endTime: event.endTime,
          location: event.location,
        },
        create: {
          tutorId,
          externalId: event.id,
          title: event.title,
          description: event.description,
          startTime: event.startTime,
          endTime: event.endTime,
          location: event.location,
          type: 'PERSONAL',
          createdBy: 'sync',
        },
      })
    }
    
    result.imported = externalEvents.length
  }
  
  // Export to external calendar
  if (direction === 'to_external' || direction === 'bidirectional') {
    // Get events to sync
    const events = await db.calendarEvent.findMany({
      where: {
        tutorId,
        deletedAt: null,
        isCancelled: false,
        startTime: {
          gte: dateRange.start,
          lte: dateRange.end,
        },
        externalId: null, // Only sync events not yet synced
      },
    })
    
    // TODO: Implement actual calendar API push
    for (const event of events) {
      // Mock export - in production, call actual calendar API
      // const externalId = await pushToExternalCalendar(connection, event)
      // await db.calendarEvent.update({
      //   where: { id: event.id },
      //   data: { externalId },
      // })
    }
    
    result.exported = events.length
  }
  
  return result
}

// Mock function - implement actual calendar API integration
async function fetchExternalEvents(connection: any, dateRange: { start: Date; end: Date }): Promise<any[]> {
  // Placeholder for actual calendar API integration
  // In production, this would call Google Calendar API, Outlook Graph API, etc.
  
  switch (connection.provider) {
    case 'google':
      // TODO: Implement Google Calendar API
      return []
    case 'outlook':
      // TODO: Implement Microsoft Graph API
      return []
    case 'apple':
      // TODO: Implement Apple Calendar API
      return []
    default:
      return []
  }
}

// Connect a new external calendar
export const PUT = withAuth(async (req: NextRequest, session) => {
  const tutorId = session.user.id
  
  try {
    const body = await req.json()
    const { provider, authCode, redirectUri } = body
    
    if (!provider || !authCode) {
      return NextResponse.json(
        { error: 'Provider and auth code are required' },
        { status: 400 }
      )
    }
    
    // TODO: Exchange auth code for tokens with actual OAuth provider
    // For now, create a placeholder connection
    const connection = await db.calendarConnection.upsert({
      where: {
        userId_provider: {
          userId: tutorId,
          provider,
        },
      },
      update: {
        syncEnabled: true,
        lastSyncedAt: new Date(),
      },
      create: {
        userId: tutorId,
        provider,
        syncEnabled: true,
        syncDirection: 'bidirectional',
      },
    })
    
    return NextResponse.json({
      connection: {
        provider: connection.provider,
        syncEnabled: connection.syncEnabled,
        syncDirection: connection.syncDirection,
      },
      message: 'Calendar connected successfully',
    })
  } catch (error) {
    console.error('Connect calendar error:', error)
    return NextResponse.json(
      { error: 'Failed to connect calendar' },
      { status: 500 }
    )
  }
}, { role: 'TUTOR' })
