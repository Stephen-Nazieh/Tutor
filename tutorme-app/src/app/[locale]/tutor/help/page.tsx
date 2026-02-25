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
  PlayCircle
} from 'lucide-react'
import Link from 'next/link'

const faqs = [
  {
    question: 'How do I create a new class?',
    answer: 'Go to your Dashboard and click "Create New Class" or use the Quick Actions menu. Fill in the class details and schedule.',
  },
  {
    question: 'How do I use the Course Builder?',
    answer: 'Navigate to Courses > Course Builder. Select a course to edit, then use the drag-and-drop interface to organize modules and lessons.',
  },
  {
    question: 'How do students join my classes?',
    answer: 'Share the class join link with your students. You can find the link in the My Classes section or copy it directly from the class card.',
  },
  {
    question: 'Can I schedule recurring classes?',
    answer: 'Yes! When creating a class, you can set it to repeat weekly or monthly. Manage all schedules from the Calendar page.',
  },
]

const guides = [
  { title: 'Getting Started Guide', icon: BookOpen, description: 'Learn the basics of TutorMe' },
  { title: 'Video Tutorials', icon: PlayCircle, description: 'Watch step-by-step tutorials' },
  { title: 'Teaching Best Practices', icon: FileText, description: 'Tips for effective online teaching' },
  { title: 'Live Class Guide', icon: Video, description: 'How to use the live classroom' },
]

export default function TutorHelpPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <HelpCircle className="h-6 w-6" />
          Help & Support
        </h1>
        <p className="text-gray-600 mt-1">
          Find answers, tutorials, and get support
        </p>
      </div>

      {/* Search */}
      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search for help..."
              className="pl-10 py-6 text-lg"
            />
          </div>
        </CardContent>
      </Card>

      {/* Guides Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {guides.map((guide) => {
          const Icon = guide.icon
          return (
            <Card key={guide.title} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <Icon className="h-10 w-10 text-blue-500 mb-4" />
                <h3 className="font-semibold text-gray-900">{guide.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{guide.description}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* FAQs */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>Quick answers to common questions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b last:border-0 pb-4 last:pb-0">
                  <h4 className="font-medium text-gray-900 mb-2">{faq.question}</h4>
                  <p className="text-gray-600 text-sm">{faq.answer}</p>
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
              <div className="pt-4 border-t">
                <p className="text-sm text-gray-500">
                  Available Monday-Friday<br />
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
