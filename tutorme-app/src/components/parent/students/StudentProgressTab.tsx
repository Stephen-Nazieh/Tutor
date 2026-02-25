interface StudentProgressData {
  academicMetrics: AcademicMetrics
  subjectBreakdown: SubjectProgress[]
  learningTrajectory: LearningTrajectory
  skillDevelopment: SkillDevelopment
  comparativeAnalysis: ComparativeData
  teacherComments: TeacherComment[]
  aiGeneratedInsights: AIInsight[]
}

export const StudentProgressTab = ({ studentId }) => {
  const progressData = useStudentProgress(studentId)
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Academic Overview */}
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Academic Performance Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <LearningTrajectoryChart data={progressData.learningTrajectory} />
          <KeyMetricsGrid metrics={progressData.academicMetrics} />
        </CardContent>
      </Card>

      {/* Subject Performance */}
      <SubjectPerformanceBreakdown subjects={progressData.subjectBreakdown} />

      {/* Skills Development */}
      <SkillDevelopmentRadar skills={progressData.skillDevelopment} />

      {/* Comparative Analysis */}
      <ComparativeResultsSection comparisons={progressData.comparativeAnalysis} />

      {/* AI Insights */}
      <AIInsightsSection insights={progressData.aiGeneratedInsights} />

      {/* Teacher Feedback */}
      <TeacherCommentsSection comments={progressData.teacherComments} />
    </div>
  )
}