'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { UserNav } from '@/components/user-nav'
import {
  LayoutDashboard,
  GraduationCap,
  Sparkles,
  ClipboardList,
  MessageSquare,
  MessageCircle,
  HelpCircle,
  Menu,
  X,
  Video,
  Bell,
  ArrowLeft,
  FileText,
  Compass,
  Briefcase,
} from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

type NavItem = { href: string; label: string; icon: React.ComponentType<{ className?: string }> }

const navItems: NavItem[] = [
  { href: '/student/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/student/dashboard-details', label: 'Advance Analytics', icon: ClipboardList },
  { href: '/student/tutors', label: 'Book a Tutor', icon: Compass },
  { href: '/student/courses', label: 'My Courses', icon: GraduationCap },
  { href: '/student/work', label: 'My Work', icon: Briefcase },
  { href: '/student/feedback', label: 'Live Classroom', icon: Video },
  { href: '/student/ai-tutor', label: 'AI Tutor', icon: Sparkles },
  { href: '/student/messages', label: 'Messages', icon: MessageSquare },
  { href: '/student/help', label: 'Help', icon: HelpCircle },
]

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [comingSoon, setComingSoon] = useState<null | 'ai-tutor' | 'worlds'>(null)
  const isLiveClassRoute = pathname.includes('/student/feedback')
  const isTutorDirectoryRoute = pathname.startsWith('/student/tutors')
  const isFeedbackRoute = pathname.includes('/student/feedback')
  const liveSessionId = ''
  const liveClassNavItems: NavItem[] = [
    {
      href: '/student/feedback',
      label: 'Live Classroom',
      icon: Video,
    },
    { href: '/student/assignments', label: 'Visible Tasks', icon: ClipboardList },
    { href: '/student/pdf-tutoring', label: 'PDF Tutoring', icon: FileText },
    { href: '/student/dashboard', label: 'Leave Class', icon: ArrowLeft },
  ]

  if (isTutorDirectoryRoute) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="sticky top-0 z-40 border-b bg-white">
          <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
            <Link
              href="/student/dashboard"
              className="flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-gray-900"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to dashboard
            </Link>
            <div className="flex items-center gap-3">
              <Link href="/student/notifications">
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
                </Button>
              </Link>
              <UserNav />
            </div>
          </div>
        </header>
        <main className="px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Left Navigation Sidebar - Desktop */}
      {!isFeedbackRoute && (
        <aside className="sticky top-0 z-40 hidden h-screen w-64 flex-col border-r bg-white lg:flex">
          <div className="flex items-center justify-between border-b p-4">
            <Link
              href="/student/dashboard"
              className="text-lg font-bold text-blue-600"
              aria-label="Student dashboard"
            ></Link>
          </div>

          <nav className="flex-1 space-y-2 overflow-y-auto p-4">
            {isLiveClassRoute ? (
              <div>
                <p className="mb-1.5 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Live Class
                </p>
                <div className="space-y-0.5">
                  {liveClassNavItems.map(item => {
                    const Icon = item.icon
                    const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
                    return (
                      <Link
                        key={`${item.label}:${item.href}`}
                        href={item.href}
                        className={cn(
                          'flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors',
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
                </div>
              </div>
            ) : (
              navItems.map(item => {
                const Icon = item.icon
                const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
                const isComingSoon = item.href === '/student/ai-tutor'
                const isDisabled = item.href === '/student/dashboard-details'
                return isDisabled ? (
                  <button
                    key={item.href}
                    type="button"
                    disabled
                    className="flex w-full cursor-not-allowed items-center gap-3 rounded-lg px-3 py-2.5 text-left text-gray-400"
                  >
                    <Icon className="h-5 w-5 flex-shrink-0" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </button>
                ) : isComingSoon ? (
                  <button
                    key={item.href}
                    type="button"
                    onClick={() => setComingSoon('ai-tutor')}
                    className={cn(
                      'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors',
                      isActive
                        ? 'bg-blue-50 font-medium text-blue-700'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    )}
                  >
                    <Icon className="h-5 w-5 flex-shrink-0" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </button>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors',
                      isActive
                        ? 'bg-blue-50 font-medium text-blue-700'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    )}
                  >
                    <Icon className="h-5 w-5 flex-shrink-0" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </Link>
                )
              })
            )}
          </nav>

          <div className="space-y-2 border-t p-4">
            <div className="pt-2">
              <UserNav />
            </div>
          </div>
        </aside>
      )}

      {/* Mobile Navigation Header */}
      {!isFeedbackRoute && (
        <div className="fixed left-0 right-0 top-0 z-50 border-b bg-white lg:hidden">
          <div className="flex h-16 items-center justify-between px-4">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
              <Link
                href="/student/dashboard"
                className="inline-flex items-center"
                aria-label="Student dashboard"
              >
                <span className="sr-only">Dashboard</span>
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <UserNav />
            </div>
          </div>
        </div>
      )}

      {/* Mobile Navigation Menu */}
      {!isFeedbackRoute && mobileMenuOpen && (
        <div className="fixed inset-0 top-16 z-40 overflow-y-auto bg-white p-4 lg:hidden">
          <nav className="space-y-3">
            {isLiveClassRoute ? (
              <div>
                <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Live Class
                </p>
                <div className="space-y-0.5">
                  {liveClassNavItems.map(item => {
                    const Icon = item.icon
                    const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
                    return (
                      <Link
                        key={`${item.label}:${item.href}`}
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
                </div>
              </div>
            ) : (
              navItems.map(item => {
                const Icon = item.icon
                const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
                const isComingSoon = item.href === '/student/ai-tutor'
                const isDisabled = item.href === '/student/dashboard-details'
                return isDisabled ? (
                  <button
                    key={item.href}
                    type="button"
                    disabled
                    className="flex w-full cursor-not-allowed items-center gap-3 rounded-lg px-3 py-3 text-left text-gray-400"
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                ) : isComingSoon ? (
                  <button
                    key={item.href}
                    type="button"
                    onClick={() => {
                      setComingSoon('ai-tutor')
                      setMobileMenuOpen(false)
                    }}
                    className={cn(
                      'flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left transition-colors',
                      isActive
                        ? 'bg-blue-50 font-medium text-blue-700'
                        : 'text-gray-600 hover:bg-gray-100'
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                ) : (
                  <Link
                    key={item.href}
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
              })
            )}
          </nav>
        </div>
      )}

      {/* Main Content */}
      <main
        className={cn(
          'min-h-screen flex-1',
          isFeedbackRoute || isLiveClassRoute ? 'pt-0' : 'pt-16 lg:pt-0'
        )}
      >
        {children}
      </main>

      <Dialog open={comingSoon !== null} onOpenChange={open => !open && setComingSoon(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {comingSoon === 'ai-tutor' ? 'AI Tutor — Coming Soon' : 'Worlds — Coming Soon'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3 text-sm text-gray-600">
            {comingSoon === 'ai-tutor' ? (
              <>
                <p>
                  AI Tutor will provide Socratic-style guidance, personalized practice prompts, and
                  instant feedback while keeping you on track.
                </p>
                <p>You&apos;ll get step-by-step hints, adaptive practice, and session summaries.</p>
              </>
            ) : (
              <>
                <p>
                  Worlds will unlock themed learning paths, progress milestones, and rewards as you
                  complete lessons and challenges.
                </p>
                <p>Each world is tailored to your goals and will surface curated practice.</p>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
