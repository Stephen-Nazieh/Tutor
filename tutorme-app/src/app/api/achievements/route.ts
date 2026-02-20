/**
 * Achievements API
 * GET /api/achievements — all achievements (withAuth)
 * POST /api/achievements — check and award new achievements (withAuth + CSRF)
 */

import { NextRequest, NextResponse } from 'next/server'
import type { Session } from 'next-auth'
import { withAuth, requireCsrf } from '@/lib/api/middleware'
import { db } from '@/lib/db'

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
    const achievements = await db.achievement.findMany({
      where: { userId: session.user.id },
      orderBy: { unlockedAt: 'desc' },
    })
    return NextResponse.json({ achievements })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch achievements' }, { status: 500 })
  }
}

async function postHandler(req: NextRequest, session: Session) {
  const csrfError = await requireCsrf(req)
  if (csrfError) return csrfError

  try {
    const newAchievements = []

    const completedLessons = await db.contentProgress.count({
      where: {
        studentId: session.user.id,
        completed: true,
      },
    })

    if (completedLessons >= 1) {
      const existing = await db.achievement.findFirst({
        where: {
          userId: session.user.id,
          type: 'FIRST_LESSON',
        },
      })
      if (!existing) {
        const achievement = await db.achievement.create({
          data: {
            userId: session.user.id,
            type: 'FIRST_LESSON',
            ...ACHIEVEMENTS.FIRST_LESSON,
          },
        })
        newAchievements.push(achievement)
      }
    }

    const bookmarkCount = await db.bookmark.count({
      where: { studentId: session.user.id },
    })
    if (bookmarkCount >= 5) {
      const existing = await db.achievement.findFirst({
        where: {
          userId: session.user.id,
          type: 'BOOKMARK_COLLECTOR',
        },
      })
      if (!existing) {
        const achievement = await db.achievement.create({
          data: {
            userId: session.user.id,
            type: 'BOOKMARK_COLLECTOR',
            ...ACHIEVEMENTS.BOOKMARK_COLLECTOR,
          },
        })
        newAchievements.push(achievement)
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
