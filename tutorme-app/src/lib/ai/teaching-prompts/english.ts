/**
 * English Subject Prompts
 * Subject-specific context and teaching approaches
 */

export const englishContext = `
Subject: English Language Arts
Key Areas: Grammar, Writing, Literature Analysis, Reading Comprehension

Common Student Challenges:
- Essay structure (thesis, introduction, body, conclusion)
- Grammar rules (punctuation, subject-verb agreement)
- Literary devices (metaphor, symbolism, theme)
- Evidence and analysis integration
- Transitions and flow

Teaching Approach:
- Use concrete examples from literature
- Practice with real writing samples
- Focus on process over perfection
- Build vocabulary in context
`

export const englishTopics: Record<string, string> = {
  essay_basics: `
Topic: Essay Writing Basics
Key Concepts:
- Thesis statement: Arguable claim that guides the essay
- Introduction: Hook + Context + Thesis
- Body paragraphs: Topic sentence + Evidence + Analysis
- Conclusion: Restate thesis + Synthesize points + Final thought

Common Mistakes:
- Thesis is too broad or factual (not arguable)
- Evidence without analysis ("quote dumping")
- Weak transitions between paragraphs
- Introduction of new ideas in conclusion
`,

  grammar_fundamentals: `
Topic: Grammar Fundamentals
Key Concepts:
- Parts of speech: noun, verb, adjective, adverb
- Sentence structure: subject + predicate
- Common errors: run-on sentences, fragments
- Punctuation: commas, semicolons, apostrophes

Teaching Tips:
- Use real-world examples
- Focus on patterns, not memorization
- Practice with student writing
`,

  literary_analysis: `
Topic: Literary Analysis
Key Concepts:
- Theme: Central message or insight
- Symbolism: Objects representing abstract ideas
- Character development: How characters change
- Evidence: Quotes support analysis

Analysis Formula:
1. Make a claim about the text
2. Provide evidence (quote)
3. Explain how evidence supports claim
4. Connect to larger meaning
`,

  thesis_development: `
Topic: Thesis Development
Key Concepts:
- Debatable: Reasonable people could disagree
- Specific: Focuses on particular aspect
- Supported: Can be proven with evidence
- Significant: Worth discussing

Formula:
[Topic] + [Claim/Position] + [Reasoning]
Example: "In 1984, Orwell uses Newspeak to demonstrate how language control enables totalitarian power."
`
}

// English-specific teaching mode adjustments
export const englishModeAdjustments: Record<string, string> = {
  socratic: `
English-Specific Socratic Approach:
- For grammar: "What rule applies here? What pattern do you see?"
- For writing: "What is your main point? How does this paragraph support it?"
- For literature: "What evidence supports your interpretation? What else could this symbol mean?"
- Use examples from well-known texts when possible
`,

  lesson: `
English Lesson Structure:
1. **Introduction**: Connect to a familiar text or real-world writing
2. **Key Concept**: Define with examples from literature
3. **Model**: Show expert example and annotate
4. **Guided Practice**: Student attempts with support
5. **Independent Practice**: Student applies skill
6. **Reflection**: What did you learn? How will you use this?
`
}
