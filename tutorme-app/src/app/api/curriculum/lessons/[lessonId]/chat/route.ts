/**
 * Lesson Chat API
 * Handles AI tutor interaction during structured lessons
 */

import crypto from 'crypto'
import { NextRequest, NextResponse } from 'next/server'
import { and, eq, sql } from 'drizzle-orm'
import { withAuth, withCsrf, ValidationError, NotFoundError } from '@/lib/api/middleware'
import {
  advanceLesson,
  buildCurriculumPrompt,
  startLesson,
  type LessonSession,
} from '@/lib/curriculum/lesson-controller'
import { drizzleDb } from '@/lib/db/drizzle'
import {
  courseLesson,
  curriculumModule,
  lessonSession as lessonSessionTable,
  courseProgress,
} from '@/lib/db/schema'
import { generateWithFallback } from '@/lib/agents'

const SECTIONS = ['introduction', 'concept', 'example', 'practice', 'review'] as const
type LessonSection = (typeof SECTIONS)[number]

export const POST = withCsrf(
  withAuth(
    async (req, session, routeContext: any) => {
      const params = await routeContext?.params
      const { lessonId } = await params
      const body = await req.json()
      const { message, sessionId, currentSection } = body

      if (!message) {
        throw new ValidationError('Message is required')
      }

      // Get lesson details
      const [lessonRow] = await drizzleDb
        .select()
        .from(courseLesson)
        .where(eq(courseLesson.lessonId, lessonId))
        .limit(1)

      if (!lessonRow) {
        throw new NotFoundError('Lesson not found')
      }

      // Handle case where lesson may not have a module (new flat structure)
      const [moduleRow] = lessonRow.moduleId
        ? await drizzleDb
            .select()
            .from(curriculumModule)
            .where(eq(curriculumModule.id, lessonRow.moduleId))
            .limit(1)
        : [null]

      const lesson = {
        ...lessonRow,
        module: moduleRow
          ? { courseId: moduleRow.curriculumId, title: moduleRow.title }
          : { courseId: '', title: '' },
      }

      // Get or create lesson session
      let lessonSessionData: LessonSession | null = null

      if (sessionId) {
        const [dbSession] = await drizzleDb
          .select()
          .from(lessonSessionTable)
          .where(eq(lessonSessionTable.id, sessionId))
          .limit(1)
        if (dbSession) {
          lessonSessionData = dbSession as unknown as LessonSession
        }
      }

      if (!lessonSessionData) {
        const [dbSession] = await drizzleDb
          .select()
          .from(lessonSessionTable)
          .where(
            and(
              eq(lessonSessionTable.studentId, session.user.id),
              eq(lessonSessionTable.lessonId, lessonId)
            )
          )
          .limit(1)

        if (dbSession) {
          lessonSessionData = dbSession as unknown as LessonSession
        } else {
          lessonSessionData = await startLesson(session.user.id, lessonId)
        }
      }

      const lessonSession = lessonSessionData

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
        timestamp: new Date().toISOString(),
      })

      // Generate AI response
      const aiResult = await generateWithFallback(prompt, {
        temperature: 0.7,
        maxTokens: 2000,
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
        timestamp: new Date().toISOString(),
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

      const newSessionContext = {
        ...context,
        messages: history,
        lastMessage: message,
        lastResponse: parsedResponse,
      }
      const newWhiteboardItems =
        whiteboardItems.length > 0
          ? [...(lessonSession.whiteboardItems || []), ...whiteboardItems]
          : lessonSession.whiteboardItems

      let updatedSession: LessonSession & {
        currentSection: string
        conceptMastery: Record<string, number>
      }
      if (nextSectionIndex > currentSectionIndex || understandingLevel >= 80) {
        const advanceResult = await advanceLesson(lessonSession, message)
        const [updated] = await drizzleDb
          .update(lessonSessionTable)
          .set({
            currentSection: advanceResult.newSection,
            conceptMastery: conceptMastery as any,
            sessionContext: newSessionContext as any,
            whiteboardItems: newWhiteboardItems as any,
          })
          .where(eq(lessonSessionTable.id, lessonSession.id))
          .returning()
        updatedSession = (updated ?? lessonSession) as any
      } else {
        const [updated] = await drizzleDb
          .update(lessonSessionTable)
          .set({
            conceptMastery: conceptMastery as any,
            sessionContext: newSessionContext as any,
            whiteboardItems: newWhiteboardItems as any,
          })
          .where(eq(lessonSessionTable.id, lessonSession.id))
          .returning()
        updatedSession = (updated ?? lessonSession) as any
      }

      const isComplete = updatedSession.currentSection === 'review' && understandingLevel >= 80
      if (isComplete) {
        await drizzleDb
          .update(lessonSessionTable)
          .set({ status: 'completed', completedAt: new Date() })
          .where(eq(lessonSessionTable.id, lessonSession.id))

        const courseId = lesson.module?.courseId ?? moduleRow?.curriculumId
        if (courseId) {
          const [{ count: totalLessons }] = await drizzleDb
            .select({ count: sql<number>`count(*)::int` })
            .from(courseLesson)
            .innerJoin(curriculumModule, eq(curriculumModule.id, courseLesson.moduleId))
            .where(eq(curriculumModule.curriculumId, courseId))

          const [existing] = await drizzleDb
            .select()
            .from(courseProgress)
            .where(
              and(
                eq(courseProgress.studentId, session.user.id),
                eq(courseProgress.courseId, courseId)
              )
            )
            .limit(1)

          if (existing) {
            await drizzleDb
              .update(courseProgress)
              .set({
                lessonsCompleted: existing.lessonsCompleted + 1,
                currentLessonId: lessonId,
                averageScore: understandingLevel,
              })
              .where(eq(courseProgress.progressId, existing.progressId))
          } else {
            await drizzleDb.insert(courseProgress).values({
              progressId: crypto.randomUUID(),
              studentId: session.user.id,
              courseId,
              lessonsCompleted: 1,
              totalLessons: totalLessons ?? 0,
              currentLessonId: lessonId,
              averageScore: understandingLevel,
              isCompleted: false,
              startedAt: new Date(),
            })
          }
        }
      }

      return NextResponse.json({
        success: true,
        response: parsedResponse,
        whiteboardItems,
        understandingLevel,
        currentSection: updatedSession.currentSection,
        conceptMastery: updatedSession.conceptMastery,
        isComplete,
        sessionId: lessonSession.id,
      })
    },
    { role: 'STUDENT' }
  )
)

export const GET = withAuth(
  async (req, session, routeContext: any) => {
    const params = await routeContext?.params
    const { lessonId } = await params

    // Get current session
    const [sessionRow] = await drizzleDb
      .select()
      .from(lessonSessionTable)
      .where(
        and(
          eq(lessonSessionTable.studentId, session.user.id),
          eq(lessonSessionTable.lessonId, lessonId)
        )
      )
      .limit(1)

    if (!sessionRow) {
      return NextResponse.json({ session: null })
    }

    const context = (sessionRow.sessionContext as any) || {}

    return NextResponse.json({
      session: {
        id: sessionRow.id,
        currentSection: sessionRow.currentSection,
        conceptMastery: sessionRow.conceptMastery,
        status: sessionRow.status,
        messages: context.messages || [],
      },
    })
  },
  { role: 'STUDENT' }
)
