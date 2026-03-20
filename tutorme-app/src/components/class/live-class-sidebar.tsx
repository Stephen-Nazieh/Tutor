'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  GraduationCap,
  Calendar,
  Palette,
  BookOpen,
  FileQuestion,
  Database,
  FolderOpen,
  Users,
  MessageSquare,
  UsersRound,
  HelpCircle,
  LogOut,
  Zap,
  Plus,
  Clock,
  Video,
  Wand2,
  BarChart3,
  FileText,
  DollarSign,
  Settings,
} from 'lucide-react'

interface SidebarProps {
  className?: string
  activeItem?: string
}

const overviewItems = [
  { id: 'dashboard', label: 'Dashboard', href: '/tutor/dashboard', icon: LayoutDashboard },
]

const teachingItems = [
  { id: 'classes', label: 'My Classes', href: '/tutor/classes', icon: GraduationCap },
  { id: 'calendar', label: 'Calendar', href: '/tutor/calendar', icon: Calendar },
  { id: 'whiteboards', label: 'Whiteboards', href: '/tutor/whiteboards', icon: Palette },
  { id: 'courses', label: 'My Page & Courses', href: '/tutor/my-page', icon: BookOpen },
  { id: 'quizzes', label: 'Quizzes', href: '/tutor/quizzes', icon: FileQuestion },
  { id: 'question-bank', label: 'Question Bank', href: '/tutor/question-bank', icon: Database },
  { id: 'resources', label: 'Resources', href: '/tutor/resources', icon: FolderOpen },
]

const peopleItems = [
  { id: 'students', label: 'Students', href: '/tutor/students', icon: Users },
  { id: 'messages', label: 'Messages', href: '/tutor/messages', icon: MessageSquare },
  { id: 'groups', label: 'My Groups', href: '/tutor/groups', icon: UsersRound },
]

const supportItems = [{ id: 'help', label: 'Support', href: '/tutor/help', icon: HelpCircle }]

const quickActions = [
  {
    id: 'start-live',
    label: 'Start Live Class',
    href: '/tutor/live-class',
    icon: Video,
    highlight: true,
  },
  { id: 'create-class', label: 'Create Class', href: '/tutor/classes/new', icon: Plus },
  { id: 'schedule', label: 'Schedule Class', href: '/tutor/calendar', icon: Clock },
  { id: 'hub', label: 'Hub', href: '/tutor/dashboard', icon: Zap },
]

const groupsItems = [
  { id: 'group-builder', label: 'Group Builder', href: '/tutor/group-builder', icon: UsersRound },
]

const contentItems = [
  { id: 'course-builder', label: 'Course Builder', href: '/tutor/my-page', icon: Wand2 },
]

const aiItems = [
  { id: 'ai-assistant', label: 'AI Teaching Assistant', href: '/tutor/ai-assistant', icon: Wand2 },
]

const analyticsItems = [
  { id: 'reports', label: 'Reports', href: '/tutor/reports', icon: BarChart3 },
  { id: 'revenue', label: 'Revenue', href: '/tutor/revenue', icon: DollarSign },
]

export function LiveClassSidebar({ className, activeItem }: SidebarProps) {
  const router = useRouter()

  const handleNavigation = (href: string) => {
    // Confirm before leaving if in active session
    if (window.confirm('Leave the live session? Your session will continue in the background.')) {
      router.push(href)
    }
  }

  const NavItem = ({ item }: { item: any }) => {
    const Icon = item.icon
    const isActive = activeItem === item.id

    return (
      <button
        onClick={() => handleNavigation(item.href)}
        className={cn(
          'flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
          'text-left hover:bg-gray-100',
          isActive && 'bg-blue-50 text-blue-600',
          item.highlight && 'font-medium text-blue-600'
        )}
      >
        <Icon className="h-4 w-4" />
        <span>{item.label}</span>
      </button>
    )
  }

  return (
    <aside className={cn('flex h-screen w-64 flex-col border-r bg-white', className)}>
      {/* Logo */}
      <div className="border-b p-4">
        <Link href="/tutor/dashboard" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
            <span className="font-bold text-white">T</span>
          </div>
          <span className="text-lg font-semibold">Solocorn</span>
        </Link>
      </div>

      {/* Navigation */}
      <div className="flex-1 space-y-6 overflow-y-auto px-3 py-4">
        {/* Overview */}
        <div>
          <p className="mb-2 px-3 text-xs font-semibold uppercase text-gray-400">Overview</p>
          {overviewItems.map(item => (
            <NavItem key={item.id} item={item} />
          ))}
        </div>

        {/* Teaching */}
        <div>
          <p className="mb-2 px-3 text-xs font-semibold uppercase text-gray-400">Teaching</p>
          {teachingItems.map(item => (
            <NavItem key={item.id} item={item} />
          ))}
        </div>

        {/* People */}
        <div>
          <p className="mb-2 px-3 text-xs font-semibold uppercase text-gray-400">People</p>
          {peopleItems.map(item => (
            <NavItem key={item.id} item={item} />
          ))}
        </div>

        {/* Quick Actions */}
        <div>
          <p className="mb-2 px-3 text-xs font-semibold uppercase text-gray-400">Quick Actions</p>
          {quickActions.map(item => (
            <NavItem key={item.id} item={item} />
          ))}
        </div>

        {/* Groups */}
        <div>
          <p className="mb-2 px-3 text-xs font-semibold uppercase text-gray-400">Groups</p>
          {groupsItems.map(item => (
            <NavItem key={item.id} item={item} />
          ))}
        </div>

        {/* Content */}
        <div>
          <p className="mb-2 px-3 text-xs font-semibold uppercase text-gray-400">Content</p>
          {contentItems.map(item => (
            <NavItem key={item.id} item={item} />
          ))}
        </div>

        {/* AI & Tools */}
        <div>
          <p className="mb-2 px-3 text-xs font-semibold uppercase text-gray-400">AI & Tools</p>
          {aiItems.map(item => (
            <NavItem key={item.id} item={item} />
          ))}
        </div>

        {/* Analytics */}
        <div>
          <p className="mb-2 px-3 text-xs font-semibold uppercase text-gray-400">Analytics</p>
          {analyticsItems.map(item => (
            <NavItem key={item.id} item={item} />
          ))}
        </div>

        {/* Support */}
        <div>
          <p className="mb-2 px-3 text-xs font-semibold uppercase text-gray-400">Support</p>
          {supportItems.map(item => (
            <NavItem key={item.id} item={item} />
          ))}
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="space-y-2 border-t p-4">
        <button
          onClick={() => handleNavigation('/tutor/settings')}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-gray-100"
        >
          <Settings className="h-4 w-4" />
          <span>Settings</span>
        </button>
        <button
          onClick={() => {
            /* Handle logout */
          }}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50"
        >
          <LogOut className="h-4 w-4" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  )
}
