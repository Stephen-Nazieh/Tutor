'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { toast } from 'sonner'
import { ArrowLeft, CheckCircle, ChevronDown, ChevronUp, Copy, Pencil, Share2 } from 'lucide-react'
import { DEFAULT_LOCALE } from '@/lib/i18n/config'
import { AGGREGATED_CATEGORIES } from '@/lib/tutoring/categories'

const SUBJECTS = [
  { value: 'math', label: 'Mathematics' },
  { value: 'english', label: 'English' },
  { value: 'physics', label: 'Physics' },
  { value: 'chemistry', label: 'Chemistry' },
  { value: 'biology', label: 'Biology' },
  { value: 'history', label: 'History' },
  { value: 'cs', label: 'Computer Science' },
]

export default function TutorMyPage() {
  const params = useParams<{ locale?: string }>()
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const locale = typeof params?.locale === 'string' ? params.locale : 'en'
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [username, setUsername] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [bio, setBio] = useState('')
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [uploadingAvatar, setUploadingAvatar] = useState(false)
  const [createOpen, setCreateOpen] = useState(false)
  const [creatingCourse, setCreatingCourse] = useState(false)
  const [courseName, setCourseName] = useState('')
  const [courseSubject, setCourseSubject] = useState('')
  const [courseDescription, setCourseDescription] = useState('')
  const [courseCategories, setCourseCategories] = useState<string[]>([])
  const [tutorSince, setTutorSince] = useState<string>('')
  const [country, setCountry] = useState<string>('')
  const [activeCourses, setActiveCourses] = useState<number | null>(null)
  const [profileCategories, setProfileCategories] = useState<string[]>([])
  const [socialAccounts, setSocialAccounts] = useState({
    youtube: '',
    instagram: '',
    tiktok: '',
    facebook: '',
  })
  const [profileSettingsOpen, setProfileSettingsOpen] = useState(true)

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
        setDisplayName(data?.profile?.name || '')
        setUsername(data?.profile?.username || '')
        setBio(data?.profile?.bio || '')
        setAvatarUrl(data?.profile?.avatarUrl || null)
        setTutorSince(data?.profile?.createdAt ? new Date(data.profile.createdAt).toLocaleDateString() : '')
        setCountry(data?.profile?.country || '')
        setActiveCourses(typeof data?.profile?.activeCourses === 'number' ? data.profile.activeCourses : null)
        setProfileCategories(Array.isArray(data?.profile?.categories) ? data.profile.categories : [])
        const links = data?.profile?.socialLinks || {}
        setSocialAccounts({
          youtube: typeof links.youtube === 'string' ? links.youtube : '',
          instagram: typeof links.instagram === 'string' ? links.instagram : '',
          tiktok: typeof links.tiktok === 'string' ? links.tiktok : '',
          facebook: typeof links.facebook === 'string' ? links.facebook : '',
        })
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
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)

  useEffect(() => {
    if (!avatarFile) {
      setAvatarPreview(null)
      return
    }
    const previewUrl = URL.createObjectURL(avatarFile)
    setAvatarPreview(previewUrl)
    return () => URL.revokeObjectURL(previewUrl)
  }, [avatarFile])

  const handleCopyHandle = () => {
    if (!normalizedUsername) return
    navigator.clipboard.writeText(`@${normalizedUsername}`)
    toast.success('Handle copied')
  }

  const handleCopyProfile = () => {
    if (!publicUrl) return
    navigator.clipboard.writeText(publicUrl)
    toast.success('Public URL copied')
  }

  const canShare =
    typeof navigator !== 'undefined' &&
    typeof (navigator as Navigator & { share?: (data: ShareData) => Promise<void> }).share === 'function'

  const handleShareProfile = async () => {
    if (!publicUrl || !normalizedUsername || !canShare) return
    try {
      await (navigator as Navigator & { share?: (data: ShareData) => Promise<void> }).share?.({
        title: `Tutor profile @${normalizedUsername}`,
        url: publicUrl,
      })
    } catch {
      // ignore share cancel
    }
  }

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
        body: JSON.stringify({
          bio,
          socialLinks: {
            instagram: socialAccounts.instagram.trim(),
            tiktok: socialAccounts.tiktok.trim(),
            youtube: socialAccounts.youtube.trim(),
            facebook: socialAccounts.facebook.trim(),
          },
        }),
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

  const uploadAvatarFile = async (file: File) => {
    setAvatarFile(file)
    setUploadingAvatar(true)
    try {
      const csrfRes = await fetch('/api/csrf', { credentials: 'include' })
      const csrfData = await csrfRes.json().catch(() => ({}))
      const csrfToken = csrfData?.token ?? null

      const formData = new FormData()
      formData.set('avatar', file)

      const res = await fetch('/api/tutor/public-profile/avatar', {
        method: 'POST',
        headers: {
          ...(csrfToken ? { 'X-CSRF-Token': csrfToken } : {}),
        },
        credentials: 'include',
        body: formData,
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        toast.error(data?.error || 'Failed to upload photo')
        return
      }
      setAvatarUrl(data?.avatarUrl ?? avatarUrl)
      setAvatarFile(null)
      toast.success('Profile photo updated')
    } catch {
      toast.error('Failed to upload photo')
    } finally {
      setUploadingAvatar(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const resetCourseForm = () => {
    setCourseName('')
    setCourseSubject('')
    setCourseDescription('')
    setCourseCategories([])
  }

  const toggleCategory = (category: string) => {
    setCourseCategories((prev) =>
      prev.includes(category) ? prev.filter((item) => item !== category) : [...prev, category]
    )
  }

  const handleCreateCourse = async () => {
    if (!courseName.trim()) {
      toast.error('Course name is required')
      return
    }
    if (!courseSubject) {
      toast.error('Please choose a subject')
      return
    }
    if (courseCategories.length === 0) {
      toast.error('Select at least one category')
      return
    }

    setCreatingCourse(true)
    try {
      const csrfRes = await fetch('/api/csrf', { credentials: 'include' })
      const csrfData = await csrfRes.json().catch(() => ({}))
      const csrfToken = csrfData?.token ?? null

      const res = await fetch('/api/tutor/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(csrfToken ? { 'X-CSRF-Token': csrfToken } : {}),
        },
        credentials: 'include',
        body: JSON.stringify({
          title: courseName.trim(),
          description: courseDescription.trim() || undefined,
          subject: courseSubject,
          categories: courseCategories,
          schedule: [],
          isLiveOnline: false,
        }),
      })

      const data = await res.json().catch(() => ({}))
      if (res.ok && data.course?.id) {
        toast.success('Course created! Opening builder...')
        setCreateOpen(false)
        resetCourseForm()
        router.push(`/tutor/courses/${data.course.id}/builder`)
      } else {
        toast.error(data.error || 'Failed to create course')
      }
    } catch {
      toast.error('Failed to create course')
    } finally {
      setCreatingCourse(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8FAFC] via-white to-[#EEF2FF] text-[#1F2933]">
      <div className="border-b border-[#E2E8F0] bg-white/90 backdrop-blur">
        <div className="mx-auto flex w-full items-center justify-between px-6 py-4">
          <Button
            variant="ghost"
            onClick={() => router.push('/tutor/dashboard')}
            className="gap-2 text-[#1F2933] hover:text-[#1D4ED8]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
          <Badge className="bg-[#1D4ED8] text-white shadow-sm">Tutor Workspace</Badge>
        </div>
      </div>

      <div className="mx-auto w-full px-6 py-8 space-y-8">
        <section className="relative overflow-hidden rounded-[32px] border border-[#E2E8F0] bg-white/95 p-8 shadow-lg">
          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-r from-[#1D4ED8]/10 via-[#4FD1C5]/10 to-[#F17623]/10" />
          <div className="relative grid gap-6 lg:grid-cols-[260px,1fr]">
            <div className="flex flex-col items-center gap-3 text-center">
              <div className="relative">
                <Avatar className="h-28 w-28 border-2 border-white shadow-lg">
                  <AvatarImage src={avatarPreview ?? avatarUrl ?? undefined} alt="Tutor avatar" />
                  <AvatarFallback className="text-lg font-semibold">
                    {normalizedUsername ? normalizedUsername.slice(0, 2).toUpperCase() : 'TU'}
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="icon"
                  className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-white text-[#1F2933] shadow hover:bg-[#F8FAFC]"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploadingAvatar}
                  aria-label="Edit profile photo"
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) void uploadAvatarFile(file)
                  }}
                  className="hidden"
                />
              </div>
              <div>
                <div className="text-lg font-semibold text-[#0F172A]">
                  {displayName || normalizedUsername || 'Tutor'}
                </div>
                <div className="text-xs text-[#64748B]">Solocorn Tutor</div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2 text-sm text-[#1F2933]">
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                  <CheckCircle className="h-3.5 w-3.5" />
                  Verified
                </span>
                {publicUrl ? (
                  <Link href={publicPath} className="inline-flex" target="_blank" rel="noreferrer">
                    <Button
                      size="sm"
                      className="bg-[#1D4ED8] text-white hover:bg-[#1B45C2]"
                    >
                      Preview Public Page
                    </Button>
                  </Link>
                ) : (
                  <Button size="sm" disabled className="bg-[#CBD5F5] text-white">
                    Preview Public Page
                  </Button>
                )}
              </div>
              <div className="grid gap-3 text-sm text-[#1F2933] md:grid-cols-2">
                <div className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-3">
                  <div className="text-xs uppercase tracking-[0.15em] text-[#64748B]">Tutor since</div>
                  <div className="mt-1 text-sm font-medium text-[#0F172A]">{tutorSince || '—'}</div>
                </div>
                <div className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-3">
                  <div className="text-xs uppercase tracking-[0.15em] text-[#64748B]">Country</div>
                  <div className="mt-1 text-sm font-medium text-[#0F172A]">{country || '—'}</div>
                </div>
                <div className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-3">
                  <div className="text-xs uppercase tracking-[0.15em] text-[#64748B]">Active Courses</div>
                  <div className="mt-1 text-sm font-medium text-[#0F172A]">{activeCourses ?? '—'}</div>
                </div>
                <div className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-3">
                  <div className="text-xs uppercase tracking-[0.15em] text-[#64748B]">Categories</div>
                  <div className="mt-1 text-sm font-medium text-[#0F172A]">
                    {profileCategories.length ? profileCategories.join(', ') : '—'}
                  </div>
                </div>
                <div className="md:col-span-2 rounded-2xl border border-[#E2E8F0] bg-white p-4">
                  <div className="text-xs uppercase tracking-[0.15em] text-[#64748B]">Bio</div>
                  <div className="mt-2 text-sm text-[#0F172A]">{bio || 'Bio should appear here'}</div>
                </div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.15em] text-[#64748B]">Public URL</div>
                {publicUrl ? (
                  <div className="mt-2 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-4">
                    <div className="break-all text-sm font-medium text-[#1F2933]">{publicUrl}</div>
                  </div>
                ) : (
                  <div className="mt-2 rounded-2xl border border-dashed border-[#CBD5F5] p-4 text-sm text-[#64748B]">
                    Add a username below to generate your public link.
                  </div>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-2 rounded-full border border-[#F17623]/40 bg-white px-3 py-1 text-xs text-[#1F2933]">
                <span className="font-semibold text-[#F17623]">
                  {normalizedUsername ? `@${normalizedUsername}` : '@username'}
                </span>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-7 px-2 text-[#F17623]"
                  onClick={handleCopyHandle}
                  disabled={!normalizedUsername}
                >
                  <Copy className="mr-1 h-3.5 w-3.5" />
                  Copy
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-7 px-2 text-[#1D4ED8]"
                  onClick={handleCopyProfile}
                  disabled={!publicUrl}
                >
                  Copy Link
                </Button>
                {canShare && publicUrl ? (
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-7 px-2 text-[#1D4ED8]"
                    onClick={handleShareProfile}
                  >
                    <Share2 className="mr-1 h-3.5 w-3.5" />
                    Share
                  </Button>
                ) : null}
              </div>
            </div>
          </div>
        </section>

        <Card className="border border-[#E2E8F0] shadow-sm">
          <CardHeader
            className="cursor-pointer select-none pb-3"
            onClick={() => setProfileSettingsOpen((prev) => !prev)}
          >
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg text-[#1F2933]">Profile Settings</CardTitle>
              {profileSettingsOpen ? (
                <ChevronUp className="h-4 w-4 text-[#64748B]" />
              ) : (
                <ChevronDown className="h-4 w-4 text-[#64748B]" />
              )}
            </div>
          </CardHeader>
          {profileSettingsOpen && (
            <CardContent className="space-y-5">
            <div className="grid gap-4 lg:grid-cols-[1fr,2fr]">
              <div className="space-y-2">
                <Label className="text-[#1F2933]">Username</Label>
                <Input
                  value={username}
                  placeholder="e.g. jane_math"
                  disabled
                  className="border-[#E2E8F0] focus-visible:ring-[#4FD1C5]"
                />
                <p className="text-xs text-[#64748B]">
                  Displayed as @{username.replace(/^@+/, '') || 'username'}
                </p>
              </div>
              <div className="space-y-2">
                <Label className="text-[#1F2933]">Edit Bio</Label>
                <Textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={3}
                  disabled={loading || saving}
                  placeholder="Short bio for your public page..."
                  className="min-h-[100px] border-[#E2E8F0] focus-visible:ring-[#4FD1C5]"
                />
              </div>
            </div>
            <div className="space-y-3">
              <Label className="text-[#1F2933]">Edit Social Media Accounts</Label>
              <div className="grid gap-3 md:grid-cols-2">
                <div className="space-y-1">
                  <Label className="text-xs text-[#64748B]">YouTube</Label>
                  <Input
                    placeholder="YouTube username"
                    value={socialAccounts.youtube}
                    onChange={(e) => setSocialAccounts((prev) => ({ ...prev, youtube: e.target.value }))}
                    disabled={loading || saving}
                    className="border-[#E2E8F0] focus-visible:ring-[#4FD1C5]"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs text-[#64748B]">Instagram</Label>
                  <Input
                    placeholder="Instagram username"
                    value={socialAccounts.instagram}
                    onChange={(e) => setSocialAccounts((prev) => ({ ...prev, instagram: e.target.value }))}
                    disabled={loading || saving}
                    className="border-[#E2E8F0] focus-visible:ring-[#4FD1C5]"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs text-[#64748B]">TikTok</Label>
                  <Input
                    placeholder="TikTok username"
                    value={socialAccounts.tiktok}
                    onChange={(e) => setSocialAccounts((prev) => ({ ...prev, tiktok: e.target.value }))}
                    disabled={loading || saving}
                    className="border-[#E2E8F0] focus-visible:ring-[#4FD1C5]"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs text-[#64748B]">Facebook</Label>
                  <Input
                    placeholder="Facebook username"
                    value={socialAccounts.facebook}
                    onChange={(e) => setSocialAccounts((prev) => ({ ...prev, facebook: e.target.value }))}
                    disabled={loading || saving}
                    className="border-[#E2E8F0] focus-visible:ring-[#4FD1C5]"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button
                onClick={save}
                disabled={loading || saving}
                className="bg-[#4FD1C5] text-[#1F2933] hover:bg-[#3CC6B9]"
              >
                {saving ? 'Saving...' : 'Save Public Page'}
              </Button>
            </div>
          </CardContent>
          )}
        </Card>

      </div>

      <Dialog
        open={createOpen}
        onOpenChange={(open) => {
          setCreateOpen(open)
          if (!open) resetCourseForm()
        }}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create a new course</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Course name</Label>
              <Input
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
                placeholder="e.g. AP Calculus Mastery"
                disabled={creatingCourse}
              />
            </div>
            <div className="space-y-2">
              <Label>Subject</Label>
              <Select
                value={courseSubject}
                onValueChange={setCourseSubject}
                disabled={creatingCourse}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose a subject" />
                </SelectTrigger>
                <SelectContent>
                  {SUBJECTS.map((subject) => (
                    <SelectItem key={subject.value} value={subject.value}>
                      {subject.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                value={courseDescription}
                onChange={(e) => setCourseDescription(e.target.value)}
                placeholder="Short description for your course..."
                disabled={creatingCourse}
              />
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>Categories</Label>
                <span className="text-xs text-[#64748B]">
                  {courseCategories.length} selected
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {AGGREGATED_CATEGORIES.map((category) => {
                  const active = courseCategories.includes(category)
                  return (
                    <button
                      key={category}
                      type="button"
                      onClick={() => toggleCategory(category)}
                      className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
                        active
                          ? 'border-[#1D4ED8] bg-[#1D4ED8] text-white'
                          : 'border-[#E2E8F0] text-[#1F2933] hover:border-[#4FD1C5]'
                      }`}
                    >
                      {category}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
          <DialogFooter className="mt-4">
            <Button variant="ghost" onClick={() => setCreateOpen(false)} disabled={creatingCourse}>
              Cancel
            </Button>
            <Button
              onClick={handleCreateCourse}
              disabled={creatingCourse}
              className="bg-[#1D4ED8] text-white hover:bg-[#1B45C2]"
            >
              {creatingCourse ? 'Creating...' : 'Create Course'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
