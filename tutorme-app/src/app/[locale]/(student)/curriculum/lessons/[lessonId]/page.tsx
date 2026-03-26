'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function RedirectToFeedbackPage() {
  const router = useRouter()

  useEffect(() => {
    router.replace('/student/feedback')
  }, [router])

  return (
    <div className="flex h-screen items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-indigo-600"></div>
        <p className="text-gray-600">Entering classroom...</p>
      </div>
    </div>
  )
}
