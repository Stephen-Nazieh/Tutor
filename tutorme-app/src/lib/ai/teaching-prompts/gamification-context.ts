/**
 * Gamification Context Layer (Layer 4)
 * 
 * Injects user's gamification data: level, XP, skill scores, streaks
 */

export interface GamificationContext {
  level: number
  xp: number
  xpToNextLevel: number
  progress: number
  streakDays: number
  longestStreak: number
  skills: {
    grammar: number
    vocabulary: number
    speaking: number
    listening: number
    confidence: number
    fluency: number
  }
  unlockedWorlds: string[]
}

/**
 * Build gamification context prompt
 */
export function buildGamificationContext(context: GamificationContext): string {
  const weakestSkill = Object.entries(context.skills)
    .sort((a, b) => a[1] - b[1])[0]
  
  const strongestSkill = Object.entries(context.skills)
    .sort((a, b) => b[1] - a[1])[0]

  return `
User Gamification Profile:

📊 Progress:
- Level: ${context.level}
- XP: ${context.xp} (${context.xpToNextLevel} XP to next level)
- Level Progress: ${context.progress}%

🔥 Streak: ${context.streakDays} days (Longest: ${context.longestStreak})

📈 Skill Scores (0-100):
- Confidence: ${context.skills.confidence}%
- Speaking: ${context.skills.speaking}%
- Grammar: ${context.skills.grammar}%
- Vocabulary: ${context.skills.vocabulary}%
- Fluency: ${context.skills.fluency}%
- Listening: ${context.skills.listening}%

💪 Strongest: ${strongestSkill[0]} (${strongestSkill[1]}%)
🎯 Needs Work: ${weakestSkill[0]} (${weakestSkill[1]}%)

Adaptive Instruction Guidelines:
${context.skills.confidence < 40 ? '- Confidence is low: increase emotional encouragement significantly' : ''}
${context.skills.speaking < 50 ? '- Speaking is weak: ask shorter speaking prompts, celebrate any speaking attempt' : ''}
${context.skills.grammar < 50 ? '- Grammar needs work: provide correction explanations, not just fixes' : ''}
${context.skills.vocabulary < 50 ? '- Vocabulary is limited: reinforce word usage, introduce synonyms' : ''}
${context.streakDays > 7 ? '- User has a strong streak: acknowledge their consistency' : ''}
${context.streakDays === 1 ? '- Streak just started: encourage them to build momentum' : ''}

When responding:
1. Acknowledge their effort in the context of their progress
2. If they improve, mention their skill score growth
3. Keep them motivated to maintain their streak
4. Reference their strongest skill when they need encouragement
5. Gently focus on their weakest skill during teaching moments`
}

/**
 * Build simplified context for lighter prompts
 */
export function buildMinimalGamificationContext(context: Partial<GamificationContext>): string {
  const parts: string[] = []
  
  if (context.level !== undefined) parts.push(`Level: ${context.level}`)
  if (context.streakDays !== undefined) parts.push(`Streak: ${context.streakDays} days`)
  if (context.skills) {
    const avgSkill = Math.round(
      (context.skills.grammar + context.skills.vocabulary + context.skills.speaking) / 3
    )
    parts.push(`Average Skill: ${avgSkill}%`)
    parts.push(`Confidence: ${context.skills.confidence}%`)
  }

  return parts.length > 0 ? `User Stats: ${parts.join(' | ')}` : ''
}

/**
 * Get adaptive difficulty instruction based on skill scores
 */
export function getAdaptiveDifficultyInstruction(skills: GamificationContext['skills']): string {
  const avgSkill = (skills.grammar + skills.vocabulary + skills.speaking + skills.fluency) / 4

  if (avgSkill > 85) {
    return `User is performing excellently (avg ${Math.round(avgSkill)}%). 
- Increase complexity gradually
- Add nuance and natural expressions
- Introduce idioms and colloquialisms
- Challenge with deeper questions`
  }

  if (avgSkill < 50) {
    return `User is struggling (avg ${Math.round(avgSkill)}%).
- Simplify vocabulary significantly
- Use shorter sentences
- Provide more examples
- Ask easier follow-up questions
- Celebrate small wins`
  }

  return `User is at moderate level (avg ${Math.round(avgSkill)}%).
- Maintain current difficulty
- Add gentle challenges
- Mix simple and complex examples`
}
