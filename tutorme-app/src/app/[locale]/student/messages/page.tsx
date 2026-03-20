'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import { MessageSquare, Send, Search, UserCircle, MoreVertical, Lock } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface Conversation {
  id: string
  name: string
  lastMessage: string
  timestamp: string
  unread: number
  online: boolean
}

interface ChatMessage {
  id: string
  content: string
  sender: 'student' | 'tutor'
  timestamp: string
}

export default function StudentMessagesPage() {
  const [inputMessage, setInputMessage] = useState('')
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      content: 'Hi! How are you doing with the algebra homework?',
      sender: 'tutor',
      timestamp: '10:00 AM',
    },
    {
      id: '2',
      content: "I'm having trouble with problem 5. Can you help?",
      sender: 'student',
      timestamp: '10:05 AM',
    },
    {
      id: '3',
      content: "Don't forget about the quiz tomorrow!",
      sender: 'tutor',
      timestamp: '10:30 AM',
    },
  ])
  const [waitingForResponse, setWaitingForResponse] = useState(false)

  const conversations: Conversation[] = [
    {
      id: '1',
      name: 'Mr. Smith (Math Tutor)',
      lastMessage: "Don't forget about the quiz tomorrow!",
      timestamp: '10 min ago',
      unread: 2,
      online: true,
    },
    {
      id: '2',
      name: 'Study Group - Physics',
      lastMessage: 'Alice: Can someone explain problem 3?',
      timestamp: '1 hour ago',
      unread: 0,
      online: false,
    },
  ]

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return

    if (waitingForResponse) {
      toast.info('Please wait for your tutor to respond before sending another message.')
      return
    }

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      content: inputMessage.trim(),
      sender: 'student',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }

    setMessages(prev => [...prev, newMessage])
    setInputMessage('')
    setWaitingForResponse(true)
    toast.success('Message sent. Waiting for tutor response.')
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="flex items-center gap-2 text-2xl font-bold text-gray-900">
          <MessageSquare className="h-6 w-6" />
          Messages
        </h1>
        <p className="mt-1 text-gray-600">Chat with your tutors and classmates</p>
        {waitingForResponse && (
          <div className="mt-2 flex w-fit items-center gap-2 rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-600">
            <Lock className="h-4 w-4" />
            <span>You have sent a message. Please wait for the tutor to respond.</span>
          </div>
        )}
      </div>

      <div className="grid h-[600px] grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Conversations List */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input placeholder="Search messages..." className="pl-9" />
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            {conversations.map(conv => (
              <div
                key={conv.id}
                className="flex cursor-pointer items-center gap-3 rounded-lg p-3 transition-colors hover:bg-gray-50"
              >
                <div className="relative">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                    <UserCircle className="h-6 w-6 text-blue-600" />
                  </div>
                  {conv.online && (
                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-500" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="truncate text-sm font-medium">{conv.name}</h4>
                    <span className="text-xs text-gray-400">{conv.timestamp}</span>
                  </div>
                  <p className="truncate text-sm text-gray-500">{conv.lastMessage}</p>
                </div>
                {conv.unread > 0 && (
                  <span className="rounded-full bg-blue-600 px-2 py-1 text-xs text-white">
                    {conv.unread}
                  </span>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Chat Area */}
        <Card className="flex flex-col lg:col-span-2">
          <CardHeader className="border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                  <UserCircle className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium">Mr. Smith (Math Tutor)</h3>
                  <p className="text-xs text-green-600">Online</p>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>View Profile</DropdownMenuItem>
                  <DropdownMenuItem>Clear Chat</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent className="flex flex-1 flex-col">
            <div className="flex-1 space-y-4 overflow-y-auto py-4">
              {messages.map(msg => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'student' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`${msg.sender === 'student' ? 'bg-blue-600 text-white' : 'bg-gray-100'} max-w-[70%] rounded-lg px-4 py-2`}
                  >
                    <p className="text-sm">{msg.content}</p>
                    <span
                      className={`mt-1 text-xs ${msg.sender === 'student' ? 'text-blue-200' : 'text-gray-400'}`}
                    >
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-2 border-t pt-4">
              <Input
                placeholder={
                  waitingForResponse ? 'Waiting for tutor response...' : 'Type a message...'
                }
                className="flex-1"
                value={inputMessage}
                onChange={e => setInputMessage(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    handleSendMessage()
                  }
                }}
                disabled={waitingForResponse}
              />
              <Button
                size="icon"
                onClick={handleSendMessage}
                disabled={waitingForResponse || !inputMessage.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
