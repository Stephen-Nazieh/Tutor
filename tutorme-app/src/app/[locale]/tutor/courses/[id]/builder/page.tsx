/**
 * Course Builder 2.0 Page
 * Renders the shared Class | Course Builder tabbed page with Course Builder tab active.
 */

'use client'

import { useParams } from 'next/navigation'
import { CourseBuilderCourseRoute } from '../../components/CourseBuilderCourseRoute'

export default function CourseBuilderPage() {
  const params = useParams()
  const courseId = (params?.id as string) ?? null

  return <CourseBuilderCourseRoute courseId={courseId} />
}
