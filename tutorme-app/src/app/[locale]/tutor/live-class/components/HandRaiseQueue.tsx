'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import { Hand, Check, Clock, ArrowUp } from 'lucide-react'
import type { HandRaise } from '@/types/live-session'

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
      case 'high':
        return 'bg-red-100 text-red-700 border-red-200'
      case 'normal':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200'
      case 'low':
        return 'bg-blue-100 text-blue-700 border-blue-200'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <Badge variant="outline" className="animate-pulse">
            Waiting
          </Badge>
        )
      case 'acknowledged':
        return <Badge variant="secondary">Acknowledged</Badge>
      case 'answered':
        return (
          <Badge variant="default" className="bg-green-600">
            Answered
          </Badge>
        )
    }
  }

  const formatWaitTime = (raisedAt: string) => {
    const seconds = Math.floor((Date.now() - new Date(raisedAt).getTime()) / 1000)
    if (seconds < 60) return `${seconds}s`
    const minutes = Math.floor(seconds / 60)
    return `${minutes}m ${seconds % 60}s`
  }

  return (
    <Card className="flex h-full flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Hand className="h-4 w-4" />
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
          <div className="flex h-full items-center justify-center p-4 text-center">
            <div>
              <Hand className="mx-auto mb-2 h-12 w-12 text-gray-300" />
              <p className="text-sm text-gray-500">No hand raises yet</p>
              <p className="mt-1 text-xs text-gray-400">
                Students can raise hands to ask questions
              </p>
            </div>
          </div>
        ) : (
          <ScrollArea className="h-[calc(100%-60px)]">
            <div className="space-y-2 px-4 pb-4">
              {sortedHands.map(hand => (
                <div
                  key={hand.id}
                  className={cn(
                    'rounded-lg border p-3 transition-all',
                    hand.status === 'pending'
                      ? 'border-yellow-200 bg-white shadow-sm'
                      : hand.status === 'acknowledged'
                        ? 'border-blue-200 bg-blue-50'
                        : 'border-green-200 bg-green-50 opacity-70'
                  )}
                >
                  <div className="flex items-start gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-blue-100 text-xs text-blue-700">
                        {hand.studentName
                          .split(' ')
                          .map(n => n[0])
                          .join('')}
                      </AvatarFallback>
                    </Avatar>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">{hand.studentName}</p>
                        {getStatusBadge(hand.status)}
                      </div>

                      <div className="mt-1 flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className={cn('text-xs', getPriorityColor(hand.priority))}
                        >
                          {hand.priority.charAt(0).toUpperCase() + hand.priority.slice(1)}
                        </Badge>
                        <span className="flex items-center gap-1 text-xs text-gray-500">
                          <Clock className="h-3 w-3" />
                          {formatWaitTime(hand.raisedAt)}
                        </span>
                      </div>

                      {hand.topic && (
                        <p className="mt-2 text-xs text-gray-600">Topic: {hand.topic}</p>
                      )}

                      {hand.status === 'pending' && (
                        <div className="mt-3 flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1 text-xs"
                            onClick={() => onAcknowledge?.(hand.id)}
                          >
                            <ArrowUp className="mr-1 h-3 w-3" />
                            Acknowledge
                          </Button>
                          <Button
                            size="sm"
                            className="flex-1 bg-green-600 text-xs hover:bg-green-700"
                            onClick={() => onAnswer?.(hand.id)}
                          >
                            <Check className="mr-1 h-3 w-3" />
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
