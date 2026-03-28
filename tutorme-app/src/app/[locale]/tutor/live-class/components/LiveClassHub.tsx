'use client'

import { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useSocket } from '@/hooks/use-socket'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { toast } from 'sonner'
import { StudentList } from './StudentList'
import { UnifiedBreakoutManager, UnifiedBreakoutModal } from './breakout'
import { HandRaiseQueue } from './HandRaiseQueue'
import { ChatMonitor } from './ChatMonitor'

import { AITeachingAssistant } from './AITeachingAssistant'

import { MultiLayerWhiteboardInterface } from './MultiLayerWhiteboardInterface'
import { QuickPollPanel } from '@/components/polls'
import {
  EngagementDashboard,
  EngagementMetrics as EngagementMetricType,
} from '@/components/class/engagement'

import type {
  LiveStudent,
  BreakoutRoom,
  HandRaise,
  ChatMessage,
  EngagementMetrics,
  Alert,
} from '@/types/live-session'
import {
  Users,
  LayoutGrid,
  Radio,
  Mic,
  MicOff,
  Video,
  VideoOff,
  MonitorUp,
  Hand,
  ArrowLeft,
  TrendingUp,
  BarChart2,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  Sparkles,
  LogOut,
  LayoutTemplate,
  Wrench,
  Layers,
} from 'lucide-react'

interface LiveClassHubProps {
  sessionId: string
}

interface LiveClassBootstrapResponse {
  session: {
    id: string
    title: string
    subject: string
    status: string
    roomId: string | null
    roomUrl: string | null
    scheduledAt: string | null
    startedAt: string | null
    maxStudents: number
    linkedCourseId?: string | null
  }
  students: LiveStudent[]
  messages: ChatMessage[]
  metrics: EngagementMetrics
  alerts: Alert[]
}

const buildFallbackMetrics = (students: LiveStudent[]): EngagementMetrics => ({
  totalStudents: students.length,
  activeStudents: students.filter(s => s.status === 'online').length,
  averageEngagement: Math.round(
    students.filter(s => s.status === 'online').reduce((sum, s) => sum + s.engagementScore, 0) /
      Math.max(1, students.filter(s => s.status === 'online').length)
  ),
  participationRate: 0,
  totalChatMessages: students.reduce((sum, s) => sum + s.chatMessages, 0),
  classDuration: 0,
  classStartTime: new Date().toISOString(),
  veryEngaged: students.filter(s => s.engagementScore >= 85).length,
  engaged: students.filter(s => s.engagementScore >= 60 && s.engagementScore < 85).length,
  passive: students.filter(s => s.engagementScore >= 30 && s.engagementScore < 60).length,
  disengaged: students.filter(s => s.engagementScore < 30).length,
  engagementTrend: 'stable',
})

const deriveHandRaisesFromStudents = (students: LiveStudent[]): HandRaise[] => {
  return students
    .filter(s => s.handRaised)
    .map(s => ({
      id: `hand-${s.id}`,
      studentId: s.id,
      studentName: s.name,
      priority: 'normal' as const,
      raisedAt: s.lastActive || new Date().toISOString(),
      status: 'pending' as const,
    }))
}

export function LiveClassHub({ sessionId }: LiveClassHubProps) {
  const router = useRouter()
  const { data: session } = useSession()
  const [renderNow] = useState(() => Date.now())
  // When a student joins via socket, add/update local state so the tutor UI updates without a full reload
  const handleStudentJoined = useCallback(
    (state: {
      userId: string
      name: string
      status: string
      engagement: number
      lastActivity: number
      joinedAt: number
    }) => {
      setStudents(prev => {
        if (prev.some(s => s.id === state.userId)) return prev
        const live: LiveStudent = {
          id: state.userId,
          name: state.name,
          status: 'online',
          engagementScore: state.engagement ?? 80,
          handRaised: false,
          attentionLevel:
            state.engagement >= 70 ? 'high' : state.engagement >= 40 ? 'medium' : 'low',
          lastActive: new Date(state.lastActivity ?? Date.now()).toISOString(),
          joinedAt: new Date(state.joinedAt ?? Date.now()).toISOString(),
          reactions: 0,
          chatMessages: 0,
        }
        return [...prev, live]
      })
    },
    []
  )
  const handleStudentLeft = useCallback((userId: string) => {
    setStudents(prev => prev.filter(s => s.id !== userId))
  }, [])

  const socketOptions = session?.user?.id
    ? {
        roomId: sessionId,
        userId: session.user.id,
        name: session.user?.name || 'Tutor',
        role: 'tutor' as const,
        tutorId: session.user.id,
        onStudentJoined: handleStudentJoined,
        onStudentLeft: handleStudentLeft,
      }
    : undefined
  const { socket } = useSocket(socketOptions)
  const [isLoading, setIsLoading] = useState(true)

  // State
  const [students, setStudents] = useState<LiveStudent[]>([])
  const [breakoutRooms, setBreakoutRooms] = useState<BreakoutRoom[]>([])
  const [handRaises, setHandRaises] = useState<HandRaise[]>([])
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [metrics, setMetrics] = useState<EngagementMetrics | null>(null)
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [rightPanelCollapsed, setRightPanelCollapsed] = useState(false)
  const [panelSeenCounts, setPanelSeenCounts] = useState({ messages: 0, handRaises: 0, alerts: 0 })
  const [classTitle, setClassTitle] = useState('Live Session')
  const [classSubject, setClassSubject] = useState('General')
  const [classRoomId, setClassRoomId] = useState<string | null>(null)
  const [linkedCourseId, setLinkedCourseId] = useState<string | null>(null)
  const [linkedCourseName, setLinkedCourseName] = useState<string | null>(null)

  const pendingHandRaises = handRaises.length
  const totalMessages = messages.length
  const socraticAlerts = alerts.length

  useEffect(() => {
    if (!rightPanelCollapsed) {
      setPanelSeenCounts({
        messages: totalMessages,
        handRaises: pendingHandRaises,
        alerts: socraticAlerts,
      })
    }
  }, [rightPanelCollapsed, totalMessages, pendingHandRaises, socraticAlerts])

  const panelNotificationCounts = {
    messages: Math.max(0, totalMessages - panelSeenCounts.messages),
    handRaises: Math.max(0, pendingHandRaises - panelSeenCounts.handRaises),
    alerts: Math.max(0, socraticAlerts - panelSeenCounts.alerts),
  }
  const hasPanelNotifications =
    panelNotificationCounts.messages +
      panelNotificationCounts.handRaises +
      panelNotificationCounts.alerts >
    0

  // Media controls
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOff, setIsVideoOff] = useState(false)
  const [isScreenSharing, setIsScreenSharing] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [recordingDurationSeconds, setRecordingDurationSeconds] = useState(0)

  // UI State
  const [showEngagementPanel, setShowEngagementPanel] = useState(false)
  const [showTeachingAssistant, setShowTeachingAssistant] = useState(true)
  const [showEndClassDialog, setShowEndClassDialog] = useState(false)
  const [showRecordingNotice, setShowRecordingNotice] = useState(false)
  const [activeTab, setActiveTab] = useState('whiteboard')
  const [activeBreakoutRoom, setActiveBreakoutRoom] = useState<BreakoutRoom | null>(null)
  const [isBreakoutModalOpen, setIsBreakoutModalOpen] = useState(false)
  const autoRecordingStartedRef = useRef(false)
  const recordingNoticeStorageKey = `live-class-recording-notice:${sessionId}`
  // Prevent full reload when session object reference changes (e.g. refetch); only load once per sessionId + userId.
  const loadedForRef = useRef<{ sessionId: string; userId: string } | null>(null)

  useEffect(() => {
    if (!isRecording) {
      setRecordingDurationSeconds(0)
      return
    }
    const interval = setInterval(() => {
      setRecordingDurationSeconds(prev => prev + 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [isRecording])

  // Load and start class session — only once per (sessionId, userId) to avoid refresh when session reference flickers or student joins
  useEffect(() => {
    if (!session?.user?.id) return
    const userId = session.user.id
    const alreadyLoaded =
      loadedForRef.current?.sessionId === sessionId && loadedForRef.current?.userId === userId
    if (alreadyLoaded) return

    let cancelled = false
    let timeoutId: NodeJS.Timeout | null = null
    loadedForRef.current = { sessionId, userId }

    // Fetch with timeout helper
    const fetchWithTimeout = async (url: string, options: RequestInit = {}, timeoutMs = 15000) => {
      const controller = new AbortController()
      const timeoutPromise = new Promise<never>((_, reject) => {
        timeoutId = setTimeout(() => {
          controller.abort()
          reject(new Error(`Request timeout after ${timeoutMs}ms`))
        }, timeoutMs)
      })

      try {
        const response = await Promise.race([
          fetch(url, { ...options, signal: controller.signal }),
          timeoutPromise,
        ])
        if (timeoutId) clearTimeout(timeoutId)
        return response as Response
      } catch (error) {
        if (timeoutId) clearTimeout(timeoutId)
        throw error
      }
    }

    const load = async () => {
      setIsLoading(true)
      try {
        // Fetch CSRF token and start class in parallel
        const csrfPromise = fetchWithTimeout('/api/csrf', { credentials: 'include' }, 5000)
          .then(r => r.json())
          .catch(() => ({}))

        // Start class immediately (CSRF not strictly required for idempotent start)
        const startPromise = fetchWithTimeout(
          `/api/tutor/classes/${sessionId}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
          },
          10000
        ).catch(() => null) // Non-fatal: class may already be started

        // Wait for CSRF and start to complete
        const [csrfData] = await Promise.all([csrfPromise, startPromise])
        const csrfToken = csrfData?.token ?? null

        // If start failed due to CSRF, retry with token
        if (csrfToken && startPromise === null) {
          await fetchWithTimeout(
            `/api/tutor/classes/${sessionId}`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'X-CSRF-Token': csrfToken,
              },
              credentials: 'include',
            },
            10000
          ).catch(() => null) // Still non-fatal
        }

        // Fetch class data
        const res = await fetchWithTimeout(
          `/api/tutor/classes/${sessionId}`,
          { credentials: 'include' },
          15000
        )
        if (!res.ok) {
          const raw = await res.text().catch(() => '')
          throw new Error(raw || `Failed to load class (${res.status})`)
        }

        const data = (await res.json()) as LiveClassBootstrapResponse
        if (cancelled) return

        setClassTitle(data.session.title || 'Live Session')
        setClassSubject(data.session.subject || 'General')
        setClassRoomId(data.session.roomId || null)
        setLinkedCourseId(data.session.linkedCourseId || null)
        setStudents(data.students || [])
        setBreakoutRooms([])
        setHandRaises(deriveHandRaisesFromStudents(data.students || []))
        setMessages(data.messages || [])
        setMetrics(data.metrics || buildFallbackMetrics(data.students || []))
        setAlerts(data.alerts || [])
      } catch (error) {
        loadedForRef.current = null
        if (!cancelled) {
          const message =
            error instanceof Error ? error.message : 'Failed to load live class session'
          toast.error(message)
          router.push('/tutor/classes')
        }
      } finally {
        if (timeoutId) clearTimeout(timeoutId)
        if (!cancelled) setIsLoading(false)
      }
    }

    load()
    return () => {
      cancelled = true
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [session?.user?.id, sessionId, router])

  useEffect(() => {
    if (!linkedCourseId) {
      setLinkedCourseName(null)
      return
    }
    let cancelled = false
    const loadCourseName = async () => {
      try {
        const res = await fetch(`/api/tutor/courses/${linkedCourseId}`, {
          credentials: 'include',
        })
        if (!res.ok) return
        const data = await res.json()
        if (!cancelled) {
          setLinkedCourseName(data?.course?.name ?? null)
        }
      } catch {
        if (!cancelled) setLinkedCourseName(null)
      }
    }
    loadCourseName()
    return () => {
      cancelled = true
    }
  }, [linkedCourseId])

  // Convert LiveStudent to EngagementMetrics format
  const engagementMetrics: EngagementMetricType[] = useMemo(() => {
    return students.map(s => {
      let attentionLevel: 'focused' | 'distracted' | 'away' | 'inactive'
      switch (s.attentionLevel) {
        case 'high':
          attentionLevel = 'focused'
          break
        case 'medium':
          attentionLevel = 'distracted'
          break
        case 'low':
        default:
          attentionLevel = s.status === 'idle' ? 'away' : 'inactive'
      }

      return {
        studentId: s.id,
        name: s.name,
        engagementScore: s.engagementScore,
        attentionLevel,
        participationCount: s.reactions + s.chatMessages,
        comprehensionEstimate: s.engagementScore,
        lastActivity: new Date(s.lastActive),
        raisedHand: s.handRaised,
        chatMessages: s.chatMessages,
        whiteboardInteractions: 0,
        timeInSession: Math.floor((renderNow - new Date(s.joinedAt).getTime()) / 60000),
        struggleIndicators: s.engagementScore < 50 ? 2 : 0,
      }
    })
  }, [students, renderNow])

  // Create command palette actions
  const persistRecordingState = useCallback(
    async (recording: boolean) => {
      const fallbackRecordingUrl = recording ? null : classRoomId
      await fetch(`/api/tutor/live-sessions/${sessionId}/recording`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          isRecording: recording,
          recordingUrl: fallbackRecordingUrl,
        }),
      })
    },
    [classRoomId, sessionId]
  )

  const generateReplayArtifact = useCallback(async () => {
    const response = await fetch(`/api/tutor/live-sessions/${sessionId}/replay-artifact/generate`, {
      method: 'POST',
      credentials: 'include',
    })
    if (!response.ok) {
      throw new Error('Replay artifact generation failed')
    }
  }, [sessionId])

  const handleToggleRecording = useCallback(async () => {
    try {
      if (isRecording) {
        setIsRecording(false)
        await persistRecordingState(false)
        toast.success('Recording stopped. Building transcript and AI lesson summary...')
        await generateReplayArtifact()
        toast.success('Replay artifact ready')
        return
      }

      setIsRecording(true)
      setRecordingDurationSeconds(0)
      await persistRecordingState(true)
      toast.success('Recording started')
    } catch (error) {
      setIsRecording(false)
      setRecordingDurationSeconds(0)
      toast.error(error instanceof Error ? error.message : 'Recording action failed')
    }
  }, [generateReplayArtifact, isRecording, persistRecordingState])

  // Handlers
  const handleCallOn = useCallback((studentId: string) => {
    setStudents(prev => prev.map(s => (s.id === studentId ? { ...s, handRaised: false } : s)))
    setHandRaises(prev =>
      prev.map(h => (h.studentId === studentId ? { ...h, status: 'answered' } : h))
    )
  }, [])

  const handleAcknowledgeHand = useCallback((handId: string) => {
    setHandRaises(prev => prev.map(h => (h.id === handId ? { ...h, status: 'acknowledged' } : h)))
  }, [])

  // Student Management - Push hint to student
  const handlePushHint = useCallback(
    (studentId: string, hint: string, type: 'socratic' | 'encouragement' = 'socratic') => {
      const student = students.find(s => s.id === studentId)
      if (student) {
        toast.success(`Hint sent to ${student.name}`, {
          description: type === 'socratic' ? 'Socratic hint delivered' : 'Encouragement sent',
        })
      }
    },
    [students]
  )

  // Student Management - Nudge student
  const handleSendNudge = useCallback(
    (studentId: string) => {
      const student = students.find(s => s.id === studentId)
      if (student) {
        toast.success(`Nudge sent to ${student.name}`, {
          description: 'Remember to ask questions if you need help!',
        })
      }
    },
    [students]
  )

  // Student Management - Invite to breakout
  const handleInviteToBreakout = useCallback(
    (studentId: string) => {
      const student = students.find(s => s.id === studentId)
      if (student) {
        toast.success(`${student.name} invited to breakout room`)
      }
    },
    [students]
  )

  const handleAssignToRoom = useCallback(
    (studentId: string, roomId: string) => {
      setStudents(prev =>
        prev.map(s => (s.id === studentId ? { ...s, breakoutRoomId: roomId } : s))
      )
      setBreakoutRooms(prev =>
        prev.map(room => {
          if (room.id === roomId) {
            const student = students.find(s => s.id === studentId)
            if (student && !room.participants.find(p => p.userId === studentId)) {
              const participant = {
                id: student.id,
                userId: student.id,
                name: student.name,
                role: 'student' as const,
                joinedAt: new Date().toISOString(),
                isOnline: student.status === 'online',
                isMuted: false,
                isVideoOff: false,
                isScreenSharing: false,
                engagementScore: student.engagementScore,
                attentionLevel: student.attentionLevel,
                handRaised: student.handRaised,
              }
              return { ...room, participants: [...room.participants, participant] }
            }
          }
          return room
        })
      )
    },
    [students]
  )

  const handleRemoveFromRoom = useCallback((studentId: string) => {
    setStudents(prev =>
      prev.map(s => (s.id === studentId ? { ...s, breakoutRoomId: undefined } : s))
    )
    setBreakoutRooms(prev =>
      prev.map(room => ({
        ...room,
        participants: room.participants.filter(p => p.userId !== studentId),
      }))
    )
  }, [])

  const handleJoinRoom = useCallback((room: BreakoutRoom) => {
    setActiveBreakoutRoom(room)
    setIsBreakoutModalOpen(true)
  }, [])

  const handleCloseBreakoutModal = useCallback(() => {
    setIsBreakoutModalOpen(false)
    setActiveBreakoutRoom(null)
  }, [])

  const handleEndBreakoutRoom = useCallback((roomId: string) => {
    setBreakoutRooms(prev =>
      prev.map(r => (r.id === roomId ? { ...r, status: 'closed' as const } : r))
    )
    setStudents(prev =>
      prev.map(s => (s.breakoutRoomId === roomId ? { ...s, breakoutRoomId: undefined } : s))
    )
    toast.success('Breakout room ended')
  }, [])

  const handleExtendTime = useCallback((roomId: string, minutes: number) => {
    toast.success(`Extended room time by ${minutes} minutes`)
  }, [])

  const handlePinMessage = useCallback((messageId: string) => {
    setMessages(prev => prev.map(m => (m.id === messageId ? { ...m, isPinned: !m.isPinned } : m)))
  }, [])

  const handleEndClass = useCallback(async () => {
    if (isRecording) {
      try {
        await persistRecordingState(false)
        await generateReplayArtifact()
      } catch {
        // Non-fatal: class should still end.
      }
    }
    router.push('/tutor/dashboard')
  }, [generateReplayArtifact, isRecording, persistRecordingState, router])

  const dismissRecordingNotice = useCallback(() => {
    setShowRecordingNotice(false)
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(recordingNoticeStorageKey, '1')
    }
  }, [recordingNoticeStorageKey])

  useEffect(() => {
    if (isLoading) return
    if (autoRecordingStartedRef.current) return
    autoRecordingStartedRef.current = true
    const seenNotice =
      typeof window !== 'undefined'
        ? window.localStorage.getItem(recordingNoticeStorageKey) === '1'
        : false
    if (!seenNotice) {
      setShowRecordingNotice(true)
    }
    void handleToggleRecording()
  }, [handleToggleRecording, isLoading, recordingNoticeStorageKey])

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="max-w-md px-4 text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
          <p className="font-medium text-gray-600">Loading live session...</p>
          <p className="mt-2 text-sm text-gray-400">This may take a few seconds. Please wait.</p>
          <Button
            variant="outline"
            size="sm"
            className="mt-4"
            onClick={() => router.push('/tutor/classes')}
          >
            Cancel & Go Back
          </Button>
        </div>
      </div>
    )
  }

  const onlineCount = students.filter(s => s.status === 'online').length
  const pendingHands = handRaises.filter(h => h.status === 'pending').length
  const strugglingCount = students.filter(s => s.engagementScore < 50).length
  const courseDisplayName = linkedCourseName || classTitle

  return (
    <div className="flex h-screen flex-col bg-gray-50">
      {/* Header */}
      <header className="flex shrink-0 items-center justify-between border-b bg-white px-4 py-3">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-lg font-semibold">Live Session</h1>
            <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
              <span className="font-medium text-gray-700">{courseDisplayName}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
                Live
              </span>
              <span>•</span>
              <span>Session ID: {sessionId}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="gap-1">
              <Users className="h-3 w-3" />
              {onlineCount}/{students.length}
            </Badge>
            {pendingHands > 0 && (
              <Badge variant="destructive" className="gap-1">
                <Hand className="h-3 w-3" />
                {pendingHands}
              </Badge>
            )}
            {strugglingCount > 0 && (
              <Badge variant="outline" className="gap-1 border-orange-400 text-orange-600">
                <TrendingUp className="h-3 w-3" />
                {strugglingCount} struggling
              </Badge>
            )}
          </div>

          <Separator orientation="vertical" className="h-6" />

          {/* Media Controls */}
          <div className="flex items-center gap-2">
            <Button
              variant={isMuted ? 'destructive' : 'outline'}
              size="icon"
              onClick={() => setIsMuted(!isMuted)}
            >
              {isMuted ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            </Button>
            <Button
              variant={isVideoOff ? 'destructive' : 'outline'}
              size="icon"
              onClick={() => setIsVideoOff(!isVideoOff)}
            >
              {isVideoOff ? <VideoOff className="h-4 w-4" /> : <Video className="h-4 w-4" />}
            </Button>
            <Button
              variant={isScreenSharing ? 'default' : 'outline'}
              size="icon"
              onClick={() => setIsScreenSharing(!isScreenSharing)}
            >
              <MonitorUp className="h-4 w-4" />
            </Button>
            <Button
              variant={isRecording ? 'destructive' : 'outline'}
              size="sm"
              className="gap-2"
              onClick={() => void handleToggleRecording()}
            >
              <Radio className={isRecording ? 'h-4 w-4 animate-pulse' : 'h-4 w-4'} />
              {isRecording ? 'Stop Recording' : 'Start Recording'}
            </Button>
            {isRecording && (
              <Badge variant="destructive" className="gap-1">
                REC {Math.floor(recordingDurationSeconds / 60)}m{' '}
                {String(recordingDurationSeconds % 60).padStart(2, '0')}s
              </Badge>
            )}
          </div>

          <Separator orientation="vertical" className="h-6" />

          <Button
            variant="destructive"
            className="gap-2"
            onClick={() => setShowEndClassDialog(true)}
          >
            <LogOut className="h-4 w-4" />
            End Class
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel - Tabs */}
        <div className="flex-1 overflow-hidden p-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex h-full flex-col">
            <div className="w-full overflow-x-auto pb-1">
              <TabsList className="inline-flex min-w-max gap-1 rounded-lg bg-muted p-1">
                <TabsTrigger
                  value="students"
                  onClick={() => setActiveTab('students')}
                  className="gap-1 whitespace-nowrap text-xs data-[state=active]:bg-white data-[state=active]:shadow-sm"
                >
                  <LayoutTemplate className="h-3 w-3" />
                  Students & Progress
                </TabsTrigger>
                <TabsTrigger
                  value="rooms"
                  onClick={() => setActiveTab('rooms')}
                  className="gap-1 whitespace-nowrap text-xs data-[state=active]:bg-white data-[state=active]:shadow-sm"
                >
                  <LayoutGrid className="h-3 w-3" />
                  Rooms
                </TabsTrigger>
                <TabsTrigger
                  value="polls"
                  onClick={() => setActiveTab('polls')}
                  className="gap-1 whitespace-nowrap text-xs data-[state=active]:bg-white data-[state=active]:shadow-sm"
                >
                  <BarChart2 className="h-3 w-3" />
                  Polls
                </TabsTrigger>
                <TabsTrigger
                  value="whiteboard"
                  onClick={() => setActiveTab('whiteboard')}
                  className="gap-1 whitespace-nowrap text-xs data-[state=active]:bg-white data-[state=active]:shadow-sm"
                >
                  <Wrench className="h-3 w-3" />
                  Whiteboard
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="students" className="mt-4 flex-1 overflow-hidden">
              <StudentList
                students={students}
                breakoutRooms={breakoutRooms}
                onCallOn={handleCallOn}
                onAssignToRoom={handleAssignToRoom}
                onRemoveFromRoom={handleRemoveFromRoom}
                onPushHint={handlePushHint}
                onSendNudge={handleSendNudge}
                onInviteToBreakout={handleInviteToBreakout}
              />
            </TabsContent>

            <TabsContent value="rooms" className="mt-4 flex-1 overflow-hidden">
              <UnifiedBreakoutManager
                sessionId={sessionId}
                tutorId={session?.user?.id || 'tutor-1'}
                tutorName={session?.user?.name || 'Tutor'}
                students={students}
                onRoomsChange={setBreakoutRooms}
                onJoinRoom={handleJoinRoom}
              />
            </TabsContent>

            <TabsContent value="polls" className="mt-4 flex-1 overflow-hidden">
              <QuickPollPanel
                sessionId={sessionId}
                tutorId={session?.user?.id || 'tutor-1'}
                totalStudents={students.length}
              />
            </TabsContent>

            <TabsContent value="whiteboard" className="mt-4 flex-1 overflow-hidden" forceMount>
              <MultiLayerWhiteboardInterface
                sessionId={sessionId}
                roomId={classRoomId || sessionId}
                initialCourseId={linkedCourseId}
                classSubject={classSubject}
                students={students.map(student => ({
                  id: student.id,
                  name: student.name,
                  status: student.status,
                  engagement: student.engagementScore,
                }))}
                isSocketConnected={Boolean(socket)}
                onOpenInWhiteboard={() => setActiveTab('whiteboard')}
              />
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Panel - Sidebar */}
        <div className={rightPanelCollapsed ? 'w-12' : 'w-[400px]'}>
          {rightPanelCollapsed ? (
            <div className="flex h-full flex-col items-center gap-3 border-l bg-white/80 py-4">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => setRightPanelCollapsed(false)}
                aria-label="Expand assistant panel"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              {hasPanelNotifications && (
                <div className="flex flex-col items-center gap-2">
                  {panelNotificationCounts.messages > 0 && (
                    <div className="flex flex-col items-center gap-1">
                      <MessageCircle className="h-4 w-4 text-blue-600" />
                      <Badge variant="secondary" className="text-[10px]">
                        {panelNotificationCounts.messages}
                      </Badge>
                    </div>
                  )}
                  {panelNotificationCounts.handRaises > 0 && (
                    <div className="flex flex-col items-center gap-1">
                      <Hand className="h-4 w-4 text-orange-600" />
                      <Badge variant="secondary" className="text-[10px]">
                        {panelNotificationCounts.handRaises}
                      </Badge>
                    </div>
                  )}
                  {panelNotificationCounts.alerts > 0 && (
                    <div className="flex flex-col items-center gap-1">
                      <Sparkles className="h-4 w-4 text-purple-600" />
                      <Badge variant="secondary" className="text-[10px]">
                        {panelNotificationCounts.alerts}
                      </Badge>
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="flex h-full flex-col gap-4 overflow-hidden p-4 pl-0">
              <div className="flex justify-end">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setRightPanelCollapsed(true)}
                  aria-label="Collapse assistant panel"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>

              {/* Multi-Layer Controls */}
              <Card className="shrink-0">
                <CardHeader className="px-3 py-2">
                  <CardTitle className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Layers className="h-3 w-3" />
                    Whiteboard Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-1.5 px-3 py-2 pt-0">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">Socket</span>
                    <Badge variant={socket ? 'default' : 'secondary'} className="h-4 text-[10px]">
                      {socket ? 'Connected' : 'Offline'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">Online</span>
                    <span className="font-medium">
                      {onlineCount}/{students.length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">Boards</span>
                    <span className="font-medium">{students.length + 1}</span>
                  </div>
                </CardContent>
              </Card>

              {/* AI Teaching Assistant - Top Priority */}
              <div className="min-h-0">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-xs font-semibold text-muted-foreground">
                    AI Teaching Assistant
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 px-2 text-xs"
                    onClick={() => setShowTeachingAssistant(prev => !prev)}
                  >
                    {showTeachingAssistant ? 'Hide' : 'Show'}
                  </Button>
                </div>
                {showTeachingAssistant ? (
                  <div className="h-[40%] min-h-0">
                    <AITeachingAssistant
                      students={students}
                      metrics={metrics}
                      classDuration={metrics?.classDuration || 0}
                      currentTopic={classSubject}
                    />
                  </div>
                ) : (
                  <div className="rounded border border-dashed p-3 text-xs text-muted-foreground">
                    Teaching assistant hidden.
                  </div>
                )}
              </div>

              {/* Hand Raise Queue */}
              <div className="min-h-0 flex-1">
                <HandRaiseQueue
                  handRaises={handRaises}
                  onAcknowledge={handleAcknowledgeHand}
                  onAnswer={handId => {
                    const hand = handRaises.find(h => h.id === handId)
                    if (hand) handleCallOn(hand.studentId)
                  }}
                />
              </div>

              {/* Chat Monitor */}
              <div className="min-h-0 flex-1">
                <ChatMonitor
                  messages={messages}
                  students={students}
                  socket={socket}
                  roomId={sessionId}
                  onPinMessage={handlePinMessage}
                />
              </div>
            </div>
          )}
        </div>

        {/* Engagement Dashboard - Overlay Panel */}
        {showEngagementPanel && (
          <div className="absolute right-4 top-20 z-50 w-96">
            <EngagementDashboard
              students={engagementMetrics}
              isOpen={showEngagementPanel}
              onToggle={() => setShowEngagementPanel(false)}
              onSelectStudent={studentId => {
                toast.info(`Selected student: ${studentId}`)
              }}
              onSendNudge={handleSendNudge}
              onInviteToBreakout={handleInviteToBreakout}
            />
          </div>
        )}
      </div>

      {/* Breakout Room Modal */}
      <UnifiedBreakoutModal
        room={activeBreakoutRoom}
        isOpen={isBreakoutModalOpen}
        onClose={handleCloseBreakoutModal}
        userId={session?.user?.id || 'tutor-1'}
        userName={session?.user?.name || 'Tutor'}
        role="tutor"
        onEndRoom={handleEndBreakoutRoom}
        onExtendTime={handleExtendTime}
      />

      {/* End Class Dialog */}
      <Dialog open={showEndClassDialog} onOpenChange={setShowEndClassDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>End Class?</DialogTitle>
            <DialogDescription>
              Are you sure you want to end this live session? All students will be disconnected.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setShowEndClassDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleEndClass}>
              End Class
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog
        modal={false}
        open={showRecordingNotice}
        onOpenChange={open => {
          if (!open) dismissRecordingNotice()
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Class Recording Is On By Default</DialogTitle>
            <DialogDescription>
              This session is being recorded to generate a transcript, AI lesson summary, and replay
              artifact for quality review, student revision, and attendance/missed-lesson
              continuity.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={dismissRecordingNotice}>Understood</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
