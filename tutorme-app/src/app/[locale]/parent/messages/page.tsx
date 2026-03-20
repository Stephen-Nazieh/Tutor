'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Send, Paperclip } from 'lucide-react'

const conversations = [
  {
    id: '1',
    tutor: 'Mr. Zhang',
    subject: 'Mathematics',
    lastMessage: 'Emily is doing great in algebra!',
    time: '2 hours ago',
    unread: true,
  },
  {
    id: '2',
    tutor: 'Ms. Li',
    subject: 'Physics',
    lastMessage: 'Michael submitted his assignment.',
    time: '5 hours ago',
    unread: false,
  },
]

export default function ParentMessagesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Messages</h1>
        <p className="mt-1 text-gray-500">Communicate with your children's tutors</p>
      </div>

      <div className="grid h-[600px] grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Conversations List */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Conversations</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {conversations.map(conv => (
                <button
                  key={conv.id}
                  className="w-full p-4 text-left transition-colors hover:bg-gray-50"
                >
                  <div className="flex items-start gap-3">
                    <Avatar>
                      <AvatarFallback>{conv.tutor[0]}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <p className="truncate font-medium">{conv.tutor}</p>
                        <span className="text-xs text-gray-500">{conv.time}</span>
                      </div>
                      <p className="text-sm text-gray-500">{conv.subject}</p>
                      <p className="mt-1 truncate text-sm">{conv.lastMessage}</p>
                    </div>
                    {conv.unread && <div className="h-2 w-2 rounded-full bg-blue-600" />}
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Chat Area */}
        <Card className="flex flex-col lg:col-span-2">
          <CardHeader className="border-b">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback>Z</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-base">Mr. Zhang</CardTitle>
                <p className="text-sm text-gray-500">Mathematics Tutor</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex flex-1 flex-col">
            <div className="flex-1 space-y-4 overflow-y-auto py-4">
              <div className="flex gap-3">
                <Avatar>
                  <AvatarFallback>Z</AvatarFallback>
                </Avatar>
                <div className="max-w-[70%] rounded-lg bg-gray-100 p-3">
                  <p className="text-sm">
                    Hello! I wanted to let you know that Emily is doing excellent in our algebra
                    lessons. She's really grasping the concepts quickly.
                  </p>
                  <span className="mt-1 text-xs text-gray-500">2 hours ago</span>
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <div className="max-w-[70%] rounded-lg bg-blue-600 p-3 text-white">
                  <p className="text-sm">
                    That's wonderful news! Thank you for the update. How is she doing with the
                    homework assignments?
                  </p>
                  <span className="mt-1 text-xs text-blue-200">1 hour ago</span>
                </div>
              </div>
              <div className="flex gap-3">
                <Avatar>
                  <AvatarFallback>Z</AvatarFallback>
                </Avatar>
                <div className="max-w-[70%] rounded-lg bg-gray-100 p-3">
                  <p className="text-sm">
                    She's completing all her assignments on time and with great accuracy. I'm very
                    impressed with her progress!
                  </p>
                  <span className="mt-1 text-xs text-gray-500">30 minutes ago</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2 border-t pt-4">
              <Button variant="ghost" size="icon">
                <Paperclip className="h-4 w-4" />
              </Button>
              <Input placeholder="Type a message..." className="flex-1" />
              <Button size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
