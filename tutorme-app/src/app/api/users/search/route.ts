/**
 * GET /api/users/search?query=
 * Returns mention candidates scoped by role and enrollment privacy.
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/lib/api/middleware'
import { drizzleDb } from '@/lib/db/drizzle'
import { course, courseEnrollment, profile, user } from '@/lib/db/schema'
import { and, asc, eq, ilike, inArray, or } from 'drizzle-orm'
import { normalizeHandle } from '@/lib/mentions/handles'

type Role = 'STUDENT' | 'TUTOR' | 'PARENT' | 'ADMIN'

export const GET = withAuth(async (req: NextRequest, session) => {
  const query = new URL(req.url).searchParams.get('query')?.trim() ?? ''
  const role = session.user.role as Role
  const requesterId = session.user.id
  const handleQuery = normalizeHandle(query).replace(/^@+/, '')
  const namePattern = `%${query}%`
  const handlePattern = `%${handleQuery}%`

  let allowedUserIds: string[] | null = null

  if (role === 'STUDENT') {
    const enrollments = await drizzleDb
      .select({ courseId: courseEnrollment.courseId })
      .from(courseEnrollment)
      .where(eq(courseEnrollment.studentId, requesterId))

    const curriculumIds = enrollments.map(e => e.courseId)
    if (curriculumIds.length === 0) {
      return NextResponse.json({ results: [] })
    }

    const tutors = await drizzleDb
      .select({ tutorId: course.creatorId })
      .from(course)
      .where(inArray(course.courseId, curriculumIds))
    const tutorIds = tutors.map(t => t.tutorId).filter(Boolean) as string[]

    const peers = await drizzleDb
      .select({ studentId: courseEnrollment.studentId })
      .from(courseEnrollment)
      .where(inArray(courseEnrollment.courseId, curriculumIds))
    const peerIds = peers.map(p => p.studentId)

    allowedUserIds = Array.from(new Set([...tutorIds, ...peerIds]))
  } else if (role === 'TUTOR') {
    const curricula = await drizzleDb
      .select({ courseId: course.courseId })
      .from(course)
      .where(eq(course.creatorId, requesterId))
    const curriculumIds = curricula.map(c => c.courseId)
    if (curriculumIds.length === 0) {
      allowedUserIds = [requesterId]
    } else {
      const students = await drizzleDb
        .select({ studentId: courseEnrollment.studentId })
        .from(courseEnrollment)
        .where(inArray(courseEnrollment.courseId, curriculumIds))
      const studentIds = students.map(s => s.studentId)
      allowedUserIds = Array.from(new Set([requesterId, ...studentIds]))
    }
  } else if (role === 'ADMIN') {
    allowedUserIds = null
  } else {
    return NextResponse.json({ results: [] })
  }

  const nameOrHandle = query
    ? or(ilike(profile.name, namePattern), ilike(user.handle, handlePattern))
    : undefined
  const accessCondition = allowedUserIds ? inArray(user.userId, allowedUserIds) : undefined

  const baseQuery = drizzleDb
    .select({
      userId: user.userId,
      handle: user.handle,
      displayName: profile.name,
      avatarUrl: profile.avatarUrl,
    })
    .from(user)
    .leftJoin(profile, eq(profile.userId, user.userId))
    .where(
      nameOrHandle
        ? accessCondition
          ? and(nameOrHandle, accessCondition)
          : nameOrHandle
        : accessCondition
    )
    .orderBy(asc(profile.name))
    .limit(10)

  const results = await baseQuery

  return NextResponse.json({
    results: results.map(r => ({
      id: r.id,
      handle: r.handle,
      displayName: r.displayName ?? r.handle ?? 'User',
      avatarUrl: r.avatarUrl ?? null,
    })),
  })
})
