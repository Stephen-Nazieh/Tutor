'use client'

import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export interface StudentNeedingAttention {
  id: string
  name: string
  initial: string
  color: string
  issue: string
}

interface Props {
  students: StudentNeedingAttention[]
  loading?: boolean
}

export function StudentsNeedingAttentionCard({ students, loading }: Props) {
  const router = useRouter()
  return (
    <Card>
      <CardHeader>
        <CardTitle>Students Needing Attention</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-3" aria-busy="true">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse" />
                  <div className="space-y-2">
                    <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                    <div className="h-3 w-40 bg-gray-200 rounded animate-pulse" />
                  </div>
                </div>
                <div className="h-8 w-20 bg-gray-200 rounded animate-pulse" />
              </div>
            ))}
          </div>
        ) : students.length === 0 ? (
          <p className="text-sm text-gray-500 py-4 text-center">No students need attention right now.</p>
        ) : (
          <div className="space-y-3">
            {students.map((s) => (
              <div key={s.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center font-semibold bg-gray-100 text-gray-700">
                    {s.initial}
                  </div>
                  <div>
                    <p className="font-medium">{s.name}</p>
                    <p className="text-sm text-gray-600">{s.issue}</p>
                  </div>
                </div>
                <Button size="sm" variant="outline" onClick={() => router.push(`/tutor/reports/${s.id}`)}>
                  View Details
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
