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
import {
  ArrowLeft,
  BookOpen,
  Copy,
  Check,
} from 'lucide-react'

const gradeLevels = [
  'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6',
  'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12',
  'University',
]

export default function StudentRegistrationPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    gradeLevel: '',
    tosAccepted: false,
  })

  const handleSubmit = async () => {
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    if (!formData.tosAccepted) {
      toast.error('You must accept the Terms of Service')
      return
    }

    const fullName = `${formData.firstName} ${formData.lastName}`.trim()
    if (fullName.length < 2) {
      toast.error('Please enter your first and last name')
      return
    }

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
            gradeLevel: formData.gradeLevel || undefined,
          },
        }),
      })

      const data = await response.json()

      if (response.ok) {
        toast.success('Student account created successfully!')
        if (data.user?.studentUniqueId) {
          toast.info(
            `Save your Student ID for parent linking: ${data.user.studentUniqueId}`,
            { duration: 8000 }
          )
        }
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-lg mx-auto">
        <Link
          href="/register"
          className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Registration
        </Link>

        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <BookOpen className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Student Registration</h1>
          <p className="text-gray-600 mt-2">
            Create an account to start learning with AI tutors and live classes
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Create Your Account</CardTitle>
            <CardDescription>
              You will receive a unique Student ID to share with your parent for account linking
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  placeholder="John"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
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
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="student@example.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="gradeLevel">Grade Level (Optional)</Label>
              <Select
                value={formData.gradeLevel}
                onValueChange={(value) => setFormData({ ...formData, gradeLevel: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select grade" />
                </SelectTrigger>
                <SelectContent>
                  {gradeLevels.map((grade) => (
                    <SelectItem key={grade} value={grade}>
                      {grade}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  placeholder="••••••••"
                />
              </div>
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

            <Button
              className="w-full bg-blue-600 hover:bg-blue-700"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? 'Creating Account...' : 'Create Student Account'}
            </Button>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-600 hover:underline font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
