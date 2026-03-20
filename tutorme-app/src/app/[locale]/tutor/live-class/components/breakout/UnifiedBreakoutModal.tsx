'use client'

import { useState, useRef, useEffect, useMemo } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { MentionInput } from '@/components/mentions/MentionInput'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import { renderMentions } from '@/lib/mentions/render-mentions'
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
  onRaiseHand,
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
      type: 'text',
    }

    setMessagesByRoomId(prev => ({
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
    if (
      confirm(
        `Are you sure you want to end ${room.name}? All participants will return to the main room.`
      )
    ) {
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
    <Dialog open={isOpen} onOpenChange={open => !open && onClose()}>
      <DialogContent className="h-[90vh] w-[95vw] max-w-6xl gap-0 overflow-hidden p-0">
        {/* Header */}
        <DialogHeader className="shrink-0 border-b bg-white px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <DialogTitle className="flex items-center gap-2 text-lg text-gray-900">
                <Users className="h-5 w-5 text-blue-600" />
                {room.name}
              </DialogTitle>
              <Badge
                variant="secondary"
                className={cn(
                  room.status === 'active'
                    ? 'bg-green-100 text-green-700'
                    : room.status === 'forming'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-gray-100 text-gray-700'
                )}
              >
                {room.status.charAt(0).toUpperCase() + room.status.slice(1)}
              </Badge>
              {room.aiEnabled && (
                <Badge variant="outline" className="border-purple-200 bg-purple-50 text-purple-700">
                  <Brain className="mr-1 h-3 w-3" />
                  AI Active
                </Badge>
              )}
              {room.assignedTask && (
                <span className="text-sm text-gray-500">Task: {room.assignedTask.title}</span>
              )}
            </div>

            <div className="flex items-center gap-3">
              {/* Timer */}
              <div
                className={cn(
                  'flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium',
                  room.timeRemaining < 60 ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'
                )}
              >
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
                <Button variant="destructive" size="sm" onClick={handleEndRoom} className="gap-1">
                  <PhoneOff className="h-4 w-4" />
                  End Room
                </Button>
              )}
            </div>
          </div>
        </DialogHeader>

        {/* Main Content */}
        <div className="flex flex-1 overflow-hidden bg-gray-50">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-1 flex-col">
            {/* Tab Navigation */}
            <div className="border-b bg-white px-4">
              <TabsList className="h-12 bg-transparent">
                <TabsTrigger
                  value="video"
                  className="gap-2 text-gray-600 data-[state=active]:bg-gray-100 data-[state=active]:text-gray-900"
                >
                  <Video className="h-4 w-4" />
                  Video
                </TabsTrigger>
                <TabsTrigger
                  value="chat"
                  className="gap-2 text-gray-600 data-[state=active]:bg-gray-100 data-[state=active]:text-gray-900"
                >
                  <MessageSquare className="h-4 w-4" />
                  Chat
                  {messages.filter(m => m.type === 'text').length > 0 && (
                    <Badge variant="secondary" className="h-4 px-1 text-[10px]">
                      {messages.filter(m => m.type === 'text').length}
                    </Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger
                  value="participants"
                  className="gap-2 text-gray-600 data-[state=active]:bg-gray-100 data-[state=active]:text-gray-900"
                >
                  <Users className="h-4 w-4" />
                  Participants ({room.participants.length})
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Video Tab */}
            <TabsContent value="video" className="m-0 flex flex-1 flex-col">
              <div className="flex-1 overflow-auto p-4">
                {/* Video Grid */}
                <div
                  className={cn(
                    'grid h-full gap-3',
                    room.participants.length <= 1
                      ? 'grid-cols-1'
                      : room.participants.length <= 2
                        ? 'grid-cols-2'
                        : room.participants.length <= 4
                          ? 'grid-cols-2'
                          : 'grid-cols-3'
                  )}
                >
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
                      joinedAt: new Date().toISOString(),
                    }}
                    isSelf
                  />

                  {/* Other Participants */}
                  {room.participants
                    .filter(p => p.userId !== userId)
                    .map((participant, index) => (
                      <VideoTile key={participant.id} participant={participant} index={index} />
                    ))}
                </div>
              </div>

              {/* Media Controls */}
              <div className="flex items-center justify-center gap-4 border-t bg-white px-6 py-4">
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
                  className={cn('h-12 w-12 rounded-full', isScreenSharing && 'bg-blue-600')}
                >
                  {isScreenSharing ? (
                    <MonitorOff className="h-5 w-5" />
                  ) : (
                    <MonitorUp className="h-5 w-5" />
                  )}
                </Button>

                {/* Raise Hand (Student) */}
                {!isTutor && (
                  <Button
                    variant={handRaised ? 'default' : 'outline'}
                    size="icon"
                    onClick={handleRaiseHand}
                    className={cn('h-12 w-12 rounded-full', handRaised && 'bg-yellow-500')}
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
                    className="h-12 w-12 rounded-full border-blue-200 text-blue-600"
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
            <TabsContent value="chat" className="m-0 flex flex-1 flex-col bg-white">
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.length === 0 ? (
                    <div className="py-8 text-center text-gray-400">
                      <MessageSquare className="mx-auto mb-2 h-12 w-12 opacity-50" />
                      <p>No messages yet</p>
                      <p className="text-sm">Start the conversation!</p>
                    </div>
                  ) : (
                    messages.map(message => (
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
              <div className="border-t bg-gray-50 p-4">
                <div className="flex gap-2">
                  <MentionInput
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={setNewMessage}
                    onKeyDown={e => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault()
                        handleSendMessage()
                      }
                    }}
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
                <p className="mt-2 text-xs text-gray-400">
                  {isTutor
                    ? 'Your messages will be visible to all students in this room'
                    : 'Your messages will be visible to everyone in this room'}
                </p>
              </div>
            </TabsContent>

            {/* Participants Tab */}
            <TabsContent value="participants" className="m-0 flex-1 bg-white">
              <ScrollArea className="h-full p-4">
                <div className="space-y-2">
                  {room.participants.length === 0 ? (
                    <div className="py-8 text-center text-gray-400">
                      <Users className="mx-auto mb-2 h-12 w-12 opacity-50" />
                      <p>No participants in this room</p>
                    </div>
                  ) : (
                    room.participants.map(participant => (
                      <ParticipantListItem key={participant.id} participant={participant} />
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
  index = 0,
}: {
  participant: BreakoutParticipant
  isSelf?: boolean
  index?: number
}) {
  const colors = [
    'bg-red-500',
    'bg-green-500',
    'bg-yellow-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-indigo-500',
  ]
  const bgColor = isSelf ? 'bg-blue-600' : colors[index % colors.length]

  return (
    <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-xl bg-gray-900">
      {/* Avatar placeholder */}
      <div className="text-center">
        <div
          className={cn(
            'mx-auto mb-2 flex h-20 w-20 items-center justify-center rounded-full',
            bgColor
          )}
        >
          <span className="text-2xl font-bold text-white">
            {participant.name.charAt(0).toUpperCase()}
          </span>
        </div>
        <p className="font-medium text-white">{participant.name}</p>
        <div className="mt-1 flex items-center justify-center gap-1">
          {isSelf && (
            <Badge variant="outline" className="border-blue-400 text-blue-400">
              You
            </Badge>
          )}
          {participant.role === 'tutor' && (
            <Badge variant="outline" className="border-yellow-400 text-yellow-400">
              <Crown className="mr-1 h-3 w-3" />
              Tutor
            </Badge>
          )}
        </div>
      </div>

      {/* Self view controls */}
      <div className="absolute bottom-3 left-3 flex gap-2">
        {participant.isMuted && (
          <div className="rounded-full bg-red-600 p-1.5">
            <MicOff className="h-4 w-4 text-white" />
          </div>
        )}
        {participant.isVideoOff && (
          <div className="rounded-full bg-red-600 p-1.5">
            <VideoOff className="h-4 w-4 text-white" />
          </div>
        )}
        {participant.isScreenSharing && (
          <div className="rounded-full bg-blue-600 p-1.5">
            <MonitorUp className="h-4 w-4 text-white" />
          </div>
        )}
      </div>

      {/* Hand raised indicator */}
      {participant.handRaised && (
        <div className="absolute right-3 top-3 animate-pulse rounded-full bg-yellow-500 p-2">
          <Hand className="h-4 w-4 text-white" />
        </div>
      )}

      {/* Engagement badge */}
      {!isSelf && (
        <div className="absolute left-3 top-3">
          <Badge
            variant="outline"
            className={cn(
              'text-xs',
              participant.engagementScore >= 80
                ? 'border-green-500 bg-green-600/50 text-green-400'
                : participant.engagementScore >= 50
                  ? 'border-yellow-500 bg-yellow-600/50 text-yellow-400'
                  : 'border-red-500 bg-red-600/50 text-red-400'
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
    <div className={cn('flex gap-3', isSelf && 'flex-row-reverse', isSystem && 'justify-center')}>
      {!isSystem && (
        <div
          className={cn(
            'flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold',
            isSelf
              ? 'bg-blue-600 text-white'
              : message.senderRole === 'tutor'
                ? 'bg-yellow-500 text-white'
                : 'bg-gray-200 text-gray-700'
          )}
        >
          {message.senderName.charAt(0).toUpperCase()}
        </div>
      )}
      <div className={cn('max-w-[70%]', isSelf && 'text-right', isSystem && 'w-full text-center')}>
        {!isSystem && (
          <div className="mb-1 flex items-center gap-2">
            <span
              className={cn(
                'text-sm font-medium',
                isSelf
                  ? 'text-blue-600'
                  : message.senderRole === 'tutor'
                    ? 'text-yellow-600'
                    : 'text-gray-700'
              )}
            >
              {message.senderName}
            </span>
            <span className="text-xs text-gray-400">
              {new Date(message.timestamp).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
          </div>
        )}
        <div
          className={cn(
            'inline-block rounded-lg px-3 py-2 text-left text-sm',
            isSystem
              ? 'bg-purple-100 italic text-purple-800'
              : isSelf
                ? 'bg-blue-600 text-white'
                : message.senderRole === 'tutor'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-gray-100 text-gray-800',
            message.isQuestion && !isSelf && !isSystem && 'border-l-4 border-yellow-500'
          )}
        >
          {renderMentions(message.content)}
        </div>
      </div>
    </div>
  )
}

// Participant List Item Component
function ParticipantListItem({ participant }: { participant: BreakoutParticipant }) {
  return (
    <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
      <div className="flex items-center gap-3">
        <div
          className={cn(
            'flex h-10 w-10 items-center justify-center rounded-full font-bold text-white',
            participant.role === 'tutor'
              ? 'bg-yellow-500'
              : participant.isOnline
                ? 'bg-green-500'
                : 'bg-gray-400'
          )}
        >
          {participant.name.charAt(0).toUpperCase()}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <p className="font-medium">{participant.name}</p>
            {participant.role === 'tutor' && (
              <Badge variant="outline" className="text-[10px]">
                <Crown className="mr-1 h-3 w-3" />
                Tutor
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span
              className={cn(
                'h-2 w-2 rounded-full',
                participant.isOnline ? 'bg-green-500' : 'bg-gray-400'
              )}
            />
            {participant.isOnline ? 'Online' : 'Offline'}
            {participant.handRaised && (
              <span className="flex items-center gap-1 text-yellow-600">• Hand raised</span>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Badge
          variant="outline"
          className={cn(
            'text-xs',
            participant.engagementScore >= 80
              ? 'border-green-500 text-green-600'
              : participant.engagementScore >= 50
                ? 'border-yellow-500 text-yellow-600'
                : 'border-red-500 text-red-600'
          )}
        >
          {participant.engagementScore}% engaged
        </Badge>

        {participant.attentionLevel === 'low' && (
          <Badge variant="outline" className="border-red-500 text-xs text-red-600">
            Attention
          </Badge>
        )}
      </div>
    </div>
  )
}
