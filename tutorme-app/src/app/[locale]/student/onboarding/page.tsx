'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Loader2, ArrowRight, CheckCircle2, BookOpen, Target, GraduationCap } from 'lucide-react'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

const STEPS = [
  {
    id: 'welcome',
    title: 'Welcome',
    description: "Let's get your profile set up",
    icon: Target,
  },
  {
    id: 'academic',
    title: 'Academic Info',
    description: 'Tell us where you are at',
    icon: GraduationCap,
  },
  {
    id: 'interests',
    title: 'Interests',
    description: 'What do you want to learn?',
    icon: BookOpen,
  },
]

const SUBJECTS = [
  { id: 'math', name: 'Mathematics', icon: '📐' },
  { id: 'physics', name: 'Physics', icon: '⚡' },
  { id: 'chemistry', name: 'Chemistry', icon: '🧪' },
  { id: 'biology', name: 'Biology', icon: '🧬' },
  { id: 'english', name: 'English', icon: '📚' },
  { id: 'history', name: 'History', icon: '🏛️' },
  { id: 'art', name: 'Art', icon: '🎨' },
  { id: 'music', name: 'Music', icon: '🎵' },
  { id: 'cs', name: 'Computer Science', icon: '💻' },
]

const GOALS = [
  'Improve my grades',
  'Prepare for exams',
  'Learn a new skill',
  'Get homework help',
  'Advanced placement',
]

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    goals: [] as string[],
    subjectsOfInterest: [] as string[],
    preferredLanguage: 'en', // default
  })

  const currentStep = STEPS[step]

  const handleNext = async () => {
    if (step < STEPS.length - 1) {
      setStep(step + 1)
    } else {
      await handleSubmit()
    }
  }

  const toggleGoal = (goal: string) => {
    setFormData(prev => ({
      ...prev,
      goals: prev.goals.includes(goal) ? prev.goals.filter(g => g !== goal) : [...prev.goals, goal],
    }))
  }

  const toggleSubject = (subjectId: string) => {
    setFormData(prev => ({
      ...prev,
      subjectsOfInterest: prev.subjectsOfInterest.includes(subjectId)
        ? prev.subjectsOfInterest.filter(s => s !== subjectId)
        : [...prev.subjectsOfInterest, subjectId],
    }))
  }

  const getCsrf = async () => {
    const res = await fetch('/api/csrf', { credentials: 'include' })
    const data = await res.json().catch(() => ({}))
    return data?.token ?? null
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const csrf = await getCsrf()
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(csrf && { 'X-CSRF-Token': csrf }),
        },
        body: JSON.stringify({
          learningGoals: formData.goals,
          subjectsOfInterest: formData.subjectsOfInterest,
          preferredLanguages: [formData.preferredLanguage],
          isOnboarded: true,
        }),
      })

      if (response.ok) {
        toast.success('Profile set up successfully!')
        router.push('/student/dashboard')
      } else {
        throw new Error('Failed to save profile')
      }
    } catch (error) {
      console.error(error)
      toast.error('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      <div className="mb-8 w-full max-w-2xl">
        {/* Progress Steps */}
        <div className="relative flex justify-between">
          <div className="absolute left-0 top-1/2 -z-0 h-1 w-full -translate-y-1/2 rounded bg-gray-200" />
          <div
            className="absolute left-0 top-1/2 -z-0 h-1 -translate-y-1/2 rounded bg-blue-600 transition-all duration-300"
            style={{ width: `${(step / (STEPS.length - 1)) * 100}%` }}
          />

          {STEPS.map((s, i) => {
            const Icon = s.icon
            const isActive = i <= step
            const isCurrent = i === step

            return (
              <div
                key={s.id}
                className="relative z-10 flex flex-col items-center gap-2 bg-transparent"
              >
                <div
                  className={cn(
                    'flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-300',
                    isActive
                      ? 'scale-110 border-blue-600 bg-blue-600 text-white shadow-md'
                      : 'border-gray-300 bg-white text-gray-400'
                  )}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <span
                  className={cn(
                    'absolute top-12 whitespace-nowrap text-xs font-medium transition-colors duration-300',
                    isCurrent ? 'text-blue-700' : 'text-gray-500'
                  )}
                >
                  {s.title}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      <Card className="w-full max-w-2xl border-t-4 border-t-blue-600 shadow-xl">
        <CardContent className="flex min-h-[400px] flex-col p-8">
          <div className="mb-8">
            <h1 className="mb-2 text-3xl font-bold text-gray-900">{currentStep.title}</h1>
            <p className="text-lg text-gray-600">{currentStep.description}</p>
          </div>

          <div className="flex-1">
            {step === 0 && (
              <div className="animate-in fade-in slide-in-from-right-4 space-y-4 duration-300">
                <p className="mb-4 block text-sm font-medium text-gray-700">
                  Select all that apply:
                </p>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {GOALS.map(goal => (
                    <div
                      key={goal}
                      onClick={() => toggleGoal(goal)}
                      className={cn(
                        'flex cursor-pointer items-center gap-3 rounded-xl border-2 p-4 transition-all hover:shadow-sm',
                        formData.goals.includes(goal)
                          ? 'border-blue-600 bg-blue-50 text-blue-800'
                          : 'border-gray-100 bg-gray-50 text-gray-600 hover:border-blue-200'
                      )}
                    >
                      <div
                        className={cn(
                          'flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border',
                          formData.goals.includes(goal)
                            ? 'border-blue-600 bg-blue-600'
                            : 'border-gray-400 bg-white'
                        )}
                      >
                        {formData.goals.includes(goal) && (
                          <CheckCircle2 className="h-3.5 w-3.5 text-white" />
                        )}
                      </div>
                      <span className="font-medium">{goal}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="animate-in fade-in slide-in-from-right-4 space-y-6 duration-300">
                <div>
                  <Label className="mb-3 block text-base">Preferred Language</Label>
                  <Label className="mb-3 block text-base">Preferred Language</Label>
                  <select
                    className="w-full rounded-lg border bg-gray-50 p-3"
                    value={formData.preferredLanguage}
                    onChange={e => setFormData({ ...formData, preferredLanguage: e.target.value })}
                  >
                    <option value="en">English</option>
                    <option value="zh-CN">Chinese (Simplified)</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                  </select>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="animate-in fade-in slide-in-from-right-4 space-y-4 duration-300">
                <p className="mb-4 block text-sm font-medium text-gray-700">
                  Pick at least 3 subjects you're interested in:
                </p>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {SUBJECTS.map(subject => (
                    <button
                      key={subject.id}
                      type="button"
                      onClick={() => toggleSubject(subject.id)}
                      className={cn(
                        'flex flex-col gap-2 rounded-xl border-2 p-4 text-left transition-all hover:shadow-sm',
                        formData.subjectsOfInterest.includes(subject.id)
                          ? 'border-blue-500 bg-blue-50 text-blue-900'
                          : 'border-gray-100 bg-gray-50 text-gray-600 hover:border-blue-200'
                      )}
                    >
                      <span className="text-2xl">{subject.icon}</span>
                      <span className="font-medium">{subject.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="mt-4 flex items-center justify-between border-t pt-8">
            <Button
              variant="ghost"
              onClick={() => step > 0 && setStep(step - 1)}
              disabled={step === 0 || loading}
              className={cn(step === 0 && 'invisible')}
            >
              Back
            </Button>
            <Button
              onClick={handleNext}
              disabled={loading}
              className="min-w-[120px] bg-blue-600 text-white hover:bg-blue-700"
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {step === STEPS.length - 1 ? 'Finish' : 'Next'}
              {!loading && step < STEPS.length - 1 && <ArrowRight className="ml-2 h-4 w-4" />}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
