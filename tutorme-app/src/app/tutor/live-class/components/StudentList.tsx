'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import type { LiveStudent, BreakoutRoom } from '../types'
import { 
  Users, 
  Hand, 
  MoreVertical, 
  MicOff, 
  VideoOff, 
  MessageCircle,
  UserPlus,
  LogOut,
  Search,
  Filter
} from 'lucide-react'

interface StudentListProps {
  students: LiveStudent[]
  breakoutRooms: BreakoutRoom[]
  onCallOn?: (studentId: string) => void
  onAssignToRoom?: (studentId: string, roomId: string) => void
  onRemoveFromRoom?: (studentId: string) => void
}

export function StudentList({ 
  students, 
  breakoutRooms,
  onCallOn,
  onAssignToRoom,
  onRemoveFromRoom
}: StudentListProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'online' | 'away' | 'hand-raised'>('all')

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filterStatus === 'all' || 
      (filterStatus === 'online' && student.status === 'online') ||
      (filterStatus === 'away' && (student.status === 'idle' || student.status === 'away')) ||
      (filterStatus === 'hand-raised' && student.handRaised)
    return matchesSearch && matchesFilter
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500'
      case 'idle': return 'bg-yellow-500'
      case 'away': return 'bg-orange-500'
      case 'offline': return 'bg-gray-400'
      default: return 'bg-gray-400'
    }
  }

  const getEngagementColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-blue-600'
    if (score >= 40) return 'text-yellow-600'
    return 'text-red-600'
  }

  const onlineCount = students.filter(s => s.status === 'online').length
  const handRaisedCount = students.filter(s => s.handRaised).length

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            <CardTitle className="text-sm font-medium">Students</CardTitle>
            <Badge variant="secondary" className="text-xs">
              {onlineCount}/{students.length}
            </Badge>
          </div>
          {handRaisedCount > 0 && (
            <Badge variant="destructive" className="gap-1">
              <Hand className="w-3 h-3" />
              {handRaisedCount}
            </Badge>
          )}
        </div>

        {/* Search and Filter */}
        <div className="flex gap-2 mt-3">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search students..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-9"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="h-9 w-9">
                <Filter className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setFilterStatus('all')}>
                All Students
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterStatus('online')}>
                Online Only
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterStatus('away')}>
                Idle/Away
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterStatus('hand-raised')}>
                Hand Raised
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="flex-1 p-0">
        <ScrollArea className="h-[calc(100%-100px)]">
          <div className="space-y-1 px-4 pb-4">
            {filteredStudents.length === 0 ? (
              <div className="text-center py-8">
                <Users className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                <p className="text-sm text-gray-500">No students found</p>
              </div>
            ) : (
              filteredStudents.map((student) => (
                <div
                  key={student.id}
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-lg border transition-all",
                    student.handRaised 
                      ? "bg-yellow-50 border-yellow-200" 
                      : "bg-white border-gray-100 hover:border-gray-200"
                  )}
                >
                  {/* Avatar with Status */}
                  <div className="relative">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="bg-blue-100 text-blue-700 text-sm">
                        {student.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <span className={cn(
                      "absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white",
                      getStatusColor(student.status)
                    )} />
                  </div>

                  {/* Student Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm truncate">{student.name}</span>
                      {student.handRaised && (
                        <Hand className="w-4 h-4 text-yellow-600 animate-pulse" />
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span className={cn("font-medium", getEngagementColor(student.engagementScore))}>
                        {student.engagementScore}% engaged
                      </span>
                      {student.breakoutRoomId && (
                        <span className="text-blue-600">
                          {breakoutRooms.find(r => r.id === student.breakoutRoomId)?.name}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1">
                    {student.handRaised && (
                      <Button 
                        size="sm" 
                        variant="ghost"
                        className="h-8 text-yellow-700 hover:text-yellow-800 hover:bg-yellow-100"
                        onClick={() => onCallOn?.(student.id)}
                      >
                        Call On
                      </Button>
                    )}
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onCallOn?.(student.id)}>
                          <MessageCircle className="w-4 h-4 mr-2" />
                          Send Message
                        </DropdownMenuItem>
                        
                        {breakoutRooms.length > 0 && !student.breakoutRoomId && (
                          <DropdownMenuItem asChild>
                            <div className="relative">
                              <UserPlus className="w-4 h-4 mr-2" />
                              Assign to Room
                              <div className="absolute left-full top-0 ml-1 bg-white border rounded-lg shadow-lg p-1 min-w-[120px]">
                                {breakoutRooms.map(room => (
                                  <button
                                    key={room.id}
                                    className="w-full text-left px-2 py-1 text-sm hover:bg-gray-100 rounded"
                                    onClick={() => onAssignToRoom?.(student.id, room.id)}
                                  >
                                    {room.name}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </DropdownMenuItem>
                        )}
                        
                        {student.breakoutRoomId && (
                          <DropdownMenuItem onClick={() => onRemoveFromRoom?.(student.id)}>
                            <LogOut className="w-4 h-4 mr-2" />
                            Remove from Room
                          </DropdownMenuItem>
                        )}
                        
                        <DropdownMenuItem className="text-red-600">
                          <MicOff className="w-4 h-4 mr-2" />
                          Mute
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
