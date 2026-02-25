'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'

import { toast } from 'sonner'
import { ArrowLeft, GraduationCap, BookOpen, Award, Upload } from 'lucide-react'

const subjects = [
  'Mathematics', 'Physics', 'Chemistry', 'Biology', 
  'English', 'Chinese', 'History', 'Geography',
  'Computer Science', 'Art', 'Music', 'Physical Education'
]

const gradeLevels = [
  'Elementary (1-6)', 'Middle School (7-9)', 
  'High School (10-12)', 'University', 'All Levels'
]

const educationOptions = [
  'High School',
  'Bachelor\'s Degree',
  'Master\'s Degree',
  'PhD',
  'Teaching Certificate',
  'Other'
]

export default function TutorRegistrationPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState(1)
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    education: '',
    hasCertificate: false,
    experience: '',
    subjects: [] as string[],
    gradeLevels: [] as string[],
    timezone: 'Asia/Shanghai',
    preferredLanguage: 'zh-CN',
    agreeToTerms: false,
    backgroundCheck: false
  })

  const toggleSubject = (subject: string) => {
    setFormData(prev => ({
      ...prev,
      subjects: prev.subjects.includes(subject)
        ? prev.subjects.filter(s => s !== subject)
        : [...prev.subjects, subject]
    }))
  }

  const toggleGradeLevel = (level: string) => {
    setFormData(prev => ({
      ...prev,
      gradeLevels: prev.gradeLevels.includes(level)
        ? prev.gradeLevels.filter(l => l !== level)
        : [...prev.gradeLevels, level]
    }))
  }



  const handleSubmit = async () => {
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    if (formData.subjects.length === 0) {
      toast.error('Please select at least one subject')
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          role: 'TUTOR',
          email: formData.email,
          password: formData.password,
          name: `${formData.firstName} ${formData.lastName}`,
          tosAccepted: true,
          profileData: {
            phoneNumber: formData.phoneNumber,
            timezone: formData.timezone,
            preferredLanguage: formData.preferredLanguage
          },
          additionalData: {
            education: formData.education,
            experience: formData.experience,
            subjects: formData.subjects,
            gradeLevels: formData.gradeLevels
          }
        })
      })

      const data = await response.json()

      if (response.ok) {
        toast.success('Tutor account created successfully!')
        router.push('/login')
      } else {
        toast.error(data.error || 'Failed to create account')
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const steps = [
    { number: 1, title: 'Account' },
    { number: 2, title: 'Profile' },
    { number: 3, title: 'Expertise' },
    { number: 4, title: 'Complete' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <Link href="/register" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Registration
        </Link>

        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
            <GraduationCap className="h-8 w-8 text-purple-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Become a Tutor</h1>
          <p className="text-gray-600 mt-2">Join our platform and start teaching students</p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          {steps.map((s, index) => (
            <div key={s.number} className="flex items-center">
              <div className={`
                w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold
                ${step >= s.number ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-500'}
              `}>
                {s.number}
              </div>
              <span className={`ml-2 text-sm ${step >= s.number ? 'text-purple-600' : 'text-gray-400'}`}>
                {s.title}
              </span>
              {index < steps.length - 1 && (
                <div className={`w-12 h-0.5 mx-4 ${step > s.number ? 'bg-purple-600' : 'bg-gray-200'}`} />
              )}
            </div>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>
              {step === 1 && 'Account Information'}
              {step === 2 && 'Professional Profile'}
              {step === 3 && 'Teaching Expertise'}
              {step === 4 && 'Review & Submit'}
            </CardTitle>
            <CardDescription>
              {step === 1 && 'Create your tutor account'}
              {step === 2 && 'Tell us about your background'}
              {step === 3 && 'Select your teaching areas'}
              {step === 4 && 'Complete your registration'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {step === 1 && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>First Name</Label>
                    <Input
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      placeholder="John"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Last Name</Label>
                    <Input
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Email Address</Label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="tutor@example.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Phone Number</Label>
                  <Input
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                    placeholder="+86 138 0000 0000"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Password</Label>
                    <Input
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      placeholder="••••••••"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Confirm Password</Label>
                    <Input
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <Button className="w-full" onClick={() => setStep(2)}>
                  Next: Profile
                </Button>
              </>
            )}

            {step === 2 && (
              <>
                <div className="space-y-2">
                  <Label>Teaching Experience</Label>
                  <Select
                    value={formData.experience}
                    onValueChange={(value) => setFormData({ ...formData, experience: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-2">0-2 years</SelectItem>
                      <SelectItem value="2-5">2-5 years</SelectItem>
                      <SelectItem value="5-10">5-10 years</SelectItem>
                      <SelectItem value="10+">10+ years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1" onClick={() => setStep(1)}>
                    Back
                  </Button>
                  <Button className="flex-1" onClick={() => setStep(3)}>
                    Next: Expertise
                  </Button>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <div className="space-y-4">
                  <Label>Education</Label>
                  <Select
                    value={formData.education}
                    onValueChange={(value) => setFormData({ ...formData, education: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your highest education level" />
                    </SelectTrigger>
                    <SelectContent>
                      {educationOptions.map((option) => (
                        <SelectItem key={option} value={option}>{option}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-start space-x-3 p-3 rounded-lg border border-gray-200 bg-gray-50/50">
                  <Checkbox
                    id="certificate"
                    checked={formData.hasCertificate}
                    onCheckedChange={(checked) => 
                      setFormData({ ...formData, hasCertificate: checked as boolean })
                    }
                  />
                  <Label htmlFor="certificate" className="text-sm cursor-pointer">
                    I have a teaching certificate or relevant certification
                  </Label>
                </div>

                <div className="space-y-4">
                  <Label>Subjects You Teach</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {subjects.map((subject) => (
                      <label
                        key={subject}
                        className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-colors ${
                          formData.subjects.includes(subject)
                            ? 'border-purple-500 bg-purple-50'
                            : 'border-gray-200 hover:bg-gray-50'
                        }`}
                      >
                        <Checkbox
                          checked={formData.subjects.includes(subject)}
                          onCheckedChange={() => toggleSubject(subject)}
                        />
                        <span className="text-sm">{subject}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <Label>Grade Levels</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {gradeLevels.map((level) => (
                      <label
                        key={level}
                        className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-colors ${
                          formData.gradeLevels.includes(level)
                            ? 'border-purple-500 bg-purple-50'
                            : 'border-gray-200 hover:bg-gray-50'
                        }`}
                      >
                        <Checkbox
                          checked={formData.gradeLevels.includes(level)}
                          onCheckedChange={() => toggleGradeLevel(level)}
                        />
                        <span className="text-sm">{level}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1" onClick={() => setStep(2)}>
                    Back
                  </Button>
                  <Button className="flex-1" onClick={() => setStep(4)}>
                    Review
                  </Button>
                </div>
              </>
            )}

            {step === 4 && (
              <>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <BookOpen className="h-4 w-4" />
                      Profile Summary
                    </h4>
                    <div className="space-y-2 text-sm">
                      <p><strong>Name:</strong> {formData.firstName} {formData.lastName}</p>
                      <p><strong>Email:</strong> {formData.email}</p>
                      <p><strong>Education:</strong> {formData.education || 'Not specified'}</p>
                      {formData.hasCertificate && (
                        <p className="text-green-600">✓ Has teaching certificate</p>
                      )}
                      <p><strong>Experience:</strong> {formData.experience || 'Not specified'} years</p>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Award className="h-4 w-4" />
                      Teaching Areas
                    </h4>
                    <div className="space-y-2">
                      <p className="text-sm"><strong>Subjects:</strong> {formData.subjects.join(', ') || 'None selected'}</p>
                      <p className="text-sm"><strong>Grade Levels:</strong> {formData.gradeLevels.join(', ') || 'None selected'}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="terms"
                      checked={formData.agreeToTerms}
                      onCheckedChange={(checked) => 
                        setFormData({ ...formData, agreeToTerms: checked as boolean })
                      }
                    />
                    <Label htmlFor="terms" className="text-sm">
                      I agree to the Tutor Terms of Service and understand that my application will be reviewed
                    </Label>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="background"
                      checked={formData.backgroundCheck}
                      onCheckedChange={(checked) => 
                        setFormData({ ...formData, backgroundCheck: checked as boolean })
                      }
                    />
                    <Label htmlFor="background" className="text-sm">
                      I consent to a background check as part of the tutor verification process
                    </Label>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1" onClick={() => setStep(3)}>
                    Back
                  </Button>
                  <Button 
                    className="flex-1 bg-purple-600 hover:bg-purple-700"
                    onClick={handleSubmit}
                    disabled={isLoading || !formData.agreeToTerms}
                  >
                    {isLoading ? 'Submitting...' : 'Complete Registration'}
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
