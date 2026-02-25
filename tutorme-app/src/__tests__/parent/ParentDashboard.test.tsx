describe('Parent Dashboard System', () => {
  describe('Registration', () => {
    it('should allow parent registration with required fields', async () => {
      const parentData = generateParentRegistrationData()
      const response = await api.post('/api/auth/register', { 
        role: 'PARENT', 
        ...parentData 
      })
      
      expect(response.status).toBe(200)
      expect(response.data.user).toHaveProperty('id')
      expect(response.data.user.role).toBe('PARENT')
    })

    it('should validate student relationships during registration', async () => {
      const invalidData = generateInvalidParentData()
      const response = await api.post('/api/auth/register', { ...invalidData })
      
      expect(response.status).toBe(400)
      expect(response.data.error).toContain('student validation')
    })
  })

  describe('Dashboard Functionality', () => {
    it('should display student information correctly', async () => {
      const { students } = mockParentData
      
      render(<ParentDashboard />)
      
      expect(screen.getByText(students[0].name)).toBeInTheDocument()
      expect(screen.getByText('Upcoming Classes')).toBeInTheDocument()
      expect(screen.getByText('Recent Progress')).toBeInTheDocument()
    })

    it('should provide financial summary for parents', async () => {
      render(<ParentFinancialDashboard />)
      
      expect(screen.getByText(/Total Spending/i)).toBeInTheDocument()
      expect(screen.queryByText('$0.00')).not.toBeInTheDocument()
    })
  })

  describe('Financial Transactions', () => {
    it('should calculate commission correctly', () => {
      const amount = 100.00
      const { commission, netAmount } = calculateCommission(amount)
      
      expect(commission).toBe(20.00) // 20% commission
      expect(netAmount).toBe(80.00) // Net amount after commission
    })

    it('should track platform revenue accurately', async () => {
      const revenueData = await trackPlatformRevenue('test-payment-123', 20.00)
      
      expect(revenueData.amount).toBe(20.00)
      expect(revenueData.month).toMatch(/^\d{4}-\d{2}$/)
    })
  })
})