/**
 * Curriculum Progress API
 * GET: Get student progress for a curriculum
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth, ValidationError, NotFoundError } from '@/lib/api/middleware'
import { getStudentProgress } from '@/lib/curriculum/lesson-controller'
import { db } from '@/lib/db'

export const GET = withAuth(async (req, session) => {
  const { searchParams } = new URL(req.url)
  const curriculumId = searchParams.get('curriculumId')

  if (!curriculumId) {
    throw new ValidationError('Curriculum ID is required')
  }

  // Get detailed progress
  const progress = await getStudentProgress(session.user.id, curriculumId)

  // Get curriculum with modules and lessons
  const curriculum = await db.curriculum.findUnique({
    where: { id: curriculumId },
    include: {
      modules: {
        orderBy: { order: 'asc' },
        include: {
          lessons: {
            orderBy: { order: 'asc' },
            include: {
              progressRecords: {
                where: { studentId: session.user.id }
              }
            }
          }
        }
      }
    }
  })

  if (!curriculum) {
    throw new NotFoundError('Curriculum not found')
  }

  // Format modules with progress
  const modulesWithProgress = curriculum.modules.map((module: typeof curriculum.modules[0]) => ({
    id: module.id,
    title: module.title,
    description: module.description,
    order: module.order,
    lessons: module.lessons.map((lesson: typeof module.lessons[0]) => ({
      id: lesson.id,
      title: lesson.title,
      order: lesson.order,
      duration: lesson.duration,
      difficulty: lesson.difficulty,
      status: lesson.progressRecords[0]?.status || 'NOT_STARTED',
      currentSection: lesson.progressRecords[0]?.currentSection,
      score: lesson.progressRecords[0]?.score,
      completedAt: lesson.progressRecords[0]?.completedAt,
      isLocked: arePrerequisitesLocked(lesson, module.lessons, session.user.id)
    }))
  }))

  return NextResponse.json({
    progress,
    curriculum: {
      id: curriculum.id,
      name: curriculum.name,
      description: curriculum.description,
      modules: modulesWithProgress
    }
  })
}, { role: 'STUDENT' })

function arePrerequisitesLocked(
  lesson: { prerequisiteLessonIds: string[] },
  allLessons: Array<{ id: string; progressRecords: Array<{ status: string }> }>,
  studentId: string
): boolean {
  const prereqs = lesson.prerequisiteLessonIds || []
  if (prereqs.length === 0) return false

  for (const prereqId of prereqs) {
    const prereqLesson = allLessons.find(l => l.id === prereqId)
    if (!prereqLesson) continue

    const isCompleted = prereqLesson.progressRecords[0]?.status === 'COMPLETED'
    if (!isCompleted) return true
  }

  return false
}
