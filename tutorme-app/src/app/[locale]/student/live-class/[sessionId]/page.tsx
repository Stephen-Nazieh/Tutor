import { redirect } from 'next/navigation'

interface StudentLiveClassRedirectProps {
  params?: {
    sessionId?: string
  }
}

export default function StudentLiveClassRedirect({
  params,
}: StudentLiveClassRedirectProps) {
  const sessionId = params?.sessionId
  if (!sessionId) redirect('/student/dashboard')
  redirect(`/student/live/${sessionId}`)
}
