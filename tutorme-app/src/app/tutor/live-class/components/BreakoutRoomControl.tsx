'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'
import {
  Users,
  Plus,
  Trash2,
  ArrowRight,
  ArrowLeft,
  Shuffle,
  MessageSquare,
  Clock
} from 'lucide-react'

interface Participant {
  id: string
  name: string
  isLocal?: boolean
}

interface BreakoutRoom {
  id: string
  name: string
  participants: Participant[]
  topic?: string
  duration?: number
}

interface BreakoutRoomControlProps {
  onClose: () => void
  participants: Participant[]
}

export function BreakoutRoomControl({ onClose, participants }: BreakoutRoomControlProps) {
  const [rooms, setRooms] = useState<BreakoutRoom[]>([
    { id: '1', name: 'Room 1', participants: [] },
    { id: '2', name: 'Room 2', participants: [] }
  ])
  const [unassignedParticipants, setUnassignedParticipants] = useState<Participant[]>(
    participants.filter(p => !p.isLocal)
  )
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null)
  const [selectedParticipants, setSelectedParticipants] = useState<Set<string>>(new Set())
  const [isActive, setIsActive] = useState(false)
  const [defaultDuration, setDefaultDuration] = useState(10)

  const addRoom = () => {
    if (rooms.length >= 10) {
      toast.error('Maximum 10 rooms allowed')
      return
    }
    setRooms([...rooms, { 
      id: Date.now().toString(), 
      name: `Room ${rooms.length + 1}`, 
      participants: [] 
    }])
  }

  const removeRoom = (roomId: string) => {
    if (rooms.length <= 2) {
      toast.error('Minimum 2 rooms required')
      return
    }
    const room = rooms.find(r => r.id === roomId)
    if (room) {
      setUnassignedParticipants([...unassignedParticipants, ...room.participants])
    }
    setRooms(rooms.filter(r => r.id !== roomId))
  }

  const assignParticipant = (participantId: string, roomId: string) => {
    const participant = unassignedParticipants.find(p => p.id === participantId)
    if (!participant) return

    setUnassignedParticipants(unassignedParticipants.filter(p => p.id !== participantId))
    setRooms(rooms.map(room => 
      room.id === roomId 
        ? { ...room, participants: [...room.participants, participant] }
        : room
    ))
  }

  const removeParticipantFromRoom = (participantId: string, roomId: string) => {
    const room = rooms.find(r => r.id === roomId)
    if (!room) return

    const participant = room.participants.find(p => p.id === participantId)
    if (!participant) return

    setRooms(rooms.map(r => 
      r.id === roomId 
        ? { ...r, participants: r.participants.filter(p => p.id !== participantId) }
        : r
    ))
    setUnassignedParticipants([...unassignedParticipants, participant])
  }

  const autoAssign = () => {
    const shuffled = [...unassignedParticipants].sort(() => Math.random() - 0.5)
    const newRooms = rooms.map((room, index) => ({
      ...room,
      participants: shuffled.filter((_, i) => i % rooms.length === index)
    }))
    
    setRooms(newRooms)
    setUnassignedParticipants([])
    toast.success('Participants auto-assigned!')
  }

  const broadcastMessage = (roomId: string) => {
    toast.success(`Message broadcast to ${rooms.find(r => r.id === roomId)?.name}`)
  }

  const closeAllRooms = () => {
    const allParticipants = rooms.flatMap(r => r.participants)
    setUnassignedParticipants([...unassignedParticipants, ...allParticipants])
    setRooms(rooms.map(r => ({ ...r, participants: [] })))
    setIsActive(false)
    toast.success('All breakout rooms closed')
  }

  const startBreakout = () => {
    const emptyRooms = rooms.filter(r => r.participants.length === 0)
    if (emptyRooms.length > 0) {
      toast.error(`${emptyRooms.length} room(s) have no participants`)
      return
    }
    
    setIsActive(true)
    toast.success('Breakout rooms started!')
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          <Users className="w-5 h-5" />
          Breakout Rooms
        </DialogTitle>
        <DialogDescription>
          Divide participants into smaller discussion groups
        </DialogDescription>
      </DialogHeader>

      <div className="py-4 space-y-4">
        {/* Controls */}
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={addRoom}>
            <Plus className="w-4 h-4 mr-1" />
            Add Room
          </Button>
          <Button variant="outline" size="sm" onClick={autoAssign} disabled={unassignedParticipants.length === 0}>
            <Shuffle className="w-4 h-4 mr-1" />
            Auto Assign
          </Button>
          <div className="flex-1" />
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-500" />
            <Select value={defaultDuration.toString()} onValueChange={(v) => setDefaultDuration(parseInt(v))}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5 minutes</SelectItem>
                <SelectItem value="10">10 minutes</SelectItem>
                <SelectItem value="15">15 minutes</SelectItem>
                <SelectItem value="20">20 minutes</SelectItem>
                <SelectItem value="30">30 minutes</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 h-[400px]">
          {/* Unassigned Participants */}
          <div className="border rounded-lg flex flex-col">
            <div className="p-3 border-b bg-gray-50">
              <h4 className="font-medium text-sm">
                Unassigned ({unassignedParticipants.length})
              </h4>
            </div>
            <ScrollArea className="flex-1 p-2">
              <div className="space-y-1">
                {unassignedParticipants.map(participant => (
                  <div
                    key={participant.id}
                    className="flex items-center justify-between p-2 rounded hover:bg-gray-50"
                  >
                    <span className="text-sm">{participant.name}</span>
                    <Select onValueChange={(roomId) => assignParticipant(participant.id, roomId)}>
                      <SelectTrigger className="w-24 h-7 text-xs">
                        <SelectValue placeholder="Assign" />
                      </SelectTrigger>
                      <SelectContent>
                        {rooms.map(room => (
                          <SelectItem key={room.id} value={room.id}>{room.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                ))}
                {unassignedParticipants.length === 0 && (
                  <p className="text-sm text-gray-400 text-center py-4">All assigned</p>
                )}
              </div>
            </ScrollArea>
          </div>

          {/* Rooms */}
          <div className="border rounded-lg flex flex-col">
            <ScrollArea className="flex-1 p-2">
              <div className="space-y-3">
                {rooms.map((room, index) => (
                  <div 
                    key={room.id} 
                    className={cn(
                      "border rounded-lg p-3",
                      isActive && "bg-green-50 border-green-200"
                    )}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Input
                          value={room.name}
                          onChange={(e) => setRooms(rooms.map(r => 
                            r.id === room.id ? { ...r, name: e.target.value } : r
                          ))}
                          className="h-7 text-sm font-medium w-32"
                        />
                        <Badge variant="secondary" className="text-xs">
                          {room.participants.length}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => broadcastMessage(room.id)}
                        >
                          <MessageSquare className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-red-500"
                          onClick={() => removeRoom(room.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <Input
                      placeholder="Discussion topic..."
                      className="text-sm mb-2"
                      value={room.topic || ''}
                      onChange={(e) => setRooms(rooms.map(r => 
                        r.id === room.id ? { ...r, topic: e.target.value } : r
                      ))}
                    />

                    <div className="space-y-1">
                      {room.participants.map(participant => (
                        <div
                          key={participant.id}
                          className="flex items-center justify-between p-1.5 bg-white rounded text-sm"
                        >
                          <span>{participant.name}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => removeParticipantFromRoom(participant.id, room.id)}
                          >
                            <ArrowLeft className="w-3 h-3" />
                          </Button>
                        </div>
                      ))}
                      {room.participants.length === 0 && (
                        <p className="text-xs text-gray-400 text-center py-2">No participants</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>

        {/* Status */}
        {isActive && (
          <div className="p-3 bg-green-50 border border-green-200 rounded-lg flex items-center justify-between">
            <div>
              <p className="font-medium text-green-800">Breakout rooms are active</p>
              <p className="text-sm text-green-600">
                {rooms.reduce((sum, r) => sum + r.participants.length, 0)} participants in {rooms.length} rooms
              </p>
            </div>
            <Button variant="destructive" size="sm" onClick={closeAllRooms}>
              Close All Rooms
            </Button>
          </div>
        )}
      </div>

      <DialogFooter>
        <Button variant="outline" onClick={onClose}>Close</Button>
        {!isActive ? (
          <Button 
            onClick={startBreakout}
            disabled={rooms.some(r => r.participants.length === 0)}
          >
            <ArrowRight className="w-4 h-4 mr-2" />
            Start Breakout
          </Button>
        ) : (
          <Button variant="destructive" onClick={closeAllRooms}>
            End All Rooms
          </Button>
        )}
      </DialogFooter>
    </>
  )
}
