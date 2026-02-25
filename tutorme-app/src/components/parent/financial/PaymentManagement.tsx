interface PaymentSystem {
  quickActions: PaymentAction[]
  scheduledPayments: ScheduledPayment[]
  paymentMethods: PaymentMethod[]
  invoiceHistory: Invoice[]
  refundRequests: RefundRequest[]
  paymentSettings: PaymentSettings
}

export const ParentPaymentManagement = () => {
  const { paymentData, actions } = useParentPaymentSystem()
  
  return (
    <div className="payment-management-container">
      {/* Quick Actions */}
      <PaymentQuickActions 
        actions={paymentData.quickActions}
        onAction={handlePaymentAction}
      />
      
      {/* Scheduled Payments */}
      <ScheduledPaymentsTable 
        payments={paymentData.scheduledPayments}
        onCancel={handleCancelScheduledPayment}
        onModify={handleModifyScheduledPayment}
      />
      
      {/* Payment Methods */}
      <PaymentMethodsManager 
        methods={paymentData.paymentMethods}
        onAdd={handleAddPaymentMethod}
        onRemove={handleRemovePaymentMethod}
        onSetDefault={handleSetDefaultMethod}
      />
      
      {/* Invoice History */}
      <InvoiceHistoryTable 
        invoices={paymentData.invoiceHistory}
        onViewDetails={handleViewInvoice}
        onDownload={handleDownloadInvoice}
      />
      
      {/* Refund Requests */}
      <RefundRequestsSection 
        requests={paymentData.refundRequests}
        onSubmit={handleSubmitRefundRequest}
        onCancel={handleCancelRefundRequest}
      />
    </div>
  )
}