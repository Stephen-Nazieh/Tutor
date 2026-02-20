/**
 * Study Recommendations API
 * GET /api/recommendations — AI-powered recommendations (withAuth)
 */

import { NextRequest, NextResponse } from 'next/server'
import type { Session } from 'next-auth'
import { withAuth } from '@/lib/api/middleware'
import { generateWithFallback } from '@/lib/ai/orchestrator'
import { db } from '@/lib/db'

async function getHandler(_req: NextRequest, session: Session) {
  try {

    const weakAreas = await db.quizAttempt.findMany({
      where: {
        studentId: session.user.id!,
        score: { lt: 70 }
      },
      take: 5,
      orderBy: { completedAt: 'desc' }
    })

    // Get content progress
    const inProgressContent = await db.contentProgress.findMany({
      where: {
        studentId: session.user.id!,
        progress: { gt: 0, lt: 100 }
      },
      include: {
        content: {
          select: {
            id: true,
            title: true,
            subject: true
          }
        }
      },
      take: 3
    })

    // Build prompt for AI recommendations
    const weakQuizIds = weakAreas.map((a: any) => a.quizId)
    const inProgressSubjects = inProgressContent.map((p: any) => p.content?.subject).filter(Boolean)

    const prompt = `As an AI tutor, provide 3 personalized study recommendations for a student.

Weak quiz attempts (scores below 70%):
${weakQuizIds.length > 0 ? weakQuizIds.join(', ') : 'None identified yet'}

Content currently in progress:
${inProgressSubjects.length > 0 ? inProgressSubjects.join(', ') : 'None'}

Provide recommendations in this JSON format:
{
  "recommendations": [
    {
      "type": "review|practice|new_topic",
      "title": "Brief title",
      "description": "Detailed recommendation",
      "priority": "high|medium|low",
      "estimatedTime": "X minutes"
    }
  ]
}

Focus on:
1. Reviewing weak concepts first
2. Continuing partially completed content
3. Suggesting next logical topics to learn`

    let recommendations: any

    try {
      const result = await generateWithFallback(prompt, {
        temperature: 0.7,
        maxTokens: 800
      })

      const jsonMatch = result.content.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0])
        recommendations = parsed.recommendations
      } else {
        throw new Error('No JSON found')
      }
    } catch {
      // Fallback recommendations
      recommendations = [
        {
          type: 'review',
          title: 'Review Fundamentals',
          description: 'Focus on understanding the core concepts before moving forward.',
          priority: 'high',
          estimatedTime: '20 minutes'
        },
        {
          type: 'practice',
          title: 'Practice Problems',
          description: 'Complete practice exercises to reinforce learning.',
          priority: 'medium',
          estimatedTime: '30 minutes'
        },
        {
          type: 'new_topic',
          title: 'Explore Related Topics',
          description: 'Expand your knowledge with related concepts.',
          priority: 'low',
          estimatedTime: '25 minutes'
        }
      ]
    }

    return NextResponse.json({
      recommendations,
      weakAreas: weakQuizIds,
      inProgress: inProgressSubjects
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to get recommendations' }, { status: 500 })
  }
}

export const GET = withAuth(getHandler)
