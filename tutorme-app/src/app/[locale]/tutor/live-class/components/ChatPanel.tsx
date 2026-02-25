'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'
import {
  Send,
  Paperclip,
  Smile,
  Pin,
  MoreVertical,
  ThumbsUp,
  AlertCircle,
  Check
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
      likes: 3
    },
    {
      id: '2',
      senderId: 's2',
      senderName: 'Bob Li',
      content: 'Could you go over the chain rule one more time?',
      timestamp: new Date(Date.now() - 1000 * 60 * 3).toISOString(),
      isQuestion: true,
      likes: 1
    },
    {
      id: '3',
      senderId: 'tutor',
      senderName: 'You',
      content: 'Sure! Let me explain it with a different example.',
      timestamp: new Date(Date.now() - 1000 * 60 * 2).toISOString(),
      likes: 0
    }
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
      likes: 0
    }

    setMessages(prev => [...prev, newMessage])
    setInputMessage('')
    setShowEmojiPicker(false)
  }

  const handleLike = (messageId: string) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId 
        ? { ...msg, likes: msg.isLiked ? msg.likes - 1 : msg.likes + 1, isLiked: !msg.isLiked }
        : msg
    ))
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
    <div className="flex flex-col h-full bg-gray-800">
      {/* Pinned Message */}
      {pinnedMessage && (
        <div className="p-3 bg-blue-900/30 border-b border-blue-800">
          <div className="flex items-start gap-2">
            <Pin className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm text-blue-200 truncate">{pinnedMessage.content}</p>
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
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "group",
                message.senderId === 'tutor' && "flex flex-row-reverse"
              )}
            >
              <div className={cn(
                "max-w-[85%]",
                message.senderId === 'tutor' ? "items-end" : "items-start"
              )}>
                {/* Sender Name */}
                {message.senderId !== 'tutor' && (
                  <p className="text-xs text-gray-400 mb-1 ml-1">{message.senderName}</p>
                )}

                {/* Message Bubble */}
                <div className={cn(
                  "relative rounded-2xl px-4 py-2",
                  message.senderId === 'tutor' 
                    ? "bg-blue-600 text-white rounded-br-md" 
                    : "bg-gray-700 text-white rounded-bl-md",
                  message.isQuestion && "border-l-4 border-yellow-500"
                )}>
                  {message.isQuestion && (
                    <div className="flex items-center gap-1 mb-1 text-yellow-400 text-xs">
                      <AlertCircle className="w-3 h-3" />
                      Question
                    </div>
                  )}
                  <p className="text-sm">{message.content}</p>
                  
                  {/* Message Actions */}
                  <div className={cn(
                    "absolute top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity",
                    message.senderId === 'tutor' ? "-left-16" : "-right-16"
                  )}>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-gray-400 hover:text-white"
                        onClick={() => handleLike(message.id)}
                      >
                        <ThumbsUp className={cn("w-4 h-4", message.isLiked && "fill-yellow-500 text-yellow-500")} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-gray-400 hover:text-white"
                        onClick={() => handlePin(message)}
                      >
                        <Pin className={cn("w-4 h-4", pinnedMessage?.id === message.id && "fill-blue-500 text-blue-500")} />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Message Meta */}
                <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                  <span>{formatTime(message.timestamp)}</span>
                  {message.likes > 0 && (
                    <span className="flex items-center gap-1 text-yellow-500">
                      <ThumbsUp className="w-3 h-3" />
                      {message.likes}
                    </span>
                  )}
                  {message.senderId === 'tutor' && <Check className="w-3 h-3 text-blue-400" />}
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="p-3 border-t border-gray-700">
        {/* Emoji Picker */}
        {showEmojiPicker && (
          <div className="flex gap-2 mb-2 p-2 bg-gray-700 rounded-lg">
            {EMOJIS.map(emoji => (
              <button
                key={emoji}
                className="text-xl hover:scale-125 transition-transform"
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
            <Smile className="w-5 h-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-400 hover:text-white"
          >
            <Paperclip className="w-5 h-5" />
          </Button>
          <Input
            placeholder="Type a message..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 bg-gray-700 border-gray-600 text-white placeholder:text-gray-500"
          />
          <Button
            size="icon"
            className="bg-blue-600 hover:bg-blue-700"
            onClick={handleSend}
            disabled={!inputMessage.trim()}
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
