'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Video, Play, ExternalLink, CheckCircle2, FileText } from 'lucide-react'

interface ReplaySession {
  id: string
  title: string
  subject: string
  tutorName: string
  scheduledAt: string
  endedAt: string
  recordingUrl: string | null
  hasRecording: boolean
  taskCount: number
  submittedCount: number
  summaryPreview: string
  transcriptAvailable: boolean
  replayStatus: 'pending' | 'processing' | 'ready' | 'failed' | string
  generatedAt: string | null
}

export default function LessonReplaysPage() {
  const [sessions, setSessions] = useState<ReplaySession[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/student/lesson-replays')
      .then(res => res.json())
      .then(payload => {
        if (payload.success) setSessions(payload.data.sessions || [])
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="flex items-center gap-2 text-2xl font-bold text-gray-900">
          <Video className="h-6 w-6" />
          Lesson Replays
        </h1>
        <p className="mt-1 text-gray-600">
          Recordings, tasks, and AI lesson recap from attended sessions.
        </p>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <Card key={i}>
              <CardContent className="pt-6">
                <Skeleton className="h-20" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : sessions.length === 0 ? (
        <Card>
          <CardContent className="text-muted-foreground py-10 text-center text-sm">
            No lesson replays yet.
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {sessions.map(session => (
            <Card key={session.id}>
              <CardContent className="space-y-3 pb-5 pt-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-medium">{session.title}</h3>
                    <p className="text-muted-foreground text-sm">
                      {session.subject} · {session.tutorName}
                    </p>
                  </div>
                  <Badge variant="outline" className="gap-1">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Replay
                  </Badge>
                </div>

                <div className="text-muted-foreground flex gap-3 text-xs">
                  <span>Tasks: {session.taskCount}</span>
                  <span>Submitted: {session.submittedCount}</span>
                  <span>Replay: {session.replayStatus}</span>
                </div>

                {session.summaryPreview && (
                  <div className="bg-muted/30 flex gap-2 rounded-md border p-2.5 text-xs">
                    <FileText className="mt-0.5 h-3.5 w-3.5" />
                    <span>{session.summaryPreview}</span>
                  </div>
                )}

                <div className="flex gap-2">
                  {session.hasRecording && session.recordingUrl ? (
                    <a href={session.recordingUrl} target="_blank" rel="noreferrer">
                      <Button size="sm" className="gap-1.5">
                        <Play className="h-3.5 w-3.5" />
                        Watch Replay
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </a>
                  ) : (
                    <Badge variant="secondary">Recording processing</Badge>
                  )}
                  {session.transcriptAvailable && <Badge variant="outline">Transcript ready</Badge>}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
