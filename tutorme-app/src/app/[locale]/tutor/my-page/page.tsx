'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { toast } from 'sonner'
import { ArrowLeft, Camera, CheckCircle, Copy, Share2 } from 'lucide-react'
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
  const locale = typeof params?.locale === 'string' ? params.locale : 'en'
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [username, setUsername] = useState('')
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
  const socialLinks = useMemo(() => {
    const links: Array<{ label: string; url: string }> = []
    if (socialAccounts.youtube) links.push({ label: 'YouTube', url: `https://www.youtube.com/${socialAccounts.youtube.replace(/^@/, '')}` })
    if (socialAccounts.instagram) links.push({ label: 'Instagram', url: `https://www.instagram.com/${socialAccounts.instagram.replace(/^@/, '')}` })
    if (socialAccounts.tiktok) links.push({ label: 'TikTok', url: `https://www.tiktok.com/@${socialAccounts.tiktok.replace(/^@/, '')}` })
    if (socialAccounts.facebook) links.push({ label: 'Facebook', url: `https://www.facebook.com/${socialAccounts.facebook.replace(/^@/, '')}` })
    return links
  }, [socialAccounts])

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

  const uploadAvatar = async () => {
    if (!avatarFile) {
      toast.error('Select a photo to upload')
      return
    }
    setUploadingAvatar(true)
    try {
      const csrfRes = await fetch('/api/csrf', { credentials: 'include' })
      const csrfData = await csrfRes.json().catch(() => ({}))
      const csrfToken = csrfData?.token ?? null

      const formData = new FormData()
      formData.set('avatar', avatarFile)

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
    <div className="min-h-screen bg-[#F4F7FB] text-[#1F2933]">
      <div className="border-b border-[#E2E8F0] bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Button
            variant="ghost"
            onClick={() => router.push('/tutor/dashboard')}
            className="gap-2 text-[#1F2933] hover:text-[#1D4ED8]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
          <Badge className="bg-[#1D4ED8] text-white">Tutor Workspace</Badge>
        </div>
      </div>

      <div className="mx-auto w-full max-w-6xl px-6 py-8 space-y-8">
        <section className="rounded-3xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
          <div className="grid gap-6 lg:grid-cols-[240px,1fr]">
            <div className="flex flex-col items-center gap-4">
              <Avatar className="h-28 w-28 border border-white shadow">
                <AvatarImage src={avatarPreview ?? avatarUrl ?? undefined} alt="Tutor avatar" />
                <AvatarFallback className="text-lg font-semibold">
                  {normalizedUsername ? normalizedUsername.slice(0, 2).toUpperCase() : 'TU'}
                </AvatarFallback>
              </Avatar>
              <div className="w-full space-y-2">
                <Label className="text-[#1F2933]">Profile Photo</Label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setAvatarFile(e.target.files?.[0] ?? null)}
                  disabled={uploadingAvatar}
                  className="border-[#E2E8F0] bg-white focus-visible:ring-[#4FD1C5]"
                />
                <div className="flex flex-wrap gap-2">
                  <Button
                    size="sm"
                    onClick={uploadAvatar}
                    disabled={uploadingAvatar || !avatarFile}
                    className="bg-[#1D4ED8] text-white hover:bg-[#1B45C2]"
                  >
                    <Camera className="mr-1.5 h-4 w-4" />
                    {uploadingAvatar ? 'Uploading...' : 'Upload Photo'}
                  </Button>
                  {avatarFile ? (
                    <Button size="sm" variant="ghost" onClick={() => setAvatarFile(null)}>
                      Clear
                    </Button>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-[#1F2933]">
                <CheckCircle className="h-4 w-4 text-emerald-600" />
                <span className="font-medium">Verified</span>
              </div>
              <div className="grid gap-2 text-sm text-[#1F2933]">
                <div><span className="font-medium">Solocorn Tutor since:</span> {tutorSince || '—'}</div>
                <div><span className="font-medium">Country:</span> {country || '—'}</div>
                <div><span className="font-medium">Active Courses:</span> {activeCourses ?? '—'}</div>
                <div><span className="font-medium">Categories:</span> {profileCategories.length ? profileCategories.join(', ') : '—'}</div>
                <div><span className="font-medium">Bio:</span> {bio || 'Bio should appear here'}</div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.15em] text-[#64748B]">Public URL</div>
                {publicUrl ? (
                  <div className="mt-2 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-4">
                    <div className="break-all text-sm font-medium text-[#1F2933]">{publicUrl}</div>
                    <div className="mt-3 flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-[#4FD1C5] text-[#1F2933] hover:bg-[#4FD1C5]/10"
                        onClick={() => {
                          navigator.clipboard.writeText(publicUrl)
                          toast.success('Public URL copied')
                        }}
                      >
                        <Copy className="h-3.5 w-3.5 mr-1.5" />
                        Copy
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="mt-2 rounded-2xl border border-dashed border-[#CBD5F5] p-4 text-sm text-[#64748B]">
                    Add a username below to generate your public link.
                  </div>
                )}
              </div>
              {socialLinks.length > 0 && (
                <div className="space-y-2">
                  <div className="text-xs uppercase tracking-[0.15em] text-[#64748B]">Social Media</div>
                  <div className="flex flex-wrap gap-2">
                    {socialLinks.map((link) => (
                      <Link key={link.url} href={link.url} className="text-sm text-[#1D4ED8] hover:underline" target="_blank">
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        <Card className="border border-[#E2E8F0] shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-[#1F2933]">Profile Settings</CardTitle>
            <CardDescription className="text-[#64748B]">
              Customize how you appear to students on your public page.
            </CardDescription>
          </CardHeader>
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
                <Input
                  placeholder="YouTube username"
                  value={socialAccounts.youtube}
                  onChange={(e) => setSocialAccounts((prev) => ({ ...prev, youtube: e.target.value }))}
                  disabled={loading || saving}
                  className="border-[#E2E8F0] focus-visible:ring-[#4FD1C5]"
                />
                <Input
                  placeholder="Instagram username"
                  value={socialAccounts.instagram}
                  onChange={(e) => setSocialAccounts((prev) => ({ ...prev, instagram: e.target.value }))}
                  disabled={loading || saving}
                  className="border-[#E2E8F0] focus-visible:ring-[#4FD1C5]"
                />
                <Input
                  placeholder="TikTok username"
                  value={socialAccounts.tiktok}
                  onChange={(e) => setSocialAccounts((prev) => ({ ...prev, tiktok: e.target.value }))}
                  disabled={loading || saving}
                  className="border-[#E2E8F0] focus-visible:ring-[#4FD1C5]"
                />
                <Input
                  placeholder="Facebook username"
                  value={socialAccounts.facebook}
                  onChange={(e) => setSocialAccounts((prev) => ({ ...prev, facebook: e.target.value }))}
                  disabled={loading || saving}
                  className="border-[#E2E8F0] focus-visible:ring-[#4FD1C5]"
                />
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
              <div className="flex flex-wrap items-center gap-2 rounded-full border border-[#F17623]/40 bg-white px-3 py-1 text-xs text-[#1F2933]">
                <span className="font-medium">Share your handle:</span>
                <span className="font-semibold text-[#F17623]">
                  {normalizedUsername ? `@${normalizedUsername}` : 'not set'}
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
          </CardContent>
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
