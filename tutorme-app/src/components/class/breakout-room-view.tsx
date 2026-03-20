'use client'

/**
 * Breakout Room View (Student)
 * Interface for students in a breakout room
 */

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Users, MessageCircle, HelpCircle, Timer, Send, Sparkles, ArrowLeft } from 'lucide-react'
import { toast } from 'sonner'

interface Participant {
  id: string
  name: string
  avatar?: string
  isTutor?: boolean
}

interface ChatMessage {
  id: string
  senderId: string
  senderName: string
  content: string
  timestamp: Date
  isAi?: boolean
}

interface BreakoutRoomViewProps {
  roomId: string
  roomName: string
  participants: Participant[]
  timeRemaining?: number // seconds
  aiEnabled: boolean
  onRequestHelp: () => void
  onSendMessage: (message: string) => void
  onLeave: () => void
  messages: ChatMessage[]
  assignedTask?: string
}

export function BreakoutRoomView({
  roomId,
  roomName,
  participants,
  timeRemaining: initialTimeRemaining,
  aiEnabled,
  onRequestHelp,
  onSendMessage,
  onLeave,
  messages,
  assignedTask,
}: BreakoutRoomViewProps) {
  const [messageInput, setMessageInput] = useState('')
  const [timeRemaining, setTimeRemaining] = useState(initialTimeRemaining)
  const [showAiSuggestions, setShowAiSuggestions] = useState(false)

  // Countdown timer
  useEffect(() => {
    if (!timeRemaining || timeRemaining <= 0) return

    const interval = setInterval(() => {
      setTimeRemaining(prev => {
        if (!prev || prev <= 0) {
          clearInterval(interval)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [timeRemaining])

  const handleSendMessage = () => {
    if (!messageInput.trim()) return
    onSendMessage(messageInput)
    setMessageInput('')
  }

  const formatTime = (seconds?: number) => {
    if (!seconds || seconds <= 0) return '00:00'
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const aiSuggestions = [
    'Can you explain this concept differently?',
    'What are the key points we should focus on?',
    'Can you give us a hint?',
    'Help us check our work',
  ]

  return (
    <div className="flex h-full flex-col bg-gray-900">
      {/* Header */}
      <header className="border-b border-gray-700 bg-gray-800 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={onLeave}>
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back
            </Button>
            <div>
              <h2 className="font-semibold text-white">{roomName}</h2>
              <p className="text-xs text-gray-400">
                Breakout Room • {participants.length} participants
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Timer */}
            {timeRemaining !== undefined && (
              <div
                className={`flex items-center gap-2 rounded-lg px-3 py-1 ${
                  timeRemaining < 60 ? 'bg-red-900/50 text-red-400' : 'bg-gray-700 text-gray-300'
                }`}
              >
                <Timer className="h-4 w-4" />
                <span className="font-mono font-medium">{formatTime(timeRemaining)}</span>
              </div>
            )}

            {/* AI Badge */}
            {aiEnabled && (
              <Badge variant="secondary" className="bg-purple-900/50 text-purple-300">
                <Sparkles className="mr-1 h-3 w-3" />
                AI Active
              </Badge>
            )}

            {/* Help Button */}
            <Button
              size="sm"
              variant="outline"
              onClick={onRequestHelp}
              className="border-yellow-600 text-yellow-400 hover:bg-yellow-900/50"
            >
              <HelpCircle className="mr-1 h-4 w-4" />
              Ask for Help
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left: Task & Participants */}
        <div className="flex w-80 flex-col border-r border-gray-700">
          {/* Assigned Task */}
          {assignedTask && (
            <Card className="m-4 border-gray-700 bg-gray-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-white">Task</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-300">{assignedTask}</p>
              </CardContent>
            </Card>
          )}

          {/* Participants */}
          <Card className="mx-4 mb-4 flex-1 border-gray-700 bg-gray-800">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-sm text-white">
                <Users className="h-4 w-4" />
                Participants ({participants.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {participants.map(participant => (
                  <div
                    key={participant.id}
                    className="flex items-center gap-2 rounded-lg bg-gray-700/50 p-2"
                  >
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
                        participant.isTutor
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-600 text-gray-200'
                      }`}
                    >
                      {participant.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm text-white">{participant.name}</p>
                      {participant.isTutor && (
                        <Badge variant="secondary" className="text-xs">
                          Tutor
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right: Chat */}
        <div className="flex flex-1 flex-col">
          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.length === 0 ? (
                <div className="py-8 text-center text-gray-500">
                  <MessageCircle className="mx-auto mb-3 h-12 w-12 opacity-50" />
                  <p>No messages yet</p>
                  <p className="mt-1 text-sm">Start the discussion!</p>
                </div>
              ) : (
                messages.map(msg => (
                  <div key={msg.id} className={`flex gap-3 ${msg.isAi ? 'bg-purple-900/20' : ''}`}>
                    <div
                      className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-sm font-medium ${
                        msg.isAi ? 'bg-purple-600 text-white' : 'bg-gray-600 text-gray-200'
                      }`}
                    >
                      {msg.isAi ? '🤖' : msg.senderName.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-white">
                          {msg.isAi ? 'AI Assistant' : msg.senderName}
                        </span>
                        <span className="text-xs text-gray-500">
                          {new Date(msg.timestamp).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-gray-300">{msg.content}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </ScrollArea>

          {/* AI Suggestions */}
          {aiEnabled && (
            <div className="border-t border-gray-700 px-4 py-2">
              <button
                onClick={() => setShowAiSuggestions(!showAiSuggestions)}
                className="flex items-center gap-1 text-xs text-purple-400 hover:text-purple-300"
              >
                <Sparkles className="h-3 w-3" />
                {showAiSuggestions ? 'Hide' : 'Show'} AI Suggestions
              </button>

              {showAiSuggestions && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {aiSuggestions.map((suggestion, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setMessageInput(suggestion)
                        setShowAiSuggestions(false)
                      }}
                      className="rounded-full bg-purple-900/50 px-3 py-1.5 text-xs text-purple-200 hover:bg-purple-800/50"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Input */}
          <div className="border-t border-gray-700 bg-gray-800 p-4">
            <div className="flex gap-2">
              <Input
                placeholder="Type a message..."
                value={messageInput}
                onChange={e => setMessageInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
                className="flex-1 border-gray-600 bg-gray-700 text-white"
              />
              <Button onClick={handleSendMessage}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
