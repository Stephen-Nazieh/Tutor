import { NextRequest, NextResponse } from 'next/server'
import { drizzleDb } from '@/lib/db/drizzle'
import { liveSession } from '@/lib/db/schema'
import { eq, desc } from 'drizzle-orm'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

function unauthorized() {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
}

function checkBasicAuth(req: NextRequest): boolean {
  const expected = process.env.DAILY_WEBHOOK_BASIC_AUTH
  if (!expected) return false
  const auth = req.headers.get('authorization') || ''
  if (!auth.startsWith('Basic ')) return false
  const decoded = Buffer.from(auth.slice('Basic '.length), 'base64').toString('utf8')
  return decoded === expected
}

export async function POST(req: NextRequest) {
  if (!checkBasicAuth(req)) return unauthorized()

  let body: any
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: true })
  }

  const type = body?.type
  if (type !== 'transcript.started') return NextResponse.json({ ok: true })

  const roomName = body?.payload?.room_name
  const transcriptId = body?.payload?.id

  if (!roomName || !transcriptId) return NextResponse.json({ ok: true })

  const [sessionRow] = await drizzleDb
    .select({
      sessionId: liveSession.sessionId,
      tutorId: liveSession.tutorId,
      roomId: liveSession.roomId,
      status: liveSession.status,
    })
    .from(liveSession)
    .where(eq(liveSession.roomId, roomName))
    .orderBy(desc(liveSession.scheduledAt))
    .limit(1)

  if (!sessionRow?.sessionId || !sessionRow?.tutorId) return NextResponse.json({ ok: true })

  const adkBaseUrl = process.env.ADK_BASE_URL?.trim()
  const adkToken = process.env.ADK_AUTH_TOKEN
  if (!adkBaseUrl || !adkToken) return NextResponse.json({ ok: true })

  try {
    await fetch(`${adkBaseUrl.replace(/\/$/, '')}/v1/live-transcription/transcript-started`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${adkToken}`,
      },
      body: JSON.stringify({
        sessionId: sessionRow.sessionId,
        tutorId: sessionRow.tutorId,
        roomName,
        transcriptId,
      }),
    })
  } catch {}

  return NextResponse.json({ ok: true })
}
