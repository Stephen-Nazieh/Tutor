/**
 * Student Onboarding API
 * POST /api/onboarding/student — save student profile (withAuth + CSRF)
 */

import { NextRequest, NextResponse } from 'next/server'
import type { Session } from 'next-auth'
import { eq } from 'drizzle-orm'
import { withAuth, requireCsrf } from '@/lib/api/middleware'
import { drizzleDb } from '@/lib/db/drizzle'
import { profile as profileTable } from '@/lib/db/schema'
import crypto from 'crypto'

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

    const [profile] = await drizzleDb.insert(profileTable).values({
      id: crypto.randomUUID(),
      userId: session.user.id,
      gradeLevel: String(gradeLevel),
      subjectsOfInterest: Array.isArray(subjectsOfInterest) ? subjectsOfInterest : [],
      timezone: 'UTC', // Required field
      emailNotifications: true, // Required field
      smsNotifications: false, // Required field
      preferredLanguages: ['en'], // Required field
      learningGoals: [], // Required field
      tosAccepted: true, // Required field
      isOnboarded: true, // Mark as onboarded
      specialties: [], // Required field
      paidClassesEnabled: false, // Required field
    }).onConflictDoUpdate({
      target: profileTable.userId,
      set: {
        gradeLevel: String(gradeLevel),
        subjectsOfInterest: Array.isArray(subjectsOfInterest) ? subjectsOfInterest : [],
        isOnboarded: true
      }
    }).returning()

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
