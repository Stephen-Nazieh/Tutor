/**
 * File Upload API for Message Attachments
 * POST /api/conversations/upload
 * 
 * Upload files to be attached to messages
 * Supports: images, documents, PDFs
 * Max file size: 10MB
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/lib/api/middleware'
import { db } from '@/lib/db'
import { writeFile } from 'fs/promises'
import { join } from 'path'
import { mkdir } from 'fs/promises'
import crypto from 'crypto'

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
const ALLOWED_TYPES = {
  'image/jpeg': '.jpg',
  'image/png': '.png',
  'image/gif': '.gif',
  'image/webp': '.webp',
  'application/pdf': '.pdf',
  'application/msword': '.doc',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '.docx',
  'text/plain': '.txt',
  'application/vnd.ms-excel': '.xls',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': '.xlsx',
}

export const POST = withAuth(async (req: NextRequest, session) => {
  const userId = session.user.id

  try {
    const formData = await req.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    // Validate file type
    const ext = ALLOWED_TYPES[file.type as keyof typeof ALLOWED_TYPES]
    if (!ext) {
      return NextResponse.json(
        { error: 'File type not allowed', allowedTypes: Object.keys(ALLOWED_TYPES) },
        { status: 400 }
      )
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'File too large', maxSize: '10MB' },
        { status: 400 }
      )
    }

    // Generate unique filename
    const fileHash = crypto.randomBytes(16).toString('hex')
    const fileName = `${fileHash}${ext}`
    const uploadDir = join(process.cwd(), 'uploads', 'messages', userId)
    const filePath = join(uploadDir, fileName)

    // Ensure upload directory exists
    await mkdir(uploadDir, { recursive: true })

    // Write file
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    await writeFile(filePath, buffer)

    // Create file record
    const fileRecord = await db.messageAttachment?.create({
      data: {
        userId,
        fileName: file.name,
        fileUrl: `/uploads/messages/${userId}/${fileName}`,
        fileType: file.type,
        fileSize: file.size,
      },
    }).catch(() => {
      // If table doesn't exist, return URL only
      return null
    })

    // Return public URL
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    const publicUrl = `${baseUrl}/api/files/${userId}/${fileName}`

    return NextResponse.json({
      success: true,
      file: {
        id: fileRecord?.id || fileHash,
        name: file.name,
        url: publicUrl,
        type: file.type,
        size: file.size,
      },
    })
  } catch (error) {
    console.error('File upload error:', error)
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    )
  }
})

// Get upload configuration
export const GET = withAuth(async () => {
  return NextResponse.json({
    maxFileSize: MAX_FILE_SIZE,
    allowedTypes: Object.keys(ALLOWED_TYPES),
  })
})
