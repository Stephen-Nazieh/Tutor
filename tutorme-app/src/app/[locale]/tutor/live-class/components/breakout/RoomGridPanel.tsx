'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import type { BreakoutRoom } from '../../types'
import {
  Users,
  Maximize2,
  Brain,
  Timer,
  MessageSquare,
  AlertCircle,
  BarChart3
} from 'lucide-react'

interface RoomGridPanelProps {
  rooms: BreakoutRoom[]
  onSelectRoom: (roomId: string) => void
  onJoinRoom: (room: BreakoutRoom) => void
}

export function RoomGridPanel({ rooms, onSelectRoom, onJoinRoom }: RoomGridPanelProps) {
  const getStatusColor = (status: BreakoutRoom['status']) => {
    switch (status) {
      case 'active': return 'bg-green-500'
      case 'forming': return 'bg-blue-500'
      case 'paused': return 'bg-yellow-500'
      case 'closed': return 'bg-gray-500'
      default: return 'bg-gray-400'
    }
  }

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'confusion': return '❓'
      case 'conflict': return '⚠️'
      case 'off_topic': return '🎯'
      case 'need_help': return '🆘'
      case 'quiet': return '🔇'
      default: return '🔔'
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="h-full p-4 overflow-auto">
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {rooms.map((room) => (
          <Card 
            key={room.id}
            className={cn(
              "cursor-pointer transition-all hover:shadow-md",
              room.alerts.length > 0 && "border-yellow-400"
            )}
            onClick={() => onSelectRoom(room.id)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <div className={cn("w-3 h-3 rounded-full", getStatusColor(room.status))} />
                  <CardTitle className="text-base">{room.name}</CardTitle>
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-7 w-7"
                        onClick={(e) => { 
                          e.stopPropagation()
                          onJoinRoom(room)
                        }}
                        disabled={room.status !== 'active'}
                      >
                        <Maximize2 className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Join Room</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Users className="h-3 w-3" />
                {room.participants.length} participants
                {room.aiEnabled && (
                  <Badge variant="secondary" className="text-xs bg-purple-100 text-purple-700">
                    <Brain className="h-3 w-3 mr-1" />
                    AI
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {/* Topic */}
              {room.assignedTask && (
                <div className="p-2 bg-gray-50 rounded text-xs">
                  <p className="font-medium text-gray-700">{room.assignedTask.title}</p>
                  <p className="text-gray-500 truncate">{room.assignedTask.description}</p>
                </div>
              )}

              {/* Metrics */}
              {room.status === 'active' && (
                <div className="grid grid-cols-2 gap-2 text-[10px]">
                  <div className="flex items-center gap-1 text-gray-500">
                    <MessageSquare className="h-3 w-3" />
                    {room.metrics.messagesExchanged} msgs
                  </div>
                  <div className="flex items-center gap-1 text-gray-500">
                    <BarChart3 className="h-3 w-3" />
                    {Math.round(room.metrics.avgEngagement)}% engaged
                  </div>
                </div>
              )}

              {/* Timer */}
              {room.status === 'active' && (
                <div className="flex items-center gap-2 text-sm">
                  <Timer className={cn(
                    "h-4 w-4",
                    room.timeRemaining < 60 ? "text-red-500" : "text-gray-400"
                  )} />
                  <span className={cn(
                    room.timeRemaining < 60 ? "text-red-600 font-medium" : "text-gray-600"
                  )}>
                    {formatTime(room.timeRemaining)}
                  </span>
                </div>
              )}

              {/* Alerts */}
              {room.alerts.length > 0 && (
                <div className="space-y-1">
                  {room.alerts.slice(0, 2).map((alert, i) => (
                    <div 
                      key={i} 
                      className={cn(
                        "flex items-center gap-2 text-xs px-2 py-1 rounded",
                        alert.severity === 'high' ? "bg-red-50 text-red-700" :
                        alert.severity === 'medium' ? "bg-yellow-50 text-yellow-700" :
                        "bg-blue-50 text-blue-700"
                      )}
                    >
                      <span>{getAlertIcon(alert.type)}</span>
                      <span className="truncate">{alert.message}</span>
                    </div>
                  ))}
                  {room.alerts.length > 2 && (
                    <p className="text-xs text-gray-500">
                      +{room.alerts.length - 2} more alerts
                    </p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
