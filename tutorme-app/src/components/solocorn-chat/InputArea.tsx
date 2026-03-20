/**
 * InputArea Component
 * Chat input with send button and stop button
 */

'use client'

import { useRef, useEffect } from 'react'
import { Send, Square } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface InputAreaProps {
  value: string
  onChange: (value: string) => void
  onSend: () => void
  onStop?: () => void
  isLoading: boolean
  isStreaming: boolean
  placeholder?: string
  mode?: 'dark' | 'light'
  themeColor?: string
}

export function InputArea({
  value,
  onChange,
  onSend,
  onStop,
  isLoading,
  isStreaming,
  placeholder = 'Type a message...',
  mode = 'dark',
  themeColor = 'bg-emerald-500',
}: InputAreaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = 'auto'
      textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`
    }
  }, [value])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (!isLoading && value.trim()) {
        onSend()
      }
    }
  }

  const showStopButton = isStreaming && onStop

  return (
    <div
      className={`border-t p-4 ${
        mode === 'dark' ? 'border-white/10 bg-zinc-900/50' : 'border-black/10 bg-white/50'
      }`}
    >
      <div className="flex items-end gap-2">
        <div
          className={`flex-1 overflow-hidden rounded-xl ${
            mode === 'dark'
              ? 'border border-white/10 bg-white/5 focus-within:border-white/30'
              : 'border border-transparent bg-gray-100 focus-within:border-gray-300'
          } transition-colors`}
        >
          <textarea
            ref={textareaRef}
            value={value}
            onChange={e => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={isLoading}
            rows={1}
            className={`w-full resize-none bg-transparent px-4 py-3 text-sm outline-none ${
              mode === 'dark'
                ? 'text-white placeholder:text-zinc-500'
                : 'text-zinc-900 placeholder:text-zinc-400'
            } disabled:opacity-50`}
            style={{ minHeight: '44px', maxHeight: '120px' }}
          />
        </div>

        {showStopButton ? (
          <Button
            type="button"
            onClick={onStop}
            className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-500 p-0 hover:bg-red-600"
            title="Stop generating"
          >
            <Square className="h-4 w-4 fill-current text-white" />
          </Button>
        ) : (
          <Button
            type="button"
            onClick={onSend}
            disabled={isLoading || !value.trim()}
            className={`h-11 w-11 rounded-xl ${themeColor} flex items-center justify-center p-0 hover:opacity-90 disabled:opacity-50`}
            title="Send message"
          >
            <Send className="h-4 w-4 text-white" />
          </Button>
        )}
      </div>

      {/* Helper text */}
      <div
        className={`mt-2 text-center text-xs ${
          mode === 'dark' ? 'text-zinc-600' : 'text-zinc-400'
        }`}
      >
        Press Enter to send, Shift+Enter for new line
      </div>
    </div>
  )
}
