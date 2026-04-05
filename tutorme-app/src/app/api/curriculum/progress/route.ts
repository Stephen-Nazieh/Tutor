/**
 * Curriculum Progress API
 * GET: Get student progress for a curriculum
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth, ValidationError, NotFoundError } from '@/lib/api/middleware'
// getStudentProgress function removed - no longer needed with new schema
import { drizzleDb } from '@/lib/db/drizzle'
import { course, curriculumModule, courseLesson, curriculumLessonProgress } from '@/lib/db/schema'
import { eq, asc } from 'drizzle-orm'

export const GET = withAuth(
  async (req, session) => {
    const { searchParams } = new URL(req.url)
    const courseId = searchParams.get('curriculumId')

    if (!courseId) {
      throw new ValidationError('Curriculum ID is required')
    }

    // Progress handled differently in new schema
    const progress = null

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

    // Lessons and progress are now stored differently in new schema
    const lessons: (typeof courseLesson.$inferSelect)[] = []
    const progressRecords: (typeof curriculumLessonProgress.$inferSelect)[] = []
    const lessonIds: string[] = []
    const progressByLessonId = new Map<string, typeof curriculumLessonProgress.$inferSelect>()

    const lessonsByModuleId = new Map<string, typeof lessons>()
    // Lessons now stored in builderData JSON field
    for (const m of modules) {
      lessonsByModuleId.set(m.moduleId, [])
    }

    const modulesWithProgress = modules.map(module => {
      return {
        id: module.moduleId,
        title: module.title,
        description: module.description,
        order: module.order,
        lessons: [], // Lessons now stored in builderData JSON
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

// Prerequisites handling removed - lessons now in builderData JSON
