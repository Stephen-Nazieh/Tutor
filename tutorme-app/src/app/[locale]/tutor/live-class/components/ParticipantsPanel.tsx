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
  Users,
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

export function ParticipantsPanel({
  participants,
  handRaisedUsers,
  onToggleHand,
}: ParticipantsPanelProps) {
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
    <div className="flex h-full flex-col bg-gray-800">
      {/* Header */}
      <div className="border-b border-gray-700 p-4">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="flex items-center gap-2 font-medium text-white">
            <Users className="h-4 w-4" />
            Participants ({onlineCount})
          </h3>
          {handRaisedCount > 0 && (
            <Badge className="bg-yellow-600">
              <Hand className="mr-1 h-3 w-3" />
              {handRaisedCount}
            </Badge>
          )}
        </div>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search participants..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="border-gray-600 bg-gray-700 pl-9 text-white placeholder:text-gray-500"
          />
        </div>
      </div>

      {/* Participants List */}
      <ScrollArea className="flex-1">
        <div className="space-y-1 p-2">
          {/* You */}
          {participants
            .filter(p => p.isLocal)
            .map(participant => (
              <div
                key={participant.id}
                className="flex items-center gap-3 rounded-lg border border-blue-800 bg-blue-900/30 p-3"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-sm font-bold text-white">
                  {participant.name
                    .split(' ')
                    .map(n => n[0])
                    .join('')}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-white">
                    {participant.name} (You)
                  </p>
                  <p className="text-xs text-blue-300">Host</p>
                </div>
                <div className="flex items-center gap-1">
                  <Crown className="h-4 w-4 text-yellow-500" />
                  {handRaisedUsers.has(participant.userId) && (
                    <div className="rounded-full bg-yellow-500 p-1">
                      <Hand className="h-3 w-3 text-white" />
                    </div>
                  )}
                </div>
              </div>
            ))}

          {/* Other Participants */}
          {filteredParticipants
            .filter(p => !p.isLocal)
            .map(participant => (
              <div
                key={participant.id}
                className={cn(
                  'flex items-center gap-3 rounded-lg p-3 transition-colors hover:bg-gray-700',
                  handRaisedUsers.has(participant.userId) &&
                    'border border-yellow-800 bg-yellow-900/20'
                )}
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-600 text-sm font-bold text-white">
                  {participant.name
                    .split(' ')
                    .map(n => n[0])
                    .join('')}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm text-white">{participant.name}</p>
                  <div className="mt-0.5 flex items-center gap-2">
                    {!participant.isAudioEnabled && <MicOff className="h-3 w-3 text-red-400" />}
                    {!participant.isVideoEnabled && <VideoOff className="h-3 w-3 text-red-400" />}
                    {participant.isScreenSharing && (
                      <span className="text-xs text-green-400">Sharing</span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {handRaisedUsers.has(participant.userId) && (
                    <div className="rounded-full bg-yellow-500 p-1">
                      <Hand className="h-3 w-3 text-white" />
                    </div>
                  )}

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-7 w-7 text-gray-400">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem onClick={() => handleSendDirectMessage(participant.name)}>
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Message
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() =>
                          handleMuteParticipant(
                            participant.userId,
                            mutedUsers.has(participant.userId)
                          )
                        }
                      >
                        {mutedUsers.has(participant.userId) ? (
                          <>
                            <Volume2 className="mr-2 h-4 w-4" />
                            Unmute
                          </>
                        ) : (
                          <>
                            <VolumeX className="mr-2 h-4 w-4" />
                            Mute
                          </>
                        )}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => handleRemoveParticipant(participant.name)}
                      >
                        <UserMinus className="mr-2 h-4 w-4" />
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
      <div className="space-y-2 border-t border-gray-700 p-3">
        <Button variant="outline" className="w-full" onClick={onToggleHand}>
          <Hand className="mr-2 h-4 w-4" />
          {handRaisedUsers.has('local') ? 'Lower Hand' : 'Raise Hand'}
        </Button>
      </div>
    </div>
  )
}
