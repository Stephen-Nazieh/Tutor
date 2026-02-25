/**
 * GET /api/gamification/leaderboard
 * Get leaderboard data
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/lib/api/middleware'
import { getLeaderboard, getLeaderboardAroundUser } from '@/lib/gamification/leaderboard'

export const GET = withAuth(async (req: NextRequest, session) => {
  try {
    const { searchParams } = new URL(req.url)
    const type = searchParams.get('type') || 'global'
    const limit = parseInt(searchParams.get('limit') || '100')
    const aroundMe = searchParams.get('aroundMe') === 'true'
    
    const userId = session.user.id
    
    if (aroundMe) {
      const entries = await getLeaderboardAroundUser(userId, type as any, 5)
      return NextResponse.json({
        success: true,
        data: { entries, type },
      })
    }
    
    const leaderboard = await getLeaderboard(type as any, limit, userId)
    
    return NextResponse.json({
      success: true,
      data: leaderboard,
    })
  } catch (error) {
    console.error('Error fetching leaderboard:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch leaderboard' },
      { status: 500 }
    )
  }
}, { role: 'STUDENT' })
