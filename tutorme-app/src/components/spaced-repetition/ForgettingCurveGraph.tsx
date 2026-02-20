'use client'

import { useState, useMemo, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { 
  Brain, 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  Calendar,
  TrendingDown,
  RotateCcw,
  BookOpen
} from 'lucide-react'

interface DataPoint {
  day: number
  date: string
  retention: number
  isReviewPoint: boolean
  reviewId?: string
  contentTitle?: string
  contentId?: string
}

interface SubjectCurve {
  subjectId: string
  subjectName: string
  color: string
  dataPoints: DataPoint[]
}

interface ReviewNode {
  id: string
  contentId: string
  contentTitle: string
  subjectId: string
  subjectName: string
  subjectColor: string
  scheduledFor: string
  isOverdue: boolean
  daysUntilDue: number
  currentRetention: number
  repetitionCount: number
  priority: 'high' | 'medium' | 'low'
}

interface ForgettingCurveGraphProps {
  subjectCurves: SubjectCurve[]
  upcomingReviews: ReviewNode[]
  overdueReviews: ReviewNode[]
  totalDue: number
  onReviewClick?: (review: ReviewNode) => void
  onContentClick?: (contentId: string, contentTitle: string) => void
  className?: string
}

const CHART_HEIGHT = 280
const CHART_PADDING = { top: 20, right: 30, bottom: 40, left: 50 }

export function ForgettingCurveGraph({
  subjectCurves,
  upcomingReviews,
  overdueReviews,
  totalDue,
  onReviewClick,
  onContentClick,
  className
}: ForgettingCurveGraphProps) {
  const [hoveredSubject, setHoveredSubject] = useState<string | null>(null)
  const [selectedNode, setSelectedNode] = useState<{
    subject: SubjectCurve
    point: DataPoint
    x: number
    y: number
  } | null>(null)

  const days = 30
  const chartWidth = 800 // Base width, will scale with container

  // Calculate scales
  const xScale = useCallback((day: number) => {
    const effectiveWidth = chartWidth - CHART_PADDING.left - CHART_PADDING.right
    return CHART_PADDING.left + (day / days) * effectiveWidth
  }, [chartWidth])

  const yScale = useCallback((retention: number) => {
    const effectiveHeight = CHART_HEIGHT - CHART_PADDING.top - CHART_PADDING.bottom
    return CHART_PADDING.top + effectiveHeight - (retention / 100) * effectiveHeight
  }, [])

  // Generate smooth curve path using cubic bezier
  const generateCurvePath = useCallback((dataPoints: DataPoint[]) => {
    if (dataPoints.length < 2) return ''

    const points = dataPoints.map(p => ({
      x: xScale(p.day),
      y: yScale(p.retention)
    }))

    let path = `M ${points[0].x} ${points[0].y}`

    for (let i = 0; i < points.length - 1; i++) {
      const current = points[i]
      const next = points[i + 1]
      
      // Check if this is a review point (retention spike)
      const currentData = dataPoints[i]
      const nextData = dataPoints[i + 1]
      
      if (nextData.isReviewPoint) {
        // Sharp spike up for review
        const midX = (current.x + next.x) / 2
        path += ` L ${midX} ${current.y}`
        path += ` L ${next.x} ${next.y}`
      } else {
        // Smooth exponential decay curve
        const cp1x = current.x + (next.x - current.x) * 0.5
        const cp1y = current.y
        const cp2x = current.x + (next.x - current.x) * 0.5
        const cp2y = next.y + (current.y - next.y) * 0.3
        
        path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${next.x} ${next.y}`
      }
    }

    return path
  }, [xScale, yScale])

  // Get visible subjects (filter if one is hovered)
  const visibleSubjects = useMemo(() => {
    if (!hoveredSubject) return subjectCurves
    return subjectCurves.filter(s => s.subjectId === hoveredSubject)
  }, [subjectCurves, hoveredSubject])

  // Dimmed subjects
  const dimmedSubjects = useMemo(() => {
    if (!hoveredSubject) return []
    return subjectCurves.filter(s => s.subjectId !== hoveredSubject)
  }, [subjectCurves, hoveredSubject])

  // Format date for display
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    const today = new Date()
    const isToday = date.toDateString() === today.toDateString()
    
    if (isToday) return 'Today'
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  // Get retention status color
  const getRetentionColor = (retention: number) => {
    if (retention >= 80) return 'text-green-600'
    if (retention >= 60) return 'text-yellow-600'
    if (retention >= 40) return 'text-orange-600'
    return 'text-red-600'
  }

  // Get retention status badge
  const getRetentionBadge = (retention: number) => {
    if (retention >= 80) return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Strong</Badge>
    if (retention >= 60) return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Good</Badge>
    if (retention >= 40) return <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">Fading</Badge>
    return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Critical</Badge>
  }

  return (
    <TooltipProvider>
      <Card className={cn("overflow-hidden", className)}>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-purple-500" />
              <div>
                <CardTitle className="text-lg">Memory Retention</CardTitle>
                <CardDescription>
                  Spaced repetition review schedule based on forgetting curve
                </CardDescription>
              </div>
            </div>
            {totalDue > 0 && (
              <Badge variant={overdueReviews.length > 0 ? "destructive" : "default"} className="gap-1">
                <AlertCircle className="w-3 h-3" />
                {totalDue} due
              </Badge>
            )}
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Legend */}
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <span className="text-gray-500">Subjects:</span>
            {subjectCurves.map(subject => (
              <button
                key={subject.subjectId}
                onMouseEnter={() => setHoveredSubject(subject.subjectId)}
                onMouseLeave={() => setHoveredSubject(null)}
                onClick={() => setHoveredSubject(hoveredSubject === subject.subjectId ? null : subject.subjectId)}
                className={cn(
                  "flex items-center gap-1.5 px-2 py-1 rounded-full transition-all",
                  hoveredSubject === subject.subjectId 
                    ? "bg-gray-100 ring-2 ring-offset-1" 
                    : hoveredSubject 
                      ? "opacity-40"
                      : "hover:bg-gray-50"
                )}
                style={{ 
                  '--ring-color': subject.color,
                  ringColor: hoveredSubject === subject.subjectId ? subject.color : undefined 
                } as React.CSSProperties}
              >
                <span 
                  className="w-2.5 h-2.5 rounded-full" 
                  style={{ backgroundColor: subject.color }}
                />
                <span className="font-medium">{subject.subjectName}</span>
              </button>
            ))}
            {subjectCurves.length === 0 && (
              <span className="text-gray-400 italic">No subjects with review data</span>
            )}
          </div>

          {/* Graph */}
          <div className="relative w-full overflow-x-auto">
            <svg
              viewBox={`0 0 ${chartWidth} ${CHART_HEIGHT}`}
              className="w-full min-w-[600px]"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Background grid */}
              <defs>
                <pattern id="grid" width="50" height="28" patternUnits="userSpaceOnUse">
                  <path d="M 50 0 L 0 0 0 28" fill="none" stroke="#f0f0f0" strokeWidth="1"/>
                </pattern>
                <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="currentColor" stopOpacity="0.1"/>
                  <stop offset="100%" stopColor="currentColor" stopOpacity="0"/>
                </linearGradient>
              </defs>
              
              <rect width="100%" height="100%" fill="url(#grid)" />

              {/* Y-axis labels */}
              {[0, 25, 50, 75, 100].map(value => (
                <g key={value}>
                  <text
                    x={CHART_PADDING.left - 10}
                    y={yScale(value) + 4}
                    textAnchor="end"
                    className="text-xs fill-gray-400"
                  >
                    {value}%
                  </text>
                  <line
                    x1={CHART_PADDING.left}
                    y1={yScale(value)}
                    x2={chartWidth - CHART_PADDING.right}
                    y2={yScale(value)}
                    stroke="#e5e5e5"
                    strokeDasharray={value === 0 ? undefined : "4,4"}
                  />
                </g>
              ))}

              {/* X-axis labels */}
              {[0, 7, 14, 21, 30].map(day => (
                <g key={day}>
                  <text
                    x={xScale(day)}
                    y={CHART_HEIGHT - 10}
                    textAnchor="middle"
                    className="text-xs fill-gray-400"
                  >
                    {day === 0 ? 'Today' : `+${day}d`}
                  </text>
                  <line
                    x1={xScale(day)}
                    y1={CHART_PADDING.top}
                    x2={xScale(day)}
                    y2={CHART_HEIGHT - CHART_PADDING.bottom}
                    stroke="#e5e5e5"
                    strokeDasharray="2,2"
                  />
                </g>
              ))}

              {/* Axis labels */}
              <text
                x={20}
                y={CHART_HEIGHT / 2}
                textAnchor="middle"
                transform={`rotate(-90, 20, ${CHART_HEIGHT / 2})`}
                className="text-xs fill-gray-500 font-medium"
              >
                Retention
              </text>
              
              <text
                x={chartWidth / 2}
                y={CHART_HEIGHT - 2}
                textAnchor="middle"
                className="text-xs fill-gray-500 font-medium"
              >
                Time
              </text>

              {/* Dimmed subjects (when hovering) */}
              {dimmedSubjects.map(subject => (
                <g key={subject.subjectId} opacity={0.2}>
                  <path
                    d={generateCurvePath(subject.dataPoints)}
                    fill="none"
                    stroke={subject.color}
                    strokeWidth={2}
                  />
                </g>
              ))}

              {/* Visible subject curves */}
              {visibleSubjects.map(subject => (
                <g key={subject.subjectId}>
                  {/* Area under curve */}
                  <path
                    d={`${generateCurvePath(subject.dataPoints)} L ${xScale(days)} ${yScale(0)} L ${xScale(0)} ${yScale(0)} Z`}
                    fill={subject.color}
                    opacity={0.05}
                  />
                  
                  {/* Curve line */}
                  <path
                    d={generateCurvePath(subject.dataPoints)}
                    fill="none"
                    stroke={subject.color}
                    strokeWidth={hoveredSubject === subject.subjectId ? 3 : 2}
                    className="transition-all duration-200"
                  />

                  {/* Review nodes */}
                  {subject.dataPoints
                    .filter(p => p.isReviewPoint)
                    .map((point, idx) => {
                      const x = xScale(point.day)
                      const y = yScale(point.retention)
                      const isOverdue = new Date(point.date) < new Date() && point.day === 0
                      
                      return (
                        <g key={idx}>
                          {/* Pulse animation for overdue */}
                          {isOverdue && (
                            <circle
                              cx={x}
                              cy={y}
                              r={8}
                              fill={subject.color}
                              opacity={0.3}
                            >
                              <animate
                                attributeName="r"
                                values="8;12;8"
                                dur="2s"
                                repeatCount="indefinite"
                              />
                              <animate
                                attributeName="opacity"
                                values="0.3;0;0.3"
                                dur="2s"
                                repeatCount="indefinite"
                              />
                            </circle>
                          )}
                          
                          {/* Node circle */}
                          <circle
                            cx={x}
                            cy={y}
                            r={6}
                            fill={isOverdue ? '#ef4444' : 'white'}
                            stroke={subject.color}
                            strokeWidth={3}
                            className="cursor-pointer transition-all duration-200 hover:r-8"
                            onClick={() => {
                              if (point.contentId && onContentClick) {
                                onContentClick(point.contentId, point.contentTitle || '')
                              }
                              setSelectedNode({ subject, point, x, y })
                            }}
                          />
                        </g>
                      )
                    })}
                </g>
              ))}
            </svg>

            {/* Selected node tooltip */}
            {selectedNode && (
              <div 
                className="absolute bg-white border rounded-lg shadow-lg p-3 z-10 min-w-[200px]"
                style={{
                  left: `${(selectedNode.x / chartWidth) * 100}%`,
                  top: `${(selectedNode.y / CHART_HEIGHT) * 100}%`,
                  transform: 'translate(-50%, -120%)'
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: selectedNode.subject.color }}
                  />
                  <span className="font-medium text-sm">{selectedNode.subject.subjectName}</span>
                </div>
                <p className="text-sm font-medium">{selectedNode.point.contentTitle}</p>
                <p className="text-xs text-gray-500 mb-2">
                  {formatDate(selectedNode.point.date)}
                </p>
                <div className="flex items-center justify-between">
                  {getRetentionBadge(selectedNode.point.retention)}
                  {selectedNode.point.contentId && (
                    <Button 
                      size="sm" 
                      variant="ghost"
                      className="h-7 text-xs"
                      onClick={() => onContentClick?.(selectedNode.point.contentId!, selectedNode.point.contentTitle || '')}
                    >
                      Review
                    </Button>
                  )}
                </div>
                
                {/* Arrow */}
                <div className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-white" />
              </div>
            )}
          </div>

          {/* Upcoming Reviews List */}
          {(upcomingReviews.length > 0 || overdueReviews.length > 0) && (
            <div className="space-y-3 pt-4 border-t">
              <h4 className="font-medium text-sm flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Upcoming Reviews
              </h4>
              
              {/* Overdue first */}
              {overdueReviews.slice(0, 3).map(review => (
                <div 
                  key={review.id}
                  className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-100"
                >
                  <div className="flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-red-500" />
                    <div>
                      <p className="font-medium text-sm">{review.contentTitle}</p>
                      <p className="text-xs text-red-600">
                        {review.daysOverdue} day{review.daysOverdue !== 1 ? 's' : ''} overdue
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={cn("text-sm font-medium", getRetentionColor(review.currentRetention))}>
                      {review.currentRetention}%
                    </span>
                    <Button 
                      size="sm" 
                      variant="destructive"
                      onClick={() => onReviewClick?.(review as ReviewNode)}
                    >
                      Review Now
                    </Button>
                  </div>
                </div>
              ))}

              {/* Upcoming */}
              {upcomingReviews.slice(0, overdueReviews.length > 0 ? 2 : 4).map(review => (
                <div 
                  key={review.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-2 h-2 rounded-full" 
                      style={{ backgroundColor: review.subjectColor }}
                    />
                    <div>
                      <p className="font-medium text-sm">{review.contentTitle}</p>
                      <p className="text-xs text-gray-500">
                        {review.daysUntilDue === 0 
                          ? 'Due today' 
                          : `In ${review.daysUntilDue} day${review.daysUntilDue !== 1 ? 's' : ''}`}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={cn("text-sm font-medium", getRetentionColor(review.currentRetention))}>
                      {review.currentRetention}%
                    </span>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => onReviewClick?.(review as ReviewNode)}
                    >
                      {review.daysUntilDue === 0 ? 'Review' : 'Preview'}
                    </Button>
                  </div>
                </div>
              ))}

              {(upcomingReviews.length + overdueReviews.length) > 5 && (
                <Button variant="ghost" size="sm" className="w-full">
                  View all {upcomingReviews.length + overdueReviews.length} reviews
                </Button>
              )}
            </div>
          )}

          {/* Empty state */}
          {upcomingReviews.length === 0 && overdueReviews.length === 0 && subjectCurves.length === 0 && (
            <div className="text-center py-8">
              <Brain className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <h4 className="font-medium text-gray-700">No reviews scheduled yet</h4>
              <p className="text-sm text-gray-500 mt-1">
                Start learning and complete quizzes to build your review schedule
              </p>
            </div>
          )}

          {/* Info footer */}
          <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <TrendingDown className="w-3 h-3" />
                Lines show memory decay over time
              </span>
              <span className="flex items-center gap-1">
                <RotateCcw className="w-3 h-3" />
                Dots indicate scheduled reviews
              </span>
            </div>
            <span className="flex items-center gap-1">
              <BookOpen className="w-3 h-3" />
              Based on Ebbinghaus forgetting curve
            </span>
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  )
}

export type { ReviewNode, SubjectCurve, DataPoint }
