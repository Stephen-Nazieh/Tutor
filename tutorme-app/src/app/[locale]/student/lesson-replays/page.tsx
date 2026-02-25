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
      .then((res) => res.json())
      .then((payload) => {
        if (payload.success) setSessions(payload.data.sessions || [])
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Video className="h-6 w-6" />
          Lesson Replays
        </h1>
        <p className="text-gray-600 mt-1">Recordings, tasks, and AI lesson recap from attended sessions.</p>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i}><CardContent className="pt-6"><Skeleton className="h-20" /></CardContent></Card>
          ))}
        </div>
      ) : sessions.length === 0 ? (
        <Card>
          <CardContent className="py-10 text-center text-sm text-muted-foreground">No lesson replays yet.</CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {sessions.map((session) => (
            <Card key={session.id}>
              <CardContent className="pt-5 pb-5 space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-medium">{session.title}</h3>
                    <p className="text-sm text-muted-foreground">{session.subject} · {session.tutorName}</p>
                  </div>
                  <Badge variant="outline" className="gap-1">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Replay
                  </Badge>
                </div>

                <div className="text-xs text-muted-foreground flex gap-3">
                  <span>Tasks: {session.taskCount}</span>
                  <span>Submitted: {session.submittedCount}</span>
                  <span>Replay: {session.replayStatus}</span>
                </div>

                {session.summaryPreview && (
                  <div className="rounded-md border bg-muted/30 p-2.5 text-xs flex gap-2">
                    <FileText className="h-3.5 w-3.5 mt-0.5" />
                    <span>{session.summaryPreview}</span>
                  </div>
                )}

                <div className="flex gap-2">
                  {session.hasRecording && session.recordingUrl ? (
                    <a href={session.recordingUrl} target="_blank" rel="noreferrer">
                      <Button size="sm" className="gap-1.5">
                        <Play className="w-3.5 h-3.5" />
                        Watch Replay
                        <ExternalLink className="w-3 h-3" />
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
