/**
 * XSS prevention: sanitize user input before rendering or storing.
 * Use for display and for any user-generated content that may be shown as HTML.
 */

import { JSDOM } from 'jsdom'
import DOMPurify from 'dompurify'

// Initialize DOMPurify with a JSDOM window for server-side use
const jsdomWindow = new JSDOM('').window
const purify = DOMPurify(jsdomWindow)

/**
 * Sanitize HTML using DOMPurify (more secure than regex-based sanitization).
 * Safe for inserting into text content or plain HTML contexts.
 */
export function sanitizeHtml(input: string): string {
  if (typeof input !== 'string') return ''
  return purify.sanitize(input, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br', 'ul', 'ol', 'li'],
    ALLOWED_ATTR: ['href', 'target', 'rel'],
  }) as string
}

/**
 * Sanitize and optionally truncate to a max length (for DB/store).
 */
export function sanitizeHtmlWithMax(input: string, maxLength: number = 50_000): string {
  const s = sanitizeHtml(input)
  if (s.length <= maxLength) return s
  return s.slice(0, maxLength)
}

/**
 * Escape HTML entities so the string is safe for use in text nodes or attributes.
 */
export function escapeHtml(input: string): string {
  if (typeof input !== 'string') return ''
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '/': '&#x2F;',
  }
  return input.replace(/[&<>"'/]/g, c => map[c] ?? c)
}

/**
 * Sanitize for display in a context where only safe text is allowed (e.g. profile name, bio).
 * Prefer escapeHtml when rendering in React (React escapes by default); use this for legacy or raw HTML.
 */
export function sanitizeForDisplay(input: string): string {
  return escapeHtml(sanitizeHtml(input))
}
