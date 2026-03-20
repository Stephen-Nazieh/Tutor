'use client'

import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ChevronRight } from 'lucide-react'

export function AIInsightsCard() {
  const router = useRouter()
  return (
    <Card className="border border-slate-200 bg-white/95 shadow-xl backdrop-blur-md">
      <CardHeader>
        <CardTitle>AI Insights</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="rounded-lg border border-slate-200 bg-yellow-50 p-3">
            <p className="text-sm font-medium text-yellow-800">Attention Needed</p>
            <p className="mt-1 text-sm text-yellow-700">
              3 students struggling with systems of equations
            </p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-green-50 p-3">
            <p className="text-sm font-medium text-green-800">Good Progress</p>
            <p className="mt-1 text-sm text-green-700">85% mastered linear equations</p>
          </div>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => router.push('/tutor/reports')}
          >
            View Full Report <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
