/**
 * Student Onboarding API
 * POST /api/onboarding/student — save student profile (withAuth + CSRF)
 */

import { NextRequest, NextResponse } from 'next/server'
import type { Session } from 'next-auth'
import { withAuth, requireCsrf } from '@/lib/api/middleware'
import { db } from '@/lib/db'

async function postHandler(req: NextRequest, session: Session) {
  const csrfError = await requireCsrf(req)
  if (csrfError) return csrfError

  try {
    const body = await req.json().catch(() => ({}))
    const { gradeLevel, subjectsOfInterest } = body

    if (!gradeLevel) {
      return NextResponse.json(
        { error: 'Grade level is required' },
        { status: 400 }
      )
    }

    const profile = await db.profile.upsert({
      where: { userId: session.user.id },
      update: {
        gradeLevel: String(gradeLevel),
        subjectsOfInterest: Array.isArray(subjectsOfInterest) ? subjectsOfInterest : [],
      },
      create: {
        userId: session.user.id,
        gradeLevel: String(gradeLevel),
        subjectsOfInterest: Array.isArray(subjectsOfInterest) ? subjectsOfInterest : [],
      },
    })
    
    console.log('Onboarding - Profile saved:', profile.id)

    return NextResponse.json({
      message: 'Onboarding completed successfully',
      profileId: profile.id
    })
  } catch (error: unknown) {
    console.error('Student onboarding error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to save onboarding data' },
      { status: 500 }
    )
  }
}

export const POST = withAuth(postHandler)
