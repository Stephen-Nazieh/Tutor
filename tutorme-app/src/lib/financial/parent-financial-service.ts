export interface FamilyPaymentItem {
  id: string
  type: 'course' | 'clinic' | 'budget'
  amount: number
  currency: string
  status: string
  createdAt: Date
  paidAt?: Date | null
  description?: string | null
  studentName?: string | null
}

export async function fetchFamilyPayments() : Promise<FamilyPaymentItem[]> {
  return []
}
