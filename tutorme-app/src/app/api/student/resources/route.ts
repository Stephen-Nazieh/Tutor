/**
 * GET /api/student/resources
 *
 * Returns resources shared with the student, either:
 *  - Directly (by recipientId)
 *  - Shared with all via curriculum they're enrolled in
 *  - Marked as public (isPublic = true) by a tutor they're enrolled with
 */

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession, authOptions } from '@/lib/auth'
import { drizzleDb } from '@/lib/db/drizzle'
import {
  curriculumEnrollment,
  curriculum,
  resource,
  resourceShare,
  profile,
} from '@/lib/db/schema'
import { eq, and, inArray, desc, or, isNull } from 'drizzle-orm'

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions, request)
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const studentId = session.user.id

  const enrollmentsRows = await drizzleDb
    .select({
      curriculumId: curriculumEnrollment.curriculumId,
      creatorId: curriculum.creatorId,
    })
    .from(curriculumEnrollment)
    .innerJoin(
      curriculum,
      eq(curriculumEnrollment.curriculumId, curriculum.id)
    )
    .where(eq(curriculumEnrollment.studentId, studentId))

  const enrolledTutorIds = [
    ...new Set(
      enrollmentsRows.map((e) => e.creatorId).filter((id): id is string => id != null)
    ),
  ]
  const enrolledCurriculumIds = enrollmentsRows.map((e) => e.curriculumId)

  const directShareIds = (
    await drizzleDb
      .select({ resourceId: resourceShare.resourceId })
      .from(resourceShare)
      .where(eq(resourceShare.recipientId, studentId))
  ).map((r) => r.resourceId)

  const curriculumIdsFilter =
    enrolledCurriculumIds.length > 0
      ? or(
          isNull(resourceShare.curriculumId),
          inArray(resourceShare.curriculumId, enrolledCurriculumIds)
        )
      : isNull(resourceShare.curriculumId)
  const sharedWithAllRows =
    enrolledTutorIds.length > 0
      ? await drizzleDb
          .select({ resourceId: resourceShare.resourceId })
          .from(resourceShare)
          .where(
            and(
              eq(resourceShare.sharedWithAll, true),
              inArray(resourceShare.sharedByTutorId, enrolledTutorIds),
              curriculumIdsFilter
            )
          )
      : []
  const sharedWithAllIds = sharedWithAllRows.map((r) => r.resourceId)

  const publicResourceIds =
    enrolledTutorIds.length > 0
      ? (
          await drizzleDb
            .select({ id: resource.id })
            .from(resource)
            .where(
              and(
                eq(resource.isPublic, true),
                inArray(resource.tutorId, enrolledTutorIds)
              )
            )
        ).map((r) => r.id)
      : []

  const allResourceIds = [
    ...new Set([...directShareIds, ...sharedWithAllIds, ...publicResourceIds]),
  ]

  if (allResourceIds.length === 0) {
    return NextResponse.json({ resources: [] })
  }

  const resources = await drizzleDb
    .select()
    .from(resource)
    .where(inArray(resource.id, allResourceIds))
    .orderBy(desc(resource.createdAt))

  const tutorIds = [...new Set(resources.map((r) => r.tutorId))]
  const profiles =
    tutorIds.length > 0
      ? await drizzleDb
          .select({ userId: profile.userId, name: profile.name })
          .from(profile)
          .where(inArray(profile.userId, tutorIds))
      : []
  const nameByTutorId = new Map(profiles.map((p) => [p.userId, p.name]))

  const sharesToStudent = await drizzleDb
    .select({
      resourceId: resourceShare.resourceId,
      message: resourceShare.message,
    })
    .from(resourceShare)
    .where(
      and(
        eq(resourceShare.recipientId, studentId),
        inArray(resourceShare.resourceId, allResourceIds)
      )
    )
  const messageByResourceId = new Map(
    sharesToStudent.map((s) => [s.resourceId, s.message])
  )

  const formatted = resources.map((r) => ({
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
    tutorName: nameByTutorId.get(r.tutorId) ?? 'Tutor',
    sharedMessage: messageByResourceId.get(r.id) ?? null,
  }))

  return NextResponse.json({ resources: formatted })
}
