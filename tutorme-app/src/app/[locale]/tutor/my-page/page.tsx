'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import { ArrowLeft, Copy, ExternalLink } from 'lucide-react'
import { DEFAULT_LOCALE } from '@/lib/i18n/config'

export default function TutorMyPage() {
  const params = useParams<{ locale?: string }>()
  const router = useRouter()
  const locale = typeof params?.locale === 'string' ? params.locale : 'en'
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [username, setUsername] = useState('')
  const [bio, setBio] = useState('')

  useEffect(() => {
    let active = true
    const load = async () => {
      setLoading(true)
      try {
        // Load public profile
        const res = await fetch('/api/tutor/public-profile', { credentials: 'include' })
        if (!res.ok) throw new Error('Failed to load public profile')
        const data = await res.json()
        if (!active) return
        setUsername(data?.profile?.username || '')
        setBio(data?.profile?.bio || '')
      } catch (error) {
        toast.error(error instanceof Error ? error.message : 'Failed to load data')
      } finally {
        if (active) setLoading(false)
      }
    }
    load()
    return () => {
      active = false
    }
  }, [])

  const normalizedUsername = useMemo(() => username.trim().replace(/^@+/, ''), [username])
  const publicPath = useMemo(
    () => {
      if (!normalizedUsername) return ''
      const prefix = locale === DEFAULT_LOCALE ? '' : `/${locale}`
      return `${prefix}/u/${normalizedUsername}`
    },
    [locale, normalizedUsername]
  )
  const publicUrl = useMemo(
    () => (typeof window !== 'undefined' && publicPath ? `${window.location.origin}${publicPath}` : publicPath),
    [publicPath]
  )

  const save = async () => {
    setSaving(true)
    try {
      const csrfRes = await fetch('/api/csrf', { credentials: 'include' })
      const csrfData = await csrfRes.json().catch(() => ({}))
      const csrfToken = csrfData?.token ?? null
      const res = await fetch('/api/tutor/public-profile', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...(csrfToken ? { 'X-CSRF-Token': csrfToken } : {}),
        },
        credentials: 'include',
        body: JSON.stringify({ username, bio }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        toast.error(data?.error || 'Failed to save profile')
        return
      }
      setUsername(data?.profile?.username || username)
      setBio(data?.profile?.bio || bio)
      toast.success('Public page settings updated')
    } catch {
      toast.error('Failed to save profile')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button Header */}
      <div className="bg-white border-b px-4 py-3">
        <Button variant="ghost" onClick={() => router.push('/tutor/dashboard')} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Button>
      </div>

      <div className="w-full p-6 space-y-6">
        {/* Header: title + primary actions */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">My Page</h1>
            <p className="text-muted-foreground mt-1">
              Manage your public profile and view your courses.
            </p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <Button onClick={() => router.push('/tutor/courses/new')}>
              Create Course
            </Button>
            {publicPath && normalizedUsername && (
              <Button variant="outline" size="sm" asChild>
                <Link href={publicPath} target="_blank">
                  <ExternalLink className="h-4 w-4 mr-1.5" />
                  View public page
                </Link>
              </Button>
            )}
          </div>
        </div>

        {/* Profile Settings - compact block above tabs */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Profile Settings</CardTitle>
            <CardDescription>
              Customize how you appear to students on your public page.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Username</Label>
                <Input
                  value={username}
                  onChange={(e) => setUsername(e.target.value.replace(/\s+/g, ''))}
                  placeholder="e.g. jane.math"
                  disabled={loading || saving}
                />
                <p className="text-xs text-muted-foreground">Displayed as @{username.replace(/^@+/, '') || 'username'}</p>
              </div>
              <div className="space-y-2">
                <Label>Bio</Label>
                <Textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={2}
                  disabled={loading || saving}
                  placeholder="Short bio for your public page..."
                  className="min-h-[80px]"
                />
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {publicUrl && (
                <div className="flex flex-wrap items-center gap-2 rounded-md border bg-muted/30 p-2.5 text-sm">
                  <span className="font-medium shrink-0">Public URL</span>
                  <span className="break-all text-muted-foreground flex-1 min-w-0">{publicUrl}</span>
                  <div className="flex gap-1 shrink-0">
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-7"
                      onClick={() => {
                        navigator.clipboard.writeText(publicUrl)
                        toast.success('Public URL copied')
                      }}
                    >
                      <Copy className="h-3.5 w-3.5" />
                    </Button>
                    <Button size="sm" variant="ghost" className="h-7" asChild>
                      <Link href={publicPath} target="_blank">
                        <ExternalLink className="h-3.5 w-3.5" />
                      </Link>
                    </Button>
                  </div>
                </div>
              )}
            </div>
            <Button onClick={save} disabled={loading || saving} size="sm">
              {saving ? 'Saving...' : 'Save Public Page'}
            </Button>
          </CardContent>
        </Card>

      </div>
    </div>
  )
}
