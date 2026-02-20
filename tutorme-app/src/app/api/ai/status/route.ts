/**
 * AI Providers Status API
 * Returns the status of all AI providers
 * 
 * GET /api/ai/status
 */

import { NextResponse } from 'next/server'
import { getAIProvidersStatus } from '@/lib/ai/orchestrator'

export async function GET() {
  try {
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
