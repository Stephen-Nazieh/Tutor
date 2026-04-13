/**
 * Simple ping test to check network connectivity
 * GET /api/public/test-ping
 */

import { NextResponse } from 'next/server'

export async function GET() {
  const isProd = process.env.NODE_ENV === 'production'
  const allowPublicTests = process.env.ALLOW_PUBLIC_TEST_ENDPOINTS === 'true'
  if (isProd && !allowPublicTests) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  // Test 1: Check if we can reach the Kimi API base URL
  try {
    const response = await fetch('https://api.moonshot.cn/v1/models', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.KIMI_API_KEY || ''}`,
      },
    })

    return NextResponse.json({
      status: 'ok',
      kimiApiReachable: response.ok,
      kimiApiStatus: response.status,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json(
      {
        status: 'error',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    )
  }
}
