/**
 * Mathematics Subject Context
 * Specialized context for math tutoring
 */

import { SubjectContext } from './types'

export const mathematicsContext: SubjectContext = {
  id: 'mathematics',
  name: 'Mathematics',
  description: 'Mathematics tutoring with emphasis on problem-solving methodology and mathematical reasoning',
  
  concepts: [
    {
      id: 'algebra_basics',
      name: 'Algebra Basics',
      description: 'Variables, equations, and algebraic manipulation',
      prerequisites: [],
      commonMisconceptions: [
        'Thinking 2(x+3) = 2x + 3 (missing distribution)',
        'Believing -x is always negative',
        'Confusing (a+b)² with a² + b²'
      ],
      exampleProblems: [
        {
          id: 'alg_1',
          question: 'Solve for x: 2(x + 3) = 14',
          hint: 'What should you do first - distribute or divide? Try both and see what happens.',
          solution: 'Distribute first: 2x + 6 = 14, then 2x = 8, so x = 4',
          difficulty: 'beginner'
        }
      ],
      relatedConcepts: ['linear_equations', 'quadratic_equations']
    },
    {
      id: 'calculus_limits',
      name: 'Limits',
      description: 'Understanding limits and continuity',
      prerequisites: ['algebra_basics', 'functions'],
      commonMisconceptions: [
        'Thinking limits are about the value at the point',
        'Believing limits always exist',
        'Confusing left and right limits'
      ],
      exampleProblems: [
        {
          id: 'lim_1',
          question: 'Find lim(x→2) (x² - 4)/(x - 2)',
          hint: 'What happens when you plug in x=2? Can you factor the numerator?',
          solution: 'Factor: (x-2)(x+2)/(x-2) = x+2, so limit is 4',
          difficulty: 'intermediate'
        }
      ],
      relatedConcepts: ['derivatives', 'continuity']
    },
    {
      id: 'geometry_proofs',
      name: 'Geometric Proofs',
      description: 'Logical reasoning in geometry',
      prerequisites: ['algebra_basics'],
      commonMisconceptions: [
        'Thinking diagrams are drawn to scale',
        'Assuming properties not given',
        'Skipping steps in logical chain'
      ],
      exampleProblems: [
        {
          id: 'geo_1',
          question: 'Prove that the base angles of an isosceles triangle are congruent',
          hint: 'What auxiliary line could help? Think about symmetry.',
          solution: 'Draw altitude from apex to base, creating two congruent right triangles by HL',
          difficulty: 'intermediate'
        }
      ],
      relatedConcepts: ['triangle_properties', 'congruence']
    }
  ],
  
  commonMistakes: [
    {
      id: 'sign_error',
      pattern: 'Sign errors',
      description: 'Losing track of negative signs or subtraction',
      correctivePrompt: 'Let\'s double-check the signs. When you subtract a negative, what happens?'
    },
    {
      id: 'distributive',
      pattern: 'Distribution errors',
      description: 'Forgetting to distribute to all terms',
      correctivePrompt: 'Check if you multiplied every term inside the parentheses. What is 2 × 3?'
    },
    {
      id: 'fraction_addition',
      pattern: 'Adding fractions incorrectly',
      description: 'Adding numerators and denominators separately',
      correctivePrompt: 'What do fractions need to have in common before adding? Think about slices of pizza.'
    },
    {
      id: 'order_operations',
      pattern: 'Order of operations',
      description: 'Doing operations in wrong order',
      correctivePrompt: 'Remember PEMDAS? What comes first - multiplication or addition?'
    },
    {
      id: 'square_root',
      pattern: 'Square root misconceptions',
      description: 'Forgetting ± or assuming √x² = x',
      correctivePrompt: 'If x² = 9, what could x be? Is there only one answer?'
    }
  ],
  
  pedagogicalApproach: {
    socraticStyle: 'Guide students through step-by-step reasoning. Ask "what would happen if..." questions. Emphasize showing work and checking answers.',
    emphasisAreas: [
      'Mathematical reasoning over memorization',
      'Multiple solution paths',
      'Checking and verifying answers',
      'Connecting to real-world applications',
      'Understanding why formulas work'
    ],
    questionTemplates: [
      {
        id: 'check_work',
        template: 'If you plug your answer back in, does it make the equation true?',
        whenToUse: 'After student solves an equation',
        example: 'Student solves 2x + 5 = 13 and gets x = 4'
      },
      {
        id: 'break_down',
        template: 'What is the smallest step you can take from here?',
        whenToUse: 'When student is stuck on complex problem',
        example: 'Multi-step algebra problem'
      },
      {
        id: 'pattern_recognition',
        template: 'Have you seen a problem like this before? What did you do then?',
        whenToUse: 'When problem resembles previous work',
        example: 'Similar triangle problem after doing congruence'
      },
      {
        id: 'visualize',
        template: 'Can you draw a diagram or picture of what\'s happening?',
        whenToUse: 'Word problems or geometry',
        example: 'Rate/distance problems, geometric figures'
      },
      {
        id: 'estimate',
        template: 'Before calculating, what do you think a reasonable answer would be?',
        whenToUse: 'Before solving to build number sense',
        example: 'Multiplication of large numbers'
      }
    ]
  },
  
  availableTools: [
    'calculator',
    'graphing',
    'equation_solver',
    'latex_renderer',
    'step_checker'
  ],
  
  promptAdditions: `
    # Mathematics Teaching Guidelines
    
    ## Formatting
    - Use LaTeX for equations: $...$ for inline, $$...$$ for display
    - Always show steps clearly with explanations
    - Use tables when comparing values or methods
    
    ## Teaching Approach
    1. **Never give the final answer directly**
    2. Ask students to show their work step by step
    3. If they make an error, ask them to check that specific step
    4. Encourage estimation before calculation
    5. Ask "does this answer make sense?" after solving
    
    ## Common Errors to Watch For
    - Sign errors (especially with negatives)
    - Distribution errors
    - Order of operations mistakes
    - Fraction arithmetic errors
    - Square root misconceptions (forgetting ±)
    
    ## Socratic Questions to Use
    - "What would happen if you tried [alternative approach]?"
    - "Can you explain why that step works?"
    - "Is there another way to check your answer?"
    - "What pattern do you notice?"
    - "If [x] were 0 or 1, what would happen?"
    
    ## Encouragement Phrases
    - "You're on the right track with..."
    - "That's a good insight about..."
    - "Let's build on what you just discovered..."
    - "Mathematical thinking takes practice - you're improving!"
  `,
  
  formatting: {
    useLatex: true,
    useDiagrams: true,
    useCodeBlocks: false,
    customNotation: 'LaTeX math notation'
  }
}
