'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  MoreVertical,
  Crown,
  Hand,
  MessageSquare,
  UserMinus,
  Volume2,
  VolumeX,
  Search,
  Users
} from 'lucide-react'

interface Participant {
  id: string
  userId: string
  name: string
  isAudioEnabled: boolean
  isVideoEnabled: boolean
  isScreenSharing: boolean
  isLocal?: boolean
}

interface ParticipantsPanelProps {
  participants: Participant[]
  handRaisedUsers: Set<string>
  onToggleHand: () => void
}

export function ParticipantsPanel({ participants, handRaisedUsers, onToggleHand }: ParticipantsPanelProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [mutedUsers, setMutedUsers] = useState<Set<string>>(new Set())
  const [selectedParticipant, setSelectedParticipant] = useState<string | null>(null)

  const filteredParticipants = participants.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const onlineCount = participants.filter(p => !p.isLocal).length
  const handRaisedCount = handRaisedUsers.size

  const handleMuteParticipant = (participantId: string, currentMuteState: boolean) => {
    setMutedUsers(prev => {
      const newSet = new Set(prev)
      if (currentMuteState) {
        newSet.delete(participantId)
        toast.success('Participant unmuted')
      } else {
        newSet.add(participantId)
        toast.success('Participant muted')
      }
      return newSet
    })
  }

  const handleRemoveParticipant = (participantName: string) => {
    toast.success(`${participantName} removed from the session`)
  }

  const handleSendDirectMessage = (participantName: string) => {
    toast.success(`Opening direct message with ${participantName}`)
  }

  return (
    <div className="flex flex-col h-full bg-gray-800">
      {/* Header */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-white font-medium flex items-center gap-2">
            <Users className="w-4 h-4" />
            Participants ({onlineCount})
          </h3>
          {handRaisedCount > 0 && (
            <Badge className="bg-yellow-600">
              <Hand className="w-3 h-3 mr-1" />
              {handRaisedCount}
            </Badge>
          )}
        </div>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search participants..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-gray-700 border-gray-600 text-white placeholder:text-gray-500"
          />
        </div>
      </div>

      {/* Participants List */}
      <ScrollArea className="flex-1">
        <div className="p-2 space-y-1">
          {/* You */}
          {participants.filter(p => p.isLocal).map(participant => (
            <div
              key={participant.id}
              className="flex items-center gap-3 p-3 rounded-lg bg-blue-900/30 border border-blue-800"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold">
                {participant.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium text-sm truncate">{participant.name} (You)</p>
                <p className="text-xs text-blue-300">Host</p>
              </div>
              <div className="flex items-center gap-1">
                <Crown className="w-4 h-4 text-yellow-500" />
                {handRaisedUsers.has(participant.userId) && (
                  <div className="p-1 bg-yellow-500 rounded-full">
                    <Hand className="w-3 h-3 text-white" />
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Other Participants */}
          {filteredParticipants.filter(p => !p.isLocal).map(participant => (
            <div
              key={participant.id}
              className={cn(
                "flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 transition-colors",
                handRaisedUsers.has(participant.userId) && "bg-yellow-900/20 border border-yellow-800"
              )}
            >
              <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white text-sm font-bold">
                {participant.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm truncate">{participant.name}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  {!participant.isAudioEnabled && (
                    <MicOff className="w-3 h-3 text-red-400" />
                  )}
                  {!participant.isVideoEnabled && (
                    <VideoOff className="w-3 h-3 text-red-400" />
                  )}
                  {participant.isScreenSharing && (
                    <span className="text-xs text-green-400">Sharing</span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-1">
                {handRaisedUsers.has(participant.userId) && (
                  <div className="p-1 bg-yellow-500 rounded-full">
                    <Hand className="w-3 h-3 text-white" />
                  </div>
                )}
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-gray-400">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem onClick={() => handleSendDirectMessage(participant.name)}>
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Message
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleMuteParticipant(participant.userId, mutedUsers.has(participant.userId))}>
                      {mutedUsers.has(participant.userId) ? (
                        <>
                          <Volume2 className="w-4 h-4 mr-2" />
                          Unmute
                        </>
                      ) : (
                        <>
                          <VolumeX className="w-4 h-4 mr-2" />
                          Mute
                        </>
                      )}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      className="text-red-600"
                      onClick={() => handleRemoveParticipant(participant.name)}
                    >
                      <UserMinus className="w-4 h-4 mr-2" />
                      Remove
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Actions */}
      <div className="p-3 border-t border-gray-700 space-y-2">
        <Button 
          variant="outline" 
          className="w-full"
          onClick={onToggleHand}
        >
          <Hand className="w-4 h-4 mr-2" />
          {handRaisedUsers.has('local') ? 'Lower Hand' : 'Raise Hand'}
        </Button>
      </div>
    </div>
  )
}
