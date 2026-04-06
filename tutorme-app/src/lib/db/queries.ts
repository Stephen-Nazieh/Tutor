/**
 * Optimized Database Queries (Drizzle)
 * Legacy clinic/gamification queries removed.
 */

import { eq } from 'drizzle-orm'
import { drizzleDb } from './drizzle'
import { cache } from './index'
import cacheManager from '@/lib/cache-manager'
import { user, profile, contentItem, contentProgress } from '@/lib/db/schema'

// ==================== USER QUERIES ====================

export async function getUserById(userId: string) {
  return cache.getOrSet(
    `user:${userId}`,
    async () => {
      const [userRow] = await drizzleDb.select().from(user).where(eq(user.userId, userId)).limit(1)
      if (!userRow) return null
      const [profileRow] = await drizzleDb
        .select()
        .from(profile)
        .where(eq(profile.userId, userId))
        .limit(1)
      return {
        ...userRow,
        profile: profileRow
          ? {
              userId: profileRow.userId,
              name: profileRow.name,
              bio: profileRow.bio,
              avatarUrl: profileRow.avatarUrl,
              dateOfBirth: profileRow.dateOfBirth,
              timezone: profileRow.timezone,
              gradeLevel: profileRow.gradeLevel,
              subjectsOfInterest: profileRow.subjectsOfInterest,
              isOnboarded: profileRow.isOnboarded,
              hourlyRate: profileRow.hourlyRate,
              specialties: profileRow.specialties,
            }
          : null,
      }
    },
    300
  )
}

export async function getUserByEmail(email: string) {
  const [userRow] = await drizzleDb
    .select()
    .from(user)
    .where(eq(user.email, email.toLowerCase()))
    .limit(1)
  if (!userRow) return null
  const [profileRow] = await drizzleDb
    .select()
    .from(profile)
    .where(eq(profile.userId, userRow.userId))
    .limit(1)
  return {
    ...userRow,
    profile: profileRow ? { name: profileRow.name, avatarUrl: profileRow.avatarUrl } : null,
  }
}

// ==================== LEGACY REMOVALS ====================

export async function getTutorDashboardStats() {
  return {
    totalClasses: 0,
    upcomingClasses: 0,
    totalStudents: 0,
    recentClasses: [],
  }
}

export async function getTutorClasses() {
  return { classes: [], total: 0, hasMore: false }
}

export async function getStudentDashboardData() {
  return {
    enrollments: [],
    upcomingClasses: [],
    progress: null,
    gamification: null,
    achievements: [],
  }
}

export async function getStudentProgress() {
  return {
    courseProgress: [],
    lessonProgress: [],
  }
}

export async function getAvailableClasses() {
  return []
}

export async function getClassDetails() {
  return null
}

export async function getLeaderboard() {
  return []
}

export async function getContentLibrary() {
  const [items, progress] = await Promise.all([
    drizzleDb.select().from(contentItem),
    drizzleDb.select().from(contentProgress),
  ])
  const progressByContentId = new Map(progress.map(p => [p.contentId, p]))
  return items.map(item => ({
    ...item,
    progress: progressByContentId.get(item.contentId) ?? null,
  }))
}

export async function invalidateUserCache(userId: string) {
  await cacheManager.invalidateTag(`user:${userId}`)
}

export async function invalidateClassCache(classId: string) {
  await cacheManager.invalidateTag(`class:${classId}`)
}

export async function invalidateLeaderboardCache() {
  await cacheManager.invalidateTag('leaderboard')
}
