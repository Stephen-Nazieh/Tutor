/**
 * Achievements API (Drizzle ORM)
 * GET /api/achievements — all achievements (withAuth)
 * POST /api/achievements — check and award new achievements (withAuth + CSRF)
 */

import { NextRequest, NextResponse } from 'next/server'
import type { Session } from 'next-auth'
import { and, desc, eq, sql } from 'drizzle-orm'
import { withAuth, requireCsrf } from '@/lib/api/middleware'
import { drizzleDb } from '@/lib/db/drizzle'
import { achievement, bookmark, contentProgress } from '@/lib/db/schema'

const ACHIEVEMENTS = {
  FIRST_LESSON: {
    title: 'First Steps',
    description: 'Completed your first lesson',
    xpAwarded: 50,
  },
  QUIZ_MASTER: {
    title: 'Quiz Master',
    description: 'Scored 100% on 5 quizzes',
    xpAwarded: 100,
  },
  STUDY_STREAK_7: {
    title: 'Week Warrior',
    description: 'Studied 7 days in a row',
    xpAwarded: 75,
  },
  NOTE_TAKER: {
    title: 'Note Taker',
    description: 'Created 10 notes',
    xpAwarded: 30,
  },
  BOOKMARK_COLLECTOR: {
    title: 'Collector',
    description: 'Bookmarked 5 lessons',
    xpAwarded: 25,
  },
}

async function getHandler(_req: NextRequest, session: Session) {
  try {
    const achievements = await drizzleDb
      .select()
      .from(achievement)
      .where(eq(achievement.userId, session.user.id))
      .orderBy(desc(achievement.unlockedAt))
    return NextResponse.json({ achievements })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch achievements' },
      { status: 500 }
    )
  }
}

async function postHandler(req: NextRequest, session: Session) {
  const csrfError = await requireCsrf(req)
  if (csrfError) return csrfError

  try {
    const newAchievements: { id: string; userId: string; type: string; title: string; description: string; unlockedAt: Date; xpAwarded: number }[] = []

    const [completedRow] = await drizzleDb
      .select({ count: sql<number>`count(*)::int` })
      .from(contentProgress)
      .where(
        and(
          eq(contentProgress.studentId, session.user.id),
          eq(contentProgress.completed, true)
        )
      )
    const completedLessons = completedRow?.count ?? 0

    if (completedLessons >= 1) {
      const [existing] = await drizzleDb
        .select()
        .from(achievement)
        .where(
          and(
            eq(achievement.userId, session.user.id),
            eq(achievement.type, 'FIRST_LESSON')
          )
        )
        .limit(1)
      if (!existing) {
        const [created] = await drizzleDb
          .insert(achievement)
          .values({
            id: crypto.randomUUID(),
            userId: session.user.id,
            type: 'FIRST_LESSON',
            ...ACHIEVEMENTS.FIRST_LESSON,
          })
          .returning()
        if (created) newAchievements.push(created)
      }
    }

    const [bookmarkRow] = await drizzleDb
      .select({ count: sql<number>`count(*)::int` })
      .from(bookmark)
      .where(eq(bookmark.studentId, session.user.id))
    const bookmarkCount = bookmarkRow?.count ?? 0

    if (bookmarkCount >= 5) {
      const [existing] = await drizzleDb
        .select()
        .from(achievement)
        .where(
          and(
            eq(achievement.userId, session.user.id),
            eq(achievement.type, 'BOOKMARK_COLLECTOR')
          )
        )
        .limit(1)
      if (!existing) {
        const [created] = await drizzleDb
          .insert(achievement)
          .values({
            id: crypto.randomUUID(),
            userId: session.user.id,
            type: 'BOOKMARK_COLLECTOR',
            ...ACHIEVEMENTS.BOOKMARK_COLLECTOR,
          })
          .returning()
        if (created) newAchievements.push(created)
      }
    }

    return NextResponse.json({
      newAchievements,
      message: newAchievements.length > 0 ? 'New achievements earned!' : 'No new achievements',
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to check achievements' }, { status: 500 })
  }
}

export const GET = withAuth(getHandler)
export const POST = withAuth(postHandler)
