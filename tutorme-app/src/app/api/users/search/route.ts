/**
 * GET /api/users/search?query=
 * Returns mention candidates scoped by role and enrollment privacy.
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/lib/api/middleware'
import { drizzleDb } from '@/lib/db/drizzle'
import { curriculum, curriculumEnrollment, profile, user } from '@/lib/db/schema'
import { and, eq, ilike, inArray, or } from 'drizzle-orm'
import { normalizeHandle } from '@/lib/mentions/handles'

type Role = 'STUDENT' | 'TUTOR' | 'PARENT' | 'ADMIN'

export const GET = withAuth(async (req: NextRequest, session) => {
  const query = new URL(req.url).searchParams.get('query')?.trim() ?? ''
  if (!query) {
    return NextResponse.json({ results: [] })
  }

  const role = session.user.role as Role
  const requesterId = session.user.id
  const handleQuery = normalizeHandle(query).replace(/^@+/, '')
  const namePattern = `%${query}%`
  const handlePattern = `%${handleQuery}%`

  let allowedUserIds: string[] | null = null

  if (role === 'STUDENT') {
    const enrollments = await drizzleDb
      .select({ curriculumId: curriculumEnrollment.curriculumId })
      .from(curriculumEnrollment)
      .where(eq(curriculumEnrollment.studentId, requesterId))

    const curriculumIds = enrollments.map((e) => e.curriculumId)
    if (curriculumIds.length === 0) {
      return NextResponse.json({ results: [] })
    }

    const tutors = await drizzleDb
      .select({ tutorId: curriculum.creatorId })
      .from(curriculum)
      .where(inArray(curriculum.id, curriculumIds))
    const tutorIds = tutors.map((t) => t.tutorId).filter(Boolean) as string[]

    const peers = await drizzleDb
      .select({ studentId: curriculumEnrollment.studentId })
      .from(curriculumEnrollment)
      .where(inArray(curriculumEnrollment.curriculumId, curriculumIds))
    const peerIds = peers.map((p) => p.studentId)

    allowedUserIds = Array.from(new Set([...tutorIds, ...peerIds]))
  } else if (role === 'TUTOR') {
    const curricula = await drizzleDb
      .select({ id: curriculum.id })
      .from(curriculum)
      .where(eq(curriculum.creatorId, requesterId))
    const curriculumIds = curricula.map((c) => c.id)
    if (curriculumIds.length === 0) {
      allowedUserIds = [requesterId]
    } else {
      const students = await drizzleDb
        .select({ studentId: curriculumEnrollment.studentId })
        .from(curriculumEnrollment)
        .where(inArray(curriculumEnrollment.curriculumId, curriculumIds))
      const studentIds = students.map((s) => s.studentId)
      allowedUserIds = Array.from(new Set([requesterId, ...studentIds]))
    }
  } else if (role === 'ADMIN') {
    allowedUserIds = null
  } else {
    return NextResponse.json({ results: [] })
  }

  const conditions = [
    or(
      ilike(profile.name, namePattern),
      ilike(user.handle, handlePattern)
    ),
    allowedUserIds ? inArray(user.id, allowedUserIds) : null,
  ].filter(Boolean) as unknown as [unknown, ...unknown[]]

  const baseQuery = drizzleDb
    .select({
      id: user.id,
      handle: user.handle,
      displayName: profile.name,
      avatarUrl: profile.avatarUrl,
    })
    .from(user)
    .leftJoin(profile, eq(profile.userId, user.id))
    .where(and(...conditions))
    .limit(10)

  const results = await baseQuery

  return NextResponse.json({
    results: results.map((r) => ({
      id: r.id,
      handle: r.handle,
      displayName: r.displayName ?? r.handle ?? 'User',
      avatarUrl: r.avatarUrl ?? null,
    })),
  })
})
