/**
 * Tutor course (curriculum) management API
 * GET: Load course with settings and enrollment count (tutor-only)
 * PATCH: Update course settings (tutor-only)
 */

import { NextResponse } from 'next/server'
import { withAuth, withCsrf, ValidationError, NotFoundError } from '@/lib/api/middleware'
import { getParamAsync } from '@/lib/api/params'
import { UpdateCourseSettingsSchema } from '@/lib/validation/schemas'
import { drizzleDb } from '@/lib/db/drizzle'
import {
  builderTask,
  builderTaskExtension,
  builderTaskFile,
  builderTaskVersion,
  calendarEvent,
  courseBatch,
  course,
  courseEnrollment,
  courseLesson,
  courseLessonProgress,
  courseModule,
  courseProgress,
  courseShare,
  lessonSession,
  liveSession,
  quiz,
  quizAssignment,
  quizAttempt,
  studentPerformance,
  whiteboard,
  whiteboardPage,
  whiteboardSession,
  whiteboardSnapshot,
} from '@/lib/db/schema'
import { eq, asc, and, inArray, sql } from 'drizzle-orm'
import { sanitizeHtmlWithMax } from '@/lib/security/sanitize'

export const GET = withAuth(
  async (req, session, context) => {
    const id = await getParamAsync(context?.params, 'id')
    if (!id) return NextResponse.json({ error: 'Course ID required' }, { status: 400 })

    const [courseRow] = await drizzleDb.select().from(course).where(eq(course.courseId, id))
    if (!courseRow) throw new NotFoundError('Course not found')

    const modules = await drizzleDb
      .select()
      .from(courseModule)
      .where(eq(courseModule.courseId, id))
      .orderBy(asc(courseModule.order))

    const moduleIds = modules.map(m => m.moduleId)
    const lessons =
      moduleIds.length > 0
        ? await drizzleDb
            .select()
            .from(courseLesson)
            .where(and(inArray(courseLesson.moduleId, moduleIds)))
            .orderBy(asc(courseLesson.order))
        : []

    const [{ count: enrollmentCount }] = await drizzleDb
      .select({ count: sql<number>`count(*)::int` })
      .from(courseEnrollment)
      .where(eq(courseEnrollment.courseId, id))

    const modulesWithLessons = modules.map(m => ({
      ...m,
      lessons: lessons.filter(l => l.moduleId === m.moduleId),
    }))

    const schedule = courseRow.schedule as Array<{
      dayOfWeek: string
      startTime: string
      durationMinutes: number
    }> | null
    const materials = courseRow.courseMaterials as {
      curriculumText?: string
      notesText?: string
      editableCurriculum?: string
      editableNotes?: string
      editableTopics?: string
      outline?: { title: string; durationMinutes: number }[]
    } | null

    return NextResponse.json({
      course: {
        id: courseRow.courseId,
        name: courseRow.name,
        description: courseRow.description,
        subject: courseRow.subject,
        gradeLevel: courseRow.gradeLevel,
        difficulty: courseRow.difficulty,
        estimatedHours: courseRow.estimatedHours,
        isPublished: courseRow.isPublished,
        isLiveOnline: courseRow.isLiveOnline,
        languageOfInstruction: courseRow.languageOfInstruction,
        price: courseRow.price,
        currency: courseRow.currency,
        isFree: courseRow.isFree,
        curriculumSource: courseRow.curriculumSource,
        outlineSource: courseRow.outlineSource,
        schedule: schedule ?? [],
        studentCount: enrollmentCount ?? 0,
        modules: modulesWithLessons,
        courseMaterials: materials ?? undefined,
      },
    })
  },
  { role: 'TUTOR' }
)

export const DELETE = withCsrf(
  withAuth(
    async (_req, session, context) => {
      const id = await getParamAsync(context?.params, 'id')
      if (!id) return NextResponse.json({ error: 'Course ID required' }, { status: 400 })

      const userId = session?.user?.id
      const [courseRow] = await drizzleDb.select().from(course).where(eq(course.courseId, id))
      if (!courseRow) throw new NotFoundError('Course not found')
      if (courseRow.creatorId !== userId) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
      }

      await drizzleDb.transaction(async tx => {
        const modules = await tx
          .select({ moduleId: courseModule.moduleId })
          .from(courseModule)
          .where(eq(courseModule.courseId, id))
        const moduleIds = modules.map(m => m.moduleId)

        const lessons =
          moduleIds.length > 0
            ? await tx
                .select({ lessonId: courseLesson.lessonId })
                .from(courseLesson)
                .where(inArray(courseLesson.moduleId, moduleIds))
            : []
        const lessonIds = lessons.map(l => l.lessonId)

        const tasks = await tx
          .select({ taskId: builderTask.taskId })
          .from(builderTask)
          .where(eq(builderTask.courseId, id))
        const taskIds = tasks.map(t => t.taskId)

        const quizzes = await tx
          .select({ quizId: quiz.quizId })
          .from(quiz)
          .where(eq(quiz.courseId, id))
        const quizIds = quizzes.map(q => q.quizId)

        const boards = await tx
          .select({ whiteboardId: whiteboard.whiteboardId })
          .from(whiteboard)
          .where(eq(whiteboard.courseId, id))
        const boardIds = boards.map(b => b.whiteboardId)

        if (lessonIds.length > 0) {
          await tx.delete(lessonSession).where(inArray(lessonSession.lessonId, lessonIds))
          await tx
            .delete(courseLessonProgress)
            .where(inArray(courseLessonProgress.lessonId, lessonIds))
        }

        if (taskIds.length > 0) {
          await tx.delete(builderTaskExtension).where(inArray(builderTaskExtension.taskId, taskIds))
          await tx.delete(builderTaskFile).where(inArray(builderTaskFile.taskId, taskIds))
          await tx.delete(builderTaskVersion).where(inArray(builderTaskVersion.taskId, taskIds))
          await tx.delete(builderTask).where(inArray(builderTask.taskId, taskIds))
        }

        if (quizIds.length > 0) {
          await tx.delete(quizAttempt).where(inArray(quizAttempt.quizId, quizIds))
          await tx.delete(quizAssignment).where(inArray(quizAssignment.quizId, quizIds))
          await tx.delete(quiz).where(inArray(quiz.quizId, quizIds))
        }

        if (boardIds.length > 0) {
          await tx
            .delete(whiteboardSnapshot)
            .where(inArray(whiteboardSnapshot.whiteboardId, boardIds))
          await tx.delete(whiteboardPage).where(inArray(whiteboardPage.whiteboardId, boardIds))
          await tx
            .delete(whiteboardSession)
            .where(inArray(whiteboardSession.whiteboardId, boardIds))
          await tx.delete(whiteboard).where(inArray(whiteboard.whiteboardId, boardIds))
        }

        await tx.delete(courseEnrollment).where(eq(courseEnrollment.courseId, id))
        await tx.delete(courseProgress).where(eq(courseProgress.courseId, id))
        await tx.delete(studentPerformance).where(eq(studentPerformance.courseId, id))
        await tx.delete(courseShare).where(eq(courseShare.courseId, id))
        await tx.delete(courseBatch).where(eq(courseBatch.courseId, id))
        await tx.delete(liveSession).where(eq(liveSession.courseId, id))
        await tx.delete(calendarEvent).where(eq(calendarEvent.courseId, id))

        if (moduleIds.length > 0) {
          await tx.delete(courseLesson).where(inArray(courseLesson.moduleId, moduleIds))
          await tx.delete(courseModule).where(inArray(courseModule.moduleId, moduleIds))
        }

        await tx.delete(course).where(eq(course.courseId, id))
      })

      return NextResponse.json({ success: true })
    },
    { role: 'TUTOR' }
  )
)

export const PATCH = withCsrf(
  withAuth(
    async (req, session, context) => {
      const id = await getParamAsync(context?.params, 'id')
      if (!id) return NextResponse.json({ error: 'Course ID required' }, { status: 400 })

      const [courseRow] = await drizzleDb.select().from(course).where(eq(course.courseId, id))
      if (!courseRow) throw new NotFoundError('Course not found')

      const modules = await drizzleDb
        .select()
        .from(courseModule)
        .where(eq(courseModule.courseId, id))
      const moduleIds = modules.map(m => m.moduleId)
      const lessons =
        moduleIds.length > 0
          ? await drizzleDb
              .select()
              .from(courseLesson)
              .where(inArray(courseLesson.moduleId, moduleIds))
          : []

      const body = await req.json().catch(() => ({}))
      const parsed = UpdateCourseSettingsSchema.safeParse(body)
      if (!parsed.success) {
        const msg = parsed.error.issues.map(issue => issue.message).join('; ')
        throw new ValidationError(msg || 'Invalid request body')
      }
      const data = parsed.data
      const safeName =
        data.name !== undefined && data.name !== null
          ? sanitizeHtmlWithMax(String(data.name), 200)
          : undefined
      const safeDescription =
        data.description !== undefined
          ? sanitizeHtmlWithMax(String(data.description), 5000)
          : undefined

      if (data.isPublished === true && !courseRow.isPublished) {
        const validationErrors: string[] = []
        if (!courseRow.name || courseRow.name.trim().length < 2) {
          validationErrors.push('Course must have a name (at least 2 characters)')
        }
        if (!courseRow.subject) {
          validationErrors.push('Course must have a subject selected')
        }
        if (modules.length === 0) {
          validationErrors.push('Course must have at least one module')
        }
        const hasLessons = modules.some(m => lessons.some(l => l.moduleId === m.moduleId))
        if (!hasLessons) {
          validationErrors.push('Course must have at least one lesson')
        }
        if (!courseRow.isFree && (courseRow.price === null || courseRow.price === undefined)) {
          validationErrors.push('Course must have a price set (use free toggle for free courses)')
        }
        if (!courseRow.isFree && (courseRow.price ?? 0) > 0 && !courseRow.currency) {
          validationErrors.push('Currency must be set for paid courses')
        }
        if (validationErrors.length > 0) {
          throw new ValidationError(`Cannot publish course: ${validationErrors.join('; ')}`)
        }
      }

      const updatePayload: Record<string, unknown> = {}
      if (safeName !== undefined) updatePayload.name = safeName
      if (safeDescription !== undefined) updatePayload.description = safeDescription
      if (data.gradeLevel !== undefined) updatePayload.gradeLevel = data.gradeLevel
      if (data.difficulty !== undefined && data.difficulty !== null)
        updatePayload.difficulty = data.difficulty
      if (data.languageOfInstruction !== undefined)
        updatePayload.languageOfInstruction = data.languageOfInstruction
      if (data.price !== undefined) updatePayload.price = data.price
      if (data.currency !== undefined) updatePayload.currency = data.currency
      if (data.isFree !== undefined) updatePayload.isFree = data.isFree
      if (data.curriculumSource !== undefined)
        updatePayload.curriculumSource = data.curriculumSource
      if (data.outlineSource !== undefined) updatePayload.outlineSource = data.outlineSource
      if (data.schedule !== undefined) updatePayload.schedule = data.schedule
      if (data.isLiveOnline !== undefined) updatePayload.isLiveOnline = data.isLiveOnline
      if (data.isPublished !== undefined) updatePayload.isPublished = data.isPublished
      if (data.isFree === true) {
        updatePayload.price = 0
        updatePayload.currency = null
      }

      const [updated] = await drizzleDb
        .update(course)
        .set(updatePayload as Record<string, unknown>)
        .where(eq(course.courseId, id))
        .returning()

      if (!updated) {
        throw new NotFoundError('Course not found')
      }

      return NextResponse.json({
        course: {
          id: updated.courseId,
          name: updated.name,
          description: updated.description,
          gradeLevel: updated.gradeLevel,
          difficulty: updated.difficulty,
          languageOfInstruction: updated.languageOfInstruction,
          price: updated.price,
          currency: updated.currency,
          isFree: updated.isFree,
          curriculumSource: updated.curriculumSource,
          outlineSource: updated.outlineSource,
          schedule: updated.schedule,
          isLiveOnline: updated.isLiveOnline,
          isPublished: updated.isPublished,
        },
        message: 'Course settings updated.',
      })
    },
    { role: 'TUTOR' }
  )
)
