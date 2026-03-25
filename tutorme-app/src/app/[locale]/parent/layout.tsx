'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'
import { useParentNotifications } from '@/hooks/useParentNotifications'
import { useState } from 'react'
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
  Menu,
  X,
} from 'lucide-react'

const navigation = [
  {
    section: 'Overview',
    items: [
      { name: 'Dashboard', href: '/parent/dashboard', icon: LayoutDashboard },
      { name: 'My Children', href: '/parent/children', icon: Users },
      { name: 'Progress', href: '/parent/progress', icon: GraduationCap },
    ],
  },
  {
    section: 'Learning',
    items: [
      { name: 'Classes & Schedule', href: '/parent/classes', icon: Calendar },
      { name: 'Assignments', href: '/parent/assignments', icon: BookOpen },
      { name: 'Shared Courses', href: '/parent/courses', icon: Share2 },
    ],
  },
  {
    section: 'Financial',
    items: [
      { name: 'Payments', href: '/parent/payments', icon: CreditCard },
      { name: 'Invoices', href: '/parent/invoices', icon: CreditCard },
    ],
  },
  {
    section: 'Communication',
    items: [
      { name: 'Messages', href: '/parent/messages', icon: MessageSquare },
      { name: 'Notifications', href: '/parent/notifications', icon: Bell },
    ],
  },
  {
    section: 'Settings',
    items: [
      { name: 'Profile', href: '/parent/profile', icon: Users },
      { name: 'Settings', href: '/parent/settings', icon: Settings },
    ],
  },
]

function SidebarContent({
  pathname,
  unreadCount,
  onItemClick,
}: {
  pathname: string
  unreadCount: number
  onItemClick?: () => void
}) {
  return (
    <>
      {/* Logo */}
      <div className="border-b p-4">
        <Link href="/parent/dashboard" className="text-xl font-bold text-blue-600">
          Solocorn Parent
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-6 overflow-y-auto p-4">
        {navigation.map(section => (
          <div key={section.section}>
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
              {section.section}
            </h3>
            <ul className="space-y-1">
              {section.items.map(item => {
                const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      onClick={onItemClick}
                      className={cn(
                        'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                        isActive
                          ? 'bg-blue-50 text-blue-700'
                          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                      )}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.name}
                      {item.name === 'Notifications' && unreadCount > 0 && (
                        <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1.5 text-xs text-white">
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
      <div className="border-t p-4">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-gray-600"
          onClick={() => signOut({ callbackUrl: '/' })}
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </>
  )
}

export default function ParentLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { unreadCount } = useParentNotifications()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b bg-white px-4 lg:hidden">
        <Link href="/parent/dashboard" className="text-lg font-bold text-blue-600">
          Solocorn Parent
        </Link>
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <div className="flex h-full flex-col">
              <SidebarContent
                pathname={pathname}
                unreadCount={unreadCount}
                onItemClick={() => setMobileMenuOpen(false)}
              />
            </div>
          </SheetContent>
        </Sheet>
      </header>

      <div className="flex h-[calc(100vh-64px)] lg:h-screen">
        {/* Desktop Sidebar */}
        <aside className="hidden w-64 flex-col border-r bg-white lg:flex">
          <SidebarContent pathname={pathname} unreadCount={unreadCount} />
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-4 lg:p-8">{children}</div>
        </main>
      </div>
    </div>
  )
}
