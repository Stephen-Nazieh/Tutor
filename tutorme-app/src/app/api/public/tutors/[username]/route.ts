import { NextRequest, NextResponse } from 'next/server'
import { and, desc, eq, inArray } from 'drizzle-orm'
import { drizzleDb } from '@/lib/db/drizzle'
import {
  user,
  profile,
  curriculum,
  curriculumModule,
  curriculumLesson,
  curriculumEnrollment,
} from '@/lib/db/schema'
import { findMockTutorByUsername, shouldUseMockPublicTutors } from '@/lib/public/mock-tutors'

function normalizeUsername(value: string): string {
  return value
    .trim()
    .replace(/^@+/, '')
    .toLowerCase()
}

function getUsername(req: NextRequest): string {
  const parts = req.nextUrl.pathname.split('/')
  const idx = parts.lastIndexOf('tutors')
  return normalizeUsername(parts[idx + 1] || '')
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
      bio: profile.bio,
      avatarUrl: profile.avatarUrl,
      specialties: profile.specialties,
      credentials: profile.credentials,
      hourlyRate: profile.hourlyRate,
    })
    .from(user)
    .innerJoin(profile, eq(profile.userId, user.id))
    .where(and(eq(user.role, 'TUTOR'), eq(profile.username, username)))
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
            bio: mockTutor.bio,
            avatarUrl: mockTutor.avatarUrl,
            specialties: mockTutor.specialties,
            credentials: mockTutor.credentials,
            hourlyRate: mockTutor.hourlyRate,
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
            moduleCount: course.moduleCount,
            lessonCount: course.lessonCount,
            updatedAt: course.updatedAt,
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
  const moduleCounts = new Map<string, number>()
  const enrollmentCounts = new Map<string, number>()
  const lessonCountsByModule = new Map<string, number>()
  let modules: { curriculumId: string; id: string }[] = []

  if (curriculumIds.length > 0) {
    modules = await drizzleDb
      .select({ curriculumId: curriculumModule.curriculumId, id: curriculumModule.id })
      .from(curriculumModule)
      .where(inArray(curriculumModule.curriculumId, curriculumIds))
    for (const m of modules) {
      moduleCounts.set(m.curriculumId, (moduleCounts.get(m.curriculumId) ?? 0) + 1)
    }
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
    return {
      id: course.id,
      name: course.name,
      description: course.description,
      subject: course.subject,
      gradeLevel: course.gradeLevel,
      difficulty: course.difficulty,
      estimatedHours: course.estimatedHours,
      enrollmentCount: enrollmentCounts.get(course.id) ?? 0,
      moduleCount: moduleCounts.get(course.id) ?? 0,
      lessonCount,
      updatedAt: course.updatedAt,
    }
  })

  return NextResponse.json({
    tutor: {
      id: tutorRow.id,
      name: tutorRow.name ?? 'Tutor',
      username: tutorRow.username ?? username,
      bio: tutorRow.bio ?? '',
      avatarUrl: tutorRow.avatarUrl ?? null,
      specialties: tutorRow.specialties ?? [],
      credentials: tutorRow.credentials ?? '',
      hourlyRate: tutorRow.hourlyRate ?? null,
    },
    courses,
    source: 'db',
  })
}
