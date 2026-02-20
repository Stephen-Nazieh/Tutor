'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ArrowLeft, Video, Sparkles, Plus, Calendar, Clock, Users, Play } from 'lucide-react'
import { toast } from 'sonner'

interface ScheduledClass {
  id: string
  title: string
  subject: string
  scheduledAt: string
  duration: number
  enrolledStudents: number
  maxStudents: number
  status: 'scheduled' | 'live' | 'completed' | 'cancelled'
}

export default function LiveClassSelectorPage() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [loading, setLoading] = useState(true)
  const [upcomingClasses, setUpcomingClasses] = useState<ScheduledClass[]>([])
  const [recentSessions] = useState([
    { id: 'demo-1', name: 'Advanced Mathematics', date: 'Demo Session', students: 28 },
    { id: 'demo-2', name: 'English Literature', date: 'Demo Session', students: 32 },
  ])

  // Fetch tutor's scheduled classes
  useEffect(() => {
    if (status === 'authenticated') {
      fetchUpcomingClasses()
    }
  }, [status])

  const fetchUpcomingClasses = async () => {
    try {
      const res = await fetch('/api/tutor/classes', { credentials: 'include' })
      if (res.ok) {
        const data = await res.json()
        // Filter for upcoming and live classes only
        const activeClasses = (data.classes || []).filter(
          (c: ScheduledClass) => c.status === 'scheduled' || c.status === 'live'
        )
        setUpcomingClasses(activeClasses)
      }
    } catch (error) {
      console.error('Failed to fetch classes:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleStartClass = async (classId: string) => {
    // Generate a live session ID based on the class
    const sessionId = `live-${classId}-${Date.now()}`
    router.push(`/tutor/live-class/${sessionId}`)
  }

  const handleCreateInstantClass = () => {
    // Generate instant session for ad-hoc teaching
    const sessionId = `instant-${Date.now()}`
    router.push(`/tutor/live-class/${sessionId}`)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diff = date.getTime() - now.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    
    if (hours < 0) return 'Started'
    if (hours < 1) return 'Starting soon'
    if (hours < 24) return `In ${hours} hours`
    return `In ${Math.floor(hours / 24)} days`
  }

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-gray-600">Loading your classes...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <Button variant="ghost" className="mb-4" onClick={() => router.back()}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Live Class Hub</h1>
          <p className="text-gray-600 max-w-md mx-auto">
            Start a live session with your students. Access AI-powered teaching assistance, 
            breakout rooms, and real-time analytics.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Upcoming Classes */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-500" />
                  Your Scheduled Classes
                </CardTitle>
              </CardHeader>
              <CardContent>
                {upcomingClasses.length === 0 ? (
                  <div className="text-center py-8 border border-dashed rounded-lg">
                    <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-600 mb-2">No scheduled classes</p>
                    <p className="text-sm text-gray-500 mb-4">
                      Create a class first to start a live session
                    </p>
                    <Button onClick={() => router.push('/tutor/dashboard?create=1')}>
                      <Plus className="w-4 h-4 mr-2" />
                      Create Class
                    </Button>
                  </div>
                ) : (
                  <ScrollArea className="h-[300px]">
                    <div className="space-y-3">
                      {upcomingClasses.map((cls) => (
                        <div
                          key={cls.id}
                          className="p-4 border rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-all cursor-pointer"
                          onClick={() => handleStartClass(cls.id)}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-medium">{cls.title}</h3>
                                <Badge variant={cls.status === 'live' ? 'default' : 'outline'}>
                                  {cls.status === 'live' ? 'Live Now' : 'Scheduled'}
                                </Badge>
                              </div>
                              <p className="text-sm text-gray-500 mb-2">
                                {cls.subject} • {cls.duration} mins
                              </p>
                              <div className="flex items-center gap-4 text-xs text-gray-500">
                                <span className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {formatDate(cls.scheduledAt)}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Users className="w-3 h-3" />
                                  {cls.enrolledStudents}/{cls.maxStudents} enrolled
                                </span>
                              </div>
                            </div>
                            <Button 
                              size="sm" 
                              className="bg-gradient-to-r from-purple-600 to-blue-600"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleStartClass(cls.id)
                              }}
                            >
                              <Play className="w-3 h-3 mr-1" />
                              Start
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                )}
              </CardContent>
            </Card>

            {/* Demo Sessions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Sparkles className="w-4 h-4 text-purple-500" />
                  Try Demo Sessions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {recentSessions.map((session) => (
                    <div
                      key={session.id}
                      className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                      onClick={() => router.push(`/tutor/live-class/${session.id}`)}
                    >
                      <div>
                        <p className="font-medium text-sm">{session.name}</p>
                        <p className="text-xs text-gray-500">{session.date}</p>
                      </div>
                      <Badge variant="secondary">{session.students} students</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Quick Start Options */}
          <div className="space-y-6">
            {/* Instant Class */}
            <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-blue-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Video className="w-5 h-5 text-purple-600" />
                  Start Instant Class
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Start an ad-hoc live session without scheduling. Perfect for quick reviews, 
                  office hours, or impromptu Q&A sessions.
                </p>
                <Button 
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600"
                  onClick={handleCreateInstantClass}
                >
                  <Play className="w-4 h-4 mr-2" />
                  Start Instant Session
                </Button>
              </CardContent>
            </Card>

            {/* How It Works */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">How It Works</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center shrink-0">
                      <span className="text-sm font-bold text-purple-600">1</span>
                    </div>
                    <div>
                      <p className="font-medium text-sm">Start Your Session</p>
                      <p className="text-xs text-gray-500">
                        Click Start on any scheduled class or create an instant session
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                      <span className="text-sm font-bold text-blue-600">2</span>
                    </div>
                    <div>
                      <p className="font-medium text-sm">Share With Students</p>
                      <p className="text-xs text-gray-500">
                        Students join via the class link or from their dashboard
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                      <span className="text-sm font-bold text-green-600">3</span>
                    </div>
                    <div>
                      <p className="font-medium text-sm">Use AI Features</p>
                      <p className="text-xs text-gray-500">
                        Access AI Assistant, breakout rooms, and analytics
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Session ID Info */}
            <div className="p-4 bg-gray-100 rounded-lg">
              <p className="text-xs text-gray-600">
                <strong>Note:</strong> Session IDs are automatically generated when you start a class. 
                You don&apos;t need to remember them - just click Start on your scheduled class!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
