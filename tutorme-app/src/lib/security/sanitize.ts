/**
 * XSS prevention: sanitize user input before rendering or storing.
 * Use for display and for any user-generated content that may be shown as HTML.
 */

const SCRIPT_REGEX = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi
const ON_EVENT_REGEX = /\s*on\w+\s*=\s*["'][^"']*["']/gi
const JAVASCRIPT_URL_REGEX = /javascript\s*:/gi
const DATA_URL_REGEX = /data\s*:\s*[^,]*\s*,/gi
// Strip dangerous tags (iframe, object, embed, form, meta with refresh, link with import)
const DANGEROUS_TAGS_REGEX = /<(?:iframe|object|embed|form|meta|link)\b[^>]*>/gi

/**
 * Strip script tags, event handlers, javascript: URLs, data: URLs, and dangerous tags.
 * Safe for inserting into text content or plain HTML contexts.
 */
export function sanitizeHtml(input: string): string {
  if (typeof input !== 'string') return ''
  return input
    .replace(SCRIPT_REGEX, '')
    .replace(DANGEROUS_TAGS_REGEX, '')
    .replace(ON_EVENT_REGEX, '')
    .replace(JAVASCRIPT_URL_REGEX, '')
    .replace(DATA_URL_REGEX, '')
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
    '/': '&#x2F;'
  }
  return input.replace(/[&<>"'/]/g, (c) => map[c] ?? c)
}

/**
 * Sanitize for display in a context where only safe text is allowed (e.g. profile name, bio).
 * Prefer escapeHtml when rendering in React (React escapes by default); use this for legacy or raw HTML.
 */
export function sanitizeForDisplay(input: string): string {
  return escapeHtml(sanitizeHtml(input))
}
