'use client'

import { useSession, signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'

export function UserNav() {
  const { data: session } = useSession()

  return (
    <div className="flex items-center gap-4">
      <span className="text-sm text-gray-600">
        Welcome, {session?.user?.name || session?.user?.email?.split('@')[0] || 'User'}
      </span>
      <Button 
        variant="outline" 
        size="sm"
        onClick={() => signOut({ callbackUrl: '/' })}
      >
        Logout
      </Button>
    </div>
  )
}
