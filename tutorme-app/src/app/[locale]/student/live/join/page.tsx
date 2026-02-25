'use client'

import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { ArrowLeft, Loader2, Video, Users, Clock, User } from 'lucide-react'

interface ActiveSession {
  id: string
  title: string
  subject: string
  scheduledAt: string
  maxStudents: number
  participants: Array<{ id: string }>
  tutor?: {
    profile?: {
      name?: string | null
    } | null
  } | null
}

interface JoinByIdResponse {
  roomUrl?: string | null
  token?: string
}

interface JoinByCodeResponse {
  sessionId?: string
  room?: {
    url?: string | null
  }
  token?: string
}

export default function StudentJoinLiveClassPage() {
  const router = useRouter()
  const [classCode, setClassCode] = useState('')
  const [isJoining, setIsJoining] = useState(false)
  const [loadingSessions, setLoadingSessions] = useState(true)
  const [sessions, setSessions] = useState<ActiveSession[]>([])

  const getCsrfToken = useCallback(async (): Promise<string | null> => {
    try {
      const res = await fetch('/api/csrf', { credentials: 'include' })
      const data = await res.json().catch(() => ({}))
      return data?.token ?? null
    } catch {
      return null
    }
  }, [])

  const fetchActiveSessions = useCallback(async () => {
    setLoadingSessions(true)
    try {
      const res = await fetch('/api/class/rooms', { credentials: 'include' })
      const data = await res.json().catch(() => ({}))
      setSessions(Array.isArray(data?.sessions) ? data.sessions : [])
    } catch {
      setSessions([])
    } finally {
      setLoadingSessions(false)
    }
  }, [])

  useEffect(() => {
    fetchActiveSessions()
  }, [fetchActiveSessions])

  const joinById = useCallback(async (sessionId: string, csrfToken: string | null) => {
    const res = await fetch(`/api/class/rooms/${sessionId}/join`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(csrfToken ? { 'X-CSRF-Token': csrfToken } : {}),
      },
      credentials: 'include',
    })

    if (!res.ok) {
      const text = await res.text().catch(() => '')
      throw new Error(text || `Join failed (${res.status})`)
    }

    const data = (await res.json()) as (JoinByIdResponse & { session?: { id?: string } })
    return { sessionId: data.session?.id, roomUrl: data.roomUrl, token: data.token }
  }, [])

  const joinByCode = useCallback(async (roomCode: string, csrfToken: string | null) => {
    const res = await fetch('/api/class/join', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(csrfToken ? { 'X-CSRF-Token': csrfToken } : {}),
      },
      credentials: 'include',
      body: JSON.stringify({ sessionId: roomCode }),
    })

    if (!res.ok) {
      const text = await res.text().catch(() => '')
      throw new Error(text || `Join failed (${res.status})`)
    }

    const data = (await res.json()) as JoinByCodeResponse
    return { sessionId: data.sessionId, roomUrl: data.room?.url, token: data.token }
  }, [])

  const handleJoin = useCallback(async (code: string) => {
    const cleaned = code.trim()
    if (!cleaned) {
      toast.error('Please enter a class code or session ID')
      return
    }

    setIsJoining(true)
    try {
      const csrfToken = await getCsrfToken()

      try {
        const joined = await joinById(cleaned, csrfToken)
        if (!joined.sessionId) {
          throw new Error('Session not found for this class')
        }
        router.push(`/student/live/${joined.sessionId}`)
        return
      } catch {
        const joined = await joinByCode(cleaned, csrfToken)
        if (!joined.sessionId) {
          throw new Error('Session not found for this class')
        }
        router.push(`/student/live/${joined.sessionId}`)
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to join class'
      toast.error(message)
    } finally {
      setIsJoining(false)
    }
  }, [getCsrfToken, joinByCode, joinById, router])

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <Button variant="ghost" onClick={() => router.push('/student/dashboard')}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Video className="w-5 h-5 text-blue-600" />
              Join Live Class
            </CardTitle>
            <CardDescription>Enter your class code or session ID</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Input
              placeholder="e.g. cls_abc123"
              value={classCode}
              onChange={(e) => setClassCode(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !isJoining) {
                  handleJoin(classCode)
                }
              }}
            />
            <Button className="w-full" onClick={() => handleJoin(classCode)} disabled={isJoining}>
              {isJoining ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Join Now'}
            </Button>
            <p className="text-xs text-gray-500">
              You can paste either a session ID or room code shared by your tutor.
            </p>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Active classes you can join</CardTitle>
            <CardDescription>Live sessions currently running</CardDescription>
          </CardHeader>
          <CardContent>
            {loadingSessions ? (
              <div className="py-8 flex items-center justify-center text-gray-500">
                <Loader2 className="w-5 h-5 animate-spin mr-2" />
                Loading sessions...
              </div>
            ) : sessions.length === 0 ? (
              <div className="py-10 text-center">
                <Video className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                <p className="text-gray-600 font-medium">No active classes right now</p>
                <p className="text-sm text-gray-500 mt-1">Use a class code from your tutor if your class just started.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {sessions.map((session) => {
                  const tutorName = session.tutor?.profile?.name || 'Tutor'
                  const attendeeCount = session.participants?.length || 0
                  return (
                    <div key={session.id} className="border rounded-lg p-4 flex items-center justify-between gap-4">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold truncate">{session.title}</h3>
                          <Badge variant="secondary">{session.subject}</Badge>
                        </div>
                        <div className="flex flex-wrap gap-3 text-xs text-gray-500 mt-1">
                          <span className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            {tutorName}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            {attendeeCount}/{session.maxStudents}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {new Date(session.scheduledAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      </div>
                      <Button onClick={() => handleJoin(session.id)} disabled={isJoining}>
                        Join
                      </Button>
                    </div>
                  )
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <Link href="/student/help" className="text-sm text-blue-600 hover:underline">
          Need help joining a class?
        </Link>
      </div>
    </div>
  )
}
