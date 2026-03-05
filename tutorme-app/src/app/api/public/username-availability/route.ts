import { NextRequest, NextResponse } from 'next/server'
import { drizzleDb } from '@/lib/db/drizzle'
import { profile } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { nanoid } from 'nanoid'

function normalizeUsername(value: string): string {
  return value
    .trim()
    .replace(/^@+/, '')
    .toLowerCase()
    .replace(/[^a-z0-9._]/g, '')
    .replace(/\.+/g, '.')
    .replace(/^\.|\.$/g, '')
    .slice(0, 30)
}

async function generateSuggestion(seed: string): Promise<string> {
  const base = normalizeUsername(seed) || `tutor${nanoid(4).toLowerCase()}`
  for (let attempt = 0; attempt < 12; attempt += 1) {
    const suffix = attempt === 0 ? '' : String(Math.floor(Math.random() * 9000) + 1000)
    const candidate = `${base}${suffix}`.slice(0, 30)
    const [existing] = await drizzleDb.select({ id: profile.id }).from(profile).where(eq(profile.username, candidate)).limit(1)
    if (!existing) return candidate
  }
  return `tutor${nanoid(8).toLowerCase()}`
}

export async function GET(request: NextRequest) {
  try {
    const usernameParam = request.nextUrl.searchParams.get('username') || ''
    const normalized = normalizeUsername(usernameParam)

    if (!normalized || normalized.length < 3) {
      return NextResponse.json({ available: false, suggestion: await generateSuggestion(usernameParam) })
    }

    const [existing] = await drizzleDb
      .select({ id: profile.id })
      .from(profile)
      .where(eq(profile.username, normalized))
      .limit(1)

    if (existing) {
      return NextResponse.json({ available: false, suggestion: await generateSuggestion(normalized) })
    }

    return NextResponse.json({ available: true, username: normalized })
  } catch (error) {
    console.error('Username availability check failed:', error)
    return NextResponse.json({ available: false }, { status: 500 })
  }
}
