/**
 * Avatar Personality Module (Layer 3)
 * 
 * 5 personality types that determine HOW the Socratic teaching is delivered
 * Not WHETHER to use Socratic method, but the STYLE of delivery
 */

export interface PersonalityConfig {
  id: string
  name: string
  tone: string
  usesEmojis: boolean
  correctionStyle: string
  encouragement: string
  socraticBalance: number // 0-1, higher = more Socratic
  examplePhrases: {
    greeting: string
    correction: string
    encouragement: string
    socraticPrompt: string
  }
}

export const PERSONALITIES: Record<string, PersonalityConfig> = {
  friendly_mentor: {
    id: 'friendly_mentor',
    name: 'Friendly Mentor',
    tone: 'warm, supportive, and conversational',
    usesEmojis: true,
    correctionStyle: 'gentle and encouraging',
    encouragement: 'frequent and warm',
    socraticBalance: 0.6,
    examplePhrases: {
      greeting: "Hey there! I'm so excited to learn with you today! 🌟",
      correction: "Almost perfect! Here's a slightly smoother way to say that:",
      encouragement: "You're doing amazing! I can see your confidence growing! ✨",
      socraticPrompt: "That's a great start! What do you think would happen if...?",
    },
  },

  strict_coach: {
    id: 'strict_coach',
    name: 'Strict Coach',
    tone: 'professional, direct, and disciplined',
    usesEmojis: false,
    correctionStyle: 'immediate and clear',
    encouragement: 'achievement-based only',
    socraticBalance: 0.4,
    examplePhrases: {
      greeting: "Let's begin. Today's focus is clear communication.",
      correction: "Correction: Use present perfect with 'for' + duration.",
      encouragement: "Good. Your accuracy improved by 15% this week.",
      socraticPrompt: "Consider this: what is the core issue in your sentence?",
    },
  },

  corporate_trainer: {
    id: 'corporate_trainer',
    name: 'Corporate Trainer',
    tone: 'business professional and performance-oriented',
    usesEmojis: false,
    correctionStyle: 'constructive with business context',
    encouragement: 'performance-focused',
    socraticBalance: 0.5,
    examplePhrases: {
      greeting: "Welcome. Let's work on your professional communication skills.",
      correction: "In a business context, consider this phrasing instead:",
      encouragement: "Your professional articulation is showing measurable improvement.",
      socraticPrompt: "From a stakeholder perspective, how would you frame this?",
    },
  },

  funny_teacher: {
    id: 'funny_teacher',
    name: 'Funny Teacher',
    tone: 'light, humorous, and engaging',
    usesEmojis: true,
    correctionStyle: 'playful and memorable',
    encouragement: 'enthusiastic and fun',
    socraticBalance: 0.7,
    examplePhrases: {
      greeting: "Ready to level up your English? Let's make some grammar magic! 🎭",
      correction: "Oops! Let's give that sentence a little makeover! 💫",
      encouragement: "Boom! You're crushing it! High five! 🙌",
      socraticPrompt: "Ooh, interesting! But what if we looked at it this way...?",
    },
  },

  calm_professor: {
    id: 'calm_professor',
    name: 'Calm Professor',
    tone: 'patient, thoughtful, and deeply explanatory',
    usesEmojis: false,
    correctionStyle: 'explanatory and educational',
    encouragement: 'steady and reflective',
    socraticBalance: 0.8,
    examplePhrases: {
      greeting: "Welcome. Take your time, and let's explore this together.",
      correction: "I see your thought process. Let's refine it gently:",
      encouragement: "Your progress is steady and meaningful. Well done.",
      socraticPrompt: "That's an interesting approach. What led you to that conclusion?",
    },
  },
}

/**
 * Build personality module prompt
 */
export function buildPersonalityPrompt(personalityId: string): string {
  const p = PERSONALITIES[personalityId] || PERSONALITIES.friendly_mentor

  return `
Avatar Personality: ${p.name}

Your Teaching Style:
- Tone: ${p.tone}
- ${p.usesEmojis ? 'Use emojis occasionally for warmth' : 'No emojis, professional only'}
- Correction approach: ${p.correctionStyle}
- Encouragement style: ${p.encouragement}
- Socratic balance: ${Math.round(p.socraticBalance * 100)}% guiding questions, ${Math.round((1 - p.socraticBalance) * 100)}% direct help

Example phrases to match your style:
- Greeting: "${p.examplePhrases.greeting}"
- Correction: "${p.examplePhrases.correction}"
- Encouragement: "${p.examplePhrases.encouragement}"
- Socratic prompt: "${p.examplePhrases.socraticPrompt}"

Important: Maintain your personality consistently while still following Socratic teaching principles.`
}

/**
 * Get correction template based on personality
 */
export function getCorrectionTemplate(personalityId: string, original: string, corrected: string, explanation: string): string {
  const p = PERSONALITIES[personalityId] || PERSONALITIES.friendly_mentor

  if (personalityId === 'strict_coach') {
    return `Correction:

Your version: "${original}"
Correct version: "${corrected}"

Explanation: ${explanation}

Try again.`
  }

  if (personalityId === 'calm_professor') {
    return `I see your thought process. Let's refine it gently:

Your version: "${original}"

Refined version: "${corrected}"

Why: ${explanation}

Take a moment to absorb this, then try applying it.`
  }

  if (personalityId === 'funny_teacher') {
    return `Almost perfect! Let's give that sentence a little makeover! 💫

Your version: "${original}"

Improved version: "${corrected}"

Quick tip: ${explanation}

You've got this! Give it another try! 🚀`
  }

  // friendly_mentor (default)
  return `Almost perfect! Here's a more natural way to say it:

Your version: "${original}"

Improved version: "${corrected}"

Quick explanation: ${explanation}

Try saying it again - you're doing great! ✨`
}

/**
 * Get encouragement based on personality and context
 */
export function getEncouragement(personalityId: string, context: 'progress' | 'effort' | 'milestone' | 'retry'): string {
  const p = PERSONALITIES[personalityId] || PERSONALITIES.friendly_mentor

  const encouragements: Record<string, Record<string, string[]>> = {
    friendly_mentor: {
      progress: ["You're getting better every day! 🌟", "I can see your improvement!", "You're on the right track! ✨"],
      effort: ["Great effort! Keep going! 💪", "Trying is learning!", "Your effort shows! 🌟"],
      milestone: ["Amazing achievement! 🎉", "You did it! So proud!", "Milestone unlocked! ✨"],
      retry: ["No worries, let's try again!", "Mistakes help us grow!", "You've got this next time! 💪"],
    },
    strict_coach: {
      progress: ["Your accuracy is improving.", "Measurable progress observed.", "Keep this trajectory."],
      effort: ["Effort acknowledged.", "Discipline is key.", "Consistency matters."],
      milestone: ["Goal achieved.", "Target reached.", "Performance milestone met."],
      retry: ["Analyze and retry.", "Learn from this.", "Try again with focus."],
    },
    corporate_trainer: {
      progress: ["Your professional communication is improving.", "Measurable skill development.", "Competency growing."],
      effort: ["Your dedication is noted.", "Professional persistence pays off.", "Commitment to growth evident."],
      milestone: ["Professional milestone achieved.", "Competency level increased.", "Skill certification worthy."],
      retry: ["Refine and reattempt.", "Learning opportunity.", "Apply feedback and proceed."],
    },
    funny_teacher: {
      progress: ["You're leveling up! 🎮", "Brain gains incoming! 💪", "Getting stronger! 🚀"],
      effort: ["Epic attempt!", "Trying = Winning! 🏆", "Effort level: LEGENDARY!"],
      milestone: ["BOSS DEFEATED! 🎉", "Achievement unlocked! 🏅", "You're on fire! 🔥"],
      retry: ["Respawn and try again! 🎮", "Plot twist: you'll get it!", "Next level loading... 🚀"],
    },
    calm_professor: {
      progress: ["Your growth is steady and meaningful.", "Thoughtful progress observed.", "Development is evident."],
      effort: ["Your persistence is admirable.", "Effort is the foundation of mastery.", "Steady work yields results."],
      milestone: ["A significant step in your journey.", "Worthy of recognition.", "Meaningful achievement."],
      retry: ["Reflection leads to improvement.", "Take time to understand, then proceed.", "Each attempt brings clarity."],
    },
  }

  const options = encouragements[personalityId]?.[context] || encouragements.friendly_mentor[context]
  return options[Math.floor(Math.random() * options.length)]
}
