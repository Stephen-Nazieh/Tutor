/**
 * POST /api/tutor/courses/[id]/materials/convert-and-outline
 * Convert curriculum text to editable and generate course outline in one call. Tutor-only.
 */

import { NextResponse } from 'next/server'
import { withAuth, withCsrf, ValidationError, NotFoundError } from '@/lib/api/middleware'
import { getParamAsync } from '@/lib/api/params'
import { drizzleDb } from '@/lib/db/drizzle'
import { curriculum } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import {
  convertToEditable,
  generateCourseOutlineFromCurriculum,
} from '@/lib/agents/course-materials-service'

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
      const text = typeof body.text === 'string' ? body.text.trim() : ''
      const typicalLessonMinutes =
        typeof body.typicalLessonMinutes === 'number'
          ? Math.min(120, Math.max(15, body.typicalLessonMinutes))
          : DEFAULT_LESSON_MINUTES

      if (!text || text.length > 50000) {
        throw new ValidationError('text is required and must be under 50000 characters')
      }

      const lang = curriculumRow.languageOfInstruction ?? 'en'

      // Step 1: Convert to editable
      const converted = await convertToEditable({
        type: 'curriculum',
        rawText: text,
        language: lang,
      })
      const editableCurriculum = converted.editable

      // Step 2: Generate outline from converted curriculum
      const outlined = await generateCourseOutlineFromCurriculum({
        curriculumText: editableCurriculum,
        subject: curriculumRow.subject?.[0] || '',
        typicalLessonMinutes,
        language: lang,
      })
      const outline = outlined.outline

      // courseMaterials column doesn't exist - skip saving materials

      return NextResponse.json({
        editableCurriculum,
        outline,
        message:
          'Curriculum converted and outline generated. You can populate the class schedule from the outline.',
      })
    },
    { role: 'TUTOR' }
  )
)
