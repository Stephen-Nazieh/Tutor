'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  BookOpen, 
  MessageCircle, 
  Calendar, 
  TrendingUp,
  Plus,
  Clock,
  AlertCircle,
  Sparkles,
  ChevronRight,
  Calculator,
  Atom,
  Microscope,
  Monitor,
  Languages
} from 'lucide-react'
import { toast } from 'sonner'

interface Enrollment {
  id: string
  subject: string
  status: string
  englishLevel: string
  focusAreas: string[]
  totalSessions: number
  totalMessages: number
  lastActivityAt: string
  lastSession: {
    startedAt: string
    aiSummary: string
  } | null
}

interface Subscription {
  tier: string
  limits: {
    messages: number
    liveSessions: number
  }
}

interface Usage {
  messagesSent: number
  resetsAt: string
}

interface World {
  id: string
  name: string
  emoji: string
  description: string
  unlockLevel: number
  isUnlocked: boolean
  progress: number
}

interface Curriculum {
  id: string
  name: string
  code: string
  description: string
  level: string
  category: string
  isEnrolled?: boolean
}

export default function AITutorHubPage() {
  const router = useRouter()
  const [enrollments, setEnrollments] = useState<Enrollment[]>([])
  const [subscription, setSubscription] = useState<Subscription | null>(null)
  const [usage, setUsage] = useState<Usage | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      
      // Fetch enrollments
      const enrollRes = await fetch('/api/ai-tutor/enrollments')
      const enrollData = await enrollRes.json()
      
      // Fetch subscription
      const subRes = await fetch('/api/ai-tutor/subscription')
      const subData = await subRes.json()

      setEnrollments(enrollData.enrollments || [])
      setSubscription(subData.subscription)
      setUsage(enrollData.dailyUsage)
    } catch (error) {
      toast.error('Failed to load AI tutor data')
    } finally {
      setLoading(false)
    }
  }

  const getUsagePercentage = () => {
    if (!subscription || !usage) return 0
    if (subscription.limits.messages === -1) return 0 // Unlimited
    return (usage.messagesSent / subscription.limits.messages) * 100
  }

  const getRemainingMessages = () => {
    if (!subscription || !usage) return 0
    if (subscription.limits.messages === -1) return -1 // Unlimited
    return Math.max(0, subscription.limits.messages - usage.messagesSent)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading AI Tutor...</p>
        </div>
      </div>
    )
  }

  const englishEnrollment = enrollments.find(e => e.subject === 'english')

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">AI Tutoring Hub</h1>
              <p className="text-gray-600">Personalized AI tutoring for your learning journey</p>
            </div>
            <div className="flex items-center gap-4">
              {/* Usage Badge */}
              {subscription && (
                <div className="text-right">
                  <p className="text-sm text-gray-500">
                    {subscription.tier} Plan
                  </p>
                  <p className="text-xs text-gray-400">
                    {getRemainingMessages() === -1 
                      ? 'Unlimited messages'
                      : `${getRemainingMessages()} messages remaining today`
                    }
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Usage Progress */}
        {subscription && subscription.limits.messages !== -1 && (
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Daily Message Usage</span>
                <span className="text-sm text-gray-500">
                  {usage?.messagesSent || 0} / {subscription.limits.messages}
                </span>
              </div>
              <Progress value={getUsagePercentage()} className="h-2" />
              {getRemainingMessages() <= 2 && getRemainingMessages() !== -1 && (
                <p className="text-sm text-orange-600 mt-2 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  Running low on messages. 
                  <Button variant="link" className="p-0 h-auto text-orange-600">
                    Upgrade for more
                  </Button>
                </p>
              )}
            </CardContent>
          </Card>
        )}

        {/* My AI Tutors */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">My AI Tutors</h2>
            {!englishEnrollment && (
              <Button onClick={() => router.push('/student/ai-tutor/browse')}>
                <Plus className="w-4 h-4 mr-1" />
                Find a Tutor
              </Button>
            )}
          </div>

          {enrollments.length === 0 ? (
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="pt-6 text-center">
                <Sparkles className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Start Your AI Tutoring Journey</h3>
                <p className="text-gray-600 mb-4">
                  Get personalized help with English language arts - writing, grammar, and literature analysis.
                </p>
                <Button onClick={() => router.push('/student/ai-tutor/browse')}>
                  <Plus className="w-4 h-4 mr-1" />
                  Enroll in English Tutor
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {enrollments.map((enrollment) => (
                <Card key={enrollment.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <BookOpen className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <CardTitle className="text-lg capitalize">
                            {enrollment.subject} Tutor
                          </CardTitle>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant={enrollment.status === 'ACTIVE' ? 'default' : 'secondary'}>
                              {enrollment.status === 'ACTIVE' ? '🟢 Active' : '⏸️ Paused'}
                            </Badge>
                            <Badge variant="outline">{enrollment.englishLevel}</Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <MessageCircle className="w-4 h-4 text-gray-400" />
                        <span className="text-sm">{enrollment.totalMessages} messages</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-sm">{enrollment.totalSessions} sessions</span>
                      </div>
                    </div>

                    {enrollment.focusAreas.length > 0 && (
                      <div className="mb-4">
                        <p className="text-xs text-gray-500 mb-1">Focus Areas:</p>
                        <div className="flex flex-wrap gap-1">
                          {enrollment.focusAreas.map((area) => (
                            <Badge key={area} variant="secondary" className="text-xs">
                              {area.replace('_', ' ')}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {enrollment.lastSession && (
                      <div className="text-xs text-gray-500 mb-4">
                        <p>Last session: {new Date(enrollment.lastSession.startedAt).toLocaleDateString()}</p>
                      </div>
                    )}

                    <div className="flex gap-2">
                      <Button 
                        className="flex-1"
                        onClick={() => router.push(`/student/ai-tutor/${enrollment.subject}`)}
                      >
                        <MessageCircle className="w-4 h-4 mr-1" />
                        Continue Chat
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={() => router.push('/student/ai-tutor/schedule')}
                        disabled={subscription?.limits.liveSessions === 0}
                      >
                        <Calendar className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Browse Subjects */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Browse Subjects</h2>
            <Link href="/student/subjects/browse">
              <Button variant="ghost" size="sm">
                View All Subjects
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
            <Card 
              className="cursor-pointer hover:shadow-md transition-all hover:border-blue-300"
              onClick={() => router.push('/student/subjects/english')}
            >
              <CardContent className="pt-6 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Languages className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold">English</h3>
                <p className="text-xs text-gray-500 mt-1">Language Arts</p>
              </CardContent>
            </Card>

            <Card 
              className="cursor-pointer hover:shadow-md transition-all hover:border-purple-300"
              onClick={() => router.push('/student/subjects/math')}
            >
              <CardContent className="pt-6 text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Calculator className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold">Mathematics</h3>
                <p className="text-xs text-gray-500 mt-1">Math & Calculus</p>
              </CardContent>
            </Card>

            <Card 
              className="cursor-pointer hover:shadow-md transition-all hover:border-indigo-300"
              onClick={() => router.push('/student/subjects/physics')}
            >
              <CardContent className="pt-6 text-center">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Atom className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="font-semibold">Physics</h3>
                <p className="text-xs text-gray-500 mt-1">Science</p>
              </CardContent>
            </Card>

            <Card 
              className="cursor-pointer hover:shadow-md transition-all hover:border-green-300"
              onClick={() => router.push('/student/subjects/chemistry')}
            >
              <CardContent className="pt-6 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Microscope className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold">Chemistry</h3>
                <p className="text-xs text-gray-500 mt-1">Science</p>
              </CardContent>
            </Card>

            <Card 
              className="cursor-pointer hover:shadow-md transition-all hover:border-gray-300"
              onClick={() => router.push('/student/subjects/cs')}
            >
              <CardContent className="pt-6 text-center">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Monitor className="w-6 h-6 text-gray-600" />
                </div>
                <h3 className="font-semibold">Computer Science</h3>
                <p className="text-xs text-gray-500 mt-1">Technology</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Stats */}
        {enrollments.length > 0 && (
          <div className="grid md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-blue-500" />
                  <span className="text-sm text-gray-600">Total Messages</span>
                </div>
                <p className="text-2xl font-bold mt-2">
                  {enrollments.reduce((sum, e) => sum + e.totalMessages, 0)}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-600">Sessions</span>
                </div>
                <p className="text-2xl font-bold mt-2">
                  {enrollments.reduce((sum, e) => sum + e.totalSessions, 0)}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-purple-500" />
                  <span className="text-sm text-gray-600">Learning Streak</span>
                </div>
                <p className="text-2xl font-bold mt-2">3 days</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-orange-500" />
                  <span className="text-sm text-gray-600">Progress</span>
                </div>
                <p className="text-2xl font-bold mt-2">+12%</p>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  )
}
