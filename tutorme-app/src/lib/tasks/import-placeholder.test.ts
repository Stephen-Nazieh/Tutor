import { describe, it, expect } from 'vitest'
import { isImportPlaceholder } from './import-placeholder'

describe('isImportPlaceholder', () => {
  it('matches a single-file import placeholder', () => {
    expect(isImportPlaceholder('[Imported file.docx]')).toBe(true)
    expect(isImportPlaceholder('  [Imported 1. AGENT MARKETPLACE INTERFACE.docx]  ')).toBe(true)
  })

  it('matches a multi-file combined placeholder', () => {
    expect(isImportPlaceholder('[Imported a.pdf]\n\n[Imported b.pdf]')).toBe(true)
  })

  it('does NOT match real authored content, even when it starts with a block', () => {
    expect(isImportPlaceholder('[Imported a.pdf]\n\nSolve for x.')).toBe(false)
    expect(isImportPlaceholder('Answer all questions.')).toBe(false)
    expect(isImportPlaceholder('<p>Read the passage below.</p>')).toBe(false)
  })

  it('treats empty / nullish content as not a placeholder', () => {
    expect(isImportPlaceholder('')).toBe(false)
    expect(isImportPlaceholder('   ')).toBe(false)
    expect(isImportPlaceholder(null)).toBe(false)
    expect(isImportPlaceholder(undefined)).toBe(false)
  })
})
