import { NextRequest, NextResponse } from 'next/server'
import { drizzleDb } from '@/lib/db/drizzle'
import { landingInquiry } from '@/lib/db/schema'
import crypto from 'crypto'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, message } = body

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    await drizzleDb.insert(landingInquiry).values({
      id: crypto.randomUUID(),
      name,
      email,
      message,
    })

    return NextResponse.json({ success: true, message: 'Message sent successfully' })
  } catch (error) {
    console.error('Failed to save landing message:', error)
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
  }
}
