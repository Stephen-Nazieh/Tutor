/**
 * PATCH /api/tutor/courses/[id]/materials
 * Save edited curriculum, notes, topics, or outline. Tutor-only.
 */

import { NextResponse } from 'next/server'
import { withAuth, withCsrf, NotFoundError } from '@/lib/api/middleware'
import { db } from '@/lib/db'

export const PATCH = withCsrf(withAuth(async (req, session, context) => {
  const { id } = await (context?.params ?? Promise.resolve({ id: '' }))

  const curriculum = await db.curriculum.findUnique({
    where: { id },
    select: { courseMaterials: true },
  })
  if (!curriculum) throw new NotFoundError('Course not found')

  const body = await req.json().catch(() => ({}))
  const materials = { ...((curriculum.courseMaterials as Record<string, unknown>) ?? {}) }

  if (typeof body.editableCurriculum === 'string') materials.editableCurriculum = body.editableCurriculum
  if (typeof body.editableNotes === 'string') materials.editableNotes = body.editableNotes
  if (typeof body.editableTopics === 'string') materials.editableTopics = body.editableTopics
  if (Array.isArray(body.outline)) {
    materials.outline = body.outline.map((x: { title?: string; durationMinutes?: number }) => ({
      title: String(x?.title ?? 'Lesson'),
      durationMinutes: typeof x?.durationMinutes === 'number' ? x.durationMinutes : 45,
    }))
  }

  await db.curriculum.update({
    where: { id },
    data: { courseMaterials: materials as object },
  })

  return NextResponse.json({ message: 'Materials saved.' })
}, { role: 'TUTOR' }))
