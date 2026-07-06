import { describe, it, expect } from 'vitest'
import { analyzeDocumentSignals } from './document-signals'

describe('analyzeDocumentSignals', () => {
  it('flags a real question paper as a strong paper signal', () => {
    const paper = `Section A
1. Calculate the mean of the data set. [3]
2. Determine the standard deviation. [4]
3. Explain why the median is more robust. [5]
(a) State one advantage.
(b) State one disadvantage.`
    const s = analyzeDocumentSignals(paper)
    expect(s.paperSignal).toBe('strong')
    expect(s.markAllocations).toBeGreaterThanOrEqual(2)
  })

  it('flags an MCQ paper as strong via lettered options', () => {
    const mcq = `1. What is 2 + 2?
A. 3
B. 4
C. 5
D. 6
2. Which is prime?
A. 4
B. 9
C. 7
D. 8`
    const s = analyzeDocumentSignals(mcq)
    expect(s.mcqOptionLines).toBeGreaterThanOrEqual(4)
    expect(s.paperSignal).toBe('strong')
  })

  it('reports NO paper signal for explanatory study notes', () => {
    const notes = `Photosynthesis is the process by which green plants convert light energy into chemical energy stored in glucose, using carbon dioxide and water.
The process occurs mainly in the chloroplasts, which contain the pigment chlorophyll that absorbs light most strongly in the blue and red parts of the spectrum.
There are two main stages: the light-dependent reactions and the light-independent reactions, which together sustain almost all life on Earth.`
    const s = analyzeDocumentSignals(notes)
    expect(s.paperSignal).toBe('none')
    expect(s.markAllocations).toBe(0)
    expect(s.proseChars).toBeGreaterThan(0)
  })

  it('does not call a numbered outline a strong paper on its own', () => {
    const outline = `1. Introduction to cells
2. The cell membrane
3. Organelles and their functions
4. Cell division`
    const s = analyzeDocumentSignals(outline)
    // Numbered headings alone (no marks, no options, no answer blanks, no task
    // verbs) must not read as a strong question paper.
    expect(s.paperSignal).not.toBe('strong')
  })
})
