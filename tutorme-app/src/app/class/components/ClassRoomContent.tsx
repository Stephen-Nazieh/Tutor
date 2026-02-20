'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useSocket } from '@/hooks/use-socket'
import { useDailyCall } from '@/hooks/use-daily-call'
import { ChatPanel } from '@/components/class/chat-panel'
import { TutorControls } from '@/components/class/tutor-controls'
import { BreakoutControlPanel } from '@/components/class/breakout-control-panel'
import { BreakoutRoomView } from '@/components/class/breakout-room-view'
import { CourseDevPanel } from '@/components/class/course-dev-panel'
import { AssetsPanel } from '@/components/class/assets-panel'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { toast } from 'sonner'
import { StudentState, ChatMessage, BreakoutRoom } from '@/lib/socket-server'
import { Panel, Group as PanelGroup, Separator as PanelResizeHandle } from 'react-resizable-panels'
import { 
  MoreHorizontal, 
  ArrowLeft, 
  BarChart3, 
  Clock, 
  Command,
  MessageSquare,
  ChevronRight,
  Sparkles,
  Wrench,
  LogOut
} from 'lucide-react'

// NEW IMPORTS - Dashboard Improvements
import { 
  EngagementDashboard, 
  EngagementMetrics 
} from '@/components/class/engagement'
import { 
  SessionTimer, 
  AgendaItem 
} from '@/components/class/session-manager'
import { 
  CommandPalette, 
  useCommandPalette, 
  createClassroomActions,
  CommandAction 
} from '@/components/class/command-palette'
import { 
  QuickPoll, 
  Poll 
} from '@/components/class/polls'
import { BreakoutRoom as BreakoutRoomUI, SmartGroupingSuggestion } from '@/components/class/breakout-control-panel'
import { AITeachingAssistant } from '@/app/tutor/live-class/components/AITeachingAssistant'

// 7.1 Lazy load heavy components (whiteboard, video) for faster initial load
const EnhancedWhiteboard = dynamic(
  () => import('@/components/class/enhanced-whiteboard').then((m) => ({ default: m.EnhancedWhiteboard })),
  { ssr: false, loading: () => <div className="flex items-center justify-center min-h-[400px] bg-muted/30 rounded-lg">Loading whiteboard…</div> }
)
const SimpleWhiteboard = dynamic(
  () => import('@/components/class/simple-whiteboard').then((m) => ({ default: m.SimpleWhiteboard })),
  { ssr: false }
)
const VideoContainer = dynamic(
  () => import('@/components/class/video-container').then((m) => ({ default: m.VideoContainer })),
  { ssr: false, loading: () => <div className="flex items-center justify-center min-h-[200px] bg-muted/30 rounded-lg">Loading video…</div> }
)

interface ClassRoomContentProps {
  roomId: string
  /** When true, root uses h-full instead of h-screen (e.g. when embedded in tabbed layout). */
  embedded?: boolean
}

export function ClassRoomContent({ roomId, embedded }: ClassRoomContentProps) {
  const router = useRouter()
  const { data: session } = useSession()
  const isTutor = session?.user?.role === 'TUTOR'

  const [students, setStudents] = useState<StudentState[]>([])
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
  const [breakoutRooms, setBreakoutRooms] = useState<BreakoutRoom[]>([])
  const [activeTab, setActiveTab] = useState('classroom')
  const [roomData, setRoomData] = useState<{
    url: string
    token: string
  } | null>(null)
  const [isVideoFullscreen, setIsVideoFullscreen] = useState(false)
  const [currentBreakoutRoom, setCurrentBreakoutRoom] = useState<BreakoutRoom | null>(null)

  // Whiteboard page state
  const [whiteboardPages, setWhiteboardPages] = useState<Array<{
    id: string
    name: string
    strokes: any[]
    texts: any[]
    shapes: any[]
    backgroundColor: string
    backgroundStyle: 'grid' | 'solid' | 'dots' | 'lines'
    backgroundImage?: string
  }>>([{
    id: 'page-1',
    name: 'Page 1',
    strokes: [],
    texts: [],
    shapes: [],
    backgroundColor: '#ffffff',
    backgroundStyle: 'solid'
  }])
  const [currentPageIndex, setCurrentPageIndex] = useState(0)

  // Assets panel visibility
  const [showAssetsPanel, setShowAssetsPanel] = useState(false)

  // ==================== NEW FEATURE STATE ====================
  
  // Engagement Dashboard
  const [showEngagementPanel, setShowEngagementPanel] = useState(false)
  
  // Session Timer & Agenda
  const [agenda, setAgenda] = useState<AgendaItem[]>([
    { id: '1', title: 'Introduction & Ice Breaker', duration: 5, type: 'intro', status: 'completed' },
    { id: '2', title: 'Concept Review', duration: 15, type: 'content', status: 'active' },
    { id: '3', title: 'Group Practice', duration: 20, type: 'activity', status: 'pending' },
    { id: '4', title: 'Q&A and Wrap-up', duration: 10, type: 'wrapup', status: 'pending' },
  ])
  const [showSessionTimer, setShowSessionTimer] = useState(true)
  
  // Command Palette
  const { isOpen: isCommandPaletteOpen, setIsOpen: setCommandPaletteOpen } = useCommandPalette('cmd+k')
  
  // Quick Polls
  const [polls, setPolls] = useState<Poll[]>([])
  const [showPollsPanel, setShowPollsPanel] = useState(false)

  // Leave / End session confirmation (ClassRoom.md recommendation: safer critical action)
  const [showLeaveConfirm, setShowLeaveConfirm] = useState(false)
  
  // AI Assistant
  const [classStartTime] = useState<Date>(new Date())

  // Video call hook
  const {
    isJoined: isVideoJoined,
    isAudioEnabled,
    isVideoEnabled,
    isScreenSharing,
    participants: videoParticipants,
    join: joinVideo,
    leave: leaveVideo,
    toggleAudio,
    toggleVideo,
    startScreenShare,
    stopScreenShare
  } = useDailyCall({
    onParticipantJoined: (p) => console.log('Participant joined:', p.name),
    onParticipantLeft: (p) => console.log('Participant left:', p.name),
    onError: (err) => toast.error(`Video error: ${err.message}`)
  })

  // Breakout room chat messages (separate from main room)
  const [breakoutMessages, setBreakoutMessages] = useState<Array<{
    id: string
    senderId: string
    senderName: string
    content: string
    timestamp: Date
    isAi?: boolean
  }>>([])

  // Socket hook for real-time features
  const {
    isConnected: isSocketConnected,
    sendChatMessage,
    sendWhiteboardUpdate,
    sendActivityPing,
    sendBroadcast,
    pushHint,
    inviteToBreakout,
    sendBreakoutBroadcast,
    closeBreakoutRoom,
    extendBreakoutTime,
    sendBreakoutMessage,
    requestHelp
  } = useSocket({
    roomId,
    userId: session?.user?.id || '',
    name: session?.user?.name || 'Unknown',
    role: isTutor ? 'tutor' : 'student',
    onRoomState: (state) => {
      setStudents(state.students)
      setChatMessages(state.chatHistory)
    },
    onChatMessage: (msg) => {
      setChatMessages(prev => [...prev, msg])
    },
    onBreakoutRoomUpdate: (rooms) => setBreakoutRooms(rooms),
    onBreakoutInvite: (data) => {
      toast.info(`Tutor invites you to a breakout room`, {
        action: {
          label: 'Join',
          onClick: () => joinBreakoutRoom(data.roomId)
        },
        duration: 10000
      })
    },
    onBreakoutMessage: (msg) => {
      setBreakoutMessages(prev => [...prev, {
        id: msg.id || Date.now().toString(),
        senderId: msg.senderId,
        senderName: msg.senderName,
        content: msg.content,
        timestamp: new Date(msg.timestamp),
        isAi: msg.isAi
      }])
    },
    onNotification: (notification) => {
      switch (notification.type) {
        case 'info':
          toast.info(notification.message)
          break
        case 'warning':
          toast.warning(notification.message)
          break
        case 'error':
          toast.error(notification.message)
          break
        case 'success':
          toast.success(notification.message)
          break
      }
    }
  })

  // Convert StudentState to EngagementMetrics for the dashboard
  const engagementMetrics: EngagementMetrics[] = useMemo(() => {
    return students.map(s => {
      // Map StudentState status to EngagementMetrics attentionLevel
      let attentionLevel: 'focused' | 'distracted' | 'away' | 'inactive'
      switch (s.status) {
        case 'on_track':
          attentionLevel = 'focused'
          break
        case 'struggling':
        case 'needs_help':
          attentionLevel = 'distracted'
          break
        case 'idle':
          attentionLevel = 'away'
          break
        default:
          attentionLevel = 'focused'
      }
      
      return {
        studentId: s.userId,
        name: s.name,
        engagementScore: s.engagement || 50,
        attentionLevel,
        participationCount: Math.floor((s.engagement || 50) / 10),
        comprehensionEstimate: s.understanding || 50,
        lastActivity: new Date(s.lastActivity),
        raisedHand: false, // Would come from actual hand-raise state
        chatMessages: Math.floor(Math.random() * 5), // Would track actual messages
        whiteboardInteractions: 0,
        timeInSession: Math.floor((Date.now() - s.joinedAt) / 60000),
        struggleIndicators: s.status === 'struggling' ? 2 : 0
      }
    })
  }, [students])

  // Create command palette actions
  const commandActions: CommandAction[] = useMemo(() => {
    if (!isTutor) return []
    
    return createClassroomActions({
      isAudioEnabled,
      isVideoEnabled,
      isScreenSharing,
      isRecording: false,
      studentsRaisingHands: 0,
      onToggleAudio: () => {
        toggleAudio()
        toast.success(isAudioEnabled ? 'Microphone muted' : 'Microphone unmuted')
      },
      onToggleVideo: () => {
        toggleVideo()
        toast.success(isVideoEnabled ? 'Video stopped' : 'Video started')
      },
      onToggleScreenShare: () => {
        if (isScreenSharing) {
          stopScreenShare()
        } else {
          startScreenShare()
        }
      },
      onToggleRecording: () => {
        toast.info('Recording feature coming soon')
      },
      onMuteAll: () => {
        toast.success('All students muted')
      },
      onCallAttention: () => {
        sendBroadcast('👋 Please pay attention to the main screen')
        toast.success('Attention request sent')
      },
      onOpenWhiteboard: () => {
        setActiveTab('classroom')
        toast.success('Whiteboard focused')
      },
      onOpenPolls: () => {
        setShowPollsPanel(true)
      },
      onOpenBreakouts: () => {
        setActiveTab('breakouts')
      },
      onOpenEngagement: () => {
        setShowEngagementPanel(true)
      },
      onSendBroadcast: () => {
        // Focus broadcast input
        toast.info('Click the broadcast input at the bottom')
      },
      onLeaveClass: () => {
        leaveVideo()
        router.push(isTutor ? '/tutor/dashboard' : '/student/dashboard')
      }
    })
  }, [isTutor, isAudioEnabled, isVideoEnabled, isScreenSharing, toggleAudio, toggleVideo, startScreenShare, stopScreenShare, sendBroadcast, leaveVideo, router])

  // Fetch room data and join
  useEffect(() => {
    if (!roomId || !session?.user?.id) return

    const joinRoom = async () => {
      try {
        const res = await fetch('/api/class/join', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sessionId: roomId,
            userId: session.user.id
          })
        })

        if (res.ok) {
          const data = await res.json()
          setRoomData({
            url: data.room.url,
            token: data.token
          })
          await joinVideo(data.room.url, data.token)
        } else {
          toast.error('Failed to join room')
        }
      } catch (error) {
        console.error('Join error:', error)
        toast.error('Error joining room')
      }
    }

    joinRoom()

    return () => {
      leaveVideo()
    }
  }, [roomId, session?.user?.id])

  // Send periodic activity pings
  useEffect(() => {
    if (!isSocketConnected) return

    const interval = setInterval(() => {
      sendActivityPing({
        activity: activeTab === 'classroom' ? 'in_classroom' : 'managing_breakouts',
        engagement: 80,
        understanding: 75
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [isSocketConnected, activeTab, sendActivityPing])

  // Handle chat messages
  const handleSendMessage = useCallback(async (content: string) => {
    const message: ChatMessage = {
      id: Date.now().toString(),
      userId: session?.user?.id || '',
      name: session?.user?.name || 'Unknown',
      text: content,
      timestamp: Date.now()
    }

    sendChatMessage(content)
    setChatMessages(prev => [...prev, message])
  }, [session, sendChatMessage])

  // Handle broadcast from tutor
  const handleBroadcast = useCallback((message: string) => {
    sendBroadcast(message)
    toast.success('Broadcast sent to all students')
  }, [sendBroadcast])

  // Handle push hint to student
  const handlePushHint = useCallback(async (studentId: string, hint: string) => {
    pushHint(studentId, hint, 'socratic')
    toast.success('Hint pushed to student')
  }, [pushHint])

  // Handle breakout room creation
  const handleInviteBreakout = useCallback(async (studentId: string) => {
    try {
      const res = await fetch('/api/class/breakout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          parentSessionId: roomId,
          studentId,
          durationMinutes: 30
        })
      })

      if (res.ok) {
        const data = await res.json()
        inviteToBreakout(studentId, data.breakoutRoom.id)
        toast.success('Breakout room created and student invited')
      } else {
        toast.error('Failed to create breakout room')
      }
    } catch (error) {
      console.error('Breakout error:', error)
      toast.error('Failed to create breakout room')
    }
  }, [roomId, inviteToBreakout])

  // Handle breakout room broadcast
  const handleBreakoutBroadcast = useCallback((message: string) => {
    sendBreakoutBroadcast(message)
    toast.success('Broadcast sent to all breakout rooms')
  }, [sendBreakoutBroadcast])

  // Handle close breakout room
  const handleCloseBreakout = useCallback((breakoutRoomId: string) => {
    closeBreakoutRoom(breakoutRoomId)
    toast.success('Breakout room closed')
  }, [closeBreakoutRoom])

  // Handle extend breakout time
  const handleExtendBreakout = useCallback((breakoutRoomId: string, minutes: number) => {
    extendBreakoutTime(breakoutRoomId, minutes)
    toast.success(`Breakout room time extended by ${minutes} minutes`)
  }, [extendBreakoutTime])

  // Handle join breakout room (for tutor)
  const handleJoinBreakout = useCallback((breakoutRoomId: string) => {
    toast.info('Joining breakout room...')
  }, [])

  // Handle create breakout rooms
  const handleCreateBreakoutRooms = useCallback((config: {
    roomCount: number
    participantsPerRoom: number
    distributionMode: 'random' | 'skill_based' | 'manual' | 'self_select' | 'social'
    timeLimit: number
    aiAssistantEnabled: boolean
    suggestedGroups?: SmartGroupingSuggestion
  }) => {
    toast.info(`Creating ${config.roomCount} breakout rooms...`)
    // In a real implementation, this would create the rooms via API
  }, [])

  // Handle close all breakout rooms
  const handleCloseAllBreakouts = useCallback(() => {
    breakoutRooms.forEach(room => closeBreakoutRoom(room.id))
    toast.success('All breakout rooms closed')
  }, [breakoutRooms, closeBreakoutRoom])

  // Handle assign task to room
  const handleAssignTask = useCallback((roomId: string, task: { title: string; description: string; type: string }) => {
    toast.success(`Task "${task.title}" assigned to room ${roomId}`)
  }, [])

  // Whiteboard page management
  const handleAddPage = useCallback(() => {
    const newPage = {
      id: `page-${whiteboardPages.length + 1}`,
      name: `Page ${whiteboardPages.length + 1}`,
      strokes: [],
      texts: [],
      shapes: [],
      backgroundColor: '#ffffff',
      backgroundStyle: 'solid' as const
    }
    setWhiteboardPages(prev => [...prev, newPage])
    setCurrentPageIndex(whiteboardPages.length)
  }, [whiteboardPages.length])

  const handleDeletePage = useCallback((index: number) => {
    if (whiteboardPages.length <= 1) return
    setWhiteboardPages(prev => prev.filter((_, i) => i !== index))
    setCurrentPageIndex(prev => Math.min(prev, whiteboardPages.length - 2))
  }, [whiteboardPages.length])

  // Handle student joining breakout room
  const joinBreakoutRoom = useCallback(async (breakoutRoomId: string) => {
    try {
      const res = await fetch(`/api/class/breakout/${breakoutRoomId}/join`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: session?.user?.id
        })
      })

      if (res.ok) {
        const data = await res.json()
        setCurrentBreakoutRoom(data.room)
        setBreakoutMessages([])
        await joinVideo(data.room.url, data.token)
        toast.success('Joined breakout room')
      }
    } catch (error) {
      toast.error('Failed to join breakout room')
    }
  }, [session?.user?.id, joinVideo])

  // Handle breakout room chat message
  const handleBreakoutSendMessage = useCallback((content: string) => {
    if (!currentBreakoutRoom) return

    sendBreakoutMessage?.(currentBreakoutRoom.id, content)

    setBreakoutMessages(prev => [...prev, {
      id: Date.now().toString(),
      senderId: session?.user?.id || '',
      senderName: session?.user?.name || 'You',
      content,
      timestamp: new Date(),
      isAi: false
    }])
  }, [currentBreakoutRoom, sendBreakoutMessage, session?.user?.id, session?.user?.name])

  // Handle help request in breakout room
  const handleRequestHelp = useCallback(() => {
    if (!currentBreakoutRoom) return

    requestHelp?.(currentBreakoutRoom.id, 'Student requested help in breakout room')
    toast.info('Help request sent to tutor')
  }, [currentBreakoutRoom, requestHelp])

  // Handle returning to main room
  const handleReturnToMain = useCallback(async () => {
    if (!roomData) return
    setCurrentBreakoutRoom(null)
    await joinVideo(roomData.url, roomData.token)
    toast.success('Returned to classroom')
  }, [roomData, joinVideo])

  // Poll management
  const handleCreatePoll = useCallback((pollData: Omit<Poll, 'id' | 'responses' | 'createdAt' | 'status'>) => {
    const newPoll: Poll = {
      ...pollData,
      id: `poll-${Date.now()}`,
      responses: [],
      createdAt: new Date(),
      status: 'draft'
    }
    setPolls(prev => [...prev, newPoll])
    toast.success('Poll created successfully')
  }, [])

  const handleStartPoll = useCallback((pollId: string) => {
    setPolls(prev => prev.map(p => 
      p.id === pollId ? { ...p, status: 'active' } : p
    ))
    toast.success('Poll started! Students can now respond.')
  }, [])

  const handleEndPoll = useCallback((pollId: string) => {
    setPolls(prev => prev.map(p => 
      p.id === pollId ? { ...p, status: 'closed', endedAt: new Date() } : p
    ))
    toast.success('Poll ended. Results available in the panel.')
  }, [])

  const handleDeletePoll = useCallback((pollId: string) => {
    setPolls(prev => prev.filter(p => p.id !== pollId))
    toast.success('Poll deleted')
  }, [])

  // Check if using mock video mode
  const isMockVideo = roomData?.url?.includes('mock.daily.co')

  // Video component for overlay
  const videoComponent = isMockVideo ? (
    <div className="flex items-center justify-center h-full bg-slate-800 text-white p-4">
      <div className="text-center">
        <div className="text-6xl mb-4">🎥</div>
        <p className="font-semibold">Video Call (Mock Mode)</p>
        <p className="text-sm text-slate-400 mt-2">Daily.co not configured</p>
        <p className="text-xs text-slate-500 mt-1">Video is simulated for testing</p>
      </div>
    </div>
  ) : (
    <VideoContainer
      participants={videoParticipants}
      isAudioEnabled={isAudioEnabled}
      isVideoEnabled={isVideoEnabled}
      isScreenSharing={isScreenSharing}
    />
  )

  // Active breakout room alerts count
  const alertCount = breakoutRooms.reduce(
    (count, room) => count + (room.alerts?.length || 0),
    0
  )

  return (
    <div className={`flex flex-col bg-slate-900 ${embedded ? 'h-full' : 'h-screen'}`}>
      {/* Session Timer - Only for tutors */}
      {isTutor && showSessionTimer && (
        <SessionTimer
          agenda={agenda}
          totalSessionDuration={60}
          onAgendaChange={setAgenda}
          onPhaseComplete={(phaseId) => {
            toast.success(`Phase completed!`)
          }}
          onTimeWarning={(message) => {
            toast.warning(message)
          }}
        />
      )}

      {/* Header */}
      <header className="bg-slate-800 border-b border-slate-700 px-4 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <Link
            href={isTutor ? '/tutor/dashboard' : '/student/dashboard'}
            className="flex items-center gap-1.5 text-slate-300 hover:text-white text-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to dashboard
          </Link>
          <h1 className="text-white font-semibold">
            {isTutor ? 'Class' : 'Live Class'}
          </h1>
          {currentBreakoutRoom && (
            <Badge variant="default" className="bg-purple-600">
              Breakout Room
            </Badge>
          )}
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isSocketConnected ? 'bg-green-500' : 'bg-red-500'}`} />
            <span className="text-slate-400 text-sm">
              {isSocketConnected ? 'Connected' : 'Disconnected'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Tools dropdown: Command, Engagement, Polls (ClassRoom.md: group header actions) */}
          {isTutor && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1 border-slate-500 bg-slate-700 text-white hover:bg-slate-600 hover:text-white focus-visible:ring-slate-500"
                >
                  <Wrench className="h-4 w-4" />
                  <span className="hidden sm:inline">Tools</span>
                  <ChevronRight className="h-3 w-3 opacity-80 rotate-90" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="bg-slate-800 border-slate-600">
                <DropdownMenuItem
                  onClick={() => setCommandPaletteOpen(true)}
                  className="text-slate-200 focus:bg-slate-700 focus:text-white"
                >
                  <Command className="h-4 w-4 mr-2" />
                  Command <kbd className="ml-1 text-[10px] bg-slate-700 px-1 rounded">⌘K</kbd>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setShowEngagementPanel((v) => !v)}
                  className="text-slate-200 focus:bg-slate-700 focus:text-white"
                >
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Engagement {showEngagementPanel && '✓'}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setShowPollsPanel((v) => !v)}
                  className="text-slate-200 focus:bg-slate-700 focus:text-white"
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Polls {polls.filter(p => p.status === 'active').length > 0 && `(${polls.filter(p => p.status === 'active').length})`}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {currentBreakoutRoom && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleReturnToMain}
              className="text-purple-400 border-purple-400 hover:bg-purple-400/10"
            >
              Return to Classroom
            </Button>
          )}
          <Button
            variant={isAudioEnabled ? 'default' : 'outline'}
            size="sm"
            onClick={toggleAudio}
          >
            {isAudioEnabled ? 'Mute' : 'Unmute'}
          </Button>
          <Button
            variant={isVideoEnabled ? 'default' : 'outline'}
            size="sm"
            onClick={toggleVideo}
          >
            {isVideoEnabled ? 'Stop Video' : 'Start Video'}
          </Button>
          <Button
            variant={isScreenSharing ? 'default' : 'outline'}
            size="sm"
            onClick={isScreenSharing ? stopScreenShare : startScreenShare}
          >
            {isScreenSharing ? 'Stop Sharing' : 'Share Screen'}
          </Button>

          {/* Leave: separate critical action with confirmation (ClassRoom.md recommendation) */}
          <Button
            variant="destructive"
            size="sm"
            onClick={() => setShowLeaveConfirm(true)}
            className="ml-2"
          >
            <LogOut className="h-4 w-4 sm:mr-1" />
            <span className="hidden sm:inline">Leave</span>
          </Button>

          {isTutor && (
            <Button
              variant={showAssetsPanel ? 'default' : 'secondary'}
              size="sm"
              onClick={() => setShowAssetsPanel(!showAssetsPanel)}
              className="ml-2"
            >
              {showAssetsPanel ? 'Close Assets' : 'Open Assets'}
            </Button>
          )}
        </div>
      </header>

      {/* Leave / End session confirmation dialog */}
      <Dialog open={showLeaveConfirm} onOpenChange={setShowLeaveConfirm}>
        <DialogContent className="bg-slate-800 border-slate-700">
          <DialogHeader>
            <DialogTitle className="text-white">Leave class?</DialogTitle>
            <DialogDescription className="text-slate-400">
              You will leave the video call and return to the dashboard. Students will remain in the session.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setShowLeaveConfirm(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                setShowLeaveConfirm(false)
                leaveVideo()
              }}
            >
              Leave
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left/Center Content */}
        <div className="flex-1 flex overflow-hidden">
          {isTutor ? (
            // Tutor View with Tabs
            <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
              <div className="bg-slate-800 border-b border-slate-700 px-4 shrink-0">
                <TabsList className="bg-slate-700">
                  <TabsTrigger value="classroom" className="data-[state=active]:bg-slate-600">
                    Classroom
                  </TabsTrigger>
                  <TabsTrigger value="coursedev" className="data-[state=active]:bg-slate-600">
                    Course Dev
                  </TabsTrigger>
                  <TabsTrigger value="breakouts" className="data-[state=active]:bg-slate-600 relative">
                    Breakout Rooms
                    {(breakoutRooms.length > 0 || alertCount > 0) && (
                      <span className="ml-2 flex items-center gap-1">
                        {breakoutRooms.length > 0 && (
                          <span className="bg-blue-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                            {breakoutRooms.length}
                          </span>
                        )}
                        {alertCount > 0 && (
                          <span className="bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                            {alertCount}
                          </span>
                        )}
                      </span>
                    )}
                  </TabsTrigger>
                  <TabsTrigger value="aiassistant" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600 relative">
                    <Sparkles className="w-4 h-4 mr-1" />
                    AI Assistant
                  </TabsTrigger>
                </TabsList>
              </div>

              {/* Tab Content Container */}
              <div className="flex-1 relative min-h-0">
                {/* Classroom Tab - Live view with optional Assets panel */}
                <TabsContent
                  value="classroom"
                  className="absolute inset-0 flex m-0 p-0 data-[state=inactive]:pointer-events-none"
                >
                  {/* Main Content Area */}
                  <div className="flex-1 flex overflow-hidden">
                    {showAssetsPanel ? (
                      <PanelGroup orientation="horizontal">
                        <Panel defaultSize={50} minSize={20}>
                          {/* Whiteboard with Video Overlay */}
                          <div className="h-full relative overflow-hidden">
                            <SimpleWhiteboard
                              onUpdate={(strokes) => sendWhiteboardUpdate(strokes)}
                              readOnly={false}
                              className="h-full"
                            />
                          </div>
                        </Panel>

                        <PanelResizeHandle className="w-2 bg-slate-800 hover:bg-blue-500/50 transition-colors cursor-col-resize flex items-center justify-center">
                          <MoreHorizontal className="h-4 w-4 text-slate-500 rotate-90" />
                        </PanelResizeHandle>

                        <Panel defaultSize={50} minSize={20}>
                          <div className="h-full flex flex-col bg-slate-800 border-l border-slate-700 relative">
                            <div className="absolute top-2 right-2 z-10">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setShowAssetsPanel(false)}
                                className="h-6 w-6 rounded-full bg-black/20 hover:bg-black/40 text-slate-400"
                              >
                                <span className="sr-only">Close</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                              </Button>
                            </div>
                            <AssetsPanel
                              roomId={roomId}
                              students={students.map(s => ({
                                id: s.userId,
                                name: s.name,
                                status: s.status as any,
                                struggles: ['finding_roots']
                              }))}
                              onAssetSelect={(asset) => {
                                console.log('Selected asset:', asset)
                                toast.success(`Selected: ${asset.name}`)
                              }}
                            />
                          </div>
                        </Panel>
                      </PanelGroup>
                    ) : (
                      // Full width whiteboard when assets panel is closed
                      <div className="flex-1 relative overflow-hidden">
                        <SimpleWhiteboard
                          onUpdate={(strokes) => sendWhiteboardUpdate(strokes)}
                          readOnly={false}
                          className="h-full"
                        />
                      </div>
                    )}
                  </div>
                </TabsContent>

                {/* Course Dev Tab - Simplified */}
                <TabsContent
                  value="coursedev"
                  className="absolute inset-0 flex m-0 p-0 data-[state=inactive]:pointer-events-none"
                >
                  <CourseDevPanel
                    roomId={roomId}
                    students={students.map(s => ({
                      id: s.userId,
                      name: s.name,
                      userId: s.userId,
                      status: s.status
                    }))}
                  />
                </TabsContent>

                <TabsContent
                  value="breakouts"
                  className="absolute inset-0 flex m-0 p-0 data-[state=inactive]:pointer-events-none"
                >
                  <BreakoutControlPanel
                    mainRoomId={roomId}
                    students={students.map(s => ({ id: s.userId, name: s.name, userId: s.userId }))}
                    breakoutRooms={breakoutRooms.map(r => {
                      // Convert socket BreakoutRoom to UI BreakoutRoom format
                      const uiRoom: BreakoutRoomUI = {
                        id: r.id,
                        name: r.name,
                        participants: Array.from(r.participants.values()).map(p => ({
                          id: p.id,
                          name: p.name,
                          joinedAt: new Date(p.joinedAt),
                          engagementScore: p.engagementScore
                        })),
                        status: r.status,
                        aiEnabled: r.aiEnabled,
                        timeRemaining: r.timeRemaining,
                        assignedTask: r.task,
                        alerts: r.alerts.map(a => ({
                          type: a.type,
                          message: a.message,
                          timestamp: new Date(a.timestamp),
                          severity: a.severity
                        })),
                        metrics: r.metrics
                      }
                      return uiRoom
                    })}
                    onCreateRooms={handleCreateBreakoutRooms}
                    onCloseRooms={handleCloseAllBreakouts}
                    onBroadcast={(message, target, roomIds) => {
                      if (target === 'all') {
                        handleBreakoutBroadcast(message)
                      } else {
                        roomIds?.forEach(roomId => {
                          console.log(`Broadcast to ${roomId}: ${message}`)
                        })
                      }
                    }}
                    onJoinRoom={handleJoinBreakout}
                    onAssignTask={handleAssignTask}
                    onExtendTime={handleExtendBreakout}
                    isCreating={false}
                  />
                </TabsContent>

                {/* AI Assistant Tab */}
                <TabsContent
                  value="aiassistant"
                  className="absolute inset-0 flex m-0 p-0 data-[state=inactive]:pointer-events-none overflow-auto"
                >
                  <div className="flex-1 p-6 bg-slate-900">
                    <AITeachingAssistant 
                      students={students.map(s => ({
                        id: s.userId,
                        name: s.name,
                        status: s.status === 'active' ? 'online' : s.status === 'idle' ? 'idle' : 'offline',
                        engagementScore: s.engagementScore || 70,
                        handRaised: s.handRaised || false,
                        attentionLevel: s.engagementScore > 80 ? 'high' : s.engagementScore > 50 ? 'medium' : 'low',
                        lastActive: new Date().toISOString(),
                        joinedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
                        reactions: 0,
                        chatMessages: 0
                      }))}
                      metrics={{
                        totalStudents: students.length,
                        activeStudents: students.filter(s => s.status === 'active').length,
                        averageEngagement: Math.round(students.reduce((sum, s) => sum + (s.engagementScore || 70), 0) / Math.max(1, students.length)),
                        participationRate: Math.round((students.filter(s => s.chatMessages > 0).length / Math.max(1, students.length)) * 100),
                        totalChatMessages: chatMessages.length,
                        classDuration: Math.floor((Date.now() - classStartTime.getTime()) / 1000 / 60),
                        classStartTime: classStartTime.toISOString(),
                        veryEngaged: students.filter(s => (s.engagementScore || 70) >= 85).length,
                        engaged: students.filter(s => (s.engagementScore || 70) >= 60 && (s.engagementScore || 70) < 85).length,
                        passive: students.filter(s => (s.engagementScore || 70) >= 30 && (s.engagementScore || 70) < 60).length,
                        disengaged: students.filter(s => (s.engagementScore || 70) < 30).length,
                        engagementTrend: 'up'
                      }}
                      currentTopic={agenda.find(a => a.status === 'active')?.title || 'Live Class Session'}
                      classDuration={Math.floor((Date.now() - classStartTime.getTime()) / 1000 / 60)}
                    />
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          ) : currentBreakoutRoom ? (
            // Student in Breakout Room
            <BreakoutRoomView
              roomId={currentBreakoutRoom.id}
              roomName={currentBreakoutRoom.name || `Breakout Room ${currentBreakoutRoom.id.slice(-6)}`}
              participants={Array.from(currentBreakoutRoom.participants?.values() || []).map(p => ({
                id: p.id,
                name: p.name,
                isTutor: false
              }))}
              timeRemaining={currentBreakoutRoom.timeLimit}
              aiEnabled={currentBreakoutRoom.aiEnabled}
              onRequestHelp={handleRequestHelp}
              onSendMessage={handleBreakoutSendMessage}
              onLeave={handleReturnToMain}
              messages={breakoutMessages}
              assignedTask={currentBreakoutRoom.task?.description}
            />
          ) : (
            // Student in Main Room
            <PanelGroup orientation="horizontal">
              <Panel defaultSize={75} minSize={20}>
                {/* Whiteboard - Simple Version */}
                <div className="h-full relative overflow-hidden">
                  <SimpleWhiteboard
                    onUpdate={(strokes) => sendWhiteboardUpdate(strokes)}
                    readOnly={false}
                    className="h-full"
                  />
                </div>
              </Panel>

              <PanelResizeHandle className="w-2 bg-slate-800 hover:bg-purple-500/50 transition-colors cursor-col-resize flex items-center justify-center group">
                <MoreHorizontal className="h-4 w-4 text-slate-500 rotate-90 group-hover:text-purple-300" />
              </PanelResizeHandle>

              <Panel defaultSize={25} minSize={15}>
                {/* Right Panel - Chat */}
                <div className="h-full bg-slate-800 border-l border-slate-700 flex flex-col">
                  <ChatPanel
                    messages={chatMessages}
                    onSendMessage={handleSendMessage}
                    currentUserId={session?.user?.id || ''}
                  />
                </div>
              </Panel>
            </PanelGroup>
          )}
        </div>

        {/* Right Side Panels - Only for Tutors */}
        {isTutor && (
          <>
            {/* Engagement Dashboard Panel */}
            {showEngagementPanel && (
              <EngagementDashboard
                students={engagementMetrics}
                isOpen={showEngagementPanel}
                onToggle={() => setShowEngagementPanel(false)}
                onSelectStudent={(studentId) => {
                  toast.info(`Viewing details for student: ${studentId}`)
                }}
                onSendNudge={(studentId) => {
                  const student = students.find(s => s.userId === studentId)
                  if (student) {
                    pushHint(studentId, 'Remember to ask questions if you need help!', 'encouragement')
                    toast.success(`Nudge sent to ${student.name}`)
                  }
                }}
                onInviteToBreakout={(studentId) => {
                  handleInviteBreakout(studentId)
                }}
              />
            )}

            {/* Quick Polls Panel */}
            {showPollsPanel && (
              <QuickPoll
                polls={polls}
                onCreatePoll={handleCreatePoll}
                onStartPoll={handleStartPoll}
                onEndPoll={handleEndPoll}
                onDeletePoll={handleDeletePoll}
                studentCount={students.length}
              />
            )}
          </>
        )}
      </div>

      {/* Tutor Controls - only in Classroom */}
      {isTutor && activeTab === 'classroom' && (
        <TutorControls
          studentCount={students.length}
          strugglingCount={students.filter(s => s.status === 'struggling').length}
          onBroadcast={handleBroadcast}
          pages={whiteboardPages.map(p => ({ id: p.id, name: p.name }))}
          currentPageIndex={currentPageIndex}
          onPageChange={setCurrentPageIndex}
          onAddPage={handleAddPage}
          onDeletePage={handleDeletePage}
        />
      )}

      {/* Command Palette */}
      {isTutor && (
        <CommandPalette
          isOpen={isCommandPaletteOpen}
          onClose={() => setCommandPaletteOpen(false)}
          actions={commandActions}
        />
      )}
    </div>
  )
}
