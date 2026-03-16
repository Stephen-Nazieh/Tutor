/* eslint-disable @typescript-eslint/no-explicit-any */
import { generateWithFallback } from '@/lib/agents'

const SERVER_MODULE_LOADERS: Record<string, () => Promise<unknown>> = {
  unpdf: () => import('unpdf'),
  'pdf-parse': () => import('pdf-parse'),
  sharp: () => import('sharp'),
  'pdf-lib': () => import('pdf-lib'),
}

export async function loadOptionalServerModule<T = any>(moduleName: string): Promise<T | null> {
  const loader = SERVER_MODULE_LOADERS[moduleName]
  if (!loader) return null
  try {
    return (await loader()) as T
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
  const fallback = await generateWithFallback([
    'You are a math marker for handwritten solutions.',
    'Use rubric and return strict JSON:',
    '{"totalScore": number, "mistakeLocations":[{"step": string, "errorDescription": string, "correction": string, "x": number, "y": number}], "overallFeedback": string}',
    `Rubric:\n${input.rubric}`,
    `Image (base64 truncated): ${dataUrlToBase64(input.imageDataUrl).slice(0, 3000)}`,
  ].join('\n'))

  return fallback.content
}
