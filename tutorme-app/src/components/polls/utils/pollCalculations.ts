/**
 * Poll Calculations
 * Utility functions for computing poll statistics
 */

import { Poll, PollOption, PollStatistics } from '../types';

/**
 * Calculate statistics for a poll
 */
export function calculatePollStatistics(
  poll: Poll,
  totalStudents: number
): PollStatistics {
  const totalVotes = poll.responses?.length || 0;
  const participationRate = totalStudents > 0 
    ? Math.round((totalVotes / totalStudents) * 100) 
    : 0;

  const optionStats = poll.options.map(option => {
    let count = 0;
    
    if (poll.type === 'rating') {
      // For rating type, count responses with matching rating value
      const ratingValue = parseInt(option.label);
      count = poll.responses?.filter(r => r.rating === ratingValue).length || 0;
    } else if (poll.type === 'word_cloud' || poll.type === 'short_answer') {
      // For text responses, count non-empty text answers
      count = poll.responses?.filter(r => r.textAnswer && r.textAnswer.trim()).length || 0;
    } else {
      // For multiple choice, count responses containing this option
      count = poll.responses?.filter(r => 
        r.optionIds?.includes(option.id)
      ).length || 0;
    }

    const percentage = totalVotes > 0 
      ? Math.round((count / totalVotes) * 100) 
      : 0;

    return {
      optionId: option.id,
      count,
      percentage
    };
  });

  return {
    totalVotes,
    participationRate,
    optionStats
  };
}

/**
 * Update poll options with calculated statistics
 */
export function updatePollWithStatistics(
  poll: Poll,
  totalStudents: number
): Poll {
  const stats = calculatePollStatistics(poll, totalStudents);
  
  const updatedOptions = poll.options.map((option, index) => {
    const stat = stats.optionStats.find(s => s.optionId === option.id);
    return {
      ...option,
      responseCount: stat?.count || 0,
      percentage: stat?.percentage || 0
    };
  });

  return {
    ...poll,
    options: updatedOptions,
    totalResponses: stats.totalVotes
  };
}

/**
 * Generate option labels (A, B, C, D...)
 */
export function generateOptionLabel(index: number): string {
  return String.fromCharCode(65 + index); // 65 is 'A' in ASCII
}

/**
 * Get remaining time for an active poll
 */
export function getRemainingTime(poll: Poll): number | null {
  if (!poll.startedAt || !poll.timeLimit) return null;
  
  const startTime = new Date(poll.startedAt).getTime();
  const elapsed = Date.now() - startTime;
  const remaining = (poll.timeLimit * 1000) - elapsed;
  
  return Math.max(0, Math.floor(remaining / 1000));
}

/**
 * Format remaining time as MM:SS
 */
export function formatRemainingTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Check if a poll has expired
 */
export function isPollExpired(poll: Poll): boolean {
  const remaining = getRemainingTime(poll);
  return remaining !== null && remaining <= 0;
}

/**
 * Get word cloud data (frequency count of words)
 */
export function getWordCloudData(poll: Poll): { word: string; count: number }[] {
  if (poll.type !== 'word_cloud' && poll.type !== 'short_answer') {
    return [];
  }

  const wordCounts: Record<string, number> = {};
  
  poll.responses?.forEach(response => {
    if (response.textAnswer) {
      const words = response.textAnswer
        .toLowerCase()
        .split(/\s+/)
        .map(w => w.replace(/[^\w\u4e00-\u9fff]/g, '')) // Keep English and Chinese characters
        .filter(w => w.length > 0);
      
      words.forEach(word => {
        wordCounts[word] = (wordCounts[word] || 0) + 1;
      });
    }
  });

  return Object.entries(wordCounts)
    .map(([word, count]) => ({ word, count }))
    .sort((a, b) => b.count - a.count);
}

/**
 * Hash a string (for anonymous vote tracking)
 */
export async function hashString(input: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}
