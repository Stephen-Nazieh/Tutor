'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ArrowLeft, Loader2, CreditCard, Webhook } from 'lucide-react'

interface PaymentRow {
  id: string
  bookingId: string
  amount: number
  currency: string
  status: string
  gateway: string
  gatewayPaymentId: string | null
  paidAt: string | null
  createdAt: string
  booking?: { id: string; clinic?: { title: string; subject: string } }
}

interface WebhookRow {
  id: string
  gateway: string
  eventType: string
  processed: boolean
  processedAt: string | null
  createdAt: string
}

export default function AdminPaymentsPage() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [payments, setPayments] = useState<PaymentRow[]>([])
  const [events, setEvents] = useState<WebhookRow[]>([])
  const [loadingPayments, setLoadingPayments] = useState(true)
  const [loadingEvents, setLoadingEvents] = useState(true)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
      return
    }
    if (session?.user?.role !== 'ADMIN') {
      router.push('/')
      return
    }
  }, [session, status, router])

  useEffect(() => {
    if (session?.user?.role !== 'ADMIN') return
    fetch('/api/admin/payments?limit=50')
      .then((res) => res.json())
      .then((data) => {
        setPayments(data.payments || [])
      })
      .catch(() => setPayments([]))
      .finally(() => setLoadingPayments(false))
  }, [session?.user?.role])

  useEffect(() => {
    if (session?.user?.role !== 'ADMIN') return
    fetch('/api/admin/webhook-events?limit=50')
      .then((res) => res.json())
      .then((data) => {
        setEvents(data.events || [])
      })
      .catch(() => setEvents([]))
      .finally(() => setLoadingEvents(false))
  }, [session?.user?.role])

  if (status === 'loading' || session?.user?.role !== 'ADMIN') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <header className="bg-white border-b sticky top-0 z-10 safe-top">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-xl font-bold">Admin – Payments</h1>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <Tabs defaultValue="payments">
          <TabsList>
            <TabsTrigger value="payments">
              <CreditCard className="h-4 w-4 mr-2" />
              Payments ({payments.length})
            </TabsTrigger>
            <TabsTrigger value="webhooks">
              <Webhook className="h-4 w-4 mr-2" />
              Webhook events ({events.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="payments" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Payments</CardTitle>
              </CardHeader>
              <CardContent>
                {loadingPayments ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
                  </div>
                ) : payments.length === 0 ? (
                  <p className="text-gray-500 py-8 text-center">No payments</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2">ID</th>
                          <th className="text-left py-2">Amount</th>
                          <th className="text-left py-2">Status</th>
                          <th className="text-left py-2">Gateway</th>
                          <th className="text-left py-2">Paid at</th>
                          <th className="text-left py-2">Created</th>
                        </tr>
                      </thead>
                      <tbody>
                        {payments.map((p) => (
                          <tr key={p.id} className="border-b">
                            <td className="py-2 font-mono text-xs">{p.id.slice(0, 8)}…</td>
                            <td className="py-2">
                              {p.currency} {p.amount.toFixed(2)}
                            </td>
                            <td className="py-2">
                              <Badge variant={p.status === 'COMPLETED' ? 'default' : 'secondary'}>{p.status}</Badge>
                            </td>
                            <td className="py-2">{p.gateway}</td>
                            <td className="py-2 text-gray-600">{p.paidAt ? new Date(p.paidAt).toLocaleString() : '–'}</td>
                            <td className="py-2 text-gray-600">{new Date(p.createdAt).toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="webhooks" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Webhook events</CardTitle>
              </CardHeader>
              <CardContent>
                {loadingEvents ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
                  </div>
                ) : events.length === 0 ? (
                  <p className="text-gray-500 py-8 text-center">No webhook events</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2">ID</th>
                          <th className="text-left py-2">Gateway</th>
                          <th className="text-left py-2">Event</th>
                          <th className="text-left py-2">Processed</th>
                          <th className="text-left py-2">Created</th>
                        </tr>
                      </thead>
                      <tbody>
                        {events.map((e) => (
                          <tr key={e.id} className="border-b">
                            <td className="py-2 font-mono text-xs">{e.id.slice(0, 8)}…</td>
                            <td className="py-2">{e.gateway}</td>
                            <td className="py-2">{e.eventType}</td>
                            <td className="py-2">
                              <Badge variant={e.processed ? 'default' : 'secondary'}>
                                {e.processed ? 'Yes' : 'No'}
                              </Badge>
                            </td>
                            <td className="py-2 text-gray-600">{new Date(e.createdAt).toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
