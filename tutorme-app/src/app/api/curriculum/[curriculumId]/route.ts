/**
 * Curriculum Detail API
 * GET: Get detailed curriculum info with modules, lessons, and progress
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth, NotFoundError } from '@/lib/api/middleware'
import { db } from '@/lib/db'

export const GET = withAuth(async (req, session, { params }) => {
  const { curriculumId } = await params

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
              sessions: {
                where: { studentId: session.user.id },
                orderBy: { startedAt: 'desc' },
                take: 1
              },
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

  // Get overall progress
  const progress = await db.curriculumProgress.findUnique({
    where: {
      studentId_curriculumId: {
        studentId: session.user.id,
        curriculumId
      }
    }
  })

  // Format modules with lesson status
  const totalLessons = curriculum.modules.reduce(
    (acc: number, module: typeof curriculum.modules[0]) => acc + module.lessons.length, 
    0
  )

  const modulesWithStatus = curriculum.modules.map((module: typeof curriculum.modules[0]) => ({
    id: module.id,
    title: module.title,
    description: module.description,
    order: module.order,
    lessons: module.lessons.map((lesson: typeof module.lessons[0]) => {
      // Determine lesson status
      let status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED' = 'NOT_STARTED'
      
      if (lesson.progressRecords.length > 0) {
        const record = lesson.progressRecords[0]
        if (record.status === 'COMPLETED') {
          status = 'COMPLETED'
        } else if (record.status === 'IN_PROGRESS') {
          status = 'IN_PROGRESS'
        }
      }

      // Check if lesson is locked based on prerequisites
      const isLocked = arePrerequisitesLocked(
        lesson.prerequisiteLessonIds || [],
        module.lessons,
        session.user.id
      )

      return {
        id: lesson.id,
        title: lesson.title,
        description: lesson.description,
        duration: lesson.duration,
        difficulty: lesson.difficulty,
        order: lesson.order,
        prerequisiteLessonIds: lesson.prerequisiteLessonIds || [],
        status,
        isLocked,
        progress: lesson.sessions[0] ? {
          currentSection: lesson.sessions[0].currentSection,
          completedAt: lesson.sessions[0].completedAt,
          score: lesson.sessions[0].conceptMastery 
            ? Math.round(
                Object.values(lesson.sessions[0].conceptMastery as Record<string, number>)
                  .reduce((a, b) => a + b, 0) / 
                Object.keys(lesson.sessions[0].conceptMastery as Record<string, number>).length || 1
              )
            : null
        } : undefined
      }
    })
  }))

  const courseMaterials = curriculum.courseMaterials as { outline?: unknown[] } | null
  const hasOutline = !!(courseMaterials && Array.isArray(courseMaterials.outline) && courseMaterials.outline.length > 0)

  return NextResponse.json({
    curriculum: {
      id: curriculum.id,
      name: curriculum.name,
      description: curriculum.description,
      subject: curriculum.subject,
      difficulty: curriculum.difficulty,
      estimatedHours: curriculum.estimatedHours,
      hasOutline,
      progress: {
        lessonsCompleted: progress?.lessonsCompleted || 0,
        totalLessons,
        averageScore: progress?.averageScore,
        isCompleted: progress?.isCompleted || false,
        startedAt: progress?.startedAt?.toISOString() || null
      },
      modules: modulesWithStatus
    }
  })
}, { role: 'STUDENT' })

function arePrerequisitesLocked(
  prerequisiteIds: string[],
  allLessons: Array<{ id: string; progressRecords: Array<{ status: string }> }>,
  studentId: string
): boolean {
  if (prerequisiteIds.length === 0) return false

  for (const prereqId of prerequisiteIds) {
    const prereqLesson = allLessons.find(l => l.id === prereqId)
    if (!prereqLesson) continue

    const isCompleted = prereqLesson.progressRecords[0]?.status === 'COMPLETED'
    if (!isCompleted) return true
  }

  return false
}
