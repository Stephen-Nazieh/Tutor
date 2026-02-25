/**
 * StudentPollView
 * Component for students to view and vote in active polls
 */

'use client';

import React, { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Poll, PollType, SubmitVoteInput } from './types';
import { getRemainingTime, formatRemainingTime, isPollExpired } from './utils/pollCalculations';
import { Check, Clock, Users, AlertCircle } from 'lucide-react';

interface StudentPollViewProps {
  poll: Poll;
  totalStudents: number;
  hasVoted: boolean;
  onVote: (input: SubmitVoteInput) => void;
  className?: string;
}

export function StudentPollView({ 
  poll, 
  totalStudents, 
  hasVoted, 
  onVote,
  className 
}: StudentPollViewProps) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [rating, setRating] = useState<number | null>(null);
  const [textAnswer, setTextAnswer] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const remainingTime = getRemainingTime(poll);
  const expired = isPollExpired(poll);

  const handleOptionToggle = useCallback((optionId: string) => {
    if (poll.allowMultiple) {
      setSelectedOptions(prev => 
        prev.includes(optionId)
          ? prev.filter(id => id !== optionId)
          : [...prev, optionId]
      );
    } else {
      setSelectedOptions([optionId]);
    }
  }, [poll.allowMultiple]);

  const handleSubmit = useCallback(async () => {
    setIsSubmitting(true);
    
    const voteInput: SubmitVoteInput = {};
    
    switch (poll.type) {
      case 'multiple_choice':
      case 'true_false':
        voteInput.optionIds = selectedOptions;
        break;
      case 'rating':
        if (rating !== null) {
          voteInput.rating = rating;
        }
        break;
      case 'short_answer':
      case 'word_cloud':
        voteInput.textAnswer = textAnswer.trim();
        break;
    }

    await onVote(voteInput);
    setIsSubmitting(false);
  }, [poll.type, selectedOptions, rating, textAnswer, onVote]);

  const canSubmit = () => {
    switch (poll.type) {
      case 'multiple_choice':
      case 'true_false':
        return selectedOptions.length > 0;
      case 'rating':
        return rating !== null;
      case 'short_answer':
      case 'word_cloud':
        return textAnswer.trim().length > 0;
      default:
        return false;
    }
  };

  // Show thank you message after voting
  if (hasVoted) {
    return (
      <Card className={cn("p-6 text-center", className)}>
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="h-8 w-8 text-green-600" />
        </div>
        <h4 className="font-semibold text-gray-900 mb-2">Thank You!</h4>
        <p className="text-gray-500 text-sm">
          Your response has been recorded.
        </p>
        {poll.showResults && poll.status === 'active' && (
          <p className="text-sm text-blue-600 mt-3">
            Results will be shared by your tutor.
          </p>
        )}
      </Card>
    );
  }

  // Show expired message
  if (expired) {
    return (
      <Card className={cn("p-6", className)}>
        <div className="flex items-center gap-3 text-amber-600 mb-3">
          <AlertCircle className="h-5 w-5" />
          <h4 className="font-semibold">Poll Closed</h4>
        </div>
        <p className="text-gray-500 text-sm">
          This poll has ended. Wait for your tutor to start a new one.
        </p>
      </Card>
    );
  }

  return (
    <Card className={cn("p-4", className)}>
      {/* Header */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <Badge className="bg-blue-100 text-blue-700 border-blue-200">
            Live Poll
          </Badge>
          {remainingTime !== null && (
            <div className="flex items-center gap-1 text-orange-600 text-sm">
              <Clock className="h-4 w-4" />
              <span className="font-mono font-medium">
                {formatRemainingTime(remainingTime)}
              </span>
            </div>
          )}
        </div>
        <h4 className="font-semibold text-gray-900">{poll.question}</h4>
        <div className="flex items-center gap-3 mt-2 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            {totalStudents} students
          </span>
          {poll.isAnonymous && (
            <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">
              Anonymous
            </span>
          )}
          {poll.allowMultiple && (
            <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">
              Multiple choice
            </span>
          )}
        </div>
      </div>

      {/* Poll Content */}
      <div className="space-y-3">
        {renderPollInput({
          poll,
          selectedOptions,
          rating,
          textAnswer,
          onOptionToggle: handleOptionToggle,
          onRatingChange: setRating,
          onTextChange: setTextAnswer
        })}
      </div>

      {/* Submit Button */}
      <Button
        onClick={handleSubmit}
        disabled={!canSubmit() || isSubmitting}
        className="w-full mt-4"
        size="lg"
      >
        {isSubmitting ? 'Submitting...' : 'Submit Vote'}
      </Button>
    </Card>
  );
}

// Render appropriate input based on poll type
interface PollInputProps {
  poll: Poll;
  selectedOptions: string[];
  rating: number | null;
  textAnswer: string;
  onOptionToggle: (optionId: string) => void;
  onRatingChange: (rating: number) => void;
  onTextChange: (text: string) => void;
}

function renderPollInput({
  poll,
  selectedOptions,
  rating,
  textAnswer,
  onOptionToggle,
  onRatingChange,
  onTextChange
}: PollInputProps) {
  switch (poll.type) {
    case 'multiple_choice':
    case 'true_false':
      return (
        <div className="space-y-2">
          {poll.options.map((option, index) => {
            const isSelected = selectedOptions.includes(option.id);
            return (
              <button
                key={option.id}
                onClick={() => onOptionToggle(option.id)}
                className={cn(
                  "w-full p-3 border-2 rounded-lg text-left transition-all flex items-center gap-3",
                  isSelected 
                    ? "border-blue-500 bg-blue-50" 
                    : "border-gray-200 hover:border-gray-300"
                )}
              >
                <span 
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors",
                    isSelected 
                      ? "bg-blue-500 text-white" 
                      : "bg-gray-100 text-gray-700"
                  )}
                  style={!isSelected ? { backgroundColor: getOptionColor(index, 0.2), color: getOptionColor(index, 1) } : undefined}
                >
                  {isSelected ? <Check className="h-4 w-4" /> : option.label}
                </span>
                <span className={cn("flex-1", isSelected && "font-medium")}>
                  {option.text}
                </span>
              </button>
            );
          })}
        </div>
      );

    case 'rating':
      return (
        <div className="flex justify-center gap-2 py-4">
          {[1, 2, 3, 4, 5].map(value => (
            <button
              key={value}
              onClick={() => onRatingChange(value)}
              className={cn(
                "w-14 h-14 rounded-xl text-xl font-bold transition-all",
                rating === value
                  ? "bg-blue-500 text-white scale-110 shadow-lg"
                  : rating !== null && value < rating
                    ? "bg-blue-200 text-blue-700"
                    : "bg-gray-100 text-gray-400 hover:bg-gray-200"
              )}
            >
              {value}
            </button>
          ))}
        </div>
      );

    case 'word_cloud':
      return (
        <div className="space-y-2">
          <label className="text-sm text-gray-600">
            Enter a single word or short phrase:
          </label>
          <Textarea
            value={textAnswer}
            onChange={(e) => onTextChange(e.target.value)}
            placeholder="Type your answer..."
            className="min-h-[80px]"
            maxLength={50}
          />
          <p className="text-xs text-gray-400 text-right">
            {textAnswer.length}/50 characters
          </p>
        </div>
      );

    case 'short_answer':
      return (
        <div className="space-y-2">
          <label className="text-sm text-gray-600">
            Enter your answer:
          </label>
          <Textarea
            value={textAnswer}
            onChange={(e) => onTextChange(e.target.value)}
            placeholder="Type your answer..."
            className="min-h-[100px]"
            maxLength={500}
          />
          <p className="text-xs text-gray-400 text-right">
            {textAnswer.length}/500 characters
          </p>
        </div>
      );

    default:
      return null;
  }
}

// Helper function for option colors
function getOptionColor(index: number, alpha: number = 1): string {
  const colors = [
    `rgba(59, 130, 246, ${alpha})`,   // blue
    `rgba(16, 185, 129, ${alpha})`,   // green
    `rgba(245, 158, 11, ${alpha})`,   // amber
    `rgba(239, 68, 68, ${alpha})`,    // red
    `rgba(139, 92, 246, ${alpha})`,   // violet
    `rgba(236, 72, 153, ${alpha})`,   // pink
  ];
  return colors[index % colors.length];
}
