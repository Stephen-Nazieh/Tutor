/**
 * Check Enrollment Status API (Drizzle ORM)
 * GET: Check if student is enrolled in a specific curriculum
 */

import { and, eq } from 'drizzle-orm'
import { NextResponse } from 'next/server'
import { withAuth } from '@/lib/api/middleware'
import { drizzleDb } from '@/lib/db/drizzle'
import {
  curriculum,
  curriculumEnrollment,
  curriculumProgress,
} from '@/lib/db/schema'

export const GET = withAuth(async (req, session) => {
  const curriculumId = req.nextUrl.searchParams.get('curriculumId')

  if (!curriculumId) {
    return NextResponse.json(
      { error: 'Curriculum ID is required' },
      { status: 400 }
    )
  }

  const [enrollment] = await drizzleDb
    .select()
    .from(curriculumEnrollment)
    .where(
      and(
        eq(curriculumEnrollment.studentId, session.user.id),
        eq(curriculumEnrollment.curriculumId, curriculumId)
      )
    )
    .limit(1)

  const [progress] = await drizzleDb
    .select()
    .from(curriculumProgress)
    .where(
      and(
        eq(curriculumProgress.studentId, session.user.id),
        eq(curriculumProgress.curriculumId, curriculumId)
      )
    )
    .limit(1)

  let curriculumData: { id: string; name: string; price: number | null; currency: string | null } | null = null
  if (enrollment) {
    const [cur] = await drizzleDb
      .select({
        id: curriculum.id,
        name: curriculum.name,
        price: curriculum.price,
        currency: curriculum.currency,
      })
      .from(curriculum)
      .where(eq(curriculum.id, enrollment.curriculumId))
      .limit(1)
    curriculumData = cur ?? null
  }

  return NextResponse.json({
    isEnrolled: !!enrollment,
    enrollment: enrollment
      ? {
          ...enrollment,
          curriculum: curriculumData,
        }
      : null,
    progress: progress ?? null,
  })
}, { role: 'STUDENT' })
