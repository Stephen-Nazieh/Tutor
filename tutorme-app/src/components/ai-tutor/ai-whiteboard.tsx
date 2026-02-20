'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Eraser, Type, Quote, Lightbulb, PanelRight, PanelRightClose, PanelLeftClose } from 'lucide-react'
import { cn } from '@/lib/utils'

interface WhiteboardItem {
  id: string
  type: 'text' | 'quote' | 'example' | 'tip'
  content: string
  timestamp: string
}

interface AIWhiteboardProps {
  items?: WhiteboardItem[]
  onClear?: () => void
  className?: string
  collapsed?: boolean
  onToggleCollapse?: () => void
  collapseDirection?: 'left' | 'right'
}

export function AIWhiteboard({ 
  items = [], 
  onClear, 
  className,
  collapsed = false,
  onToggleCollapse,
  collapseDirection = 'left'
}: AIWhiteboardProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'text' | 'examples' | 'tips'>('all')
  
  const filteredItems = items.filter(item => {
    if (activeTab === 'all') return true
    if (activeTab === 'text') return item.type === 'text' || item.type === 'quote'
    if (activeTab === 'examples') return item.type === 'example'
    if (activeTab === 'tips') return item.type === 'tip'
    return true
  })

  const getItemIcon = (type: string) => {
    switch (type) {
      case 'quote': return <Quote className="w-4 h-4 text-purple-500" />
      case 'example': return <Lightbulb className="w-4 h-4 text-yellow-500" />
      case 'tip': return <Lightbulb className="w-4 h-4 text-green-500" />
      default: return <Type className="w-4 h-4 text-blue-500" />
    }
  }

  const getItemStyle = (type: string) => {
    switch (type) {
      case 'quote': return 'bg-purple-50 border-purple-200'
      case 'example': return 'bg-yellow-50 border-yellow-200'
      case 'tip': return 'bg-green-50 border-green-200'
      default: return 'bg-blue-50 border-blue-200'
    }
  }

  // Collapsed mode - just icon
  if (collapsed) {
    return (
      <Card className={cn("w-16 flex flex-col items-center py-3", className)}>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onToggleCollapse}
          className="mb-2"
        >
          <PanelRight className="w-4 h-4" />
        </Button>
        
        <div className="w-8 h-px bg-gray-200 my-2" />
        
        <div className="flex flex-col items-center gap-2 py-2">
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-xs font-medium text-blue-600">
            {items.length}
          </div>
          <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
            <Quote className="w-4 h-4 text-purple-600" />
          </div>
          <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center">
            <Lightbulb className="w-4 h-4 text-yellow-600" />
          </div>
        </div>
      </Card>
    )
  }

  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <span className="w-6 h-6 rounded bg-blue-100 flex items-center justify-center text-blue-600">📋</span>
            AI Whiteboard
          </CardTitle>
          <div className="flex items-center gap-1">
            {items.length > 0 && (
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onClear}>
                <Eraser className="w-4 h-4" />
              </Button>
            )}
            {onToggleCollapse && (
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onToggleCollapse}>
                {collapseDirection === 'right' ? (
                  <PanelRightClose className="w-4 h-4" />
                ) : (
                  <PanelLeftClose className="w-4 h-4" />
                )}
              </Button>
            )}
          </div>
        </div>
        
        {/* Tabs */}
        <div className="flex gap-1 mt-2">
          {(['all', 'text', 'examples', 'tips'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1 text-xs rounded-full capitalize transition-colors ${
                activeTab === tab
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-64">
          {filteredItems.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <p className="text-sm">Key points will appear here as you chat</p>
              <p className="text-xs mt-1">The AI will add examples, tips, and important notes</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className={`p-3 rounded-lg border text-sm ${getItemStyle(item.type)}`}
                >
                  <div className="flex items-start gap-2">
                    {getItemIcon(item.type)}
                    <div className="flex-1">
                      <p className="text-gray-800 whitespace-pre-wrap">{item.content}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(item.timestamp).toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

// Function to extract whiteboard items from AI response
export function extractWhiteboardItems(response: string): WhiteboardItem[] {
  const items: WhiteboardItem[] = []
  
  // Look for examples ("For example:" or "Example:")
  const exampleRegex = /(?:for example|example):\s*([^\n]+(?:\n(?!(?:for example|example|tip|note):)[^\n]+)*)/gi
  let match
  while ((match = exampleRegex.exec(response)) !== null) {
    items.push({
      id: `example-${Date.now()}-${items.length}`,
      type: 'example',
      content: match[1].trim(),
      timestamp: new Date().toISOString()
    })
  }
  
  // Look for tips ("Tip:" or "💡")
  const tipRegex = /(?:tip|💡):?\s*([^\n]+(?:\n(?!(?:for example|example|tip|note):)[^\n]+)*)/gi
  while ((match = tipRegex.exec(response)) !== null) {
    items.push({
      id: `tip-${Date.now()}-${items.length}`,
      type: 'tip',
      content: match[1].trim(),
      timestamp: new Date().toISOString()
    })
  }
  
  // Look for quotes
  const quoteRegex = /["']([^"']+)["']/g
  while ((match = quoteRegex.exec(response)) !== null) {
    if (match[1].length > 20) { // Only longer quotes
      items.push({
        id: `quote-${Date.now()}-${items.length}`,
        type: 'quote',
        content: `"${match[1]}"`,
        timestamp: new Date().toISOString()
      })
    }
  }
  
  return items
}
