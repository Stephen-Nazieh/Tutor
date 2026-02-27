/**
 * Unenroll from a Subject API
 * Remove a subject from student's curriculum
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth, withCsrf, ValidationError, NotFoundError } from '@/lib/api/middleware'
import { drizzleDb } from '@/lib/db/drizzle'
import { curriculum, curriculumEnrollment } from '@/lib/db/schema'
import { eq, and } from 'drizzle-orm'

export const POST = withCsrf(withAuth(async (req: NextRequest, session) => {
  const { subjectCode } = await req.json()

  if (!subjectCode) {
    throw new ValidationError('Subject code required')
  }

  const [curriculumRow] = await drizzleDb
    .select()
    .from(curriculum)
    .where(eq(curriculum.subject, subjectCode.toLowerCase()))
    .limit(1)

  if (!curriculumRow) {
    throw new NotFoundError('Subject not found')
  }

  const [enrollment] = await drizzleDb
    .select()
    .from(curriculumEnrollment)
    .where(
      and(
        eq(curriculumEnrollment.studentId, session.user.id),
        eq(curriculumEnrollment.curriculumId, curriculumRow.id)
      )
    )
    .limit(1)

  if (!enrollment) {
    throw new ValidationError('Not enrolled in this subject')
  }

  await drizzleDb
    .delete(curriculumEnrollment)
    .where(eq(curriculumEnrollment.id, enrollment.id))

  return NextResponse.json({
    success: true,
    message: `Unenrolled from ${curriculumRow.name}`,
  })
}, { role: 'STUDENT' }))
