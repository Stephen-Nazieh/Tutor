/**
 * Mission Hub Page
 * 
 * View and manage all available missions
 */

'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronRight, Target, CheckCircle2, Circle, PlayCircle, Clock, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { toast } from 'sonner'

interface MissionSummary {
  total: number
  completed: number
  inProgress: number
  notStarted: number
  totalXpEarned: number
  completionRate: number
}

export default function MissionsPage() {
  const router = useRouter()
  const [summary, setSummary] = useState<MissionSummary | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSummary()
  }, [])

  const fetchSummary = async () => {
    try {
      const response = await fetch('/api/gamification/missions?type=summary')
      const data = await response.json()
      
      if (data.success) {
        setSummary(data.data)
      }
    } catch (error) {
      toast.error('Failed to load missions')
    } finally {
      setLoading(false)
    }
  }

  const getRecommendedMission = async () => {
    try {
      const response = await fetch('/api/gamification/missions?type=recommended')
      const data = await response.json()
      
      if (data.success && data.data) {
        router.push(`/student/ai-tutor/english?mission=${data.data.id}`)
      } else {
        toast.info('No recommended missions available')
      }
    } catch (error) {
      toast.error('Failed to get recommendation')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => router.push('/student/dashboard')}
              >
                <ChevronRight className="w-5 h-5 rotate-180" />
              </Button>
              <div>
                <h1 className="text-xl font-semibold">Mission Hub</h1>
                <p className="text-sm text-gray-500">
                  Track your learning progress
                </p>
              </div>
            </div>

            <Button onClick={getRecommendedMission}>
              <Target className="w-4 h-4 mr-2" />
              Continue Learning
            </Button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Stats Cards */}
        {summary && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <StatCard
              label="Total Missions"
              value={summary.total}
              icon={Target}
              color="blue"
            />
            <StatCard
              label="Completed"
              value={summary.completed}
              icon={CheckCircle2}
              color="green"
            />
            <StatCard
              label="In Progress"
              value={summary.inProgress}
              icon={PlayCircle}
              color="yellow"
            />
            <StatCard
              label="XP Earned"
              value={summary.totalXpEarned}
              icon={Zap}
              color="purple"
              suffix="XP"
            />
          </div>
        )}

        {/* Progress Overview */}
        {summary && (
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-lg">Overall Progress</h2>
                <span className="text-2xl font-bold text-blue-600">
                  {summary.completionRate}%
                </span>
              </div>
              
              <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all"
                  style={{ width: `${summary.completionRate}%` }}
                />
              </div>
              
              <div className="flex justify-between mt-2 text-sm text-gray-500">
                <span>{summary.completed} completed</span>
                <span>{summary.notStarted} remaining</span>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Mission Categories */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4 max-w-md mx-auto mb-6">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="progress">In Progress</TabsTrigger>
            <TabsTrigger value="available">Available</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            <div className="text-center py-12 text-gray-500">
              <Target className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>Mission browser coming soon!</p>
              <p className="text-sm mt-1">
                Go to Worlds to browse missions by category
              </p>
            </div>
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            <div className="text-center py-12 text-gray-500">
              <CheckCircle2 className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>Your completed missions will appear here</p>
            </div>
          </TabsContent>

          <TabsContent value="progress" className="space-y-4">
            <div className="text-center py-12 text-gray-500">
              <PlayCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>Missions in progress will appear here</p>
            </div>
          </TabsContent>

          <TabsContent value="available" className="space-y-4">
            <div className="text-center py-12 text-gray-500">
              <Circle className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>Available missions will appear here</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => router.push('/student/worlds')}
              >
                Browse Worlds
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

function StatCard({
  label,
  value,
  icon: Icon,
  color,
  suffix = '',
}: {
  label: string
  value: number
  icon: React.ComponentType<{ className?: string }>
  color: 'blue' | 'green' | 'yellow' | 'purple'
  suffix?: string
}) {
  const colors = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    yellow: 'bg-yellow-50 text-yellow-600',
    purple: 'bg-purple-50 text-purple-600',
  }

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center', colors[color])}>
            <Icon className="w-5 h-5" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-800">
              {value.toLocaleString()}{suffix}
            </p>
            <p className="text-sm text-gray-500">{label}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Helper for cn function
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}
