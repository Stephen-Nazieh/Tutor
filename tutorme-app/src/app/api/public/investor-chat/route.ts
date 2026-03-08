/**
 * Investor Chat API - Ask Solocorn
 * Uses Kimi K2.5 AI with web search capability
 * 
 * POST /api/public/investor-chat
 * Body: { message: string, conversationHistory?: Array<{role, content}> }
 */

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const InvestorChatRequestSchema = z.object({
  message: z.string().min(1).max(4000),
  conversationHistory: z.array(z.object({
    role: z.enum(['user', 'assistant', 'system']),
    content: z.string()
  })).max(20).default([]),
})

const KIMI_BASE_URL = 'https://api.moonshot.cn/v1'
const DEFAULT_MODEL = 'kimi-k2.5'

// System prompt with knowledge base
const SYSTEM_PROMPT = `You are Solocorn AI, an intelligent assistant for Solocorn - a live AI-assisted tutoring platform.

## ABOUT SOLOCORN
Solocorn is a live AI-assisted tutoring platform designed to allow a single tutor to teach large groups of students simultaneously while still delivering individualized feedback.

Traditional tutoring platforms scale poorly because tutors must manually grade student work and provide feedback. Solocorn solves this by using AI to automatically analyze student submissions and generate structured feedback immediately after each task.

## CORE CONCEPT: LIVE TEACHING + AI EVALUATION
- Tutor teaches the lesson and decides what students should learn
- Students complete tasks and submit answers
- AI evaluates responses instantly using PCI (Post-Completion Instruction)
- Students receive personalized feedback within seconds
- Tutor reviews results and adjusts teaching

## KEY FEATURES
- AI-Powered Socratic Tutoring: 24/7 AI tutors using Socratic method
- Human-AI Hybrid Model: 1 tutor manages up to 50 students with AI monitoring
- Multi-language Support: 10 languages including English, Chinese, Spanish, French, German, Japanese, Korean, Portuguese, Hindi
- Real-time Analytics: Live classroom monitoring with engagement tracking
- PCI (Post-Completion Instruction): Immediate feedback after task completion

## SUBJECTS SUPPORTED
IELTS, TOEFL, SAT, AP courses, A-Level tutoring, mathematics, science subjects, English language learning, and university entrance exams.

## REVENUE MODEL
Platform commission on tutoring classes, tutor subscription fees, and institutional licensing for schools and academies.

## INSTRUCTIONS
1. Answer questions about Solocorn based on the knowledge above
2. Use web search when the user asks about:
   - Current events or news
   - Competitors or other companies
   - Market trends in edtech
   - Specific data or statistics you don't have
   - Recent developments in AI or education technology
3. Be helpful, professional, and enthusiastic about Solocorn
4. If asked about investment, direct them to the contact form
5. Always be truthful - if you don't know something, say so`;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null)
    const parsed = InvestorChatRequestSchema.safeParse(body)
    
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid request', details: parsed.error },
        { status: 400 }
      )
    }

    const { message, conversationHistory } = parsed.data
    const apiKey = process.env.KIMI_API_KEY

    if (!apiKey) {
      console.error('KIMI_API_KEY not configured')
      // Fallback to mock response if no API key
      return NextResponse.json({
        response: generateFallbackResponse(message),
        source: 'fallback'
      })
    }

    // Build messages array with system prompt
    const messages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...conversationHistory.slice(-10), // Keep last 10 messages for context
      { role: 'user', content: message }
    ]

    // Call Kimi API with web search tool
    const response = await fetch(`${KIMI_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: DEFAULT_MODEL,
        messages,
        temperature: 0.7,
        max_tokens: 2048,
        tools: [
          {
            type: 'web_search',
            web_search: {
              enable: true,
              search_mode: 'smart'
            }
          }
        ],
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Kimi API error:', response.status, errorText)
      
      // Fallback to local response
      return NextResponse.json({
        response: generateFallbackResponse(message),
        source: 'fallback'
      })
    }

    const data = await response.json()
    const aiResponse = data.choices?.[0]?.message?.content

    if (!aiResponse) {
      return NextResponse.json({
        response: generateFallbackResponse(message),
        source: 'fallback'
      })
    }

    return NextResponse.json({
      response: aiResponse,
      source: 'kimi',
      model: DEFAULT_MODEL,
    })

  } catch (error) {
    console.error('Investor chat error:', error)
    return NextResponse.json({
      response: generateFallbackResponse(''),
      source: 'fallback'
    })
  }
}

// Fallback response generator for when API is unavailable
function generateFallbackResponse(question: string): string {
  const lower = question.toLowerCase();
  
  if (lower.includes('what is') || lower.includes('what does') || lower.includes('who are')) {
    return "Solocorn is a live AI-assisted tutoring platform where AI evaluates student work and provides feedback so tutors can teach large classes efficiently. Instead of traditional one-to-one tutoring, Solocorn enables one tutor to teach many students simultaneously while each student still receives individualized feedback.";
  }
  
  if (lower.includes('how') && (lower.includes('work') || lower.includes('class'))) {
    return "A Solocorn class follows a simple cycle: (1) Tutor explains a concept, (2) Students complete a task, (3) Students submit answers, (4) AI evaluates responses instantly, (5) Students receive personalized feedback within seconds, (6) Tutor reviews results and adjusts teaching. This is called PCI — Post-Completion Instruction.";
  }
  
  if (lower.includes('pci') || lower.includes('post-completion')) {
    return "PCI stands for Post-Completion Instruction. It means students receive feedback immediately after completing a task, rather than waiting for homework to be graded later. This allows immediate correction of mistakes and reinforcement of correct reasoning, even in large classes.";
  }
  
  if (lower.includes('invest') || lower.includes('funding') || lower.includes('valuation')) {
    return "For detailed investment discussions, please reach out to our team through the contact form on the website. Solocorn's key value proposition is transforming tutoring from a labor-limited service into a scalable digital education platform.";
  }
  
  return "That's a great question! Solocorn combines live teaching with AI evaluation to make tutoring scalable. Is there a specific aspect—how classes work, who it's for, or the business model—you'd like to know more about?";
}
