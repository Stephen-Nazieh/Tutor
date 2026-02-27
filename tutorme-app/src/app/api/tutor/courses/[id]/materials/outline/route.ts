/**
 * POST /api/tutor/courses/[id]/materials/outline
 * Generate course outline from stored curriculum (each item = one lesson length). Tutor-only.
 */

import { NextResponse } from 'next/server'
import { withAuth, withCsrf, NotFoundError } from '@/lib/api/middleware'
import { drizzleDb } from '@/lib/db/drizzle'
import { curriculum } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { generateWithFallback } from '@/lib/ai/orchestrator'
import { courseOutlineAsModulesPrompt } from '@/lib/ai/prompts'

const DEFAULT_LESSON_MINUTES = 45

export const POST = withCsrf(withAuth(async (req, session, context) => {
  const { id } = await (context?.params ?? Promise.resolve({ id: '' }))

  const [curriculumRow] = await drizzleDb
    .select({ id: curriculum.id, subject: curriculum.subject, languageOfInstruction: curriculum.languageOfInstruction, courseMaterials: curriculum.courseMaterials })
    .from(curriculum)
    .where(eq(curriculum.id, id))
  if (!curriculumRow) throw new NotFoundError('Course not found')

  const body = await req.json().catch(() => ({}))
  const typicalLessonMinutes = typeof body.typicalLessonMinutes === 'number'
    ? Math.min(120, Math.max(15, body.typicalLessonMinutes))
    : DEFAULT_LESSON_MINUTES
  const bodyCurriculumText = typeof body.curriculumText === 'string' ? body.curriculumText.trim() : ''
  const bodyNotesText = typeof body.notesText === 'string' ? body.notesText.trim() : ''

  const materials = (curriculumRow.courseMaterials as Record<string, unknown>) ?? {}
  const curriculumText =
    bodyCurriculumText ||
    (materials.editableCurriculum as string) ||
    (materials.curriculumText as string) ||
    ''
  const notesOnly = (bodyNotesText || (materials.notesText as string) || '').trim()
  const hasContent = curriculumText.trim() || notesOnly

  if (!hasContent) {
    return NextResponse.json(
      { error: 'Upload at least one of curriculum, notes, or topics before generating the outline.' },
      { status: 400 }
    )
  }

  if (bodyCurriculumText) materials.curriculumText = bodyCurriculumText
  if (bodyNotesText) materials.notesText = bodyNotesText

  const notesText = bodyNotesText || (materials.notesText as string) || ''
  const prompt = courseOutlineAsModulesPrompt({
    curriculumText: curriculumText.trim() || notesOnly || '(No curriculum; generate from notes.)',
    notesText: curriculumText.trim() && notesText ? notesText : undefined,
    subject: curriculumRow.subject,
    typicalLessonMinutes,
    language: curriculumRow.languageOfInstruction ?? 'en',
  })

  const result = await generateWithFallback(prompt, {
    temperature: 0.4,
    maxTokens: 4000,
    skipCache: true,
  })

  type LessonItem = { title: string; durationMinutes: number }
  type ModuleItem = {
    title: string
    description?: string
    notes?: string
    tasks?: { title: string }[]
    lessons: LessonItem[]
  }

  let modules: ModuleItem[] = []
  let outline: LessonItem[] = []
  try {
    const jsonMatch = result.content.match(/\[[\s\S]*\]/)
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0])
      if (Array.isArray(parsed)) {
        modules = parsed
          .filter((x: unknown) => x && typeof x === 'object' && 'title' in x && 'lessons' in x)
          .map((x: Record<string, unknown>) => {
            const rawLessons = Array.isArray(x.lessons) ? x.lessons : []
            const lessons: LessonItem[] = rawLessons
              .filter((l: unknown) => l && typeof l === 'object' && (l as Record<string, unknown>).title != null)
              .map((l: Record<string, unknown>) => ({
                title: String((l as { title?: string }).title ?? 'Lesson'),
                durationMinutes: typeof (l as { durationMinutes?: number }).durationMinutes === 'number'
                  ? (l as { durationMinutes: number }).durationMinutes
                  : typicalLessonMinutes,
              }))
            const tasks = Array.isArray(x.tasks)
              ? (x.tasks as Record<string, unknown>[])
                .filter((t) => t && typeof t === 'object' && (t as { title?: string }).title != null)
                .map((t) => ({ title: String((t as { title: string }).title) }))
              : undefined
            return {
              title: String(x.title ?? 'Module'),
              description: typeof x.description === 'string' ? x.description : undefined,
              notes: typeof x.notes === 'string' ? x.notes : undefined,
              tasks: tasks?.length ? tasks : undefined,
              lessons,
            }
          })
        outline = modules.flatMap((m) => m.lessons)
      }
    }
  } catch {
    modules = []
    outline = []
  }

  materials.outline = outline
  materials.outlineModules = { modules }
  await drizzleDb
    .update(curriculum)
    .set({ courseMaterials: materials as object })
    .where(eq(curriculum.id, id))

  return NextResponse.json({
    outline,
    outlineModules: { modules },
    message: 'Course outline generated. You can populate the class schedule from it.',
  })
}, { role: 'TUTOR' }))
