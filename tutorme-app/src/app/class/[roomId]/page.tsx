'use client'

import { useParams } from 'next/navigation'
import { ClassAndCourseBuilderTabs } from '../components/ClassAndCourseBuilderTabs'

export default function ClassRoomPage() {
  const params = useParams()
  const roomId = (params?.roomId as string) ?? null

  return (
    <ClassAndCourseBuilderTabs
      initialTab="class"
      roomId={roomId}
      courseId={null}
    />
  )
}
