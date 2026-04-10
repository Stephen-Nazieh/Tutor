/**
 * Safe Markdown Renderer
 * 
 * Combines markdown rendering with HTML sanitization to prevent XSS attacks.
 * Use this for all user-generated content that needs markdown formatting.
 */

import { sanitizeHtml } from './sanitize'

/**
 * Simple markdown to HTML conversion with sanitization.
 * Safe for rendering user-generated content.
 */
export function renderSafeMarkdown(text: string): string {
  if (!text || typeof text !== 'string') return ''
  
  const html = renderMarkdown(text)
  return sanitizeHtml(html)
}

/**
 * Simple markdown to HTML conversion.
 * ⚠️ DO NOT use directly - always wrap with sanitizeHtml for user content.
 */
function renderMarkdown(text: string): string {
  return text
    .replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold mt-6 mb-3 text-slate-900">$1</h2>')
    .replace(/^### (.*$)/gim, '<h3 class="text-lg font-semibold mt-4 mb-2 text-slate-800">$1</h3>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/^- (.*$)/gim, '<li class="ml-4 mb-1">$1</li>')
    .replace(/(<li.*<\/li>\n?)+/g, '<ul class="list-disc mb-4">$&</ul>')
    .replace(/\n\n/g, '<br/><br/>')
    .replace(/🎯|📚|👥|🎓|🏆|⭐|📝|🚀/g, '<span class="text-lg">$&</span>')
}

/**
 * Render markdown for course pitches with additional styling.
 */
export function renderCoursePitch(text: string): string {
  return renderSafeMarkdown(text)
}

/**
 * Render markdown for content descriptions.
 */
export function renderContentDescription(text: string): string {
  return renderSafeMarkdown(text)
}
