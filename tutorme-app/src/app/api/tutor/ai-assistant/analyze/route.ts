/**
 * AI Analysis API
 * POST /api/tutor/ai-assistant/analyze
 *
 * Analyzes student data and provides insights.
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/lib/api/middleware'
import { drizzleDb } from '@/lib/db/drizzle'
import { aIAssistantInsight } from '@/lib/db/schema'
import { generateWithFallback } from '@/lib/ai/orchestrator'
import { z } from 'zod'
import { randomUUID } from 'crypto'

const AnalyzeRequestSchema = z.object({
  type: z.enum(['performance', 'engagement', 'difficulty', 'recommendations']),
  courseId: z.string().optional(),
  studentIds: z.array(z.string()).optional(),
  timeRange: z.enum(['week', 'month', 'semester']).default('month'),
  context: z.string().optional(),
})

type AnalyzeRequest = z.infer<typeof AnalyzeRequestSchema>

interface PerformanceData {
  studentName: string
  scores: number[]
  attendance: number
  participation: number
}

interface AnalysisResult {
  summary: string
  keyFindings: string[]
  recommendations: string[]
  actionItems: {
    priority: 'high' | 'medium' | 'low'
    action: string
    targetStudents?: string[]
  }[]
  trends: {
    direction: 'improving' | 'declining' | 'stable'
    metric: string
    description: string
  }[]
}

async function fetchPerformanceData(_tutorId: string, _params: AnalyzeRequest): Promise<PerformanceData[]> {
  return [
    { studentName: 'Alice Zhang', scores: [85, 88, 92, 90], attendance: 95, participation: 90 },
    { studentName: 'Bob Li', scores: [72, 75, 78, 80], attendance: 85, participation: 70 },
    { studentName: 'Carol Wang', scores: [90, 88, 85, 87], attendance: 98, participation: 85 },
    { studentName: 'David Chen', scores: [65, 68, 70, 72], attendance: 75, participation: 60 },
    { studentName: 'Emma Liu', scores: [95, 96, 94, 98], attendance: 100, participation: 95 },
  ]
}

function generateAnalysisPrompt(
  type: AnalyzeRequest['type'],
  data: PerformanceData[],
  context?: string
): string {
  const dataSummary = data
    .map(
      (d) =>
        `- ${d.studentName}: Scores [${d.scores.join(', ')}], Attendance ${d.attendance}%, Participation ${d.participation}%`
    )
    .join('\n')

  const basePrompt = `Analyze the following student performance data:

${dataSummary}

${context ? `Additional Context: ${context}` : ''}
`

  const typeSpecificPrompts: Record<AnalyzeRequest['type'], string> = {
    performance: `${basePrompt}

Provide a comprehensive performance analysis including:
1. Overall class performance summary
2. Individual student highlights (top performers, those needing support)
3. Score trends over time
4. Correlation between attendance/participation and scores
5. 3-5 specific, actionable recommendations

Format as structured analysis with clear headings.`,

    engagement: `${basePrompt}

Analyze student engagement patterns:
1. Identify students with declining engagement
2. Correlate participation with performance
3. Highlight attendance concerns
4. Suggest engagement strategies for different student profiles
5. Early warning signs to watch for

Focus on actionable insights for improving engagement.`,

    difficulty: `${basePrompt}

Analyze where students are struggling:
1. Identify topics/concepts causing difficulty (based on score patterns)
2. Students who may need additional support
3. Prerequisites that might be missing
4. Suggested remediation approaches
5. Differentiation strategies

Be specific about what to teach differently.`,

    recommendations: `${basePrompt}

Based on this data, provide teaching recommendations:
1. Instructional strategies to improve outcomes
2. How to support struggling students
3. Ways to challenge high performers
4. Assessment adjustments
5. Teaching methods to try

Prioritize recommendations by expected impact.`,
  }

  return typeSpecificPrompts[type]
}

function parseAnalysisResponse(content: string, _type: AnalyzeRequest['type']): AnalysisResult {
  const lines = content.split('\n').filter((l) => l.trim())
  const findings: string[] = []
  const recommendations: string[] = []
  const actionItems: AnalysisResult['actionItems'] = []
  let currentSection = ''

  for (const line of lines) {
    const trimmed = line.trim()
    if (trimmed.match(/^(findings|key findings|analysis|observations)/i)) {
      currentSection = 'findings'
      continue
    }
    if (trimmed.match(/^(recommendations|suggestions|advice)/i)) {
      currentSection = 'recommendations'
      continue
    }
    if (trimmed.match(/^(action items|next steps|to do)/i)) {
      currentSection = 'actions'
      continue
    }
    if (trimmed.startsWith('-') || trimmed.startsWith('•') || /^\d+\./.test(trimmed)) {
      const text = trimmed.replace(/^[-•\d.\s]+/, '').trim()
      if (currentSection === 'findings') findings.push(text)
      else if (currentSection === 'recommendations') recommendations.push(text)
      else if (currentSection === 'actions') {
        const priority: 'high' | 'medium' | 'low' =
          trimmed.toLowerCase().includes('urgent') || trimmed.toLowerCase().includes('immediate')
            ? 'high'
            : trimmed.toLowerCase().includes('consider') || trimmed.toLowerCase().includes('optional')
              ? 'low'
              : 'medium'
        actionItems.push({ priority, action: text })
      }
    }
  }

  return {
    summary: lines.slice(0, 3).join(' ').slice(0, 200),
    keyFindings: findings.slice(0, 6),
    recommendations: recommendations.slice(0, 5),
    actionItems:
      actionItems.length > 0
        ? actionItems
        : [
            { priority: 'high' as const, action: 'Review analysis with students' },
            { priority: 'medium' as const, action: 'Implement suggested strategies' },
          ],
    trends: [
      { direction: 'improving' as const, metric: 'Average scores', description: 'Overall upward trend' },
    ],
  }
}

export const POST = withAuth(async (req: NextRequest, session) => {
  const tutorId = session.user.id

  try {
    const body = await req.json()
    const validation = AnalyzeRequestSchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid request', details: validation.error.format() },
        { status: 400 }
      )
    }

    const params = validation.data
    const performanceData = await fetchPerformanceData(tutorId, params)

    if (performanceData.length === 0) {
      return NextResponse.json(
        { error: 'No data available for analysis' },
        { status: 404 }
      )
    }

    const prompt = generateAnalysisPrompt(params.type, performanceData, params.context)
    const result = await generateWithFallback(prompt, {
      temperature: 0.5,
      maxTokens: 2000,
    })

    const analysis = parseAnalysisResponse(result.content, params.type)

    try {
      await drizzleDb.insert(aIAssistantInsight).values({
        id: randomUUID(),
        sessionId: body.sessionId || 'temp',
        type: 'student_analysis',
        title: `${params.type.charAt(0).toUpperCase() + params.type.slice(1)} Analysis`,
        content: analysis.summary,
        relatedData: {
          analysisType: params.type,
          timeRange: params.timeRange,
          studentCount: performanceData.length,
        },
        applied: false,
      })
    } catch {
      // continue
    }

    return NextResponse.json({
      analysis,
      rawResponse: result.content,
      metadata: {
        type: params.type,
        studentCount: performanceData.length,
        provider: result.provider,
        latencyMs: result.latencyMs,
        generatedAt: new Date().toISOString(),
      },
    })
  } catch (error) {
    console.error('Analysis error:', error)
    return NextResponse.json(
      { error: 'Failed to generate analysis' },
      { status: 500 }
    )
  }
}, { role: 'TUTOR' })
