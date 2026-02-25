'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Checkbox } from '@/components/ui/checkbox'
import { toast } from 'sonner'
import { Plus, Trash2, BarChart3, Clock } from 'lucide-react'

interface PollOption {
  id: string
  text: string
}

interface Participant {
  id: string
  name: string
}

interface PollCreatorProps {
  onClose: () => void
  participants: Participant[]
}

export function PollCreator({ onClose, participants }: PollCreatorProps) {
  const [question, setQuestion] = useState('')
  const [options, setOptions] = useState<PollOption[]>([
    { id: '1', text: '' },
    { id: '2', text: '' }
  ])
  const [isAnonymous, setIsAnonymous] = useState(false)
  const [allowMultiple, setAllowMultiple] = useState(false)
  const [duration, setDuration] = useState<number | null>(null)
  const [isPublishing, setIsPublishing] = useState(false)

  const addOption = () => {
    if (options.length >= 6) {
      toast.error('Maximum 6 options allowed')
      return
    }
    setOptions([...options, { id: Date.now().toString(), text: '' }])
  }

  const removeOption = (id: string) => {
    if (options.length <= 2) {
      toast.error('Minimum 2 options required')
      return
    }
    setOptions(options.filter(o => o.id !== id))
  }

  const updateOption = (id: string, text: string) => {
    setOptions(options.map(o => o.id === id ? { ...o, text } : o))
  }

  const handlePublish = () => {
    if (!question.trim()) {
      toast.error('Please enter a question')
      return
    }
    
    const emptyOptions = options.filter(o => !o.text.trim())
    if (emptyOptions.length > 0) {
      toast.error('Please fill in all options')
      return
    }

    setIsPublishing(true)
    
    // Simulate publishing
    setTimeout(() => {
      toast.success('Poll published to all participants!')
      setIsPublishing(false)
      onClose()
    }, 1000)
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5" />
          Create Poll
        </DialogTitle>
        <DialogDescription>
          Create a quick poll for your participants to vote on
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-6 py-4">
        {/* Question */}
        <div className="space-y-2">
          <Label>Question</Label>
          <Input
            placeholder="Ask a question..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </div>

        {/* Options */}
        <div className="space-y-2">
          <Label>Options</Label>
          <div className="space-y-2">
            {options.map((option, index) => (
              <div key={option.id} className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm font-medium text-gray-600">
                  {String.fromCharCode(65 + index)}
                </div>
                <Input
                  placeholder={`Option ${index + 1}`}
                  value={option.text}
                  onChange={(e) => updateOption(option.id, e.target.value)}
                  className="flex-1"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeOption(option.id)}
                  disabled={options.length <= 2}
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
              </div>
            ))}
          </div>
          <Button variant="outline" className="w-full" onClick={addOption}>
            <Plus className="w-4 h-4 mr-2" />
            Add Option
          </Button>
        </div>

        {/* Settings */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="anonymous"
              checked={isAnonymous}
              onCheckedChange={(checked) => setIsAnonymous(checked as boolean)}
            />
            <Label htmlFor="anonymous" className="text-sm cursor-pointer">
              Anonymous voting
            </Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox
              id="multiple"
              checked={allowMultiple}
              onCheckedChange={(checked) => setAllowMultiple(checked as boolean)}
            />
            <Label htmlFor="multiple" className="text-sm cursor-pointer">
              Allow multiple selections
            </Label>
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Duration (optional)
            </Label>
            <div className="flex gap-2">
              {[30, 60, 120, 300].map((seconds) => (
                <Button
                  key={seconds}
                  variant={duration === seconds ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setDuration(duration === seconds ? null : seconds)}
                >
                  {seconds < 60 ? `${seconds}s` : `${seconds / 60}m`}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-500 mb-2">Preview ({participants.length} participants will see this)</p>
          <p className="font-medium">{question || 'Your question will appear here'}</p>
          <div className="mt-2 space-y-1">
            {options.map((option, index) => (
              <div key={option.id} className="flex items-center gap-2 text-sm text-gray-600">
                <div className="w-4 h-4 rounded-full border-2 border-gray-300" />
                {option.text || `Option ${index + 1}`}
              </div>
            ))}
          </div>
        </div>
      </div>

      <DialogFooter>
        <Button variant="outline" onClick={onClose}>Cancel</Button>
        <Button 
          onClick={handlePublish}
          disabled={isPublishing}
          className="gap-2"
        >
          <BarChart3 className="w-4 h-4" />
          {isPublishing ? 'Publishing...' : 'Publish Poll'}
        </Button>
      </DialogFooter>
    </>
  )
}
