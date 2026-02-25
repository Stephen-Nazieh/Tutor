/**
 * PollCreator
 * Component for creating new polls with templates and custom options
 */

'use client';

import React, { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { 
  HelpCircle, 
  Gauge, 
  List, 
  Play, 
  Brain, 
  Cloud, 
  MessageSquare, 
  Clock,
  Plus,
  Trash2,
  ArrowLeft
} from 'lucide-react';
import { PollType, CreatePollInput } from './types';
import { POLL_TEMPLATES, getOptionColor, generateOptionLabel } from './utils/pollTemplates';

interface PollCreatorProps {
  onSubmit: (input: CreatePollInput) => void;
  onCancel: () => void;
}

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  HelpCircle,
  Gauge,
  List,
  Play,
  Brain,
  Cloud,
  MessageSquare,
  Clock
};

export function PollCreator({ onSubmit, onCancel }: PollCreatorProps) {
  const [step, setStep] = useState<'template' | 'customize'>('template');
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  
  // Poll form state
  const [question, setQuestion] = useState('');
  const [pollType, setPollType] = useState<PollType>('multiple_choice');
  const [options, setOptions] = useState<{ label: string; text: string }[]>([
    { label: 'A', text: '' },
    { label: 'B', text: '' }
  ]);
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [allowMultiple, setAllowMultiple] = useState(false);
  const [showResults, setShowResults] = useState(true);
  const [timeLimit, setTimeLimit] = useState<number | undefined>(undefined);

  const handleSelectTemplate = useCallback((templateId: string) => {
    const template = POLL_TEMPLATES.find(t => t.id === templateId);
    if (!template) return;

    setSelectedTemplate(templateId);
    setQuestion(template.defaultQuestion);
    setPollType(template.type);
    
    if (template.options) {
      setOptions(template.options.map((text, i) => ({
        label: generateOptionLabel(i),
        text
      })));
    } else {
      setOptions([
        { label: 'A', text: '' },
        { label: 'B', text: '' }
      ]);
    }
    
    setStep('customize');
  }, []);

  const handleAddOption = useCallback(() => {
    if (options.length >= 6) return;
    setOptions(prev => [...prev, { 
      label: generateOptionLabel(prev.length),
      text: '' 
    }]);
  }, [options.length]);

  const handleRemoveOption = useCallback((index: number) => {
    if (options.length <= 2) return;
    setOptions(prev => {
      const newOptions = prev.filter((_, i) => i !== index);
      // Re-label options
      return newOptions.map((opt, i) => ({
        ...opt,
        label: generateOptionLabel(i)
      }));
    });
  }, [options.length]);

  const handleOptionChange = useCallback((index: number, text: string) => {
    setOptions(prev => prev.map((opt, i) => 
      i === index ? { ...opt, text } : opt
    ));
  }, []);

  const handleSubmit = useCallback(() => {
    if (!question.trim()) return;
    if (pollType === 'multiple_choice' || pollType === 'true_false') {
      if (options.some(o => !o.text.trim())) return;
    }

    onSubmit({
      question: question.trim(),
      type: pollType,
      options,
      isAnonymous,
      allowMultiple,
      showResults,
      timeLimit
    });
  }, [question, pollType, options, isAnonymous, allowMultiple, showResults, timeLimit, onSubmit]);

  if (step === 'template') {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Button variant="ghost" size="icon" onClick={onCancel}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h4 className="font-medium">Choose a Template</h4>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {POLL_TEMPLATES.map(template => {
            const Icon = ICON_MAP[template.icon] || HelpCircle;
            return (
              <button
                key={template.id}
                onClick={() => handleSelectTemplate(template.id)}
                className={cn(
                  "p-4 border rounded-lg text-left transition-all hover:border-blue-500 hover:bg-blue-50",
                  selectedTemplate === template.id && "border-blue-500 bg-blue-50"
                )}
              >
                <Icon className="h-5 w-5 text-blue-600 mb-2" />
                <h5 className="font-medium text-sm">{template.name}</h5>
                <p className="text-xs text-gray-500 mt-1">{template.description}</p>
              </button>
            );
          })}
        </div>

        <Button 
          variant="outline" 
          className="w-full"
          onClick={() => {
            setSelectedTemplate(null);
            setStep('customize');
          }}
        >
          Start from Scratch
        </Button>
      </div>
    );
  }

  const canSubmit = question.trim() && 
    (pollType === 'short_answer' || pollType === 'word_cloud' || 
     options.every(o => o.text.trim()));

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Button variant="ghost" size="icon" onClick={() => setStep('template')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h4 className="font-medium">Customize Poll</h4>
      </div>

      {/* Question */}
      <div className="space-y-2">
        <Label>Question</Label>
        <Textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Enter your question..."
          className="min-h-[80px]"
        />
      </div>

      {/* Poll Type */}
      <div className="space-y-2">
        <Label>Poll Type</Label>
        <RadioGroup 
          value={pollType} 
          onValueChange={(v) => setPollType(v as PollType)}
          className="grid grid-cols-2 gap-2"
        >
          {[
            { value: 'multiple_choice', label: 'Multiple Choice' },
            { value: 'true_false', label: 'Yes / No' },
            { value: 'rating', label: 'Rating (1-5)' },
            { value: 'short_answer', label: 'Short Answer' },
            { value: 'word_cloud', label: 'Word Cloud' }
          ].map(type => (
            <div key={type.value} className="flex items-center space-x-2">
              <RadioGroupItem value={type.value} id={type.value} />
              <Label htmlFor={type.value} className="text-sm cursor-pointer">
                {type.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Options (for multiple choice types) */}
      {(pollType === 'multiple_choice' || pollType === 'true_false') && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Options</Label>
            {options.length < 6 && (
              <Button type="button" variant="ghost" size="sm" onClick={handleAddOption}>
                <Plus className="h-4 w-4 mr-1" />
                Add Option
              </Button>
            )}
          </div>
          <div className="space-y-2">
            {options.map((option, index) => (
              <div key={index} className="flex items-center gap-2">
                <span 
                  className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium text-white shrink-0"
                  style={{ backgroundColor: getOptionColor(index) }}
                >
                  {option.label}
                </span>
                <Input
                  value={option.text}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  placeholder={`Option ${option.label}`}
                  className="flex-1"
                />
                {options.length > 2 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveOption(index)}
                    className="text-red-500 hover:text-red-600 shrink-0"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Settings */}
      <div className="space-y-3 pt-2 border-t">
        <h5 className="font-medium text-sm">Settings</h5>
        
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-sm">Anonymous Voting</Label>
            <p className="text-xs text-gray-500">Hide voter identities</p>
          </div>
          <Switch checked={isAnonymous} onCheckedChange={setIsAnonymous} />
        </div>

        {(pollType === 'multiple_choice' || pollType === 'true_false') && (
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-sm">Allow Multiple Selections</Label>
              <p className="text-xs text-gray-500">Voters can choose multiple options</p>
            </div>
            <Switch checked={allowMultiple} onCheckedChange={setAllowMultiple} />
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-sm">Show Results to Students</Label>
            <p className="text-xs text-gray-500">Display live results to participants</p>
          </div>
          <Switch checked={showResults} onCheckedChange={setShowResults} />
        </div>

        <div className="space-y-2">
          <Label className="text-sm">Time Limit (optional)</Label>
          <div className="flex gap-2">
            {[30, 60, 120, 300].map(seconds => (
              <Button
                key={seconds}
                type="button"
                variant={timeLimit === seconds ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTimeLimit(timeLimit === seconds ? undefined : seconds)}
              >
                {seconds < 60 ? `${seconds}s` : `${Math.floor(seconds / 60)}m`}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2 pt-4">
        <Button variant="outline" onClick={onCancel} className="flex-1">
          Cancel
        </Button>
        <Button 
          onClick={handleSubmit} 
          disabled={!canSubmit}
          className="flex-1"
        >
          Create Poll
        </Button>
      </div>
    </div>
  );
}
