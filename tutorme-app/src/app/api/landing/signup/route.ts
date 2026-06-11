import { NextRequest, NextResponse } from 'next/server'
import { drizzleDb } from '@/lib/db/drizzle'
import { landingSignup } from '@/lib/db/schema'
import { withRateLimitPreset } from '@/lib/api/middleware'
import { z } from 'zod'
import crypto from 'crypto'
import { sendTutorSignupEmail } from '@/lib/email'

const landingSignupSchema = z.strictObject({
  username: z.string().trim().min(1).max(80),
  bio: z.string().trim().max(1000).optional().nullable(),
  country: z.string().trim().max(120).optional().nullable(),
  photo: z.string().trim().url().max(2048).optional().nullable(),
  isVerified: z.boolean().optional(),
})

export async function POST(req: NextRequest) {
  try {
    const { response: rateLimitResponse } = await withRateLimitPreset(req, 'register')
    if (rateLimitResponse) return rateLimitResponse

    let body: unknown
    try {
      body = await req.json()
    } catch {
      return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
    }

    const parsed = landingSignupSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid signup data', details: parsed.error.issues },
        { status: 400 }
      )
    }

    const { username, bio, country, photo } = parsed.data

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
