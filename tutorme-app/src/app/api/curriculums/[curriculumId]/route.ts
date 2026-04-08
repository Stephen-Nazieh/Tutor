/**
 * GET /api/curriculums/[curriculumId] (Drizzle ORM)
 * Returns one published curriculum for student-facing detail/enroll page.
 * When the request is authenticated, includes enrolled: true if the user is enrolled.
 */

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession, authOptions } from '@/lib/auth'
import { getParamAsync } from '@/lib/api/params'
import { and, eq, sql } from 'drizzle-orm'
import { drizzleDb } from '@/lib/db/drizzle'
import {
  course,
  courseEnrollment,
  curriculumModule,
  courseLesson,
  courseProgress,
  profile,
  user,
} from '@/lib/db/schema'

export async function GET(
  req: NextRequest,
  context: {
    params: Promise<Record<string, string | string[]>>
  }
) {
  const courseId = await getParamAsync(context.params, 'curriculumId')

  if (!courseId) {
    return NextResponse.json({ error: 'Curriculum ID required' }, { status: 400 })
  }

  const [courseRow] = await drizzleDb
    .select()
    .from(course)
    .where(and(eq(course.courseId, courseId), eq(course.isPublished, true)))
    .limit(1)

  if (!courseRow) {
    return NextResponse.json({ error: 'Curriculum not found' }, { status: 404 })
  }

  const modules = await drizzleDb
    .select()
    .from(curriculumModule)
    .where(eq(curriculumModule.curriculumId, courseId))

  const [modulesCountRow] = await drizzleDb
    .select({ count: sql<number>`count(*)::int` })
    .from(curriculumModule)
    .where(eq(curriculumModule.curriculumId, courseId))

  const [enrollmentsCountRow] = await drizzleDb
    .select({ count: sql<number>`count(*)::int` })
    .from(courseEnrollment)
    .where(eq(courseEnrollment.courseId, courseId))

  // Lessons now stored in builderData JSON, can't query count directly
  const totalLessons = 0

  let creator: { id: string; name: string; bio: string | null } | null = null
  if (courseRow.creatorId) {
    const [creatorUser] = await drizzleDb
      .select({ userId: user.userId, email: user.email })
      .from(user)
      .where(eq(user.userId, courseRow.creatorId))
      .limit(1)
    const [creatorProfile] = creatorUser
      ? await drizzleDb
          .select({ name: profile.name, bio: profile.bio })
          .from(profile)
          .where(eq(profile.userId, courseRow.creatorId!))
          .limit(1)
      : []
    creator = creatorUser
      ? {
          id: creatorUser.userId,
          name: creatorProfile?.name ?? creatorUser.email ?? 'Tutor',
          bio: creatorProfile?.bio ?? null,
        }
      : null
  }

  let enrolled = false
  const session = await getServerSession(authOptions, req)
  if (session?.user?.id) {
    const [progress] = await drizzleDb
      .select()
      .from(courseProgress)
      .where(
        and(eq(courseProgress.studentId, session.user.id), eq(courseProgress.courseId, courseId))
      )
      .limit(1)
    enrolled = !!progress
  }

  return NextResponse.json({
    id: courseRow.courseId,
    name: courseRow.name,
    subject: courseRow.categories?.[0] ?? '', // Use categories instead of subject
    description: courseRow.description,
    difficulty: '', // No longer in schema
    estimatedHours: 0, // No longer in schema
    price: courseRow.price,
    currency: courseRow.currency,
    isFree: courseRow.isFree,
    gradeLevel: '', // No longer in schema
    languageOfInstruction: courseRow.languageOfInstruction,
    schedule: courseRow.schedule,
    isLiveOnline: courseRow.isLiveOnline,
    modulesCount: modulesCountRow?.count ?? 0,
    lessonsCount: totalLessons,
    studentCount: enrollmentsCountRow?.count ?? 0,
    enrolled,
    creator,
  })
}
