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

  const curriculum = await db.curriculum.findUnique({ where: { id } })
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
    },
    message: 'Course settings updated.',
  })
}, { role: 'TUTOR' }))
