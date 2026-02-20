'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { StudentList } from './StudentList'
import { BreakoutRoomManager } from './BreakoutRoomManager'
import { HandRaiseQueue } from './HandRaiseQueue'
import { ChatMonitor } from './ChatMonitor'
import { LiveAnalytics } from './LiveAnalytics'
import { AITeachingAssistant } from './AITeachingAssistant'
import { StudentProgressPanel } from './StudentProgressPanel'
import type { LiveStudent, BreakoutRoom, HandRaise, ChatMessage, EngagementMetrics, Alert } from '../types'
import { 
  Users,
  LayoutGrid,
  BarChart3,
  PhoneOff,
  Mic,
  MicOff,
  Video,
  VideoOff,
  MonitorUp,
  Sparkles,
  Hand,
  ArrowLeft,
  TrendingUp
} from 'lucide-react'

interface LiveClassHubProps {
  sessionId: string
}

// Demo data generators
const generateDemoStudents = (): LiveStudent[] => [
  { id: '1', name: 'Alice Zhang', status: 'online', engagementScore: 92, handRaised: false, attentionLevel: 'high', lastActive: new Date().toISOString(), joinedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), reactions: 5, chatMessages: 3 },
  { id: '2', name: 'Bob Li', status: 'online', engagementScore: 78, handRaised: true, attentionLevel: 'medium', lastActive: new Date().toISOString(), joinedAt: new Date(Date.now() - 1000 * 60 * 25).toISOString(), reactions: 2, chatMessages: 1 },
  { id: '3', name: 'Carol Wang', status: 'online', engagementScore: 85, handRaised: false, attentionLevel: 'high', lastActive: new Date().toISOString(), joinedAt: new Date(Date.now() - 1000 * 60 * 28).toISOString(), reactions: 4, chatMessages: 2 },
  { id: '4', name: 'David Chen', status: 'idle', engagementScore: 45, handRaised: false, attentionLevel: 'low', lastActive: new Date(Date.now() - 1000 * 60 * 5).toISOString(), joinedAt: new Date(Date.now() - 1000 * 60 * 35).toISOString(), reactions: 0, chatMessages: 0 },
  { id: '5', name: 'Emma Liu', status: 'online', engagementScore: 88, handRaised: false, attentionLevel: 'high', lastActive: new Date().toISOString(), joinedAt: new Date(Date.now() - 1000 * 60 * 22).toISOString(), reactions: 6, chatMessages: 4 },
  { id: '6', name: 'Frank Zhou', status: 'online', engagementScore: 72, handRaised: false, attentionLevel: 'medium', lastActive: new Date().toISOString(), joinedAt: new Date(Date.now() - 1000 * 60 * 20).toISOString(), reactions: 1, chatMessages: 2 },
  { id: '7', name: 'Grace Huang', status: 'offline', engagementScore: 0, handRaised: false, attentionLevel: 'low', lastActive: new Date(Date.now() - 1000 * 60 * 15).toISOString(), joinedAt: new Date(Date.now() - 1000 * 60 * 40).toISOString(), reactions: 1, chatMessages: 0 },
]

const generateDemoBreakoutRooms = (): BreakoutRoom[] => [
  { id: 'room-1', name: 'Group A', students: [], status: 'active', topic: 'Discuss Chapter 3' },
  { id: 'room-2', name: 'Group B', students: [], status: 'active', topic: 'Practice Problems' },
]

const generateDemoHandRaises = (): HandRaise[] => [
  { id: 'hand-1', studentId: '2', studentName: 'Bob Li', topic: 'Question about homework', priority: 'normal', raisedAt: new Date(Date.now() - 1000 * 60 * 2).toISOString(), status: 'pending' },
]

const generateDemoMessages = (): ChatMessage[] => [
  { id: 'msg-1', studentId: '1', studentName: 'Alice Zhang', content: 'Great explanation!', timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(), sentiment: 'positive', isPinned: false },
  { id: 'msg-2', studentId: '2', studentName: 'Bob Li', content: 'Can you go over the last example again?', timestamp: new Date(Date.now() - 1000 * 60 * 3).toISOString(), sentiment: 'question', isQuestion: true, isPinned: false },
  { id: 'msg-3', studentId: '3', studentName: 'Carol Wang', content: 'I\'m confused about step 3', timestamp: new Date(Date.now() - 1000 * 60 * 2).toISOString(), sentiment: 'confused', isPinned: false },
]

const generateDemoMetrics = (students: LiveStudent[]): EngagementMetrics => ({
  totalStudents: students.length,
  activeStudents: students.filter(s => s.status === 'online').length,
  averageEngagement: Math.round(students.filter(s => s.status === 'online').reduce((sum, s) => sum + s.engagementScore, 0) / Math.max(1, students.filter(s => s.status === 'online').length)),
  participationRate: 65,
  totalChatMessages: students.reduce((sum, s) => sum + s.chatMessages, 0),
  classDuration: 45,
  classStartTime: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
  veryEngaged: students.filter(s => s.engagementScore >= 85).length,
  engaged: students.filter(s => s.engagementScore >= 60 && s.engagementScore < 85).length,
  passive: students.filter(s => s.engagementScore >= 30 && s.engagementScore < 60).length,
  disengaged: students.filter(s => s.engagementScore < 30).length,
  engagementTrend: 'up'
})

const generateDemoAlerts = (): Alert[] => [
  { id: 'alert-1', type: 'disengagement', severity: 'medium', title: 'Student Disengagement', message: 'David Chen has been idle for 5 minutes', timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(), acknowledged: false },
]

export function LiveClassHub({ sessionId }: LiveClassHubProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  
  // State
  const [students, setStudents] = useState<LiveStudent[]>([])
  const [breakoutRooms, setBreakoutRooms] = useState<BreakoutRoom[]>([])
  const [handRaises, setHandRaises] = useState<HandRaise[]>([])
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [metrics, setMetrics] = useState<EngagementMetrics | null>(null)
  const [alerts, setAlerts] = useState<Alert[]>([])
  
  // Media controls
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOff, setIsVideoOff] = useState(false)
  const [isScreenSharing, setIsScreenSharing] = useState(false)
  
  // Dialogs
  const [showEndClassDialog, setShowEndClassDialog] = useState(false)

  // Load initial data
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const demoStudents = generateDemoStudents()
      setStudents(demoStudents)
      setBreakoutRooms(generateDemoBreakoutRooms())
      setHandRaises(generateDemoHandRaises())
      setMessages(generateDemoMessages())
      setMetrics(generateDemoMetrics(demoStudents))
      setAlerts(generateDemoAlerts())
      setIsLoading(false)
    }, 1000)
  }, [sessionId])

  // Handlers
  const handleCallOn = useCallback((studentId: string) => {
    setStudents(prev => prev.map(s => s.id === studentId ? { ...s, handRaised: false } : s))
    setHandRaises(prev => prev.map(h => h.studentId === studentId ? { ...h, status: 'answered' } : h))
  }, [])

  const handleAcknowledgeHand = useCallback((handId: string) => {
    setHandRaises(prev => prev.map(h => h.id === handId ? { ...h, status: 'acknowledged' } : h))
  }, [])

  const handleCreateRoom = useCallback(() => {
    const newRoom: BreakoutRoom = {
      id: `room-${Date.now()}`,
      name: `Group ${String.fromCharCode(65 + breakoutRooms.length)}`,
      students: [],
      status: 'preparing'
    }
    setBreakoutRooms(prev => [...prev, newRoom])
  }, [breakoutRooms.length])

  const handleAssignToRoom = useCallback((studentId: string, roomId: string) => {
    setStudents(prev => prev.map(s => s.id === studentId ? { ...s, breakoutRoomId: roomId } : s))
    setBreakoutRooms(prev => prev.map(room => {
      if (room.id === roomId) {
        const student = students.find(s => s.id === studentId)
        if (student && !room.students.find(s => s.id === studentId)) {
          return { ...room, students: [...room.students, student] }
        }
      }
      return room
    }))
  }, [students])

  const handleRemoveFromRoom = useCallback((studentId: string) => {
    setStudents(prev => prev.map(s => s.id === studentId ? { ...s, breakoutRoomId: undefined } : s))
    setBreakoutRooms(prev => prev.map(room => ({
      ...room,
      students: room.students.filter(s => s.id !== studentId)
    })))
  }, [])

  const handleSendToAll = useCallback((roomIds: string[]) => {
    // Simulate sending students to breakout rooms
    roomIds.forEach(roomId => {
      const room = breakoutRooms.find(r => r.id === roomId)
      if (room) {
        setBreakoutRooms(prev => prev.map(r => r.id === roomId ? { ...r, status: 'active' } : r))
      }
    })
  }, [breakoutRooms])

  const handleCloseRooms = useCallback(() => {
    setBreakoutRooms(prev => prev.map(room => ({ ...room, status: 'closed' })))
    setStudents(prev => prev.map(s => ({ ...s, breakoutRoomId: undefined })))
  }, [])

  const handlePinMessage = useCallback((messageId: string) => {
    setMessages(prev => prev.map(m => m.id === messageId ? { ...m, isPinned: !m.isPinned } : m))
  }, [])

  const handleEndClass = useCallback(() => {
    router.push('/tutor/dashboard')
  }, [router])

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

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b px-4 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="font-semibold text-lg">Advanced Mathematics</h1>
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
          </div>

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
          </div>

          <Separator orientation="vertical" className="h-6" />

          <Button 
            variant="destructive" 
            className="gap-2"
            onClick={() => setShowEndClassDialog(true)}
          >
            <PhoneOff className="w-4 h-4" />
            End Class
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Tabs */}
        <div className="flex-1 p-4 overflow-hidden">
          <Tabs defaultValue="students" className="h-full flex flex-col">
            <TabsList className="grid w-full grid-cols-4 max-w-lg bg-muted p-1 rounded-lg">
              <TabsTrigger value="students" className="gap-1 data-[state=active]:bg-white data-[state=active]:shadow-sm text-xs">
                <Users className="w-3 h-3" />
                Students
              </TabsTrigger>
              <TabsTrigger value="progress" className="gap-1 data-[state=active]:bg-white data-[state=active]:shadow-sm text-xs">
                <TrendingUp className="w-3 h-3" />
                Progress
              </TabsTrigger>
              <TabsTrigger value="rooms" className="gap-1 data-[state=active]:bg-white data-[state=active]:shadow-sm text-xs">
                <LayoutGrid className="w-3 h-3" />
                Rooms
              </TabsTrigger>
              <TabsTrigger value="analytics" className="gap-1 data-[state=active]:bg-white data-[state=active]:shadow-sm text-xs">
                <BarChart3 className="w-3 h-3" />
                Analytics
              </TabsTrigger>
            </TabsList>

            <TabsContent value="students" className="flex-1 mt-4 overflow-hidden">
              <StudentList 
                students={students}
                breakoutRooms={breakoutRooms}
                onCallOn={handleCallOn}
                onAssignToRoom={handleAssignToRoom}
                onRemoveFromRoom={handleRemoveFromRoom}
              />
            </TabsContent>

            <TabsContent value="progress" className="flex-1 mt-4 overflow-hidden">
              <StudentProgressPanel 
                students={students}
                classDuration={metrics?.classDuration || 0}
              />
            </TabsContent>

            <TabsContent value="rooms" className="flex-1 mt-4 overflow-hidden">
              <BreakoutRoomManager
                rooms={breakoutRooms}
                unassignedStudents={students.filter(s => !s.breakoutRoomId && s.status === 'online')}
                onCreateRoom={handleCreateRoom}
                onAssignStudent={handleAssignToRoom}
                onRemoveStudent={handleRemoveFromRoom}
                onSendAll={handleSendToAll}
                onCloseAll={handleCloseRooms}
              />
            </TabsContent>

            <TabsContent value="analytics" className="flex-1 mt-4 overflow-hidden">
              <div className="h-full overflow-auto">
                {metrics && <LiveAnalytics metrics={metrics} alerts={alerts} />}
              </div>
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
              currentTopic="Advanced Calculus - Derivatives"
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
              onPinMessage={handlePinMessage}
            />
          </div>
        </div>
      </div>

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
    </div>
  )
}
