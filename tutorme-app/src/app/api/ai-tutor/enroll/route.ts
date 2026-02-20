/**
 * AI Tutor Enroll API
 * Enroll in a new AI tutor subject
 */

import { NextResponse } from 'next/server'
import { withAuth, withCsrf, ValidationError } from '@/lib/api/middleware'
import { db } from '@/lib/db'

// POST - Enroll in a subject
export const POST = withCsrf(withAuth(async (req, session) => {
  const { subject, curriculumId } = await req.json()
  
  if (!subject) {
    throw new ValidationError('Subject is required')
  }

    // Check if already enrolled
    const existing = await db.aITutorEnrollment.findUnique({
      where: {
        studentId_subjectCode: {
          studentId: session.user.id,
          subjectCode: subject
        }
      }
    })

    if (existing) {
      // Reactivate if previously inactive
      if (existing.status !== 'active') {
        const updated = await db.aITutorEnrollment.update({
          where: { id: existing.id },
          data: { status: 'active' }
        })
        return NextResponse.json({
          enrollment: updated,
          message: 'Enrollment reactivated'
        })
      }
      
      return NextResponse.json(
        { error: 'Already enrolled in this subject' },
        { status: 400 }
      )
    }

    // Create enrollment
    const enrollment = await db.aITutorEnrollment.create({
      data: {
        studentId: session.user.id,
        subjectCode: subject,
        status: 'active'
      }
    })

    // Create curriculum enrollment if curriculum selected
    if (curriculumId) {
      await db.curriculumEnrollment.create({
        data: {
          studentId: session.user.id,
          curriculumId: curriculumId
        }
      })
    }

    // Get curriculum info if assigned
    let curriculumInfo = null
    if (curriculumId) {
      const curriculum = await db.curriculum.findUnique({
        where: { id: curriculumId }
      })
      curriculumInfo = curriculum ? {
        name: curriculum.name,
        subject: curriculum.subject,
        description: curriculum.description
      } : null
    }

  return NextResponse.json({
    enrollment: {
      id: enrollment.id,
      subjectCode: enrollment.subjectCode,
      status: enrollment.status,
      curriculum: curriculumInfo
    },
    message: 'Successfully enrolled in AI Tutor'
  })
}, { role: 'STUDENT' }))
