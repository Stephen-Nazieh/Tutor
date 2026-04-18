'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import { useEffect, useMemo } from 'react'
import { useRealmSession } from '@/hooks/use-realm-session'
import { Button } from '@/components/ui/button'
import { UserNav } from '@/components/user-nav'
import {
  LayoutDashboard,
  Users,
  BarChart3,
  MessageSquare,
  Settings,
  Lightbulb,
  Menu,
  X,
  Bell,
  HelpCircle,
  Globe,
  PanelLeftClose,
  PanelLeftOpen,
  BookOpen,
  GraduationCap,
  LogOut,
  User,
} from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { routing } from '@/i18n/routing'

type NavItem = {
  href: string
  label: string
  icon: typeof LayoutDashboard
  inactive?: boolean
}

// Main Navigation - Flat list (no groups)
const navItems: NavItem[] = [
  { href: '/tutor/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/tutor/my-page', label: 'My Page', icon: Globe },
  { href: '/tutor/insights', label: 'Insights', icon: Lightbulb },

  { href: '/tutor/groups', label: 'Groups', icon: Users },
  { href: '/tutor/messages', label: 'Messages', icon: MessageSquare },
  { href: '/tutor/reports', label: 'Analytics', icon: BarChart3 },
  { href: '/tutor/training', label: 'Training', icon: GraduationCap },
  { href: '/tutor/support', label: 'Support', icon: HelpCircle },
]

const bottomNavItems = [{ href: '/tutor/settings', label: 'Account', icon: User }]

export default function TutorLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const { data: session, status } = useSession()
  const { data: realmSession, status: realmStatus } = useRealmSession('tutor')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [desktopNavOpen, setDesktopNavOpen] = useState(true)
  const localePrefix = useMemo(() => {
    const segments = pathname?.split('/').filter(Boolean) ?? []
    const first = segments[0]
    return first && routing.locales.includes(first as (typeof routing.locales)[number])
      ? `/${first}`
      : ''
  }, [pathname])

  // Use realm session (tutor tab) first; only redirect if we don't have a tutor session and default session is another role
  useEffect(() => {
    const realmRole = (realmSession?.user as { role?: string })?.role ?? ''
    const defaultRole = (session?.user as { role?: string })?.role ?? ''
    const isTutorRealm = realmRole.toUpperCase() === 'TUTOR'
    const isTutorDefault = defaultRole.toUpperCase() === 'TUTOR'
    if (realmStatus === 'loading' && status === 'loading') return
    if (isTutorRealm) return
    if (!isTutorRealm && isTutorDefault) return
    const role = defaultRole || realmRole
    if (role && role.toUpperCase() !== 'TUTOR') {
      if (role.toUpperCase() === 'STUDENT') router.replace('/student/dashboard')
      else if (role.toUpperCase() === 'PARENT') router.replace('/parent/dashboard')
      else if (role.toUpperCase() === 'ADMIN') router.replace('/admin')
      else router.replace('/')
    }
  }, [realmStatus, realmSession?.user, status, session?.user, router])

  // Check if we're on the Course Builder page - if so, don't render the tutor nav
  // The Course Builder has its own layout
  const isCourseBuilder = pathname?.includes('/courses/') && pathname?.includes('/builder')

  // Check if we're on the Course Publish page (course detail page) - hide sidebar for focused editing
  // Pattern: /tutor/courses/[id] but not sub-paths like /tasks or /enrollments
  const isCoursePublishPage = pathname?.match(/^\/tutor\/courses\/[^\/]+$/) !== null

  // Check if we're on My Page - hide sidebar and show back button instead
  const isMyPage = pathname === '/tutor/my-page' || pathname?.startsWith('/tutor/my-page/')

  // Insights page has its own layout with course builder integrated
  const isInsightsPage = pathname === '/tutor/insights' || pathname?.startsWith('/tutor/insights/')

  const isAccountPage = pathname === '/tutor/settings' || pathname?.startsWith('/tutor/settings/')

  if (isCourseBuilder || isCoursePublishPage || isMyPage || isInsightsPage || isAccountPage) {
    return <>{children}</>
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Floating Action Button to Show Navigation on Desktop */}
      {!desktopNavOpen && (
        <Button
          variant="outline"
          size="icon"
          onClick={() => setDesktopNavOpen(true)}
          className="fixed left-4 top-4 z-50 hidden rounded-full border-gray-200 bg-white shadow-md lg:flex"
        >
          <PanelLeftOpen className="h-5 w-5" />
        </Button>
      )}

      {/* Left Navigation Sidebar - Desktop */}
      <aside
        className={cn(
          'sticky top-0 z-40 hidden h-screen flex-col border-r bg-white transition-all duration-300 lg:flex',
          desktopNavOpen ? 'w-64 translate-x-0' : 'w-0 -translate-x-full overflow-hidden border-r-0'
        )}
      >
        <div className="flex min-w-[256px] items-center justify-between border-b p-4">
          <Link href="/tutor/dashboard" className="text-xl font-bold text-blue-600"></Link>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setDesktopNavOpen(false)}
              title="Hide Navigation text-gray-400"
            >
              <PanelLeftClose className="h-4 w-4" />
            </Button>
            <Link href="/tutor/notifications">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
              </Button>
            </Link>
          </div>
        </div>

        <nav className="flex-1 space-y-0.5 overflow-y-auto p-4">
          {navItems.map(item => {
            const Icon = item.icon
            const href =
              item.href === '/tutor/insights' ? `${localePrefix}/tutor/insights` : item.href
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
            return (
              <Link
                key={`${item.href}-${item.label}`}
                href={href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors',
                  item.inactive && 'pointer-events-none opacity-50',
                  isActive
                    ? 'bg-blue-50 font-medium text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                )}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            )
          })}
        </nav>

        <div className="space-y-1 border-t p-4">
          {bottomNavItems.map(item => {
            const Icon = item.icon
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
            return (
              <Link
                key={`${item.href}-${item.label}`}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors',
                  isActive
                    ? 'bg-blue-50 font-medium text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                )}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                <span className="font-medium">{item.label}</span>
              </Link>
            )
          })}
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
          >
            <LogOut className="h-5 w-5 flex-shrink-0" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile Navigation Header */}
      <div className="fixed left-0 right-0 top-0 z-50 border-b bg-white lg:hidden">
        <div className="flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            <Link href="/tutor/dashboard" className="text-xl font-bold text-blue-600"></Link>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/tutor/settings">
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
            </Link>
            <UserNav />
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-16 z-40 overflow-y-auto bg-white p-4 lg:hidden">
          <nav className="space-y-0.5">
            {navItems.map(item => {
              const Icon = item.icon
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
              return (
                <Link
                  key={`${item.href}-${item.label}`}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-3 transition-colors',
                    isActive
                      ? 'bg-blue-50 font-medium text-blue-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              )
            })}
          </nav>
        </div>
      )}

      {/* Main Content */}
      <main className="min-h-screen flex-1 pt-16 lg:pt-0">{children}</main>
    </div>
  )
}
