'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import type { BreakoutRoom, LiveStudent } from '../types'
import { 
  Plus, 
  Users, 
  Play, 
  Square,
  Trash2,
  UserPlus,
  LogOut,
  Edit2,
  MessageSquare,
  Clock
} from 'lucide-react'

interface BreakoutRoomManagerProps {
  rooms: BreakoutRoom[]
  unassignedStudents: LiveStudent[]
  onCreateRoom: () => void
  onAssignStudent: (studentId: string, roomId: string) => void
  onRemoveStudent: (studentId: string) => void
  onSendAll: (roomIds: string[]) => void
  onCloseAll: () => void
}

export function BreakoutRoomManager({
  rooms,
  unassignedStudents,
  onCreateRoom,
  onAssignStudent,
  onRemoveStudent,
  onSendAll,
  onCloseAll
}: BreakoutRoomManagerProps) {
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null)
  const [roomDuration, setRoomDuration] = useState(10)
  const [editingTopic, setEditingTopic] = useState<string | null>(null)

  const activeRooms = rooms.filter(r => r.status === 'active')
  const preparingRooms = rooms.filter(r => r.status === 'preparing')

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-600">Active</Badge>
      case 'preparing':
        return <Badge variant="outline">Preparing</Badge>
      case 'closed':
        return <Badge variant="secondary">Closed</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="h-full flex gap-4">
      {/* Left Panel - Room List */}
      <div className="w-1/3 flex flex-col gap-4">
        <Card className="flex-1 flex flex-col">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <CardTitle className="text-sm font-medium">Breakout Rooms</CardTitle>
              </div>
              <Button size="sm" onClick={onCreateRoom}>
                <Plus className="w-4 h-4 mr-1" />
                Create
              </Button>
            </div>
          </CardHeader>
          <CardContent className="flex-1 p-0">
            <ScrollArea className="h-[calc(100%-60px)] px-4">
              <div className="space-y-2 pb-4">
                {rooms.length === 0 ? (
                  <div className="text-center py-8">
                    <Users className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">No breakout rooms</p>
                    <p className="text-xs text-gray-400 mt-1">Create rooms for group activities</p>
                  </div>
                ) : (
                  rooms.map((room) => (
                    <div
                      key={room.id}
                      onClick={() => setSelectedRoom(room.id)}
                      className={cn(
                        "p-3 rounded-lg border cursor-pointer transition-all",
                        selectedRoom === room.id 
                          ? "border-blue-500 bg-blue-50" 
                          : "border-gray-200 hover:border-gray-300"
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-sm">{room.name}</span>
                        {getStatusBadge(room.status)}
                      </div>
                      <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {room.students.length} students
                        </span>
                        {room.topic && (
                          <span className="truncate max-w-[120px]">
                            {room.topic}
                          </span>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Controls */}
        {preparingRooms.length > 0 && (
          <Card>
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">Duration:</span>
                  <Input
                    type="number"
                    value={roomDuration}
                    onChange={(e) => setRoomDuration(Number(e.target.value))}
                    className="w-20 h-8"
                    min={1}
                    max={60}
                  />
                  <span className="text-sm text-gray-500">min</span>
                </div>
                <Button 
                  className="w-full"
                  onClick={() => onSendAll(preparingRooms.map(r => r.id))}
                >
                  <Play className="w-4 h-4 mr-2" />
                  Start Breakout Sessions
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {activeRooms.length > 0 && (
          <Button variant="destructive" onClick={onCloseAll}>
            <Square className="w-4 h-4 mr-2" />
            End All Sessions
          </Button>
        )}
      </div>

      {/* Right Panel - Room Detail */}
      <div className="flex-1">
        {selectedRoom ? (
          <RoomDetail
            room={rooms.find(r => r.id === selectedRoom)!}
            unassignedStudents={unassignedStudents}
            onAssignStudent={onAssignStudent}
            onRemoveStudent={onRemoveStudent}
          />
        ) : (
          <Card className="h-full flex items-center justify-center">
            <div className="text-center p-8">
              <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Select a room to view details</p>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}

interface RoomDetailProps {
  room: BreakoutRoom
  unassignedStudents: LiveStudent[]
  onAssignStudent: (studentId: string, roomId: string) => void
  onRemoveStudent: (studentId: string) => void
}

function RoomDetail({ room, unassignedStudents, onAssignStudent, onRemoveStudent }: RoomDetailProps) {
  const [showAddStudents, setShowAddStudents] = useState(false)

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base">{room.name}</CardTitle>
            {room.topic && (
              <p className="text-sm text-gray-500 mt-1">{room.topic}</p>
            )}
          </div>
          <Badge className={cn(
            room.status === 'active' && "bg-green-600",
            room.status === 'closed' && "bg-gray-500"
          )}>
            {room.status.charAt(0).toUpperCase() + room.status.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-1 p-0">
        <ScrollArea className="h-full px-4">
          <div className="space-y-4 pb-4">
            {/* Assigned Students */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-700">
                  Students ({room.students.length})
                </h3>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setShowAddStudents(!showAddStudents)}
                >
                  <UserPlus className="w-4 h-4 mr-1" />
                  Add
                </Button>
              </div>
              
              {room.students.length === 0 ? (
                <p className="text-sm text-gray-400 italic">No students assigned</p>
              ) : (
                <div className="space-y-2">
                  {room.students.map((student) => (
                    <div 
                      key={student.id}
                      className="flex items-center justify-between p-2 bg-gray-50 rounded"
                    >
                      <div className="flex items-center gap-2">
                        <div className={cn(
                          "w-2 h-2 rounded-full",
                          student.status === 'online' ? "bg-green-500" : "bg-gray-400"
                        )} />
                        <span className="text-sm">{student.name}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => onRemoveStudent(student.id)}
                      >
                        <LogOut className="w-3 h-3 text-gray-400" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Add Students Panel */}
            {showAddStudents && unassignedStudents.length > 0 && (
              <div className="border rounded-lg p-3 bg-blue-50">
                <h4 className="text-sm font-medium mb-2">Add Students</h4>
                <div className="space-y-1 max-h-32 overflow-y-auto">
                  {unassignedStudents.map((student) => (
                    <button
                      key={student.id}
                      className="w-full text-left px-2 py-1.5 text-sm hover:bg-blue-100 rounded flex items-center gap-2"
                      onClick={() => {
                        onAssignStudent(student.id, room.id)
                        if (unassignedStudents.length === 1) {
                          setShowAddStudents(false)
                        }
                      }}
                    >
                      <UserPlus className="w-3 h-3" />
                      {student.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Room Actions */}
            {room.status === 'active' && (
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Broadcast
                </Button>
                <Button variant="outline" className="flex-1">
                  <Users className="w-4 h-4 mr-2" />
                  Join Room
                </Button>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
