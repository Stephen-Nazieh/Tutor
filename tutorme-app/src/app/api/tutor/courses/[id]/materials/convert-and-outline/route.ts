/**
 * POST /api/tutor/courses/[id]/materials/convert-and-outline
 * Convert curriculum text to editable and generate course outline in one call. Tutor-only.
 */

import { NextResponse } from 'next/server'
import { withAuth, withCsrf, ValidationError, NotFoundError } from '@/lib/api/middleware'
import { drizzleDb } from '@/lib/db/drizzle'
import { curriculum } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { generateWithFallback } from '@/lib/ai/orchestrator'
import { convertToEditablePrompt, courseOutlineFromCurriculumPrompt } from '@/lib/ai/prompts'

const DEFAULT_LESSON_MINUTES = 45

export const POST = withCsrf(withAuth(async (req, session, context) => {
  const { id } = await (context?.params ?? Promise.resolve({ id: '' }))

  const [curriculumRow] = await drizzleDb
    .select({ id: curriculum.id, subject: curriculum.subject, languageOfInstruction: curriculum.languageOfInstruction, courseMaterials: curriculum.courseMaterials })
    .from(curriculum)
    .where(eq(curriculum.id, id))
  if (!curriculumRow) throw new NotFoundError('Course not found')

  const body = await req.json().catch(() => ({}))
  const text = typeof body.text === 'string' ? body.text.trim() : ''
  const typicalLessonMinutes = typeof body.typicalLessonMinutes === 'number'
    ? Math.min(120, Math.max(15, body.typicalLessonMinutes))
    : DEFAULT_LESSON_MINUTES

  if (!text || text.length > 50000) {
    throw new ValidationError('text is required and must be under 50000 characters')
  }

  const lang = curriculumRow.languageOfInstruction ?? 'en'
  const materials = (curriculumRow.courseMaterials as Record<string, unknown>) ?? {}

  // Step 1: Convert to editable
  const convertPrompt = convertToEditablePrompt({
    type: 'curriculum',
    rawText: text,
    language: lang,
  })
  const convertResult = await generateWithFallback(convertPrompt, { temperature: 0.3, maxTokens: 4000 })
  const editableCurriculum = convertResult.content.trim()

  materials.curriculumText = text
  materials.editableCurriculum = editableCurriculum

  // Step 2: Generate outline from converted curriculum
  const outlinePrompt = courseOutlineFromCurriculumPrompt({
    curriculumText: editableCurriculum,
    subject: curriculumRow.subject,
    typicalLessonMinutes,
    language: lang,
  })
  const outlineResult = await generateWithFallback(outlinePrompt, {
    temperature: 0.4,
    maxTokens: 3000,
    skipCache: true,
  })

  let outline: { title: string; durationMinutes: number }[] = []
  try {
    const jsonMatch = outlineResult.content.match(/\[[\s\S]*\]/)
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0])
      outline = Array.isArray(parsed)
        ? parsed
            .filter((x: unknown) => x && typeof x === 'object' && 'title' in x)
            .map((x: { title?: string; durationMinutes?: number }) => ({
              title: String(x.title ?? 'Lesson'),
              durationMinutes: typeof x.durationMinutes === 'number' ? x.durationMinutes : typicalLessonMinutes,
            }))
        : []
    }
  } catch {
    outline = []
  }

  materials.outline = outline
  await drizzleDb
    .update(curriculum)
    .set({ courseMaterials: materials as object })
    .where(eq(curriculum.id, id))

  return NextResponse.json({
    editableCurriculum,
    outline,
    message: 'Curriculum converted and outline generated. You can populate the class schedule from the outline.',
  })
}, { role: 'TUTOR' }))
