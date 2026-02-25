import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import path from 'path'
import { mkdir, writeFile } from 'fs/promises'

const MAX_FILE_SIZE_BYTES = 20 * 1024 * 1024

function sanitizeFileName(fileName: string): string {
  return fileName.replace(/[^a-zA-Z0-9._-]/g, '_')
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const formData = await request.formData()
  const file = formData.get('file')
  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'File is required' }, { status: 400 })
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    return NextResponse.json({ error: 'File too large (max 20MB)' }, { status: 400 })
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
    type: file.type || 'application/octet-stream',
  })
}
