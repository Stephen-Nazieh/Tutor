/**
 * DataLoader-style batch loading with Drizzle (N+1 prevention).
 */

import { eq, inArray, desc } from 'drizzle-orm'
import { drizzleDb } from './drizzle'
import { cache } from './index'
import {
  user,
  profile,
  clinic,
  clinicBooking,
  contentProgress,
  userGamification,
  achievement,
  aITutorEnrollment,
} from '@/lib/db/schema'

export async function batchLoadUsers(userIds: string[]) {
  const cacheKey = `users:${[...userIds].sort().join(',')}`
  return cache.getOrSet(
    cacheKey,
    async () => {
      if (userIds.length === 0) return []
      const users = await drizzleDb.select().from(user).where(inArray(user.id, userIds))
      const profiles =
        users.length > 0 ? await drizzleDb.select().from(profile).where(inArray(profile.userId, users.map((u) => u.id))) : []
      const profileMap = new Map(profiles.map((p) => [p.userId, p]))
      const userMap = new Map(
        users.map((u) => [
          u.id,
          {
            ...u,
            profile: profileMap.get(u.id)
              ? {
                  name: profileMap.get(u.id)!.name,
                  avatarUrl: profileMap.get(u.id)!.avatarUrl,
                  gradeLevel: profileMap.get(u.id)!.gradeLevel,
                }
              : null,
          },
        ])
      )
      return userIds.map((id) => userMap.get(id) ?? null)
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
      const profiles = await drizzleDb.select().from(profile).where(inArray(profile.userId, userIds))
      const profileMap = new Map(profiles.map((p) => [p.userId, p]))
      return userIds.map((id) => profileMap.get(id) ?? null)
    },
    300
  )
}

export async function batchLoadContentProgress(keys: { userId: string; contentId: string }[]) {
  if (keys.length === 0) return []
  const userIds = [...new Set(keys.map((k) => k.userId))]
  const contentIds = [...new Set(keys.map((k) => k.contentId))]
  const cacheKey = `${userIds.join(',')}:${contentIds.join(',')}`

  return cache.getOrSet(
    `progress:${cacheKey}`,
    async () => {
      const progress = await drizzleDb
        .select()
        .from(contentProgress)
        .where(inArray(contentProgress.studentId, userIds))
      const progressFiltered = progress.filter((p) => contentIds.includes(p.contentId))
      const map = new Map(progressFiltered.map((p) => [`${p.studentId}:${p.contentId}`, p]))
      return keys.map((key) => map.get(`${key.userId}:${key.contentId}`) ?? null)
    },
    60
  )
}

export async function batchLoadClassesByTutor(tutorIds: string[]) {
  const cacheKey = `classes:tutor:${[...tutorIds].sort().join(',')}`
  return cache.getOrSet(
    cacheKey,
    async () => {
      if (tutorIds.length === 0) return tutorIds.map(() => [])
      const classes = await drizzleDb
        .select()
        .from(clinic)
        .where(inArray(clinic.tutorId, tutorIds))
        .orderBy(desc(clinic.startTime))
        .limit(100 * tutorIds.length)
      const grouped = new Map<string, typeof classes>()
      for (const c of classes) {
        if (!grouped.has(c.tutorId)) grouped.set(c.tutorId, [])
        grouped.get(c.tutorId)!.push(c)
      }
      return tutorIds.map((id) => grouped.get(id) ?? [])
    },
    120
  )
}

export async function batchLoadBookingsByClass(classIds: string[]) {
  const cacheKey = `bookings:class:${[...classIds].sort().join(',')}`
  return cache.getOrSet(
    cacheKey,
    async () => {
      if (classIds.length === 0) return classIds.map(() => [])
      const bookings = await drizzleDb.select().from(clinicBooking).where(inArray(clinicBooking.clinicId, classIds))
      const studentIds = [...new Set(bookings.map((b) => b.studentId))]
      const profiles =
        studentIds.length > 0 ? await drizzleDb.select().from(profile).where(inArray(profile.userId, studentIds)) : []
      const profileMap = new Map(profiles.map((p) => [p.userId, p]))
      const users = studentIds.length > 0 ? await drizzleDb.select().from(user).where(inArray(user.id, studentIds)) : []
      const userMap = new Map(users.map((u) => [u.id, u]))
      type BookingWithStudent = (typeof bookings)[0] & {
        student: { id: string; email: string; profile: { name: string | null; avatarUrl: string | null } | null } | null
      }
      const grouped = new Map<string, BookingWithStudent[]>()
      for (const b of bookings) {
        if (!grouped.has(b.clinicId)) grouped.set(b.clinicId, [])
        const item: BookingWithStudent = {
          ...b,
          student: userMap.get(b.studentId)
            ? {
                id: b.studentId,
                email: userMap.get(b.studentId)!.email,
                profile: profileMap.get(b.studentId)
                  ? { name: profileMap.get(b.studentId)!.name, avatarUrl: profileMap.get(b.studentId)!.avatarUrl }
                  : null,
              }
            : null,
        }
        grouped.get(b.clinicId)!.push(item)
      }
      return classIds.map((id) => grouped.get(id) ?? [])
    },
    60
  )
}

export async function batchLoadGamification(userIds: string[]) {
  const cacheKey = `gamification:${[...userIds].sort().join(',')}`
  return cache.getOrSet(
    cacheKey,
    async () => {
      if (userIds.length === 0) return []
      const stats = await drizzleDb.select().from(userGamification).where(inArray(userGamification.userId, userIds))
      const statsMap = new Map(stats.map((s) => [s.userId, s]))
      return userIds.map((id) => statsMap.get(id) ?? null)
    },
    60
  )
}

export async function batchLoadAchievements(userIds: string[]) {
  const cacheKey = `achievements:${[...userIds].sort().join(',')}`
  return cache.getOrSet(
    cacheKey,
    async () => {
      if (userIds.length === 0) return userIds.map(() => [])
      const achievements = await drizzleDb
        .select()
        .from(achievement)
        .where(inArray(achievement.userId, userIds))
        .orderBy(desc(achievement.unlockedAt))
      const grouped = new Map<string, typeof achievements>()
      for (const a of achievements) {
        if (!grouped.has(a.userId)) grouped.set(a.userId, [])
        grouped.get(a.userId)!.push(a)
      }
      return userIds.map((id) => grouped.get(id) ?? [])
    },
    300
  )
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
      return userIds.map((id) => grouped.get(id) ?? [])
    },
    120
  )
}

export function createBatchLoader<T, K>(
  fetchFn: (ids: K[]) => Promise<T[]>,
  getId: (item: T) => K,
  cacheNamespace: string,
  ttlSeconds = 300
) {
  return async (ids: K[]): Promise<(T | null)[]> => {
    if (ids.length === 0) return []
    const uniqueIds = [...new Set(ids)]
    const cacheKey = `${cacheNamespace}:${[...uniqueIds].sort().join(',')}`
    return cache.getOrSet(
      cacheKey,
      async () => {
        const items = await fetchFn(uniqueIds)
        const itemMap = new Map(items.map((item) => [getId(item), item]))
        return ids.map((id) => itemMap.get(id) ?? null)
      },
      ttlSeconds
    )
  }
}

export const dataloaderCache = {
  async invalidateUser(userId: string) {
    await cache.invalidatePattern(`users:*${userId}*`)
    await cache.invalidatePattern(`profiles:*${userId}*`)
    await cache.invalidatePattern(`gamification:*${userId}*`)
    await cache.invalidatePattern(`achievements:*${userId}*`)
    await cache.invalidatePattern(`enrollments:*${userId}*`)
  },
  async invalidateClass(classId: string) {
    await cache.invalidatePattern(`classes:*${classId}*`)
    await cache.invalidatePattern(`bookings:*${classId}*`)
  },
  async invalidateContent(contentId: string) {
    await cache.invalidatePattern(`progress:*${contentId}*`)
  },
  async invalidateAll() {
    await cache.clear()
  },
}
