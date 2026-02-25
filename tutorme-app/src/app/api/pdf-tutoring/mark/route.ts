import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { withAuth } from '@/lib/api/middleware'
import { aiMarkMathWithRubric } from '@/lib/pdf-tutoring/server-utils'
import type { MathMarkingResult } from '@/lib/pdf-tutoring/types'

const schema = z.object({
  imageDataUrl: z.string().min(20),
  rubric: z.string().min(10),
})

function normalizeMarkingResult(raw: string): MathMarkingResult {
  const extracted = raw.match(/\{[\s\S]*\}/)?.[0]
  if (!extracted) {
    return {
      totalScore: 0,
      mistakeLocations: [],
      overallFeedback: raw,
    }
  }

  try {
    const parsed = JSON.parse(extracted) as Partial<MathMarkingResult>
    return {
      totalScore: typeof parsed.totalScore === 'number' ? parsed.totalScore : 0,
      mistakeLocations: Array.isArray(parsed.mistakeLocations) ? parsed.mistakeLocations.map((item) => ({
        step: String(item?.step || 'Unknown step'),
        errorDescription: String(item?.errorDescription || 'No description'),
        correction: String(item?.correction || 'No correction supplied'),
        ...(typeof item?.x === 'number' ? { x: item.x } : {}),
        ...(typeof item?.y === 'number' ? { y: item.y } : {}),
      })) : [],
      overallFeedback: String(parsed.overallFeedback || 'No overall feedback provided.'),
    }
  } catch {
    return {
      totalScore: 0,
      mistakeLocations: [],
      overallFeedback: raw,
    }
  }
}

export const POST = withAuth(async (req: NextRequest) => {
  const body = await req.json()
  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid payload', details: parsed.error.flatten() }, { status: 400 })
  }

  const aiRaw = await aiMarkMathWithRubric(parsed.data)
  const result = normalizeMarkingResult(aiRaw)
  return NextResponse.json({ result })
})
