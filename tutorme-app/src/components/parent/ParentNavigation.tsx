'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useParentNotifications } from '@/hooks/useParentNotifications'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  Users,
  Calendar,
  CreditCard,
  MessageSquare,
  Settings,
  Bell,
  GraduationCap,
  BookOpen,
  Receipt,
} from 'lucide-react'

const iconMap = {
  home: LayoutDashboard,
  users: Users,
  'chart-line': GraduationCap,
  calendar: Calendar,
  homework: BookOpen,
  'credit-card': CreditCard,
  'piggy-bank': CreditCard,
  receipt: Receipt,
  mail: MessageSquare,
  'graduation-cap': GraduationCap,
  user: Users,
  settings: Settings,
  bell: Bell,
} as const

const navigationItems = [
  {
    section: 'Overview',
    items: [
      { id: 'overview', label: 'Dashboard', icon: 'home' as const, path: '/parent/dashboard' },
      { id: 'children', label: 'My Children', icon: 'users' as const, path: '/parent/children' },
      { id: 'progress', label: 'Progress', icon: 'chart-line' as const, path: '/parent/progress' },
    ],
  },
  {
    section: 'Learning',
    items: [
      { id: 'classes', label: 'Classes & Schedule', icon: 'calendar' as const, path: '/parent/classes' },
      { id: 'assignments', label: 'Assignments', icon: 'homework' as const, path: '/parent/assignments' },
    ],
  },
  {
    section: 'Financial',
    items: [
      { id: 'payments', label: 'Payment History', icon: 'credit-card' as const, path: '/parent/payments' },
      { id: 'invoices', label: 'Invoices', icon: 'receipt' as const, path: '/parent/invoices' },
    ],
  },
  {
    section: 'Communication',
    items: [
      { id: 'messages', label: 'Messages', icon: 'mail' as const, path: '/parent/messages' },
      { id: 'teachers', label: 'Teachers', icon: 'graduation-cap' as const, path: '/parent/teachers' },
      { id: 'notifications', label: 'Notifications', icon: 'bell' as const, path: '/parent/notifications' },
    ],
  },
  {
    section: 'Settings',
    items: [
      { id: 'profile', label: 'My Profile', icon: 'user' as const, path: '/parent/profile' },
      { id: 'settings', label: 'Settings', icon: 'settings' as const, path: '/parent/settings' },
    ],
  },
]

export function ParentNavigation() {
  const pathname = usePathname()
  const { unreadCount } = useParentNotifications()

  return (
    <nav className="flex-1 overflow-y-auto p-4 space-y-6">
      {navigationItems.map((section) => (
        <div key={section.section}>
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
            {section.section}
          </h3>
          <ul className="space-y-1">
            {section.items.map((item) => {
              const isActive = pathname === item.path || pathname.startsWith(`${item.path}/`)
              const IconComponent = iconMap[item.icon] ?? LayoutDashboard
              const showBadge = item.path === '/parent/notifications' && unreadCount > 0

              return (
                <li key={item.id}>
                  <Link
                    href={item.path}
                    className={cn(
                      'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    )}
                  >
                    <IconComponent className="h-4 w-4 shrink-0" />
                    {item.label}
                    {showBadge && (
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
  )
}
