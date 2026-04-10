/**
 * XSS prevention: sanitize user input before rendering or storing.
 * Use for display and for any user-generated content that may may be shown as HTML.
 */

import { JSDOM } from 'jsdom'
import DOMPurify from 'dompurify'

// Initialize DOMPurify with a JSDOM window for server-side use
const jsdomWindow = new JSDOM('').window
const purify = DOMPurify(jsdomWindow)

// Default allowed tags for basic sanitization
const DEFAULT_ALLOWED_TAGS = [
  'b',
  'i',
  'em',
  'strong',
  'a',
  'p',
  'br',
  'ul',
  'ol',
  'li',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'span',
  'div',
]

const DEFAULT_ALLOWED_ATTR = ['href', 'target', 'rel', 'class']

// Regex to detect javascript: protocol (case insensitive)
const JS_PROTOCOL_REGEX = /javascript:/gi

/**
 * Hook to sanitize URI attributes and remove javascript: protocol
 */
purify.addHook('uponSanitizeAttribute', (node, data) => {
  if (data.attrName === 'href' || data.attrName === 'src' || data.attrName === 'action') {
    if (typeof data.attrValue === 'string' && JS_PROTOCOL_REGEX.test(data.attrValue)) {
      data.attrValue = ''
    }
  }
})

/**
 * Sanitize HTML using DOMPurify (more secure than regex-based sanitization).
 * Safe for inserting into text content or plain HTML contexts.
 */
export function sanitizeHtml(input: string): string {
  if (typeof input !== 'string') return ''

  // First, strip javascript: protocol from plain text (not in HTML attributes)
  // This handles cases where the input is just "javascript:alert(1)" without HTML tags
  const sanitized = input.replace(JS_PROTOCOL_REGEX, '')

  return purify.sanitize(sanitized, {
    ALLOWED_TAGS: DEFAULT_ALLOWED_TAGS,
    ALLOWED_ATTR: DEFAULT_ALLOWED_ATTR,
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
