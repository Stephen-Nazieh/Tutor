/**
 * GET /api/curriculums/[curriculumId]
 * Returns one published curriculum for student-facing detail/enroll page.
 * When the request is authenticated, includes enrolled: true if the user is enrolled.
 */

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ curriculumId: string }> }
) {
  const { curriculumId } = await params

  const curriculum = await db.curriculum.findFirst({
    where: {
      id: curriculumId,
      isPublished: true
    },
    include: {
      _count: { select: { modules: true, enrollments: true } },
      modules: {
        include: {
          _count: { select: { lessons: true } }
        }
      },
      creator: {
        select: {
          id: true,
          email: true,
          profile: {
            select: {
              name: true,
              bio: true
            }
          }
        }
      }
    }
  })

  if (!curriculum) {
    return NextResponse.json({ error: 'Curriculum not found' }, { status: 404 })
  }

  const totalLessons = curriculum.modules.reduce(
    (sum: number, m: { _count?: { lessons?: number } }) => sum + (m._count?.lessons ?? 0),
    0
  )

  let enrolled = false
  const session = await getServerSession(authOptions)
  if (session?.user?.id) {
    const progress = await db.curriculumProgress.findUnique({
      where: {
        studentId_curriculumId: { studentId: session.user.id, curriculumId }
      }
    })
    enrolled = !!progress
  }

  return NextResponse.json({
    id: curriculum.id,
    name: curriculum.name,
    subject: curriculum.subject,
    description: curriculum.description,
    difficulty: curriculum.difficulty,
    estimatedHours: curriculum.estimatedHours,
    price: curriculum.price,
    currency: curriculum.currency,
    gradeLevel: curriculum.gradeLevel,
    languageOfInstruction: curriculum.languageOfInstruction,
    schedule: curriculum.schedule,
    isLiveOnline: curriculum.isLiveOnline,
    modulesCount: curriculum._count.modules,
    lessonsCount: totalLessons,
    studentCount: curriculum._count.enrollments,
    enrolled,
    creator: curriculum.creator
      ? {
          id: curriculum.creator.id,
          name: curriculum.creator.profile?.name ?? curriculum.creator.email ?? 'Tutor',
          bio: curriculum.creator.profile?.bio ?? null
        }
      : null
  })
}
