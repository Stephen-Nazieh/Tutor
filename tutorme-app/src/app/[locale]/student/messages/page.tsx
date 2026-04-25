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
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 bg-[#FFFFFF] min-h-screen">
      <div className="mb-6 min-h-[52px] shrink-0">
        <div className="flex h-full w-full items-center justify-between gap-2 rounded-2xl border border-[#E5E7EB] bg-white p-1.5 px-4 shadow-[0_8px_20px_rgba(0,0,0,0.08)]">
          <div className="flex items-center gap-2">
            <h1 className="text-sm font-bold text-slate-800">Messages</h1>
          </div>
        </div>
        {waitingForResponse && (
          <div className="mt-4 flex w-fit items-center gap-2 rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-600 border border-amber-200">
            <Lock className="h-4 w-4" />
            <span>You have sent a message. Please wait for the tutor to respond.</span>
          </div>
        )}
      </div>

      <div className="grid h-[600px] grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Conversations List */}
        <div className="flex flex-col overflow-hidden rounded-[20px] border border-[rgba(0,0,0,0.05)] bg-[#FFFFFF] shadow-[0_8px_24px_rgba(0,0,0,0.10)] lg:col-span-1">
          <div className="p-4 pb-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input placeholder="Search messages..." className="pl-9 text-sm bg-slate-50/50 border-slate-200" />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-0">
            <div className="divide-y divide-slate-100">
              {conversations.map(conv => (
                <div
                  key={conv.id}
                  className="flex cursor-pointer items-center gap-3 p-4 transition-colors hover:bg-slate-50"
                >
                  <div className="relative">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-50">
                      <UserCircle className="h-6 w-6 text-indigo-600" />
                    </div>
                    {conv.online && (
                      <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-emerald-500" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="truncate text-sm font-semibold text-slate-800">{conv.name}</h4>
                      <span className="text-[10px] text-slate-400">{conv.timestamp}</span>
                    </div>
                    <p className="truncate text-xs text-slate-500 mt-0.5">{conv.lastMessage}</p>
                  </div>
                  {conv.unread > 0 && (
                    <span className="rounded-full bg-indigo-600 px-2 py-0.5 text-[10px] font-medium text-white">
                      {conv.unread}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex flex-col overflow-hidden rounded-[20px] border border-[rgba(0,0,0,0.05)] bg-[#FFFFFF] shadow-[0_8px_24px_rgba(0,0,0,0.10)] lg:col-span-2">
          <div className="border-b border-slate-100 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-50">
                  <UserCircle className="h-6 w-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-base">Mr. Smith (Math Tutor)</h3>
                  <p className="text-xs font-medium text-emerald-500">Online</p>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-slate-500 hover:text-slate-800 hover:bg-slate-50">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>View Profile</DropdownMenuItem>
                  <DropdownMenuItem>Clear Chat</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          
          <div className="flex flex-1 flex-col p-0 bg-slate-50/30">
            <div className="flex-1 space-y-4 overflow-y-auto p-4">
              {messages.map(msg => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'student' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`${msg.sender === 'student' ? 'bg-indigo-600 text-white rounded-tr-sm shadow-sm' : 'bg-white border border-slate-100 text-slate-800 rounded-tl-sm shadow-sm'} max-w-[70%] rounded-2xl px-4 py-3`}
                  >
                    <p className="text-sm leading-relaxed">{msg.content}</p>
                    <span
                      className={`mt-1.5 block text-[10px] font-medium ${msg.sender === 'student' ? 'text-indigo-200' : 'text-slate-400'}`}
                    >
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 border-t border-slate-100 bg-white p-4">
              <Input
                placeholder={
                  waitingForResponse ? 'Waiting for tutor response...' : 'Type a message...'
                }
                className="flex-1 bg-slate-50/50 border-slate-200 rounded-xl"
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
                className="rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white h-10 w-10 p-0 shrink-0"
              >
                <Send className="h-4 w-4 ml-0.5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
