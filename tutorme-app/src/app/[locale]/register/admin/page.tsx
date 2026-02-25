'use client'

import { useState, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardTitle, CardDescription } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { toast } from 'sonner'
import {
  ArrowLeft,
  Shield,
  Building2,
  Lock,
  User,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react'
import {
  adminRegistrationSchema,
  type AdminPermissionGroup,
} from '@/lib/validation/user-registration'

const PERMISSION_GROUPS: { id: AdminPermissionGroup; label: string; desc: string }[] = [
  {
    id: 'user_management',
    label: 'User Management',
    desc: 'Create, edit, and manage user accounts',
  },
  {
    id: 'content_management',
    label: 'Content Management',
    desc: 'Manage courses, lessons, and materials',
  },
  {
    id: 'financial_access',
    label: 'Financial Access',
    desc: 'View and manage financial data',
  },
  {
    id: 'system_settings',
    label: 'System Settings',
    desc: 'Configure platform settings',
  },
  {
    id: 'analytics',
    label: 'Analytics',
    desc: 'Access reports and analytics',
  },
]

const STEPS = [
  { number: 1, title: 'Personal Info', icon: User },
  { number: 2, title: 'Organization', icon: Building2 },
  { number: 3, title: 'Security & Permissions', icon: Lock },
]

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

export default function AdminRegistrationPage() {
  const router = useRouter()
  const params = useParams<{ locale?: string }>()
  const localePrefix = params?.locale ? `/${params.locale}` : ''
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState(1)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    organizationName: '',
    organizationSlug: '',
    adminLevel: 'standard' as 'super' | 'standard' | 'limited',
    jobTitle: '',
    department: '',
    permissions: [] as AdminPermissionGroup[],
    mfaEnabled: true,
    tosAccepted: false,
    bootstrapKey: '',
  })

  const updateField = useCallback(<K extends keyof typeof formData>(
    key: K,
    value: typeof formData[K]
  ) => {
    setFormData((prev) => {
      const next = { ...prev, [key]: value }
      if (key === 'organizationName' && !prev.organizationSlug) {
        next.organizationSlug = slugify(value as string)
      }
      return next
    })
    if (errors[key]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[key]
        return next
      })
    }
  }, [errors])

  const validateStep = useCallback(
    (s: number): boolean => {
      const newErrors: Record<string, string> = {}

      if (s === 1) {
        if (!formData.firstName?.trim()) newErrors.firstName = 'First name is required'
        if (!formData.lastName?.trim()) newErrors.lastName = 'Last name is required'
        if (!formData.email?.trim()) newErrors.email = 'Email is required'
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
          newErrors.email = 'Please enter a valid email'
        if (!formData.phoneNumber?.trim()) newErrors.phoneNumber = 'Phone number is required'
        else if (!/^\+?[\d\s\-\(\)]{10,}$/.test(formData.phoneNumber))
          newErrors.phoneNumber = 'Valid phone number required'
      }

      if (s === 2) {
        if (!formData.organizationName?.trim())
          newErrors.organizationName = 'Organization name is required'
        else if (formData.organizationName.length < 2)
          newErrors.organizationName = 'Organization name must be at least 2 characters'
      }

      if (s === 3) {
        if (!formData.password)
          newErrors.password = 'Password is required'
        else if (formData.password.length < 8)
          newErrors.password = 'Password must be at least 8 characters'
        else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password))
          newErrors.password =
            'Password must contain uppercase, lowercase, and number'
        if (formData.password !== formData.confirmPassword)
          newErrors.confirmPassword = "Passwords don't match"
        if (formData.permissions.length === 0)
          newErrors.permissions = 'Select at least one permission group'
        if (!formData.tosAccepted)
          newErrors.tosAccepted = 'You must accept the Terms of Service'
      }

      setErrors(newErrors)
      if (Object.keys(newErrors).length > 0) {
        toast.error(Object.values(newErrors)[0])
        return false
      }
      return true
    },
    [formData]
  )

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((s) => Math.min(s + 1, 3))
    }
  }

  const handleBack = () => {
    setStep((s) => Math.max(s - 1, 1))
    setErrors({})
  }

  const handleSubmit = async () => {
    const payload = {
      ...formData,
      organizationSlug: formData.organizationSlug || undefined,
    }
    const result = adminRegistrationSchema.safeParse(payload)
    if (!result.success) {
      const newErrors: Record<string, string> = {}
      result.error.issues.forEach((issue) => {
        const path = issue.path[0] as string
        if (!newErrors[path]) newErrors[path] = issue.message
      })
      setErrors(newErrors)
      toast.error(Object.values(newErrors)[0] || 'Please check your form')
      return
    }

    setIsLoading(true)
    setErrors({})
    try {
      const headers: Record<string, string> = { 'Content-Type': 'application/json' }
      // Include bootstrap key if provided (required when ADMIN_BOOTSTRAP_KEY env var is set)
      if (formData.bootstrapKey.trim()) {
        headers['x-admin-bootstrap-key'] = formData.bootstrapKey.trim()
      }
      
      const response = await fetch('/api/auth/register/admin', {
        method: 'POST',
        headers,
        body: JSON.stringify(result.data),
      })

      const data = await response.json()

      if (response.ok) {
        toast.success('Admin account created successfully!')
        router.push(`${localePrefix}/admin/login`)
      } else {
        toast.error(data.error || 'Failed to create account')
      }
    } catch {
      toast.error('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const togglePermission = (id: AdminPermissionGroup) => {
    setFormData((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(id)
        ? prev.permissions.filter((p) => p !== id)
        : [...prev.permissions, id],
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-orange-950/20 to-slate-900 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <Link
          href="/register"
          className="inline-flex items-center text-sm text-slate-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Registration
        </Link>

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center">
              <Shield className="h-6 w-6 text-orange-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Administrator Registration</h1>
              <p className="text-slate-400 text-sm">
                Enterprise-grade admin account setup
              </p>
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-2 mb-8">
          {STEPS.map((s, idx) => (
            <div key={s.number} className="flex items-center flex-1">
              <div
                className={`
                  flex items-center justify-center w-9 h-9 rounded-lg text-sm font-medium transition-colors
                  ${step >= s.number ? 'bg-orange-500 text-white' : 'bg-slate-800 text-slate-500'}
                `}
              >
                <s.icon className="h-4 w-4" />
              </div>
              <span
                className={`ml-2 text-sm font-medium hidden sm:inline ${
                  step >= s.number ? 'text-orange-400' : 'text-slate-500'
                }`}
              >
                {s.title}
              </span>
              {idx < STEPS.length - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-2 rounded ${
                    step > s.number ? 'bg-orange-500' : 'bg-slate-700'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <Card className="border-slate-800 bg-slate-900/50">
          <CardContent className="pt-6 space-y-6">
            {/* Step 1: Personal Info */}
            {step === 1 && (
              <>
                <div>
                  <CardTitle className="text-lg text-white mb-1">Personal Information</CardTitle>
                  <CardDescription className="text-slate-400">
                    Enter your account details
                  </CardDescription>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-slate-300">
                      First Name *
                    </Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => updateField('firstName', e.target.value)}
                      placeholder="John"
                      className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
                    />
                    {errors.firstName && (
                      <p className="text-sm text-red-400">{errors.firstName}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-slate-300">
                      Last Name *
                    </Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => updateField('lastName', e.target.value)}
                      placeholder="Doe"
                      className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
                    />
                    {errors.lastName && (
                      <p className="text-sm text-red-400">{errors.lastName}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-slate-300">
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    placeholder="admin@organization.com"
                    className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
                  />
                  {errors.email && (
                    <p className="text-sm text-red-400">{errors.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phoneNumber" className="text-slate-300">
                    Phone Number *
                  </Label>
                  <Input
                    id="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={(e) => updateField('phoneNumber', e.target.value)}
                    placeholder="+86 138 0000 0000"
                    className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
                  />
                  {errors.phoneNumber && (
                    <p className="text-sm text-red-400">{errors.phoneNumber}</p>
                  )}
                </div>

                <Button className="w-full bg-orange-500 hover:bg-orange-600" onClick={handleNext}>
                  Next: Organization
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </>
            )}

            {/* Step 2: Organization */}
            {step === 2 && (
              <>
                <div>
                  <CardTitle className="text-lg text-white mb-1">Organization Setup</CardTitle>
                  <CardDescription className="text-slate-400">
                    Configure your organization and role
                  </CardDescription>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="organizationName" className="text-slate-300">
                    Organization Name *
                  </Label>
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-slate-500" />
                    <Input
                      id="organizationName"
                      value={formData.organizationName}
                      onChange={(e) => updateField('organizationName', e.target.value)}
                      placeholder="Acme Education Inc."
                      className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
                    />
                  </div>
                  {errors.organizationName && (
                    <p className="text-sm text-red-400">{errors.organizationName}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="organizationSlug" className="text-slate-300">
                    Organization Slug (optional)
                  </Label>
                  <Input
                    id="organizationSlug"
                    value={formData.organizationSlug}
                    onChange={(e) => updateField('organizationSlug', e.target.value)}
                    placeholder="acme-education"
                    className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 font-mono text-sm"
                  />
                  <p className="text-xs text-slate-500">
                    Lowercase letters, numbers, hyphens only. Auto-generated from name if empty.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label className="text-slate-300">Admin Level</Label>
                  <Select
                    value={formData.adminLevel}
                    onValueChange={(v) =>
                      updateField('adminLevel', v as 'super' | 'standard' | 'limited')
                    }
                  >
                    <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="super">Super Admin</SelectItem>
                      <SelectItem value="standard">Standard Admin</SelectItem>
                      <SelectItem value="limited">Limited Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="jobTitle" className="text-slate-300">
                      Job Title
                    </Label>
                    <Input
                      id="jobTitle"
                      value={formData.jobTitle}
                      onChange={(e) => updateField('jobTitle', e.target.value)}
                      placeholder="Platform Admin"
                      className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department" className="text-slate-300">
                      Department
                    </Label>
                    <Input
                      id="department"
                      value={formData.department}
                      onChange={(e) => updateField('department', e.target.value)}
                      placeholder="Operations"
                      className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="flex-1 border-slate-700 text-slate-300 hover:bg-slate-800"
                    onClick={handleBack}
                  >
                    <ChevronLeft className="h-4 w-4 mr-2" />
                    Back
                  </Button>
                  <Button
                    className="flex-1 bg-orange-500 hover:bg-orange-600"
                    onClick={handleNext}
                  >
                    Next: Security & Permissions
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </>
            )}

            {/* Step 3: Security & Permissions */}
            {step === 3 && (
              <>
                <div>
                  <CardTitle className="text-lg text-white mb-1">Security & Permissions</CardTitle>
                  <CardDescription className="text-slate-400">
                    Set password and permission groups
                  </CardDescription>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-slate-300">
                    Password *
                  </Label>
                  <div className="flex items-center gap-2">
                    <Lock className="h-4 w-4 text-slate-500" />
                    <Input
                      id="password"
                      type="password"
                      value={formData.password}
                      onChange={(e) => updateField('password', e.target.value)}
                      placeholder="••••••••"
                      className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
                    />
                  </div>
                  <p className="text-xs text-slate-500">
                    Min 8 chars, at least one uppercase, one lowercase, one number.
                  </p>
                  {errors.password && (
                    <p className="text-sm text-red-400">{errors.password}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-slate-300">
                    Confirm Password *
                  </Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => updateField('confirmPassword', e.target.value)}
                    placeholder="••••••••"
                    className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
                  />
                  {errors.confirmPassword && (
                    <p className="text-sm text-red-400">{errors.confirmPassword}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bootstrapKey" className="text-slate-300">
                    Bootstrap Key (if required)
                  </Label>
                  <Input
                    id="bootstrapKey"
                    type="password"
                    value={formData.bootstrapKey}
                    onChange={(e) => updateField('bootstrapKey', e.target.value)}
                    placeholder="Enter bootstrap key if configured"
                    className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
                  />
                  <p className="text-xs text-slate-500">
                    Required only if ADMIN_BOOTSTRAP_KEY environment variable is set on the server.
                  </p>
                </div>

                <div className="space-y-4">
                  <Label className="text-slate-300">Permission Groups *</Label>
                  <p className="text-sm text-slate-500">
                    Select at least one permission group for your admin role.
                  </p>
                  <div className="space-y-3">
                    {PERMISSION_GROUPS.map((group) => (
                      <div
                        key={group.id}
                        className="flex items-start space-x-3 p-3 rounded-lg bg-slate-800/50 border border-slate-700"
                      >
                        <Checkbox
                          id={group.id}
                          checked={formData.permissions.includes(group.id)}
                          onCheckedChange={() => togglePermission(group.id)}
                          className="border-slate-600 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                        />
                        <div className="space-y-1 flex-1">
                          <Label
                            htmlFor={group.id}
                            className="font-medium text-slate-200 cursor-pointer"
                          >
                            {group.label}
                          </Label>
                          <p className="text-sm text-slate-500">{group.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  {errors.permissions && (
                    <p className="text-sm text-red-400">{errors.permissions}</p>
                  )}
                </div>

                <div className="flex items-start space-x-3 p-3 rounded-lg bg-slate-800/50 border border-slate-700">
                  <Checkbox
                    id="mfa"
                    checked={formData.mfaEnabled}
                    onCheckedChange={(checked) =>
                      updateField('mfaEnabled', checked === true)
                    }
                    className="border-slate-600 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                  />
                  <div className="space-y-1">
                    <Label htmlFor="mfa" className="font-medium text-slate-200 cursor-pointer">
                      Enable Two-Factor Authentication
                    </Label>
                    <p className="text-sm text-slate-500">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3 rounded-lg border border-slate-700">
                  <Checkbox
                    id="terms"
                    checked={formData.tosAccepted}
                    onCheckedChange={(checked) =>
                      updateField('tosAccepted', checked === true)
                    }
                    className="border-slate-600 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                  />
                  <Label htmlFor="terms" className="text-sm text-slate-300 cursor-pointer">
                    I agree to the Terms of Service and Privacy Policy *
                  </Label>
                </div>
                {errors.tosAccepted && (
                  <p className="text-sm text-red-400">{errors.tosAccepted}</p>
                )}

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="flex-1 border-slate-700 text-slate-300 hover:bg-slate-800"
                    onClick={handleBack}
                    disabled={isLoading}
                  >
                    <ChevronLeft className="h-4 w-4 mr-2" />
                    Back
                  </Button>
                  <Button
                    className="flex-1 bg-orange-500 hover:bg-orange-600"
                    onClick={handleSubmit}
                    disabled={isLoading || !formData.tosAccepted || formData.permissions.length === 0}
                  >
                    {isLoading ? 'Creating Account...' : 'Create Admin Account'}
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        <p className="text-center text-slate-500 text-sm mt-6">
          Already have an account?{' '}
          <Link href="/login" className="text-orange-400 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
