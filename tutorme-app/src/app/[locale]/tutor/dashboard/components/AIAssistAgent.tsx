'use client'

import { useState, useEffect, useRef } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Sparkles, Loader2, Send } from 'lucide-react'

interface AIAssistAgentProps {
  isOpen: boolean
  onClose: () => void
  context: 'task' | 'assessment'
  content: string
  pci: string
  title: string
  messages: { role: 'user' | 'assistant'; content: string }[]
  setMessages: React.Dispatch<
    React.SetStateAction<{ role: 'user' | 'assistant'; content: string }[]>
  >
  onApplyContent: (content: string) => void
  onApplyPci: (pci: string) => void
}

export function AIAssistAgent({
  isOpen,
  onClose,
  context,
  content,
  pci,
  title,
  messages,
  setMessages,
  onApplyContent,
  onApplyPci,
}: AIAssistAgentProps) {
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Initial system message
      setMessages([
        {
          role: 'assistant',
          content: `Hello! I'm your AI Course Builder Assistant. I can help you with this ${context === 'task' ? 'Task' : 'Assessment'}: "${title}".\n\nI have access to:\n📄 **Content Tab**: The questions/content${content ? ' (currently has content)' : ' (currently empty)'}\n⚙️ **PCI Tab**: Instructions on how to process the content${pci ? ' (currently has instructions)' : ' (currently empty)'}\n\nHow can I help you today?`,
        },
      ])
    }
  }, [isOpen, context, title, content, pci, messages.length, setMessages])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const generatePrompt = (userInput: string) => {
    return `You are an AI Course Builder Assistant helping a tutor create educational content.

CURRENT CONTEXT:
- Type: ${context === 'task' ? 'Task' : 'Assessment'}
- Title: ${title}

CONTENT TAB (Questions/Content to work with):
${content || '(empty)'}

PCI TAB (Instructions for processing):
${pci || '(empty - you can suggest instructions based on the content)'}

USER REQUEST:
${userInput}

Please respond helpfully. You can:
1. Answer questions about the content
2. Suggest improvements to the PCI instructions
3. Analyze the questions and provide feedback
4. Generate additional content following the PCI pattern
5. If the user asks to apply something to Content or PCI, indicate that clearly

Format your response clearly and concisely.`
  }

  const handleSend = async () => {
    if (!input.trim() || loading) return

    const userMessage = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setLoading(true)

    try {
      // Call the AI orchestrator
      const prompt = generatePrompt(userMessage)
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [{ role: 'user', content: prompt }],
          temperature: 0.7,
        }),
      })

      if (!response.ok) throw new Error('Failed to get AI response')

      const data = await response.json()
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: data.content || 'I apologize, but I was unable to process your request.',
        },
      ])
    } catch (error) {
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: 'Sorry, there was an error processing your request. Please try again.',
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        theme="default"
        className="flex max-h-[90vh] max-w-2xl flex-col rounded-2xl border border-slate-400 bg-white/95 shadow-2xl backdrop-blur-md"
      >
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-amber-500" />
            AI Assist Agent - {context === 'task' ? 'Task' : 'Assessment'} Builder
          </DialogTitle>
        </DialogHeader>

        <div className="max-h-[400px] min-h-[300px] flex-1 space-y-4 overflow-y-auto py-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 text-sm ${
                  msg.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800'
                }`}
              >
                <div className="whitespace-pre-wrap">{msg.content}</div>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="flex items-center gap-2 rounded-lg bg-gray-100 p-3">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="text-sm text-gray-600">Thinking...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="border-t pt-4">
          <div className="relative flex gap-2">
            <Textarea
              value={input}
              onChange={(e: any) => setInput(e.target.value)}
              placeholder="Ask me anything about your content or PCI instructions..."
              className="min-h-[80px] flex-1 pr-12"
              onKeyDown={(e: any) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleSend()
                }
              }}
            />
            <Button
              type="button"
              size="icon"
              className="absolute bottom-2 right-2 h-9 w-9 shrink-0 rounded-full"
              onClick={handleSend}
              disabled={!input.trim() || loading}
              aria-label="Send"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
