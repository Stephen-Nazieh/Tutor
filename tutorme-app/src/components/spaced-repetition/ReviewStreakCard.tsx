'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'
import {
  Flame,
  Trophy,
  Target,
  Zap,
  Star,
  Crown,
  Medal,
  Award,
  Rocket,
  Brain,
  Clock,
  Calendar
} from 'lucide-react'

interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  unlocked: boolean
  unlockedAt?: string
  progress: number
  maxProgress: number
}

interface ReviewStreakCardProps {
  streakDays: number
  longestStreak: number
  totalReviews: number
  weeklyReviews: number
  achievements: Achievement[]
}

const ACHIEVEMENT_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  flame: Flame,
  trophy: Trophy,
  target: Target,
  zap: Zap,
  star: Star,
  crown: Crown,
  medal: Medal,
  award: Award,
  rocket: Rocket,
  brain: Brain,
  clock: Clock,
  calendar: Calendar
}

export function ReviewStreakCard({
  streakDays,
  longestStreak,
  totalReviews,
  weeklyReviews,
  achievements
}: ReviewStreakCardProps) {
  
  // Calculate streak status
  const getStreakStatus = () => {
    if (streakDays >= 30) return { label: 'Unstoppable!', color: 'text-purple-600', bg: 'bg-purple-100' }
    if (streakDays >= 14) return { label: 'On Fire!', color: 'text-orange-600', bg: 'bg-orange-100' }
    if (streakDays >= 7) return { label: 'Heating Up!', color: 'text-yellow-600', bg: 'bg-yellow-100' }
    if (streakDays >= 3) return { label: 'Getting Started', color: 'text-green-600', bg: 'bg-green-100' }
    return { label: 'Start Today!', color: 'text-gray-600', bg: 'bg-gray-100' }
  }

  const streakStatus = getStreakStatus()

  // Get next milestone
  const getNextMilestone = () => {
    if (streakDays < 3) return { target: 3, label: '3-day streak' }
    if (streakDays < 7) return { target: 7, label: 'Week warrior' }
    if (streakDays < 14) return { target: 14, label: '2-week streak' }
    if (streakDays < 30) return { target: 30, label: 'Month master' }
    return { target: 60, label: '2-month legend' }
  }

  const nextMilestone = getNextMilestone()
  const milestoneProgress = Math.min(100, (streakDays / nextMilestone.target) * 100)

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-500" />
            Achievements & Streaks
          </CardTitle>
          <Badge className={cn(streakStatus.bg, streakStatus.color)}>
            {streakStatus.label}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Streak Section */}
        <div className={cn("p-4 rounded-xl", streakStatus.bg)}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Flame className={cn("w-10 h-10", streakStatus.color)} />
                {streakDays > 0 && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center text-xs font-bold shadow-sm">
                    {streakDays}
                  </div>
                )}
              </div>
              <div>
                <p className={cn("text-2xl font-bold", streakStatus.color)}>
                  {streakDays} Day{streakDays !== 1 ? 's' : ''}
                </p>
                <p className="text-sm opacity-70">Current Streak</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium">Longest: {longestStreak}</p>
              <p className="text-xs opacity-60">days</p>
            </div>
          </div>

          {/* Milestone Progress */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="opacity-70">Next: {nextMilestone.label}</span>
              <span className="font-medium">{streakDays}/{nextMilestone.target}</span>
            </div>
            <Progress value={milestoneProgress} className="h-2" />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <Brain className="w-5 h-5 text-blue-500 mx-auto mb-1" />
            <p className="text-xl font-bold">{totalReviews}</p>
            <p className="text-xs text-gray-500">Total Reviews</p>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <Calendar className="w-5 h-5 text-green-500 mx-auto mb-1" />
            <p className="text-xl font-bold">{weeklyReviews}</p>
            <p className="text-xs text-gray-500">This Week</p>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <Target className="w-5 h-5 text-purple-500 mx-auto mb-1" />
            <p className="text-xl font-bold">
              {Math.round((totalReviews / (streakDays || 1)) * 10) / 10}
            </p>
            <p className="text-xs text-gray-500">Per Day</p>
          </div>
        </div>

        {/* Achievements */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm flex items-center gap-2">
            <Award className="w-4 h-4" />
            Recent Achievements
          </h4>
          
          <div className="grid grid-cols-4 gap-2">
            {achievements.slice(0, 8).map(achievement => {
              const Icon = ACHIEVEMENT_ICONS[achievement.icon] || Star
              
              return (
                <div
                  key={achievement.id}
                  className={cn(
                    "relative p-3 rounded-lg text-center transition-all cursor-pointer group",
                    achievement.unlocked 
                      ? "bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200" 
                      : "bg-gray-50 border border-gray-200 opacity-60"
                  )}
                  title={achievement.description}
                >
                  <Icon className={cn(
                    "w-6 h-6 mx-auto mb-1",
                    achievement.unlocked ? "text-yellow-500" : "text-gray-400"
                  )} />
                  <p className="text-xs font-medium truncate">{achievement.title}</p>
                  
                  {!achievement.unlocked && achievement.maxProgress > 1 && (
                    <div className="mt-2">
                      <Progress 
                        value={(achievement.progress / achievement.maxProgress) * 100} 
                        className="h-1"
                      />
                      <p className="text-[10px] text-gray-400 mt-1">
                        {achievement.progress}/{achievement.maxProgress}
                      </p>
                    </div>
                  )}

                  {achievement.unlocked && (
                    <div className="absolute -top-1 -right-1">
                      <Badge variant="default" className="h-4 w-4 p-0 flex items-center justify-center bg-yellow-400 text-yellow-900">
                        ✓
                      </Badge>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Default achievements if none provided */}
          {achievements.length === 0 && (
            <div className="grid grid-cols-4 gap-2">
              {[
                { icon: 'flame', title: 'First Review', unlocked: totalReviews >= 1 },
                { icon: 'target', title: 'Week Warrior', unlocked: longestStreak >= 7 },
                { icon: 'zap', title: 'Speed Demon', unlocked: false },
                { icon: 'brain', title: 'Memory Master', unlocked: totalReviews >= 50 },
                { icon: 'crown', title: '30-Day King', unlocked: longestStreak >= 30 },
                { icon: 'rocket', title: 'Quick Learner', unlocked: weeklyReviews >= 10 },
                { icon: 'calendar', title: 'Consistent', unlocked: streakDays >= 14 },
                { icon: 'award', title: 'Century Club', unlocked: totalReviews >= 100 }
              ].map((ach, i) => {
                const Icon = ACHIEVEMENT_ICONS[ach.icon] || Star
                return (
                  <div
                    key={i}
                    className={cn(
                      "p-3 rounded-lg text-center",
                      ach.unlocked 
                        ? "bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200" 
                        : "bg-gray-50 border border-gray-200 opacity-50"
                    )}
                  >
                    <Icon className={cn(
                      "w-6 h-6 mx-auto mb-1",
                      ach.unlocked ? "text-yellow-500" : "text-gray-400"
                    )} />
                    <p className="text-xs font-medium truncate">{ach.title}</p>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
