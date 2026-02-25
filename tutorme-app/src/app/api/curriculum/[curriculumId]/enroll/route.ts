/**
 * Curriculum Enrollment API
 * POST: Enroll student in a curriculum
 */

import { NextResponse } from 'next/server'
import { withAuth, withCsrf, NotFoundError, withRateLimitPreset } from '@/lib/api/middleware'
import { db } from '@/lib/db'

export const POST = withCsrf(withAuth(async (req, session, { params }) => {
  const { response: rateLimitResponse } = await withRateLimitPreset(req, 'enroll')
  if (rateLimitResponse) return rateLimitResponse

  const { curriculumId } = await params
  const body = await req.json().catch(() => ({}))
  const rawBatchIdFromBody = typeof body?.batchId === 'string' ? body.batchId : null
  const rawBatchIdFromQuery = req.nextUrl.searchParams.get('batch')
  const requestedBatchId = rawBatchIdFromBody || rawBatchIdFromQuery

  // Check if curriculum exists and get lesson count via modules
  const curriculum = await db.curriculum.findUnique({
    where: { id: curriculumId },
    include: {
      modules: {
        include: {
          _count: { select: { lessons: true } }
        }
      }
    }
  })

  if (!curriculum) {
    throw new NotFoundError('Curriculum not found')
  }

  let validatedBatchId: string | null = null
  if (requestedBatchId) {
    const batch = await db.courseBatch.findFirst({
      where: {
        id: requestedBatchId,
        curriculumId,
      },
      select: { id: true },
    })
    if (!batch) {
      throw new NotFoundError('Course variant not found')
    }
    validatedBatchId = batch.id
  }

  const totalLessons = curriculum.modules.reduce(
    (sum: number, m: { _count?: { lessons?: number } }) => sum + (m._count?.lessons ?? 0),
    0
  )

  // Check if already enrolled (CurriculumProgress or CurriculumEnrollment)
  const existingProgress = await db.curriculumProgress.findUnique({
    where: {
      studentId_curriculumId: {
        studentId: session.user.id,
        curriculumId
      }
    }
  })

  // Create/update CurriculumEnrollment so the course appears on the student dashboard (My courses)
  const enrollment = await db.curriculumEnrollment.upsert({
    where: {
      studentId_curriculumId: {
        studentId: session.user.id,
        curriculumId
      }
    },
    create: {
      studentId: session.user.id,
      curriculumId,
      batchId: validatedBatchId,
      lessonsCompleted: 0,
      enrollmentSource: 'signup'
    },
    update: { enrollmentSource: 'signup', ...(validatedBatchId ? { batchId: validatedBatchId } : {}) }
  })

  if (existingProgress) {
    return NextResponse.json({
      success: true,
      message: 'Already enrolled',
      progress: existingProgress,
      enrollment,
    })
  }

  // Create CurriculumProgress for lesson tracking
  const progress = await db.curriculumProgress.create({
    data: {
      studentId: session.user.id,
      curriculumId,
      lessonsCompleted: 0,
      totalLessons,
      startedAt: new Date()
    }
  })

  return NextResponse.json({
    success: true,
    message: 'Enrolled successfully',
    progress
  })
}, { role: 'STUDENT' }))
