/**
 * Curriculum Detail API
 * GET: Get detailed curriculum info with modules, lessons, and progress
 */

import { NextResponse } from 'next/server'
import { withAuth, NotFoundError } from '@/lib/api/middleware'
import { drizzleDb } from '@/lib/db/drizzle'
import {
  curriculum,
  curriculumModule,
  curriculumLesson,
  curriculumProgress,
  lessonSession,
  curriculumLessonProgress,
} from '@/lib/db/schema'
import { eq, and, asc, inArray } from 'drizzle-orm'

export const GET = withAuth(async (_req, session, context: any) => {
  const params = await context?.params
  const { curriculumId } = await params
  const studentId = session.user.id

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
  const sessions =
    lessonIds.length > 0
      ? await drizzleDb
          .select()
          .from(lessonSession)
          .where(
            and(
              eq(lessonSession.studentId, studentId),
              inArray(lessonSession.lessonId, lessonIds)
            )
          )
      : []
  const progressRecords =
    lessonIds.length > 0
      ? await drizzleDb
          .select()
          .from(curriculumLessonProgress)
          .where(
            and(
              eq(curriculumLessonProgress.studentId, studentId),
              inArray(curriculumLessonProgress.lessonId, lessonIds)
            )
          )
      : []

  const [progress] = await drizzleDb
    .select()
    .from(curriculumProgress)
    .where(
      and(
        eq(curriculumProgress.studentId, studentId),
        eq(curriculumProgress.curriculumId, curriculumId)
      )
    )
    .limit(1)

  const sessionByLessonId = new Map(sessions.map((s) => [s.lessonId, s]))
  const progressByLessonId = new Map(progressRecords.map((p) => [p.lessonId, p]))
  const lessonsByModuleId = new Map<string, typeof lessons>()
  for (const l of lessons) {
    const list = lessonsByModuleId.get(l.moduleId) ?? []
    list.push(l)
    lessonsByModuleId.set(l.moduleId, list)
  }

  const totalLessons = lessons.length

  const modulesWithStatus = modules.map((module) => {
    const moduleLessons = lessonsByModuleId.get(module.id) ?? []
    return {
      id: module.id,
      title: module.title,
      description: module.description,
      order: module.order,
      lessons: moduleLessons.map((lesson) => {
        const record = progressByLessonId.get(lesson.id)
        let status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED' = 'NOT_STARTED'
        if (record) {
          if (record.status === 'COMPLETED') status = 'COMPLETED'
          else if (record.status === 'IN_PROGRESS') status = 'IN_PROGRESS'
        }

        const isLocked = arePrerequisitesLocked(
          lesson.prerequisiteLessonIds ?? [],
          moduleLessons,
          progressByLessonId
        )

        const sess = sessionByLessonId.get(lesson.id)
        const conceptMastery = sess?.conceptMastery as Record<string, number> | null
        const score =
          conceptMastery && Object.keys(conceptMastery).length > 0
            ? Math.round(
                Object.values(conceptMastery).reduce((a, b) => a + b, 0) /
                  Object.keys(conceptMastery).length
              )
            : null

        return {
          id: lesson.id,
          title: lesson.title,
          description: lesson.description,
          duration: lesson.duration,
          difficulty: lesson.difficulty,
          order: lesson.order,
          prerequisiteLessonIds: lesson.prerequisiteLessonIds ?? [],
          status,
          isLocked,
          progress: sess
            ? {
                currentSection: sess.currentSection,
                completedAt: sess.completedAt,
                score,
              }
            : undefined,
        }
      }),
    }
  })

  const courseMaterials = curriculumRow.courseMaterials as { outline?: unknown[] } | null
  const hasOutline = !!(
    courseMaterials &&
    Array.isArray(courseMaterials.outline) &&
    courseMaterials.outline.length > 0
  )

  return NextResponse.json({
    curriculum: {
      id: curriculumRow.id,
      name: curriculumRow.name,
      description: curriculumRow.description,
      subject: curriculumRow.subject,
      difficulty: curriculumRow.difficulty,
      estimatedHours: curriculumRow.estimatedHours,
      hasOutline,
      progress: {
        lessonsCompleted: progress?.lessonsCompleted ?? 0,
        totalLessons,
        averageScore: progress?.averageScore ?? undefined,
        isCompleted: progress?.isCompleted ?? false,
        startedAt: progress?.startedAt?.toISOString() ?? null,
      },
      modules: modulesWithStatus,
    },
  })
}, { role: 'STUDENT' })

function arePrerequisitesLocked(
  prerequisiteIds: string[],
  allLessons: Array<{ id: string }>,
  progressByLessonId: Map<string, { status: string }>
): boolean {
  if (prerequisiteIds.length === 0) return false
  for (const prereqId of prerequisiteIds) {
    const prereqLesson = allLessons.find((l) => l.id === prereqId)
    if (!prereqLesson) continue
    const record = progressByLessonId.get(prereqLesson.id)
    const isCompleted = record?.status === 'COMPLETED'
    if (!isCompleted) return true
  }
  return false
}
