/**
 * Lesson Chat API
 * Handles AI tutor interaction during structured lessons
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth, withCsrf, ValidationError, NotFoundError } from '@/lib/api/middleware'
import {
  advanceLesson,
  buildCurriculumPrompt,
  startLesson,
  type LessonSession
} from '@/lib/curriculum/lesson-controller'
import { db } from '@/lib/db'
import { generateWithFallback } from '@/lib/ai/orchestrator'

const SECTIONS = ['introduction', 'concept', 'example', 'practice', 'review'] as const
type LessonSection = typeof SECTIONS[number]

export const POST = withCsrf(withAuth(async (req, session, routeContext: any) => {
  const params = await routeContext?.params;
  const { lessonId } = await params
  const body = await req.json()
  const { message, sessionId, currentSection } = body

  if (!message) {
    throw new ValidationError('Message is required')
  }

  // Get lesson details
  const lesson = await db.curriculumLesson.findUnique({
    where: { id: lessonId },
    include: {
      module: {
        include: {
          curriculum: true
        }
      }
    }
  })

  if (!lesson) {
    throw new NotFoundError('Lesson not found')
  }

  // Get or create lesson session
  let lessonSession: LessonSession | null = null

  if (sessionId) {
    const dbSession = await db.lessonSession.findUnique({
      where: { id: sessionId }
    })
    if (dbSession) {
      lessonSession = dbSession as any
    }
  }

  if (!lessonSession) {
    // Try to find existing active session
    const dbSession = await db.lessonSession.findUnique({
      where: {
        studentId_lessonId: {
          studentId: session.user.id,
          lessonId
        }
      }
    })

    if (dbSession) {
      lessonSession = dbSession as any
    } else {
      // Create new session using the lesson controller
      lessonSession = await startLesson(session.user.id, lessonId)
    }
  }

  if (!lessonSession) {
    throw new Error('Failed to create lesson session')
  }

  // Build curriculum prompt
  const prompt = buildCurriculumPrompt(lessonSession, lesson, message)

  // Get conversation history
  const context = (lessonSession.sessionContext as any) || {}
  const history = context.messages || []

  // Add user message
  history.push({
    role: 'user',
    content: message,
    timestamp: new Date().toISOString()
  })

  // Generate AI response
  const aiResult = await generateWithFallback(prompt, {
    temperature: 0.7,
    maxTokens: 2000
  })

  const aiResponse = aiResult.content

  // Parse response for metadata
  let parsedResponse = aiResponse
  let whiteboardItems: any[] = []
  let understandingLevel = 0
  let nextSection = lessonSession.currentSection

  // Try to extract JSON metadata from response
  try {
    const jsonMatch = aiResponse.match(/\{[\s\S]*\}$/)
    if (jsonMatch) {
      const metadata = JSON.parse(jsonMatch[0])
      whiteboardItems = metadata.whiteboardItems || []
      understandingLevel = metadata.understandingLevel || 0
      nextSection = metadata.nextSection || lessonSession.currentSection
      parsedResponse = aiResponse.replace(jsonMatch[0], '').trim()
    }
  } catch (e) {
    // No metadata found, use raw response
  }

  // Add AI response to history
  history.push({
    role: 'assistant',
    content: parsedResponse,
    timestamp: new Date().toISOString()
  })

  // Keep only last 50 messages
  if (history.length > 50) {
    history.splice(0, history.length - 50)
  }

  // Update concept mastery based on understanding level
  const conceptMastery = (lessonSession.conceptMastery as Record<string, number>) || {}
  if (understandingLevel > 0) {
    const currentConcept = lesson.teachingPoints?.[0] || 'general'
    conceptMastery[currentConcept] = Math.max(
      conceptMastery[currentConcept] || 0,
      understandingLevel
    )
  }

  // Check if should advance section
  const currentSectionIndex = SECTIONS.indexOf(lessonSession.currentSection as LessonSection)
  const nextSectionIndex = SECTIONS.indexOf(nextSection as LessonSection)

  let updatedSession = lessonSession
  if (nextSectionIndex > currentSectionIndex || understandingLevel >= 80) {
    // Advance to next section
    const advanceResult = await advanceLesson(lessonSession, message)

    // Update session in database
    updatedSession = await db.lessonSession.update({
      where: { id: lessonSession.id },
      data: {
        currentSection: advanceResult.newSection,
        conceptMastery,
        sessionContext: {
          ...context,
          messages: history,
          lastMessage: message,
          lastResponse: parsedResponse
        },
        whiteboardItems: whiteboardItems.length > 0
          ? [...(lessonSession.whiteboardItems || []), ...whiteboardItems]
          : lessonSession.whiteboardItems
      }
    }) as any
  } else {
    // Just update context
    updatedSession = await db.lessonSession.update({
      where: { id: lessonSession.id },
      data: {
        conceptMastery,
        sessionContext: {
          ...context,
          messages: history,
          lastMessage: message,
          lastResponse: parsedResponse
        },
        whiteboardItems: whiteboardItems.length > 0
          ? [...(lessonSession.whiteboardItems || []), ...whiteboardItems]
          : lessonSession.whiteboardItems
      }
    }) as any
  }

  // Check if lesson is complete
  const isComplete = updatedSession.currentSection === 'review' && understandingLevel >= 80
  if (isComplete) {
    await db.lessonSession.update({
      where: { id: lessonSession.id },
      data: {
        status: 'completed',
        completedAt: new Date()
      }
    })

    // Update curriculum progress
    await db.curriculumProgress.upsert({
      where: {
        studentId_curriculumId: {
          studentId: session.user.id,
          curriculumId: lesson.module.curriculumId
        }
      },
      create: {
        studentId: session.user.id,
        curriculumId: lesson.module.curriculumId,
        lessonsCompleted: 1,
        totalLessons: await db.curriculumLesson.count({
          where: { module: { curriculumId: lesson.module.curriculumId } }
        }),
        currentLessonId: lessonId,
        averageScore: understandingLevel,
        startedAt: new Date()
      },
      update: {
        lessonsCompleted: { increment: 1 },
        currentLessonId: lessonId,
        averageScore: understandingLevel
      }
    })
  }

  return NextResponse.json({
    success: true,
    response: parsedResponse,
    whiteboardItems,
    understandingLevel,
    currentSection: updatedSession.currentSection,
    conceptMastery: updatedSession.conceptMastery,
    isComplete,
    sessionId: lessonSession.id
  })
}, { role: 'STUDENT' }))

export const GET = withAuth(async (req, session, routeContext: any) => {
  const params = await routeContext?.params;
  const { lessonId } = await params

  // Get current session
  const lessonSession = await db.lessonSession.findUnique({
    where: {
      studentId_lessonId: {
        studentId: session.user.id,
        lessonId
      }
    }
  })

  if (!lessonSession) {
    return NextResponse.json({ session: null })
  }

  const context = (lessonSession.sessionContext as any) || {}

  return NextResponse.json({
    session: {
      id: lessonSession.id,
      currentSection: lessonSession.currentSection,
      conceptMastery: lessonSession.conceptMastery,
      status: lessonSession.status,
      messages: context.messages || []
    }
  })
}, { role: 'STUDENT' })
