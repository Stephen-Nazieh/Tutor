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
import { z } from 'zod'

const PciMasterRequestSchema = z.object({
  message: z.string().min(1).max(4000),
  sessionId: z.string().max(160).optional(),
  context: z
    .object({
      type: z.enum(['task', 'assessment']).optional(),
      title: z.string().max(200).optional(),
      content: z.string().max(12000).optional(),
      pci: z.string().max(12000).optional(),
      extensionName: z.string().max(200).optional(),
    })
    .optional(),
})

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

    const response = await adkPciMasterChat({
      userId: session.user.id,
      sessionId,
      message: safeMessage,
      context,
    })

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
