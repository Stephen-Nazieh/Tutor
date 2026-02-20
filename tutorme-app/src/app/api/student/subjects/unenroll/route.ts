/**
 * Unenroll from a Subject API
 * Remove a subject from student's curriculum
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth, withCsrf, ValidationError, NotFoundError } from '@/lib/api/middleware'
import { db } from '@/lib/db'

// POST /api/student/subjects/unenroll - Unenroll from a subject
export const POST = withCsrf(withAuth(async (req: NextRequest, session) => {
  const { subjectCode } = await req.json()

  if (!subjectCode) {
    throw new ValidationError('Subject code required')
  }

  // Find the curriculum
  const curriculum = await db.curriculum.findFirst({
    where: { subject: subjectCode.toLowerCase() },
  })

  if (!curriculum) {
    throw new NotFoundError('Subject not found')
  }

  // Check if enrolled
  const enrollment = await db.curriculumEnrollment.findFirst({
    where: {
      studentId: session.user.id,
      curriculumId: curriculum.id,
    },
  })

  if (!enrollment) {
    throw new ValidationError('Not enrolled in this subject')
  }

  // Delete the enrollment
  await db.curriculumEnrollment.delete({
    where: { id: enrollment.id },
  })

  return NextResponse.json({
    success: true,
    message: `Unenrolled from ${curriculum.name}`,
  })
}, { role: 'STUDENT' }))
