'use client'

import { useEffect, useState } from 'react'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Loader2, Users, DollarSign } from 'lucide-react'
import { BackButton } from '@/components/navigation'
import { toast } from 'sonner'

interface EnrollmentItem {
  id: string
  studentId: string
  studentName: string
  studentEmail: string | null
  batchId: string | null
  batchName: string | null
  enrolledAt: string
  lastActivity: string
  lessonsCompleted: number
  completedAt: string | null
}

interface PendingRefund {
  refundId: string
  amount: number
  currency: string
  reason: string | null
  createdAt: string
  courseName: string | null
}

export default function TutorCourseEnrollmentsPage() {
  const params = useParams()
  const pathname = usePathname()
  const router = useRouter()
  const courseId = typeof params?.id === 'string' ? params.id : ''
  const locale = typeof params?.locale === 'string' ? params.locale : 'en'
  const hasLocalePrefix = pathname.startsWith(`/${locale}/`)
  const coursePath = hasLocalePrefix ? `/${locale}/tutor/dashboard` : `/tutor/dashboard`

  const [loading, setLoading] = useState(true)
  const [enrollments, setEnrollments] = useState<EnrollmentItem[]>([])
  const [refunds, setRefunds] = useState<PendingRefund[]>([])
  const [approvingId, setApprovingId] = useState<string | null>(null)

  useEffect(() => {
    if (!courseId) return
    fetch(`/api/tutor/refunds?courseId=${encodeURIComponent(courseId)}`, { credentials: 'include' })
      .then(r => (r.ok ? r.json() : { refunds: [] }))
      .then(d => setRefunds(Array.isArray(d?.refunds) ? d.refunds : []))
      .catch(() => setRefunds([]))
  }, [courseId])

  const handleApproveRefund = async (refundId: string) => {
    setApprovingId(refundId)
    try {
      const csrfRes = await fetch('/api/csrf', { credentials: 'include' })
      const csrfToken = (await csrfRes.json().catch(() => ({})))?.token ?? null
      const res = await fetch(`/api/tutor/refunds/${refundId}/approve`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(csrfToken && { 'X-CSRF-Token': csrfToken }),
        },
        credentials: 'include',
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        toast.error(data?.error || 'Could not approve refund')
        return
      }
      toast.success('Refund approved and sent to the gateway')
      setRefunds(prev => prev.filter(r => r.refundId !== refundId))
    } catch {
      toast.error('Could not approve refund')
    } finally {
      setApprovingId(null)
    }
  }

  useEffect(() => {
    if (!courseId) return
    const loadEnrollments = async () => {
      setLoading(true)
      try {
        const res = await fetch(`/api/tutor/courses/${courseId}/enrollments`, {
          credentials: 'include',
        })
        if (!res.ok) throw new Error('Failed to load enrollments')
        const data = await res.json()
        setEnrollments(data.enrollments ?? [])
      } catch (error) {
        toast.error(error instanceof Error ? error.message : 'Failed to load enrollments')
      } finally {
        setLoading(false)
      }
    }

    loadEnrollments()
  }, [courseId])

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6 p-4 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-semibold text-slate-900">
            <Users className="h-5 w-5" />
            Course Enrollments
          </h1>
          <p className="text-muted-foreground text-sm">
            Track students currently enrolled in this course.
          </p>
        </div>
        <BackButton href={coursePath} iconDirection="right" />
      </div>

      {refunds.length > 0 && (
        <Card className="border-amber-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-amber-700">
              <DollarSign className="h-5 w-5" />
              Pending refunds ({refunds.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {refunds.map(r => (
              <div
                key={r.refundId}
                className="flex flex-wrap items-start justify-between gap-4 rounded-lg border border-amber-200 bg-amber-50/50 p-4"
              >
                <div className="min-w-0">
                  <p className="font-semibold text-slate-900">
                    {r.currency} {Number(r.amount).toFixed(2)}
                  </p>
                  <p className="text-muted-foreground mt-0.5 text-xs">
                    {r.reason || 'Refund requested'}
                  </p>
                  <p className="text-muted-foreground mt-1 text-[11px]">
                    Requested {new Date(r.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <Button
                  size="sm"
                  onClick={() => handleApproveRefund(r.refundId)}
                  disabled={approvingId !== null}
                  className="bg-amber-600 text-white hover:bg-amber-700"
                >
                  {approvingId === r.refundId ? (
                    <Loader2 className="mr-1 h-3.5 w-3.5 animate-spin" />
                  ) : null}
                  Approve refund
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Enrolled Students</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {loading ? (
            <div className="flex h-40 items-center justify-center">
              <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
            </div>
          ) : enrollments.length === 0 ? (
            <div className="text-muted-foreground rounded-lg border border-dashed p-6 text-center text-sm">
              No students enrolled yet.
            </div>
          ) : (
            enrollments.map(enrollment => (
              <div
                key={enrollment.id}
                className="flex flex-wrap items-start justify-between gap-4 rounded-lg border bg-white p-4"
              >
                <div className="min-w-0">
                  <p className="font-semibold text-slate-900">{enrollment.studentName}</p>
                  <p className="text-muted-foreground text-xs">
                    {enrollment.studentEmail || 'No email on file'}
                  </p>
                  <div className="text-muted-foreground mt-2 flex flex-wrap items-center gap-2 text-xs">
                    <span>Enrolled {new Date(enrollment.enrolledAt).toLocaleDateString()}</span>
                    {enrollment.batchName ? <span>• {enrollment.batchName}</span> : null}
                    {enrollment.completedAt ? <span>• Completed</span> : null}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{enrollment.lessonsCompleted} lessons</Badge>
                  {enrollment.completedAt ? (
                    <Badge>Completed</Badge>
                  ) : (
                    <Badge variant="outline">Active</Badge>
                  )}
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  )
}
