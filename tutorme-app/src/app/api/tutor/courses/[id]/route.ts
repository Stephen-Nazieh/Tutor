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
import { curriculum, curriculumModule, curriculumLesson, curriculumEnrollment } from '@/lib/db/schema'
import { eq, asc, and, inArray, sql } from 'drizzle-orm'
import { sanitizeHtmlWithMax } from '@/lib/security/sanitize'

export const GET = withAuth(async (req, session, context) => {
  const id = await getParamAsync(context?.params, 'id')
  if (!id) return NextResponse.json({ error: 'Course ID required' }, { status: 400 })

  const [curriculumRow] = await drizzleDb.select().from(curriculum).where(eq(curriculum.id, id))
  if (!curriculumRow) throw new NotFoundError('Course not found')

  const modules = await drizzleDb
    .select()
    .from(curriculumModule)
    .where(eq(curriculumModule.curriculumId, id))
    .orderBy(asc(curriculumModule.order))

  const moduleIds = modules.map((m) => m.id)
  const lessons =
    moduleIds.length > 0
      ? await drizzleDb
          .select()
          .from(curriculumLesson)
          .where(and(inArray(curriculumLesson.moduleId, moduleIds)))
          .orderBy(asc(curriculumLesson.order))
      : []

  const [{ count: enrollmentCount }] = await drizzleDb
    .select({ count: sql<number>`count(*)::int` })
    .from(curriculumEnrollment)
    .where(eq(curriculumEnrollment.curriculumId, id))

  const modulesWithLessons = modules.map((m) => ({
    ...m,
    lessons: lessons.filter((l) => l.moduleId === m.id),
  }))

  const schedule = curriculumRow.schedule as Array<{ dayOfWeek: string; startTime: string; durationMinutes: number }> | null
  const materials = curriculumRow.courseMaterials as {
    curriculumText?: string
    notesText?: string
    editableCurriculum?: string
    editableNotes?: string
    editableTopics?: string
    outline?: { title: string; durationMinutes: number }[]
  } | null

  return NextResponse.json({
    course: {
      id: curriculumRow.id,
      name: curriculumRow.name,
      description: curriculumRow.description,
      subject: curriculumRow.subject,
      gradeLevel: curriculumRow.gradeLevel,
      difficulty: curriculumRow.difficulty,
      estimatedHours: curriculumRow.estimatedHours,
      isPublished: curriculumRow.isPublished,
      isLiveOnline: curriculumRow.isLiveOnline,
      languageOfInstruction: curriculumRow.languageOfInstruction,
      price: curriculumRow.price,
      currency: curriculumRow.currency,
      curriculumSource: curriculumRow.curriculumSource,
      outlineSource: curriculumRow.outlineSource,
      schedule: schedule ?? [],
      studentCount: enrollmentCount ?? 0,
      modules: modulesWithLessons,
      courseMaterials: materials ?? undefined,
    },
  })
}, { role: 'TUTOR' })

export const PATCH = withCsrf(withAuth(async (req, session, context) => {
  const id = await getParamAsync(context?.params, 'id')
  if (!id) return NextResponse.json({ error: 'Course ID required' }, { status: 400 })

  const [curriculumRow] = await drizzleDb.select().from(curriculum).where(eq(curriculum.id, id))
  if (!curriculumRow) throw new NotFoundError('Course not found')

  const modules = await drizzleDb
    .select()
    .from(curriculumModule)
    .where(eq(curriculumModule.curriculumId, id))
  const moduleIds = modules.map((m) => m.id)
  const lessons =
    moduleIds.length > 0
      ? await drizzleDb.select().from(curriculumLesson).where(inArray(curriculumLesson.moduleId, moduleIds))
      : []

  const body = await req.json().catch(() => ({}))
  const parsed = UpdateCourseSettingsSchema.safeParse(body)
  if (!parsed.success) {
    const msg = parsed.error.issues.map((issue) => issue.message).join('; ')
    throw new ValidationError(msg || 'Invalid request body')
  }
  const data = parsed.data
  const safeName = data.name !== undefined && data.name !== null ? sanitizeHtmlWithMax(String(data.name), 200) : undefined
  const safeDescription = data.description !== undefined ? sanitizeHtmlWithMax(String(data.description), 5000) : undefined

  if (data.isPublished === true && !curriculumRow.isPublished) {
    const validationErrors: string[] = []
    if (!curriculumRow.name || curriculumRow.name.trim().length < 2) {
      validationErrors.push('Course must have a name (at least 2 characters)')
    }
    if (!curriculumRow.subject) {
      validationErrors.push('Course must have a subject selected')
    }
    if (modules.length === 0) {
      validationErrors.push('Course must have at least one module')
    }
    const hasLessons = modules.some((m) => lessons.some((l) => l.moduleId === m.id))
    if (!hasLessons) {
      validationErrors.push('Course must have at least one lesson')
    }
    if (curriculumRow.price === null || curriculumRow.price === undefined) {
      validationErrors.push('Course must have a price set (use 0 for free courses)')
    }
    if ((curriculumRow.price ?? 0) > 0 && !curriculumRow.currency) {
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
  if (data.difficulty !== undefined && data.difficulty !== null) updatePayload.difficulty = data.difficulty
  if (data.languageOfInstruction !== undefined) updatePayload.languageOfInstruction = data.languageOfInstruction
  if (data.price !== undefined) updatePayload.price = data.price
  if (data.currency !== undefined) updatePayload.currency = data.currency
  if (data.curriculumSource !== undefined) updatePayload.curriculumSource = data.curriculumSource
  if (data.outlineSource !== undefined) updatePayload.outlineSource = data.outlineSource
  if (data.schedule !== undefined) updatePayload.schedule = data.schedule
  if (data.isLiveOnline !== undefined) updatePayload.isLiveOnline = data.isLiveOnline
  if (data.isPublished !== undefined) updatePayload.isPublished = data.isPublished

  const [updated] = await drizzleDb
    .update(curriculum)
    .set(updatePayload as Record<string, unknown>)
    .where(eq(curriculum.id, id))
    .returning()

  if (!updated) {
    throw new NotFoundError('Course not found')
  }

  return NextResponse.json({
    course: {
      id: updated.id,
      name: updated.name,
      description: updated.description,
      gradeLevel: updated.gradeLevel,
      difficulty: updated.difficulty,
      languageOfInstruction: updated.languageOfInstruction,
      price: updated.price,
      currency: updated.currency,
      curriculumSource: updated.curriculumSource,
      outlineSource: updated.outlineSource,
      schedule: updated.schedule,
      isLiveOnline: updated.isLiveOnline,
      isPublished: updated.isPublished,
    },
    message: 'Course settings updated.',
  })
}, { role: 'TUTOR' }))
