/**
 * Check Enrollment Status API
 * GET: Check if student is enrolled in a specific curriculum
 */

import { NextResponse } from 'next/server'
import { withAuth } from '@/lib/api/middleware'
import { db } from '@/lib/db'

export const GET = withAuth(async (req, session) => {
  const curriculumId = req.nextUrl.searchParams.get('curriculumId')

  if (!curriculumId) {
    return NextResponse.json(
      { error: 'Curriculum ID is required' },
      { status: 400 }
    )
  }

  const enrollment = await db.curriculumEnrollment.findUnique({
    where: {
      studentId_curriculumId: {
        studentId: session.user.id,
        curriculumId
      }
    },
    include: {
      curriculum: {
        select: {
          id: true,
          name: true,
          price: true,
          currency: true
        }
      }
    }
  })

  const progress = await db.curriculumProgress.findUnique({
    where: {
      studentId_curriculumId: {
        studentId: session.user.id,
        curriculumId
      }
    }
  })

  return NextResponse.json({
    isEnrolled: !!enrollment,
    enrollment: enrollment || null,
    progress: progress || null
  })
}, { role: 'STUDENT' })
