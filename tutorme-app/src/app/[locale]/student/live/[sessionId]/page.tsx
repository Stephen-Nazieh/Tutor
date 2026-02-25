'use client'

import { useCallback, useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { toast } from 'sonner'
import { ArrowLeft, Loader2, ExternalLink, Video, Layers, Users, Calculator } from 'lucide-react'
import { MultiLayerWhiteboardInterface } from '@/app/[locale]/tutor/live-class/components/MultiLayerWhiteboardInterface'
import { useSocket } from '@/hooks/use-socket'
import { MathBoardHost } from '@/components/whiteboard/MathBoardHost'

interface JoinedSession {
  id: string
  title: string
  subject: string
  status: string
  roomId: string | null
  roomUrl: string | null
  maxStudents: number
  participants: Array<{
    id: string
    studentId?: string
  }>
  tutor?: {
    profile?: {
      name?: string | null
    } | null
  } | null
}

interface JoinResponse {
  session: JoinedSession
  token: string
  roomUrl: string | null
}

export default function StudentLiveSessionPage() {
  const router = useRouter()
  const params = useParams()
  const sessionId = params.sessionId as string
  const { data: authSession } = useSession()

  const [loading, setLoading] = useState(true)
  const [joinData, setJoinData] = useState<JoinResponse | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [showRecordingNotice, setShowRecordingNotice] = useState(false)

  const socketOptions = authSession?.user?.id
    ? {
        roomId: sessionId,
        userId: authSession.user.id,
        name: authSession.user.name || 'Student',
        role: 'student' as const,
      }
    : undefined
  const { socket } = useSocket(socketOptions)

  const getCsrfToken = useCallback(async (): Promise<string | null> => {
    try {
      const res = await fetch('/api/csrf', { credentials: 'include' })
      const data = await res.json().catch(() => ({}))
      return data?.token ?? null
    } catch {
      return null
    }
  }, [])

  const fetchJoinData = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const csrfToken = await getCsrfToken()
      const res = await fetch(`/api/class/rooms/${sessionId}/join`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(csrfToken ? { 'X-CSRF-Token': csrfToken } : {}),
        },
        credentials: 'include',
      })

      if (!res.ok) {
        const raw = await res.text().catch(() => '')
        throw new Error(raw || `Failed to join class (${res.status})`)
      }

      const data = (await res.json()) as JoinResponse
      setJoinData(data)
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Unable to join class'
      setError(message)
    } finally {
      setLoading(false)
    }
  }, [getCsrfToken, sessionId])

  useEffect(() => {
    if (!sessionId) return
    fetchJoinData()
  }, [sessionId, fetchJoinData])

  useEffect(() => {
    if (!joinData?.session?.id) return
    const key = `live-recording-notice:${joinData.session.id}`
    const alreadySeen = typeof window !== 'undefined' ? window.sessionStorage.getItem(key) : null
    if (!alreadySeen) {
      setShowRecordingNotice(true)
      if (typeof window !== 'undefined') {
        window.sessionStorage.setItem(key, '1')
      }
    }
  }, [joinData?.session?.id])

  const openVideoClassroom = useCallback(() => {
    const roomUrl = joinData?.roomUrl
    const token = joinData?.token
    if (!roomUrl) {
      toast.error('Room URL is not available')
      return
    }
    const target = token
      ? `${roomUrl}${roomUrl.includes('?') ? '&' : '?'}t=${encodeURIComponent(token)}`
      : roomUrl
    window.open(target, '_blank', 'noopener,noreferrer')
  }, [joinData])

  if (loading) {
    return (
      <div className="w-full p-6">
        <div className="flex items-center justify-center py-24 text-gray-500">
          <Loader2 className="w-5 h-5 animate-spin mr-2" />
          Joining live class...
        </div>
      </div>
    )
  }

  if (error || !joinData) {
    return (
      <div className="w-full p-6">
        <Card>
          <CardHeader>
            <CardTitle>Unable to open live class</CardTitle>
            <CardDescription>{error || 'Unexpected error'}</CardDescription>
          </CardHeader>
          <CardContent className="flex gap-2">
            <Button variant="outline" onClick={() => router.push('/student/live/join')}>
              Back to Join
            </Button>
            <Button onClick={fetchJoinData}>Retry</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const session = joinData.session

  return (
    <div className="w-full p-4 sm:p-6 space-y-4">
      <Dialog open={showRecordingNotice} onOpenChange={setShowRecordingNotice}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>This class is being recorded</DialogTitle>
            <DialogDescription>
              Recordings help with safety, lesson replays, missed-lesson recovery, and AI-generated lesson summaries.
              Continue only if you consent to this class recording policy.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <div className="flex items-center justify-between gap-3">
        <Button variant="ghost" onClick={() => router.push('/student/live/join')}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <div className="flex items-center gap-2">
          <Badge variant="secondary">{session.subject}</Badge>
          <Badge>{session.status}</Badge>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between gap-3">
            <span>{session.title}</span>
            <Button onClick={openVideoClassroom}>
              <Video className="w-4 h-4 mr-2" />
              Open Classroom
              <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
          </CardTitle>
          <CardDescription>
            Tutor: {session.tutor?.profile?.name || 'Tutor'} • Participants: {session.participants.length}/{session.maxStudents}
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="whiteboard" className="space-y-4">
        <TabsList className="grid grid-cols-3 w-full max-w-lg">
          <TabsTrigger value="whiteboard" className="gap-1">
            <Layers className="w-4 h-4" />
            Whiteboard
          </TabsTrigger>
          <TabsTrigger value="math" className="gap-1">
            <Calculator className="w-4 h-4" />
            Math
          </TabsTrigger>
          <TabsTrigger value="session" className="gap-1">
            <Users className="w-4 h-4" />
            Session
          </TabsTrigger>
        </TabsList>

        <TabsContent value="whiteboard" className="h-[calc(100vh-240px)] min-h-[620px]">
          <MultiLayerWhiteboardInterface
            sessionId={session.id}
            roomId={session.roomId || session.id}
            students={[]}
            isSocketConnected={true}
          />
        </TabsContent>

        <TabsContent value="math" className="h-[calc(100vh-240px)] min-h-[620px]">
          <MathBoardHost
            sessionId={`math-${session.id}`}
            socket={socket}
            userId={authSession?.user?.id}
            userName={authSession?.user?.name || 'Student'}
            role="student"
            className="h-full"
          />
        </TabsContent>

        <TabsContent value="session">
          <Card>
            <CardHeader>
              <CardTitle>Classroom Access</CardTitle>
              <CardDescription>
                Open the video classroom in a new tab while keeping this whiteboard panel open.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={openVideoClassroom}>
                <Video className="w-4 h-4 mr-2" />
                Open Classroom
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
