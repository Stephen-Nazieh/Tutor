/**
 * GET /api/feedback/pending
 * Pending feedback items for tutor review (withAuth; TUTOR or ADMIN only).
 */

import { NextRequest, NextResponse } from 'next/server'
import type { Session } from 'next-auth'
import { withAuth } from '@/lib/api/middleware'
import { getPendingFeedback } from '@/lib/feedback/workflow'

async function getHandler(request: NextRequest, session: Session) {
  try {
    if (session.user.role !== 'TUTOR' && session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: '无权访问' }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const priority = searchParams.get('priority') as 'low' | 'medium' | 'high' | undefined
    const type = searchParams.get('type') as any
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = parseInt(searchParams.get('offset') || '0')

    const result = await getPendingFeedback(session.user.id, {
      priority,
      type,
      limit,
      offset
    })

    return NextResponse.json({
      success: true,
      data: result
    })
  } catch (error) {
    console.error('Failed to get pending feedback:', error)
    return NextResponse.json(
      { error: '获取待审核反馈失败' },
      { status: 500 }
    )
  }
}

export const GET = withAuth(getHandler)
