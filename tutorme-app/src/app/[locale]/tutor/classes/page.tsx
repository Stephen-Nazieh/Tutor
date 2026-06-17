'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function TutorClassesPage() {
  const router = useRouter()

  useEffect(() => {
    router.replace('/tutor/settings')
  }, [router])

  return null
}
