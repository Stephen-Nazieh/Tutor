import { NextRequest, NextResponse } from 'next/server'
import { drizzleDb } from '@/lib/db/drizzle'
import { landingInquiry, landingSignup } from '@/lib/db/schema'
import { desc } from 'drizzle-orm'
import { withAuth } from '@/lib/api/middleware'

/**
 * GET /api/admin/landing-submissions
 * Returns all landing page contact messages and signups (admin only)
 */
export const GET = withAuth(async (_req: NextRequest) => {
  try {
    const [messages, signups] = await Promise.all([
      drizzleDb.select().from(landingInquiry).orderBy(desc(landingInquiry.createdAt)),
      drizzleDb.select().from(landingSignup).orderBy(desc(landingSignup.createdAt)),
    ])

    return NextResponse.json({ messages, signups })
  } catch (error) {
    console.error('Failed to fetch landing submissions:', error)
    return NextResponse.json({ error: 'Failed to fetch submissions' }, { status: 500 })
  }
}, { role: 'ADMIN' })
