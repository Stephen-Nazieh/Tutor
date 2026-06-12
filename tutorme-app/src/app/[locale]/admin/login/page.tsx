'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Shield, Loader2, AlertCircle } from 'lucide-react'

export default function AdminLoginPage() {
  const router = useRouter()
  const params = useParams<{ locale?: string }>()
  const localePrefix = params?.locale ? `/${params.locale}` : ''
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const res = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      })

      const data = await res.json().catch(() => ({}))

      if (!res.ok) throw new Error((data as { error?: string }).error || 'Login failed')

      router.push(`${localePrefix}/admin`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="from-background via-background to-muted flex min-h-screen items-center justify-center bg-gradient-to-br p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="bg-primary shadow-primary/25 flex h-10 w-10 items-center justify-center rounded-xl shadow-lg">
              <Shield className="text-primary-foreground h-6 w-6" />
            </div>
            <span
              className="text-foreground text-xl font-bold"
              style={{ fontFamily: "'Fira Code', monospace" }}
            >
              Solocorn Admin
            </span>
          </Link>
        </div>

        <Card
          className="border-border/30 shadow-elevation-3 overflow-hidden rounded-3xl"
          style={{
            background:
              'linear-gradient(145deg, hsl(var(--card) / 0.95) 0%, hsl(var(--surface) / 0.92) 100%)',
          }}
        >
          <CardHeader className="space-y-1 pb-4">
            <CardTitle
              className="text-foreground text-2xl font-bold"
              style={{ fontFamily: "'Fira Code', monospace" }}
            >
              Sign in
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Enter your admin email to access the admin panel
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert
                variant="destructive"
                className="border-destructive/20 bg-destructive/10 text-destructive mb-4 rounded-xl"
              >
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-muted-foreground">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@tutorme.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                  className="border-border/50 bg-input/60 placeholder:text-muted-foreground/60 focus-visible:border-primary focus-visible:ring-primary/25 h-12 rounded-xl px-5 text-base transition-all duration-200 focus-visible:ring-2"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-muted-foreground">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter admin password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  className="border-border/50 bg-input/60 placeholder:text-muted-foreground/60 focus-visible:border-primary focus-visible:ring-primary/25 h-12 rounded-xl px-5 text-base transition-all duration-200 focus-visible:ring-2"
                />
              </div>

              <Button
                type="submit"
                className="bg-primary text-primary-foreground shadow-primary/20 hover:shadow-primary/30 h-12 w-full rounded-xl text-base font-semibold shadow-lg transition-all duration-200 hover:shadow-xl hover:brightness-110 active:scale-[0.98]"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  'Sign in'
                )}
              </Button>
            </form>

            <div className="text-muted-foreground/60 mt-4 text-center text-xs">
              <p>Protected by IP whitelist and audit logging</p>
              <p className="mt-1">Unauthorized access is strictly prohibited</p>
            </div>
          </CardContent>
        </Card>

        <p className="text-muted-foreground/60 mt-4 text-center text-sm">
          <Link href="/" className="hover:text-muted-foreground transition-colors duration-200">
            ← Back to main site
          </Link>
        </p>
      </div>
    </div>
  )
}
