import { notFound, redirect } from 'next/navigation'

interface StudentLiveSessionPageProps {
  params?: {
    sessionId?: string
  }
}

export default function StudentLiveSessionPage({ params }: StudentLiveSessionPageProps) {
  const sessionId = params?.sessionId
  if (!sessionId) return notFound()
  redirect(`/student/feedback?sessionId=${sessionId}`)
}
