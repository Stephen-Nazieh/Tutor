/**
 * DataLoader-style batch loading with Drizzle (N+1 prevention).
 * Legacy clinic/gamification loaders removed.
 */

import { inArray, and } from 'drizzle-orm'
import { drizzleDb } from './drizzle'
import { cache } from './index'
import { user, profile, contentProgress, aITutorEnrollment } from '@/lib/db/schema'

export async function batchLoadUsers(userIds: string[]) {
  const cacheKey = `users:${[...userIds].sort().join(',')}`
  return cache.getOrSet(
    cacheKey,
    async () => {
      if (userIds.length === 0) return []
      const users = await drizzleDb.select().from(user).where(inArray(user.userId, userIds))
      const profiles =
        users.length > 0
          ? await drizzleDb
              .select()
              .from(profile)
              .where(
                inArray(
                  profile.userId,
                  users.map(u => u.userId)
                )
              )
          : []
      const profileMap = new Map(profiles.map(p => [p.userId, p]))
      const userMap = new Map(
        users.map(u => [
          u.userId,
          {
            ...u,
            profile: profileMap.get(u.userId)
              ? {
                  name: profileMap.get(u.userId)!.name,
                  avatarUrl: profileMap.get(u.userId)!.avatarUrl,
                }
              : null,
          },
        ])
      )
      return userIds.map(id => userMap.get(id) ?? null)
    },
    300
  )
}

export async function batchLoadProfiles(userIds: string[]) {
  const cacheKey = `profiles:${[...userIds].sort().join(',')}`
  return cache.getOrSet(
    cacheKey,
    async () => {
      if (userIds.length === 0) return []
      const profiles = await drizzleDb
        .select()
        .from(profile)
        .where(inArray(profile.userId, userIds))
      const profileMap = new Map(profiles.map(p => [p.userId, p]))
      return userIds.map(id => profileMap.get(id) ?? null)
    },
    300
  )
}

export async function batchLoadContentProgress(keys: { userId: string; contentId: string }[]) {
  if (keys.length === 0) return []
  const userIds = [...new Set(keys.map(k => k.userId))]
  const contentIds = [...new Set(keys.map(k => k.contentId))]
  const cacheKey = `${userIds.join(',')}:${contentIds.join(',')}`

  return cache.getOrSet(
    `progress:${cacheKey}`,
    async () => {
      const progress = await drizzleDb
        .select()
        .from(contentProgress)
        .where(
          and(
            inArray(contentProgress.studentId, userIds),
            inArray(contentProgress.contentId, contentIds)
          )
        )
      const map = new Map(progress.map(p => [`${p.studentId}:${p.contentId}`, p]))
      return keys.map(key => map.get(`${key.userId}:${key.contentId}`) ?? null)
    },
    60
  )
}

export async function batchLoadClassesByTutor(tutorIds: string[]) {
  return tutorIds.map(() => [])
}

export async function batchLoadBookingsByClass(classIds: string[]) {
  return classIds.map(() => [])
}

export async function batchLoadGamification(userIds: string[]) {
  return userIds.map(() => null)
}

export async function batchLoadAchievements(userIds: string[]) {
  return userIds.map(() => [])
}

export async function batchLoadEnrollments(userIds: string[]) {
  const cacheKey = `enrollments:${[...userIds].sort().join(',')}`
  return cache.getOrSet(
    cacheKey,
    async () => {
      if (userIds.length === 0) return userIds.map(() => [])
      const enrollments = await drizzleDb
        .select()
        .from(aITutorEnrollment)
        .where(inArray(aITutorEnrollment.studentId, userIds))
      const grouped = new Map<string, typeof enrollments>()
      for (const e of enrollments) {
        if (!grouped.has(e.studentId)) grouped.set(e.studentId, [])
        grouped.get(e.studentId)!.push(e)
      }
      return userIds.map(id => grouped.get(id) ?? [])
    },
    120
  )
}
