/**
 * InputArea Component
 * Chat input with send button and stop button
 */

'use client';

import { useRef, useEffect } from 'react';
import { Send, Square } from 'lucide-react';

interface InputAreaProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  onStop?: () => void;
  isLoading: boolean;
  isStreaming: boolean;
  placeholder?: string;
  mode?: 'dark' | 'light';
  themeColor?: string;
}

export function InputArea({
  value,
  onChange,
  onSend,
  onStop,
  isLoading,
  isStreaming,
  placeholder = 'Type a message...',
  mode = 'dark',
  themeColor = 'bg-emerald-500'
}: InputAreaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
    }
  }, [value]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!isLoading && value.trim()) {
        onSend();
      }
    }
  };

  const showStopButton = isStreaming && onStop;

  return (
    <div className={`p-4 border-t ${
      mode === 'dark' 
        ? 'border-white/10 bg-zinc-900/50' 
        : 'border-black/10 bg-white/50'
    }`}>
      <div className="flex gap-2 items-end">
        <div className={`flex-1 rounded-xl overflow-hidden ${
          mode === 'dark'
            ? 'bg-white/5 border border-white/10 focus-within:border-white/30'
            : 'bg-gray-100 border border-transparent focus-within:border-gray-300'
        } transition-colors`}>
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={isLoading}
            rows={1}
            className={`w-full px-4 py-3 bg-transparent resize-none outline-none text-sm ${
              mode === 'dark'
                ? 'text-white placeholder:text-zinc-500'
                : 'text-zinc-900 placeholder:text-zinc-400'
            } disabled:opacity-50`}
            style={{ minHeight: '44px', maxHeight: '120px' }}
          />
        </div>

        {showStopButton ? (
          <button
            onClick={onStop}
            className="w-11 h-11 rounded-xl bg-red-500 hover:bg-red-600 flex items-center justify-center transition-colors"
            title="Stop generating"
          >
            <Square className="w-4 h-4 text-white fill-current" />
          </button>
        ) : (
          <button
            onClick={onSend}
            disabled={isLoading || !value.trim()}
            className={`w-11 h-11 rounded-xl ${themeColor} hover:opacity-90 flex items-center justify-center transition-all disabled:opacity-50 disabled:cursor-not-allowed`}
            title="Send message"
          >
            <Send className="w-4 h-4 text-white" />
          </button>
        )}
      </div>

      {/* Helper text */}
      <div className={`mt-2 text-xs text-center ${
        mode === 'dark' ? 'text-zinc-600' : 'text-zinc-400'
      }`}>
        Press Enter to send, Shift+Enter for new line
      </div>
    </div>
  );
}
