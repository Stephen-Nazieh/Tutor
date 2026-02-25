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
        description: 'Let\'s get your profile set up',
        icon: Target
    },
    {
        id: 'academic',
        title: 'Academic Info',
        description: 'Tell us where you are at',
        icon: GraduationCap
    },
    {
        id: 'interests',
        title: 'Interests',
        description: 'What do you want to learn?',
        icon: BookOpen
    }
]

const GRADE_LEVELS = [
    { id: 6, name: '6th Grade' },
    { id: 7, name: '7th Grade' },
    { id: 8, name: '8th Grade' },
    { id: 9, name: '9th Grade' },
    { id: 10, name: '10th Grade' },
    { id: 11, name: '11th Grade' },
    { id: 12, name: '12th Grade' },
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
    "Improve my grades",
    "Prepare for exams",
    "Learn a new skill",
    "Get homework help",
    "Advanced placement",
]

export default function OnboardingPage() {
    const router = useRouter()
    const [step, setStep] = useState(0)
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        goals: [] as string[],
        gradeLevel: null as number | null,
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
            goals: prev.goals.includes(goal)
                ? prev.goals.filter(g => g !== goal)
                : [...prev.goals, goal]
        }))
    }

    const toggleSubject = (subjectId: string) => {
        setFormData(prev => ({
            ...prev,
            subjectsOfInterest: prev.subjectsOfInterest.includes(subjectId)
                ? prev.subjectsOfInterest.filter(s => s !== subjectId)
                : [...prev.subjectsOfInterest, subjectId]
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
                    gradeLevel: formData.gradeLevel,
                    subjectsOfInterest: formData.subjectsOfInterest,
                    preferredLanguages: [formData.preferredLanguage],
                    isOnboarded: true
                })
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
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-2xl mb-8">
                {/* Progress Steps */}
                <div className="flex justify-between relative">
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -z-0 -translate-y-1/2 rounded" />
                    <div
                        className="absolute top-1/2 left-0 h-1 bg-blue-600 -z-0 -translate-y-1/2 rounded transition-all duration-300"
                        style={{ width: `${(step / (STEPS.length - 1)) * 100}%` }}
                    />

                    {STEPS.map((s, i) => {
                        const Icon = s.icon
                        const isActive = i <= step
                        const isCurrent = i === step

                        return (
                            <div key={s.id} className="relative z-10 flex flex-col items-center gap-2 bg-transparent">
                                <div className={cn(
                                    "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300",
                                    isActive
                                        ? "bg-blue-600 border-blue-600 text-white shadow-md scale-110"
                                        : "bg-white border-gray-300 text-gray-400"
                                )}>
                                    <Icon className="w-5 h-5" />
                                </div>
                                <span className={cn(
                                    "text-xs font-medium transition-colors duration-300 absolute top-12 whitespace-nowrap",
                                    isCurrent ? "text-blue-700" : "text-gray-500"
                                )}>
                                    {s.title}
                                </span>
                            </div>
                        )
                    })}
                </div>
            </div>

            <Card className="w-full max-w-2xl shadow-xl border-t-4 border-t-blue-600">
                <CardContent className="p-8 min-h-[400px] flex flex-col">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">{currentStep.title}</h1>
                        <p className="text-gray-600 text-lg">{currentStep.description}</p>
                    </div>

                    <div className="flex-1">
                        {step === 0 && (
                            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                                <p className="text-sm font-medium text-gray-700 mb-4 block">Select all that apply:</p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {GOALS.map((goal) => (
                                        <div
                                            key={goal}
                                            onClick={() => toggleGoal(goal)}
                                            className={cn(
                                                "p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center gap-3 hover:shadow-sm",
                                                formData.goals.includes(goal)
                                                    ? "border-blue-600 bg-blue-50 text-blue-800"
                                                    : "border-gray-100 bg-gray-50 text-gray-600 hover:border-blue-200"
                                            )}
                                        >
                                            <div className={cn(
                                                "w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0",
                                                formData.goals.includes(goal)
                                                    ? "bg-blue-600 border-blue-600"
                                                    : "bg-white border-gray-400"
                                            )}>
                                                {formData.goals.includes(goal) && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                                            </div>
                                            <span className="font-medium">{goal}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {step === 1 && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                                <div>
                                    <Label className="text-base mb-3 block">What grade are you in?</Label>
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                        {GRADE_LEVELS.map((grade) => (
                                            <button
                                                key={grade.id}
                                                type="button"
                                                onClick={() => setFormData({ ...formData, gradeLevel: grade.id })}
                                                className={cn(
                                                    "p-3 rounded-lg border-2 text-sm font-medium transition-all",
                                                    formData.gradeLevel === grade.id
                                                        ? "border-blue-600 bg-blue-50 text-blue-700 shadow-sm"
                                                        : "border-gray-100 bg-gray-50 text-gray-600 hover:border-gray-300"
                                                )}
                                            >
                                                {grade.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="mt-8">
                                    <Label className="text-base mb-3 block">Preferred Language</Label>
                                    <select
                                        className="w-full p-3 bg-gray-50 border rounded-lg"
                                        value={formData.preferredLanguage}
                                        onChange={(e) => setFormData({ ...formData, preferredLanguage: e.target.value })}
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
                            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                                <p className="text-sm font-medium text-gray-700 mb-4 block">Pick at least 3 subjects you're interested in:</p>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                    {SUBJECTS.map((subject) => (
                                        <button
                                            key={subject.id}
                                            type="button"
                                            onClick={() => toggleSubject(subject.id)}
                                            className={cn(
                                                "p-4 rounded-xl border-2 text-left flex flex-col gap-2 transition-all hover:shadow-sm",
                                                formData.subjectsOfInterest.includes(subject.id)
                                                    ? "border-blue-500 bg-blue-50 text-blue-900"
                                                    : "border-gray-100 bg-gray-50 text-gray-600 hover:border-blue-200"
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

                    <div className="flex items-center justify-between pt-8 mt-4 border-t">
                        <Button
                            variant="ghost"
                            onClick={() => step > 0 && setStep(step - 1)}
                            disabled={step === 0 || loading}
                            className={cn(step === 0 && "invisible")}
                        >
                            Back
                        </Button>
                        <Button
                            onClick={handleNext}
                            disabled={loading || (step === 1 && !formData.gradeLevel)}
                            className="bg-blue-600 hover:bg-blue-700 text-white min-w-[120px]"
                        >
                            {loading && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
                            {step === STEPS.length - 1 ? 'Finish' : 'Next'}
                            {!loading && step < STEPS.length - 1 && <ArrowRight className="w-4 h-4 ml-2" />}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
