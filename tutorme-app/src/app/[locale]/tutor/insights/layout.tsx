/**
 * Insights Layout with Integrated Course Builder
 * Reuses the full course builder from /tutor/courses/[id]/builder
 * Adds a hidable Insights panel on the right
 */

'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { PanelRightClose, PanelRightOpen, Rocket, ArrowLeft } from 'lucide-react'

export default function InsightsLayout({ children }: { children: React.ReactNode }) {
  const [isInsightsOpen, setIsInsightsOpen] = useState(true)
  const searchParams = useSearchParams()
  const returnUrl = searchParams.get('return') || '/tutor/dashboard'

  return (
    <div className="flex h-screen flex-col">
      {/* Header with Back Button and Deploy */}
      <header className="flex items-center justify-between border-b bg-white px-4 py-3">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" asChild>
            <Link href={returnUrl}>
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back
            </Link>
          </Button>
          <h1 className="text-lg font-semibold">Insights & Course Builder</h1>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="default"
            size="sm"
            className="gap-2 bg-green-600 hover:bg-green-700"
          >
            <Rocket className="h-4 w-4" />
            Deploy
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsInsightsOpen(!isInsightsOpen)}
            className="gap-2"
          >
            {isInsightsOpen ? (
              <>
                <PanelRightClose className="h-4 w-4" />
                Hide Insights
              </>
            ) : (
              <>
                <PanelRightOpen className="h-4 w-4" />
                Show Insights
              </>
            )}
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Side - Course Builder (passed as children) */}
        <div className="flex flex-1 overflow-hidden">
          {children}
        </div>

        {/* Right Side - Insights Panel */}
        {isInsightsOpen && (
          <div className="w-[450px] flex-shrink-0 border-l bg-white">
            <InsightsPanel />
          </div>
        )}
      </div>
    </div>
  )
}

// Insights Panel Component
function InsightsPanel() {
  return (
    <div className="flex h-full flex-col">
      <div className="border-b p-4">
        <h2 className="font-semibold">Insights Panel</h2>
        <p className="text-sm text-gray-500">Analytics, Polls, and Questions</p>
      </div>
      <div className="flex-1 p-4">
        <p className="text-gray-500">Insights content will appear here</p>
      </div>
    </div>
  )
}
