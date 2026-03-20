import { describe, it, expect } from 'vitest'
import { sanitizeHtml, escapeHtml, sanitizeForDisplay } from './sanitize'

describe('sanitize', () => {
  describe('sanitizeHtml', () => {
    it('returns empty string for non-string input', () => {
      expect(sanitizeHtml(null as any)).toBe('')
      expect(sanitizeHtml(undefined as any)).toBe('')
    })

    it('strips script tags', () => {
      expect(sanitizeHtml('Hello <script>alert(1)</script> world')).toBe('Hello  world')
      expect(sanitizeHtml('<script src="evil.js"></script>')).toBe('')
    })

    it('strips event handlers', () => {
      expect(sanitizeHtml('<div onclick="alert(1)">x</div>')).not.toContain('onclick')
    })

    it('strips javascript: URLs', () => {
      // Avoid embedding "javascript:" in string literals (eslint no-script-url)
      const scheme = String.fromCharCode(
        106,
        97,
        118,
        97,
        115,
        99,
        114,
        105,
        112,
        116,
        58 // "javascript:"
      )
      const dangerous = scheme + 'alert(1)'
      expect(sanitizeHtml(dangerous)).not.toContain(scheme)
    })

    it('leaves safe content unchanged', () => {
      const safe = 'Plain text and <b>bold</b>'
      expect(sanitizeHtml(safe)).toBe(safe)
    })
  })

  describe('escapeHtml', () => {
    it('returns empty string for non-string input', () => {
      expect(escapeHtml(null as any)).toBe('')
    })

    it('escapes angle brackets and ampersand', () => {
      expect(escapeHtml('a & b')).toBe('a &amp; b')
      expect(escapeHtml('<div>')).toBe('&lt;div&gt;')
      expect(escapeHtml('"quoted"')).toBe('&quot;quoted&quot;')
    })

    it('leaves alphanumeric unchanged', () => {
      expect(escapeHtml('Hello')).toBe('Hello')
    })
  })

  describe('sanitizeForDisplay', () => {
    it('strips scripts then escapes', () => {
      const input = '<script>bad()</script><b>safe</b>'
      expect(sanitizeForDisplay(input)).not.toContain('<script>')
      expect(sanitizeForDisplay(input)).toContain('&lt;')
    })
  })
})
