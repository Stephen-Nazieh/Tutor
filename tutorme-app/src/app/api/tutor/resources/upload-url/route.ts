/**
 * GET /api/tutor/resources/upload-url
 *
 * Generates a presigned S3 PUT URL for direct browser-to-S3 upload.
 * Falls back to a server-side proxy upload route if S3 is not configured.
 *
 * Query params:
 *   filename  — original filename (e.g. "lecture.pdf")
 *   mimeType  — MIME type (e.g. "application/pdf")
 *   size      — file size in bytes
 *   isPublic  — "true" to make file publicly accessible
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/lib/api/middleware'
import {
  createPresignedUploadUrl,
  generateResourceKey,
  inferResourceType,
  isS3Configured,
  MAX_UPLOAD_BYTES,
} from '@/lib/storage/s3'

export const GET = withAuth(async (req: NextRequest, session) => {
  const { searchParams } = new URL(req.url)
  const filename = searchParams.get('filename')
  const mimeType = searchParams.get('mimeType')
  const size = parseInt(searchParams.get('size') || '0', 10)
  const isPublic = searchParams.get('isPublic') === 'true'

  if (!filename || !mimeType) {
    return NextResponse.json(
      { error: 'Missing required parameters: filename, mimeType' },
      { status: 400 }
    )
  }

  if (size > MAX_UPLOAD_BYTES) {
    return NextResponse.json(
      { error: 'File size exceeds 100MB limit' },
      { status: 400 }
    )
  }

  const tutorId = session.user.id
  const key = generateResourceKey(tutorId, filename)
  const type = inferResourceType(mimeType)

  // Real S3 presigned upload URL
  if (isS3Configured()) {
    try {
      const { uploadUrl, publicUrl } = await createPresignedUploadUrl(key, mimeType, isPublic)
      return NextResponse.json({ uploadUrl, key, type, publicUrl, usePresigned: true })
    } catch (error) {
      console.error('[upload-url] S3 presign failed:', error)
      return NextResponse.json({ error: 'Failed to generate upload URL' }, { status: 500 })
    }
  }

  // Fallback: proxy upload via Next.js API route
  return NextResponse.json({
    uploadUrl: `/api/tutor/resources/upload-proxy`,
    key,
    type,
    publicUrl: null,
    usePresigned: false,
  })
}, { role: 'TUTOR' })
