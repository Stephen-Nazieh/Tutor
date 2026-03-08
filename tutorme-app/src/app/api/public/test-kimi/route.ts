/**
 * Test endpoint to verify Kimi API connectivity
 * GET /api/public/test-kimi
 */

import { NextResponse } from 'next/server'

const KIMI_BASE_URL = 'https://api.moonshot.cn/v1'
const DEFAULT_MODEL = 'kimi-k2.5'

export async function GET() {
  const apiKey = process.env.KIMI_API_KEY
  
  console.log('Test Kimi API - Key exists:', apiKey ? 'yes' : 'no')
  
  if (!apiKey) {
    return NextResponse.json({
      status: 'error',
      message: 'KIMI_API_KEY not configured',
      env: Object.keys(process.env).filter(k => k.includes('KIMI') || k.includes('API'))
    }, { status: 500 })
  }

  try {
    const response = await fetch(`${KIMI_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: DEFAULT_MODEL,
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: 'Say "Kimi API is working!" and nothing else.' }
        ],
        temperature: 1, // Kimi only accepts temperature=1
        max_tokens: 50,
      }),
    })

    console.log('Test Kimi API - Response status:', response.status)

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Test Kimi API - Error:', response.status, errorText)
      return NextResponse.json({
        status: 'error',
        httpStatus: response.status,
        error: errorText,
        keyPrefix: apiKey.substring(0, 10) + '...'
      }, { status: 500 })
    }

    const data = await response.json()
    console.log('Test Kimi API - Full response:', JSON.stringify(data).substring(0, 500))
    
    const aiResponse = data.choices?.[0]?.message?.content || data.choices?.[0]?.text || ''

    return NextResponse.json({
      status: 'success',
      response: aiResponse,
      fullChoice: data.choices?.[0],
      model: data.model,
      usage: data.usage,
      keyPrefix: apiKey.substring(0, 10) + '...'
    })

  } catch (error) {
    console.error('Test Kimi API - Exception:', error)
    return NextResponse.json({
      status: 'error',
      error: error instanceof Error ? error.message : 'Unknown error',
      keyPrefix: apiKey.substring(0, 10) + '...'
    }, { status: 500 })
  }
}
