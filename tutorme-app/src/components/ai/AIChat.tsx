'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Send, Bot } from 'lucide-react'

interface AIChatProps {
  context?: string
  placeholder?: string
}

export function AIChat({ context, placeholder = 'Ask a question...' }: AIChatProps) {
  const [query, setQuery] = useState('')
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; content: string }[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const handleSend = async () => {
    if (!query.trim()) return

    const userMessage = query.trim()
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setQuery('')
    setIsLoading(true)

    // Mock AI response - in real implementation, this would call an API
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          role: 'ai',
          content: `This is a mock response to: "${userMessage}". In the full implementation, this will connect to the AI service.`,
        },
      ])
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="space-y-4">
      {messages.length > 0 && (
        <div className="max-h-60 space-y-2 overflow-y-auto">
          {messages.map((msg, idx) => (
            <Card key={idx} className={msg.role === 'user' ? 'bg-blue-50' : 'bg-gray-50'}>
              <CardContent className="px-3 py-2">
                <div className="flex items-start gap-2">
                  {msg.role === 'ai' && <Bot className="mt-0.5 h-4 w-4 text-blue-500" />}
                  <p className="text-sm">{msg.content}</p>
                </div>
              </CardContent>
            </Card>
          ))}
          {isLoading && (
            <Card className="bg-gray-50">
              <CardContent className="px-3 py-2">
                <p className="text-sm text-gray-500">Thinking...</p>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      <div className="flex gap-2">
        <Input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder={placeholder}
          onKeyDown={e => e.key === 'Enter' && handleSend()}
          disabled={isLoading}
        />
        <Button onClick={handleSend} disabled={isLoading} size="icon">
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
