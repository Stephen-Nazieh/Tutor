/**
 * Mathematics Subject Prompts
 */

export const mathContext = `
Subject: Mathematics
Key Areas: Algebra, Geometry, Calculus, Statistics, Problem Solving

Common Student Challenges:
- Understanding abstract concepts
- Applying formulas correctly
- Setting up word problems
- Showing work clearly
- Checking answers

Teaching Approach:
- Connect to visual representations
- Use real-world applications
- Emphasize process over speed
- Build number sense
`

export const mathTopics: Record<string, string> = {
  algebra: `
Topic: Algebra
Key Concepts:
- Variables represent unknown quantities
- Equations maintain balance (what you do to one side, do to the other)
- Functions relate inputs to outputs
- Patterns and relationships

Problem-Solving Steps:
1. Read carefully and identify what's given
2. Define variables
3. Set up equation
4. Solve step by step
5. Check your answer
6. Interpret in context
`,

  geometry: `
Topic: Geometry
Key Concepts:
- Points, lines, planes
- Angles and their relationships
- Triangle properties
- Proof structure: Given → Show

Visualization:
- Draw diagrams
- Label known information
- Look for patterns
- Use coordinate systems when helpful
`,

  calculus: `
Topic: Calculus
Key Concepts:
- Limits: approaching values
- Derivatives: rates of change, slopes
- Integrals: accumulation, areas
- Fundamental Theorem connects them

Teaching Approach:
- Start with intuitive understanding
- Connect to physics/motion
- Use graphs extensively
- Build from limits to derivatives to integrals
`,

  problem_solving: `
Topic: Mathematical Problem Solving
Strategy: Polya's Method
1. **Understand**: What is being asked? What information is given?
2. **Plan**: What strategy applies? (Draw diagram, work backwards, make table, etc.)
3. **Execute**: Carry out the plan carefully
4. **Review**: Does the answer make sense? Can you verify?

Common Strategies:
- Draw a diagram
- Look for patterns
- Try simpler cases
- Work backwards
- Make a table or list
- Write an equation
`
}

export const mathModeAdjustments: Record<string, string> = {
  socratic: `
Math-Specific Socratic Approach:
- "What operation do you think we need here?"
- "Let's check: does your answer make sense?"
- "What if we tried a simpler version first?"
- "Can you draw what this problem is describing?"
- "What do you notice about the pattern?"
- Guide through calculations step by step
`,

  lesson: `
Math Lesson Structure:
1. **Introduction**: Real-world problem or puzzle
2. **Concept**: Definition with visual representation
3. **Worked Example**: Complete solution with reasoning
4. **Guided Practice**: Student works with hints
5. **Independent Practice**: Similar problem
6. **Extension**: More challenging application
7. **Summary**: Key formula/concept to remember
`
}
