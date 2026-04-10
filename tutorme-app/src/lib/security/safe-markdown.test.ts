/**
 * Tests for Safe Markdown Renderer
 */

import { describe, it, expect } from 'vitest'
import { renderSafeMarkdown, renderCoursePitch, renderContentDescription } from './safe-markdown'

describe('safe-markdown', () => {
  describe('renderSafeMarkdown', () => {
    it('returns empty string for empty input', () => {
      expect(renderSafeMarkdown('')).toBe('')
      expect(renderSafeMarkdown(null as unknown as string)).toBe('')
      expect(renderSafeMarkdown(undefined as unknown as string)).toBe('')
    })

    it('renders markdown headers safely', () => {
      const input = '## Course Title'
      const output = renderSafeMarkdown(input)
      expect(output).toContain('<h2')
      expect(output).toContain('Course Title')
    })

    it('sanitizes script tags', () => {
      const input = '<script>alert("xss")</script>## Title'
      const output = renderSafeMarkdown(input)
      expect(output).not.toContain('<script>')
      expect(output).not.toContain('alert')
      // After sanitization, the ## Title should be rendered
      expect(output).toContain('Title')
    })

    it('sanitizes event handlers', () => {
      const input = '<div onclick="alert(1)">## Title</div>'
      const output = renderSafeMarkdown(input)
      expect(output).not.toContain('onclick')
      // Event handlers are stripped, content is preserved
      expect(output).toContain('Title')
    })

    it('renders bold and italic text', () => {
      const input = '**bold** and *italic*'
      const output = renderSafeMarkdown(input)
      expect(output).toContain('<strong>bold</strong>')
      expect(output).toContain('<em>italic</em>')
    })

    it('renders lists', () => {
      const input = '- Item 1\n- Item 2'
      const output = renderSafeMarkdown(input)
      expect(output).toContain('<ul')
      expect(output).toContain('<li')
      expect(output).toContain('Item 1')
      expect(output).toContain('Item 2')
    })

    it('renders emojis with styling', () => {
      const input = '🎯 Target'
      const output = renderSafeMarkdown(input)
      expect(output).toContain('<span')
      expect(output).toContain('🎯')
    })

    it('handles very long input', () => {
      const input = 'x'.repeat(50000)
      const output = renderSafeMarkdown(input)
      expect(output.length).toBe(50000)
    })
  })

  describe('renderCoursePitch', () => {
    it('renders course pitch safely', () => {
      const input = '## Learn Math\n\n**Fun** and *engaging* course!'
      const output = renderCoursePitch(input)
      expect(output).toContain('<h2')
      expect(output).toContain('<strong>Fun</strong>')
      expect(output).toContain('<em>engaging</em>')
    })

    it('sanitizes malicious content in pitch', () => {
      const input = '<script>stealCookies()</script>## Course'
      const output = renderCoursePitch(input)
      expect(output).not.toContain('<script>')
      // Script is removed, markdown is rendered
      expect(output).toContain('Course')
    })
  })

  describe('renderContentDescription', () => {
    it('renders content description safely', () => {
      const input = '## Lesson 1\n\nLearn about **algebra**.'
      const output = renderContentDescription(input)
      expect(output).toContain('<h2')
      expect(output).toContain('<strong>algebra</strong>')
    })
  })
})
