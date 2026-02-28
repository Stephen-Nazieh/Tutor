/**
 * AI Providers Status API
 * Returns the status of all AI providers
 * 
 * GET /api/ai/status
 */

import { NextResponse } from 'next/server'
import { getAIProvidersStatus } from '@/lib/ai/orchestrator'
import { getServerSession, authOptions } from '@/lib/auth'
import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions, request)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    if (session.user.role !== 'ADMIN' && session.user.role !== 'TUTOR') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const providers = await getAIProvidersStatus()
    
    return NextResponse.json({
      providers,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('AI status check failed:', error)
    return NextResponse.json(
      { error: 'Failed to check AI providers' },
      { status: 500 }
    )
  }
}
