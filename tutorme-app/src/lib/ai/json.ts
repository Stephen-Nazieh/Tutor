import { z } from 'zod'

export interface JsonParseOptions {
  /**
   * If true, we attempt to extract the first JSON object/array substring
   * from a response that contains extra text.
   */
  extract?: boolean
}

function extractFirstJsonSubstring(text: string): string | null {
  // Prefer object, then array. Non-greedy is too risky with nested JSON, so we do a simple
  // "first {...}" or "[...]" capture and rely on JSON.parse to validate.
  const obj = text.match(/\{[\s\S]*\}/)?.[0]
  if (obj) return obj
  const arr = text.match(/\[[\s\S]*\]/)?.[0]
  return arr ?? null
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

