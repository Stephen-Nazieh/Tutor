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
    color: 'bg-[#4FD1C5]'
  },
  {
    id: 'parent',
    title: 'Parent',
    icon: Users,
    href: '/register/parent',
    color: 'bg-[#1D4ED8]'
  },
  {
    id: 'tutor',
    title: 'Tutor',
    icon: GraduationCap,
    href: '/register/tutor',
    color: 'bg-[#F17623]'
  },
  {
    id: 'admin',
    title: 'Administrator',
    icon: Shield,
    href: '/register/admin',
    color: 'bg-[#1F2933]'
  }
]

export default function RoleSelectionPage() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="max-w-5xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#1F2933] mb-4">Create Your Account</h1>
          <p className="text-lg text-gray-600">
            Choose your role to get started with Solocorn
          </p>
        </div>

        {/* Role Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {roles.map((role) => (
            <Link key={role.id} href={role.href}>
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer border-2 border-transparent hover:border-[#4FD1C5]">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className={`${role.color} p-4 rounded-xl text-white`}>
                      <role.icon className="h-10 w-10" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-[#1F2933]">{role.title}</h2>
                    </div>
                  </div>
                  <Button 
                    className={`w-full mt-6 ${role.id === 'student' ? 'bg-[#4FD1C5] hover:bg-[#3bc4b2]' : role.id === 'parent' ? 'bg-[#1D4ED8] hover:bg-[#1e40af]' : role.id === 'tutor' ? 'bg-[#F17623] hover:bg-[#e06613]' : 'bg-[#1F2933] hover:bg-[#111820]'}`}
                  >
                    Register as {role.title}
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <p className="text-gray-600">
            Already have an account?{' '}
            <Link href="/login" className="text-[#1D4ED8] hover:underline font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
