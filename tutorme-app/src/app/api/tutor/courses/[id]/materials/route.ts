/**
 * PATCH /api/tutor/courses/[id]/materials
 * Save edited curriculum, notes, topics, or outline. Tutor-only.
 */

import { NextResponse } from 'next/server'
import { withAuth, withCsrf, NotFoundError } from '@/lib/api/middleware'
import { drizzleDb } from '@/lib/db/drizzle'
import { curriculum } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

export const PATCH = withCsrf(withAuth(async (req, session, context) => {
  const { id } = await (context?.params ?? Promise.resolve({ id: '' }))

  const [curriculumRow] = await drizzleDb
    .select({ courseMaterials: curriculum.courseMaterials })
    .from(curriculum)
    .where(eq(curriculum.id, id))
  if (!curriculumRow) throw new NotFoundError('Course not found')

  const body = await req.json().catch(() => ({}))
  const materials = { ...((curriculumRow.courseMaterials as Record<string, unknown>) ?? {}) }

  if (typeof body.editableCurriculum === 'string') materials.editableCurriculum = body.editableCurriculum
  if (typeof body.editableNotes === 'string') materials.editableNotes = body.editableNotes
  if (typeof body.editableTopics === 'string') materials.editableTopics = body.editableTopics
  if (Array.isArray(body.outline)) {
    materials.outline = body.outline.map((x: { title?: string; durationMinutes?: number }) => ({
      title: String(x?.title ?? 'Lesson'),
      durationMinutes: typeof x?.durationMinutes === 'number' ? x.durationMinutes : 45,
    }))
  }

  await drizzleDb
    .update(curriculum)
    .set({ courseMaterials: materials as object })
    .where(eq(curriculum.id, id))

  return NextResponse.json({ message: 'Materials saved.' })
}, { role: 'TUTOR' }))
