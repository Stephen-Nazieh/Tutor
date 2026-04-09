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

export function StatsOverview() {
  return null
}
