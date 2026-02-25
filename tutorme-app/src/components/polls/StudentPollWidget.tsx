/**
 * StudentPollWidget
 * A compact widget for students to see and vote in active polls
 * Can be used as an overlay or inline component
 */

'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { io, Socket } from 'socket.io-client';
import { StudentPollView } from './StudentPollView';
import { Poll, SubmitVoteInput } from './types';
import { ChevronDown, ChevronUp, BarChart2 } from 'lucide-react';

interface StudentPollWidgetProps {
  sessionId: string;
  userId: string;
  totalStudents: number;
  className?: string;
  position?: 'bottom-right' | 'inline';
}

export function StudentPollWidget({
  sessionId,
  userId,
  totalStudents,
  className,
  position = 'bottom-right'
}: StudentPollWidgetProps) {
  const socketRef = useRef<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [activePoll, setActivePoll] = useState<Poll | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);

  // Initialize socket connection
  useEffect(() => {
    if (!sessionId) return;

    const socket = io('/api/socket', {
      path: '/api/socket',
      transports: ['websocket', 'polling']
    });

    socketRef.current = socket;

    socket.on('connect', () => {
      setIsConnected(true);
      socket.emit('join_class', {
        roomId: sessionId,
        userId,
        name: 'Student',
        role: 'student',
      })
      socket.emit('poll:join', { sessionId });
      
      // Request current polls
      socket.emit('poll:list', { sessionId }, (response: { success: boolean; polls?: Poll[] }) => {
        if (response.success && response.polls) {
          const active = response.polls.find(p => p.status === 'active');
          if (active) {
            setActivePoll(active);
            const voted = active.responses.some(r => r.studentId === userId);
            setHasVoted(voted);
          }
        }
      });
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    return () => {
      socket.emit('poll:leave', { sessionId });
      socket.disconnect();
    };
  }, [sessionId, userId]);

  // Listen for poll events
  useEffect(() => {
    const socket = socketRef.current;
    if (!socket) return;

    const handlePollStarted = (poll: Poll) => {
      setActivePoll(poll);
      setHasVoted(false);
      setIsMinimized(false);
      setIsExpanded(true);
    };

    const handlePollEnded = () => {
      setActivePoll(null);
      setHasVoted(false);
    };

    const handlePollUpdated = (poll: Poll) => {
      if (poll.status === 'active') {
        setActivePoll(poll);
        const voted = poll.responses.some(r => r.studentId === userId);
        setHasVoted(voted);
      }
    };

    socket.on('poll:started', handlePollStarted);
    socket.on('poll:ended', handlePollEnded);
    socket.on('poll:updated', handlePollUpdated);

    return () => {
      socket.off('poll:started', handlePollStarted);
      socket.off('poll:ended', handlePollEnded);
      socket.off('poll:updated', handlePollUpdated);
    };
  }, [userId]);

  const handleVote = useCallback((input: SubmitVoteInput) => {
    const socket = socketRef.current;
    if (!socket || !activePoll) return;

    socket.emit('poll:vote', {
      pollId: activePoll.id,
      sessionId,
      ...input
    });

    setHasVoted(true);
  }, [activePoll, sessionId]);

  // No active poll
  if (!activePoll) {
    return null;
  }

  // Inline position - show as card
  if (position === 'inline') {
    return (
      <Card className={cn("p-4", className)}>
        <StudentPollView
          poll={activePoll}
          totalStudents={totalStudents}
          hasVoted={hasVoted}
          onVote={handleVote}
        />
      </Card>
    );
  }

  // Bottom-right position - floating widget
  if (isMinimized) {
    return (
      <div className={cn(
        "fixed bottom-4 right-4 z-50",
        className
      )}>
        <Button
          onClick={() => setIsMinimized(false)}
          className="gap-2 shadow-lg"
        >
          <BarChart2 className="h-4 w-4" />
          Active Poll
          <Badge variant="secondary" className="ml-1 bg-white text-blue-600">
            New
          </Badge>
        </Button>
      </div>
    );
  }

  return (
    <div className={cn(
      "fixed bottom-4 right-4 z-50 w-80",
      className
    )}>
      <Card className="shadow-xl border-2 border-blue-200">
        {/* Header */}
        <div className="flex items-center justify-between p-3 border-b bg-blue-50">
          <div className="flex items-center gap-2">
            <BarChart2 className="h-4 w-4 text-blue-600" />
            <span className="font-medium text-sm">Live Poll</span>
            <Badge variant={isConnected ? 'secondary' : 'outline'} className="text-[10px]">
              {isConnected ? 'Live' : 'Reconnecting'}
            </Badge>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronUp className="h-4 w-4" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={() => setIsMinimized(true)}
            >
              <span className="text-lg leading-none">−</span>
            </Button>
          </div>
        </div>

        {/* Content */}
        {isExpanded && (
          <div className="p-3">
            <StudentPollView
              poll={activePoll}
              totalStudents={totalStudents}
              hasVoted={hasVoted}
              onVote={handleVote}
            />
          </div>
        )}
      </Card>
    </div>
  );
}
