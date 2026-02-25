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
  ChevronRight
} from 'lucide-react'

const faqs = [
  {
    question: 'How do I join a live class?',
    answer: 'Go to My Classes and click on the "Join" button for your scheduled class. You can also join from the Dashboard.',
  },
  {
    question: 'How do I access the AI Tutor?',
    answer: 'Click on AI Tutor in the left navigation or use the Quick Actions menu. You can ask questions anytime!',
  },
  {
    question: 'Where can I find my assignments?',
    answer: 'All your homework and assignments are in the Assignments section. You\'ll also see reminders on your Dashboard.',
  },
  {
    question: 'How do I track my progress?',
    answer: 'Visit the Progress page to see detailed statistics about your learning journey and achievements.',
  },
]

const guides = [
  { title: 'Getting Started', icon: BookOpen, description: 'Learn how to use the platform' },
  { title: 'Video Tutorials', icon: Video, description: 'Watch helpful tutorial videos' },
  { title: 'Study Tips', icon: BookOpen, description: 'Best practices for online learning' },
]

export default function StudentHelpPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <HelpCircle className="h-6 w-6" />
          Help & Support
        </h1>
        <p className="text-gray-600 mt-1">
          Find answers and get help when you need it
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

      {/* Guides */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
              <CardTitle>Need More Help?</CardTitle>
              <CardDescription>Contact our support team</CardDescription>
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
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
