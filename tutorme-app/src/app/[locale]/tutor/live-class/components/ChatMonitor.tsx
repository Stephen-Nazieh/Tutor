'use client'

import { useState, useRef, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { MentionInput } from '@/components/mentions/MentionInput'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import { renderMentions } from '@/lib/mentions/render-mentions'
import { toast } from 'sonner'
import {
  MessageSquare,
  Pin,
  PinOff,
  ThumbsUp,
  HelpCircle,
  AlertCircle,
  Send,
  Smile,
  Frown,
  Meh,
} from 'lucide-react'
import type { ChatMessage, LiveStudent } from '../types'
import type { Socket } from 'socket.io-client'

interface ChatMonitorProps {
  messages: ChatMessage[]
  students: LiveStudent[]
  socket: Socket | null
  roomId: string
  onPinMessage?: (messageId: string) => void
}

export function ChatMonitor({
  messages,
  students,
  socket,
  roomId,
  onPinMessage,
}: ChatMonitorProps) {
  const [filter, setFilter] = useState<'all' | 'questions' | 'pinned'>('all')
  const [inputMessage, setInputMessage] = useState('')
  const [localMessages, setLocalMessages] = useState<ChatMessage[]>(messages)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Sync with parent messages
  useEffect(() => {
    setLocalMessages(messages)
  }, [messages])

  // Listen for new messages via socket
  useEffect(() => {
    if (!socket) return

    const handleChatMessage = (message: {
      id: string
      userId: string
      name: string
      text: string
      timestamp: string
    }) => {
      setLocalMessages(prev => [
        ...prev,
        {
          id: message.id,
          studentId: message.userId,
          studentName: message.name,
          content: message.text,
          timestamp: message.timestamp,
          sentiment: 'neutral',
          isQuestion: message.text.includes('?'),
        },
      ])
    }

    socket.on('chat_message', handleChatMessage)
    return () => {
      socket.off('chat_message', handleChatMessage)
    }
  }, [socket, students])

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const filteredMessages = localMessages.filter(msg => {
    if (filter === 'questions') return msg.isQuestion || msg.sentiment === 'confused'
    if (filter === 'pinned') return msg.isPinned
    return true
  })

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return <Smile className="h-3 w-3 text-green-500" />
      case 'negative':
        return <Frown className="h-3 w-3 text-red-500" />
      case 'confused':
        return <AlertCircle className="h-3 w-3 text-orange-500" />
      case 'question':
        return <HelpCircle className="h-3 w-3 text-blue-500" />
      default:
        return <Meh className="h-3 w-3 text-gray-400" />
    }
  }

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return 'bg-green-50 border-green-200'
      case 'negative':
        return 'bg-red-50 border-red-200'
      case 'confused':
        return 'bg-orange-50 border-orange-200'
      case 'question':
        return 'bg-blue-50 border-blue-200'
      default:
        return 'bg-white'
    }
  }

  const questionCount = localMessages.filter(m => m.isQuestion || m.sentiment === 'confused').length
  const pinnedCount = localMessages.filter(m => m.isPinned).length

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return
    if (!socket) {
      toast.error('Not connected to class')
      return
    }

    // Send broadcast via socket
    socket.emit('tutor_broadcast', {
      text: inputMessage,
      targetGroup: 'all',
    })

    // Add to local messages
    setLocalMessages(prev => [
      ...prev,
      {
        id: `tutor-${Date.now()}`,
        studentId: 'tutor',
        studentName: 'You',
        content: inputMessage,
        timestamp: new Date().toISOString(),
        sentiment: 'neutral',
      },
    ])

    setInputMessage('')
  }

  return (
    <Card className="flex h-full flex-col">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            <CardTitle className="text-sm font-medium">Chat</CardTitle>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="mt-2 flex gap-1">
          <Button
            variant={filter === 'all' ? 'default' : 'ghost'}
            size="sm"
            className="h-7 flex-1 text-xs"
            onClick={() => setFilter('all')}
          >
            All
          </Button>
          <Button
            variant={filter === 'questions' ? 'default' : 'ghost'}
            size="sm"
            className="h-7 flex-1 text-xs"
            onClick={() => setFilter('questions')}
          >
            <HelpCircle className="mr-1 h-3 w-3" />
            Questions ({questionCount})
          </Button>
          <Button
            variant={filter === 'pinned' ? 'default' : 'ghost'}
            size="sm"
            className="h-7 flex-1 text-xs"
            onClick={() => setFilter('pinned')}
          >
            <Pin className="mr-1 h-3 w-3" />
            Pinned ({pinnedCount})
          </Button>
        </div>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col p-0">
        {/* Messages */}
        <ScrollArea className="flex-1 px-4" ref={scrollRef}>
          <div className="space-y-3 py-2">
            {filteredMessages.length === 0 ? (
              <div className="py-8 text-center">
                <MessageSquare className="mx-auto mb-2 h-10 w-10 text-gray-300" />
                <p className="text-sm text-gray-500">
                  {filter === 'questions'
                    ? 'No questions yet'
                    : filter === 'pinned'
                      ? 'No pinned messages'
                      : 'No messages yet'}
                </p>
              </div>
            ) : (
              filteredMessages.map(message => (
                <div
                  key={message.id}
                  className={cn(
                    'rounded-lg border p-3 text-sm',
                    getSentimentColor(message.sentiment),
                    message.isPinned && 'border-yellow-300 shadow-sm'
                  )}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium">{message.studentName}</span>
                        {getSentimentIcon(message.sentiment)}
                        {message.isQuestion && (
                          <Badge variant="outline" className="h-4 px-1 py-0 text-xs">
                            Question
                          </Badge>
                        )}
                      </div>
                      <p className="mt-1 text-gray-700">{renderMentions(message.content)}</p>
                      <span className="mt-1 text-xs text-gray-400">
                        {new Date(message.timestamp).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>

                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 shrink-0"
                      onClick={() => onPinMessage?.(message.id)}
                    >
                      {message.isPinned ? (
                        <PinOff className="h-3 w-3 text-yellow-600" />
                      ) : (
                        <Pin className="h-3 w-3 text-gray-400" />
                      )}
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>

        {/* Input */}
        <div className="mt-auto border-t p-3">
          <div className="flex gap-2">
            <MentionInput
              placeholder="Broadcast message..."
              value={inputMessage}
              onChange={setInputMessage}
              onKeyDown={e => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleSendMessage()
                }
              }}
              className="flex-1 text-sm"
            />
            <Button size="icon" onClick={handleSendMessage}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
