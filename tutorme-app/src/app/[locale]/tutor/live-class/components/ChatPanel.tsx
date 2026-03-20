'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { MentionInput } from '@/components/mentions/MentionInput'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { renderMentions } from '@/lib/mentions/render-mentions'
import { toast } from 'sonner'
import {
  Send,
  Paperclip,
  Smile,
  Pin,
  MoreVertical,
  ThumbsUp,
  AlertCircle,
  Check,
} from 'lucide-react'

interface ChatMessage {
  id: string
  senderId: string
  senderName: string
  content: string
  timestamp: string
  isPinned?: boolean
  isQuestion?: boolean
  likes: number
  isLiked?: boolean
}

interface Participant {
  id: string
  userId: string
  name: string
}

interface ChatPanelProps {
  onUnreadChange?: (count: number) => void
  participants: Participant[]
}

const EMOJIS = ['👍', '❤️', '😂', '😮', '🎉', '👏', '🔥', '💯']

export function ChatPanel({ onUnreadChange, participants }: ChatPanelProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      senderId: 's1',
      senderName: 'Alice Zhang',
      content: 'Great explanation of derivatives!',
      timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
      likes: 3,
    },
    {
      id: '2',
      senderId: 's2',
      senderName: 'Bob Li',
      content: 'Could you go over the chain rule one more time?',
      timestamp: new Date(Date.now() - 1000 * 60 * 3).toISOString(),
      isQuestion: true,
      likes: 1,
    },
    {
      id: '3',
      senderId: 'tutor',
      senderName: 'You',
      content: 'Sure! Let me explain it with a different example.',
      timestamp: new Date(Date.now() - 1000 * 60 * 2).toISOString(),
      likes: 0,
    },
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [pinnedMessage, setPinnedMessage] = useState<ChatMessage | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isAtBottom, setIsAtBottom] = useState(true)

  // Auto-scroll to bottom
  useEffect(() => {
    if (isAtBottom && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, isAtBottom])

  const handleSend = () => {
    if (!inputMessage.trim()) return

    const newMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      senderId: 'tutor',
      senderName: 'You',
      content: inputMessage,
      timestamp: new Date().toISOString(),
      likes: 0,
    }

    setMessages(prev => [...prev, newMessage])
    setInputMessage('')
    setShowEmojiPicker(false)
  }

  const handleLike = (messageId: string) => {
    setMessages(prev =>
      prev.map(msg =>
        msg.id === messageId
          ? { ...msg, likes: msg.isLiked ? msg.likes - 1 : msg.likes + 1, isLiked: !msg.isLiked }
          : msg
      )
    )
  }

  const handlePin = (message: ChatMessage) => {
    if (pinnedMessage?.id === message.id) {
      setPinnedMessage(null)
      toast.info('Message unpinned')
    } else {
      setPinnedMessage(message)
      toast.success('Message pinned')
    }
  }

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className="flex h-full flex-col bg-gray-800">
      {/* Pinned Message */}
      {pinnedMessage && (
        <div className="border-b border-blue-800 bg-blue-900/30 p-3">
          <div className="flex items-start gap-2">
            <Pin className="mt-0.5 h-4 w-4 shrink-0 text-blue-400" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm text-blue-200">
                {renderMentions(pinnedMessage.content)}
              </p>
              <p className="text-xs text-blue-400">{pinnedMessage.senderName}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 text-blue-400 hover:text-blue-300"
              onClick={() => setPinnedMessage(null)}
            >
              <span className="text-lg">&times;</span>
            </Button>
          </div>
        </div>
      )}

      {/* Messages */}
      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        <div className="space-y-4">
          {messages.map(message => (
            <div
              key={message.id}
              className={cn('group', message.senderId === 'tutor' && 'flex flex-row-reverse')}
            >
              <div
                className={cn(
                  'max-w-[85%]',
                  message.senderId === 'tutor' ? 'items-end' : 'items-start'
                )}
              >
                {/* Sender Name */}
                {message.senderId !== 'tutor' && (
                  <p className="mb-1 ml-1 text-xs text-gray-400">{message.senderName}</p>
                )}

                {/* Message Bubble */}
                <div
                  className={cn(
                    'relative rounded-2xl px-4 py-2',
                    message.senderId === 'tutor'
                      ? 'rounded-br-md bg-blue-600 text-white'
                      : 'rounded-bl-md bg-gray-700 text-white',
                    message.isQuestion && 'border-l-4 border-yellow-500'
                  )}
                >
                  {message.isQuestion && (
                    <div className="mb-1 flex items-center gap-1 text-xs text-yellow-400">
                      <AlertCircle className="h-3 w-3" />
                      Question
                    </div>
                  )}
                  <p className="text-sm">{renderMentions(message.content)}</p>

                  {/* Message Actions */}
                  <div
                    className={cn(
                      'absolute top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100',
                      message.senderId === 'tutor' ? '-left-16' : '-right-16'
                    )}
                  >
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-gray-400 hover:text-white"
                        onClick={() => handleLike(message.id)}
                      >
                        <ThumbsUp
                          className={cn(
                            'h-4 w-4',
                            message.isLiked && 'fill-yellow-500 text-yellow-500'
                          )}
                        />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-gray-400 hover:text-white"
                        onClick={() => handlePin(message)}
                      >
                        <Pin
                          className={cn(
                            'h-4 w-4',
                            pinnedMessage?.id === message.id && 'fill-blue-500 text-blue-500'
                          )}
                        />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Message Meta */}
                <div className="mt-1 flex items-center gap-2 text-xs text-gray-500">
                  <span>{formatTime(message.timestamp)}</span>
                  {message.likes > 0 && (
                    <span className="flex items-center gap-1 text-yellow-500">
                      <ThumbsUp className="h-3 w-3" />
                      {message.likes}
                    </span>
                  )}
                  {message.senderId === 'tutor' && <Check className="h-3 w-3 text-blue-400" />}
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="border-t border-gray-700 p-3">
        {/* Emoji Picker */}
        {showEmojiPicker && (
          <div className="mb-2 flex gap-2 rounded-lg bg-gray-700 p-2">
            {EMOJIS.map(emoji => (
              <button
                key={emoji}
                className="text-xl transition-transform hover:scale-125"
                onClick={() => {
                  setInputMessage(prev => prev + emoji)
                  setShowEmojiPicker(false)
                }}
              >
                {emoji}
              </button>
            ))}
          </div>
        )}

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-400 hover:text-white"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          >
            <Smile className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
            <Paperclip className="h-5 w-5" />
          </Button>
          <MentionInput
            placeholder="Type a message..."
            value={inputMessage}
            onChange={setInputMessage}
            onKeyDown={e => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                handleSend()
              }
            }}
            className="flex-1"
            variant="dark"
          />
          <Button
            size="icon"
            className="bg-blue-600 hover:bg-blue-700"
            onClick={handleSend}
            disabled={!inputMessage.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
