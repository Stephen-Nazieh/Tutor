/**
 * Curriculum Enrollment API
 * POST: Enroll student in a curriculum
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth, withCsrf, NotFoundError, withRateLimitPreset } from '@/lib/api/middleware'
import { db } from '@/lib/db'

export const POST = withCsrf(withAuth(async (req, session, { params }) => {
  const { response: rateLimitResponse } = await withRateLimitPreset(req, 'enroll')
  if (rateLimitResponse) return rateLimitResponse

  const { curriculumId } = await params

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

  if (existingProgress) {
    return NextResponse.json({
      success: true,
      message: 'Already enrolled',
      progress: existingProgress
    })
  }

  // Create CurriculumEnrollment so the course appears on the student dashboard (My courses)
  await db.curriculumEnrollment.upsert({
    where: {
      studentId_curriculumId: {
        studentId: session.user.id,
        curriculumId
      }
    },
    create: {
      studentId: session.user.id,
      curriculumId,
      lessonsCompleted: 0,
      enrollmentSource: 'signup'
    },
    update: { enrollmentSource: 'signup' }
  })

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
