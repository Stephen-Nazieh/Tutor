'use client'

import { useState } from 'react'
import { useParentFinancialCalculations } from '@/hooks'

interface ParentFinancialDashboard {
  summary: FinancialSummary
  spendingHistory: SpendingHistory[]
  paymentHistory: PaymentHistory[]
  upcomingPayments: UpcomingPayment[]
  budgetSettings: BudgetSettings
  subscriptionStatus: SubscriptionStatus
  studentFinancials: StudentFinancialSummary[]
}

export default function ParentFinancialDashboard() {
  const { data: financialData } = useParentFinancialCalculations()
  const [selectedStudent, setSelectedStudent] = useState<string>('all')

  const tabs = [
    { id: 'overview', label: 'Financial Overview' },
    { id: 'spending', label: 'Spending Analysis' },
    { id: 'payments', label: 'Payment History' },
    { id: 'budget', label: 'Budget & Settings' }
  ]

  return (
    <div className="financial-dashboard-container">
      <FinancialSummarySection summary={financialData.summary} />
      
      <FinancialTabs
        activeTab={activeTab}
        tabs={tabs}
        onTabChange={setActiveTab}
      />
      
      <StudentSelector
        students={financialData.studentFinancials}
        selectedStudent={selectedStudent}
        onStudentChange={setSelectedStudent}
      />
      
      <FinancialContent>
        {activeTab === 'overview' && <OverviewTab data={financialData} selectedStudent={selectedStudent} />}
        {activeTab === 'spending' && <SpendingAnalysisTab data={financialData} selectedStudent={selectedStudent} />}
        {activeTab === 'payments' && <PaymentHistoryTab data={financialData} selectedStudent={selectedStudent} />}
        {activeTab === 'budget' && <BudgetSettingsTab data={financialData} selectedStudent={selectedStudent} />}
      </FinancialContent>
    </div>
  )
}