import { NextRequest, NextResponse } from 'next/server'
import { readFile } from 'fs/promises'
import path from 'path'
import os from 'os'
import { withAuth } from '@/lib/api/middleware'

export const GET = withAuth(async (request: NextRequest, session: any, context: any) => {
  try {
    const params = await context.params
    const pathSegments = params.path as string[]
    if (!pathSegments || pathSegments.length === 0) {
      return new NextResponse('Invalid path', { status: 400 })
    }

    // Prevent directory traversal attacks
    if (pathSegments.some(segment => segment.includes('..') || segment.includes('/'))) {
      return new NextResponse('Invalid path', { status: 400 })
    }

    // The files are stored in os.tmpdir()/tutorme_uploads
    const absolutePath = path.join(os.tmpdir(), 'tutorme_uploads', ...pathSegments)

    try {
      const data = await readFile(absolutePath)
      const ext = path.extname(absolutePath).toLowerCase()

      let contentType = 'application/octet-stream'
      if (ext === '.pdf') contentType = 'application/pdf'
      else if (ext === '.png') contentType = 'image/png'
      else if (ext === '.jpg' || ext === '.jpeg') contentType = 'image/jpeg'
      else if (ext === '.doc' || ext === '.docx') contentType = 'application/msword'
      else if (ext === '.ppt' || ext === '.pptx') contentType = 'application/vnd.ms-powerpoint'

      return new NextResponse(data, {
        headers: {
          'Content-Type': contentType,
          'Cache-Control': 'public, max-age=3600',
        },
      })
    } catch (err) {
      return new NextResponse('File not found', { status: 404 })
    }
  } catch (error) {
    console.error('[serve-upload] Error:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
})
