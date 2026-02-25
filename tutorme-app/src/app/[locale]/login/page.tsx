/**
 * Login Page
 * Users can sign in with email/password
 * 
 * URL: /login
 */

'use client'

import { useState, Suspense } from 'react'
import { signIn, getSession } from 'next-auth/react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AlertCircle, Loader2 } from 'lucide-react'

function LoginForm() {
  const router = useRouter()
  const params = useParams<{ locale?: string }>()
  const localePrefix = params?.locale ? `/${params.locale}` : ''
  const searchParams = useSearchParams()
  const registered = searchParams.get('registered')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false
      })

      if (result?.error) {
        setError('Invalid email or password')
      } else {
        // Get the session to check user role and onboarding status
        const session = await getSession()
        const userRole = session?.user?.role
        if (!userRole) {
          setError('Login succeeded but session could not be established. Please retry.')
          return
        }

        // Redirect based on role
        if (userRole === 'TUTOR') {
          router.push(`${localePrefix}/tutor/dashboard`)
        } else if (userRole === 'PARENT') {
          router.push(`${localePrefix}/parent/dashboard`)
        } else if (userRole === 'ADMIN') {
          router.push(`${localePrefix}/admin/login`)
        } else {
          router.push(`${localePrefix}/student/dashboard`)
        }
        router.refresh()
      }
    } catch {
      setError('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Login to TutorMe</CardTitle>
        <CardDescription>
          Enter your email and password to continue
        </CardDescription>
      </CardHeader>
      <CardContent>
        {registered && (
          <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-lg text-sm">
            Registration successful! Please log in.
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Logging in...
              </>
            ) : (
              'Login'
            )}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm">
          <span className="text-gray-600">Don&apos;t have an account?</span>{' '}
          <Link
            href="/register"
            className="text-blue-600 hover:underline"
          >
            Sign up
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
  )
}

function LoginFormFallback() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Login to TutorMe</CardTitle>
        <CardDescription>
          Enter your email and password to continue
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        </div>
      </CardContent>
    </Card>
  )
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-4 safe-top safe-bottom">
      <Suspense fallback={<LoginFormFallback />}>
        <LoginForm />
      </Suspense>
    </div>
  )
}
