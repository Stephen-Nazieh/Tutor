import { NextRequest, NextResponse } from 'next/server'
import { and, desc, eq, inArray, isNotNull, or } from 'drizzle-orm'
import { drizzleDb } from '@/lib/db/drizzle'
import {
  user,
  profile,
  course,
  curriculumModule,
  courseLesson,
  courseEnrollment,
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
      userId: user.userId,
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
    .innerJoin(profile, eq(profile.userId, user.userId))
    .leftJoin(tutorApplication, eq(tutorApplication.userId, user.userId))
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

  const publishedCourses = await drizzleDb
    .select()
    .from(course)
    .where(and(eq(course.creatorId, tutorRow.userId), eq(course.isPublished, true)))
    .orderBy(desc(course.updatedAt))
    .limit(100)

  const courseIds = publishedCourses.map((c) => c.courseId)
  const enrollmentCounts = new Map<string, number>()
  const lessonCountsByModule = new Map<string, number>()
  let modules: { courseId: string; moduleId: string }[] = []

  const sessionStats = new Map<string, { total: number; completed: number }>()
  if (courseIds.length > 0) {
    const sessionRows = await drizzleDb
      .select({
        courseId: liveSession.courseId,
        endedAt: liveSession.endedAt,
      })
      .from(liveSession)
      .where(
        and(isNotNull(liveSession.courseId), inArray(liveSession.courseId, courseIds))
      )
    for (const row of sessionRows) {
      const id = row.courseId as string
      const cur = sessionStats.get(id) ?? { total: 0, completed: 0 }
      cur.total += 1
      if (row.endedAt != null) cur.completed += 1
      sessionStats.set(id, cur)
    }
  }

  if (courseIds.length > 0) {
    modules = await drizzleDb
      .select({ courseId: curriculumModule.curriculumId, moduleId: curriculumModule.moduleId })
      .from(curriculumModule)
      .where(inArray(curriculumModule.curriculumId, courseIds))
    const enrollments = await drizzleDb
      .select({ courseId: courseEnrollment.courseId })
      .from(courseEnrollment)
      .where(inArray(courseEnrollment.courseId, courseIds))
    for (const e of enrollments) {
      enrollmentCounts.set(e.courseId, (enrollmentCounts.get(e.courseId) ?? 0) + 1)
    }
    const lessons = await drizzleDb
      .select({ courseId: courseLesson.courseId })
      .from(courseLesson)
      .where(inArray(courseLesson.courseId, courseIds))
    for (const l of lessons) {
      if (l.courseId) {
        lessonCountsByModule.set(l.courseId, (lessonCountsByModule.get(l.courseId) ?? 0) + 1)
      }
    }
  }

  const courses = publishedCourses.map((courseRow) => {
    const lessonCount = lessonCountsByModule.get(courseRow.courseId) ?? 0
    const live = sessionStats.get(courseRow.courseId) ?? { total: 0, completed: 0 }
    const scheduleSummary = formatScheduleSummary(courseRow.schedule)
    return {
      courseId: courseRow.courseId,
      name: courseRow.name,
      description: courseRow.description,
      categories: courseRow.categories,
      enrollmentCount: enrollmentCounts.get(courseRow.courseId) ?? 0,
      lessonCount,
      updatedAt: courseRow.updatedAt,
      scheduleSummary,
      liveSessionsTotal: live.total,
      liveSessionsCompleted: live.completed,
      enrollmentStatus: enrollmentFromLiveStats(live.total, live.completed),
    }
  })

  return NextResponse.json({
    tutor: {
      id: tutorRow.userId,
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
