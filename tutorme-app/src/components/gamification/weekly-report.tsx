/**
 * Weekly Report Component
 *
 * PRO/ELITE feature - Shows weekly progress analytics
 */

'use client'

import { TrendingUp, TrendingDown, Target, Award, Clock, Flame, Zap, BookOpen } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface WeeklyReportProps {
  data: {
    weekStart: string
    weekEnd: string
    xpGained: number
    xpChange: number
    missionsCompleted: number
    missionsChange: number
    speakingMinutes: number
    speakingChange: number
    confidenceGrowth: number
    streakDays: number
    strongestSkill: string
    weakestSkill: string
    achievements: string[]
  }
  tier: 'FREE' | 'PRO' | 'ELITE'
  className?: string
}

export function WeeklyReport({ data, tier, className }: WeeklyReportProps) {
  const isLocked = tier === 'FREE'

  if (isLocked) {
    return (
      <Card className={cn('overflow-hidden', className)}>
        <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-6 text-center text-white">
          <Award className="mx-auto mb-3 h-12 w-12 opacity-80" />
          <h3 className="mb-2 text-lg font-semibold">Weekly Reports</h3>
          <p className="mb-4 text-sm text-blue-100">
            Upgrade to PRO to unlock detailed weekly progress reports
          </p>
          <Button variant="secondary" size="sm">
            Upgrade to PRO
          </Button>
        </div>
      </Card>
    )
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Award className="h-5 w-5 text-purple-500" />
            Weekly Report
          </span>
          <span className="text-sm font-normal text-gray-500">
            {data.weekStart} - {data.weekEnd}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Key Stats */}
        <div className="grid grid-cols-2 gap-4">
          <StatCard
            label="XP Gained"
            value={data.xpGained}
            change={data.xpChange}
            icon={Zap}
            color="yellow"
          />
          <StatCard
            label="Missions"
            value={data.missionsCompleted}
            change={data.missionsChange}
            icon={Target}
            color="blue"
          />
          <StatCard
            label="Speaking"
            value={`${data.speakingMinutes}m`}
            change={data.speakingChange}
            icon={Clock}
            color="green"
          />
          <StatCard label="Streak" value={data.streakDays} change={0} icon={Flame} color="orange" />
        </div>

        {/* Confidence Growth */}
        <div className="rounded-lg bg-purple-50 p-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="font-medium text-purple-700">Confidence Growth</span>
            <span className="text-lg font-bold text-purple-700">+{data.confidenceGrowth}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-purple-200">
            <div
              className="h-full rounded-full bg-purple-500 transition-all"
              style={{ width: `${Math.min(100, data.confidenceGrowth * 5)}%` }}
            />
          </div>
          <p className="mt-2 text-xs text-purple-600">
            You&apos;ve improved your speaking confidence this week!
          </p>
        </div>

        {/* Skills */}
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg bg-green-50 p-3">
            <p className="mb-1 text-xs text-green-600">💪 Strongest Skill</p>
            <p className="font-medium capitalize text-green-700">{data.strongestSkill}</p>
          </div>
          <div className="rounded-lg bg-orange-50 p-3">
            <p className="mb-1 text-xs text-orange-600">🎯 Focus Area</p>
            <p className="font-medium capitalize text-orange-700">{data.weakestSkill}</p>
          </div>
        </div>

        {/* Achievements */}
        {data.achievements.length > 0 && (
          <div>
            <p className="mb-2 text-sm font-medium text-gray-700">Achievements Unlocked</p>
            <div className="flex flex-wrap gap-2">
              {data.achievements.map((achievement, idx) => (
                <span
                  key={idx}
                  className="rounded-full bg-yellow-100 px-3 py-1 text-sm text-yellow-700"
                >
                  🏆 {achievement}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Next Week Preview */}
        <div className="border-t pt-4">
          <p className="mb-2 text-sm font-medium text-gray-700">Next Week&apos;s Goal</p>
          <p className="text-sm text-gray-600">
            Complete 5 missions and speak for at least 30 minutes to maintain your streak!
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

function StatCard({
  label,
  value,
  change,
  icon: Icon,
  color,
}: {
  label: string
  value: string | number
  change: number
  icon: React.ComponentType<{ className?: string }>
  color: 'yellow' | 'blue' | 'green' | 'orange'
}) {
  const colors = {
    yellow: 'bg-yellow-50 text-yellow-600',
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    orange: 'bg-orange-50 text-orange-600',
  }

  return (
    <div className={cn('rounded-lg p-3', colors[color])}>
      <div className="mb-1 flex items-center gap-2">
        <Icon className="h-4 w-4" />
        <span className="text-xs opacity-80">{label}</span>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-xl font-bold">{value}</span>
        {change !== 0 && (
          <span
            className={cn(
              'flex items-center text-xs',
              change > 0 ? 'text-green-600' : 'text-red-600'
            )}
          >
            {change > 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
            {Math.abs(change)}%
          </span>
        )}
      </div>
    </div>
  )
}
