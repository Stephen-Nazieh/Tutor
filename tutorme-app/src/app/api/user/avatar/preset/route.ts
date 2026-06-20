/**
 * POST /api/user/avatar/preset
 *
 * Sets the current student's avatar to one of the preset avatars served from
 * `public/avatars/` (chosen via the gallery picker). Validates that the URL
 * points to a real file in that folder so an arbitrary URL can't be injected.
 * Body: { url: "/avatars/<file>" }
 */

import { NextRequest, NextResponse } from 'next/server'
import { eq } from 'drizzle-orm'
import { readdir } from 'fs/promises'
import path from 'path'

import { withAuth, withCsrf } from '@/lib/api/middleware'
import { drizzleDb } from '@/lib/db/drizzle'
import { cache } from '@/lib/db'
import { profile } from '@/lib/db/schema'

export const runtime = 'nodejs'

const PREFIX = '/avatars/'

export const POST = withCsrf(
  withAuth(
    async (req: NextRequest, session) => {
      const body = await req.json().catch(() => null)
      const url = typeof body?.url === 'string' ? body.url.trim() : ''

      if (!url.startsWith(PREFIX)) {
        return NextResponse.json({ error: 'Invalid avatar selection' }, { status: 400 })
      }
      const fileName = url.slice(PREFIX.length)
      // No path traversal / nested paths — must be a plain filename.
      if (!fileName || fileName.includes('/') || fileName.includes('..')) {
        return NextResponse.json({ error: 'Invalid avatar selection' }, { status: 400 })
      }

      // Must be a real preset currently available in public/avatars.
      const dir = path.join(process.cwd(), 'public', 'avatars')
      const files = await readdir(dir).catch(() => [] as string[])
      if (!files.includes(fileName)) {
        return NextResponse.json({ error: 'Unknown avatar' }, { status: 400 })
      }

      const [updated] = await drizzleDb
        .update(profile)
        .set({ avatarUrl: url })
        .where(eq(profile.userId, session.user.id))
        .returning({ avatarUrl: profile.avatarUrl })
      if (!updated) {
        return NextResponse.json({ error: 'Profile not found' }, { status: 404 })
      }

      // Invalidate cached user/profile data so the new avatar appears immediately.
      await cache.delete(`user:${session.user.id}`).catch(() => {})
      await cache.invalidatePattern(`profiles:*${session.user.id}*`).catch(() => {})
      await cache.invalidatePattern(`users:*${session.user.id}*`).catch(() => {})

      return NextResponse.json({ success: true, avatarUrl: updated.avatarUrl })
    },
    { role: 'STUDENT' }
  )
)
