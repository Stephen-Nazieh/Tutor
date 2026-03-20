import { describe, it, expect } from 'vitest'
import { z } from 'zod'
import { safeJsonParse, safeJsonParseWithSchema } from './json'

describe('ai/json', () => {
  it('parses valid JSON', () => {
    expect(safeJsonParse('{"a":1}')).toEqual({ a: 1 })
  })

  it('returns null for invalid JSON', () => {
    expect(safeJsonParse('not-json')).toBeNull()
  })

  it('extracts JSON from surrounding text when extract=true', () => {
    const text = 'Sure! Here is JSON:\n{"ok":true,"n":2}\nThanks.'
    expect(safeJsonParse(text, { extract: true })).toEqual({ ok: true, n: 2 })
  })

  it('validates against a schema', () => {
    const schema = z.object({ ok: z.boolean() })
    const res = safeJsonParseWithSchema('{"ok":true}', schema)
    expect(res.data).toEqual({ ok: true })
  })

  it('fails schema validation cleanly', () => {
    const schema = z.object({ ok: z.boolean() })
    const res = safeJsonParseWithSchema('{"ok":"no"}', schema)
    expect(res.data).toBeNull()
    expect(res.error).toBeDefined()
  })
})
