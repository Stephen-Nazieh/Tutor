;!function(){try { var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof global?global:"undefined"!=typeof window?window:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&((e._debugIds|| (e._debugIds={}))[n]="f67f1fc1-9a10-27c5-620a-c382cb9cdd83")}catch(e){}}();
module.exports=[584842,215403,26685,733405,778258,597519,e=>{"use strict";let t={id:"mathematics",name:"Mathematics",description:"Mathematics tutoring with emphasis on problem-solving methodology and mathematical reasoning",concepts:[{id:"algebra_basics",name:"Algebra Basics",description:"Variables, equations, and algebraic manipulation",prerequisites:[],commonMisconceptions:["Thinking 2(x+3) = 2x + 3 (missing distribution)","Believing -x is always negative","Confusing (a+b)² with a² + b²"],exampleProblems:[{id:"alg_1",question:"Solve for x: 2(x + 3) = 14",hint:"What should you do first - distribute or divide? Try both and see what happens.",solution:"Distribute first: 2x + 6 = 14, then 2x = 8, so x = 4",difficulty:"beginner"}],relatedConcepts:["linear_equations","quadratic_equations"]},{id:"calculus_limits",name:"Limits",description:"Understanding limits and continuity",prerequisites:["algebra_basics","functions"],commonMisconceptions:["Thinking limits are about the value at the point","Believing limits always exist","Confusing left and right limits"],exampleProblems:[{id:"lim_1",question:"Find lim(x→2) (x² - 4)/(x - 2)",hint:"What happens when you plug in x=2? Can you factor the numerator?",solution:"Factor: (x-2)(x+2)/(x-2) = x+2, so limit is 4",difficulty:"intermediate"}],relatedConcepts:["derivatives","continuity"]},{id:"geometry_proofs",name:"Geometric Proofs",description:"Logical reasoning in geometry",prerequisites:["algebra_basics"],commonMisconceptions:["Thinking diagrams are drawn to scale","Assuming properties not given","Skipping steps in logical chain"],exampleProblems:[{id:"geo_1",question:"Prove that the base angles of an isosceles triangle are congruent",hint:"What auxiliary line could help? Think about symmetry.",solution:"Draw altitude from apex to base, creating two congruent right triangles by HL",difficulty:"intermediate"}],relatedConcepts:["triangle_properties","congruence"]}],commonMistakes:[{id:"sign_error",pattern:"Sign errors",description:"Losing track of negative signs or subtraction",correctivePrompt:"Let's double-check the signs. When you subtract a negative, what happens?"},{id:"distributive",pattern:"Distribution errors",description:"Forgetting to distribute to all terms",correctivePrompt:"Check if you multiplied every term inside the parentheses. What is 2 × 3?"},{id:"fraction_addition",pattern:"Adding fractions incorrectly",description:"Adding numerators and denominators separately",correctivePrompt:"What do fractions need to have in common before adding? Think about slices of pizza."},{id:"order_operations",pattern:"Order of operations",description:"Doing operations in wrong order",correctivePrompt:"Remember PEMDAS? What comes first - multiplication or addition?"},{id:"square_root",pattern:"Square root misconceptions",description:"Forgetting ± or assuming √x² = x",correctivePrompt:"If x² = 9, what could x be? Is there only one answer?"}],pedagogicalApproach:{socraticStyle:'Guide students through step-by-step reasoning. Ask "what would happen if..." questions. Emphasize showing work and checking answers.',emphasisAreas:["Mathematical reasoning over memorization","Multiple solution paths","Checking and verifying answers","Connecting to real-world applications","Understanding why formulas work"],questionTemplates:[{id:"check_work",template:"If you plug your answer back in, does it make the equation true?",whenToUse:"After student solves an equation",example:"Student solves 2x + 5 = 13 and gets x = 4"},{id:"break_down",template:"What is the smallest step you can take from here?",whenToUse:"When student is stuck on complex problem",example:"Multi-step algebra problem"},{id:"pattern_recognition",template:"Have you seen a problem like this before? What did you do then?",whenToUse:"When problem resembles previous work",example:"Similar triangle problem after doing congruence"},{id:"visualize",template:"Can you draw a diagram or picture of what's happening?",whenToUse:"Word problems or geometry",example:"Rate/distance problems, geometric figures"},{id:"estimate",template:"Before calculating, what do you think a reasonable answer would be?",whenToUse:"Before solving to build number sense",example:"Multiplication of large numbers"}]},availableTools:["calculator","graphing","equation_solver","latex_renderer","step_checker"],promptAdditions:`
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
    - Square root misconceptions (forgetting \xb1)
    
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
  `,formatting:{useLatex:!0,useDiagrams:!0,useCodeBlocks:!1,customNotation:"LaTeX math notation"}};e.s(["mathematicsContext",0,t],215403);let i={id:"physics",name:"Physics",description:"Physics tutoring emphasizing conceptual understanding, problem-solving strategies, and physical intuition",concepts:[{id:"newton_laws",name:"Newton's Laws of Motion",description:"Force, mass, acceleration relationships",prerequisites:["vectors","basic_calculus"],commonMisconceptions:["Thinking force is needed to maintain motion","Confusing mass and weight","Believing action-reaction forces cancel on same object","Thinking heavier objects fall faster"],exampleProblems:[{id:"newton_1",question:"A 5kg box is pushed with a 20N force on a frictionless surface. What is its acceleration?",hint:"Which of Newton's laws applies here? What is the relationship between force, mass, and acceleration?",solution:"F = ma, so a = F/m = 20N/5kg = 4 m/s²",difficulty:"beginner"},{id:"newton_2",question:"In a tug-of-war, if team A pulls with 500N and team B pulls with 500N, what is the tension in the rope?",hint:'Think about action-reaction pairs. What does the rope "feel"?',solution:"Tension is 500N. Both teams experience 500N tension.",difficulty:"intermediate"}],relatedConcepts:["friction","circular_motion","momentum"]},{id:"energy_conservation",name:"Conservation of Energy",description:"Kinetic, potential, and total energy",prerequisites:["newton_laws","work"],commonMisconceptions:['Thinking energy is "used up" or lost',"Confusing force and energy","Not accounting for all energy forms","Assuming frictionless systems in real problems"],exampleProblems:[{id:"energy_1",question:"A ball is dropped from 10m. How fast is it going when it hits the ground? (ignore air resistance)",hint:"What energy does it start with? What energy does it end with? What is conserved?",solution:"mgh = ½mv², so v = √(2gh) = √(2×9.8×10) ≈ 14 m/s",difficulty:"intermediate"}],relatedConcepts:["work_energy_theorem","power","simple_harmonic_motion"]},{id:"electric_circuits",name:"Electric Circuits",description:"Voltage, current, resistance, and circuit analysis",prerequisites:["algebra_basics"],commonMisconceptions:['Thinking current is "used up" in resistors',"Confusing voltage and current","Not understanding parallel vs series","Thinking electrons move at speed of light"],exampleProblems:[{id:"circuit_1",question:"Two resistors (2Ω and 4Ω) are in series with a 12V battery. What is the current?",hint:"What is the total resistance? How does Ohm's Law relate V, I, and R?",solution:"R_total = 2+4 = 6Ω, I = V/R = 12/6 = 2A",difficulty:"beginner"}],relatedConcepts:["ohms_law","kirchhoff_laws","capacitance"]}],commonMistakes:[{id:"unit_confusion",pattern:"Unit confusion",description:"Mixing up units or not converting to consistent system",correctivePrompt:"What units are given? What units do you need? Should you convert everything to meters and seconds first?"},{id:"free_body",pattern:"Incomplete free-body diagrams",description:"Missing forces or including incorrect forces",correctivePrompt:"Let's draw a free-body diagram. What objects are touching your system? What fields act on it?"},{id:"sign_convention",pattern:"Sign convention errors",description:"Inconsistent positive/negative directions",correctivePrompt:"Which direction did you choose as positive? Does your answer make sense with that choice?"},{id:"vector_scalar",pattern:"Confusing vectors and scalars",description:"Adding vectors incorrectly or ignoring direction",correctivePrompt:"Is this quantity a vector or scalar? Do you need to consider direction?"},{id:"energy_loss",pattern:"Ignoring energy losses",description:"Assuming conservation when friction/drag exists",correctivePrompt:'Is this an ideal system? What energy might be "lost" to the surroundings?'}],pedagogicalApproach:{socraticStyle:"Emphasize physical intuition and conceptual understanding before equations. Use thought experiments and everyday analogies. Ask students to predict what will happen before calculating.",emphasisAreas:["Conceptual understanding before calculation","Physical intuition and prediction","Dimensional analysis","Free-body diagrams and visualization","Connecting to real-world phenomena","Limiting case analysis"],questionTemplates:[{id:"physical_intuition",template:"Before we calculate, what does your intuition say will happen?",whenToUse:"Beginning of any physics problem",example:"Will the heavier ball fall faster?"},{id:"limiting_case",template:"What if [parameter] was very large/small? What would you expect?",whenToUse:"To check if answer makes physical sense",example:"If mass approaches zero, what should happen to acceleration?"},{id:"analogy",template:"This is similar to [everyday situation]. How would that work?",whenToUse:"Making abstract concepts concrete",example:"Electric current is like water flow..."},{id:"dimensions",template:"What are the units of your answer? Do they make sense?",whenToUse:"Checking answers",example:"Should force have units of kg·m/s²?"},{id:"conservation",template:"What is conserved in this situation?",whenToUse:"Problems involving energy, momentum, or charge",example:"Collision problems, energy transformations"}]},availableTools:["unit_converter","simulator","graphing","equation_solver","dimensional_analyzer"],promptAdditions:`
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
  `,formatting:{useLatex:!0,useDiagrams:!0,useCodeBlocks:!1,customNotation:"Physics notation with units (e.g., 5 m/s²)"}};e.s(["physicsContext",0,i],26685);let n={id:"chemistry",name:"Chemistry",description:"Chemistry tutoring emphasizing molecular understanding, stoichiometry, and chemical reasoning",concepts:[{id:"stoichiometry",name:"Stoichiometry",description:"Quantitative relationships in chemical reactions",prerequisites:["atomic_structure","balancing_equations"],commonMisconceptions:["Converting grams to moles incorrectly","Using molecular mass instead of molar mass","Not using coefficients in mole ratios","Forgetting limiting reagent considerations"],exampleProblems:[{id:"stoich_1",question:"How many grams of CO₂ are produced when 44g of C₂H₆ burns completely?",hint:"Start with a balanced equation. What is the mole ratio between C₂H₆ and CO₂?",solution:"2C₂H₆ + 7O₂ → 4CO₂ + 6H₂O. 44g C₂H₆ = 1.46 mol, produces 2.92 mol CO₂ = 128.5g",difficulty:"intermediate"}],relatedConcepts:["limiting_reagent","percent_yield","molar_mass"]},{id:"atomic_structure",name:"Atomic Structure",description:"Electrons, protons, neutrons and electron configuration",prerequisites:[],commonMisconceptions:["Thinking electrons orbit like planets","Confusing atomic number and mass number","Not understanding electron shielding","Misplacing electrons in energy levels"],exampleProblems:[{id:"atom_1",question:"Write the electron configuration for Fe³⁺",hint:"First write neutral Fe, then remove electrons from the highest n level first.",solution:"Fe: [Ar] 4s² 3d⁶, Fe³⁺: [Ar] 3d⁵ (remove 4s electrons first)",difficulty:"intermediate"}],relatedConcepts:["periodic_trends","chemical_bonding","quantum_numbers"]},{id:"chemical_equilibrium",name:"Chemical Equilibrium",description:"Dynamic equilibrium and Le Chatelier's Principle",prerequisites:["stoichiometry","thermodynamics"],commonMisconceptions:["Thinking reaction stops at equilibrium","Confusing Q and K","Misapplying Le Chatelier to catalysts","Not understanding temperature effect on K"],exampleProblems:[{id:"equil_1",question:"For N₂ + 3H₂ ⇌ 2NH₃ (ΔH < 0), what happens if temperature increases?",hint:"Is this exothermic or endothermic? How does temperature affect an exothermic equilibrium?",solution:"Endothermic direction favored (left), so K decreases, less NH₃ forms",difficulty:"intermediate"}],relatedConcepts:["le_chatelier","kinetics","thermodynamics"]}],commonMistakes:[{id:"sig_figs",pattern:"Significant figures",description:"Incorrect significant figures in answers",correctivePrompt:"How many significant figures should your answer have? Check your given values."},{id:"unit_conversion",pattern:"Unit conversion errors",description:"Forgetting to convert mL to L or g to kg",correctivePrompt:"What units does your answer need? Do you need to convert any given values first?"},{id:"balancing",pattern:"Unbalanced equations",description:"Using unbalanced chemical equations",correctivePrompt:"Is your chemical equation balanced? Count atoms on both sides."},{id:"mole_concept",pattern:"Mole concept confusion",description:"Converting between grams, moles, and molecules incorrectly",correctivePrompt:"What is the relationship between grams and moles? What is the molar mass?"},{id:"state_symbols",pattern:"Ignoring state symbols",description:"Not considering physical states of reactants/products",correctivePrompt:"What states are your reactants and products in? Does this affect the reaction?"}],pedagogicalApproach:{socraticStyle:"Emphasize molecular-level understanding. Use particle diagrams. Connect macroscopic observations to microscopic behavior. Ask students to visualize atoms and molecules.",emphasisAreas:["Molecular-level visualization","Dimensional analysis","Balanced chemical equations","Conservation of mass","Connecting theory to lab observations","Safety awareness"],questionTemplates:[{id:"visualize_particles",template:"What do the particles look like at the molecular level?",whenToUse:"Explaining reactions or states of matter",example:"What happens to water molecules when ice melts?"},{id:"conservation",template:"Where did the [element] atoms go? Are they still there?",whenToUse:"Checking understanding of conservation of mass",example:"In combustion, where does the carbon end up?"},{id:"mole_bridge",template:"How many moles is that? What is the molar mass?",whenToUse:"Converting between grams and moles",example:"Stoichiometry problems"},{id:"reality_check",template:"Does this answer make physical sense?",whenToUse:"After calculations",example:"Is a density of 5000 g/mL reasonable for a liquid?"},{id:"lab_connection",template:"What would you observe in the lab?",whenToUse:"Connecting theory to observation",example:"Color changes, gas evolution, temperature changes"}]},availableTools:["periodic_table","molar_mass_calculator","equation_balancer","unit_converter","molecular_viewer"],promptAdditions:`
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
  `,formatting:{useLatex:!0,useDiagrams:!0,useCodeBlocks:!1,customNotation:"Chemical formulas (H₂O), state symbols (s, l, g, aq)"}};e.s(["chemistryContext",0,n],733405);let o={id:"english",name:"English Language Arts",description:"English tutoring covering literature, writing, grammar, and critical analysis",concepts:[{id:"essay_structure",name:"Essay Structure",description:"Thesis, body paragraphs, evidence, and conclusion",prerequisites:[],commonMisconceptions:["Thesis statement is just a topic sentence","Body paragraphs can be any length","Conclusion just restates the introduction","Personal opinions don't need evidence"],exampleProblems:[{id:"essay_1",question:'Write a thesis statement for an essay about the theme of courage in "To Kill a Mockingbird"',hint:"A thesis makes a claim that can be debated. What specific argument about courage could you make?",solution:"In To Kill a Mockingbird, Harper Lee demonstrates that true courage requires standing for justice despite certain defeat.",difficulty:"intermediate"}],relatedConcepts:["thesis_development","evidence_analysis","transitions"]},{id:"literary_analysis",name:"Literary Analysis",description:"Analyzing themes, symbols, and author techniques",prerequisites:["reading_comprehension"],commonMisconceptions:["Finding symbolism everywhere (over-interpretation)","Confusing summary with analysis","Not connecting techniques to meaning","Ignoring historical context"],exampleProblems:[{id:"lit_1",question:"How does the author use the green light in The Great Gatsby?",hint:"What does the green light represent? How does its meaning change? What theme does it connect to?",solution:"The green light symbolizes Gatsby's hope and the American Dream, but its distance shows the dream's unattainability.",difficulty:"advanced"}],relatedConcepts:["symbolism","theme","character_development"]},{id:"grammar_mechanics",name:"Grammar and Mechanics",description:"Sentence structure, punctuation, and usage rules",prerequisites:[],commonMisconceptions:["Comma splices are acceptable","Semicolons and colons are interchangeable","Passive voice is always wrong","Contractions are never allowed in formal writing"],exampleProblems:[{id:"gram_1",question:'Correct this sentence: "The students studied hard, they all passed the exam."',hint:"This is a comma splice. How can you connect two independent clauses? (period, semicolon, or conjunction)",solution:"The students studied hard; they all passed the exam. OR The students studied hard, so they all passed.",difficulty:"beginner"}],relatedConcepts:["sentence_variety","punctuation","syntax"]},{id:"rhetorical_analysis",name:"Rhetorical Analysis",description:"Ethos, pathos, logos and rhetorical strategies",prerequisites:["reading_comprehension"],commonMisconceptions:["Confusing ethos/pathos/logos","Identifying strategies without explaining effect","Not considering audience","Ignoring the speaker's credibility"],exampleProblems:[{id:"rhet_1",question:'How does Martin Luther King Jr. use pathos in his "I Have a Dream" speech?',hint:"Look for emotional language, imagery, and appeals to shared values. What feelings does he evoke?",solution:"King uses imagery of children playing together and references to American ideals to evoke hope and shared humanity.",difficulty:"intermediate"}],relatedConcepts:["persuasion","audience","tone"]}],commonMistakes:[{id:"summary_vs_analysis",pattern:"Summary instead of analysis",description:"Retelling the plot instead of analyzing meaning",correctivePrompt:"That's a good summary. Now tell me: What does this reveal about the character/theme/society?"},{id:"weak_thesis",pattern:"Weak thesis statements",description:"Thesis is too broad or merely factual",correctivePrompt:"Can someone disagree with this statement? What specific claim are you making?"},{id:"quote_drops",pattern:"Quote dropping",description:"Inserting quotes without explanation or context",correctivePrompt:"Why did you choose this quote? How does it support your point?"},{id:"vague_language",pattern:"Vague language",description:'Using words like "interesting" or "good" without specifics',correctivePrompt:"What specifically makes it interesting? Use more precise language."},{id:"pronoun_clarity",pattern:"Unclear pronoun reference",description:"It/this/they without clear antecedent",correctivePrompt:'What does "it" refer to? Be specific so your reader can follow.'}],pedagogicalApproach:{socraticStyle:"Ask students to support claims with textual evidence. Encourage close reading and questioning of assumptions. Help students find their own voice in writing.",emphasisAreas:["Textual evidence over personal opinion","Critical thinking and questioning","Revision and refinement","Audience awareness","Close reading skills","Developing authentic voice"],questionTemplates:[{id:"textual_evidence",template:"What in the text makes you say that?",whenToUse:"When student makes a claim about the text",example:"Any literary analysis discussion"},{id:"so_what",template:"So what? Why does that matter?",whenToUse:"When analysis seems superficial",example:"Student identifies a symbol but doesn't explain significance"},{id:"author_choices",template:"Why might the author have made this choice?",whenToUse:"Analyzing authorial intent",example:"Character decisions, narrative structure"},{id:"alternative_readings",template:"Could someone interpret this differently?",whenToUse:"Encouraging critical thinking",example:"Ambiguous passages, multiple themes"},{id:"audience_awareness",template:"How would this argument affect someone who disagrees?",whenToUse:"Revising persuasive writing",example:"Essay writing, rhetorical analysis"}]},availableTools:["grammar_checker","thesaurus","citation_generator","text_analyzer","outline_builder"],promptAdditions:`
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
    - "Let's dig deeper into that idea..."
    - "Your voice is emerging nicely..."
    - "Revision is where good writing becomes great..."
    - "Trust your reading - what does your gut tell you?"
    
    ## Quote Integration
    When students use quotes, ensure they:
    1. Introduce the quote (who said it, context)
    2. Present the quote (properly formatted)
    3. Analyze the quote (explain significance)
  `,formatting:{useLatex:!1,useDiagrams:!1,useCodeBlocks:!0,customNotation:"MLA/APA citation format"}};e.s(["englishContext",0,o],778258),e.s(["SUBJECTS",0,["mathematics","physics","chemistry","biology","computer_science","history","english","economics","general"]],597519);let s={mathematics:t,math:t,physics:i,chemistry:n,chem:n,english:o,literature:o,language_arts:o,general:{id:"general",name:"General Learning",description:"General-purpose tutoring with Socratic methodology",concepts:[],commonMistakes:[{id:"rushing",pattern:"Rushing to answer",description:"Not reading the full question or thinking before answering",correctivePrompt:"Take a moment to read the question again. What is it really asking?"},{id:"giving_up",pattern:"Giving up too quickly",description:'Stating "I don\'t know" without attempting',correctivePrompt:"What DO you know about this topic? Let's start from there."}],pedagogicalApproach:{socraticStyle:"Ask probing questions to help students discover answers. Encourage metacognition.",emphasisAreas:["Critical thinking","Problem decomposition","Self-reflection","Connecting to prior knowledge"],questionTemplates:[{id:"what_do_you_know",template:"What do you already know about this?",whenToUse:"Starting any new problem",example:"Any subject"},{id:"similar_problem",template:"Have you solved a similar problem before?",whenToUse:"When student is stuck",example:"Transfer learning"},{id:"explain_back",template:"Can you explain your reasoning to me?",whenToUse:"Checking understanding",example:"Any subject"}]},availableTools:[],promptAdditions:`
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
      - "That's an interesting approach..."
      - "Learning takes time, and you're making progress."
    `,formatting:{useLatex:!1,useDiagrams:!0,useCodeBlocks:!0,customNotation:"General text"}}};function a(e){let t=e.toLowerCase().trim();if(s[t])return s[t];for(let[e,i]of Object.entries(s))if(t.includes(e)||e.includes(t))return i;return s.general}function r(e){let t=e.toLowerCase().trim();return!!s[t]||Object.keys(s).some(e=>t.includes(e)||e.includes(t))}function c(){return Object.values(s).filter((e,t,i)=>i.findIndex(t=>t.id===e.id)===t).map(e=>({id:e.id,name:e.name}))}function l(e,t){var i,n,o;let s,r=a(e),c={includeCommonMistakes:!0,includePedagogy:!0,includeTools:!0,teachingAge:15,voiceGender:"female",voiceAccent:"us",...t},l=`# TutorMe AI Tutor - ${r.name}

`;return l+=`## Core Persona
`,l+="You are a patient, encouraging Socratic tutor. You NEVER give direct answers. ",l+=`Instead, you guide students to discover solutions through questions, hints, and encouragement.

`,l+=(i=c.teachingAge,(s={5:`
## Teaching Style: Ages 5-8 (Early Elementary)
- Use very simple words and short sentences
- Use lots of analogies and comparisons to toys, games, and everyday objects
- Be playful and use emojis or fun expressions
- Use stories and imagination to explain concepts
- Ask "what do you think?" frequently
- Be very patient and encouraging
- Example: "Think of grammar like building blocks - each word is a block!"
`,8:`
## Teaching Style: Ages 8-10 (Upper Elementary)
- Use simple but clear explanations
- Include fun facts and interesting connections
- Use relatable examples from school and hobbies
- Encourage curiosity with "I wonder..." questions
- Keep explanations brief but complete
- Use comparisons to familiar things
- Example: "A thesis is like the main idea of a story - it's what everything else supports!"
`,10:`
## Teaching Style: Ages 10-12 (Middle School)
- Use clear academic language but explain new terms
- Connect to real-world applications
- Encourage critical thinking with "why" and "how" questions
- Use examples from pop culture, sports, or technology
- Support developing independence
- Example: "When you write an essay, think of it like building an argument - you need evidence to support your claims."
`,12:`
## Teaching Style: Ages 12-15 (High School Freshman/Sophomore)
- Use standard academic vocabulary
- Expect students to make connections between concepts
- Challenge with "what if" scenarios
- Use sophisticated but accessible examples
- Encourage deeper analysis
- Example: "Consider how the author's word choice shapes the reader's perception of the character."
`,15:`
## Teaching Style: Ages 15-18 (High School Junior/Senior)
- Use college-preparatory academic language
- Expect nuanced understanding and synthesis
- Challenge assumptions and encourage original thinking
- Use complex literary and rhetorical examples
- Prepare for AP/college-level work
- Example: "Analyze the intersection of the author's rhetorical strategies and the historical context in which the text was produced."
`,18:`
## Teaching Style: Adult/College Level
- Use sophisticated academic discourse
- Expect independent research and synthesis
- Engage with theoretical frameworks
- Challenge with primary source analysis
- Support professional/academic writing development
- Example: "Evaluate the theoretical implications of the text's structural choices within its genre conventions."
`})[[5,8,10,12,15,18].reduce((e,t)=>Math.abs(t-i)<Math.abs(e-i)?t:e)]||s[15]),l+=(n=c.voiceGender,o=c.voiceAccent,`
## Voice & Tone
- Speak with a ${({us:"American English",uk:"British English",au:"Australian English",ca:"Canadian English"})[o]||"neutral"} accent
- Use ${"female"===n?"warm, nurturing":"male"===n?"authoritative yet approachable":"neutral, professional"} tone
- Be conversational and engaging
`),l+=r.promptAdditions,c.includeCommonMistakes&&r.commonMistakes.length>0&&(l+=`

## Watch For These Common Mistakes
`,r.commonMistakes.slice(0,5).forEach(e=>{l+=`- **${e.pattern}**: ${e.description}
`})),c.includePedagogy&&(l+=`

## Question Templates
`,r.pedagogicalApproach.questionTemplates.slice(0,3).forEach(e=>{l+=`- "${e.template}"
`})),c.includeTools&&r.availableTools.length>0&&(l+=`

## Available Tools
`,l+=`You can suggest using: ${r.availableTools.join(", ")}
`),l+=`

## Response Guidelines
`,l+=`1. Keep responses under 3-4 sentences
`,l+=`2. Ask ONE guiding question at a time
`,l+=`3. Acknowledge correct reasoning before correcting errors
`,l+=`4. Use encouraging language
`,l+=`5. Reference specific concepts from the knowledge graph when relevant
`}function u(e,t){let i=a(e).concepts.find(e=>e.id===t);return i?[...i.commonMisconceptions.map(e=>`Watch out: ${e}`),...i.exampleProblems.map(e=>`Example: ${e.hint}`)]:[]}function h(e,t){let i=a(e),n=t.toLowerCase();return i.concepts.filter(e=>e.name.toLowerCase().includes(n)||e.description.toLowerCase().includes(n)||e.relatedConcepts.some(e=>e.toLowerCase().includes(n))).map(e=>e.id)}function d(e,t){let i=a(e).commonMistakes.find(e=>t.toLowerCase().includes(e.pattern.toLowerCase())||e.pattern.toLowerCase().includes(t.toLowerCase()));return i?.correctivePrompt||null}e.s(["buildSystemPrompt",()=>l,"findRelevantConcepts",()=>h,"getAvailableSubjects",()=>c,"getCommonMistakeHelp",()=>d,"getConceptHints",()=>u,"getSubjectContext",()=>a,"isSubjectSupported",()=>r],584842)}];

//# debugId=f67f1fc1-9a10-27c5-620a-c382cb9cdd83
//# sourceMappingURL=ADK_WORKSPACE_TutorMekimi_tutorme-app_src_lib_ai_subjects_index_ts_ec9ee167._.js.map