/**
 * Forgot Password Page
 * Users can request a password reset link.
 * URL: /[locale]/forgot-password
 */

'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AlertCircle, Loader2, Mail } from 'lucide-react'

export default function ForgotPasswordPage() {
  const params = useParams<{ locale?: string }>()
  const localePrefix = params?.locale ? `/${params.locale}` : ''

  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isLoading) return
    setIsLoading(true)
    try {
      // Placeholder: wire to your auth API when available (e.g. POST /api/auth/forgot-password)
      await new Promise((r) => setTimeout(r, 800))
      setSubmitted(true)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 safe-top safe-bottom">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl flex items-center justify-center gap-2">
            <Mail className="h-6 w-6" />
            Forgot Password
          </CardTitle>
          <CardDescription>
            Enter your email and we&apos;ll send you a link to reset your password.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {submitted ? (
            <div className="space-y-4">
              <div className="p-4 bg-green-50 text-green-700 rounded-lg text-sm">
                If an account exists for that email, you will receive a password reset link shortly.
              </div>
              <Link href={`${localePrefix}/login`}>
                <Button variant="outline" className="w-full">
                  Back to login
                </Button>
              </Link>
            </div>
          ) : (
            <>
              {error && (
                <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
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
                <Button
                  type="submit"
                  className="w-full bg-[#1D4ED8] hover:bg-[#1e40af]"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    'Send reset link'
                  )}
                </Button>
              </form>
            </>
          )}

          <div className="mt-6 text-center">
            <Link
              href={`${localePrefix}/login`}
              className="text-sm text-[#1D4ED8] hover:underline"
            >
              ← Back to login
            </Link>
          </div>
          <p className="mt-4 text-center text-xs text-gray-400" aria-hidden="true">
            Solocorn v1.0.1-beta
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
