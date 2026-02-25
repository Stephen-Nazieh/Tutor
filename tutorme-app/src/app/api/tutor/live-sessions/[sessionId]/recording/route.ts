import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'

function getSessionId(req: NextRequest): string {
  const parts = req.nextUrl.pathname.split('/')
  const idx = parts.indexOf('live-sessions')
  return parts[idx + 1]
}

export async function PATCH(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const liveSessionId = getSessionId(req)
  const body = await req.json().catch(() => ({}))
  const isRecording = Boolean(body?.isRecording)
  const recordingUrl = typeof body?.recordingUrl === 'string' ? body.recordingUrl : null

  const liveSession = await db.liveSession.findFirst({
    where: {
      id: liveSessionId,
      tutorId: session.user.id,
    },
    select: { id: true },
  })

  if (!liveSession) {
    return NextResponse.json({ error: 'Live session not found' }, { status: 404 })
  }

  await db.liveSession.update({
    where: { id: liveSessionId },
    data: {
      recordingUrl: isRecording ? null : recordingUrl,
      recordingAvailableAt: isRecording ? null : (recordingUrl ? new Date() : null),
    },
  })

  await db.sessionReplayArtifact.upsert({
    where: { sessionId: liveSessionId },
    create: {
      sessionId: liveSessionId,
      tutorId: session.user.id,
      recordingUrl: isRecording ? null : recordingUrl,
      status: isRecording ? 'processing' : 'pending',
      startedAt: isRecording ? new Date() : null,
      endedAt: isRecording ? null : new Date(),
    },
    update: {
      recordingUrl: isRecording ? null : recordingUrl,
      status: isRecording ? 'processing' : 'pending',
      startedAt: isRecording ? new Date() : undefined,
      endedAt: isRecording ? null : new Date(),
    },
  })

  return NextResponse.json({ success: true })
}
