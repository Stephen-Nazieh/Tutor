import { NextRequest, NextResponse } from 'next/server'
import { withAuth, withCsrf } from '@/lib/api/middleware'
import { db } from '@/lib/db'
import { getPresignedPutUrl, isS3Configured } from '@/lib/video/upload'

export const POST = withCsrf(withAuth(async (req: NextRequest, session) => {
  const body = await req.json().catch(() => ({}))
  const title = body?.title
  const subject = body?.subject
  const filename = body?.filename ?? 'video.mp4'
  const contentType = body?.contentType ?? 'video/mp4'
  if (!title || typeof title !== 'string' || !subject || typeof subject !== 'string') {
    return NextResponse.json({ error: 'title and subject required' }, { status: 400 })
  }

  const content = await db.contentItem.create({
    data: {
      title: String(title).slice(0, 500),
      subject: String(subject).slice(0, 100),
      type: 'video',
      url: null,
      uploadStatus: 'uploading',
      duration: null,
    },
  })

  const key = 'content/' + content.id + '/' + String(filename).replace(/[^a-zA-Z0-9._-]/g, '_')

  if (isS3Configured()) {
    const presign = await getPresignedPutUrl(key, contentType)
    if (presign) {
      return NextResponse.json({
        contentId: content.id,
        uploadUrl: presign.uploadUrl,
        key: presign.key,
        publicUrl: presign.publicUrl,
        expiresIn: 3600,
      })
    }
  }

  return NextResponse.json({
    contentId: content.id,
    message: 'S3 not configured. Set S3_* env vars or set URL via upload-complete.',
    key,
  })
}, { role: 'TUTOR' }))
