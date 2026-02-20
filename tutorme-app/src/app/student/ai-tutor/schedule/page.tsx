'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Calendar } from '@/components/ui/calendar'
import { toast } from 'sonner'
import { Calendar as CalendarIcon, Clock, Video, AlertCircle, Check } from 'lucide-react'

export default function ScheduleSessionPage() {
  const router = useRouter()
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [time, setTime] = useState('10:00')
  const [duration, setDuration] = useState(30)
  const [focus, setFocus] = useState('essay_writing')
  const [loading, setLoading] = useState(false)
  const [subscription, setSubscription] = useState<any>(null)

  useEffect(() => {
    fetchSubscription()
  }, [])

  const fetchSubscription = async () => {
    try {
      const res = await fetch('/api/ai-tutor/subscription')
      const data = await res.json()
      setSubscription(data.subscription)
    } catch (error) {
      toast.error('Failed to load subscription')
    }
  }

  const handleSchedule = async () => {
    if (!date) {
      toast.error('Please select a date')
      return
    }

    if (!subscription || subscription.limits.liveSessions === 0) {
      toast.error('Live sessions not available on your plan')
      return
    }

    setLoading(true)
    
    try {
      // Combine date and time
      const scheduledDateTime = new Date(date)
      const [hours, minutes] = time.split(':').map(Number)
      scheduledDateTime.setHours(hours, minutes)

      // For now, just show success (actual Daily.co integration would go here)
      toast.success('Live session scheduled!')
      
      // Redirect back to tutor hub
      router.push('/student/ai-tutor')
    } catch (error) {
      toast.error('Failed to schedule session')
    } finally {
      setLoading(false)
    }
  }

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30', '18:00', '18:30'
  ]

  const focusAreas = [
    { id: 'essay_writing', label: 'Essay Writing', icon: '✍️' },
    { id: 'grammar', label: 'Grammar Help', icon: '📝' },
    { id: 'literature', label: 'Literature Analysis', icon: '📚' },
    { id: 'reading', label: 'Reading Comprehension', icon: '👁️' },
    { id: 'vocabulary', label: 'Vocabulary Building', icon: '💬' },
    { id: 'creative', label: 'Creative Writing', icon: '✨' },
  ]

  const canScheduleLive = subscription && subscription.limits.liveSessions > 0

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Schedule Live Session</h1>
              <p className="text-gray-600">Book a real-time tutoring session with your English AI Tutor</p>
            </div>
            <Button variant="outline" onClick={() => router.push('/student/ai-tutor')}>
              ← Back
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {!canScheduleLive && (
          <Card className="mb-6 border-orange-200 bg-orange-50">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-orange-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-orange-900">Live Sessions Not Available</h3>
                  <p className="text-sm text-orange-700 mt-1">
                    Your current plan doesn't include live sessions. 
                    Upgrade to Basic or Premium to schedule real-time tutoring.
                  </p>
                  <Button className="mt-3" variant="outline">
                    View Plans
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          {/* Date Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="w-5 h-5" />
                Select Date
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                disabled={(date) => date < new Date() || date > new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)}
                className="rounded-md border"
              />
            </CardContent>
          </Card>

          {/* Time & Duration */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Select Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-2">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot}
                      onClick={() => setTime(slot)}
                      className={`p-2 rounded text-sm transition-colors ${
                        time === slot
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 hover:bg-gray-200'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Duration</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  {[30, 45, 60].map((mins) => (
                    <button
                      key={mins}
                      onClick={() => setDuration(mins)}
                      className={`flex-1 p-3 rounded text-center transition-colors ${
                        duration === mins
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 hover:bg-gray-200'
                      }`}
                    >
                      {mins} min
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Focus Area */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Session Focus</CardTitle>
            <CardDescription>What would you like to focus on during this session?</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {focusAreas.map((area) => (
                <button
                  key={area.id}
                  onClick={() => setFocus(area.id)}
                  className={`p-4 rounded-lg border text-left transition-all ${
                    focus === area.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="text-2xl mb-2 block">{area.icon}</span>
                  <span className="text-sm font-medium">{area.label}</span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Summary & Confirm */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Session Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Subject:</span>
                <span className="font-medium">English Language Arts</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Date:</span>
                <span className="font-medium">
                  {date ? date.toLocaleDateString() : 'Not selected'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Time:</span>
                <span className="font-medium">{time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Duration:</span>
                <span className="font-medium">{duration} minutes</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Focus:</span>
                <span className="font-medium capitalize">
                  {focusAreas.find(f => f.id === focus)?.label}
                </span>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <Button 
                className="flex-1" 
                size="lg"
                onClick={handleSchedule}
                disabled={!date || !canScheduleLive || loading}
              >
                {loading ? 'Scheduling...' : (
                  <>
                    <Video className="w-4 h-4 mr-2" />
                    Schedule Session
                  </>
                )}
              </Button>
              <Button 
                variant="outline" 
                onClick={() => router.push('/student/ai-tutor')}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
