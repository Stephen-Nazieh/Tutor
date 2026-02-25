'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Bell, CheckCircle, AlertTriangle, Info, MessageCircle } from 'lucide-react'

const notifications = [
  {
    id: '1',
    type: 'urgent',
    title: 'Assignment Due Tomorrow',
    message: 'Emily has a Mathematics assignment due tomorrow.',
    time: '2 hours ago',
    read: false
  },
  {
    id: '2',
    type: 'info',
    title: 'Class Rescheduled',
    message: 'Physics class on Thursday has been moved to Friday.',
    time: '5 hours ago',
    read: false
  },
  {
    id: '3',
    type: 'success',
    title: 'Assignment Submitted',
    message: 'Michael has submitted his Physics lab report.',
    time: '1 day ago',
    read: true
  },
  {
    id: '4',
    type: 'message',
    title: 'New Message from Tutor',
    message: 'Mr. Zhang sent you a message about Emily\'s progress.',
    time: '2 days ago',
    read: true
  }
]

const getIcon = (type: string) => {
  switch (type) {
    case 'urgent': return <AlertTriangle className="h-5 w-5 text-red-600" />
    case 'success': return <CheckCircle className="h-5 w-5 text-green-600" />
    case 'message': return <MessageCircle className="h-5 w-5 text-blue-600" />
    default: return <Info className="h-5 w-5 text-blue-600" />
  }
}

export default function ParentNotificationsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
          <p className="text-gray-500 mt-1">Stay updated on your children&apos;s activities</p>
        </div>
        <Button variant="outline">
          <CheckCircle className="h-4 w-4 mr-2" />
          Mark All Read
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div 
                key={notification.id} 
                className={`flex items-start gap-4 p-4 rounded-lg ${
                  notification.read ? 'bg-gray-50' : 'bg-blue-50 border border-blue-100'
                }`}
              >
                <div className="p-2 bg-white rounded-full shadow-sm">
                  {getIcon(notification.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{notification.title}</h3>
                    {!notification.read && (
                      <Badge variant="default" className="text-[10px]">New</Badge>
                    )}
                  </div>
                  <p className="text-gray-600 mt-1">{notification.message}</p>
                  <p className="text-xs text-gray-400 mt-2">{notification.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
