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
  Clock,
} from 'lucide-react'

interface BreakoutRoomManagerProps {
  rooms: BreakoutRoom[]
  unassignedStudents: LiveStudent[]
  onCreateRoom: () => void
  onAssignStudent: (studentId: string, roomId: string) => void
  onRemoveStudent: (studentId: string) => void
  onSendAll: (roomIds: string[]) => void
  onCloseAll: () => void
  onJoinRoom?: (roomId: string) => void
}

export function BreakoutRoomManager({
  rooms,
  unassignedStudents,
  onCreateRoom,
  onAssignStudent,
  onRemoveStudent,
  onSendAll,
  onCloseAll,
  onJoinRoom,
}: BreakoutRoomManagerProps) {
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null)
  const [roomDuration, setRoomDuration] = useState(10)
  const [editingTopic, setEditingTopic] = useState<string | null>(null)

  const activeRooms = rooms.filter(r => r.status === 'active')
  const preparingRooms = rooms.filter(r => r.status === 'forming')

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
    <div className="flex h-full gap-4">
      {/* Left Panel - Room List */}
      <div className="flex w-1/3 flex-col gap-4">
        <Card className="flex flex-1 flex-col">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <CardTitle className="text-sm font-medium">Breakout Rooms</CardTitle>
              </div>
              <Button size="sm" onClick={onCreateRoom}>
                <Plus className="mr-1 h-4 w-4" />
                Create
              </Button>
            </div>
          </CardHeader>
          <CardContent className="flex-1 p-0">
            <ScrollArea className="h-[calc(100%-60px)] px-4">
              <div className="space-y-2 pb-4">
                {rooms.length === 0 ? (
                  <div className="py-8 text-center">
                    <Users className="mx-auto mb-2 h-10 w-10 text-gray-300" />
                    <p className="text-sm text-gray-500">No breakout rooms</p>
                    <p className="mt-1 text-xs text-gray-400">Create rooms for group activities</p>
                  </div>
                ) : (
                  rooms.map(room => (
                    <div
                      key={room.id}
                      onClick={() => setSelectedRoom(room.id)}
                      className={cn(
                        'cursor-pointer rounded-lg border p-3 transition-all',
                        selectedRoom === room.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{room.name}</span>
                        {getStatusBadge(room.status)}
                      </div>
                      <div className="mt-2 flex items-center gap-4 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {room.participants.length} students
                        </span>
                        {room.topic && <span className="max-w-[120px] truncate">{room.topic}</span>}
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
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">Duration:</span>
                  <Input
                    type="number"
                    value={roomDuration}
                    onChange={e => setRoomDuration(Number(e.target.value))}
                    className="h-8 w-20"
                    min={1}
                    max={60}
                  />
                  <span className="text-sm text-gray-500">min</span>
                </div>
                <Button className="w-full" onClick={() => onSendAll(preparingRooms.map(r => r.id))}>
                  <Play className="mr-2 h-4 w-4" />
                  Start Breakout Sessions
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {activeRooms.length > 0 && (
          <Button variant="destructive" onClick={onCloseAll}>
            <Square className="mr-2 h-4 w-4" />
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
            onJoinRoom={onJoinRoom}
          />
        ) : (
          <Card className="flex h-full items-center justify-center">
            <div className="p-8 text-center">
              <Users className="mx-auto mb-4 h-12 w-12 text-gray-300" />
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
  onJoinRoom?: (roomId: string) => void
}

function RoomDetail({
  room,
  unassignedStudents,
  onAssignStudent,
  onRemoveStudent,
  onJoinRoom,
}: RoomDetailProps) {
  const [showAddStudents, setShowAddStudents] = useState(false)

  return (
    <Card className="flex h-full flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base">{room.name}</CardTitle>
            {room.topic && <p className="mt-1 text-sm text-gray-500">{room.topic}</p>}
          </div>
          <Badge
            className={cn(
              room.status === 'active' && 'bg-green-600',
              room.status === 'closed' && 'bg-gray-500'
            )}
          >
            {room.status.charAt(0).toUpperCase() + room.status.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-1 p-0">
        <ScrollArea className="h-full px-4">
          <div className="space-y-4 pb-4">
            {/* Assigned Students */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-700">
                  Students ({room.participants.length})
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAddStudents(!showAddStudents)}
                >
                  <UserPlus className="mr-1 h-4 w-4" />
                  Add
                </Button>
              </div>

              {room.participants.length === 0 ? (
                <p className="text-sm italic text-gray-400">No students assigned</p>
              ) : (
                <div className="space-y-2">
                  {room.participants
                    .filter(p => p.role === 'student')
                    .map(participant => (
                      <div
                        key={participant.userId}
                        className="flex items-center justify-between rounded bg-gray-50 p-2"
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className={cn(
                              'h-2 w-2 rounded-full',
                              participant.isOnline ? 'bg-green-500' : 'bg-gray-400'
                            )}
                          />
                          <span className="text-sm">{participant.name}</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => onRemoveStudent(participant.userId)}
                        >
                          <LogOut className="h-3 w-3 text-gray-400" />
                        </Button>
                      </div>
                    ))}
                </div>
              )}
            </div>

            {/* Add Students Panel */}
            {showAddStudents && unassignedStudents.length > 0 && (
              <div className="rounded-lg border bg-blue-50 p-3">
                <h4 className="mb-2 text-sm font-medium">Add Students</h4>
                <div className="max-h-32 space-y-1 overflow-y-auto">
                  {unassignedStudents.map(student => (
                    <button
                      key={student.id}
                      className="flex w-full items-center gap-2 rounded px-2 py-1.5 text-left text-sm hover:bg-blue-100"
                      onClick={() => {
                        onAssignStudent(student.id, room.id)
                        if (unassignedStudents.length === 1) {
                          setShowAddStudents(false)
                        }
                      }}
                    >
                      <UserPlus className="h-3 w-3" />
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
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Broadcast
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => onJoinRoom?.(room.id)}
                  disabled={!onJoinRoom}
                >
                  <Users className="mr-2 h-4 w-4" />
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
