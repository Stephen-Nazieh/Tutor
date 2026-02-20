/**
 * Chemistry Subject Context
 * Specialized context for chemistry tutoring
 */

import { SubjectContext } from './types'

export const chemistryContext: SubjectContext = {
  id: 'chemistry',
  name: 'Chemistry',
  description: 'Chemistry tutoring emphasizing molecular understanding, stoichiometry, and chemical reasoning',
  
  concepts: [
    {
      id: 'stoichiometry',
      name: 'Stoichiometry',
      description: 'Quantitative relationships in chemical reactions',
      prerequisites: ['atomic_structure', 'balancing_equations'],
      commonMisconceptions: [
        'Converting grams to moles incorrectly',
        'Using molecular mass instead of molar mass',
        'Not using coefficients in mole ratios',
        'Forgetting limiting reagent considerations'
      ],
      exampleProblems: [
        {
          id: 'stoich_1',
          question: 'How many grams of CO₂ are produced when 44g of C₂H₆ burns completely?',
          hint: 'Start with a balanced equation. What is the mole ratio between C₂H₆ and CO₂?',
          solution: '2C₂H₆ + 7O₂ → 4CO₂ + 6H₂O. 44g C₂H₆ = 1.46 mol, produces 2.92 mol CO₂ = 128.5g',
          difficulty: 'intermediate'
        }
      ],
      relatedConcepts: ['limiting_reagent', 'percent_yield', 'molar_mass']
    },
    {
      id: 'atomic_structure',
      name: 'Atomic Structure',
      description: 'Electrons, protons, neutrons and electron configuration',
      prerequisites: [],
      commonMisconceptions: [
        'Thinking electrons orbit like planets',
        'Confusing atomic number and mass number',
        'Not understanding electron shielding',
        'Misplacing electrons in energy levels'
      ],
      exampleProblems: [
        {
          id: 'atom_1',
          question: 'Write the electron configuration for Fe³⁺',
          hint: 'First write neutral Fe, then remove electrons from the highest n level first.',
          solution: 'Fe: [Ar] 4s² 3d⁶, Fe³⁺: [Ar] 3d⁵ (remove 4s electrons first)',
          difficulty: 'intermediate'
        }
      ],
      relatedConcepts: ['periodic_trends', 'chemical_bonding', 'quantum_numbers']
    },
    {
      id: 'chemical_equilibrium',
      name: 'Chemical Equilibrium',
      description: 'Dynamic equilibrium and Le Chatelier\'s Principle',
      prerequisites: ['stoichiometry', 'thermodynamics'],
      commonMisconceptions: [
        'Thinking reaction stops at equilibrium',
        'Confusing Q and K',
        'Misapplying Le Chatelier to catalysts',
        'Not understanding temperature effect on K'
      ],
      exampleProblems: [
        {
          id: 'equil_1',
          question: 'For N₂ + 3H₂ ⇌ 2NH₃ (ΔH < 0), what happens if temperature increases?',
          hint: 'Is this exothermic or endothermic? How does temperature affect an exothermic equilibrium?',
          solution: 'Endothermic direction favored (left), so K decreases, less NH₃ forms',
          difficulty: 'intermediate'
        }
      ],
      relatedConcepts: ['le_chatelier', 'kinetics', 'thermodynamics']
    }
  ],
  
  commonMistakes: [
    {
      id: 'sig_figs',
      pattern: 'Significant figures',
      description: 'Incorrect significant figures in answers',
      correctivePrompt: 'How many significant figures should your answer have? Check your given values.'
    },
    {
      id: 'unit_conversion',
      pattern: 'Unit conversion errors',
      description: 'Forgetting to convert mL to L or g to kg',
      correctivePrompt: 'What units does your answer need? Do you need to convert any given values first?'
    },
    {
      id: 'balancing',
      pattern: 'Unbalanced equations',
      description: 'Using unbalanced chemical equations',
      correctivePrompt: 'Is your chemical equation balanced? Count atoms on both sides.'
    },
    {
      id: 'mole_concept',
      pattern: 'Mole concept confusion',
      description: 'Converting between grams, moles, and molecules incorrectly',
      correctivePrompt: 'What is the relationship between grams and moles? What is the molar mass?'
    },
    {
      id: 'state_symbols',
      pattern: 'Ignoring state symbols',
      description: 'Not considering physical states of reactants/products',
      correctivePrompt: 'What states are your reactants and products in? Does this affect the reaction?'
    }
  ],
  
  pedagogicalApproach: {
    socraticStyle: 'Emphasize molecular-level understanding. Use particle diagrams. Connect macroscopic observations to microscopic behavior. Ask students to visualize atoms and molecules.',
    emphasisAreas: [
      'Molecular-level visualization',
      'Dimensional analysis',
      'Balanced chemical equations',
      'Conservation of mass',
      'Connecting theory to lab observations',
      'Safety awareness'
    ],
    questionTemplates: [
      {
        id: 'visualize_particles',
        template: 'What do the particles look like at the molecular level?',
        whenToUse: 'Explaining reactions or states of matter',
        example: 'What happens to water molecules when ice melts?'
      },
      {
        id: 'conservation',
        template: 'Where did the [element] atoms go? Are they still there?',
        whenToUse: 'Checking understanding of conservation of mass',
        example: 'In combustion, where does the carbon end up?'
      },
      {
        id: 'mole_bridge',
        template: 'How many moles is that? What is the molar mass?',
        whenToUse: 'Converting between grams and moles',
        example: 'Stoichiometry problems'
      },
      {
        id: 'reality_check',
        template: 'Does this answer make physical sense?',
        whenToUse: 'After calculations',
        example: 'Is a density of 5000 g/mL reasonable for a liquid?'
      },
      {
        id: 'lab_connection',
        template: 'What would you observe in the lab?',
        whenToUse: 'Connecting theory to observation',
        example: 'Color changes, gas evolution, temperature changes'
      }
    ]
  },
  
  availableTools: [
    'periodic_table',
    'molar_mass_calculator',
    'equation_balancer',
    'unit_converter',
    'molecular_viewer'
  ],
  
  promptAdditions: `
    # Chemistry Teaching Guidelines
    
    ## Problem-Solving Approach
    1. **Start with the balanced equation** - Always check this first
    2. **Map the stoichiometry** - Show mole ratios clearly
    3. **Dimensional analysis** - Use unit cancellation method
    4. **Molecular visualization** - Ask students to picture atoms/molecules
    5. **Lab connection** - Relate to observable phenomena
    
    ## Key Questions
    - "What is happening at the molecular level?"
    - "Are atoms being created or destroyed?"
    - "What is the limiting reagent?"
    - "How does this relate to what you'd see in lab?"
    - "Check your units - do they make sense?"
    
    ## Safety Reminders
    - Always mention safety when discussing lab procedures
    - "In a real lab, you would wear..."
    - "This chemical requires special handling..."
    
    ## Common Mnemonics to Reference
    - OIL RIG (Oxidation Is Loss, Reduction Is Gain)
    - LEO says GER (Lose Electrons Oxidation, Gain Electrons Reduction)
    - Mole bridge: grams → moles → molecules
    
    ## Encouragement
    - "Chemistry is like cooking - following the recipe (equation) matters!"
    - "You're thinking like a chemist..."
    - "Dimensional analysis is a superpower - you're getting it!"
  `,
  
  formatting: {
    useLatex: true,
    useDiagrams: true,
    useCodeBlocks: false,
    customNotation: 'Chemical formulas (H₂O), state symbols (s, l, g, aq)'
  }
}
