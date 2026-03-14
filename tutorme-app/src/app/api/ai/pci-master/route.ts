/**
 * PCI Master API
 * POST /api/ai/pci-master
 * Body: { message: string, sessionId?: string, context?: {...} }
 */

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession, getSessionForRealm, authOptions } from '@/lib/auth'
import { withRateLimitPreset, handleApiError } from '@/lib/api/middleware'
import { AISecurityManager } from '@/lib/security/ai-sanitization'
import { adkPciMasterChat } from '@/lib/adk-client'
import { generateWithFallback } from '@/lib/agents'
import { z } from 'zod'

const PciMasterRequestSchema = z.object({
  message: z.string().min(1).max(4000),
  sessionId: z.string().max(160).optional(),
  context: z
    .object({
      type: z.enum(['task', 'assessment']).optional(),
      title: z.string().max(200).optional(),
      content: z.string().max(50000).optional(),
      pci: z.string().max(50000).optional(),
      extensionName: z.string().max(200).optional(),
    })
    .optional(),
})

const SYSTEM_PROMPT = `You are a PCI (Pedagogically Correct Instruction) Master - an expert educational AI that crafts and refines Socratic-style instructions.

Your role:
1. Help students discover answers through guided questioning (never give direct answers)
2. Adapt your approach based on the content type (task, assessment, or concept)
3. Use the conversation history to maintain context
4. Provide clear, encouraging, and thought-provoking guidance

Respond in JSON format with this structure:
{
  "response": "your Socratic response here",
  "followUpQuestions": ["question 1", "question 2"],
  "suggestedResources": ["resource 1", "resource 2"],
  "difficulty": "easy|medium|hard",
  "confidence": 0.8
}`

function truncate(value: string | undefined, max: number): string | undefined {
  if (!value) return value
  if (value.length <= max) return value
  return `${value.slice(0, max)}\n...[TRUNCATED]`
}

export async function POST(request: NextRequest) {
  try {
    const { response: rateLimitResponse } = await withRateLimitPreset(request, 'aiGenerate')
    if (rateLimitResponse) return rateLimitResponse

    const session =
      (await getSessionForRealm(request, 'tutor')) ?? (await getServerSession(authOptions, request))
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json().catch(() => null)
    const parsed = PciMasterRequestSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
    }

    const { message, sessionId, context } = parsed.data
    const safeMessage = AISecurityManager.sanitizeAiInput(message)
    if (!safeMessage) {
      return NextResponse.json({ error: 'Invalid or empty message after sanitization' }, { status: 400 })
    }

    const contextBlock = [
      context?.type && `Type: ${context.type}`,
      context?.title && `Title: ${context.title}`,
      context?.content && `Content:\n${truncate(context.content, 12000)}`,
      context?.pci && `Current PCI:\n${truncate(context.pci, 12000)}`,
      context?.extensionName && `Extension Name: ${context.extensionName}`,
    ].filter(Boolean).join('\n\n')

    const userPrompt = contextBlock
      ? `Context:\n${contextBlock}\n\nUser: ${safeMessage}`
      : `User: ${safeMessage}`

    let response: { response: string; conversationId?: string; parsed?: { response?: string } | null }
    if (process.env.ADK_BASE_URL) {
      try {
        response = await adkPciMasterChat({
          userId: session.user.id,
          sessionId,
          message: safeMessage,
          context,
        })
      } catch (error) {
        console.warn('ADK PCI master failed, falling back to local providers:', error)
        const fallback = await generateWithFallback(
          `System:\n${SYSTEM_PROMPT}\n\n${userPrompt}`,
          { temperature: 0.7, maxTokens: 2048, skipCache: true }
        )
        response = { response: fallback.content }
      }
    } else {
      const fallback = await generateWithFallback(
        `System:\n${SYSTEM_PROMPT}\n\n${userPrompt}`,
        { temperature: 0.7, maxTokens: 2048, skipCache: true }
      )
      response = { response: fallback.content }
    }

    const validation = await AISecurityManager.validateAiResponse(response.response)
    if (!validation.isValid && validation.severity === 'CRITICAL') {
      return handleApiError(
        new Error('AI response failed security validation'),
        'AI response failed security validation',
        'api/ai/pci-master/route.ts'
      )
    }

    return NextResponse.json({
      response: response.response,
      conversationId: response.conversationId,
      parsed: response.parsed ?? null,
    })
  } catch (error) {
    console.error('PCI Master error:', error)
    return handleApiError(error, 'Failed to get PCI Master response', 'api/ai/pci-master/route.ts')
  }
}
