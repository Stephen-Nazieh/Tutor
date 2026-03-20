'use client'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { GraduationCap, Lock } from 'lucide-react'

export default function LearningPage() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="flex items-center gap-2 text-2xl font-bold">
          <GraduationCap className="h-6 w-6 text-blue-500" />
          Learning
        </h1>
        <p className="text-muted-foreground">Professional development resources for tutors</p>
      </div>

      <Card className="border-dashed">
        <CardContent className="py-12 text-center">
          <Lock className="mx-auto mb-4 h-12 w-12 text-gray-300" />
          <h3 className="mb-2 text-lg font-medium text-gray-700">Coming Soon</h3>
          <p className="mx-auto max-w-md text-gray-500">
            Learning resources and professional development modules will be available here soon.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
