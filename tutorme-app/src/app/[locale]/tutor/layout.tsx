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
  GraduationCap,
  LogOut,
  User,
  FileText,
  ChevronRight,
  ChevronLeft,
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
  { href: '/tutor/insights', label: 'Course Builder', icon: Lightbulb },
  { href: '/tutor/documents', label: 'PDF Viewer', icon: FileText },
  { href: '/tutor/messages', label: 'Messages', icon: MessageSquare },
  { href: '/tutor/reports', label: 'Analytics', icon: BarChart3 },
  { href: '/tutor/training', label: 'Training', icon: GraduationCap },
  { href: '/tutor/support', label: 'Support', icon: HelpCircle },

  // Whiteboard audit links
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
      {/* Left Navigation Sidebar - Desktop */}
      <aside
        className={cn(
          'sticky top-0 z-40 hidden h-screen w-64 shrink-0 flex-col border-r bg-white transition-all duration-300 lg:flex',
          !desktopNavOpen && 'w-0 overflow-hidden border-r-0'
        )}
      >
        {/* We keep the inner content rendered always but hide it via overflow to prevent layout nudges */}
        <div className="flex h-full w-64 flex-col">
          <div className="flex min-w-[256px] items-center justify-between p-4">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={e => {
                  e.stopPropagation()
                  setDesktopNavOpen(false)
                }}
                title="Hide Navigation"
                className="text-gray-400"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Link href="/tutor/dashboard" className="text-xl font-bold text-blue-600"></Link>
            </div>
            <div className="flex items-center gap-1">
              <Link href="/tutor/notifications" onClick={e => e.stopPropagation()}>
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
                  onClick={e => e.stopPropagation()}
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

          <div className="space-y-1 p-4">
            {bottomNavItems.map(item => {
              const Icon = item.icon
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
              return (
                <Link
                  key={`${item.href}-${item.label}`}
                  href={item.href}
                  onClick={e => e.stopPropagation()}
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
              onClick={e => {
                e.stopPropagation()
                signOut({ callbackUrl: '/' })
              }}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
            >
              <LogOut className="h-5 w-5 flex-shrink-0" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Floating collapsed pill */}
      {!desktopNavOpen && (
        <div
          className="sticky top-0 z-40 my-4 ml-4 hidden h-[calc(100vh-32px)] w-12 shrink-0 cursor-pointer flex-col items-center rounded-full border border-slate-200 bg-white py-4 shadow-sm transition-colors hover:bg-slate-50 lg:flex"
          onClick={() => setDesktopNavOpen(true)}
          title="Show navigation"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-blue-600">
            <ChevronRight className="h-5 w-5" />
          </div>
          <div className="mt-8 flex flex-1 items-start justify-center">
            <span
              className="text-xs font-bold tracking-[0.2em] text-slate-400"
              style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
            >
              DIRECTORY
            </span>
          </div>
        </div>
      )}

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
