'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { UserNav } from '@/components/user-nav'
import {
  LayoutDashboard,
  Calendar,
  BookOpen,
  GraduationCap,
  Sparkles,
  ClipboardList,
  Users,
  MessageSquare,
  BarChart3,
  FolderOpen,
  HelpCircle,
  Settings,
  Menu,
  X,
  Video,
  Zap,
  Target,
  Send,
  Bell,
  Radar,
  Trophy,
  Globe
} from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

type NavItem = { href: string; label: string; icon: React.ComponentType<{ className?: string }> }

const navGroups: { label: string; items: NavItem[] }[] = [
  {
    label: 'Overview',
    items: [
      { href: '/student/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    ],
  },
  {
    label: 'Learning',
    items: [
      { href: '/student/courses', label: 'My Courses', icon: GraduationCap },
      { href: '/student/assignments', label: 'Assignments', icon: ClipboardList },
      { href: '/student/missed-classes', label: 'Missed Classes', icon: Video },
      { href: '/student/scores', label: 'Scores', icon: Trophy },
    ],
  },
  {
    label: 'Goals & progress',
    items: [
      { href: '/student/missions', label: 'Missions', icon: Target },
      { href: '/student/worlds', label: 'Worlds', icon: Globe },
      { href: '/student/skills', label: 'My Skills', icon: Radar },
      { href: '/student/progress', label: 'Progress', icon: BarChart3 },
    ],
  },
  {
    label: 'Inbox & support',
    items: [
      { href: '/student/notifications', label: 'Notifications', icon: Bell },
      { href: '/student/resources', label: 'Resources', icon: FolderOpen },
      { href: '/student/help', label: 'Help', icon: HelpCircle },
    ],
  },
]

// Quick Actions items
const quickActionItems = [
  { href: '/student/ai-tutor', label: 'AI Tutor', icon: Sparkles },
  { href: '/student/study-groups', label: 'Study Groups', icon: Users },
  { href: '/student/messages', label: 'Messages', icon: MessageSquare },
]

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Navigation Sidebar - Desktop */}
      <aside className="w-64 bg-white border-r sticky top-0 h-screen hidden lg:flex flex-col z-40">
        <div className="p-4 border-b flex items-center justify-between">
          <Link href="/student/dashboard" className="text-xl font-bold text-blue-600">TutorMe</Link>
          <Link href="/student/notifications">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </Button>
          </Link>
        </div>

        <nav className="flex-1 p-4 overflow-y-auto space-y-6">
          {navGroups.map((group) => (
            <div key={group.label}>
              <p className="px-3 mb-1.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                {group.label}
              </p>
              <div className="space-y-0.5">
                {group.items.map((item) => {
                  const Icon = item.icon
                  const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
                  return (
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
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Quick Actions Section */}
        <div className="px-4 py-3 border-t bg-gray-50/50">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-3">
            Quick Actions
          </p>
          <div className="space-y-1">
            {quickActionItems.map((item) => {
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
          </div>
        </div>

        <div className="p-4 border-t space-y-2">
          <Link href="/student/settings">
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start gap-3",
                pathname === '/student/settings' && "bg-blue-50 text-blue-700"
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
            <Link href="/student/dashboard" className="text-xl font-bold text-blue-600">TutorMe</Link>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/student/settings">
              <Button variant="ghost" size="icon"><Settings className="h-5 w-5" /></Button>
            </Link>
            <UserNav />
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-16 bg-white z-40 p-4 overflow-y-auto">
          <nav className="space-y-6">
            {navGroups.map((group) => (
              <div key={group.label}>
                <p className="px-3 mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  {group.label}
                </p>
                <div className="space-y-0.5">
                  {group.items.map((item) => {
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
            <div className="space-y-1">
              {quickActionItems.map((item) => {
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
