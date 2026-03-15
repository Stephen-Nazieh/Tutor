'use client'

import { useEffect, useMemo, useState } from 'react'
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
import { ArrowLeft, GraduationCap, ShieldCheck, Globe, UserRound, ChevronDown, Eye, EyeOff } from 'lucide-react'
import {
  GLOBAL_EXAM_CATEGORIES,
} from '@/lib/tutoring/categories'
import { ALL_COUNTRIES, findCountryByName } from '@/lib/geo/countries'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

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

const REGION_OPTIONS = [
  'Worldwide',
  'Africa',
  'Asia',
  'Europe',
  'North America',
  'South America',
  'Oceania',
  'Middle East',
  'Other',
]

const REGION_COUNTRY_MAP: Record<string, string[]> = {
  Africa: [
    'Algeria', 'Angola', 'Benin', 'Botswana', 'Burkina Faso', 'Burundi', 'Cabo Verde', 'Cameroon',
    'Central African Republic', 'Chad', 'Comoros', 'Congo (Congo-Brazzaville)', 'Congo (DRC)',
    "Côte d'Ivoire", 'Djibouti', 'Egypt', 'Equatorial Guinea', 'Eritrea', 'Eswatini', 'Ethiopia',
    'Gabon', 'Gambia', 'Ghana', 'Guinea', 'Guinea-Bissau', 'Kenya', 'Lesotho', 'Liberia', 'Libya',
    'Madagascar', 'Malawi', 'Mali', 'Mauritania', 'Mauritius', 'Morocco', 'Mozambique', 'Namibia',
    'Niger', 'Nigeria', 'Rwanda', 'Sao Tome and Principe', 'Senegal', 'Seychelles', 'Sierra Leone',
    'Somalia', 'South Africa', 'South Sudan', 'Sudan', 'Tanzania', 'Togo', 'Tunisia', 'Uganda',
    'Zambia', 'Zimbabwe', 'Western Sahara',
  ],
  Asia: [
    'Afghanistan', 'Armenia', 'Azerbaijan', 'Bahrain', 'Bangladesh', 'Bhutan', 'Brunei', 'Cambodia',
    'China', 'Georgia', 'India', 'Indonesia', 'Japan', 'Kazakhstan', 'Kyrgyzstan', 'Laos', 'Malaysia',
    'Maldives', 'Mongolia', 'Myanmar (Burma)', 'Nepal', 'North Korea', 'Pakistan', 'Philippines',
    'Singapore', 'South Korea', 'Sri Lanka', 'Taiwan', 'Tajikistan', 'Thailand', 'Timor-Leste',
    'Turkmenistan', 'Uzbekistan', 'Vietnam',
  ],
  Europe: [
    'Albania', 'Andorra', 'Austria', 'Belarus', 'Belgium', 'Bosnia and Herzegovina', 'Bulgaria',
    'Croatia', 'Cyprus', 'Czechia', 'Denmark', 'Estonia', 'Finland', 'France', 'Germany', 'Greece',
    'Hungary', 'Iceland', 'Ireland', 'Italy', 'Kosovo', 'Latvia', 'Liechtenstein', 'Lithuania',
    'Luxembourg', 'Malta', 'Moldova', 'Monaco', 'Montenegro', 'Netherlands', 'North Macedonia',
    'Norway', 'Poland', 'Portugal', 'Romania', 'Russia', 'San Marino', 'Serbia', 'Slovakia',
    'Slovenia', 'Spain', 'Sweden', 'Switzerland', 'Ukraine', 'United Kingdom', 'Vatican City',
  ],
  'North America': [
    'Antigua and Barbuda', 'Bahamas', 'Barbados', 'Belize', 'Canada', 'Costa Rica', 'Cuba', 'Dominica',
    'Dominican Republic', 'El Salvador', 'Grenada', 'Guatemala', 'Haiti', 'Honduras', 'Jamaica',
    'Mexico', 'Nicaragua', 'Panama', 'Saint Kitts and Nevis', 'Saint Lucia',
    'Saint Vincent and the Grenadines', 'Trinidad and Tobago', 'United States', 'Puerto Rico',
    'Greenland', 'Bermuda',
  ],
  'South America': [
    'Argentina', 'Bolivia', 'Brazil', 'Chile', 'Colombia', 'Ecuador', 'Guyana', 'Paraguay', 'Peru',
    'Suriname', 'Uruguay', 'Venezuela', 'Falkland Islands',
  ],
  Oceania: [
    'Australia', 'Fiji', 'Kiribati', 'Marshall Islands', 'Micronesia', 'Nauru', 'New Zealand', 'Palau',
    'Papua New Guinea', 'Samoa', 'Solomon Islands', 'Tonga', 'Tuvalu', 'Vanuatu', 'New Caledonia',
    'French Polynesia', 'Guam', 'American Samoa',
  ],
  'Middle East': [
    'Algeria', 'Bahrain', 'Egypt', 'Iran', 'Iraq', 'Israel', 'Jordan', 'Kuwait', 'Lebanon', 'Libya',
    'Oman', 'Palestine', 'Qatar', 'Saudi Arabia', 'Syria', 'Turkey', 'United Arab Emirates', 'Yemen',
  ],
}

const COUNTRY_TO_REGION = new Map<string, string>()
Object.entries(REGION_COUNTRY_MAP).forEach(([region, countries]) => {
  countries.forEach((country) => COUNTRY_TO_REGION.set(country, region))
})

const resolveRegionForCountry = (country: string) => COUNTRY_TO_REGION.get(country) ?? 'Other'

export default function TutorRegistrationPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState(1)
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null)
  const [selectedRegions, setSelectedRegions] = useState<string[]>([])
  const [usernameStatus, setUsernameStatus] = useState<{ status: 'idle' | 'checking' | 'available' | 'taken'; message?: string; suggestion?: string }>({
    status: 'idle',
  })
  const [emailStatus, setEmailStatus] = useState<{ status: 'idle' | 'checking' | 'available' | 'taken' | 'invalid'; message?: string }>({
    status: 'idle',
  })
  const [usernameTouched, setUsernameTouched] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    middleName: '',
    lastName: '',
    legalName: '',
    countryOfResidence: '',
    educationLevel: '',
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
    return Array.from(new Set(categories))
  }, [formData.globalExams])

  const availableCountries = useMemo(() => {
    if (selectedRegions.length === 0 || selectedRegions.includes('Worldwide')) {
      return ALL_COUNTRIES
    }
    const selected = new Set(selectedRegions)
    return ALL_COUNTRIES.filter((country) => selected.has(resolveRegionForCountry(country.name)))
  }, [selectedRegions])

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
      return {
        ...prev,
        tutoringCountries: nextCountries,
      }
    })
  }

  const toggleRegion = (region: string) => {
    setSelectedRegions((prev) => {
      if (region === 'Worldwide') {
        setFormData((current) => ({
          ...current,
          tutoringCountries: ALL_COUNTRIES.map((c) => c.name),
        }))
        return ['Worldwide']
      }
      let next = prev.includes(region)
        ? prev.filter((item) => item !== region)
        : [...prev.filter((item) => item !== 'Worldwide'), region]
      if (!next.length) {
        next = []
      }
      return next
    })
  }

  // Updated: No dots allowed, use underscores instead
  const normalizeUsernameInput = (value: string) =>
    value
      .trim()
      .replace(/^@+/, '')
      .toLowerCase()
      .replace(/[^a-z0-9_]/g, '')
      .replace(/_+/g, '_')
      .replace(/^_+|_+$/g, '')
      .slice(0, 30)

  const checkUsernameAvailability = async (value: string) => {
    const normalized = normalizeUsernameInput(value)
    if (!normalized.trim()) {
      setUsernameStatus({ status: 'idle' })
      return
    }
    setUsernameStatus({ status: 'checking' })
    try {
      const res = await fetch(`/api/public/username-availability?username=${encodeURIComponent(normalized)}`)
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

  const checkEmailAvailability = async (value: string) => {
    if (!value.trim()) {
      setEmailStatus({ status: 'idle' })
      return false
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailPattern.test(value)) {
      setEmailStatus({ status: 'invalid', message: 'Enter a valid email address' })
      return false
    }
    setEmailStatus({ status: 'checking' })
    try {
      const res = await fetch(`/api/public/email-availability?email=${encodeURIComponent(value)}`)
      const data = await res.json()
      if (data.available) {
        setEmailStatus({ status: 'available', message: 'Email is available' })
        return true
      }
      setEmailStatus({ status: 'taken', message: 'Email is already registered' })
      return false
    } catch {
      setEmailStatus({ status: 'taken', message: 'Unable to verify right now' })
      return false
    }
  }

  const applySuggestion = () => {
    if (!usernameStatus.suggestion) return
    setFormData((prev) => ({ ...prev, username: usernameStatus.suggestion ?? prev.username }))
    setUsernameTouched(true)
    setUsernameStatus({ status: 'idle' })
  }

  useEffect(() => {
    const email = formData.email.trim()
    if (!email) {
      setEmailStatus({ status: 'idle' })
      return
    }
    const handle = setTimeout(() => {
      void checkEmailAvailability(email)
    }, 500)
    return () => clearTimeout(handle)
  }, [formData.email])

  useEffect(() => {
    const normalized = normalizeUsernameInput(formData.username)
    if (!normalized) {
      setUsernameStatus({ status: 'idle' })
      return
    }
    const handle = setTimeout(() => {
      void checkUsernameAvailability(normalized)
    }, 500)
    return () => clearTimeout(handle)
  }, [formData.username])

  const validateStepOne = async () => {
    if (!formData.firstName || !formData.lastName) {
      toast.error('First and last name are required')
      return false
    }
    if (!formData.email || !formData.password) {
      toast.error('Email and password are required')
      return false
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailPattern.test(formData.email)) {
      toast.error('Enter a valid email address')
      return false
    }
    if (emailStatus.status === 'invalid') {
      toast.error('Enter a valid email address')
      return false
    }
    if (emailStatus.status === 'taken') {
      toast.error('Email already exists')
      return false
    }
    if (emailStatus.status === 'idle') {
      const ok = await checkEmailAvailability(formData.email)
      if (!ok) {
        toast.error('Email already exists')
        return false
      }
    }
    if (emailStatus.status === 'checking') {
      const ok = await checkEmailAvailability(formData.email)
      if (!ok) {
        toast.error('Email already exists')
        return false
      }
    }
    if (passwordMismatch) {
      toast.error('Passwords do not match')
      return false
    }
    if (!formData.countryOfResidence) {
      toast.error('Country of residence is required')
      return false
    }
    return true
  }

  const validateStepTwo = () => {
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

  const validateStepThree = () => {
    if (!formData.username) {
      toast.error('Username is required')
      return false
    }
    if (usernameStatus.status === 'idle' || usernameStatus.status === 'checking') {
      void checkUsernameAvailability(normalizeUsernameInput(formData.username))
      toast.error('Checking username availability')
      return false
    }
    if (usernameStatus.status === 'taken') {
      toast.error('Username is already taken')
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
          phoneCountryCode: '+1',
          phoneNumber: '0000000000',
          educationLevel: 'Bachelor',
          hasTeachingCertificate: false,
          tutoringExperienceRange: '0-2',
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

  // Updated steps - removed Credentials (step 2) and Certifications (step 3)
  const steps = [
    { number: 1, title: 'Account' },
    { number: 2, title: 'Tutoring' },
    { number: 3, title: 'Profile' },
    { number: 4, title: 'Review' },
    { number: 5, title: 'Terms' },
  ]

  return (
    <div className="min-h-screen bg-white py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/register" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Registration
        </Link>

        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-[#F17623]/10 rounded-full flex items-center justify-center mb-4">
            <GraduationCap className="h-8 w-8 text-[#F17623]" />
          </div>
          <h1 className="text-3xl font-bold text-[#1F2933]">Become a Solocorn Tutor</h1>
          <p className="text-gray-600 mt-2">Complete your application to start tutoring on the platform</p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          {steps.map((s) => (
            <div key={s.number} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${step >= s.number ? 'bg-[#F17623] text-white' : 'bg-gray-200 text-gray-500'}`}>
                {s.number}
              </div>
              <span className={`text-sm ${step >= s.number ? 'text-[#F17623]' : 'text-gray-400'}`}>{s.title}</span>
            </div>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>
              {step === 1 && 'Become a Solocorn Tutor'}
              {step === 2 && 'Tutoring'}
              {step === 3 && 'Profile'}
              {step === 4 && 'Review'}
              {step === 5 && 'Terms and Agreements'}
            </CardTitle>
            <CardDescription>
              {step === 1 && 'Tell us who you are'}
              {step === 2 && 'Select the exams, subjects, and countries you tutor'}
              {step === 3 && 'Complete your profile information'}
              {step === 4 && 'Review your application before registering'}
              {step === 5 && 'Accept the terms to finalize your application'}
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
                  {emailStatus.status === 'checking' && <p className="text-xs text-gray-500">Checking availability...</p>}
                  {emailStatus.status === 'available' && <p className="text-xs text-green-600">{emailStatus.message}</p>}
                  {emailStatus.status === 'taken' && <p className="text-xs text-red-600">{emailStatus.message}</p>}
                  {emailStatus.status === 'invalid' && <p className="text-xs text-red-600">{emailStatus.message}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Password</Label>
                    <div className="relative">
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        placeholder="Create a password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Confirm Password</Label>
                    <div className="relative">
                      <Input
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        placeholder="Confirm your password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    {passwordMismatch && <p className="text-xs text-red-500">Passwords do not match.</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Country of Residence</Label>
                  <Select
                    value={formData.countryOfResidence}
                    onValueChange={(value) => {
                      setFormData((prev) => ({
                        ...prev,
                        countryOfResidence: value,
                      }))
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      {ALL_COUNTRIES.map((country) => (
                        <SelectItem key={country.code} value={country.name}>
                          {country.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex gap-3">
                  <Button
                    className="flex-1 bg-[#F17623] hover:bg-[#e06613]"
                    onClick={async () => {
                      if (await validateStepOne()) setStep(2)
                    }}
                  >
                    Next
                  </Button>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div className="space-y-4">
                  <Label>Categories (aggregated for search)</Label>
                  <div className="flex flex-wrap gap-2">
                    {categorySelections.length === 0 && (
                      <p className="text-sm text-gray-500">No categories selected yet.</p>
                    )}
                    {categorySelections.map((category) => (
                      <span key={category} className="px-3 py-1 text-xs bg-[#4FD1C5]/20 text-[#1F2933] rounded-full">
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
                  <Label>Which regions or continents do you want to offer tutoring in?</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-between">
                        {selectedRegions.length ? selectedRegions.join(', ') : 'Select regions'}
                        <ChevronDown className="h-4 w-4 text-gray-500" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80 max-h-72 overflow-y-auto">
                      <div className="space-y-2">
                        {REGION_OPTIONS.map((region) => (
                          <label key={region} className="flex items-center gap-2 text-sm">
                            <Checkbox
                              checked={selectedRegions.includes(region)}
                              onCheckedChange={() => toggleRegion(region)}
                            />
                            {region}
                          </label>
                        ))}
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-3">
                  <Label>Which countries do you want to offer your tutoring to?</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-between">
                        {formData.tutoringCountries.length
                          ? `${formData.tutoringCountries.length} selected`
                          : 'Select countries'}
                        <ChevronDown className="h-4 w-4 text-gray-500" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-96 max-h-72 overflow-y-auto">
                      <div className="space-y-2">
                        {availableCountries.map((country) => (
                          <label key={country.code} className="flex items-center gap-2 text-sm">
                            <Checkbox
                              checked={formData.tutoringCountries.includes(country.name)}
                              onCheckedChange={() => toggleCountry(country.name)}
                            />
                            {country.name}
                          </label>
                        ))}
                      </div>
                    </PopoverContent>
                  </Popover>
                  {selectedRegions.length > 0 && !selectedRegions.includes('Worldwide') && availableCountries.length === 0 && (
                    <p className="text-xs text-gray-500">No countries mapped for those regions yet. Try adding "Other" or "Worldwide".</p>
                  )}
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1" onClick={() => setStep(1)}>
                    Back
                  </Button>
                  <Button className="flex-1 bg-[#F17623] hover:bg-[#e06613]" onClick={() => validateStepTwo() && setStep(3)}>
                    Next
                  </Button>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <div className="space-y-2">
                  <Label>Solocorn Username</Label>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2 border rounded-md px-3 py-2 bg-white w-full">
                      <span className="text-gray-500">@</span>
                      <Input
                        className="border-0 p-0 h-auto focus-visible:ring-0 focus-visible:ring-offset-0"
                        value={formData.username}
                        onChange={(e) => {
                          setFormData({ ...formData, username: normalizeUsernameInput(e.target.value) })
                          setUsernameTouched(true)
                          setUsernameStatus({ status: 'idle' })
                        }}
                        placeholder="your_username"
                      />
                    </div>
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
                        <button className="text-[#1D4ED8] underline" type="button" onClick={applySuggestion}>
                          Use {usernameStatus.suggestion}
                        </button>
                      )}
                    </div>
                  )}
                  <p className="text-xs text-gray-500">Only letters, numbers, and underscores allowed</p>
                </div>

                <div className="space-y-2">
                  <Label>Your Photo</Label>
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
                    placeholder="Enter your full legal name"
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
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1" onClick={() => setStep(2)}>
                    Back
                  </Button>
                  <Button className="flex-1 bg-[#F17623] hover:bg-[#e06613]" onClick={() => validateStepThree() && setStep(4)}>
                    Next
                  </Button>
                </div>
              </>
            )}

            {step === 4 && (
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
                  <Button variant="outline" className="flex-1" onClick={() => setStep(3)}>
                    Back
                  </Button>
                  <Button className="flex-1 bg-[#F17623] hover:bg-[#e06613]" onClick={() => setStep(5)}>
                    Register
                  </Button>
                </div>
              </>
            )}

            {step === 5 && (
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
                  <Button variant="outline" className="flex-1" onClick={() => setStep(4)}>
                    Back
                  </Button>
                  <Button className="flex-1 bg-[#F17623] hover:bg-[#e06613]" onClick={handleSubmit} disabled={isLoading || !formData.agreeToTerms}>
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
