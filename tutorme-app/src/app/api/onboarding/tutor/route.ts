/**
 * Tutor Onboarding API
 * POST /api/onboarding/tutor — save tutor profile (withAuth + CSRF)
 */

import { NextRequest, NextResponse } from 'next/server'
import type { Session } from 'next-auth'
import { eq } from 'drizzle-orm'
import { withAuth, requireCsrf } from '@/lib/api/middleware'
import { drizzleDb } from '@/lib/db/drizzle'
import { profile as profileTable } from '@/lib/db/schema'
import { sanitizeHtmlWithMax, sanitizeHtml } from '@/lib/security/sanitize'

async function postHandler(req: NextRequest, session: Session) {
  const csrfError = await requireCsrf(req)
  if (csrfError) return csrfError

  try {
    const body = await req.json().catch(() => ({}))
    const { bio, specialties, hourlyRate } = body
    const safeBio = bio !== undefined ? sanitizeHtmlWithMax(String(bio), 2000) : undefined
    const safeSpecialties = Array.isArray(specialties)
      ? specialties.map((s: unknown) => sanitizeHtml(String(s)).trim().slice(0, 100)).filter(Boolean)
      : []

    await drizzleDb.update(profileTable)
      .set({
        ...(safeBio !== undefined && { bio: safeBio }),
        specialties: safeSpecialties,
        hourlyRate: typeof hourlyRate === 'number' ? hourlyRate : null,
        isOnboarded: true,
      })
      .where(eq(profileTable.userId, session.user.id))

    return NextResponse.json({
      message: 'Onboarding completed successfully',
    })
  } catch (error) {
    console.error('Tutor onboarding error:', error)
    return NextResponse.json(
      { error: 'Failed to save onboarding data' },
      { status: 500 }
    )
  }
}

export const POST = withAuth(postHandler)
