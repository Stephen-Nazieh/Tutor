/**
 * Gamification API
 * 
 * GET /api/gamification - Get user's gamification summary
 * POST /api/gamification/xp - Award XP
 * POST /api/gamification/daily-login - Check daily login
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth, withCsrf } from '@/lib/api/middleware'
import {
  getGamificationSummary,
  awardXp,
  checkDailyLogin,
  updateSkillScores
} from '@/lib/gamification/service'
import { XP_REWARDS } from '@/lib/gamification/constants'

// GET /api/gamification - Get user's gamification data
export const GET = withAuth(async (req, session) => {
  const summary = await getGamificationSummary(session.user.id)

  return NextResponse.json({ success: true, data: summary })
}, { role: 'STUDENT' })

// POST /api/gamification/xp - Award XP to user
export const POST = withCsrf(withAuth(async (request: NextRequest, session) => {
  const body = await request.json()
  const { amount, source, metadata } = body

  if (!amount || !source) {
    return NextResponse.json(
      { error: 'Missing required fields: amount, source' },
      { status: 400 }
    )
  }

  const result = await awardXp(session.user.id, amount, source, metadata)

  return NextResponse.json({ success: true, data: result })
}, { role: 'STUDENT' }))

// PUT /api/gamification/skills - Update skill scores
export const PUT = withCsrf(withAuth(async (request: NextRequest, session) => {
  const body = await request.json()
  const scores = body

  const result = await updateSkillScores(session.user.id, scores)

  return NextResponse.json({ success: true, data: result })
}, { role: 'STUDENT' }))
