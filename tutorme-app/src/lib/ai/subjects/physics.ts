/**
 * Physics Subject Context
 * Specialized context for physics tutoring
 */

import { SubjectContext } from './types'

export const physicsContext: SubjectContext = {
  id: 'physics',
  name: 'Physics',
  description: 'Physics tutoring emphasizing conceptual understanding, problem-solving strategies, and physical intuition',
  
  concepts: [
    {
      id: 'newton_laws',
      name: "Newton's Laws of Motion",
      description: 'Force, mass, acceleration relationships',
      prerequisites: ['vectors', 'basic_calculus'],
      commonMisconceptions: [
        'Thinking force is needed to maintain motion',
        'Confusing mass and weight',
        'Believing action-reaction forces cancel on same object',
        'Thinking heavier objects fall faster'
      ],
      exampleProblems: [
        {
          id: 'newton_1',
          question: 'A 5kg box is pushed with a 20N force on a frictionless surface. What is its acceleration?',
          hint: 'Which of Newton\'s laws applies here? What is the relationship between force, mass, and acceleration?',
          solution: 'F = ma, so a = F/m = 20N/5kg = 4 m/s²',
          difficulty: 'beginner'
        },
        {
          id: 'newton_2',
          question: 'In a tug-of-war, if team A pulls with 500N and team B pulls with 500N, what is the tension in the rope?',
          hint: 'Think about action-reaction pairs. What does the rope "feel"?',
          solution: 'Tension is 500N. Both teams experience 500N tension.',
          difficulty: 'intermediate'
        }
      ],
      relatedConcepts: ['friction', 'circular_motion', 'momentum']
    },
    {
      id: 'energy_conservation',
      name: 'Conservation of Energy',
      description: 'Kinetic, potential, and total energy',
      prerequisites: ['newton_laws', 'work'],
      commonMisconceptions: [
        'Thinking energy is "used up" or lost',
        'Confusing force and energy',
        'Not accounting for all energy forms',
        'Assuming frictionless systems in real problems'
      ],
      exampleProblems: [
        {
          id: 'energy_1',
          question: 'A ball is dropped from 10m. How fast is it going when it hits the ground? (ignore air resistance)',
          hint: 'What energy does it start with? What energy does it end with? What is conserved?',
          solution: 'mgh = ½mv², so v = √(2gh) = √(2×9.8×10) ≈ 14 m/s',
          difficulty: 'intermediate'
        }
      ],
      relatedConcepts: ['work_energy_theorem', 'power', 'simple_harmonic_motion']
    },
    {
      id: 'electric_circuits',
      name: 'Electric Circuits',
      description: 'Voltage, current, resistance, and circuit analysis',
      prerequisites: ['algebra_basics'],
      commonMisconceptions: [
        'Thinking current is "used up" in resistors',
        'Confusing voltage and current',
        'Not understanding parallel vs series',
        'Thinking electrons move at speed of light'
      ],
      exampleProblems: [
        {
          id: 'circuit_1',
          question: 'Two resistors (2Ω and 4Ω) are in series with a 12V battery. What is the current?',
          hint: 'What is the total resistance? How does Ohm\'s Law relate V, I, and R?',
          solution: 'R_total = 2+4 = 6Ω, I = V/R = 12/6 = 2A',
          difficulty: 'beginner'
        }
      ],
      relatedConcepts: ['ohms_law', 'kirchhoff_laws', 'capacitance']
    }
  ],
  
  commonMistakes: [
    {
      id: 'unit_confusion',
      pattern: 'Unit confusion',
      description: 'Mixing up units or not converting to consistent system',
      correctivePrompt: 'What units are given? What units do you need? Should you convert everything to meters and seconds first?'
    },
    {
      id: 'free_body',
      pattern: 'Incomplete free-body diagrams',
      description: 'Missing forces or including incorrect forces',
      correctivePrompt: 'Let\'s draw a free-body diagram. What objects are touching your system? What fields act on it?'
    },
    {
      id: 'sign_convention',
      pattern: 'Sign convention errors',
      description: 'Inconsistent positive/negative directions',
      correctivePrompt: 'Which direction did you choose as positive? Does your answer make sense with that choice?'
    },
    {
      id: 'vector_scalar',
      pattern: 'Confusing vectors and scalars',
      description: 'Adding vectors incorrectly or ignoring direction',
      correctivePrompt: 'Is this quantity a vector or scalar? Do you need to consider direction?'
    },
    {
      id: 'energy_loss',
      pattern: 'Ignoring energy losses',
      description: 'Assuming conservation when friction/drag exists',
      correctivePrompt: 'Is this an ideal system? What energy might be "lost" to the surroundings?'
    }
  ],
  
  pedagogicalApproach: {
    socraticStyle: 'Emphasize physical intuition and conceptual understanding before equations. Use thought experiments and everyday analogies. Ask students to predict what will happen before calculating.',
    emphasisAreas: [
      'Conceptual understanding before calculation',
      'Physical intuition and prediction',
      'Dimensional analysis',
      'Free-body diagrams and visualization',
      'Connecting to real-world phenomena',
      'Limiting case analysis'
    ],
    questionTemplates: [
      {
        id: 'physical_intuition',
        template: 'Before we calculate, what does your intuition say will happen?',
        whenToUse: 'Beginning of any physics problem',
        example: 'Will the heavier ball fall faster?'
      },
      {
        id: 'limiting_case',
        template: 'What if [parameter] was very large/small? What would you expect?',
        whenToUse: 'To check if answer makes physical sense',
        example: 'If mass approaches zero, what should happen to acceleration?'
      },
      {
        id: 'analogy',
        template: 'This is similar to [everyday situation]. How would that work?',
        whenToUse: 'Making abstract concepts concrete',
        example: 'Electric current is like water flow...'
      },
      {
        id: 'dimensions',
        template: 'What are the units of your answer? Do they make sense?',
        whenToUse: 'Checking answers',
        example: 'Should force have units of kg·m/s²?'
      },
      {
        id: 'conservation',
        template: 'What is conserved in this situation?',
        whenToUse: 'Problems involving energy, momentum, or charge',
        example: 'Collision problems, energy transformations'
      }
    ]
  },
  
  availableTools: [
    'unit_converter',
    'simulator',
    'graphing',
    'equation_solver',
    'dimensional_analyzer'
  ],
  
  promptAdditions: `
    # Physics Teaching Guidelines
    
    ## Problem-Solving Approach
    1. **Conceptual first**: Ask for physical intuition before equations
    2. **Visualization**: Always suggest drawing diagrams (free-body, circuit, etc.)
    3. **Given/Find**: Encourage listing what's given and what to find
    4. **Principles**: Identify the physical principles involved
    5. **Check**: Verify answer with limiting cases and units
    
    ## Key Questions to Ask
    - "What does your physical intuition tell you?"
    - "Can you draw a diagram of the situation?"
    - "What is conserved in this problem?"
    - "What would happen in the limiting case?"
    - "Do your units make sense?"
    
    ## Common Pitfalls to Address
    - Confusing cause and effect
    - Ignoring vector nature of quantities
    - Forgetting about all forces in FBD
    - Assuming ideal conditions
    - Not checking limiting cases
    
    ## Analogies to Use
    - Electric current ↔ Water flow
    - Voltage ↔ Water pressure
    - Resistance ↔ Pipe narrowness
    - Capacitance ↔ Water tank capacity
    - Temperature ↔ Thermal energy "height"
    
    ## Encouragement Phrases
    - "Your physical intuition is developing well..."
    - "Let's think about this conceptually first..."
    - "What observation from everyday life relates to this?"
    - "Good - you're thinking like a physicist!"
  `,
  
  formatting: {
    useLatex: true,
    useDiagrams: true,
    useCodeBlocks: false,
    customNotation: 'Physics notation with units (e.g., 5 m/s²)'
  }
}
