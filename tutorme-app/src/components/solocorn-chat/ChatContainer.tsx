/**
 * ChatContainer Component
 * Main chat interface component
 */

'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Sparkles, Trash2 } from 'lucide-react'
import { MessageList } from './MessageList'
import { InputArea } from './InputArea'
import { useSolocornChat, Message } from './useSolocornChat'
import { GREETING_RESPONSES } from '@/lib/chat/system-prompt'

interface ChatContainerProps {
  isOpen: boolean
  onClose: () => void
  language?: string
  mode?: 'dark' | 'light'
  themeColor?: string
}

const themeColors: Record<string, string> = {
  emerald: 'bg-emerald-500 hover:bg-emerald-400',
  ocean: 'bg-sky-500 hover:bg-sky-400',
  sunset: 'bg-amber-500 hover:bg-amber-400',
  galaxy: 'bg-purple-500 hover:bg-purple-400',
}

export function ChatContainer({
  isOpen,
  onClose,
  language = 'en',
  mode = 'dark',
  themeColor = 'emerald',
}: ChatContainerProps) {
  const {
    messages,
    isLoading,
    isStreaming,
    input,
    setInput,
    sendMessage,
    stopGeneration,
    clearMessages,
    retryMessage,
  } = useSolocornChat({ language })

  // Reset when opening
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Add initial greeting from AI
      const initialMessage: Message = {
        id: 'greeting',
        role: 'assistant',
        content: GREETING_RESPONSES[language] || GREETING_RESPONSES['en'],
        timestamp: new Date(),
      }
      // This will be handled by the hook's persistence, but we can set it directly
    }
  }, [isOpen, messages.length, language])

  const bgClass = mode === 'dark' ? 'bg-zinc-900/95 border-white/10' : 'bg-white/95 border-black/10'

  const headerClass =
    mode === 'dark'
      ? 'border-white/10 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20'
      : 'border-black/10 bg-gradient-to-r from-emerald-100 to-cyan-100'

  const textClass = mode === 'dark' ? 'text-white' : 'text-zinc-900'
  const subtextClass = mode === 'dark' ? 'text-zinc-400' : 'text-zinc-600'

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Chat Window */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={`fixed bottom-24 right-6 z-50 flex w-96 flex-col overflow-hidden rounded-2xl border shadow-2xl ${bgClass}`}
            style={{ height: '550px', maxHeight: 'calc(100vh - 140px)' }}
          >
            {/* Header */}
            <div className={`flex items-center justify-between border-b p-4 ${headerClass}`}>
              <div className="flex items-center gap-3">
                <div
                  className={`h-10 w-10 rounded-full ${themeColors[themeColor]} flex items-center justify-center`}
                >
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className={`font-bold ${textClass}`}>Ask Solocorn</h3>
                  <p className={`text-xs ${subtextClass}`}>AI Assistant</p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                {messages.length > 0 && (
                  <button
                    onClick={clearMessages}
                    className={`rounded-lg p-2 transition-colors ${
                      mode === 'dark'
                        ? 'text-zinc-400 hover:bg-white/10 hover:text-white'
                        : 'text-zinc-500 hover:bg-black/5 hover:text-zinc-900'
                    }`}
                    title="Clear conversation"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
                <button
                  onClick={onClose}
                  className={`rounded-lg p-2 transition-colors ${
                    mode === 'dark'
                      ? 'text-zinc-400 hover:bg-white/10 hover:text-white'
                      : 'text-zinc-500 hover:bg-black/5 hover:text-zinc-900'
                  }`}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <MessageList
              messages={messages}
              mode={mode}
              onRetry={retryMessage}
              greeting={GREETING_RESPONSES[language] || GREETING_RESPONSES['en']}
            />

            {/* Input */}
            <InputArea
              value={input}
              onChange={setInput}
              onSend={sendMessage}
              onStop={stopGeneration}
              isLoading={isLoading}
              isStreaming={isStreaming}
              placeholder="Ask about our platform, features, pricing..."
              mode={mode}
              themeColor={themeColors[themeColor].split(' ')[0]}
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
