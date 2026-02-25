/**
 * Poll Templates
 * Pre-defined poll templates for quick creation
 */

import { PollTemplate } from '../types';

export const POLL_TEMPLATES: PollTemplate[] = [
  {
    id: 'understanding-check',
    name: 'Understanding Check',
    icon: 'HelpCircle',
    description: 'Quick yes/no check for concept understanding',
    defaultQuestion: 'Do you understand this concept?',
    type: 'true_false',
    options: ['Yes, I understand', 'No, I need clarification']
  },
  {
    id: 'confidence-rating',
    name: 'Confidence Rating',
    icon: 'Gauge',
    description: 'Rate confidence level on a scale of 1-5',
    defaultQuestion: 'How confident are you with this topic?',
    type: 'rating',
    options: ['1 - Not confident', '2', '3', '4', '5 - Very confident']
  },
  {
    id: 'topic-review',
    name: 'Topic Review Vote',
    icon: 'List',
    description: 'Let students vote on what to review next',
    defaultQuestion: 'Which topic should we review next?',
    type: 'multiple_choice',
    options: ['Topic A', 'Topic B', 'Topic C', 'Topic D']
  },
  {
    id: 'ready-to-proceed',
    name: 'Ready to Move On?',
    icon: 'Play',
    description: 'Check if students are ready to continue',
    defaultQuestion: 'Are you ready to move on to the next section?',
    type: 'true_false',
    options: ['Yes, let\'s continue', 'No, I need more time']
  },
  {
    id: 'quick-quiz',
    name: 'Quick Quiz',
    icon: 'Brain',
    description: 'Multiple choice question with correct answer',
    defaultQuestion: 'What is the correct answer?',
    type: 'multiple_choice',
    options: ['Option A', 'Option B', 'Option C', 'Option D']
  },
  {
    id: 'word-cloud',
    name: 'Word Cloud',
    icon: 'Cloud',
    description: 'Collect single-word responses from students',
    defaultQuestion: 'What\'s one word that describes your understanding?',
    type: 'word_cloud'
  },
  {
    id: 'short-answer',
    name: 'Short Answer',
    icon: 'MessageSquare',
    description: 'Open-ended question for detailed responses',
    defaultQuestion: 'What questions do you have about this topic?',
    type: 'short_answer'
  },
  {
    id: 'pace-check',
    name: 'Pace Check',
    icon: 'Clock',
    description: 'Check if the teaching pace is appropriate',
    defaultQuestion: 'How is the pace of the lesson?',
    type: 'multiple_choice',
    options: ['Too slow', 'Just right', 'Too fast', 'Way too fast']
  }
];

export const getTemplateById = (id: string): PollTemplate | undefined => {
  return POLL_TEMPLATES.find(t => t.id === id);
};

export const getDefaultOptions = (type: string): string[] => {
  switch (type) {
    case 'true_false':
      return ['Yes', 'No'];
    case 'rating':
      return ['1', '2', '3', '4', '5'];
    case 'multiple_choice':
      return ['Option A', 'Option B', 'Option C', 'Option D'];
    default:
      return [];
  }
};

/**
 * Generate option labels (A, B, C, D...)
 */
export function generateOptionLabel(index: number): string {
  return String.fromCharCode(65 + index); // 65 is 'A' in ASCII
}

export const OPTION_COLORS = [
  '#3b82f6', // blue-500
  '#10b981', // emerald-500
  '#f59e0b', // amber-500
  '#ef4444', // red-500
  '#8b5cf6', // violet-500
  '#ec4899', // pink-500
  '#06b6d4', // cyan-500
  '#84cc16', // lime-500
];

export const getOptionColor = (index: number): string => {
  return OPTION_COLORS[index % OPTION_COLORS.length];
};
