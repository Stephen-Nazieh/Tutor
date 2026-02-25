interface CommunicationState {
  // Core Message State
  conversations: Map<string, Conversation>
  activeConversation: string | null
  messages: Map<string, Message[]>
  
  // UI State
  isReplying: boolean
  activeTemplate: Template | null
  editorState: EditorState
  threadView: 'inbox' | 'sent' | 'archived' | 'trash'
  
  // Real-time State
  isTyping: Set<{ userId: string, conversationId: string }>
  isOnline: Map<string, boolean>
  lastSeen: Map<string, Date>
  
  // Settings
  preferences: MessagePreferences

  // Actions
  loadConversations: () => Promise<void>
  sendMessage: (conversationId: string, content: string, options?: SendOptions) => Promise<void>
  setTyping: (userId: string, conversationId: string, isTyping: boolean) => void
  setOnlineStatus: (userId: string, isOnline: boolean) => void
}

export const communicationStore = create<CommunicationState>()(
  persist(
    immer((set, get) => ({
      // Implementation with proper async actions
      sendMessage: async (conversationId, content, options) => {
        const message = await createMessage(conversationId, content, options)
        
        set((state) => {
          const messages = state.messages.get(conversationId) || []
          state.messages.set(conversationId, [...messages, message])
          
          // Update conversation last message
          const conversation = state.conversations.get(conversationId)
          if (conversation) {
            conversation.lastMessage = message
            conversation.lastMessageAt = new Date()
          }
        })
      }
    })),
    {
      name: 'communication-store',
      partialize: (state) => ({
        // Only persist stable state, exclude real-time data
        conversations: state.conversations,
        activeConversation: state.activeConversation,
        preferences: state.preferences
      })
    }
  )
)