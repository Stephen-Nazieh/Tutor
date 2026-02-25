'use client'

import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Progress } from '@/components/ui/progress'
import { Loader2, CheckCircle, DollarSign } from 'lucide-react'

const SUBJECTS = [
  { id: 'math', name: 'Mathematics' },
  { id: 'physics', name: 'Physics' },
  { id: 'chemistry', name: 'Chemistry' },
  { id: 'biology', name: 'Biology' },
  { id: 'english', name: 'English' },
  { id: 'history', name: 'History' },
]

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
const TIME_SLOTS = [
  '08:00', '09:00', '10:00', '11:00', '12:00',
  '13:00', '14:00', '15:00', '16:00', '17:00',
  '18:00', '19:00', '20:00', '21:00'
]

export default function TutorOnboarding() {
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [completed, setCompleted] = useState(false)
  
  // Step 1: Profile
  const [bio, setBio] = useState('')
  const [credentials, setCredentials] = useState('')
  
  // Step 2: Subjects
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([])
  
  // Step 3: Availability
  const [availability, setAvailability] = useState<Record<string, string[]>>({})
  
  // Step 4: Hourly Rate
  const [hourlyRate, setHourlyRate] = useState('')

  const toggleSubject = (subjectId: string) => {
    setSelectedSubjects(prev => 
      prev.includes(subjectId) 
        ? prev.filter(s => s !== subjectId)
        : [...prev, subjectId]
    )
  }

  const toggleTimeSlot = (day: string, time: string) => {
    setAvailability(prev => {
      const daySlots = prev[day] || []
      const newSlots = daySlots.includes(time)
        ? daySlots.filter(t => t !== time)
        : [...daySlots, time]
      return { ...prev, [day]: newSlots }
    })
  }

  const handleComplete = async () => {
    setIsLoading(true)
    
    try {
      const response = await fetch('/api/onboarding/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bio,
          credentials,
          subjects: selectedSubjects,
          availability,
          hourlyRate: parseFloat(hourlyRate) || 0,
        })
      })

      if (response.ok) {
        setCompleted(true)
        setTimeout(() => {
          // Use window.location for a full page refresh to ensure session is updated
          window.location.href = '/tutor/dashboard'
        }, 1500)
      }
    } catch (error) {
      console.error('Failed to save onboarding:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const progress = ((step - 1) / 4) * 100

  if (completed) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="pt-8 pb-8">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Welcome to TutorMe!</h2>
            <p className="text-gray-600">Your tutor profile is set up. Redirecting to your dashboard...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Complete Your Tutor Profile</CardTitle>
            <CardDescription>
              Step {step} of 4: {step === 1 ? 'About You' : step === 2 ? 'Teaching Subjects' : step === 3 ? 'Availability' : 'Pricing'}
            </CardDescription>
            <Progress value={progress} className="mt-2" />
          </CardHeader>
          <CardContent>
            {/* Step 1: Profile */}
            {step === 1 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    placeholder="Tell students about yourself, your teaching experience, and your teaching style..."
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    rows={4}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="credentials">Credentials</Label>
                  <Input
                    id="credentials"
                    placeholder="e.g., PhD in Mathematics, Certified Teacher, 10 years experience..."
                    value={credentials}
                    onChange={(e) => setCredentials(e.target.value)}
                  />
                </div>

                <Button 
                  className="w-full mt-4" 
                  disabled={!bio.trim()}
                  onClick={() => setStep(2)}
                >
                  Continue
                </Button>
              </div>
            )}

            {/* Step 2: Subjects */}
            {step === 2 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">What subjects do you teach?</h3>
                  <span className="text-sm text-gray-500">
                    {selectedSubjects.length} selected
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {SUBJECTS.map((subject) => (
                    <button
                      key={subject.id}
                      onClick={() => toggleSubject(subject.id)}
                      className={`p-4 rounded-lg border text-left transition-colors ${
                        selectedSubjects.includes(subject.id)
                          ? 'border-green-500 bg-green-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {subject.name}
                    </button>
                  ))}
                </div>
                <div className="flex gap-3 mt-4">
                  <Button variant="outline" onClick={() => setStep(1)}>
                    Back
                  </Button>
                  <Button 
                    className="flex-1" 
                    disabled={selectedSubjects.length === 0}
                    onClick={() => setStep(3)}
                  >
                    Continue
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Availability */}
            {step === 3 && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium">When are you available?</h3>
                <p className="text-sm text-gray-600">
                  Select your preferred teaching hours
                </p>
                
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {DAYS.map((day) => (
                    <div key={day} className="border rounded-lg p-3">
                      <h4 className="font-medium mb-2">{day}</h4>
                      <div className="flex flex-wrap gap-2">
                        {TIME_SLOTS.map((time) => (
                          <button
                            key={time}
                            onClick={() => toggleTimeSlot(day, time)}
                            className={`px-3 py-1 text-sm rounded border transition-colors ${
                              availability[day]?.includes(time)
                                ? 'bg-green-500 text-white border-green-500'
                                : 'border-gray-200 hover:border-green-300'
                            }`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-3 mt-4">
                  <Button variant="outline" onClick={() => setStep(2)}>
                    Back
                  </Button>
                  <Button 
                    className="flex-1" 
                    onClick={() => setStep(4)}
                  >
                    Continue
                  </Button>
                </div>
              </div>
            )}

            {/* Step 4: Hourly Rate */}
            {step === 4 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium">Set Your Hourly Rate</h3>
                  <p className="text-sm text-gray-600">
                    Students will pay this rate for 1-on-1 sessions
                  </p>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="flex items-center gap-2 mb-4">
                    <DollarSign className="w-6 h-6 text-gray-600" />
                    <Input
                      type="number"
                      placeholder="50"
                      value={hourlyRate}
                      onChange={(e) => setHourlyRate(e.target.value)}
                      className="text-2xl font-bold"
                    />
                    <span className="text-gray-600">/ hour</span>
                  </div>
                  
                  <div className="text-sm text-gray-500">
                    <p>Platform fee: 20%</p>
                    <p className="font-medium text-gray-700">
                      You receive: ${hourlyRate ? (parseFloat(hourlyRate) * 0.8).toFixed(2) : '0.00'} / hour
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setStep(3)}>
                    Back
                  </Button>
                  <Button 
                    className="flex-1" 
                    onClick={handleComplete}
                    disabled={isLoading || !hourlyRate}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      'Complete Setup'
                    )}
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
