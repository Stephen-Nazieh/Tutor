/**
 * English/Language Arts Subject Context
 * Specialized context for English language tutoring
 */

import { SubjectContext } from './types'

export const englishContext: SubjectContext = {
  id: 'english',
  name: 'English Language Arts',
  description: 'English tutoring covering literature, writing, grammar, and critical analysis',
  
  concepts: [
    {
      id: 'essay_structure',
      name: 'Essay Structure',
      description: 'Thesis, body paragraphs, evidence, and conclusion',
      prerequisites: [],
      commonMisconceptions: [
        'Thesis statement is just a topic sentence',
        'Body paragraphs can be any length',
        'Conclusion just restates the introduction',
        'Personal opinions don\'t need evidence'
      ],
      exampleProblems: [
        {
          id: 'essay_1',
          question: 'Write a thesis statement for an essay about the theme of courage in "To Kill a Mockingbird"',
          hint: 'A thesis makes a claim that can be debated. What specific argument about courage could you make?',
          solution: 'In To Kill a Mockingbird, Harper Lee demonstrates that true courage requires standing for justice despite certain defeat.',
          difficulty: 'intermediate'
        }
      ],
      relatedConcepts: ['thesis_development', 'evidence_analysis', 'transitions']
    },
    {
      id: 'literary_analysis',
      name: 'Literary Analysis',
      description: 'Analyzing themes, symbols, and author techniques',
      prerequisites: ['reading_comprehension'],
      commonMisconceptions: [
        'Finding symbolism everywhere (over-interpretation)',
        'Confusing summary with analysis',
        'Not connecting techniques to meaning',
        'Ignoring historical context'
      ],
      exampleProblems: [
        {
          id: 'lit_1',
          question: 'How does the author use the green light in The Great Gatsby?',
          hint: 'What does the green light represent? How does its meaning change? What theme does it connect to?',
          solution: 'The green light symbolizes Gatsby\'s hope and the American Dream, but its distance shows the dream\'s unattainability.',
          difficulty: 'advanced'
        }
      ],
      relatedConcepts: ['symbolism', 'theme', 'character_development']
    },
    {
      id: 'grammar_mechanics',
      name: 'Grammar and Mechanics',
      description: 'Sentence structure, punctuation, and usage rules',
      prerequisites: [],
      commonMisconceptions: [
        'Comma splices are acceptable',
        'Semicolons and colons are interchangeable',
        'Passive voice is always wrong',
        'Contractions are never allowed in formal writing'
      ],
      exampleProblems: [
        {
          id: 'gram_1',
          question: 'Correct this sentence: "The students studied hard, they all passed the exam."',
          hint: 'This is a comma splice. How can you connect two independent clauses? (period, semicolon, or conjunction)',
          solution: 'The students studied hard; they all passed the exam. OR The students studied hard, so they all passed.',
          difficulty: 'beginner'
        }
      ],
      relatedConcepts: ['sentence_variety', 'punctuation', 'syntax']
    },
    {
      id: 'rhetorical_analysis',
      name: 'Rhetorical Analysis',
      description: 'Ethos, pathos, logos and rhetorical strategies',
      prerequisites: ['reading_comprehension'],
      commonMisconceptions: [
        'Confusing ethos/pathos/logos',
        'Identifying strategies without explaining effect',
        'Not considering audience',
        'Ignoring the speaker\'s credibility'
      ],
      exampleProblems: [
        {
          id: 'rhet_1',
          question: 'How does Martin Luther King Jr. use pathos in his "I Have a Dream" speech?',
          hint: 'Look for emotional language, imagery, and appeals to shared values. What feelings does he evoke?',
          solution: 'King uses imagery of children playing together and references to American ideals to evoke hope and shared humanity.',
          difficulty: 'intermediate'
        }
      ],
      relatedConcepts: ['persuasion', 'audience', 'tone']
    }
  ],
  
  commonMistakes: [
    {
      id: 'summary_vs_analysis',
      pattern: 'Summary instead of analysis',
      description: 'Retelling the plot instead of analyzing meaning',
      correctivePrompt: 'That\'s a good summary. Now tell me: What does this reveal about the character/theme/society?'
    },
    {
      id: 'weak_thesis',
      pattern: 'Weak thesis statements',
      description: 'Thesis is too broad or merely factual',
      correctivePrompt: 'Can someone disagree with this statement? What specific claim are you making?'
    },
    {
      id: 'quote_drops',
      pattern: 'Quote dropping',
      description: 'Inserting quotes without explanation or context',
      correctivePrompt: 'Why did you choose this quote? How does it support your point?'
    },
    {
      id: 'vague_language',
      pattern: 'Vague language',
      description: 'Using words like "interesting" or "good" without specifics',
      correctivePrompt: 'What specifically makes it interesting? Use more precise language.'
    },
    {
      id: 'pronoun_clarity',
      pattern: 'Unclear pronoun reference',
      description: 'It/this/they without clear antecedent',
      correctivePrompt: 'What does "it" refer to? Be specific so your reader can follow.'
    }
  ],
  
  pedagogicalApproach: {
    socraticStyle: 'Ask students to support claims with textual evidence. Encourage close reading and questioning of assumptions. Help students find their own voice in writing.',
    emphasisAreas: [
      'Textual evidence over personal opinion',
      'Critical thinking and questioning',
      'Revision and refinement',
      'Audience awareness',
      'Close reading skills',
      'Developing authentic voice'
    ],
    questionTemplates: [
      {
        id: 'textual_evidence',
        template: 'What in the text makes you say that?',
        whenToUse: 'When student makes a claim about the text',
        example: 'Any literary analysis discussion'
      },
      {
        id: 'so_what',
        template: 'So what? Why does that matter?',
        whenToUse: 'When analysis seems superficial',
        example: 'Student identifies a symbol but doesn\'t explain significance'
      },
      {
        id: 'author_choices',
        template: 'Why might the author have made this choice?',
        whenToUse: 'Analyzing authorial intent',
        example: 'Character decisions, narrative structure'
      },
      {
        id: 'alternative_readings',
        template: 'Could someone interpret this differently?',
        whenToUse: 'Encouraging critical thinking',
        example: 'Ambiguous passages, multiple themes'
      },
      {
        id: 'audience_awareness',
        template: 'How would this argument affect someone who disagrees?',
        whenToUse: 'Revising persuasive writing',
        example: 'Essay writing, rhetorical analysis'
      }
    ]
  },
  
  availableTools: [
    'grammar_checker',
    'thesaurus',
    'citation_generator',
    'text_analyzer',
    'outline_builder'
  ],
  
  promptAdditions: `
    # English Language Arts Teaching Guidelines
    
    ## Core Principles
    1. **Textual evidence is essential** - All claims need support from the text
    2. **Analysis over summary** - Always push for "why" and "so what"
    3. **Process over product** - Writing is iterative; revision is key
    4. **Voice matters** - Help students develop authentic expression
    
    ## Reading Analysis Questions
    - "What specific words or phrases stand out to you?"
    - "How does this connect to the broader themes?"
    - "What is the author NOT saying?"
    - "How would different readers interpret this?"
    
    ## Writing Guidance
    - "Show, don't tell" - use concrete examples
    - "So what?" - every paragraph needs purpose
    - "Consider your audience" - who are you convincing?
    - "Evidence sandwich" - introduce, quote, analyze
    
    ## Grammar Teaching Approach
    - Explain WHY the rule exists (clarity, emphasis, rhythm)
    - Show examples of effective rule-breaking by published authors
    - Focus on patterns, not individual errors
    - Prioritize clarity over correctness
    
    ## Encouragement Phrases
    - "You have an interesting insight here..."
    - "Let\'s dig deeper into that idea..."
    - "Your voice is emerging nicely..."
    - "Revision is where good writing becomes great..."
    - "Trust your reading - what does your gut tell you?"
    
    ## Quote Integration
    When students use quotes, ensure they:
    1. Introduce the quote (who said it, context)
    2. Present the quote (properly formatted)
    3. Analyze the quote (explain significance)
  `,
  
  formatting: {
    useLatex: false,
    useDiagrams: false,
    useCodeBlocks: true,
    customNotation: 'MLA/APA citation format'
  }
}
