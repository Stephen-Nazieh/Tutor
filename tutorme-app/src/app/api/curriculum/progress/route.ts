/**
 * Curriculum Progress API
 * GET: Get student progress for a curriculum
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth, ValidationError, NotFoundError } from '@/lib/api/middleware'
import { getStudentProgress } from '@/lib/curriculum/lesson-controller'
import { drizzleDb } from '@/lib/db/drizzle'
import {
  curriculum,
  curriculumModule,
  curriculumLesson,
  curriculumLessonProgress,
} from '@/lib/db/schema'
import { eq, asc, inArray } from 'drizzle-orm'

export const GET = withAuth(async (req, session) => {
  const { searchParams } = new URL(req.url)
  const curriculumId = searchParams.get('curriculumId')

  if (!curriculumId) {
    throw new ValidationError('Curriculum ID is required')
  }

  const progress = await getStudentProgress(session.user.id, curriculumId)

  const [curriculumRow] = await drizzleDb
    .select()
    .from(curriculum)
    .where(eq(curriculum.id, curriculumId))
    .limit(1)

  if (!curriculumRow) {
    throw new NotFoundError('Curriculum not found')
  }

  const modules = await drizzleDb
    .select()
    .from(curriculumModule)
    .where(eq(curriculumModule.curriculumId, curriculumId))
    .orderBy(asc(curriculumModule.order))

  const moduleIds = modules.map((m) => m.id)
  const lessons =
    moduleIds.length > 0
      ? await drizzleDb
          .select()
          .from(curriculumLesson)
          .where(inArray(curriculumLesson.moduleId, moduleIds))
          .orderBy(asc(curriculumLesson.order))
      : []

  const lessonIds = lessons.map((l) => l.id)
  const progressRecords =
    lessonIds.length > 0
      ? await drizzleDb
          .select()
          .from(curriculumLessonProgress)
          .where(
            eq(curriculumLessonProgress.studentId, session.user.id)
          )
      : []
  const progressByLessonId = new Map(
    progressRecords
      .filter((p) => lessonIds.includes(p.lessonId))
      .map((p) => [p.lessonId, p])
  )

  const lessonsByModuleId = new Map<string, typeof lessons>()
  for (const l of lessons) {
    const list = lessonsByModuleId.get(l.moduleId) ?? []
    list.push(l)
    lessonsByModuleId.set(l.moduleId, list)
  }

  const modulesWithProgress = modules.map((module) => {
    const moduleLessons = lessonsByModuleId.get(module.id) ?? []
    return {
      id: module.id,
      title: module.title,
      description: module.description,
      order: module.order,
      lessons: moduleLessons.map((lesson) => ({
        id: lesson.id,
        title: lesson.title,
        order: lesson.order,
        duration: lesson.duration,
        difficulty: lesson.difficulty,
        status: progressByLessonId.get(lesson.id)?.status ?? 'NOT_STARTED',
        currentSection: progressByLessonId.get(lesson.id)?.currentSection,
        score: progressByLessonId.get(lesson.id)?.score,
        completedAt: progressByLessonId.get(lesson.id)?.completedAt,
        isLocked: arePrerequisitesLocked(
          lesson,
          moduleLessons,
          progressByLessonId
        ),
      })),
    }
  })

  return NextResponse.json({
    progress,
    curriculum: {
      id: curriculumRow.id,
      name: curriculumRow.name,
      description: curriculumRow.description,
      modules: modulesWithProgress,
    },
  })
}, { role: 'STUDENT' })

function arePrerequisitesLocked(
  lesson: { prerequisiteLessonIds: string[] | null },
  allLessons: Array<{ id: string }>,
  progressByLessonId: Map<string, { status: string }>
): boolean {
  const prereqs = lesson.prerequisiteLessonIds ?? []
  if (prereqs.length === 0) return false
  for (const prereqId of prereqs) {
    const prereqLesson = allLessons.find((l) => l.id === prereqId)
    if (!prereqLesson) continue
    const record = progressByLessonId.get(prereqLesson.id)
    if (record?.status !== 'COMPLETED') return true
  }
  return false
}
