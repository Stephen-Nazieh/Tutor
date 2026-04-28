import { NextRequest, NextResponse } from 'next/server'
import { drizzleDb } from '@/lib/db/drizzle'
import { user } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { nanoid } from 'nanoid'
import { HANDLE_REGEX, isReservedHandle, normalizeHandle } from '@/lib/mentions/handles'

async function generateSuggestion(seed: string): Promise<string> {
  const base = normalizeHandle(seed).replace(/[^a-z0-9_]/g, '') || `tutor${nanoid(4).toLowerCase()}`
  for (let attempt = 0; attempt < 20; attempt += 1) {
    const suffix = attempt === 0 ? '' : String(Math.floor(Math.random() * 9000) + 1000)
    const candidate = `${base}${suffix}`.slice(0, 30)
    if (!HANDLE_REGEX.test(candidate) || isReservedHandle(candidate)) continue
    try {
      const [existing] = await drizzleDb
        .select({ userId: user.userId })
        .from(user)
        .where(eq(user.handle, candidate))
        .limit(1)
      if (!existing) return candidate
    } catch {
      // If DB check fails, return a random candidate
      return `tutor${nanoid(8).toLowerCase()}`.slice(0, 30)
    }
  }
  return `tutor${nanoid(8).toLowerCase()}`.slice(0, 30)
}

export async function GET(request: NextRequest) {
  try {
    const usernameParam = request.nextUrl.searchParams.get('username') || ''
    const normalized = normalizeHandle(usernameParam)

    if (!normalized || !HANDLE_REGEX.test(normalized) || isReservedHandle(normalized)) {
      return NextResponse.json({
        available: false,
        suggestion: await generateSuggestion(usernameParam),
      })
    }

    try {
      const [existing] = await drizzleDb
        .select({ userId: user.userId })
        .from(user)
        .where(eq(user.handle, normalized))
        .limit(1)

      if (existing) {
        return NextResponse.json({
          available: false,
          suggestion: await generateSuggestion(normalized),
        })
      }

      return NextResponse.json({ available: true, username: normalized })
    } catch (dbError) {
      console.error('Database error checking username:', dbError)
      return NextResponse.json(
        { error: 'Unable to check username availability. Please try again.' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Username availability check failed:', error)
    return NextResponse.json({ available: false }, { status: 500 })
  }
}
