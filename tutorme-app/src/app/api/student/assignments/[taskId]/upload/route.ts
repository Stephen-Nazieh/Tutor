/**
 * POST /api/student/assignments/[taskId]/upload
 *
 * Handles file uploads for essay/project type assignments.
 * Accepts: PDF, PNG, JPG, DOCX (max 10MB)
 * Stores files locally in /public/uploads/submissions/{studentId}/{taskId}/
 */

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'

const ALLOWED_TYPES = [
    'application/pdf',
    'image/png',
    'image/jpeg',
    'image/jpg',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]
const MAX_SIZE = 10 * 1024 * 1024 // 10MB

export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ taskId: string }> }
) {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const studentId = session.user.id
    const { taskId } = await params

    try {
        const formData = await request.formData()
        const file = formData.get('file') as File | null

        if (!file) {
            return NextResponse.json({ error: 'No file provided' }, { status: 400 })
        }

        // Validate type
        if (!ALLOWED_TYPES.includes(file.type)) {
            return NextResponse.json(
                { error: `File type not allowed. Accepted: PDF, PNG, JPG, DOCX` },
                { status: 400 }
            )
        }

        // Validate size
        if (file.size > MAX_SIZE) {
            return NextResponse.json(
                { error: `File too large. Maximum size: 10MB` },
                { status: 400 }
            )
        }

        // Create directory
        const uploadDir = path.join(
            process.cwd(),
            'public',
            'uploads',
            'submissions',
            studentId,
            taskId
        )
        await mkdir(uploadDir, { recursive: true })

        // Generate unique filename
        const ext = path.extname(file.name)
        const safeName = file.name
            .replace(ext, '')
            .replace(/[^a-zA-Z0-9_-]/g, '_')
            .slice(0, 50)
        const uniqueName = `${safeName}_${Date.now()}${ext}`
        const filePath = path.join(uploadDir, uniqueName)

        // Write file
        const buffer = Buffer.from(await file.arrayBuffer())
        await writeFile(filePath, buffer)

        // Public URL
        const fileUrl = `/uploads/submissions/${studentId}/${taskId}/${uniqueName}`

        return NextResponse.json({
            success: true,
            file: {
                url: fileUrl,
                name: file.name,
                size: file.size,
                type: file.type,
            },
        })
    } catch (error) {
        console.error('File upload failed:', error)
        return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
    }
}
