interface StudentOverview {
  student: ParentStudent
  currentClasses: ClassInfo[]
  recentProgress: ProgressSummary
  upcomingTasks: Task[]
  aiInsights: AIInsights
  financialSummary: StudentFinancialSummary
}

export const ParentStudentsOverview = () => {
  const students = useParentStudents()
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {students.map(student => (
        <StudentDashboardCard
          key={student.id}
          student={student}
          onViewDetails={() => router.push(`/parent/students/${student.id}`)}
          onViewProgress={() => router.push(`/parent/students/${student.id}/progress`)}
          onManageSchedule={() => router.push(`/parent/students/${student.id}/schedule`)}
          onViewPayments={() => router.push(`/parent/students/${student.id}/payments`)}
        >
          <StudentQuickStats />
          <AIInsightsPreview />
          <UpcomingTasksPreview />
        </StudentDashboardCard>
      ))}
    </div>
  )
}