'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { useRealmSession } from '@/hooks/use-realm-session'
import { Button } from '@/components/ui/button'
import { UserNav } from '@/components/user-nav'
import {
  LayoutDashboard,
  Calendar,
  CalendarDays,
  GraduationCap,
  Users,
  BarChart3,
  MessageSquare,
  DollarSign,
  Sparkles,
  Settings,
  Menu,
  X,
  Video,
  Zap,
  Wand2,
  Bell,
  FolderOpen,
  HelpCircle,
  CalendarPlus,
  FilePlus,
  Palette,
  BookOpen,
  FileText,
  Globe
} from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

// Main Navigation - Grouped by category
interface NavSection {
  title: string
  items: { href: string; label: string; icon: React.ComponentType<{ className?: string }> }[]
}

const navSections: NavSection[] = [
  {
    title: 'Overview',
    items: [
      { href: '/tutor/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    ],
  },
  {
    title: 'Teaching',
    items: [
      { href: '/tutor/classes', label: 'My Schedules', icon: CalendarDays },
      { href: '/tutor/whiteboards', label: 'Whiteboards', icon: Palette },
    ],
  },
  {
    title: 'Content',
    items: [
      { href: '/tutor/quizzes', label: 'Quizzes', icon: FileText },
      { href: '/tutor/question-bank', label: 'Question Bank', icon: BookOpen },
      { href: '/tutor/resources', label: 'Resources', icon: FolderOpen },
    ],
  },
  {
    title: 'Profile',
    items: [
      { href: '/tutor/my-page', label: 'My Page & Courses', icon: Globe },
    ],
  },
  {
    title: 'People',
    items: [
      { href: '/tutor/students', label: 'Students', icon: Users },
      { href: '/tutor/messages', label: 'Messages', icon: MessageSquare },
      { href: '/tutor/groups', label: 'My Groups', icon: Users },
    ],
  },
  {
    title: 'Support',
    items: [
      { href: '/tutor/help', label: 'Help & Support', icon: HelpCircle },
    ],
  },
]

// Quick Actions - Grouped by category
interface QuickActionSection {
  title: string
  items: { href: string; label: string; icon: React.ComponentType<{ className?: string }> }[]
}

const quickActionSections: QuickActionSection[] = [
  {
    title: 'Build & Launch',
    items: [
      { href: '/tutor/dashboard?create=1', label: 'Create Class', icon: Zap },
      { href: '/tutor/group-builder', label: 'Group Builder', icon: Users },
      { href: '/tutor/calendar', label: 'Schedule Class', icon: CalendarPlus },
    ],
  },
  {
    title: 'AI & Tools',
    items: [
      { href: '/tutor/ai-assistant', label: 'AI Teaching Assistant', icon: Sparkles },
    ],
  },
  {
    title: 'Analytics',
    items: [
      { href: '/tutor/reports', label: 'Reports', icon: BarChart3 },
      { href: '/tutor/revenue', label: 'Revenue', icon: DollarSign },
    ],
  },
]



export default function TutorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const { data: session, status } = useSession()
  const { data: realmSession, status: realmStatus } = useRealmSession('tutor')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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
  
  // Check if we're in a live class session - if so, don't render the sidebar
  // Live class should be immersive full-screen experience
  const isLiveClass = pathname?.includes('/live-class/') && pathname?.split('/live-class/')[1]?.length > 0

  if (isCourseBuilder || isLiveClass) {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Navigation Sidebar - Desktop */}
      <aside className="w-64 bg-white border-r sticky top-0 h-screen hidden lg:flex flex-col z-40">
        <div className="p-4 border-b flex items-center justify-between">
          <Link href="/tutor/dashboard" className="text-xl font-bold text-blue-600">TutorMe</Link>
          <Link href="/tutor/notifications">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </Button>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-4 overflow-y-auto">
          {navSections.map((section) => (
            <div key={section.title}>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-3">
                {section.title}
              </p>
              <div className="space-y-0.5">
                {section.items.map((item) => {
                  const Icon = item.icon
                  const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
                        isActive
                          ? "bg-blue-50 text-blue-700 font-medium"
                          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                      )}
                    >
                      <Icon className="h-5 w-5 flex-shrink-0" />
                      <span className="font-medium text-sm">{item.label}</span>
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Quick Actions Section */}
        <div className="px-4 py-3 border-t bg-gray-50/50">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-3">
            Quick Actions
          </p>
          <div className="space-y-3">
            {quickActionSections.map((section) => (
              <div key={section.title}>
                <p className="text-xs text-gray-500 mb-1 px-3">
                  {section.title}
                </p>
                <div className="space-y-0.5">
                  {section.items.map((item) => {
                    const Icon = item.icon
                    const isActive = pathname === item.href || pathname.startsWith(item.href.split('?')[0] + '/')
                    return (
                      <Link
                        key={item.label}
                        href={item.href}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-sm",
                          isActive
                            ? "bg-blue-50 text-blue-700 font-medium"
                            : "text-gray-600 hover:bg-gray-100"
                        )}
                      >
                        <Icon className="h-4 w-4" />
                        <span>{item.label}</span>
                      </Link>
                    )
                  })}
                  {/* Course Builder Link */}
                  {section.title === 'Build & Launch' && (
                    <Link
                      href="/tutor/courses/new"
                      className="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-sm text-gray-600 hover:bg-gray-100"
                    >
                      <Wand2 className="h-4 w-4" />
                      <span>Course Builder</span>
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 border-t space-y-2">
          <Link href="/tutor/settings">
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start gap-3",
                pathname === '/tutor/settings' && "bg-blue-50 text-blue-700"
              )}
            >
              <Settings className="h-5 w-5" />
              Settings
            </Button>
          </Link>
          <div className="pt-2">
            <UserNav />
          </div>
        </div>
      </aside>

      {/* Mobile Navigation Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white border-b z-50">
        <div className="flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            <Link href="/tutor/dashboard" className="text-xl font-bold text-blue-600">TutorMe</Link>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/tutor/settings">
              <Button variant="ghost" size="icon"><Settings className="h-5 w-5" /></Button>
            </Link>
            <UserNav />
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-16 bg-white z-40 p-4 overflow-y-auto">
          <nav className="space-y-4">
            {navSections.map((section) => (
              <div key={section.title}>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-3">
                  {section.title}
                </p>
                <div className="space-y-0.5">
                  {section.items.map((item) => {
                    const Icon = item.icon
                    const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={cn(
                          "flex items-center gap-3 px-3 py-3 rounded-lg transition-colors",
                          isActive
                            ? "bg-blue-50 text-blue-700 font-medium"
                            : "text-gray-600 hover:bg-gray-100"
                        )}
                      >
                        <Icon className="h-5 w-5" />
                        <span className="font-medium">{item.label}</span>
                      </Link>
                    )
                  })}
                </div>
              </div>
            ))}
          </nav>

          {/* Quick Actions - Mobile */}
          <div className="mt-6 pt-6 border-t">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-3">
              Quick Actions
            </p>
            <div className="space-y-3">
              {quickActionSections.map((section) => (
                <div key={section.title}>
                  <p className="text-xs text-gray-500 mb-1 px-3">
                    {section.title}
                  </p>
                  <div className="space-y-0.5">
                    {section.items.map((item) => {
                      const Icon = item.icon
                      return (
                        <Link
                          key={item.label}
                          href={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center gap-3 px-3 py-3 rounded-lg text-gray-600 hover:bg-gray-100"
                        >
                          <Icon className="h-5 w-5" />
                          <span>{item.label}</span>
                        </Link>
                      )
                    })}
                    {/* Course Builder Link - Mobile */}
                    {section.title === 'Build & Launch' && (
                      <Link
                        href="/tutor/courses/new"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-3 px-3 py-3 rounded-lg text-gray-600 hover:bg-gray-100"
                      >
                        <Wand2 className="h-5 w-5" />
                        <span>Course Builder</span>
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 pt-16 lg:pt-0 min-h-screen">
        {children}
      </main>


    </div>
  )
}
