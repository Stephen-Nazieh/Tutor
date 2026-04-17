import { NextRequest, NextResponse } from 'next/server'
import { withAuth, withCsrf } from '@/lib/api/middleware'
import type { Session } from 'next-auth'
import path from 'path'
import { mkdir, writeFile } from 'fs/promises'

const MAX_FILE_SIZE_BYTES = 20 * 1024 * 1024

const ALLOWED_MIME_PREFIXES = [
  'application/pdf',
  'image/',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.',
]

function isAllowedMimeType(type: string): boolean {
  return ALLOWED_MIME_PREFIXES.some(prefix => {
    if (prefix.endsWith('/') || prefix.endsWith('.')) {
      return type.startsWith(prefix)
    }
    return type === prefix
  })
}

function sanitizeFileName(fileName: string): string {
  return fileName.replace(/[^a-zA-Z0-9._-]/g, '_')
}

export const POST = withCsrf(
  withAuth(async (request: NextRequest, session: Session) => {
    const formData = await request.formData()
    const file = formData.get('file')
    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'File is required' }, { status: 400 })
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      return NextResponse.json({ error: 'File too large (max 20MB)' }, { status: 400 })
    }

    const fileType = file.type || 'application/octet-stream'
    if (!isAllowedMimeType(fileType)) {
      return NextResponse.json({ error: 'Disallowed file type' }, { status: 400 })
    }

    const safeName = sanitizeFileName(file.name || 'document')
    const timestamp = Date.now()
    const userId = session.user.id
    const relativeDir = path.join('uploads', 'documents', userId)
    const absoluteDir = path.join(process.cwd(), 'public', relativeDir)

    await mkdir(absoluteDir, { recursive: true })

    const storedName = `${timestamp}-${safeName}`
    const absolutePath = path.join(absoluteDir, storedName)
    const bytes = Buffer.from(await file.arrayBuffer())
    await writeFile(absolutePath, bytes)

    return NextResponse.json({
      url: `/${relativeDir}/${storedName}`,
      name: safeName,
      size: file.size,
      type: fileType,
    })
  })
)
