'use client'

import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BookOpen, Settings } from 'lucide-react'

export function QuickActionsCard() {
  const router = useRouter()
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Button variant="outline" className="w-full justify-start" onClick={() => router.push('/tutor/reports')}>
            <BookOpen className="w-4 h-4 mr-2" /> View Reports
          </Button>
          <Button variant="outline" className="w-full justify-start" onClick={() => router.push('/tutor/settings')}>
            <Settings className="w-4 h-4 mr-2" /> Settings
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
