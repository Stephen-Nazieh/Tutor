'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ArrowLeft, Users, MessageCircle } from 'lucide-react'

export default function SubjectSignupPage() {
  const params = useParams()
  const subjectCode = typeof params.subjectCode === 'string' ? params.subjectCode : ''

  const subjectLabel = subjectCode.charAt(0).toUpperCase() + subjectCode.slice(1).replace(/-/g, ' ')
  const coursesUrl = `/student/subjects/${encodeURIComponent(subjectCode)}/courses`
  const aiChatUrl = `/student/subjects/${encodeURIComponent(subjectCode)}/chat`

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto p-4 sm:p-6">
        <Link
          href="/student/dashboard"
          className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to dashboard
        </Link>

        <Card>
          <CardHeader>
            <CardTitle>Sign up for {subjectLabel}</CardTitle>
            <CardDescription>
              Choose how you want to learn: with a human tutor in live classes or with the AI tutor anytime.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="human" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="human" className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Human
                </TabsTrigger>
                <TabsTrigger value="ai" className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  AI
                </TabsTrigger>
              </TabsList>
              <TabsContent value="human" className="mt-6 space-y-4">
                <p className="text-sm text-muted-foreground">
                  Join live classes with a human tutor. Book sessions that fit your schedule and get
                  real-time help in a small group.
                </p>
                <Button asChild className="w-full sm:w-auto">
                  <Link href={coursesUrl}>Continue</Link>
                </Button>
              </TabsContent>
              <TabsContent value="ai" className="mt-6 space-y-4">
                <p className="text-sm text-muted-foreground">
                  Learn with the AI tutor 24/7. Get Socratic-style guidance, practice conversations,
                  and instant feedback at your own pace.
                </p>
                <Button asChild className="w-full sm:w-auto">
                  <Link href={aiChatUrl}>Start with AI tutor</Link>
                </Button>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
