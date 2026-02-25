'use client'

import { useState, useRef, useEffect, useMemo } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import type { BreakoutRoom, LiveStudent, ChatMessage } from '../types'
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
  Send,
  Crown,
  Timer,
  AlertCircle,
} from 'lucide-react'

interface BreakoutRoomModalProps {
  room: BreakoutRoom | null
  isOpen: boolean
  onClose: () => void
  onEndRoom?: (roomId: string) => void
  onBroadcast?: (roomId: string, message: string) => void
  onExtendTime?: (roomId: string, minutes: number) => void
}

export function BreakoutRoomModal({
  room,
  isOpen,
  onClose,
  onEndRoom,
  onBroadcast,
  onExtendTime
}: BreakoutRoomModalProps) {
  const [activeTab, setActiveTab] = useState('video')
  const [messagesByRoomId, setMessagesByRoomId] = useState<Record<string, ChatMessage[]>>({})
  const [newMessage, setNewMessage] = useState('')
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOff, setIsVideoOff] = useState(false)
  const [isScreenSharing, setIsScreenSharing] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messages = useMemo(
    () => (room ? (messagesByRoomId[room.id] ?? []) : []),
    [room, messagesByRoomId]
  )

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  if (!room) return null

  const handleSendMessage = () => {
    if (!newMessage.trim()) return
    
    const message: ChatMessage = {
      id: `tutor-msg-${Date.now()}`,
      studentId: 'tutor',
      studentName: 'You (Tutor)',
      content: newMessage,
      timestamp: new Date().toISOString(),
      sentiment: 'neutral'
    }
    
    setMessagesByRoomId((prev) => ({
      ...prev,
      [room.id]: [...(prev[room.id] || []), message],
    }))
    setNewMessage('')
    
    // Also broadcast to room if callback provided
    onBroadcast?.(room.id, newMessage)
  }

  const handleEndRoom = () => {
    if (confirm(`Are you sure you want to end ${room.name}? All students will return to the main room.`)) {
      onEndRoom?.(room.id)
      onClose()
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-6xl w-[95vw] h-[90vh] p-0 gap-0 overflow-hidden">
        {/* Header */}
        <DialogHeader className="px-6 py-4 border-b bg-slate-900 text-white shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <DialogTitle className="text-white text-lg flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-400" />
                {room.name}
              </DialogTitle>
              <Badge variant="secondary" className="bg-green-600/50 text-white">
                Active
              </Badge>
              {room.topic && (
                <span className="text-sm text-slate-400">
                  Topic: {room.topic}
                </span>
              )}
            </div>
            
            <div className="flex items-center gap-3">
              {/* Timer */}
              <div className={cn(
                "flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium",
                room.timeRemaining < 60 ? "bg-red-600/50 text-white" : "bg-slate-800 text-slate-300"
              )}>
                <Timer className="h-4 w-4" />
                {formatTime(room.timeRemaining)}
              </div>
              
              {/* Extend Time Button */}
              <Button
                variant="outline"
                size="sm"
                className="border-slate-600 text-slate-300 hover:bg-slate-800"
                onClick={() => onExtendTime?.(room.id, 5)}
              >
                +5m
              </Button>
              
              {/* End Room Button */}
              <Button
                variant="destructive"
                size="sm"
                onClick={handleEndRoom}
                className="gap-1"
              >
                <PhoneOff className="h-4 w-4" />
                End Room
              </Button>
            </div>
          </div>
        </DialogHeader>

        {/* Main Content */}
        <div className="flex flex-1 overflow-hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
            <div className="border-b bg-slate-950 px-4">
              <TabsList className="bg-transparent h-12">
                <TabsTrigger 
                  value="video" 
                  className="data-[state=active]:bg-slate-800 text-slate-400 data-[state=active]:text-white gap-2"
                >
                  <Video className="h-4 w-4" />
                  Video
                </TabsTrigger>
                <TabsTrigger 
                  value="chat"
                  className="data-[state=active]:bg-slate-800 text-slate-400 data-[state=active]:text-white gap-2"
                >
                  <MessageSquare className="h-4 w-4" />
                  Chat
                  {messages.filter(m => m.isQuestion).length > 0 && (
                    <span className="bg-yellow-600 text-white text-xs px-1.5 py-0.5 rounded-full">
                      ?
                    </span>
                  )}
                </TabsTrigger>
                <TabsTrigger 
                  value="students"
                  className="data-[state=active]:bg-slate-800 text-slate-400 data-[state=active]:text-white gap-2"
                >
                  <Users className="h-4 w-4" />
                  Students ({room.participants.filter(p => p.role === 'student').length})
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Video Tab */}
            <TabsContent value="video" className="flex-1 m-0 flex flex-col bg-slate-950">
              <div className="flex-1 p-4 overflow-auto">
                {/* Video Grid */}
                <div className={cn(
                  "grid gap-3 h-full",
                  room.participants.filter(p => p.role === 'student').length === 0 ? "grid-cols-1" :
                  room.participants.filter(p => p.role === 'student').length === 1 ? "grid-cols-1" :
                  room.participants.filter(p => p.role === 'student').length === 2 ? "grid-cols-2" :
                  room.participants.filter(p => p.role === 'student').length <= 4 ? "grid-cols-2" :
                  "grid-cols-3"
                )}>
                  {/* Tutor Video (Self) */}
                  <div className="relative bg-slate-800 rounded-xl overflow-hidden aspect-video flex items-center justify-center border-2 border-blue-500">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Crown className="h-10 w-10 text-white" />
                      </div>
                      <p className="text-white font-medium">You (Tutor)</p>
                      <Badge variant="outline" className="mt-1 text-blue-400 border-blue-400">
                        Host
                      </Badge>
                    </div>
                    
                    {/* Self view controls */}
                    <div className="absolute bottom-3 left-3 flex gap-2">
                      {isMuted && (
                        <div className="bg-red-600 p-1.5 rounded-full">
                          <MicOff className="h-4 w-4 text-white" />
                        </div>
                      )}
                      {isVideoOff && (
                        <div className="bg-red-600 p-1.5 rounded-full">
                          <VideoOff className="h-4 w-4 text-white" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Student Videos */}
                  {room.participants.filter(p => p.role === 'student').map((participant, index) => (
                    <StudentVideoTile 
                      key={participant.userId} 
                      student={{
                        id: participant.userId,
                        name: participant.name,
                        status: participant.isOnline ? 'online' : 'offline',
                        engagementScore: participant.engagementScore,
                        attentionLevel: participant.attentionLevel,
                        handRaised: participant.handRaised,
                        lastActive: new Date().toISOString(),
                        joinedAt: participant.joinedAt,
                        reactions: 0,
                        chatMessages: 0
                      }} 
                      index={index}
                    />
                  ))}

                  {/* Empty slots */}
                  {room.participants.filter(p => p.role === 'student').length === 0 && (
                    <div className="bg-slate-800 rounded-xl flex items-center justify-center aspect-video">
                      <div className="text-center text-slate-500">
                        <Users className="h-12 w-12 mx-auto mb-2 opacity-50" />
                        <p>No students in this room yet</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Media Controls */}
              <div className="px-6 py-4 bg-slate-900 border-t flex items-center justify-center gap-4">
                <Button
                  variant={isMuted ? 'destructive' : 'outline'}
                  size="icon"
                  onClick={() => setIsMuted(!isMuted)}
                  className="h-12 w-12 rounded-full"
                >
                  {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                </Button>
                
                <Button
                  variant={isVideoOff ? 'destructive' : 'outline'}
                  size="icon"
                  onClick={() => setIsVideoOff(!isVideoOff)}
                  className="h-12 w-12 rounded-full"
                >
                  {isVideoOff ? <VideoOff className="h-5 w-5" /> : <Video className="h-5 w-5" />}
                </Button>
                
                <Button
                  variant={isScreenSharing ? 'default' : 'outline'}
                  size="icon"
                  onClick={() => setIsScreenSharing(!isScreenSharing)}
                  className={cn(
                    "h-12 w-12 rounded-full",
                    isScreenSharing && "bg-blue-600"
                  )}
                >
                  {isScreenSharing ? <MonitorOff className="h-5 w-5" /> : <MonitorUp className="h-5 w-5" />}
                </Button>
                
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={handleEndRoom}
                  className="h-12 w-12 rounded-full"
                >
                  <PhoneOff className="h-5 w-5" />
                </Button>
              </div>
            </TabsContent>

            {/* Chat Tab */}
            <TabsContent value="chat" className="flex-1 m-0 flex flex-col bg-slate-950">
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.length === 0 ? (
                    <div className="text-center text-slate-500 py-8">
                      <MessageSquare className="h-12 w-12 mx-auto mb-2 opacity-50" />
                      <p>No messages yet</p>
                      <p className="text-sm">Start the conversation!</p>
                    </div>
                  ) : (
                    messages.map((message) => (
                      <ChatMessageItem 
                        key={message.id} 
                        message={message}
                        isTutor={message.studentId === 'tutor'}
                      />
                    ))
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>
              
              {/* Message Input */}
              <div className="p-4 bg-slate-900 border-t">
                <div className="flex gap-2">
                  <Input
                    placeholder="Type a message to the room..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="bg-slate-800 border-slate-700 text-white"
                  />
                  <Button 
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    className="gap-2"
                  >
                    <Send className="h-4 w-4" />
                    Send
                  </Button>
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  Your messages will be visible to all students in this room
                </p>
              </div>
            </TabsContent>

            {/* Students Tab */}
            <TabsContent value="students" className="flex-1 m-0 bg-slate-950">
              <ScrollArea className="h-full p-4">
                <div className="space-y-2">
                  {room.participants.filter(p => p.role === 'student').length === 0 ? (
                    <div className="text-center text-slate-500 py-8">
                      <Users className="h-12 w-12 mx-auto mb-2 opacity-50" />
                      <p>No students in this room</p>
                    </div>
                  ) : (
                    room.participants.filter(p => p.role === 'student').map((participant) => (
                      <StudentListItem 
                        key={participant.userId} 
                        student={{
                          id: participant.userId,
                          name: participant.name,
                          status: participant.isOnline ? 'online' : 'offline',
                          engagementScore: participant.engagementScore,
                          attentionLevel: participant.attentionLevel,
                          handRaised: participant.handRaised,
                          lastActive: new Date().toISOString(),
                          joinedAt: participant.joinedAt,
                          reactions: 0,
                          chatMessages: 0
                        }} 
                      />
                    ))
                  )}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// Student Video Tile Component
function StudentVideoTile({ student, index }: { student: LiveStudent; index: number }) {
  const colors = ['bg-red-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500', 'bg-pink-500', 'bg-indigo-500']
  const bgColor = colors[index % colors.length]
  
  return (
    <div className="relative bg-slate-800 rounded-xl overflow-hidden aspect-video flex items-center justify-center">
      {/* Avatar placeholder */}
      <div className="text-center">
        <div className={cn("w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-2", bgColor)}>
          <span className="text-white text-xl font-bold">
            {student.name.charAt(0).toUpperCase()}
          </span>
        </div>
        <p className="text-white font-medium text-sm">{student.name}</p>
        <div className="flex items-center justify-center gap-1 mt-1">
          <span className={cn(
            "w-2 h-2 rounded-full",
            student.status === 'online' ? "bg-green-500" : "bg-gray-500"
          )} />
          <span className="text-xs text-slate-400">
            {student.status === 'online' ? 'Online' : 'Offline'}
          </span>
        </div>
      </div>
      
      {/* Engagement indicator */}
      <div className="absolute top-3 right-3">
        <Badge 
          variant="outline" 
          className={cn(
            "text-xs",
            student.engagementScore >= 80 ? "bg-green-600/50 text-green-400 border-green-500" :
            student.engagementScore >= 50 ? "bg-yellow-600/50 text-yellow-400 border-yellow-500" :
            "bg-red-600/50 text-red-400 border-red-500"
          )}
        >
          {student.engagementScore}% engaged
        </Badge>
      </div>
      
      {/* Hand raised indicator */}
      {student.handRaised && (
        <div className="absolute bottom-3 right-3 bg-yellow-600 p-2 rounded-full animate-pulse">
          <AlertCircle className="h-4 w-4 text-white" />
        </div>
      )}
    </div>
  )
}

// Chat Message Item Component
function ChatMessageItem({ message, isTutor }: { message: ChatMessage; isTutor: boolean }) {
  return (
    <div className={cn(
      "flex gap-3",
      isTutor && "flex-row-reverse"
    )}>
      <div className={cn(
        "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0",
        isTutor ? "bg-blue-600 text-white" : "bg-slate-700 text-slate-300"
      )}>
        {message.studentName.charAt(0).toUpperCase()}
      </div>
      <div className={cn(
        "max-w-[70%]",
        isTutor && "text-right"
      )}>
        <div className="flex items-center gap-2 mb-1">
          <span className={cn(
            "text-sm font-medium",
            isTutor ? "text-blue-400" : "text-slate-300"
          )}>
            {message.studentName}
          </span>
          <span className="text-xs text-slate-500">
            {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
        <div className={cn(
          "inline-block px-3 py-2 rounded-lg text-sm text-left",
          isTutor ? "bg-blue-600 text-white" : "bg-slate-800 text-slate-200",
          message.isQuestion && !isTutor && "border-l-4 border-yellow-500"
        )}>
          {message.content}
        </div>
      </div>
    </div>
  )
}

// Student List Item Component
function StudentListItem({ student }: { student: LiveStudent }) {
  return (
    <div className="flex items-center justify-between p-3 bg-slate-800 rounded-lg">
      <div className="flex items-center gap-3">
        <div className={cn(
          "w-10 h-10 rounded-full flex items-center justify-center font-bold",
          student.status === 'online' ? "bg-green-600" : "bg-slate-600"
        )}>
          {student.name.charAt(0).toUpperCase()}
        </div>
        <div>
          <p className="text-white font-medium">{student.name}</p>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className={cn(
              "w-2 h-2 rounded-full",
              student.status === 'online' ? "bg-green-500" : "bg-gray-500"
            )} />
            {student.status === 'online' ? 'Online' : 'Offline'}
            {student.handRaised && (
              <span className="text-yellow-400 flex items-center gap-1">
                • Hand raised
              </span>
            )}
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <Badge 
          variant="outline" 
          className={cn(
            "text-xs",
            student.engagementScore >= 80 ? "text-green-400 border-green-500" :
            student.engagementScore >= 50 ? "text-yellow-400 border-yellow-500" :
            "text-red-400 border-red-500"
          )}
        >
          {student.engagementScore}% engaged
        </Badge>
        
        {student.attentionLevel === 'low' && (
          <Badge variant="outline" className="text-xs text-red-400 border-red-500">
            Attention
          </Badge>
        )}
      </div>
    </div>
  )
}
