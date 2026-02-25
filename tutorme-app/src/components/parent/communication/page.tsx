interface CommunicationHub {
  conversations: ParentConversation[]
  broadcastMessages: BroadcastMessage[]
  teacherContacts: TeacherContact[]
  studentCommunications: StudentCommunication[]
  notificationSettings: NotificationSettings
  emergencyContactSystem: EmergencyContactSystem
}

export const ParentCommunicationHub = () => {
  const [activeTab, setActiveTab] = useState<TabType>('conversations')

  const communicationData = useParentCommunicationData()
  
  return (
    <CommunicationProvider studentId={selectedStudentId}>
      <CommunicationTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <CommunicationContent>
        {activeTab === 'conversations' && <ConversationsTab data={communicationData} />}
        {activeTab === 'broadcast' && <BroadcastMessagesTab data={communicationData} />}
        {activeTab === 'teachers' && <TeacherContactsTab data={communicationData} />}
        {activeTab === 'emergency' && <EmergencyContactTab data={communicationData} />}
        {activeTab === 'settings' && <CommunicationSettingsTab data={communicationData} />}
      </CommunicationContent>
    </CommunicationProvider>
  )
}