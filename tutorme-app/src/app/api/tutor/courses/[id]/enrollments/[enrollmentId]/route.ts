/**
 * PATCH: Update enrollment (e.g. assign to batch). Tutor-only.
 */

import { NextResponse } from 'next/server'
import { withAuth, withCsrf, NotFoundError } from '@/lib/api/middleware'
import { db } from '@/lib/db'

export const PATCH = withCsrf(withAuth(async (req, session, context) => {
  const params = await (context?.params ?? Promise.resolve({ id: '', enrollmentId: '' }))
  const { id, enrollmentId } = params
  const enrollment = await db.curriculumEnrollment.findFirst({
    where: { id: enrollmentId, curriculumId: id },
  })
  if (!enrollment) throw new NotFoundError('Enrollment not found')
  const body = await req.json().catch(() => ({}))
  const batchId = body.batchId === null || body.batchId === '' ? null : (body.batchId as string)
  const updated = await db.curriculumEnrollment.update({
    where: { id: enrollmentId },
    data: { batchId },
  })
  return NextResponse.json({
    enrollment: { id: updated.id, batchId: updated.batchId },
    message: 'Enrollment updated.',
  })
}, { role: 'TUTOR' }))
