/**
 * XP Bar Component
 * 
 * Displays user's level, XP progress, and streak
 */

'use client'

import { Progress } from '@/components/ui/progress'
import { Flame, Star, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'

interface XpBarProps {
  level: number
  xp: number
  xpToNextLevel: number
  progress: number
  streakDays: number
  className?: string
}

export function XpBar({
  level,
  xp,
  xpToNextLevel,
  progress,
  streakDays,
  className,
}: XpBarProps) {
  const isLongStreak = streakDays >= 7
  const isEpicStreak = streakDays >= 30

  return (
    <div className={cn('bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-4 text-white', className)}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
            <span className="text-xl font-bold">{level}</span>
          </div>
          <div>
            <p className="font-semibold">Level {level}</p>
            <p className="text-xs text-blue-100">
              {xp.toLocaleString()} XP
            </p>
          </div>
        </div>

        {streakDays > 0 && (
          <div className={cn(
            'flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-sm',
            isEpicStreak ? 'bg-yellow-500/30 text-yellow-100' :
            isLongStreak ? 'bg-orange-500/30 text-orange-100' :
            'bg-white/20 text-white'
          )}>
            <Flame className={cn(
              'w-4 h-4',
              isEpicStreak && 'animate-pulse'
            )} />
            <span className="font-semibold">{streakDays}</span>
            <span className="text-xs opacity-90">day{streakDays !== 1 ? 's' : ''}</span>
          </div>
        )}
      </div>

      <div className="space-y-1">
        <div className="flex justify-between text-xs text-blue-100">
          <span>Progress to Level {level + 1}</span>
          <span>{progress}%</span>
        </div>
        <Progress 
          value={progress} 
          className="h-2 bg-white/20"
        />
        <p className="text-xs text-blue-200 text-right">
          {xpToNextLevel.toLocaleString()} XP to next level
        </p>
      </div>

      {/* Quick stats */}
      <div className="flex gap-4 mt-4 pt-3 border-t border-white/20">
        <div className="flex items-center gap-1.5">
          <Star className="w-4 h-4 text-yellow-300" />
          <span className="text-sm">Level {level}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Zap className="w-4 h-4 text-yellow-300" />
          <span className="text-sm">{xp.toLocaleString()} XP</span>
        </div>
      </div>
    </div>
  )
}
