/**
 * AI Tutor Enroll API
 * Enroll in a new AI tutor subject
 */

import { NextResponse } from 'next/server'
import { withAuth, withCsrf, ValidationError } from '@/lib/api/middleware'
import { drizzleDb } from '@/lib/db/drizzle'
import { aITutorEnrollment, curriculumEnrollment, curriculum } from '@/lib/db/schema'
import { eq, and } from 'drizzle-orm'

export const POST = withCsrf(withAuth(async (req, session) => {
  const { subject, curriculumId } = await req.json()

  if (!subject) {
    throw new ValidationError('Subject is required')
  }

  const [existing] = await drizzleDb
    .select()
    .from(aITutorEnrollment)
    .where(
      and(
        eq(aITutorEnrollment.studentId, session.user.id),
        eq(aITutorEnrollment.subjectCode, subject)
      )
    )
    .limit(1)

  if (existing) {
    if (existing.status !== 'active') {
      await drizzleDb
        .update(aITutorEnrollment)
        .set({ status: 'active' })
        .where(eq(aITutorEnrollment.id, existing.id))
      const [updated] = await drizzleDb
        .select()
        .from(aITutorEnrollment)
        .where(eq(aITutorEnrollment.id, existing.id))
        .limit(1)
      return NextResponse.json({
        enrollment: updated!,
        message: 'Enrollment reactivated',
      })
    }
    return NextResponse.json(
      { error: 'Already enrolled in this subject' },
      { status: 400 }
    )
  }

  const enrollmentId = crypto.randomUUID()
  await drizzleDb.insert(aITutorEnrollment).values({
    id: enrollmentId,
    studentId: session.user.id,
    subjectCode: subject,
    status: 'active',
    totalSessions: 0,
    totalMinutes: 0,
  })

  if (curriculumId) {
    const [hasEnrollment] = await drizzleDb
      .select()
      .from(curriculumEnrollment)
      .where(
        and(
          eq(curriculumEnrollment.studentId, session.user.id),
          eq(curriculumEnrollment.curriculumId, curriculumId)
        )
      )
      .limit(1)
    if (!hasEnrollment) {
      await drizzleDb.insert(curriculumEnrollment).values({
        id: crypto.randomUUID(),
        studentId: session.user.id,
        curriculumId,
        lessonsCompleted: 0,
        enrollmentSource: 'ai-tutor',
      })
    }
  }

  let curriculumInfo = null
  if (curriculumId) {
    const [curriculumRow] = await drizzleDb
      .select({
        name: curriculum.name,
        subject: curriculum.subject,
        description: curriculum.description,
      })
      .from(curriculum)
      .where(eq(curriculum.id, curriculumId))
      .limit(1)
    curriculumInfo = curriculumRow
      ? {
          name: curriculumRow.name,
          subject: curriculumRow.subject,
          description: curriculumRow.description,
        }
      : null
  }

  const [enrollment] = await drizzleDb
    .select()
    .from(aITutorEnrollment)
    .where(eq(aITutorEnrollment.id, enrollmentId))
    .limit(1)

  return NextResponse.json({
    enrollment: {
      id: enrollment!.id,
      subjectCode: enrollment!.subjectCode,
      status: enrollment!.status,
      curriculum: curriculumInfo,
    },
    message: 'Successfully enrolled in AI Tutor',
  })
}, { role: 'STUDENT' }))
