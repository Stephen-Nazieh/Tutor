'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { VideoPlayer } from '@/components/video-player'
import { NotesSidebar } from '@/components/video-player/notes-sidebar'
import { InlineQuizOverlay, type QuizQuestion } from '@/components/video-player/inline-quiz-overlay'
import { AIChat } from '@/components/ai-chat'
import { UserNav } from '@/components/user-nav'
import { ChevronLeft, AlertCircle, Bookmark } from 'lucide-react'
import Link from 'next/link'

interface QuizCheckpoint {
  id: string
  videoTimestampSec: number
  title: string | null
  questions: QuizQuestion[]
}

interface Content {
  id: string
  subject: string
  topic: string
  videoUrl: string | null
  transcript: string
  duration: number
  videoVariants?: Record<string, string>
  quizTimestamps?: number[]
  quizCheckpoints?: QuizCheckpoint[]
}

export default function LearnPage() {
  const params = useParams()
  const contentId = params?.contentId as string

  const [content, setContent] = useState<Content | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [currentTime, setCurrentTime] = useState(0)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [activeQuiz, setActiveQuiz] = useState<QuizCheckpoint | null>(null)
  const csrfRef = useRef<string | null>(null)
  const watchEventsRef = useRef<Array<{ eventType: string; videoSeconds: number; metadata?: unknown }>>([])
  const progressThrottleRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const lastProgressRef = useRef({ progress: 0, lastPosition: 0 })

  const getCsrf = useCallback(async () => {
    if (csrfRef.current) return csrfRef.current
    const res = await fetch('/api/csrf')
    const data = await res.json().catch(() => ({}))
    csrfRef.current = data?.token ?? null
    return csrfRef.current
  }, [])

  const flushWatchEvents = useCallback(async () => {
    if (watchEventsRef.current.length === 0) return
    const events = [...watchEventsRef.current]
    watchEventsRef.current = []
    const token = await getCsrf()
    fetch(`/api/content/${contentId}/watch-events`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...(token && { 'X-CSRF-Token': token }) },
      body: JSON.stringify({ events }),
      credentials: 'include',
    }).catch(() => {})
  }, [contentId, getCsrf])

  const saveProgress = useCallback(
    async (progress: number, lastPosition: number) => {
      lastProgressRef.current = { progress, lastPosition }
      const token = await getCsrf()
      fetch('/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...(token && { 'X-CSRF-Token': token }) },
        body: JSON.stringify({ contentId, progress: Math.round(progress), lastPosition, completed: progress >= 99 }),
        credentials: 'include',
      }).catch(() => {})
    },
    [contentId, getCsrf]
  )

  useEffect(() => {
    if (!contentId) {
      setError('No content ID provided')
      setLoading(false)
      return
    }

    fetch(`/api/content/${contentId}`)
      .then(async res => {
        if (!res.ok) {
          const err = await res.json().catch(() => ({ error: 'Unknown error' }))
          throw new Error(err.error || `HTTP ${res.status}`)
        }
        return res.json()
      })
      .then(data => {
        if (data.content) {
          setContent(data.content)
        } else {
          setError('Content not found')
        }
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [contentId])

  // Check bookmark status
  useEffect(() => {
    if (!contentId) return
    fetch('/api/bookmarks')
      .then(res => res.json())
      .then(data => {
        const bookmarked = data.bookmarks?.some((b: { contentId: string }) => b.contentId === contentId)
        setIsBookmarked(bookmarked)
      })
      .catch(() => {})
  }, [contentId])

  useEffect(() => {
    const t = progressThrottleRef.current
    return () => { if (t) clearTimeout(t) }
  }, [])

  const handleQuizSkip = useCallback(
    async (timestamp: number, note?: string) => {
      const token = await getCsrf()
      await fetch(`/api/content/${contentId}/quiz-skip`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...(token && { 'X-CSRF-Token': token }) },
        body: JSON.stringify({ videoTimestampSeconds: timestamp, note }),
        credentials: 'include',
      }).catch(() => {})
    },
    [contentId, getCsrf]
  )

  const toggleBookmark = async () => {
    try {
      const res = await fetch('/api/bookmarks', {
        method: isBookmarked ? 'DELETE' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contentId })
      })
      if (res.ok) setIsBookmarked(!isBookmarked)
    } catch (err) {
      console.error('Bookmark error:', err)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading lesson...</p>
        </div>
      </div>
    )
  }

  if (error || !content) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardContent className="pt-8 pb-8 text-center">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">Content Not Found</h2>
            <p className="text-gray-600 mb-4">{error || 'The lesson does not exist.'}</p>
            <Link href="/student/dashboard">
              <Button>Back to Dashboard</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b sticky top-0 z-40 safe-top">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/student/dashboard">
              <Button variant="ghost" size="icon">
                <ChevronLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-bold">{content.topic}</h1>
              <p className="text-sm text-gray-600">{content.subject}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleBookmark}
              className={isBookmarked ? 'text-yellow-500' : 'text-gray-400'}
              title={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
            >
              <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
            </Button>
          </div>
          <UserNav />
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 relative">
            {content.videoUrl ? (
              <>
                <VideoPlayer
                  videoUrl={content.videoUrl}
                  title={content.topic}
                  videoVariants={content.videoVariants}
                  quizTimestamps={content.quizTimestamps ?? []}
                  onProgress={(data) => {
                    setCurrentTime(data.currentTime)
                    if (progressThrottleRef.current) clearTimeout(progressThrottleRef.current)
                    progressThrottleRef.current = setTimeout(() => {
                      saveProgress(data.percentage, Math.floor(data.currentTime))
                      progressThrottleRef.current = null
                    }, 5000)
                  }}
                  onPlay={(t) => {
                    watchEventsRef.current.push({ eventType: 'play', videoSeconds: t })
                  }}
                  onPause={(t) => {
                    watchEventsRef.current.push({ eventType: 'pause', videoSeconds: t })
                    flushWatchEvents()
                  }}
                  onSeek={(from, to) => {
                    watchEventsRef.current.push({
                      eventType: 'seek',
                      videoSeconds: to,
                      metadata: { fromTime: from, toTime: to },
                    })
                  }}
                  onComplete={() => {
                    watchEventsRef.current.push({
                      eventType: 'complete',
                      videoSeconds: content.duration || 0,
                    })
                    flushWatchEvents()
                    saveProgress(100, content.duration || 0)
                  }}
                  onQuizTrigger={(timestamp) => {
                    const cp = content.quizCheckpoints?.find(
                      (c) => Math.abs(c.videoTimestampSec - timestamp) < 2
                    )
                    setActiveQuiz(cp ?? null)
                  }}
                  onQuizSkip={handleQuizSkip}
                  locale="zh"
                />
                {activeQuiz && (
                  <InlineQuizOverlay
                    title={activeQuiz.title ?? undefined}
                    questions={activeQuiz.questions}
                    locale="zh"
                    onSubmit={() => {
                      setActiveQuiz(null)
                    }}
                    onSkip={() => setActiveQuiz(null)}
                  />
                )}
              </>
            ) : (
              <Card>
                <CardContent className="py-8 text-center text-gray-500">
                  暂无视频链接。请先上传或设置视频地址。
                </CardContent>
              </Card>
            )}

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>About This Lesson</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{content.transcript || '—'}</p>
                <p className="text-sm text-gray-400 mt-4">
                  Duration: {content.duration ? Math.floor(content.duration / 60) : 0} minutes
                </p>
              </CardContent>
            </Card>
          </div>

          <div>
            <NotesSidebar
              videoId={contentId}
              currentTime={currentTime}
              onSeekToTimestamp={(timestamp) => console.log('Seek to:', timestamp)}
            />
          </div>
        </div>
      </main>

      <AIChat
        context={{
          videoTitle: content.topic,
          currentTimestamp: currentTime,
          subject: content.subject
        }}
      />
    </div>
  )
}
