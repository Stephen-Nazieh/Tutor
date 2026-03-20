/**
 * Quiz Grading API
 * Grades student answers using AI
 *
 * POST /api/quiz/grade
 */

import { NextResponse } from 'next/server'
import { withAuth, withCsrf, ValidationError } from '@/lib/api/middleware'
import { MemoryService } from '@/lib/ai/memory-service'
import { gradeQuizAnswer } from '@/lib/agents/grading'

export const POST = withCsrf(
  withAuth(
    async (req, session) => {
      const body = await req.json()
      const { question, rubric, studentAnswer, maxScore = 100 } = body

      if (!question || !studentAnswer) {
        throw new ValidationError('Question and answer are required')
      }

      let isPersonalized = false
      let studentContext:
        | {
            recentStruggles: Array<{ topic: string; errorType: string; severity: number }>
            masteredTopics: string[]
            learningStyle: any
            currentMood: any
          }
        | undefined = undefined

      // Try to fetch student context using session user id
      try {
        const context = await MemoryService.getStudentContext(session.user.id)

        if (context) {
          isPersonalized = true
          studentContext = {
            recentStruggles: context.state.recentStruggles,
            masteredTopics: context.state.masteredTopics,
            learningStyle: context.profile.learningStyle as any,
            currentMood: context.state.currentMood as any,
          }
        }
      } catch (error) {
        console.warn('Failed to fetch student context, using generic grading:', error)
      }

      const grading = await gradeQuizAnswer({
        question,
        rubric: rubric || 'Grade based on correctness and completeness',
        studentAnswer,
        maxScore,
        studentContext,
      })

      // Update student context based on performance
      if (grading.score !== undefined) {
        try {
          await MemoryService.recordQuizResult(session.user.id, {
            topic: question, // In real app, extract topic from question metadata
            score: grading.score,
            maxScore,
            questionTypes: ['short_answer'],
          })
        } catch (error) {
          console.warn('Failed to update student context after quiz:', error)
        }
      }

      return NextResponse.json({
        score: grading.score,
        confidence: grading.confidence,
        feedback: grading.feedback,
        explanation: grading.explanation,
        nextSteps: grading.nextSteps || [],
        relatedStruggles: grading.relatedStruggles || [],
        isPersonalized,
        provider: grading.provider,
      })
    },
    { role: 'STUDENT' }
  )
)
