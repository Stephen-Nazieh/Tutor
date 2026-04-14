import { drizzleDb } from '@/lib/db/drizzle'
import { course, courseLesson } from '@/lib/db/schema'
import { eq, and, inArray, asc } from 'drizzle-orm'
import crypto from 'crypto'

export interface BuilderLessonData {
  id: string
  title: string
  description: string
  order: number
  isPublished?: boolean
  duration?: number
  media?: any
  docs?: any[]
  content?: any[]
  tasks?: any[]
  assessments?: any[]
  homework?: any[]
  quizzes?: any[]
  worksheets?: any[]
  difficultyMode?: string
  variants?: any
}

export class CourseBuilderService {
  /**
   * Retrieves the full builder tree (lessons) for a given course.
   * Verifies that the course belongs to the requesting user.
   */
  static async getCourseBuilderData(
    courseId: string,
    userId: string
  ): Promise<BuilderLessonData[]> {
    // Verify ownership
    const [courseRow] = await drizzleDb
      .select({ courseId: course.courseId })
      .from(course)
      .where(and(eq(course.courseId, courseId), eq(course.creatorId, userId)))

    if (!courseRow) {
      throw new Error('Course not found or access denied')
    }

    // Load lessons
    const dbLessons = await drizzleDb
      .select()
      .from(courseLesson)
      .where(eq(courseLesson.courseId, courseId))
      .orderBy(asc(courseLesson.order))

    // Transform to expected frontend structure
    return dbLessons.map(l => {
      const bData = (l.builderData || {}) as any
      return {
        id: l.lessonId,
        title: l.title,
        description: l.description || '',
        order: l.order || 0,
        isPublished: bData.isPublished || false,
        duration: bData.duration || 45,
        media: bData.media || { videos: [], images: [] },
        docs: bData.docs || [],
        content: bData.content || [],
        tasks: bData.tasks || [],
        assessments: bData.assessments || [],
        homework: bData.homework || [],
        quizzes: bData.quizzes || [],
        worksheets: bData.worksheets || [],
        difficultyMode: bData.difficultyMode || 'all',
        variants: bData.variants || {},
      }
    })
  }

  /**
   * Upserts the full builder tree (lessons) for a given course.
   * Verifies that the course belongs to the requesting user.
   */
  static async updateCourseBuilderData(
    courseId: string,
    userId: string,
    lessons: any[]
  ): Promise<void> {
    // Verify ownership
    const [courseRow] = await drizzleDb
      .select({ courseId: course.courseId })
      .from(course)
      .where(and(eq(course.courseId, courseId), eq(course.creatorId, userId)))

    if (!courseRow) {
      throw new Error('Course not found or access denied')
    }

    if (!Array.isArray(lessons)) {
      throw new Error('Invalid payload: expected lessons array')
    }

    await drizzleDb.transaction(async tx => {
      const existingDbLessons = await tx
        .select({ id: courseLesson.lessonId })
        .from(courseLesson)
        .where(eq(courseLesson.courseId, courseId))

      const existingLessonIds = new Set(existingDbLessons.map(l => l.id))
      const incomingLessonIds = new Set(lessons.map(l => l.id).filter(Boolean))

      const idsToDelete = [...existingLessonIds].filter(id => !incomingLessonIds.has(id))

      if (idsToDelete.length > 0) {
        await tx.delete(courseLesson).where(inArray(courseLesson.lessonId, idsToDelete))
      }

      for (const [idx, les] of lessons.entries()) {
        if (!les.id) les.id = crypto.randomUUID()

        const builderData = {
          isPublished: les.isPublished ?? false,
          duration: les.duration ?? 45,
          difficultyMode: les.difficultyMode ?? 'all',
          variants: les.variants ?? {},
          media: les.media ?? { videos: [], images: [] },
          docs: les.docs ?? [],
          content: les.content ?? [],
          tasks: les.tasks ?? [],
          assessments: les.assessments ?? [],
          homework: les.homework ?? [],
          quizzes: les.quizzes ?? [],
          worksheets: les.worksheets ?? [],
        }

        await tx
          .insert(courseLesson)
          .values({
            lessonId: les.id,
            courseId,
            title: les.title || 'Untitled Lesson',
            description: les.description || null,
            duration: les.duration ?? 60,
            order: idx,
            builderData,
          })
          .onConflictDoUpdate({
            target: courseLesson.lessonId,
            set: {
              title: les.title || 'Untitled Lesson',
              description: les.description || null,
              duration: les.duration ?? 60,
              order: idx,
              builderData,
            },
          })
      }
    })
  }
}
