'use client'

import { useMemo } from 'react'
import { useSession } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import { PDFCollaborativeViewer } from '@/components/pdf-tutoring/PDFCollaborativeViewer'

export default function StudentPdfTutoringPage() {
  const { data: session } = useSession()
  const searchParams = useSearchParams()

  const roomId = useMemo(() => {
    const requestedRoom = searchParams.get('room')
    if (requestedRoom) return requestedRoom
    const studentId = session?.user?.id || 'anonymous-student'
    return `pdf-student-${studentId}`
  }, [searchParams, session?.user?.id])
  const initialDocUrl = useMemo(() => searchParams.get('doc') || undefined, [searchParams])

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div>
        <h1 className="text-2xl font-semibold">Student PDF Tutoring</h1>
        <p className="text-sm text-muted-foreground">
          Join tutor-led PDF sessions. Drawing lock state is controlled by tutor.
        </p>
      </div>

      <PDFCollaborativeViewer roomId={roomId} role="student" initialPdfUrl={initialDocUrl} />
    </div>
  )
}
