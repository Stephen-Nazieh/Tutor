'use client'

import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Sparkles } from 'lucide-react'

export default function AITutorHubPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <Card className="w-full max-w-2xl border border-dashed">
        <CardHeader>
          <CardTitle className="text-2xl">AI Tutor — Coming Soon</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-gray-700">
          <div className="flex items-start gap-3">
            <Sparkles className="h-6 w-6 text-blue-600" />
            <p>
              AI Tutor will provide Socratic-style guidance, personalized practice prompts,
              and instant feedback while keeping you on track with your learning goals.
            </p>
          </div>
          <ul className="list-disc list-inside text-sm text-gray-600">
            <li>Step-by-step hints without giving away the answer.</li>
            <li>Adaptive practice based on your strengths and gaps.</li>
            <li>Session summaries you can review anytime.</li>
          </ul>
          <div className="flex flex-wrap gap-2">
            <Button asChild>
              <Link href="/student/dashboard">Back to dashboard</Link>
            </Button>
            <Button variant="outline" disabled>
              Notify me when it launches
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
