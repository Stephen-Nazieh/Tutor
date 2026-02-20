'use client'

import { useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { TrendingUp, Clock, Calendar, ArrowRight } from 'lucide-react'

interface ReviewImpactVizProps {
  contentTitle: string
  beforeRetention: number
  afterRetention: number
  nextReviewDate: string
  intervalDays: number
  previousInterval: number
}

export function ReviewImpactViz({
  contentTitle,
  beforeRetention,
  afterRetention,
  nextReviewDate,
  intervalDays,
  previousInterval
}: ReviewImpactVizProps) {
  
  // Generate curve data points
  const generateCurve = (startRetention: number, stability: number, days: number) => {
    const points: Array<{ day: number; retention: number }> = []
    for (let day = 0; day <= days; day++) {
      const hours = day * 24
      const retention = startRetention * Math.exp(-hours / stability)
      points.push({ day, retention: Math.max(0, retention) })
    }
    return points
  }

  // Calculate stability from interval (when retention hits 85%)
  const calculateStability = (intervalDays: number) => {
    return -intervalDays * 24 / Math.log(0.85)
  }

  const beforeStability = calculateStability(previousInterval || 3)
  const afterStability = calculateStability(intervalDays)

  const beforeCurve = generateCurve(beforeRetention, beforeStability, 14)
  const afterCurve = generateCurve(afterRetention, afterStability, intervalDays + 7)

  // SVG dimensions
  const width = 400
  const height = 150
  const padding = { top: 10, right: 10, bottom: 30, left: 40 }

  const chartWidth = width - padding.left - padding.right
  const chartHeight = height - padding.top - padding.bottom

  const xScale = (day: number, maxDays: number) => {
    return padding.left + (day / maxDays) * chartWidth
  }

  const yScale = (retention: number) => {
    return padding.top + chartHeight - (retention / 100) * chartHeight
  }

  // Create path string
  const createPath = (points: Array<{ day: number; retention: number }>, maxDays: number) => {
    return points
      .map((p, i) => `${i === 0 ? 'M' : 'L'} ${xScale(p.day, maxDays)} ${yScale(p.retention)}`)
      .join(' ')
  }

  const improvement = afterRetention - beforeRetention
  const intervalGrowth = ((intervalDays - previousInterval) / previousInterval * 100).toFixed(0)

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    })
  }

  return (
    <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              Review Impact
            </CardTitle>
            <CardDescription>How this review strengthened your memory</CardDescription>
          </div>
          <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
            +{improvement.toFixed(0)}% boost
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Title */}
        <p className="font-medium text-gray-700">{contentTitle}</p>

        {/* Comparison Chart */}
        <div className="relative">
          <svg viewBox={`0 0 ${width} ${height}`} className="w-full">
            {/* Grid lines */}
            {[0, 50, 100].map(y => (
              <line
                key={y}
                x1={padding.left}
                y1={yScale(y)}
                x2={width - padding.right}
                y2={yScale(y)}
                stroke="#e5e7eb"
                strokeWidth="1"
                strokeDasharray="4,4"
              />
            ))}

            {/* Y-axis labels */}
            {[0, 50, 100].map(y => (
              <text
                key={y}
                x={padding.left - 5}
                y={yScale(y) + 4}
                textAnchor="end"
                className="text-xs fill-gray-400"
              >
                {y}%
              </text>
            ))}

            {/* Before curve (dashed, faded) */}
            <path
              d={createPath(beforeCurve, 14)}
              fill="none"
              stroke="#ef4444"
              strokeWidth="2"
              strokeDasharray="5,5"
              opacity="0.5"
            />

            {/* After curve (solid) */}
            <path
              d={createPath(afterCurve, intervalDays + 7)}
              fill="none"
              stroke="#22c55e"
              strokeWidth="3"
            />

            {/* Before retention point */}
            <circle
              cx={xScale(0, intervalDays + 7)}
              cy={yScale(beforeRetention)}
              r="5"
              fill="#ef4444"
              stroke="white"
              strokeWidth="2"
            />

            {/* After retention point */}
            <circle
              cx={xScale(0, intervalDays + 7)}
              cy={yScale(afterRetention)}
              r="6"
              fill="#22c55e"
              stroke="white"
              strokeWidth="2"
            />

            {/* Next review point */}
            <circle
              cx={xScale(intervalDays, intervalDays + 7)}
              cy={yScale(85)}
              r="5"
              fill="#3b82f6"
              stroke="white"
              strokeWidth="2"
            />

            {/* X-axis labels */}
            <text
              x={padding.left}
              y={height - 5}
              className="text-xs fill-gray-400"
              textAnchor="middle"
            >
              Now
            </text>
            <text
              x={xScale(intervalDays, intervalDays + 7)}
              y={height - 5}
              className="text-xs fill-gray-400"
              textAnchor="middle"
            >
              +{intervalDays}d
            </text>
          </svg>

          {/* Legend */}
          <div className="flex items-center justify-center gap-6 mt-2 text-xs">
            <span className="flex items-center gap-1">
              <span className="w-3 h-0.5 bg-red-400 border-dashed" style={{ borderTop: '2px dashed' }} />
              Before review
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-0.5 bg-green-500" style={{ borderTop: '3px solid' }} />
              After review
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              Next review
            </span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center p-3 bg-white rounded-lg">
            <p className="text-xs text-gray-500">Was</p>
            <p className="text-xl font-bold text-red-500">{beforeRetention.toFixed(0)}%</p>
          </div>
          <div className="text-center p-3 bg-white rounded-lg">
            <p className="text-xs text-gray-500">Now</p>
            <p className="text-xl font-bold text-green-600">{afterRetention.toFixed(0)}%</p>
          </div>
          <div className="text-center p-3 bg-white rounded-lg">
            <p className="text-xs text-gray-500">Next Review</p>
            <div className="flex items-center justify-center gap-1">
              <Calendar className="w-4 h-4 text-blue-500" />
              <p className="text-sm font-bold">{intervalDays}d</p>
            </div>
          </div>
        </div>

        {/* Interval growth message */}
        {Number(intervalGrowth) > 0 && (
          <div className="flex items-center gap-2 p-3 bg-green-100 rounded-lg text-sm">
            <TrendingUp className="w-4 h-4 text-green-600" />
            <span className="text-green-700">
              Great job! Next review extended by {intervalGrowth}% due to strong performance.
            </span>
          </div>
        )}

        {/* Next review info */}
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            Next review scheduled
          </span>
          <span className="font-medium">{formatDate(nextReviewDate)}</span>
        </div>
      </CardContent>
    </Card>
  )
}
