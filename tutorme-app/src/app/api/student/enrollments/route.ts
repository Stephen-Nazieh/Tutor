/**
 * Student Enrollment API
 * POST: Enroll student in a curriculum
 * GET: List student's enrollments
 */

import { NextResponse } from 'next/server'
import { withAuth, NotFoundError } from '@/lib/api/middleware'
import { db } from '@/lib/db'

export const POST = withAuth(async (req, session) => {
  const body = await req.json().catch(() => ({}))
  const { curriculumId } = body

  if (!curriculumId || typeof curriculumId !== 'string') {
    return NextResponse.json(
      { error: 'Curriculum ID is required' },
      { status: 400 }
    )
  }

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
    throw new NotFoundError('Course not found')
  }

  // Check if course requires payment
  if (curriculum.price && curriculum.price > 0) {
    // Check if already has a pending/completed payment
    // Payment stores curriculum info in metadata
    const existingPayments = await db.payment.findMany({
      where: {
        status: { in: ['COMPLETED', 'PENDING'] }
      }
    })
    
    const hasPayment = existingPayments.some((p: { metadata?: unknown }) => {
      const meta = p.metadata as { curriculumId?: string; studentId?: string } | null
      return meta?.curriculumId === curriculumId && meta?.studentId === session.user.id
    })

    if (!hasPayment) {
      return NextResponse.json(
        { 
          error: 'Payment required',
          requiresPayment: true,
          amount: curriculum.price,
          currency: curriculum.currency || 'USD'
        },
        { status: 402 }
      )
    }
  }

  const totalLessons = curriculum.modules.reduce(
    (sum: number, m: { _count?: { lessons?: number } }) => sum + (m._count?.lessons ?? 0),
    0
  )

  // Check if already enrolled
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
      progress: existingProgress,
    })
  }

  // Create enrollment
  const enrollment = await db.curriculumEnrollment.create({
    data: {
      studentId: session.user.id,
      curriculumId,
      lessonsCompleted: 0,
      enrollmentSource: 'browse'
    }
  })

  // Create progress tracking
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
    enrollment,
    progress
  })
})

export const GET = withAuth(async (req, session) => {
  const enrollments = await db.curriculumEnrollment.findMany({
    where: { studentId: session.user.id },
    include: {
      curriculum: {
        select: {
          id: true,
          name: true,
          subject: true,
          description: true,
          difficulty: true,
          estimatedHours: true,
          isPublished: true,
          _count: {
            select: { modules: true }
          }
        }
      }
    },
    orderBy: { enrolledAt: 'desc' }
  })

  return NextResponse.json({ enrollments })
})
