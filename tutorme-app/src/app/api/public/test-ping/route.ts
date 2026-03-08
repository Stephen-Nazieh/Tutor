/**
 * Simple ping test to check network connectivity
 * GET /api/public/test-ping
 */

import { NextResponse } from 'next/server'

export async function GET() {
  // Test 1: Check if we can reach the Kimi API base URL
  try {
    console.log('Testing connectivity to Kimi API...')
    const response = await fetch('https://api.moonshot.cn/v1/models', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${process.env.KIMI_API_KEY || ''}`,
      },
    })
    
    return NextResponse.json({
      status: 'ok',
      kimiApiReachable: response.ok,
      kimiApiStatus: response.status,
      envKeyExists: !!process.env.KIMI_API_KEY,
      keyLength: process.env.KIMI_API_KEY?.length || 0,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Ping test error:', error)
    return NextResponse.json({
      status: 'error',
      error: error instanceof Error ? error.message : 'Unknown error',
      envKeyExists: !!process.env.KIMI_API_KEY,
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}
