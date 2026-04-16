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
import type { LiveStudent } from '@/types/live-session'
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
  Filter,
  Lightbulb,
  Bell,
  LayoutGrid,
} from 'lucide-react'

interface StudentListProps {
  students: LiveStudent[]
  // breakoutRooms removed - feature deleted
  onCallOn?: (studentId: string) => void
  // onAssignToRoom, onRemoveFromRoom removed - feature deleted
  onPushHint?: (studentId: string, hint: string, type?: 'socratic' | 'encouragement') => void
  onSendNudge?: (studentId: string) => void
  // onInviteToBreakout removed - feature deleted
}

export function StudentList({ students, onCallOn, onPushHint, onSendNudge }: StudentListProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'online' | 'away' | 'hand-raised'>('all')

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter =
      filterStatus === 'all' ||
      (filterStatus === 'online' && student.status === 'online') ||
      (filterStatus === 'away' && (student.status === 'idle' || student.status === 'away')) ||
      (filterStatus === 'hand-raised' && student.handRaised)
    return matchesSearch && matchesFilter
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'bg-green-500'
      case 'idle':
        return 'bg-yellow-500'
      case 'away':
        return 'bg-orange-500'
      case 'offline':
        return 'bg-gray-400'
      default:
        return 'bg-gray-400'
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
    <Card className="flex h-full flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <CardTitle className="text-sm font-medium">Students</CardTitle>
            <Badge variant="secondary" className="text-xs">
              {onlineCount}/{students.length}
            </Badge>
          </div>
          {handRaisedCount > 0 && (
            <Badge variant="destructive" className="gap-1">
              <Hand className="h-3 w-3" />
              {handRaisedCount}
            </Badge>
          )}
        </div>

        {/* Search and Filter */}
        <div className="mt-3 flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search students..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="h-9 pl-9"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="h-9 w-9">
                <Filter className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setFilterStatus('all')}>
                All Students
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterStatus('online')}>
                Online Only
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterStatus('away')}>Idle/Away</DropdownMenuItem>
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
              <div className="py-8 text-center">
                <Users className="mx-auto mb-2 h-10 w-10 text-gray-300" />
                <p className="text-sm text-gray-500">No students found</p>
              </div>
            ) : (
              filteredStudents.map(student => (
                <div
                  key={student.id}
                  className={cn(
                    'flex items-center gap-3 rounded-lg border p-3 transition-all',
                    student.handRaised
                      ? 'border-yellow-200 bg-yellow-50'
                      : 'border-gray-100 bg-white hover:border-gray-200'
                  )}
                >
                  {/* Avatar with Status */}
                  <div className="relative">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-blue-100 text-sm text-blue-700">
                        {student.name
                          .split(' ')
                          .map(n => n[0])
                          .join('')}
                      </AvatarFallback>
                    </Avatar>
                    <span
                      className={cn(
                        'absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white',
                        getStatusColor(student.status)
                      )}
                    />
                  </div>

                  {/* Student Info */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="truncate text-sm font-medium">{student.name}</span>
                      {student.handRaised && (
                        <Hand className="h-4 w-4 animate-pulse text-yellow-600" />
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span
                        className={cn('font-medium', getEngagementColor(student.engagementScore))}
                      >
                        {student.engagementScore}% engaged
                      </span>
                      {/* BREAKOUT ROOM FEATURE REMOVED - breakout room display deleted */}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1">
                    {student.handRaised && (
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 text-yellow-700 hover:bg-yellow-100 hover:text-yellow-800"
                        onClick={() => onCallOn?.(student.id)}
                      >
                        Call On
                      </Button>
                    )}

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onCallOn?.(student.id)}>
                          <MessageCircle className="mr-2 h-4 w-4" />
                          Send Message
                        </DropdownMenuItem>

                        {/* BREAKOUT ROOM FEATURE REMOVED - assign/remove from room deleted */}

                        <DropdownMenuItem
                          onClick={() =>
                            onPushHint?.(
                              student.id,
                              'Remember to think about the key concept we discussed.',
                              'socratic'
                            )
                          }
                        >
                          <Lightbulb className="mr-2 h-4 w-4" />
                          Send Socratic Hint
                        </DropdownMenuItem>

                        <DropdownMenuItem onClick={() => onSendNudge?.(student.id)}>
                          <Bell className="mr-2 h-4 w-4" />
                          Send Nudge
                        </DropdownMenuItem>

                        {/* BREAKOUT ROOM FEATURE REMOVED - invite to breakout deleted */}

                        <DropdownMenuItem className="text-red-600">
                          <MicOff className="mr-2 h-4 w-4" />
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
