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
import { courseShare, course, curriculumModule, courseLesson, profile } from '@/lib/db/schema'

export async function GET(
  req: NextRequest,
  context: {
    params: Promise<Record<string, string | string[]>>
  }
) {
  const session = await getServerSession(authOptions, req)

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (session.user.role !== 'PARENT' && session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Only parents can view shared courses' }, { status: 403 })
  }

  const shareId = await getParamAsync(context.params, 'id')
  if (!shareId) {
    return NextResponse.json({ error: 'Share ID required' }, { status: 400 })
  }

  const [shareRecord] = await drizzleDb
    .select()
    .from(courseShare)
    .where(eq(courseShare.shareId, shareId))
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
    .from(course)
    .where(eq(course.courseId, shareRecord.courseId))
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
    .where(eq(curriculumModule.curriculumId, courseRow.courseId))
    .orderBy(asc(curriculumModule.order))

  // Batch fetch all lessons for the course to avoid N+1
  const allLessons = await drizzleDb
    .select({
      lessonId: courseLesson.lessonId,
      title: courseLesson.title,
      description: courseLesson.description,
      order: courseLesson.order,
    })
    .from(courseLesson)
    .where(eq(courseLesson.courseId, courseRow.courseId))
    .orderBy(asc(courseLesson.order))

  const lessonsByModuleId = new Map<string, typeof allLessons>()
  for (const lesson of allLessons) {
    const moduleLessons = lessonsByModuleId.get(courseRow.courseId) ?? []
    moduleLessons.push(lesson)
    lessonsByModuleId.set(courseRow.courseId, moduleLessons)
  }

  const modulesWithLessons = modulesList.map(m => ({
    moduleId: m.moduleId,
    title: m.title,
    description: m.description,
    order: m.order,
    lessons: lessonsByModuleId.get(courseRow.courseId) ?? [],
  }))

  const courseData = {
    shareId: shareRecord.shareId,
    courseId: courseRow.courseId,
    name: courseRow.name,
    description: courseRow.description,
    categories: courseRow.categories,
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
