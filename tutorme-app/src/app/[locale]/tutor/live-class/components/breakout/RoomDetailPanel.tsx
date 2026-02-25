'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import type { BreakoutRoom, LiveStudent } from '../../types'
import { PRESET_TASKS } from '../../types'
import {
  Users,
  UserPlus,
  LogOut,
  MessageSquare,
  Maximize2,
  Clock,
  Plus,
  CheckCircle,
  AlertCircle,
  Brain
} from 'lucide-react'

interface RoomDetailPanelProps {
  room: BreakoutRoom
  unassignedStudents: LiveStudent[]
  onAssignStudent: (roomId: string, studentId: string) => void
  onRemoveStudent: (roomId: string, studentId: string) => void
  onJoinRoom: (room: BreakoutRoom) => void
  onExtendTime: (roomId: string, minutes: number) => void
  onAssignTask: (roomId: string, task: typeof PRESET_TASKS[0]) => void
}

export function RoomDetailPanel({
  room,
  unassignedStudents,
  onAssignStudent,
  onRemoveStudent,
  onJoinRoom,
  onExtendTime,
  onAssignTask
}: RoomDetailPanelProps) {
  const [showAddStudents, setShowAddStudents] = useState(false)

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

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="h-full flex flex-col p-4">
      {/* Room Header */}
      <Card className="mb-4">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <CardTitle className="text-lg">{room.name}</CardTitle>
                {getStatusBadge(room.status)}
                {room.aiEnabled && (
                  <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                    <Brain className="h-3 w-3 mr-1" />
                    AI
                  </Badge>
                )}
              </div>
              {room.topic && (
                <p className="text-sm text-gray-500">{room.topic}</p>
              )}
            </div>
            <div className="flex items-center gap-2">
              {room.status === 'active' && (
                <>
                  <div className={cn(
                    "flex items-center gap-1 px-2 py-1 rounded text-sm font-medium",
                    room.timeRemaining < 60 ? "bg-red-100 text-red-700" : "bg-gray-100 text-gray-700"
                  )}>
                    <Clock className="h-4 w-4" />
                    {formatTime(room.timeRemaining)}
                  </div>
                  <Button onClick={() => onJoinRoom(room)}>
                    <Maximize2 className="h-4 w-4 mr-2" />
                    Join Room
                  </Button>
                </>
              )}
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="flex-1 grid grid-cols-2 gap-4 min-h-0">
        {/* Left Column - Students */}
        <Card className="flex flex-col">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Users className="h-4 w-4" />
                Students ({room.participants.filter(p => p.role === 'student').length})
              </CardTitle>
              {unassignedStudents.length > 0 && (
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setShowAddStudents(!showAddStudents)}
                >
                  <UserPlus className="h-4 w-4 mr-1" />
                  Add
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="flex-1 overflow-hidden">
            <ScrollArea className="h-full">
              <div className="space-y-2">
                {room.participants.filter(p => p.role === 'student').length === 0 ? (
                  <p className="text-sm text-gray-400 italic">No students assigned</p>
                ) : (
                  room.participants.filter(p => p.role === 'student').map((participant) => (
                    <div 
                      key={participant.id}
                      className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center gap-2">
                        <div className={cn(
                          "w-2 h-2 rounded-full",
                          participant.isOnline ? "bg-green-500" : "bg-gray-400"
                        )} />
                        <span className="text-sm">{participant.name}</span>
                        {participant.handRaised && (
                          <AlertCircle className="h-3 w-3 text-yellow-500" />
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => onRemoveStudent(room.id, participant.userId)}
                      >
                        <LogOut className="h-3 w-3 text-gray-400" />
                      </Button>
                    </div>
                  ))
                )}

                {/* Add Students Panel */}
                {showAddStudents && unassignedStudents.length > 0 && (
                  <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="text-sm font-medium mb-2 text-blue-900">Add Students</h4>
                    <div className="space-y-1 max-h-32 overflow-y-auto">
                      {unassignedStudents.map((student) => (
                        <button
                          key={student.id}
                          className="w-full text-left px-2 py-1.5 text-sm hover:bg-blue-100 rounded flex items-center gap-2"
                          onClick={() => {
                            onAssignStudent(room.id, student.id)
                            if (unassignedStudents.length === 1) {
                              setShowAddStudents(false)
                            }
                          }}
                        >
                          <Plus className="h-3 w-3" />
                          {student.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Right Column - Tasks & Controls */}
        <div className="space-y-4">
          {/* Assigned Task */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Assigned Task</CardTitle>
            </CardHeader>
            <CardContent>
              {room.assignedTask ? (
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium text-sm">{room.assignedTask.title}</p>
                  <p className="text-xs text-gray-500 mt-1">{room.assignedTask.description}</p>
                </div>
              ) : (
                <p className="text-sm text-gray-400 italic">No task assigned</p>
              )}
              
              <div className="mt-3 space-y-1">
                <p className="text-xs text-gray-500">Assign a task:</p>
                {PRESET_TASKS.map(task => (
                  <button
                    key={task.id}
                    onClick={() => onAssignTask(room.id, task)}
                    className="w-full text-left p-2 text-xs bg-gray-50 hover:bg-gray-100 rounded transition-colors"
                  >
                    <span className="font-medium">{task.title}</span>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Time Extension */}
          {room.status === 'active' && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Extend Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  {[5, 10, 15, 30].map(mins => (
                    <Button 
                      key={mins}
                      size="sm" 
                      variant="outline" 
                      className="flex-1 text-xs"
                      onClick={() => onExtendTime(room.id, mins)}
                    >
                      +{mins}m
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Metrics */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="bg-gray-50 p-2 rounded">
                  <p className="text-gray-500 text-xs">Messages</p>
                  <p className="font-medium">{room.metrics.messagesExchanged}</p>
                </div>
                <div className="bg-gray-50 p-2 rounded">
                  <p className="text-gray-500 text-xs">Engagement</p>
                  <p className="font-medium">{room.metrics.avgEngagement}%</p>
                </div>
                <div className="bg-gray-50 p-2 rounded">
                  <p className="text-gray-500 text-xs">Participation</p>
                  <p className="font-medium">{room.metrics.participationRate}%</p>
                </div>
                <div className="bg-gray-50 p-2 rounded">
                  <p className="text-gray-500 text-xs">Topic Focus</p>
                  <p className="font-medium">{room.metrics.topicAdherence}%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Alerts */}
          {room.alerts.length > 0 && (
            <Card className="border-red-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2 text-red-700">
                  <AlertCircle className="h-4 w-4" />
                  Alerts ({room.alerts.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {room.alerts.slice(0, 3).map((alert, i) => (
                    <div 
                      key={i} 
                      className={cn(
                        "p-2 rounded text-xs",
                        alert.severity === 'high' ? "bg-red-50 text-red-700" :
                        alert.severity === 'medium' ? "bg-yellow-50 text-yellow-700" :
                        "bg-blue-50 text-blue-700"
                      )}
                    >
                      <span className="font-medium">{alert.type}:</span> {alert.message}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
