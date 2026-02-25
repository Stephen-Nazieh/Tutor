/**
 * Mark upload complete and set video URL and duration.
 * POST /api/content/[contentId]/upload-complete
 * Body: { url?, key?, durationSeconds?, transcript? }
 * If S3 was used, send publicUrl or we build from key. Otherwise send url.
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth, withCsrf } from '@/lib/api/middleware'
import { db } from '@/lib/db'

function buildPublicUrl(key: string): string {
  const bucket = process.env.S3_BUCKET
  const region = process.env.S3_REGION
  const endpoint = process.env.S3_ENDPOINT
  if (endpoint) return `${endpoint.replace(/\/$/, '')}/${bucket}/${key}`
  return `https://${bucket}.s3.${region}.amazonaws.com/${key}`
}

export const POST = withCsrf(withAuth(async (req: NextRequest, session, context: any) => {
  const params = context?.params ? await context.params : null
  const contentId = params?.contentId
  if (!contentId) return NextResponse.json({ error: 'Content ID required' }, { status: 400 })

  const body = await req.json().catch(() => ({}))
  let url: string | null = typeof body.url === 'string' ? body.url : null
  const key = typeof body.key === 'string' ? body.key : null
  if (!url && key) url = buildPublicUrl(key)
  if (!url) {
    return NextResponse.json(
      { error: 'url or key required' },
      { status: 400 }
    )
  }

  const durationSeconds = typeof body.durationSeconds === 'number' && body.durationSeconds >= 0
    ? body.durationSeconds
    : undefined
  const transcript = typeof body.transcript === 'string' ? body.transcript.slice(0, 100_000) : undefined

  const updated = await db.contentItem.updateMany({
    where: { id: contentId },
    data: {
      url,
      uploadStatus: 'ready',
      ...(durationSeconds != null && { duration: durationSeconds }),
      ...(transcript != null && { transcript }),
    },
  })

  if (updated.count === 0) {
    return NextResponse.json({ error: 'Content not found' }, { status: 404 })
  }

  return NextResponse.json({ ok: true, contentId })
}, { role: 'TUTOR' }))
