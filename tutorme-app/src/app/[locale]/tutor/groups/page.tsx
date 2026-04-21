'use client'

import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'

export default function TutorGroupsPage() {
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // If the first path segment is a locale, keep it. Otherwise, it's just /tutor/...
    const segments = pathname.split('/').filter(Boolean)
    const possibleLocale = segments[0]
    
    // Check if it's a known locale (we'll just check length or common ones for safety, or simply use relative routing)
    if (possibleLocale && ['en', 'zh-CN', 'es', 'fr', 'de', 'ja', 'ko', 'pt', 'ru', 'ar'].includes(possibleLocale)) {
      router.replace(`/${possibleLocale}/tutor/group-builder`)
    } else {
      router.replace('/tutor/group-builder')
    }
  }, [router, pathname])

  return null
}
