/* eslint-disable @typescript-eslint/no-explicit-any */
import { generateWithFallback } from '@/lib/ai/orchestrator'

export async function loadOptionalServerModule<T = any>(moduleName: string): Promise<T | null> {
  try {
    const importer = new Function('name', 'return import(name)') as (name: string) => Promise<T>
    return await importer(moduleName)
  } catch {
    return null
  }
}

export function dataUrlToBase64(dataUrl: string): string {
  const parts = dataUrl.split(',')
  return parts[1] || dataUrl
}

export async function aiReadHandwritingToMarkdown(input: {
  imageDataUrl: string
  extraInstructions?: string
}): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY
  if (apiKey) {
    try {
      const body = {
        contents: [
          {
            role: 'user',
            parts: [
              {
                text: [
                  'Convert this homework image into structured Markdown.',
                  'If there are diagrams, include Mermaid.js blocks.',
                  'Preserve formulas and headings.',
                  input.extraInstructions || '',
                ].join('\n'),
              },
              {
                inline_data: {
                  mime_type: 'image/png',
                  data: dataUrlToBase64(input.imageDataUrl),
                },
              },
            ],
          },
        ],
      }

      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        }
      )
      if (res.ok) {
        const json = await res.json()
        const text = json?.candidates?.[0]?.content?.parts?.[0]?.text
        if (typeof text === 'string' && text.trim().length > 0) return text
      }
    } catch {
      // Fall through to orchestrator.
    }
  }

  const fallback = await generateWithFallback([
    'You are an OCR + diagram parser for tutoring.',
    'Return only structured Markdown.',
    'If the student drew a diagram, include Mermaid.js blocks.',
    'Image (base64, truncated):',
    dataUrlToBase64(input.imageDataUrl).slice(0, 3000),
    input.extraInstructions || '',
  ].join('\n'))

  return fallback.content
}

export async function aiMarkMathWithRubric(input: {
  imageDataUrl: string
  rubric: string
}): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY
  if (apiKey) {
    try {
      const body = {
        contents: [
          {
            role: 'user',
            parts: [
              {
                text: [
                  'Analyze this handwritten math work and grade it using the rubric.',
                  'Identify student step-by-step logic.',
                  'Check algebraic correctness chain by chain.',
                  'Award partial credit.',
                  'Return strict JSON with shape:',
                  '{"totalScore": number, "mistakeLocations":[{"step": string, "errorDescription": string, "correction": string, "x": number, "y": number}], "overallFeedback": string}',
                  `Rubric:\n${input.rubric}`,
                ].join('\n'),
              },
              {
                inline_data: {
                  mime_type: 'image/png',
                  data: dataUrlToBase64(input.imageDataUrl),
                },
              },
            ],
          },
        ],
      }

      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        }
      )
      if (res.ok) {
        const json = await res.json()
        const text = json?.candidates?.[0]?.content?.parts?.[0]?.text
        if (typeof text === 'string' && text.trim().length > 0) return text
      }
    } catch {
      // fall through
    }
  }

  const fallback = await generateWithFallback([
    'You are a math marker for handwritten solutions.',
    'Use rubric and return strict JSON:',
    '{"totalScore": number, "mistakeLocations":[{"step": string, "errorDescription": string, "correction": string, "x": number, "y": number}], "overallFeedback": string}',
    `Rubric:\n${input.rubric}`,
    `Image (base64 truncated): ${dataUrlToBase64(input.imageDataUrl).slice(0, 3000)}`,
  ].join('\n'))

  return fallback.content
}
