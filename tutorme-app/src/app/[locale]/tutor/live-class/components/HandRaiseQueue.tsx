'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import { Hand, Check, Clock, ArrowUp } from 'lucide-react'
import type { HandRaise } from '../types'

interface HandRaiseQueueProps {
  handRaises: HandRaise[]
  onAcknowledge?: (handId: string) => void
  onAnswer?: (handId: string) => void
}

export function HandRaiseQueue({ handRaises, onAcknowledge, onAnswer }: HandRaiseQueueProps) {
  // Sort: pending first, then by priority and time
  const sortedHands = [...handRaises].sort((a, b) => {
    if (a.status !== b.status) {
      return a.status === 'pending' ? -1 : 1
    }
    if (a.priority !== b.priority) {
      const priorityWeight = { high: 3, normal: 2, low: 1 }
      return priorityWeight[b.priority] - priorityWeight[a.priority]
    }
    return new Date(a.raisedAt).getTime() - new Date(b.raisedAt).getTime()
  })

  const pendingCount = handRaises.filter(h => h.status === 'pending').length

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200'
      case 'normal': return 'bg-yellow-100 text-yellow-700 border-yellow-200'
      case 'low': return 'bg-blue-100 text-blue-700 border-blue-200'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="animate-pulse">Waiting</Badge>
      case 'acknowledged':
        return <Badge variant="secondary">Acknowledged</Badge>
      case 'answered':
        return <Badge variant="default" className="bg-green-600">Answered</Badge>
    }
  }

  const formatWaitTime = (raisedAt: string) => {
    const seconds = Math.floor((Date.now() - new Date(raisedAt).getTime()) / 1000)
    if (seconds < 60) return `${seconds}s`
    const minutes = Math.floor(seconds / 60)
    return `${minutes}m ${seconds % 60}s`
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Hand className="w-4 h-4" />
            <CardTitle className="text-sm font-medium">Hand Raises</CardTitle>
          </div>
          {pendingCount > 0 && (
            <Badge variant="destructive" className="text-xs">
              {pendingCount} Pending
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex-1 p-0">
        {sortedHands.length === 0 ? (
          <div className="h-full flex items-center justify-center text-center p-4">
            <div>
              <Hand className="w-12 h-12 text-gray-300 mx-auto mb-2" />
              <p className="text-sm text-gray-500">No hand raises yet</p>
              <p className="text-xs text-gray-400 mt-1">Students can raise hands to ask questions</p>
            </div>
          </div>
        ) : (
          <ScrollArea className="h-[calc(100%-60px)]">
            <div className="space-y-2 px-4 pb-4">
              {sortedHands.map((hand) => (
                <div
                  key={hand.id}
                  className={cn(
                    "p-3 rounded-lg border transition-all",
                    hand.status === 'pending' 
                      ? "bg-white border-yellow-200 shadow-sm" 
                      : hand.status === 'acknowledged'
                        ? "bg-blue-50 border-blue-200"
                        : "bg-green-50 border-green-200 opacity-70"
                  )}
                >
                  <div className="flex items-start gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="text-xs bg-blue-100 text-blue-700">
                        {hand.studentName.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-sm">{hand.studentName}</p>
                        {getStatusBadge(hand.status)}
                      </div>

                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className={cn("text-xs", getPriorityColor(hand.priority))}>
                          {hand.priority.charAt(0).toUpperCase() + hand.priority.slice(1)}
                        </Badge>
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {formatWaitTime(hand.raisedAt)}
                        </span>
                      </div>

                      {hand.topic && (
                        <p className="text-xs text-gray-600 mt-2">
                          Topic: {hand.topic}
                        </p>
                      )}

                      {hand.status === 'pending' && (
                        <div className="flex gap-2 mt-3">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="flex-1 text-xs"
                            onClick={() => onAcknowledge?.(hand.id)}
                          >
                            <ArrowUp className="w-3 h-3 mr-1" />
                            Acknowledge
                          </Button>
                          <Button 
                            size="sm" 
                            className="flex-1 text-xs bg-green-600 hover:bg-green-700"
                            onClick={() => onAnswer?.(hand.id)}
                          >
                            <Check className="w-3 h-3 mr-1" />
                            Answer
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  )
}
