'use client'

import { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useSocket } from '@/hooks/use-socket'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { toast } from 'sonner'
import { StudentList } from './StudentList'
import { UnifiedBreakoutManager, UnifiedBreakoutModal } from './breakout'
import { HandRaiseQueue } from './HandRaiseQueue'
import { CourseDevPanel } from '@/components/class/course-dev-panel'
import { ChatMonitor } from './ChatMonitor'
import { LiveAnalytics } from './LiveAnalytics'
import { AITeachingAssistant } from './AITeachingAssistant'
import { StudentProgressPanel } from './StudentProgressPanel'
import { MultiLayerWhiteboardInterface } from './MultiLayerWhiteboardInterface'
import { MathBoardHost } from '@/components/whiteboard/MathBoardHost'
import { QuickPollPanel } from '@/components/polls'
import { 
  EngagementDashboard,
  EngagementMetrics as EngagementMetricType
} from '@/components/class/engagement'
import { 
  CommandPalette, 
  useCommandPalette, 
  createClassroomActions,
  CommandAction 
} from '@/components/class/command-palette'
import type { LiveStudent, BreakoutRoom, HandRaise, ChatMessage, EngagementMetrics, Alert } from '../types'
import { 
  Users,
  LayoutGrid,
  BarChart3,
  Radio,
  Mic,
  MicOff,
  Video,
  VideoOff,
  MonitorUp,
  Hand,
  ArrowLeft,
  TrendingUp,
  GraduationCap,
  BarChart2,
  Wrench,
  Command,
  ChevronRight,
  LogOut,
  Calculator
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
  averageEngagement: Math.round(students.filter(s => s.status === 'online').reduce((sum, s) => sum + s.engagementScore, 0) / Math.max(1, students.filter(s => s.status === 'online').length)),
  participationRate: 0,
  totalChatMessages: students.reduce((sum, s) => sum + s.chatMessages, 0),
  classDuration: 0,
  classStartTime: new Date().toISOString(),
  veryEngaged: students.filter(s => s.engagementScore >= 85).length,
  engaged: students.filter(s => s.engagementScore >= 60 && s.engagementScore < 85).length,
  passive: students.filter(s => s.engagementScore >= 30 && s.engagementScore < 60).length,
  disengaged: students.filter(s => s.engagementScore < 30).length,
  engagementTrend: 'stable'
})

const deriveHandRaisesFromStudents = (students: LiveStudent[]): HandRaise[] => {
  return students
    .filter((s) => s.handRaised)
    .map((s) => ({
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
  const socketOptions = session?.user?.id
    ? {
        roomId: sessionId,
        userId: session.user.id,
        name: session.user.name || 'Tutor',
        role: 'tutor' as const,
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
  const [classTitle, setClassTitle] = useState('Live Class')
  const [classSubject, setClassSubject] = useState('General')
  const [classRoomId, setClassRoomId] = useState<string | null>(null)
  const [linkedCourseId, setLinkedCourseId] = useState<string | null>(null)
  
  // Media controls
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOff, setIsVideoOff] = useState(false)
  const [isScreenSharing, setIsScreenSharing] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [recordingDurationSeconds, setRecordingDurationSeconds] = useState(0)
  
  // UI State
  const [showEngagementPanel, setShowEngagementPanel] = useState(false)
  const [showEndClassDialog, setShowEndClassDialog] = useState(false)
  const [showRecordingNotice, setShowRecordingNotice] = useState(false)
  const [activeTab, setActiveTab] = useState('students')
  const [activeBreakoutRoom, setActiveBreakoutRoom] = useState<BreakoutRoom | null>(null)
  const [isBreakoutModalOpen, setIsBreakoutModalOpen] = useState(false)
  const autoRecordingStartedRef = useRef(false)
  const recordingNoticeStorageKey = `live-class-recording-notice:${sessionId}`

  useEffect(() => {
    if (!isRecording) {
      setRecordingDurationSeconds(0)
      return
    }
    const interval = setInterval(() => {
      setRecordingDurationSeconds((prev) => prev + 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [isRecording])

  // Command Palette
  const { isOpen: isCommandPaletteOpen, setIsOpen: setCommandPaletteOpen } = useCommandPalette('cmd+k')

  // Load and start class session
  useEffect(() => {
    if (!session?.user?.id) return

    let cancelled = false
    const load = async () => {
      setIsLoading(true)
      try {
        const csrfRes = await fetch('/api/csrf', { credentials: 'include' })
        const csrfData = await csrfRes.json().catch(() => ({}))
        const csrfToken = csrfData?.token ?? null

        // Start class if not already active.
        await fetch(`/api/tutor/classes/${sessionId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(csrfToken && { 'X-CSRF-Token': csrfToken }),
          },
          credentials: 'include',
        })

        const res = await fetch(`/api/tutor/classes/${sessionId}`, { credentials: 'include' })
        if (!res.ok) {
          const raw = await res.text().catch(() => '')
          throw new Error(raw || `Failed to load class (${res.status})`)
        }

        const data = (await res.json()) as LiveClassBootstrapResponse
        if (cancelled) return

        setClassTitle(data.session.title || 'Live Class')
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
        if (!cancelled) {
          toast.error(error instanceof Error ? error.message : 'Failed to load live class session')
          router.push('/tutor/live-class')
        }
      } finally {
        if (!cancelled) setIsLoading(false)
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [session?.user?.id, sessionId, router])

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
        struggleIndicators: s.engagementScore < 50 ? 2 : 0
      }
    })
  }, [students, renderNow])

  // Create command palette actions
  const persistRecordingState = useCallback(async (recording: boolean) => {
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
  }, [classRoomId, sessionId])

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

  const commandActions: CommandAction[] = useMemo(() => {
    return createClassroomActions({
      isAudioEnabled: !isMuted,
      isVideoEnabled: !isVideoOff,
      isScreenSharing,
      isRecording,
      studentsRaisingHands: handRaises.filter(h => h.status === 'pending').length,
      onToggleAudio: () => {
        setIsMuted(!isMuted)
        toast.success(isMuted ? 'Microphone unmuted' : 'Microphone muted')
      },
      onToggleVideo: () => {
        setIsVideoOff(!isVideoOff)
        toast.success(isVideoOff ? 'Video started' : 'Video stopped')
      },
      onToggleScreenShare: () => {
        setIsScreenSharing(!isScreenSharing)
        toast.success(isScreenSharing ? 'Screen sharing stopped' : 'Screen sharing started')
      },
      onToggleRecording: () => {
        void handleToggleRecording()
      },
      onMuteAll: () => {
        toast.success('All students muted')
      },
      onCallAttention: () => {
        toast.success('Attention request sent to all students')
      },
      onOpenWhiteboard: () => {
        toast.info('Whiteboard opened')
      },
      onOpenBreakouts: () => {
        toast.info('Navigate to Rooms tab for breakout management')
      },
      onOpenEngagement: () => {
        setShowEngagementPanel(true)
        toast.success('Engagement Dashboard opened')
      },
      onOpenPolls: () => {
        toast.info('Navigate to Polls tab to create polls')
      },
      onSendBroadcast: () => {
        toast.info('Use Chat Monitor to send messages')
      },
      onLeaveClass: () => {
        setShowEndClassDialog(true)
      }
    })
  }, [isMuted, isVideoOff, isScreenSharing, isRecording, handRaises, handleToggleRecording])

  // Handlers
  const handleCallOn = useCallback((studentId: string) => {
    setStudents(prev => prev.map(s => s.id === studentId ? { ...s, handRaised: false } : s))
    setHandRaises(prev => prev.map(h => h.studentId === studentId ? { ...h, status: 'answered' } : h))
  }, [])

  const handleAcknowledgeHand = useCallback((handId: string) => {
    setHandRaises(prev => prev.map(h => h.id === handId ? { ...h, status: 'acknowledged' } : h))
  }, [])

  // Student Management - Push hint to student
  const handlePushHint = useCallback((studentId: string, hint: string, type: 'socratic' | 'encouragement' = 'socratic') => {
    const student = students.find(s => s.id === studentId)
    if (student) {
      toast.success(`Hint sent to ${student.name}`, {
        description: type === 'socratic' ? 'Socratic hint delivered' : 'Encouragement sent'
      })
    }
  }, [students])

  // Student Management - Nudge student
  const handleSendNudge = useCallback((studentId: string) => {
    const student = students.find(s => s.id === studentId)
    if (student) {
      toast.success(`Nudge sent to ${student.name}`, {
        description: 'Remember to ask questions if you need help!'
      })
    }
  }, [students])

  // Student Management - Invite to breakout
  const handleInviteToBreakout = useCallback((studentId: string) => {
    const student = students.find(s => s.id === studentId)
    if (student) {
      toast.success(`${student.name} invited to breakout room`)
    }
  }, [students])

  const handleAssignToRoom = useCallback((studentId: string, roomId: string) => {
    setStudents(prev => prev.map(s => s.id === studentId ? { ...s, breakoutRoomId: roomId } : s))
    setBreakoutRooms(prev => prev.map(room => {
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
            handRaised: student.handRaised
          }
          return { ...room, participants: [...room.participants, participant] }
        }
      }
      return room
    }))
  }, [students])

  const handleRemoveFromRoom = useCallback((studentId: string) => {
    setStudents(prev => prev.map(s => s.id === studentId ? { ...s, breakoutRoomId: undefined } : s))
    setBreakoutRooms(prev => prev.map(room => ({
      ...room,
      participants: room.participants.filter(p => p.userId !== studentId)
    })))
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
    setBreakoutRooms(prev => prev.map(r => r.id === roomId ? { ...r, status: 'closed' as const } : r))
    setStudents(prev => prev.map(s => s.breakoutRoomId === roomId ? { ...s, breakoutRoomId: undefined } : s))
    toast.success('Breakout room ended')
  }, [])

  const handleExtendTime = useCallback((roomId: string, minutes: number) => {
    toast.success(`Extended room time by ${minutes} minutes`)
  }, [])

  const handlePinMessage = useCallback((messageId: string) => {
    setMessages(prev => prev.map(m => m.id === messageId ? { ...m, isPinned: !m.isPinned } : m))
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
    const seenNotice = typeof window !== 'undefined'
      ? window.localStorage.getItem(recordingNoticeStorageKey) === '1'
      : false
    if (!seenNotice) {
      setShowRecordingNotice(true)
    }
    void handleToggleRecording()
  }, [handleToggleRecording, isLoading, recordingNoticeStorageKey])

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-gray-600">Loading live session...</p>
        </div>
      </div>
    )
  }

  const onlineCount = students.filter(s => s.status === 'online').length
  const pendingHands = handRaises.filter(h => h.status === 'pending').length
  const strugglingCount = students.filter(s => s.engagementScore < 50).length

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b px-4 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="font-semibold text-lg">{classTitle}</h1>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
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
              <Users className="w-3 h-3" />
              {onlineCount}/{students.length}
            </Badge>
            {pendingHands > 0 && (
              <Badge variant="destructive" className="gap-1">
                <Hand className="w-3 h-3" />
                {pendingHands}
              </Badge>
            )}
            {strugglingCount > 0 && (
              <Badge variant="outline" className="gap-1 border-orange-400 text-orange-600">
                <TrendingUp className="w-3 h-3" />
                {strugglingCount} struggling
              </Badge>
            )}
          </div>

          <Separator orientation="vertical" className="h-6" />

          {/* Tools Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="gap-1"
              >
                <Wrench className="h-4 w-4" />
                <span className="hidden sm:inline">Tools</span>
                <ChevronRight className="h-3 w-3 opacity-80 rotate-90" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem
                onClick={() => setCommandPaletteOpen(true)}
                className="gap-2"
              >
                <Command className="h-4 w-4" />
                Command Palette
                <kbd className="ml-auto text-[10px] bg-muted px-1 rounded">⌘K</kbd>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setShowEngagementPanel(!showEngagementPanel)}
                className="gap-2"
              >
                <BarChart3 className="h-4 w-4" />
                Engagement Dashboard
                {showEngagementPanel && <span className="ml-auto text-green-600">✓</span>}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Separator orientation="vertical" className="h-6" />

          {/* Media Controls */}
          <div className="flex items-center gap-2">
            <Button
              variant={isMuted ? 'destructive' : 'outline'}
              size="icon"
              onClick={() => setIsMuted(!isMuted)}
            >
              {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </Button>
            <Button
              variant={isVideoOff ? 'destructive' : 'outline'}
              size="icon"
              onClick={() => setIsVideoOff(!isVideoOff)}
            >
              {isVideoOff ? <VideoOff className="w-4 h-4" /> : <Video className="w-4 h-4" />}
            </Button>
            <Button
              variant={isScreenSharing ? 'default' : 'outline'}
              size="icon"
              onClick={() => setIsScreenSharing(!isScreenSharing)}
            >
              <MonitorUp className="w-4 h-4" />
            </Button>
            <Button
              variant={isRecording ? 'destructive' : 'outline'}
              size="sm"
              className="gap-2"
              onClick={() => void handleToggleRecording()}
            >
              <Radio className={isRecording ? 'w-4 h-4 animate-pulse' : 'w-4 h-4'} />
              {isRecording ? 'Stop Recording' : 'Start Recording'}
            </Button>
            {isRecording && (
              <Badge variant="destructive" className="gap-1">
                REC {Math.floor(recordingDurationSeconds / 60)}m {String(recordingDurationSeconds % 60).padStart(2, '0')}s
              </Badge>
            )}
          </div>

          <Separator orientation="vertical" className="h-6" />

          <Button 
            variant="destructive" 
            className="gap-2"
            onClick={() => setShowEndClassDialog(true)}
          >
            <LogOut className="w-4 h-4" />
            End Class
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Tabs */}
        <div className="flex-1 p-4 overflow-hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
            <div className="w-full overflow-x-auto pb-1">
              <TabsList className="inline-flex min-w-max bg-muted p-1 rounded-lg gap-1">
              <TabsTrigger value="students" onClick={() => setActiveTab('students')} className="gap-1 data-[state=active]:bg-white data-[state=active]:shadow-sm text-xs whitespace-nowrap">
                <Users className="w-3 h-3" />
                Students
              </TabsTrigger>
              <TabsTrigger value="progress" onClick={() => setActiveTab('progress')} className="gap-1 data-[state=active]:bg-white data-[state=active]:shadow-sm text-xs whitespace-nowrap">
                <TrendingUp className="w-3 h-3" />
                Progress
              </TabsTrigger>
              <TabsTrigger value="rooms" onClick={() => setActiveTab('rooms')} className="gap-1 data-[state=active]:bg-white data-[state=active]:shadow-sm text-xs whitespace-nowrap">
                <LayoutGrid className="w-3 h-3" />
                Rooms
              </TabsTrigger>
              <TabsTrigger value="polls" onClick={() => setActiveTab('polls')} className="gap-1 data-[state=active]:bg-white data-[state=active]:shadow-sm text-xs whitespace-nowrap">
                <BarChart2 className="w-3 h-3" />
                Polls
              </TabsTrigger>
              <TabsTrigger value="whiteboard" onClick={() => setActiveTab('whiteboard')} className="gap-1 data-[state=active]:bg-white data-[state=active]:shadow-sm text-xs whitespace-nowrap">
                <Wrench className="w-3 h-3" />
                Whiteboard
              </TabsTrigger>
              <TabsTrigger value="math" onClick={() => setActiveTab('math')} className="gap-1 data-[state=active]:bg-white data-[state=active]:shadow-sm text-xs whitespace-nowrap">
                <Calculator className="w-3 h-3" />
                Math
              </TabsTrigger>
              <TabsTrigger value="course-dev" onClick={() => setActiveTab('course-dev')} className="gap-1 data-[state=active]:bg-white data-[state=active]:shadow-sm text-xs whitespace-nowrap">
                <GraduationCap className="w-3 h-3" />
                Course Dev
              </TabsTrigger>
              <TabsTrigger value="analytics" onClick={() => setActiveTab('analytics')} className="gap-1 data-[state=active]:bg-white data-[state=active]:shadow-sm text-xs whitespace-nowrap">
                <BarChart3 className="w-3 h-3" />
                Analytics
              </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="students" className="flex-1 mt-4 overflow-hidden">
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

            <TabsContent value="progress" className="flex-1 mt-4 overflow-hidden">
              <StudentProgressPanel 
                students={students}
                classDuration={metrics?.classDuration || 0}
              />
            </TabsContent>

            <TabsContent value="rooms" className="flex-1 mt-4 overflow-hidden">
              <UnifiedBreakoutManager
                sessionId={sessionId}
                tutorId={session?.user?.id || 'tutor-1'}
                tutorName={session?.user?.name || 'Tutor'}
                students={students}
                onRoomsChange={setBreakoutRooms}
                onJoinRoom={handleJoinRoom}
              />
            </TabsContent>

            <TabsContent value="polls" className="flex-1 mt-4 overflow-hidden">
              <QuickPollPanel
                sessionId={sessionId}
                tutorId={session?.user?.id || 'tutor-1'}
                totalStudents={students.length}
              />
            </TabsContent>

            <TabsContent value="whiteboard" className="flex-1 mt-4 overflow-hidden">
              <MultiLayerWhiteboardInterface
                sessionId={sessionId}
                roomId={classRoomId || sessionId}
                initialCourseId={linkedCourseId}
                classSubject={classSubject}
                students={students.map((student) => ({
                  id: student.id,
                  name: student.name,
                  status: student.status,
                  engagement: student.engagementScore,
                }))}
                isSocketConnected={Boolean(socket)}
              />
            </TabsContent>

            <TabsContent value="math" className="flex-1 mt-4 overflow-hidden">
              <MathBoardHost
                sessionId={`math-${sessionId}`}
                socket={socket}
                userId={session?.user?.id}
                userName={session?.user?.name || 'Tutor'}
                role="tutor"
                className="h-full"
              />
            </TabsContent>

            <TabsContent value="analytics" className="flex-1 mt-4 overflow-hidden">
              <div className="h-full overflow-auto">
                {metrics && <LiveAnalytics metrics={metrics} alerts={alerts} />}
              </div>
            </TabsContent>

            <TabsContent value="course-dev" className="flex-1 mt-4 overflow-hidden">
              <CourseDevPanel
                roomId={sessionId}
                students={students.map(s => ({
                  id: s.id,
                  name: s.name,
                  userId: s.id,
                  status: s.status
                }))}
              />
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Panel - Sidebar */}
        <div className="w-[400px] p-4 pl-0 flex flex-col gap-4 overflow-hidden">
          {/* AI Teaching Assistant - Top Priority */}
          <div className="h-[40%] min-h-0">
            <AITeachingAssistant 
              students={students}
              metrics={metrics}
              classDuration={metrics?.classDuration || 0}
              currentTopic={classSubject}
            />
          </div>
          
          {/* Hand Raise Queue */}
          <div className="flex-1 min-h-0">
            <HandRaiseQueue 
              handRaises={handRaises}
              onAcknowledge={handleAcknowledgeHand}
              onAnswer={(handId) => {
                const hand = handRaises.find(h => h.id === handId)
                if (hand) handleCallOn(hand.studentId)
              }}
            />
          </div>

          {/* Chat Monitor */}
          <div className="flex-1 min-h-0">
            <ChatMonitor 
              messages={messages}
              students={students}
              socket={socket}
              roomId={sessionId}
              onPinMessage={handlePinMessage}
            />
          </div>
        </div>

        {/* Engagement Dashboard - Overlay Panel */}
        {showEngagementPanel && (
          <div className="absolute right-4 top-20 w-96 z-50">
            <EngagementDashboard
              students={engagementMetrics}
              isOpen={showEngagementPanel}
              onToggle={() => setShowEngagementPanel(false)}
              onSelectStudent={(studentId) => {
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

      {/* Command Palette */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        actions={commandActions}
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
        onOpenChange={(open) => {
          if (!open) dismissRecordingNotice()
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Class Recording Is On By Default</DialogTitle>
            <DialogDescription>
              This session is being recorded to generate a transcript, AI lesson summary, and replay artifact for quality review, student revision, and attendance/missed-lesson continuity.
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
