import { z } from 'zod'

export interface JsonParseOptions {
  /**
   * If true, we attempt to extract the first JSON object/array substring
   * from a response that contains extra text.
   */
  extract?: boolean
}

function extractFirstJsonSubstring(text: string): string | null {
  // Non-greedy is too risky with nested JSON, so we do a simple "{...}" or "[...]"
  // capture and rely on JSON.parse to validate. Important: if the response starts with
  // an array, prefer extracting the array; otherwise we might grab an inner object.
  const trimmed = text.trimStart()
  if (trimmed.startsWith('[')) {
    const arr = trimmed.match(/\[[\s\S]*\]/)?.[0]
    if (arr) return arr
  }
  if (trimmed.startsWith('{')) {
    const obj = trimmed.match(/\{[\s\S]*\}/)?.[0]
    if (obj) return obj
  }

  const arr = text.match(/\[[\s\S]*\]/)?.[0]
  if (arr) return arr
  const obj = text.match(/\{[\s\S]*\}/)?.[0]
  return obj ?? null
}

export function safeJsonParse<T = unknown>(text: string, options: JsonParseOptions = {}): T | null {
  if (typeof text !== 'string') return null
  const raw = options.extract ? extractFirstJsonSubstring(text) ?? text : text
  try {
    return JSON.parse(raw) as T
  } catch {
    return null
  }
}

export function safeJsonParseWithSchema<T>(
  text: string,
  schema: z.ZodType<T>,
  options: JsonParseOptions = {}
): { data: T | null; error?: z.ZodError | Error } {
  const parsed = safeJsonParse<unknown>(text, options)
  if (parsed === null) return { data: null, error: new Error('Invalid JSON') }
  const validated = schema.safeParse(parsed)
  if (!validated.success) return { data: null, error: validated.error }
  return { data: validated.data }
}

