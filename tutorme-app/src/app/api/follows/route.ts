import { NextRequest, NextResponse } from 'next/server'
import { and, eq, sql } from 'drizzle-orm'
import { withAuth, withCsrf } from '@/lib/api/middleware'
import { drizzleDb } from '@/lib/db/drizzle'
import { tutorFollow, user } from '@/lib/db/schema'

function normalizeRole(value: unknown): string {
  return typeof value === 'string' ? value.trim().toUpperCase() : ''
}

export const GET = withAuth(async (req, session) => {
  const tutorId = req.nextUrl.searchParams.get('tutorId')
  if (!tutorId) {
    return NextResponse.json({ error: 'tutorId is required' }, { status: 400 })
  }

  const [countRow] = await drizzleDb
    .select({ count: sql<number>`count(*)` })
    .from(tutorFollow)
    .where(eq(tutorFollow.tutorId, tutorId))

  const followerCount = Number(countRow?.count ?? 0)
  const viewerId = session?.user?.id
  if (!viewerId) {
    return NextResponse.json({ isFollowing: false, followerCount })
  }

  const [existing] = await drizzleDb
    .select({ id: tutorFollow.id })
    .from(tutorFollow)
    .where(and(eq(tutorFollow.followerId, viewerId), eq(tutorFollow.tutorId, tutorId)))
    .limit(1)

  return NextResponse.json({ isFollowing: Boolean(existing), followerCount })
}, { optional: true })

export const POST = withCsrf(withAuth(async (req, session) => {
  const body = await req.json().catch(() => ({}))
  const tutorId = typeof body?.tutorId === 'string' ? body.tutorId : ''
  if (!tutorId) {
    return NextResponse.json({ error: 'tutorId is required' }, { status: 400 })
  }

  const followerId = session.user.id
  if (tutorId === followerId) {
    return NextResponse.json({ error: 'Cannot follow yourself' }, { status: 400 })
  }

  const [target] = await drizzleDb
    .select({ id: user.id, role: user.role })
    .from(user)
    .where(eq(user.id, tutorId))
    .limit(1)

  if (!target || normalizeRole(target.role) !== 'TUTOR') {
    return NextResponse.json({ error: 'You can only follow tutors' }, { status: 403 })
  }

  const followerRole = normalizeRole(session.user.role)
  if (followerRole !== 'STUDENT' && followerRole !== 'TUTOR') {
    return NextResponse.json({ error: 'Only students or tutors can follow tutors' }, { status: 403 })
  }

  await drizzleDb
    .insert(tutorFollow)
    .values({ followerId, tutorId })
    .onConflictDoNothing()

  const [countRow] = await drizzleDb
    .select({ count: sql<number>`count(*)` })
    .from(tutorFollow)
    .where(eq(tutorFollow.tutorId, tutorId))

  return NextResponse.json({
    isFollowing: true,
    followerCount: Number(countRow?.count ?? 0),
  })
}))

export const DELETE = withCsrf(withAuth(async (req, session) => {
  const body = await req.json().catch(() => ({}))
  const tutorId = typeof body?.tutorId === 'string' ? body.tutorId : ''
  if (!tutorId) {
    return NextResponse.json({ error: 'tutorId is required' }, { status: 400 })
  }

  const followerId = session.user.id
  await drizzleDb
    .delete(tutorFollow)
    .where(and(eq(tutorFollow.followerId, followerId), eq(tutorFollow.tutorId, tutorId)))

  const [countRow] = await drizzleDb
    .select({ count: sql<number>`count(*)` })
    .from(tutorFollow)
    .where(eq(tutorFollow.tutorId, tutorId))

  return NextResponse.json({
    isFollowing: false,
    followerCount: Number(countRow?.count ?? 0),
  })
}))
