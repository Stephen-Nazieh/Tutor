'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Bookmark, Trash2, Play } from 'lucide-react'

interface BookmarkItem {
  id: string
  content: {
    id: string
    subject: string
    topic: string
    duration: number
  }
}

export function BookmarksList() {
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/bookmarks')
      .then(res => res.json())
      .then(data => {
        setBookmarks(data.bookmarks || [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const removeBookmark = async (contentId: string) => {
    try {
      const res = await fetch('/api/bookmarks', { 
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contentId })
      })
      if (res.ok) {
        setBookmarks(prev => prev.filter(b => b.content.id !== contentId))
      }
    } catch (error) {
      console.error('Failed to remove bookmark')
    }
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="pt-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        </CardContent>
      </Card>
    )
  }

  if (bookmarks.length === 0) {
    return (
      <Card>
        <CardContent className="pt-8 pb-8 text-center">
          <Bookmark className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-600">No bookmarks yet</p>
          <p className="text-sm text-gray-400">Save lessons to watch later</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bookmark className="w-5 h-5" />
          Saved Lessons ({bookmarks.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {bookmarks.map((bookmark) => (
            <div 
              key={bookmark.id} 
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div>
                <p className="font-medium">{bookmark.content.topic}</p>
                <p className="text-sm text-gray-500">{bookmark.content.subject}</p>
              </div>
              <div className="flex items-center gap-2">
                <Link href={`/student/learn/${bookmark.content.id}`}>
                  <Button size="sm" variant="outline">
                    <Play className="w-4 h-4 mr-1" />
                    Watch
                  </Button>
                </Link>
                <Button 
                  size="sm" 
                  variant="ghost"
                  onClick={() => removeBookmark(bookmark.content.id)}
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
