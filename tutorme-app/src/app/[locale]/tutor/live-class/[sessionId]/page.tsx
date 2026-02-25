'use client'

import { useParams } from 'next/navigation'
import { LiveClassHub } from '../components'

export default function LiveClassSessionPage() {
  const params = useParams()
  const sessionId = params.sessionId as string
  
  return <LiveClassHub sessionId={sessionId} />
}
