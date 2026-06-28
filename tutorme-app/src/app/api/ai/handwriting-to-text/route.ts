/**
 * POST /api/ai/handwriting-to-text
 *
 * Transcribes a student's handwritten answer (a PNG data URL from the drawing
 * pad) into clean typed text, with mathematical expressions written as LaTeX so
 * they render nicely. Returns the transcription; the client puts it in the
 * answer's text box. Authenticated + rate-limited; nothing is persisted.
 */

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession, authOptions } from '@/lib/auth'
import { withRateLimitPreset, handleApiError } from '@/lib/api/middleware'
import { generateWithKimiVision } from '@/lib/ai/kimi'
import { z } from 'zod'

const RequestSchema = z.object({
  // A data URL (image/png or image/jpeg). ~7MB cap on the base64 string.
  image: z.string().min(32).max(9_000_000),
  // Handwriting already transcribed in a previous pass — skip it, return only new.
  previousText: z.string().max(8000).optional(),
})

const SYSTEM_PROMPT = `You convert a photo/scan of a student's HANDWRITTEN answer into clean typed text.
Rules:
- Transcribe exactly what is written — do NOT solve, correct, complete, or add to the answer.
- Write every mathematical expression as LaTeX: inline as $...$, and a standalone/displayed equation as $$...$$.
- LINE GROUPING: handwriting is rarely perfectly horizontal. Treat symbols that sit ROUGHLY on the same
  horizontal line — including natural slant, small vertical offsets, and the normal raising/lowering of
  superscripts, subscripts, fraction bars, roots, and operators — as ONE line / one expression. Only start
  a NEW line when the writing clearly drops to a new row (a deliberate line break). When unsure, keep an
  equation on a single line. Never split one equation across multiple lines because of slight wobble.
- Preserve ordering and genuine structure (numbered steps, separate lines, matrices, etc.).
- For a diagram, sketch, graph, or figure, give a short description in square brackets, e.g. [diagram: right triangle labelled a, b, c].
- Output ONLY the transcription text. No preamble, no explanation, no code fences.`

export async function POST(request: NextRequest) {
  try {
    const { response: rateLimitResponse } = await withRateLimitPreset(request, 'aiGenerate')
    if (rateLimitResponse) return rateLimitResponse

    const session = await getServerSession(authOptions, request)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json().catch(() => null)
    const parsed = RequestSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
    }
    const { image, previousText } = parsed.data
    if (!image.startsWith('data:image/')) {
      return NextResponse.json({ error: 'Image must be a data URL' }, { status: 400 })
    }

    const instruction = previousText?.trim()
      ? `Transcribe this handwritten answer. Part of the handwriting has ALREADY been transcribed as:\n"""\n${previousText.trim()}\n"""\nTranscribe ONLY the handwriting that is NOT already covered by that text (newly added strokes). If nothing new has been added, output an empty response.`
      : 'Transcribe this handwritten answer.'

    let text: string
    try {
      text = await generateWithKimiVision(
        [
          { type: 'text', text: instruction },
          { type: 'image_url', image_url: { url: image } },
        ],
        {
          systemPrompt: SYSTEM_PROMPT,
          temperature: 0.1,
          maxTokens: 1500,
          timeoutMs: 45000,
        }
      )
    } catch (aiErr) {
      console.warn('[handwriting-to-text] Kimi vision failed:', aiErr)
      return NextResponse.json(
        { error: 'Handwriting conversion is unavailable right now.' },
        { status: 503 }
      )
    }

    // Strip any accidental code fences/preamble the model may add.
    const cleaned = text
      .replace(/^```[a-z]*\s*/i, '')
      .replace(/\s*```$/i, '')
      .trim()

    return NextResponse.json({ text: cleaned })
  } catch (error) {
    return handleApiError(
      error,
      'Failed to convert handwriting',
      'api/ai/handwriting-to-text/route.ts'
    )
  }
}
