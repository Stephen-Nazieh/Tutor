import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
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

  const tutor = await db.user.findFirst({
    where: {
      role: 'TUTOR',
      profile: { username },
    },
    select: {
      id: true,
      profile: {
        select: {
          name: true,
          username: true,
          bio: true,
          avatarUrl: true,
          specialties: true,
          credentials: true,
          hourlyRate: true,
        },
      },
      createdCurricula: {
        where: { isPublished: true },
        include: {
          _count: { select: { modules: true, enrollments: true } },
          modules: {
            select: { _count: { select: { lessons: true } } },
          },
        },
        orderBy: { updatedAt: 'desc' },
        take: 100,
      },
    },
  })

  if (!tutor) {
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
          courses: mockTutor.courses.map((course) => ({
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

  const courses = tutor.createdCurricula.map((course) => ({
    id: course.id,
    name: course.name,
    description: course.description,
    subject: course.subject,
    gradeLevel: course.gradeLevel,
    difficulty: course.difficulty,
    estimatedHours: course.estimatedHours,
    enrollmentCount: course._count.enrollments,
    moduleCount: course._count.modules,
    lessonCount: course.modules.reduce((sum, mod) => sum + mod._count.lessons, 0),
    updatedAt: course.updatedAt,
  }))

  return NextResponse.json({
    tutor: {
      id: tutor.id,
      name: tutor.profile?.name || 'Tutor',
      username: tutor.profile?.username || username,
      bio: tutor.profile?.bio || '',
      avatarUrl: tutor.profile?.avatarUrl || null,
      specialties: tutor.profile?.specialties || [],
      credentials: tutor.profile?.credentials || '',
      hourlyRate: tutor.profile?.hourlyRate || null,
    },
    courses,
    source: 'db',
  })
}
