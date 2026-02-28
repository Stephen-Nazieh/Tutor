import { NextRequest, NextResponse } from 'next/server'
import { getServerSession, authOptions } from '@/lib/auth'
import { drizzleDb } from '@/lib/db/drizzle'
import { liveSession, sessionReplayArtifact, sessionParticipant, message, user, profile } from '@/lib/db/schema'
import { eq, and, asc, sql } from 'drizzle-orm'
import { generateSessionSummary } from '@/lib/chat/summary'
import { randomUUID } from 'crypto'

function getSessionId(req: NextRequest): string {
  const parts = req.nextUrl.pathname.split('/')
  const idx = parts.indexOf('live-sessions')
  return parts[idx + 1]
}

function buildTranscript(
  messages: Array<{
    timestamp: Date | null
    content: string
    userName: string | null
    userEmail: string | null
  }>
): string {
  return messages
    .map((m) => {
      const speaker = m.userName?.trim() || m.userEmail?.split('@')[0] || 'Speaker'
      const at = m.timestamp?.toISOString() ?? new Date().toISOString()
      return `[${at}] ${speaker}: ${m.content}`
    })
    .join('\n')
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions, req)
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const liveSessionId = getSessionId(req)

  const sessionRows = await drizzleDb
    .select({
      id: liveSession.id,
      tutorId: liveSession.tutorId,
      title: liveSession.title,
      subject: liveSession.subject,
      recordingUrl: liveSession.recordingUrl,
      startedAt: liveSession.startedAt,
      endedAt: liveSession.endedAt,
    })
    .from(liveSession)
    .where(and(eq(liveSession.id, liveSessionId), eq(liveSession.tutorId, session.user.id)))
    .limit(1)

  const liveSessionRow = sessionRows[0]
  if (!liveSessionRow) {
    return NextResponse.json({ error: 'Live session not found' }, { status: 404 })
  }

  const [partCount, messagesCountResult] = await Promise.all([
    drizzleDb
      .select({ count: sql<number>`count(*)::int` })
      .from(sessionParticipant)
      .where(eq(sessionParticipant.sessionId, liveSessionId)),
    drizzleDb
      .select({ count: sql<number>`count(*)::int` })
      .from(message)
      .where(eq(message.sessionId, liveSessionId)),
  ])

  const _count = {
    participants: partCount[0]?.count ?? 0,
    messages: messagesCountResult[0]?.count ?? 0,
  }

  const existingArtifact = await drizzleDb
    .select()
    .from(sessionReplayArtifact)
    .where(eq(sessionReplayArtifact.sessionId, liveSessionId))
    .limit(1)

  if (existingArtifact[0]) {
    await drizzleDb
      .update(sessionReplayArtifact)
      .set({
        recordingUrl: liveSessionRow.recordingUrl,
        status: 'processing',
        endedAt: liveSessionRow.endedAt,
      })
      .where(eq(sessionReplayArtifact.sessionId, liveSessionId))
  } else {
    await drizzleDb.insert(sessionReplayArtifact).values({
      id: randomUUID(),
      sessionId: liveSessionId,
      tutorId: session.user.id,
      recordingUrl: liveSessionRow.recordingUrl,
      status: 'processing',
      startedAt: liveSessionRow.startedAt,
      endedAt: liveSessionRow.endedAt,
    })
  }

  try {
    const messageRows = await drizzleDb
      .select({
        timestamp: message.timestamp,
        content: message.content,
        userName: profile.name,
        userEmail: user.email,
      })
      .from(message)
      .innerJoin(user, eq(message.userId, user.id))
      .leftJoin(profile, eq(profile.userId, user.id))
      .where(eq(message.sessionId, liveSessionId))
      .orderBy(asc(message.timestamp))

    const transcript =
      messageRows.length > 0
        ? buildTranscript(messageRows)
        : liveSessionRow.recordingUrl
          ? 'Transcript unavailable from chat history. Recording exists and is pending audio transcription ingestion.'
          : 'No transcript available for this session.'

    const summaryResult = await generateSessionSummary(liveSessionId, {
      type: 'session',
      maxLength: 'detailed',
      includeActionItems: true,
      language: 'en',
    })

    const summaryText =
      summaryResult.success && summaryResult.summary
        ? summaryResult.summary.overview
        : 'Summary generation is unavailable for this session.'

    const summaryPayload = {
      ...(summaryResult.success && summaryResult.summary ? summaryResult.summary : {}),
      sessionMeta: {
        title: liveSessionRow.title,
        subject: liveSessionRow.subject,
        participants: _count.participants,
        messages: _count.messages,
        generatedAt: new Date().toISOString(),
      },
      transcriptMeta: {
        source: messageRows.length > 0 ? 'chat_messages' : 'recording_placeholder',
        hasTranscriptText: Boolean(transcript?.trim()),
      },
    }

    await drizzleDb
      .update(sessionReplayArtifact)
      .set({
        transcript,
        summary: summaryText,
        summaryJson: summaryPayload,
        recordingUrl: liveSessionRow.recordingUrl,
        status: summaryResult.success ? 'ready' : 'failed',
        generatedAt: new Date(),
      })
      .where(eq(sessionReplayArtifact.sessionId, liveSessionId))

    return NextResponse.json({ success: true, transcriptLength: transcript.length })
  } catch (error) {
    await drizzleDb
      .update(sessionReplayArtifact)
      .set({
        status: 'failed',
        generatedAt: new Date(),
      })
      .where(eq(sessionReplayArtifact.sessionId, liveSessionId))

    console.error('Failed to generate replay artifact:', error)
    return NextResponse.json(
      { error: 'Failed to generate replay artifact' },
      { status: 500 }
    )
  }
}
