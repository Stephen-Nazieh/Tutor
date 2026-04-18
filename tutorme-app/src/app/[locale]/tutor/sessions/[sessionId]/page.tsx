'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ArrowLeft, Users, MessageSquare, Hand } from 'lucide-react'
import { toast } from 'sonner'

interface SessionData {
  session: {
    id: string
    title: string
    subject: string
    status: string
    scheduledAt: string | null
    startedAt: string | null
    summary?: string
    summaryJson?: {
      sessionMeta?: {
        title?: string
        subject?: string
        participants?: number
        messages?: number
        generatedAt?: string
      }
      transcriptMeta?: {
        source?: string
        hasTranscriptText?: boolean
      }
    }
  }
  students: Array<{
    id: string
    name: string
    status: 'online' | 'offline'
    engagementScore: number
    handRaised: boolean
    chatMessages: number
    joinedAt: string
  }>
  messages: Array<{
    id: string
    studentId: string
    studentName: string
    content: string
    timestamp: string
    isQuestion: boolean
  }>
  metrics: {
    totalStudents: number
    activeStudents: number
    totalChatMessages: number
    classDuration: number
    classStartTime: string
  }
}

export default function TutorSessionInsightsPage() {
  const params = useParams()
  const router = useRouter()
  const sessionId = params.sessionId as string
  const [data, setData] = useState<SessionData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!sessionId) return

    const fetchSession = async () => {
      try {
        const res = await fetch(`/api/tutor/classes/${sessionId}`, {
          credentials: 'include',
        })
        if (!res.ok) {
          const err = await res.json().catch(() => ({}))
          throw new Error(err.error || 'Failed to load session')
        }
        const json = await res.json()
        setData(json)
      } catch (error) {
        toast.error(error instanceof Error ? error.message : 'Failed to load session')
      } finally {
        setLoading(false)
      }
    }

    fetchSession()
  }, [sessionId])

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#fafafc]">
        <p className="text-muted-foreground">Loading session insights…</p>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center gap-4 bg-[#fafafc]">
        <p className="text-muted-foreground">Session not found.</p>
        <Button onClick={() => router.push('/tutor/classes')}>Back to Classes</Button>
      </div>
    )
  }

  const { session, students, metrics } = data
  const handRaises = students.filter(s => s.handRaised).length
  const scheduledDate = session.scheduledAt
    ? new Date(session.scheduledAt).toLocaleDateString(undefined, {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'Unknown date'

  return (
    <div className="min-h-screen w-full bg-[#fafafc] p-6">
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={() => router.push('/tutor/classes')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Classes
          </Button>
          <Badge variant={session.status === 'ended' ? 'secondary' : 'default'}>
            {session.status === 'ended' ? 'Ended' : session.status}
          </Badge>
        </div>

        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            {session.title || 'Untitled Session'}
          </h1>
          {session.subject && <p className="text-muted-foreground mt-1">{session.subject}</p>}
          <p className="text-muted-foreground mt-1 text-sm">{scheduledDate}</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-muted-foreground flex items-center gap-2 text-sm font-medium">
                <Users className="h-4 w-4" />
                Attendance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold">{metrics.totalStudents}</p>
              <p className="text-muted-foreground text-xs">{metrics.activeStudents} joined live</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-muted-foreground flex items-center gap-2 text-sm font-medium">
                <MessageSquare className="h-4 w-4" />
                Messages
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold">{metrics.totalChatMessages}</p>
              <p className="text-muted-foreground text-xs">Total chat messages</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-muted-foreground flex items-center gap-2 text-sm font-medium">
                <Hand className="h-4 w-4" />
                Hand Raises
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold">{handRaises}</p>
              <p className="text-muted-foreground text-xs">From {metrics.totalStudents} students</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-muted-foreground flex items-center gap-2 text-sm font-medium">
                Duration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold">{metrics.classDuration}m</p>
              <p className="text-muted-foreground text-xs">Session length</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold">AI Summary</CardTitle>
          </CardHeader>
          <CardContent>
            {session.summary ? (
              <div className="space-y-3">
                <p className="whitespace-pre-wrap text-sm leading-relaxed">{session.summary}</p>
                {session.summaryJson?.sessionMeta && (
                  <>
                    <Separator />
                    <div className="text-muted-foreground flex flex-wrap gap-4 text-xs">
                      <span>
                        Participants: {session.summaryJson.sessionMeta.participants ?? '-'}
                      </span>
                      <span>Messages: {session.summaryJson.sessionMeta.messages ?? '-'}</span>
                      <span>
                        Generated:{' '}
                        {session.summaryJson.sessionMeta.generatedAt
                          ? new Date(session.summaryJson.sessionMeta.generatedAt).toLocaleString()
                          : '-'}
                      </span>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">
                No summary available for this session.
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold">Attendance List</CardTitle>
          </CardHeader>
          <CardContent>
            {students.length === 0 ? (
              <p className="text-muted-foreground text-sm">No students attended this session.</p>
            ) : (
              <ul className="divide-y">
                {students.map(student => (
                  <li key={student.id} className="flex items-center justify-between py-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`h-2 w-2 rounded-full ${
                          student.status === 'online' ? 'bg-emerald-500' : 'bg-gray-300'
                        }`}
                      />
                      <span className="text-sm font-medium">{student.name}</span>
                    </div>
                    <div className="text-muted-foreground flex items-center gap-4 text-xs">
                      <span>Score: {student.engagementScore}</span>
                      <span>Messages: {student.chatMessages}</span>
                      {student.handRaised && <Badge variant="outline">Raised hand</Badge>}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
