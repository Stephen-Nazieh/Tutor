/**
 * GET /api/student/resources
 *
 * Returns resources shared with the student, either:
 *  - Directly (by recipientId)
 *  - Shared with all via course they're enrolled in
 *  - Marked as public (isPublic = true) by a tutor they're enrolled with
 */

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession, authOptions } from '@/lib/auth'
import { drizzleDb } from '@/lib/db/drizzle'
import { courseEnrollment, course, resource, resourceShare, profile } from '@/lib/db/schema'
import { eq, and, inArray, desc, or, isNull } from 'drizzle-orm'

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions, request)
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const studentId = session.user.id

  const enrollmentsRows = await drizzleDb
    .select({
      courseId: courseEnrollment.courseId,
      creatorId: course.creatorId,
    })
    .from(courseEnrollment)
    .innerJoin(course, eq(courseEnrollment.courseId, course.courseId))
    .where(eq(courseEnrollment.studentId, studentId))

  const enrolledTutorIds = [
    ...new Set(enrollmentsRows.map(e => e.creatorId).filter((id): id is string => id != null)),
  ]
  const enrolledCourseIds = enrollmentsRows.map(e => e.courseId)

  const directShareIds = (
    await drizzleDb
      .select({ resourceId: resourceShare.resourceId })
      .from(resourceShare)
      .where(eq(resourceShare.recipientId, studentId))
  ).map(r => r.resourceId)

  const courseIdsFilter =
    enrolledCourseIds.length > 0
      ? or(
          isNull(resourceShare.courseId),
          inArray(resourceShare.courseId, enrolledCourseIds)
        )
      : isNull(resourceShare.courseId)
  const sharedWithAllRows =
    enrolledTutorIds.length > 0
      ? await drizzleDb
          .select({ resourceId: resourceShare.resourceId })
          .from(resourceShare)
          .where(
            and(
              eq(resourceShare.sharedWithAll, true),
              inArray(resourceShare.sharedByTutorId, enrolledTutorIds),
              courseIdsFilter
            )
          )
      : []
  const sharedWithAllIds = sharedWithAllRows.map(r => r.resourceId)

  const publicResourceIds =
    enrolledTutorIds.length > 0
      ? (
          await drizzleDb
            .select({ resourceId: resource.resourceId })
            .from(resource)
            .where(and(eq(resource.isPublic, true), inArray(resource.tutorId, enrolledTutorIds)))
        ).map(r => r.resourceId)
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
    .where(inArray(resource.resourceId, allResourceIds))
    .orderBy(desc(resource.createdAt))

  const tutorIds = [...new Set(resources.map(r => r.tutorId))]
  const profiles =
    tutorIds.length > 0
      ? await drizzleDb
          .select({ userId: profile.userId, name: profile.name })
          .from(profile)
          .where(inArray(profile.userId, tutorIds))
      : []
  const nameByTutorId = new Map(profiles.map(p => [p.userId, p.name]))

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
  const messageByResourceId = new Map(sharesToStudent.map(s => [s.resourceId, s.message]))

  const formatted = resources.map(r => ({
    resourceId: r.resourceId,
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
    sharedMessage: messageByResourceId.get(r.resourceId) ?? null,
  }))

  return NextResponse.json({ resources: formatted })
}
