'use client'

import { useEffect, useState } from 'react'

// Rendered-SVG cache shared across all MathText instances, keyed by latex source.
const svgCache = new Map<string, string>()

interface Token {
  type: 'text' | 'math'
  content: string
  display: boolean
}

/**
 * Split text into prose + LaTeX segments. Supports $...$ / $$...$$ and
 * \(...\) / \[...\] delimiters.
 */
function tokenize(text: string): Token[] {
  const tokens: Token[] = []
  const re = /\$\$([\s\S]+?)\$\$|\$([^$\n]+?)\$|\\\[([\s\S]+?)\\\]|\\\(([\s\S]+?)\\\)/g
  let lastIndex = 0
  let m: RegExpExecArray | null
  while ((m = re.exec(text)) !== null) {
    if (m.index > lastIndex) {
      tokens.push({ type: 'text', content: text.slice(lastIndex, m.index), display: false })
    }
    const display = m[1] != null || m[3] != null
    const latex = (m[1] ?? m[2] ?? m[3] ?? m[4] ?? '').trim()
    tokens.push({ type: 'math', content: latex, display })
    lastIndex = re.lastIndex
  }
  if (lastIndex < text.length) {
    tokens.push({ type: 'text', content: text.slice(lastIndex), display: false })
  }
  return tokens
}

/** True if the text contains any LaTeX worth rendering. */
export function hasMath(text: string): boolean {
  return /\$[^$]+\$|\\\(|\\\[/.test(text)
}

/**
 * Renders text with inline/display LaTeX. Math segments are rendered to SVG by
 * the shared /api/whiteboard/render-formula endpoint (MathJax) and cached.
 */
export function MathText({ text, className = '' }: { text: string; className?: string }) {
  const [, force] = useState(0)
  const tokens = tokenize(text)

  useEffect(() => {
    let cancelled = false
    const missing = Array.from(
      new Set(tokens.filter(t => t.type === 'math' && !svgCache.has(t.content)).map(t => t.content))
    )
    if (missing.length === 0) return
    Promise.all(
      missing.map(async latex => {
        try {
          const res = await fetch('/api/whiteboard/render-formula', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ latex, display: false }),
          })
          if (res.ok) {
            const d = await res.json()
            if (d?.svg) svgCache.set(latex, d.svg as string)
          }
        } catch {
          // leave uncached — shown as raw source below
        }
      })
    ).then(() => {
      if (!cancelled) force(x => x + 1)
    })
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text])

  return (
    <div className={className}>
      {tokens.map((t, i) => {
        if (t.type === 'text') {
          return (
            <span key={i} className="whitespace-pre-wrap">
              {t.content}
            </span>
          )
        }
        const svg = svgCache.get(t.content)
        if (svg) {
          return (
            <span
              key={i}
              className={t.display ? 'mx-auto my-1 block text-center' : 'inline-block align-middle'}
              // SVG comes from our own MathJax endpoint (not user HTML).
              dangerouslySetInnerHTML={{ __html: svg }}
            />
          )
        }
        // Still loading (or render failed) → show the LaTeX source.
        return (
          <span key={i} className="rounded bg-gray-100 px-1 font-mono text-xs text-gray-700">
            {t.content}
          </span>
        )
      })}
    </div>
  )
}
