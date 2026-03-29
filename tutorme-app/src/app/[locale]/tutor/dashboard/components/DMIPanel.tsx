'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { toast } from 'sonner'
import type { DMIQuestion } from './builder-types'

interface DMIPanelProps {
  items: DMIQuestion[]
  onItemsChange: (items: DMIQuestion[]) => void
  onDeploy?: () => void
}

export function DMIPanel({ items, onItemsChange, onDeploy }: DMIPanelProps) {
  const [previewOpen, setPreviewOpen] = useState(false)
  const handleDeploy = () => {
    if (onDeploy) {
      onDeploy()
    } else {
      toast.success('DMI deployed')
    }
  }

  if (items.length === 0) {
    return (
      <div className="min-h-[150px] rounded-lg bg-slate-50 p-3">
        <h4 className="mb-2 text-sm font-medium">Digital Marking Interface</h4>
        <p className="text-xs text-muted-foreground">
          Click "Generate DMI" to create a student answer form from the Slide tab.
        </p>
      </div>
    )
  }

  return (
    <div className="flex min-h-[150px] flex-col rounded-lg bg-slate-50 p-3">
      <div className="mb-3 flex items-center justify-between">
        <h4 className="text-sm font-medium">Digital Marking Interface</h4>
      </div>

      <div className="max-h-[300px] space-y-2 overflow-y-auto">
        {items.map((item, idx) => (
          <div key={item.id} className="rounded border bg-white p-2">
            <div className="flex items-start gap-2">
              <span className="mt-0.5 text-xs font-medium text-blue-600">
                Q{item.questionNumber}
              </span>
              <div className="min-w-0 flex-1">
                <p className="mb-2 text-xs text-slate-700">{item.questionText}</p>
                <textarea
                  value={item.answer}
                  onChange={(e: any) => {
                    const next = items.map((q, qIdx) =>
                      qIdx === idx ? { ...q, answer: e.target.value } : q
                    )
                    onItemsChange(next)
                  }}
                  className="min-h-[60px] w-full resize-y rounded border p-2 text-xs"
                  placeholder="Student answer..."
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 flex items-center gap-2">
        <Button size="sm" variant="outline" onClick={() => setPreviewOpen(true)}>
          Preview
        </Button>
      </div>

      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>DMI Preview</DialogTitle>
          </DialogHeader>
          <div className="max-h-[60vh] space-y-3 overflow-y-auto">
            {items.map(item => (
              <div key={item.id} className="rounded border bg-white p-3">
                <p className="mb-2 text-sm font-medium">
                  Q{item.questionNumber}. {item.questionText}
                </p>
                <textarea
                  className="min-h-[80px] w-full resize-y rounded border p-2 text-sm"
                  placeholder="Student answer..."
                />
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-end">
            <Button onClick={handleDeploy}>Deploy</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
