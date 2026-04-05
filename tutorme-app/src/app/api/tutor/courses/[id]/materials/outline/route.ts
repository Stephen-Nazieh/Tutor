/**
 * POST /api/tutor/courses/[id]/materials/outline
 * Generate course outline from stored curriculum (each item = one lesson length). Tutor-only.
 */

import { NextResponse } from 'next/server'
import { withAuth, withCsrf, NotFoundError } from '@/lib/api/middleware'
import { getParamAsync } from '@/lib/api/params'
import { drizzleDb } from '@/lib/db/drizzle'
import { curriculum } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { generateCourseOutlineAsModules } from '@/lib/agents/course-materials-service'

const DEFAULT_LESSON_MINUTES = 45

export const POST = withCsrf(
  withAuth(
    async (req, session, context) => {
      const id = await getParamAsync(context?.params, 'id')
      if (!id) return NextResponse.json({ error: 'Course ID required' }, { status: 400 })

      const [curriculumRow] = await drizzleDb
        .select({
          id: curriculum.courseId,
          subject: curriculum.categories,
          languageOfInstruction: curriculum.languageOfInstruction,
        })
        .from(curriculum)
        .where(eq(curriculum.courseId, id))
      if (!curriculumRow) throw new NotFoundError('Course not found')

      const body = await req.json().catch(() => ({}))
      const typicalLessonMinutes =
        typeof body.typicalLessonMinutes === 'number'
          ? Math.min(120, Math.max(15, body.typicalLessonMinutes))
          : DEFAULT_LESSON_MINUTES
      const bodyCurriculumText =
        typeof body.curriculumText === 'string' ? body.curriculumText.trim() : ''
      const bodyNotesText = typeof body.notesText === 'string' ? body.notesText.trim() : ''

      // courseMaterials column doesn't exist
      const materials: Record<string, unknown> = {}
      const curriculumText =
        bodyCurriculumText ||
        (materials.editableCurriculum as string) ||
        (materials.curriculumText as string) ||
        ''
      const notesOnly = (bodyNotesText || (materials.notesText as string) || '').trim()
      const hasContent = curriculumText.trim() || notesOnly

      if (!hasContent) {
        return NextResponse.json(
          {
            error:
              'Upload at least one of curriculum, notes, or topics before generating the outline.',
          },
          { status: 400 }
        )
      }

      if (bodyCurriculumText) materials.curriculumText = bodyCurriculumText
      if (bodyNotesText) materials.notesText = bodyNotesText

      const notesText = bodyNotesText || (materials.notesText as string) || ''
      const generated = await generateCourseOutlineAsModules({
        curriculumText:
          curriculumText.trim() || notesOnly || '(No curriculum; generate from notes.)',
        notesText: curriculumText.trim() && notesText ? notesText : undefined,
        subject: curriculumRow.subject?.[0] || '',
        typicalLessonMinutes,
        language: curriculumRow.languageOfInstruction ?? 'en',
      })
      const modules = generated.modules
      const outline = generated.outline

      // courseMaterials column doesn't exist - skip saving
      // await drizzleDb
      //   .update(curriculum)
      //   .set({ courseMaterials: materials as object })
      //   .where(eq(curriculum.courseId, id))

      return NextResponse.json({
        outline,
        outlineModules: { modules },
        message: 'Course outline generated. You can populate the class schedule from it.',
      })
    },
    { role: 'TUTOR' }
  )
)
