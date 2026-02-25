'use client'

import { useState, useCallback, useMemo, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

import { useBreakoutSocket, useSmartGrouping } from './hooks'
import { CreateRoomPanel } from './CreateRoomPanel'
import { RoomDetailPanel } from './RoomDetailPanel'
import { RoomGridPanel } from './RoomGridPanel'
import type { 
  LiveStudent, 
  BreakoutRoom, 
  BreakoutSessionConfig
} from '../../types'

import {
  Users,
  Plus,
  AlertCircle,
  CheckCircle,
  Square,
  Grid3X3,
  Brain,
  Megaphone,
  BarChart3,
} from 'lucide-react'

interface UnifiedBreakoutManagerProps {
  sessionId: string
  tutorId: string
  tutorName: string
  students: LiveStudent[]
  onRoomsChange?: (rooms: BreakoutRoom[]) => void
  onJoinRoom?: (room: BreakoutRoom) => void
}

export function UnifiedBreakoutManager({
  sessionId,
  tutorId,
  tutorName,
  students,
  onRoomsChange,
  onJoinRoom
}: UnifiedBreakoutManagerProps) {
  // Socket connection
  const {
    rooms,
    createRooms,
    endAllRooms,
    assignStudent,
    removeStudent,
    broadcastMessage,
    extendTime,
    assignTask
  } = useBreakoutSocket({
    sessionId,
    userId: tutorId,
    userName: tutorName,
    role: 'tutor'
  })

  // Local state
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null)
  const [showCreatePanel, setShowCreatePanel] = useState(false)
  const [broadcastMessageText, setBroadcastMessageText] = useState('')
  
  // Configuration state
  const [config, setConfig] = useState<BreakoutSessionConfig>({
    roomCount: 3,
    participantsPerRoom: 4,
    distributionMode: 'random',
    timeLimit: 15,
    aiAssistantEnabled: true,
    aiMode: 'passive'
  })

  // Smart grouping suggestion
  const { suggestion } = useSmartGrouping({ students, config })

  const selectedRoom = useMemo(() => 
    rooms.find(r => r.id === selectedRoomId), 
    [rooms, selectedRoomId]
  )

  const unassignedStudents = useMemo(() => 
    students.filter(s => 
      !rooms.some(r => r.participants.some(p => p.userId === s.id)) && 
      s.status === 'online'
    ),
    [students, rooms]
  )

  const activeRooms = useMemo(() => 
    rooms.filter(r => r.status === 'active'),
    [rooms]
  )

  const totalAlerts = useMemo(() => 
    rooms.reduce((acc, room) => acc + room.alerts.filter(a => !a.acknowledged).length, 0),
    [rooms]
  )

  useEffect(() => {
    onRoomsChange?.(rooms)
  }, [rooms, onRoomsChange])

  // Handlers
  const handleCreateRooms = useCallback(() => {
    const configWithSuggestion = suggestion 
      ? { ...config, suggestedGroups: suggestion }
      : config
    
    createRooms(configWithSuggestion)
    setShowCreatePanel(false)
    toast.success(`Creating ${config.roomCount} breakout rooms...`)
  }, [createRooms, config, suggestion])

  const handleEndAll = useCallback(() => {
    if (confirm('Are you sure you want to end all breakout sessions?')) {
      endAllRooms()
      toast.success('Ending all breakout sessions...')
    }
  }, [endAllRooms])

  const handleBroadcast = useCallback(() => {
    if (!broadcastMessageText.trim()) return
    
    broadcastMessage(broadcastMessageText, 'all')
    setBroadcastMessageText('')
    toast.success('Broadcast sent to all rooms')
  }, [broadcastMessage, broadcastMessageText])

  const handleJoinRoom = useCallback((room: BreakoutRoom) => {
    onJoinRoom?.(room)
  }, [onJoinRoom])

  const handleAssignPresetTask = useCallback((roomId: string, task: { title: string; description: string; type: string }) => {
    assignTask(roomId, task)
    toast.success(`Task assigned: ${task.title}`)
  }, [assignTask])

  // Status badge helper
  const getStatusBadge = (status: BreakoutRoom['status']) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500">Active</Badge>
      case 'forming':
        return <Badge variant="outline" className="border-blue-500 text-blue-600">Forming</Badge>
      case 'paused':
        return <Badge variant="outline" className="border-yellow-500 text-yellow-600">Paused</Badge>
      case 'closed':
        return <Badge variant="secondary">Closed</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  // Alert icon helper
  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'confusion': return '❓'
      case 'conflict': return '⚠️'
      case 'off_topic': return '🎯'
      case 'need_help': return '🆘'
      case 'quiet': return '🔇'
      default: return '🔔'
    }
  }

  // If showing create panel
  if (showCreatePanel) {
    return (
      <CreateRoomPanel
        config={config}
        setConfig={setConfig}
        suggestion={suggestion}
        students={students}
        onCreate={handleCreateRooms}
        onCancel={() => setShowCreatePanel(false)}
      />
    )
  }

  // Empty state
  if (rooms.length === 0) {
    return (
      <div className="h-full flex flex-col bg-gray-50">
        <div className="p-4 border-b bg-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Grid3X3 className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Breakout Rooms</h2>
              <p className="text-sm text-gray-500">Manage small group sessions</p>
            </div>
          </div>
          <Button onClick={() => setShowCreatePanel(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create Rooms
          </Button>
        </div>

        <div className="flex-1 flex items-center justify-center p-6">
          <div className="text-center max-w-md">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Grid3X3 className="h-10 w-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No Breakout Rooms</h3>
            <p className="text-gray-500 mb-6">
              Create breakout rooms to split students into smaller groups for focused discussions or activities.
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                {students.filter(s => s.status === 'online').length} students available
              </span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="px-4 py-3 border-b bg-white flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Grid3X3 className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Breakout Rooms</h2>
            <p className="text-sm text-gray-500">
              {rooms.length} rooms • {rooms.reduce((acc, r) => acc + r.participants.length, 0)} students
              {totalAlerts > 0 && (
                <span className="ml-2 text-red-600">
                  • {totalAlerts} alert{totalAlerts !== 1 ? 's' : ''}
                </span>
              )}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {activeRooms.length > 0 && (
            <Button variant="outline" onClick={handleEndAll} className="text-red-600 border-red-200 hover:bg-red-50">
              <Square className="h-4 w-4 mr-2" />
              End All
            </Button>
          )}
          <Button onClick={() => setShowCreatePanel(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Room
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Room List */}
        <div className="w-64 border-r bg-white flex flex-col shrink-0">
          <div className="p-3 border-b">
            <h3 className="text-sm font-medium text-gray-700">Rooms</h3>
          </div>
          <ScrollArea className="flex-1">
            <div className="p-2 space-y-1">
              {rooms.map((room) => (
                <button
                  key={room.id}
                  onClick={() => setSelectedRoomId(room.id)}
                  className={cn(
                    "w-full text-left p-3 rounded-lg border transition-all",
                    selectedRoomId === room.id
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                  )}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-sm">{room.name}</span>
                    {getStatusBadge(room.status)}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Users className="h-3 w-3" />
                    {room.participants.length}
                    {room.aiEnabled && (
                      <Badge variant="outline" className="text-[10px] h-4 px-1">
                        <Brain className="h-2 w-2 mr-0.5" />
                        AI
                      </Badge>
                    )}
                  </div>
                  {room.alerts.length > 0 && (
                    <div className="mt-1 flex items-center gap-1 text-xs text-red-600">
                      <AlertCircle className="h-3 w-3" />
                      {room.alerts.length} alert{room.alerts.length !== 1 ? 's' : ''}
                    </div>
                  )}
                </button>
              ))}
            </div>
          </ScrollArea>

          {/* Quick Stats */}
          <div className="p-3 border-t bg-gray-50">
            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="bg-white p-2 rounded border">
                <p className="text-lg font-bold">{activeRooms.length}</p>
                <p className="text-[10px] text-gray-500">Active</p>
              </div>
              <div className="bg-white p-2 rounded border">
                <p className="text-lg font-bold">{totalAlerts}</p>
                <p className="text-[10px] text-gray-500">Alerts</p>
              </div>
            </div>
          </div>
        </div>

        {/* Center Panel - Room Detail or Grid */}
        <div className="flex-1 overflow-hidden">
          {selectedRoom ? (
            <RoomDetailPanel
              room={selectedRoom}
              unassignedStudents={unassignedStudents}
              onAssignStudent={assignStudent}
              onRemoveStudent={removeStudent}
              onJoinRoom={handleJoinRoom}
              onExtendTime={extendTime}
              onAssignTask={handleAssignPresetTask}
            />
          ) : (
            <RoomGridPanel
              rooms={rooms}
              onSelectRoom={setSelectedRoomId}
              onJoinRoom={handleJoinRoom}
            />
          )}
        </div>

        {/* Right Panel - Sidebar */}
        <div className="w-80 border-l bg-white flex flex-col shrink-0">
          <Tabs defaultValue="broadcast" className="flex-1 flex flex-col">
            <TabsList className="grid w-full grid-cols-3 mx-2 mt-2">
              <TabsTrigger value="broadcast" className="text-xs">
                <Megaphone className="h-3 w-3 mr-1" />
                Broadcast
              </TabsTrigger>
              <TabsTrigger value="alerts" className="text-xs">
                <AlertCircle className="h-3 w-3 mr-1" />
                Alerts
                {totalAlerts > 0 && (
                  <span className="ml-1 bg-red-500 text-white text-[10px] px-1 rounded-full">
                    {totalAlerts}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger value="stats" className="text-xs">
                <BarChart3 className="h-3 w-3 mr-1" />
                Stats
              </TabsTrigger>
            </TabsList>

            <TabsContent value="broadcast" className="flex-1 flex flex-col m-0 p-4">
              <div className="space-y-3">
                <Input
                  placeholder="Message to all rooms..."
                  value={broadcastMessageText}
                  onChange={(e) => setBroadcastMessageText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleBroadcast()}
                />
                <Button 
                  className="w-full" 
                  onClick={handleBroadcast}
                  disabled={!broadcastMessageText.trim()}
                >
                  <Megaphone className="h-4 w-4 mr-2" />
                  Broadcast to All
                </Button>
                
                <div className="pt-2 border-t">
                  <p className="text-xs text-gray-500 mb-2">Quick Messages</p>
                  <div className="flex flex-wrap gap-1">
                    {['5 min left!', 'Wrap up soon', 'Great work!', 'Need help?'].map((msg) => (
                      <button
                        key={msg}
                        onClick={() => {
                          broadcastMessage(msg, 'all')
                          toast.success(`Sent: "${msg}"`)
                        }}
                        className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded text-gray-600 transition-colors"
                      >
                        {msg}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="alerts" className="flex-1 m-0 p-4">
              <ScrollArea className="h-full">
                <div className="space-y-2">
                  {rooms.flatMap(r => 
                    r.alerts.filter(a => !a.acknowledged).map(a => ({ ...a, roomName: r.name, roomId: r.id }))
                  ).length === 0 ? (
                    <div className="text-center text-gray-500 py-8">
                      <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-500" />
                      <p className="text-sm">No active alerts</p>
                    </div>
                  ) : (
                    rooms.flatMap(r => 
                      r.alerts.filter(a => !a.acknowledged).map(a => ({ ...a, roomName: r.name, roomId: r.id }))
                    ).sort((a, b) => {
                      const severityOrder = { high: 3, medium: 2, low: 1 }
                      return severityOrder[b.severity] - severityOrder[a.severity]
                    }).map((alert, i) => (
                      <div
                        key={i}
                        className={cn(
                          "p-3 rounded-lg border text-sm",
                          alert.severity === 'high' ? "bg-red-50 border-red-200 text-red-800" :
                          alert.severity === 'medium' ? "bg-yellow-50 border-yellow-200 text-yellow-800" :
                          "bg-blue-50 border-blue-200 text-blue-800"
                        )}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span>{getAlertIcon(alert.type)}</span>
                          <span className="font-medium">{alert.roomName}</span>
                          <Badge variant="outline" className="text-[10px] ml-auto">
                            {alert.severity}
                          </Badge>
                        </div>
                        <p>{alert.message}</p>
                      </div>
                    ))
                  )}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="stats" className="flex-1 m-0 p-4">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-50 p-3 rounded-lg text-center border">
                    <p className="text-2xl font-bold">{activeRooms.length}</p>
                    <p className="text-xs text-gray-500">Active Rooms</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg text-center border">
                    <p className="text-2xl font-bold">{totalAlerts}</p>
                    <p className="text-xs text-gray-500">Active Alerts</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg text-center border">
                    <p className="text-2xl font-bold">
                      {rooms.reduce((acc, r) => acc + r.metrics.messagesExchanged, 0)}
                    </p>
                    <p className="text-xs text-gray-500">Messages</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg text-center border">
                    <p className="text-2xl font-bold">
                      {Math.round(rooms.reduce((acc, r) => acc + r.metrics.avgEngagement, 0) / Math.max(rooms.length, 1))}%
                    </p>
                    <p className="text-xs text-gray-500">Avg Engagement</p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
