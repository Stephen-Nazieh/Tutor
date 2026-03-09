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
const DEFAULT_MODEL = 'kimi-k2.5' // Use specific model name

// System prompt - give AI knowledge but let it behave naturally
const SYSTEM_PROMPT = `You are Solocorn AI, a helpful assistant representing Solocorn - a Live AI-Augmented Instruction Platform.

## ABOUT SOLOCORN (use this knowledge when relevant):

**What Solocorn Does:**
- Live AI-Assisted Classroom Learning Platform
- Teachers deliver instruction while AI provides real-time marking and individualized feedback
- Enables one tutor to teach many students simultaneously with personalized support for each
- Solves the problem: traditional classrooms scale teaching but not feedback

**Key Features:**
- Post-Completion Instruction (PCI): Students get immediate feedback after completing tasks
- Real-time learning analytics for teachers
- Automatic lesson recording for absent students
- Parent/guardian dashboards for monitoring progress
- Supports: IELTS, TOEFL, SAT, AP courses, A-Level, math, science, English learning

**How It Works:**
1. Tutor explains a concept
2. Students complete tasks
3. AI evaluates and provides personalized feedback within seconds
4. Tutor reviews and adjusts teaching based on data

**Business Model:** Platform commissions, tutor subscriptions, institutional licensing

## HOW TO RESPOND:

1. **BE NATURAL AND CONVERSATIONAL** - Talk like a normal person, not a robot
2. **ANSWER THE ACTUAL QUESTION** - Don't ignore what was asked
3. **NO TEMPLATED PHRASES** - Never say "That's a great question!" or "I'd be happy to help!"
4. **BE TRUTHFUL ABOUT AI:**
   - If asked about your capabilities: Say you're an AI that can think, reason, and discuss Solocorn
   - If asked about web access: You have knowledge about Solocorn but can't browse live websites
5. **LANGUAGE:** Respond in the same language as the user's message
6. **IF UNSURE:** Say you don't know rather than making things up
7. **INVESTMENT INQUIRIES:** Direct to the contact form on the website`;

// CORS headers for cross-origin requests
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

// Gemini API configuration
const GEMINI_API_KEY = process.env.GEMINI_API_KEY
const GEMINI_MODEL = 'gemini-1.5-flash'

// Function to call Gemini API
async function callGemini(message: string, systemPrompt: string, language: string): Promise<string | null> {
  if (!GEMINI_API_KEY) {
    console.log('Gemini API key not configured')
    return null
  }
  
  try {
    console.log('Trying Gemini API fallback...')
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          { role: 'user', parts: [{ text: systemPrompt + '\n\nUser message: ' + message }] }
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 1024,
        }
      })
    })
    
    if (!response.ok) {
      console.error('Gemini API error:', response.status)
      return null
    }
    
    const data = await response.json()
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text
    
    if (text) {
      console.log('Gemini API success')
      return text
    }
    return null
  } catch (error) {
    console.error('Gemini API exception:', error)
    return null
  }
}

// Handle OPTIONS preflight requests
export async function OPTIONS() {
  return new NextResponse(null, { 
    status: 204,
    headers: corsHeaders 
  })
}

export async function POST(request: NextRequest) {
  let language = 'en'
  
  console.log('=== Investor Chat API called ===')
  console.log('KIMI_API_KEY:', process.env.KIMI_API_KEY ? 'YES' : 'NO')
  console.log('GEMINI_API_KEY:', process.env.GEMINI_API_KEY ? 'YES' : 'NO')
  
  try {
    const body = await request.json().catch(() => null)
    const parsed = InvestorChatRequestSchema.safeParse(body)
    
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid request', details: parsed.error },
        { status: 400, headers: corsHeaders }
      )
    }

    const { message, conversationHistory, language: lang } = parsed.data
    language = lang
    
    const lowerMessage = message.toLowerCase().trim();
    const greetings = ['hi', 'hello', 'hey', 'greetings', 'good morning', 'good afternoon', 'good evening', 
                       '你好', '您好', '嗨', '哈囉', 'hola', 'buenos', 'bonjour', 'salut', 
                       'hallo', 'guten tag', 'こんにちは', 'やあ', '안녕하세요', '안녕', 
                       'olá', 'oi', 'नमस्ते', 'हैलो'];
    const isGreeting = greetings.some(g => lowerMessage === g || lowerMessage.startsWith(g + ' '));
    
    if (isGreeting) {
      const langResponses = FALLBACK_RESPONSES[language] || FALLBACK_RESPONSES['en'];
      return NextResponse.json({
        response: langResponses.greeting,
        source: 'greeting-handler'
      }, { headers: corsHeaders });
    }
    
    // Try AI providers
    const languageInstruction = language && language !== 'en' 
      ? `\n\nRespond in ${language}.`
      : ''
    
    const messagesPayload = [
      { role: 'system', content: SYSTEM_PROMPT + languageInstruction },
      { role: 'user', content: message }
    ]

    // Try Kimi first
    const apiKey = process.env.KIMI_API_KEY
    if (apiKey) {
      try {
        console.log('Trying Kimi API...')
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 15000)
        
        const response = await fetch(`${KIMI_BASE_URL}/chat/completions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: DEFAULT_MODEL,
            messages: messagesPayload,
            temperature: 0.8,
            max_tokens: 1024,
          }),
          signal: controller.signal,
        }).finally(() => clearTimeout(timeoutId))

        console.log('Kimi response status:', response.status)

        if (response.ok) {
          const data = await response.json()
          const aiResponse = data.choices?.[0]?.message?.content || data.choices?.[0]?.text
          
          if (aiResponse) {
            console.log('Kimi success!')
            return NextResponse.json({
              response: aiResponse,
              source: 'kimi',
              model: DEFAULT_MODEL,
            }, { headers: corsHeaders })
          }
        } else {
          console.error('Kimi error:', response.status)
        }
      } catch (error) {
        console.error('Kimi exception:', error)
      }
    }

    // Try Gemini as fallback
    console.log('Trying Gemini fallback...')
    const geminiResponse = await callGemini(message, SYSTEM_PROMPT + languageInstruction, language)
    if (geminiResponse) {
      return NextResponse.json({
        response: geminiResponse,
        source: 'gemini'
      }, { headers: corsHeaders })
    }

    // Last resort fallback
    console.log('All AI failed, using fallback')
    return NextResponse.json({
      response: generateFallbackResponse(message, language),
      source: 'fallback'
    }, { headers: corsHeaders })

  } catch (error) {
    console.error('Investor chat error:', error)
    const langResponses = FALLBACK_RESPONSES[language] || FALLBACK_RESPONSES['en']
    return NextResponse.json({
      response: langResponses.default,
      source: 'error-fallback'
    }, { headers: corsHeaders })
  }
}

// Language-specific fallback responses
const FALLBACK_RESPONSES: Record<string, Record<string, string>> = {
  en: {
    greeting: "Hello! I'm Solocorn AI, your assistant for learning about our Live AI-Augmented Instruction Platform. How can I help you today?",
    whatis: "Solocorn is a live AI-assisted tutoring platform where AI evaluates student work and provides feedback so tutors can teach large classes efficiently. Instead of traditional one-to-one tutoring, Solocorn enables one tutor to teach many students simultaneously while each student still receives individualized feedback.",
    how: "A Solocorn class follows a simple cycle: (1) Tutor explains a concept, (2) Students complete a task, (3) Students submit answers, (4) AI evaluates responses instantly, (5) Students receive personalized feedback within seconds, (6) Tutor reviews results and adjusts teaching. This is called PCI — Post-Completion Instruction.",
    pci: "PCI stands for Post-Completion Instruction. It means students receive feedback immediately after completing a task, rather than waiting for homework to be graded later. This allows immediate correction of mistakes and reinforcement of correct reasoning, even in large classes.",
    invest: "For detailed investment discussions, please reach out to our team through the contact form on the website. Solocorn's key value proposition is transforming tutoring from a labor-limited service into a scalable digital education platform.",
    default: "I'm Solocorn AI, here to help you learn about our platform. We combine live teaching with AI-powered feedback to make education more scalable and personalized. What would you like to know about Solocorn?"
  },
  'zh-CN': {
    greeting: "您好！我是Solocorn AI，您的实时AI增强教学平台助手。今天我能为您提供什么帮助？",
    whatis: "Solocorn是一个实时AI辅助辅导平台，AI评估学生作业并提供反馈，使教师能够高效地教授大班课程。与传统的一对一辅导不同，Solocorn使一位教师能够同时教授许多学生，同时每个学生仍然获得个性化的反馈。",
    how: "Solocorn课程遵循一个简单的循环：(1) 教师解释概念，(2) 学生完成任务，(3) 学生提交答案，(4) AI即时评估回答，(5) 学生在几秒钟内收到个性化反馈，(6) 教师审查结果并调整教学。这被称为PCI——完成后指导。",
    pci: "PCI代表完成后指导（Post-Completion Instruction）。这意味着学生在完成任务后立即收到反馈，而不是等待作业被批改。这允许立即纠正错误和加强正确推理，即使在大班课程中也是如此。",
    invest: "有关详细的投资讨论，请通过网站上的联系表格与我们的团队联系。Solocorn的核心价值主张是将辅导从劳动密集型服务转变为可扩展的数字教育平台。",
    default: "我是Solocorn AI，很高兴为您介绍我们的平台。我们结合实时教学和AI反馈，让教育更具扩展性和个性化。您想了解Solocorn的哪方面信息？"
  },
  'zh-HK': {
    greeting: "您好！我是Solocorn AI，您的實時AI增強教學平台助手。今天我能為您提供什麼幫助？",
    whatis: "Solocorn是一個實時AI輔助輔導平台，AI評估學生作業並提供反饋，使教師能夠高效地教授大班課程。與傳統的一對一輔導不同，Solocorn使一位教師能夠同時教授許多學生，同時每個學生仍然獲得個性化的反饋。",
    how: "Solocorn課程遵循一個簡單的循環：(1) 教師解釋概念，(2) 學生完成任務，(3) 學生提交答案，(4) AI即時評估回答，(5) 學生在幾秒鐘內收到個性化反饋，(6) 教師審查結果並調整教學。這被稱為PCI——完成後指導。",
    pci: "PCI代表完成後指導（Post-Completion Instruction）。這意味著學生在完成任務後立即收到反饋，而不是等待作業被批改。這允許立即糾正錯誤和加強正確推理，即使在大班課程中也是如此。",
    invest: "有關詳細的投資討論，請通過網站上的聯繫表格與我們的團隊聯繫。Solocorn的核心價值主張是將輔導從勞動密集型服務轉變為可擴展的數字教育平台。",
    default: "我是Solocorn AI，很高興為您介紹我們的平台。我們結合實時教學和AI反饋，讓教育更具擴展性和個性化。您想了解Solocorn的哪方面信息？"
  },
  es: {
    greeting: "¡Hola! Soy Solocorn AI, su asistente para la Plataforma de Instrucción Aumentada con IA en Vivo. ¿Cómo puedo ayudarle hoy?",
    whatis: "Solocorn es una plataforma de tutoría asistida por IA en tiempo real donde la IA evalúa el trabajo de los estudiantes y proporciona retroalimentación para que los tutores puedan enseñar clases grandes de manera eficiente. En lugar de la tutoría tradicional uno a uno, Solocorn permite que un tutor enseñe a muchos estudiantes simultáneamente mientras cada estudiante aún recibe retroalimentación individualizada.",
    how: "Una clase de Solocorn sigue un ciclo simple: (1) El tutor explica un concepto, (2) Los estudiantes completan una tarea, (3) Los estudiantes envían respuestas, (4) La IA evalúa las respuestas al instante, (5) Los estudiantes reciben retroalimentación personalizada en segundos, (6) El tutor revisa los resultados y ajusta la enseñanza. Esto se llama PCI — Instrucción Post-Completación.",
    pci: "PCI significa Instrucción Post-Completación (Post-Completion Instruction). Significa que los estudiantes reciben retroalimentación inmediatamente después de completar una tarea, en lugar de esperar a que se califique la tarea. Esto permite la corrección inmediata de errores y el refuerzo del razonamiento correcto, incluso en clases grandes.",
    invest: "Para discusiones detalladas de inversión, comuníquese con nuestro equipo a través del formulario de contacto en el sitio web. La propuesta de valor clave de Solocorn es transformar la tutoría de un servicio limitado por mano de obra a una plataforma de educación digital escalable.",
    default: "Soy Solocorn AI, aquí para ayudarle a conocer nuestra plataforma. Combinamos la enseñanza en vivo con la retroalimentación impulsada por IA para hacer la educación más escalable y personalizada. ¿Qué le gustaría saber sobre Solocorn?"
  },
  fr: {
    greeting: "Bonjour ! Je suis Solocorn AI, votre assistant pour la Plateforme d'Instruction Augmentée par IA en Direct. Comment puis-je vous aider aujourd'hui ?",
    whatis: "Solocorn est une plateforme de tutorat assistée par IA en temps réel où l'IA évalue le travail des étudiants et fournit des commentaires pour que les tuteurs puissent enseigner efficacement aux grandes classes. Au lieu du tutorat traditionnel en tête-à-tête, Solocorn permet à un tuteur d'enseigner à de nombreux étudiants simultanément tout en recevant des commentaires individualisés.",
    how: "Un cours Solocorn suit un cycle simple : (1) Le tuteur explique un concept, (2) Les étudiants accomplissent une tâche, (3) Les étudiants soumettent leurs réponses, (4) L'IA évalue les réponses instantanément, (5) Les étudiants reçoivent des commentaires personnalisés en quelques secondes, (6) Le tuteur examine les résultats et ajuste l'enseignement. C'est ce qu'on appelle PCI — Instruction Post-Achèvement.",
    pci: "PCI signifie Instruction Post-Achèvement (Post-Completion Instruction). Cela signifie que les étudiants reçoivent des commentaires immédiatement après avoir terminé une tâche, plutôt que d'attendre que leurs devoirs soient corrigés. Cela permet une correction immédiate des erreurs et un renforcement du raisonnement correct, même dans les grandes classes.",
    invest: "Pour des discussions d'investissement détaillées, veuillez contacter notre équipe via le formulaire de contact sur le site web. La proposition de valeur clé de Solocorn est de transformer le tutorat d'un service limité par la main-d'œuvre en une plateforme d'éducation numérique évolutive.",
    default: "Je suis Solocorn AI, ici pour vous aider à découvrir notre plateforme. Nous combinons l'enseignement en direct avec des retours alimentés par l'IA pour rendre l'éducation plus évolutive et personnalisée. Que souhaitez-vous savoir sur Solocorn ?"
  },
  de: {
    greeting: "Hallo! Ich bin Solocorn AI, Ihr Assistent für die Live-KI-Augmentierte Unterrichtsplattform. Wie kann ich Ihnen heute helfen?",
    whatis: "Solocorn ist eine Live-KI-gestützte Nachhilfeplattform, auf der KI Schülerarbeiten bewertet und Feedback gibt, damit Tutoren große Klassen effizient unterrichten können. Anstelle traditioneller Einzelnachhilfe ermöglicht Solocorn einem Tutor, viele Schüler gleichzeitig zu unterrichten, während jeder Schüler weiterhin individuelles Feedback erhält.",
    how: "Ein Solocorn-Kurs folgt einem einfachen Zyklus: (1) Der Tutor erklärt ein Konzept, (2) Die Schüler erledigen eine Aufgabe, (3) Die Schüler reichen Antworten ein, (4) Die KI bewertet Antworten sofort, (5) Die Schüler erhalten personalisiertes Feedback innerhalb von Sekunden, (6) Der Tutor überprüft die Ergebnisse und passt den Unterricht an. Dies wird PCI genannt — Post-Completion Instruction (Instruktion nach Abschluss).",
    pci: "PCI steht für Post-Completion Instruction (Instruktion nach Abschluss). Es bedeutet, dass Schüler sofort nach Abschluss einer Aufgabe Feedback erhalten, anstatt zu warten, bis Hausaufgaben benotet werden. Dies ermöglicht sofortige Fehlerkorrektur und Verstärkung korrekter Argumentation, selbst in großen Klassen.",
    invest: "Für detaillierte Investitionsgespräche wenden Sie sich bitte über das Kontaktformular auf der Website an unser Team. Der Kernwert von Solocorn besteht darin, Nachhilfe von einem arbeitsintensiven Dienst in eine skalierbare digitale Bildungsplattform zu verwandeln.",
    default: "Ich bin Solocorn AI, hier um Ihnen unsere Plattform vorzustellen. Wir kombinieren Live-Unterricht mit KI-gestütztem Feedback, um Bildung skalierbarer und personalisierter zu machen. Was möchten Sie über Solocorn wissen?"
  },
  ja: {
    greeting: "こんにちは！Solocorn AIです。ライブAI増強指導プラットフォームのアシスタントです。本日はどのようなご用件でしょうか？",
    whatis: "Solocornは、AIが生徒の課業を評価し、フィードバックを提供することで、チューターが大規模なクラスを効率的に教えられるライブAI支援型指導プラットフォームです。従来の1対1の指導と異なり、Solocornは1人のチューターが多くの生徒に同時に教えられるようにし、各生徒が個別のフィードバックを受け取れるようにします。",
    how: "Solocornのクラスは、シンプルなサイクルに従います：(1) チューターが概念を説明、(2) 生徒が課題を完了、(3) 生徒が回答を提出、(4) AIが即座に回答を評価、(5) 生徒が数秒以内にパーソナライズされたフィードバックを受信、(6) チューターが結果を確認し、指導を調整。これをPCI（Post-Completion Instruction）と呼びます。",
    pci: "PCIはPost-Completion Instruction（完了後指導）の略です。これは、生徒が課題の採点を待つのでなく、課題を完了した直後にフィードバックを受けることを意味します。これにより、大規模なクラスでも即座に間違いを修正し、正しい推論を強化できます。",
    invest: "詳細な投資に関するご相談は、ウェブサイトのお問い合わせフォームから当社チームまでご連絡ください。Solocornの核心的価値提案は、指導を労働集約型サービスからスケーラブルなデジタル教育プラットフォームに変えることです。",
    default: "Solocorn AIです。当社のプラットフォームについてご説明いたします。ライブ指導とAIフィードバックを組み合わせることで、教育をよりスケーラブルでパーソナライズされたものにしています。Solocornについて何を知りたいですか？"
  },
  ko: {
    greeting: "안녕하세요! Solocorn AI입니다. 라이브 AI 증강 지도 플랫폼의 도우미입니다. 오늘 무엇을 도와드릴까요?",
    whatis: "Solocorn은 AI가 학생 과제를 평가하고 피드백을 제공하여 튜터가 대규모 수업을 효율적으로 가르칠 수 있는 실시간 AI 지원 과외 플랫폼입니다. 전통적인 일대일 과외와 달리 Solocorn은 한 명의 튜터가 많은 학생들에게 동시에 가르칠 수 있도록 하면서 각 학생이 여전히 개별화된 피드백을 받을 수 있도록 합니다.",
    how: "Solocorn 수업은 간단한 사이클을 따릅니다: (1) 튜터가 개념을 설명, (2) 학생들이 과제를 완료, (3) 학생들이 답변을 제출, (4) AI가 즉시 답변을 평가, (5) 학생들이 수 초 내에 개인화된 피드백을 받음, (6) 튜터가 결과를 검토하고 교육을 조정. 이를 PCI(Post-Completion Instruction)라고 합니다.",
    pci: "PCI는 Post-Completion Instruction(완료 후 지도)의 약자입니다. 이는 학생들이 과제 채점을 기다리는 대신 과제를 완료한 직후 피드백을 받는다는 의미입니다. 이를 통해 대규모 수업에서도 즉각적인 오류 수정과 올바른 추론 강화가 가능합니다.",
    invest: "자세한 투자 관련 문의는 웹사이트의 문의 양식을 통해 당사 팀에 연락해 주십시오. Solocorn의 핵심 가치 제안은 과외를 노동 집약형 서비스에서 확장 가능한 디지털 교육 플랫폼으로 전환하는 것입니다.",
    default: "Solocorn AI입니다. 저희 플랫폼에 대해 안내해 드리겠습니다. 라이브 교육과 AI 피드백을 결합하여 교육을 더 확장 가능하고 개인화된 것으로 만듭니다. Solocorn에 대해 어떤 것을 알고 싶으신가요?"
  },
  pt: {
    greeting: "Olá! Sou o Solocorn AI, seu assistente para a Plataforma de Instrução Aumentada por IA ao Vivo. Como posso ajudá-lo hoje?",
    whatis: "Solocorn é uma plataforma de tutoria assistida por IA em tempo real onde a IA avalia o trabalho dos alunos e fornece feedback para que os tutores possam ensinar turmas grandes de forma eficiente. Em vez da tutoria tradicional um a um, Solocorn permite que um tutor ensine muitos alunos simultaneamente enquanto cada aluno ainda recebe feedback individualizado.",
    how: "Uma aula Solocorn segue um ciclo simples: (1) O tutor explica um conceito, (2) Os alunos completam uma tarefa, (3) Os alunos enviam respostas, (4) A IA avalia as respostas instantaneamente, (5) Os alunos recebem feedback personalizado em segundos, (6) O tutor revisa os resultados e ajusta o ensino. Isso é chamado de PCI — Instrução Pós-Conclusão.",
    pci: "PCI significa Instrução Pós-Conclusão (Post-Completion Instruction). Significa que os alunos recebem feedback imediatamente após concluir uma tarefa, em vez de esperar que a lição de casa seja avaliada. Isso permite correção imediata de erros e reforço do raciocínio correto, mesmo em turmas grandes.",
    invest: "Para discussões detalhadas de investimento, entre em contato com nossa equipe através do formulário de contato no site. A proposta de valor principal da Solocorn é transformar a tutoria de um serviço limitado por mão de obra em uma plataforma de educação digital escalável.",
    default: "Sou o Solocorn AI, aqui para ajudá-lo a conhecer nossa plataforma. Combinamos ensino ao vivo com feedback impulsionado por IA para tornar a educação mais escalável e personalizada. O que você gostaria de saber sobre o Solocorn?"
  },
  hi: {
    greeting: "नमस्ते! मैं Solocorn AI हूं, लाइव AI-ऑग्मेंटेड इंस्ट्रक्शन प्लेटफॉर्म के लिए आपका सहायक। आज मैं आपकी कैसे मदद कर सकता हूं?",
    whatis: "Solocorn एक लाइव AI-सहायता प्राप्त ट्यूटरिंग प्लेटफॉर्म है जहाँ AI छात्रों के काम का मूल्यांकन करता है और फीडबैक प्रदान करता है ताकि ट्यूटर बड़ी कक्षाओं को कुशलता से पढ़ा सकें। पारंपरिक एक-से-एक ट्यूटरिंग के बजाय, Solocorn एक ट्यूटर को कई छात्रों को एक साथ पढ़ाने में सक्षम बनाता है जबकि प्रत्येक छात्र को अभी भी व्यक्तिगत फीडबैक मिलता है।",
    how: "एक Solocorn कक्षा एक साधारण चक्र का पालन करती है: (1) ट्यूटर एक अवधारणा समझाता है, (2) छात्र एक कार्य पूरा करते हैं, (3) छात्र उत्तर जमा करते हैं, (4) AI तुरंत उत्तरों का मूल्यांकन करता है, (5) छात्र सेकंडों के भीतर व्यक्तिगत फीडबैक प्राप्त करते हैं, (6) ट्यूटर परिणामों की समीक्षा करता है और शिक्षण को समायोजित करता है। इसे PCI कहा जाता है — पोस्ट-कंप्लीशन इंस्ट्रक्शन।",
    pci: "PCI का अर्थ है पोस्ट-कंप्लीशन इंस्ट्रक्शन। इसका मतलब है कि छात्र एक कार्य पूरा करने के तुरंत बाद फीडबैक प्राप्त करते हैं, बजाय इसके कि होमवर्क के ग्रेड होने का इंतजार करें। यह तुरंत गलतियों के सुधार और सही तर्क को मजबूत करने की अनुमति देता है, यहां तक कि बड़ी कक्षाओं में भी।",
    invest: "विस्तृत निवेश चर्चा के लिए, कृपया वेबसाइट पर संपर्क फॉर्म के माध्यम से हमारी टीम से संपर्क करें। Solocorn का मुख्य मूल्य प्रस्ताव ट्यूटरिंग को श्रम-सीमित सेवा से एक स्केलेबल डिजिटल शिक्षा प्लेटफॉर्म में बदलना है।",
    default: "मैं Solocorn AI हूं, हमारे प्लेटफॉर्म के बारे में जानने में आपकी मदद के लिए यहां हूं। हम लाइव टीचिंग को AI-संचालित फीडबैक के साथ जोड़ते हैं ताकि शिक्षा को अधिक स्केलेबल और व्यक्तिगत बनाया जा सके। आप Solocorn के बारे में क्या जानना चाहेंगे?"
  }
};

// Simplified fallback - only for when ALL APIs fail
function generateFallbackResponse(question: string, language: string = 'en'): string {
  const lower = question.toLowerCase().trim();
  const lang = language in FALLBACK_RESPONSES ? language : 'en';
  const responses = FALLBACK_RESPONSES[lang];
  
  console.log('Fallback generator - Input:', question, 'Language:', lang);
  
  // Only use hardcoded responses for greetings
  const greetings = ['hi', 'hello', 'hey', 'greetings', 'good morning', 'good afternoon', 'good evening', 
                     '你好', '您好', '嗨', '哈囉', 'hola', 'buenos', 'bonjour', 'salut', 
                     'hallo', 'guten tag', 'こんにちは', 'やあ', '안녕하세요', '안녕', 
                     'olá', 'oi', 'नमस्ते', 'हैलो'];
  
  for (const g of greetings) {
    if (lower === g || lower.startsWith(g + ' ')) {
      return responses.greeting;
    }
  }
  
  // For everything else, return the generic response (which should rarely happen)
  console.log('Fallback generator - Using generic response');
  return responses.default;
}
