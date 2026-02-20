/**
 * Resource Sharing API
 *
 * GET  /api/tutor/resources/[id]/share  — Get current sharing settings
 * POST /api/tutor/resources/[id]/share  — Share resource with students/curriculum/all
 * DELETE /api/tutor/resources/[id]/share — Revoke all shares for a resource
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/lib/api/middleware'
import { db } from '@/lib/db'

// GET – current shares for a resource
export const GET = withAuth(async (req: NextRequest, session, context) => {
    const params = await context?.params
    const id = params?.id as string
    const tutorId = session.user.id

    const resource = await db.resource.findFirst({
        where: { id, tutorId },
        include: {
            shares: {
                include: {
                    recipient: { select: { id: true, name: true, email: true } },
                },
            },
        },
    })

    if (!resource) {
        return NextResponse.json({ error: 'Resource not found' }, { status: 404 })
    }

    return NextResponse.json({ shares: resource.shares, isPublic: resource.isPublic })
}, { role: 'TUTOR' })

// POST – share with specific recipients or all
export const POST = withAuth(async (req: NextRequest, session, context) => {
    const params = await context?.params
    const id = params?.id as string
    const tutorId = session.user.id

    const resource = await db.resource.findFirst({ where: { id, tutorId } })
    if (!resource) {
        return NextResponse.json({ error: 'Resource not found' }, { status: 404 })
    }

    const body = await req.json()
    const { recipientIds, curriculumId, sharedWithAll, message } = body

    const shares = []

    if (sharedWithAll) {
        // Share with all enrolled students of the tutor
        const share = await db.resourceShare.upsert({
            where: {
                resourceId_sharedWithAll: { resourceId: id, sharedWithAll: true },
            },
            create: {
                resourceId: id,
                sharedByTutorId: tutorId,
                sharedWithAll: true,
                curriculumId: curriculumId || null,
                message: message || null,
            },
            update: { sharedWithAll: true },
        })
        shares.push(share)
    } else if (recipientIds?.length > 0) {
        // Share with specific students
        for (const recipientId of recipientIds) {
            try {
                const share = await db.resourceShare.upsert({
                    where: {
                        resourceId_recipientId: { resourceId: id, recipientId },
                    },
                    create: {
                        resourceId: id,
                        sharedByTutorId: tutorId,
                        recipientId,
                        curriculumId: curriculumId || null,
                        message: message || null,
                    },
                    update: { curriculumId: curriculumId || null, message: message || null },
                })
                shares.push(share)
            } catch {
                // Skip duplicates
            }
        }
    }

    return NextResponse.json({ success: true, shares })
}, { role: 'TUTOR' })

// DELETE – revoke all shares (or specific share)
export const DELETE = withAuth(async (req: NextRequest, session, context) => {
    const params = await context?.params
    const id = params?.id as string
    const tutorId = session.user.id
    const { searchParams } = new URL(req.url)
    const recipientId = searchParams.get('recipientId')

    const resource = await db.resource.findFirst({ where: { id, tutorId } })
    if (!resource) {
        return NextResponse.json({ error: 'Resource not found' }, { status: 404 })
    }

    if (recipientId) {
        await db.resourceShare.deleteMany({
            where: { resourceId: id, recipientId },
        })
    } else {
        await db.resourceShare.deleteMany({ where: { resourceId: id } })
    }

    return NextResponse.json({ success: true })
}, { role: 'TUTOR' })
