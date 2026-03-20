/**
 * AI Tutor Chat - Compact chat interface
 * Refactored to use useChat hook
 */

'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Send, Mic, MicOff, Paperclip, Sparkles } from 'lucide-react'
import { AIAvatar } from './ai-avatar'
import { cn } from '@/lib/utils'
import { useChat, type Message } from '@/hooks/useChat'

interface AITutorChatProps {
  initialMessages?: Message[]
  onSendMessage: (message: string) => Promise<void>
  isSpeaking?: boolean
  enrollment?: {
    teachingAge: number
    voiceGender: string
    voiceAccent: string
  }
  usage?: {
    remaining: number
    total: number
  }
  className?: string
}

function AITutorChat({
  initialMessages = [],
  onSendMessage,
  isSpeaking = false,
  enrollment,
  usage,
  className,
}: AITutorChatProps) {
  const [isRecording, setIsRecording] = useState(false)

  const {
    messages,
    input,
    setInput,
    loading,
    scrollRef,
    lastAssistantMessage,
    sendMessage,
    handleKeyPress,
  } = useChat({ initialMessages, onSendMessage })

  const getMood = (hintType?: string) => {
    switch (hintType) {
      case 'encouragement':
        return 'encouraging'
      case 'socratic':
        return 'thinking'
      default:
        return 'neutral'
    }
  }

  const currentMood = getMood(lastAssistantMessage?.hintType)
  const progress = usage ? Math.round(((usage.total - usage.remaining) / usage.total) * 100) : 0

  return (
    <Card className={cn('flex flex-col', className)}>
      {/* Header */}
      <div className="border-b bg-gradient-to-r from-blue-50 to-purple-50 p-3">
        <div className="flex items-center gap-3">
          <AIAvatar isSpeaking={isSpeaking} mood={currentMood} size="sm" />
          <div className="min-w-0 flex-1">
            <h3 className="text-sm font-semibold">Your English Tutor</h3>
            <p className="truncate text-xs text-gray-500">
              {enrollment ? `${enrollment.teachingAge} years teaching experience` : 'AI Tutor'}
            </p>
          </div>
          {usage && (
            <div className="text-right">
              <Badge
                variant={usage.remaining < 10 ? 'destructive' : 'secondary'}
                className="text-xs"
              >
                {usage.remaining} msgs left
              </Badge>
              <div className="mt-1 h-1 w-16 overflow-hidden rounded-full bg-gray-200">
                <div
                  className="h-full rounded-full bg-blue-500 transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Messages */}
      <CardContent className="flex min-h-[300px] flex-1 flex-col p-0">
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map(message => (
              <div
                key={message.id}
                className={cn(
                  'flex gap-2',
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                )}
              >
                {message.role === 'assistant' && (
                  <AIAvatar size="sm" mood={getMood(message.hintType)} />
                )}
                <div
                  className={cn(
                    'max-w-[80%] rounded-2xl px-4 py-2 text-sm',
                    message.role === 'user'
                      ? 'rounded-br-none bg-blue-500 text-white'
                      : 'rounded-bl-none bg-gray-100 text-gray-800'
                  )}
                >
                  {message.content}
                  {message.hintType && message.role === 'assistant' && (
                    <div className="mt-1 flex items-center gap-1">
                      <Sparkles className="h-3 w-3 text-yellow-500" />
                      <span className="text-xs capitalize text-gray-500">{message.hintType}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={scrollRef} />
          </div>
        </ScrollArea>

        {/* Input */}
        <div className="border-t bg-white p-3">
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" className="shrink-0">
              <Paperclip className="h-4 w-4" />
            </Button>
            <Input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask me anything..."
              disabled={loading || usage?.remaining === 0}
              className="flex-1"
            />
            <Button
              variant="ghost"
              size="icon"
              className="shrink-0"
              onClick={() => setIsRecording(!isRecording)}
            >
              {isRecording ? (
                <MicOff className="h-4 w-4 text-red-500" />
              ) : (
                <Mic className="h-4 w-4" />
              )}
            </Button>
            <Button
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || loading || usage?.remaining === 0}
              size="icon"
              className="shrink-0"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          {usage?.remaining === 0 && (
            <p className="mt-2 text-center text-xs text-red-500">
              Daily message limit reached. Upgrade for unlimited messages.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default AITutorChat
