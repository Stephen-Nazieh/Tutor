/**
 * QuickPollPanel
 * Main poll management panel for tutors
 * Supports creating, managing, and viewing polls
 */

'use client';

import React, { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Poll, CreatePollInput } from './types';
import { PollCreator } from './PollCreator';
import { ActivePollView } from './ActivePollView';
import { PollHistory } from './PollHistory';
import { usePollSocket } from './hooks/usePollSocket';

interface QuickPollPanelProps {
  sessionId: string;
  tutorId: string;
  totalStudents: number;
  className?: string;
}

export function QuickPollPanel({
  sessionId,
  tutorId,
  totalStudents,
  className
}: QuickPollPanelProps) {
  const [activeTab, setActiveTab] = useState<'create' | 'active' | 'history'>('create');
  const [showCreator, setShowCreator] = useState(false);
  
  const {
    activePolls,
    draftPolls,
    closedPolls,
    isLoading,
    error,
    isConnected,
    createPoll,
    startPoll,
    endPoll,
    deletePoll
  } = usePollSocket(sessionId, {
    userId: tutorId,
    role: 'tutor',
    name: 'Tutor',
  });

  const activePoll = activePolls[0]; // Only one active poll at a time

  const handleCreatePoll = useCallback((input: CreatePollInput) => {
    createPoll(input);
    setShowCreator(false);
    setActiveTab('active');
  }, [createPoll]);

  const handleStartPoll = useCallback((pollId: string) => {
    startPoll(pollId);
    setActiveTab('active');
  }, [startPoll]);

  const handleEndPoll = useCallback((pollId: string) => {
    endPoll(pollId);
    setActiveTab('history');
  }, [endPoll]);

  if (isLoading) {
    return (
      <div className={cn("flex items-center justify-center h-64", className)}>
        <div className="animate-spin h-8 w-8 border-2 border-blue-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (error) {
    return (
      <div className={cn("flex items-center justify-center h-64 text-red-500", className)}>
        {error}
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col h-full bg-white rounded-lg border", className)}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b">
        <h3 className="font-semibold text-gray-900">Quick Polls</h3>
        <div className="flex items-center gap-2">
          <Badge variant={isConnected ? 'default' : 'secondary'}>
            {isConnected ? 'Connected' : 'Connecting...'}
          </Badge>
          {activePolls.length > 0 && (
            <Badge className="bg-green-100 text-green-700 border-green-200">
              {activePolls.length} Active
            </Badge>
          )}
          {draftPolls.length > 0 && (
            <Badge variant="outline" className="text-gray-600">
              {draftPolls.length} Draft
            </Badge>
          )}
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as typeof activeTab)} className="flex-1 flex flex-col">
        {!isConnected && (
          <div className="px-4 pt-3 text-xs text-muted-foreground">
            Waiting for poll socket connection. Creating or starting polls is disabled until connected.
          </div>
        )}
        <TabsList className="grid w-full grid-cols-3 rounded-none border-b bg-transparent p-0">
          <TabsTrigger 
            value="create"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none py-3"
          >
            Create
          </TabsTrigger>
          <TabsTrigger 
            value="active"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none py-3"
          >
            Active
            {activePolls.length > 0 && (
              <span className="ml-2 w-5 h-5 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center">
                {activePolls.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger 
            value="history"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none py-3"
          >
            History
            {closedPolls.length > 0 && (
              <span className="ml-2 text-xs text-gray-500">
                ({closedPolls.length})
              </span>
            )}
          </TabsTrigger>
        </TabsList>

        <div className="flex-1 overflow-y-auto p-4">
          <TabsContent value="create" className="mt-0 h-full">
            {showCreator ? (
              <PollCreator
                onSubmit={handleCreatePoll}
                onCancel={() => setShowCreator(false)}
              />
            ) : (
              <div className="space-y-4">
                <Button 
                  onClick={() => setShowCreator(true)}
                  disabled={!isConnected}
                  className="w-full h-16 text-lg gap-2"
                >
                  <span className="text-2xl">+</span>
                  Create New Poll
                </Button>

                {draftPolls.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-gray-700">Draft Polls</h4>
                    {draftPolls.map(poll => (
                      <DraftPollCard 
                        key={poll.id} 
                        poll={poll} 
                        onStart={() => handleStartPoll(poll.id)}
                        onDelete={() => deletePoll(poll.id)}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
          </TabsContent>

          <TabsContent value="active" className="mt-0 h-full">
            {activePoll ? (
              <ActivePollView
                poll={activePoll}
                totalStudents={totalStudents}
                onEnd={() => handleEndPoll(activePoll.id)}
              />
            ) : (
              <EmptyState
                icon="📊"
                title="No Active Poll"
                description="Create a poll to start collecting responses from students"
                action={{
                  label: "Create Poll",
                  onClick: () => setActiveTab('create')
                }}
              />
            )}
          </TabsContent>

          <TabsContent value="history" className="mt-0 h-full">
            <PollHistory
              polls={closedPolls}
              onReuse={(poll) => {
                // Clone poll and create new draft
                const { id, status, createdAt, startedAt, endedAt, responses, ...pollData } = poll;
                createPoll({
                  ...pollData,
                  options: pollData.options.map(o => ({ label: o.label, text: o.text }))
                });
              }}
              onDelete={deletePoll}
            />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}

// Draft Poll Card Component
interface DraftPollCardProps {
  poll: Poll;
  onStart: () => void;
  onDelete: () => void;
}

function DraftPollCard({ poll, onStart, onDelete }: DraftPollCardProps) {
  return (
    <div className="p-3 border rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
      <p className="font-medium text-gray-900 line-clamp-2">{poll.question}</p>
      <p className="text-sm text-gray-500 mt-1">
        {poll.type.replace('_', ' ')} • {poll.options.length} options
      </p>
      <div className="flex gap-2 mt-2">
        <Button size="sm" onClick={onStart} className="flex-1">Start Poll</Button>
        <Button size="sm" variant="ghost" onClick={onDelete} className="text-red-500 hover:text-red-600">
          Delete
        </Button>
      </div>
    </div>
  );
}

// Empty State Component
interface EmptyStateProps {
  icon: string;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-4">
      <span className="text-4xl mb-3">{icon}</span>
      <h4 className="font-medium text-gray-900">{title}</h4>
      <p className="text-sm text-gray-500 mt-1 max-w-xs">{description}</p>
      {action && (
        <Button onClick={action.onClick} className="mt-4">
          {action.label}
        </Button>
      )}
    </div>
  );
}
