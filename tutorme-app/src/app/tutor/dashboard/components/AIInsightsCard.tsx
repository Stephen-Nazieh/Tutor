'use client'

import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ChevronRight } from 'lucide-react'

export function AIInsightsCard() {
  const router = useRouter()
  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Insights</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
            <p className="text-sm font-medium text-yellow-800">Attention Needed</p>
            <p className="text-sm text-yellow-700 mt-1">3 students struggling with systems of equations</p>
          </div>
          <div className="p-3 bg-green-50 rounded-lg border border-green-200">
            <p className="text-sm font-medium text-green-800">Good Progress</p>
            <p className="text-sm text-green-700 mt-1">85% mastered linear equations</p>
          </div>
          <Button variant="outline" className="w-full" onClick={() => router.push('/tutor/reports')}>
            View Full Report <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
