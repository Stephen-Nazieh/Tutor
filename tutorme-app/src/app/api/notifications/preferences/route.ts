/**
 * Notification Preferences API
 *
 * GET  /api/notifications/preferences — Get current user's notification preferences
 * PUT  /api/notifications/preferences — Update notification preferences
 */

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'

export async function GET() {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = session.user.id

    // Get or create default preferences
    let prefs = await db.notificationPreference.findUnique({
        where: { userId },
    })

    if (!prefs) {
        prefs = await db.notificationPreference.create({
            data: { userId },
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

    const prefs = await db.notificationPreference.upsert({
        where: { userId },
        create: { userId, ...data },
        update: data,
    })

    return NextResponse.json({ success: true, preferences: prefs })
}
