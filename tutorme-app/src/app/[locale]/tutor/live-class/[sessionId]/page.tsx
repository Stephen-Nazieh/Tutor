import { LiveClassHub } from '../components'
import { notFound } from 'next/navigation'

interface LiveClassPageProps {
  params?: {
    sessionId?: string
  }
}

export default function LiveClassPage({ params }: LiveClassPageProps) {
  const sessionId = params?.sessionId
  if (!sessionId) return notFound()
  return <LiveClassHub sessionId={sessionId} />
}
