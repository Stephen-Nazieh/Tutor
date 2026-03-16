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
  HelpCircle,
  Menu,
  X,
  Video,
  Bell,
  ArrowLeft,
  FileText,
  Compass,
  Briefcase
} from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

type NavItem = { href: string; label: string; icon: React.ComponentType<{ className?: string }> }

const navItems: NavItem[] = [
  { href: '/student/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/student/tutors', label: 'Find Tutors', icon: Compass },
  { href: '/student/courses', label: 'My Courses', icon: GraduationCap },
  { href: '/student/work', label: 'My Work', icon: Briefcase },
  { href: '/student/ai-tutor', label: 'AI Tutor', icon: Sparkles },
  { href: '/student/messages', label: 'Messages', icon: MessageSquare },
  { href: '/student/help', label: 'Help', icon: HelpCircle },
]

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [comingSoon, setComingSoon] = useState<null | 'ai-tutor' | 'worlds'>(null)
  const isLiveClassRoute = pathname.includes('/student/live/')
  const isTutorDirectoryRoute = pathname.startsWith('/student/tutors')
  const liveSessionId = isLiveClassRoute ? pathname.split('/student/live/')[1]?.split('/')[0] || '' : ''
  const liveClassNavItems: NavItem[] = [
    { href: liveSessionId ? `/student/live/${liveSessionId}` : '/student/live', label: 'Live Whiteboard', icon: Video },
    { href: '/student/assignments', label: 'Visible Tasks', icon: ClipboardList },
    { href: '/student/pdf-tutoring', label: 'PDF Tutoring', icon: FileText },
    { href: '/student/live/join', label: 'Leave Class', icon: ArrowLeft },
  ]

  if (isTutorDirectoryRoute) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white border-b sticky top-0 z-40">
          <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
            <Link href="/student/dashboard" className="flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-gray-900">
              <ArrowLeft className="h-4 w-4" />
              Back to dashboard
            </Link>
            <div className="flex items-center gap-3">
              <Link href="/student/notifications">
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                </Button>
              </Link>
              <UserNav />
            </div>
          </div>
        </header>
        <main className="px-4 sm:px-6 lg:px-8 py-6">{children}</main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Navigation Sidebar - Desktop */}
      <aside className="w-64 bg-white border-r sticky top-0 h-screen hidden lg:flex flex-col z-40">
        <div className="p-4 border-b flex items-center justify-between">
          <Link href="/student/dashboard" className="inline-flex items-center" aria-label="Student dashboard">
            <span className="sr-only">Dashboard</span>
            <span className="h-2.5 w-2.5 rounded-full bg-blue-600" aria-hidden="true" />
          </Link>
        </div>

        <nav className="flex-1 p-4 overflow-y-auto space-y-2">
          {isLiveClassRoute ? (
            <div>
              <p className="px-3 mb-1.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Live Class
              </p>
              <div className="space-y-0.5">
                {liveClassNavItems.map((item) => {
                  const Icon = item.icon
                  const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
                  return (
                    <Link
                      key={`${item.label}:${item.href}`}
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors",
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
          ) : (
            navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
              const isComingSoon = item.href === '/student/ai-tutor'
              return (
                isComingSoon ? (
                  <button
                    key={item.href}
                    type="button"
                    onClick={() => setComingSoon('ai-tutor')}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-left w-full",
                      isActive
                        ? "bg-blue-50 text-blue-700 font-medium"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    )}
                  >
                    <Icon className="h-5 w-5 flex-shrink-0" />
                    <span className="font-medium text-sm">{item.label}</span>
                  </button>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors",
                      isActive
                        ? "bg-blue-50 text-blue-700 font-medium"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    )}
                  >
                    <Icon className="h-5 w-5 flex-shrink-0" />
                    <span className="font-medium text-sm">{item.label}</span>
                  </Link>
                )
              )
            })
          )}
        </nav>

        <div className="p-4 border-t space-y-2">
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
            <Link href="/student/dashboard" className="inline-flex items-center" aria-label="Student dashboard">
              <span className="sr-only">Dashboard</span>
              <span className="h-2.5 w-2.5 rounded-full bg-blue-600" aria-hidden="true" />
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <UserNav />
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-16 bg-white z-40 p-4 overflow-y-auto">
          <nav className="space-y-3">
            {isLiveClassRoute ? (
              <div>
                <p className="px-3 mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Live Class
                </p>
                <div className="space-y-0.5">
                  {liveClassNavItems.map((item) => {
                    const Icon = item.icon
                    const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
                    return (
                      <Link
                        key={`${item.label}:${item.href}`}
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
            ) : (
              navItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
                const isComingSoon = item.href === '/student/ai-tutor'
                return (
                  isComingSoon ? (
                    <button
                      key={item.href}
                      type="button"
                      onClick={() => {
                        setComingSoon('ai-tutor')
                        setMobileMenuOpen(false)
                      }}
                      className={cn(
                        "flex items-center gap-3 px-3 py-3 rounded-lg transition-colors text-left w-full",
                        isActive
                          ? "bg-blue-50 text-blue-700 font-medium"
                          : "text-gray-600 hover:bg-gray-100"
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
                )
              })
            )}
          </nav>
        </div>
      )}

      {/* Main Content */}
      <main className={cn("flex-1 min-h-screen", isLiveClassRoute ? "pt-16 lg:pt-0" : "pt-16 lg:pt-0")}>
        {children}
      </main>

      <Dialog open={comingSoon !== null} onOpenChange={(open) => !open && setComingSoon(null)}>
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
                  AI Tutor will provide Socratic-style guidance, personalized practice prompts,
                  and instant feedback while keeping you on track.
                </p>
                <p>
                  You&apos;ll get step-by-step hints, adaptive practice, and session summaries.
                </p>
              </>
            ) : (
              <>
                <p>
                  Worlds will unlock themed learning paths, progress milestones, and rewards
                  as you complete lessons and challenges.
                </p>
                <p>
                  Each world is tailored to your goals and will surface curated practice.
                </p>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
