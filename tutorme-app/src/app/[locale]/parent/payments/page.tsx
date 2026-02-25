'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CreditCard, Download, Eye } from 'lucide-react'

const paymentHistory = [
  { id: '1', date: '2026-02-15', description: 'Mathematics Tutoring - Emily', amount: 800, status: 'completed', method: 'Credit Card' },
  { id: '2', date: '2026-02-10', description: 'Physics Class - Michael', amount: 600, status: 'completed', method: 'WeChat Pay' },
  { id: '3', date: '2026-02-01', description: 'English Tutoring - Emily', amount: 500, status: 'completed', method: 'Credit Card' },
]

const upcomingPayments = [
  { id: '1', dueDate: '2026-02-25', description: 'Mathematics Tutoring - Emily', amount: 800 },
  { id: '2', dueDate: '2026-02-28', description: 'Science Lab - Michael', amount: 600 },
]

export default function ParentPaymentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Payments</h1>
        <p className="text-gray-500 mt-1">Manage your payments and view transaction history</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-gray-500">Total Spent (This Month)</p>
            <p className="text-3xl font-bold mt-2">¥3,200</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-gray-500">Upcoming Payments</p>
            <p className="text-3xl font-bold mt-2">¥1,400</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-gray-500">Monthly Budget</p>
            <p className="text-3xl font-bold mt-2">¥5,000</p>
            <p className="text-sm text-green-600 mt-1">¥1,800 remaining</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="history">
        <TabsList>
          <TabsTrigger value="history">Payment History</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming Payments</TabsTrigger>
          <TabsTrigger value="methods">Payment Methods</TabsTrigger>
        </TabsList>
        
        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {paymentHistory.map((payment) => (
                  <div key={payment.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">{payment.description}</p>
                      <p className="text-sm text-gray-500">{payment.date} • {payment.method}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">¥{payment.amount}</p>
                      <Badge variant="outline" className="text-green-600">{payment.status}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="upcoming">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Payments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingPayments.map((payment) => (
                  <div key={payment.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">{payment.description}</p>
                      <p className="text-sm text-gray-500">Due: {payment.dueDate}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <p className="font-semibold">¥{payment.amount}</p>
                      <Button size="sm">
                        <CreditCard className="h-4 w-4 mr-2" />
                        Pay Now
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="methods">
          <Card>
            <CardHeader>
              <CardTitle>Saved Payment Methods</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded">
                      <CreditCard className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">Visa ending in 4242</p>
                      <p className="text-sm text-gray-500">Expires 12/26</p>
                    </div>
                  </div>
                  <Badge>Default</Badge>
                </div>
                <Button variant="outline" className="w-full">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Add New Payment Method
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
