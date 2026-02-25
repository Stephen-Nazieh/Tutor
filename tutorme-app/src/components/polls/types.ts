/**
 * Poll System Types
 * Shared types for the polling functionality across Tutor Live Class and Class Room pages
 */

export type PollType = 'multiple_choice' | 'true_false' | 'rating' | 'short_answer' | 'word_cloud';
export type PollStatus = 'draft' | 'active' | 'closed';

export interface PollOption {
  id: string;
  label: string;  // A, B, C, D...
  text: string;
  color?: string;
  responseCount?: number;
  percentage?: number;
}

export interface PollResponse {
  id: string;
  optionIds?: string[];
  rating?: number;
  textAnswer?: string;
  studentId?: string;
  createdAt: string;
}

export interface Poll {
  id: string;
  sessionId: string;
  tutorId: string;
  question: string;
  type: PollType;
  options: PollOption[];
  isAnonymous: boolean;
  allowMultiple: boolean;
  timeLimit?: number;
  showResults: boolean;
  correctOptionId?: string;
  status: PollStatus;
  startedAt?: string;
  endedAt?: string;
  responses: PollResponse[];
  totalResponses: number;
  createdAt: string;
}

export interface PollTemplate {
  id: string;
  name: string;
  icon: string;
  description: string;
  defaultQuestion: string;
  type: PollType;
  options?: string[];
}

export interface CreatePollInput {
  question: string;
  type: PollType;
  options: { label: string; text: string }[];
  isAnonymous: boolean;
  allowMultiple: boolean;
  timeLimit?: number;
  showResults: boolean;
  correctOptionId?: string;
}

export interface SubmitVoteInput {
  optionIds?: string[];
  rating?: number;
  textAnswer?: string;
}

export interface PollStatistics {
  totalVotes: number;
  participationRate: number;
  optionStats: {
    optionId: string;
    count: number;
    percentage: number;
  }[];
}
