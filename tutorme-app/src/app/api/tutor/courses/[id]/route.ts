/**
 * Tutor course (curriculum) management API
 * GET: Load course with settings and enrollment count (tutor-only)
 * PATCH: Update course settings (tutor-only)
 */

import { NextResponse } from 'next/server'
import { withAuth, withCsrf, ValidationError, NotFoundError } from '@/lib/api/middleware'
import { UpdateCourseSettingsSchema } from '@/lib/validation/schemas'
import { db } from '@/lib/db'
import { sanitizeHtmlWithMax } from '@/lib/security/sanitize'

export const GET = withAuth(async (req, session, context) => {
  const { id } = await (context?.params ?? Promise.resolve({ id: '' }))

  const curriculum = await db.curriculum.findUnique({
    where: { id },
    include: {
      modules: { orderBy: { order: 'asc' }, include: { lessons: { orderBy: { order: 'asc' } } } },
      _count: { select: { enrollments: true } },
    },
  })

  if (!curriculum) throw new NotFoundError('Course not found')

  const schedule = curriculum.schedule as Array<{ dayOfWeek: string; startTime: string; durationMinutes: number }> | null

  const materials = curriculum.courseMaterials as {
    curriculumText?: string
    notesText?: string
    editableCurriculum?: string
    editableNotes?: string
    editableTopics?: string
    outline?: { title: string; durationMinutes: number }[]
  } | null

  return NextResponse.json({
    course: {
      id: curriculum.id,
      name: curriculum.name,
      description: curriculum.description,
      subject: curriculum.subject,
      gradeLevel: curriculum.gradeLevel,
      difficulty: curriculum.difficulty,
      estimatedHours: curriculum.estimatedHours,
      isPublished: curriculum.isPublished,
      isLiveOnline: curriculum.isLiveOnline,
      languageOfInstruction: curriculum.languageOfInstruction,
      price: curriculum.price,
      currency: curriculum.currency,
      curriculumSource: curriculum.curriculumSource,
      outlineSource: curriculum.outlineSource,
      schedule: schedule ?? [],
      studentCount: curriculum._count.enrollments,
      modules: curriculum.modules,
      courseMaterials: materials ?? undefined,
    },
  })
}, { role: 'TUTOR' })

export const PATCH = withCsrf(withAuth(async (req, session, context) => {
  const { id } = await (context?.params ?? Promise.resolve({ id: '' }))

  const curriculum = await db.curriculum.findUnique({ 
    where: { id },
    include: {
      modules: { include: { lessons: true } }
    }
  })
  if (!curriculum) throw new NotFoundError('Course not found')

  const body = await req.json().catch(() => ({}))
  const parsed = UpdateCourseSettingsSchema.safeParse(body)
  if (!parsed.success) {
    const msg = parsed.error.issues.map((issue) => issue.message).join('; ')
    throw new ValidationError(msg || 'Invalid request body')
  }
  const data = parsed.data
  const safeName = data.name !== undefined && data.name !== null ? sanitizeHtmlWithMax(String(data.name), 200) : undefined
  const safeDescription = data.description !== undefined ? sanitizeHtmlWithMax(String(data.description), 5000) : undefined

  // Pre-publish validation: check required fields before publishing
  if (data.isPublished === true && !curriculum.isPublished) {
    const validationErrors: string[] = []

    // Check course name
    if (!curriculum.name || curriculum.name.trim().length < 2) {
      validationErrors.push('Course must have a name (at least 2 characters)')
    }

    // Check subject
    if (!curriculum.subject) {
      validationErrors.push('Course must have a subject selected')
    }

    // Check at least one module exists
    if (curriculum.modules.length === 0) {
      validationErrors.push('Course must have at least one module')
    }

    // Check at least one lesson exists
    const hasLessons = curriculum.modules.some(m => m.lessons.length > 0)
    if (!hasLessons) {
      validationErrors.push('Course must have at least one lesson')
    }

    // Check price is set (can be 0 for free courses)
    if (curriculum.price === null || curriculum.price === undefined) {
      validationErrors.push('Course must have a price set (use 0 for free courses)')
    }

    // Check currency is set if price > 0
    if ((curriculum.price ?? 0) > 0 && !curriculum.currency) {
      validationErrors.push('Currency must be set for paid courses')
    }

    if (validationErrors.length > 0) {
      throw new ValidationError(`Cannot publish course: ${validationErrors.join('; ')}`)
    }
  }

  const updated = await db.curriculum.update({
    where: { id },
    data: {
      ...(safeName !== undefined && { name: safeName }),
      ...(safeDescription !== undefined && { description: safeDescription }),
      ...(data.gradeLevel !== undefined && { gradeLevel: data.gradeLevel }),
      ...(data.difficulty !== undefined && data.difficulty !== null && { difficulty: data.difficulty }),
      ...(data.languageOfInstruction !== undefined && { languageOfInstruction: data.languageOfInstruction }),
      ...(data.price !== undefined && { price: data.price }),
      ...(data.currency !== undefined && { currency: data.currency }),
      ...(data.curriculumSource !== undefined && { curriculumSource: data.curriculumSource }),
      ...(data.outlineSource !== undefined && { outlineSource: data.outlineSource }),
      ...(data.schedule !== undefined && { schedule: data.schedule as object }),
      ...(data.isLiveOnline !== undefined && { isLiveOnline: data.isLiveOnline }),
      ...(data.isPublished !== undefined && { isPublished: data.isPublished }),
    },
  })

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
