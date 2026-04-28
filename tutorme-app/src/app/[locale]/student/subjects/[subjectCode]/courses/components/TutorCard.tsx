'use client'

import Link from 'next/link'
import { Star, Calendar } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Tutor {
  id: string
  name: string
  avatar: string | null
  bio: string
  rating: number
  reviewCount: number
  hourlyRate: number | null
  currency: string
  nextAvailableSlot: string | null
  totalStudents: number
  totalClasses: number
}

interface TutorCardProps {
  tutor: Tutor
  subjectCode: string
}

export function TutorCard({ tutor, subjectCode }: TutorCardProps) {
  // Generate initials for avatar fallback
  const initials = tutor.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  // Format rating display
  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
        <span className="ml-1 text-lg font-medium text-slate-100">{rating.toFixed(1)}</span>
        <span className="ml-1 text-sm text-slate-400">({tutor.reviewCount})</span>
      </div>
    )
  }

  // Format price display
  const formatPrice = () => {
    if (tutor.hourlyRate === null) {
      return <span className="text-slate-300">Contact for pricing</span>
    }
    return (
      <span className="font-semibold text-slate-100">
        {tutor.currency} {tutor.hourlyRate.toFixed(2)}
        <span className="text-sm font-normal text-slate-400">/hr</span>
      </span>
    )
  }

  // Format next available slot
  const formatAvailability = () => {
    if (!tutor.nextAvailableSlot) {
      return <span className="text-slate-400">Check availability</span>
    }
    const date = new Date(tutor.nextAvailableSlot)
    return (
      <span className="flex items-center justify-end gap-1 text-emerald-400">
        <Calendar className="h-3 w-3" />
        Available{' '}
        {date.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
        })}
      </span>
    )
  }

  return (
    <div
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-[20px] text-left transition-all duration-300',
        'border border-[rgba(255,255,255,0.12)]',
        'bg-[rgba(30,40,50,0.65)] backdrop-blur-[12px]',
        'shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_12px_30px_rgba(0,0,0,0.35)]',
        'hover:-translate-y-[2px] hover:brightness-105',
        'hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_14px_30px_rgba(0,0,0,0.40)]',
        'h-full min-h-[420px]'
      )}
      style={{
        backgroundImage:
          'linear-gradient(120deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 40%, rgba(255,255,255,0.00) 65%), linear-gradient(145deg, rgba(70, 110, 180, 0.75), rgba(25, 55, 110, 0.95))',
      }}
    >
      <div className="flex h-full flex-col p-5">
        {/* Header Zone — fixed height */}
        <div className="flex min-h-[112px] items-start gap-4">
          {/* Avatar */}
          <div className="h-24 w-24 shrink-0 overflow-hidden rounded-[16px] border border-[rgba(255,255,255,0.15)] bg-[rgba(255,255,255,0.03)] shadow-[0_6px_16px_rgba(0,0,0,0.35)] sm:h-28 sm:w-28">
            <img
              src={tutor.avatar || undefined}
              alt={tutor.name}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="flex min-w-0 flex-1 flex-col pt-1">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="truncate text-xl font-semibold leading-tight text-slate-50">{tutor.name}</h3>
                <p className="mt-1 text-sm font-medium text-slate-300">
                  @{tutor.name.toLowerCase().replace(/\s+/g, '')}
                </p>
              </div>
              <button className="rounded-full border border-[rgba(255,255,255,0.25)] bg-[rgba(255,255,255,0.08)] px-4 py-1.5 text-sm font-medium text-slate-100 backdrop-blur-[6px] transition-colors hover:bg-[rgba(255,255,255,0.15)]">
                Follow
              </button>
            </div>

            {/* Bio - truncated */}
            <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-slate-300">{tutor.bio}</p>
          </div>
        </div>

        {/* Rating Zone */}
        <div className="mt-2 min-h-[28px]">{renderStars(tutor.rating)}</div>

        {/* Tags Zone — fixed height, overflow hidden */}
        <div className="mt-3 min-h-[56px] max-h-[56px] overflow-hidden">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.08)] px-3 py-1 text-sm text-slate-200">
              IGCSE Physics
            </span>
            <span className="rounded-full border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.08)] px-3 py-1 text-sm text-slate-200">
              TOEFL iBT
            </span>
            <span className="rounded-full border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.08)] px-3 py-1 text-sm text-slate-200">
              general
            </span>
            <span className="rounded-full border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.08)] px-3 py-1 text-sm text-slate-200">
              +2
            </span>
            <span className="rounded-full border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.08)] px-3 py-1 text-sm text-slate-200">
              Kuwait
            </span>
            <span className="rounded-full border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.08)] px-3 py-1 text-sm text-slate-200">
              Qatar
            </span>
            <span className="rounded-full border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.08)] px-3 py-1 text-sm text-slate-200">
              Global
            </span>
            <span className="rounded-full border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.08)] px-3 py-1 text-sm text-slate-200">
              +2
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="my-3 border-b border-[rgba(255,255,255,0.1)]" />

        {/* Stats Zone — fixed height */}
        <div className="min-h-[72px] grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.04)] p-3">
            <p className="mb-1 text-xs text-slate-300">Courses</p>
            <p className="text-lg font-semibold text-slate-100">{tutor.totalClasses}</p>
          </div>
          <div className="rounded-xl border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.04)] p-3">
            <p className="mb-1 text-xs text-slate-300">Enrollments</p>
            <p className="text-lg font-semibold text-slate-100">{tutor.totalStudents}</p>
          </div>
        </div>

        {/* Spacer */}
        <div className="flex-grow" />

        {/* CTA Zone — bottom anchored */}
        <div className="mt-auto pt-2">
          <div className="flex items-center justify-between">
            <Link
              href={`/student/classes?tutor=${tutor.id}&subject=${subjectCode}`}
              className="flex items-center gap-2 text-slate-100 transition-colors hover:text-white"
            >
              <Calendar className="h-6 w-6 text-[rgba(255,255,255,0.8)]" />
              <span className="text-lg font-medium">Book 1 on 1</span>
            </Link>
            <div className="text-right">
              <div className="text-lg text-slate-100">{formatPrice()}</div>
              <div className="mt-1 text-sm">{formatAvailability()}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
