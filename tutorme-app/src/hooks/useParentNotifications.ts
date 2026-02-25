'use client'

import { useState, useEffect, useCallback } from 'react'

export interface ParentNotification {
  id: string
  title: string
  message: string
  isRead: boolean
  createdAt: string
}

interface UseParentNotificationsResult {
  notifications: ParentNotification[]
  unreadCount: number
  isLoading: boolean
  error: string | null
  refetch: () => Promise<void>
  markAsRead: (ids?: string[], all?: boolean) => Promise<void>
}

export function useParentNotifications(): UseParentNotificationsResult {
  const [notifications, setNotifications] = useState<ParentNotification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchNotifications = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/parent/notifications')
      const json = await res.json()

      if (!res.ok) {
        throw new Error(json.error || 'Failed to load notifications')
      }

      if (json.success && json.data) {
        setNotifications(json.data.notifications || [])
        setUnreadCount(json.data.unreadCount ?? 0)
      } else {
        throw new Error('Invalid response format')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      setNotifications([])
      setUnreadCount(0)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const markAsRead = useCallback(
    async (ids?: string[], all?: boolean) => {
      try {
        const res = await fetch('/api/parent/notifications', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(ids ? { ids } : all ? { all: true } : {}),
        })

        if (!res.ok) {
          const json = await res.json()
          throw new Error(json.error || 'Failed to mark as read')
        }

        await fetchNotifications()
      } catch (err) {
        console.error('Failed to mark notifications as read:', err)
      }
    },
    [fetchNotifications]
  )

  useEffect(() => {
    fetchNotifications()
  }, [fetchNotifications])

  return {
    notifications,
    unreadCount,
    isLoading,
    error,
    refetch: fetchNotifications,
    markAsRead,
  }
}
