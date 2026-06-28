/**
 * POST /api/ai/parse-marking-scheme
 *
 * Parses an uploaded marking scheme and matches each DMI question to its answer.
 * The tutor uploads a marking scheme (text or PDF page images) plus the list of
 * question references already in the DMI; the model cuts through page noise and
 * returns, per question number, the expected answer and a rubric capturing the
 * scheme's nuances (acceptable variations, phrasings, tolerances). Tutor-only;
 * nothing is persisted — the client applies the matches to the DMI for review.
 */

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession, getSessionForRealm, authOptions } from '@/lib/auth'
import { withRateLimitPreset, handleApiError } from '@/lib/api/middleware'
import { AISecurityManager } from '@/lib/security/ai-sanitization'
import { generateWithKimi, generateWithKimiVision } from '@/lib/ai/kimi'
import { stripCodeFences } from '@/lib/ai/llm-response'
import { GUARDRAILED_TEMPERATURE } from '@/lib/ai/guardrails'
import { z } from 'zod'

const RequestSchema = z.object({
  content: z.string().max(80000).optional(),
  pdfPages: z.array(z.string().max(5_000_000)).max(8).optional(),
  questions: z
    .array(z.object({ number: z.number().int(), label: z.string().max(400) }))
    .min(1)
    .max(200),
})

const SYSTEM_PROMPT = `You are given a MARKING SCHEME and a list of QUESTION REFERENCES from an exam/assessment.
For each reference, find its correct answer in the marking scheme and return it.

Return ONLY a JSON object (no prose, no markdown, no code fences):
{ "matches": [ { "number": <integer>, "answer": "<expected answer>", "rubric": "<acceptable variations + marking notes>" } ] }

Rules:
- Match by question / part number (e.g. "Question 1(a)", "Q3", "12"). Cut through page headers, footers,
  mark totals, watermarks, "GO ON TO THE NEXT PAGE", and formatting noise to find the right answer.
- "number" is the integer from the reference you were given (the leading #N), NOT a number you invent.
- "answer": the canonical correct answer. For a multiple-choice item give the correct OPTION LETTER (A, B, C, …).
  For a short item give the key expected answer. For a worked/extended item give a concise model answer.
- "rubric": capture the NUANCES the scheme allows — alternative acceptable answers, accepted phrasings /
  spellings / synonyms, numeric tolerances and units, and any "allow / accept / do not accept / condone"
  notes. This lets a grader fairly judge differently-worded answers. Keep it concise but faithful.
- Only include a reference whose answer you can actually find in the scheme. OMIT the rest. NEVER invent
  an answer that is not in the marking scheme.`

interface SchemeMatch {
  number: number
  answer: string
  rubric?: string
}

function parseMatches(raw: string, validNumbers: Set<number>): SchemeMatch[] {
  try {
    const text = stripCodeFences(raw).trim()
    const start = text.indexOf('{')
    const end = text.lastIndexOf('}')
    if (start === -1 || end <= start) return []
    const obj = JSON.parse(text.slice(start, end + 1)) as {
      matches?: Array<{ number?: unknown; answer?: unknown; rubric?: unknown }>
    }
    if (!Array.isArray(obj.matches)) return []
    const out: SchemeMatch[] = []
    for (const m of obj.matches) {
      const n = Number(m?.number)
      const answer = String(m?.answer ?? '').trim()
      if (!Number.isInteger(n) || !validNumbers.has(n) || !answer) continue
      const rubric = String(m?.rubric ?? '').trim()
      out.push({ number: n, answer, rubric: rubric || undefined })
    }
    return out
  } catch {
    return []
  }
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
    const parsed = RequestSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
    }
    const { content, pdfPages, questions } = parsed.data

    if (!content?.trim() && (!pdfPages || pdfPages.length === 0)) {
      return NextResponse.json({ error: 'No marking scheme content provided' }, { status: 400 })
    }

    const questionList = questions.map(q => `#${q.number}: ${q.label}`).join('\n')

    let aiResponse: string
    if (pdfPages && pdfPages.length > 0) {
      const promptItems: Array<
        { type: 'text'; text: string } | { type: 'image_url'; image_url: { url: string } }
      > = [
        {
          type: 'text',
          text: `Question references to match (use the leading #N as "number"):\n${questionList}\n\nThe marking scheme follows as page images.`,
        },
        ...pdfPages.map(page => ({ type: 'image_url' as const, image_url: { url: page } })),
      ]
      aiResponse = await generateWithKimiVision(promptItems, {
        systemPrompt: SYSTEM_PROMPT,
        temperature: GUARDRAILED_TEMPERATURE,
        maxTokens: 4096,
        timeoutMs: 60000,
      })
    } else {
      const prompt = `Question references to match (use the leading #N as "number"):\n${questionList}\n\nMarking scheme:\n${content}`
      aiResponse = await generateWithKimi(prompt, {
        systemPrompt: SYSTEM_PROMPT,
        temperature: GUARDRAILED_TEMPERATURE,
        maxTokens: 4096,
        timeoutMs: 60000,
      })
    }

    const validation = await AISecurityManager.validateAiResponse(aiResponse)
    if (!validation.isValid && validation.severity === 'CRITICAL') {
      return handleApiError(
        new Error('AI response failed security validation'),
        'AI response failed security validation',
        'api/ai/parse-marking-scheme/route.ts'
      )
    }

    const validNumbers = new Set(questions.map(q => q.number))
    const matches = parseMatches(aiResponse, validNumbers)

    return NextResponse.json({ matches, matched: matches.length, total: questions.length })
  } catch (error) {
    return handleApiError(
      error,
      'Failed to parse marking scheme',
      'api/ai/parse-marking-scheme/route.ts'
    )
  }
}
