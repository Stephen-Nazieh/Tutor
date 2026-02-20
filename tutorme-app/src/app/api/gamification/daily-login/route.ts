/**
 * Daily Login API
 * 
 * POST /api/gamification/daily-login - Check daily login and award streak/XP
 */

import { NextResponse } from 'next/server'
import { withAuth, withCsrf } from '@/lib/api/middleware'
import { checkDailyLogin } from '@/lib/gamification/service'

export const POST = withCsrf(withAuth(async (req, session) => {
  const result = await checkDailyLogin(session.user.id)
  
  return NextResponse.json({ success: true, data: result })
}, { role: 'STUDENT' }))
