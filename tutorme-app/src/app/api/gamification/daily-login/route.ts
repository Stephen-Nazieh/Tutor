/**
 * Daily Login API
 * 
 * POST /api/gamification/daily-login - Check daily login and award streak/XP
 */

import { NextResponse } from 'next/server'
import { withAuth, withCsrf } from '@/lib/api/middleware'
import { onUserLogin, checkTimeBasedBadges } from '@/lib/gamification/triggers'

export const POST = withCsrf(withAuth(async (req, session) => {
  // Check daily login, streak, and award XP
  const result = await onUserLogin(session.user.id)
  
  // Check for time-based badges (night owl, early bird)
  const timeBadges = await checkTimeBasedBadges(session.user.id)
  
  return NextResponse.json({ 
    success: true, 
    data: {
      ...result,
      timeBasedBadges: timeBadges.badgesEarned,
    } 
  })
}, { role: 'STUDENT' }))
