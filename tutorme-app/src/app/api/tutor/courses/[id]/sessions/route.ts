/**
 * GET /api/tutor/courses/[id]/sessions
 * Returns all sessions (live classes) for a specific course
 */

import { NextResponse } from 'next/server'
import { withAuth } from '@/lib/api/middleware'
import { eq, and, asc, inArray } from 'drizzle-orm'
import { drizzleDb } from '@/lib/db/drizzle'
import { liveSession as liveSessionTable } from '@/lib/db/schema'

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
      ? statusParam
          .split(',')
          .map(s => s.trim())
          .filter(Boolean)
      : ['scheduled', 'active']

    try {
      const conditions = [
        eq(liveSessionTable.tutorId, tutorId),
        eq(liveSessionTable.courseId, courseId),
      ]

      if (allowedStatuses.length > 0) {
        conditions.push(inArray(liveSessionTable.status, allowedStatuses as any))
      }

      const sessions = await drizzleDb.query.liveSession.findMany({
        where: and(...conditions),
        with: {
          participants: {
            columns: {
              participantId: true,
            },
          },
        },
        orderBy: asc(liveSessionTable.scheduledAt),
      })

      const formattedSessions = sessions.map(s => ({
        id: s.sessionId,
        title: s.title,
        category: s.category,
        description: s.description,
        scheduledAt: s.scheduledAt ? new Date(s.scheduledAt).toISOString() : null,
        startedAt: s.startedAt ? new Date(s.startedAt).toISOString() : null,
        endedAt: s.endedAt ? new Date(s.endedAt).toISOString() : null,
        maxStudents: s.maxStudents,
        enrolledStudents: s.participants?.length || 0,
        status: s.status,
        roomUrl: s.roomUrl,
      }))

      return NextResponse.json({ sessions: formattedSessions })
    } catch (err) {
      // Log full error details for debugging
      const errObj = err as any
      console.error('[Tutor Sessions API] Drizzle Error:', {
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
      return NextResponse.json({ error: pgMessage, code: errObj?.code || null }, { status: 500 })
    }
  },
  { role: 'TUTOR' }
)
