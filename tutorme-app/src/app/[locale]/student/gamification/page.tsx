'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { 
  Trophy, 
  Medal, 
  Star, 
  Flame, 
  Zap, 
  Target, 
  Crown,
  TrendingUp,
  Award,
  Lock,
  Loader2,
  ChevronRight,
} from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { XpBar } from '@/components/gamification/xp-bar'
import { DailyQuestsWidget } from '@/components/gamification/daily-quests'

interface GamificationData {
  profile: {
    level: number
    xp: number
    xpToNextLevel: number
    progress: number
    streakDays: number
    longestStreak: number
    skills: {
      grammar: number
      vocabulary: number
      speaking: number
      listening: number
      confidence: number
      fluency: number
    }
  }
  badges: {
    all: Badge[]
    stats: {
      totalEarned: number
      totalAvailable: number
      completionPercentage: number
      byRarity: Record<string, number>
      byCategory: Record<string, number>
      totalXpFromBadges: number
    }
  }
  leaderboard: {
    global: { rank: number | null; score: number }
    weekly: { rank: number | null; score: number }
    monthly: { rank: number | null; score: number }
  }
  dailyQuests: Quest[]
  recentAchievements: Achievement[]
  recentActivity: Activity[]
}

interface Badge {
  id: string
  key: string
  name: string
  description: string
  icon: string
  color: string
  category: string
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  xpBonus: number
  earned: boolean
  earnedAt: string | null
  progress: number
  isSecret: boolean
}

interface Quest {
  id: string
  title: string
  description: string
  xpReward: number
  completed: boolean
  requirement: any
}

interface Achievement {
  id: string
  title: string
  description: string
  xpAwarded: number
  unlockedAt: string
}

interface Activity {
  id: string
  type: string
  metadata: any
  createdAt: string
}

const rarityColors = {
  common: 'bg-gray-100 text-gray-700 border-gray-200',
  rare: 'bg-blue-100 text-blue-700 border-blue-200',
  epic: 'bg-purple-100 text-purple-700 border-purple-200',
  legendary: 'bg-yellow-100 text-yellow-700 border-yellow-200',
}

const rarityIcons = {
  common: Medal,
  rare: Star,
  epic: Trophy,
  legendary: Crown,
}

export default function GamificationDashboard() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState<GamificationData | null>(null)
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const res = await fetch('/api/gamification/dashboard', {
        credentials: 'include',
      })
      
      if (res.ok) {
        const result = await res.json()
        if (result.success) {
          setData(result.data)
        }
      } else {
        toast.error('Failed to load gamification data')
      }
    } catch (error) {
      console.error('Error fetching dashboard:', error)
      toast.error('Error loading dashboard')
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    )
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="max-w-md">
          <CardContent className="pt-6 text-center">
            <Trophy className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">Data Unavailable</h2>
            <p className="text-gray-500 mb-4">Unable to load gamification data</p>
            <Button onClick={fetchDashboardData}>Retry</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const { profile, badges, leaderboard, dailyQuests, recentAchievements, recentActivity } = data

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Link href="/student/dashboard">
              <Button variant="ghost">Back to Dashboard</Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold">Achievements & Rewards</h1>
              <p className="text-gray-500">Track your progress and earn rewards</p>
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="overview" className="gap-2">
              <Zap className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="badges" className="gap-2">
              <Trophy className="h-4 w-4" />
              Badges
            </TabsTrigger>
            <TabsTrigger value="leaderboard" className="gap-2">
              <TrendingUp className="h-4 w-4" />
              Leaderboard
            </TabsTrigger>
            <TabsTrigger value="activity" className="gap-2">
              <Target className="h-4 w-4" />
              Activity
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* XP Bar */}
              <div className="lg:col-span-2">
                <XpBar
                  level={profile.level}
                  xp={profile.xp}
                  xpToNextLevel={profile.xpToNextLevel}
                  progress={profile.progress}
                  streakDays={profile.streakDays}
                />
              </div>

              {/* Daily Quests */}
              <DailyQuestsWidget
                quests={dailyQuests.map(q => ({
                  id: q.id,
                  quest: {
                    title: q.title,
                    description: q.description,
                    type: 'daily',
                    xpReward: q.xpReward,
                    requirement: q.requirement?.count || 1,
                  },
                  completed: q.completed,
                  progress: q.completed ? 1 : 0,
                }))}
                completedCount={dailyQuests.filter(q => q.completed).length}
                totalXp={dailyQuests.reduce((sum, q) => sum + (q.completed ? q.xpReward : 0), 0)}
              />
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatCard
                title="Current Level"
                value={profile.level}
                icon={Award}
                color="text-blue-600"
              />
              <StatCard
                title="Day Streak"
                value={profile.streakDays}
                icon={Flame}
                color="text-orange-600"
              />
              <StatCard
                title="Badges Earned"
                value={`${badges.stats.totalEarned}/${badges.stats.totalAvailable}`}
                icon={Trophy}
                color="text-yellow-600"
              />
              <StatCard
                title="Global Rank"
                value={leaderboard.global.rank ? `#${leaderboard.global.rank}` : 'Unranked'}
                icon={TrendingUp}
                color="text-green-600"
              />
            </div>

            {/* Skills */}
            <Card>
              <CardHeader>
                <CardTitle>Skills Progress</CardTitle>
                <CardDescription>Your proficiency across different areas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <SkillBar name="Grammar" score={profile.skills.grammar} />
                  <SkillBar name="Vocabulary" score={profile.skills.vocabulary} />
                  <SkillBar name="Speaking" score={profile.skills.speaking} />
                  <SkillBar name="Listening" score={profile.skills.listening} />
                  <SkillBar name="Confidence" score={profile.skills.confidence} />
                  <SkillBar name="Fluency" score={profile.skills.fluency} />
                </div>
              </CardContent>
            </Card>

            {/* Recent Achievements */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Achievements</CardTitle>
              </CardHeader>
              <CardContent>
                {recentAchievements.length > 0 ? (
                  <div className="space-y-3">
                    {recentAchievements.map((achievement) => (
                      <div key={achievement.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                        <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                          <Trophy className="h-5 w-5 text-yellow-600" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{achievement.title}</p>
                          <p className="text-sm text-gray-500">{achievement.description}</p>
                        </div>
                        <Badge className="bg-yellow-100 text-yellow-700">+{achievement.xpAwarded} XP</Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-gray-500 py-8">No achievements yet. Start learning to earn badges!</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Badges Tab */}
          <TabsContent value="badges" className="space-y-6">
            {/* Badge Stats */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <BadgeStatCard label="Total" value={badges.stats.totalEarned} total={badges.stats.totalAvailable} />
              <BadgeStatCard label="Common" value={badges.stats.byRarity.common} color="text-gray-600" />
              <BadgeStatCard label="Rare" value={badges.stats.byRarity.rare} color="text-blue-600" />
              <BadgeStatCard label="Epic" value={badges.stats.byRarity.epic} color="text-purple-600" />
              <BadgeStatCard label="Legendary" value={badges.stats.byRarity.legendary} color="text-yellow-600" />
            </div>

            {/* Badges Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {badges.all.map((badge) => (
                <BadgeCard key={badge.id} badge={badge} />
              ))}
            </div>
          </TabsContent>

          {/* Leaderboard Tab */}
          <TabsContent value="leaderboard" className="space-y-6">
            <LeaderboardSection userId={sessionStorage.getItem('userId') || ''} />
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                {recentActivity.length > 0 ? (
                  <div className="space-y-3">
                    {recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <Target className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium capitalize">{activity.type.replace(/_/g, ' ')}</p>
                          <p className="text-sm text-gray-500">
                            {new Date(activity.createdAt).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-gray-500 py-8">No recent activity</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function StatCard({ title, value, icon: Icon, color }: { title: string; value: string | number; icon: any; color: string }) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center gap-4">
          <div className={cn("p-3 rounded-lg bg-gray-100", color)}>
            <Icon className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function SkillBar({ name, score }: { name: string; score: number }) {
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium">{name}</span>
        <span className="text-sm text-gray-500">{score}%</span>
      </div>
      <Progress value={score} className="h-2" />
    </div>
  )
}

function BadgeStatCard({ label, value, total, color = 'text-gray-900' }: { label: string; value: number; total?: number; color?: string }) {
  return (
    <Card>
      <CardContent className="pt-6 text-center">
        <p className={cn("text-3xl font-bold", color)}>{value}</p>
        <p className="text-sm text-gray-500">{label}</p>
        {total && <p className="text-xs text-gray-400">of {total}</p>}
      </CardContent>
    </Card>
  )
}

function BadgeCard({ badge }: { badge: Badge }) {
  const Icon = rarityIcons[badge.rarity]
  
  if (badge.isSecret && !badge.earned) {
    return (
      <Card className="opacity-50">
        <CardContent className="pt-6 text-center">
          <div className="w-16 h-16 mx-auto mb-3 bg-gray-200 rounded-full flex items-center justify-center">
            <Lock className="h-8 w-8 text-gray-400" />
          </div>
          <p className="font-medium text-gray-500">Secret Badge</p>
          <p className="text-xs text-gray-400">???</p>
        </CardContent>
      </Card>
    )
  }
  
  return (
    <Card className={cn(
      "transition-all",
      badge.earned ? "border-2" : "opacity-60 grayscale"
    )} style={{ borderColor: badge.earned ? badge.color : undefined }}>
      <CardContent className="pt-6 text-center">
        <div 
          className="w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center"
          style={{ backgroundColor: badge.earned ? `${badge.color}20` : '#f3f4f6' }}
        >
          <Icon className="h-8 w-8" style={{ color: badge.earned ? badge.color : '#9ca3af' }} />
        </div>
        <p className="font-medium">{badge.name}</p>
        <p className="text-xs text-gray-500 mb-2">{badge.description}</p>
        <Badge className={cn("text-xs", rarityColors[badge.rarity])}>
          {badge.rarity}
        </Badge>
        {badge.earned && (
          <p className="text-xs text-green-600 mt-2">+{badge.xpBonus} XP</p>
        )}
      </CardContent>
    </Card>
  )
}

function LeaderboardSection({ userId }: { userId: string }) {
  const [leaderboardType, setLeaderboardType] = useState('global')
  const [leaderboard, setLeaderboard] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchLeaderboard()
  }, [leaderboardType])

  const fetchLeaderboard = async () => {
    setIsLoading(true)
    try {
      const res = await fetch(`/api/gamification/leaderboard?type=${leaderboardType}`, {
        credentials: 'include',
      })
      
      if (res.ok) {
        const result = await res.json()
        if (result.success) {
          setLeaderboard(result.data)
        }
      }
    } catch (error) {
      console.error('Error fetching leaderboard:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    )
  }

  const entries = leaderboard?.entries || []

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Leaderboard</CardTitle>
            <CardDescription>See how you rank against other learners</CardDescription>
          </div>
          <div className="flex gap-2">
            {['global', 'weekly', 'monthly'].map((type) => (
              <Button
                key={type}
                variant={leaderboardType === type ? 'default' : 'outline'}
                size="sm"
                onClick={() => setLeaderboardType(type)}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {entries.map((entry: any, index: number) => (
            <div 
              key={entry.userId}
              className={cn(
                "flex items-center gap-4 p-3 rounded-lg",
                entry.userId === userId ? "bg-blue-50 border border-blue-200" : "bg-gray-50",
                index < 3 && "bg-gradient-to-r from-yellow-50 to-orange-50"
              )}
            >
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center font-bold",
                index === 0 ? "bg-yellow-400 text-yellow-900" :
                index === 1 ? "bg-gray-300 text-gray-700" :
                index === 2 ? "bg-orange-400 text-orange-900" :
                "bg-gray-200 text-gray-600"
              )}>
                {entry.rank}
              </div>
              
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-blue-100 text-blue-700">
                  {entry.name?.split(' ').map((n: string) => n[0]).join('') || '?'}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <p className="font-medium">{entry.name}</p>
                <p className="text-xs text-gray-500">Level {entry.level}</p>
              </div>
              
              <div className="text-right">
                <p className="font-bold">{entry.score.toLocaleString()} XP</p>
                {entry.streakDays > 0 && (
                  <p className="text-xs text-orange-500 flex items-center justify-end gap-1">
                    <Flame className="h-3 w-3" />
                    {entry.streakDays} days
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
        
        {leaderboard?.userRank && !entries.find((e: any) => e.userId === userId) && (
          <>
            <div className="my-4 text-center text-gray-400">...</div>
            <div className="flex items-center gap-4 p-3 rounded-lg bg-blue-50 border border-blue-200">
              <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold bg-blue-500 text-white">
                {leaderboard.userRank.rank}
              </div>
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-blue-100 text-blue-700">You</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-medium">You</p>
                <p className="text-xs text-gray-500">Level {leaderboard.userRank.level}</p>
              </div>
              <div className="text-right">
                <p className="font-bold">{leaderboard.userRank.score.toLocaleString()} XP</p>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
