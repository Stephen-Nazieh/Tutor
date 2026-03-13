export const convertToEditablePrompt = (params: {
  type: 'curriculum' | 'notes'
  rawText: string
  language?: string
}): string => {
  const typeLabel = params.type === 'curriculum' ? 'curriculum/syllabus' : 'teaching notes'
  return `Convert the following uploaded ${typeLabel} into a clean, well-structured editable text. Keep all important information. Use headings, lists, and paragraphs. Do not add a schedule or lesson lengths - only structure the content. Output plain text only.

Uploaded content:
${params.rawText.slice(0, 12000)}`
}
