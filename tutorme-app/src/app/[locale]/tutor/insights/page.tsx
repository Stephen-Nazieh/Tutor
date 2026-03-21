/**
 * Insights Page with Full Course Builder
 * Embeds the complete course builder experience with task/assessment builders and PCI
 */

'use client'

import { useParams, useSearchParams } from 'next/navigation'
import { CourseBuilderContent } from '../courses/components/CourseBuilderContent'

export default function InsightsPage() {
  const searchParams = useSearchParams()
  const courseId = searchParams.get('courseId')

  if (!courseId) {
    return (
      <div className="flex h-full flex-col items-center justify-center p-8 text-center">
        <h2 className="text-xl font-semibold text-gray-700">No Course Selected</h2>
        <p className="mt-2 text-gray-500">Please select a course to access the Insights & Builder</p>
      </div>
    )
  }

  // Render the full CourseBuilderContent
  return <CourseBuilderContent courseId={courseId} />
}
