import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { generateSessionSummary } from '@/lib/chat/summary'

function getSessionId(req: NextRequest): string {
  const parts = req.nextUrl.pathname.split('/')
  const idx = parts.indexOf('live-sessions')
  return parts[idx + 1]
}

function buildTranscript(messages: Array<{ timestamp: Date; content: string; user: { profile: { name: string | null } | null; email: string } }>): string {
  return messages
    .map((message) => {
      const speaker = message.user.profile?.name?.trim() || message.user.email.split('@')[0] || 'Speaker'
      const at = message.timestamp.toISOString()
      return `[${at}] ${speaker}: ${message.content}`
    })
    .join('\n')
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const liveSessionId = getSessionId(req)

  const liveSession = await db.liveSession.findFirst({
    where: { id: liveSessionId, tutorId: session.user.id },
    select: {
      id: true,
      tutorId: true,
      title: true,
      subject: true,
      recordingUrl: true,
      startedAt: true,
      endedAt: true,
      _count: { select: { participants: true, messages: true } },
    },
  })

  if (!liveSession) {
    return NextResponse.json({ error: 'Live session not found' }, { status: 404 })
  }

  await db.sessionReplayArtifact.upsert({
    where: { sessionId: liveSessionId },
    create: {
      sessionId: liveSessionId,
      tutorId: session.user.id,
      recordingUrl: liveSession.recordingUrl,
      status: 'processing',
      startedAt: liveSession.startedAt,
      endedAt: liveSession.endedAt,
    },
    update: {
      recordingUrl: liveSession.recordingUrl,
      status: 'processing',
      endedAt: liveSession.endedAt,
    },
  })

  try {
    const messages = await db.message.findMany({
      where: { sessionId: liveSessionId },
      orderBy: { timestamp: 'asc' },
      include: {
        user: {
          select: {
            email: true,
            profile: { select: { name: true } },
          },
        },
      },
    })

    const transcript = messages.length > 0
      ? buildTranscript(messages)
      : liveSession.recordingUrl
        ? 'Transcript unavailable from chat history. Recording exists and is pending audio transcription ingestion.'
        : 'No transcript available for this session.'

    const summaryResult = await generateSessionSummary(liveSessionId, {
      type: 'session',
      maxLength: 'detailed',
      includeActionItems: true,
      language: 'en',
    })

    const summaryText = summaryResult.success && summaryResult.summary
      ? summaryResult.summary.overview
      : 'Summary generation is unavailable for this session.'

    const summaryPayload = {
      ...((summaryResult.success && summaryResult.summary) ? summaryResult.summary : {}),
      sessionMeta: {
        title: liveSession.title,
        subject: liveSession.subject,
        participants: liveSession._count.participants,
        messages: liveSession._count.messages,
        generatedAt: new Date().toISOString(),
      },
      transcriptMeta: {
        source: messages.length > 0 ? 'chat_messages' : 'recording_placeholder',
        hasTranscriptText: Boolean(transcript?.trim()),
      },
    }

    await db.sessionReplayArtifact.update({
      where: { sessionId: liveSessionId },
      data: {
        transcript,
        summary: summaryText,
        summaryJson: summaryPayload,
        recordingUrl: liveSession.recordingUrl,
        status: summaryResult.success ? 'ready' : 'failed',
        generatedAt: new Date(),
      },
    })

    return NextResponse.json({ success: true, transcriptLength: transcript.length })
  } catch (error) {
    await db.sessionReplayArtifact.update({
      where: { sessionId: liveSessionId },
      data: {
        status: 'failed',
        generatedAt: new Date(),
      },
    })

    console.error('Failed to generate replay artifact:', error)
    return NextResponse.json({ error: 'Failed to generate replay artifact' }, { status: 500 })
  }
}
