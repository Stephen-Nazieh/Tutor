'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Bell, 
  CheckCircle2, 
  Calendar,
  MessageSquare,
  Users,
  DollarSign,
  Trash2,
  CheckCheck,
  Loader2,
  Info
} from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'

interface Notification {
  id: string
  type: 'class' | 'message' | 'enrollment' | 'payment' | 'system' | 'reminder'
  title: string
  message: string
  read: boolean
  readAt: string | null
  actionUrl: string | null
  createdAt: string
}

export default function TutorNotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(true)
  const [unreadCount, setUnreadCount] = useState(0)

  // Fetch notifications on mount
  useEffect(() => {
    fetchNotifications()
  }, [])

  const fetchNotifications = async () => {
    try {
      const res = await fetch('/api/notifications', {
        credentials: 'include',
      })
      if (res.ok) {
        const data = await res.json()
        setNotifications(data.notifications || [])
        setUnreadCount(data.unreadCount || 0)
      } else {
        toast.error('Failed to load notifications')
      }
    } catch {
      toast.error('Failed to load notifications')
    } finally {
      setLoading(false)
    }
  }

  const markAllAsRead = async () => {
    try {
      const res = await fetch('/api/notifications', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ markAll: true }),
      })

      if (res.ok) {
        setNotifications(prev => prev.map(n => ({ ...n, read: true, readAt: new Date().toISOString() })))
        setUnreadCount(0)
        toast.success('Marked all as read')
      }
    } catch {
      toast.error('Failed to mark notifications')
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

      if (res.ok) {
        setNotifications(prev => prev.map(n => 
          n.id === id ? { ...n, read: true, readAt: new Date().toISOString() } : n
        ))
        setUnreadCount(prev => Math.max(0, prev - 1))
      }
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

      if (res.ok) {
        setNotifications(prev => prev.filter(n => n.id !== id))
        toast.success('Notification deleted')
      }
    } catch {
      toast.error('Failed to delete')
    }
  }

  const deleteOldNotifications = async () => {
    try {
      const res = await fetch('/api/notifications', {
        method: 'DELETE',
        credentials: 'include',
      })

      if (res.ok) {
        const data = await res.json()
        fetchNotifications() // Refresh list
        toast.success(`${data.deleted} old notifications cleaned up`)
      }
    } catch {
      toast.error('Failed to clean up')
    }
  }

  const getIcon = (type: string) => {
    switch (type) {
      case 'class': return <Calendar className="h-5 w-5 text-blue-500" />
      case 'message': return <MessageSquare className="h-5 w-5 text-green-500" />
      case 'enrollment': return <Users className="h-5 w-5 text-purple-500" />
      case 'payment': return <DollarSign className="h-5 w-5 text-amber-500" />
      case 'reminder': return <Bell className="h-5 w-5 text-orange-500" />
      default: return <Info className="h-5 w-5 text-gray-500" />
    }
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (minutes < 1) return 'Just now'
    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    if (days < 7) return `${days}d ago`
    return date.toLocaleDateString()
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Bell className="h-6 w-6" />
            Notifications
            {unreadCount > 0 && (
              <Badge className="bg-red-500">{unreadCount} new</Badge>
            )}
          </h1>
          <p className="text-gray-600 mt-1">
            Stay updated with your classes and students
          </p>
        </div>
        <div className="flex gap-2">
          {unreadCount > 0 && (
            <Button variant="outline" onClick={markAllAsRead}>
              <CheckCheck className="h-4 w-4 mr-2" />
              Mark all read
            </Button>
          )}
          <Button variant="ghost" onClick={deleteOldNotifications}>
            <Trash2 className="h-4 w-4 mr-2" />
            Clean up old
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Notifications</CardTitle>
          <CardDescription>
            You have {unreadCount} unread notifications
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {notifications.length === 0 ? (
            <div className="text-center py-12">
              <Bell className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No notifications yet</p>
              <p className="text-sm text-gray-400 mt-1">
                Notifications will appear here when students interact with your classes
              </p>
            </div>
          ) : (
            notifications.map((notification) => {
              const NotificationCard = (
                <div
                  className={`flex items-start gap-4 p-4 rounded-lg border transition-colors ${
                    notification.read ? 'bg-white' : 'bg-blue-50/50 border-blue-100'
                  }`}
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    {getIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="font-medium text-gray-900">
                          {notification.title}
                          {!notification.read && (
                            <span className="ml-2 w-2 h-2 bg-blue-500 rounded-full inline-block" />
                          )}
                        </h4>
                        <p className="text-gray-600 text-sm mt-1">
                          {notification.message}
                        </p>
                        <p className="text-gray-400 text-xs mt-2">
                          {formatTime(notification.createdAt)}
                        </p>
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
                  href={notification.actionUrl}
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
        </CardContent>
      </Card>
    </div>
  )
}
