'use client'

import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Star, Users, Calendar, Clock } from 'lucide-react'
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
        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
        <span className="font-medium text-foreground">{rating.toFixed(1)}</span>
        <span className="text-sm text-muted-foreground">({tutor.reviewCount} reviews)</span>
      </div>
    )
  }

  // Format price display
  const formatPrice = () => {
    if (tutor.hourlyRate === null) {
      return <span className="text-muted-foreground">Contact for pricing</span>
    }
    return (
      <span className="font-semibold text-green-600">
        {tutor.currency} {tutor.hourlyRate.toFixed(2)}/hr
      </span>
    )
  }

  // Format next available slot
  const formatAvailability = () => {
    if (!tutor.nextAvailableSlot) {
      return <span className="text-muted-foreground">Check availability</span>
    }
    const date = new Date(tutor.nextAvailableSlot)
    return (
      <span className="flex items-center gap-1 text-green-600">
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
    <Card
      className={cn(
        'transition-all hover:-translate-y-0.5 hover:shadow-md',
        'border-border bg-card'
      )}
    >
      <CardContent className="p-4">
        <div className="flex flex-col gap-4 sm:flex-row">
          {/* Avatar and Basic Info */}
          <div className="flex flex-1 items-start gap-4">
            <Avatar className="h-16 w-16 border-2 border-border">
              <AvatarImage src={tutor.avatar || undefined} alt={tutor.name} />
              <AvatarFallback className="bg-primary/10 text-lg text-primary">
                {initials}
              </AvatarFallback>
            </Avatar>

            <div className="min-w-0 flex-1">
              <h3 className="truncate text-lg font-semibold text-foreground">{tutor.name}</h3>

              {/* Rating */}
              <div className="mt-1">{renderStars(tutor.rating)}</div>

              {/* Bio - truncated */}
              <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{tutor.bio}</p>

              {/* Stats */}
              <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <Badge variant="secondary" className="flex items-center gap-1 bg-muted">
                  <Users className="h-3 w-3" />
                  {tutor.totalStudents} students
                </Badge>
                <Badge variant="secondary" className="flex items-center gap-1 bg-muted">
                  <Clock className="h-3 w-3" />
                  {tutor.totalClasses} classes
                </Badge>
              </div>
            </div>
          </div>

          {/* Price and Action */}
          <div className="flex flex-col items-start justify-between gap-3 sm:min-w-[160px] sm:items-end sm:border-l sm:border-border sm:pl-4">
            <div className="text-right">
              <div className="text-lg text-foreground">{formatPrice()}</div>
              <div className="mt-1 text-sm">{formatAvailability()}</div>
            </div>

            <Button asChild className="w-full sm:w-auto">
              <Link href={`/student/classes?tutor=${tutor.id}&subject=${subjectCode}`}>
                Book Session
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
