'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import { useSession } from 'next-auth/react'
import { useParams, usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { ScrollArea } from '@/components/ui/scroll-area'
import { renderMentions } from '@/lib/mentions/render-mentions'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'
import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'
import {
  MessageSquare,
  Loader2,
  Search,
  Bell,
  CheckCircle2,
  Calendar,
  BookOpen,
  Trophy,
  Users,
  DollarSign,
  Trash2,
  CheckCheck,
  Info,
  Inbox,
  ChevronRight,
} from 'lucide-react'

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

interface AppNotification {
  id: string
  type: string
  title: string
  message: string
  read: boolean
  createdAt: string
  actionUrl?: string | null
  data?: Record<string, unknown> | null
}

interface CommunicationsPageProps {
  role: 'student' | 'tutor'
}

export default function CommunicationsPage({ role }: CommunicationsPageProps) {
  const { data: session } = useSession()
  const params = useParams()
  const pathname = usePathname()

  // Locale helpers for tutor action URLs
  const locale = typeof params?.locale === 'string' ? params.locale : 'en'
  const hasLocalePrefix = pathname.startsWith(`/${locale}/`)

  // Messaging state
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [messagesLoading, setMessagesLoading] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Notifications state
  const [notifications, setNotifications] = useState<AppNotification[]>([])
  const [notificationsLoading, setNotificationsLoading] = useState(true)
  const [respondingIds, setRespondingIds] = useState<Record<string, 'accept' | 'reject' | null>>({})

  useEffect(() => {
    fetchConversations()
    fetchNotifications()
  }, [])

  useEffect(() => {
    if (selectedConversation) {
      fetchMessages(selectedConversation.id)
    }
  }, [selectedConversation])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const fetchConversations = async () => {
    try {
      const res = await fetch('/api/conversations', { credentials: 'include' })
      if (res.ok) {
        const data = await res.json()
        setConversations(data.conversations || [])
      } else {
        toast.error('Failed to load conversations')
      }
    } catch {
      toast.error('Failed to load conversations')
    } finally {
      setMessagesLoading(false)
    }
  }

  const fetchMessages = async (conversationId: string) => {
    try {
      const res = await fetch(`/api/conversations/${conversationId}/messages`, { credentials: 'include' })
      if (res.ok) {
        const data = await res.json()
        setMessages(data.messages || [])
      } else {
        toast.error('Failed to load messages')
      }
    } catch {
      toast.error('Failed to load messages')
    }
  }

  const fetchNotifications = async () => {
    try {
      const res = await fetch('/api/notifications', { credentials: 'include' })
      if (!res.ok) {
        if (res.status === 401) return
        throw new Error('Failed to load notifications')
      }
      const data = await res.json()
      const list: AppNotification[] = (data.notifications || []).map((n: Record<string, unknown>) => ({
        id: (n.notificationId as string) || (n.id as string),
        type: (n.type as string) || 'message',
        title: n.title as string,
        message: n.message as string,
        read: !!n.read,
        createdAt: (n.createdAt as string) || new Date().toISOString(),
        actionUrl: (n.actionUrl as string | null) || null,
        data: (n.data as Record<string, unknown> | null) || null,
      }))
      setNotifications(list)
    } catch {
      toast.error('Failed to load notifications')
    } finally {
      setNotificationsLoading(false)
    }
  }

  const filteredConversations = conversations.filter(c =>
    c.otherParticipant.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const totalUnreadMessages = conversations.reduce((sum, c) => sum + c.unreadCount, 0)
  const unreadCount = notifications.filter(n => !n.read).length

  const isMe = (msg: Message) => {
    if (role === 'student') {
      return msg.senderId === session?.user?.id
    }
    return msg.senderId === 'me' || msg.sender.profile?.name === 'You'
  }

  const markAllAsRead = async () => {
    try {
      const res = await fetch('/api/notifications', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ markAll: true }),
      })
      if (!res.ok) throw new Error('Failed to mark as read')
      setNotifications(prev => prev.map(n => ({ ...n, read: true })))
      toast.success('All marked as read')
    } catch {
      toast.error('Failed to mark all as read')
    }
  }

  const markAsRead = async (id: string) => {
    try {
      const res = await fetch('/api/notifications', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ notificationIds: [id] }),
      })
      if (!res.ok) throw new Error('Failed to mark as read')
      setNotifications(prev => prev.map(n => (n.id === id ? { ...n, read: true } : n)))
    } catch {
      toast.error('Failed to mark as read')
    }
  }

  const deleteNotification = async (id: string) => {
    try {
      const res = await fetch(`/api/notifications/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      })
      if (!res.ok) throw new Error('Failed to delete')
      setNotifications(prev => prev.filter(n => n.id !== id))
      toast.success('Notification deleted')
    } catch {
      toast.error('Failed to delete notification')
    }
  }

  const clearAllNotifications = async () => {
    try {
      const res = await fetch('/api/notifications?all=true', {
        method: 'DELETE',
        credentials: 'include',
      })
      if (!res.ok) throw new Error('Failed to clear notifications')
      setNotifications([])
      toast.success('All notifications cleared')
    } catch {
      toast.error('Failed to clear notifications')
    }
  }

  const respondToOneOnOne = async (
    notificationId: string,
    requestId: string,
    action: 'accept' | 'reject'
  ) => {
    setRespondingIds(prev => ({ ...prev, [notificationId]: action }))
    try {
      const res = await fetch('/api/one-on-one/respond', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ requestId, action }),
      })
      if (res.ok) {
        await markAsRead(notificationId)
        toast.success(`Request ${action === 'accept' ? 'accepted' : 'rejected'}`)
      } else {
        const data = await res.json().catch(() => ({}))
        toast.error(data.error || 'Unable to respond to request')
      }
    } catch {
      toast.error('Unable to respond to request')
    } finally {
      setRespondingIds(prev => ({ ...prev, [notificationId]: null }))
    }
  }

  const isOneOnOneRequest = (notification: AppNotification) =>
    notification.data?.type === 'one-on-one-request' &&
    typeof notification.data?.requestId === 'string'

  const withLocale = (actionUrl: string) => {
    if (actionUrl.startsWith('http')) return actionUrl
    if (hasLocalePrefix) {
      if (actionUrl.startsWith(`/${locale}/`)) return actionUrl
      if (actionUrl.startsWith('/')) return `/${locale}${actionUrl}`
      return `/${locale}/${actionUrl}`
    }
    if (actionUrl.startsWith('/')) return actionUrl
    return `/${actionUrl}`
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'class':
        return <Calendar className="h-5 w-5 text-blue-500" />
      case 'assignment':
        return <BookOpen className="h-5 w-5 text-amber-500" />
      case 'achievement':
        return <Trophy className="h-5 w-5 text-purple-500" />
      case 'message':
        return <MessageSquare className="h-5 w-5 text-green-500" />
      case 'enrollment':
        return <Users className="h-5 w-5 text-purple-500" />
      case 'payment':
        return <DollarSign className="h-5 w-5 text-amber-500" />
      case 'reminder':
        return <Bell className="h-5 w-5 text-orange-500" />
      default:
        return <Info className="h-5 w-5 text-gray-500" />
    }
  }

  const formatTime = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true })
    } catch {
      return dateString
    }
  }

  const otherRoleLabel = role === 'student' ? 'Tutor' : 'Student'

  const EmptyNotifications = useMemo(
    () => (
      <div className="py-12 text-center">
        <Bell className="mx-auto mb-4 h-12 w-12 text-gray-300" />
        <p className="text-gray-500">No notifications yet</p>
        <p className="mt-1 text-sm text-gray-400">
          {role === 'student'
            ? 'Notifications will appear here when you have class updates'
            : 'Notifications will appear here when students interact with your classes'}
        </p>
      </div>
    ),
    [role]
  )

  if (messagesLoading && notificationsLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-white">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    )
  }

  return (
    <div className="flex h-full w-full flex-col bg-white px-4 py-6 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-4 min-h-[52px] shrink-0">
        <div className="flex h-full w-full items-center gap-2 rounded-2xl border border-[#E5E7EB] bg-white p-1.5 px-4 shadow-[0_8px_20px_rgba(0,0,0,0.08)]">
          <Inbox className="h-5 w-5 text-slate-600" />
          <h1 className="text-sm font-bold text-slate-800">Communications</h1>
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-6">
        {/* Messaging panel */}
        <div className="flex min-h-0 flex-[3] flex-col overflow-hidden rounded-[20px] border border-[rgba(0,0,0,0.05)] bg-white shadow-[0_8px_24px_rgba(0,0,0,0.10)]">
          <div className="grid h-full grid-cols-1 grid-rows-[auto_1fr] lg:grid-cols-3 lg:grid-rows-1">
            {/* Conversations list */}
            <div className="flex flex-col overflow-hidden border-b border-slate-100 max-h-[45%] lg:max-h-none lg:border-b-0 lg:border-r">
              <div className="p-4 pb-3">
                <h2 className="flex items-center justify-between text-base font-bold text-slate-800">
                  Conversations
                  {totalUnreadMessages > 0 && <Badge className="bg-red-500">{totalUnreadMessages}</Badge>}
                </h2>
                <div className="relative mt-3">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <Input
                    placeholder="Search messages..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="border-slate-200 bg-slate-50/50 pl-9 text-sm"
                  />
                </div>
              </div>
              <div className="min-h-0 flex-1 overflow-hidden p-0">
                <ScrollArea className="h-full">
                  <div className="divide-y divide-slate-100">
                    {filteredConversations.length === 0 ? (
                      <div className="p-8 text-center text-slate-500">
                        <MessageSquare className="mx-auto mb-2 h-10 w-10 text-slate-300" />
                        <p className="text-sm">No conversations yet</p>
                      </div>
                    ) : (
                      filteredConversations.map(conv => (
                        <button
                          key={conv.id}
                          onClick={() => setSelectedConversation(conv)}
                          className={cn(
                            'flex w-full items-center gap-3 p-4 text-left transition-colors hover:bg-slate-50',
                            selectedConversation?.id === conv.id && 'bg-slate-50'
                          )}
                        >
                          <Avatar className="h-10 w-10">
                            <AvatarFallback className="bg-indigo-50 font-medium text-indigo-600">
                              {conv.otherParticipant.name.charAt(0).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between">
                              <span className="truncate text-sm font-semibold text-slate-800">
                                {conv.otherParticipant.name}
                              </span>
                              {conv.unreadCount > 0 && (
                                <Badge className="ml-2 bg-red-500 text-[10px]">{conv.unreadCount}</Badge>
                              )}
                            </div>
                            <p className="mt-0.5 truncate text-xs text-slate-500">
                              {conv.lastMessage?.content || 'No messages yet'}
                            </p>
                          </div>
                        </button>
                      ))
                    )}
                  </div>
                </ScrollArea>
              </div>
            </div>

            {/* Chat area */}
            <div className="flex flex-col overflow-hidden lg:col-span-2">
              {selectedConversation ? (
                <>
                  <div className="border-b border-slate-100 p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-indigo-50 font-medium text-indigo-600">
                            {selectedConversation.otherParticipant.name.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h2 className="text-base font-bold text-slate-800">
                            {selectedConversation.otherParticipant.name}
                          </h2>
                          <p className="text-xs font-medium text-slate-500">{otherRoleLabel}</p>
                        </div>
                      </div>
                      {role === 'tutor' && (
                        <Link href={`/tutor/reports/${selectedConversation.otherParticipant.id}`}>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-slate-200 text-slate-600 hover:bg-slate-50"
                          >
                            View Profile
                            <ChevronRight className="ml-1 h-4 w-4" />
                          </Button>
                        </Link>
                      )}
                    </div>
                  </div>

                  <div className="flex min-h-0 flex-1 flex-col bg-slate-50/30 p-0">
                    <ScrollArea className="flex-1 p-4">
                      <div className="space-y-4">
                        {messages.length === 0 ? (
                          <div className="py-12 text-center text-slate-500">
                            <MessageSquare className="mx-auto mb-3 h-12 w-12 text-slate-300" />
                            <p className="font-medium text-slate-700">No messages yet</p>
                          </div>
                        ) : (
                          messages.map(msg => {
                            const me = isMe(msg)
                            return (
                              <div key={msg.id} className={cn('flex gap-3', me ? 'flex-row-reverse' : 'flex-row')}>
                                <Avatar className="h-8 w-8 shrink-0">
                                  <AvatarFallback
                                    className={cn(
                                      'text-xs font-medium',
                                      me
                                        ? 'bg-indigo-600 text-white'
                                        : 'border border-slate-200 bg-white text-slate-600'
                                    )}
                                  >
                                    {(msg.sender.profile?.name || 'U').charAt(0).toUpperCase()}
                                  </AvatarFallback>
                                </Avatar>
                                <div
                                  className={cn(
                                    'max-w-[70%] rounded-2xl p-3.5 text-sm shadow-sm',
                                    me
                                      ? 'rounded-tr-sm bg-indigo-600 text-white'
                                      : 'rounded-tl-sm border border-slate-100 bg-white text-slate-800'
                                  )}
                                >
                                  <p className="leading-relaxed">{renderMentions(msg.content)}</p>
                                  <span
                                    className={cn(
                                      'mt-1.5 block text-[10px] font-medium',
                                      me ? 'text-indigo-200' : 'text-slate-400'
                                    )}
                                  >
                                    {new Date(msg.createdAt).toLocaleTimeString([], {
                                      hour: '2-digit',
                                      minute: '2-digit',
                                    })}
                                    {msg.read && me && ' • Read'}
                                  </span>
                                </div>
                              </div>
                            )
                          })
                        )}
                        <div ref={messagesEndRef} />
                      </div>
                    </ScrollArea>
                  </div>
                </>
              ) : (
                <div className="flex flex-1 flex-col items-center justify-center bg-slate-50/30 text-slate-500">
                  <MessageSquare className="mb-4 h-16 w-16 text-slate-300" />
                  <p className="text-lg font-bold text-slate-700">Select a conversation</p>
                  <p className="mt-1 text-sm">Choose a conversation from the list to view messages</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Notifications panel */}
        <div className="flex min-h-0 flex-[2] flex-col overflow-hidden rounded-[20px] border border-[rgba(0,0,0,0.05)] bg-white shadow-[0_8px_24px_rgba(0,0,0,0.10)]">
          <Card className="flex h-full flex-col rounded-[20px] border-0 shadow-none">
            <CardHeader className="shrink-0 pb-3">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Bell className="h-5 w-5" />
                    Notifications
                    {unreadCount > 0 && <Badge className="bg-red-500">{unreadCount} new</Badge>}
                  </CardTitle>
                  <CardDescription>
                    {role === 'student'
                      ? 'Stay updated with your classes and activities'
                      : 'Stay updated with your classes and students'}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  {unreadCount > 0 && (
                    <Button variant="outline" size="sm" onClick={markAllAsRead}>
                      <CheckCheck className="mr-2 h-4 w-4" />
                      Mark all read
                    </Button>
                  )}
                  {notifications.length > 0 && (
                    <Button variant="ghost" size="sm" onClick={clearAllNotifications}>
                      <Trash2 className="mr-2 h-4 w-4" />
                      Clear all
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex min-h-0 flex-1 flex-col overflow-hidden">
              {notificationsLoading ? (
                <div className="flex flex-1 items-center justify-center">
                  <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                </div>
              ) : (
                <ScrollArea className="h-full">
                  <div className="space-y-4">
                    {notifications.length === 0 ? (
                      EmptyNotifications
                    ) : (
                      notifications.map(notification => {
                        const NotificationCard = (
                          <div
                            className={cn(
                              'flex items-start gap-4 rounded-lg border p-4 transition-colors',
                              notification.read ? 'bg-white' : 'border-blue-100 bg-blue-50/50'
                            )}
                          >
                            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gray-100">
                              {getNotificationIcon(notification.type)}
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-start justify-between gap-2">
                                <div>
                                  <h4 className="font-medium text-gray-900">
                                    {notification.title}
                                    {!notification.read && (
                                      <span className="ml-2 inline-block h-2 w-2 rounded-full bg-blue-500" />
                                    )}
                                  </h4>
                                  <p className="mt-1 text-sm text-gray-600">{notification.message}</p>
                                  <p className="mt-2 text-xs text-gray-400">{formatTime(notification.createdAt)}</p>
                                </div>
                                <div className="flex items-center gap-1">
                                  {!notification.read && (
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      onClick={() => markAsRead(notification.id)}
                                      title="Mark as read"
                                    >
                                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                                    </Button>
                                  )}
                                  {role === 'tutor' && isOneOnOneRequest(notification) && (
                                    <>
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        className="h-8 px-2 text-xs"
                                        disabled={!!respondingIds[notification.id]}
                                        onClick={e => {
                                          e.preventDefault()
                                          e.stopPropagation()
                                          const requestId = notification.data?.requestId as string
                                          void respondToOneOnOne(notification.id, requestId, 'accept')
                                        }}
                                      >
                                        Accept
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant="ghost"
                                        className="h-8 px-2 text-xs text-red-600 hover:text-red-700"
                                        disabled={!!respondingIds[notification.id]}
                                        onClick={e => {
                                          e.preventDefault()
                                          e.stopPropagation()
                                          const requestId = notification.data?.requestId as string
                                          void respondToOneOnOne(notification.id, requestId, 'reject')
                                        }}
                                      >
                                        Reject
                                      </Button>
                                    </>
                                  )}
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => deleteNotification(notification.id)}
                                    title="Delete"
                                  >
                                    <Trash2 className="h-4 w-4 text-red-500" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        )

                        return notification.actionUrl ? (
                          <Link
                            key={notification.id}
                            href={withLocale(notification.actionUrl)}
                            onClick={() => !notification.read && markAsRead(notification.id)}
                            className="block cursor-pointer"
                          >
                            {NotificationCard}
                          </Link>
                        ) : (
                          <div key={notification.id}>{NotificationCard}</div>
                        )
                      })
                    )}
                  </div>
                </ScrollArea>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
