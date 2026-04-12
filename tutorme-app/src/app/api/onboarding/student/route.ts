/**
 * Student Onboarding API
 * POST /api/onboarding/student — save student profile (withAuth + CSRF)
 */

import { NextRequest, NextResponse } from 'next/server'
import type { Session } from 'next-auth'
import { z } from 'zod'
import { withAuth, requireCsrf, handleApiError } from '@/lib/api/middleware'
import { drizzleDb } from '@/lib/db/drizzle'
import { profile as profileTable } from '@/lib/db/schema'
import crypto from 'crypto'

const onboardingSchema = z.object({
  subjectsOfInterest: z.array(z.string().max(100)).max(20).optional().default([]),
})

async function postHandler(req: NextRequest, session: Session) {
  const csrfError = await requireCsrf(req)
  if (csrfError) return csrfError

  try {
    const body = await req.json().catch(() => ({}))
    const parsed = onboardingSchema.safeParse(body)

    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message ?? 'Invalid input'
      return NextResponse.json({ error: firstError }, { status: 400 })
    }

    const { subjectsOfInterest } = parsed.data

    const [profile] = await drizzleDb
      .insert(profileTable)
      .values({
        profileId: crypto.randomUUID(),
        userId: session.user.id,
        subjectsOfInterest,
        timezone: 'UTC',
        emailNotifications: true,
        smsNotifications: false,
        preferredLanguages: ['en'],
        learningGoals: [],
        tosAccepted: true,
        isOnboarded: true,
        specialties: [],
        paidClassesEnabled: false,
      })
      .onConflictDoUpdate({
        target: profileTable.userId,
        set: {
          subjectsOfInterest,
          isOnboarded: true,
        },
      })
      .returning()

    return NextResponse.json({
      message: 'Onboarding completed successfully',
      profileId: profile.profileId,
    })
  } catch (error: unknown) {
    console.error('Student onboarding error:', error)
    return handleApiError(
      error,
      error instanceof Error ? error.message : 'Failed to save onboarding data',
      'api/onboarding/student/route.ts'
    )
  }
}

export const POST = withAuth(postHandler)
