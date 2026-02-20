'use client'

import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Star, Users, Calendar, Clock } from 'lucide-react'

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
        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        <span className="font-medium">{rating.toFixed(1)}</span>
        <span className="text-gray-500 text-sm">({tutor.reviewCount} reviews)</span>
      </div>
    )
  }

  // Format price display
  const formatPrice = () => {
    if (tutor.hourlyRate === null) {
      return <span className="text-gray-500">Contact for pricing</span>
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
      return <span className="text-gray-500">Check availability</span>
    }
    const date = new Date(tutor.nextAvailableSlot)
    return (
      <span className="text-green-600 flex items-center gap-1">
        <Calendar className="w-3 h-3" />
        Available {date.toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric' 
        })}
      </span>
    )
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Avatar and Basic Info */}
          <div className="flex items-start gap-4 flex-1">
            <Avatar className="w-16 h-16 border-2 border-gray-100">
              <AvatarImage src={tutor.avatar || undefined} alt={tutor.name} />
              <AvatarFallback className="text-lg bg-blue-100 text-blue-600">
                {initials}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-lg truncate">{tutor.name}</h3>
              
              {/* Rating */}
              <div className="mt-1">
                {renderStars(tutor.rating)}
              </div>
              
              {/* Bio - truncated */}
              <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                {tutor.bio}
              </p>
              
              {/* Stats */}
              <div className="flex flex-wrap items-center gap-3 mt-3 text-sm text-gray-500">
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  {tutor.totalStudents} students
                </Badge>
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {tutor.totalClasses} classes
                </Badge>
              </div>
            </div>
          </div>
          
          {/* Price and Action */}
          <div className="flex flex-col items-start sm:items-end justify-between gap-3 sm:border-l sm:pl-4 sm:min-w-[160px]">
            <div className="text-right">
              <div className="text-lg">{formatPrice()}</div>
              <div className="text-sm mt-1">{formatAvailability()}</div>
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
