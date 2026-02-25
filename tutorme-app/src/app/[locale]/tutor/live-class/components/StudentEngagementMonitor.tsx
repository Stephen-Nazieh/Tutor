'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import { 
  Wifi, 
  WifiOff, 
  Smartphone, 
  Laptop, 
  Tablet,
  AlertTriangle,
  CheckCircle2
} from 'lucide-react'
import type { LiveStudent } from '../types'

interface StudentEngagementMonitorProps {
  students: LiveStudent[]
  onStudentClick?: (student: LiveStudent) => void
}

export function StudentEngagementMonitor({ students, onStudentClick }: StudentEngagementMonitorProps) {
  // Sort students: online first, then by attention level
  const attentionLevelValue = { high: 3, medium: 2, low: 1 }
  const sortedStudents = [...students].sort((a, b) => {
    const aOnline = a.status === 'online'
    const bOnline = b.status === 'online'
    if (aOnline !== bOnline) return bOnline ? 1 : -1
    return attentionLevelValue[b.attentionLevel] - attentionLevelValue[a.attentionLevel]
  })

  const getDeviceIcon = (device?: string) => {
    switch (device) {
      case 'mobile': return <Smartphone className="w-3 h-3" />
      case 'tablet': return <Tablet className="w-3 h-3" />
      default: return <Laptop className="w-3 h-3" />
    }
  }

  const getConnectionColor = (quality?: string) => {
    switch (quality) {
      case 'excellent': return 'text-green-500'
      case 'good': return 'text-blue-500'
      case 'fair': return 'text-yellow-500'
      case 'poor': return 'text-red-500'
      default: return 'text-gray-400'
    }
  }

  const getEngagementColor = (score: number) => {
    if (score >= 80) return 'bg-green-500'
    if (score >= 50) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  const onlineCount = students.filter(s => s.status === 'online').length
  const atRiskCount = students.filter(s => s.status === 'online' && s.attentionLevel === 'low').length

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium">Students</CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              <CheckCircle2 className="w-3 h-3 mr-1 text-green-500" />
              {onlineCount} Online
            </Badge>
            {atRiskCount > 0 && (
              <Badge variant="destructive" className="text-xs">
                <AlertTriangle className="w-3 h-3 mr-1" />
                {atRiskCount} At Risk
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 p-0">
        <ScrollArea className="h-[calc(100%-60px)]">
          <div className="space-y-2 px-4 pb-4">
            {sortedStudents.map((student) => {
              const isOnline = student.status === 'online'
              const isAtRisk = isOnline && student.attentionLevel === 'low'
              
              return (
                <div
                  key={student.id}
                  onClick={() => onStudentClick?.(student)}
                  className={cn(
                    "p-3 rounded-lg border transition-all cursor-pointer",
                    isOnline 
                      ? "bg-white hover:bg-gray-50" 
                      : "bg-gray-50 opacity-60",
                    isAtRisk && "border-red-200 bg-red-50"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className={cn(
                          "text-xs",
                          isOnline ? "bg-blue-100 text-blue-700" : "bg-gray-200 text-gray-500"
                        )}>
                          {student.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className={cn(
                        "absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white",
                        isOnline ? "bg-green-500" : "bg-gray-400"
                      )} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-sm truncate">{student.name}</p>
                        <div className="flex items-center gap-1">
                          <Laptop className="w-3 h-3 text-gray-400" />
                          {isOnline ? (
                            <Wifi className="w-3 h-3 text-green-500" />
                          ) : (
                            <WifiOff className="w-3 h-3 text-gray-400" />
                          )}
                        </div>
                      </div>

                      {isOnline && (
                        <div className="mt-2 space-y-1">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-500">Attention</span>
                            <span className={cn(
                              student.attentionLevel === 'low' ? "text-red-600" : "text-gray-700"
                            )}>{student.attentionLevel}</span>
                          </div>
                          <Progress 
                            value={student.engagementScore} 
                            className="h-1.5"
                          />

                          <div className="flex items-center justify-between text-xs mt-1">
                            <span className="text-gray-500">Engagement</span>
                            <span className="text-gray-700">{student.engagementScore}%</span>
                          </div>
                          <div className={cn("h-1 rounded-full", getEngagementColor(student.engagementScore))} 
                            style={{ width: `${student.engagementScore}%` }}
                          />
                        </div>
                      )}

                      {!isOnline && (
                        <p className="text-xs text-gray-400 mt-1">
                          Last seen {new Date(student.lastActive).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
