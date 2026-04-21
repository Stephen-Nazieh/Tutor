'use client'

import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'

export default function TutorGroupsPage() {
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Extract locale from pathname (e.g., /en/tutor/groups -> en)
    const locale = pathname.split('/')[1]
    router.replace(`/${locale}/tutor/group-builder`)
  }, [router, pathname])

  return null
}
