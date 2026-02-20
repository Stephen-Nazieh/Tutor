/**
 * Worlds API
 * 
 * GET /api/gamification/worlds - Get all worlds with user unlock status
 * GET /api/gamification/worlds/[id] - Get specific world with missions
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/lib/api/middleware'
import { getWorldsWithStatus, getWorldWithMissions } from '@/lib/gamification/worlds'

// GET /api/gamification/worlds - Get all worlds
export const GET = withAuth(async (request: NextRequest, session) => {
  const { searchParams } = new URL(request.url)
  const worldId = searchParams.get('id')

  if (worldId) {
    // Get specific world with missions
    const world = await getWorldWithMissions(worldId, session.user.id)
    if (!world) {
      return NextResponse.json({ error: 'World not found' }, { status: 404 })
    }
    return NextResponse.json({ success: true, data: world })
  }

  // Get all worlds
  const worlds = await getWorldsWithStatus(session.user.id)
  return NextResponse.json({ success: true, data: worlds })
}, { role: 'STUDENT' })
