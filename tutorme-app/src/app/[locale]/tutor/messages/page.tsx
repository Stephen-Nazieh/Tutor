'use client'

import { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { toast } from 'sonner'
import { 
  MessageSquare, 
  Send, 
  Loader2, 
  Users,
  Bell,
  Search,
  ChevronRight
} from 'lucide-react'
import Link from 'next/link'

interface Conversation {
  id: string
  otherParticipant: {
    id: string
    name: string
    avatarUrl: string | null
  }
  lastMessage: {
    content: string
    createdAt: string
    read: boolean
    senderId: string
  } | null
  unreadCount: number
  updatedAt: string
}

interface Message {
  id: string
  content: string
  type: string
  senderId: string
  sender: {
    id: string
    profile: {
      name: string | null
      avatarUrl: string | null
    } | null
  }
  createdAt: string
  read: boolean
}

export default function CommunicationCenterPage() {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Load conversations on mount
  useEffect(() => {
    fetchConversations()
  }, [])

  // Load messages when conversation selected
  useEffect(() => {
    if (selectedConversation) {
      fetchMessages(selectedConversation.id)
    }
  }, [selectedConversation])

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const fetchConversations = async () => {
    try {
      const res = await fetch('/api/conversations', {
        credentials: 'include',
      })
      if (res.ok) {
        const data = await res.json()
        setConversations(data.conversations || [])
      }
    } catch {
      toast.error('Failed to load conversations')
    } finally {
      setLoading(false)
    }
  }

  const fetchMessages = async (conversationId: string) => {
    try {
      const res = await fetch(`/api/conversations/${conversationId}/messages`, {
        credentials: 'include',
      })
      if (res.ok) {
        const data = await res.json()
        setMessages(data.messages || [])
      }
    } catch {
      toast.error('Failed to load messages')
    }
  }

  const sendMessage = async () => {
    if (!inputMessage.trim() || !selectedConversation) return

    setSending(true)
    const content = inputMessage
    setInputMessage('')

    try {
      const res = await fetch(`/api/conversations/${selectedConversation.id}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ content }),
      })

      if (res.ok) {
        const data = await res.json()
        setMessages(prev => [...prev, data.message])
        // Update last message in conversations list
        setConversations(prev => prev.map(c => 
          c.id === selectedConversation.id 
            ? { ...c, lastMessage: { content, createdAt: new Date().toISOString(), read: true, senderId: 'me' } }
            : c
        ))
      } else {
        toast.error('Failed to send message')
        setInputMessage(content)
      }
    } catch {
      toast.error('Failed to send message')
      setInputMessage(content)
    } finally {
      setSending(false)
    }
  }

  const filteredConversations = conversations.filter(c => 
    c.otherParticipant.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const totalUnread = conversations.reduce((sum, c) => sum + c.unreadCount, 0)

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Communication Center</h1>
        <p className="text-gray-600 mt-1">
          Manage all your student communications in one place
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
        {/* Conversations List */}
        <Card className="lg:col-span-1 overflow-hidden flex flex-col">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center justify-between">
              Conversations
              {totalUnread > 0 && (
                <Badge className="bg-red-500">{totalUnread}</Badge>
              )}
            </CardTitle>
            <div className="relative mt-2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 text-sm"
              />
            </div>
          </CardHeader>
          <CardContent className="p-0 flex-1 overflow-hidden">
            <ScrollArea className="h-full">
              <div className="divide-y">
                {filteredConversations.length === 0 ? (
                  <div className="p-4 text-center text-gray-500">
                    <MessageSquare className="w-10 h-10 mx-auto mb-2 text-gray-300" />
                    <p className="text-sm">No conversations yet</p>
                  </div>
                ) : (
                  filteredConversations.map((conv) => (
                    <button
                      key={conv.id}
                      onClick={() => setSelectedConversation(conv)}
                      className={`w-full p-4 text-left hover:bg-gray-50 transition-colors flex items-center gap-3 ${
                        selectedConversation?.id === conv.id ? 'bg-blue-50' : ''
                      }`}
                    >
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-blue-100 text-blue-700">
                          {conv.otherParticipant.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-sm truncate">
                            {conv.otherParticipant.name}
                          </span>
                          {conv.unreadCount > 0 && (
                            <Badge className="bg-red-500 text-xs ml-2">
                              {conv.unreadCount}
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 truncate">
                          {conv.lastMessage?.content || 'No messages yet'}
                        </p>
                      </div>
                    </button>
                  ))
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Chat Area */}
        <Card className="lg:col-span-2 flex flex-col overflow-hidden">
          {selectedConversation ? (
            <>
              <CardHeader className="pb-3 border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-blue-100 text-blue-700">
                        {selectedConversation.otherParticipant.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-base">
                        {selectedConversation.otherParticipant.name}
                      </CardTitle>
                      <p className="text-xs text-gray-500">Student</p>
                    </div>
                  </div>
                  <Link href={`/tutor/reports/${selectedConversation.otherParticipant.id}`}>
                    <Button variant="ghost" size="sm">
                      View Profile
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </Link>
                </div>
              </CardHeader>

              <CardContent className="flex-1 p-0 flex flex-col">
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {messages.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">
                        <MessageSquare className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                        <p>No messages yet</p>
                        <p className="text-sm">Start the conversation!</p>
                      </div>
                    ) : (
                      messages.map((msg) => (
                        <div
                          key={msg.id}
                          className={`flex gap-3 ${
                            msg.senderId === 'me' || msg.sender.profile?.name === 'You' 
                              ? 'flex-row-reverse' 
                              : ''
                          }`}
                        >
                          <Avatar className="h-8 w-8 shrink-0">
                            <AvatarFallback className={`text-xs ${
                              msg.senderId === 'me' || msg.sender.profile?.name === 'You'
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-200'
                            }`}>
                              {(msg.sender.profile?.name || 'U').charAt(0).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div
                            className={`max-w-[70%] p-3 rounded-lg text-sm ${
                              msg.senderId === 'me' || msg.sender.profile?.name === 'You'
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            <p>{msg.content}</p>
                            <span className={`text-xs mt-1 block ${
                              msg.senderId === 'me' || msg.sender.profile?.name === 'You'
                                ? 'text-blue-200'
                                : 'text-gray-500'
                            }`}>
                              {new Date(msg.createdAt).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                              {msg.read && (msg.senderId === 'me' || msg.sender.profile?.name === 'You') && (
                                ' • Read'
                              )}
                            </span>
                          </div>
                        </div>
                      ))
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>

                <div className="p-4 border-t">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Type a message..."
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && !sending && sendMessage()}
                      disabled={sending}
                    />
                    <Button 
                      onClick={sendMessage} 
                      disabled={sending || !inputMessage.trim()}
                    >
                      {sending ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Send className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </>
          ) : (
            <CardContent className="flex-1 flex flex-col items-center justify-center text-gray-500">
              <MessageSquare className="w-16 h-16 mb-4 text-gray-300" />
              <p className="text-lg font-medium">Select a conversation</p>
              <p className="text-sm">Choose a conversation from the list to start messaging</p>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  )
}
