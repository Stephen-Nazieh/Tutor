/**
 * POST /api/tutor/resources/upload-proxy
 *
 * Server-side upload proxy when S3 is not configured.
 * Stores files in /public/uploads/resources/{tutorId}/ (local dev only).
 *
 * In production, configure AWS_S3_BUCKET etc. to use real S3.
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/lib/api/middleware'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'
import { inferResourceType, generateResourceKey } from '@/lib/storage/s3'

const MAX_SIZE = 100 * 1024 * 1024 // 100MB

export const POST = withAuth(async (req: NextRequest, session) => {
    const tutorId = session.user.id

    try {
        const formData = await req.formData()
        const file = formData.get('file') as File | null

        if (!file) {
            return NextResponse.json({ error: 'No file provided' }, { status: 400 })
        }

        if (file.size > MAX_SIZE) {
            return NextResponse.json({ error: 'File exceeds 100MB limit' }, { status: 400 })
        }

        // Write to /public/uploads/resources/{tutorId}/
        const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'resources', tutorId)
        await mkdir(uploadDir, { recursive: true })

        const key = generateResourceKey(tutorId, file.name)
        const filename = path.basename(key)
        const filePath = path.join(uploadDir, filename)

        const buffer = Buffer.from(await file.arrayBuffer())
        await writeFile(filePath, buffer)

        const publicUrl = `/uploads/resources/${tutorId}/${filename}`
        const type = inferResourceType(file.type)

        return NextResponse.json({ success: true, url: publicUrl, key, type })
    } catch (error) {
        console.error('[upload-proxy] Error:', error)
        return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
    }
}, { role: 'TUTOR' })
