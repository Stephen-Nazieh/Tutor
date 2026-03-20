'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Award, Trophy } from 'lucide-react'

interface Achievement {
  id: string
  badgeType: string
  badgeName: string
  badgeIcon: string
  description: string
  earnedAt: string
}

interface AchievementsProps {
  compact?: boolean
}

export function Achievements({ compact }: AchievementsProps) {
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch achievements
    fetch('/api/achievements')
      .then(res => res.json())
      .then(data => {
        setAchievements(data.achievements || [])
        setLoading(false)
      })
      .catch(() => setLoading(false))

    // Check for new achievements
    fetch('/api/achievements', { method: 'POST' })
      .then(res => res.json())
      .then(data => {
        if (data.newAchievements?.length > 0) {
          // Refresh to get new achievements
          fetch('/api/achievements')
            .then(res => res.json())
            .then(data => setAchievements(data.achievements || []))
        }
      })
  }, [])

  if (loading) {
    return compact ? (
      <div className="py-4 text-center">
        <div className="mx-auto h-6 w-6 animate-spin rounded-full border-b-2 border-blue-600"></div>
      </div>
    ) : (
      <Card>
        <CardContent className="pt-8 text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600"></div>
        </CardContent>
      </Card>
    )
  }

  if (achievements.length === 0) {
    return compact ? (
      <div className="py-4 text-center">
        <Trophy className="mx-auto mb-2 h-8 w-8 text-gray-300" />
        <p className="text-sm text-gray-500">No badges yet</p>
      </div>
    ) : (
      <Card>
        <CardContent className="pb-8 pt-8 text-center">
          <Trophy className="mx-auto mb-3 h-12 w-12 text-gray-300" />
          <p className="text-gray-600">No achievements yet</p>
          <p className="text-sm text-gray-400">Complete lessons to earn badges!</p>
        </CardContent>
      </Card>
    )
  }

  if (compact) {
    // Compact mode: show trophy count and recent badges
    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between rounded-lg bg-gradient-to-br from-yellow-50 to-orange-50 p-3">
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-600" />
            <span className="text-sm text-gray-600">Badges Earned</span>
          </div>
          <span className="text-xl font-bold text-yellow-700">{achievements.length}</span>
        </div>

        {achievements.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {achievements.slice(0, 4).map(achievement => (
              <div
                key={achievement.id}
                className="flex items-center gap-1.5 rounded bg-gray-50 px-2 py-1 text-xs"
                title={achievement.description}
              >
                <span className="text-lg">{achievement.badgeIcon}</span>
                <span className="max-w-[80px] truncate font-medium">{achievement.badgeName}</span>
              </div>
            ))}
            {achievements.length > 4 && (
              <div className="flex items-center rounded bg-gray-100 px-2 py-1 text-xs text-gray-500">
                +{achievements.length - 4} more
              </div>
            )}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-yellow-50 to-orange-50">
          <CardContent className="pt-4 text-center">
            <Trophy className="mx-auto mb-2 h-8 w-8 text-yellow-600" />
            <p className="text-2xl font-bold">{achievements.length}</p>
            <p className="text-sm text-gray-600">Badges Earned</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Your Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            {achievements.map(achievement => (
              <div
                key={achievement.id}
                className="flex items-center gap-3 rounded-lg bg-gray-50 p-3"
              >
                <span className="text-3xl">{achievement.badgeIcon}</span>
                <div>
                  <p className="font-semibold">{achievement.badgeName}</p>
                  <p className="text-xs text-gray-500">{achievement.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
