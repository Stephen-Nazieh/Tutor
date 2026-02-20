/**
 * Missions API
 * 
 * POST /api/gamification/missions/start - Start a mission
 * POST /api/gamification/missions/complete - Complete a mission
 * GET /api/gamification/missions/summary - Get mission summary
 * GET /api/gamification/missions/recommended - Get recommended mission
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth, withCsrf } from '@/lib/api/middleware'
import { 
  startMission, 
  completeMission, 
  getMissionSummary,
  getRecommendedMission 
} from '@/lib/gamification/worlds'

// GET /api/gamification/missions
export const GET = withAuth(async (request: NextRequest, session) => {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get('type')

  if (type === 'recommended') {
    const mission = await getRecommendedMission(session.user.id)
    return NextResponse.json({ success: true, data: mission })
  }

  if (type === 'summary') {
    const summary = await getMissionSummary(session.user.id)
    return NextResponse.json({ success: true, data: summary })
  }

  return NextResponse.json({ error: 'Invalid type parameter' }, { status: 400 })
}, { role: 'STUDENT' })

// POST /api/gamification/missions
export const POST = withCsrf(withAuth(async (request: NextRequest, session) => {
  const body = await request.json()
  const { action, missionId, score, confidenceDelta } = body

  if (action === 'start') {
    if (!missionId) {
      return NextResponse.json({ error: 'Missing missionId' }, { status: 400 })
    }
    const result = await startMission(session.user.id, missionId)
    return NextResponse.json({ success: true, data: result })
  }

  if (action === 'complete') {
    if (!missionId || score === undefined) {
      return NextResponse.json(
        { error: 'Missing missionId or score' },
        { status: 400 }
      )
    }
    const result = await completeMission(
      session.user.id,
      missionId,
      score,
      confidenceDelta
    )
    return NextResponse.json({ success: true, data: result })
  }

  return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
}, { role: 'STUDENT' }))
