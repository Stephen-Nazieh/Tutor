/**
 * POST /api/admin/gamification/init-badges
 * Initialize all badges in the database
 * Admin only endpoint
 */

import { NextResponse } from 'next/server'
import { withAuth } from '@/lib/api/middleware'
import { initializeBadges } from '@/lib/gamification/badges'

export const POST = withAuth(async (req, session) => {
  try {
    await initializeBadges()
    
    return NextResponse.json({
      success: true,
      message: 'Badges initialized successfully',
    })
  } catch (error) {
    console.error('Error initializing badges:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to initialize badges' },
      { status: 500 }
    )
  }
}, { role: 'ADMIN' })
