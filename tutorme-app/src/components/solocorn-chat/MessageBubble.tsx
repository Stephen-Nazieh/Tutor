/**
 * MessageBubble Component
 * Renders individual chat messages
 */

'use client';

import { motion } from 'framer-motion';
import { Bot, User, AlertCircle, RefreshCw } from 'lucide-react';
import { Message } from './useSolocornChat';

interface MessageBubbleProps {
  message: Message;
  mode?: 'dark' | 'light';
  onRetry?: () => void;
}

export function MessageBubble({ message, mode = 'dark', onRetry }: MessageBubbleProps) {
  const isUser = message.role === 'user';
  const isError = message.error;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
    >
      {/* Avatar */}
      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
        isUser 
          ? 'bg-gradient-to-br from-emerald-400 to-cyan-400' 
          : isError
            ? 'bg-red-500/20'
            : 'bg-gradient-to-br from-purple-400 to-pink-400'
      }`}>
        {isUser ? (
          <User className="w-4 h-4 text-white" />
        ) : isError ? (
          <AlertCircle className="w-4 h-4 text-red-400" />
        ) : (
          <Bot className="w-4 h-4 text-white" />
        )}
      </div>

      {/* Message Content */}
      <div className={`flex-1 ${isUser ? 'text-right' : 'text-left'}`}>
        <div className={`inline-block max-w-[85%] rounded-2xl px-4 py-3 text-left ${
          isUser
            ? mode === 'dark' 
              ? 'bg-emerald-500/20 text-white' 
              : 'bg-emerald-100 text-zinc-900'
            : isError
              ? mode === 'dark'
                ? 'bg-red-500/10 border border-red-500/30 text-red-200'
                : 'bg-red-50 border border-red-200 text-red-800'
              : mode === 'dark'
                ? 'bg-white/5 text-white'
                : 'bg-gray-100 text-zinc-900'
        }`}>
          <div className="whitespace-pre-wrap text-sm leading-relaxed">
            {message.content}
            {message.isStreaming && (
              <span className="inline-block w-2 h-4 ml-1 bg-current animate-pulse" />
            )}
          </div>

          {/* Retry button for errors */}
          {isError && onRetry && (
            <button
              onClick={onRetry}
              className="mt-2 flex items-center gap-1 text-xs opacity-70 hover:opacity-100 transition-opacity"
            >
              <RefreshCw className="w-3 h-3" />
              Retry
            </button>
          )}
        </div>

        {/* Timestamp */}
        <div className={`mt-1 text-xs opacity-50 ${
          mode === 'dark' ? 'text-zinc-400' : 'text-zinc-500'
        }`}>
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </motion.div>
  );
}
