import { notFound, redirect } from 'next/navigation'

interface StudentLiveSessionPageProps {
  params: Promise<{
    sessionId?: string
  }>
}

export default async function StudentLiveSessionPage({ params }: StudentLiveSessionPageProps) {
  const { sessionId } = await params
  if (!sessionId) return notFound()
  redirect(`/student/feedback?sessionId=${sessionId}`)
}
