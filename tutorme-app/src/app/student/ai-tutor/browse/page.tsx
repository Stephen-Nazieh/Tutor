'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Check, Star, Users, Clock, Sparkles, ChevronLeft, User, Volume2, Globe, BookOpen, GraduationCap } from 'lucide-react'
import { toast } from 'sonner'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface Curriculum {
  id: string
  code: string
  name: string
  category: string
  description: string
  skills: string[]
  modulesCount?: number
  lessonsCount?: number
}

interface Subject {
  id: string
  name: string
  description: string
  icon: string
  topics: string[]
  features: string[]
  estimatedStudents: number
  averageRating: number
  color: string
  comingSoon?: boolean
}

const AGE_OPTIONS = [
  { value: 5, label: '5-8 years', description: 'Simple words, stories' },
  { value: 8, label: '8-10 years', description: 'Clear explanations' },
  { value: 10, label: '10-12 years', description: 'Academic language' },
  { value: 12, label: '12-15 years', description: 'Critical thinking' },
  { value: 15, label: '15-18 years', description: 'College-prep' },
  { value: 18, label: 'Adult', description: 'Sophisticated' },
]

const GENDER_OPTIONS = [
  { value: 'female', label: 'Female', emoji: '👩' },
  { value: 'male', label: 'Male', emoji: '👨' },
  { value: 'neutral', label: 'Neutral', emoji: '🧑' },
]

const ACCENT_OPTIONS = [
  { value: 'us', label: 'American', flag: '🇺🇸' },
  { value: 'uk', label: 'British', flag: '🇬🇧' },
  { value: 'au', label: 'Australian', flag: '🇦🇺' },
  { value: 'ca', label: 'Canadian', flag: '🇨🇦' },
]

export default function BrowseTutorsPage() {
  const router = useRouter()
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [loading, setLoading] = useState(true)
  const [enrolling, setEnrolling] = useState<string | null>(null)
  
  // Preferences dialog
  const [showPreferences, setShowPreferences] = useState(false)
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null)
  const [preferences, setPreferences] = useState({
    teachingAge: 15,
    voiceGender: 'female',
    voiceAccent: 'us',
  })
  
  // Curriculum selection
  const [curriculums, setCurriculums] = useState<Curriculum[]>([])
  const [selectedCurriculum, setSelectedCurriculum] = useState<string | null>(null)
  const [loadingCurriculums, setLoadingCurriculums] = useState(false)

  useEffect(() => {
    fetchSubjects()
  }, [])

  const fetchSubjects = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/ai-tutor/subjects')
      const data = await res.json()
      setSubjects(data.subjects || [])
    } catch (error) {
      toast.error('Failed to load subjects')
    } finally {
      setLoading(false)
    }
  }

  const openPreferences = async (subjectId: string) => {
    setSelectedSubject(subjectId)
    setShowPreferences(true)
    
    // Load available curriculums
    try {
      setLoadingCurriculums(true)
      const res = await fetch('/api/curriculums/list')
      const data = await res.json()
      setCurriculums(data.curriculums || [])
      
      // Auto-select first curriculum if available
      if (data.curriculums?.length > 0) {
        setSelectedCurriculum(data.curriculums[0].id)
      }
    } catch (error) {
      console.error('Failed to load curriculums:', error)
    } finally {
      setLoadingCurriculums(false)
    }
  }

  const handleEnroll = async () => {
    if (!selectedSubject) return
    
    try {
      setEnrolling(selectedSubject)
      setShowPreferences(false)
      
      const res = await fetch('/api/ai-tutor/enroll', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject: selectedSubject,
          englishLevel: 'intermediate',
          focusAreas: ['essay_writing', 'grammar'],
          teachingAge: preferences.teachingAge,
          voiceGender: preferences.voiceGender,
          voiceAccent: preferences.voiceAccent,
          avatarStyle: 'modern',
          curriculumId: selectedCurriculum
        })
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to enroll')
      }

      toast.success(data.message || 'Successfully enrolled!')
      router.push(`/student/ai-tutor/${selectedSubject}`)
    } catch (error: any) {
      toast.error(error.message || 'Failed to enroll')
    } finally {
      setEnrolling(null)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading available tutors...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" onClick={() => router.push('/student/ai-tutor')}>
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold mb-2">Find an AI Tutor</h1>
              <p className="text-gray-600">
                Choose a subject and customize your learning experience
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Available Now Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-500" />
            Available Now
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {subjects.filter(s => !s.comingSoon).map((subject) => (
              <Card key={subject.id} className="border-2 border-blue-200">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-4xl">{subject.icon}</span>
                      <div>
                        <CardTitle className="text-xl">{subject.name}</CardTitle>
                        <div className="flex items-center gap-3 mt-1">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                            <span className="text-sm font-medium">{subject.averageRating}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-500">
                              {subject.estimatedStudents.toLocaleString()} students
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-700">Active</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{subject.description}</p>
                  
                  <div className="mb-4">
                    <p className="text-sm font-medium mb-2">Topics Covered:</p>
                    <div className="flex flex-wrap gap-2">
                      {subject.topics.map((topic) => (
                        <Badge key={topic} variant="secondary">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <p className="text-sm font-medium mb-2">Features:</p>
                    <ul className="space-y-1">
                      {subject.features.map((feature, idx) => (
                        <li key={idx} className="text-sm text-gray-600 flex items-center gap-2">
                          <Check className="w-4 h-4 text-green-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      <Clock className="w-4 h-4 inline mr-1" />
                      Free: 5 messages/day
                    </div>
                    <Button 
                      size="lg"
                      onClick={() => openPreferences(subject.id)}
                      disabled={enrolling === subject.id}
                    >
                      {enrolling === subject.id ? 'Enrolling...' : 'Enroll Free'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Coming Soon Section */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-500">Coming Soon</h2>
          <div className="grid md:grid-cols-3 gap-4 opacity-60">
            {[
              { icon: '🔢', name: 'Mathematics', topics: 'Algebra, Calculus, Geometry' },
              { icon: '⚛️', name: 'Physics', topics: 'Mechanics, Energy, Waves' },
              { icon: '🧪', name: 'Chemistry', topics: 'Stoichiometry, Reactions' },
            ].map((subject) => (
              <Card key={subject.name} className="grayscale">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <span className="text-4xl">{subject.icon}</span>
                    <h3 className="font-semibold mt-2">{subject.name}</h3>
                    <p className="text-sm text-gray-500">{subject.topics}</p>
                    <Badge variant="secondary" className="mt-3">Coming Soon</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

      {/* Preferences Dialog */}
      <Dialog open={showPreferences} onOpenChange={setShowPreferences}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Customize Your AI Tutor</DialogTitle>
            <DialogDescription>
              Personalize how your English AI Tutor teaches and communicates with you.
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="preferences" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
              <TabsTrigger value="curriculum" className="flex items-center gap-1">
                <BookOpen className="w-4 h-4" />
                Curriculum
                {selectedCurriculum && <Check className="w-3 h-3 text-green-500" />}
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="preferences" className="space-y-6 py-4">
            {/* Teaching Age */}
            <div>
              <label className="text-sm font-medium flex items-center gap-2 mb-3">
                <User className="w-4 h-4" />
                Teach me like I'm...
              </label>
              <div className="grid grid-cols-3 gap-2">
                {AGE_OPTIONS.map((age) => (
                  <button
                    key={age.value}
                    onClick={() => setPreferences(prev => ({ ...prev, teachingAge: age.value }))}
                    className={`p-3 rounded-lg border text-left transition-all ${
                      preferences.teachingAge === age.value
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <span className="font-medium text-sm">{age.label}</span>
                    <p className="text-xs text-gray-500 mt-1">{age.description}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Voice Gender */}
            <div>
              <label className="text-sm font-medium flex items-center gap-2 mb-3">
                <Volume2 className="w-4 h-4" />
                Voice Gender
              </label>
              <div className="flex gap-2">
                {GENDER_OPTIONS.map((gender) => (
                  <button
                    key={gender.value}
                    onClick={() => setPreferences(prev => ({ ...prev, voiceGender: gender.value }))}
                    className={`flex-1 p-3 rounded-lg border text-center transition-all ${
                      preferences.voiceGender === gender.value
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <span className="text-2xl">{gender.emoji}</span>
                    <p className="text-sm mt-1">{gender.label}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Voice Accent */}
            <div>
              <label className="text-sm font-medium flex items-center gap-2 mb-3">
                <Globe className="w-4 h-4" />
                Voice Accent
              </label>
              <div className="flex gap-2">
                {ACCENT_OPTIONS.map((accent) => (
                  <button
                    key={accent.value}
                    onClick={() => setPreferences(prev => ({ ...prev, voiceAccent: accent.value }))}
                    className={`flex-1 p-3 rounded-lg border text-center transition-all ${
                      preferences.voiceAccent === accent.value
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <span className="text-2xl">{accent.flag}</span>
                    <p className="text-sm mt-1">{accent.label}</p>
                  </button>
                ))}
              </div>
            </div>
            </TabsContent>
            
            <TabsContent value="curriculum" className="py-4">
              {loadingCurriculums ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="mt-2 text-gray-600">Loading curriculums...</p>
                </div>
              ) : curriculums.length === 0 ? (
                <div className="text-center py-8">
                  <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">No Curriculums Available</h3>
                  <p className="text-gray-500 text-sm">
                    There are no curriculums set up yet. You can still enroll and get general English tutoring.
                  </p>
                </div>
              ) : (
                <ScrollArea className="h-[400px] pr-4">
                  <div className="space-y-3">
                    {curriculums.map((curriculum) => (
                      <button
                        key={curriculum.id}
                        onClick={() => setSelectedCurriculum(curriculum.id)}
                        className={`w-full p-4 rounded-lg border text-left transition-all ${
                          selectedCurriculum === curriculum.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`p-2 rounded-lg ${
                            curriculum.category === 'test_prep' ? 'bg-purple-100' : 'bg-blue-100'
                          }`}>
                            {curriculum.category === 'test_prep' ? (
                              <GraduationCap className="w-5 h-5 text-purple-600" />
                            ) : (
                              <BookOpen className="w-5 h-5 text-blue-600" />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold">{curriculum.name}</h3>
                              {selectedCurriculum === curriculum.id && (
                                <Check className="w-4 h-4 text-blue-500" />
                              )}
                            </div>
                            <p className="text-sm text-gray-600 mt-1">{curriculum.description}</p>
                            <div className="flex flex-wrap gap-1 mt-2">
                              {curriculum.skills?.map((skill) => (
                                <Badge key={skill} variant="secondary" className="text-xs capitalize">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                            <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                              <span>{curriculum.modulesCount || 0} modules</span>
                              <span>{curriculum.lessonsCount || 0} lessons</span>
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </ScrollArea>
              )}
              
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-700">
                  <strong>Why choose a curriculum?</strong> Curriculums provide structured learning paths 
                  with organized lessons, exercises, and progress tracking. Your AI tutor will follow 
                  the curriculum to help you achieve your goals faster.
                </p>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex gap-3 pt-4 border-t">
            <Button variant="outline" className="flex-1" onClick={() => setShowPreferences(false)}>
              Cancel
            </Button>
            <Button className="flex-1" onClick={handleEnroll} disabled={enrolling !== null}>
              {enrolling ? 'Enrolling...' : 'Start Learning'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
