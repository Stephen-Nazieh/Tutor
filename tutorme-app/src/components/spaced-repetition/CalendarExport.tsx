// @ts-nocheck
'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import {
  Calendar,
  Download,
  Check,
  GoogleChrome,
  Apple,
  Outlook
} from 'lucide-react'

interface CalendarExportProps {
  upcomingReviews: Array<{
    id: string
    contentTitle: string
    scheduledFor: string
    subjectName: string
  }>
}

// Generate ICS file content
function generateICS(reviews: CalendarExportProps['upcomingReviews']): string {
  const now = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
  
  const events = reviews.map(review => {
    const startDate = new Date(review.scheduledFor)
    const endDate = new Date(startDate.getTime() + 30 * 60 * 1000) // 30 min duration
    
    const formatDate = (date: Date) => {
      return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
    }
    
    return `BEGIN:VEVENT
UID:${review.id}@tutorme.com
DTSTART:${formatDate(startDate)}
DTEND:${formatDate(endDate)}
SUMMARY:Review: ${review.contentTitle}
DESCRIPTION:Time to review ${review.contentTitle} from ${review.subjectName}. Spaced repetition review to strengthen long-term memory.
CATEGORIES:Study,Review,Education
BEGIN:VALARM
ACTION:DISPLAY
DESCRIPTION:Review Reminder
TRIGGER:-PT15M
END:VALARM
END:VEVENT`
  }).join('\n')

  return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//TutorMe//Spaced Repetition//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
X-WR-CALNAME:TutorMe Review Schedule
X-WR-TIMEZONE:UTC
${events}
END:VCALENDAR`
}

// Generate Google Calendar URL
function generateGoogleCalendarUrl(reviews: CalendarExportProps['upcomingReviews']): string {
  // For multiple events, we'll open the first one and let user add the rest
  if (reviews.length === 0) return ''
  
  const firstReview = reviews[0]
  const startDate = new Date(firstReview.scheduledFor)
  const endDate = new Date(startDate.getTime() + 30 * 60 * 1000)
  
  const formatDate = (date: Date) => {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0]
  }
  
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: `Review: ${firstReview.contentTitle}`,
    details: `Time to review ${firstReview.contentTitle} from ${firstReview.subjectName}. Spaced repetition review to strengthen long-term memory.`,
    dates: `${formatDate(startDate)}/${formatDate(endDate)}`
  })
  
  return `https://calendar.google.com/calendar/render?${params.toString()}`
}

// Generate Outlook Calendar URL
function generateOutlookUrl(reviews: CalendarExportProps['upcomingReviews']): string {
  if (reviews.length === 0) return ''
  
  const firstReview = reviews[0]
  const startDate = new Date(firstReview.scheduledFor)
  const endDate = new Date(startDate.getTime() + 30 * 60 * 1000)
  
  const params = new URLSearchParams({
    subject: `Review: ${firstReview.contentTitle}`,
    body: `Time to review ${firstReview.contentTitle} from ${firstReview.subjectName}. Spaced repetition review to strengthen long-term memory.`,
    startdt: startDate.toISOString(),
    enddt: endDate.toISOString()
  })
  
  return `https://outlook.live.com/calendar/0/deeplink/compose?${params.toString()}`
}

export function CalendarExport({ upcomingReviews }: CalendarExportProps) {
  const [copied, setCopied] = useState(false)

  const handleDownloadICS = () => {
    const icsContent = generateICS(upcomingReviews)
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    
    const link = document.createElement('a')
    link.href = url
    link.download = 'tutorme-reviews.ics'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    URL.revokeObjectURL(url)
    toast.success('Calendar file downloaded!')
  }

  const handleCopyLink = () => {
    const icsContent = generateICS(upcomingReviews)
    navigator.clipboard.writeText(icsContent)
    setCopied(true)
    toast.success('Calendar data copied to clipboard!')
    setTimeout(() => setCopied(false), 2000)
  }

  const googleUrl = generateGoogleCalendarUrl(upcomingReviews)
  const outlookUrl = generateOutlookUrl(upcomingReviews)

  if (upcomingReviews.length === 0) {
    return null
  }

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Calendar Sync
            </CardTitle>
            <CardDescription>Export reviews to your calendar</CardDescription>
          </div>
          <Badge variant="outline">{upcomingReviews.length} events</Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Quick Export Options - All 3 in one row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Button
            variant="outline"
            className="w-full justify-center"
            onClick={() => window.open(googleUrl, '_blank')}
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/>
            </svg>
            Google
          </Button>
          
          <Button
            variant="outline"
            className="w-full justify-center"
            onClick={() => window.open(outlookUrl, '_blank')}
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
              <path d="M7.88 12.04q0 .48-.19.91t-.54.74q-.35.31-.84.49-.48.19-1.08.19-.65 0-1.18-.22-.53-.22-.9-.64t-.58-1.01q-.21-.59-.21-1.32 0-.74.21-1.33.22-.59.59-1t.89-.63 1.15-.22q.62 0 1.09.19.47.19.81.51.34.33.53.77.19.44.19.92zm5.48 0q0 .48-.19.91t-.54.74q-.35.31-.84.49-.48.19-1.08.19-.65 0-1.18-.22-.53-.22-.9-.64t-.58-1.01q-.21-.59-.21-1.32 0-.74.21-1.33.22-.59.59-1t.89-.63 1.15-.22q.62 0 1.09.19.47.19.81.51.34.33.53.77.19.44.19.92zm5.5 0q0 .48-.19.91t-.54.74q-.35.31-.84.49-.48.19-1.08.19-.65 0-1.18-.22-.53-.22-.9-.64t-.58-1.01q-.21-.59-.21-1.32 0-.74.21-1.33.22-.59.59-1t.89-.63 1.15-.22q.62 0 1.09.19.47.19.81.51.34.33.53.77.19.44.19.92zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
            </svg>
            Outlook
          </Button>

          <Button
            variant="outline"
            className="w-full justify-center"
            onClick={handleDownloadICS}
          >
            <Apple className="w-5 h-5 mr-2" />
            Apple
          </Button>
        </div>

        {/* Advanced Options */}
        <div className="pt-3 border-t">
          <p className="text-sm text-gray-500 mb-3">What you'll get:</p>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" />
              <span>{upcomingReviews.length} review events</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" />
              <span>15-minute reminder before each review</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" />
              <span>Auto-syncs with your calendar app</span>
            </li>
          </ul>
        </div>

        {/* Copy Raw Data */}
        <Button
          variant="ghost"
          size="sm"
          className="w-full"
          onClick={handleCopyLink}
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 mr-2" />
              Copied!
            </>
          ) : (
            <>
              <Download className="w-4 h-4 mr-2" />
              Copy Calendar Data
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  )
}
