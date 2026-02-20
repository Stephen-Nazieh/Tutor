/**
 * Server-side enrollment logic (curriculum).
 * Used by POST /api/curriculum/[id]/enroll and by payment webhooks for course purchases.
 */

import { db } from '@/lib/db'

export async function enrollStudentInCurriculum(
  studentId: string,
  curriculumId: string
): Promise<{ enrolled: boolean; progress?: { id: string } }> {
  const curriculum = await db.curriculum.findUnique({
    where: { id: curriculumId },
    include: {
      modules: {
        include: { _count: { select: { lessons: true } } }
      }
    }
  })

  if (!curriculum) {
    throw new Error('Curriculum not found')
  }

  const totalLessons = curriculum.modules.reduce(
    (sum, m) => sum + (m._count?.lessons ?? 0),
    0
  )

  const existingProgress = await db.curriculumProgress.findUnique({
    where: {
      studentId_curriculumId: { studentId, curriculumId }
    }
  })

  if (existingProgress) {
    return { enrolled: false }
  }

  await db.curriculumEnrollment.upsert({
    where: {
      studentId_curriculumId: { studentId, curriculumId }
    },
    create: { studentId, curriculumId, lessonsCompleted: 0, enrollmentSource: 'signup' },
    update: { enrollmentSource: 'signup' }
  })

  const progress = await db.curriculumProgress.create({
    data: {
      studentId,
      curriculumId,
      lessonsCompleted: 0,
      totalLessons,
      startedAt: new Date()
    }
  })

  return { enrolled: true, progress: { id: progress.id } }
}
