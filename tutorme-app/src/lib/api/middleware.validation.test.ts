/**
 * Tests for Input Validation Middleware
 */

import { describe, it, expect, vi } from 'vitest'
import { validateTextInput, MAX_TEXT_LENGTH, parseBoundedInt } from './middleware'

describe('input validation', () => {
  describe('parseBoundedInt', () => {
    it('parses valid integers', () => {
      expect(parseBoundedInt('42', 0, { max: 100 })).toBe(42)
      expect(parseBoundedInt('0', 10, { max: 100 })).toBe(0)
    })

    it('returns default for invalid input', () => {
      expect(parseBoundedInt('abc', 10, { max: 100 })).toBe(10)
      expect(parseBoundedInt(null, 5, { max: 100 })).toBe(5)
      expect(parseBoundedInt(undefined, 5, { max: 100 })).toBe(5)
    })

    it('clamps to min value', () => {
      expect(parseBoundedInt('-5', 0, { min: 0, max: 100 })).toBe(0)
      expect(parseBoundedInt('-100', 50, { min: 10, max: 100 })).toBe(10)
    })

    it('clamps to max value', () => {
      expect(parseBoundedInt('200', 0, { max: 100 })).toBe(100)
      expect(parseBoundedInt('999', 0, { max: 50 })).toBe(50)
    })

    it('uses default min of 0', () => {
      expect(parseBoundedInt('-10', 0, { max: 100 })).toBe(0)
    })
  })

  describe('validateTextInput', () => {
    it('validates string input', () => {
      const result = validateTextInput('hello')
      expect(result.valid).toBe(true)
      if (result.valid) {
        expect(result.value).toBe('hello')
      }
    })

    it('rejects null when not allowed', () => {
      const result = validateTextInput(null)
      expect(result.valid).toBe(false)
      if (!result.valid) {
        expect(result.error).toContain('required')
      }
    })

    it('accepts null when allowed', () => {
      const result = validateTextInput(null, { allowEmpty: true })
      expect(result.valid).toBe(true)
      if (result.valid) {
        expect(result.value).toBe('')
      }
    })

    it('accepts empty string when allowed', () => {
      const result = validateTextInput('', { allowEmpty: true })
      expect(result.valid).toBe(true)
      if (result.valid) {
        expect(result.value).toBe('')
      }
    })

    it('rejects non-string input', () => {
      const result = validateTextInput(123 as unknown as string)
      expect(result.valid).toBe(false)
      if (!result.valid) {
        expect(result.error).toContain('must be a string')
      }
    })

    it('rejects input exceeding max length', () => {
      const longInput = 'x'.repeat(MAX_TEXT_LENGTH + 1)
      const result = validateTextInput(longInput)
      expect(result.valid).toBe(false)
      if (!result.valid) {
        expect(result.error).toContain('exceeds maximum length')
      }
    })

    it('accepts input at max length', () => {
      const maxInput = 'x'.repeat(MAX_TEXT_LENGTH)
      const result = validateTextInput(maxInput)
      expect(result.valid).toBe(true)
    })

    it('respects custom max length', () => {
      const result = validateTextInput('hello world', { maxLength: 5 })
      expect(result.valid).toBe(false)
      if (!result.valid) {
        expect(result.error).toContain('5')
      }
    })

    it('rejects null bytes', () => {
      const result = validateTextInput('hello\x00world')
      expect(result.valid).toBe(false)
      if (!result.valid) {
        expect(result.error).toContain('invalid characters')
      }
    })

    it('includes field name in error', () => {
      const result = validateTextInput(null, { fieldName: 'Description' })
      expect(result.valid).toBe(false)
      if (!result.valid) {
        expect(result.error).toContain('Description')
      }
    })
  })
})
