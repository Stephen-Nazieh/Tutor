'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Flame, Target, Award, TrendingUp } from 'lucide-react'

interface StatsOverviewProps {
  gamification: {
    level: number
    xp: number
    xpToNextLevel: number
    progress: number
    streakDays: number
    longestStreak: number
  } | null
}

export function StatsOverview({ gamification }: StatsOverviewProps) {
  if (!gamification) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Level</p>
                <p className="text-3xl font-bold">1</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">Start learning to earn XP</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-gray-500">Total XP</p>
            <p className="text-3xl font-bold">0</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-gray-500">Current Streak</p>
            <p className="text-3xl font-bold">0 <span className="text-sm text-gray-500">days</span></p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-gray-500">Best Streak</p>
            <p className="text-3xl font-bold">0 <span className="text-sm text-gray-500">days</span></p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Level</p>
              <p className="text-3xl font-bold">{gamification.level}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4">
            <Progress value={gamification.progress} className="h-2" />
            <p className="text-xs text-gray-500 mt-1">
              {gamification.xpToNextLevel} XP to next level
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total XP</p>
              <p className="text-3xl font-bold">{gamification.xp.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <Award className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Current Streak</p>
              <div className="flex items-center gap-2">
                <p className="text-3xl font-bold">{gamification.streakDays}</p>
                <span className="text-sm text-gray-500">days</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <Flame className="w-6 h-6 text-orange-600" />
            </div>
          </div>
          {gamification.streakDays > 0 && (
            <Badge className="mt-2 bg-orange-100 text-orange-800">
              Keep it up!
            </Badge>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Best Streak</p>
              <div className="flex items-center gap-2">
                <p className="text-3xl font-bold">{gamification.longestStreak}</p>
                <span className="text-sm text-gray-500">days</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <Target className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
