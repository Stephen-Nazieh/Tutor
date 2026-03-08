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
const DEFAULT_MODEL = 'kimi-latest' // Use latest model alias

// System prompt with knowledge base (simplified for Kimi API)
const SYSTEM_PROMPT = `You are Solocorn AI, an assistant for Solocorn - a live AI-assisted tutoring platform where AI evaluates student work and provides feedback so tutors can teach large classes efficiently.

Key points about Solocorn:
- One tutor can teach many students simultaneously
- AI provides immediate personalized feedback (PCI - Post-Completion Instruction)
- Supports IELTS, TOEFL, SAT, AP, A-Level, math, science, English
- 10 languages supported
- Revenue from platform commission, tutor subscriptions, and institutional licensing

Instructions:
1. Answer based on the knowledge above
2. Be helpful and professional
3. If asked about investment, direct to contact form
4. Reply in the same language as the user's message`;

// CORS headers for cross-origin requests
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

export async function POST(request: NextRequest) {
  let language = 'en' // Default language, declared outside try for catch block access
  
  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    return new NextResponse(null, { headers: corsHeaders })
  }
  
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
    language = lang // Update language from request
    const apiKey = process.env.KIMI_API_KEY

    if (!apiKey) {
      console.error('KIMI_API_KEY not configured')
      // Fallback to mock response if no API key
      return NextResponse.json({
        response: generateFallbackResponse(message, language),
        source: 'fallback-no-key'
      }, { headers: corsHeaders })
    }

    // Add language instruction to system prompt
    const languageInstruction = language && language !== 'en' 
      ? `\n\n## LANGUAGE INSTRUCTION\nThe user is writing in "${language}". You MUST respond in the same language as the user's message.`
      : ''
    
    // Build messages array with system prompt (simplified - just current message)
    const messagesPayload = [
      { role: 'system', content: SYSTEM_PROMPT + languageInstruction },
      { role: 'user', content: message }
    ]

    console.log('Calling Kimi API with message:', message.substring(0, 50) + '...')
    console.log('API Key exists:', apiKey ? 'yes (length: ' + apiKey.length + ')' : 'no')
    console.log('Conversation history length:', conversationHistory?.length || 0)

    // Call Kimi API
    const response = await fetch(`${KIMI_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'kimi-k2.5',
        messages: messagesPayload,
        temperature: 1,
        max_tokens: 1024,
      }),
    })

    console.log('Kimi API response status:', response.status)

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Kimi API error:', response.status, errorText)
      
      // Fallback to local response
      return NextResponse.json({
        response: generateFallbackResponse(message, language),
        source: 'fallback-api-error-' + response.status
      }, { headers: corsHeaders })
    }

    const data = await response.json()
    console.log('Kimi API response structure:', Object.keys(data))
    console.log('Kimi API choices exist:', data.choices ? 'yes' : 'no')
    if (data.choices) {
      console.log('Kimi API choices count:', data.choices.length)
      console.log('Kimi API first choice:', JSON.stringify(data.choices[0]).substring(0, 200))
    }
    
    // Try different possible response formats
    const aiResponse = data.choices?.[0]?.message?.content 
      || data.choices?.[0]?.text 
      || data.output 
      || ''

    if (!aiResponse) {
      console.error('No AI response content. Full data:', JSON.stringify(data).substring(0, 500))
      return NextResponse.json({
        response: generateFallbackResponse(message, language),
        source: 'fallback-no-content'
      }, { headers: corsHeaders })
    }

    return NextResponse.json({
      response: aiResponse,
      source: 'kimi',
      model: DEFAULT_MODEL,
    }, { headers: corsHeaders })

  } catch (error) {
    console.error('Investor chat error:', error)
    return NextResponse.json({
      response: generateFallbackResponse('', language),
      source: 'fallback'
    }, { headers: corsHeaders })
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
  },
  de: {
    whatis: "Solocorn ist eine Live-KI-gestützte Nachhilfeplattform, auf der KI Schülerarbeiten bewertet und Feedback gibt, damit Tutoren große Klassen effizient unterrichten können. Anstelle traditioneller Einzelnachhilfe ermöglicht Solocorn einem Tutor, viele Schüler gleichzeitig zu unterrichten, während jeder Schüler weiterhin individuelles Feedback erhält.",
    how: "Ein Solocorn-Kurs folgt einem einfachen Zyklus: (1) Der Tutor erklärt ein Konzept, (2) Die Schüler erledigen eine Aufgabe, (3) Die Schüler reichen Antworten ein, (4) Die KI bewertet Antworten sofort, (5) Die Schüler erhalten personalisiertes Feedback innerhalb von Sekunden, (6) Der Tutor überprüft die Ergebnisse und passt den Unterricht an. Dies wird PCI genannt — Post-Completion Instruction (Instruktion nach Abschluss).",
    pci: "PCI steht für Post-Completion Instruction (Instruktion nach Abschluss). Es bedeutet, dass Schüler sofort nach Abschluss einer Aufgabe Feedback erhalten, anstatt zu warten, bis Hausaufgaben benotet werden. Dies ermöglicht sofortige Fehlerkorrektur und Verstärkung korrekter Argumentation, selbst in großen Klassen.",
    invest: "Für detaillierte Investitionsgespräche wenden Sie sich bitte über das Kontaktformular auf der Website an unser Team. Der Kernwert von Solocorn besteht darin, Nachhilfe von einem arbeitsintensiven Dienst in eine skalierbare digitale Bildungsplattform zu verwandeln.",
    default: "Das ist eine großartige Frage! Solocorn kombiniert Live-Unterricht mit KI-Bewertung, um Nachhilfe skalierbar zu machen. Gibt es einen bestimmten Aspekt — wie Kurse funktionieren, für wen es gedacht ist, oder das Geschäftsmodell — über den Sie mehr erfahren möchten?"
  },
  ja: {
    whatis: "Solocornは、AIが生徒の課業を評価し、フィードバックを提供することで、チューターが大規模なクラスを効率的に教えられるライブAI支援型指導プラットフォームです。従来の1対1の指導と異なり、Solocornは1人のチューターが多くの生徒に同時に教えられるようにし、各生徒が個別のフィードバックを受け取れるようにします。",
    how: "Solocornのクラスは、シンプルなサイクルに従います：(1) チューターが概念を説明、(2) 生徒が課題を完了、(3) 生徒が回答を提出、(4) AIが即座に回答を評価、(5) 生徒が数秒以内にパーソナライズされたフィードバックを受信、(6) チューターが結果を確認し、指導を調整。これをPCI（Post-Completion Instruction）と呼びます。",
    pci: "PCIはPost-Completion Instruction（完了後指導）の略です。これは、生徒が課題の採点を待つのでなく、課題を完了した直後にフィードバックを受けることを意味します。これにより、大規模なクラスでも即座に間違いを修正し、正しい推論を強化できます。",
    invest: "詳細な投資に関するご相談は、ウェブサイトのお問い合わせフォームから当社チームまでご連絡ください。Solocornの核心的価値提案は、指導を労働集約型サービスからスケーラブルなデジタル教育プラットフォームに変えることです。",
    default: "素晴らしい質問ですね！Solocornはライブ指導とAI評価を組み合わせて、指導をスケーラブルにします。クラスの仕組み、対象者、ビジネスモデルなど、特定の側面についてもっと知りたいことはありますか？"
  },
  ko: {
    whatis: "Solocorn은 AI가 학생 과제를 평가하고 피드백을 제공하여 튜터가 대규모 수업을 효율적으로 가르칠 수 있는 실시간 AI 지원 과외 플랫폼입니다. 전통적인 일대일 과외와 달리 Solocorn은 한 명의 튜터가 많은 학생들에게 동시에 가르칠 수 있도록 하면서 각 학생이 여전히 개별화된 피드백을 받을 수 있도록 합니다.",
    how: "Solocorn 수업은 간단한 사이클을 따릅니다: (1) 튜터가 개념을 설명, (2) 학생들이 과제를 완료, (3) 학생들이 답변을 제출, (4) AI가 즉시 답변을 평가, (5) 학생들이 수 초 내에 개인화된 피드백을 받음, (6) 튜터가 결과를 검토하고 교육을 조정. 이를 PCI(Post-Completion Instruction)라고 합니다.",
    pci: "PCI는 Post-Completion Instruction(완료 후 지도)의 약자입니다. 이는 학생들이 과제 채점을 기다리는 대신 과제를 완료한 직후 피드백을 받는다는 의미입니다. 이를 통해 대규모 수업에서도 즉각적인 오류 수정과 올바른 추론 강화가 가능합니다.",
    invest: "자세한 투자 관련 문의는 웹사이트의 문의 양식을 통해 당사 팀에 연락해 주십시오. Solocorn의 핵심 가치 제안은 과외를 노동 집약형 서비스에서 확장 가능한 디지털 교육 플랫폼으로 전환하는 것입니다.",
    default: "훌륭한 질문입니다! Solocorn은 실시간 교육과 AI 평가를 결합하여 과외를 확장 가능하게 만듭니다. 수업 작동 방식, 대상, 비즈니스 모델 등 특정 측면에 대해 더 알고 싶은 것이 있습니까?"
  },
  pt: {
    whatis: "Solocorn é uma plataforma de tutoria assistida por IA em tempo real onde a IA avalia o trabalho dos alunos e fornece feedback para que os tutores possam ensinar turmas grandes de forma eficiente. Em vez da tutoria tradicional um a um, Solocorn permite que um tutor ensine muitos alunos simultaneamente enquanto cada aluno ainda recebe feedback individualizado.",
    how: "Uma aula Solocorn segue um ciclo simples: (1) O tutor explica um conceito, (2) Os alunos completam uma tarefa, (3) Os alunos enviam respostas, (4) A IA avalia as respostas instantaneamente, (5) Os alunos recebem feedback personalizado em segundos, (6) O tutor revisa os resultados e ajusta o ensino. Isso é chamado de PCI — Instrução Pós-Conclusão.",
    pci: "PCI significa Instrução Pós-Conclusão (Post-Completion Instruction). Significa que os alunos recebem feedback imediatamente após concluir uma tarefa, em vez de esperar que a lição de casa seja avaliada. Isso permite correção imediata de erros e reforço do raciocínio correto, mesmo em turmas grandes.",
    invest: "Para discussões detalhadas de investimento, entre em contato com nossa equipe através do formulário de contato no site. A proposta de valor principal da Solocorn é transformar a tutoria de um serviço limitado por mão de obra em uma plataforma de educação digital escalável.",
    default: "Essa é uma ótima pergunta! A Solocorn combina ensino ao vivo com avaliação de IA para tornar a tutoria escalável. Há algum aspecto específico — como as aulas funcionam, para quem é, ou o modelo de negócio — sobre o qual você gostaria de saber mais?"
  },
  hi: {
    whatis: "Solocorn एक लाइव AI-सहायता प्राप्त ट्यूटरिंग प्लेटफॉर्म है जहाँ AI छात्रों के काम का मूल्यांकन करता है और फीडबैक प्रदान करता है ताकि ट्यूटर बड़ी कक्षाओं को कुशलता से पढ़ा सकें। पारंपरिक एक-से-एक ट्यूटरिंग के बजाय, Solocorn एक ट्यूटर को कई छात्रों को एक साथ पढ़ाने में सक्षम बनाता है जबकि प्रत्येक छात्र को अभी भी व्यक्तिगत फीडबैक मिलता है।",
    how: "एक Solocorn कक्षा एक साधारण चक्र का पालन करती है: (1) ट्यूटर एक अवधारणा समझाता है, (2) छात्र एक कार्य पूरा करते हैं, (3) छात्र उत्तर जमा करते हैं, (4) AI तुरंत उत्तरों का मूल्यांकन करता है, (5) छात्र सेकंडों के भीतर व्यक्तिगत फीडबैक प्राप्त करते हैं, (6) ट्यूटर परिणामों की समीक्षा करता है और शिक्षण को समायोजित करता है। इसे PCI कहा जाता है — पोस्ट-कंप्लीशन इंस्ट्रक्शन।",
    pci: "PCI का अर्थ है पोस्ट-कंप्लीशन इंस्ट्रक्शन। इसका मतलब है कि छात्र एक कार्य पूरा करने के तुरंत बाद फीडबैक प्राप्त करते हैं, बजाय इसके कि होमवर्क के ग्रेड होने का इंतजार करें। यह तुरंत गलतियों के सुधार और सही तर्क को मजबूत करने की अनुमति देता है, यहां तक कि बड़ी कक्षाओं में भी।",
    invest: "विस्तृत निवेश चर्चा के लिए, कृपया वेबसाइट पर संपर्क फॉर्म के माध्यम से हमारी टीम से संपर्क करें। Solocorn का मुख्य मूल्य प्रस्ताव ट्यूटरिंग को श्रम-सीमित सेवा से एक स्केलेबल डिजिटल शिक्षा प्लेटफॉर्म में बदलना है।",
    default: "यह एक बहुत अच्छा सवाल है! Solocorn लाइव टीचिंग को AI मूल्यांकन के साथ जोड़ता है ताकि ट्यूटरिंग को स्केलेबल बनाया जा सके। क्या कोई विशिष्ट पहलू है — कक्षाएं कैसे काम करती हैं, यह किसके लिए है, या व्यवसाय मॉडल — जिसके बारे में आप और जानना चाहेंगे?"
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
