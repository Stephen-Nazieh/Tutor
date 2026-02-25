'use client'

import { useState, useRef, useEffect, useMemo } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'
import type { BreakoutRoom, BreakoutParticipant, BreakoutMessage } from '../../types'
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
  Brain,
  HelpCircle,
  Hand,
} from 'lucide-react'

interface UnifiedBreakoutModalProps {
  room: BreakoutRoom | null
  isOpen: boolean
  userId: string
  userName: string
  role: 'tutor' | 'student'
  onClose: () => void
  onEndRoom?: (roomId: string) => void
  onExtendTime?: (roomId: string, minutes: number) => void
  onSendMessage?: (roomId: string, content: string, type?: 'text' | 'question') => void
  onRequestHelp?: (roomId: string) => void
  onRaiseHand?: (roomId: string, raised: boolean) => void
}

export function UnifiedBreakoutModal({
  room,
  isOpen,
  userId,
  userName,
  role,
  onClose,
  onEndRoom,
  onExtendTime,
  onSendMessage,
  onRequestHelp,
  onRaiseHand
}: UnifiedBreakoutModalProps) {
  const [activeTab, setActiveTab] = useState('video')
  const [messagesByRoomId, setMessagesByRoomId] = useState<Record<string, BreakoutMessage[]>>({})
  const [newMessage, setNewMessage] = useState('')
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOff, setIsVideoOff] = useState(false)
  const [isScreenSharing, setIsScreenSharing] = useState(false)
  const [handRaised, setHandRaised] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messages = useMemo(
    () => (room ? (messagesByRoomId[room.id] ?? room.messages) : []),
    [room, messagesByRoomId]
  )

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  if (!room) return null

  const isTutor = role === 'tutor'

  const handleSendMessage = () => {
    if (!newMessage.trim()) return
    
    const message: BreakoutMessage = {
      id: `msg-${Date.now()}`,
      roomId: room.id,
      senderId: userId,
      senderName: userName,
      senderRole: role,
      content: newMessage,
      timestamp: new Date().toISOString(),
      type: 'text'
    }
    
    setMessagesByRoomId((prev) => ({
      ...prev,
      [room.id]: [...(prev[room.id] || room.messages), message],
    }))
    onSendMessage?.(room.id, newMessage)
    setNewMessage('')
  }

  const handleRequestHelp = () => {
    onRequestHelp?.(room.id)
    toast.success('Help request sent to tutor')
  }

  const handleRaiseHand = () => {
    const newState = !handRaised
    setHandRaised(newState)
    onRaiseHand?.(room.id, newState)
    if (newState) {
      toast.success('Hand raised')
    }
  }

  const handleEndRoom = () => {
    if (confirm(`Are you sure you want to end ${room.name}? All participants will return to the main room.`)) {
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
        <DialogHeader className="px-6 py-4 border-b bg-white shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <DialogTitle className="text-gray-900 text-lg flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-600" />
                {room.name}
              </DialogTitle>
              <Badge variant="secondary" className={cn(
                room.status === 'active' ? "bg-green-100 text-green-700" :
                room.status === 'forming' ? "bg-blue-100 text-blue-700" :
                "bg-gray-100 text-gray-700"
              )}>
                {room.status.charAt(0).toUpperCase() + room.status.slice(1)}
              </Badge>
              {room.aiEnabled && (
                <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                  <Brain className="h-3 w-3 mr-1" />
                  AI Active
                </Badge>
              )}
              {room.assignedTask && (
                <span className="text-sm text-gray-500">
                  Task: {room.assignedTask.title}
                </span>
              )}
            </div>
            
            <div className="flex items-center gap-3">
              {/* Timer */}
              <div className={cn(
                "flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium",
                room.timeRemaining < 60 ? "bg-red-100 text-red-700" : "bg-gray-100 text-gray-700"
              )}>
                <Timer className="h-4 w-4" />
                {formatTime(room.timeRemaining)}
              </div>
              
              {/* Extend Time (Tutor only) */}
              {isTutor && (
                <div className="flex items-center gap-1">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 px-2"
                    onClick={() => onExtendTime?.(room.id, 5)}
                  >
                    +5m
                  </Button>
                </div>
              )}
              
              {/* End Room (Tutor only) */}
              {isTutor && (
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleEndRoom}
                  className="gap-1"
                >
                  <PhoneOff className="h-4 w-4" />
                  End Room
                </Button>
              )}
            </div>
          </div>
        </DialogHeader>

        {/* Main Content */}
        <div className="flex flex-1 overflow-hidden bg-gray-50">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
            {/* Tab Navigation */}
            <div className="bg-white border-b px-4">
              <TabsList className="bg-transparent h-12">
                <TabsTrigger 
                  value="video" 
                  className="data-[state=active]:bg-gray-100 text-gray-600 data-[state=active]:text-gray-900 gap-2"
                >
                  <Video className="h-4 w-4" />
                  Video
                </TabsTrigger>
                <TabsTrigger 
                  value="chat"
                  className="data-[state=active]:bg-gray-100 text-gray-600 data-[state=active]:text-gray-900 gap-2"
                >
                  <MessageSquare className="h-4 w-4" />
                  Chat
                  {messages.filter(m => m.type === 'text').length > 0 && (
                    <Badge variant="secondary" className="text-[10px] h-4 px-1">
                      {messages.filter(m => m.type === 'text').length}
                    </Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger 
                  value="participants"
                  className="data-[state=active]:bg-gray-100 text-gray-600 data-[state=active]:text-gray-900 gap-2"
                >
                  <Users className="h-4 w-4" />
                  Participants ({room.participants.length})
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Video Tab */}
            <TabsContent value="video" className="flex-1 m-0 flex flex-col">
              <div className="flex-1 p-4 overflow-auto">
                {/* Video Grid */}
                <div className={cn(
                  "grid gap-3 h-full",
                  room.participants.length <= 1 ? "grid-cols-1" :
                  room.participants.length <= 2 ? "grid-cols-2" :
                  room.participants.length <= 4 ? "grid-cols-2" :
                  "grid-cols-3"
                )}>
                  {/* Self Video (Tutor or Student) */}
                  <VideoTile
                    participant={{
                      id: userId,
                      userId,
                      name: `${userName} (You)`,
                      role,
                      isOnline: true,
                      isMuted,
                      isVideoOff,
                      isScreenSharing,
                      engagementScore: 100,
                      attentionLevel: 'high',
                      handRaised,
                      joinedAt: new Date().toISOString()
                    }}
                    isSelf
                  />

                  {/* Other Participants */}
                  {room.participants
                    .filter(p => p.userId !== userId)
                    .map((participant, index) => (
                      <VideoTile
                        key={participant.id}
                        participant={participant}
                        index={index}
                      />
                    ))}
                </div>
              </div>

              {/* Media Controls */}
              <div className="px-6 py-4 bg-white border-t flex items-center justify-center gap-4">
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
                
                {/* Raise Hand (Student) */}
                {!isTutor && (
                  <Button
                    variant={handRaised ? 'default' : 'outline'}
                    size="icon"
                    onClick={handleRaiseHand}
                    className={cn(
                      "h-12 w-12 rounded-full",
                      handRaised && "bg-yellow-500"
                    )}
                  >
                    <Hand className="h-5 w-5" />
                  </Button>
                )}
                
                {/* Request Help (Student) */}
                {!isTutor && (
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleRequestHelp}
                    className="h-12 w-12 rounded-full text-blue-600 border-blue-200"
                  >
                    <HelpCircle className="h-5 w-5" />
                  </Button>
                )}
                
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={onClose}
                  className="h-12 w-12 rounded-full"
                >
                  <PhoneOff className="h-5 w-5" />
                </Button>
              </div>
            </TabsContent>

            {/* Chat Tab */}
            <TabsContent value="chat" className="flex-1 m-0 flex flex-col bg-white">
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.length === 0 ? (
                    <div className="text-center text-gray-400 py-8">
                      <MessageSquare className="h-12 w-12 mx-auto mb-2 opacity-50" />
                      <p>No messages yet</p>
                      <p className="text-sm">Start the conversation!</p>
                    </div>
                  ) : (
                    messages.map((message) => (
                      <ChatMessageItem 
                        key={message.id} 
                        message={message}
                        isSelf={message.senderId === userId}
                      />
                    ))
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>
              
              {/* Message Input */}
              <div className="p-4 bg-gray-50 border-t">
                <div className="flex gap-2">
                  <Input
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="bg-white"
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
                <p className="text-xs text-gray-400 mt-2">
                  {isTutor ? 'Your messages will be visible to all students in this room' : 'Your messages will be visible to everyone in this room'}
                </p>
              </div>
            </TabsContent>

            {/* Participants Tab */}
            <TabsContent value="participants" className="flex-1 m-0 bg-white">
              <ScrollArea className="h-full p-4">
                <div className="space-y-2">
                  {room.participants.length === 0 ? (
                    <div className="text-center text-gray-400 py-8">
                      <Users className="h-12 w-12 mx-auto mb-2 opacity-50" />
                      <p>No participants in this room</p>
                    </div>
                  ) : (
                    room.participants.map((participant) => (
                      <ParticipantListItem 
                        key={participant.id} 
                        participant={participant}
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

// Video Tile Component
function VideoTile({ 
  participant, 
  isSelf = false,
  index = 0
}: { 
  participant: BreakoutParticipant
  isSelf?: boolean
  index?: number
}) {
  const colors = ['bg-red-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500', 'bg-pink-500', 'bg-indigo-500']
  const bgColor = isSelf ? 'bg-blue-600' : colors[index % colors.length]
  
  return (
    <div className="relative bg-gray-900 rounded-xl overflow-hidden aspect-video flex items-center justify-center">
      {/* Avatar placeholder */}
      <div className="text-center">
        <div className={cn("w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-2", bgColor)}>
          <span className="text-white text-2xl font-bold">
            {participant.name.charAt(0).toUpperCase()}
          </span>
        </div>
        <p className="text-white font-medium">{participant.name}</p>
        <div className="flex items-center justify-center gap-1 mt-1">
          {isSelf && <Badge variant="outline" className="text-blue-400 border-blue-400">You</Badge>}
          {participant.role === 'tutor' && (
            <Badge variant="outline" className="text-yellow-400 border-yellow-400">
              <Crown className="h-3 w-3 mr-1" />
              Tutor
            </Badge>
          )}
        </div>
      </div>
      
      {/* Self view controls */}
      <div className="absolute bottom-3 left-3 flex gap-2">
        {participant.isMuted && (
          <div className="bg-red-600 p-1.5 rounded-full">
            <MicOff className="h-4 w-4 text-white" />
          </div>
        )}
        {participant.isVideoOff && (
          <div className="bg-red-600 p-1.5 rounded-full">
            <VideoOff className="h-4 w-4 text-white" />
          </div>
        )}
        {participant.isScreenSharing && (
          <div className="bg-blue-600 p-1.5 rounded-full">
            <MonitorUp className="h-4 w-4 text-white" />
          </div>
        )}
      </div>
      
      {/* Hand raised indicator */}
      {participant.handRaised && (
        <div className="absolute top-3 right-3 bg-yellow-500 p-2 rounded-full animate-pulse">
          <Hand className="h-4 w-4 text-white" />
        </div>
      )}
      
      {/* Engagement badge */}
      {!isSelf && (
        <div className="absolute top-3 left-3">
          <Badge 
            variant="outline" 
            className={cn(
              "text-xs",
              participant.engagementScore >= 80 ? "bg-green-600/50 text-green-400 border-green-500" :
              participant.engagementScore >= 50 ? "bg-yellow-600/50 text-yellow-400 border-yellow-500" :
              "bg-red-600/50 text-red-400 border-red-500"
            )}
          >
            {participant.engagementScore}%
          </Badge>
        </div>
      )}
    </div>
  )
}

// Chat Message Item Component
function ChatMessageItem({ message, isSelf }: { message: BreakoutMessage; isSelf: boolean }) {
  const isSystem = message.senderRole === 'ai' || message.type === 'system'
  
  return (
    <div className={cn(
      "flex gap-3",
      isSelf && "flex-row-reverse",
      isSystem && "justify-center"
    )}>
      {!isSystem && (
        <div className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0",
          isSelf ? "bg-blue-600 text-white" : 
          message.senderRole === 'tutor' ? "bg-yellow-500 text-white" :
          "bg-gray-200 text-gray-700"
        )}>
          {message.senderName.charAt(0).toUpperCase()}
        </div>
      )}
      <div className={cn(
        "max-w-[70%]",
        isSelf && "text-right",
        isSystem && "text-center w-full"
      )}>
        {!isSystem && (
          <div className="flex items-center gap-2 mb-1">
            <span className={cn(
              "text-sm font-medium",
              isSelf ? "text-blue-600" : 
              message.senderRole === 'tutor' ? "text-yellow-600" :
              "text-gray-700"
            )}>
              {message.senderName}
            </span>
            <span className="text-xs text-gray-400">
              {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        )}
        <div className={cn(
          "inline-block px-3 py-2 rounded-lg text-sm text-left",
          isSystem ? "bg-purple-100 text-purple-800 italic" :
          isSelf ? "bg-blue-600 text-white" : 
          message.senderRole === 'tutor' ? "bg-yellow-100 text-yellow-800" :
          "bg-gray-100 text-gray-800",
          message.isQuestion && !isSelf && !isSystem && "border-l-4 border-yellow-500"
        )}>
          {message.content}
        </div>
      </div>
    </div>
  )
}

// Participant List Item Component
function ParticipantListItem({ participant }: { participant: BreakoutParticipant }) {
  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
      <div className="flex items-center gap-3">
        <div className={cn(
          "w-10 h-10 rounded-full flex items-center justify-center font-bold text-white",
          participant.role === 'tutor' ? "bg-yellow-500" :
          participant.isOnline ? "bg-green-500" : "bg-gray-400"
        )}>
          {participant.name.charAt(0).toUpperCase()}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <p className="font-medium">{participant.name}</p>
            {participant.role === 'tutor' && (
              <Badge variant="outline" className="text-[10px]">
                <Crown className="h-3 w-3 mr-1" />
                Tutor
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span className={cn(
              "w-2 h-2 rounded-full",
              participant.isOnline ? "bg-green-500" : "bg-gray-400"
            )} />
            {participant.isOnline ? 'Online' : 'Offline'}
            {participant.handRaised && (
              <span className="text-yellow-600 flex items-center gap-1">
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
            participant.engagementScore >= 80 ? "text-green-600 border-green-500" :
            participant.engagementScore >= 50 ? "text-yellow-600 border-yellow-500" :
            "text-red-600 border-red-500"
          )}
        >
          {participant.engagementScore}% engaged
        </Badge>
        
        {participant.attentionLevel === 'low' && (
          <Badge variant="outline" className="text-xs text-red-600 border-red-500">
            Attention
          </Badge>
        )}
      </div>
    </div>
  )
}
