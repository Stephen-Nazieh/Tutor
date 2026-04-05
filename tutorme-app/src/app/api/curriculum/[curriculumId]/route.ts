/**
 * Curriculum Detail API
 * GET: Get detailed curriculum info with modules, lessons, and progress
 */

import { NextResponse } from 'next/server'
import { withAuth, NotFoundError } from '@/lib/api/middleware'
import { getParamAsync } from '@/lib/api/params'
import { drizzleDb } from '@/lib/db/drizzle'
import {
  course,
  curriculumModule,
  courseLesson,
  courseProgress,
  lessonSession,
  curriculumLessonProgress,
} from '@/lib/db/schema'
import { eq, and, asc } from 'drizzle-orm'

interface ScheduleItem {
  dayOfWeek: string
  startTime: string
  durationMinutes: number
}

function normalizeSchedule(schedule: unknown): ScheduleItem[] {
  if (!Array.isArray(schedule)) return []
  return schedule.filter(
    (slot): slot is ScheduleItem =>
      !!slot &&
      typeof slot === 'object' &&
      typeof (slot as ScheduleItem).dayOfWeek === 'string' &&
      typeof (slot as ScheduleItem).startTime === 'string' &&
      typeof (slot as ScheduleItem).durationMinutes === 'number'
  )
}

export const GET = withAuth(
  async (_req, session, context) => {
    const courseId = await getParamAsync(context?.params, 'curriculumId')
    if (!courseId) {
      return NextResponse.json({ error: 'Curriculum ID required' }, { status: 400 })
    }
    const studentId = session.user.id

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
      .where(eq(curriculumModule.courseId, courseId))
      .orderBy(asc(curriculumModule.order))

    // Lessons are now stored in builderData JSON field
    // Return empty array for lessons in the response for backward compatibility
    const lessons: (typeof courseLesson.$inferSelect)[] = []

    // Sessions and progress are now handled differently with new schema
    const sessions: (typeof lessonSession.$inferSelect)[] = []
    const progressRecords: (typeof curriculumLessonProgress.$inferSelect)[] = []

    const [progress] = await drizzleDb
      .select()
      .from(courseProgress)
      .where(and(eq(courseProgress.studentId, studentId), eq(courseProgress.courseId, courseId)))
      .limit(1)

    const sessionByLessonId = new Map<string, typeof lessonSession.$inferSelect>()
    const progressByLessonId = new Map<string, typeof curriculumLessonProgress.$inferSelect>()
    const lessonsByModuleId = new Map<string, typeof lessons>()
    // Lessons are now stored in builderData JSON, empty for new schema
    for (const m of modules) {
      lessonsByModuleId.set(m.moduleId, [])
    }

    const totalLessons = lessons.length

    const modulesWithStatus = modules.map(module => {
      const moduleLessons = lessonsByModuleId.get(module.moduleId) ?? []
      return {
        id: module.moduleId,
        title: module.title,
        description: module.description,
        order: module.order,
        lessons: [], // Lessons now stored in builderData JSON
      }
    })

    const schedule = normalizeSchedule(courseRow.schedule)

    return NextResponse.json({
      curriculum: {
        id: courseRow.courseId,
        name: courseRow.name,
        description: courseRow.description,
        subject: courseRow.categories?.[0] ?? '', // Use categories instead of subject
        difficulty: '', // No longer in schema
        estimatedHours: 0, // No longer in schema
        hasOutline: false, // courseMaterials no longer in schema
        schedule,
        isFree: courseRow.isFree,
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
  },
  { role: 'STUDENT' }
)

function arePrerequisitesLocked(
  prerequisiteIds: string[],
  allLessons: Array<{ lessonId: string }>,
  progressByLessonId: Map<string, { status: string }>
): boolean {
  if (prerequisiteIds.length === 0) return false
  for (const prereqId of prerequisiteIds) {
    const prereqLesson = allLessons.find(l => l.lessonId === prereqId)
    if (!prereqLesson) continue
    const record = progressByLessonId.get(prereqLesson.lessonId)
    const isCompleted = record?.status === 'COMPLETED'
    if (!isCompleted) return true
  }
  return false
}
