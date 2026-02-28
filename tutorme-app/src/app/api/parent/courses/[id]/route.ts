/**
 * Parent Course Viewing API
 * GET /api/parent/courses/[id] - View shared course by CurriculumShare.id
 * Only parents who are recipients can view
 */

import { NextRequest, NextResponse } from 'next/server'
import { asc, eq } from 'drizzle-orm'
import { getServerSession, authOptions } from '@/lib/auth'
import { getParamAsync } from '@/lib/api/params'
import { drizzleDb } from '@/lib/db/drizzle'
import {
  curriculumShare,
  curriculum,
  curriculumModule,
  curriculumLesson,
  profile,
} from '@/lib/db/schema'

export async function GET(req: NextRequest, context?: { params?: Promise<Record<string, string | string[]>> | Record<string, string | string[]> }) {
  const session = await getServerSession(authOptions, req)

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (session.user.role !== 'PARENT' && session.user.role !== 'ADMIN') {
    return NextResponse.json(
      { error: 'Only parents can view shared courses' },
      { status: 403 }
    )
  }

  const shareId = await getParamAsync(context?.params, 'id')
  if (!shareId) {
    return NextResponse.json({ error: 'Share ID required' }, { status: 400 })
  }

  const [shareRecord] = await drizzleDb
    .select()
    .from(curriculumShare)
    .where(eq(curriculumShare.id, shareId))
    .limit(1)

  if (!shareRecord) {
    return NextResponse.json({ error: 'Course share not found' }, { status: 404 })
  }

  if (shareRecord.recipientId !== session.user.id) {
    return NextResponse.json(
      { error: 'You do not have access to this shared course' },
      { status: 403 }
    )
  }

  const [courseRow] = await drizzleDb
    .select()
    .from(curriculum)
    .where(eq(curriculum.id, shareRecord.curriculumId))
    .limit(1)

  if (!courseRow) {
    return NextResponse.json({ error: 'Course share not found' }, { status: 404 })
  }

  const [tutorProfile] = await drizzleDb
    .select({ name: profile.name })
    .from(profile)
    .where(eq(profile.userId, shareRecord.sharedByTutorId))
    .limit(1)

  const tutorName = tutorProfile?.name ?? 'Tutor'

  const modulesList = await drizzleDb
    .select()
    .from(curriculumModule)
    .where(eq(curriculumModule.curriculumId, courseRow.id))
    .orderBy(asc(curriculumModule.order))

  const modulesWithLessons = await Promise.all(
    modulesList.map(async (m) => {
      const lessons = await drizzleDb
        .select({
          id: curriculumLesson.id,
          title: curriculumLesson.title,
          description: curriculumLesson.description,
          duration: curriculumLesson.duration,
          order: curriculumLesson.order,
          learningObjectives: curriculumLesson.learningObjectives,
        })
        .from(curriculumLesson)
        .where(eq(curriculumLesson.moduleId, m.id))
        .orderBy(asc(curriculumLesson.order))
      return {
        id: m.id,
        title: m.title,
        description: m.description,
        order: m.order,
        lessons,
      }
    })
  )

  const courseData = {
    shareId: shareRecord.id,
    courseId: courseRow.id,
    name: courseRow.name,
    description: courseRow.description,
    subject: courseRow.subject,
    gradeLevel: courseRow.gradeLevel,
    difficulty: courseRow.difficulty,
    estimatedHours: courseRow.estimatedHours,
    price: courseRow.price,
    currency: courseRow.currency ?? 'SGD',
    languageOfInstruction: courseRow.languageOfInstruction,
    tutorName,
    sharedMessage: shareRecord.message,
    sharedAt: shareRecord.sharedAt,
    modules: modulesWithLessons,
  }

  return NextResponse.json({
    success: true,
    course: courseData,
  })
}
