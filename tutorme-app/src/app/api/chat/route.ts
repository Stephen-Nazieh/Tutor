/**
 * Streaming Chat API for Solocorn
 * Supports Server-Sent Events (SSE) for real-time responses
 */

import { NextRequest } from 'next/server';
import { z } from 'zod';
import { checkRateLimit, getClientIdentifier } from '@/lib/chat/rate-limit';
import { streamAIResponse, buildMessages, ChatMessage } from '@/lib/chat/providers';
import { ERROR_RESPONSES, RATE_LIMIT_RESPONSES } from '@/lib/chat/system-prompt';

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

// Request schema
const ChatRequestSchema = z.object({
  message: z.string().min(1).max(4000),
  conversationHistory: z.array(z.object({
    role: z.enum(['user', 'assistant', 'system']),
    content: z.string()
  })).max(50).default([]),
  language: z.string().default('en'),
});

export async function OPTIONS() {
  return new Response(null, { 
    status: 204,
    headers: corsHeaders 
  });
}

export async function POST(request: NextRequest) {
  // Check rate limit
  const clientId = getClientIdentifier(request);
  const rateLimit = checkRateLimit(clientId);
  
  if (!rateLimit.allowed) {
    const lang = request.headers.get('accept-language')?.split(',')[0] || 'en';
    return new Response(
      JSON.stringify({ 
        error: 'Rate limit exceeded',
        message: RATE_LIMIT_RESPONSES[lang] || RATE_LIMIT_RESPONSES['en']
      }),
      { 
        status: 429, 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json',
          'X-RateLimit-Reset': rateLimit.resetTime.toString()
        } 
      }
    );
  }

  // Parse request
  let language = 'en';
  try {
    const body = await request.json().catch(() => null);
    const parsed = ChatRequestSchema.safeParse(body);
    
    if (!parsed.success) {
      return new Response(
        JSON.stringify({ error: 'Invalid request', details: parsed.error }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { message, conversationHistory, language: lang } = parsed.data;
    language = lang;

    // Build messages
    const messages = buildMessages(message, conversationHistory as ChatMessage[], language);

    // Create abort controller for request timeout
    const abortController = new AbortController();
    const timeoutId = setTimeout(() => abortController.abort(), 60000); // 60 second timeout

    // Create SSE stream
    const stream = new ReadableStream({
      async start(controller) {
        try {
          // Send initial message
          controller.enqueue(new TextEncoder().encode('event: start\ndata: {}\n\n'));

          let fullContent = '';

          // Stream AI response
          for await (const chunk of streamAIResponse(messages, abortController.signal)) {
            if (chunk.done) break;
            
            fullContent += chunk.content;
            const data = JSON.stringify({ content: chunk.content });
            controller.enqueue(new TextEncoder().encode(`event: message\ndata: ${data}\n\n`));
          }

          // Send completion
          const doneData = JSON.stringify({ 
            done: true, 
            fullContent,
            source: 'ai'
          });
          controller.enqueue(new TextEncoder().encode(`event: complete\ndata: ${doneData}\n\n`));
          
        } catch (error) {
          console.error('Streaming error:', error);
          
          const errorMessage = ERROR_RESPONSES[language] || ERROR_RESPONSES['en'];
          const errorData = JSON.stringify({ 
            error: true, 
            message: errorMessage 
          });
          controller.enqueue(new TextEncoder().encode(`event: error\ndata: ${errorData}\n\n`));
        } finally {
          clearTimeout(timeoutId);
          controller.close();
        }
      },

      cancel() {
        clearTimeout(timeoutId);
        abortController.abort();
      }
    });

    return new Response(stream, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });

  } catch (error) {
    console.error('Chat API error:', error);
    const errorMessage = ERROR_RESPONSES[language] || ERROR_RESPONSES['en'];
    return new Response(
      JSON.stringify({ error: 'Internal error', message: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
}
