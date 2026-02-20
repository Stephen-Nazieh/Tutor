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
import { 
  Users, 
  MessageCircle, 
  HelpCircle, 
  Timer,
  Send,
  Sparkles,
  ArrowLeft
} from 'lucide-react'
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
  assignedTask
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
    "Can you explain this concept differently?",
    "What are the key points we should focus on?",
    "Can you give us a hint?",
    "Help us check our work"
  ]

  return (
    <div className="h-full flex flex-col bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={onLeave}>
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back
            </Button>
            <div>
              <h2 className="text-white font-semibold">{roomName}</h2>
              <p className="text-xs text-gray-400">
                Breakout Room • {participants.length} participants
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Timer */}
            {timeRemaining !== undefined && (
              <div className={`flex items-center gap-2 px-3 py-1 rounded-lg ${
                timeRemaining < 60 ? 'bg-red-900/50 text-red-400' : 'bg-gray-700 text-gray-300'
              }`}>
                <Timer className="w-4 h-4" />
                <span className="font-mono font-medium">
                  {formatTime(timeRemaining)}
                </span>
              </div>
            )}

            {/* AI Badge */}
            {aiEnabled && (
              <Badge variant="secondary" className="bg-purple-900/50 text-purple-300">
                <Sparkles className="w-3 h-3 mr-1" />
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
              <HelpCircle className="w-4 h-4 mr-1" />
              Ask for Help
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left: Task & Participants */}
        <div className="w-80 border-r border-gray-700 flex flex-col">
          {/* Assigned Task */}
          {assignedTask && (
            <Card className="m-4 bg-gray-800 border-gray-700">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-white">Task</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-300">{assignedTask}</p>
              </CardContent>
            </Card>
          )}

          {/* Participants */}
          <Card className="mx-4 mb-4 bg-gray-800 border-gray-700 flex-1">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-white flex items-center gap-2">
                <Users className="w-4 h-4" />
                Participants ({participants.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {participants.map((participant) => (
                  <div 
                    key={participant.id}
                    className="flex items-center gap-2 p-2 rounded-lg bg-gray-700/50"
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      participant.isTutor 
                        ? 'bg-purple-600 text-white' 
                        : 'bg-gray-600 text-gray-200'
                    }`}>
                      {participant.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white truncate">{participant.name}</p>
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
        <div className="flex-1 flex flex-col">
          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.length === 0 ? (
                <div className="text-center text-gray-500 py-8">
                  <MessageCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>No messages yet</p>
                  <p className="text-sm mt-1">Start the discussion!</p>
                </div>
              ) : (
                messages.map((msg) => (
                  <div 
                    key={msg.id}
                    className={`flex gap-3 ${
                      msg.isAi ? 'bg-purple-900/20' : ''
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0 ${
                      msg.isAi 
                        ? 'bg-purple-600 text-white' 
                        : 'bg-gray-600 text-gray-200'
                    }`}>
                      {msg.isAi ? '🤖' : msg.senderName.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-white">
                          {msg.isAi ? 'AI Assistant' : msg.senderName}
                        </span>
                        <span className="text-xs text-gray-500">
                          {new Date(msg.timestamp).toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </span>
                      </div>
                      <p className="text-sm text-gray-300 mt-1">{msg.content}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </ScrollArea>

          {/* AI Suggestions */}
          {aiEnabled && (
            <div className="px-4 py-2 border-t border-gray-700">
              <button
                onClick={() => setShowAiSuggestions(!showAiSuggestions)}
                className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1"
              >
                <Sparkles className="w-3 h-3" />
                {showAiSuggestions ? 'Hide' : 'Show'} AI Suggestions
              </button>
              
              {showAiSuggestions && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {aiSuggestions.map((suggestion, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setMessageInput(suggestion)
                        setShowAiSuggestions(false)
                      }}
                      className="text-xs px-3 py-1.5 bg-purple-900/50 text-purple-200 rounded-full hover:bg-purple-800/50"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-gray-700 bg-gray-800">
            <div className="flex gap-2">
              <Input
                placeholder="Type a message..."
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1 bg-gray-700 border-gray-600 text-white"
              />
              <Button onClick={handleSendMessage}>
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
