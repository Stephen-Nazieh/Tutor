'use client'

import { useState, useEffect, createContext, useContext } from 'react'
import { useRouter, usePathname, useParams } from 'next/navigation'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AdminSidebar } from '@/components/admin/layout/AdminSidebar'
import { AdminHeader } from '@/components/admin/layout/AdminHeader'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
})

interface AdminSession {
  adminId: string
  email: string
  name: string | null
  roles: string[]
  permissions: string[]
}

interface AdminContextType {
  session: AdminSession | null
  logout: () => Promise<void>
}

const AdminContext = createContext<AdminContextType | null>(null)

export function useAdminContext() {
  const context = useContext(AdminContext)
  if (!context) {
    throw new Error('useAdminContext must be used within AdminLayout')
  }
  return context
}

function AdminLayoutContent({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const params = useParams<{ locale?: string }>()
  const localePrefix = params?.locale ? `/${params.locale}` : ''
  const adminLoginPath = `${localePrefix}/admin/login`
  const isPublicAdminRoute = pathname.endsWith('/admin/login') || pathname.endsWith('/admin/forgot-password')
  const isTopologyRoute = pathname.endsWith('/admin/topology')
  const [session, setSession] = useState<AdminSession | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  useEffect(() => {
    // Check session on mount
    const checkSession = async () => {
      try {
        const res = await fetch('/api/admin/auth/session', {
          credentials: 'include',
        })
        
        if (res.ok) {
          const data = await res.json()
          setSession(data.session)
        } else {
          setSession(null)
        }
      } catch (error) {
        console.error('Session check failed:', error)
        setSession(null)
      } finally {
        setIsLoading(false)
      }
    }

    checkSession()
  }, [])

  useEffect(() => {
    // Redirect to login only when on a protected page without session
    if (!isLoading && !session && !isPublicAdminRoute) {
      router.replace(adminLoginPath)
    }
  }, [isLoading, session, isPublicAdminRoute, router, adminLoginPath])

  const logout = async () => {
    try {
      await fetch('/api/admin/auth/logout', {
        method: 'POST',
        credentials: 'include',
      })
    } catch (error) {
      console.error('Logout error:', error)
    }
    setSession(null)
    router.push(adminLoginPath)
  }

  // Show loading state while checking session
  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-slate-50">
        <div className="text-center">
          <Loader2 className="h-10 w-10 animate-spin text-blue-600 mx-auto" />
          <p className="mt-4 text-sm text-slate-500">Loading...</p>
        </div>
      </div>
    )
  }

  // No session: render login/forgot-password page or show spinner while redirecting
  if (!session) {
    if (isPublicAdminRoute) {
      return <div className="min-h-screen bg-slate-50">{children}</div>
    }
    return (
      <div className="flex h-screen w-full items-center justify-center bg-slate-50">
        <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
      </div>
    )
  }

  return (
    <AdminContext.Provider value={{ session, logout }}>
      <div className="min-h-screen bg-slate-50">
        <AdminSidebar
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
        <AdminHeader collapsed={sidebarCollapsed} />
        <main
          className={cn(
            "pt-16 transition-all duration-300",
            isTopologyRoute ? "fixed inset-0 pt-16" : ""
          )}
          style={{ 
            marginLeft: isTopologyRoute ? 0 : (sidebarCollapsed ? '64px' : '256px'),
            left: isTopologyRoute ? (sidebarCollapsed ? '64px' : '256px') : undefined,
          }}
        >
          <div className={cn(
            isTopologyRoute ? "h-full w-full p-0 bg-slate-950" : "p-6"
          )}>
            {children}
          </div>
        </main>
      </div>
    </AdminContext.Provider>
  )
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </QueryClientProvider>
  )
}
