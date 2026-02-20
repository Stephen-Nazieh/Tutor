'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { Slider } from '@/components/ui/slider'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'
import { useDailyCall } from '@/hooks/use-daily-call'
import { dailyProvider } from '@/lib/video/daily-provider'
import { ChatPanel } from './ChatPanel'
import { ParticipantsPanel } from './ParticipantsPanel'
import { WhiteboardPanel } from './WhiteboardPanel'
import { ScreenShareView } from './ScreenShareView'
import { RecordingIndicator } from './RecordingIndicator'
import { ReactionsOverlay } from './ReactionsOverlay'
import { PollCreator } from './PollCreator'
import { BreakoutRoomControl } from './BreakoutRoomControl'
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  MonitorUp,
  MonitorOff,
  PhoneOff,
  MessageSquare,
  Users,
  Palette,
  MoreHorizontal,
  Settings,
  Radio,
  Pause,
  Play,
  Hand,
  Smile,
  BarChart3,
  LayoutGrid,
  Pin,
  PinOff,
  Maximize2,
  Minimize2,
  Volume2,
  VolumeX,
  ChevronRight,
  ChevronLeft,
  Sparkles
} from 'lucide-react'

interface VideoClassroomProps {
  sessionId: string
  roomUrl: string
  roomToken?: string
  sessionTitle?: string
}

interface Participant {
  id: string
  userId: string
  name: string
  isScreenSharing: boolean
  isAudioEnabled: boolean
  isVideoEnabled: boolean
  isLocal: boolean
  avatar?: string
  isHandRaised?: boolean
  isPinned?: boolean
  reaction?: string
}

interface Reaction {
  id: string
  emoji: string
  participantId: string
  timestamp: number
}

const REACTIONS = ['👍', '👏', '❤️', '😂', '😮', '🎉', '✋', '💡']

export function VideoClassroom({ sessionId, roomUrl, roomToken, sessionTitle = 'Live Class' }: VideoClassroomProps) {
  const router = useRouter()
  const videoContainerRef = useRef<HTMLDivElement>(null)
  
  // Video call hook
  const {
    call,
    isJoined,
    isAudioEnabled,
    isVideoEnabled,
    isScreenSharing,
    participants,
    join,
    leave,
    toggleAudio,
    toggleVideo,
    startScreenShare,
    stopScreenShare,
    startRecording,
    stopRecording
  } = useDailyCall({
    onRecordingStarted: () => toast.success('Recording started'),
    onRecordingStopped: () => toast.success('Recording stopped')
  })

  // Local state
  const [isRecording, setIsRecording] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [recordingDuration, setRecordingDuration] = useState(0)
  const [showChat, setShowChat] = useState(true)
  const [showParticipants, setShowParticipants] = useState(false)
  const [showWhiteboard, setShowWhiteboard] = useState(false)
  const [showScreenShare, setShowScreenShare] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [showPollCreator, setShowPollCreator] = useState(false)
  const [showBreakoutControl, setShowBreakoutControl] = useState(false)
  const [showEndDialog, setShowEndDialog] = useState(false)
  const [showReactions, setShowReactions] = useState(false)
  const [activeReactions, setActiveReactions] = useState<Reaction[]>([])
  const [layout, setLayout] = useState<'grid' | 'spotlight' | 'sidebar'>('grid')
  const [pinnedParticipant, setPinnedParticipant] = useState<string | null>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [chatUnreadCount, setChatUnreadCount] = useState(0)
  const [handRaisedUsers, setHandRaisedUsers] = useState<Set<string>>(new Set())
  
  // Video quality settings
  const [videoQuality, setVideoQuality] = useState<'low' | 'medium' | 'high'>('high')
  const [isLowBandwidth, setIsLowBandwidth] = useState(false)

  // Join the call on mount
  useEffect(() => {
    if (roomUrl && !isJoined) {
      join(roomUrl, roomToken)
    }
    
    return () => {
      if (isJoined) {
        leave()
      }
    }
  }, [roomUrl, roomToken, isJoined, join, leave])

  // Recording duration timer
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isRecording && !isPaused) {
      interval = setInterval(() => {
        setRecordingDuration(prev => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isRecording, isPaused])

  // Handle reactions
  const handleReaction = useCallback((emoji: string) => {
    const newReaction: Reaction = {
      id: `react-${Date.now()}`,
      emoji,
      participantId: 'local',
      timestamp: Date.now()
    }
    setActiveReactions(prev => [...prev, newReaction])
    setShowReactions(false)
    
    // Clear reaction after 3 seconds
    setTimeout(() => {
      setActiveReactions(prev => prev.filter(r => r.id !== newReaction.id))
    }, 3000)
  }, [])

  // Toggle recording
  const handleToggleRecording = useCallback(() => {
    if (isRecording) {
      stopRecording()
      setIsRecording(false)
      setIsPaused(false)
    } else {
      startRecording()
      setIsRecording(true)
      setRecordingDuration(0)
    }
  }, [isRecording, startRecording, stopRecording])

  // Toggle pause recording
  const handleTogglePause = useCallback(() => {
    setIsPaused(!isPaused)
    toast.info(isPaused ? 'Recording resumed' : 'Recording paused')
  }, [isPaused])

  // Toggle hand raise
  const handleToggleHand = useCallback(() => {
    setHandRaisedUsers(prev => {
      const newSet = new Set(prev)
      if (newSet.has('local')) {
        newSet.delete('local')
        toast.info('Hand lowered')
      } else {
        newSet.add('local')
        toast.success('Hand raised')
      }
      return newSet
    })
  }, [])

  // Toggle fullscreen
  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      videoContainerRef.current?.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }, [])

  // End class
  const handleEndClass = useCallback(() => {
    if (isRecording) {
      stopRecording()
    }
    leave()
    router.push('/tutor/dashboard')
  }, [isRecording, leave, router, stopRecording])

  // Format recording duration
  const formatDuration = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    if (hrs > 0) {
      return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  // Get active participants
  const activeParticipants = participants.filter(p => p.isScreenSharing || pinnedParticipant === p.userId)
  const mainParticipant = activeParticipants[0] || participants[0]
  const otherParticipants = participants.filter(p => p.userId !== mainParticipant?.userId)

  // Grid layout calculations
  const getGridCols = () => {
    const count = participants.length
    if (count <= 1) return 'grid-cols-1'
    if (count <= 4) return 'grid-cols-2'
    if (count <= 9) return 'grid-cols-3'
    return 'grid-cols-4'
  }

  return (
    <TooltipProvider>
      <div 
        ref={videoContainerRef}
        className="h-screen flex flex-col bg-gray-900 overflow-hidden"
      >
        {/* Header */}
        <header className="bg-gray-800 border-b border-gray-700 px-4 py-2 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
              <span className="text-white font-medium">LIVE</span>
            </div>
            <div className="h-6 w-px bg-gray-600" />
            <div>
              <h1 className="text-white font-medium">{sessionTitle}</h1>
              <p className="text-gray-400 text-xs">Session ID: {sessionId}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Recording Indicator */}
            {isRecording && (
              <RecordingIndicator 
                duration={recordingDuration} 
                isPaused={isPaused}
                onPause={handleTogglePause}
                onStop={handleToggleRecording}
              />
            )}

            {/* Layout Switcher */}
            <div className="flex items-center bg-gray-700 rounded-lg p-1">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={layout === 'grid' ? 'secondary' : 'ghost'}
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setLayout('grid')}
                  >
                    <LayoutGrid className="w-4 h-4 text-white" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Grid View</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={layout === 'spotlight' ? 'secondary' : 'ghost'}
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setLayout('spotlight')}
                  >
                    <Pin className="w-4 h-4 text-white" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Spotlight View</TooltipContent>
              </Tooltip>
            </div>

            {/* Quality Indicator */}
            {isLowBandwidth && (
              <Badge variant="destructive" className="gap-1">
                Low Bandwidth
              </Badge>
            )}

            {/* Participant Count */}
            <Badge variant="secondary" className="gap-1 bg-gray-700 text-white border-gray-600">
              <Users className="w-3 h-3" />
              {participants.length}
            </Badge>

            {/* Hand Raised Count */}
            {handRaisedUsers.size > 0 && (
              <Badge variant="default" className="gap-1 bg-yellow-600">
                <Hand className="w-3 h-3" />
                {handRaisedUsers.size}
              </Badge>
            )}
          </div>
        </header>

        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Video Area */}
          <div className="flex-1 relative">
            {/* Video Grid */}
            <div className={cn(
              "h-full p-4 gap-4",
              layout === 'grid' && `grid ${getGridCols()} auto-rows-fr`,
              layout === 'spotlight' && 'flex flex-col',
              layout === 'sidebar' && 'flex'
            )}>
              {participants.map((participant, index) => (
                <div
                  key={participant.id}
                  className={cn(
                    "relative rounded-lg overflow-hidden bg-gray-800",
                    layout === 'spotlight' && index === 0 && "flex-[2]",
                    layout === 'spotlight' && index > 0 && "flex-1",
                    layout === 'sidebar' && index === 0 && "flex-1",
                    layout === 'sidebar' && index > 0 && "w-48",
                    pinnedParticipant === participant.userId && "ring-2 ring-blue-500"
                  )}
                >
                  {/* Video Placeholder */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    {participant.isVideoEnabled ? (
                      <div className="w-full h-full bg-gray-700 flex items-center justify-center text-gray-500">
                        Video Feed
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
                          {participant.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="text-white font-medium">{participant.name}</span>
                      </div>
                    )}
                  </div>

                  {/* Screen Share Indicator */}
                  {participant.isScreenSharing && (
                    <div className="absolute top-2 left-2 bg-green-600 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                      <MonitorUp className="w-3 h-3" />
                      Sharing
                    </div>
                  )}

                  {/* Hand Raised Indicator */}
                  {handRaisedUsers.has(participant.userId) && (
                    <div className="absolute top-2 right-2 bg-yellow-500 text-white p-1.5 rounded-full">
                      <Hand className="w-4 h-4" />
                    </div>
                  )}

                  {/* Reaction Overlay */}
                  {activeReactions
                    .filter(r => r.participantId === participant.userId)
                    .map(reaction => (
                      <div
                        key={reaction.id}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl animate-bounce"
                      >
                        {reaction.emoji}
                      </div>
                    ))
                  }

                  {/* Video Controls Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent opacity-0 hover:opacity-100 transition-opacity">
                    <div className="flex items-center justify-between">
                      <span className="text-white text-sm font-medium">
                        {participant.name} {participant.isLocal && '(You)'}
                      </span>
                      <div className="flex items-center gap-1">
                        {!participant.isAudioEnabled && (
                          <div className="p-1 bg-red-500 rounded">
                            <MicOff className="w-3 h-3 text-white" />
                          </div>
                        )}
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 text-white hover:bg-white/20"
                              onClick={() => setPinnedParticipant(
                                pinnedParticipant === participant.userId ? null : participant.userId
                              )}
                            >
                              {pinnedParticipant === participant.userId ? (
                                <PinOff className="w-3 h-3" />
                              ) : (
                                <Pin className="w-3 h-3" />
                              )}
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            {pinnedParticipant === participant.userId ? 'Unpin' : 'Pin'}
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Screen Share Overlay */}
            {showScreenShare && isScreenSharing && (
              <ScreenShareView onStop={stopScreenShare} />
            )}

            {/* Whiteboard Overlay */}
            {showWhiteboard && (
              <WhiteboardPanel onClose={() => setShowWhiteboard(false)} />
            )}

            {/* Reactions Overlay */}
            {showReactions && (
              <ReactionsOverlay
                reactions={REACTIONS}
                onSelect={handleReaction}
                onClose={() => setShowReactions(false)}
              />
            )}
          </div>

          {/* Side Panel */}
          {(showChat || showParticipants) && (
            <div className="w-[350px] bg-gray-800 border-l border-gray-700 flex flex-col">
              {/* Panel Tabs */}
              <div className="flex border-b border-gray-700">
                <button
                  className={cn(
                    "flex-1 py-3 text-sm font-medium text-white border-b-2 transition-colors",
                    showChat ? "border-blue-500" : "border-transparent hover:border-gray-600"
                  )}
                  onClick={() => { setShowChat(true); setShowParticipants(false); }}
                >
                  <div className="flex items-center justify-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    Chat
                    {chatUnreadCount > 0 && (
                      <Badge variant="destructive" className="text-xs">
                        {chatUnreadCount}
                      </Badge>
                    )}
                  </div>
                </button>
                <button
                  className={cn(
                    "flex-1 py-3 text-sm font-medium text-white border-b-2 transition-colors",
                    showParticipants ? "border-blue-500" : "border-transparent hover:border-gray-600"
                  )}
                  onClick={() => { setShowChat(false); setShowParticipants(true); }}
                >
                  <div className="flex items-center justify-center gap-2">
                    <Users className="w-4 h-4" />
                    People
                  </div>
                </button>
              </div>

              {/* Panel Content */}
              <div className="flex-1 overflow-hidden">
                {showChat && (
                  <ChatPanel 
                    onUnreadChange={setChatUnreadCount}
                    participants={participants}
                  />
                )}
                {showParticipants && (
                  <ParticipantsPanel 
                    participants={participants}
                    handRaisedUsers={handRaisedUsers}
                    onToggleHand={handleToggleHand}
                  />
                )}
              </div>
            </div>
          )}
        </div>

        {/* Control Bar */}
        <div className="bg-gray-800 border-t border-gray-700 px-4 py-3 flex items-center justify-between shrink-0">
          {/* Left - Info */}
          <div className="flex items-center gap-4">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-gray-700"
                  onClick={() => setShowParticipants(!showParticipants)}
                >
                  <ChevronRight className={cn("w-5 h-5 transition-transform", showParticipants && "rotate-180")} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Toggle Panel</TooltipContent>
            </Tooltip>

            <div className="text-gray-400 text-sm">
              {participants.length} participants
            </div>
          </div>

          {/* Center - Main Controls */}
          <div className="flex items-center gap-2">
            {/* Microphone */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={isAudioEnabled ? 'outline' : 'destructive'}
                  size="icon"
                  className={cn("h-12 w-12 rounded-full border-2", isAudioEnabled && "border-gray-600 bg-gray-700 hover:bg-gray-600")}
                  onClick={toggleAudio}
                >
                  {isAudioEnabled ? (
                    <Mic className="w-5 h-5 text-white" />
                  ) : (
                    <MicOff className="w-5 h-5 text-white" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>{isAudioEnabled ? 'Mute' : 'Unmute'}</TooltipContent>
            </Tooltip>

            {/* Video */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={isVideoEnabled ? 'outline' : 'destructive'}
                  size="icon"
                  className={cn("h-12 w-12 rounded-full border-2", isVideoEnabled && "border-gray-600 bg-gray-700 hover:bg-gray-600")}
                  onClick={toggleVideo}
                >
                  {isVideoEnabled ? (
                    <Video className="w-5 h-5 text-white" />
                  ) : (
                    <VideoOff className="w-5 h-5 text-white" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>{isVideoEnabled ? 'Stop Video' : 'Start Video'}</TooltipContent>
            </Tooltip>

            {/* Reactions */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-12 w-12 rounded-full border-2 border-gray-600 bg-gray-700 hover:bg-gray-600"
                  onClick={() => setShowReactions(!showReactions)}
                >
                  <Smile className="w-5 h-5 text-white" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Reactions</TooltipContent>
            </Tooltip>

            {/* Hand Raise */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={handRaisedUsers.has('local') ? 'default' : 'outline'}
                  size="icon"
                  className={cn(
                    "h-12 w-12 rounded-full border-2",
                    handRaisedUsers.has('local') 
                      ? "bg-yellow-600 border-yellow-600 hover:bg-yellow-700" 
                      : "border-gray-600 bg-gray-700 hover:bg-gray-600"
                  )}
                  onClick={handleToggleHand}
                >
                  <Hand className="w-5 h-5 text-white" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>{handRaisedUsers.has('local') ? 'Lower Hand' : 'Raise Hand'}</TooltipContent>
            </Tooltip>

            {/* Screen Share */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={isScreenSharing ? 'default' : 'outline'}
                  size="icon"
                  className={cn(
                    "h-12 w-12 rounded-full border-2",
                    isScreenSharing 
                      ? "bg-green-600 border-green-600 hover:bg-green-700" 
                      : "border-gray-600 bg-gray-700 hover:bg-gray-600"
                  )}
                  onClick={isScreenSharing ? stopScreenShare : startScreenShare}
                >
                  {isScreenSharing ? (
                    <MonitorOff className="w-5 h-5 text-white" />
                  ) : (
                    <MonitorUp className="w-5 h-5 text-white" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>{isScreenSharing ? 'Stop Sharing' : 'Share Screen'}</TooltipContent>
            </Tooltip>

            {/* Recording */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={isRecording ? 'destructive' : 'outline'}
                  size="icon"
                  className={cn(
                    "h-12 w-12 rounded-full border-2",
                    !isRecording && "border-gray-600 bg-gray-700 hover:bg-gray-600"
                  )}
                  onClick={handleToggleRecording}
                >
                  <Radio className={cn("w-5 h-5", isRecording ? "text-white animate-pulse" : "text-white")} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>{isRecording ? 'Stop Recording' : 'Start Recording'}</TooltipContent>
            </Tooltip>

            {/* More Options */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-12 w-12 rounded-full border-2 border-gray-600 bg-gray-700 hover:bg-gray-600"
                  onClick={() => setShowSettings(true)}
                >
                  <MoreHorizontal className="w-5 h-5 text-white" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>More Options</TooltipContent>
            </Tooltip>
          </div>

          {/* Right - End Call */}
          <div className="flex items-center gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="text-white border-gray-600 hover:bg-gray-700"
                  onClick={toggleFullscreen}
                >
                  {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>{isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}</TooltipContent>
            </Tooltip>

            <Button
              variant="destructive"
              className="gap-2 px-6 bg-red-600 hover:bg-red-700"
              onClick={() => setShowEndDialog(true)}
            >
              <PhoneOff className="w-5 h-5" />
              End
            </Button>
          </div>
        </div>

        {/* Settings Dialog */}
        <Dialog open={showSettings} onOpenChange={setShowSettings}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Classroom Settings
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-6 py-4">
              {/* Video Quality */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Video Quality</Label>
                <div className="flex gap-2">
                  {(['low', 'medium', 'high'] as const).map((quality) => (
                    <Button
                      key={quality}
                      variant={videoQuality === quality ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setVideoQuality(quality)}
                      className="flex-1 capitalize"
                    >
                      {quality}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Low Bandwidth Mode */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Low Bandwidth Mode</p>
                  <p className="text-sm text-gray-500">Reduce video quality on slow connections</p>
                </div>
                <Button
                  variant={isLowBandwidth ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setIsLowBandwidth(!isLowBandwidth)}
                >
                  {isLowBandwidth ? 'On' : 'Off'}
                </Button>
              </div>

              {/* Tools */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Tools</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" onClick={() => { setShowWhiteboard(true); setShowSettings(false); }}>
                    <Palette className="w-4 h-4 mr-2" />
                    Whiteboard
                  </Button>
                  <Button variant="outline" onClick={() => { setShowPollCreator(true); setShowSettings(false); }}>
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Create Poll
                  </Button>
                  <Button variant="outline" onClick={() => { setShowBreakoutControl(true); setShowSettings(false); }}>
                    <Users className="w-4 h-4 mr-2" />
                    Breakout Rooms
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* End Class Dialog */}
        <Dialog open={showEndDialog} onOpenChange={setShowEndDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>End Class Session?</DialogTitle>
              <DialogDescription>
                {isRecording 
                  ? 'You are currently recording. The recording will be saved.' 
                  : 'All participants will be disconnected.'}
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="gap-2">
              <Button variant="outline" onClick={() => setShowEndDialog(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleEndClass}>
                End Class
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Poll Creator Dialog */}
        <Dialog open={showPollCreator} onOpenChange={setShowPollCreator}>
          <DialogContent className="sm:max-w-lg">
            <PollCreator 
              onClose={() => setShowPollCreator(false)}
              participants={participants}
            />
          </DialogContent>
        </Dialog>

        {/* Breakout Rooms Dialog */}
        <Dialog open={showBreakoutControl} onOpenChange={setShowBreakoutControl}>
          <DialogContent className="sm:max-w-2xl">
            <BreakoutRoomControl 
              onClose={() => setShowBreakoutControl(false)}
              participants={participants}
            />
          </DialogContent>
        </Dialog>
      </div>
    </TooltipProvider>
  )
}

// Label component for settings
function Label({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <label className={cn("text-sm font-medium text-gray-700", className)}>
      {children}
    </label>
  )
}
