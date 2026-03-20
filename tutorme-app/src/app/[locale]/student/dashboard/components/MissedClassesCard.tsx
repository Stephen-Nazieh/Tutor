'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Video, Play, ExternalLink, Calendar, CheckCircle2 } from 'lucide-react'

interface MissedSession {
  id: string
  title: string
  subject: string
  tutorName: string
  scheduledAt: string
  hasRecording: boolean
  recordingUrl: string | null
}

export function MissedClassesCard() {
  const [sessions, setSessions] = useState<MissedSession[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/student/missed-classes?filter=week')
      .then(r => r.json())
      .then(res => {
        if (res.success) setSessions(res.data.sessions)
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <Card className="mb-8 animate-pulse">
        <CardHeader className="pb-3">
          <div className="h-5 w-36 rounded bg-gray-200" />
        </CardHeader>
        <CardContent>
          <div className="h-16 rounded bg-gray-100" />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="mb-8">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Video className="h-5 w-5 text-red-500" />
            Missed Classes
            {sessions.length > 0 && (
              <Badge variant="destructive" className="ml-1 text-xs">
                {sessions.length}
              </Badge>
            )}
          </CardTitle>
          <Link href="/student/missed-classes">
            <Button variant="ghost" size="sm">
              View All
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        {sessions.length === 0 ? (
          <div className="py-4 text-center text-gray-500">
            <CheckCircle2 className="mx-auto mb-2 h-8 w-8 text-green-400" />
            <p className="text-sm font-medium text-gray-700">All caught up!</p>
            <p className="mt-0.5 text-xs">No missed classes this week</p>
          </div>
        ) : (
          <div className="space-y-2.5">
            {sessions.slice(0, 2).map(session => (
              <div
                key={session.id}
                className="flex items-center justify-between rounded-lg border p-2.5"
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{session.title}</p>
                  <p className="text-xs text-gray-500">
                    {session.subject} ·{' '}
                    {new Date(session.scheduledAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </p>
                </div>
                {session.hasRecording ? (
                  <a href={session.recordingUrl!} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="sm" className="gap-1 text-xs">
                      <Play className="h-3 w-3" /> Watch
                    </Button>
                  </a>
                ) : (
                  <Badge variant="secondary" className="text-xs">
                    No recording
                  </Badge>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
