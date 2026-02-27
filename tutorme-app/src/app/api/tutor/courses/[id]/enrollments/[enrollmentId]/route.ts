/**
 * PATCH: Update enrollment (e.g. assign to batch). Tutor-only.
 */

import { NextResponse } from 'next/server'
import { withAuth, withCsrf, NotFoundError } from '@/lib/api/middleware'
import { drizzleDb } from '@/lib/db/drizzle'
import { curriculumEnrollment } from '@/lib/db/schema'
import { eq, and } from 'drizzle-orm'

export const PATCH = withCsrf(withAuth(async (req, session, context) => {
  const params = await (context?.params ?? Promise.resolve({ id: '', enrollmentId: '' }))
  const { id, enrollmentId } = params
  const [enrollment] = await drizzleDb
    .select()
    .from(curriculumEnrollment)
    .where(and(eq(curriculumEnrollment.id, enrollmentId), eq(curriculumEnrollment.curriculumId, id)))
  if (!enrollment) throw new NotFoundError('Enrollment not found')
  const body = await req.json().catch(() => ({}))
  const batchId = body.batchId === null || body.batchId === '' ? null : (body.batchId as string)
  const [updated] = await drizzleDb
    .update(curriculumEnrollment)
    .set({ batchId })
    .where(eq(curriculumEnrollment.id, enrollmentId))
    .returning()
  if (!updated) throw new NotFoundError('Enrollment not found')
  return NextResponse.json({
    enrollment: { id: updated.id, batchId: updated.batchId },
    message: 'Enrollment updated.',
  })
}, { role: 'TUTOR' }))
