/**
 * POST /api/tutor/courses/[id]/materials/upload
 * Upload curriculum, notes, or topics list. AI converts to editable format and stores.
 * Tutor-only.
 */

import { NextResponse } from 'next/server'
import { withAuth, withCsrf, ValidationError, NotFoundError } from '@/lib/api/middleware'
import { drizzleDb } from '@/lib/db/drizzle'
import { curriculum } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { generateWithFallback } from '@/lib/ai/orchestrator'
import {
  convertToEditablePrompt,
  convertTopicsToEditablePrompt,
} from '@/lib/ai/prompts'

const TYPES = ['curriculum', 'notes', 'topics'] as const

export const POST = withCsrf(withAuth(async (req, session, context) => {
  const { id } = await (context?.params ?? Promise.resolve({ id: '' }))

  const [curriculumRow] = await drizzleDb
    .select({ id: curriculum.id, languageOfInstruction: curriculum.languageOfInstruction, courseMaterials: curriculum.courseMaterials })
    .from(curriculum)
    .where(eq(curriculum.id, id))
  if (!curriculumRow) throw new NotFoundError('Course not found')

  const body = await req.json().catch(() => ({}))
  const type = body.type as string
  const text = typeof body.text === 'string' ? body.text.trim() : ''

  if (!TYPES.includes(type as (typeof TYPES)[number])) {
    throw new ValidationError('type must be curriculum, notes, or topics')
  }
  if (!text || text.length > 50000) {
    throw new ValidationError('text is required and must be under 50000 characters')
  }

  const lang = curriculumRow.languageOfInstruction ?? 'en'
  const materials = (curriculumRow.courseMaterials as Record<string, unknown>) ?? {}

  let editable = ''
  if (type === 'topics') {
    const prompt = convertTopicsToEditablePrompt({
      topicsListText: text,
      language: lang,
    })
    const result = await generateWithFallback(prompt, { temperature: 0.3, maxTokens: 4000 })
    editable = result.content.trim()
    materials.editableTopics = editable
    materials.topicsText = text
  } else {
    const prompt = convertToEditablePrompt({
      type: type as 'curriculum' | 'notes',
      rawText: text,
      language: lang,
    })
    const result = await generateWithFallback(prompt, { temperature: 0.3, maxTokens: 4000 })
    editable = result.content.trim()
    if (type === 'curriculum') {
      materials.curriculumText = text
      materials.editableCurriculum = editable
    } else {
      materials.notesText = text
      materials.editableNotes = editable
    }
  }

  await drizzleDb
    .update(curriculum)
    .set({ courseMaterials: materials as object })
    .where(eq(curriculum.id, id))

  return NextResponse.json({
    type,
    stored: true,
    editable,
    message: type === 'topics' ? 'Topics converted to editable format.' : 'Content converted to editable format.',
  })
}, { role: 'TUTOR' }))
