import { notFound, redirect } from 'next/navigation'

interface LiveClassPageProps {
  params: Promise<{
    sessionId?: string
  }>
}

export default async function LiveClassPage({ params }: LiveClassPageProps) {
  const { sessionId } = await params
  if (!sessionId) return notFound()
  redirect(`/tutor/insights?sessionId=${sessionId}`)
}
