/**
 * AI Tutor Lesson Context API
 * GET /api/ai-tutor/lesson-context — get context (withAuth)
 * POST /api/ai-tutor/lesson-context — link session to lesson (withAuth + CSRF)
 */

import { NextRequest, NextResponse } from 'next/server'
import type { Session } from 'next-auth'
import { withAuth, requireCsrf } from '@/lib/api/middleware'
import { db } from '@/lib/db'

async function getHandler(req: NextRequest, session: Session) {
  try {
    const { searchParams } = new URL(req.url)
    const lessonId = searchParams.get('lessonId')

    // Get student's AI tutor enrollment
    const aiEnrollment = await db.aITutorEnrollment.findFirst({
      where: {
        studentId: session.user.id,
        subjectCode: 'english'
      }
    })

    if (!aiEnrollment) {
      return NextResponse.json(
        { error: 'Not enrolled in English tutor' },
        { status: 404 }
      )
    }

    // Get student's curriculum enrollment
    const curriculumEnrollment = await db.curriculumEnrollment.findFirst({
      where: {
        studentId: session.user.id
      },
      include: {
        curriculum: {
          include: {
            modules: {
              include: {
                lessons: {
                  orderBy: { order: 'asc' }
                }
              },
              orderBy: { order: 'asc' }
            }
          }
        }
      }
    })

    if (!curriculumEnrollment?.curriculum) {
      return NextResponse.json(
        { error: 'No curriculum assigned' },
        { status: 404 }
      )
    }

    const curriculum = curriculumEnrollment.curriculum

    // If specific lesson requested, return that
    if (lessonId) {
      const lesson = await db.curriculumLesson.findUnique({
        where: { id: lessonId },
        include: { module: true }
      })

      if (!lesson) {
        return NextResponse.json(
          { error: 'Lesson not found' },
          { status: 404 }
        )
      }

      // Get progress for this lesson
      const progress = await db.curriculumLessonProgress.findUnique({
        where: {
          lessonId_studentId: {
            lessonId: lessonId,
            studentId: session.user.id
          }
        }
      })

      return NextResponse.json({
        context: 'specific_lesson',
        lesson: {
          id: lesson.id,
          title: lesson.title,
          moduleTitle: lesson.module.title,
          learningObjectives: lesson.learningObjectives,
          keyConcepts: lesson.keyConcepts
        },
        progress: progress || { status: 'NOT_STARTED' }
      })
    }

    // Otherwise, recommend lessons based on progress
    // Find first incomplete lesson
    let currentLesson = null
    let currentModule = null

    for (const module of curriculum.modules) {
      for (const lesson of module.lessons) {
        const progress = await db.curriculumLessonProgress.findUnique({
          where: {
            lessonId_studentId: {
              lessonId: lesson.id,
              studentId: session.user.id
            }
          }
        })

        if (!progress || progress.status !== 'COMPLETED') {
          currentLesson = lesson
          currentModule = module
          break
        }
      }
      if (currentLesson) break
    }

    // If all completed, suggest review of last module
    if (!currentLesson && curriculum.modules.length > 0) {
      const lastModule = curriculum.modules[curriculum.modules.length - 1]
      currentModule = lastModule
      currentLesson = lastModule.lessons[0]
    }

    return NextResponse.json({
      context: 'recommended_lesson',
      curriculum: {
        id: curriculum.id,
        name: curriculum.name,
        subject: curriculum.subject,
        description: curriculum.description
      },
      currentLesson: currentLesson ? {
        id: currentLesson.id,
        title: currentLesson.title,
        moduleTitle: currentModule?.title,
        learningObjectives: currentLesson.learningObjectives,
        keyConcepts: currentLesson.keyConcepts
      } : null,
      modulesCount: curriculum.modules.length,
      totalLessons: curriculum.modules.reduce((acc: number, m: any) => acc + m.lessons.length, 0)
    }    )
  } catch (error) {
    console.error('Get lesson context error:', error)
    return NextResponse.json(
      { error: 'Failed to get lesson context' },
      { status: 500 }
    )
  }
}

async function postHandler(req: NextRequest, session: Session) {
  const csrfError = await requireCsrf(req)
  if (csrfError) return csrfError

  try {
    const body = await req.json().catch(() => ({}))
    const { sessionId, lessonId } = body

    if (!sessionId || !lessonId) {
      return NextResponse.json(
        { error: 'Session ID and Lesson ID required' },
        { status: 400 }
      )
    }

    // Create or update AI interaction session with lesson context
    const tutoringSession = await db.aIInteractionSession.update({
      where: { id: String(sessionId) },
      data: {
        subjectCode: lessonId // Using subjectCode field to store lesson reference
      }
    })

    return NextResponse.json({ success: true, session: tutoringSession })
  } catch (error) {
    console.error('Link session to lesson error:', error)
    return NextResponse.json(
      { error: 'Failed to link session to lesson' },
      { status: 500 }
    )
  }
}

export const GET = withAuth(getHandler)
export const POST = withAuth(postHandler)
