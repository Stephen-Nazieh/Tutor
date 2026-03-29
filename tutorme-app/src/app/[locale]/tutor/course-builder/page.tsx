'use client'

import { useParams } from 'next/navigation'
import { CourseBuilderCourseRoute } from '../courses/components/CourseBuilderCourseRoute'

export default function CourseBuilderPage() {
  const params = useParams()
  const courseId = (params?.id as string) ?? null

  return <CourseBuilderCourseRoute courseId={courseId} />
}
