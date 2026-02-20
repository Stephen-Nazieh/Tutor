/**
 * GET /api/class/engagement?roomId=xxx
 * Get real-time engagement metrics for a class session
 * 
 * POST /api/class/engagement
 * Record engagement snapshot for a student
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/lib/api/middleware'
import { db } from '@/lib/db'
import { z } from 'zod'

const engagementSnapshotSchema = z.object({
  roomId: z.string().uuid(),
  studentId: z.string().uuid(),
  engagementScore: z.number().min(0).max(100),
  attentionLevel: z.enum(['focused', 'distracted', 'away', 'inactive']),
  comprehensionEstimate: z.number().min(0).max(100).optional(),
  participationCount: z.number().default(0),
  chatMessages: z.number().default(0),
  whiteboardInteractions: z.number().default(0),
  struggleIndicators: z.number().default(0)
})

// GET - Retrieve engagement data for a session
export const GET = withAuth(async (req: NextRequest) => {
  const { searchParams } = new URL(req.url)
  const roomId = searchParams.get('roomId')
  
  if (!roomId) {
    return NextResponse.json({ error: 'roomId is required' }, { status: 400 })
  }

  try {
    // Get latest engagement snapshots for all students in the session
    const snapshots = await db.$queryRaw`
      SELECT DISTINCT ON (student_id) 
        es.*,
        u.name as student_name,
        u.email as student_email
      FROM engagement_snapshots es
      JOIN users u ON es.student_id = u.id
      WHERE es.session_id = ${roomId}
      ORDER BY student_id, es.timestamp DESC
    `

    // Get session summary if available
    const summary = await db.sessionEngagementSummary.findUnique({
      where: { sessionId: roomId }
    })

    return NextResponse.json({ 
      snapshots: snapshots || [],
      summary: summary || null
    })
  } catch (error) {
    console.error('Error fetching engagement data:', error)
    return NextResponse.json(
      { error: 'Failed to fetch engagement data' },
      { status: 500 }
    )
  }
}, { role: 'TUTOR' })

// POST - Record engagement snapshot
export const POST = withAuth(async (req: NextRequest) => {
  try {
    const body = await req.json()
    const data = engagementSnapshotSchema.parse(body)

    const snapshot = await db.engagementSnapshot.create({
      data: {
        sessionId: data.roomId,
        studentId: data.studentId,
        engagementScore: data.engagementScore,
        attentionLevel: data.attentionLevel,
        comprehensionEstimate: data.comprehensionEstimate,
        participationCount: data.participationCount,
        chatMessages: data.chatMessages,
        whiteboardInteractions: data.whiteboardInteractions,
        struggleIndicators: data.struggleIndicators
      }
    })

    return NextResponse.json({ success: true, snapshot })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid data', issues: error.issues },
        { status: 400 }
      )
    }
    console.error('Error recording engagement:', error)
    return NextResponse.json(
      { error: 'Failed to record engagement' },
      { status: 500 }
    )
  }
})
