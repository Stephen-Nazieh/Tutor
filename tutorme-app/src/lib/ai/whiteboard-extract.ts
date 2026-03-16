export type WhiteboardItem = {
  type: 'text' | 'formula' | 'example' | 'tip'
  content: string
}

export function extractWhiteboardItems(content: string): WhiteboardItem[] {
  const items: WhiteboardItem[] = []

  // Look for formulas (often in backticks or after "Formula:")
  const formulaMatches = content.match(/(?:Formula:|\`)([^\`\n]+)(?:\`|\n)/g)
  if (formulaMatches) {
    formulaMatches.forEach(match => {
      const clean = match.replace(/Formula:|\`/g, '').trim()
      if (clean) {
        items.push({ type: 'formula', content: clean })
      }
    })
  }

  // Look for key definitions (after "Key Concept:" or "Definition:")
  const definitionMatches = content.match(/(?:Key Concept:|Definition:)[\s\n]+([^\n]+(?:\n(?!(?:Key Concept:|Definition:))[\s\S]+?)?)/gi)
  if (definitionMatches) {
    definitionMatches.forEach(match => {
      const clean = match.replace(/Key Concept:|Definition:/gi, '').trim()
      if (clean && clean.length < 200) {
        items.push({ type: 'text', content: clean })
      }
    })
  }

  // Look for tips
  const tipMatches = content.match(/(?:Tip:|💡)[\s\n]*([^\n]+)/gi)
  if (tipMatches) {
    tipMatches.forEach(match => {
      const clean = match.replace(/Tip:|💡/gi, '').trim()
      if (clean) {
        items.push({ type: 'tip', content: clean })
      }
    })
  }

  return items
}
