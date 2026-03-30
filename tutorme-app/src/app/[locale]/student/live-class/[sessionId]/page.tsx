import { redirect } from 'next/navigation'

interface StudentLiveClassRedirectProps {
  params: Promise<{
    sessionId?: string
  }>
}

export default async function StudentLiveClassRedirect({ params }: StudentLiveClassRedirectProps) {
  const { sessionId } = await params
  if (!sessionId) redirect('/student/dashboard')
  redirect(`/student/feedback?sessionId=${sessionId}`)
}
