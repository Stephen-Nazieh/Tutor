'use client'

import { useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { CalendarDays, Flame, Target } from 'lucide-react'

interface ReviewDay {
  date: string
  count: number
  level: 0 | 1 | 2 | 3 | 4
}

interface ReviewHeatmapProps {
  reviewHistory: ReviewDay[]
  streakDays: number
  longestStreak: number
  totalReviews: number
}

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export function ReviewHeatmap({
  reviewHistory,
  streakDays,
  longestStreak,
  totalReviews,
}: ReviewHeatmapProps) {
  // Generate last 365 days
  const heatmapData = useMemo(() => {
    const today = new Date()
    const days: Array<{
      date: Date
      dateStr: string
      count: number
      level: 0 | 1 | 2 | 3 | 4
    }> = []

    for (let i = 364; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)
      const dateStr = date.toISOString().split('T')[0]

      // Find matching review day
      const reviewDay = reviewHistory.find(r => r.date === dateStr)

      days.push({
        date,
        dateStr,
        count: reviewDay?.count || 0,
        level: reviewDay?.level || 0,
      })
    }

    return days
  }, [reviewHistory])

  // Group by week for grid layout
  const weeks = useMemo(() => {
    const grouped: (typeof heatmapData)[] = []
    for (let i = 0; i < heatmapData.length; i += 7) {
      grouped.push(heatmapData.slice(i, i + 7))
    }
    return grouped
  }, [heatmapData])

  // Get month labels
  const monthLabels = useMemo(() => {
    const labels: Array<{ month: string; index: number }> = []
    let currentMonth = -1

    weeks.forEach((week, weekIndex) => {
      const firstDay = week[0]
      if (firstDay && firstDay.date.getMonth() !== currentMonth) {
        currentMonth = firstDay.date.getMonth()
        labels.push({ month: MONTHS[currentMonth], index: weekIndex })
      }
    })

    return labels
  }, [weeks])

  const getLevelColor = (level: number) => {
    switch (level) {
      case 0:
        return 'bg-gray-100'
      case 1:
        return 'bg-green-200'
      case 2:
        return 'bg-green-300'
      case 3:
        return 'bg-green-500'
      case 4:
        return 'bg-green-700'
      default:
        return 'bg-gray-100'
    }
  }

  const getLevelLabel = (level: number) => {
    switch (level) {
      case 0:
        return 'No reviews'
      case 1:
        return '1 review'
      case 2:
        return '2 reviews'
      case 3:
        return '3-4 reviews'
      case 4:
        return '5+ reviews'
      default:
        return 'No reviews'
    }
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    })
  }

  return (
    <TooltipProvider>
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 text-lg">
                <CalendarDays className="h-5 w-5" />
                Review Activity
              </CardTitle>
              <CardDescription>Your review history over the past year</CardDescription>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Flame className="h-4 w-4 text-orange-500" />
                <span className="font-medium">{streakDays}</span>
                <span className="text-gray-500">day streak</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-blue-500" />
                <span className="font-medium">{totalReviews}</span>
                <span className="text-gray-500">total</span>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {/* Month labels */}
          <div className="mb-1 flex">
            <div className="w-8" /> {/* Spacer for day labels */}
            <div className="relative h-5 flex-1">
              {monthLabels.map((label, i) => (
                <span
                  key={i}
                  className="absolute text-xs text-gray-400"
                  style={{ left: `${(label.index / weeks.length) * 100}%` }}
                >
                  {label.month}
                </span>
              ))}
            </div>
          </div>

          {/* Heatmap grid */}
          <div className="flex">
            {/* Day labels */}
            <div className="mr-2 flex flex-col justify-around py-1">
              {DAYS.filter((_, i) => [1, 3, 5].includes(i)).map(day => (
                <span key={day} className="h-3 text-xs leading-3 text-gray-400">
                  {day}
                </span>
              ))}
            </div>

            {/* Grid */}
            <div className="flex flex-1 gap-[2px] overflow-x-auto pb-2">
              {weeks.map((week, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-[2px]">
                  {week.map((day, dayIndex) => (
                    <Tooltip key={dayIndex}>
                      <TooltipTrigger asChild>
                        <div
                          className={cn(
                            'h-3 w-3 cursor-pointer rounded-sm transition-colors hover:ring-2 hover:ring-blue-400 hover:ring-offset-1',
                            getLevelColor(day.level)
                          )}
                        />
                      </TooltipTrigger>
                      <TooltipContent side="top" className="text-xs">
                        <p className="font-medium">{formatDate(day.date)}</p>
                        <p>{getLevelLabel(day.level)}</p>
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
            <span>Less</span>
            <div className="flex gap-1">
              {[0, 1, 2, 3, 4].map(level => (
                <div
                  key={level}
                  className={cn('h-3 w-3 rounded-sm', getLevelColor(level))}
                  title={getLevelLabel(level)}
                />
              ))}
            </div>
            <span>More</span>
          </div>

          {/* Stats */}
          <div className="mt-4 grid grid-cols-3 gap-4 border-t pt-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{streakDays}</p>
              <p className="text-xs text-gray-500">Current Streak</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{longestStreak}</p>
              <p className="text-xs text-gray-500">Longest Streak</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">
                {Math.round((totalReviews / 365) * 7)}/7
              </p>
              <p className="text-xs text-gray-500">Weekly Average</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  )
}
