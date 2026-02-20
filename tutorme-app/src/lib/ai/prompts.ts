/**
 * AI Prompts for TutorMe
 * All prompts used across the application
 */

/**
 * Socratic Tutor Prompt
 * Guides students to answers without giving them directly
 */
export const socraticTutorPrompt = (params: {
  subject: string
  problem: string
  studentAnswer?: string
  previousMistakes?: string[]
  knowledgeGraph?: Record<string, number>
  language?: 'zh' | 'en'
}): string => {
  const systemPrompt = params.language === 'zh'
    ? `你是一位耐心的${params.subject}辅导老师。你的目标是引导学生自己发现答案，而不是直接给出答案。`
    : `You are a patient tutor helping a student learn ${params.subject}. Your goal is to guide students to discover answers themselves, not give them directly.`

  const rules = params.language === 'zh'
    ? `
规则：
1. 永远不要直接给出答案
2. 问一个引导性问题帮助学生发现错误
3. 如果学生说"直接告诉我"，用鼓励+小提示回应
4. 如果相关，参考他们知识图谱中的具体概念
5. 回答保持在3句话以内
6. 用中文回复`
    : `
Rules:
1. Never give the direct answer
2. Ask one guiding question to help them discover the error
3. If they ask "just tell me," respond with encouragement + smaller hint
4. Reference specific concepts from their knowledge graph if relevant
5. Keep response under 3 sentences
6. Respond in English`

  return `${systemPrompt}

Student is working on: ${params.problem}
${params.studentAnswer ? `Their attempt: ${params.studentAnswer}` : ''}
${params.previousMistakes?.length ? `History of mistakes: ${params.previousMistakes.join(', ')}` : ''}
${params.knowledgeGraph ? `Knowledge levels: ${JSON.stringify(params.knowledgeGraph)}` : ''}

${rules}`
}

/**
 * Quiz Generator Prompt
 * Creates questions from video transcripts
 */
export const quizGeneratorPrompt = (params: {
  transcript: string
  grade: number
  weakAreas: string[]
  prereq?: string
  subject?: string
  language?: 'zh' | 'en'
}): string => {
  const lang = params.language || 'zh'

  if (lang === 'zh') {
    return `基于以下视频内容生成3道题目：

视频内容：${params.transcript}

学生信息：
- 年级：${params.grade}
- 薄弱领域：${params.weakAreas.join('、')}
- 前置知识：${params.prereq || '基础概念'}

请生成：
Q1: 基础回忆题（选择题）
Q2: 应用题（简答题，可AI评分）
Q3: 挑战题（结合前置知识）

请返回有效的JSON格式：
{
  "questions": [
    {
      "type": "multiple_choice",
      "question": "题目内容",
      "options": ["选项A", "选项B", "选项C", "选项D"],
      "answer": "A"
    },
    {
      "type": "short_answer",
      "question": "题目内容",
      "rubric": "评分标准"
    },
    {
      "type": "short_answer",
      "question": "题目内容",
      "rubric": "评分标准"
    }
  ]
}`
  }

  return `Generate 3 questions based on the following video content:

Video content: ${params.transcript}

Student info:
- Grade: ${params.grade}
- Weak areas: ${params.weakAreas.join(', ')}
- Prerequisite: ${params.prereq || 'fundamental concepts'}

Generate:
Q1: Basic recall (multiple choice)
Q2: Application (short answer, AI-gradable)
Q3: Challenge (connects to prerequisite)

Return valid JSON:
{
  "questions": [
    {
      "type": "multiple_choice",
      "question": "Question text",
      "options": ["A", "B", "C", "D"],
      "answer": "A"
    },
    {
      "type": "short_answer",
      "question": "Question text",
      "rubric": "Grading criteria"
    },
    {
      "type": "short_answer",
      "question": "Question text",
      "rubric": "Grading criteria"
    }
  ]
}`
}

/**
 * Tutor Briefing Prompt
 * Prepares tutors before live sessions
 */
export const tutorBriefingPrompt = (params: {
  studentAttempts: Array<{
    studentId: string
    score: number
    concept: string
  }>
  recentQuizzes: Array<{
    quizId: string
    averageScore: number
    weakConcepts: string[]
  }>
  studentNames?: Record<string, string>
  language?: 'zh' | 'en'
}): string => {
  const lang = params.language || 'zh'
  const data = JSON.stringify({
    attempts: params.studentAttempts,
    quizzes: params.recentQuizzes,
  })

  if (lang === 'zh') {
    return `为辅导老师准备课前简报，总结为3个要点：

1. 注册学生中有多大比例在哪些概念上有困难
2. 需要重点关注的具体学生姓名（前3名）
3. 建议的开场白

数据：${data}

请用中文回复，简洁明了。`
  }

  return `Summarize for tutor in 3 bullet points:

1. What % of enrolled students struggled with which concept
2. Specific student names needing attention (top 3)
3. Suggested opening line for class

Data: ${data}

Be concise and actionable.`
}

/**
 * Answer Grading Prompt
 * Grades short answers using a rubric
 */
export const gradingPrompt = (params: {
  question: string
  rubric: string
  studentAnswer: string
  maxScore: number
  language?: 'zh' | 'en'
}): string => {
  const lang = params.language || 'zh'

  if (lang === 'zh') {
    return `请根据评分标准为学生的答案打分。

题目：${params.question}

评分标准：${params.rubric}

学生答案：${params.studentAnswer}

满分：${params.maxScore}

请返回JSON格式：
{
  "score": 分数（0-${params.maxScore}）,
  "confidence": 置信度（0-1）,
  "feedback": "给学生的简要反馈",
  "explanation": "评分解释"
}`
  }

  return `Please grade the student's answer based on the rubric.

Question: ${params.question}

Rubric: ${params.rubric}

Student Answer: ${params.studentAnswer}

Max Score: ${params.maxScore}

Return JSON:
{
  "score": number (0-${params.maxScore}),
  "confidence": number (0-1),
  "feedback": "Brief feedback for student",
  "explanation": "Explanation of grading"
}`
}

/**
 * Personalized Answer Grading Prompt
 * Grades short answers using student context for personalized feedback
 */
export const personalizedGradingPrompt = (params: {
  question: string
  rubric: string
  studentAnswer: string
  maxScore: number
  studentContext?: {
    recentStruggles: Array<{ topic: string; errorType: string; severity: number }>
    masteredTopics: string[]
    learningStyle: 'visual' | 'auditory' | 'kinesthetic' | 'reading'
    currentMood: 'frustrated' | 'neutral' | 'engaged'
  }
  language?: 'zh' | 'en'
}): string => {
  const lang = params.language || 'zh'
  const ctx = params.studentContext

  // Build context summary
  const contextInfo = ctx ? `

Student Context:
- Recent struggles: ${ctx.recentStruggles.map(s => s.topic).join(', ') || 'none'}
- Mastered topics: ${ctx.masteredTopics.join(', ') || 'none'}
- Learning style: ${ctx.learningStyle}
- Current mood: ${ctx.currentMood}` : ''

  if (lang === 'zh') {
    return `根据评分标准为学生的答案打分，并提供个性化反馈。
${contextInfo}

题目：${params.question}

评分标准：${params.rubric}

学生答案：${params.studentAnswer}

满分：${params.maxScore}

请提供个性化反馈：
1. 如果学生在相关主题上有历史困难，在解释中明确引用
2. 根据学生的学习风格调整解释（视觉型：使用图表/图像类比；听觉型：使用声音/节奏类比；阅读型：提供详细文字说明；动觉型：使用实际操作例子）
3. 根据当前情绪调整语气（挫折时更鼓励；中性时标准反馈；参与时挑战性更强）
4. 提供1-2个具体的下一步建议（如"复习X视频2:15处"或"练习资产库中的类似问题"）

返回JSON格式：
{
  "score": 分数（0-${params.maxScore}）,
  "confidence": 置信度（0-1）,
  "feedback": "个性化的简短反馈，引用学生的学习历史",
  "explanation": "详细的评分解释，适应学习风格",
  "nextSteps": ["具体建议1", "具体建议2"],
  "relatedStruggles": ["相关的历史困难主题"]
}`
  }

  return `Please grade the student's answer based on the rubric and provide personalized feedback.
${contextInfo}

Question: ${params.question}

Rubric: ${params.rubric}

Student Answer: ${params.studentAnswer}

Max Score: ${params.maxScore}

Provide personalized feedback:
1. If student has historical struggles with related topics, explicitly reference them in explanation
2. Adjust explanation based on learning style (visual: use diagrams/image analogies; auditory: use sound/rhythm analogies; reading: provide detailed text; kinesthetic: use hands-on examples)
3. Adjust tone based on current mood (frustrated: more encouraging; neutral: standard; engaged: more challenging)
4. Provide 1-2 specific next steps (e.g., "Review X video at 2:15" or "Practice similar problems in Assets > Topic")

Return JSON:
{
  "score": number (0-${params.maxScore}),
  "confidence": number (0-1),
  "feedback": "Personalized brief feedback referencing student's history",
  "explanation": "Detailed grading explanation adapted to learning style",
  "nextSteps": ["Specific suggestion 1", "Specific suggestion 2"],
  "relatedStruggles": ["Related historical struggle topics"]
}`
}

/**
 * Student State Analysis Prompt
 * Analyzes student behavior to detect frustration/engagement
 */
export const studentStateAnalysisPrompt = (params: {
  events: Array<{
    type: string
    timestamp: number
    data?: unknown
  }>
  recentQuizScore?: number
  timeSpent: number // in seconds
  language?: 'zh' | 'en'
}): string => {
  const lang = params.language || 'zh'
  const eventsStr = JSON.stringify(params.events)

  if (lang === 'zh') {
    return `分析学生的学习状态。

最近事件：${eventsStr}
最近测验分数：${params.recentQuizScore ?? '无'}
学习时长：${Math.round(params.timeSpent / 60)}分钟

请分析：
1. 参与度（0-100）
2. 理解度（0-100）
3. 挫折感（0-100）
4. 状态标签（on_track / struggling / stuck）
5. 建议的干预措施

返回JSON格式：
{
  "engagement": 0-100,
  "understanding": 0-100,
  "frustration": 0-100,
  "status": "on_track|struggling|stuck",
  "reason": "简短原因",
  "suggestedAction": "hint|escalate|nothing"
}`
  }

  return `Analyze the student's learning state.

Recent events: ${eventsStr}
Recent quiz score: ${params.recentQuizScore ?? 'none'}
Time spent: ${Math.round(params.timeSpent / 60)} minutes

Analyze:
1. Engagement (0-100)
2. Understanding (0-100)
3. Frustration (0-100)
4. Status label (on_track / struggling / stuck)
5. Suggested intervention

Return JSON:
{
  "engagement": 0-100,
  "understanding": 0-100,
  "frustration": 0-100,
  "status": "on_track|struggling|stuck",
  "reason": "Brief reason",
  "suggestedAction": "hint|escalate|nothing"
}`
}

/**
 * Chat Response Prompt
 * General chat for the AI tutor widget
 */
export const chatResponsePrompt = (params: {
  message: string
  context?: {
    currentVideo?: string
    currentTimestamp?: number
    subject?: string
    previousMessages?: Array<{ role: string; content: string }>
  }
  language?: 'zh' | 'en'
}): string => {
  const lang = params.language || 'zh'
  const ctx = params.context

  const contextStr = ctx
    ? `Context:
${ctx.currentVideo ? `- Current video: ${ctx.currentVideo}` : ''}
${ctx.currentTimestamp ? `- Timestamp: ${ctx.currentTimestamp}s` : ''}
${ctx.subject ? `- Subject: ${ctx.subject}` : ''}
${ctx.previousMessages ? `- Chat history: ${JSON.stringify(ctx.previousMessages.slice(-3))}` : ''}`
    : ''

  if (lang === 'zh') {
    return `你是一位耐心的AI辅导老师。学生正在向你提问。

${contextStr}

学生消息：${params.message}

请用中文回复。记住：
1. 保持友好和鼓励性
2. 引导学生自己思考
3. 回答简洁（2-3句话）
4. 如果不确定，建议学生咨询人工老师`
  }

  return `You are a patient AI tutor. A student is asking you a question.

${contextStr}

Student message: ${params.message}

Please respond in English. Remember:
1. Be friendly and encouraging
2. Guide students to think for themselves
3. Keep answers concise (2-3 sentences)
4. If unsure, suggest consulting a human tutor`
}

// ============================================
// Tutor course materials & outline (bilingual)
// ============================================

/** Convert raw uploaded text (curriculum or notes) into a clean, editable format. */
export const convertToEditablePrompt = (params: {
  type: 'curriculum' | 'notes'
  rawText: string
  language?: string
}): string => {
  const lang = params.language === 'zh-CN' || params.language === 'zh-TW' ? 'zh' : 'en'
  const typeLabel = params.type === 'curriculum' ? 'curriculum/syllabus' : 'teaching notes'
  if (lang === 'zh') {
    return `将以下上传的${params.type === 'curriculum' ? '课程/大纲' : '笔记'}内容整理成结构清晰、易于编辑的文本。保留所有重要信息，用标题、列表和段落组织好。不要添加课程表或课时，只整理内容。输出纯文本。

上传内容：
${params.rawText.slice(0, 12000)}`
  }
  return `Convert the following uploaded ${typeLabel} into a clean, well-structured editable text. Keep all important information. Use headings, lists, and paragraphs. Do not add a schedule or lesson lengths—only structure the content. Output plain text only.

Uploaded content:
${params.rawText.slice(0, 12000)}`
}

/** Convert a list of topics (bullets or short lines) into editable, expanded topic text for "Edit Topics" area. */
export const convertTopicsToEditablePrompt = (params: {
  topicsListText: string
  subject?: string
  language?: string
}): string => {
  const lang = params.language === 'zh-CN' || params.language === 'zh-TW' ? 'zh' : 'en'
  if (lang === 'zh') {
    return `用户上传了一个主题列表。请将其扩展为可编辑的“主题编辑”文本：每个主题占一段或一个小节，包含简短说明（1-2句），方便老师后续编辑。保持顺序，输出纯文本。

主题列表：
${params.topicsListText.slice(0, 8000)}`
  }
  return `The user uploaded a list of topics. Expand it into editable "Edit Topics" text: each topic as a short section with a 1-2 sentence description, so the tutor can edit later. Keep the order. Output plain text only.

Topics list:
${params.topicsListText.slice(0, 8000)}`
}

/** Generate a course outline where each item is one typical lesson (e.g. 45–60 min). Output JSON array. */
export const courseOutlineFromCurriculumPrompt = (params: {
  curriculumText: string
  subject?: string
  typicalLessonMinutes?: number
  language?: string
}): string => {
  const lang = params.language === 'zh-CN' || params.language === 'zh-TW' ? 'zh' : 'en'
  const mins = params.typicalLessonMinutes ?? 45
  if (lang === 'zh') {
    return `根据以下课程/大纲内容，生成详细的课程提纲。要求：每个提纲项对应一节课（约${mins}分钟）可完成的内容，不要合并多节课到一个项。输出仅为一个JSON数组，无其他文字，格式：
[{"title":"第1课标题","durationMinutes":${mins}},{"title":"第2课标题","durationMinutes":${mins}}]

课程/大纲内容：
${params.curriculumText.slice(0, 12000)}`
  }
  return `From the following curriculum/syllabus content, generate a detailed course outline. Each outline item must be completable in one typical lesson (${mins} minutes). Do not merge multiple lessons into one item. Output only a JSON array, no other text. Format:
[{"title":"Lesson 1 title","durationMinutes":${mins}},{"title":"Lesson 2 title","durationMinutes":${mins}}]

Curriculum content:
${params.curriculumText.slice(0, 12000)}`
}

/** Generate a course outline as modules; each module has lessons (one typical class each). Output JSON array of modules. */
export const courseOutlineAsModulesPrompt = (params: {
  curriculumText: string
  notesText?: string
  subject?: string
  typicalLessonMinutes?: number
  language?: string
}): string => {
  const lang = params.language === 'zh-CN' || params.language === 'zh-TW' ? 'zh' : 'en'
  const mins = params.typicalLessonMinutes ?? 45
  const combinedText = params.notesText
    ? `${params.curriculumText}\n\n--- Notes ---\n${params.notesText}`
    : params.curriculumText
  const content = combinedText.slice(0, 12000)
  if (lang === 'zh') {
    return `根据以下课程/大纲内容，生成模块化课程提纲。要求：
- 输出仅为一个JSON数组，每个元素是一个模块（module），无其他文字。
- 每个模块包含：title（模块标题）、description（可选，简短描述）、notes（可选，备注）、tasks（可选，数组，每项为 { "title": "任务名" }）、lessons（必填，数组，每项为一节课，格式 { "title": "课标题", "durationMinutes": ${mins} }）。
- 每节课对应一节课时（约${mins}分钟），不要合并多节课到一项。
格式示例：
[{"title":"模块1","description":"...","notes":"...","tasks":[{"title":"任务1"}],"lessons":[{"title":"第1课","durationMinutes":${mins}}]},{"title":"模块2","lessons":[{"title":"第2课","durationMinutes":${mins}}]}]

课程/大纲内容：
${content}`
  }
  return `From the following curriculum/syllabus content, generate a module-based course outline. Requirements:
- Output only a JSON array; each element is a module. No other text.
- Each module has: title (string), description (optional), notes (optional), tasks (optional array of { "title": "task name" }), lessons (required array of { "title": "lesson title", "durationMinutes": ${mins} }).
- Each lesson is one typical class (${mins} minutes). Do not merge multiple lessons into one item.
Example format:
[{"title":"Module 1","description":"...","notes":"...","tasks":[{"title":"Task 1"}],"lessons":[{"title":"Lesson 1","durationMinutes":${mins}}]},{"title":"Module 2","lessons":[{"title":"Lesson 2","durationMinutes":${mins}}]}]

Curriculum content:
${content}`
}

/** Generate a short course description from subject, grade level, and difficulty. Output plain text only, 1–3 sentences. */
export const courseDescriptionFromSubjectPrompt = (params: {
  subject: string
  gradeLevel?: string
  difficulty?: string
}): string => {
  const subjectLabel = params.subject || 'this subject'
  const grade = params.gradeLevel || 'all levels'
  const difficulty = params.difficulty || 'intermediate'
  return `Write a short, engaging course description (1–3 sentences) for a ${subjectLabel} course. Target audience: ${grade}, ${difficulty} level. Describe what students will learn and the course focus. Output only the description text, no labels or quotes.`
}
