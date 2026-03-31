'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { toast } from 'sonner'
import { ArrowLeft, CheckCircle, ChevronDown, ChevronUp, Copy, Pencil, Share2 } from 'lucide-react'
import { DEFAULT_LOCALE } from '@/lib/i18n/config'
import { LANDING_CATEGORIES } from '@/lib/data/landing-categories'

const SUBJECTS = [
  { value: 'math', label: 'Mathematics' },
  { value: 'english', label: 'English' },
  { value: 'physics', label: 'Physics' },
  { value: 'chemistry', label: 'Chemistry' },
  { value: 'biology', label: 'Biology' },
  { value: 'history', label: 'History' },
  { value: 'cs', label: 'Computer Science' },
]

// Use unique category names from landing categories
const DEFAULT_CATEGORIES = Array.from(new Set(LANDING_CATEGORIES.map(c => c.category))) as string[]

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
  const [cropDialogOpen, setCropDialogOpen] = useState(false)
  const [cropSourceUrl, setCropSourceUrl] = useState<string | null>(null)
  const [croppedPreviewUrl, setCroppedPreviewUrl] = useState<string | null>(null)
  const [cropping, setCropping] = useState(false)
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
  const [editableCategories, setEditableCategories] = useState<string[]>([])
  const [socialAccounts, setSocialAccounts] = useState({
    youtube: '',
    instagram: '',
    tiktok: '',
    facebook: '',
  })
  const [expertiseInput, setExpertiseInput] = useState('')
  const [expertiseAddOpen, setExpertiseAddOpen] = useState(false)
  const [expertiseAddSelected, setExpertiseAddSelected] = useState<string>('')
  const [expertiseAddCustom, setExpertiseAddCustom] = useState<string>('')
  const [profileSettingsOpen, setProfileSettingsOpen] = useState(true)

  const aggregatedCategories = useMemo<string[]>(
    () => Array.from(new Set<string>([...DEFAULT_CATEGORIES, ...profileCategories])).sort(),
    [profileCategories]
  )

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
        setTutorSince(
          data?.profile?.createdAt ? new Date(data.profile.createdAt).toLocaleDateString() : ''
        )
        setCountry(data?.profile?.country || '')
        setActiveCourses(
          typeof data?.profile?.activeCourses === 'number' ? data.profile.activeCourses : null
        )
        const categories = Array.isArray(data?.profile?.categories) ? data.profile.categories : []
        setProfileCategories(categories)
        setEditableCategories(categories)
        const links = data?.profile?.socialLinks || {}
        const stripAt = (s: string) => s.replace(/^@+/, '')
        setSocialAccounts({
          youtube: typeof links.youtube === 'string' ? stripAt(links.youtube) : '',
          instagram: typeof links.instagram === 'string' ? stripAt(links.instagram) : '',
          tiktok: typeof links.tiktok === 'string' ? stripAt(links.tiktok) : '',
          facebook: typeof links.facebook === 'string' ? stripAt(links.facebook) : '',
        })
        const specs = Array.isArray(data?.profile?.specialties) ? data.profile.specialties : []
        setExpertiseInput(specs.filter((s: unknown) => typeof s === 'string').join(', '))
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
  const publicPath = useMemo(() => {
    if (!normalizedUsername) return ''
    const prefix = locale === DEFAULT_LOCALE ? '' : `/${locale}`
    return `${prefix}/u/${normalizedUsername}`
  }, [locale, normalizedUsername])
  const publicUrl = useMemo(
    () =>
      typeof window !== 'undefined' && publicPath
        ? `${window.location.origin}${publicPath}`
        : publicPath,
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

  useEffect(() => {
    if (!cropSourceUrl) {
      setCroppedPreviewUrl(null)
      return
    }

    let active = true
    let objectUrlToRevoke: string | null = null

    const generatePreview = async () => {
      const img = new Image()
      img.src = cropSourceUrl
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve()
        img.onerror = () => reject(new Error('Failed to load image'))
      })

      if (!active) return

      const side = Math.min(img.naturalWidth, img.naturalHeight)
      const sx = (img.naturalWidth - side) / 2
      const sy = (img.naturalHeight - side) / 2

      const canvas = document.createElement('canvas')
      canvas.width = 300
      canvas.height = 300
      const ctx = canvas.getContext('2d')
      if (!ctx) throw new Error('Canvas not supported')

      ctx.drawImage(img, sx, sy, side, side, 0, 0, 300, 300)

      const blob = await new Promise<Blob | null>(resolve =>
        canvas.toBlob(resolve, 'image/webp', 0.85)
      )
      if (!blob || !active) return

      objectUrlToRevoke = URL.createObjectURL(blob)
      setCroppedPreviewUrl(objectUrlToRevoke)
    }

    void generatePreview().catch(() => {
      if (!active) return
      setCroppedPreviewUrl(null)
    })

    return () => {
      active = false
      if (objectUrlToRevoke) URL.revokeObjectURL(objectUrlToRevoke)
    }
  }, [cropSourceUrl])

  const handleCopyProfile = () => {
    if (!publicUrl) return
    navigator.clipboard.writeText(publicUrl)
    toast.success('Public URL copied')
  }

  const canShare =
    typeof navigator !== 'undefined' &&
    typeof (navigator as Navigator & { share?: (data: ShareData) => Promise<void> }).share ===
      'function'

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
            instagram: socialAccounts.instagram.trim().replace(/^@+/, ''),
            tiktok: socialAccounts.tiktok.trim().replace(/^@+/, ''),
            youtube: socialAccounts.youtube.trim().replace(/^@+/, ''),
            facebook: socialAccounts.facebook.trim().replace(/^@+/, ''),
          },
          specialties: expertiseInput
            .split(',')
            .map(s => s.trim())
            .filter(Boolean)
            .slice(0, 40),
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        toast.error(data?.error || 'Failed to save profile')
        return
      }
      setUsername(data?.profile?.username || username)
      setBio(data?.profile?.bio || bio)
      if (Array.isArray(data?.profile?.categories)) {
        setProfileCategories(data.profile.categories)
      }
      if (Array.isArray(data?.profile?.specialties)) {
        setExpertiseInput(
          data.profile.specialties.filter((s: unknown) => typeof s === 'string').join(', ')
        )
      }
      toast.success('Public page settings updated')
    } catch {
      toast.error('Failed to save profile')
    } finally {
      setSaving(false)
    }
  }

  const handleAddExpertise = () => {
    const candidate = (expertiseAddCustom || expertiseAddSelected).trim()
    if (!candidate) {
      toast.error('Select a category or type a custom category')
      return
    }

    const normalized = candidate.replace(/\s+/g, ' ')
    const existing = expertiseInput
      .split(',')
      .map(s => s.trim())
      .filter(Boolean)

    const next = Array.from(new Set([...existing, normalized])).slice(0, 40)
    setExpertiseInput(next.join(', '))
    setExpertiseAddOpen(false)
    setExpertiseAddSelected('')
    setExpertiseAddCustom('')
  }

  const MAX_AVATAR_SIZE_BYTES = 5 * 1024 * 1024
  const ACCEPTED_AVATAR_MIME = ['image/jpeg', 'image/png', 'image/webp']

  const isAcceptedAvatarFile = (file: File) => {
    const byMime = ACCEPTED_AVATAR_MIME.includes(file.type)
    if (byMime) return true
    const name = file.name.toLowerCase()
    return (
      name.endsWith('.jpg') ||
      name.endsWith('.jpeg') ||
      name.endsWith('.png') ||
      name.endsWith('.webp')
    )
  }

  const handleAvatarSelect = async (file: File) => {
    if (!isAcceptedAvatarFile(file)) {
      toast.error('Accepted formats: JPG, PNG, WEBP only')
      return
    }
    if (file.size > MAX_AVATAR_SIZE_BYTES) {
      toast.error('Maximum size is 5 MB')
      return
    }

    if (cropSourceUrl) URL.revokeObjectURL(cropSourceUrl)
    setCroppedPreviewUrl(null)
    setCropDialogOpen(false)
    const objectUrl = URL.createObjectURL(file)
    try {
      const img = new Image()
      img.src = objectUrl
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve()
        img.onerror = () => reject(new Error('Failed to load image'))
      })

      if (img.naturalWidth < 300 || img.naturalHeight < 300) {
        toast.error('Minimum dimensions: 300 × 300 px')
        return
      }

      setCropSourceUrl(objectUrl)
      setCropDialogOpen(true)
    } catch {
      toast.error('Invalid image file')
      URL.revokeObjectURL(objectUrl)
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
      const newUrl = data?.avatarUrl ?? data?.url ?? null
      const fullUrl =
        typeof newUrl === 'string' && newUrl.startsWith('/') && typeof window !== 'undefined'
          ? `${window.location.origin}${newUrl}`
          : newUrl
      setAvatarUrl(fullUrl ?? null)
      setAvatarPreview(null)
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

  const closeCropDialog = () => {
    setCropDialogOpen(false)
    setCropping(false)
    setCropSourceUrl(prev => {
      if (prev) URL.revokeObjectURL(prev)
      return null
    })
    setCroppedPreviewUrl(null)
  }

  const confirmCropAndUpload = async () => {
    if (!cropSourceUrl) return

    setCropping(true)
    try {
      const img = new Image()
      img.src = cropSourceUrl
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve()
        img.onerror = () => reject(new Error('Failed to load image'))
      })

      const side = Math.min(img.naturalWidth, img.naturalHeight)
      const sx = (img.naturalWidth - side) / 2
      const sy = (img.naturalHeight - side) / 2

      const canvas = document.createElement('canvas')
      canvas.width = 256
      canvas.height = 256
      const ctx = canvas.getContext('2d')
      if (!ctx) throw new Error('Canvas not supported')

      ctx.drawImage(img, sx, sy, side, side, 0, 0, 256, 256)

      const blob = await new Promise<Blob | null>(resolve =>
        canvas.toBlob(resolve, 'image/webp', 0.85)
      )
      if (!blob) throw new Error('Failed to crop image')

      const croppedFile = new File([blob], 'avatar.webp', { type: 'image/webp' })
      await uploadAvatarFile(croppedFile)
      closeCropDialog()
    } catch {
      toast.error('Failed to crop/upload photo')
    } finally {
      setCropping(false)
    }
  }

  const resetCourseForm = () => {
    setCourseName('')
    setCourseSubject('')
    setCourseDescription('')
    setCourseCategories([])
  }

  const toggleCategory = (category: string) => {
    setCourseCategories(prev =>
      prev.includes(category) ? prev.filter(item => item !== category) : [...prev, category]
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
        </div>
      </div>

      <div className="mx-auto w-full space-y-8 px-6 py-8">
        <section className="relative overflow-hidden rounded-[32px] border border-[#E2E8F0] bg-white/95 p-8 shadow-lg">
          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-r from-[#1D4ED8]/10 via-[#4FD1C5]/10 to-[#F17623]/10" />
          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-stretch">
            <div className="flex w-full flex-shrink-0 flex-col items-center gap-3 text-center lg:w-[260px]">
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
                  accept="image/jpeg,image/png,image/webp"
                  onChange={e => {
                    const file = e.target.files?.[0]
                    if (file) void handleAvatarSelect(file)
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
              <div className="flex w-full flex-col items-center gap-3">
                <div className="flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                  <CheckCircle className="h-3.5 w-3.5" />
                  Verified
                </div>
                <div className="w-full rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-3">
                  <div className="text-xs uppercase tracking-[0.15em] text-[#64748B]">
                    Tutor since
                  </div>
                  <div className="mt-1 text-sm font-medium text-[#0F172A]">{tutorSince || '—'}</div>
                </div>
                <div className="w-full rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-3">
                  <div className="text-xs uppercase tracking-[0.15em] text-[#64748B]">
                    Active Courses
                  </div>
                  <div className="mt-1 text-sm font-medium text-[#0F172A]">
                    {activeCourses ?? '—'}
                  </div>
                </div>
                <div className="w-full rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-3">
                  <div className="text-xs uppercase tracking-[0.15em] text-[#64748B]">Country</div>
                  <div className="mt-1 text-sm font-medium text-[#0F172A]">{country || '—'}</div>
                </div>
              </div>
            </div>
            <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-4">
              {/* Preview + Save */}
              <div className="flex flex-wrap items-center gap-2 text-sm text-[#1F2933]">
                {publicUrl ? (
                  <Link href={publicPath} className="inline-flex" target="_blank" rel="noreferrer">
                    <Button size="sm" className="bg-[#1D4ED8] text-white hover:bg-[#1B45C2]">
                      Preview My Public Page
                    </Button>
                  </Link>
                ) : (
                  <Button size="sm" disabled className="bg-[#CBD5F5] text-white">
                    Preview My Public Page
                  </Button>
                )}
                <Button
                  size="sm"
                  className="bg-[#4FD1C5] text-[#1F2933] hover:bg-[#3CC6B9]"
                  onClick={() => void save()}
                  disabled={loading || saving}
                >
                  {saving ? 'Saving...' : 'Save Public Page'}
                </Button>
              </div>

              <div className="grid min-h-0 flex-1 gap-4 lg:grid-cols-2 lg:items-stretch">
                <div className="flex min-h-[220px] flex-col rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-4 lg:min-h-0">
                  <div className="text-xs uppercase tracking-[0.15em] text-[#64748B]">Bio</div>
                  <Textarea
                    value={bio}
                    readOnly
                    className="mt-2 min-h-0 flex-1 resize-none border-[#E2E8F0] bg-white focus-visible:ring-[#4FD1C5]"
                  />
                </div>

                <div className="flex min-h-0 flex-col gap-4">
                  <div className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-4">
                    <div className="text-xs uppercase tracking-[0.15em] text-[#64748B]">
                      Public URL
                    </div>
                    {publicUrl ? (
                      <>
                        <div className="mt-2 break-all text-sm font-medium text-[#1F2933]">
                          {publicUrl}
                        </div>
                        <div className="mt-1 text-sm font-semibold text-[#F17623]">
                          {normalizedUsername ? `@${normalizedUsername}` : '@username'}
                        </div>
                        <div className="mt-3 flex flex-wrap items-center gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-7 px-2 text-[#1D4ED8]"
                            onClick={handleCopyProfile}
                            disabled={!publicUrl}
                          >
                            <Copy className="mr-1 h-3.5 w-3.5" />
                            Copy link
                          </Button>
                          {canShare ? (
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
                      </>
                    ) : (
                      <div className="mt-2 rounded-2xl border border-dashed border-[#CBD5F5] p-4 text-sm text-[#64748B]">
                        Add a username in profile settings to generate your public link.
                      </div>
                    )}
                  </div>

                  <div className="rounded-2xl border border-[#E2E8F0] bg-white p-4">
                    <div className="text-xs uppercase tracking-[0.15em] text-[#64748B]">
                      Social Media Accounts
                    </div>
                    <div className="mt-3 grid gap-2 sm:grid-cols-2">
                      <div className="text-sm text-[#1F2933]">
                        <span className="font-semibold text-[#64748B]">TikTok:</span>{' '}
                        {socialAccounts.tiktok ? `@${socialAccounts.tiktok}` : '—'}
                      </div>
                      <div className="text-sm text-[#1F2933]">
                        <span className="font-semibold text-[#64748B]">YouTube:</span>{' '}
                        {socialAccounts.youtube ? `@${socialAccounts.youtube}` : '—'}
                      </div>
                      <div className="text-sm text-[#1F2933]">
                        <span className="font-semibold text-[#64748B]">Instagram:</span>{' '}
                        {socialAccounts.instagram ? `@${socialAccounts.instagram}` : '—'}
                      </div>
                      <div className="text-sm text-[#1F2933]">
                        <span className="font-semibold text-[#64748B]">Facebook:</span>{' '}
                        {socialAccounts.facebook ? `@${socialAccounts.facebook}` : '—'}
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-4">
                    <div className="text-xs uppercase tracking-[0.15em] text-[#64748B]">
                      Categories
                    </div>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {expertiseInput
                        .split(',')
                        .map(s => s.trim())
                        .filter(Boolean)
                        .map((s, i) => (
                          <span
                            key={`${s}-${i}`}
                            className="rounded-full bg-white px-2.5 py-0.5 text-xs font-medium text-[#0F172A] shadow-sm ring-1 ring-[#E2E8F0]"
                          >
                            {s}
                          </span>
                        ))}
                      {!expertiseInput.trim() ? (
                        <span className="text-sm text-[#64748B]">
                          Add categories in profile settings
                        </span>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Avatar crop/upload dialog (client-side validation + centered square crop) */}
        <Dialog
          open={cropDialogOpen}
          onOpenChange={open => {
            if (!open) closeCropDialog()
            setCropDialogOpen(open)
          }}
        >
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Crop Profile Photo</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {cropSourceUrl ? (
                <div className="relative overflow-hidden rounded-xl border border-[#E2E8F0] bg-white">
                  <img
                    src={cropSourceUrl}
                    alt="Avatar preview"
                    className="h-64 w-full object-cover"
                  />
                  <div className="pointer-events-none absolute inset-0 m-auto h-44 w-44 border-2 border-[#4FD1C5] opacity-90" />
                </div>
              ) : null}
              {croppedPreviewUrl ? (
                <div className="flex items-center gap-4">
                  <div className="text-sm font-medium text-[#1F2933]">Preview (256x256)</div>
                  <img
                    src={croppedPreviewUrl}
                    alt="Cropped avatar preview"
                    className="h-20 w-20 rounded-lg border border-[#E2E8F0] object-cover"
                  />
                </div>
              ) : null}
              <p className="text-xs text-[#64748B]">
                We will crop a centered 1:1 square and upload it as WebP. Server-side processing
                will also generate 64x64 and 128x128 versions.
              </p>
            </div>
            <DialogFooter className="gap-2 sm:gap-0">
              <Button
                variant="outline"
                onClick={closeCropDialog}
                disabled={cropping || uploadingAvatar}
              >
                Cancel
              </Button>
              <Button
                onClick={() => void confirmCropAndUpload()}
                disabled={cropping || uploadingAvatar || !cropSourceUrl}
              >
                {cropping ? 'Cropping...' : 'Crop & Upload'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Card className="border border-[#E2E8F0] shadow-sm">
          <CardHeader
            className="cursor-pointer select-none pb-3"
            onClick={() => setProfileSettingsOpen(prev => !prev)}
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
              <div className="grid gap-4 lg:grid-cols-2 lg:items-stretch">
                <div className="flex min-h-[280px] flex-col gap-2 lg:min-h-0">
                  <Label className="text-[#1F2933]">Edit Bio</Label>
                  <Textarea
                    value={bio}
                    onChange={e => setBio(e.target.value)}
                    disabled={loading || saving}
                    placeholder="Short bio for your public page..."
                    className="min-h-0 flex-1 resize-none border-[#E2E8F0] focus-visible:ring-[#4FD1C5]"
                  />
                </div>

                <div className="flex min-h-[280px] flex-col gap-4 lg:min-h-0">
                  <div className="space-y-3">
                    <Label className="text-[#1F2933]">Edit Social Media</Label>
                    <div className="grid gap-3 md:grid-cols-2">
                      <div className="space-y-1">
                        <Label className="text-xs text-[#64748B]">TikTok</Label>
                        <div className="flex rounded-md border border-[#E2E8F0] focus-within:ring-2 focus-within:ring-[#4FD1C5] focus-within:ring-offset-0">
                          <span className="inline-flex items-center pl-3 text-[#64748B]">@</span>
                          <Input
                            placeholder="username"
                            value={socialAccounts.tiktok.replace(/^@+/, '')}
                            onChange={e =>
                              setSocialAccounts(prev => ({
                                ...prev,
                                tiktok: e.target.value.replace(/^@+/, ''),
                              }))
                            }
                            disabled={loading || saving}
                            className="border-0 pl-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <Label className="text-xs text-[#64748B]">YouTube</Label>
                        <div className="flex rounded-md border border-[#E2E8F0] focus-within:ring-2 focus-within:ring-[#4FD1C5] focus-within:ring-offset-0">
                          <span className="inline-flex items-center pl-3 text-[#64748B]">@</span>
                          <Input
                            placeholder="username"
                            value={socialAccounts.youtube.replace(/^@+/, '')}
                            onChange={e =>
                              setSocialAccounts(prev => ({
                                ...prev,
                                youtube: e.target.value.replace(/^@+/, ''),
                              }))
                            }
                            disabled={loading || saving}
                            className="border-0 pl-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <Label className="text-xs text-[#64748B]">Instagram</Label>
                        <div className="flex rounded-md border border-[#E2E8F0] focus-within:ring-2 focus-within:ring-[#4FD1C5] focus-within:ring-offset-0">
                          <span className="inline-flex items-center pl-3 text-[#64748B]">@</span>
                          <Input
                            placeholder="username"
                            value={socialAccounts.instagram.replace(/^@+/, '')}
                            onChange={e =>
                              setSocialAccounts(prev => ({
                                ...prev,
                                instagram: e.target.value.replace(/^@+/, ''),
                              }))
                            }
                            disabled={loading || saving}
                            className="border-0 pl-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <Label className="text-xs text-[#64748B]">Facebook</Label>
                        <div className="flex rounded-md border border-[#E2E8F0] focus-within:ring-2 focus-within:ring-[#4FD1C5] focus-within:ring-offset-0">
                          <span className="inline-flex items-center pl-3 text-[#64748B]">@</span>
                          <Input
                            placeholder="username"
                            value={socialAccounts.facebook.replace(/^@+/, '')}
                            onChange={e =>
                              setSocialAccounts(prev => ({
                                ...prev,
                                facebook: e.target.value.replace(/^@+/, ''),
                              }))
                            }
                            disabled={loading || saving}
                            className="border-0 pl-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 border-t border-[#E2E8F0] pt-4">
                    <div className="flex items-center justify-between gap-3">
                      <Label className="text-[#1F2933]">Categories</Label>
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={() => setExpertiseAddOpen(true)}
                        disabled={loading || saving}
                        className="h-8 border-[#E2E8F0] bg-white px-3"
                      >
                        +Add
                      </Button>
                    </div>
                    <Input
                      value={expertiseInput}
                      onChange={e => setExpertiseInput(e.target.value)}
                      disabled={loading || saving}
                      placeholder="Comma-separated, e.g. Algebra, SAT Math, Physics"
                      className="border-[#E2E8F0] focus-visible:ring-[#4FD1C5]"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          )}
        </Card>
      </div>

      <Dialog
        open={expertiseAddOpen}
        onOpenChange={open => {
          setExpertiseAddOpen(open)
          if (!open) {
            setExpertiseAddSelected('')
            setExpertiseAddCustom('')
          }
        }}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add Category</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-[#1F2933]">From available categories</Label>
              <Select
                value={expertiseAddSelected}
                onValueChange={value => setExpertiseAddSelected(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {aggregatedCategories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-[#1F2933]">Custom (optional)</Label>
              <Input
                value={expertiseAddCustom}
                onChange={e => setExpertiseAddCustom(e.target.value)}
                placeholder="Type if not in the list"
                disabled={loading || saving}
              />
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              onClick={() => setExpertiseAddOpen(false)}
              disabled={loading || saving}
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleAddExpertise}
              disabled={loading || saving}
              className="bg-[#1D4ED8] text-white hover:bg-[#1B45C2]"
            >
              Add
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog
        open={createOpen}
        onOpenChange={open => {
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
                onChange={e => setCourseName(e.target.value)}
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
                  {SUBJECTS.map(subject => (
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
                onChange={e => setCourseDescription(e.target.value)}
                placeholder="Short description for your course..."
                disabled={creatingCourse}
              />
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>Categories</Label>
                <span className="text-xs text-[#64748B]">{courseCategories.length} selected</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {aggregatedCategories.map(category => {
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
