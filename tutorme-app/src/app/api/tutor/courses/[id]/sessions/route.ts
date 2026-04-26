/**
 * GET /api/tutor/courses/[id]/sessions
 * Returns all sessions (live classes) for a specific course
 */

import { NextResponse } from 'next/server'
import { withAuth } from '@/lib/api/middleware'
import { getPool } from '@/lib/db/drizzle'

export const GET = withAuth(
  async (req, session) => {
    const tutorId = session.user.id

    // Ultimate source of truth: extract directly from the URL pathname
    const safeUrl = req.nextUrl?.href || req.url || ''
    const match = safeUrl.match(/\/courses\/([^/]+)\/sessions/)
    const courseId = match ? match[1] : ''

    if (!courseId || courseId === 'undefined' || courseId === 'null') {
      return NextResponse.json({ error: 'Course ID is required' }, { status: 400 })
    }

    const urlObj = new URL(safeUrl, 'http://localhost:3000')
    const statusParam = urlObj.searchParams.get('status')
    const allowedStatuses = statusParam
      ? statusParam.split(',').map(s => s.trim()).filter(Boolean)
      : ['scheduled', 'active']

    const pool = getPool()

    try {
      // Build status filter for raw SQL
      let statusFilter = ''
      let statusValues: string[] = []
      if (allowedStatuses.length > 0) {
        const placeholders = allowedStatuses.map((_, i) => `$${i + 3}`).join(', ')
        statusFilter = `AND "status" IN (${placeholders})`
        statusValues = allowedStatuses
      }

      // Raw SQL query for maximum reliability
      const sessionsQuery = `
        SELECT
          "id" as "sessionId",
          "tutorId",
          "courseId",
          "title",
          "category",
          "description",
          "scheduledAt",
          "startedAt",
          "endedAt",
          "status",
          "sessionType",
          "trainingCategory",
          "trainingTargetAudience",
          "trainingToken",
          "roomId",
          "roomUrl",
          "recordingUrl",
          "recordingAvailableAt",
          "maxStudents"
        FROM "LiveSession"
        WHERE "tutorId" = $1
          AND "courseId" = $2
          ${statusFilter}
        ORDER BY "scheduledAt" ASC
      `
      const sessionsParams = [tutorId, courseId, ...statusValues]
      const sessionsResult = await pool.query(sessionsQuery, sessionsParams)
      const sessions = sessionsResult.rows

      // Fetch participant counts
      const sessionIds = sessions.map((s: any) => s.sessionId).filter(Boolean)
      let participantCounts: Record<string, number> = {}

      if (sessionIds.length > 0) {
        const placeholders = sessionIds.map((_: string, i: number) => `$${i + 1}`).join(',')
        const participantsResult = await pool.query(
          `SELECT "sessionId" FROM "SessionParticipant" WHERE "sessionId" IN (${placeholders})`,
          sessionIds
        )
        participantCounts = participantsResult.rows.reduce(
          (acc: Record<string, number>, p: any) => {
            const sid = p.sessionId
            if (sid) acc[sid] = (acc[sid] || 0) + 1
            return acc
          },
          {} as Record<string, number>
        )
      }

      const formattedSessions = sessions.map((s: any) => ({
        id: s.sessionId,
        title: s.title,
        category: s.category,
        description: s.description,
        scheduledAt: s.scheduledAt ? new Date(s.scheduledAt).toISOString() : null,
        startedAt: s.startedAt ? new Date(s.startedAt).toISOString() : null,
        endedAt: s.endedAt ? new Date(s.endedAt).toISOString() : null,
        maxStudents: s.maxStudents,
        enrolledStudents: participantCounts[s.sessionId] || 0,
        status: s.status,
        roomUrl: s.roomUrl,
      }))

      return NextResponse.json({ sessions: formattedSessions })
    } catch (err) {
      // Log full error details for debugging
      const errObj = err as any
      console.error('[Tutor Sessions API] Raw SQL Error:', {
        message: errObj?.message,
        code: errObj?.code,
        detail: errObj?.detail,
        hint: errObj?.hint,
        position: errObj?.position,
        query: errObj?.query,
        parameters: errObj?.parameters,
        stack: errObj?.stack,
        constructor: err?.constructor?.name,
        allKeys: err ? Object.getOwnPropertyNames(err) : [],
      })

      // Extract the most useful error message
      const pgMessage = errObj?.detail || errObj?.message || 'Database query failed'
      return NextResponse.json(
        { error: pgMessage, code: errObj?.code || null },
        { status: 500 }
      )
    }
  },
  { role: 'TUTOR' }
)
