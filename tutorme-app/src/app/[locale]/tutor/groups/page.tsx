'use client'

import { useRouter } from 'next/navigation'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Users, Sparkles } from 'lucide-react'

export default function TutorGroupsComingSoon() {
  const router = useRouter()

  return (
    <Dialog open onOpenChange={(open) => { if (!open) router.push('/tutor/dashboard') }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-blue-500" />
            Groups Coming Soon
          </DialogTitle>
          <DialogDescription>
            Groups will let you organize students into cohorts, assign shared courses, and manage schedules in one place.
          </DialogDescription>
        </DialogHeader>
        <div className="rounded-md border bg-muted/40 p-3 text-sm text-muted-foreground">
          <div className="flex items-start gap-2">
            <Sparkles className="h-4 w-4 text-blue-500 mt-0.5" />
            <span>We’re building cohort tools, group scheduling, and bulk assignments.</span>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={() => router.push('/tutor/dashboard')}>
            Back to Dashboard
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
