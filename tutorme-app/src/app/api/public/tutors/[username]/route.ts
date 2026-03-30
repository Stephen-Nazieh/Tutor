import { NextRequest, NextResponse } from 'next/server'
import { and, desc, eq, inArray, isNotNull, or } from 'drizzle-orm'
import { drizzleDb } from '@/lib/db/drizzle'
import {
  user,
  profile,
  curriculum,
  curriculumModule,
  curriculumLesson,
  curriculumEnrollment,
  tutorApplication,
  liveSession,
} from '@/lib/db/schema'
import { findMockTutorByUsername, shouldUseMockPublicTutors } from '@/lib/public/mock-tutors'
import { normalizeHandle } from '@/lib/mentions/handles'

function formatScheduleSummary(schedule: unknown): string | null {
  if (!schedule || !Array.isArray(schedule) || schedule.length === 0) return null
  const parts = schedule.slice(0, 3).map((item: unknown) => {
    const row = item as { dayOfWeek?: string; startTime?: string }
    const day = typeof row?.dayOfWeek === 'string' ? row.dayOfWeek : ''
    const t = typeof row?.startTime === 'string' ? row.startTime : ''
    return [day, t].filter(Boolean).join(' ')
  })
  const head = parts.filter(Boolean).join(' · ')
  const more = schedule.length > 3 ? ` · +${schedule.length - 3} more` : ''
  return head ? `${head}${more}` : null
}

function enrollmentFromLiveStats(total: number, completed: number): 'ongoing' | 'ended' {
  if (total === 0) return 'ongoing'
  if (completed >= total) return 'ended'
  return 'ongoing'
}

function getUsername(req: NextRequest): string {
  const parts = req.nextUrl.pathname.split('/')
  const idx = parts.lastIndexOf('tutors')
  return normalizeHandle(parts[idx + 1] || '')
}

export async function GET(req: NextRequest) {
  const username = getUsername(req)
  if (!username) {
    return NextResponse.json({ error: 'Username is required' }, { status: 400 })
  }
  const useMock = shouldUseMockPublicTutors() || req.nextUrl.searchParams.get('mock') === '1'

  const [tutorRow] = await drizzleDb
    .select({
      id: user.id,
      name: profile.name,
      username: profile.username,
      handle: user.handle,
      bio: profile.bio,
      avatarUrl: profile.avatarUrl,
      specialties: profile.specialties,
      credentials: profile.credentials,
      hourlyRate: profile.hourlyRate,
      tutorSince: tutorApplication.createdAt,
      country: tutorApplication.countryOfResidence,
      socialLinks: tutorApplication.socialLinks,
      profileCreatedAt: profile.createdAt,
    })
    .from(user)
    .innerJoin(profile, eq(profile.userId, user.id))
    .leftJoin(tutorApplication, eq(tutorApplication.userId, user.id))
    .where(
      and(
        eq(user.role, 'TUTOR'),
        or(eq(user.handle, username), eq(profile.username, username))
      )
    )
    .limit(1)

  if (!tutorRow) {
    if (useMock) {
      const mockTutor = findMockTutorByUsername(username)
      if (mockTutor) {
        return NextResponse.json({
          tutor: {
            id: mockTutor.id,
            name: mockTutor.name,
            username: mockTutor.username,
            handle: mockTutor.username,
            bio: mockTutor.bio,
            avatarUrl: mockTutor.avatarUrl,
            specialties: mockTutor.specialties,
            credentials: mockTutor.credentials,
            hourlyRate: mockTutor.hourlyRate,
            tutorSince: null,
            country: null,
            activeCourses: mockTutor.courses.length,
            socialLinks: null,
          },
          courses: mockTutor.courses.map((course: any) => ({
            id: course.id,
            name: course.name,
            description: course.description,
            subject: course.subject,
            gradeLevel: course.gradeLevel,
            difficulty: course.difficulty,
            estimatedHours: course.estimatedHours,
            enrollmentCount: course.enrollmentCount,
            lessonCount: course.lessonCount,
            updatedAt: course.updatedAt,
            scheduleSummary: 'Mon/Wed/Fri · 19:00',
            liveSessionsTotal: Math.max(1, Math.floor(course.lessonCount / 4)),
            liveSessionsCompleted: 1,
            enrollmentStatus: 'ongoing' as const,
          })),
          source: 'mock',
        })
      }
    }
    return NextResponse.json({ error: 'Tutor not found' }, { status: 404 })
  }

  const publishedCurricula = await drizzleDb
    .select()
    .from(curriculum)
    .where(and(eq(curriculum.creatorId, tutorRow.id), eq(curriculum.isPublished, true)))
    .orderBy(desc(curriculum.updatedAt))
    .limit(100)

  const curriculumIds = publishedCurricula.map((c) => c.id)
  const enrollmentCounts = new Map<string, number>()
  const lessonCountsByModule = new Map<string, number>()
  let modules: { curriculumId: string; id: string }[] = []

  const sessionStats = new Map<string, { total: number; completed: number }>()
  if (curriculumIds.length > 0) {
    const sessionRows = await drizzleDb
      .select({
        curriculumId: liveSession.curriculumId,
        endedAt: liveSession.endedAt,
      })
      .from(liveSession)
      .where(
        and(isNotNull(liveSession.curriculumId), inArray(liveSession.curriculumId, curriculumIds))
      )
    for (const row of sessionRows) {
      const id = row.curriculumId as string
      const cur = sessionStats.get(id) ?? { total: 0, completed: 0 }
      cur.total += 1
      if (row.endedAt != null) cur.completed += 1
      sessionStats.set(id, cur)
    }
  }

  if (curriculumIds.length > 0) {
    modules = await drizzleDb
      .select({ curriculumId: curriculumModule.curriculumId, id: curriculumModule.id })
      .from(curriculumModule)
      .where(inArray(curriculumModule.curriculumId, curriculumIds))
    const enrollments = await drizzleDb
      .select({ curriculumId: curriculumEnrollment.curriculumId })
      .from(curriculumEnrollment)
      .where(inArray(curriculumEnrollment.curriculumId, curriculumIds))
    for (const e of enrollments) {
      enrollmentCounts.set(e.curriculumId, (enrollmentCounts.get(e.curriculumId) ?? 0) + 1)
    }
    const lessons = await drizzleDb
      .select({ moduleId: curriculumLesson.moduleId })
      .from(curriculumLesson)
      .where(inArray(curriculumLesson.moduleId, modules.map((m) => m.id)))
    for (const l of lessons) {
      lessonCountsByModule.set(l.moduleId, (lessonCountsByModule.get(l.moduleId) ?? 0) + 1)
    }
  }

  const courses = publishedCurricula.map((course) => {
    const modIds = modules.filter((m) => m.curriculumId === course.id).map((m) => m.id)
    const lessonCount = modIds.reduce((s, mid) => s + (lessonCountsByModule.get(mid) ?? 0), 0)
    const live = sessionStats.get(course.id) ?? { total: 0, completed: 0 }
    const scheduleSummary = formatScheduleSummary(course.schedule)
    return {
      id: course.id,
      name: course.name,
      description: course.description,
      subject: course.subject,
      gradeLevel: course.gradeLevel,
      difficulty: course.difficulty,
      estimatedHours: course.estimatedHours,
      enrollmentCount: enrollmentCounts.get(course.id) ?? 0,
      lessonCount,
      updatedAt: course.updatedAt,
      scheduleSummary,
      liveSessionsTotal: live.total,
      liveSessionsCompleted: live.completed,
      enrollmentStatus: enrollmentFromLiveStats(live.total, live.completed),
    }
  })

  return NextResponse.json({
    tutor: {
      id: tutorRow.id,
      name: tutorRow.name ?? 'Tutor',
      username: tutorRow.username ?? username,
      handle: tutorRow.handle ?? tutorRow.username ?? username,
      bio: tutorRow.bio ?? '',
      avatarUrl: tutorRow.avatarUrl ?? null,
      specialties: tutorRow.specialties ?? [],
      credentials: tutorRow.credentials ?? '',
      hourlyRate: tutorRow.hourlyRate ?? null,
      tutorSince: tutorRow.tutorSince ?? tutorRow.profileCreatedAt ?? null,
      country: tutorRow.country ?? null,
      activeCourses: courses.length,
      socialLinks: tutorRow.socialLinks ?? null,
    },
    courses,
    source: 'db',
  })
}
