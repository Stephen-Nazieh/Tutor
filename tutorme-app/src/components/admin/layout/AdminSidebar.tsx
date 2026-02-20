'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  Users,
  ToggleLeft,
  Brain,
  BarChart3,
  Settings,
  Shield,
  FileText,
  ScrollText,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'

interface AdminSidebarProps {
  collapsed: boolean
  onToggle: () => void
}

const navItems = [
  {
    title: 'Dashboard',
    href: '/admin',
    icon: LayoutDashboard,
    permission: null, // All admins
  },
  {
    title: 'Users',
    href: '/admin/users',
    icon: Users,
    permission: 'users:read',
  },
  {
    title: 'Feature Flags',
    href: '/admin/feature-flags',
    icon: ToggleLeft,
    permission: 'features:read',
  },
  {
    title: 'LLM Config',
    href: '/admin/llm',
    icon: Brain,
    permission: 'llm:read',
  },
  {
    title: 'Analytics',
    href: '/admin/analytics',
    icon: BarChart3,
    permission: 'analytics:read',
  },
  {
    title: 'Content',
    href: '/admin/content',
    icon: FileText,
    permission: 'content:read',
  },
  {
    title: 'Security',
    href: '/admin/security',
    icon: Shield,
    permission: 'security:read',
  },
  {
    title: 'Settings',
    href: '/admin/settings',
    icon: Settings,
    permission: 'settings:read',
  },
  {
    title: 'Audit Logs',
    href: '/admin/audit-log',
    icon: ScrollText,
    permission: 'audit:read',
  },
]

export function AdminSidebar({ collapsed, onToggle }: AdminSidebarProps) {
  const pathname = usePathname()

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-40 h-screen bg-slate-900 text-white transition-all duration-300',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      {/* Header */}
      <div className="flex h-16 items-center justify-between border-b border-slate-700 px-4">
        {!collapsed && (
          <Link href="/admin" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
              <span className="text-lg font-bold">A</span>
            </div>
            <span className="font-semibold">Admin</span>
          </Link>
        )}
        <button
          onClick={onToggle}
          className={cn(
            'flex h-8 w-8 items-center justify-center rounded-lg hover:bg-slate-800',
            collapsed && 'mx-auto'
          )}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="space-y-1 p-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors',
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white',
                collapsed && 'justify-center px-2'
              )}
              title={collapsed ? item.title : undefined}
            >
              <Icon size={20} />
              {!collapsed && <span className="text-sm">{item.title}</span>}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      {!collapsed && (
        <div className="absolute bottom-0 left-0 right-0 border-t border-slate-700 p-4">
          <div className="text-xs text-slate-500">
            TutorMe Admin v1.0
          </div>
        </div>
      )}
    </aside>
  )
}
