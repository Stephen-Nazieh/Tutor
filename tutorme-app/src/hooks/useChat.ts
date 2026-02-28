/**
 * useChat Hook
 * Manages chat state and message handling
 */

import { useState, useCallback, useRef, useEffect } from 'react'

export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: string
  hintType?: 'socratic' | 'direct' | 'encouragement' | 'clarification'
}

interface UseChatProps {
  initialMessages?: Message[]
  onSendMessage?: (message: string) => Promise<void>
  maxMessages?: number
}

export function useChat({ initialMessages = [], onSendMessage, maxMessages = 100 }: UseChatProps = {}) {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const addMessage = useCallback((message: Omit<Message, 'id' | 'timestamp'>) => {
    const newMessage: Message = {
      ...message,
      id: `msg-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`,
      timestamp: new Date().toISOString()
    }
    setMessages(prev => {
      const updated = [...prev, newMessage]
      // Keep only last maxMessages
      return updated.slice(-maxMessages)
    })
    return newMessage.id
  }, [maxMessages])

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim() || loading) return

    setLoading(true)
    setError(null)

    // Add user message immediately
    addMessage({ role: 'user', content: content.trim() })
    setInput('')

    try {
      if (onSendMessage) {
        await onSendMessage(content.trim())
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send message')
      // Add error message
      addMessage({
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        hintType: 'encouragement'
      })
    } finally {
      setLoading(false)
    }
  }, [addMessage, loading, onSendMessage])

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage(input)
    }
  }, [input, sendMessage])

  const clearMessages = useCallback(() => {
    setMessages([])
    setError(null)
  }, [])

  const deleteMessage = useCallback((id: string) => {
    setMessages(prev => prev.filter(m => m.id !== id))
  }, [])

  const editMessage = useCallback((id: string, newContent: string) => {
    setMessages(prev =>
      prev.map(m => m.id === id ? { ...m, content: newContent } : m)
    )
  }, [])

  const lastAssistantMessage = messages.filter(m => m.role === 'assistant').pop()

  return {
    messages,
    input,
    setInput,
    loading,
    error,
    scrollRef,
    lastAssistantMessage,
    sendMessage,
    handleKeyPress,
    addMessage,
    clearMessages,
    deleteMessage,
    editMessage
  }
}
