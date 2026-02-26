import { NextRequest, NextResponse } from 'next/server'
import { eq, and, ne, desc } from 'drizzle-orm'
import { withAuth } from '@/lib/api/middleware'
import { drizzleDb } from '@/lib/db/drizzle'
import { user, profile, curriculum } from '@/lib/db/schema'
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

async function generateUniqueUsername(preferredSeed: string, tutorId: string): Promise<string> {
  const seed = normalizeUsername(preferredSeed) || `tutor${nanoid(6).toLowerCase()}`
  const base = seed.slice(0, 24)
  for (let attempt = 0; attempt < 20; attempt += 1) {
    const suffix = attempt === 0 ? '' : String(Math.floor(Math.random() * 9000) + 1000)
    const candidate = `${base}${suffix}`.slice(0, 30)
    const [existing] = await drizzleDb
      .select({ id: profile.id })
      .from(profile)
      .where(and(eq(profile.username, candidate), ne(profile.userId, tutorId)))
      .limit(1)
    if (!existing) return candidate
  }
  return `tutor${nanoid(8).toLowerCase()}`
}

export const GET = withAuth(async (_req: NextRequest, session) => {
  const tutorId = session.user.id

  const [userRow] = await drizzleDb
    .select({ id: user.id, email: user.email, role: user.role })
    .from(user)
    .where(eq(user.id, tutorId))
    .limit(1)

  if (!userRow || userRow.role !== 'TUTOR') {
    return NextResponse.json({ error: 'Tutor not found' }, { status: 404 })
  }

  const [prof] = await drizzleDb
    .select({
      name: profile.name,
      username: profile.username,
      bio: profile.bio,
      avatarUrl: profile.avatarUrl,
      specialties: profile.specialties,
      credentials: profile.credentials,
      hourlyRate: profile.hourlyRate,
    })
    .from(profile)
    .where(eq(profile.userId, tutorId))
    .limit(1)

  const courses = await drizzleDb
    .select({
      id: curriculum.id,
      name: curriculum.name,
      description: curriculum.description,
      subject: curriculum.subject,
      gradeLevel: curriculum.gradeLevel,
      difficulty: curriculum.difficulty,
      updatedAt: curriculum.updatedAt,
    })
    .from(curriculum)
    .where(and(eq(curriculum.creatorId, tutorId), eq(curriculum.isPublished, true)))
    .orderBy(desc(curriculum.updatedAt))
    .limit(50)

  return NextResponse.json({
    profile: {
      name: prof?.name || userRow.email.split('@')[0],
      username: prof?.username ?? null,
      bio: prof?.bio ?? '',
      avatarUrl: prof?.avatarUrl ?? null,
      specialties: prof?.specialties ?? [],
      credentials: prof?.credentials ?? '',
      hourlyRate: prof?.hourlyRate ?? null,
    },
    courses,
  })
}, { role: 'TUTOR' })

export const PATCH = withAuth(async (req: NextRequest, session) => {
  const tutorId = session.user.id
  const body = await req.json().catch(() => ({}))
  const requestedUsername = typeof body?.username === 'string' ? body.username : ''
  const bio = typeof body?.bio === 'string' ? body.bio.trim().slice(0, 5000) : undefined
  let normalized = normalizeUsername(requestedUsername)

  const [prof] = await drizzleDb
    .select({ id: profile.id, userId: profile.userId, name: profile.name })
    .from(profile)
    .where(eq(profile.userId, tutorId))
    .limit(1)

  if (!prof) {
    return NextResponse.json({ error: 'Profile not found' }, { status: 404 })
  }

  if (!normalized || normalized.length < 3) {
    normalized = await generateUniqueUsername(prof.name || session.user.email || 'tutor', tutorId)
  }

  const [existing] = await drizzleDb
    .select({ id: profile.id })
    .from(profile)
    .where(and(eq(profile.username, normalized), ne(profile.userId, tutorId)))
    .limit(1)

  if (existing) {
    return NextResponse.json({ error: 'Username already taken' }, { status: 409 })
  }

  const setPayload: { username: string; bio?: string } = { username: normalized }
  if (bio !== undefined) setPayload.bio = bio

  const [updated] = await drizzleDb
    .update(profile)
    .set(setPayload)
    .where(eq(profile.userId, tutorId))
    .returning()

  return NextResponse.json({
    success: true,
    profile: updated
      ? { username: updated.username, bio: updated.bio }
      : { username: normalized, bio: bio ?? null },
  })
}, { role: 'TUTOR' })
