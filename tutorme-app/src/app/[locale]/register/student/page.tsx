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
import { toast } from 'sonner'
import {
  ArrowLeft,
  BookOpen,
  Eye,
  EyeOff,
} from 'lucide-react'
import { GLOBAL_EXAM_CATEGORIES, REGIONS } from '@/lib/tutoring/categories-new'

export default function StudentRegistrationPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    age: '',
    region: '',
    country: '',
    tutorPreference: '',
    isSixteen: false,
    tosAccepted: false,
  })

  const selectedRegion = useMemo(
    () => REGIONS.find((region) => region.id === formData.region),
    [formData.region]
  )
  const countryOptions = useMemo(
    () => (selectedRegion ? selectedRegion.countries : []),
    [selectedRegion]
  )
  const selectedCountry = useMemo(
    () => countryOptions.find((country) => country.code === formData.country),
    [countryOptions, formData.country]
  )
  const sortedTutorCategories = useMemo(() => {
    const countrySpecific = (selectedCountry?.nationalExams || []).map((category) => category.label)
    const globalCategories = GLOBAL_EXAM_CATEGORIES.map((category) => category.label)
    const combined = [...countrySpecific, ...globalCategories]
    return Array.from(new Set(combined))
  }, [selectedCountry])

  const goNext = () => setStep((prev) => Math.min(4, prev + 1))
  const goBack = () => setStep((prev) => Math.max(1, prev - 1))

  const validateStep = () => {
    if (step === 1) {
      const fullName = `${formData.firstName} ${formData.lastName}`.trim()
      if (fullName.length < 2) {
        toast.error('Please enter your first and last name')
        return false
      }
      if (!formData.email) {
        toast.error('Please enter your email address')
        return false
      }
    }
    if (step === 2) {
      if (!formData.password || !formData.confirmPassword) {
        toast.error('Please enter and confirm your password')
        return false
      }
      if (formData.password !== formData.confirmPassword) {
        toast.error('Passwords do not match')
        return false
      }
    }
    if (step === 3) {
      if (!formData.age) {
        toast.error('Please enter your age')
        return false
      }
      if (!formData.region || !formData.country) {
        toast.error('Please select your region and country')
        return false
      }
      if (!formData.isSixteen) {
        toast.error('Please confirm if you are 16 years of age or older')
        return false
      }
    }
    return true
  }

  const handleNext = () => {
    if (!validateStep()) return
    goNext()
  }

  const handleSubmit = async () => {
    if (!validateStep()) return

    if (!formData.isSixteen) {
      toast.error('You must be 16 years of age or older to create an account')
      return
    }

    if (!formData.tosAccepted) {
      toast.error('You must accept the Terms of Service')
      return
    }

    const fullName = `${formData.firstName} ${formData.lastName}`.trim()
    setIsLoading(true)
    try {
      const response = await fetch('/api/auth/register/student', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          name: fullName,
          tosAccepted: true,
          profileData: {
            age: Number(formData.age),
            region: selectedRegion?.name || formData.region,
            country: selectedCountry?.name || formData.country,
            tutorPreference: formData.tutorPreference || undefined,
            isSixteen: formData.isSixteen,
          },
        }),
      })

      const data = await response.json()

      if (response.ok) {
        toast.success('Student account created successfully!')
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

  return (
    <div className="min-h-screen bg-white py-8 px-4">
      <div className="max-w-lg mx-auto">
        <Link
          href="/register"
          className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Registration
        </Link>

        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-[#4FD1C5]/20 rounded-full flex items-center justify-center mb-4">
            <BookOpen className="h-8 w-8 text-[#4FD1C5]" />
          </div>
          <h1 className="text-3xl font-bold text-[#1F2933]">Student Registration</h1>
          <p className="text-gray-600 mt-2">
            Create an account to start learning with AI tutors and live classes
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-[#1F2933]">Create Your Account</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>Step {step} of 4</span>
              <span>
                {step === 1 && 'Account details'}
                {step === 2 && 'Security'}
                {step === 3 && 'Preferences'}
                {step === 4 && 'Terms & Confirm'}
              </span>
            </div>

            {step === 1 && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      autoComplete="given-name"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      placeholder="John"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      autoComplete="family-name"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="student@example.com"
                  />
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        name="new-password"
                        autoComplete="new-password"
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        placeholder="Create password"
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
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        name="confirm-new-password"
                        autoComplete="new-password"
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        placeholder="Confirm password"
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
                  </div>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      type="number"
                      min={5}
                      max={100}
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                      placeholder="Enter age"
                    />
                  </div>
                  <div className="space-y-2">
                  <Label htmlFor="region">Region</Label>
                  <Select
                    value={formData.region}
                    onValueChange={(value) => setFormData({ ...formData, region: value, country: '' })}
                  >
                    <SelectTrigger id="region">
                      <SelectValue placeholder="Select region" />
                    </SelectTrigger>
                    <SelectContent>
                      {REGIONS.map((region) => (
                        <SelectItem key={region.id} value={region.id}>
                          {region.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Select
                    value={formData.country}
                    onValueChange={(value) => setFormData({ ...formData, country: value })}
                    disabled={!formData.region}
                  >
                    <SelectTrigger id="country">
                      <SelectValue placeholder={formData.region ? 'Select country' : 'Select region first'} />
                    </SelectTrigger>
                    <SelectContent>
                      {countryOptions.map((country) => (
                        <SelectItem key={country.code} value={country.code}>
                          {country.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tutorPreference">What kind of tutor are you looking for? (Optional)</Label>
                  <Select
                    value={formData.tutorPreference}
                    onValueChange={(value) => setFormData({ ...formData, tutorPreference: value })}
                  >
                    <SelectTrigger id="tutorPreference">
                      <SelectValue placeholder="Select tutor category" />
                    </SelectTrigger>
                    <SelectContent>
                      {sortedTutorCategories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-gray-500">
                    Categories are prioritized based on your region and country.
                  </p>
                </div>

                <div className="flex items-start space-x-3 rounded-lg border p-4">
                  <Checkbox
                    id="isSixteen"
                    checked={formData.isSixteen}
                    onCheckedChange={(checked) =>
                      setFormData((prev) => ({ ...prev, isSixteen: checked === true }))
                    }
                  />
                  <div className="space-y-1">
                    <Label htmlFor="isSixteen" className="font-medium cursor-pointer">
                      Are you 16 years of age or older?
                    </Label>
                  </div>
                </div>
              </>
            )}

            {step === 4 && (
              <>
                <div className="rounded-lg border p-4 bg-slate-50">
                  <h3 className="text-sm font-semibold text-slate-800">Agree to Terms of Service</h3>
                  <p className="text-sm text-slate-600 mt-2">
                    Please review and agree to the Terms of Service and Privacy Policy to complete your registration.
                  </p>
                </div>
                <div className="flex items-start space-x-3 rounded-lg border p-4">
                  <Checkbox
                    id="tosAccepted"
                    checked={formData.tosAccepted}
                    onCheckedChange={(checked) =>
                      setFormData((prev) => ({ ...prev, tosAccepted: checked === true }))
                    }
                  />
                  <div className="space-y-1">
                    <Label htmlFor="tosAccepted" className="font-medium cursor-pointer">
                      I accept the Terms of Service and Privacy Policy
                    </Label>
                    <p className="text-sm text-gray-500">
                      You must accept the terms to create an account.
                    </p>
                  </div>
                </div>
              </>
            )}

            <div className="flex items-center justify-between gap-3">
              <Button variant="outline" onClick={goBack} disabled={step === 1 || isLoading}>
                Back
              </Button>
              {step < 4 ? (
                <Button className="bg-[#4FD1C5] hover:bg-[#3bc4b2]" onClick={handleNext} disabled={isLoading}>
                  Continue
                </Button>
              ) : (
                <Button
                  className="bg-[#4FD1C5] hover:bg-[#3bc4b2]"
                  onClick={handleSubmit}
                  disabled={isLoading}
                >
                  {isLoading ? 'Creating Account...' : 'Confirm & Create Account'}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{' '}
          <Link href="/login" className="text-[#1D4ED8] hover:underline font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
