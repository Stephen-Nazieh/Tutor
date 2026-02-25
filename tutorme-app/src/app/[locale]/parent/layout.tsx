'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useParentNotifications } from '@/hooks/useParentNotifications'
import {
  LayoutDashboard,
  Users,
  Calendar,
  CreditCard,
  MessageSquare,
  Settings,
  LogOut,
  Bell,
  GraduationCap,
  BookOpen,
  Share2,
} from 'lucide-react'

const navigation = [
  {
    section: 'Overview',
    items: [
      { name: 'Dashboard', href: '/parent/dashboard', icon: LayoutDashboard },
      { name: 'My Children', href: '/parent/children', icon: Users },
      { name: 'Progress', href: '/parent/progress', icon: GraduationCap },
    ]
  },
  {
    section: 'Learning',
    items: [
      { name: 'Classes & Schedule', href: '/parent/classes', icon: Calendar },
      { name: 'Assignments', href: '/parent/assignments', icon: BookOpen },
      { name: 'Shared Courses', href: '/parent/courses', icon: Share2 },
    ]
  },
  {
    section: 'Financial',
    items: [
      { name: 'Payments', href: '/parent/payments', icon: CreditCard },
      { name: 'Invoices', href: '/parent/invoices', icon: CreditCard },
    ]
  },
  {
    section: 'Communication',
    items: [
      { name: 'Messages', href: '/parent/messages', icon: MessageSquare },
      { name: 'Notifications', href: '/parent/notifications', icon: Bell },
    ]
  },
  {
    section: 'Settings',
    items: [
      { name: 'Profile', href: '/parent/profile', icon: Users },
      { name: 'Settings', href: '/parent/settings', icon: Settings },
    ]
  }
]

export default function ParentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const { unreadCount } = useParentNotifications()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r flex flex-col">
          {/* Logo */}
          <div className="p-4 border-b">
            <Link href="/parent/dashboard" className="text-xl font-bold text-blue-600">
              TutorMe Parent
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-6">
            {navigation.map((section) => (
              <div key={section.section}>
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  {section.section}
                </h3>
                <ul className="space-y-1">
                  {section.items.map((item) => {
                    const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
                    return (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          className={cn(
                            "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                            isActive
                              ? "bg-blue-50 text-blue-700"
                              : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                          )}
                        >
                          <item.icon className="h-4 w-4" />
                          {item.name}
                          {item.name === 'Notifications' && unreadCount > 0 && (
                            <span className="ml-auto h-5 min-w-5 px-1.5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                              {unreadCount > 99 ? '99+' : unreadCount}
                            </span>
                          )}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </div>
            ))}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-gray-600"
              onClick={() => signOut({ callbackUrl: '/' })}
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
