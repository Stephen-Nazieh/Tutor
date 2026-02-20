/**
 * Quiz Grading API
 * Grades student answers using AI
 * 
 * POST /api/quiz/grade
 */

import { NextResponse } from 'next/server'
import { withAuth, withCsrf, ValidationError } from '@/lib/api/middleware'
import { generateWithFallback } from '@/lib/ai/orchestrator'
import { gradingPrompt, personalizedGradingPrompt } from '@/lib/ai/prompts'
import { MemoryService } from '@/lib/ai/memory-service'

export const POST = withCsrf(withAuth(async (req, session) => {
  const body = await req.json()
  const { question, rubric, studentAnswer, maxScore = 100 } = body

  if (!question || !studentAnswer) {
    throw new ValidationError('Question and answer are required')
  }

  let prompt: string
  let isPersonalized = false

  // Try to fetch student context using session user id
  try {
    const context = await MemoryService.getStudentContext(session.user.id)

    if (context) {
      // Use personalized prompt with student context
      prompt = personalizedGradingPrompt({
        question,
        rubric: rubric || 'Grade based on correctness and completeness',
        studentAnswer,
        maxScore,
        studentContext: {
          recentStruggles: context.state.recentStruggles,
          masteredTopics: context.state.masteredTopics,
          learningStyle: context.profile.learningStyle as any,
          currentMood: context.state.currentMood as any
        }
      })
      isPersonalized = true
    } else {
      // Fallback to generic prompt if no context found
      prompt = gradingPrompt({
        question,
        rubric: rubric || 'Grade based on correctness and completeness',
        studentAnswer,
        maxScore
      })
    }
  } catch (error) {
    console.warn('Failed to fetch student context, using generic grading:', error)
    prompt = gradingPrompt({
      question,
      rubric: rubric || 'Grade based on correctness and completeness',
      studentAnswer,
      maxScore
    })
  }

  // Get AI grading with fallback
  const result = await generateWithFallback(prompt, {
    temperature: 0.3, // Lower temperature for more consistent grading
    maxTokens: 800 // Increased for personalized feedback
  })

  // Parse the JSON response
  let grading: {
    score: number
    confidence: number
    feedback: string
    explanation: string
    nextSteps?: string[]
    relatedStruggles?: string[]
  }

  try {
    // Try to extract JSON from the response
    const jsonMatch = result.content.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      grading = JSON.parse(jsonMatch[0])
    } else {
      throw new Error('No JSON found in response')
    }
  } catch {
    // Fallback grading if AI doesn't return valid JSON
    grading = {
      score: 50,
      confidence: 0.5,
      feedback: 'Your answer has been recorded.',
      explanation: 'Automatic grading failed, will be reviewed manually.',
      nextSteps: [],
      relatedStruggles: []
    }
  }

  // Update student context based on performance
  if (grading.score !== undefined) {
    try {
      await MemoryService.recordQuizResult(session.user.id, {
        topic: question, // In real app, extract topic from question metadata
        score: grading.score,
        maxScore,
        questionTypes: ['short_answer']
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
    provider: result.provider
  })
}, { role: 'STUDENT' }))
