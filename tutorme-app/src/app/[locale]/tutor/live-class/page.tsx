'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

// This page now redirects to the combined My Classes page
export default function LiveClassRedirectPage() {
  const router = useRouter()

  useEffect(() => {
    router.replace('/tutor/classes')
  }, [router])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4" />
        <p className="text-gray-600">Redirecting to My Classes...</p>
      </div>
    </div>
  )
}
