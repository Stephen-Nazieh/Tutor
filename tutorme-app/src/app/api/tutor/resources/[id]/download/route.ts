/**
 * GET /api/tutor/resources/[id]/download
 *
 * Generates a presigned S3 GET URL for downloading a private resource.
 * For public resources, redirects directly to the public URL.
 * Increments the download counter.
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/lib/api/middleware'
import { db } from '@/lib/db'
import { createPresignedDownloadUrl, isS3Configured } from '@/lib/storage/s3'

export const GET = withAuth(async (req: NextRequest, session, context) => {
    const params = await context?.params
    const id = params?.id as string
    const userId = session.user.id

    // Find resource — tutor owns it OR it's shared/public for a student
    const resource = await db.resource.findFirst({
        where: {
            id,
            OR: [
                { tutorId: userId },
                { isPublic: true },
                {
                    shares: {
                        some: {
                            OR: [
                                { recipientId: userId },
                                { sharedWithAll: true },
                            ],
                        },
                    },
                },
            ],
        },
    })

    if (!resource) {
        return NextResponse.json({ error: 'Resource not found or access denied' }, { status: 404 })
    }

    // Increment download count (fire-and-forget)
    db.resource.update({
        where: { id },
        data: { downloadCount: { increment: 1 } },
    }).catch(() => { })

    // Generate presigned download URL only if S3 is configured
    if (isS3Configured() && resource.key) {
        const downloadUrl = await createPresignedDownloadUrl(
            resource.key,
            3600, // 1-hour expiry
            resource.name
        )
        return NextResponse.json({ downloadUrl, expiresIn: 3600 })
    }

    // Fallback: redirect to stored URL (local or public)
    return NextResponse.json({ downloadUrl: resource.url, expiresIn: null })
})
