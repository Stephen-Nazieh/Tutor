/**
 * GET /api/feedback/stats
 * Feedback workflow statistics (withAuth; TUTOR or ADMIN only).
 */

import { NextRequest, NextResponse } from 'next/server'
import type { Session } from 'next-auth'
import { withAuth } from '@/lib/api/middleware'
import { getFeedbackStats } from '@/lib/feedback/workflow'

async function getHandler(_request: NextRequest, session: Session) {
  try {
    if (session.user.role !== 'TUTOR' && session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: '无权访问' }, { status: 403 })
    }

    const stats = await getFeedbackStats(session.user.id)

    return NextResponse.json({
      success: true,
      data: stats
    })
  } catch (error) {
    console.error('Failed to get feedback stats:', error)
    return NextResponse.json(
      { error: '获取反馈统计失败' },
      { status: 500 }
    )
  }
}

export const GET = withAuth(getHandler)
