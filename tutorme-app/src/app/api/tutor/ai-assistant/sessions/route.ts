/**
 * AI Assistant Sessions API
 * GET /api/tutor/ai-assistant/sessions - List all sessions
 * DELETE /api/tutor/ai-assistant/sessions - Archive old sessions
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/lib/api/middleware'
import { db } from '@/lib/db'

// GET - List all sessions
export const GET = withAuth(async (req: NextRequest, session) => {
  const tutorId = session.user.id
  
  const sessions = await db.aIAssistantSession.findMany({
    where: { tutorId },
    orderBy: { updatedAt: 'desc' },
    include: {
      _count: {
        select: { messages: true, insights: true },
      },
    },
  })
  
  return NextResponse.json({ sessions })
}, { role: 'TUTOR' })

// DELETE - Archive old sessions (keep last 10)
export const DELETE = withAuth(async (req: NextRequest, session) => {
  const tutorId = session.user.id
  
  try {
    // Get sessions to archive (older than the 10 most recent)
    const sessionsToArchive = await db.aIAssistantSession.findMany({
      where: { tutorId, status: 'active' },
      orderBy: { updatedAt: 'desc' },
      skip: 10,
      select: { id: true },
    })
    
    // Archive them
    await db.aIAssistantSession.updateMany({
      where: {
        id: { in: sessionsToArchive.map((s: { id: string }) => s.id) },
      },
      data: { status: 'archived' },
    })
    
    return NextResponse.json({ 
      archived: sessionsToArchive.length,
      success: true 
    })
  } catch (error) {
    console.error('Archive sessions error:', error)
    return NextResponse.json(
      { error: 'Failed to archive sessions' },
      { status: 500 }
    )
  }
}, { role: 'TUTOR' })
