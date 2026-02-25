import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/lib/api/middleware'
import { db } from '@/lib/db'
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
    const existing = await db.profile.findFirst({
      where: { username: candidate, userId: { not: tutorId } },
      select: { id: true },
    })
    if (!existing) return candidate
  }
  return `tutor${nanoid(8).toLowerCase()}`
}

export const GET = withAuth(async (_req: NextRequest, session) => {
  const tutorId = session.user.id
  const user = await db.user.findUnique({
    where: { id: tutorId },
    include: {
      profile: {
        select: { name: true, username: true, bio: true, avatarUrl: true, specialties: true, credentials: true, hourlyRate: true },
      },
      createdCurricula: {
        where: { isPublished: true },
        select: { id: true, name: true, description: true, subject: true, gradeLevel: true, difficulty: true, updatedAt: true },
        orderBy: { updatedAt: 'desc' },
        take: 50,
      },
    },
  })

  if (!user || user.role !== 'TUTOR') {
    return NextResponse.json({ error: 'Tutor not found' }, { status: 404 })
  }

  return NextResponse.json({
    profile: {
      name: user.profile?.name || user.email.split('@')[0],
      username: user.profile?.username || null,
      bio: user.profile?.bio || '',
      avatarUrl: user.profile?.avatarUrl || null,
      specialties: user.profile?.specialties || [],
      credentials: user.profile?.credentials || '',
      hourlyRate: user.profile?.hourlyRate || null,
    },
    courses: user.createdCurricula,
  })
}, { role: 'TUTOR' })

export const PATCH = withAuth(async (req: NextRequest, session) => {
  const tutorId = session.user.id
  const body = await req.json().catch(() => ({}))
  const requestedUsername = typeof body?.username === 'string' ? body.username : ''
  const bio = typeof body?.bio === 'string' ? body.bio.trim().slice(0, 5000) : undefined
  let normalized = normalizeUsername(requestedUsername)

  const profile = await db.profile.findUnique({
    where: { userId: tutorId },
    select: { id: true, userId: true, name: true },
  })
  if (!profile) {
    return NextResponse.json({ error: 'Profile not found' }, { status: 404 })
  }

  // Keep username assignment low-friction: if omitted, auto-generate one.
  if (!normalized || normalized.length < 3) {
    normalized = await generateUniqueUsername(profile.name || session.user.email || 'tutor', tutorId)
  }

  const existing = await db.profile.findFirst({
    where: {
      username: normalized,
      userId: { not: tutorId },
    },
    select: { id: true },
  })
  if (existing) {
    return NextResponse.json({ error: 'Username already taken' }, { status: 409 })
  }

  const updated = await db.profile.update({
    where: { userId: tutorId },
    data: {
      username: normalized,
      ...(bio !== undefined ? { bio } : {}),
    },
    select: { username: true, bio: true },
  })

  return NextResponse.json({ success: true, profile: updated })
}, { role: 'TUTOR' })
