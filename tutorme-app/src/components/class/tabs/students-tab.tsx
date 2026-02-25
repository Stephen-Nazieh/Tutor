'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { 
  Users, 
  MoreVertical, 
  Mic, 
  MicOff, 
  MessageSquare,
  UserX,
  Award,
  Search,
  SignalHigh,
  SignalMedium,
  SignalLow
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useSocket } from '@/hooks/use-socket'

interface Student {
  id: string
  name: string
  isOnline: boolean
  isMuted: boolean
  hasCameraOn: boolean
  engagementScore: number
  attentionLevel: 'focused' | 'neutral' | 'distracted'
  handRaised: boolean
  speakingTime: number
  messagesCount: number
}

interface StudentsTabProps {
  sessionId: string
}

export function StudentsTab({ sessionId }: StudentsTabProps) {
  const [students, setStudents] = useState<Student[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [filter, setFilter] = useState<'all' | 'online' | 'raised-hand' | 'low-engagement'>('all')
  const { socket } = useSocket()

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await fetch(`/api/class/${sessionId}/students`)
        if (res.ok) {
          const data = await res.json()
          setStudents(data.students)
        }
      } catch (error) {
        console.error('Failed to fetch students:', error)
        setStudents([
          { id: '1', name: 'Alice Zhang', isOnline: true, isMuted: false, hasCameraOn: true, engagementScore: 85, attentionLevel: 'focused', handRaised: false, speakingTime: 120, messagesCount: 3 },
          { id: '2', name: 'Bob Li', isOnline: true, isMuted: true, hasCameraOn: false, engagementScore: 45, attentionLevel: 'distracted', handRaised: true, speakingTime: 0, messagesCount: 1 },
          { id: '3', name: 'Carol Wang', isOnline: true, isMuted: false, hasCameraOn: true, engagementScore: 92, attentionLevel: 'focused', handRaised: false, speakingTime: 180, messagesCount: 5 },
        ])
      }
    }
    fetchStudents()
  }, [sessionId])

  useEffect(() => {
    if (!socket) return

    socket.on('student:status-change', (update: { studentId: string, status: Partial<Student> }) => {
      setStudents(prev => prev.map(s => 
        s.id === update.studentId ? { ...s, ...update.status } : s
      ))
    })

    return () => {
      socket.off('student:status-change')
    }
  }, [socket])

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = 
      filter === 'all' ? true :
      filter === 'online' ? student.isOnline :
      filter === 'raised-hand' ? student.handRaised :
      filter === 'low-engagement' ? student.engagementScore < 50 :
      true
    return matchesSearch && matchesFilter
  })

  const handleMuteToggle = (studentId: string) => {
    socket?.emit('student:mute-toggle', { sessionId, studentId })
  }

  const handleRemoveStudent = (studentId: string) => {
    if (!confirm('Remove this student from the session?')) return
    socket?.emit('student:remove', { sessionId, studentId })
  }

  const handleAwardPoints = (studentId: string) => {
    socket?.emit('student:award-points', { sessionId, studentId, points: 10 })
  }

  const handleSendMessage = (studentId: string) => {
    const message = prompt('Send direct message:')
    if (message) {
      socket?.emit('chat:direct-message', { sessionId, studentId, message })
    }
  }

  const getEngagementIcon = (score: number) => {
    if (score >= 80) return <SignalHigh className="h-4 w-4 text-green-500" />
    if (score >= 50) return <SignalMedium className="h-4 w-4 text-yellow-500" />
    return <SignalLow className="h-4 w-4 text-red-500" />
  }

  const onlineCount = students.filter(s => s.isOnline).length
  const totalEngagement = students.length > 0 
    ? Math.round(students.reduce((acc, s) => acc + s.engagementScore, 0) / students.length)
    : 0

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">{onlineCount}/{students.length}</p>
                <p className="text-xs text-gray-500">Students Online</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              {getEngagementIcon(totalEngagement)}
              <div>
                <p className="text-2xl font-bold">{totalEngagement}%</p>
                <p className="text-xs text-gray-500">Avg Engagement</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center">
                <span className="text-white text-xs">✋</span>
              </div>
              <div>
                <p className="text-2xl font-bold">{students.filter(s => s.handRaised).length}</p>
                <p className="text-xs text-gray-500">Hands Raised</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search students..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as any)}
          className="px-3 py-2 border rounded-md text-sm"
        >
          <option value="all">All Students</option>
          <option value="online">Online Only</option>
          <option value="raised-hand">Raised Hand</option>
          <option value="low-engagement">Low Engagement (&lt;50%)</option>
        </select>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Students ({filteredStudents.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {filteredStudents.map((student) => (
              <div
                key={student.id}
                className={cn(
                  'flex items-center gap-3 p-3 rounded-lg border',
                  student.handRaised ? 'bg-yellow-50 border-yellow-200' : 'bg-white border-gray-200'
                )}
              >
                <div className="relative">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-blue-100 text-blue-700">
                      {student.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  {student.isOnline && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-medium truncate">{student.name}</p>
                    {student.handRaised && (
                      <Badge className="bg-yellow-500 text-white text-xs">✋ Raised Hand</Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge className={cn('text-xs',
                      student.attentionLevel === 'focused' ? 'bg-green-100 text-green-700' :
                      student.attentionLevel === 'neutral' ? 'bg-gray-100 text-gray-700' :
                      'bg-red-100 text-red-700'
                    )}>
                      {student.attentionLevel}
                    </Badge>
                    <span className="text-xs text-gray-500">
                      {Math.floor(student.speakingTime / 60)}m spoken
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  {student.isMuted ? (
                    <MicOff className="h-4 w-4 text-red-400" />
                  ) : (
                    <Mic className="h-4 w-4 text-green-500" />
                  )}
                  {getEngagementIcon(student.engagementScore)}

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleMuteToggle(student.id)}>
                        {student.isMuted ? <Mic className="h-4 w-4 mr-2" /> : <MicOff className="h-4 w-4 mr-2" />}
                        {student.isMuted ? 'Unmute' : 'Mute'}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleSendMessage(student.id)}>
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Send Message
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleAwardPoints(student.id)}>
                        <Award className="h-4 w-4 mr-2" />
                        Award Points
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => handleRemoveStudent(student.id)}
                        className="text-red-600"
                      >
                        <UserX className="h-4 w-4 mr-2" />
                        Remove from Session
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
