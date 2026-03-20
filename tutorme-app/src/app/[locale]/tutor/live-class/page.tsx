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
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
        <p className="text-gray-600">Redirecting to My Classes...</p>
      </div>
    </div>
  )
}
