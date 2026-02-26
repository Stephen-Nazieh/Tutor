/**
 * Daily Quests API
 * 
 * GET /api/gamification/quests - Get today's quests
 * POST /api/gamification/quests/progress - Update quest progress
 * GET /api/gamification/quests/summary - Get quest summary
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth, withCsrf } from '@/lib/api/middleware'
import { 
  getTodayQuests, 
  updateQuestProgress,
  getQuestSummary 
} from '@/lib/gamification/daily-quests'

// GET /api/gamification/quests
export const GET = withAuth(async (request: NextRequest, session) => {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get('type')

  if (type === 'summary') {
    const summary = await getQuestSummary(session.user.id)
    const quests = (summary.quests as { mission: unknown; [k: string]: unknown }[]).map((q) => ({
      ...q,
      quest: q.mission,
    }))
    return NextResponse.json({ success: true, data: { ...summary, quests } })
  }

  // Default: get today's quests (map mission -> quest for backward compat)
  const quests = await getTodayQuests(session.user.id)
  const mapped = quests.map((q) => ({
    ...q,
    quest: q.mission,
    progress: q.completed ? 1 : 0,
  }))
  return NextResponse.json({ success: true, data: { quests: mapped } })
}, { role: 'STUDENT' })

// POST /api/gamification/quests/progress
export const POST = withCsrf(withAuth(async (request: NextRequest, session) => {
  const body = await request.json()
  const { questType, progress } = body

  if (!questType) {
    return NextResponse.json(
      { error: 'Missing questType' },
      { status: 400 }
    )
  }

  const result = await updateQuestProgress(
    session.user.id,
    questType,
    progress || 1
  )

  return NextResponse.json({ success: true, data: result })
}, { role: 'STUDENT' }))
