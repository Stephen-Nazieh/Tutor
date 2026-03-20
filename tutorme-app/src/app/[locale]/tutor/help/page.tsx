'use client'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  HelpCircle,
  Search,
  BookOpen,
  MessageCircle,
  Video,
  Mail,
  ChevronRight,
  FileText,
  PlayCircle,
} from 'lucide-react'
import Link from 'next/link'

const faqs = [
  {
    question: 'How do I create a new class?',
    answer:
      'Go to your Dashboard and click "Create New Class" or use the Quick Actions menu. Fill in the class details and schedule.',
  },
  {
    question: 'How do I use the Course Builder?',
    answer:
      'Navigate to Courses > Course Builder. Select a course to edit, then use the drag-and-drop interface to organize modules and lessons.',
  },
  {
    question: 'How do students join my classes?',
    answer:
      'Share the class join link with your students. You can find the link in the My Classes section or copy it directly from the class card.',
  },
  {
    question: 'Can I schedule recurring classes?',
    answer:
      'Yes! When creating a class, you can set it to repeat weekly or monthly. Manage all schedules from the Calendar page.',
  },
]

const guides = [
  { title: 'Getting Started Guide', icon: BookOpen, description: 'Learn the basics of Solocorn' },
  { title: 'Video Tutorials', icon: PlayCircle, description: 'Watch step-by-step tutorials' },
  {
    title: 'Teaching Best Practices',
    icon: FileText,
    description: 'Tips for effective online teaching',
  },
  { title: 'Site Policies', icon: Video, description: 'Platform terms and guidelines' },
]

export default function TutorHelpPage() {
  return (
    <div className="w-full px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="flex items-center gap-2 text-2xl font-bold text-gray-900">
          <HelpCircle className="h-6 w-6" />
          Support
        </h1>
        <p className="mt-1 text-gray-600">Find answers, tutorials, and get support</p>
      </div>

      {/* Search */}
      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="relative mx-auto max-w-2xl">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <Input placeholder="Search" className="py-6 pl-10 text-lg" />
          </div>
        </CardContent>
      </Card>

      {/* Guides Grid */}
      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {guides.map(guide => {
          const Icon = guide.icon
          return (
            <Card key={guide.title} className="cursor-pointer transition-shadow hover:shadow-md">
              <CardContent className="p-6">
                <Icon className="mb-4 h-10 w-10 text-blue-500" />
                <h3 className="font-semibold text-gray-900">{guide.title}</h3>
                <p className="mt-1 text-sm text-gray-500">{guide.description}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* FAQs */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>Quick answers to common questions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b pb-4 last:border-0 last:pb-0">
                  <h4 className="mb-2 font-medium text-gray-900">{faq.question}</h4>
                  <p className="text-sm text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Contact Support */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Contact Support</CardTitle>
              <CardDescription>Need more help?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full justify-start gap-3">
                <MessageCircle className="h-5 w-5" />
                Live Chat
              </Button>
              <Button variant="outline" className="w-full justify-start gap-3">
                <Mail className="h-5 w-5" />
                Email Support
              </Button>
              <div className="border-t pt-4">
                <p className="text-sm text-gray-500">
                  Available Monday-Friday
                  <br />
                  9:00 AM - 6:00 PM SGT
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
