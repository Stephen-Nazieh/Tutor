'use client'

import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { GraduationCap, Users, BookOpen, Shield } from 'lucide-react'

const roles = [
  {
    id: 'student',
    title: 'Student',
    description: 'Learn and improve your skills',
    icon: BookOpen,
    href: '/register/student',
    color: 'bg-[#4FD1C5]'
  },
  {
    id: 'parent',
    title: 'Parent',
    description: 'Manage your child\'s education',
    icon: Users,
    href: '/register/parent',
    color: 'bg-[#1D4ED8]'
  },
  {
    id: 'tutor',
    title: 'Tutor',
    description: 'Teach and help students learn',
    icon: GraduationCap,
    href: '/register/tutor',
    color: 'bg-[#F17623]'
  },
  {
    id: 'admin',
    title: 'Administrator',
    description: 'Manage the platform',
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
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className={`${role.color} p-3 rounded-xl text-white`}>
                      <role.icon className="h-8 w-8" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl text-[#1F2933]">{role.title}</CardTitle>
                      <CardDescription className="mt-2 text-base">
                        {role.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
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
