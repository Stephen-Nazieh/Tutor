/**
 * GET /api/student/resources
 *
 * Returns resources shared with the student, either:
 *  - Directly (by recipientId)
 *  - Shared with all via curriculum they're enrolled in
 *  - Marked as public (isPublic = true) by a tutor they're enrolled with
 */

import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'

export async function GET() {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const studentId = session.user.id

    // Get tutors the student is enrolled with
    const enrollments = await db.curriculumEnrollment.findMany({
        where: { studentId },
        select: {
            curriculumId: true,
            curriculum: { select: { creatorId: true } },
        },
    })

    const enrolledTutorIds = [...new Set(enrollments.map((e: any) => e.curriculum.creatorId))]
    const enrolledCurriculumIds = enrollments.map((e: any) => e.curriculumId)

    // Find resources accessible to this student
    const resources = await db.resource.findMany({
        where: {
            OR: [
                // Directly shared with this student
                {
                    shares: {
                        some: { recipientId: studentId },
                    },
                },
                // Shared with all in a curriculum the student is in
                {
                    shares: {
                        some: {
                            sharedWithAll: true,
                            OR: [
                                { curriculumId: null }, // All students of the tutor
                                { curriculumId: { in: enrolledCurriculumIds } },
                            ],
                            sharedByTutorId: { in: enrolledTutorIds },
                        },
                    },
                },
                // Public resources from enrolled tutors
                {
                    isPublic: true,
                    tutorId: { in: enrolledTutorIds },
                },
            ],
        },
        include: {
            tutor: { select: { name: true } },
            shares: {
                where: { recipientId: studentId },
                select: { message: true, createdAt: true },
            },
        },
        orderBy: { createdAt: 'desc' },
    })

    const formatted = resources.map((r: any) => ({
        id: r.id,
        name: r.name,
        description: r.description,
        type: r.type,
        size: r.size,
        mimeType: r.mimeType,
        url: r.url,
        tags: r.tags,
        downloadCount: r.downloadCount,
        createdAt: r.createdAt,
        tutorName: r.tutor.name,
        sharedMessage: r.shares[0]?.message || null,
    }))

    return NextResponse.json({ resources: formatted })
}
