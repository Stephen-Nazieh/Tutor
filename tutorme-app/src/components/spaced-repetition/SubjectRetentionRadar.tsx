'use client'

import { useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { Target, TrendingUp, TrendingDown, Minus } from 'lucide-react'

interface SubjectData {
  subjectId: string
  subjectName: string
  color: string
  currentRetention: number
  averageRetention: number
  trend: 'up' | 'down' | 'stable'
  reviewsCount: number
}

interface SubjectRetentionRadarProps {
  subjects: SubjectData[]
}

export function SubjectRetentionRadar({ subjects }: SubjectRetentionRadarProps) {
  const maxSubjects = 6
  const displaySubjects = subjects.slice(0, maxSubjects)
  
  // Calculate stats
  const stats = useMemo(() => {
    if (subjects.length === 0) return null
    
    const avgRetention = Math.round(
      subjects.reduce((sum, s) => sum + s.currentRetention, 0) / subjects.length
    )
    
    const strongest = subjects.reduce((max, s) => 
      s.currentRetention > max.currentRetention ? s : max
    )
    
    const weakest = subjects.reduce((min, s) => 
      s.currentRetention < min.currentRetention ? s : min
    )
    
    const totalReviews = subjects.reduce((sum, s) => sum + s.reviewsCount, 0)
    
    return { avgRetention, strongest, weakest, totalReviews }
  }, [subjects])

  // Generate radar points
  const generateRadarPoints = (retention: number, index: number, total: number) => {
    const angle = (index / total) * 2 * Math.PI - Math.PI / 2
    const radius = (retention / 100) * 80 // 80px max radius
    const x = 100 + radius * Math.cos(angle)
    const y = 100 + radius * Math.sin(angle)
    return `${x},${y}`
  }

  // Generate axis labels
  const generateAxisPoint = (index: number, total: number, radius: number = 95) => {
    const angle = (index / total) * 2 * Math.PI - Math.PI / 2
    const x = 100 + radius * Math.cos(angle)
    const y = 100 + radius * Math.sin(angle)
    return { x, y, angle }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-500" />
      case 'down': return <TrendingDown className="w-4 h-4 text-red-500" />
      default: return <Minus className="w-4 h-4 text-gray-400" />
    }
  }

  const getRetentionColor = (retention: number) => {
    if (retention >= 80) return 'text-green-600'
    if (retention >= 60) return 'text-yellow-600'
    if (retention >= 40) return 'text-orange-600'
    return 'text-red-600'
  }

  if (subjects.length === 0) {
    return (
      <Card className="h-full">
        <CardContent className="flex items-center justify-center h-64 text-center">
          <div>
            <Target className="w-12 h-12 text-gray-300 mx-auto mb-2" />
            <p className="text-gray-500">No subject data yet</p>
            <p className="text-sm text-gray-400">Complete some reviews to see your retention</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <TooltipProvider>
      <Card className="h-full">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Target className="w-5 h-5" />
            Subject Retention
          </CardTitle>
          <CardDescription>Compare retention across all subjects</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Radar Chart SVG */}
          <div className="relative flex justify-center">
            <svg viewBox="0 0 200 200" className="w-48 h-48">
              {/* Background circles */}
              {[25, 50, 75, 100].map(r => (
                <circle
                  key={r}
                  cx="100"
                  cy="100"
                  r={r * 0.8}
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="1"
                  strokeDasharray={r === 100 ? undefined : "4,4"}
                />
              ))}

              {/* Axis lines */}
              {displaySubjects.map((_, i) => {
                const point = generateAxisPoint(i, displaySubjects.length, 80)
                return (
                  <line
                    key={i}
                    x1="100"
                    y1="100"
                    x2={point.x}
                    y2={point.y}
                    stroke="#e5e7eb"
                    strokeWidth="1"
                  />
                )
              })}

              {/* Subject data polygons */}
              {displaySubjects.map((subject, idx) => {
                const points = displaySubjects.map((s, i) => 
                  generateRadarPoints(s.currentRetention, i, displaySubjects.length)
                ).join(' ')
                
                return (
                  <polygon
                    key={subject.subjectId}
                    points={points}
                    fill={subject.color}
                    fillOpacity={idx === 0 ? 0.3 : 0}
                    stroke={idx === 0 ? subject.color : 'none'}
                    strokeWidth="2"
                    className={idx === 0 ? '' : 'hidden'}
                  />
                )
              })}

              {/* Data points */}
              {displaySubjects.map((subject, i) => {
                const point = generateRadarPoints(subject.currentRetention, i, displaySubjects.length)
                const [x, y] = point.split(',').map(Number)
                
                return (
                  <Tooltip key={subject.subjectId}>
                    <TooltipTrigger asChild>
                      <circle
                        cx={x}
                        cy={y}
                        r="6"
                        fill={subject.color}
                        stroke="white"
                        strokeWidth="2"
                        className="cursor-pointer hover:r-8 transition-all"
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="font-medium">{subject.subjectName}</p>
                      <p className="text-sm">{subject.currentRetention}% retention</p>
                    </TooltipContent>
                  </Tooltip>
                )
              })}

              {/* Center point */}
              <circle cx="100" cy="100" r="3" fill="#9ca3af" />
            </svg>

            {/* Legend */}
            <div className="absolute bottom-0 left-0 right-0 flex justify-center">
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-gray-300" />
                  Center: 0%
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-gray-300" />
                  Edge: 100%
                </span>
              </div>
            </div>
          </div>

          {/* Stats Summary */}
          {stats && (
            <div className="grid grid-cols-2 gap-3 p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="text-xs text-gray-500">Average</p>
                <p className={cn("text-xl font-bold", getRetentionColor(stats.avgRetention))}>
                  {stats.avgRetention}%
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Total Reviews</p>
                <p className="text-xl font-bold text-blue-600">{stats.totalReviews}</p>
              </div>
            </div>
          )}

          {/* Subject List */}
          <div className="space-y-2 max-h-[200px] overflow-y-auto">
            {subjects.map(subject => (
              <div 
                key={subject.subjectId}
                className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: subject.color }}
                  />
                  <span className="font-medium text-sm">{subject.subjectName}</span>
                </div>
                <div className="flex items-center gap-3">
                  {getTrendIcon(subject.trend)}
                  <Badge 
                    variant="outline" 
                    className={cn("text-xs", getRetentionColor(subject.currentRetention))}
                  >
                    {subject.currentRetention}%
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  )
}
