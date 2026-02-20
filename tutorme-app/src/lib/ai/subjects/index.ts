/**
 * Subject Context Loader
 * Loads and manages subject-specific contexts for AI tutoring
 */

import { SubjectContext, SubjectId, SUBJECTS } from './types'
import { mathematicsContext } from './mathematics'
import { physicsContext } from './physics'
import { chemistryContext } from './chemistry'
import { englishContext } from './english'

// Registry of all subject contexts
const subjectRegistry: Record<string, SubjectContext> = {
  mathematics: mathematicsContext,
  math: mathematicsContext,
  physics: physicsContext,
  chemistry: chemistryContext,
  chem: chemistryContext,
  english: englishContext,
  literature: englishContext,
  language_arts: englishContext,
  // Default/fallback context
  general: createGeneralContext()
}

/**
 * Get subject context by ID
 */
export function getSubjectContext(subject: string): SubjectContext {
  const normalizedSubject = subject.toLowerCase().trim()
  
  // Try exact match first
  if (subjectRegistry[normalizedSubject]) {
    return subjectRegistry[normalizedSubject]
  }
  
  // Try partial matches
  for (const [key, context] of Object.entries(subjectRegistry)) {
    if (normalizedSubject.includes(key) || key.includes(normalizedSubject)) {
      return context
    }
  }
  
  // Return general context as fallback
  return subjectRegistry.general
}

/**
 * Check if a subject is supported
 */
export function isSubjectSupported(subject: string): boolean {
  const normalizedSubject = subject.toLowerCase().trim()
  return !!subjectRegistry[normalizedSubject] || 
    Object.keys(subjectRegistry).some(key => 
      normalizedSubject.includes(key) || key.includes(normalizedSubject)
    )
}

/**
 * Get all available subjects
 */
export function getAvailableSubjects(): { id: string; name: string }[] {
  return Object.values(subjectRegistry)
    .filter((ctx, index, self) => 
      // Remove duplicates (e.g., math/mathematics)
      self.findIndex(c => c.id === ctx.id) === index
    )
    .map(ctx => ({ id: ctx.id, name: ctx.name }))
}

/**
 * Build system prompt with subject context
 */
export function buildSystemPrompt(subject: string, options?: {
  includeCommonMistakes?: boolean
  includePedagogy?: boolean
  includeTools?: boolean
  teachingAge?: number
  voiceGender?: string
  voiceAccent?: string
}): string {
  const context = getSubjectContext(subject)
  const opts = { 
    includeCommonMistakes: true, 
    includePedagogy: true, 
    includeTools: true,
    teachingAge: 15,
    voiceGender: 'female',
    voiceAccent: 'us',
    ...options 
  }
  
  let prompt = `# TutorMe AI Tutor - ${context.name}\n\n`
  prompt += `## Core Persona\n`
  prompt += `You are a patient, encouraging Socratic tutor. You NEVER give direct answers. `
  prompt += `Instead, you guide students to discover solutions through questions, hints, and encouragement.\n\n`
  
  // NEW: Age-based teaching
  prompt += getAgeBasedPrompt(opts.teachingAge)
  
  // NEW: Voice/Accent guidance
  prompt += getVoicePrompt(opts.voiceGender, opts.voiceAccent)
  
  // Add subject context
  prompt += context.promptAdditions
  
  if (opts.includeCommonMistakes && context.commonMistakes.length > 0) {
    prompt += `\n\n## Watch For These Common Mistakes\n`
    context.commonMistakes.slice(0, 5).forEach(mistake => {
      prompt += `- **${mistake.pattern}**: ${mistake.description}\n`
    })
  }
  
  if (opts.includePedagogy) {
    prompt += `\n\n## Question Templates\n`
    context.pedagogicalApproach.questionTemplates.slice(0, 3).forEach(qt => {
      prompt += `- "${qt.template}"\n`
    })
  }
  
  if (opts.includeTools && context.availableTools.length > 0) {
    prompt += `\n\n## Available Tools\n`
    prompt += `You can suggest using: ${context.availableTools.join(', ')}\n`
  }
  
  prompt += `\n\n## Response Guidelines\n`
  prompt += `1. Keep responses under 3-4 sentences\n`
  prompt += `2. Ask ONE guiding question at a time\n`
  prompt += `3. Acknowledge correct reasoning before correcting errors\n`
  prompt += `4. Use encouraging language\n`
  prompt += `5. Reference specific concepts from the knowledge graph when relevant\n`
  
  return prompt
}

// NEW: Age-based teaching prompts
function getAgeBasedPrompt(age: number): string {
  const ageGuidelines: Record<number, string> = {
    5: `
## Teaching Style: Ages 5-8 (Early Elementary)
- Use very simple words and short sentences
- Use lots of analogies and comparisons to toys, games, and everyday objects
- Be playful and use emojis or fun expressions
- Use stories and imagination to explain concepts
- Ask "what do you think?" frequently
- Be very patient and encouraging
- Example: "Think of grammar like building blocks - each word is a block!"
`,
    8: `
## Teaching Style: Ages 8-10 (Upper Elementary)
- Use simple but clear explanations
- Include fun facts and interesting connections
- Use relatable examples from school and hobbies
- Encourage curiosity with "I wonder..." questions
- Keep explanations brief but complete
- Use comparisons to familiar things
- Example: "A thesis is like the main idea of a story - it's what everything else supports!"
`,
    10: `
## Teaching Style: Ages 10-12 (Middle School)
- Use clear academic language but explain new terms
- Connect to real-world applications
- Encourage critical thinking with "why" and "how" questions
- Use examples from pop culture, sports, or technology
- Support developing independence
- Example: "When you write an essay, think of it like building an argument - you need evidence to support your claims."
`,
    12: `
## Teaching Style: Ages 12-15 (High School Freshman/Sophomore)
- Use standard academic vocabulary
- Expect students to make connections between concepts
- Challenge with "what if" scenarios
- Use sophisticated but accessible examples
- Encourage deeper analysis
- Example: "Consider how the author's word choice shapes the reader's perception of the character."
`,
    15: `
## Teaching Style: Ages 15-18 (High School Junior/Senior)
- Use college-preparatory academic language
- Expect nuanced understanding and synthesis
- Challenge assumptions and encourage original thinking
- Use complex literary and rhetorical examples
- Prepare for AP/college-level work
- Example: "Analyze the intersection of the author's rhetorical strategies and the historical context in which the text was produced."
`,
    18: `
## Teaching Style: Adult/College Level
- Use sophisticated academic discourse
- Expect independent research and synthesis
- Engage with theoretical frameworks
- Challenge with primary source analysis
- Support professional/academic writing development
- Example: "Evaluate the theoretical implications of the text's structural choices within its genre conventions."
`
  }
  
  // Find closest age bracket
  const ages = [5, 8, 10, 12, 15, 18]
  const closestAge = ages.reduce((prev, curr) => 
    Math.abs(curr - age) < Math.abs(prev - age) ? curr : prev
  )
  
  return ageGuidelines[closestAge] || ageGuidelines[15]
}

// NEW: Voice/Accent guidance
function getVoicePrompt(gender: string, accent: string): string {
  const accentDescriptions: Record<string, string> = {
    us: 'American English',
    uk: 'British English',
    au: 'Australian English',
    ca: 'Canadian English'
  }
  
  return `
## Voice & Tone
- Speak with a ${accentDescriptions[accent] || 'neutral'} accent
- Use ${gender === 'female' ? 'warm, nurturing' : gender === 'male' ? 'authoritative yet approachable' : 'neutral, professional'} tone
- Be conversational and engaging
`
}

/**
 * Get subject-specific hints for a concept
 */
export function getConceptHints(subject: string, conceptId: string): string[] {
  const context = getSubjectContext(subject)
  const concept = context.concepts.find(c => c.id === conceptId)
  
  if (!concept) return []
  
  return [
    ...concept.commonMisconceptions.map(m => `Watch out: ${m}`),
    ...concept.exampleProblems.map(p => `Example: ${p.hint}`)
  ]
}

/**
 * Find relevant concepts based on query
 */
export function findRelevantConcepts(subject: string, query: string): string[] {
  const context = getSubjectContext(subject)
  const queryLower = query.toLowerCase()
  
  return context.concepts
    .filter(concept => 
      concept.name.toLowerCase().includes(queryLower) ||
      concept.description.toLowerCase().includes(queryLower) ||
      concept.relatedConcepts.some(rc => rc.toLowerCase().includes(queryLower))
    )
    .map(c => c.id)
}

/**
 * Get common mistake pattern and correction
 */
export function getCommonMistakeHelp(subject: string, errorPattern: string): string | null {
  const context = getSubjectContext(subject)
  
  const mistake = context.commonMistakes.find(m => 
    errorPattern.toLowerCase().includes(m.pattern.toLowerCase()) ||
    m.pattern.toLowerCase().includes(errorPattern.toLowerCase())
  )
  
  return mistake?.correctivePrompt || null
}

/**
 * Create a general/default context for unsupported subjects
 */
function createGeneralContext(): SubjectContext {
  return {
    id: 'general',
    name: 'General Learning',
    description: 'General-purpose tutoring with Socratic methodology',
    concepts: [],
    commonMistakes: [
      {
        id: 'rushing',
        pattern: 'Rushing to answer',
        description: 'Not reading the full question or thinking before answering',
        correctivePrompt: 'Take a moment to read the question again. What is it really asking?'
      },
      {
        id: 'giving_up',
        pattern: 'Giving up too quickly',
        description: 'Stating "I don\'t know" without attempting',
        correctivePrompt: 'What DO you know about this topic? Let\'s start from there.'
      }
    ],
    pedagogicalApproach: {
      socraticStyle: 'Ask probing questions to help students discover answers. Encourage metacognition.',
      emphasisAreas: [
        'Critical thinking',
        'Problem decomposition',
        'Self-reflection',
        'Connecting to prior knowledge'
      ],
      questionTemplates: [
        {
          id: 'what_do_you_know',
          template: 'What do you already know about this?',
          whenToUse: 'Starting any new problem',
          example: 'Any subject'
        },
        {
          id: 'similar_problem',
          template: 'Have you solved a similar problem before?',
          whenToUse: 'When student is stuck',
          example: 'Transfer learning'
        },
        {
          id: 'explain_back',
          template: 'Can you explain your reasoning to me?',
          whenToUse: 'Checking understanding',
          example: 'Any subject'
        }
      ]
    },
    availableTools: [],
    promptAdditions: `
      # General Tutoring Guidelines
      
      ## Core Principles
      1. Be patient and encouraging
      2. Never give direct answers
      3. Guide through questions
      4. Build on what student knows
      5. Promote independent thinking
      
      ## Socratic Questions
      - "What makes you think that?"
      - "What would happen if...?"
      - "How is this similar to what you learned before?"
      - "What evidence supports that?"
      - "Can you explain why that makes sense?"
      
      ## Encouragement
      - "You're thinking critically - that's great!"
      - "That\'s an interesting approach..."
      - "Learning takes time, and you\'re making progress."
    `,
    formatting: {
      useLatex: false,
      useDiagrams: true,
      useCodeBlocks: true,
      customNotation: 'General text'
    }
  }
}

// Export all subjects
export { mathematicsContext, physicsContext, chemistryContext, englishContext }
export * from './types'
