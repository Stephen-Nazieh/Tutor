import { NextRequest, NextResponse } from 'next/server'
import { drizzleDb } from '@/lib/db/drizzle'
import { user } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function GET(request: NextRequest) {
  try {
    const emailParam = request.nextUrl.searchParams.get('email') || ''
    const normalized = emailParam.trim().toLowerCase()

    if (!normalized || !emailPattern.test(normalized)) {
      return NextResponse.json({ available: false, reason: 'invalid' })
    }

    const [existing] = await drizzleDb
      .select({ userId: user.userId })
      .from(user)
      .where(eq(user.email, normalized))
      .limit(1)

    if (existing) {
      return NextResponse.json({ available: false, reason: 'taken' })
    }

    return NextResponse.json({ available: true })
  } catch (error) {
    console.error('Email availability check failed:', error)
    return NextResponse.json({ available: false }, { status: 500 })
  }
}
