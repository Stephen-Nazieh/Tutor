/**
 * GET /api/student/missed-classes
 *
 * Returns sessions the student missed (completed sessions they didn't attend
 * or left early), including recording URLs when available.
 */

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'

export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const studentId = session.user.id
    const { searchParams } = new URL(req.url)
    const filter = searchParams.get('filter') || 'all' // all | week | month

    try {
        // Date filter
        let dateFilter: Date | undefined
        const now = new Date()
        if (filter === 'week') {
            dateFilter = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
        } else if (filter === 'month') {
            dateFilter = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
        }

        // Find completed sessions where the student was a participant
        // but either never joined (joinedAt exists but leftAt is very early) or never appeared
        const participantSessions = await db.sessionParticipant.findMany({
            where: { studentId },
            select: { sessionId: true, joinedAt: true, leftAt: true },
        })

        const participatedIds = new Set(
            participantSessions
                .filter((p) => {
                    // If they joined and stayed (leftAt is null or left after significant time), they attended
                    if (!p.leftAt) return false // Still in session or properly attended
                    // If they left within 5 minutes of joining, count as missed
                    const stayDuration = p.leftAt.getTime() - p.joinedAt.getTime()
                    return stayDuration < 5 * 60 * 1000 // less than 5 min = missed
                })
                .map((p) => p.sessionId)
        )

        const fullyAttendedIds = new Set(
            participantSessions
                .filter((p) => !participatedIds.has(p.sessionId))
                .map((p) => p.sessionId)
        )

        // Find completed sessions the student should have attended but didn't
        // (sessions by tutors of courses the student is enrolled in)
        const enrollments = await db.curriculumEnrollment.findMany({
            where: { studentId },
            include: {
                curriculum: { select: { creatorId: true } },
            },
        })
        const tutorIds = [...new Set(enrollments.map((e) => e.curriculum.creatorId))]

        const missedSessions = await db.liveSession.findMany({
            where: {
                tutorId: { in: tutorIds },
                status: { in: ['completed', 'ended'] },
                endedAt: { not: null },
                id: { notIn: [...fullyAttendedIds] },
                ...(dateFilter ? { scheduledAt: { gte: dateFilter } } : {}),
            },
            include: {
                tutor: { select: { name: true } },
            },
            orderBy: { scheduledAt: 'desc' },
            take: 20,
        })

        const missed = missedSessions.map((s) => ({
            id: s.id,
            title: s.title,
            subject: s.subject,
            tutorName: s.tutor.name,
            scheduledAt: s.scheduledAt,
            endedAt: s.endedAt,
            duration: s.scheduledAt && s.endedAt
                ? Math.round((s.endedAt.getTime() - s.scheduledAt.getTime()) / 60000)
                : null,
            recordingUrl: s.recordingUrl,
            recordingAvailableAt: s.recordingAvailableAt,
            hasRecording: !!s.recordingUrl,
            leftEarly: participatedIds.has(s.id),
        }))

        return NextResponse.json({
            success: true,
            data: {
                sessions: missed,
                totalMissed: missed.length,
            },
        })
    } catch (error) {
        console.error('Failed to fetch missed classes:', error)
        return NextResponse.json({ error: 'Failed to fetch missed classes' }, { status: 500 })
    }
}
