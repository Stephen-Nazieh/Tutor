'use client'

/**
 * NotificationBell — Global notification bell with real-time SSE updates.
 *
 * Features:
 *  - Live unread count badge
 *  - Dropdown with recent notifications
 *  - SSE connection for instant push delivery
 *  - Click to mark as read
 *  - Link to full notifications page
 */

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
    Bell,
    Calendar,
    BookOpen,
    MessageSquare,
    Trophy,
    AlertCircle,
    CreditCard,
    Zap,
    CheckCheck,
    X,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { formatDistanceToNow } from 'date-fns'

interface NotificationItem {
    id: string
    type: string
    title: string
    message: string
    read: boolean
    actionUrl?: string
    createdAt: string
}

export function NotificationBell() {
    const [notifications, setNotifications] = useState<NotificationItem[]>([])
    const [unreadCount, setUnreadCount] = useState(0)
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)
    const eventSourceRef = useRef<EventSource | null>(null)

    // Fetch initial notifications
    const fetchNotifications = useCallback(async () => {
        try {
            const res = await fetch('/api/notifications?limit=10', { credentials: 'include' })
            if (!res.ok) return
            const data = await res.json()
            setNotifications(data.notifications || [])
            setUnreadCount(data.unreadCount || 0)
        } catch {
            // Silently fail — bell still shows
        }
    }, [])

    // Connect to SSE stream
    useEffect(() => {
        fetchNotifications()

        const eventSource = new EventSource('/api/notifications/stream')
        eventSourceRef.current = eventSource

        eventSource.addEventListener('notification', (event) => {
            try {
                const notification = JSON.parse(event.data) as NotificationItem
                setNotifications((prev) => [notification, ...prev].slice(0, 10))
                setUnreadCount((prev) => prev + 1)
            } catch {
                // Ignore parse errors
            }
        })

        eventSource.addEventListener('error', () => {
            // Reconnection is handled automatically by EventSource
        })

        return () => {
            eventSource.close()
            eventSourceRef.current = null
        }
    }, [fetchNotifications])

    // Close dropdown on outside click
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setOpen(false)
            }
        }
        if (open) document.addEventListener('mousedown', handleClick)
        return () => document.removeEventListener('mousedown', handleClick)
    }, [open])

    const markAllAsRead = async () => {
        setLoading(true)
        try {
            await fetch('/api/notifications', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ markAll: true }),
            })
            setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
            setUnreadCount(0)
        } catch { /* ignore */ }
        setLoading(false)
    }

    const markAsRead = async (id: string) => {
        try {
            await fetch('/api/notifications', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ notificationIds: [id] }),
            })
            setNotifications((prev) =>
                prev.map((n) => (n.id === id ? { ...n, read: true } : n))
            )
            setUnreadCount((prev) => Math.max(0, prev - 1))
        } catch { /* ignore */ }
    }

    const getIcon = (type: string) => {
        const iconClass = 'w-4 h-4'
        switch (type) {
            case 'class': return <Calendar className={cn(iconClass, 'text-blue-500')} />
            case 'assignment': return <BookOpen className={cn(iconClass, 'text-amber-500')} />
            case 'achievement': return <Trophy className={cn(iconClass, 'text-purple-500')} />
            case 'message': return <MessageSquare className={cn(iconClass, 'text-green-500')} />
            case 'grade': return <Zap className={cn(iconClass, 'text-indigo-500')} />
            case 'payment': return <CreditCard className={cn(iconClass, 'text-emerald-500')} />
            case 'reminder': return <AlertCircle className={cn(iconClass, 'text-orange-500')} />
            default: return <Bell className={cn(iconClass, 'text-gray-500')} />
        }
    }

    const formatTime = (dateStr: string) => {
        try {
            return formatDistanceToNow(new Date(dateStr), { addSuffix: true })
        } catch {
            return ''
        }
    }

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Bell Button */}
            <Button
                variant="ghost"
                size="icon"
                onClick={() => setOpen(!open)}
                className="relative"
                aria-label={`Notifications${unreadCount > 0 ? ` (${unreadCount} unread)` : ''}`}
            >
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white animate-in zoom-in-50">
                        {unreadCount > 99 ? '99+' : unreadCount}
                    </span>
                )}
            </Button>

            {/* Dropdown */}
            {open && (
                <div className="absolute right-0 top-full mt-2 w-96 max-h-[480px] bg-white rounded-xl shadow-xl border z-50 flex flex-col animate-in slide-in-from-top-2 duration-200">
                    {/* Header */}
                    <div className="flex items-center justify-between px-4 py-3 border-b">
                        <h3 className="font-semibold text-sm">Notifications</h3>
                        <div className="flex items-center gap-1">
                            {unreadCount > 0 && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={markAllAsRead}
                                    disabled={loading}
                                    className="text-xs gap-1 h-7"
                                >
                                    <CheckCheck className="w-3 h-3" />
                                    Mark all read
                                </Button>
                            )}
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setOpen(false)}
                                className="h-7 w-7"
                            >
                                <X className="w-3.5 h-3.5" />
                            </Button>
                        </div>
                    </div>

                    {/* Notification list */}
                    <div className="flex-1 overflow-y-auto">
                        {notifications.length === 0 ? (
                            <div className="py-12 text-center text-gray-500">
                                <Bell className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                                <p className="text-sm">No notifications yet</p>
                            </div>
                        ) : (
                            notifications.map((n) => (
                                <div
                                    key={n.id}
                                    className={cn(
                                        'flex gap-3 px-4 py-3 border-b last:border-b-0 cursor-pointer transition-colors hover:bg-gray-50',
                                        !n.read && 'bg-blue-50/40'
                                    )}
                                    onClick={() => {
                                        if (!n.read) markAsRead(n.id)
                                        if (n.actionUrl) {
                                            setOpen(false)
                                            window.location.href = n.actionUrl
                                        }
                                    }}
                                >
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mt-0.5">
                                        {getIcon(n.type)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className={cn('text-sm', !n.read ? 'font-medium' : 'text-gray-700')}>
                                            {n.title}
                                            {!n.read && (
                                                <span className="ml-1.5 w-1.5 h-1.5 bg-blue-500 rounded-full inline-block" />
                                            )}
                                        </p>
                                        <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{n.message}</p>
                                        <p className="text-[11px] text-gray-400 mt-1">{formatTime(n.createdAt)}</p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Footer */}
                    <div className="border-t px-4 py-2">
                        <Link href="/student/notifications" onClick={() => setOpen(false)}>
                            <Button variant="ghost" size="sm" className="w-full text-xs">
                                View all notifications
                            </Button>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    )
}
