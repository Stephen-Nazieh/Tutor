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
      <div className="text-center py-4">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto"></div>
      </div>
    ) : (
      <Card>
        <CardContent className="pt-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        </CardContent>
      </Card>
    )
  }

  if (achievements.length === 0) {
    return compact ? (
      <div className="text-center py-4">
        <Trophy className="w-8 h-8 text-gray-300 mx-auto mb-2" />
        <p className="text-sm text-gray-500">No badges yet</p>
      </div>
    ) : (
      <Card>
        <CardContent className="pt-8 pb-8 text-center">
          <Trophy className="w-12 h-12 text-gray-300 mx-auto mb-3" />
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
        <div className="flex items-center justify-between p-3 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-600" />
            <span className="text-sm text-gray-600">Badges Earned</span>
          </div>
          <span className="text-xl font-bold text-yellow-700">{achievements.length}</span>
        </div>
        
        {achievements.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {achievements.slice(0, 4).map((achievement) => (
              <div 
                key={achievement.id}
                className="flex items-center gap-1.5 px-2 py-1 bg-gray-50 rounded text-xs"
                title={achievement.description}
              >
                <span className="text-lg">{achievement.badgeIcon}</span>
                <span className="font-medium truncate max-w-[80px]">{achievement.badgeName}</span>
              </div>
            ))}
            {achievements.length > 4 && (
              <div className="flex items-center px-2 py-1 bg-gray-100 rounded text-xs text-gray-500">
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
            <Trophy className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
            <p className="text-2xl font-bold">{achievements.length}</p>
            <p className="text-sm text-gray-600">Badges Earned</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5" />
            Your Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            {achievements.map((achievement) => (
              <div 
                key={achievement.id}
                className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
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
