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
  language: z.string().default('en'),
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
5. Always be truthful - if you don't know something, say so
6. IMPORTANT: Detect the language of the user's message and ALWAYS reply in that same language. If the user writes in Chinese, reply in Chinese. If they write in Spanish, reply in Spanish. Match the user's language exactly.`;

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

    const { message, conversationHistory, language } = parsed.data
    const apiKey = process.env.KIMI_API_KEY

    if (!apiKey) {
      console.error('KIMI_API_KEY not configured')
      // Fallback to mock response if no API key
      return NextResponse.json({
        response: generateFallbackResponse(message, language),
        source: 'fallback'
      })
    }

    // Add language instruction to system prompt
    const languageInstruction = language && language !== 'en' 
      ? `\n\n## LANGUAGE INSTRUCTION\nThe user is writing in "${language}". You MUST respond in the same language as the user's message.`
      : ''
    
    // Build messages array with system prompt
    const messages = [
      { role: 'system', content: SYSTEM_PROMPT + languageInstruction },
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
        response: generateFallbackResponse(message, language),
        source: 'fallback'
      })
    }

    const data = await response.json()
    const aiResponse = data.choices?.[0]?.message?.content

    if (!aiResponse) {
      return NextResponse.json({
        response: generateFallbackResponse(message, language),
        source: 'fallback'
      })

    return NextResponse.json({
      response: aiResponse,
      source: 'kimi',
      model: DEFAULT_MODEL,
    })

  } catch (error) {
    console.error('Investor chat error:', error)
    return NextResponse.json({
      response: generateFallbackResponse('', language),
      source: 'fallback'
    })
  }
}

// Language-specific fallback responses
const FALLBACK_RESPONSES: Record<string, Record<string, string>> = {
  en: {
    whatis: "Solocorn is a live AI-assisted tutoring platform where AI evaluates student work and provides feedback so tutors can teach large classes efficiently. Instead of traditional one-to-one tutoring, Solocorn enables one tutor to teach many students simultaneously while each student still receives individualized feedback.",
    how: "A Solocorn class follows a simple cycle: (1) Tutor explains a concept, (2) Students complete a task, (3) Students submit answers, (4) AI evaluates responses instantly, (5) Students receive personalized feedback within seconds, (6) Tutor reviews results and adjusts teaching. This is called PCI — Post-Completion Instruction.",
    pci: "PCI stands for Post-Completion Instruction. It means students receive feedback immediately after completing a task, rather than waiting for homework to be graded later. This allows immediate correction of mistakes and reinforcement of correct reasoning, even in large classes.",
    invest: "For detailed investment discussions, please reach out to our team through the contact form on the website. Solocorn's key value proposition is transforming tutoring from a labor-limited service into a scalable digital education platform.",
    default: "That's a great question! Solocorn combines live teaching with AI evaluation to make tutoring scalable. Is there a specific aspect—how classes work, who it's for, or the business model—you'd like to know more about?"
  },
  'zh-CN': {
    whatis: "Solocorn是一个实时AI辅助辅导平台，AI评估学生作业并提供反馈，使教师能够高效地教授大班课程。与传统的一对一辅导不同，Solocorn使一位教师能够同时教授许多学生，同时每个学生仍然获得个性化的反馈。",
    how: "Solocorn课程遵循一个简单的循环：(1) 教师解释概念，(2) 学生完成任务，(3) 学生提交答案，(4) AI即时评估回答，(5) 学生在几秒钟内收到个性化反馈，(6) 教师审查结果并调整教学。这被称为PCI——完成后指导。",
    pci: "PCI代表完成后指导（Post-Completion Instruction）。这意味着学生在完成任务后立即收到反馈，而不是等待作业被批改。这允许立即纠正错误和加强正确推理，即使在大班课程中也是如此。",
    invest: "有关详细的投资讨论，请通过网站上的联系表格与我们的团队联系。Solocorn的核心价值主张是将辅导从劳动密集型服务转变为可扩展的数字教育平台。",
    default: "这是个好问题！Solocorn结合实时教学和AI评估，使辅导变得可扩展。您想了解哪个具体方面——课程如何运作、适合谁，还是商业模式？"
  },
  'zh-HK': {
    whatis: "Solocorn是一個實時AI輔助輔導平台，AI評估學生作業並提供反饋，使教師能夠高效地教授大班課程。與傳統的一對一輔導不同，Solocorn使一位教師能夠同時教授許多學生，同時每個學生仍然獲得個性化的反饋。",
    how: "Solocorn課程遵循一個簡單的循環：(1) 教師解釋概念，(2) 學生完成任務，(3) 學生提交答案，(4) AI即時評估回答，(5) 學生在幾秒鐘內收到個性化反饋，(6) 教師審查結果並調整教學。這被稱為PCI——完成後指導。",
    pci: "PCI代表完成後指導（Post-Completion Instruction）。這意味著學生在完成任務後立即收到反饋，而不是等待作業被批改。這允許立即糾正錯誤和加強正確推理，即使在大班課程中也是如此。",
    invest: "有關詳細的投資討論，請通過網站上的聯繫表格與我們的團隊聯繫。Solocorn的核心價值主張是將輔導從勞動密集型服務轉變為可擴展的數字教育平台。",
    default: "這是個好問題！Solocorn結合實時教學和AI評估，使輔導變得可擴展。您想了解哪個具體方面——課程如何運作、適合誰，還是商業模式？"
  },
  es: {
    whatis: "Solocorn es una plataforma de tutoría asistida por IA en tiempo real donde la IA evalúa el trabajo de los estudiantes y proporciona retroalimentación para que los tutores puedan enseñar clases grandes de manera eficiente. En lugar de la tutoría tradicional uno a uno, Solocorn permite que un tutor enseñe a muchos estudiantes simultáneamente mientras cada estudiante aún recibe retroalimentación individualizada.",
    how: "Una clase de Solocorn sigue un ciclo simple: (1) El tutor explica un concepto, (2) Los estudiantes completan una tarea, (3) Los estudiantes envían respuestas, (4) La IA evalúa las respuestas al instante, (5) Los estudiantes reciben retroalimentación personalizada en segundos, (6) El tutor revisa los resultados y ajusta la enseñanza. Esto se llama PCI — Instrucción Post-Completación.",
    pci: "PCI significa Instrucción Post-Completación (Post-Completion Instruction). Significa que los estudiantes reciben retroalimentación inmediatamente después de completar una tarea, en lugar de esperar a que se califique la tarea. Esto permite la corrección inmediata de errores y el refuerzo del razonamiento correcto, incluso en clases grandes.",
    invest: "Para discusiones detalladas de inversión, comuníquese con nuestro equipo a través del formulario de contacto en el sitio web. La propuesta de valor clave de Solocorn es transformar la tutoría de un servicio limitado por mano de obra a una plataforma de educación digital escalable.",
    default: "¡Esa es una excelente pregunta! Solocorn combina la enseñanza en vivo con la evaluación de IA para hacer que la tutoría sea escalable. ¿Hay algún aspecto específico—cómo funcionan las clases, para quién es, o el modelo de negocio—sobre el que le gustaría saber más?"
  },
  fr: {
    whatis: "Solocorn est une plateforme de tutorat assistée par IA en temps réel où l'IA évalue le travail des étudiants et fournit des commentaires pour que les tuteurs puissent enseigner efficacement aux grandes classes. Au lieu du tutorat traditionnel en tête-à-tête, Solocorn permet à un tuteur d'enseigner à de nombreux étudiants simultanément tout en recevant des commentaires individualisés.",
    how: "Un cours Solocorn suit un cycle simple : (1) Le tuteur explique un concept, (2) Les étudiants accomplissent une tâche, (3) Les étudiants soumettent leurs réponses, (4) L'IA évalue les réponses instantanément, (5) Les étudiants reçoivent des commentaires personnalisés en quelques secondes, (6) Le tuteur examine les résultats et ajuste l'enseignement. C'est ce qu'on appelle PCI — Instruction Post-Achèvement.",
    pci: "PCI signifie Instruction Post-Achèvement (Post-Completion Instruction). Cela signifie que les étudiants reçoivent des commentaires immédiatement après avoir terminé une tâche, plutôt que d'attendre que leurs devoirs soient corrigés. Cela permet une correction immédiate des erreurs et un renforcement du raisonnement correct, même dans les grandes classes.",
    invest: "Pour des discussions d'investissement détaillées, veuillez contacter notre équipe via le formulaire de contact sur le site web. La proposition de valeur clé de Solocorn est de transformer le tutorat d'un service limité par la main-d'œuvre en une plateforme d'éducation numérique évolutive.",
    default: "C'est une excellente question ! Solocorn combine l'enseignement en direct avec l'évaluation par l'IA pour rendre le tutorat évolutif. Y a-t-il un aspect spécifique — comment fonctionnent les cours, à qui cela s'adresse-t-il, ou le modèle d'affaires — sur lequel vous aimeriez en savoir plus ?"
  }
};

// Fallback response generator for when API is unavailable
function generateFallbackResponse(question: string, language: string = 'en'): string {
  const lower = question.toLowerCase();
  const lang = language in FALLBACK_RESPONSES ? language : 'en';
  const responses = FALLBACK_RESPONSES[lang];
  
  if (lower.includes('what is') || lower.includes('what does') || lower.includes('who are') || lower.includes('是什么')) {
    return responses.whatis;
  }
  
  if (lower.includes('how') && (lower.includes('work') || lower.includes('class'))) {
    return responses.how;
  }
  
  if (lower.includes('pci') || lower.includes('post-completion')) {
    return responses.pci;
  }
  
  if (lower.includes('invest') || lower.includes('funding') || lower.includes('valuation')) {
    return responses.invest;
  }
  
  return responses.default;
}
