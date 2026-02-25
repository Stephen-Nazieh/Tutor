interface AccountManagementData {
  userAccounts: UserAccount[]
  pendingApprovals: PendingApproval[]
  activeSessions: ActiveSession[]
  permissionGroups: PermissionGroup[]
  auditLogs: AuditLog[]
  bulkActions: BulkOperation[]
}

export const EnhancedAdminAccountManagement = () => {
  const managementData = useAccountManagement()
  
  return (
    <div className="account-management-container">
      {/* Quick Stats & Summary */}
      <AccountSummaryGrid />
      
      {/* Bulk Operations */}
      <BulkOperationsCenter
        availableActions={getBulkAccountActions()}
        selectedAccounts={selectedAccounts}
        onAction={handleBulkAction}
        onSelectionChange={handleAccountSelection}
      />
      
      {/* Account Creation Forms */}
      <EnhancedAccountCreationForm tabs={creationTabs} />
      
      {/* Account Management Grid */}
      <EnhancedAccountGrid
        accounts={managementData.userAccounts}
        onEdit={handleEditAccount}
        onSuspend={handleSuspendAccount}
        onAssignPermission={handleAssignPermission}
        onResetPassword={handleResetPassword}
        onViewSessions={handleViewSessions}
      />
      
      {/* Pending Approvals */}
      <PendingApprovalsSection
        approvals={managementData.pendingApprovals}
        onApprove={handleApproveAccount}
        onReject={handleRejectAccount}
        onRequireMoreInfo={handleRequireMoreInfo}
      />
    </div>
  )
}