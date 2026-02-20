/**
 * Registration Page
 * New users can create an account
 * 
 * URL: /register
 */

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AlertCircle, Loader2 } from 'lucide-react'

type UserRole = 'STUDENT' | 'TUTOR'

export default function RegisterPage() {
  const router = useRouter()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    tosAccepted: false
  })
  const [role, setRole] = useState<UserRole>('STUDENT')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters')
      return
    }

    const hasUppercase = /[A-Z]/.test(formData.password)
    const hasLowercase = /[a-z]/.test(formData.password)
    const hasNumber = /\d/.test(formData.password)

    if (!hasUppercase || !hasLowercase || !hasNumber) {
      setError('Password must contain at least one uppercase letter, one lowercase letter, and one number')
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          email: formData.email,
          password: formData.password,
          role,
          tosAccepted: true
        })
      })

      // Check if response is HTML (usually an error page)
      const contentType = response.headers.get('content-type')
      if (contentType && contentType.includes('text/html')) {
        setError('Server error. Please try again later.')
        return
      }

      let data: { error?: string; message?: string } = {}
      try {
        const text = await response.text()
        data = (text ? JSON.parse(text) : {}) as { error?: string; message?: string }
      } catch (e) {
        console.error('Failed to parse response:', e)
        data = {}
      }

      if (!response.ok) {
        console.error('Registration failed:', data, 'Status:', response.status)
        // Handle empty or invalid response
        let errorMessage = data.error ?? data.message
        if (!errorMessage) {
          if (response.status === 400) {
            errorMessage = 'Invalid registration data. Please check your input.'
          } else if (response.status === 409) {
            errorMessage = 'Email already registered. Please use a different email or log in.'
          } else {
            errorMessage = `Registration failed (Error ${response.status})`
          }
        }
        setError(errorMessage)
        return
      }

      // Auto-login after registration
      console.log('Attempting auto-login...')
      const result = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false
      })

      console.log('Sign in result:', result)

      if (result?.ok) {
        // Wait for session to be established
        await new Promise(resolve => setTimeout(resolve, 1000))

        // Redirect to dashboard based on role
        if (role === 'TUTOR') {
          router.push('/tutor/dashboard')
        } else {
          router.push('/student/onboarding')
        }
        router.refresh()
      } else {
        console.error('Auto-login failed:', result?.error)
        // Fallback to login page
        router.push('/login?registered=true')
      }
    } catch {
      setError('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-4 safe-top safe-bottom">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Sign Up for TutorMe</CardTitle>
          <CardDescription>
            Create an account to start your learning journey
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              {error}
            </div>
          )}

          {/* Role Selection */}
          <div className="mb-6">
            <Label className="mb-2 block">I am a...</Label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setRole('STUDENT')}
                className={`p-3 rounded-lg border text-center transition-colors ${role === 'STUDENT'
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-gray-300'
                  }`}
              >
                <div className="text-2xl mb-1">Student</div>
                <div className="text-sm font-medium">I want to learn</div>
              </button>
              <button
                type="button"
                onClick={() => setRole('TUTOR')}
                className={`p-3 rounded-lg border text-center transition-colors ${role === 'TUTOR'
                  ? 'border-green-500 bg-green-50 text-green-700'
                  : 'border-gray-200 hover:border-gray-300'
                  }`}
              >
                <div className="text-2xl mb-1">Tutor</div>
                <div className="text-sm font-medium">I want to teach</div>
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="At least 6 characters"
                value={formData.password}
                onChange={handleChange}
                required
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Re-enter your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                disabled={isLoading}
              />
            </div>

            <div className="flex items-start space-x-2 pt-2">
              <Input
                type="checkbox"
                id="tos"
                name="tosAccepted"
                checked={formData.tosAccepted}
                onChange={(e) => setFormData({ ...formData, tosAccepted: e.target.checked })}
                className="mt-1 w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="tos" className="text-sm text-gray-600 leading-tight">
                I agree to the <Link href="/legal/terms" className="text-blue-600 hover:underline">Terms of Service</Link>, <Link href="/legal/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>, and <Link href="/legal/code-of-conduct" className="text-blue-600 hover:underline">Code of Conduct</Link>.
              </label>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                'Create Account'
              )}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-gray-600">Already have an account?</span>{' '}
            <Link
              href="/login"
              className="text-blue-600 hover:underline"
            >
              Log in
            </Link>
          </div>

          <div className="mt-4 pt-4 border-t text-center">
            <Link
              href="/"
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              ← Back to home
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
