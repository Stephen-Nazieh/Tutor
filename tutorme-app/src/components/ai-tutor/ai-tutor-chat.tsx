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
  className
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
    handleKeyPress
  } = useChat({ initialMessages, onSendMessage })

  const getMood = (hintType?: string) => {
    switch (hintType) {
      case 'encouragement': return 'encouraging'
      case 'socratic': return 'thinking'
      default: return 'neutral'
    }
  }

  const currentMood = getMood(lastAssistantMessage?.hintType)
  const progress = usage ? Math.round((usage.total - usage.remaining) / usage.total * 100) : 0

  return (
    <Card className={cn("flex flex-col", className)}>
      {/* Header */}
      <div className="p-3 border-b bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="flex items-center gap-3">
          <AIAvatar isSpeaking={isSpeaking} mood={currentMood} size="sm" />
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm">Your English Tutor</h3>
            <p className="text-xs text-gray-500 truncate">
              {enrollment ? `${enrollment.teachingAge} years teaching experience` : 'AI Tutor'}
            </p>
          </div>
          {usage && (
            <div className="text-right">
              <Badge variant={usage.remaining < 10 ? "destructive" : "secondary"} className="text-xs">
                {usage.remaining} msgs left
              </Badge>
              <div className="w-16 h-1 bg-gray-200 rounded-full mt-1 overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full transition-all" style={{ width: `${progress}%` }} />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Messages */}
      <CardContent className="flex-1 flex flex-col p-0 min-h-[300px]">
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex gap-2",
                  message.role === 'user' ? "justify-end" : "justify-start"
                )}
              >
                {message.role === 'assistant' && (
                  <AIAvatar size="sm" mood={getMood(message.hintType)} />
                )}
                <div
                  className={cn(
                    "max-w-[80%] rounded-2xl px-4 py-2 text-sm",
                    message.role === 'user'
                      ? "bg-blue-500 text-white rounded-br-none"
                      : "bg-gray-100 text-gray-800 rounded-bl-none"
                  )}
                >
                  {message.content}
                  {message.hintType && message.role === 'assistant' && (
                    <div className="flex items-center gap-1 mt-1">
                      <Sparkles className="w-3 h-3 text-yellow-500" />
                      <span className="text-xs text-gray-500 capitalize">{message.hintType}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={scrollRef} />
          </div>
        </ScrollArea>

        {/* Input */}
        <div className="p-3 border-t bg-white">
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" className="shrink-0">
              <Paperclip className="w-4 h-4" />
            </Button>
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask me anything..."
              disabled={loading || (usage?.remaining === 0)}
              className="flex-1"
            />
            <Button
              variant="ghost"
              size="icon"
              className="shrink-0"
              onClick={() => setIsRecording(!isRecording)}
            >
              {isRecording ? <MicOff className="w-4 h-4 text-red-500" /> : <Mic className="w-4 h-4" />}
            </Button>
            <Button
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || loading || (usage?.remaining === 0)}
              size="icon"
              className="shrink-0"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          {usage?.remaining === 0 && (
            <p className="text-xs text-center text-red-500 mt-2">
              Daily message limit reached. Upgrade for unlimited messages.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default AITutorChat
