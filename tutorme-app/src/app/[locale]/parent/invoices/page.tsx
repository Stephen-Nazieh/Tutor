'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Download, FileText, Eye } from 'lucide-react'

const invoices = [
  {
    id: 'INV-2026-001',
    date: '2026-02-15',
    description: 'Mathematics Tutoring - Feb 2026',
    amount: 2400,
    status: 'paid',
    student: 'Emily'
  },
  {
    id: 'INV-2026-002',
    date: '2026-02-10',
    description: 'Physics Class - Feb 2026',
    amount: 1800,
    status: 'paid',
    student: 'Michael'
  },
  {
    id: 'INV-2026-003',
    date: '2026-01-15',
    description: 'English Tutoring - Jan 2026',
    amount: 1500,
    status: 'paid',
    student: 'Emily'
  }
]

export default function ParentInvoicesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Invoices</h1>
        <p className="text-gray-500 mt-1">View and download your payment invoices</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Invoice History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {invoices.map((invoice) => (
              <div key={invoice.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-blue-100 rounded">
                    <FileText className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">{invoice.id}</p>
                    <p className="text-sm text-gray-500">{invoice.description}</p>
                    <p className="text-xs text-gray-400">For: {invoice.student} • {invoice.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-semibold">¥{invoice.amount}</p>
                    <Badge variant="outline" className="text-green-600">{invoice.status}</Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
