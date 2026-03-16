import React from 'react'

const MENTION_REGEX = /@\\[([^\\]]+)\\]\\(([^)]+)\\)/g

export function renderMentions(text: string): React.ReactNode[] {
  if (!text) return []
  const nodes: React.ReactNode[] = []
  let lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = MENTION_REGEX.exec(text)) !== null) {
    const [full, displayName] = match
    const start = match.index
    const end = start + full.length
    if (start > lastIndex) {
      nodes.push(text.slice(lastIndex, start))
    }
    nodes.push(
      <span key={`${start}-${end}`} className="text-emerald-600 font-medium">
        @{displayName}
      </span>
    )
    lastIndex = end
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex))
  }

  return nodes
}
