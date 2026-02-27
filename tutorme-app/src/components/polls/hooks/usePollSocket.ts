/**
 * usePollSocket Hook
 * Real-time poll management using Socket.io
 */

'use client';

import { useCallback, useEffect, useState, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { Poll, CreatePollInput, SubmitVoteInput } from '../types';

interface UsePollSocketReturn {
  polls: Poll[];
  activePolls: Poll[];
  draftPolls: Poll[];
  closedPolls: Poll[];
  isLoading: boolean;
  error: string | null;
  isConnected: boolean;
  
  // Actions
  createPoll: (input: CreatePollInput) => void;
  startPoll: (pollId: string) => void;
  endPoll: (pollId: string) => void;
  deletePoll: (pollId: string) => void;
  submitVote: (pollId: string, input: SubmitVoteInput) => void;
  
  // Refresh
  refreshPolls: () => void;
}

interface PollSocketParticipant {
  userId: string
  name?: string
  role: 'student' | 'tutor'
}

export function usePollSocket(sessionId: string, participant?: PollSocketParticipant): UsePollSocketReturn {
  const socketRef = useRef<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [polls, setPolls] = useState<Poll[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize socket connection
  useEffect(() => {
    if (!sessionId) return;

    const connect = async () => {
      const token = await import('@/lib/socket-auth').then((m) => m.getSocketToken());
      if (!token) return;
      const socket = io('/api/socket', {
        path: '/api/socket',
        transports: ['websocket', 'polling'],
        auth: { token },
      });
      socketRef.current = socket;

    socket.on('connect', () => {
      setIsConnected(true);
      if (participant?.userId) {
        socket.emit('join_class', {
          roomId: sessionId,
          userId: participant.userId,
          name: participant.name || participant.role,
          role: participant.role,
        })
      }
      // Join poll room
      socket.emit('poll:join', { sessionId });
      // Fetch initial polls
      socket.emit('poll:list', { sessionId }, (response: { success: boolean; polls?: Poll[]; error?: string }) => {
        setIsLoading(false);
        if (response.success && response.polls) {
          setPolls(response.polls);
        } else {
          setError(response.error || 'Failed to load polls');
        }
      });
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    socket.on('connect_error', (err) => {
      setError('Connection error: ' + err.message);
      setIsLoading(false);
    });
    };
    connect();
    return () => {
      socketRef.current?.emit('poll:leave', { sessionId });
      socketRef.current?.disconnect();
      socketRef.current = null;
    };
  }, [sessionId, participant?.name, participant?.role, participant?.userId]);

  // Listen for poll events
  useEffect(() => {
    const socket = socketRef.current;
    if (!socket) return;

    const handlePollCreated = (poll: Poll) => {
      setPolls(prev => [...prev, poll]);
    };

    const handlePollUpdated = (updatedPoll: Poll) => {
      setPolls(prev => prev.map(p => 
        p.id === updatedPoll.id ? updatedPoll : p
      ));
    };

    const handlePollStarted = (poll: Poll) => {
      setPolls(prev => prev.map(p => 
        p.id === poll.id ? { ...p, status: 'active', startedAt: new Date().toISOString() } : p
      ));
    };

    const handlePollEnded = (poll: Poll) => {
      setPolls(prev => prev.map(p => 
        p.id === poll.id ? { ...p, status: 'closed', endedAt: new Date().toISOString() } : p
      ));
    };

    const handlePollDeleted = (pollId: string) => {
      setPolls(prev => prev.filter(p => p.id !== pollId));
    };

    socket.on('poll:created', handlePollCreated);
    socket.on('poll:updated', handlePollUpdated);
    socket.on('poll:started', handlePollStarted);
    socket.on('poll:ended', handlePollEnded);
    socket.on('poll:deleted', handlePollDeleted);

    return () => {
      socket.off('poll:created', handlePollCreated);
      socket.off('poll:updated', handlePollUpdated);
      socket.off('poll:started', handlePollStarted);
      socket.off('poll:ended', handlePollEnded);
      socket.off('poll:deleted', handlePollDeleted);
    };
  }, []);

  const createPoll = useCallback((input: CreatePollInput) => {
    socketRef.current?.emit('poll:create', { sessionId, ...input });
  }, [sessionId]);

  const startPoll = useCallback((pollId: string) => {
    socketRef.current?.emit('poll:start', { pollId, sessionId });
  }, [sessionId]);

  const endPoll = useCallback((pollId: string) => {
    socketRef.current?.emit('poll:end', { pollId, sessionId });
  }, [sessionId]);

  const deletePoll = useCallback((pollId: string) => {
    socketRef.current?.emit('poll:delete', { pollId, sessionId });
  }, [sessionId]);

  const submitVote = useCallback((pollId: string, input: SubmitVoteInput) => {
    socketRef.current?.emit('poll:vote', { pollId, sessionId, ...input });
  }, [sessionId]);

  const refreshPolls = useCallback(() => {
    if (!socketRef.current) return;
    setIsLoading(true);
    socketRef.current.emit('poll:list', { sessionId }, (response: { success: boolean; polls?: Poll[]; error?: string }) => {
      setIsLoading(false);
      if (response.success && response.polls) {
        setPolls(response.polls);
      }
    });
  }, [sessionId]);

  const activePolls = polls.filter(p => p.status === 'active');
  const draftPolls = polls.filter(p => p.status === 'draft');
  const closedPolls = polls.filter(p => p.status === 'closed');

  return {
    polls,
    activePolls,
    draftPolls,
    closedPolls,
    isLoading,
    error,
    isConnected,
    createPoll,
    startPoll,
    endPoll,
    deletePoll,
    submitVote,
    refreshPolls
  };
}
