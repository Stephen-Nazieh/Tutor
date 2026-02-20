'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { MessageSquare, X, Send, Bot, User } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAIChat, type Message } from './use-ai-chat'

interface AIChatProps {
  context?: {
    videoTitle?: string
    currentTimestamp?: number
    subject?: string
  }
  className?: string
}

function formatTime(date: Date) {
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })
}

export function AIChat({ context, className }: AIChatProps) {
  const [isOpen, setIsOpen] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const {
    messages,
    input,
    setInput,
    isLoading,
    sendMessage,
    handleKeyPress,
  } = useAIChat(context)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className={cn('fixed bottom-4 right-4 z-50', className)}>
      {isOpen && (
        <Card className="w-96 h-[500px] mb-4 flex flex-col shadow-2xl border-2 border-blue-200">
          <div className="flex items-center justify-between p-4 border-b bg-blue-500 text-white rounded-t-lg">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5" />
              <div>
                <h3 className="font-semibold">AI Tutor</h3>
                <p className="text-xs text-blue-100">
                  {context?.subject || 'General'} Help
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-blue-600"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <MessageBubble key={message.id} message={message} />
              ))}
              {isLoading && <LoadingBubble />}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                placeholder="Ask your question..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isLoading}
                className="flex-1"
              />
              <Button
                onClick={sendMessage}
                disabled={!input.trim() || isLoading}
                size="icon"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              AI uses Socratic method - guiding you to answers
            </p>
          </div>
        </Card>
      )}

      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'rounded-full w-14 h-14 shadow-lg transition-all',
          isOpen ? 'bg-gray-600 hover:bg-gray-700' : 'bg-blue-500 hover:bg-blue-600'
        )}
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageSquare className="w-6 h-6" />
        )}
      </Button>
    </div>
  )
}

function MessageBubble({ message }: { message: Message }) {
  return (
    <div
      className={cn(
        'flex gap-2',
        message.role === 'user' ? 'justify-end' : 'justify-start'
      )}
    >
      {message.role === 'assistant' && (
        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
          <Bot className="w-4 h-4 text-blue-600" />
        </div>
      )}

      <div
        className={cn(
          'max-w-[80%] rounded-lg p-3',
          message.role === 'user'
            ? 'bg-blue-500 text-white'
            : 'bg-gray-100 text-gray-800'
        )}
      >
        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
        {message.hintType && (
          <span
            className={cn(
              'inline-block text-xs px-2 py-0.5 rounded-full mt-2',
              message.hintType === 'socratic' && 'bg-purple-100 text-purple-700',
              message.hintType === 'encouragement' && 'bg-green-100 text-green-700',
              message.hintType === 'direct' && 'bg-orange-100 text-orange-700',
              message.hintType === 'clarification' && 'bg-blue-100 text-blue-700'
            )}
          >
            {message.hintType === 'socratic' && '💡 Socratic'}
            {message.hintType === 'encouragement' && '⭐ Encouragement'}
            {message.hintType === 'direct' && '📖 Direct'}
            {message.hintType === 'clarification' && '❓ Clarification'}
          </span>
        )}
        {message.relevantConcepts && message.relevantConcepts.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {message.relevantConcepts.map((concept, idx) => (
              <span
                key={idx}
                className="text-xs px-2 py-0.5 bg-blue-50 text-blue-600 rounded"
              >
                {concept}
              </span>
            ))}
          </div>
        )}
        <p
          className={cn(
            'text-xs mt-1',
            message.role === 'user' ? 'text-blue-100' : 'text-gray-500'
          )}
        >
          {formatTime(message.timestamp)}
        </p>
      </div>

      {message.role === 'user' && (
        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
          <User className="w-4 h-4 text-gray-600" />
        </div>
      )}
    </div>
  )
}

function LoadingBubble() {
  return (
    <div className="flex gap-2 justify-start">
      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
        <Bot className="w-4 h-4 text-blue-600" />
      </div>
      <div className="bg-gray-100 rounded-lg p-3">
        <div className="flex gap-1">
          <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" />
          <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-100" />
          <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-200" />
        </div>
      </div>
    </div>
  )
}
