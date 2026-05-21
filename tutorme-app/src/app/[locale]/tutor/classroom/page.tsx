'use client'

import { Suspense } from 'react'
import { TutorInsightsPageInner } from '../insights/page'

export default function TutorClassroomPage() {
  return (
    <Suspense fallback={null}>
      <TutorInsightsPageInner />
    </Suspense>
  )
}
