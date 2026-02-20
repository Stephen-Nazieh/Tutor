/**
 * Chat Panel Component
 * Real-time chat for class participants
 */

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ChatMessage } from '@/lib/socket-server'
import { Send } from 'lucide-react'

interface ChatPanelProps {
  messages: ChatMessage[]
  onSendMessage: (text: string) => void
  currentUserId: string
}

export function ChatPanel({ messages, onSendMessage, currentUserId }: ChatPanelProps) {
  const [input, setInput] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = () => {
    if (!input.trim()) return
    onSendMessage(input.trim())
    setInput('')
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 py-3 border-b border-gray-700">
        <h3 className="text-white font-medium">Chat</h3>
      </div>

      <ScrollArea ref={scrollRef} className="flex-1 p-4">
        <div className="space-y-3">
          {messages.length === 0 && (
            <p className="text-gray-500 text-center text-sm">
              No messages yet. Start the conversation!
            </p>
          )}

          {messages.map((msg) => {
            const isMe = msg.userId === currentUserId
            const isAI = msg.isAI
            const isBroadcast = (msg as any).isBroadcast

            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs text-gray-400">
                    {isAI ? '🤖 AI' : isBroadcast ? '📢 Tutor' : msg.name}
                  </span>
                  <span className="text-xs text-gray-600">
                    {new Date(msg.timestamp).toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </span>
                </div>
                <div
                  className={`max-w-[85%] px-3 py-2 rounded-lg text-sm ${
                    isMe
                      ? 'bg-blue-600 text-white'
                      : isAI
                      ? 'bg-purple-600 text-white'
                      : isBroadcast
                      ? 'bg-yellow-600 text-white'
                      : 'bg-gray-700 text-gray-100'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            )
          })}
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-gray-700">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            className="flex-1 bg-gray-700 border-gray-600 text-white"
          />
          <Button onClick={handleSend} size="icon">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
