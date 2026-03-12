import { NextRequest, NextResponse } from 'next/server'
import { drizzleDb } from '@/lib/db/drizzle'
import { landingSignup } from '@/lib/db/schema'
import crypto from 'crypto'
import { sendTutorSignupEmail } from '@/lib/email'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { username, bio, country, photo } = body

    if (!username) {
      return NextResponse.json({ error: 'Username is required' }, { status: 400 })
    }

    await drizzleDb.insert(landingSignup).values({
      id: crypto.randomUUID(),
      username,
      bio: bio || null,
      country: country || null,
      photo: photo || null,
    })

    // Send email notification
    try {
      await sendTutorSignupEmail({ username, bio, country })
    } catch (emailErr) {
      console.error('Failed to send tutor signup email:', emailErr)
    }

    return NextResponse.json({ success: true, message: 'Signup collected successfully' })
  } catch (error) {
    console.error('Failed to save landing signup:', error)
    return NextResponse.json({ error: 'Failed to process signup' }, { status: 500 })
  }
}
