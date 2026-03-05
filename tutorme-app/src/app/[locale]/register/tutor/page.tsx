'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import { ArrowLeft, GraduationCap, ShieldCheck, Globe, UserRound } from 'lucide-react'
import {
  COUNTRY_OPTIONS,
  GLOBAL_EXAM_CATEGORIES,
  subjectsForCountry,
} from '@/lib/tutoring/categories'

type GlobalExamState = {
  standardizedEnglish: string[]
  undergradAdmissions: string[]
  apAdvancedPlacement: string[]
  internationalAS: string[]
}

type SocialLinks = {
  instagram: string
  tiktok: string
  youtube: string
  facebook: string
}

export default function TutorRegistrationPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState(1)
  const [activeCountry, setActiveCountry] = useState('')
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null)
  const [usernameStatus, setUsernameStatus] = useState<{ status: 'idle' | 'checking' | 'available' | 'taken'; message?: string; suggestion?: string }>({
    status: 'idle',
  })

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    middleName: '',
    lastName: '',
    legalName: '',
    countryOfResidence: '',
    phoneCountryCode: '+1',
    phoneNumber: '',
    educationLevel: '',
    hasTeachingCertificate: false,
    certificateName: '',
    certificateSubjects: '',
    tutoringExperienceRange: '',
    globalExams: {
      standardizedEnglish: [],
      undergradAdmissions: [],
      apAdvancedPlacement: [],
      internationalAS: [],
    } as GlobalExamState,
    tutoringCountries: [] as string[],
    countrySubjectSelections: {} as Record<string, string[]>,
    username: '',
    serviceDescription: '',
    socialLinks: {
      instagram: '',
      tiktok: '',
      youtube: '',
      facebook: '',
    } as SocialLinks,
    timezone: 'Asia/Shanghai',
    preferredLanguage: 'en',
    agreeToTerms: false,
  })

  const passwordMismatch =
    formData.password.length > 0 &&
    formData.confirmPassword.length > 0 &&
    formData.password !== formData.confirmPassword

  const categorySelections = useMemo(() => {
    const categories: string[] = []
    categories.push(...formData.globalExams.standardizedEnglish)
    categories.push(...formData.globalExams.undergradAdmissions)
    categories.push(...formData.globalExams.apAdvancedPlacement)
    categories.push(...formData.globalExams.internationalAS)

    Object.entries(formData.countrySubjectSelections).forEach(([country, subjects]) => {
      subjects.forEach((subject) => categories.push(`${country}: ${subject}`))
    })

    return Array.from(new Set(categories))
  }, [formData.countrySubjectSelections, formData.globalExams])

  const toggleGlobalExam = (categoryId: keyof GlobalExamState, exam: string) => {
    setFormData((prev) => {
      const next = prev.globalExams[categoryId].includes(exam)
        ? prev.globalExams[categoryId].filter((item) => item !== exam)
        : [...prev.globalExams[categoryId], exam]
      return {
        ...prev,
        globalExams: {
          ...prev.globalExams,
          [categoryId]: next,
        },
      }
    })
  }

  const toggleCountry = (country: string) => {
    let nextCountries: string[] = []
    setFormData((prev) => {
      nextCountries = prev.tutoringCountries.includes(country)
        ? prev.tutoringCountries.filter((c) => c !== country)
        : [...prev.tutoringCountries, country]

      const nextSelections = { ...prev.countrySubjectSelections }
      if (!nextCountries.includes(country)) {
        delete nextSelections[country]
      }

      return {
        ...prev,
        tutoringCountries: nextCountries,
        countrySubjectSelections: nextSelections,
      }
    })

    setActiveCountry((prev) => {
      if (!nextCountries.length) return ''
      if (!nextCountries.includes(prev)) return nextCountries[0]
      return prev
    })
  }

  const toggleCountrySubject = (country: string, subject: string) => {
    setFormData((prev) => {
      const existing = prev.countrySubjectSelections[country] || []
      const next = existing.includes(subject)
        ? existing.filter((item) => item !== subject)
        : [...existing, subject]
      return {
        ...prev,
        countrySubjectSelections: {
          ...prev.countrySubjectSelections,
          [country]: next,
        },
      }
    })
  }

  const handleUsernameCheck = async () => {
    if (!formData.username.trim()) {
      toast.error('Enter a username to verify')
      return
    }
    setUsernameStatus({ status: 'checking' })
    try {
      const res = await fetch(`/api/public/username-availability?username=${encodeURIComponent(formData.username)}`)
      const data = await res.json()
      if (data.available) {
        setUsernameStatus({ status: 'available', message: 'Username is available' })
      } else {
        setUsernameStatus({ status: 'taken', message: 'Username is taken', suggestion: data.suggestion })
      }
    } catch {
      setUsernameStatus({ status: 'taken', message: 'Unable to verify right now' })
    }
  }

  const applySuggestion = () => {
    if (!usernameStatus.suggestion) return
    setFormData((prev) => ({ ...prev, username: usernameStatus.suggestion ?? prev.username }))
    setUsernameStatus({ status: 'idle' })
  }

  const validateStepOne = () => {
    if (!formData.firstName || !formData.lastName) {
      toast.error('First and last name are required')
      return false
    }
    if (!formData.email || !formData.password) {
      toast.error('Email and password are required')
      return false
    }
    if (passwordMismatch) {
      toast.error('Passwords do not match')
      return false
    }
    if (!formData.countryOfResidence) {
      toast.error('Country of residence is required')
      return false
    }
    if (!formData.phoneNumber) {
      toast.error('Phone number is required')
      return false
    }
    if (!/^\+?[\d\s\-\(\)]{10,}$/.test(formData.phoneNumber)) {
      toast.error('Valid phone number required')
      return false
    }
    return true
  }

  const validateStepTwo = () => {
    if (!formData.educationLevel) {
      toast.error('Education level is required')
      return false
    }
    if (!formData.tutoringExperienceRange) {
      toast.error('Tutoring experience is required')
      return false
    }
    if (formData.hasTeachingCertificate && !formData.certificateName) {
      toast.error('Please enter your teaching certificate')
      return false
    }
    return true
  }

  const validateStepThree = () => {
    if (categorySelections.length === 0) {
      toast.error('Select at least one tutoring category')
      return false
    }
    if (formData.tutoringCountries.length === 0) {
      toast.error('Select at least one country you want to tutor in')
      return false
    }
    return true
  }

  const validateStepFour = () => {
    if (!formData.username) {
      toast.error('Username is required')
      return false
    }
    if (!formData.legalName) {
      toast.error('Legal name is required')
      return false
    }
    if (!formData.serviceDescription || formData.serviceDescription.length < 10) {
      toast.error('Please describe your service (min 10 characters)')
      return false
    }
    return true
  }

  const handleSubmit = async () => {
    if (!formData.agreeToTerms) {
      toast.error('You must accept the Terms and Agreements')
      return
    }

    setIsLoading(true)
    try {
      const payload = {
        role: 'TUTOR',
        email: formData.email,
        password: formData.password,
        name: formData.legalName || `${formData.firstName} ${formData.lastName}`,
        tosAccepted: formData.agreeToTerms,
        profileData: {
          timezone: formData.timezone,
          preferredLanguage: formData.preferredLanguage,
        },
        additionalData: {
          firstName: formData.firstName,
          middleName: formData.middleName,
          lastName: formData.lastName,
          legalName: formData.legalName,
          countryOfResidence: formData.countryOfResidence,
          phoneCountryCode: formData.phoneCountryCode,
          phoneNumber: formData.phoneNumber,
          educationLevel: formData.educationLevel,
          hasTeachingCertificate: formData.hasTeachingCertificate,
          certificateName: formData.certificateName,
          certificateSubjects: formData.certificateSubjects,
          tutoringExperienceRange: formData.tutoringExperienceRange,
          globalExams: formData.globalExams,
          tutoringCountries: formData.tutoringCountries,
          countrySubjectSelections: formData.countrySubjectSelections,
          categories: categorySelections,
          username: formData.username,
          socialLinks: formData.socialLinks,
          serviceDescription: formData.serviceDescription,
        },
      }

      const formPayload = new FormData()
      formPayload.set('payload', JSON.stringify(payload))
      if (profilePhoto) {
        formPayload.set('avatar', profilePhoto)
      }

      const response = await fetch('/api/auth/register/tutor', {
        method: 'POST',
        body: formPayload,
      })

      const data = await response.json()

      if (response.ok) {
        toast.success('Tutor account created successfully!')
        router.push('/login?registered=1')
      } else {
        toast.error(data.error || 'Failed to create account')
      }
    } catch {
      toast.error('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const steps = [
    { number: 1, title: 'Account' },
    { number: 2, title: 'Credentials' },
    { number: 3, title: 'Tutoring' },
    { number: 4, title: 'Profile' },
    { number: 5, title: 'Review' },
    { number: 6, title: 'Terms' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/register" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Registration
        </Link>

        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
            <GraduationCap className="h-8 w-8 text-purple-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Become a Solocorn Tutor</h1>
          <p className="text-gray-600 mt-2">Complete your application to start tutoring on the platform</p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          {steps.map((s) => (
            <div key={s.number} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${step >= s.number ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                {s.number}
              </div>
              <span className={`text-sm ${step >= s.number ? 'text-purple-600' : 'text-gray-400'}`}>{s.title}</span>
            </div>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>
              {step === 1 && 'Become a Solocorn Tutor'}
              {step === 2 && 'Teaching Expertise – Credentials'}
              {step === 3 && 'Tutoring'}
              {step === 4 && 'Your Profile'}
              {step === 5 && 'Review'}
              {step === 6 && 'Terms and Agreements'}
            </CardTitle>
            <CardDescription>
              {step === 1 && 'Tell us who you are'}
              {step === 2 && 'This information will not be made public'}
              {step === 3 && 'Select the exams, subjects, and countries you tutor'}
              {step === 4 && 'Set up your Solocorn presence'}
              {step === 5 && 'Review your application before registering'}
              {step === 6 && 'Accept the terms to finalize your application'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {step === 1 && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>First Name</Label>
                    <Input value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <Label>Middle Name</Label>
                    <Input value={formData.middleName} onChange={(e) => setFormData({ ...formData, middleName: e.target.value })} placeholder="Optional" />
                  </div>
                  <div className="space-y-2">
                    <Label>Last Name</Label>
                    <Input value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} placeholder="Doe" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="tutor@example.com" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Password</Label>
                    <Input type="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} placeholder="••••••••" />
                  </div>
                  <div className="space-y-2">
                    <Label>Confirm Password</Label>
                    <Input type="password" value={formData.confirmPassword} onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })} placeholder="••••••••" />
                    {passwordMismatch && <p className="text-xs text-red-500">Passwords do not match.</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Country of Residence</Label>
                  <Select value={formData.countryOfResidence} onValueChange={(value) => setFormData({ ...formData, countryOfResidence: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      {COUNTRY_OPTIONS.map((country) => (
                        <SelectItem key={country} value={country}>{country}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Area Code</Label>
                    <Select value={formData.phoneCountryCode} onValueChange={(value) => setFormData({ ...formData, phoneCountryCode: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="+1" />
                      </SelectTrigger>
                      <SelectContent>
                        {['+1', '+44', '+61', '+65', '+86', '+91', '+81', '+82'].map((code) => (
                          <SelectItem key={code} value={code}>{code}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label>Phone Number</Label>
                    <Input value={formData.phoneNumber} onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })} placeholder="(555) 123-4567" />
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button className="flex-1" onClick={() => validateStepOne() && setStep(2)}>
                    Next
                  </Button>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div className="space-y-2">
                  <Label>Education</Label>
                  <Select value={formData.educationLevel} onValueChange={(value) => setFormData({ ...formData, educationLevel: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select education level" />
                    </SelectTrigger>
                    <SelectContent>
                      {['High School Diploma', 'Bachelor', 'Masters', 'PhD'].map((level) => (
                        <SelectItem key={level} value={level}>{level}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Do you have a teaching certificate?</Label>
                  <Select
                    value={formData.hasTeachingCertificate ? 'yes' : 'no'}
                    onValueChange={(value) => setFormData({ ...formData, hasTeachingCertificate: value === 'yes' })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {formData.hasTeachingCertificate && (
                  <>
                    <div className="space-y-2">
                      <Label>Certification (e.g. PGCE)</Label>
                      <Input value={formData.certificateName} onChange={(e) => setFormData({ ...formData, certificateName: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                      <Label>What are you qualified to teach?</Label>
                      <Input value={formData.certificateSubjects} onChange={(e) => setFormData({ ...formData, certificateSubjects: e.target.value })} />
                    </div>
                  </>
                )}

                <div className="space-y-2">
                  <Label>How long have you tutored?</Label>
                  <Select value={formData.tutoringExperienceRange} onValueChange={(value) => setFormData({ ...formData, tutoringExperienceRange: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select experience range" />
                    </SelectTrigger>
                    <SelectContent>
                      {['0-2', '3-5', '6-10', '10+'].map((range) => (
                        <SelectItem key={range} value={range}>{range} years</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1" onClick={() => setStep(1)}>
                    Back
                  </Button>
                  <Button className="flex-1" onClick={() => validateStepTwo() && setStep(3)}>
                    Next
                  </Button>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <div className="space-y-4">
                  <Label>Categories (aggregated for search)</Label>
                  <div className="flex flex-wrap gap-2">
                    {categorySelections.length === 0 && (
                      <p className="text-sm text-gray-500">No categories selected yet.</p>
                    )}
                    {categorySelections.map((category) => (
                      <span key={category} className="px-3 py-1 text-xs bg-purple-100 text-purple-700 rounded-full">
                        {category}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <Label>Global Exams</Label>
                  {GLOBAL_EXAM_CATEGORIES.map((category) => (
                    <div key={category.id} className="space-y-3">
                      <p className="text-sm font-semibold text-gray-800">{category.label}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {category.exams.map((exam) => (
                          <label key={exam} className="flex items-center gap-2 text-sm">
                            <Checkbox
                              checked={formData.globalExams[
                                category.id === 'standardized-english'
                                  ? 'standardizedEnglish'
                                  : category.id === 'undergrad-admissions'
                                    ? 'undergradAdmissions'
                                    : category.id === 'ap'
                                      ? 'apAdvancedPlacement'
                                      : 'internationalAS'
                              ].includes(exam)}
                              onCheckedChange={() =>
                                toggleGlobalExam(
                                  category.id === 'standardized-english'
                                    ? 'standardizedEnglish'
                                    : category.id === 'undergrad-admissions'
                                      ? 'undergradAdmissions'
                                      : category.id === 'ap'
                                        ? 'apAdvancedPlacement'
                                        : 'internationalAS',
                                  exam
                                )
                              }
                            />
                            {exam}
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-3">
                  <Label>What countries do you want to offer your tutoring to?</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {COUNTRY_OPTIONS.map((country) => (
                      <label key={country} className="flex items-center gap-2 text-sm">
                        <Checkbox
                          checked={formData.tutoringCountries.includes(country)}
                          onCheckedChange={() => toggleCountry(country)}
                        />
                        {country}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Subjects and Exams by Country</Label>
                  <Select
                    value={activeCountry}
                    onValueChange={(value) => setActiveCountry(value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a country to assign subjects" />
                    </SelectTrigger>
                    <SelectContent>
                      {formData.tutoringCountries.map((country) => (
                        <SelectItem key={country} value={country}>{country}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {activeCountry && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {subjectsForCountry(activeCountry).map((subject) => (
                        <label key={subject} className="flex items-center gap-2 text-sm">
                          <Checkbox
                            checked={(formData.countrySubjectSelections[activeCountry] || []).includes(subject)}
                            onCheckedChange={() => toggleCountrySubject(activeCountry, subject)}
                          />
                          {subject}
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1" onClick={() => setStep(2)}>
                    Back
                  </Button>
                  <Button className="flex-1" onClick={() => validateStepThree() && setStep(4)}>
                    Next
                  </Button>
                </div>
              </>
            )}

            {step === 4 && (
              <>
                <div className="space-y-2">
                  <Label>Solocorn Username</Label>
                  <div className="flex gap-2">
                    <Input
                      value={formData.username}
                      onChange={(e) => {
                        setFormData({ ...formData, username: e.target.value })
                        setUsernameStatus({ status: 'idle' })
                      }}
                      placeholder="@MrKimTutoring"
                    />
                    <Button variant="outline" onClick={handleUsernameCheck}>
                      Verify
                    </Button>
                  </div>
                  {usernameStatus.status === 'checking' && (
                    <p className="text-xs text-gray-500">Checking availability...</p>
                  )}
                  {usernameStatus.status === 'available' && (
                    <p className="text-xs text-green-600">{usernameStatus.message}</p>
                  )}
                  {usernameStatus.status === 'taken' && (
                    <div className="text-xs text-red-600">
                      <p>{usernameStatus.message}</p>
                      {usernameStatus.suggestion && (
                        <button className="text-purple-600 underline" type="button" onClick={applySuggestion}>
                          Use {usernameStatus.suggestion}
                        </button>
                      )}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Photo Upload</Label>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setProfilePhoto(e.target.files?.[0] ?? null)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Legal Name</Label>
                  <Input
                    value={formData.legalName}
                    onChange={(e) => setFormData({ ...formData, legalName: e.target.value })}
                    placeholder="As per verification documents"
                  />
                </div>

                <div className="space-y-3">
                  <Label>Social Media Accounts</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <Input
                      value={formData.socialLinks.instagram}
                      onChange={(e) => setFormData({ ...formData, socialLinks: { ...formData.socialLinks, instagram: e.target.value } })}
                      placeholder="Instagram"
                    />
                    <Input
                      value={formData.socialLinks.tiktok}
                      onChange={(e) => setFormData({ ...formData, socialLinks: { ...formData.socialLinks, tiktok: e.target.value } })}
                      placeholder="TikTok"
                    />
                    <Input
                      value={formData.socialLinks.youtube}
                      onChange={(e) => setFormData({ ...formData, socialLinks: { ...formData.socialLinks, youtube: e.target.value } })}
                      placeholder="YouTube"
                    />
                    <Input
                      value={formData.socialLinks.facebook}
                      onChange={(e) => setFormData({ ...formData, socialLinks: { ...formData.socialLinks, facebook: e.target.value } })}
                      placeholder="Facebook"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Describe Your Service</Label>
                  <Textarea
                    value={formData.serviceDescription}
                    onChange={(e) => setFormData({ ...formData, serviceDescription: e.target.value.slice(0, 500) })}
                    placeholder="Describe your tutoring service (500 characters max)"
                  />
                  <p className="text-xs text-gray-500">{formData.serviceDescription.length}/500</p>
                  <p className="text-xs text-gray-500">This information must match verification documents.</p>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1" onClick={() => setStep(3)}>
                    Back
                  </Button>
                  <Button className="flex-1" onClick={() => validateStepFour() && setStep(5)}>
                    Submit
                  </Button>
                </div>
              </>
            )}

            {step === 5 && (
              <>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <UserRound className="h-4 w-4" />
                      Profile Overview
                    </h4>
                    <p className="text-sm"><strong>Legal Name:</strong> {formData.legalName || 'Not provided'}</p>
                    <p className="text-sm"><strong>Username:</strong> {formData.username}</p>
                    <p className="text-sm"><strong>Service:</strong> {formData.serviceDescription || 'Not provided'}</p>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Globe className="h-4 w-4" />
                      Categories
                    </h4>
                    {categorySelections.length === 0 ? (
                      <p className="text-sm text-gray-500">No categories selected.</p>
                    ) : (
                      <ul className="text-sm text-gray-700 list-disc list-inside">
                        {categorySelections.map((category) => (
                          <li key={category}>{category}</li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <ShieldCheck className="h-4 w-4" />
                      Countries and Subjects
                    </h4>
                    {formData.tutoringCountries.length === 0 ? (
                      <p className="text-sm text-gray-500">No countries selected.</p>
                    ) : (
                      formData.tutoringCountries.map((country) => (
                        <div key={country} className="text-sm text-gray-700 mb-2">
                          <strong>{country}:</strong> {(formData.countrySubjectSelections[country] || []).join(', ') || 'No subjects selected'}
                        </div>
                      ))
                    )}
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1" onClick={() => setStep(4)}>
                    Back
                  </Button>
                  <Button className="flex-1" onClick={() => setStep(6)}>
                    Register
                  </Button>
                </div>
              </>
            )}

            {step === 6 && (
              <>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="terms"
                      checked={formData.agreeToTerms}
                      onCheckedChange={(checked) => setFormData({ ...formData, agreeToTerms: checked as boolean })}
                    />
                    <Label htmlFor="terms" className="text-sm">
                      I agree to the Terms and Agreements and confirm that the information provided is accurate.
                    </Label>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1" onClick={() => setStep(5)}>
                    Back
                  </Button>
                  <Button className="flex-1 bg-purple-600 hover:bg-purple-700" onClick={handleSubmit} disabled={isLoading || !formData.agreeToTerms}>
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
