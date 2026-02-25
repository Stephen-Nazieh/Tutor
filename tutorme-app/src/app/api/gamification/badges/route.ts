/**
 * GET /api/gamification/badges
 * Get all badges for the current user
 */

import { NextResponse } from 'next/server'
import { withAuth } from '@/lib/api/middleware'
import { getAllBadgesWithProgress, getBadgeStats } from '@/lib/gamification/badges'

export const GET = withAuth(async (req, session) => {
  try {
    const userId = session.user.id
    
    const [badges, stats] = await Promise.all([
      getAllBadgesWithProgress(userId),
      getBadgeStats(userId),
    ])
    
    return NextResponse.json({
      success: true,
      data: {
        badges,
        stats,
      },
    })
  } catch (error) {
    console.error('Error fetching badges:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch badges' },
      { status: 500 }
    )
  }
}, { role: 'STUDENT' })
