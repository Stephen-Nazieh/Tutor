import { notFound, redirect } from 'next/navigation'

interface LiveClassPageProps {
  params?: {
    sessionId?: string
  }
}

export default function LiveClassPage({ params }: LiveClassPageProps) {
  const sessionId = params?.sessionId
  if (!sessionId) return notFound()
  redirect(`/tutor/insights?sessionId=${sessionId}`)
}
