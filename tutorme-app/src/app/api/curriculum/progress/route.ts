/**
 * Curriculum Progress API
 * GET: Get student progress for a curriculum
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth, ValidationError, NotFoundError } from '@/lib/api/middleware'
import { getStudentProgress } from '@/lib/curriculum/lesson-controller'
import { drizzleDb } from '@/lib/db/drizzle'
import {
  course,
  curriculumModule,
  courseLesson,
  curriculumLessonProgress,
} from '@/lib/db/schema'
import { eq, asc, inArray } from 'drizzle-orm'

export const GET = withAuth(
  async (req, session) => {
    const { searchParams } = new URL(req.url)
    const courseId = searchParams.get('curriculumId')

    if (!courseId) {
      throw new ValidationError('Curriculum ID is required')
    }

    const progress = await getStudentProgress(session.user.id, courseId)

    const [courseRow] = await drizzleDb
      .select()
      .from(course)
      .where(eq(course.courseId, courseId))
      .limit(1)

    if (!courseRow) {
      throw new NotFoundError('Curriculum not found')
    }

    const modules = await drizzleDb
      .select()
      .from(curriculumModule)
      .where(eq(curriculumModule.curriculumId, courseId))
      .orderBy(asc(curriculumModule.order))

    const moduleIds = modules.map(m => m.id)
    const lessons =
      moduleIds.length > 0
        ? await drizzleDb
            .select()
            .from(courseLesson)
            .where(inArray(courseLesson.moduleId, moduleIds))
            .orderBy(asc(courseLesson.order))
        : []

    const lessonIds = lessons.map(l => l.lessonId)
    const progressRecords =
      lessonIds.length > 0
        ? await drizzleDb
            .select()
            .from(curriculumLessonProgress)
            .where(eq(curriculumLessonProgress.studentId, session.user.id))
        : []
    const progressByLessonId = new Map(
      progressRecords.filter(p => lessonIds.includes(p.lessonId)).map(p => [p.lessonId, p])
    )

    const lessonsByModuleId = new Map<string, typeof lessons>()
    for (const l of lessons) {
      // Handle legacy moduleId which may be null in new schema
      const key = l.moduleId ?? 'default'
      const list = lessonsByModuleId.get(key) ?? []
      list.push(l)
      lessonsByModuleId.set(key, list)
    }

    const modulesWithProgress = modules.map(module => {
      const moduleLessons = lessonsByModuleId.get(module.id) ?? []
      return {
        id: module.id,
        title: module.title,
        description: module.description,
        order: module.order,
        lessons: moduleLessons.map(lesson => ({
          id: lesson.lessonId,
          title: lesson.title,
          order: lesson.order,
          duration: lesson.duration,
          difficulty: lesson.difficulty,
          status: progressByLessonId.get(lesson.lessonId)?.status ?? 'NOT_STARTED',
          currentSection: progressByLessonId.get(lesson.lessonId)?.currentSection,
          score: progressByLessonId.get(lesson.lessonId)?.score,
          completedAt: progressByLessonId.get(lesson.lessonId)?.completedAt,
          isLocked: arePrerequisitesLocked(lesson, moduleLessons, progressByLessonId),
        })),
      }
    })

    return NextResponse.json({
      progress,
      curriculum: {
        id: courseRow.courseId,
        name: courseRow.name,
        description: courseRow.description,
        modules: modulesWithProgress,
      },
    })
  },
  { role: 'STUDENT' }
)

function arePrerequisitesLocked(
  lesson: { prerequisiteLessonIds: string[] | null },
  allLessons: Array<{ lessonId: string }>,
  progressByLessonId: Map<string, { status: string }>
): boolean {
  const prereqs = lesson.prerequisiteLessonIds ?? []
  if (prereqs.length === 0) return false
  for (const prereqId of prereqs) {
    const prereqLesson = allLessons.find(l => l.lessonId === prereqId)
    if (!prereqLesson) continue
    const record = progressByLessonId.get(prereqLesson.lessonId)
    if (record?.status !== 'COMPLETED') return true
  }
  return false
}
