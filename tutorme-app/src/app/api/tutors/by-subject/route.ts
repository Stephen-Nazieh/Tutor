/**
 * API endpoint to get tutors by subject
 * GET /api/tutors/by-subject?subject=math
 */

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession, authOptions } from '@/lib/auth'
import { drizzleDb } from '@/lib/db/drizzle'
import { user, profile, liveSession, sessionParticipant } from '@/lib/db/schema'
import { eq, and, ilike, inArray, sql } from 'drizzle-orm'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions, request)
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const subjectCode = searchParams.get('subject')

    if (!subjectCode) {
      return NextResponse.json({ error: 'Subject code required' }, { status: 400 })
    }

    const tutorIdsWithSubject = await drizzleDb
      .selectDistinct({ tutorId: liveSession.tutorId })
      .from(liveSession)
      .where(ilike(liveSession.subject, subjectCode))
      .limit(500)
    const ids = tutorIdsWithSubject.map((r) => r.tutorId).filter(Boolean)
    if (ids.length === 0) {
      return NextResponse.json({ tutors: [] })
    }

    const users = await drizzleDb
      .select({ id: user.id })
      .from(user)
      .where(and(eq(user.role, 'TUTOR'), inArray(user.id, ids)))
      .limit(20)
    const userIds = users.map((u) => u.id)
    if (userIds.length === 0) {
      return NextResponse.json({ tutors: [] })
    }

    const profiles = await drizzleDb
      .select({ userId: profile.userId, name: profile.name, avatarUrl: profile.avatarUrl, bio: profile.bio })
      .from(profile)
      .where(inArray(profile.userId, userIds))
    const profileByUserId = new Map(profiles.map((p) => [p.userId, p]))

    const completedSessions = await drizzleDb
      .select({ id: liveSession.id, tutorId: liveSession.tutorId })
      .from(liveSession)
      .where(and(ilike(liveSession.subject, subjectCode), eq(liveSession.status, 'completed')))
    const sessionIds = completedSessions.map((s) => s.id)
    const participantCounts =
      sessionIds.length > 0
        ? await drizzleDb
            .select({
              sessionId: sessionParticipant.sessionId,
              count: sql<number>`count(*)::int`,
            })
            .from(sessionParticipant)
            .where(inArray(sessionParticipant.sessionId, sessionIds))
            .groupBy(sessionParticipant.sessionId)
        : []
    const countBySessionId = new Map(participantCounts.map((r) => [r.sessionId, r.count]))
    const tutorTotalStudents = new Map<string, number>()
    for (const s of completedSessions) {
      const total = tutorTotalStudents.get(s.tutorId) ?? 0
      tutorTotalStudents.set(s.tutorId, total + (countBySessionId.get(s.id) ?? 0))
    }
    const tutorSessionCount = new Map<string, number>()
    for (const s of completedSessions) {
      tutorSessionCount.set(s.tutorId, (tutorSessionCount.get(s.tutorId) ?? 0) + 1)
    }

    const formattedTutors = userIds.map((id) => {
      const p = profileByUserId.get(id)
      return {
        id,
        name: p?.name ?? 'Unknown Tutor',
        avatar: p?.avatarUrl ?? null,
        bio: p?.bio ?? `Experienced ${subjectCode} tutor`,
        rating: 0,
        reviewCount: 0,
        hourlyRate: null,
        currency: 'SGD',
        nextAvailableSlot: null,
        totalStudents: tutorTotalStudents.get(id) ?? 0,
        totalClasses: tutorSessionCount.get(id) ?? 0,
      }
    })

    formattedTutors.sort((a, b) => {
      if (b.rating !== a.rating) return b.rating - a.rating
      return (b.totalStudents ?? 0) - (a.totalStudents ?? 0)
    })

    return NextResponse.json({ tutors: formattedTutors })
  } catch (error) {
    console.error('Error fetching tutors:', error)
    return NextResponse.json(
      { error: 'Failed to fetch tutors' },
      { status: 500 }
    )
  }
}
