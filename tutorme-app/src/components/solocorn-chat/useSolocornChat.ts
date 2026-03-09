/**
 * useSolocornChat Hook
 * Manages chat state and streaming responses
 */

import { useState, useRef, useCallback, useEffect } from 'react';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isStreaming?: boolean;
  error?: boolean;
}

export interface UseSolocornChatOptions {
  language?: string;
  onError?: (error: Error) => void;
}

export interface UseSolocornChatReturn {
  messages: Message[];
  isLoading: boolean;
  isStreaming: boolean;
  input: string;
  setInput: (value: string) => void;
  sendMessage: (content?: string) => Promise<void>;
  stopGeneration: () => void;
  clearMessages: () => void;
  retryMessage: (messageId: string) => Promise<void>;
}

// Generate unique ID
const generateId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

// Load messages from localStorage
const loadStoredMessages = (): Message[] => {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem('solocorn-chat-messages');
    if (stored) {
      const parsed = JSON.parse(stored);
      return parsed.map((m: Message) => ({
        ...m,
        timestamp: new Date(m.timestamp)
      }));
    }
  } catch {
    // Ignore storage errors
  }
  return [];
};

// Save messages to localStorage
const saveMessages = (messages: Message[]) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem('solocorn-chat-messages', JSON.stringify(messages));
  } catch {
    // Ignore storage errors
  }
};

export function useSolocornChat(options: UseSolocornChatOptions = {}): UseSolocornChatReturn {
  const { language = 'en', onError } = options;
  
  const [messages, setMessages] = useState<Message[]>(loadStoredMessages);
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [input, setInput] = useState('');
  
  // Use ref to avoid closure issues with input value
  const inputRef = useRef(input);
  inputRef.current = input;
  
  const abortControllerRef = useRef<AbortController | null>(null);
  const currentAssistantMessageRef = useRef<string>('');
  const isLoadingRef = useRef(isLoading);
  isLoadingRef.current = isLoading;

  // Persist messages
  useEffect(() => {
    saveMessages(messages);
  }, [messages]);

  const stopGeneration = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setIsStreaming(false);
    setIsLoading(false);
  }, []);

  const sendMessage = useCallback(async (content?: string) => {
    const messageContent = content || inputRef.current;
    if (!messageContent.trim() || isLoadingRef.current) return;

    // Add user message
    const userMessage: Message = {
      id: generateId(),
      role: 'user',
      content: messageContent.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setIsStreaming(true);

    // Create abort controller for this request
    abortControllerRef.current = new AbortController();
    currentAssistantMessageRef.current = '';

    // Add placeholder for assistant response
    const assistantMessage: Message = {
      id: generateId(),
      role: 'assistant',
      content: '',
      timestamp: new Date(),
      isStreaming: true
    };
    setMessages(prev => [...prev, assistantMessage]);

    try {
      // Prepare conversation history (last 10 messages for context)
      const history = messages.slice(-10).map(m => ({
        role: m.role,
        content: m.content
      }));

      // Call streaming API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept-Language': language
        },
        body: JSON.stringify({
          message: userMessage.content,
          conversationHistory: history,
          language
        }),
        signal: abortControllerRef.current.signal
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      // Read stream
      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('No response body');
      }

      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed.startsWith('data:')) continue;

          const dataStr = trimmed.slice(5).trim();
          if (!dataStr || dataStr === '{}') continue;

          try {
            const data = JSON.parse(dataStr);

            if (data.content) {
              currentAssistantMessageRef.current += data.content;
              setMessages(prev => 
                prev.map(m => 
                  m.id === assistantMessage.id 
                    ? { ...m, content: currentAssistantMessageRef.current }
                    : m
                )
              );
            }

            if (data.done) {
              setMessages(prev => 
                prev.map(m => 
                  m.id === assistantMessage.id 
                    ? { ...m, isStreaming: false }
                    : m
                )
              );
            }

            if (data.error) {
              throw new Error(data.message || 'Streaming error');
            }
          } catch {
            // Skip invalid JSON
          }
        }
      }

    } catch (error) {
      console.error('Chat error:', error);
      
      // Update assistant message with error
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'An error occurred. Please try again.';
      
      setMessages(prev => 
        prev.map(m => 
          m.id === assistantMessage.id 
            ? { 
                ...m, 
                content: errorMessage,
                isStreaming: false,
                error: true
              }
            : m
        )
      );

      if (onError && error instanceof Error) {
        onError(error);
      }
    } finally {
      setIsLoading(false);
      setIsStreaming(false);
      abortControllerRef.current = null;
    }
  }, [messages, language, onError]);

  const clearMessages = useCallback(() => {
    setMessages([]);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('solocorn-chat-messages');
    }
  }, []);

  const retryMessage = useCallback(async (messageId: string) => {
    // Find the user message that preceded this assistant message
    const messageIndex = messages.findIndex(m => m.id === messageId);
    if (messageIndex <= 0) return;

    const userMessage = messages[messageIndex - 1];
    if (userMessage.role !== 'user') return;

    // Remove the failed assistant message and retry
    setMessages(prev => prev.slice(0, messageIndex));
    await sendMessage(userMessage.content);
  }, [messages, sendMessage]);

  return {
    messages,
    isLoading,
    isStreaming,
    input,
    setInput,
    sendMessage,
    stopGeneration,
    clearMessages,
    retryMessage
  };
}
