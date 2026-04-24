'use client'

import { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { MentionInput } from '@/components/mentions/MentionInput'
import { renderMentions } from '@/lib/mentions/render-mentions'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { toast } from 'sonner'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { MessageSquare, Send, Loader2, Users, Bell, Search, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { DASHBOARD_THEMES, getThemeStyle } from '@/components/dashboard-theme'

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

  // Theme state with localStorage persistence
  const [themeId, setThemeId] = useState('current')
  const selectedTheme = DASHBOARD_THEMES.find(theme => theme.id === themeId) ?? DASHBOARD_THEMES[0]
  const themeStyle = getThemeStyle(selectedTheme)

  useEffect(() => {
    const savedTheme = localStorage.getItem('tutor-dashboard-theme')
    if (savedTheme) {
      setThemeId(savedTheme)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('tutor-dashboard-theme', themeId)
  }, [themeId])

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
        setConversations(prev =>
          prev.map(c =>
            c.id === selectedConversation.id
              ? {
                  ...c,
                  lastMessage: {
                    content,
                    createdAt: new Date().toISOString(),
                    read: true,
                    senderId: 'me',
                  },
                }
              : c
          )
        )
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
      <div
        className="bg-background text-foreground min-h-screen w-full px-4 py-8 sm:px-6 lg:px-8"
        style={themeStyle}
      >
        <div className="flex h-64 items-center justify-center">
          <Loader2 className="text-primary h-8 w-8 animate-spin" />
        </div>
      </div>
    )
  }

  return (
    <div
      className="bg-background text-foreground min-h-screen w-full px-4 py-8 sm:px-6 lg:px-8"
      style={themeStyle}
    >
      <div className="mb-6 min-h-[52px] shrink-0">
        <div className="flex h-full w-full items-center justify-between gap-2 rounded-2xl border border-[#D8E0EA] bg-[linear-gradient(to_bottom,_#F8FAFC,_#F1F5F9)] p-1.5 px-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_1px_2px_rgba(15,23,42,0.04)]">
          <div className="flex items-center gap-2">
            <h1 className="text-sm font-semibold text-[#1F2933]">Messages</h1>
          </div>
        </div>
      </div>

      <div className="grid h-[600px] grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Conversations List */}
        <Card className="border-border bg-card flex flex-col overflow-hidden lg:col-span-1">
          <CardHeader className="pb-3">
            <CardTitle className="text-foreground flex items-center justify-between text-base">
              Conversations
              {totalUnread > 0 && <Badge className="bg-red-500">{totalUnread}</Badge>}
            </CardTitle>
            <div className="relative mt-2">
              <Search className="text-muted-foreground absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
              <Input
                placeholder="Search messages..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="border-input bg-background pl-9 text-sm"
              />
            </div>
          </CardHeader>
          <CardContent className="flex-1 overflow-hidden p-0">
            <ScrollArea className="h-full">
              <div className="divide-border divide-y">
                {filteredConversations.length === 0 ? (
                  <div className="text-muted-foreground p-4 text-center">
                    <MessageSquare className="text-muted mx-auto mb-2 h-10 w-10" />
                    <p className="text-sm">No conversations yet</p>
                  </div>
                ) : (
                  filteredConversations.map(conv => (
                    <button
                      key={conv.id}
                      onClick={() => setSelectedConversation(conv)}
                      className={`hover:bg-accent flex w-full items-center gap-3 p-4 text-left transition-colors ${
                        selectedConversation?.id === conv.id ? 'bg-accent' : ''
                      }`}
                    >
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {conv.otherParticipant.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-foreground truncate text-sm font-medium">
                            {conv.otherParticipant.name}
                          </span>
                          {conv.unreadCount > 0 && (
                            <Badge className="ml-2 bg-red-500 text-xs">{conv.unreadCount}</Badge>
                          )}
                        </div>
                        <p className="text-muted-foreground truncate text-xs">
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
        <Card className="border-border bg-card flex flex-col overflow-hidden lg:col-span-2">
          {selectedConversation ? (
            <>
              <CardHeader className="border-border border-b pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {selectedConversation.otherParticipant.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-foreground text-base">
                        {selectedConversation.otherParticipant.name}
                      </CardTitle>
                      <p className="text-muted-foreground text-xs">Student</p>
                    </div>
                  </div>
                  <Link href={`/tutor/reports/${selectedConversation.otherParticipant.id}`}>
                    <Button variant="ghost" size="sm">
                      View Profile
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardHeader>

              <CardContent className="flex flex-1 flex-col p-0">
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {messages.length === 0 ? (
                      <div className="text-muted-foreground py-8 text-center">
                        <MessageSquare className="text-muted mx-auto mb-3 h-12 w-12" />
                        <p>No messages yet</p>
                        <p className="text-sm">Start the conversation!</p>
                      </div>
                    ) : (
                      messages.map(msg => (
                        <div
                          key={msg.id}
                          className={`flex gap-3 ${
                            msg.senderId === 'me' || msg.sender.profile?.name === 'You'
                              ? 'flex-row-reverse'
                              : ''
                          }`}
                        >
                          <Avatar className="h-8 w-8 shrink-0">
                            <AvatarFallback
                              className={`text-xs ${
                                msg.senderId === 'me' || msg.sender.profile?.name === 'You'
                                  ? 'bg-primary text-primary-foreground'
                                  : 'bg-muted'
                              }`}
                            >
                              {(msg.sender.profile?.name || 'U').charAt(0).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div
                            className={`max-w-[70%] rounded-lg p-3 text-sm ${
                              msg.senderId === 'me' || msg.sender.profile?.name === 'You'
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-muted text-muted-foreground'
                            }`}
                          >
                            <p>{renderMentions(msg.content)}</p>
                            <span
                              className={`mt-1 block text-xs ${
                                msg.senderId === 'me' || msg.sender.profile?.name === 'You'
                                  ? 'text-primary-foreground/70'
                                  : 'text-muted-foreground'
                              }`}
                            >
                              {new Date(msg.createdAt).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                              {msg.read &&
                                (msg.senderId === 'me' || msg.sender.profile?.name === 'You') &&
                                ' • Read'}
                            </span>
                          </div>
                        </div>
                      ))
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>

                <div className="border-border border-t p-4">
                  <div className="flex gap-2">
                    <MentionInput
                      placeholder="Type a message..."
                      value={inputMessage}
                      onChange={setInputMessage}
                      onKeyDown={e => {
                        if (e.key === 'Enter' && !e.shiftKey && !sending) {
                          e.preventDefault()
                          sendMessage()
                        }
                      }}
                      disabled={sending}
                      className="flex-1"
                    />
                    <Button onClick={sendMessage} disabled={sending || !inputMessage.trim()}>
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
            <CardContent className="flex flex-1 flex-col items-center justify-center text-gray-500">
              <MessageSquare className="mb-4 h-16 w-16 text-gray-300" />
              <p className="text-lg font-medium">Select a conversation</p>
              <p className="text-sm">Choose a conversation from the list to start messaging</p>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  )
}
