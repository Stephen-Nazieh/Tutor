import { NextRequest, NextResponse } from 'next/server'
import { getServerSession, authOptions } from '@/lib/auth'
import { withRateLimitPreset } from '@/lib/api/middleware'
import { generateWithFallback } from '@/lib/agents/orchestrator-llm'

export async function POST(request: NextRequest) {
  try {
    const { response: rateLimitResponse } = await withRateLimitPreset(request, 'aiGenerate')
    if (rateLimitResponse) return rateLimitResponse

    const session = await getServerSession(authOptions, request)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { message, context } = body

    const promptText = `You are "Solocorn Assistant", an AI teaching assistant monitoring a live virtual classroom.
Your job is to analyze the current state of the students and the course material, and provide actionable advice to the tutor.

Here is the current classroom context:
${JSON.stringify(context, null, 2)}

The tutor asks:
"${message}"

Provide a concise, helpful response. If the tutor is asking for a message to send to a student, provide a short, encouraging, and clear message they can copy-paste. If they are asking for analysis, summarize what students are struggling with or currently doing based on the context provided.`

    const aiResponse = await generateWithFallback(promptText, {
      temperature: 0.7,
      maxTokens: 800,
    })

    return NextResponse.json({ response: aiResponse.content })
  } catch (error) {
    console.error('Monitor Assistant error:', error)
    return NextResponse.json({ error: 'Failed to generate AI response' }, { status: 500 })
  }
}
