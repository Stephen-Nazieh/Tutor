/**
 * Notification Preferences API (Drizzle ORM)
 *
 * GET  /api/notifications/preferences — Get current user's notification preferences
 * PUT  /api/notifications/preferences — Update notification preferences
 */

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { eq } from 'drizzle-orm'
import { authOptions } from '@/lib/auth'
import { drizzleDb } from '@/lib/db/drizzle'
import { notificationPreference } from '@/lib/db/schema'

const DEFAULT_PREFS = {
  emailEnabled: true,
  pushEnabled: true,
  inAppEnabled: true,
  channelOverrides: {},
  timezone: 'UTC',
  emailDigest: 'daily',
}

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const [prefs] = await drizzleDb
    .select()
    .from(notificationPreference)
    .where(eq(notificationPreference.userId, session.user.id))
    .limit(1)

  if (!prefs) {
    const [created] = await drizzleDb
      .insert(notificationPreference)
      .values({
        id: crypto.randomUUID(),
        userId: session.user.id,
        ...DEFAULT_PREFS,
        updatedAt: new Date(),
      })
      .returning()
    return NextResponse.json({
      success: true,
      preferences: created ?? { userId: session.user.id, ...DEFAULT_PREFS },
    })
  }

  return NextResponse.json({ success: true, preferences: prefs })
}

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const userId = session.user.id
  const body = await req.json()

  const {
    emailEnabled,
    pushEnabled,
    inAppEnabled,
    channelOverrides,
    quietHoursStart,
    quietHoursEnd,
    timezone,
    emailDigest,
  } = body

  const data: Record<string, unknown> = {}
  if (typeof emailEnabled === 'boolean') data.emailEnabled = emailEnabled
  if (typeof pushEnabled === 'boolean') data.pushEnabled = pushEnabled
  if (typeof inAppEnabled === 'boolean') data.inAppEnabled = inAppEnabled
  if (channelOverrides !== undefined) data.channelOverrides = channelOverrides
  if (quietHoursStart !== undefined) data.quietHoursStart = quietHoursStart
  if (quietHoursEnd !== undefined) data.quietHoursEnd = quietHoursEnd
  if (timezone) data.timezone = timezone
  if (emailDigest) data.emailDigest = emailDigest

  const [existing] = await drizzleDb
    .select()
    .from(notificationPreference)
    .where(eq(notificationPreference.userId, userId))
    .limit(1)

  if (existing) {
    const [updated] = await drizzleDb
      .update(notificationPreference)
      .set(data as Partial<typeof notificationPreference.$inferInsert>)
      .where(eq(notificationPreference.id, existing.id))
      .returning()
    return NextResponse.json({ success: true, preferences: updated ?? existing })
  }

  const [created] = await drizzleDb
    .insert(notificationPreference)
    .values({
      id: crypto.randomUUID(),
      userId,
      ...DEFAULT_PREFS,
      ...data,
      updatedAt: new Date(),
    })
    .returning()
  return NextResponse.json({ success: true, preferences: created! })
}
