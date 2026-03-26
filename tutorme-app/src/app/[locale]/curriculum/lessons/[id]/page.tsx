/**
 * Legacy Lesson Page Redirect
 * Old lesson layout is deprecated. Redirecting to student feedback classroom.
 */

import { redirect } from 'next/navigation'

export default function LegacyLessonPage({ params }: { params: { locale: string; id: string } }) {
  const { locale, id } = params
  // Redirect to student feedback which is the new classroom
  // We keep the locale and pass the ID as lesson context or just go to feedback
  redirect(`/${locale}/student/feedback?lessonId=${id}`)
}
