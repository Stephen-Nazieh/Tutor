import { NextResponse } from 'next/server'
import { eq } from 'drizzle-orm'
import { withAuth } from '@/lib/api/middleware'
import { drizzleDb } from '@/lib/db/drizzle'
import { tutorFollow, user, profile } from '@/lib/db/schema'

export const GET = withAuth(async (req, session) => {
  const viewerId = session.user.id

  const following = await drizzleDb
    .select({
      id: user.userId,
      name: profile.name,
      handle: user.handle,
      avatarUrl: profile.avatarUrl,
      bio: profile.bio,
    })
    .from(tutorFollow)
    .innerJoin(user, eq(tutorFollow.tutorId, user.userId))
    .leftJoin(profile, eq(user.userId, profile.userId))
    .where(eq(tutorFollow.followerId, viewerId))
    .orderBy(tutorFollow.createdAt)

  return NextResponse.json({ following })
})
