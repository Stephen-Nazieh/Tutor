'use client'

import { useMemo } from 'react'
import { useSession } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import { PDFTutoringWorkbench } from '@/components/pdf-tutoring/PDFTutoringWorkbench'

export default function TutorPdfTutoringPage() {
  const { data: session } = useSession()
  const searchParams = useSearchParams()
  const roomId = useMemo(() => {
    const requestedRoom = searchParams.get('room')
    if (requestedRoom) return requestedRoom
    const tutorId = session?.user?.id || 'anonymous-tutor'
    return `pdf-tutor-${tutorId}`
  }, [searchParams, session?.user?.id])

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div>
        <h1 className="text-2xl font-semibold">PDF Tutoring Engine</h1>
        <p className="text-sm text-muted-foreground">
          Collaborative PDF canvas, multimodal AI reading/marking, and flattened marked output.
        </p>
      </div>

      <PDFTutoringWorkbench roomId={roomId} />
    </div>
  )
}
