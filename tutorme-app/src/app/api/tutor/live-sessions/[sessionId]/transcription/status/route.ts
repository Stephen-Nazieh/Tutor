import { NextRequest, NextResponse } from 'next/server'
import { getServerSession, authOptions } from '@/lib/auth'
import { drizzleDb } from '@/lib/db/drizzle'
import { liveSession, sessionReplayArtifact } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions, req)
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const safeUrl = req.nextUrl?.href || req.url || ''
  const match = safeUrl.match(/\/live-sessions\/([^/]+)\/transcription\/status/)
  const sessionId = match ? match[1] : ''
  if (!sessionId || sessionId === 'undefined' || sessionId === 'null') {
    return NextResponse.json({ error: 'Session ID is required' }, { status: 400 })
  }

  const [row] = await drizzleDb
    .select({
      tutorId: liveSession.tutorId,
    })
    .from(liveSession)
    .where(eq(liveSession.sessionId, sessionId))
    .limit(1)

  if (!row) return NextResponse.json({ error: 'Session not found' }, { status: 404 })
  if (row.tutorId !== session.user.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })

  const [artifact] = await drizzleDb
    .select({
      transcript: sessionReplayArtifact.transcript,
      summary: sessionReplayArtifact.summary,
      summaryJson: sessionReplayArtifact.summaryJson,
      updatedAt: sessionReplayArtifact.updatedAt,
      status: sessionReplayArtifact.status,
    })
    .from(sessionReplayArtifact)
    .where(eq(sessionReplayArtifact.sessionId, sessionId))
    .limit(1)

  return NextResponse.json({
    ok: true,
    artifact: artifact || null,
  })
}

