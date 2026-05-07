'use client'

import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { GraduationCap, Users, BookOpen, Shield } from 'lucide-react'

const roles = [
  {
    id: 'student',
    title: 'Student',
    icon: BookOpen,
    href: '/register/student',
    color: 'bg-[#2563EB]',
    hoverBg: 'hover:bg-[#1D4ED8]',
    shadow: 'shadow-[0_8px_24px_rgba(37,99,235,0.18)]',
    hoverShadow: 'hover:shadow-[0_12px_32px_rgba(37,99,235,0.28)]',
  },
  {
    id: 'parent',
    title: 'Parent',
    icon: Users,
    href: '/register/parent',
    color: 'bg-[#059669]',
    hoverBg: 'hover:bg-[#047857]',
    shadow: 'shadow-[0_8px_24px_rgba(5,150,105,0.18)]',
    hoverShadow: 'hover:shadow-[0_12px_32px_rgba(5,150,105,0.28)]',
  },
  {
    id: 'tutor',
    title: 'Tutor',
    icon: GraduationCap,
    href: '/register/tutor',
    color: 'bg-[#F17623]',
    hoverBg: 'hover:bg-[#e06613]',
    shadow: 'shadow-[0_8px_24px_rgba(241,118,35,0.18)]',
    hoverShadow: 'hover:shadow-[0_12px_32px_rgba(241,118,35,0.28)]',
  },
  {
    id: 'admin',
    title: 'Administrator',
    icon: Shield,
    href: '/register/admin',
    color: 'bg-[#7C3AED]',
    hoverBg: 'hover:bg-[#6D28D9]',
    shadow: 'shadow-[0_8px_24px_rgba(124,58,237,0.18)]',
    hoverShadow: 'hover:shadow-[0_12px_32px_rgba(124,58,237,0.28)]',
  },
]

export default async function RoleSelectionPage({
  params,
}: {
  params: Promise<{ locale?: string }>
}) {
  const { locale } = await params
  const localePrefix = locale ? `/${locale}` : ''

  return (
    <div className="flex min-h-screen items-center justify-center bg-white p-4">
      <div className="w-full max-w-3xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold text-[#374151]">Create Your Account</h1>
        </div>

        {/* Role Cards */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {roles.map(role => (
            <Link key={role.id} href={`${localePrefix}${role.href}`}>
              <Card className="h-full cursor-pointer border-0 bg-white shadow-[0_6px_20px_rgba(0,0,0,0.08)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(0,0,0,0.14)]">
                <CardContent className="p-5">
                  <div className="flex items-center gap-3">
                    <div
                      className={`${role.color} rounded-xl p-3 text-white transition-all duration-200 ${role.hoverBg} ${role.shadow} ${role.hoverShadow}`}
                    >
                      <role.icon className="h-7 w-7" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-xl font-bold text-[#374151]">{role.title}</h2>
                    </div>
                  </div>
                  <Button
                    className={`mt-5 h-10 w-full text-sm font-semibold text-white ${role.color} ${role.hoverBg} border-0 shadow-[0_4px_14px_rgba(0,0,0,0.1)] transition-all duration-200 hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)]`}
                  >
                    Register
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-[#6B7280]">
            Already have an account?{' '}
            <Link
              href={`${localePrefix}/login`}
              className="font-medium text-[#1D4ED8] hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
