/**
 * Tutor Onboarding API
 * POST /api/onboarding/tutor — save tutor profile (withAuth + CSRF)
 */

import { NextRequest, NextResponse } from 'next/server'
import type { Session } from 'next-auth'
import { eq } from 'drizzle-orm'
import { withAuth, requireCsrf, handleApiError } from '@/lib/api/middleware'
import { drizzleDb } from '@/lib/db/drizzle'
import { profile as profileTable } from '@/lib/db/schema'
import { sanitizeHtmlWithMax, sanitizeHtml } from '@/lib/security/sanitize'

async function postHandler(req: NextRequest, session: Session) {
  const csrfError = await requireCsrf(req)
  if (csrfError) return csrfError

  try {
    const body = await req.json().catch(() => ({}))
    const { bio, hourlyRate } = body
    const safeBio = bio !== undefined ? sanitizeHtmlWithMax(String(bio), 2000) : undefined

    await drizzleDb
      .update(profileTable)
      .set({
        ...(safeBio !== undefined && { bio: safeBio }),
        hourlyRate: typeof hourlyRate === 'number' ? hourlyRate : null,
        isOnboarded: true,
      })
      .where(eq(profileTable.userId, session.user.id))

    return NextResponse.json({
      message: 'Onboarding completed successfully',
    })
  } catch (error) {
    console.error('Tutor onboarding error:', error)
    return handleApiError(error, 'Failed to save onboarding data', 'api/onboarding/tutor/route.ts')
  }
}

export const POST = withAuth(postHandler)
