'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Search, Compass, Users } from 'lucide-react'

interface PublicTutorSummary {
  id: string
  name: string
  username: string
  bio: string
  avatarUrl: string | null
  specialties: string[]
  hourlyRate: number | null
  courseCount: number
  totalEnrollments: number
  subjects: string[]
}

function initials(name: string) {
  return name
    .split(' ')
    .map((part) => part[0] || '')
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

export default function PublicTutorDirectoryPage() {
  const params = useParams()
  const locale = typeof params?.locale === 'string' ? params.locale : 'en'
  const [search, setSearch] = useState('')
  const [tutors, setTutors] = useState<PublicTutorSummary[]>([])
  const [loading, setLoading] = useState(true)

  const query = useMemo(() => search.trim(), [search])

  useEffect(() => {
    let active = true
    const timeout = setTimeout(async () => {
      setLoading(true)
      try {
        const res = await fetch(`/api/public/tutors?q=${encodeURIComponent(query)}`, { cache: 'no-store' })
        const data = await res.json().catch(() => ({}))
        if (!active) return
        setTutors(Array.isArray(data?.tutors) ? data.tutors : [])
      } catch {
        if (!active) return
        setTutors([])
      } finally {
        if (active) setLoading(false)
      }
    }, 300)

    return () => {
      active = false
      clearTimeout(timeout)
    }
  }, [query])

  return (
    <div className="w-full p-4 sm:p-6">
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-2xl sm:text-3xl">Find Your Tutor</CardTitle>
          <CardDescription>Browse verified tutors and view their public profiles.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, subject, or handle"
                className="pl-9"
              />
            </div>
            <Button variant="outline" asChild>
              <Link href={`/${locale}`}>Back Home</Link>
            </Button>
          </div>

          {loading ? (
            <div className="rounded-lg border bg-white p-6 text-sm text-muted-foreground">Loading tutors...</div>
          ) : tutors.length === 0 ? (
            <div className="rounded-lg border bg-white p-6 text-sm text-muted-foreground">
              No tutors found. Try a different search.
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {tutors.map((tutor) => (
                <Card key={tutor.id} className="border border-slate-200">
                  <CardContent className="space-y-3 p-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={tutor.avatarUrl || undefined} alt={tutor.name} />
                        <AvatarFallback>{initials(tutor.name)}</AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <p className="truncate text-base font-semibold text-slate-900">{tutor.name}</p>
                        <p className="text-sm text-slate-500">@{tutor.username}</p>
                      </div>
                    </div>
                    <p className="line-clamp-2 text-sm text-slate-600">{tutor.bio || 'Tutor profile available.'}</p>
                    <div className="flex flex-wrap gap-1">
                      {tutor.specialties.slice(0, 3).map((specialty) => (
                        <Badge key={specialty} variant="secondary">
                          {specialty}
                        </Badge>
                      ))}
                      {tutor.specialties.length === 0 ? <Badge variant="outline">General</Badge> : null}
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                      <span className="flex items-center gap-1"><Users className="h-3 w-3" />{tutor.totalEnrollments} students</span>
                      <span className="flex items-center gap-1"><Compass className="h-3 w-3" />{tutor.courseCount} courses</span>
                    </div>
                    <Button asChild size="sm" className="w-full">
                      <Link href={`/${locale}/u/${tutor.username}`}>View Profile</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
