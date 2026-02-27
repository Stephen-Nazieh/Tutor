/**
 * GET /api/class/engagement?roomId=xxx
 * Get real-time engagement metrics for a class session
 *
 * POST /api/class/engagement
 * Record engagement snapshot for a student
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/lib/api/middleware'
import { drizzleDb } from '@/lib/db/drizzle'
import { engagementSnapshot, sessionEngagementSummary, user, profile } from '@/lib/db/schema'
import { eq, desc, and, sql } from 'drizzle-orm'
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
    const snapshots = await drizzleDb
      .select({
        id: engagementSnapshot.id,
        sessionId: engagementSnapshot.sessionId,
        studentId: engagementSnapshot.studentId,
        engagementScore: engagementSnapshot.engagementScore,
        attentionLevel: engagementSnapshot.attentionLevel,
        comprehensionEstimate: engagementSnapshot.comprehensionEstimate,
        participationCount: engagementSnapshot.participationCount,
        chatMessages: engagementSnapshot.chatMessages,
        whiteboardInteractions: engagementSnapshot.whiteboardInteractions,
        struggleIndicators: engagementSnapshot.struggleIndicators,
        timestamp: engagementSnapshot.timestamp,
        studentName: profile.name,
        studentEmail: user.email
      })
      .from(engagementSnapshot)
      .innerJoin(user, eq(engagementSnapshot.studentId, user.id))
      .leftJoin(profile, eq(user.id, profile.userId))
      .where(eq(engagementSnapshot.sessionId, roomId))
      .orderBy(desc(engagementSnapshot.timestamp))

    const distinctByStudent = new Map<string, (typeof snapshots)[0]>()
    for (const row of snapshots) {
      if (!distinctByStudent.has(row.studentId)) {
        distinctByStudent.set(row.studentId, row)
      }
    }
    const latestSnapshots = Array.from(distinctByStudent.values())

    const [summary] = await drizzleDb
      .select()
      .from(sessionEngagementSummary)
      .where(eq(sessionEngagementSummary.sessionId, roomId))
      .limit(1)

    return NextResponse.json({
      snapshots: latestSnapshots,
      summary: summary ?? null
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

    const id = crypto.randomUUID()
    await drizzleDb.insert(engagementSnapshot).values({
      id,
      sessionId: data.roomId,
      studentId: data.studentId,
      engagementScore: data.engagementScore,
      attentionLevel: data.attentionLevel,
      comprehensionEstimate: data.comprehensionEstimate ?? null,
      participationCount: data.participationCount,
      chatMessages: data.chatMessages,
      whiteboardInteractions: data.whiteboardInteractions,
      struggleIndicators: data.struggleIndicators
    })

    const [snapshot] = await drizzleDb.select().from(engagementSnapshot).where(eq(engagementSnapshot.id, id))
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
