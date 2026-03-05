'use client'

import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { GraduationCap, Users, BookOpen, Shield } from 'lucide-react'

const roles = [
  {
    id: 'student',
    title: 'Student',
    description: 'I want to learn and improve my skills',
    icon: BookOpen,
    href: '/register/student',
    color: 'bg-blue-600'
  },
  {
    id: 'parent',
    title: 'Parent',
    description: 'I want to manage my child\'s education',
    icon: Users,
    href: '/register/parent',
    color: 'bg-green-600'
  },
  {
    id: 'tutor',
    title: 'Tutor',
    description: 'I want to teach and help students learn',
    icon: GraduationCap,
    href: '/register/tutor',
    color: 'bg-purple-600'
  },
  {
    id: 'admin',
    title: 'Administrator',
    description: 'I want to manage the platform',
    icon: Shield,
    href: '/register/admin',
    color: 'bg-orange-600'
  }
]

export default function RoleSelectionPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-5xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Create Your Account</h1>
          <p className="text-lg text-gray-600">
            Choose your role to get started with TutorMe
          </p>
        </div>

        {/* Role Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {roles.map((role) => (
            <Link key={role.id} href={role.href}>
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer border-2 border-transparent hover:border-blue-200">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className={`${role.color} p-3 rounded-xl text-white`}>
                      <role.icon className="h-8 w-8" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl">{role.title}</CardTitle>
                      <CardDescription className="mt-2 text-base">
                        {role.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Button className="w-full mt-6" variant={role.id === 'parent' ? 'default' : 'outline'}>
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
            <Link href="/login" className="text-blue-600 hover:underline font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
