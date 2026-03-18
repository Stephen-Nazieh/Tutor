'use client'

import type { ChangeEvent, KeyboardEventHandler, ReactNode } from 'react'
import { useCallback } from 'react'
import { MentionsInput, Mention, SuggestionDataItem } from 'react-mentions'

interface MentionSuggestion extends SuggestionDataItem {
  handle?: string | null
  avatarUrl?: string | null
}

interface MentionInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  disabled?: boolean
  className?: string
  onKeyDown?: KeyboardEventHandler
  variant?: 'default' | 'dark'
}

const baseStyle = {
  control: {
    fontSize: 14,
    fontWeight: 400,
    border: '1px solid hsl(var(--input))',
    borderRadius: 6,
    backgroundColor: 'hsl(var(--background))',
    color: 'hsl(var(--foreground))',
  },
  highlighter: {
    overflow: 'hidden',
    padding: '8px 12px',
  },
  input: {
    margin: 0,
    padding: '8px 12px',
    outline: 'none',
    border: 'none',
  },
  suggestions: {
    list: {
      backgroundColor: 'white',
      border: '1px solid #e2e8f0',
      borderRadius: 8,
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      fontSize: 14,
      zIndex: 9999,
      maxHeight: 280,
      overflowY: 'auto',
    },
    item: {
      padding: '8px 12px',
      borderBottom: '1px solid #f1f5f9',
    },
  },
}

const darkStyle = {
  ...baseStyle,
  control: {
    ...baseStyle.control,
    backgroundColor: '#374151',
    border: '1px solid #4b5563',
    color: '#f9fafb',
  },
  input: {
    ...baseStyle.input,
    color: '#f9fafb',
  },
  highlighter: {
    ...baseStyle.highlighter,
    color: '#f9fafb',
  },
}

export function MentionInput({ value, onChange, placeholder, disabled, className, onKeyDown, variant = 'default' }: MentionInputProps) {
  const fetchSuggestions = useCallback((query: string, callback: (data: MentionSuggestion[]) => void) => {
    const q = (query || '').trim().replace(/^@+/, '')
    fetch(`/api/users/search?query=${encodeURIComponent(q)}`, { credentials: 'include' })
      .then((res) => (res.ok ? res.json() : { results: [] }))
      .then((data) => {
        const suggestions = (data.results || []).map((user: { id: string; displayName?: string; handle?: string; avatarUrl?: string }) => ({
          id: user.id,
          display: user.displayName || user.handle || 'User',
          handle: user.handle,
          avatarUrl: user.avatarUrl,
        }))
        callback(suggestions)
      })
      .catch(() => callback([]))
  }, [])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const MentionsInputComponent = MentionsInput as any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const MentionComponent = Mention as any

  return (
    <MentionsInputComponent
      value={value}
      onChange={(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(event.target.value)}
      placeholder={placeholder}
      disabled={disabled}
      className={className}
      onKeyDown={onKeyDown}
      style={variant === 'dark' ? darkStyle : baseStyle}
    >
      <MentionComponent
        trigger="@"
        data={fetchSuggestions}
        markup="@[__display__](__id__)"
        displayTransform={(_id: string, display: string) => `@${display}`}
        allowSpaceInQuery
        renderSuggestion={(suggestion: MentionSuggestion, _search: string, highlightedDisplay: ReactNode) => (
          <div className="flex items-center justify-between gap-2">
            <span>{highlightedDisplay}</span>
            {suggestion.handle ? (
              <span className="text-xs text-slate-500">@{suggestion.handle}</span>
            ) : null}
          </div>
        )}
      />
    </MentionsInputComponent>
  )
}
