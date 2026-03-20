/**
 * MessageList Component
 * Renders the scrollable list of messages
 */

'use client'

import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { MessageBubble } from './MessageBubble'
import { Message } from './useSolocornChat'

interface MessageListProps {
  messages: Message[]
  mode?: 'dark' | 'light'
  onRetry?: (messageId: string) => void
  greeting?: string
}

export function MessageList({ messages, mode = 'dark', onRetry, greeting }: MessageListProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  if (messages.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`max-w-sm text-center ${mode === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}
        >
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-cyan-400">
            <Sparkles className="h-8 w-8 text-white" />
          </div>
          <h3
            className={`mb-2 text-lg font-semibold ${
              mode === 'dark' ? 'text-white' : 'text-zinc-900'
            }`}
          >
            Ask Solocorn
          </h3>
          <p className="text-sm">
            {greeting ||
              'I can answer questions about our platform, features, pricing, and how we help schools and teachers. What would you like to know?'}
          </p>
        </motion.div>
      </div>
    )
  }

  return (
    <div
      ref={scrollRef}
      className="scrollbar-thin scrollbar-thumb-zinc-600 scrollbar-track-transparent flex-1 space-y-4 overflow-y-auto p-4"
    >
      <AnimatePresence mode="popLayout">
        {messages.map(message => (
          <MessageBubble
            key={message.id}
            message={message}
            mode={mode}
            onRetry={message.error ? () => onRetry?.(message.id) : undefined}
          />
        ))}
      </AnimatePresence>
      <div ref={bottomRef} />
    </div>
  )
}
