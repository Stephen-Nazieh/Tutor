/**
 * GET /api/curriculums/[curriculumId] (Drizzle ORM)
 * Returns one published curriculum for student-facing detail/enroll page.
 * When the request is authenticated, includes enrolled: true if the user is enrolled.
 */

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { and, eq, sql } from 'drizzle-orm'
import { authOptions } from '@/lib/auth'
import { drizzleDb } from '@/lib/db/drizzle'
import {
  curriculum,
  curriculumEnrollment,
  curriculumModule,
  curriculumLesson,
  curriculumProgress,
  profile,
  user,
} from '@/lib/db/schema'

export async function GET(
  _req: NextRequest,
  context: { params?: Promise<{ curriculumId?: string }> }
) {
  const params = await context?.params
  const curriculumId = params?.curriculumId

  if (!curriculumId) {
    return NextResponse.json({ error: 'Curriculum ID required' }, { status: 400 })
  }

  const [curriculumRow] = await drizzleDb
    .select()
    .from(curriculum)
    .where(
      and(
        eq(curriculum.id, curriculumId),
        eq(curriculum.isPublished, true)
      )
    )
    .limit(1)

  if (!curriculumRow) {
    return NextResponse.json({ error: 'Curriculum not found' }, { status: 404 })
  }

  const modules = await drizzleDb
    .select()
    .from(curriculumModule)
    .where(eq(curriculumModule.curriculumId, curriculumId))

  const [modulesCountRow] = await drizzleDb
    .select({ count: sql<number>`count(*)::int` })
    .from(curriculumModule)
    .where(eq(curriculumModule.curriculumId, curriculumId))

  const [enrollmentsCountRow] = await drizzleDb
    .select({ count: sql<number>`count(*)::int` })
    .from(curriculumEnrollment)
    .where(eq(curriculumEnrollment.curriculumId, curriculumId))

  let totalLessons = 0
  for (const mod of modules) {
    const [lessonCount] = await drizzleDb
      .select({ count: sql<number>`count(*)::int` })
      .from(curriculumLesson)
      .where(eq(curriculumLesson.moduleId, mod.id))
    totalLessons += lessonCount?.count ?? 0
  }

  let creator: { id: string; name: string; bio: string | null } | null = null
  if (curriculumRow.creatorId) {
    const [creatorUser] = await drizzleDb
      .select({ id: user.id, email: user.email })
      .from(user)
      .where(eq(user.id, curriculumRow.creatorId))
      .limit(1)
    const [creatorProfile] = creatorUser
      ? await drizzleDb
          .select({ name: profile.name, bio: profile.bio })
          .from(profile)
          .where(eq(profile.userId, curriculumRow.creatorId!))
          .limit(1)
      : []
    creator = creatorUser
      ? {
          id: creatorUser.id,
          name: creatorProfile?.name ?? creatorUser.email ?? 'Tutor',
          bio: creatorProfile?.bio ?? null,
        }
      : null
  }

  let enrolled = false
  const session = await getServerSession(authOptions)
  if (session?.user?.id) {
    const [progress] = await drizzleDb
      .select()
      .from(curriculumProgress)
      .where(
        and(
          eq(curriculumProgress.studentId, session.user.id),
          eq(curriculumProgress.curriculumId, curriculumId)
        )
      )
      .limit(1)
    enrolled = !!progress
  }

  return NextResponse.json({
    id: curriculumRow.id,
    name: curriculumRow.name,
    subject: curriculumRow.subject,
    description: curriculumRow.description,
    difficulty: curriculumRow.difficulty,
    estimatedHours: curriculumRow.estimatedHours,
    price: curriculumRow.price,
    currency: curriculumRow.currency,
    gradeLevel: curriculumRow.gradeLevel,
    languageOfInstruction: curriculumRow.languageOfInstruction,
    schedule: curriculumRow.schedule,
    isLiveOnline: curriculumRow.isLiveOnline,
    modulesCount: modulesCountRow?.count ?? 0,
    lessonsCount: totalLessons,
    studentCount: enrollmentsCountRow?.count ?? 0,
    enrolled,
    creator,
  })
}
